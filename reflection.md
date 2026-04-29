# Reflection

**What Worked Well**
Working on this chatbot was a great way to understand how important context is for language models. I found that explicitly using a "Chain of Thought" (CoT) instruction, along with strict output constraints, worked really well. By forcing the model to "reason step-by-step internally" before generating its final 4-5 sentence response, the quality of the answers improved a lot. It made the personas stop sounding like boring, generic bots and actually sound like real people. The frontend integration using Next.js and Tailwind CSS also came together nicely to provide a clean chat interface.

**The GIGO Principle (Garbage In, Garbage Out)**
This assignment really drove home the GIGO principle for me. At first, if you just tell an LLM "You are Anshuman Singh from Scaler," the output is super generic and unhelpful—basically garbage. The model just doesn't have enough specific context to draw from. But when we provide "Quality In"—a rich background description, clear constraints, and three solid few-shot examples—the output turns into "Quality Out." I realized the few-shot examples are the most important part; they show the model exactly how to structure its tone and length. The whole vibe of the chatbot completely depends on how much effort goes into the prompt.

**What I Would Improve**
If I had more time, I'd definitely try to add a Retrieval-Augmented Generation (RAG) pipeline. Right now, the personas rely entirely on the static knowledge I typed into the system prompts. If I could scrape the actual YouTube transcripts from Scaler's channel or Kshitij's DSA classes, I could feed that real-time context into the prompt. That way, Kshitij could reference specific problems taught in recent classes, making it feel way more authentic.
