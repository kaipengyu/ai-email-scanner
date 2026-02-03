// Component schema documentation for AI - template-specific
import { PHI_COMPONENT_SCHEMA } from './phiComponentSchema.js';
import { SMECO_COMPONENT_SCHEMA } from './smecoComponentSchema.js';

// Get the appropriate component schema based on template ID
export const getComponentSchema = (templateId) => {
  switch (templateId) {
    case 'smeco':
      return SMECO_COMPONENT_SCHEMA;
    case 'phi':
    default:
      return PHI_COMPONENT_SCHEMA;
  }
};

// Legacy export for backward compatibility (defaults to PHI)
export const COMPONENT_SCHEMA = PHI_COMPONENT_SCHEMA;
