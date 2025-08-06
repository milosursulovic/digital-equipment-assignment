import PDFDocument from "pdfkit";

export async function createReversePdfBuffer(assignment) {
  const doc = new PDFDocument();
  const chunks = [];

  return new Promise((resolve, reject) => {
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(20).text("Potvrda o zaduženju", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Ime: ${assignment.person.name}`);
    doc.text(`Datum: ${assignment.dateAssigned.toLocaleDateString()}`);
    doc.text(`Napomena: ${assignment.note || "Nema"}`);
    doc.text(`Pozicija: ${assignment.person.position || ""}`);
    doc.text(`Odeljenje: ${assignment.person.department || ""}`);
    doc.moveDown();
    doc.text("Zadužena oprema:");

    assignment.equipment.forEach((eq, i) => {
      doc.text(
        `${i + 1}. ${eq.name} (${eq.serialNumber || "bez serijskog broja"})`
      );
    });

    doc.moveDown();
    doc.text("Predao:                 ______________________");
    doc.text("Potpis zaduženog lica:  ______________________");

    doc.end();
  });
}
