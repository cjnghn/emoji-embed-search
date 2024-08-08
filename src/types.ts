export interface EmojiData {
  name: string;
  keywords: string[];
}

export interface EmojiEmbedding {
  emoji: string;
  embedding: number[];
}

export interface EmbeddingProvider {
  embedQuery(text: string): Promise<number[]>;
}

export interface EmojiDataProvider {
  loadData(): Promise<void>;
  findSimilarEmojis(queryEmbedding: number[]): Promise<string[]>;
}

export interface EmbeddingProviderConfig {
  type: string;
  apiKey: string;
  model: string;
}

export interface EmojiDataProviderConfig {
  type: string;
  path: string;
}
