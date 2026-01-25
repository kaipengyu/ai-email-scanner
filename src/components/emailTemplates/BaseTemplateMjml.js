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
    </mj-style>
  </mj-head>
  <mj-body background-color="#EEEEEE">
    <mj-wrapper background-color="#ffffff" padding="0">
${bodyContent}
    </mj-wrapper>
  </mj-body>
</mjml>`;
};
