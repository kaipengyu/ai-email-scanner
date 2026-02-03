// Brand guidelines for HTML email validation
import { TEMPLATES, getTemplateConfig, DEFAULT_TEMPLATE } from './templateConfig';

// Legacy exports for backwards compatibility (PHI defaults)
export const BRAND_COLORS = TEMPLATES.phi.brandColors;
export const BRAND_COLOR_VALUES = Object.values(BRAND_COLORS);
export const ALLOWED_FONTS = TEMPLATES.phi.allowedFonts;

export const BRAND_GUIDELINES = {
  colors: BRAND_COLORS,
  colorValues: BRAND_COLOR_VALUES,
  fonts: ALLOWED_FONTS,
};

// Template-specific brand guidelines
export const getBrandGuidelines = (templateId = DEFAULT_TEMPLATE) => {
  const config = getTemplateConfig(templateId);
  return {
    colors: config.brandColors,
    colorValues: Object.values(config.brandColors),
    fonts: config.allowedFonts,
  };
};

export const getBrandColorValues = (templateId = DEFAULT_TEMPLATE) => {
  const config = getTemplateConfig(templateId);
  return Object.values(config.brandColors);
};

export const getAllowedFonts = (templateId = DEFAULT_TEMPLATE) => {
  const config = getTemplateConfig(templateId);
  return config.allowedFonts;
};

export default BRAND_GUIDELINES;
