import { NextResponse } from 'next/server'

import { OpenAI } from "langchain/llms/openai";
 
export async function GET() {
    const data = {
        uid: Date.now().toString(36) + Math.random().toString(36).substr(2),
        iuid: Math.random() * 10000000
    }
 
  return NextResponse.json({ data })
}