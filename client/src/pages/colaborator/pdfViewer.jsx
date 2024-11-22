import React, { useEffect } from "react";
import PDFObject from "pdfobject";

const PdfViewer = ({ fileUrl }) => {
  useEffect(() => {
    PDFObject.embed(fileUrl, "#pdf-container");
  }, [fileUrl]);

  return <div id="pdf-container" style={{ height: "500px" }}></div>;
};

export default PdfViewer;