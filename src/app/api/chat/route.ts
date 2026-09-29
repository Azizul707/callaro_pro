import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Prevent Next.js from caching this API route

// =======================================================================
// CONFIGURATION FIELD: LIVE PRODUCTION WEBHOOK
// =======================================================================
const N8N_WEBHOOK_URL = "https://n8n.srv1106977.hstgr.cloud/webhook/8565bbc9-60f2-4670-8d73-c57d646f55e6";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    console.log(`[CHAT API] Forwarding user message to n8n...`);
    console.log(`[CHAT API] Webhook Target: ${N8N_WEBHOOK_URL}`);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      console.error(`[CHAT API] n8n Error Status: ${response.status}`);
      throw new Error(`n8n responded with status ${response.status}`);
    }

    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("[CHAT API] Invalid JSON received from n8n:", responseText);
      return NextResponse.json({ reply: "Received invalid data format from the server." }, { status: 500 });
    }

    // Extract reply using multiple possible keys to ensure compatibility
    const botReply = data.reply || data.output || data.message || data.text || "I have received your message, but the response format was empty.";

    return NextResponse.json({ reply: botReply });

  } catch (error: any) {
    console.error("[CHAT API] Connection Error:", error.message || error);
    return NextResponse.json(
      { reply: "Our systems are experiencing high traffic. Please book a call directly!" },
      { status: 500 }
    );
  }
}
