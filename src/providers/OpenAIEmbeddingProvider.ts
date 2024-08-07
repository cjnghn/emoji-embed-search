import { OpenAIEmbeddings } from "@langchain/openai";
import { EmbeddingProvider } from "../types";

export class OpenAIEmbeddingProvider implements EmbeddingProvider {
  private embeddings: OpenAIEmbeddings;

  constructor(apiKey: string, model: string = "text-embedding-3-small") {
    this.embeddings = new OpenAIEmbeddings({ apiKey, model });
  }

  async embedQuery(text: string): Promise<number[]> {
    return this.embeddings.embedQuery(text);
  }
}
