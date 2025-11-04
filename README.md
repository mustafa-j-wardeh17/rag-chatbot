# PDF RAG System

## What are LLMs?

Large Language Models (LLMs) are advanced AI systems trained on vast amounts of text data to understand and generate human-like text. While powerful, LLMs have limitations when it comes to domain-specific knowledge and accessing up-to-date information that wasn't part of their training data.

## Making LLMs Smarter and More Specific

There are two primary approaches to enhance Large Language Models (LLMs) with domain-specific knowledge and capabilities:

<table>
<tr>
<th width="50%">Fine-tuning</th>
<th width="50%">Knowledge Store</th>
</tr>
<tr>
<td>
<p>The process of training LLMs on a specific set of data to adapt their behavior and knowledge for particular use cases.</p>
<p><strong>Most commonly used to:</strong> Change the fundamental behavior of the LLM</p>
<p><strong>Example:</strong> AI-Doctor systems trained on medical literature</p>
</td>
<td>
<p>Using an external store of knowledge and leveraging it to retrieve information before passing context to the LLM.</p>
<p><strong>Most commonly used to:</strong> Search and retrieve data from large pools of documents</p>
<p><strong>Example:</strong> Document Search systems (LLM is not re-trained or fine-tuned)</p>
</td>
</tr>
</table>

## What is RAG (Retrieval-Augmented Generation)?

RAG is a framework that combines the power of LLMs with a retrieval system that can access external knowledge. Think of it as giving your LLM a specialized library that it can reference in real-time. Instead of relying solely on its training data, the model can now "look up" relevant information before generating a response.

This process happens in three main steps:

**1. The Retrieval Phase**
- Documents are chunked and converted into embeddings (vector representations)
- These embeddings are stored in a vector database (like Pinecone)
- When a query comes in, the system finds the most relevant documents through semantic search

**2. The Augmentation Phase**
- Retrieved relevant documents are combined with the user's query
- This creates a "knowledge-enhanced" prompt for the LLM
- The system can include source information and context

**3. The Generation Phase**
- The LLM uses both the retrieved information and its general knowledge
- Generates responses grounded in specific, relevant documents
- Can cite sources and provide evidence for its answers

![How RAG Works](/public/how-rag-work.webp)


## Implementation Flow

The RAG system follows three main implementation flows that work together to process documents and generate intelligent responses.

### 1. Document Processing

This flow prepares documents for retrieval by converting them into searchable vector representations.

```
Raw Documents
    └── Text Extraction
        └── Chunking
            └── Embedding Generation
                └── Vector Storage
```

**Step-by-Step Process:**

1. **Raw Documents**: Start with original files (PDFs, Word docs, text files, etc.)
   - *Example*: `company_report.pdf`, `research_paper.docx`

2. **Text Extraction**: Extract readable text from files
   - *Example*: Convert PDF pages to plain text, handling tables and formatting

3. **Chunking**: Split large documents into smaller, manageable pieces
   - *Example*: A 100-page PDF becomes 200 chunks of ~300 words each

4. **Embedding Generation**: Convert text chunks into numerical vectors
   - *Example*: Each chunk becomes a 1536-dimensional array like `[0.23, -0.45, 0.12, ...]`

5. **Vector Storage**: Save embeddings in a vector database with metadata
   - *Example*: Store in database with `{id, embedding, text, source_file, page_number}`

### 2. Query Handling

This flow processes user questions and retrieves relevant information from stored documents.

```
User Query
    └── Query Embedding
        └── Vector Search
            └── Context Retrieval
                └── Prompt Construction
```

**Step-by-Step Process:**

1. **User Query**: Receive the question from the user
   - *Example*: "What are the key features of machine learning?"

2. **Query Embedding**: Convert the query to the same vector format as documents
   - *Example*: Transform "What are the key features of machine learning?" into a vector `[0.31, -0.22, 0.18, ...]`

3. **Vector Search**: Find the most similar document chunks using similarity metrics
   - *Example*: Search database and find top 5 chunks with similarity scores: 0.94, 0.89, 0.85, 0.82, 0.78

4. **Context Retrieval**: Retrieve the actual text content of matched chunks
   - *Example*: Get full text of the 5 matched chunks along with their source information

5. **Prompt Construction**: Combine retrieved context with the user query into a formatted prompt
   - *Example*: Create prompt: "Context: [retrieved chunks]\n\nQuestion: [user query]\n\nAnswer based on the context:"

