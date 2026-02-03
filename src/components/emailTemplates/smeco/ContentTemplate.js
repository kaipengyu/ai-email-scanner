// SMECO brand colors
const SMECO_COLORS = ['#00582F', '#FDB515', '#E5EEEA', '#363636', '#F2F2F2', '#ffffff', '#FFFFFF'];

// Check if a color is a valid SMECO brand color
const isSmecoColor = (color) => {
  if (!color) return false;
  return SMECO_COLORS.some(c => c.toLowerCase() === color.toLowerCase());
};

// Generate HTML for SMECO content section
export const generateContentHtml = (data) => {
  if (!data) return '';

  // Use SMECO text color unless a valid SMECO color is provided
  const textColor = isSmecoColor(data.textColor) ? data.textColor : '#363636';
  const backgroundColor = isSmecoColor(data.backgroundColor) ? data.backgroundColor : '#ffffff';
  const textAlign = data.textAlign || 'left';

  return `<!-- BEGIN: Content Block -->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="${backgroundColor}" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:${backgroundColor};background-color:${backgroundColor};margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:${backgroundColor};background-color:${backgroundColor};width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:top;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td align="${textAlign}" class="padding-lr-30" style="font-size:0px;padding:20px 40px 0;word-break:break-word;">
                            <div style="font-family:Arial, Helvetica, sans-serif;font-size:16px;line-height:24px;text-align:${textAlign};color:${textColor};">${data.textHtml || data.text || ''}</div>
                          </td>
                        </tr>
                      </tbody>
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
<!-- END: Content Block -->`;
};

// Generate MJML for SMECO content section
export const generateContentMjml = (data) => {
  if (!data) return '';

  // Use SMECO text color unless a valid SMECO color is provided
  const textColor = isSmecoColor(data.textColor) ? data.textColor : '#363636';
  const backgroundColor = isSmecoColor(data.backgroundColor) ? data.backgroundColor : '#ffffff';
  const textAlign = data.textAlign || 'left';

  return `      <!-- BEGIN: Content Block -->
      <mj-section background-color="${backgroundColor}" padding="20px 40px 0 40px">
        <mj-column>
          <mj-text
            font-size="16px"
            line-height="24px"
            font-weight="normal"
            color="${textColor}"
            font-family="Arial, Helvetica, sans-serif"
            align="${textAlign}"
            padding="0"
          >
            ${data.textMjml || data.text || ''}
          </mj-text>
        </mj-column>
      </mj-section>
      <!-- END: Content Block -->`;
};
