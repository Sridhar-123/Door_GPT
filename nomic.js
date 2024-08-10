import { NomicEmbeddings } from "@langchain/nomic";

const nomicEmbeddings = new NomicEmbeddings({
  apiKey: "nk-af80z6mn0t94kj6S4KyWK3N_gPEHq0H_BLjXx3sFRTM", // Default value.
  modelName: "nomic-embed-text-v1",  // Default value.
});

const docs = [
  "hello world",
  "nomic embeddings!",
  "super special langchain integration package",
  "what color is the sky?",
];

const embeddings = await nomicEmbeddings.embedDocuments(docs);
console.log(embeddings);
