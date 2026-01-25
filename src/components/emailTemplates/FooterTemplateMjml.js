// Generate MJML for footer section
export const generateFooterMjml = (data) => {
  if (!data) return '';
  
  const backgroundColor = data.backgroundColor || '#eeeeee';
  
  return `      <!-- BEGIN: Footer -->
      <mj-section padding="30px 15px" css-class="footer-section">
        <mj-column>
          <mj-image 
            src="https://placehold.co/143x50/png?text=Logo" 
            alt="${data.companyName || 'Company'} logo" 
            width="143px"
            align="left"
            padding="0"
          />
        </mj-column>
      </mj-section>
      
      <mj-section padding="0 55px 20px 55px" css-class="footer-section">
        <mj-column>
          <mj-text 
            font-size="10px" 
            line-height="14px" 
            color="#333132" 
            font-family="Arial, Helvetica, sans-serif"
            align="left"
            padding="0"
          >
            ${data.disclaimerTextMjml || data.disclaimerText || ''}
          </mj-text>
        </mj-column>
      </mj-section>
      
      <mj-section background-color="${backgroundColor}" padding="20px 30px 40px 30px" css-class="footer-section">
        <mj-column>
          <mj-text 
            font-size="12px" 
            color="#333132" 
            font-family="Arial, Helvetica, sans-serif"
            align="left"
            padding="0"
          >
            <p style="margin:0;">To unsubscribe or manage your subscriptions, please click <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">here</a>.</p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;"><a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Terms of Use</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Privacy Policy</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">View in Browser</a></p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;">${data.companyName || ''}</p>
            <p style="margin:0;">${data.companyAddress || ''}</p>
            <p style="margin:0;">© ${data.companyName || ''}, ${data.copyrightYear || '2026'}</p>
          </mj-text>
        </mj-column>
      </mj-section>
      <!-- END: Footer -->`;
};
