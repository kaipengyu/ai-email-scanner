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
VITE_GEMINI_API_KEY=your_api_key_here
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
- Generates responsive HTML email templates
- Live preview
- Edit components in real-time
- Copy or download HTML

## Supported Email Components

- Header (promotional text, logo)
- Hero Image
- Title
- Content (multiple paragraphs)
- Button (call-to-action)
- Footer (company info, disclaimers)

## Tech Stack

- React 18
- Vite
- Google Gemini AI

## Deployment

Build the project and deploy the `dist` folder to any static hosting:

```bash
npm run build
```

Works with Vercel, Netlify, GitHub Pages, etc.
