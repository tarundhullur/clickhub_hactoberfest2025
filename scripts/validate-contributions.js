#!/usr/bin/env node

/**
 * Validation script for button contributions
 * Checks that all contributions follow the required structure
 */

const fs = require('fs');
const path = require('path');

const contributionsDir = path.join(__dirname, '../contributions');
const requiredFiles = ['index.js'];
const optionalFiles = ['button.jsx', 'button.tsx', 'button.html', 'button.css', 'button.js', 'README.md'];

function validateContribution(contributorDir) {
  const contributorPath = path.join(contributionsDir, contributorDir);
  const errors = [];
  const warnings = [];

  // Check if it's a directory
  if (!fs.lstatSync(contributorPath).isDirectory()) {
    return { errors: [`${contributorDir} is not a directory`], warnings: [] };
  }

  // Check for required files
  requiredFiles.forEach(file => {
    const filePath = path.join(contributorPath, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing required file: ${file}`);
    } else {
      // Validate index.js structure
      if (file === 'index.js') {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          if (!content.includes('export default') && !content.includes('module.exports')) {
            errors.push('index.js must export button metadata');
          }
          if (!content.includes('name') || !content.includes('author') || !content.includes('type')) {
            warnings.push('index.js should include name, author, and type fields');
          }
        } catch (err) {
          errors.push(`Error reading index.js: ${err.message}`);
        }
      }
    }
  });

  // Check for at least one implementation file
  const hasReactComponent = fs.existsSync(path.join(contributorPath, 'button.jsx')) || 
                            fs.existsSync(path.join(contributorPath, 'button.tsx'));
  const hasHtmlComponent = fs.existsSync(path.join(contributorPath, 'button.html'));
  
  if (!hasReactComponent && !hasHtmlComponent) {
    errors.push('Missing button implementation (button.jsx, button.tsx, or button.html)');
  }

  // If has HTML, check for CSS
  if (hasHtmlComponent && !fs.existsSync(path.join(contributorPath, 'button.css'))) {
    warnings.push('HTML button should include button.css for styling');
  }

  // Check file sizes
  const files = fs.readdirSync(contributorPath);
  files.forEach(file => {
    const filePath = path.join(contributorPath, file);
    const stats = fs.statSync(filePath);
    if (stats.size > 50 * 1024) { // 50KB limit
      warnings.push(`File ${file} is larger than 50KB (${Math.round(stats.size / 1024)}KB)`);
    }
  });

  return { errors, warnings };
}

function main() {
  console.log('🔍 Validating button contributions...\n');

  if (!fs.existsSync(contributionsDir)) {
    console.error('❌ Contributions directory not found');
    process.exit(1);
  }

  const contributors = fs.readdirSync(contributionsDir)
    .filter(item => {
      const itemPath = path.join(contributionsDir, item);
      return fs.lstatSync(itemPath).isDirectory() && !item.startsWith('.');
    });

  if (contributors.length === 0) {
    console.log('📝 No contributions found yet. Ready for the first contribution!');
    return;
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  contributors.forEach(contributor => {
    const { errors, warnings } = validateContribution(contributor);
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`✅ ${contributor} - All good!`);
    } else {
      console.log(`\n📁 ${contributor}:`);
      
      errors.forEach(error => {
        console.log(`  ❌ ${error}`);
        totalErrors++;
      });
      
      warnings.forEach(warning => {
        console.log(`  ⚠️  ${warning}`);
        totalWarnings++;
      });
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Contributors: ${contributors.length}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Validation failed. Please fix the errors above.');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n⚠️  Validation passed with warnings. Consider addressing them.');
  } else {
    console.log('\n🎉 All contributions are valid!');
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateContribution };