# AI Email Scanner

Transform PDF email designs into HTML email templates using AI.

## Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Set up API key**
```bash
cp .env.example .env
```
Add your Google Gemini API key to `.env`:
```
VITE_GEMINI_API=your_api_key_here
```
Get your API key: https://aistudio.google.com/app/apikey

3. **Run dev server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## Features

- Upload PDF email designs (drag & drop)
- AI analysis using Google Gemini
- **Dynamic section ordering** - Preserves exact sequence from PDF
- **Adjustable styling per section**:
  - Background colors (white, purple, gray, etc.)
  - Text alignment (left, center, right)
  - Text colors
- Generates responsive HTML email templates
- Live preview
- Edit all components in real-time
- Copy or download HTML

## Supported Email Components

Each component supports customizable styling:

- **Header** - Promotional text + logo with adjustable background color
- **Hero Image** - Full-width banner/hero image
- **Title** - Headlines with color, background, and alignment controls
- **Content** - Text sections with color, background, and alignment controls (can appear multiple times)
- **Button** - Call-to-action with button color and section background
- **Footer** - Company info with adjustable background (typically gray)

## Tech Stack

- React 18
- Vite
- Google Gemini AI

## Project Architecture

The codebase is organized into a modular structure for maintainability and scalability:

### 📁 Directory Structure

```
src/
├── components/
│   ├── emailTemplates/        # HTML email template generators
│   │   ├── HeaderTemplate.js
│   │   ├── HeroImageTemplate.js
│   │   ├── TitleTemplate.js
│   │   ├── ContentTemplate.js
│   │   ├── ButtonTemplate.js
│   │   ├── FooterTemplate.js
│   │   ├── BaseTemplate.js    # Base HTML wrapper
│   │   └── index.js           # Template exports
│   ├── FileUploadZone.jsx     # File upload UI component
│   ├── EmailPreview.jsx       # Email preview iframe
│   ├── ComponentDataEditor.jsx # Form for editing email data
│   └── ResultsSection.jsx     # Results display orchestrator
├── utils/
│   ├── geminiApi.js           # Gemini AI integration
│   └── emailTemplateGenerator.js # HTML generation orchestrator
├── constants/
│   └── componentSchema.js     # AI prompt schema
├── EmailScanner.jsx           # Main component (state management)
└── EmailScanner.css           # Styles
```

### 🔄 Data Flow

```
1. User uploads PDF
   ↓
2. geminiApi.js
   • Converts PDF to base64
   • Sends to Gemini AI with schema prompt
   • Returns structured JSON with DYNAMIC section ordering:
     {
       "sections": [
         { "type": "header", "data": {...} },
         { "type": "heroImage", "data": {...} },
         { "type": "content", "data": {backgroundColor: "#fff", textAlign: "left", ...} },
         { "type": "button", "data": {sectionBackgroundColor: "#fff", ...} },
         { "type": "content", "data": {backgroundColor: "#E4E1F0", textAlign: "center", ...} },
         { "type": "footer", "data": {backgroundColor: "#eeeeee", ...} }
       ]
     }
   • Preserves exact section sequence from PDF
   • Each section includes styling (backgroundColor, textAlign)
   ↓
3. emailTemplateGenerator.js
   • Iterates through sections array in order
   • Calls appropriate template generator for each section type
   • Each template generates its HTML section with styling:
     - HeaderTemplate.js → header HTML
     - HeroImageTemplate.js → hero HTML
     - TitleTemplate.js → title HTML (with bg color & alignment)
     - ContentTemplate.js → content HTML (with bg color & alignment)
     - ButtonTemplate.js → button HTML (with section bg)
     - FooterTemplate.js → footer HTML (with bg color)
   • Combines sections in sequence
   • Wraps in BaseTemplate.js (full HTML document)
   ↓
4. ResultsSection.jsx
   • Displays preview (EmailPreview.jsx)
   • Provides editor (ComponentDataEditor.jsx)
   • Offers copy/download actions
```

### 🎯 Key Design Principles

1. **Single Responsibility**: Each file has one clear purpose
2. **Modularity**: Email templates are independent and reusable
3. **Separation of Concerns**: UI components separate from business logic
4. **Easy Testing**: Each module can be tested independently
5. **Maintainability**: Changes to one section don't affect others

### 🔧 How to Add a New Email Component

1. Create a new template in `src/components/emailTemplates/`:
```javascript
// NewSectionTemplate.js
export const generateNewSectionHtml = (data) => {
  if (!data) return '';
  return `<!-- Your HTML here -->`;
};
```

2. Export it in `src/components/emailTemplates/index.js`:
```javascript
export { generateNewSectionHtml } from './NewSectionTemplate';
```

3. Use it in `src/utils/emailTemplateGenerator.js`:
```javascript
import { generateNewSectionHtml } from '../components/emailTemplates';

export const generateEmailHtml = (data) => {
  const newSectionHtml = generateNewSectionHtml(data.newSection);
  // ... add to bodyContent
};
```

4. Update the schema in `src/constants/componentSchema.js` to include the new component

## Deployment

Build the project and deploy the `dist` folder to any static hosting:

```bash
npm run build
```

Works with Vercel, Netlify, GitHub Pages, etc.