### 3. Response Generation

This flow uses the LLM to generate an accurate, well-sourced answer based on the retrieved context.

```
Context + Query
    └── LLM Processing
        └── Response Generation
            └── Source Attribution
                └── Final Output
```

**Step-by-Step Process:**

1. **Context + Query**: Input the constructed prompt (context + user query) to the LLM
   - *Example*: Send the full prompt with 5 retrieved chunks and the original question

2. **LLM Processing**: The language model processes the context and generates a response
   - *Example*: GPT-4 or similar model analyzes the context and synthesizes an answer

3. **Response Generation**: LLM creates a coherent answer using both retrieved context and its training knowledge
   - *Example*: Generate: "Machine learning key features include: 1) Pattern recognition, 2) Adaptability, 3) Data-driven decisions..."

4. **Source Attribution**: Add references to the original documents used
   - *Example*: Append "Sources: company_report.pdf (pages 5-7), research_paper.docx (section 2)"

5. **Final Output**: Deliver the complete response with citations to the user
   - *Example*: Return formatted response with answer, confidence score, and source links

**Complete Flow Example:**

When a user asks "What is RAG?", the system:
- Searches stored embeddings and finds 3 relevant chunks
- Retrieves text from those chunks (from document.pdf pages 2-3)
- Constructs prompt with context + question
- LLM generates: "RAG (Retrieval-Augmented Generation) is a framework that..."
- Adds citation: "Source: document.pdf (pages 2-3)"
- Returns final answer to user

## Key Technologies and Tools

Building a RAG system requires various technologies working together. Here are the essential categories and their popular tools.

### Vector Databases

Vector databases store and retrieve embeddings efficiently using similarity search. Pinecone offers scalable cloud-based vector search with managed infrastructure. Weaviate combines vector search with knowledge graph capabilities for richer data relationships. Milvus provides high-performance vector operations suitable for large-scale applications. FAISS (Facebook AI Similarity Search) is a library optimized for efficient similarity search and clustering of dense vectors.

### Embedding Models

Embedding models convert text into numerical vectors that capture semantic meaning. OpenAI Embeddings provide state-of-the-art embeddings through their API with models like text-embedding-ada-002. Sentence Transformers offer open-source models that can be run locally and fine-tuned for specific domains. BERT-based models serve as the foundation for many embedding approaches, capturing contextual word representations. Domain-specific embeddings are trained on specialized corpora to better understand particular fields like medical, legal, or technical documentation.

### LLM Integration

Large Language Models generate the final responses using retrieved context. OpenAI GPT models (GPT-3.5, GPT-4) provide powerful API access with excellent performance and reliability. Anthropic Claude offers advanced reasoning capabilities and longer context windows. Local LLMs like Llama and Mistral can be run on your own infrastructure for privacy and cost control. Custom fine-tuned models are trained on specific datasets to align with particular use cases or brand voice.

### Development Frameworks

Development frameworks simplify RAG pipeline construction and reduce boilerplate code. LangChain provides comprehensive tools for building RAG applications with integrations for various LLMs, vector stores, and document loaders. LlamaIndex specializes in document processing and indexing with optimized retrieval mechanisms. Haystack focuses on search and retrieval with a modular architecture for building production-ready search systems. Custom implementations offer full control over the pipeline but require more development effort.

### Chat UI

User interfaces enable interaction with the RAG system. Vercel AI SDK provides helper functions and React hooks for building chat interfaces that stream responses and manage conversation state seamlessly.

---

## System Implementation Details

This section explains how the utils and lib files are used in the PDF uploader and chat components with actual code examples.

### PDF File Uploader: Code Implementation Flow

#### Component Structure

**1. Upload Page (`app/[locale]/upload/page.tsx`)**

The upload page orchestrates the entire PDF upload process:

```typescript
import { prepare } from "@/actions/prepare";           // Server action for processing
import PDFFileUpload from "@/components/pdf-file-uploader";  // Upload UI component
import { PDFSource } from "@/utils/pdf-loader";        // Type definition

export default function Page() {
  const [file, setFile] = useState<FileProps | null>(null);
  
  async function submit() {
    const pdfSource: PDFSource = {
      type: "url",
      source: file?.url ?? "",  // File URL from UploadThing
    };
    await prepare(pdfSource);  // Calls server action
  }
  
  return (
    <PDFFileUpload
      label={t('label')}
      file={file}
      setFile={setFile}
      endpoint="pdfUpload"
    />
  );
}
```

