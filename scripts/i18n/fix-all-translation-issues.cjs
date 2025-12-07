
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
  // More comprehensive key format detection
  return (
    // Contains dots (nested keys)
    /\w+\.\w+/.test(text) ||
    // CamelCase without spaces
    (/[a-z][A-Z]/.test(text) && !text.includes(' ')) ||
    // Snake_case
    /_/.test(text) ||
    // All lowercase single word longer than reasonable
    (/^[a-z]+$/.test(text) && text.length > 10)
  );
}

function isBracketPlaceholder(text) {
  if (typeof text !== 'string') return false;
  return /^\[.+\]$/.test(text);
}

function keyToHumanReadable(key) {
  // If it's already a sentence or contains spaces (except specific patterns), return as is
  if (key.includes(' ') && !key.includes('.') && !key.includes('_')) {
    return key;
  }
  
  // Extract the last part if it's a dotted key
  const lastPart = key.includes('.') ? key.split('.').pop() : key;
  
  // Handle special cases
  const specialCases = {
    'url': 'URL',
    'api': 'API',
    'id': 'ID',
    'seo': 'SEO',
    'ssl': 'SSL',
    'dns': 'DNS',
    'ftp': 'FTP',
    'http': 'HTTP',
    'https': 'HTTPS',
    'faq': 'FAQ',
    'vat': 'VAT',
    'gst': 'GST',
    'kpi': 'KPI',
    'roi': 'ROI',
    'crm': 'CRM',
    'erp': 'ERP',
    'csv': 'CSV',
    'pdf': 'PDF',
    'xml': 'XML',
    'json': 'JSON'
  };
  
  // Convert to human readable
  let humanReadable = lastPart
    // Handle camelCase and PascalCase
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    // Handle snake_case
    .replace(/_/g, ' ')
    // Handle dots
    .replace(/\./g, ' ')
    // Normalize spaces
    .replace(/\s+/g, ' ')
    .trim();
  
  // Split into words for processing
  let words = humanReadable.split(' ');
  
  // Process each word
  words = words.map((word, index) => {
    const lowerWord = word.toLowerCase();
    
    // Check for special cases
    if (specialCases[lowerWord]) {
      return specialCases[lowerWord];
    }
    
    // Capitalize first letter of first word, rest lowercase
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    
    // Keep certain words lowercase
    const lowercaseWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    if (lowercaseWords.includes(lowerWord)) {
      return lowerWord;
    }
    
    // Otherwise capitalize first letter
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return words.join(' ');
}

function removeBrackets(text) {
  if (typeof text !== 'string') return text;
  if (isBracketPlaceholder(text)) {
    // Remove brackets and convert the inner text
