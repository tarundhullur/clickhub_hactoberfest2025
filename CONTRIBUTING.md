# Contributing to ClickHub 🎃

Thank you for your interest in contributing to ClickHub! This document provides detailed guidelines for contributing your button designs to our Hacktoberfest 2025 showcase.

## 🚀 Quick Checklist

Before you start, make sure you have:
- [ ] A GitHub account
- [ ] Node.js 18+ installed
- [ ] Basic knowledge of HTML/CSS/JavaScript or React
- [ ] A creative button idea!

## 📋 Contribution Process

### 1. Setup Your Environment

```bash
# Fork the repository on GitHub first!
git clone https://github.com/MRIEnan/clickhub_hactoberfest2025.git
cd clickhub
npm install
npm run dev
```

### 2. Create Your Contribution Folder

```bash
mkdir contributions/your-github-username
cd contributions/your-github-username
```

### 3. Required Files

Every contribution MUST include:

#### `index.js` (Required)
```javascript
const buttonMetadata = {
  name: "Your Awesome Button",
  author: "your-github-username", 
  description: "What makes your button special?",
  type: "react", // "react", "html", or "vanilla"
  tags: ["hover", "animation", "gradient"],
  difficulty: "intermediate", // "beginner", "intermediate", "advanced"
  preview: "Short preview description"
};

export default buttonMetadata;
```

### 4. Implementation Options

Choose ONE of these approaches:

#### Option A: React Component (Recommended)
Create `button.jsx` or `button.tsx`:

```jsx
'use client';
import { useState } from 'react';

export default function YourButton() {
  // Your component logic here
  return (
    <button className="your-styles">
      Your Button Content
    </button>
  );
}
```

#### Option B: HTML + CSS + JS
Create these three files:

**`button.html`:**
```html
<button class="your-button-class">
  Your Button Content
</button>
```

**`button.css`:**
```css
.your-button-class {
  /* Your styles here */
}
```

**`button.js`:**
```javascript
// Your JavaScript functionality
```

### 5. Optional Documentation

Create `README.md` to explain your button:

```markdown
# Your Button Name

Brief description of your button and what makes it unique.

## Features
- Feature 1
- Feature 2

## Technologies Used
- Technology 1
- Technology 2

## Inspiration
What inspired your design?
```

## 🎨 Design Standards

### Accessibility Requirements
- Minimum 4.5:1 color contrast ratio
- Keyboard navigation support (tab, enter, space)
- Screen reader friendly
- Focus indicators

### Technical Requirements
- No external dependencies (except React hooks)
- No external API calls
- File size under 50KB total
- Works in modern browsers

### Visual Guidelines
- Responsive design (works on mobile)
- Clear interactive states (hover, focus, active)
- Smooth animations (< 500ms)
- Professional appearance

## 🏷️ Tagging System

Use descriptive tags in your `index.js`:

**Animation Tags:**
- `animation`, `transition`, `keyframes`, `bounce`, `pulse`, `spin`

**Style Tags:**
- `gradient`, `shadow`, `border`, `rounded`, `flat`, `3d`

**Effect Tags:**
- `hover`, `glow`, `ripple`, `fade`, `slide`, `flip`

**Theme Tags:**
- `dark`, `light`, `neon`, `retro`, `modern`, `minimal`, `glassmorphism`

**Technology Tags:**
- `css3`, `flexbox`, `grid`, `transform`, `clip-path`

## 🔍 Testing Your Contribution

### Local Testing
```bash
npm run dev
# Visit http://localhost:3000
```

### Checklist Before Submitting
- [ ] Button appears in the showcase
- [ ] All animations work smoothly
- [ ] Responsive on mobile devices
- [ ] Accessible with keyboard navigation
- [ ] No console errors
- [ ] Follows naming conventions

## 📤 Submission Process

### 1. Commit Your Changes
```bash
git add .
git commit -m "Add [ButtonName] button by [username]

- Brief description of the button
- Key features or animations
- Technology used (React/HTML/CSS/JS)"
```

### 2. Push to Your Fork
```bash
git push origin main
```

### 3. Create Pull Request
- Go to your fork on GitHub
- Click "New Pull Request"
- Use the provided PR template
- Include screenshots/GIFs if possible

### 4. PR Requirements
Your PR title should follow this format:
```
Add [ButtonName] by @username
```

PR description should include:
- What your button does
- Technologies used
- Any special features
- Screenshot or GIF (optional but appreciated)

## 🚫 What Not to Include

### Prohibited Content
- Offensive, discriminatory, or inappropriate material
- Copyrighted content without permission
- Political or religious content
- Spam or promotional content

### Technical Restrictions
- No external dependencies (beyond provided ones)
- No server-side code
- No database connections
- No file system access
- No cryptocurrency/blockchain integration

## 🏆 Recognition

Great contributions may be featured:
- In our README showcase
- On social media
- In Hacktoberfest highlights

## 🆘 Getting Help

**Need help?**
- Check our [examples](../contributions/)
- Review existing [issues](https://github.com/MRIEnan/clickhub_hactoberfest2025/issues)
- Create a new issue with the "help wanted" label
- Join our community discussions

**Common Issues:**
- **Button not showing**: Check your `index.js` export
- **Styles not working**: Ensure CSS class names are unique
- **TypeScript errors**: Use `.jsx` instead of `.tsx` if needed

## 🎉 After Your PR is Merged

Congratulations! 🎊 Your button is now part of ClickHub!

- Share your contribution on social media
- Add ClickHub to your portfolio
- Consider contributing more buttons
- Help review other contributions

---

**Happy Contributing! 🚀**

Remember: This is about learning, sharing, and having fun. Don't worry if you're new to this - everyone starts somewhere!