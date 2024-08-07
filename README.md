# emoji embed search

## TODO

- [ ] Add super light weight embed model for local only

## Example

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
