import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey : "AIzaSyA7gZllPoHqZNG4EAebsPELoQTBcqS29sI",
});
const response = await model.invoke("Hello world! in Hindi");
console.log(response);
