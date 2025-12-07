'use strict';

const fs = require('fs');
const path = require('path');

const enPath = path.resolve(__dirname, '..', '..', 'public', 'locales', 'en', 'translation.json');
const arPath = path.resolve(__dirname, '..', '..', 'public', 'locales', 'ar', 'translation.json');

function isPlainObject(val) { 
  return val !== null && typeof val === 'object' && !Array.isArray(val); 
}

function isArabic(text) {
  if (typeof text !== 'string') return false;
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text);
}

function hasEnglishLetters(text) {
  if (typeof text !== 'string') return false;
  return /[a-zA-Z]/.test(text);
}

function isKeyFormat(text) {
  if (typeof text !== 'string') return false;
  // Check for common key patterns
  return (
    // Contains dots (common in nested keys)
    /\w+\.\w+/.test(text) ||
    // CamelCase with no spaces
    (/[a-z][A-Z]/.test(text) && !text.includes(' ')) ||
    // Snake_case
    /_/.test(text) ||
    // Looks like a variable/identifier
    (/^[a-zA-Z_]\w*$/.test(text) && text.length > 15)
  );
}

function isBracketPlaceholder(text) {
  if (typeof text !== 'string') return false;
  return /^\[.+\]$/.test(text);
}

function findTranslationIssues(obj, lang, prefix = []) {
  const issues = {
    arabicInEnglish: [],
    englishInArabic: [],
    keyFormats: [],
    bracketPlaceholders: [],
    untranslated: [],
    suspiciousShort: []
  };
  
  function traverse(node, currentPrefix) {
    if (!isPlainObject(node)) return;
    
    for (const [key, value] of Object.entries(node)) {
      const fullPath = currentPrefix.concat(key).join('.');
      
      if (isPlainObject(value)) {
        traverse(value, currentPrefix.concat(key));
      } else if (typeof value === 'string') {
        if (lang === 'en') {
          // Check for Arabic text in English file
          if (isArabic(value)) {
            issues.arabicInEnglish.push({ path: fullPath, value });
          }
          // Check for key formats
          if (isKeyFormat(value)) {
            issues.keyFormats.push({ path: fullPath, value });
          }
        } else if (lang === 'ar') {
          // Check for English-only text in Arabic file (excluding numbers and symbols)
          if (hasEnglishLetters(value) && !isArabic(value) && value.length > 3) {
            // Skip if it's a brand name, URL, or technical term
            const skipPatterns = [
              /^https?:\/\//,
              /\.(com|net|org|io)/,
              /^[A-Z0-9_]+$/, // Constants
              /^\d+/, // Starts with numbers
              /@/, // Email
              /^#[0-9a-fA-F]+$/, // Hex colors
            ];
            
            if (!skipPatterns.some(pattern => pattern.test(value))) {
              issues.englishInArabic.push({ path: fullPath, value });
            }
          }
          // Check for bracket placeholders
          if (isBracketPlaceholder(value)) {
            issues.bracketPlaceholders.push({ path: fullPath, value });
          }
        }
        
        // Check for suspiciously short translations
        if (value.length <= 3 && !['%', '$', '#', '@', '+', '-', '/', '\\'].includes(value)) {
          issues.suspiciousShort.push({ path: fullPath, value });
        }
      }
    }
  }
  
  traverse(obj, prefix);
  return issues;
}

function readJson(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  return JSON.parse(raw);
}

function main() {
  console.log('[i18n] Analyzing translation files...\n');
  
  const enObj = readJson(enPath);
  const arObj = readJson(arPath);
  
  const enIssues = findTranslationIssues(enObj, 'en');
  const arIssues = findTranslationIssues(arObj, 'ar');
  
  console.log('=== ENGLISH FILE ISSUES ===\n');
  
  if (enIssues.arabicInEnglish.length > 0) {
    console.log(`Arabic text in English file (${enIssues.arabicInEnglish.length} issues):`);
    enIssues.arabicInEnglish.slice(0, 10).forEach(issue => {
      console.log(`  - ${issue.path}: "${issue.value}"`);
    });
    if (enIssues.arabicInEnglish.length > 10) {
      console.log(`  ... and ${enIssues.arabicInEnglish.length - 10} more\n`);
    } else {
      console.log('');
    }
  }
  
  if (enIssues.keyFormats.length > 0) {
    console.log(`Key-formatted values (${enIssues.keyFormats.length} issues):`);
    enIssues.keyFormats.slice(0, 10).forEach(issue => {
      console.log(`  - ${issue.path}: "${issue.value}"`);
    });
    if (enIssues.keyFormats.length > 10) {
      console.log(`  ... and ${enIssues.keyFormats.length - 10} more\n`);
    } else {
      console.log('');
    }
  }
  
  console.log('=== ARABIC FILE ISSUES ===\n');
  
  if (arIssues.englishInArabic.length > 0) {
    console.log(`Untranslated English text (${arIssues.englishInArabic.length} issues):`);
    arIssues.englishInArabic.slice(0, 20).forEach(issue => {
      console.log(`  - ${issue.path}: "${issue.value}"`);
    });
    if (arIssues.englishInArabic.length > 20) {
      console.log(`  ... and ${arIssues.englishInArabic.length - 20} more\n`);
    } else {
      console.log('');
    }
  }
  
  if (arIssues.bracketPlaceholders.length > 0) {
    console.log(`Bracket placeholders (${arIssues.bracketPlaceholders.length} issues):`);
    arIssues.bracketPlaceholders.slice(0, 10).forEach(issue => {
      console.log(`  - ${issue.path}: "${issue.value}"`);
    });
    if (arIssues.bracketPlaceholders.length > 10) {
      console.log(`  ... and ${arIssues.bracketPlaceholders.length - 10} more\n`);
    } else {
      console.log('');
    }
  }
  
  console.log('=== SUMMARY ===\n');
  console.log(`English file:`);
  console.log(`  - Arabic text: ${enIssues.arabicInEnglish.length} issues`);
  console.log(`  - Key formats: ${enIssues.keyFormats.length} issues`);
  console.log(`  - Suspicious short values: ${enIssues.suspiciousShort.length} issues`);
  console.log('');
  console.log(`Arabic file:`);
  console.log(`  - Untranslated English: ${arIssues.englishInArabic.length} issues`);
  console.log(`  - Bracket placeholders: ${arIssues.bracketPlaceholders.length} issues`);
  console.log(`  - Suspicious short values: ${arIssues.suspiciousShort.length} issues`);
  
  // Write detailed report
  const report = {
    timestamp: new Date().toISOString(),
    english: enIssues,
    arabic: arIssues
  };
  
  const reportsDir = path.resolve(__dirname, '..', '..', 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportPath = path.join(reportsDir, 'translation-issues.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  
  console.log(`\n[i18n] Detailed report saved to: ${reportPath}`);
}

try {
  main();
} catch (err) {
  console.error('[i18n] Error:', err && err.message ? err.message : err);
  process.exit(1);
}