import { COMPONENT_SCHEMA } from '../constants/componentSchema';
import { VALIDATION_PROMPT } from '../constants/validationSchema';

// Analyze PDF with Gemini AI
export const analyzeWithGemini = async (file, apiKey) => {
  if (!file) {
    throw new Error('Please upload a PDF file first');
  }

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API to your .env file');
  }

  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: COMPONENT_SCHEMA + '\n\nPlease analyze this email design PDF and generate the JSON configuration for the email components. Return ONLY the JSON object, no additional text or markdown formatting.',
              },
              {
                inline_data: {
                  mime_type: 'application/pdf',
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to analyze PDF');
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textContent) {
    throw new Error('No response from AI');
  }

  let jsonString = textContent;
  if (textContent.includes('```')) {
    const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1].trim();
    }
  }

  const parsedData = JSON.parse(jsonString);
  return parsedData;
};

// Validate HTML with Gemini AI
export const validateHtmlWithGemini = async (htmlContent, apiKey) => {
  if (!htmlContent) {
    throw new Error('Please provide HTML content to validate');
  }

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API to your .env file');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: VALIDATION_PROMPT + '\n\nHTML to validate:\n\n' + htmlContent,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to validate HTML');
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textContent) {
    throw new Error('No response from AI');
  }

  let jsonString = textContent.trim();

  // Remove markdown code blocks if present
  if (jsonString.includes('```')) {
    // Try to extract JSON from code block
    const jsonMatch = jsonString.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1].trim();
    } else {
      // Fallback: just remove the backticks
      jsonString = jsonString.replace(/```json\s*/g, '').replace(/```/g, '').trim();
    }
  }

  // Find the JSON object boundaries if there's extra text
  const firstBrace = jsonString.indexOf('{');
  const lastBrace = jsonString.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    jsonString = jsonString.slice(firstBrace, lastBrace + 1);
  }

  const parsedData = JSON.parse(jsonString);

  // Filter out false positives where original and suggested are identical
  if (parsedData.issues && Array.isArray(parsedData.issues)) {
    parsedData.issues = parsedData.issues.filter(issue => {
      const original = (issue.originalCode || '').trim();
      const suggested = (issue.suggestedCode || '').trim();
      // Remove issues where there's no actual change
      return original !== suggested && suggested !== '';
    });
    // Update summary counts
    if (parsedData.summary) {
      parsedData.summary.totalIssues = parsedData.issues.length;
    }
  }

  return parsedData;
};
