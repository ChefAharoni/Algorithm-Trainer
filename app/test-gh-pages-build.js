/**
 * Test script for GitHub Pages build
 * This script verifies that the build output is valid for GitHub Pages deployment
 */

const fs = require('fs');
const path = require('path');

// Check if build directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist directory does not exist. Run build-static.js first.');
  process.exit(1);
}

// Check for essential files
const requiredFiles = ['index.html', 'assets'];
for (const file of requiredFiles) {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: ${file} not found in dist directory`);
    process.exit(1);
  }
}

// Check if index.html contains proper base href for GitHub Pages
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
if (!indexHtml.includes('<base href="/">') && !indexHtml.includes('<base href="./">')) {
  console.warn('⚠️ Warning: index.html does not contain a base href tag, which may cause routing issues on GitHub Pages');
}

// Look for client-side routing
if (indexHtml.includes('wouter') && !indexHtml.includes('hashRouter')) {
  console.warn('⚠️ Warning: You appear to be using wouter but not hashRouter. This may cause routing issues on GitHub Pages');
}

// Check if 404.html exists in the dist directory
const hasCustom404 = fs.existsSync(path.join(distDir, '404.html'));
if (!hasCustom404) {
  console.warn('⚠️ Warning: 404.html is missing. Consider adding one for better GitHub Pages experience');
}

// Check if the bundle size is reasonable
let totalSize = 0;
function calculateDirSize(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      calculateDirSize(filePath);
    } else {
      totalSize += stats.size;
    }
  }
}

calculateDirSize(distDir);
const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

if (totalSizeMB > 10) {
  console.warn(`⚠️ Warning: Bundle size is ${totalSizeMB}MB, which is quite large. Consider optimizing.`);
} else {
  console.log(`✅ Bundle size: ${totalSizeMB}MB`);
}

console.log('✅ GitHub Pages build check completed successfully!');
console.log('');
console.log('Note: This check does not guarantee that the site will work perfectly on GitHub Pages,');
console.log('      but it verifies the basic requirements for deployment.');
console.log('');
console.log('👨‍💻 To deploy to GitHub Pages, push to the main branch and GitHub Actions will handle the rest.');