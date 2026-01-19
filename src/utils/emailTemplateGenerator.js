import {
  generateHeaderHtml,
  generateHeroImageHtml,
  generateTitleHtml,
  generateContentHtml,
  generateButtonHtml,
  generateFooterHtml,
  generateBaseTemplate
} from '../components/emailTemplates';

// Map section types to their generator functions
const sectionGenerators = {
  header: generateHeaderHtml,
  heroImage: generateHeroImageHtml,
  title: generateTitleHtml,
  content: generateContentHtml,
  button: generateButtonHtml,
  footer: generateFooterHtml
};

// Generate email HTML from component data
export const generateEmailHtml = (data) => {
  // Support both old format (for backwards compatibility) and new sections format
  if (data.sections && Array.isArray(data.sections)) {
    // New format: dynamic section ordering
    const bodyContent = data.sections
      .map(section => {
        const generator = sectionGenerators[section.type];
        if (!generator) {
          console.warn(`Unknown section type: ${section.type}`);
          return '';
        }
        return generator(section.data);
      })
      .filter(html => html) // Remove empty sections
      .join('\n');
    
    return generateBaseTemplate(bodyContent);
  } else {
    // Old format: fixed ordering (backwards compatibility)
    const headerHtml = generateHeaderHtml(data.header);
    const heroHtml = generateHeroImageHtml(data.heroImage);
    const titleHtml = generateTitleHtml(data.title);
    const contentHtml = generateContentHtml(data.content);
    const buttonHtml = generateButtonHtml(data.button);
    const footerHtml = generateFooterHtml(data.footer);

    const bodyContent = `${headerHtml}
${heroHtml}
${titleHtml}
${contentHtml}
${buttonHtml}
${footerHtml}`;

    return generateBaseTemplate(bodyContent);
  }
};
