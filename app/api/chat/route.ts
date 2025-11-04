import { NextRequest, NextResponse } from "next/server";
import { Message, streamText } from "ai";
import { LangChainAdapter } from "ai";
import { getVectorStore } from "@/utils/vector-store";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { processUserMessage } from "@/utils/langchain";
import { getPineconeClient } from "@/utils/pinecone-client";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request
    const body = await req.json();
    const messages: Message[] = body.messages ?? [];
    const locale: string = body.locale ?? "en"; // Default to English if not provided

    if (!messages.length) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }
    const currentQuestion = messages[messages.length - 1].content;
    if (!currentQuestion?.trim()) {
      return NextResponse.json(
        { error: "Empty question provided" },
        { status: 400 }
      );
    }
    // Format conversation history
    const formattedPreviousMessages = messages
      .slice(0, -1)
      .map(
        (message) =>
          `${message.role === "user" ? "Human" : "Assistant"}: ${
            message.content
          }`
      )
      .join("\n");

    // Initialize model and vector store
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      // temperature: 0.1,
      streaming: true, // This is used to stream the response to the client
    });
    const pc = await getPineconeClient();
    const vectorStore = await getVectorStore(pc);
    const parser = new StringOutputParser(); // This is used to parse the response from the model
    const stream = await processUserMessage({
      userPrompt: currentQuestion,
      conversationHistory: formattedPreviousMessages,
      vectorStore,
      model,
      locale,
    });
    console.log("message answer =>", stream);

    // Convert the stream using the new adapter
    const response = LangChainAdapter.toDataStreamResponse(stream);
    return response;
  } catch (error) {
    console.error("Chat endpoint error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
