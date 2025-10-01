import fs from 'fs';
import path from 'path';

export interface ButtonMetadata {
  name: string;
  author: string;
  description: string;
  type: 'react' | 'html' | 'vanilla';
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  preview?: string;
}

export interface ButtonContribution {
  metadata: ButtonMetadata;
  html?: string;
  css?: string;
  js?: string;
  reactCode?: string;
  folderPath: string;
  importPath?: string; // Relative path for dynamic imports
}

/**
 * Load a single button from a folder structure
 */
async function loadSingleButton(buttonPath: string, contributor: string, contributions: ButtonContribution[]) {
  try {
    const indexPath = path.join(buttonPath, 'index.js');
    
    if (!fs.existsSync(indexPath)) {
      console.warn(`Missing index.js in ${buttonPath}`);
      return;
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    
    let metadata: ButtonMetadata | null = null;
    
    try {
      // Extract metadata using regex to avoid eval
      const nameMatch = indexContent.match(/name:\s*["']([^"']+)["']/);
      const authorMatch = indexContent.match(/author:\s*["']([^"']+)["']/);
      const descriptionMatch = indexContent.match(/description:\s*["']([^"']+)["']/);
      const typeMatch = indexContent.match(/type:\s*["']([^"']+)["']/);
      const difficultyMatch = indexContent.match(/difficulty:\s*["']([^"']+)["']/);
      const tagsMatch = indexContent.match(/tags:\s*\[([^\]]+)\]/);
      
      if (nameMatch) {
        metadata = {
          name: nameMatch[1],
          author: authorMatch ? authorMatch[1] : contributor,
          description: descriptionMatch ? descriptionMatch[1] : '',
          type: typeMatch ? typeMatch[1] as 'react' | 'html' | 'vanilla' : 'html',
          difficulty: difficultyMatch ? difficultyMatch[1] as 'beginner' | 'intermediate' | 'advanced' : 'beginner',
          tags: tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/["']/g, '')) : []
        };
      }
    } catch (parseError) {
      console.warn(`Could not parse metadata for ${buttonPath}:`, parseError);
      return;
    }
    
    if (!metadata || !metadata.name) {
      console.warn(`Invalid metadata in ${buttonPath}`);
      return;
    }

    // Calculate import path relative to contributions folder
    const contributionsIndex = buttonPath.indexOf('contributions');
    const importPath = contributionsIndex !== -1 
      ? buttonPath.substring(contributionsIndex + 'contributions'.length).replace(/\\/g, '/').replace(/^\//, '')
      : undefined;

    const contribution: ButtonContribution = {
      metadata: {
        ...metadata,
        author: metadata.author || contributor,
      },
      folderPath: buttonPath,
      importPath,
    };

    // Load React component code
    const reactPath = path.join(buttonPath, 'button.jsx');
    const reactTsPath = path.join(buttonPath, 'button.tsx');
    
    if (fs.existsSync(reactPath)) {
      contribution.metadata.type = 'react';
      contribution.reactCode = fs.readFileSync(reactPath, 'utf-8');
    } else if (fs.existsSync(reactTsPath)) {
      contribution.metadata.type = 'react';
      contribution.reactCode = fs.readFileSync(reactTsPath, 'utf-8');
    }
    
    // Load HTML/CSS/JS files
    const htmlPath = path.join(buttonPath, 'button.html');
    const cssPath = path.join(buttonPath, 'button.css');
    const jsPath = path.join(buttonPath, 'button.js');
    
    if (fs.existsSync(htmlPath)) {
      contribution.metadata.type = contribution.metadata.type || 'html';
      contribution.html = fs.readFileSync(htmlPath, 'utf-8');
      
      if (fs.existsSync(cssPath)) {
        contribution.css = fs.readFileSync(cssPath, 'utf-8');
      }
      
      if (fs.existsSync(jsPath)) {
        contribution.js = fs.readFileSync(jsPath, 'utf-8');
      }
    }

    contributions.push(contribution);
  } catch (error) {
    console.error(`Error loading button from ${buttonPath}:`, error);
  }
}

/**
 * Load multiple buttons from the new structure (contributor/button-name/index.js + files)
 */
async function loadMultipleButtons(contributorPath: string, contributor: string, contributions: ButtonContribution[]) {
  try {
    const buttonFolders = fs.readdirSync(contributorPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const buttonFolder of buttonFolders) {
      const buttonPath = path.join(contributorPath, buttonFolder);
      await loadSingleButton(buttonPath, contributor, contributions);
    }
  } catch (error) {
    console.error(`Error loading multiple buttons from ${contributor}:`, error);
  }
}

/**
 * Loads all button contributions from the contributions directory
 * This runs at build time to discover all contributor folders
 */
export async function loadButtonContributions(): Promise<ButtonContribution[]> {
  const contributions: ButtonContribution[] = [];

  try {
    const contributionsPath = path.join(process.cwd(), 'contributions');
    
    if (!fs.existsSync(contributionsPath)) {
      console.warn('Contributions directory not found');
      return [];
    }

    const contributors = fs.readdirSync(contributionsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const contributor of contributors) {
      const contributorPath = path.join(contributionsPath, contributor);
      
      // Check if this is the old structure (direct button files)
      const oldIndexPath = path.join(contributorPath, 'index.js');
      const oldButtonFiles = ['button.jsx', 'button.tsx', 'button.html'].some(file => 
        fs.existsSync(path.join(contributorPath, file))
      );
      
      if (fs.existsSync(oldIndexPath) && oldButtonFiles) {
        // Handle old structure (single button per contributor)
        await loadSingleButton(contributorPath, contributor, contributions);
      } else {
        // Handle new structure (multiple buttons per contributor)
        await loadMultipleButtons(contributorPath, contributor, contributions);
      }
    }
  } catch (error) {
    console.error('Error scanning contributions directory:', error);
  }

  return contributions;
}

/**
 * Client-side utility to get button contributions
 * This uses pre-built data from the server
 */
export function getButtonContributions(): Promise<ButtonContribution[]> {
  // In a real implementation, this would fetch from an API route
  // For now, we'll use static data that gets built at compile time
  return Promise.resolve([]);
}

/**
 * Generate static paths for dynamic routes (if needed)
 */
export async function getButtonContributionPaths() {
  const contributions = await loadButtonContributions();
  return contributions.map((contribution) => ({
    params: { username: contribution.metadata.author },
  }));
}