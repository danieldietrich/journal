---
layout: post
title: "Architecting llm-lib"
tags: AI LLM LLM-LIB
image: /assets/img/daniel.webp
---

Everyone is using [artificial intelligence][ai] (AI). Many are developing apps based on [large language models][llm] (LLMs)[^1], but few are creating libraries and frameworks for tool development &mdash; and so am I: [llm-lib][llm-lib] is my playground[^2].

[Sam Altman][sam-altman] is a visionary. [OpenAI][openai] provided an interface and made [generative pre-trained transformers][gpt] (GPTs) accessible to everyone. Personally, I see this as the next big thing after the internet, the iPhone and the Cloud. LLMs are a whole new platform for tool creators and this platform integrates well with existing platforms.

What can AI do for us today? Currently, I focus on the general case of [text-in/text-out][text-to-text]. Special cases like [image-to-text][image-to-text] and [speech-to-text][speech-to-text] integrate well with the general case, once we have text &mdash; and vice versa.

The nature of LLMs[^3] is easy to grasp. We use [natural language][nlp-vs-llm] to get an answer, a process called [prompting][prompt-engineering]. Like in a human conversation, the [context][llm-context] is important. We send the context as part of our question[^4]. For example, when writing an article, other important factors include the background of the author, the target audience, the statement or goal, the style, and the structure. The better the context, the more accurate the answer will be, at least in terms of meeting our expectations.

LLMs are much more than just chatbots like [ChatGPT][chat-gpt]. The prompts and answers might have a formal structure that can be further processed by our applications. I am sure, soon there will be solutions that allow us to connect to infinite streams of content, like executable code, search results, podcasts, news, you name it[^5]. In my opinion, the most fascinating aspect is that an LLM infrastructure tailors the information stream to the consuming user, all depending on the current _user state_ as part of the context.

As a developer, I am interested in a low barrier approaching the LLM functionality. Text might be augmented with additional metadata, invisible to the end-user, to pre- or post-process data. Different LLMs can be combined, allowing so-called [assistants][virtual-assistant] to be composed and work as a whole. Additional tools, such as function calls, let us connect to the outer world. The field is constantly emerging. People already talk about [AI-native][ai-native] programming. We need to understand: what will the LLM handle for me and for which parts I need traditional algorithms.

There are additional challenges: What if the LLM does not have an appropriate answer to a question? Currently, LLMs are [trained][llm-training] on a fixed set of data. The process of training and the fine-tuning of LLMs is cost-intensive. Data scientists and software engineers are continuously working on solutions for teaching existing LLMs new aspects. This is based on various data sources, like documentation, database content, or current user activities.

At the moment, one way to mitigate such white spots is leveraging [retrieval-augmented generation][rag] (RAG), a pipeline that splits new data into chunks, vectorizes those chunks and stores the resulting [embeddings][embeddings] in a [vector database][vector-db]. Simply put, when querying/prompting the LLM, the question is also vectorized and [semantic similarities][semantic-similarity] are computed within the existing vector space. That way, we get answers based on information the LLM is not specifically trained on.

As a developer, I want to utilize this exciting new AI functionality, likely just like you. There is a growing number of LLMs to choose from, along with numerous AI frameworks and libraries that abstract different AI APIs and features. Popular choices include [LangChain][langchain] and [LlamaIndex][llamaindex]. Recently, I stumbled upon [Vercel's AI SDK][vercel-ai-sdk].

As a library author, I feel the urge to explore the field of LLMs based on my own thoughts about abstractions, capabilities and developer experience. The API of LLMs is already very simplistic and approachable. It is based on question/answer pairs, plus some additional context, all in plain text. My goal with llm-lib is to provide only a few low-level abstractions and reflect the essence/nature of LLMs &mdash; and to learn.

From the viewpoint of an architect, I look at the general concepts of LLMs and at existing frameworks that provide a unified API for integrating LLMs into applications. Some of the more popular frameworks have a hard time defining their scope and leave the feeling of being ever growing, resulting in feature bloat and increased complexity that can overwhelm developers and hinder productivity.

The Python audience is large. LangChain and LlamaIndex have emerged from the Python community and later provided a TypeScript implementation, which currently gives the impression that it is always a bit behind the Python version and potentially more buggy.

It is the natural course of things that steadily growing libraries without a clear scope are subject to natural erosion. Vercel's AI SDK looks fresh, it distilled low-level APIs. However, it is tightly coupled to Vercel's ecosystem.

I will now experiment with effective low-level abstractions. First question: can the main LLM concepts (prompts/chats, agents/GPTs, functions and tools) be expressed on the type-level such that they can be composed in a way that makes sense? A unified Tool interface and composability are key for adding functionality to existing tools.

A context is mapped to an answer using a question[^6]. The answer becomes part of the new context. Repeat.

[^1]: A LLM can be considered a product of machine learning (ML). Mathematically speaking, it is a weighted coefficient matrix with a number of parameters that go beyond our imagination.
[^2]: Nothing to see there, yet, currently development takes place in the dark.
[^3]: LLMs exhibit biases much like humans do. Is AI transforming our perspectives and the way we perceive the world? AI is a creation born from our own thought processes, pieced together from elements of ourselves.
[^4]: We are navigating the information space.
[^5]: AI augmented reality is the new reality.
[^6]: I/O is so yesterday. Now it is Q&A.

[ai]: https://en.wikipedia.org/wiki/Artificial_intelligence
[ai-native]: https://www.ericsson.com/en/reports-and-papers/white-papers/ai-native
[chat-gpt]: https://en.wikipedia.org/wiki/ChatGPT
[embeddings]: https://zilliz.com/learn/everything-you-should-know-about-vector-embeddings
[gpt]: https://en.wikipedia.org/wiki/Generative_pre-trained_transformer
[image-to-text]: https://huggingface.co/tasks/image-to-text
[langchain]: https://langchain.com/
[llamaindex]: https://llamaindex.ai/
[llm]: https://en.wikipedia.org/wiki/Large_language_model
[llm-context]: https://symbl.ai/developers/blog/guide-to-context-in-llms/
[llm-lib]: https://www.npmjs.com/package/llm-lib
[llm-training]: https://www.run.ai/guides/machine-learning-engineering/llm-training
[nlp-vs-llm]: https://medium.com/@vaniukov.s/nlp-vs-llm-a-comprehensive-guide-to-understanding-key-differences-0358f6571910
[openai]: https://openai.com/
[prompt-engineering]: https://de.wikipedia.org/wiki/Prompt_Engineering
[rag]: https://en.wikipedia.org/wiki/Retrieval-augmented_generation
[sam-altman]: https://blog.samaltman.com/
[semantic-similarity]: https://huggingface.co/tasks/sentence-similarity
[speech-to-text]: https://huggingface.co/tasks/automatic-speech-recognition
[text-to-text]: https://huggingface.co/tasks/text-generation
[vector-db]: https://en.wikipedia.org/wiki/Vector_database
[vercel-ai-sdk]: https://sdk.vercel.ai/
[virtual-assistant]: https://en.wikipedia.org/wiki/Virtual_assistant
