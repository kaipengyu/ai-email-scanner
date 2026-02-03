// Generate the base HTML email structure for SMECO
export const generateBaseTemplate = (bodyContent) => {
  return `<!doctype html>
<html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title>SMECO</title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style type="text/css">
  #outlook a { padding:0; }
  body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
  table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
  img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
  p { display:block;margin:13px 0; }
</style>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
  <o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">
  .mj-outlook-group-fix { width:100% !important; }
</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900" rel="stylesheet" type="text/css" />
<style type="text/css">
  @import url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900);
</style>
<!--<![endif]-->
<style type="text/css">
  @media only screen and (min-width:600px) {
    .mj-column-per-100 { width:100% !important; max-width: 100%; }
  }
</style>
<style media="screen and (min-width:600px)">
  .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
</style>
<style type="text/css">
  @media only screen and (max-width:599px) {
    table.mj-full-width-mobile { width: 100% !important; }
    td.mj-full-width-mobile { width: auto !important; }
  }
</style>
<style type="text/css">
  @media screen and (max-width: 600px) {
    .padding-lr-30 {padding-left: 30px !important; padding-right: 30px !important}
    .respond {width: 100% !important; display:block !important;text-align:center !important;padding-bottom: 20px !important}
    .text-center {text-align: center !important}
    .text-center div{text-align: center !important}
  }
</style>
</head>
<body style="word-spacing:normal;background-color:#F2F2F2;">
<div aria-label="SMECO" aria-roledescription="email" style="background-color:#F2F2F2;" role="article" lang="und" dir="auto">
${bodyContent}
</div>
</body>
</html>`;
};

// Generate the base MJML email structure for SMECO
export const generateBaseTemplateMjml = (bodyContent) => {
  return `<mjml>
  <mj-head>
    <mj-title>SMECO Email</mj-title>
    <mj-preview>SMECO Email Preview</mj-preview>
    <mj-font name="Montserrat" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900" />
    <mj-attributes>
      <mj-all font-family="'Montserrat', Arial, Helvetica, sans-serif" />
      <mj-text font-family="Arial, Helvetica, sans-serif" />
    </mj-attributes>
    <mj-style>
      @media screen and (max-width: 600px) {
        .padding-lr-30 {padding-left: 30px !important; padding-right: 30px !important}
        .respond {width: 100% !important; display:block !important;text-align:center !important;padding-bottom: 20px !important}
        .text-center {text-align: center !important}
        .text-center div{text-align: center !important}
        .pad-right-zero {padding-right: 0 !important}
        .pad-right-zero img {margin: 0 auto !important}
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#F2F2F2">
    <mj-wrapper background-color="#ffffff" padding="0">
${bodyContent}
    </mj-wrapper>
  </mj-body>
</mjml>`;
};
