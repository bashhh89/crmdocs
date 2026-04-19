import {createOpenAICompatible} from '@ai-sdk/openai-compatible';
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from 'ai';
import {z} from 'zod';
import {source} from '@/lib/source';
import {Document, type DocumentData} from 'flexsearch';

interface CustomDocument extends DocumentData {
  url: string;
  title: string;
  description: string;
  content: string;
}

export type ChatUIMessage = UIMessage<
  never,
  {
    client: {
      location: string;
    };
  }
>;

const searchServer = createSearchServer();

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: 'url',
      index: ['title', 'description', 'content'],
      store: true,
    },
  });

  const docs = await chunkedAll(
    source.getPages().map(async (page) => {
      if (!('getText' in page.data)) return null;
      return {
        title: page.data.title,
        description: page.data.description ?? '',
        url: page.url,
        content: await page.data.getText('processed'),
      } as CustomDocument;
    }),
  );

  for (const doc of docs) {
    if (doc) search.add(doc);
  }
  return search;
}

async function chunkedAll<O>(promises: Promise<O>[]): Promise<O[]> {
  const SIZE = 50;
  const out: O[] = [];
  for (let i = 0; i < promises.length; i += SIZE) {
    out.push(...(await Promise.all(promises.slice(i, i + SIZE))));
  }
  return out;
}

// Ollama Cloud — OpenAI-compatible endpoint.
// Env: OLLAMA_API_KEY (required), OLLAMA_BASE_URL (default https://ollama.com/v1),
// OLLAMA_MODEL (default gpt-oss:120b).
const ollama = createOpenAICompatible({
  name: 'ollama-cloud',
  baseURL: process.env.OLLAMA_BASE_URL ?? 'https://ollama.com/v1',
  apiKey: process.env.OLLAMA_API_KEY ?? '',
});

const systemPrompt = [
  'You are the ANC Docs Assistant — you help ANC Sports operators use their custom Twenty CRM at crm.ancsports.net.',
  'Use the `search` tool to retrieve relevant docs passages before answering. Always ground answers in the docs.',
  'Be concise and operational: give exact steps, field names, view names, or copy-pastable prompts.',
  'When the user asks for a Boyka prompt, quote the example prompt verbatim inside a fenced code block.',
  'Never invent field IDs, UUIDs, or endpoints. If something is not in the docs, say so and suggest the closest topic.',
  'Format with clean markdown — short paragraphs, bullets, code blocks.',
].join('\n');

export async function POST(req: Request) {
  const reqJson = await req.json();
  const model = process.env.OLLAMA_MODEL ?? 'gpt-oss:120b';

  const result = streamText({
    model: ollama.chatModel(model),
    stopWhen: stepCountIs(5),
    tools: {search: searchTool},
    messages: [
      {role: 'system', content: systemPrompt},
      ...(await convertToModelMessages<ChatUIMessage>(reqJson.messages ?? [], {
        convertDataPart(part) {
          if (part.type === 'data-client') {
            return {
              type: 'text',
              text: `[Client Context: ${JSON.stringify(part.data)}]`,
            };
          }
        },
      })),
    ],
    toolChoice: 'auto',
  });

  return result.toUIMessageStreamResponse();
}

export type SearchTool = typeof searchTool;

const searchTool = tool({
  description: 'Search the ANC documentation and return JSON results grounded in the operator guide.',
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({query, limit}) {
    const search = await searchServer;
    return await search.searchAsync(query, {limit, merge: true, enrich: true});
  },
});
