import {
  generateHeaderHtml,
  generateHeroImageHtml,
  generateTitleHtml,
  generateContentHtml,
  generateButtonHtml,
  generateFooterHtml,
  generateBaseTemplate,
  generateHeaderMjml,
  generateHeroImageMjml,
  generateTitleMjml,
  generateContentMjml,
  generateButtonMjml,
  generateFooterMjml,
  generateBaseTemplateMjml
} from '../components/emailTemplates';

// Map section types to their HTML generator functions
const sectionGeneratorsHtml = {
  header: generateHeaderHtml,
  heroImage: generateHeroImageHtml,
  title: generateTitleHtml,
  content: generateContentHtml,
  button: generateButtonHtml,
  footer: generateFooterHtml
};

// Map section types to their MJML generator functions
const sectionGeneratorsMjml = {
  header: generateHeaderMjml,
  heroImage: generateHeroImageMjml,
  title: generateTitleMjml,
  content: generateContentMjml,
  button: generateButtonMjml,
  footer: generateFooterMjml
};

// Generate email HTML from component data
export const generateEmailHtml = (data) => {
  // Support both old format (for backwards compatibility) and new sections format
  if (data.sections && Array.isArray(data.sections)) {
    // New format: dynamic section ordering
    const bodyContent = data.sections
      .map(section => {
        const generator = sectionGeneratorsHtml[section.type];
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

// Generate email MJML from component data
export const generateEmailMjml = (data) => {
  // Support both old format (for backwards compatibility) and new sections format
  if (data.sections && Array.isArray(data.sections)) {
    // New format: dynamic section ordering
    const bodyContent = data.sections
      .map(section => {
        const generator = sectionGeneratorsMjml[section.type];
        if (!generator) {
          console.warn(`Unknown section type: ${section.type}`);
          return '';
        }
        return generator(section.data);
      })
      .filter(mjml => mjml) // Remove empty sections
      .join('\n');
    
    return generateBaseTemplateMjml(bodyContent);
  } else {
    // Old format: fixed ordering (backwards compatibility)
    const headerMjml = generateHeaderMjml(data.header);
    const heroMjml = generateHeroImageMjml(data.heroImage);
    const titleMjml = generateTitleMjml(data.title);
    const contentMjml = generateContentMjml(data.content);
    const buttonMjml = generateButtonMjml(data.button);
    const footerMjml = generateFooterMjml(data.footer);

    const bodyContent = `${headerMjml}
${heroMjml}
${titleMjml}
${contentMjml}
${buttonMjml}
${footerMjml}`;

    return generateBaseTemplateMjml(bodyContent);
  }
};
