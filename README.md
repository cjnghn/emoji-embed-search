# emoji embed search

## TODO

• Enhance multi-language support
• Consider separating embedding files from the main library
• Trigger this separation when the user initializes the search service
• Develop a lightweight embedding model for local use only
• Create a simple demo webpage
• Determine methods to measure user search satisfaction

## Example

CURRENT:

```ts
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
```

NEXT:

```ts
// Usage
const emojiSearchService = new EmojiSearchService({
  embeddingProvider: EmbeddingProviderFactory.create({
    type: "openai",
    apiKey: "OPENAI_API_KEY",
    model: "text-embedding-3-small",
  }),
  dataProvider: EmojiDataProviderFactory.create({
    type: "json",
    path: "../data/openai/text-embedding-3-small/embeddings.json",
  }),
});

// Initialize the service
await emojiSearchService.initialize();

// Search for emojis
const results = await emojiSearchService.search("행복한 얼굴");
```
