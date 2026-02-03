// Validation schema for HTML email validation - template-specific
import { PHI_VALIDATION_PROMPT } from './phiValidationSchema';
import { SMECO_VALIDATION_PROMPT } from './smecoValidationSchema';
import { DEFAULT_TEMPLATE } from './templateConfig';

export const VALIDATION_CATEGORIES = {
  BROKEN_LINKS: 'broken-links',
  ALT_TAGS: 'alt-tags',
  BRAND_COLORS: 'brand-colors',
  FONTS: 'fonts',
  BROKEN_CODE: 'broken-code',
  W3C_REQUIREMENTS: 'w3c-requirements',
};

export const SEVERITY_LEVELS = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Get the appropriate validation prompt based on template ID
export const getValidationPrompt = (templateId = DEFAULT_TEMPLATE) => {
  switch (templateId) {
    case 'smeco':
      return SMECO_VALIDATION_PROMPT;
    case 'phi':
    default:
      return PHI_VALIDATION_PROMPT;
  }
};

// Legacy export for backwards compatibility (defaults to PHI)
export const VALIDATION_PROMPT = PHI_VALIDATION_PROMPT;

export default VALIDATION_PROMPT;
