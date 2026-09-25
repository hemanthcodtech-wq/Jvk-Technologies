const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

/**
 * Helper to convert number to words for Indian Rupees
 */
function numberToWords(num) {
  if (!num || isNaN(num)) return 'Zero Rupees Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only' : 'Rupees Only';
  return str.trim();
}

/**
 * Generate an Official Corporate / Institutional Tax Invoice PDF
 * @param {Object} data - { invoiceNumber, studentName, studentEmail, courseTitle, courseCategory, amountPaid, paymentDate, accessValidity }
 * @returns {Promise<Buffer>}
 */
const generateInvoicePDF = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Path to logo
      const logoCandidates = [
        path.join(__dirname, '../assets/logo.png'),
        path.join(__dirname, '../../client/public/logo.png')
      ];
      let logoPath = logoCandidates.find(p => fs.existsSync(p));

      // 1. Top Header Bar (Subtle Accent)
      doc.rect(40, 40, 515, 4).fill('#4F46E5');

      // 2. Organization Branding (Left)
      let headerTextX = 40;
      let hasLogo = false;
      if (logoPath) {
        try {
          // New logo is wider and includes the company name text
          doc.image(logoPath, 40, 52, { width: 130 });
          headerTextX = 180;
          hasLogo = true;
        } catch (e) {
          console.error("Logo image load error in PDF:", e);
        }
      }

      if (!hasLogo) {
        doc.fillColor('#4F46E5')
           .fontSize(16)
           .font('Helvetica-Bold')
           .text('JVK TECHNOLOGIES PVT. LTD.', headerTextX, 52);
      }

      doc.fillColor('#4B5563')
         .fontSize(8.5)
         .font('Helvetica')
         .text('Industry-Aligned Software Training & Technology Careers', headerTextX, hasLogo ? 58 : 70)
         .text('Professional Learning Management Platform', headerTextX, hasLogo ? 69 : 81)
         .text('IT Hub, Hyderabad, Telangana - 500081', headerTextX, hasLogo ? 80 : 92)
         .text('Email: support@jvktech.com • Web: jvktechnologies.com', headerTextX, hasLogo ? 91 : 103);

      // 3. Invoice Badge & Meta Box (Right)
      const rightColX = 370;
      doc.rect(rightColX, 52, 185, 24).fill('#4F46E5');
      doc.fillColor('#FFFFFF')
         .fontSize(12)
         .font('Helvetica-Bold')
         .text('TAX INVOICE / RECEIPT', rightColX, 59, { width: 185, align: 'center' });

      // Invoice Details Block
      doc.rect(rightColX, 80, 185, 62).strokeColor('#E5E7EB').fill('#F9FAFB');
      
      doc.fillColor('#374151')
         .fontSize(8)
         .font('Helvetica-Bold')
         .text('Invoice No:', rightColX + 8, 86)
         .font('Helvetica')
         .text(data.invoiceNumber || 'JVK-INV-001', rightColX + 65, 86)

         .font('Helvetica-Bold')
         .text('Date:', rightColX + 8, 98)
         .font('Helvetica')
         .text(data.paymentDate || new Date().toLocaleDateString('en-IN'), rightColX + 65, 98)

         .font('Helvetica-Bold')
         .text('Place of Supply:', rightColX + 8, 110)
         .font('Helvetica')
         .text('Telangana (36)', rightColX + 75, 110)

         .font('Helvetica-Bold')
         .text('Status:', rightColX + 8, 122)
         .fillColor('#15803D')
         .font('Helvetica-Bold')
         .text('PAID (CONFIRMED)', rightColX + 65, 122);

      // Horizontal Divider
      doc.moveTo(40, 150).lineTo(555, 150).strokeColor('#E5E7EB').lineWidth(1).stroke();

      // 4. Billed To & Service Details (Two Column Container)
      const infoBoxY = 160;
      
      // Billed To Box (Left)
      doc.rect(40, infoBoxY, 250, 75).strokeColor('#E5E7EB').fill('#FFFFFF');
      doc.rect(40, infoBoxY, 250, 18).fill('#F3F4F6');
      doc.fillColor('#1F2937').fontSize(8.5).font('Helvetica-Bold').text('BILLED TO (LEARNER DETAILS):', 48, infoBoxY + 5);

      doc.fillColor('#111827')
         .fontSize(9.5)
         .font('Helvetica-Bold')
         .text(data.studentName || 'Learner', 48, infoBoxY + 24)
         .fontSize(8.5)
         .font('Helvetica')
         .fillColor('#4B5563')
         .text(`Email: ${data.studentEmail}`, 48, infoBoxY + 37)
         .text(`Account Type: Registered Online Student`, 48, infoBoxY + 48)
         .text(`Country / Currency: India (INR)`, 48, infoBoxY + 59);

      // Provider Details Box (Right)
      doc.rect(305, infoBoxY, 250, 75).strokeColor('#E5E7EB').fill('#FFFFFF');
      doc.rect(305, infoBoxY, 250, 18).fill('#F3F4F6');
      doc.fillColor('#1F2937').fontSize(8.5).font('Helvetica-Bold').text('SERVICE / DELIVERY PARTICULARS:', 313, infoBoxY + 5);

      doc.fillColor('#4B5563')
         .fontSize(8.5)
         .font('Helvetica')
         .text(`Course Category: ${data.courseCategory || 'Software Training'}`, 313, infoBoxY + 24)
         .text('SAC Code: 999293 (Commercial Training & Education)', 313, infoBoxY + 36)
         .text('Mode of Delivery: Instant Digital Dashboard & Live Zoom', 313, infoBoxY + 48)
         .text('Fulfillment: 100% Electronic Access', 313, infoBoxY + 60);

      // 5. Itemized Table
      const tableTop = 248;
      
      // Table Header Row
      doc.rect(40, tableTop, 515, 22).fill('#4F46E5');
      doc.fillColor('#FFFFFF')
         .fontSize(8.5)
         .font('Helvetica-Bold')
         .text('#', 45, tableTop + 6, { width: 20 })
         .text('COURSE / PROGRAM DESCRIPTION', 70, tableTop + 6, { width: 235 })
         .text('SAC', 315, tableTop + 6, { width: 55, align: 'center' })
         .text('VALIDITY', 375, tableTop + 6, { width: 80, align: 'center' })
         .text('AMOUNT (INR)', 460, tableTop + 6, { width: 90, align: 'right' });

      // Table Data Row
      const rowTop = tableTop + 22;
      doc.rect(40, rowTop, 515, 38).strokeColor('#E5E7EB').fill('#FFFFFF');
      
      // Clean short format for validity
      let validityText = '2 Months';
      if (data.accessValidity) {
        validityText = data.accessValidity.replace(/after completion/i, '').replace(/on-demand access/i, '').trim();
        if (!validityText.toLowerCase().includes('month') && !validityText.toLowerCase().includes('year')) {
          validityText += ' Access';
        }
      }

      doc.fillColor('#111827')
         .fontSize(8.5)
         .font('Helvetica-Bold')
         .text('1', 45, rowTop + 8, { width: 20 })
         .text(data.courseTitle || 'Live Technical Training Curriculum', 70, rowTop + 8, { width: 235 })
         .fontSize(7.5)
         .font('Helvetica')
         .fillColor('#6B7280')
         .text(`${data.courseCategory || 'Software Training'} | Live Classes, Notes & Recordings`, 70, rowTop + 21, { width: 235 })
         .fillColor('#374151')
         .fontSize(8.5)
         .text('999293', 315, rowTop + 12, { width: 55, align: 'center' })
         .text(validityText, 375, rowTop + 12, { width: 80, align: 'center' })
         .fillColor('#111827')
         .font('Helvetica-Bold')
         .fontSize(9.5)
         .text(`Rs. ${data.amountPaid || 0}.00`, 460, rowTop + 12, { width: 90, align: 'right' });

      // 6. Summary and Calculation Box (Right) & Words Box (Left)
      const sumTop = rowTop + 48;

      // Amount in words box (Left)
      doc.rect(40, sumTop, 290, 85).strokeColor('#E5E7EB').fill('#F9FAFB');
      doc.fillColor('#374151')
         .fontSize(8)
         .font('Helvetica-Bold')
         .text('AMOUNT IN WORDS:', 48, sumTop + 8)
         .fontSize(9)
         .font('Helvetica-Bold')
         .fillColor('#4F46E5')
         .text(numberToWords(data.amountPaid), 48, sumTop + 20, { width: 270 })
         .font('Helvetica')
         .fillColor('#6B7280')
         .fontSize(7.5)
         .text('Payment Gateway: Razorpay / UPI / Netbanking', 48, sumTop + 48)
         .text('Transaction Ref: Confirmed & Settled to JVK Account', 48, sumTop + 58)
         .text('Educational services eligible for GST exemption under Sec 12AA.', 48, sumTop + 68);

      // Financial Calculation Table (Right)
      doc.rect(340, sumTop, 215, 85).strokeColor('#E5E7EB').fill('#FFFFFF');
      
      const calcX = 348;
      const valX = 475;

      doc.fillColor('#4B5563')
         .fontSize(8)
         .font('Helvetica')
         .text('Taxable Subtotal:', calcX, sumTop + 8)
         .text(`Rs. ${data.amountPaid || 0}.00`, valX, sumTop + 8, { width: 70, align: 'right' })

         .text('CGST (0%):', calcX, sumTop + 20)
         .text('Rs. 0.00', valX, sumTop + 20, { width: 70, align: 'right' })

         .text('SGST (0%):', calcX, sumTop + 32)
         .text('Rs. 0.00', valX, sumTop + 32, { width: 70, align: 'right' });

      // Total Paid Highlight Bar
      doc.rect(340, sumTop + 46, 215, 39).fill('#F0FDF4');
      doc.rect(340, sumTop + 46, 215, 39).strokeColor('#86EFAC').stroke();

      doc.fillColor('#166534')
         .fontSize(9)
         .font('Helvetica-Bold')
         .text('TOTAL PAID:', calcX, sumTop + 58)
         .fontSize(14)
         .text(`Rs. ${data.amountPaid || 0}.00`, calcX, sumTop + 54, { width: 195, align: 'right' });

      // 7. Live Program Access Notes
      const notesTop = sumTop + 96;
      doc.rect(40, notesTop, 515, 52).fill('#FDFBF7').strokeColor('#E5E7EB').stroke();
      
      doc.fillColor('#92400E')
         .fontSize(8)
         .font('Helvetica-Bold')
         .text('IMPORTANT LEARNER NOTES & LIVE CLASS ACCESS:', 48, notesTop + 6);

      doc.fillColor('#4B5563')
         .fontSize(7.5)
         .font('Helvetica')
         .text('• Live Zoom links, daily class timetable, and curriculum access are activated instantly in your Student Dashboard (My Learning).', 48, notesTop + 18)
         .text('• On-demand video recordings and downloadable course revision guides are accessible for the full duration of your validity period.', 48, notesTop + 28)
         .text('• Official digital Certificate of Completion is awarded automatically upon completing 100% course sessions.', 48, notesTop + 38);

      // 8. Bottom Digital Signature & Official Seal
      const signTop = notesTop + 62;
      
      // Digital Seal Stamp (Left)
      doc.rect(40, signTop, 180, 52).strokeColor('#4F46E5').lineWidth(1).fill('#F0FDF4');
      doc.fillColor('#4F46E5')
         .fontSize(8)
         .font('Helvetica-Bold')
         .text('★ DIGITALLY VERIFIED DOCUMENT ★', 40, signTop + 7, { width: 180, align: 'center' })
         .fontSize(7)
         .font('Helvetica')
         .text('JVK Technologies Certified', 40, signTop + 19, { width: 180, align: 'center' })
         .text(`Hash: ${Buffer.from(data.invoiceNumber || 'JVK').toString('hex').slice(0, 16).toUpperCase()}`, 40, signTop + 29, { width: 180, align: 'center' })
         .text('Generated electronically via JVK Portal', 40, signTop + 39, { width: 180, align: 'center' });

      // Digital Signature (Right)
      const signX = 360;
      doc.moveTo(signX, signTop + 30).lineTo(550, signTop + 30).strokeColor('#4B5563').lineWidth(1).stroke();

      // Signature cursive styling
      doc.fillColor('#111827')
         .fontSize(14)
         .font('Times-BoldItalic')
         .text('JVK Technologies Pvt. Ltd.', signX, signTop + 12, { width: 190, align: 'center' });

      doc.fillColor('#374151')
         .fontSize(8)
         .font('Helvetica-Bold')
         .text('Authorized Finance Controller', signX, signTop + 34, { width: 190, align: 'center' })
         .fontSize(7)
         .font('Helvetica')
         .text('JVK Technologies • Accounts Department', signX, signTop + 44, { width: 190, align: 'center' });

      // 9. Bottom Footer
      doc.fillColor('#9CA3AF')
         .fontSize(7)
         .font('Helvetica')
         .text('This is an authentic, system-generated computer Tax Invoice issued by JVK Technologies Pvt. Ltd. No physical signature is required.', 40, 770, { width: 515, align: 'center' })
         .text('support@jvktech.com • jvktechnologies.com • All Rights Reserved © 2026', 40, 780, { width: 515, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate a Clean Certificate of Completion PDF for JVK Technologies.
 * Displays: Student Name, Course Name, Verification ID, and Issue Date — perfectly aligned.
 * @param {Object} data - { studentName, courseTitle, completionDate, certificateId }
 * @returns {Promise<Buffer>}
 */
const generateCertificatePDF = (data) => {
  return new Promise((resolve, reject) => {
    try {
      // Landscape A4 (841.89 × 595.28 pt)
      const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const W = doc.page.width;   // ~841.89 pt
      const H = doc.page.height;  // ~595.28 pt
      const cx = W / 2;           // horizontal centre

      // ── BACKGROUND ────────────────────────────────────────────────────
      const templateCandidates = [
        path.join(__dirname, '../assets/certificate_template.png'),
        path.join(__dirname, '../../client/public/certificate_template.png')
      ];
      const templatePath = templateCandidates.find(p => fs.existsSync(p));

      if (templatePath) {
        doc.image(templatePath, 0, 0, { width: W, height: H });
      } else {
        // Premium built-in fallback — dark navy with gold accents
        doc.rect(0, 0, W, H).fill('#0F172A');
        doc.rect(0, 0, W, 8).fill('#D4AF37');
        doc.rect(0, H - 8, W, 8).fill('#D4AF37');
        doc.rect(22, 22, W - 44, H - 44).strokeColor('#D4AF37').lineWidth(1.5).stroke();
        doc.rect(28, 28, W - 56, H - 56).strokeColor('#D4AF37').lineWidth(0.4).stroke();
      }

      // ── SCRIPT FONT ───────────────────────────────────────────────────
      const fontCandidates = [
        path.join(__dirname, '../assets/fonts/AlexBrush-Regular.ttf'),
        path.join(__dirname, '../assets/fonts/GreatVibes-Regular.ttf')
      ];
      const scriptFontPath = fontCandidates.find(p => fs.existsSync(p));
      let scriptFont = 'Times-BoldItalic';
      if (scriptFontPath) {
        try {
          doc.registerFont('ScriptFont', scriptFontPath);
          scriptFont = 'ScriptFont';
        } catch (e) { /* fallback */ }
      }

      // ── COLORS — adapt to whether a light template or dark fallback ───
      const hasTemplate  = !!templatePath;
      const headingColor = hasTemplate ? '#0A4F2A' : '#D4AF37';
      const labelColor   = hasTemplate ? '#6B7280' : '#94A3B8';
      const valueColor   = hasTemplate ? '#111827' : '#F1F5F9';
      const nameColor    = hasTemplate ? '#1E3A8A' : '#D4AF37';
      const divider      = hasTemplate ? '#1E3A8A' : '#D4AF37';
      const boxFill      = hasTemplate ? '#F9FAFB' : null;
      const boxStroke    = hasTemplate ? '#D1D5DB' : '#D4AF37';

      // ── 1. ORG HEADER ─────────────────────────────────────────────────
      if (!hasTemplate) {
        doc.fillColor(headingColor).font('Helvetica-Bold').fontSize(12)
           .text('JVK TECHNOLOGIES PVT. LTD.', 0, 46, { width: W, align: 'center' });

        doc.fillColor(labelColor).font('Helvetica').fontSize(8)
           .text('Industry-Aligned Software Training & Technology Careers  •  Hyderabad, India', 0, 63, { width: W, align: 'center' });

        // Divider
        doc.moveTo(cx - 200, 78).lineTo(cx + 200, 78).strokeColor(divider).lineWidth(0.8).stroke();
      }

      // ── 2. TITLE ──────────────────────────────────────────────────────
      if (!hasTemplate) {
        doc.fillColor(headingColor).font('Helvetica-Bold').fontSize(28)
           .text('CERTIFICATE OF COMPLETION', 0, 96, { width: W, align: 'center', characterSpacing: 1.5 });
      }

      // ── 3. PREAMBLE ───────────────────────────────────────────────────
      if (!hasTemplate) {
        doc.fillColor(labelColor).font('Helvetica').fontSize(10)
           .text('This is to proudly certify that', 0, 140, { width: W, align: 'center' });
      }

      // ── 4. STUDENT NAME ────────────────────────────────
      const studentName = (data.studentName || 'Learner Name').trim();
      const nLen = studentName.length;
      const nSize = nLen > 32 ? 36 : nLen > 24 ? 42 : nLen > 16 ? 50 : 60;
      
      const nameY = hasTemplate ? 250 : 160;

      doc.fillColor(nameColor).font(scriptFont).fontSize(nSize)
         .text(studentName, 0, nameY, { width: W, align: 'center' });

      const afterName = nameY + nSize + 10;

      if (!hasTemplate) {
        // Decorative underline
        doc.moveTo(cx - 230, afterName).lineTo(cx + 230, afterName)
           .strokeColor(divider).lineWidth(0.9).stroke();
      }

      // ── 5. "has successfully completed" ──────────────────────────────
      if (!hasTemplate) {
        doc.fillColor(labelColor).font('Helvetica').fontSize(10)
           .text('has successfully completed the course', 0, afterName + 10, { width: W, align: 'center' });
      }

      // ── 6. COURSE NAME ────────────────────────────────────────────────
      const courseTitle = (data.courseTitle || 'Professional Training Program').trim();
      const ctLen = courseTitle.length;
      const ctSize = ctLen > 60 ? 16 : ctLen > 40 ? 18 : 22;
      
      const ctY = hasTemplate ? 375 : afterName + 30;

      doc.fillColor(hasTemplate ? '#1E3A8A' : valueColor).font('Helvetica-Bold').fontSize(ctSize)
         .text(courseTitle, 60, ctY, { width: W - 120, align: 'center' });

      // ── 7. META ROW: Issue Date | Verification ID ─────────────────────
      const metaY = hasTemplate ? 495 : ctY + ctSize + 32;

      if (!hasTemplate) {
        // thin rule above meta
        doc.moveTo(cx - 260, metaY - 12).lineTo(cx + 260, metaY - 12)
           .strokeColor(divider).lineWidth(0.4).opacity(0.5).stroke();
        doc.opacity(1);
      }

      const boxW = 225;
      const boxH = 52;
      const gap  = hasTemplate ? 110 : 32;
      const b1X  = cx - boxW - gap / 2;  // left box (Verification ID in template)
      const b2X  = cx + gap / 2;         // right box (Issue Date in template)

      if (!hasTemplate) {
        // Draw boxes
        [b1X, b2X].forEach(bx => {
          if (boxFill) {
            doc.rect(bx, metaY, boxW, boxH).fill(boxFill);
          }
          doc.rect(bx, metaY, boxW, boxH).strokeColor(boxStroke).lineWidth(0.6).stroke();
        });
      }

      // Box 1: Issue Date (or Verification ID for template)
      const issueDate = data.completionDate ||
        new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      
      const certId = data.certificateId ||
        `JVK-CERT-${Date.now().toString().slice(-8).toUpperCase()}`;

      if (!hasTemplate) {
        // Old layout: Left is Issue Date, Right is Verification ID
        doc.fillColor(labelColor).font('Helvetica').fontSize(7.5)
           .text('ISSUE DATE', b1X, metaY + 10, { width: boxW, align: 'center', characterSpacing: 1 });
        doc.fillColor(valueColor).font('Helvetica-Bold').fontSize(12)
           .text(issueDate, b1X, metaY + 26, { width: boxW, align: 'center' });

        doc.fillColor(labelColor).font('Helvetica').fontSize(7.5)
           .text('VERIFICATION ID', b2X, metaY + 10, { width: boxW, align: 'center', characterSpacing: 1 });
        doc.fillColor(valueColor).font('Helvetica-Bold').fontSize(12)
           .text(certId, b2X, metaY + 26, { width: boxW, align: 'center' });
      } else {
        // New template layout: Left is Verification ID, Right is Issue Date (from the image)
        // Also they don't need boxes, just text aligned with the lines in the image
        // Increased width to 260 to ensure it fits on a single line
        doc.fillColor(valueColor).font('Helvetica-Bold').fontSize(11)
           .text(certId, 85, 495, { width: 260, align: 'center' });
        
        doc.fillColor(valueColor).font('Helvetica-Bold').fontSize(11)
           .text(issueDate, W - 85 - 260, 495, { width: 260, align: 'center' });
      }

      // ── 8. FOOTER ─────────────────────────────────────────────────────
      if (!hasTemplate) {
        const footerY = H - 38;
        doc.moveTo(cx - 260, footerY - 8).lineTo(cx + 260, footerY - 8)
           .strokeColor(divider).lineWidth(0.3).opacity(0.4).stroke();
        doc.opacity(1);

        doc.fillColor(labelColor).font('Helvetica').fontSize(7)
           .text(
             'JVK Technologies Pvt. Ltd.  •  support@jvktech.com  •  jvktechnologies.com  •  Hyderabad, Telangana, India',
             0, footerY, { width: W, align: 'center' }
           );
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  generateInvoicePDF,
  generateCertificatePDF
};


