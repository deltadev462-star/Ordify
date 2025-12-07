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
  // Check if the text contains Arabic characters
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text);
}

function isEnglish(text) {
  if (typeof text !== 'string') return false;
  // Check if the text contains only ASCII and common punctuation
  const englishPattern = /^[\u0020-\u007E\u00A0-\u00FF]+$/;
  return englishPattern.test(text) && !isArabic(text);
}

function cleanTranslations(obj, targetLang) {
  if (!isPlainObject(obj)) return obj;
  
  const cleaned = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    
    if (isPlainObject(value)) {
      cleaned[key] = cleanTranslations(value, targetLang);
    } else if (typeof value === 'string') {
      if (targetLang === 'en' && isArabic(value)) {
        // Replace Arabic text in English file with key as placeholder
        cleaned[key] = key.split('.').pop().replace(/_/g, ' ');
      } else if (targetLang === 'ar' && isEnglish(value) && !isArabic(value)) {
        // Replace English text in Arabic file with key as placeholder
        cleaned[key] = `[${key.split('.').pop()}]`;
      } else {
        cleaned[key] = value;
      }
    } else {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
}

function readJson(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  return JSON.parse(raw);
}

function writeJson(fp, obj) {
  const json = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(fp, json, 'utf8');
}

function main() {
  console.log('[i18n] Loading translation files...');
  let enObj = readJson(enPath);
  let arObj = readJson(arPath);
  
  console.log('[i18n] Cleaning English translations...');
  enObj = cleanTranslations(enObj, 'en');
  
  console.log('[i18n] Cleaning Arabic translations...');
  arObj = cleanTranslations(arObj, 'ar');
  
  console.log('[i18n] Writing cleaned files...');
  writeJson(enPath, enObj);
  writeJson(arPath, arObj);
  
  console.log('[i18n] Translation files cleaned successfully!');
  console.log('[i18n] Arabic text in English file has been replaced with placeholders');
  console.log('[i18n] English text in Arabic file has been replaced with placeholders');
}

try {
  main();
} catch (err) {
  console.error('[i18n] Error:', err && err.message ? err.message : err);
  process.exit(1);
}