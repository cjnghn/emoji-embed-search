import {
  EmojiSearchService,
  OpenAIEmbeddingProvider,
  JsonEmojiDataProvider,
} from "../src/";

async function searchEmojis() {
  const emojiSearchService = new EmojiSearchService(
    new OpenAIEmbeddingProvider(process.env.OPENAI_API_KEY as string),
    new JsonEmojiDataProvider("data/embeddings.json")
  );

  await emojiSearchService.initialize();

  const results = await emojiSearchService.search("ramen");
  console.log(results); // [ '🍜', '🍚', '🍲', '🥟', '🍝' ]
}

searchEmojis().catch(console.error);
