import { AI21 } from "@langchain/community/llms/ai21";
import { NomicEmbeddings } from "@langchain/nomic";

const model = new AI21({
    ai21ApiKey:"xQLETZOfWcwKq5cxyVZOhoB2pqYGUCso",
});

const model1 = new NomicEmbeddings({
    apiKey:"nk-af80z6mn0t94kj6S4KyWK3N_gPEHq0H_BLjXx3sFRTM",
    
});
const res1 = await model1.invoke("Harshi is my baby")
const res = await model.invoke("Harshi is my baby");
console.log({res});
console.log({res1});
