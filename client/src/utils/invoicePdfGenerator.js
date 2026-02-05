import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generateInvoicePDF = async () => {
  const element = document.getElementById("invoice-pdf");

  if (!element) {
    alert("Invoice content not found");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Invoice_${Date.now()}.pdf`);
};
