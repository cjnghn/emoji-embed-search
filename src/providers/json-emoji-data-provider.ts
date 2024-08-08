import fs from "fs/promises";
import {
  EmojiDataProvider,
  EmojiDataProviderConfig,
  EmojiEmbedding,
} from "../types";

export class JsonEmojiDataProvider implements EmojiDataProvider {
  private embeddings: EmojiEmbedding[] = [];

  constructor(private config: EmojiDataProviderConfig) {}

  async loadData(): Promise<void> {
    const data = await fs.readFile(this.config.path, "utf-8");
    this.embeddings = JSON.parse(data);
  }

  async findSimilarEmojis(
    queryEmbedding: number[],
    topK = 10
  ): Promise<string[]> {
    // Implement cosine similarity search here
    // This is a simplified version, you might want to use a more efficient algorithm
    const similarities = this.embeddings.map((emoji) => ({
      emoji: emoji.emoji,
      similarity: this.cosineSimilarity(queryEmbedding, emoji.embedding),
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities.slice(0, topK).map((s) => s.emoji);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
