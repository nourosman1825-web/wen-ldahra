import OpenAI from "openai";

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAI | undefined;
};

// Lazy singleton: the OpenAI SDK throws at construction time if apiKey is
// empty, so building this eagerly at module load would crash `next build`
// / any import of this file whenever OPENAI_API_KEY isn't set yet. Deferring
// construction to first use means only an actual chat request fails.
export function getOpenAI(): OpenAI {
  if (!globalForOpenAI.openai) {
    globalForOpenAI.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return globalForOpenAI.openai;
}

