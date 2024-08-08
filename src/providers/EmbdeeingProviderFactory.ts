import { EmbeddingProviderConfig, EmbeddingProvider } from "../types";
import { OpenAIEmbeddingProvider } from "./OpenAIEmbeddingProvider";

export class EmbeddingProviderFactory {
  static create(config: EmbeddingProviderConfig): EmbeddingProvider {
    switch (config.type) {
      case "openai":
        return new OpenAIEmbeddingProvider(config);
      // Add other provider types here
      default:
        throw new Error(`Unknown embedding provider type: ${config.type}`);
    }
  }
}
