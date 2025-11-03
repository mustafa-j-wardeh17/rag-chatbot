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

