// Generate HTML for button section
export const generateButtonHtml = (data) => {
  if (!data) return '';
  
  const buttonBackgroundColor = data.backgroundColor || '#6e06c1';
  const textColor = data.textColor || '#ffffff';
  const sectionBackgroundColor = data.sectionBackgroundColor || '#ffffff';
  
  return `<!-- BEGIN: Button Block -->
<tr>
  <td align="center" class="mobilepadd" bgcolor="${sectionBackgroundColor}" style="width: 220px; padding-top: 30px; padding-bottom: 30px; background-color: ${sectionBackgroundColor};">
    <table role="button" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <div>
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.linkUrl || '#'}" style="height:50px;v-text-anchor:middle;width:240px;" arcsize="80%" strokecolor="${buttonBackgroundColor}" fillcolor="${buttonBackgroundColor}">
                <w:anchorlock/>
                <center style="color:${textColor};font-family:sans-serif;font-size:18px;font-weight:bold;">${data.text || 'Click Here'}</center>
              </v:roundrect>
              <![endif]-->
              <a href="${data.linkUrl || '#'}" style="background-color: ${buttonBackgroundColor}; border:1px solid ${buttonBackgroundColor}; border-radius: 40px; color: ${textColor}; display: inline-block; font-family: sans-serif; font-size: 18px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 240px;-webkit-text-size-adjust: none; mso-hide: all;" target="_blank">${data.text || 'Click Here'}</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Button Block -->`;
};
