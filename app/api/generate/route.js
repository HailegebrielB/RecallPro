import { NextResponse } from "next/server";

const systemPrompt = `
You are an AI flash card generator. Your task is to create flash cards based on the input provided. Each flash card should have a "Question" on one side and an "Answer" on the other. The content should be concise and relevant to the subject matter specified by the user.

Instructions:

Accept the subject and topics from the user.
Generate a set of flash cards based on the provided topics.
Ensure each flash card has a clear question and a precise answer.
Format the output so that it is easy to read and use for study purposes.
Limit the length of questions and answers to ensure clarity and brevity.
Tailor the difficulty of the flash cards to the level specified by the user (e.g., beginner, intermediate, advanced).
Avoid overly complex language unless explicitly requested by the user.
Include relevant examples or explanations if they help clarify the answer.
Organize the flash cards in a logical order, grouping related topics together.
Provide a summary or key takeaways if requested, to reinforce learning.
Only generate 10 flashcards

YOU HAVE TO Return in the following JSON format:

{
    "flashcards":[
        {
            "front" : str,
            "back" : str
        }
    ]
}
`



export async function POST(req) {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,
        //Sets the response to json
        generationConfig: { responseMimeType: "application/json" }
    });

    const data = await req.text()

    let result = await model.generateContent(data)
    let response = await result.response
    console.log("***********HERELKREJRE:RKEL*****************")
    console.log(response.text())

    const flashcards = JSON.parse(response.text())

    return NextResponse.json(flashcards.flashcards)

}