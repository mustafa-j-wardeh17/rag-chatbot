"use server";

import { getChunkedDocsFromPDF, PDFSource } from "@/utils/pdf-loader";
import { embedAndStoreDocs } from "@/utils/vector-store";
import { getPineconeClient } from "@/utils/pinecone-client";

export async function prepare(source: PDFSource) {
  try {
    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF(source);
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in pine-cone index");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
}