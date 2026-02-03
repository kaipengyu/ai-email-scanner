// Template configurations for different brands

export const TEMPLATES = {
  phi: {
    id: 'phi',
    name: 'PHI',
    description: 'Pepco Holdings Inc. email templates',
    brandColors: {
      primary: '#14016c',
      secondary: '#160569',
      tertiary: '#170d67',
      accent: '#6e06c1',
      background: '#eeeeee',
    },
    allowedFonts: ['Arial', 'Helvetica', 'sans-serif'],
  },
  smeco: {
    id: 'smeco',
    name: 'SMECO',
    description: 'Southern Maryland Electric Cooperative email templates',
    brandColors: {
      primary: '#00582F',
      secondary: '#FDB515',
      tertiary: '#E5EEEA',
      text: '#363636',
      background: '#F2F2F2',
      white: '#ffffff',
    },
    allowedFonts: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif'],
  },
};

export const DEFAULT_TEMPLATE = 'phi';

export const getTemplateConfig = (templateId) => {
  return TEMPLATES[templateId] || TEMPLATES[DEFAULT_TEMPLATE];
};

export const getTemplateList = () => {
  return Object.values(TEMPLATES).map(({ id, name, description }) => ({
    id,
    name,
    description,
  }));
};

export default TEMPLATES;
