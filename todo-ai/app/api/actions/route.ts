import { NextResponse } from 'next/server'

import { OpenAI } from "langchain/llms/openai";

export async function GET() {

    let OpenAIApiKey = process.env.OPENAISK;

    const model = new OpenAI({ openAIApiKey: OpenAIApiKey, temperature: .4 });
    /* console.log(model); */
    const res = model.call(
        "What would be a good company name a company that makes colorful socks?"
    ).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    console.log("pass")
    return res;
}