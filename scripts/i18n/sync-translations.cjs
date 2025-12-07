'use strict';

const fs = require('fs');
const path = require('path');

const SEP = '§§';

const enPath = path.resolve(__dirname, '..', '..', 'public', 'locales', 'en', 'translation.json');
const arPath = path.resolve(__dirname, '..', '..', 'public', 'locales', 'ar', 'translation.json');
const reportsDir = path.resolve(__dirname, '..', '..', 'reports');

function isPlainObject(val) { return val !== null && typeof val === 'object' && !Array.isArray(val); }

function collectMissingPaths(target, source, prefix = []) {
  let missing = [];
  if (!isPlainObject(source)) return missing;
  const srcKeys = Object.keys(source);
  for (const key of srcKeys) {
    const sVal = source[key];
    const hasKey = Object.prototype.hasOwnProperty.call(target, key);
    if (!hasKey) {
      // Add all leaf paths under this subtree
      missing = missing.concat(listAllLeafPaths(sVal, prefix.concat(key)));
      continue;
    }
    const tVal = target[key];
    if (isPlainObject(sVal) && isPlainObject(tVal)) {
      missing = missing.concat(collectMissingPaths(tVal, sVal, prefix.concat(key)));
    } else if (isPlainObject(sVal) && !isPlainObject(tVal)) {
      // Type mismatch - treat the whole subtree as missing
      missing = missing.concat(listAllLeafPaths(sVal, prefix.concat(key)));
    } else if (!isPlainObject(sVal) && isPlainObject(tVal)) {
      // Source is leaf but target has object - treat leaf as missing path
      missing.push(prefix.concat(key).join(SEP));
    } else {
      // both leaves: if key exists, not missing
    }
  }
  return missing;
}

function listAllLeafPaths(node, prefix = []) {
  if (!isPlainObject(node)) {
    return [prefix.join(SEP)];
  }
  let out = [];
  const keys = Object.keys(node);
  if (keys.length === 0) {
    // empty object treated as leaf
    out.push(prefix.join(SEP));
    return out;
  }
  for (const k of keys) {
    out = out.concat(listAllLeafPaths(node[k], prefix.concat(k)));
  }
  return out;
}

function applyMissing(target, source) {
  if (!isPlainObject(source) || !isPlainObject(target)) return;
  for (const key of Object.keys(source)) {
    const sVal = source[key];
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      // Deep clone to avoid cross-references
      target[key] = cloneDeep(sVal);
      continue;
    }
    const tVal = target[key];
    if (isPlainObject(sVal) && isPlainObject(tVal)) {
      applyMissing(tVal, sVal);
    } else if (isPlainObject(sVal) && !isPlainObject(tVal)) {
      // Replace mismatched leaf with object to include all subkeys
      target[key] = cloneDeep(sVal);
    } else if (!isPlainObject(sVal) && isPlainObject(tVal)) {
      // Keep the object in target; do not overwrite, but ensure leaf key exists - already exists as object
      // Nothing to do
    } else {
      // both leaves present - do nothing
    }
  }
}

function cloneDeep(val) {
  if (Array.isArray(val)) return val.map(cloneDeep);
  if (isPlainObject(val)) {
    const out = {};
    for (const k of Object.keys(val)) out[k] = cloneDeep(val[k]);
    return out;
  }
  return val;
}

function readJson(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  return JSON.parse(raw);
}

function writeJson(fp, obj) {
  const json = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(fp, json, 'utf8');
}

function toHumanPath(p) { return p.split(SEP).join('.'); }

function main() {
  const args = new Set(process.argv.slice(2));
  const doApply = args.has('--apply');
  const doReportOnly = args.has('--report') || !doApply;

  console.log('[i18n] Loading translation files...');
  const enObj = readJson(enPath);
  const arObj = readJson(arPath);

  console.log('[i18n] Computing missing keys (this may take a moment)...');
  const missingInEn = collectMissingPaths(enObj, arObj, []);
  const missingInAr = collectMissingPaths(arObj, enObj, []);

  const report = {
    timestamp: new Date().toISOString(),
    totals: {
      missingInEn: missingInEn.length,
      missingInAr: missingInAr.length
    },
    samples: {
      missingInEn: missingInEn.slice(0, 200).map(toHumanPath),
      missingInAr: missingInAr.slice(0, 200).map(toHumanPath)
    }
  };

  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  const reportPath = path.join(reportsDir, 'i18n-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf8');

  console.log(`[i18n] Missing in EN: ${report.totals.missingInEn}`);
  console.log(`[i18n] Missing in AR: ${report.totals.missingInAr}`);
  console.log(`[i18n] Report written to: ${reportPath}`);

  if (doApply) {
    console.log('[i18n] Applying missing keys to both files...');
    // Fill in both directions
    applyMissing(enObj, arObj);
    applyMissing(arObj, enObj);

    writeJson(enPath, enObj);
    writeJson(arPath, arObj);

    console.log('[i18n] Files updated successfully.');
  } else {
    console.log('[i18n] Dry run only. Use "--apply" to write changes.');
  }

  console.log('[i18n] Done.');
}

try {
  main();
} catch (err) {
  console.error('[i18n] Error:', err && err.message ? err.message : err);
  process.exit(1);
}