import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId, filename = 'resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Export element not found');
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  // Handle multi-page
  let heightLeft = pdfHeight;
  let page = 1;
  while (heightLeft > pdf.internal.pageSize.getHeight()) {
    heightLeft -= pdf.internal.pageSize.getHeight();
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, -(pdf.internal.pageSize.getHeight() * page), pdfWidth, pdfHeight);
    page++;
  }

  pdf.save(filename);
}
