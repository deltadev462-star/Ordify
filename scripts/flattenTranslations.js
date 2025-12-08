import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function flattenJSON(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenJSON(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

// Get locale from command line argument
const locale = process.argv[2] || 'ar';

try {
  // Read the translation file for the specified locale
  const filePath = join(__dirname, '..', 'public', 'locales', locale, 'translation.json');
  const fileContent = readFileSync(filePath, 'utf8');
  const translations = JSON.parse(fileContent);
  
  // Flatten the JSON structure
  const flattened = flattenJSON(translations);
  
  // Sort keys alphabetically
  const sortedFlattened = {};
  Object.keys(flattened).sort().forEach(key => {
    sortedFlattened[key] = flattened[key];
  });
  
  // Write back the flattened structure
  writeFileSync(filePath, JSON.stringify(sortedFlattened, null, 2), 'utf8');
  
  console.log(`✅ Successfully flattened ${locale}/translation.json`);
  console.log(`📊 Total keys: ${Object.keys(sortedFlattened).length}`);
} catch (error) {
  console.error('❌ Error flattening translations:', error.message);
  process.exit(1);
}