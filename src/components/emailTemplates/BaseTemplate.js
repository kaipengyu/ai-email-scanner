// Generate the base HTML email structure
export const generateBaseTemplate = (bodyContent) => {
  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">
<head>
<title>Email Template</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
body, html { margin: 0; padding: 0; background-color: #EEEEEE; font-family: Arial, Helvetica, sans-serif; }
table { border-spacing: 0; }
.mobile { width: 600px; max-width: 600px; }
.mobilepadd { padding-left: 30px; padding-right: 30px; }
@media screen and (max-width: 600px) {
  .mobile { width: 100% !important; max-width: 100% !important; }
  .mobilepadd { padding-left: 30px !important; padding-right: 30px !important; }
  .fluid-image { width: 100% !important; height: auto !important; }
  .disappear { display: none !important; }
  .show-mb { display: block !important; width: 100% !important; max-height: none !important; overflow: visible !important; }
}
@media (prefers-color-scheme: dark) {
  .cta-button-link,
  table[role="button"] a { color: #ffffff !important; }
}
[data-ogsc] .cta-button-link,
[data-ogsc] table[role="button"] a { color: #ffffff !important; }
</style>
</head>
<body style="width:100%; padding:0px; margin:0 auto; background: #EEEEEE;">

<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tbody>
    <tr>
      <td align="center" bgcolor="#EEEEEE" style="text-align: center; padding: 15px 0 0;">
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 600px; max-width: 600px;" width="600" bgcolor="#ffffff">
          <tbody>
${bodyContent}
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

</body>
</html>`;
};

// Generate the base MJML email structure
export const generateBaseTemplateMjml = (bodyContent) => {
  return `<mjml>
  <mj-head>
    <mj-title>Email Template</mj-title>
    <mj-preview>Email Template Preview</mj-preview>
    <mj-attributes>
      <mj-section css-class="header-section" />
      <mj-section css-class="footer-section" />
      <mj-section css-class="button-section" />
    </mj-attributes>
    <mj-style>
      /* Force left alignment - target all table cells in header/footer */
      table.header-section td,
      table.footer-section td,
      .header-section td,
      .footer-section td,
      td.header-section,
      td.footer-section {
        text-align: left !important;
      }
      /* Override center alignment attribute */
      td[align="center"].header-section,
      td[align="center"].footer-section {
        text-align: left !important;
      }
      /* Force center alignment for button sections */
      .button-section table,
      .button-section td {
        text-align: center !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      .button-section a {
        margin: 0 auto !important;
        display: block !important;
      }
      @media (prefers-color-scheme: dark) {
        .button-section a { color: #ffffff !important; }
      }
      [data-ogsc] .button-section a { color: #ffffff !important; }
    </mj-style>
  </mj-head>
  <mj-body background-color="#EEEEEE">
    <mj-wrapper background-color="#ffffff" padding="0">
${bodyContent}
    </mj-wrapper>
  </mj-body>
</mjml>`;
};
