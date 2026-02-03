// SMECO brand colors
const SMECO_COLORS = ['#00582F', '#FDB515', '#E5EEEA', '#363636', '#F2F2F2', '#ffffff', '#FFFFFF'];

// Check if a color is a valid SMECO brand color
const isSmecoColor = (color) => {
  if (!color) return false;
  return SMECO_COLORS.some(c => c.toLowerCase() === color.toLowerCase());
};

// Generate HTML for SMECO button section (bulletproof-style)
export const generateButtonHtml = (data) => {
  if (!data) return '';
  if (data.buttonHtml) return data.buttonHtml;

  // Use SMECO yellow for button unless a valid SMECO color is provided
  const buttonBackgroundColor = isSmecoColor(data.backgroundColor) ? data.backgroundColor : '#FDB515';
  const textColor = isSmecoColor(data.textColor) ? data.textColor : '#363636';
  const sectionBackgroundColor = isSmecoColor(data.sectionBackgroundColor) ? data.sectionBackgroundColor : '#ffffff';
  const borderRadius = parseInt(data.borderRadius, 10) || 50;

  const arcsize = borderRadius > 0 ? `${Math.min(99, Math.round((borderRadius / 40) * 100))}%` : '0%';

  return `<!-- BEGIN: Button Block -->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="${sectionBackgroundColor}" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:${sectionBackgroundColor};background-color:${sectionBackgroundColor};margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:${sectionBackgroundColor};background-color:${sectionBackgroundColor};width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:top;padding:0;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="padding-top:30px;padding-bottom:40px;">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.linkUrl || '#'}" style="height:42px;v-text-anchor:middle;width:200px;" arcsize="${arcsize}" stroke="f" fillcolor="${buttonBackgroundColor}">
                            <w:anchorlock/>
                            <center style="color:${textColor};font-family:Arial,sans-serif;font-size:18px;font-weight:bold;">${data.text || 'Get the Details'}</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="${data.linkUrl || '#'}" target="_blank" style="background-color:${buttonBackgroundColor};border-radius:${borderRadius}px;color:${textColor};display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;line-height:24px;text-align:center;text-decoration:none;padding:9px 36px;mso-padding-alt:0;-webkit-text-size-adjust:none;">
                            ${data.text || 'Get the Details'}
                          </a>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
</div>
<!--[if mso | IE]></td></tr></table><![endif]-->
<!-- END: Button Block -->`;
};

// Generate MJML for SMECO button section
export const generateButtonMjml = (data) => {
  if (!data) return '';
  if (data.buttonMjml) return data.buttonMjml;

  // Use SMECO yellow for button unless a valid SMECO color is provided
  const buttonBackgroundColor = isSmecoColor(data.backgroundColor) ? data.backgroundColor : '#FDB515';
  const textColor = isSmecoColor(data.textColor) ? data.textColor : '#363636';
  const sectionBackgroundColor = isSmecoColor(data.sectionBackgroundColor) ? data.sectionBackgroundColor : '#ffffff';
  const borderRadius = parseInt(data.borderRadius, 10) || 50;

  return `      <!-- BEGIN: Button Block -->
      <mj-section background-color="${sectionBackgroundColor}" padding="30px 40px 40px 40px">
        <mj-column>
          <mj-button
            background-color="${buttonBackgroundColor}"
            color="${textColor}"
            font-size="18px"
            font-weight="bold"
            border-radius="${borderRadius}px"
            href="${data.linkUrl || '#'}"
            align="center"
            padding="9px 36px"
          >
            ${data.text || 'Get the Details'}
          </mj-button>
        </mj-column>
      </mj-section>
      <!-- END: Button Block -->`;
};
