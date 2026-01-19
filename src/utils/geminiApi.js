import { COMPONENT_SCHEMA } from '../constants/componentSchema';

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
