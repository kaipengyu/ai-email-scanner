import { getTemplates } from '../components/emailTemplates';
import { DEFAULT_TEMPLATE } from '../constants/templateConfig';

// Get section generators for a specific template
const getSectionGenerators = (templateId = DEFAULT_TEMPLATE) => {
  const templates = getTemplates(templateId);

  const htmlGenerators = {
    header: templates.generateHeaderHtml,
    heroImage: templates.generateHeroImageHtml,
    title: templates.generateTitleHtml,
    content: templates.generateContentHtml,
    button: templates.generateButtonHtml,
    footer: templates.generateFooterHtml,
  };

  const mjmlGenerators = {
    header: templates.generateHeaderMjml,
    heroImage: templates.generateHeroImageMjml,
    title: templates.generateTitleMjml,
    content: templates.generateContentMjml,
    button: templates.generateButtonMjml,
    footer: templates.generateFooterMjml,
  };

  // Add iconsSection if available (SMECO template has this)
  if (templates.generateIconsSectionHtml) {
    htmlGenerators.iconsSection = templates.generateIconsSectionHtml;
    mjmlGenerators.iconsSection = templates.generateIconsSectionMjml;
  }

  // Add infoBox if available (PHI template has this)
  if (templates.generateInfoBoxHtml) {
    htmlGenerators.infoBox = templates.generateInfoBoxHtml;
    mjmlGenerators.infoBox = templates.generateInfoBoxMjml;
  }

  return {
    html: htmlGenerators,
    mjml: mjmlGenerators,
    baseHtml: templates.generateBaseTemplate,
    baseMjml: templates.generateBaseTemplateMjml,
  };
};

// Generate email HTML from component data
export const generateEmailHtml = (data, templateId = DEFAULT_TEMPLATE) => {
  const generators = getSectionGenerators(templateId);
  const sectionGeneratorsHtml = generators.html;
  const generateBaseTemplate = generators.baseHtml;

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
    const headerHtml = sectionGeneratorsHtml.header(data.header);
    const heroHtml = sectionGeneratorsHtml.heroImage(data.heroImage);
    const titleHtml = sectionGeneratorsHtml.title(data.title);
    const contentHtml = sectionGeneratorsHtml.content(data.content);
    const buttonHtml = sectionGeneratorsHtml.button(data.button);
    const footerHtml = sectionGeneratorsHtml.footer(data.footer);

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
export const generateEmailMjml = (data, templateId = DEFAULT_TEMPLATE) => {
  const generators = getSectionGenerators(templateId);
  const sectionGeneratorsMjml = generators.mjml;
  const generateBaseTemplateMjml = generators.baseMjml;

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
    const headerMjml = sectionGeneratorsMjml.header(data.header);
    const heroMjml = sectionGeneratorsMjml.heroImage(data.heroImage);
    const titleMjml = sectionGeneratorsMjml.title(data.title);
    const contentMjml = sectionGeneratorsMjml.content(data.content);
    const buttonMjml = sectionGeneratorsMjml.button(data.button);
    const footerMjml = sectionGeneratorsMjml.footer(data.footer);

    const bodyContent = `${headerMjml}
${heroMjml}
${titleMjml}
${contentMjml}
${buttonMjml}
${footerMjml}`;

    return generateBaseTemplateMjml(bodyContent);
  }
};