**2. PDF Upload Component (`components/pdf-file-uploader.tsx`)**

Handles file upload UI and integration with UploadThing:

```typescript
import { UploadDropzone } from "@/utils/uploadthing";  // UploadThing wrapper

export default function PDFFileUpload({ file, setFile, endpoint }) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const url = {
          url: res[0].ufsUrl || res[0].url,  // Gets file URL
          title: res[0].name,
          size: res[0].size,
          type: res[0].type,
        };
        setFile(url);  // Stores file metadata in state
      }}
    />
  );
}
```

**How `utils/uploadthing.ts` Works:**
```typescript
// utils/uploadthing.ts
import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
// Creates a typed upload component that connects to UploadThing API
```

#### Server Action: Document Processing (`actions/prepare.ts`)

The `prepare` server action processes the uploaded PDF:

```typescript
"use server";

import { getChunkedDocsFromPDF, PDFSource } from "@/utils/pdf-loader";
import { embedAndStoreDocs } from "@/utils/vector-store";
import { getPineconeClient } from "@/utils/pinecone-client";

export async function prepare(source: PDFSource) {
  // Step 1: Initialize Pinecone client
  const pineconeClient = await getPineconeClient();
  
  // Step 2: Load and chunk PDF documents
  const docs = await getChunkedDocsFromPDF(source);
  
  // Step 3: Generate embeddings and store in Pinecone
  await embedAndStoreDocs(pineconeClient, docs);
}
```

**How `utils/pinecone-client.ts` Works:**
```typescript
// utils/pinecone-client.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "@/lib/config";  // Environment variables

export async function getPineconeClient() {
  const pineconeClient = new Pinecone({
    apiKey: env.PINECONE_API_KEY,  // From lib/config.ts
  });
  
  await pineconeClient.createIndex({
    name: env.PINECONE_INDEX_NAME,     // Index name from config
    dimension: 1536,                    // OpenAI embedding dimension
    metric: "cosine",                   // Similarity metric
    suppressConflicts: true,            // Don't error if exists
    waitUntilReady: true,               // Wait for index to be ready
  });
  
  return pineconeClient;
}
```

**How `lib/config.ts` Works:**
```typescript
// lib/config.ts
import z from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
  PINECONE_API_KEY: z.string().trim().min(1),
  PINECONE_INDEX_NAME: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
// Validates and exports environment variables with type safety
```

**How `utils/pdf-loader.ts` Works:**
```typescript
// utils/pdf-loader.ts
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import axios from "axios";

export async function getChunkedDocsFromPDF(pdfSource: PDFSource) {
  let docs: Document[] = [];

  // Step 1: Extract text from PDF based on source type
  if (pdfSource.type === "url") {
    // Download PDF from URL
    const response = await axios.get(pdfSource.source, {
      responseType: "arraybuffer",
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const loader = new WebPDFLoader(pdfBlob);
    docs = await loader.load();  // Extracts text, creates Document objects
  }

  // Step 2: Split documents into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,      // Max characters per chunk
    chunkOverlap: 200,    // Overlap between chunks
  });
  
  const chunkedDocs = await textSplitter.splitDocuments(docs);
  return chunkedDocs;  // Returns array of Document objects
}
```

**How `utils/vector-store.ts` Works:**
```typescript
// utils/vector-store.ts
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { env } from "@/lib/config";

export async function embedAndStoreDocs(client, docs) {
  // Step 1: Initialize embedding model
  const embeddings = new OpenAIEmbeddings();
  // Uses OpenAI's text-embedding-ada-002 model (1536 dimensions)
  
  // Step 2: Get Pinecone index
  const index = client.Index(env.PINECONE_INDEX_NAME);
  
  // Step 3: Generate embeddings and store in Pinecone
  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    textKey: "text",  // Field name for storing original text
  });
  // This function:
  // - Converts each document chunk to embedding vector
  // - Stores vector + metadata (text, page number, etc.) in Pinecone
  // - Creates unique IDs for each chunk
}

// Retrieves existing vector store for queries
export async function getVectorStore(client) {
  const embeddings = new OpenAIEmbeddings();
  const index = client.Index(env.PINECONE_INDEX_NAME);
  
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    textKey: "text",
  });
  
  return vectorStore;  // Returns vector store for similarity search
}
```

