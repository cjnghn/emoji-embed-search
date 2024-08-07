import fs from "fs/promises";
import { EmojiDataProvider, EmojiEmbedding } from "../types";
import { cosineSimilarity } from "../utils";

export class JsonEmojiDataProvider implements EmojiDataProvider {
  private data: EmojiEmbedding[] = [];
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async loadData(): Promise<void> {
    const fileContent = await fs.readFile(this.filePath, "utf-8");
    this.data = JSON.parse(fileContent);
  }

  async findSimilarEmojis(
    queryEmbedding: number[],
    topK = 5
  ): Promise<string[]> {
    // Cosine Similarity + top K
    const similarities = this.data.map((emoji) => ({
      emoji: emoji.emoji,
      similarity: cosineSimilarity(queryEmbedding, emoji.embedding),
    }));
    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities.slice(0, topK).map((similarity) => similarity.emoji);
  }
}
