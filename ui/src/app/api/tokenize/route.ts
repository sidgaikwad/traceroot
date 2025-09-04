import { NextResponse } from 'next/server';
import { encoding_for_model } from 'tiktoken';

export async function POST(req: Request) {
  try {
    const { text, model = 'gpt-3.5-turbo' } = await req.json();

    const enc = encoding_for_model(model);
    const tokens = enc.encode(text);
    enc.free();

    return NextResponse.json({ tokens: tokens.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
