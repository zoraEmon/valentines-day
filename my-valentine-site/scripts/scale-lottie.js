// scripts/scale-lottie.js (ES module)
import fs from 'fs';
import path from 'path';

if (process.argv.length < 4) {
  console.error('Usage: node scale-lottie.js <scale> <input.json> [output.json]');
  process.exit(1);
}
const scale = Number(process.argv[2]);
const inPath = process.argv[3];
const outPath = process.argv[4] || inPath.replace(/\.json$/, `.scaled.json`);

function isNumber(n){ return typeof n === 'number' && !Number.isNaN(n); }

function scaleValue(key, val){
  // keys that represent coordinates or sizes we want to scale
  const coordKeys = new Set(['w','h','p','a','v','i','o','pt','x','y','ks','tr']);
  if (Array.isArray(val)) {
    // array of numbers (e.g. [x,y] or [x,y,z]) -> scale each numeric entry unless it's a percent scale (handled by key 's')
    if (val.every(isNumber)) {
      return val.map((n,idx) => n * scale);
    }
    // array of arrays (e.g. path points)
    return val.map(item => {
      if (Array.isArray(item) && item.every(isNumber)) return item.map(n=>n*scale);
      if (typeof item === 'object' && item !== null) return walk(item);
      return item;
    });
  }
  if (isNumber(val)) {
    // Top-level width/height or plain numeric coordinate
    return val * scale;
  }
  if (typeof val === 'object' && val !== null) return walk(val);
  return val;
}

function walk(obj){
  if (Array.isArray(obj)) return obj.map(v => walk(v));
  const out = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)){
    const v = obj[k];
    // Do NOT scale arrays named 's' (they are percent scale), and do not scale frame indices or fr/ip/op
    if (k === 's' || k === 'fr' || k === 'ip' || k === 'op' || k === 'nm' || k === 'nm' || k === 'hd' || k === 'bm' ) {
      out[k] = v;
      continue;
    }

    // If key indicates point data or shapes, scale recursively with heuristics:
    if (k === 'w' || k === 'h') {
      out[k] = isNumber(v) ? v * scale : v;
      continue;
    }

    if (k === 'k' && Array.isArray(v) && v.length && v.every(isNumber)) {
      // often a direct coord array
      out[k] = v.map(n => n * scale);
      continue;
    }

    // For path objects: v, i, o are arrays of points
    if ((k === 'v' || k === 'i' || k === 'o') && Array.isArray(v)) {
      out[k] = v.map(pt => Array.isArray(pt) ? pt.map(n => isNumber(n) ? n * scale : n) : pt);
      continue;
    }

    // generic handling
    if (Array.isArray(v)) {
      out[k] = v.map(item => {
        if (Array.isArray(item) && item.every(isNumber)) return item.map(n=>n*scale);
        if (typeof item === 'object' && item !== null) return walk(item);
        if (isNumber(item)) return item * scale;
        return item;
      });
      continue;
    }

    if (typeof v === 'object' && v !== null) {
      out[k] = walk(v);
      continue;
    }

    if (isNumber(v)) {
      // last-resort: scale plain numbers that look like coords
      out[k] = v * scale;
      continue;
    }

    out[k] = v;
  }
  return out;
}

const raw = fs.readFileSync(inPath, 'utf8');
const json = JSON.parse(raw);

// scale top-level w/h if present
if (isNumber(json.w)) json.w = json.w * scale;
if (isNumber(json.h)) json.h = json.h * scale;

// Walk entire structure
const scaled = walk(json);

// backup original
const backup = inPath + '.bak';
if (!fs.existsSync(backup)) fs.copyFileSync(inPath, backup);

fs.writeFileSync(outPath, JSON.stringify(scaled, null, 0), 'utf8');
console.log('Wrote', outPath, '(backup:', backup, ')');