**Complete Upload Flow:**
```
User uploads PDF
  ↓
PDFFileUpload component (uses utils/uploadthing.ts)
  → UploadDropzone uploads to UploadThing
  → Returns file URL and metadata
  ↓
Upload page calls prepare() server action
  ↓
prepare() uses utils/pdf-loader.ts
  → Downloads PDF from URL (axios)
  → Extracts text (WebPDFLoader)
  → Chunks documents (RecursiveCharacterTextSplitter)
  ↓
prepare() uses utils/vector-store.ts
  → Creates OpenAI embeddings (OpenAIEmbeddings)
  → Stores in Pinecone (PineconeStore.fromDocuments)
  ↓
prepare() uses utils/pinecone-client.ts
  → Initializes Pinecone client (uses lib/config.ts for API key)
  → Connects to index
```

### Chat Page: Code Implementation Flow

#### Client-Side Components

**1. Chat Component (`components/shared/chat/chat.tsx`)**

The main chat component manages UI and state:

```typescript
import { scrollToBottom, initialMessages, getSources } from "@/lib/utils";
import { useChat } from "ai/react";  // Vercel AI SDK hook

export function Chat() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // useChat hook manages messages, input, loading state
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages,  // From lib/utils.ts - initial greeting message
    });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <div>
      {/* Messages */}
      {messages.map(({ id, role, content }, index) => (
        <ChatLine
          key={id}
          role={role}
          content={content}
          sources={getSources(data, role, index)}  // Extracts sources from response
        />
      ))}
      
      {/* Input form */}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

**How `lib/utils.ts` Functions Work:**

```typescript
// lib/utils.ts

// 1. Initial message shown when chat loads
export const initialMessages = [
  {
    role: "assistant",
    id: "0",
    content: "Hi! I am your PDF assistant. I am happy to help...",
  },
];

// 2. Auto-scroll utility
export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      lastMessage.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }
}

// 3. Extract sources from API response data
export const getSources = (data: Data[], role: string, index: number) => {
  // Sources are only attached to assistant messages
  // They're stored at specific indices in the data array
  if (role === "assistant" && index >= 2 && (index - 2) % 2 === 0) {
    const sourcesIndex = (index - 2) / 2;
    if (data[sourcesIndex] && data[sourcesIndex].sources) {
      return data[sourcesIndex].sources;  // Returns array of source texts
    }
  }
  return [];
};

// 4. Format text for display (removes extra whitespace)
export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ")           // Replace newlines with spaces
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words
    .replace(/\s+/g, " ");          // Collapse multiple spaces
}

// 5. Tailwind class name merger (used throughout UI components)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));  // Merges Tailwind classes intelligently
}
```

**2. Chat Line Component (`components/shared/chat/chat-line.tsx`)**

Displays individual messages with sources:

```typescript
import { formattedText } from "@/lib/utils";
import { cn } from "@/lib/utils";  // For conditional class names

export function ChatLine({ role, content, sources }) {
  return (
    <div>
      {/* Message content with markdown rendering */}
      <ReactMarkdown>{content}</ReactMarkdown>
      
      {/* Sources accordion */}
      {sources && sources.length > 0 && (
        <Accordion>
          {sources.map((source, index) => (
            <div key={index}>
              {/* formattedText cleans up the source text for display */}
              <ReactMarkdown>
                {formattedText(source)}
              </ReactMarkdown>
            </div>
          ))}
        </Accordion>
      )}
    </div>
  );
}
```

#### Server-Side API Route

**Chat API Route (`app/api/chat/route.ts`)**

Handles chat requests and orchestrates RAG pipeline:

```typescript
import { processUserMessage } from "@/utils/langchain";
import { getVectorStore } from "@/utils/vector-store";
import { getPineconeClient } from "@/utils/pinecone-client";
import { LangChainAdapter } from "ai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: Message[] = body.messages ?? [];
  const currentQuestion = messages[messages.length - 1].content;
  
  // Format conversation history for context
  const formattedPreviousMessages = messages
    .slice(0, -1)
    .map((msg) => `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`)
    .join("\n");

  // Initialize model for streaming
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
  });
  
  // Get vector store connection
  const pc = await getPineconeClient();  // Uses utils/pinecone-client.ts
  const vectorStore = await getVectorStore(pc);  // Uses utils/vector-store.ts
  
  // Process message through RAG pipeline
  const stream = await processUserMessage({
    userPrompt: currentQuestion,
    conversationHistory: formattedPreviousMessages,
    vectorStore,
    model,
  });
  
  // Convert LangChain stream to Vercel AI SDK format
  return LangChainAdapter.toDataStreamResponse(stream);
}
```

**How `utils/langchain.ts` Works:**

```typescript
// utils/langchain.ts
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { VectorStore } from "@langchain/core/vectorstores";

