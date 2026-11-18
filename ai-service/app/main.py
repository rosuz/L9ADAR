import json

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

app = FastAPI(title="DarMate AI")

OLLAMA_URL = "http://127.0.0.1:11434"
MODEL = "qwen3.5:4b"

SYSTEM_PROMPT = """
You are DarMate AI, a student housing assistant
for Morocco.

Your responsibilities:
- Help students understand the housing search process.
- Explain rental agreements and roommate preferences.
- Assist with drafting landlord messages.
- Answer in English, French, Arabic, or Moroccan Darija.

Strict rules:
- Never invent housing listings or rental prices.
- Never invent universities, addresses, or distances.
- Do not pretend to have searched the DarMate database.
- If a question requires real-time housing information,
  explain that verified listings are not connected yet.
- Ask for missing information when necessary.
- Keep responses concise, clear, and practical.
"""


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        async with httpx.AsyncClient(timeout=120) as client:
            response = await client.post(
                f"{OLLAMA_URL}/api/chat",
                json={
                    "model": MODEL,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": request.message}
                    ],
                    "stream": True,
                    "think": False,
                    "options": {
                        "temperature": 0.3
                    }
                }
            )
            response.raise_for_status()

            return {
                "reply": response.json()["message"]["content"]
            }

    except (httpx.HTTPError, KeyError, ValueError):
        raise HTTPException(
            status_code=503,
            detail="Local LLM unavailable"
        )


@app.post("/chat/stream")
async def stream_chat(request: ChatRequest):

    async def generate():
        try:
            async with httpx.AsyncClient(timeout=120) as client:
                async with client.stream(
                    "POST",
                    f"{OLLAMA_URL}/api/chat",
                    json={
                        "model": MODEL,
                        "messages": [
                            {"role": "system", "content": SYSTEM_PROMPT},
                            {"role": "user", "content": request.message}
                        ],
                        "stream": True
                    }
                ) as response:
                    response.raise_for_status()

                    async for line in response.aiter_lines():
                        if not line:
                            continue

                        event = json.loads(line)

                        if event.get("error"):
                            raise ValueError("Model error")

                        token = event.get(
                            "message", {}
                        ).get("content", "")

                        if token:
                            yield json.dumps({
                                "type": "delta",
                                "text": token
                            }) + "\n"

                        if event.get("done"):
                            yield json.dumps({
                                "type": "done"
                            }) + "\n"
                            return

        except (httpx.HTTPError, ValueError):
            yield json.dumps({
                "type": "error",
                "message": "Generation failed"
            }) + "\n"

    return StreamingResponse(
        generate(),
        media_type="application/x-ndjson"
    )
