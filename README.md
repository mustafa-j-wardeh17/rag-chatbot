# PDF RAG System

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
