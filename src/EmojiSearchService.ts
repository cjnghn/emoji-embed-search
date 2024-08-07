import { EmbeddingProvider, EmojiDataProvider } from "./types";

export class EmojiSearchService {
  constructor(
    private embeddingProvider: EmbeddingProvider,
    private dataProvider: EmojiDataProvider
  ) {}

  async initialize(): Promise<void> {
    await this.dataProvider.loadData();
  }

  async search(query: string): Promise<string[]> {
    const queryEmbedding = await this.embeddingProvider.embedQuery(query);
    return this.dataProvider.findSimilarEmojis(queryEmbedding);
  }
}
