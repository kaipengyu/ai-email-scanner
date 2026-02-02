// Generate HTML for button section (bulletproof-style per https://buttons.cm/)
export const generateButtonHtml = (data) => {
  if (!data) return '';
  if (data.buttonHtml) return data.buttonHtml;

  const buttonBackgroundColor = data.backgroundColor || '#6e06c1';
  const textColor = data.textColor || '#ffffff';
  const sectionBackgroundColor = data.sectionBackgroundColor || '#ffffff';
  const borderColor = data.borderColor || buttonBackgroundColor;
  const width = parseInt(data.width, 10) || 240;
  const height = parseInt(data.height, 10) || 50;
  const borderRadius = parseInt(data.borderRadius, 10) || 40;
  const backgroundImage = data.backgroundImage?.trim() || '';

  const arcsize = borderRadius > 0 ? `${Math.min(99, Math.round((borderRadius / 40) * 100))}%` : '0%';

  const linkStyle = [
    `border: 1px solid ${borderColor}`,
    `border-radius: ${borderRadius}px`,
    `color: ${textColor}`,
    'display: inline-block',
    'font-family: sans-serif',
    'font-size: 18px',
    'font-weight: bold',
    `line-height: ${height}px`,
    'text-align: center',
    'text-decoration: none',
    `width: ${width}px`,
    '-webkit-text-size-adjust: none',
    'mso-hide: all'
  ];
  if (backgroundImage) {
    linkStyle.unshift(`background-image: url(${backgroundImage})`, `background-color: ${buttonBackgroundColor}`);
  } else {
    linkStyle.unshift(`background-color: ${buttonBackgroundColor}`);
  }

  const vmlFill = backgroundImage
    ? `<v:fill type="tile" src="${backgroundImage}" color="${buttonBackgroundColor}" />`
    : '';

  const vmlAttrs = backgroundImage
    ? `style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arcsize}" strokecolor="${borderColor}" fill="t"`
    : `style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arcsize}" strokecolor="${borderColor}" fillcolor="${buttonBackgroundColor}"`;

  return `<!-- BEGIN: Button Block -->
<tr>
  <td align="center" class="mobilepadd" bgcolor="${sectionBackgroundColor}" style="width: 220px; padding-top: 30px; padding-bottom: 30px; background-color: ${sectionBackgroundColor};">
    <table role="button" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <div>
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.linkUrl || '#'}" ${vmlAttrs}>
                ${vmlFill}
                <w:anchorlock/>
                <center style="color:${textColor};font-family:sans-serif;font-size:18px;font-weight:bold;">${data.text || 'Click Here'}</center>
              </v:roundrect>
              <![endif]-->
              <a class="cta-button-link" href="${data.linkUrl || '#'}" style="${linkStyle.join('; ')}" target="_blank">${data.text || 'Click Here'}</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Button Block -->`;
};
