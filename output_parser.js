import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser,CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import {z} from 'zod'
import * as dotenv from "dotenv";
dotenv.config();
const model = new ChatGroq({});
// Instantiate Model
async function callStringOutputParser(){

// Instantiate Prompt Template
const prompt = ChatPromptTemplate.fromMessages([
    ["system","Provide a Joke on the given input"],
    ["human","{input}"]
]);
const parser = new StringOutputParser();
// after this just attach to the chain
// Instantiate Chain
const chain = prompt.pipe(model).pipe(parser);
// Instantiate Parser

// Call Chain
return await chain.invoke({
    input : "Harshitha is So Sweet!",
})
}


async function ListOutputParser() {
    const prompt = ChatPromptTemplate.fromMessages([
        ["system","List out the 5 simmilar words with the given input"],
        ["human","{input}"]
    ]);
    const pa = new StringOutputParser();
     const parser = new CommaSeparatedListOutputParser();
     const chain = prompt.pipe(model).pipe(parser);

     return await chain.invoke({
        input : "Good",
     })
}



let ress = await ListOutputParser();
let res = await callStringOutputParser();
// console.log(ress);
// If we Require List of Values and Generate it into an JS Array then?


// For Production Level Case we Require StructuredOutputParser

async function structuredOutputParser(){
 const prompt = ChatPromptTemplate.fromTemplate(`
    Extract all the informations from the following phrase.
    Formatting Instructions: {format_instructions}
    Phrase : {phrase} 
    `);

    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name:"the name of the person",
        age : "the age of the person",
       
    });
    const chain = prompt.pipe(model).pipe(outputParser);

    return await chain.invoke({
        phrase:"John has just turned 25, stepping into the prime of his life. Meanwhile, Emma celebrated her 28th birthday last month, feeling more confident and accomplished than ever. On the other hand, Liam, at 32, is enjoying his early thirties, focusing on career growth and personal development. Sophia, who is 29, is excited to embrace the final year of her twenties, while Ethan, now 35, reflects on his journey so far, feeling wiser and more experienced. Finally, Olivia, having reached 27, is at a point where she is balancing her professional aspirations with personal fulfillment",
        format_instructions: outputParser.getFormatInstructions(),

    })
}



const rr = await structuredOutputParser();
console.log(rr);

// Very usefulfor making JSON Super Tool Loved it
async function callZodOutputParser(){
  const prompt = ChatPromptTemplate.fromTemplate(`
    Extract the Following required from the given Phrase:
    Formatted Instruction : {formatted_instruction}
    Phrase : {phrase}
    `);
    const output_parsers = StructuredOutputParser.fromZodSchema(
        z.object({
            recipe : z.string().describe("name of the recipe"),
            ingredients : z.array(z.string()).describe("name of the ingredients"),
        })
    )
const chain = prompt.pipe(model).pipe(output_parsers);

return await chain.invoke({
    phrase: "To make Spaghetti Aglio e Olio, you'll need a few simple ingredients. Start by bringing a large pot of salted water to a boil and cooking 400g of spaghetti until al dente. While the pasta cooks, heat 1/2 cup of extra virgin olive oil in a large skillet over medium heat. Add 6 thinly sliced garlic cloves to the oil, sautéing until golden and fragrant. Be careful not to burn the garlic. Then, stir in 1/4 teaspoon of red pepper flakes for a bit of heat. Once the spaghetti is done, reserve about a cup of the pasta water and drain the rest. Toss the spaghetti in the garlic-infused oil, adding a little pasta water if needed to loosen the mixture. Season with salt and freshly ground black pepper to taste, and finish with a sprinkle of chopped fresh parsley. For an extra touch, you can add some grated Parmesan cheese or a bit of lemon zest before serving.",
    formatted_instruction: output_parsers.getFormatInstructions(),
})


    
}
const resss = await callZodOutputParser();
console.log(resss);
