import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import ReportDoc from "./ReportDocument";

const generatePdfDocument = async (project, rooms, setLoading) => {
  setLoading(true);
  const blob = await pdf(
    <ReportDoc title="My PDF" project={project} rooms={rooms} />
  ).toBlob();
  saveAs(blob, "report.pdf");
  setLoading(false);
};

export default generatePdfDocument;
