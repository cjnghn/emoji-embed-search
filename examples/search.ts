import { EmojiSearchService } from "../src/";
import { EmbeddingProviderFactory } from "../src/providers/EmbdeeingProviderFactory";
import { EmojiDataProviderFactory } from "../src/providers/EmojiDataProviderFactory";
import readline from "readline";

async function searchEmojis() {
  const emojiSearchService = new EmojiSearchService({
    embeddingProvider: EmbeddingProviderFactory.create({
      type: "openai",
      apiKey: process.env.OPENAI_API_KEY as string,
      model: "text-embedding-3-small",
    }),
    dataProvider: EmojiDataProviderFactory.create({
      type: "json",
      path: "./data/embeddings.json",
    }),
  });

  await emojiSearchService.initialize();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter a search term for emojis: ", async (query) => {
    const results = await emojiSearchService.search(query);
    console.log(results); // [ '🍜', '🍚', '🍲', '🥟', '🍝' ]
    rl.close();
  });
}

searchEmojis().catch(console.error);
