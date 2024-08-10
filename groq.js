import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  apiKey: "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",
});

// const message = new HumanMessage("What color is the sky?");

const res = await model.invoke("Hello HArshi");
console.log(res);
