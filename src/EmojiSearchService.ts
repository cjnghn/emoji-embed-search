import { EmbeddingProviderFactory } from "./providers/EmbdeeingProviderFactory";
import { EmojiDataProviderFactory } from "./providers/EmojiDataProviderFactory";
import { EmbeddingProvider, EmojiDataProvider } from "./types";

export class EmojiSearchService {
  private embeddingProvider: EmbeddingProvider;
  private dataProvider: EmojiDataProvider;

  constructor(config: {
    embeddingProvider: ReturnType<typeof EmbeddingProviderFactory.create>;
    dataProvider: ReturnType<typeof EmojiDataProviderFactory.create>;
  }) {
    this.embeddingProvider = config.embeddingProvider;
    this.dataProvider = config.dataProvider;
  }

  async initialize(): Promise<void> {
    await this.dataProvider.loadData();
  }

  async search(query: string): Promise<string[]> {
    const queryEmbedding = await this.embeddingProvider.embedQuery(query);
    return this.dataProvider.findSimilarEmojis(queryEmbedding);
  }
}
