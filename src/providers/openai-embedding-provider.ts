import { OpenAI } from "openai";
import { EmbeddingProvider, EmbeddingProviderConfig } from "../types";

export class OpenAIEmbeddingProvider implements EmbeddingProvider {
  private openai: OpenAI;

  constructor(private config: EmbeddingProviderConfig) {
    this.openai = new OpenAI({ apiKey: config.apiKey });
  }

  async embedQuery(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: this.config.model,
      input: text,
      encoding_format: "float",
    });
    return response.data[0].embedding;
  }
}
