import { jsPDF } from 'jspdf';
import { Patient, Treatment } from '../types';

export const generateMedicalCertificatePDF = (patient: Patient, treatment: Treatment) => {
  const doc = new jsPDF();

  doc.addFont('https://fonts.gstatic.com/s/sarabun/v13/DtVmJx26TKEr37c9YOZqik8s6zDX.woff2', 'Sarabun', 'normal');
  doc.setFont('Sarabun');

  doc.setFontSize(16);
  doc.text('เอ้าส์ ออฟ เฮิร์บ เวลเนสสหคลินิก', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text('162 ถนนสวนสมเด็จ ต.หน้าเมือง อ.เมือง จ.ฉะเชิงเทรา', 105, 30, { align: 'center' });

  doc.setFontSize(14);
  doc.text('ใบรับรองแพทย์ / Medical Certificate', 105, 45, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`เลขที่ ${Math.floor(Math.random() * 1000000)}`, 20, 60);

  doc.text(`ข้าพเจ้า ${treatment.doctor}`, 20, 70);
  doc.text(`เป็นผู้ประกอบวิชาชีพ ${treatment.licenseType}`, 20, 80);
  doc.text(`ใบอนุญาตประกอบวิชาชีพเลขที่ ${treatment.licenseNumber}`, 20, 90);

  doc.text(`ได้ตรวจร่างกายผู้ป่วยชื่อ ${patient.name}`, 20, 100);

  doc.text(`เมื่อวันที่ ${treatment.date}`, 20, 110);
  doc.text(`เห็นว่า ${treatment.diagnosis}`, 20, 120);

  doc.text(`ตั้งแต่วันที่ ${treatment.startDate} ถึง`, 20, 130);
  doc.text(`วันที่ ${treatment.endDate} เป็นจำนวน`, 20, 140);
  doc.text(`${treatment.dayCount} วัน`, 20, 150);

  doc.text('ทั้งนี้ได้ให้การรักษาพร้อมคำแนะนำไว้เรียบร้อยแล้ว', 20, 160);

  doc.text('ลงนาม', 150, 180);
  doc.text(`(${treatment.doctor})`, 150, 190);
  doc.text('แพทย์ผู้ตรวจ', 150, 200);

  if (treatment.bodyChart) {
    doc.addImage(treatment.bodyChart, 'JPEG', 20, 210, 100, 100);
  }

  doc.save(`medical_certificate_${patient.hn}_${treatment.date}.pdf`);
};