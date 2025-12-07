'use strict';

const fs = require('fs');
const path = require('path');

const enPath = path.resolve(__dirname, '..', '..', 'public', 'locales', 'en', 'translation.json');
const arPath = path.resolve(__dirname, '..', '..', 'public', 'locales', 'ar', 'translation.json');

function isPlainObject(val) { 
  return val !== null && typeof val === 'object' && !Array.isArray(val); 
}

function isKeyFormat(text) {
  if (typeof text !== 'string') return false;
  // Check if text looks like a key (contains dots or underscores, camelCase, etc.)
  return /^[\w\.\_\-]+$/.test(text) && text.includes('.');
}

function keyToHumanReadable(key) {
  // Convert key format to human readable
  const lastPart = key.split('.').pop();
  
  // Convert camelCase/PascalCase to space separated
  let humanReadable = lastPart
    .replace(/([A-Z])/g, ' $1') // Add space before capitals
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim()
    .toLowerCase();
  
  // Capitalize first letter
  humanReadable = humanReadable.charAt(0).toUpperCase() + humanReadable.slice(1);
  
  return humanReadable;
}

function fixKeyBasedTranslations(obj, targetLang, prefix = []) {
  if (!isPlainObject(obj)) return obj;
  
  const fixed = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const fullKey = prefix.concat(key).join('.');
    
    if (isPlainObject(value)) {
      fixed[key] = fixKeyBasedTranslations(value, targetLang, prefix.concat(key));
    } else if (typeof value === 'string') {
      // Check if value looks like a key format
      if (isKeyFormat(value)) {
        if (targetLang === 'en') {
          // Convert to human readable English
          fixed[key] = keyToHumanReadable(value);
        } else if (targetLang === 'ar') {
          // For Arabic, add brackets to indicate needs translation
          fixed[key] = `[${keyToHumanReadable(value)}]`;
        } else {
          fixed[key] = value;
        }
      } else {
        fixed[key] = value;
      }
    } else {
      fixed[key] = value;
    }
  }
  
  return fixed;
}

function readJson(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  return JSON.parse(raw);
}

function writeJson(fp, obj) {
  const json = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(fp, json, 'utf8');
}

function countKeyFormats(obj) {
  let count = 0;
  
  function traverse(node) {
    if (isPlainObject(node)) {
      for (const value of Object.values(node)) {
        traverse(value);
      }
    } else if (typeof node === 'string' && isKeyFormat(node)) {
      count++;
    }
  }
  
  traverse(obj);
  return count;
}

function main() {
  console.log('[i18n] Loading translation files...');
  let enObj = readJson(enPath);
  let arObj = readJson(arPath);
  
  // Count key-formatted values before fix
  const enKeysBefore = countKeyFormats(enObj);
  const arKeysBefore = countKeyFormats(arObj);
  
  console.log(`[i18n] Found ${enKeysBefore} key-formatted values in EN file`);
  console.log(`[i18n] Found ${arKeysBefore} key-formatted values in AR file`);
  
  if (enKeysBefore === 0 && arKeysBefore === 0) {
    console.log('[i18n] No key-formatted values found. Files are already clean.');
    return;
  }
  
  console.log('[i18n] Fixing key-based translations in English file...');
  enObj = fixKeyBasedTranslations(enObj, 'en');
  
  console.log('[i18n] Fixing key-based translations in Arabic file...');
  arObj = fixKeyBasedTranslations(arObj, 'ar');
  
  // Count key-formatted values after fix
  const enKeysAfter = countKeyFormats(enObj);
  const arKeysAfter = countKeyFormats(arObj);
  
  console.log('[i18n] Writing fixed files...');
  writeJson(enPath, enObj);
  writeJson(arPath, arObj);
  
  console.log('[i18n] Translation files fixed successfully!');
  console.log(`[i18n] EN: Fixed ${enKeysBefore - enKeysAfter} key-formatted values`);
  console.log(`[i18n] AR: Fixed ${arKeysBefore - arKeysAfter} key-formatted values`);
  
  if (enKeysAfter > 0 || arKeysAfter > 0) {
    console.log(`[i18n] Warning: ${enKeysAfter + arKeysAfter} key-formatted values remain unfixed.`);
  }
}

try {
  main();
} catch (err) {
  console.error('[i18n] Error:', err && err.message ? err.message : err);
  process.exit(1);
}