// Generate MJML for hero image section
export const generateHeroImageMjml = (data) => {
  if (!data) return '';
  
  return `      <!-- BEGIN: Hero Image -->
      <mj-section padding="0">
        <mj-column>
          <mj-image 
            src="${data.imageUrl || 'https://placehold.co/600x300/png?text=Hero+Image'}" 
            alt="${data.altText || 'Hero image'}" 
            width="600px"
            padding="0"
            href="${data.linkUrl || '#'}"
          />
        </mj-column>
      </mj-section>
      <!-- END: Hero Image -->`;
};