export async function processUserMessage({
  userPrompt,
  conversationHistory,
  vectorStore,  // From utils/vector-store.ts
  model,        // ChatOpenAI instance
}) {
  // Stage 1: Query Refinement
  const nonStreamingModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,      // Deterministic for query refinement
    streaming: false,
  });
  
  // Refine user query into optimized search query
  const inquiryResult = await inquiryPrompt
    .pipe(nonStreamingModel)
    .pipe(new StringOutputParser())
    .invoke({ userPrompt, conversationHistory });

  // Stage 2: Context Retrieval
  // Search vector store for relevant documents
  const relevantDocs = await vectorStore.similaritySearch(inquiryResult, 3);
  // Returns top 3 most similar document chunks based on cosine similarity
  
  // Extract text content from retrieved documents
  const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");
  // relevantDocs contains Document objects with:
  // - pageContent: The actual text
  // - metadata: page number, source file, etc.

  // Stage 3: Response Generation
  // Generate answer using streaming model
  return qaPrompt
    .pipe(model)  // Streaming ChatOpenAI model
    .pipe(new StringOutputParser())
    .stream({ context, question: inquiryResult });
  // Returns a stream that the API route converts to Vercel AI SDK format
}

// Query refinement prompt template
const inquiryPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an expert query formulation specialist..."],
  ["human", "USER PROMPT: {userPrompt}\n\nCONVERSATION LOG: {conversationHistory}"],
]);

// Answer generation prompt template
const qaPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an elite AI research assistant...\n\nContext: {context}"],
  ["human", "Question: {question}"],
]);
```

**Complete Chat Flow:**
```
User types question and submits
  ↓
Chat component calls handleSubmit (from useChat hook)
  → POST request to /api/chat with messages array
  ↓
API route (app/api/chat/route.ts)
  → Gets messages from request body
  → Formats conversation history
  → Initializes ChatOpenAI model (streaming)
  → Gets Pinecone client (utils/pinecone-client.ts)
  → Gets vector store (utils/vector-store.ts)
  → Calls processUserMessage (utils/langchain.ts)
  ↓
processUserMessage (utils/langchain.ts)
  → Stage 1: Refines query using inquiryPrompt
  → Stage 2: Searches vectorStore.similaritySearch()
  → Stage 3: Generates answer using qaPrompt + context
  → Returns stream
  ↓
API route converts stream using LangChainAdapter
  → Returns streaming response to client
  ↓
Chat component receives stream via useChat hook
  → Updates messages state in real-time
  → Calls scrollToBottom() (lib/utils.ts)
  → Calls getSources() to extract sources (lib/utils.ts)
  ↓
ChatLine component renders message
  → Uses formattedText() to clean source text (lib/utils.ts)
  → Uses cn() for styling (lib/utils.ts)
  → Displays markdown content and sources
```

#### Key Utility Functions Summary

**From `lib/utils.ts`:**
- `cn()`: Merges Tailwind CSS classes intelligently (used in all UI components)
- `scrollToBottom()`: Auto-scrolls chat to latest message
- `initialMessages`: Default greeting message for chat
- `getSources()`: Extracts source citations from API response
- `formattedText()`: Cleans text for display (removes extra whitespace)

**From `utils/pdf-loader.ts`:**
- `getChunkedDocsFromPDF()`: Downloads PDF, extracts text, chunks documents

**From `utils/vector-store.ts`:**
- `embedAndStoreDocs()`: Generates embeddings and stores in Pinecone
- `getVectorStore()`: Retrieves vector store for similarity search

**From `utils/pinecone-client.ts`:**
- `getPineconeClient()`: Initializes and returns Pinecone client

**From `utils/langchain.ts`:**
- `processUserMessage()`: Complete RAG pipeline (query refinement → retrieval → generation)

**From `utils/uploadthing.ts`:**
- `UploadDropzone`: Typed upload component for file uploads



## License

This project is **free to use** and was created by **Mustafa Abu Wardeh**.

You are free to use, modify, and distribute this code for personal or commercial purposes.

