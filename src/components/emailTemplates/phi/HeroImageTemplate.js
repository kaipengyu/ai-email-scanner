// Generate HTML for hero image section
export const generateHeroImageHtml = (data) => {
  if (!data) return '';
  
  return `<!-- BEGIN: Hero Image -->
<tr>
  <td align="center" class="disappear">
    <a href="${data.linkUrl || '#'}" target="_blank" style="display:block;">
      <img src="${data.imageUrl || 'https://placehold.co/600x300/png?text=Hero+Image'}" alt="${data.altText || 'Hero image'}" width="600" class="fluid-image" style="border-width:0;width:600px;height:auto;display:block;" border="0"/>
    </a>
  </td>
</tr>
<!-- END: Hero Image -->`;
};

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
