import { NextResponse } from 'next/server'

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { CommaSeparatedListOutputParser, CustomListOutputParser } from "langchain/output_parsers";

export async function POST(request: Request) {

    const body = await request.json()
    let task = body.task
    console.log(task)

    let OpenAIApiKey = process.env.OPENAISK;
    const parser = new CustomListOutputParser({ separator: "\n" });
    const formatInstructions = parser.getFormatInstructions();


    const prompt = new PromptTemplate({
        template: "Create up to five actionable steps for the following todo list task: {todotask}.\n{format_instructions}",
        inputVariables: ["todotask"],
        partialVariables: { format_instructions: formatInstructions },
    });
    const model = new OpenAI({openAIApiKey: OpenAIApiKey, temperature: 0 });
    const input = await prompt.format({ todotask: task });
    const response = await model.call(input);

    console.log(input)
    console.log(response)

    const output: string[] = await parser.parse(response);

    return NextResponse.json({ output: output })
}