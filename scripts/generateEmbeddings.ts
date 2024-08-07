import fs from "fs";
import path from "path";
import { OpenAIEmbeddings } from "@langchain/openai";
import emojiData from "unicode-emoji-json";
import emojilib from "emojilib";
import cliProgress from "cli-progress";
import { EmojiData, EmojiEmbedding } from "../src/types";

async function generateEmbeddings() {
  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
  const results: EmojiEmbedding[] = [];
  const progressBar = new cliProgress.SingleBar({
    format:
      "Progress: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Current: {emoji}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  try {
    const emojiEntries = Object.entries(emojiData);
    const totalEmojis = emojiEntries.length;
    console.log("Starting embeddings generation...");
    progressBar.start(totalEmojis, 0, { emoji: "" });

    for (const [emoji, data] of emojiEntries) {
      if (emojilib[emoji]) {
        const emojiInfo: EmojiData = {
          name: data.name,
          keywords: emojilib[emoji],
        };
        const text = `${emojiInfo.name} ${emojiInfo.keywords.join(" ")}`;
        const embeddingResult = await embeddings.embedQuery(text);
        results.push({
          emoji,
          embedding: embeddingResult,
        });
      }
      progressBar.increment(1, { emoji: emoji });
    }
    progressBar.stop();

    const outputDir = path.join(__dirname, "../data");
    const outputPath = path.join(outputDir, "embeddings.json");

    // 디렉토리가 존재하지 않으면 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nEmbeddings saved to ${outputPath}`);
    console.log("Embeddings generation completed");
  } catch (error) {
    progressBar.stop();
    console.error("\nFailed to generate embeddings");
    console.error(error);
  }
}

generateEmbeddings().catch(console.error);
