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

