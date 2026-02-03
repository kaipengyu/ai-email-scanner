// Export all email template generators organized by template type
import * as phiTemplates from './phi';
import * as smecoTemplates from './smeco';

// Template registry - maps template IDs to their generators
export const templateRegistry = {
  phi: phiTemplates,
  smeco: smecoTemplates,
};

// Get templates for a specific template ID
export const getTemplates = (templateId = 'phi') => {
  return templateRegistry[templateId] || templateRegistry.phi;
};

// Legacy exports for backwards compatibility (PHI as default)
export const {
  generateHeaderHtml,
  generateHeaderMjml,
  generateHeroImageHtml,
  generateHeroImageMjml,
  generateTitleHtml,
  generateTitleMjml,
  generateContentHtml,
  generateContentMjml,
  generateButtonHtml,
  generateButtonMjml,
  generateFooterHtml,
  generateFooterMjml,
  generateBaseTemplate,
  generateBaseTemplateMjml,
} = phiTemplates;
