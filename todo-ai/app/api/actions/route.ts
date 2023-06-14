import { NextResponse } from 'next/server'

import { OpenAI } from "langchain/llms/openai";

export async function POST(request: Request) {


    const body = await request.json()
    let task = body.task

    console.log(task)

    let OpenAIApiKey = process.env.OPENAISK;

    const model = new OpenAI({ openAIApiKey: OpenAIApiKey, temperature: .4 });
    /* console.log(model); */
    const res = model.call(
        task as string,
    ).then((res) => {
        console.log(res);
        return NextResponse.json({ output: res })
    }).catch((err) => {
        console.log(err);
        return NextResponse.json({ output: err })
    });
    console.log("pass")
}