# emoji embed search

## TODO

- [ ] Enhance multi-language support
- [ ] Consider separating embedding files from the main library
- [ ] Trigger this separation when the user initializes the search service
- [ ] Develop a lightweight embedding model for local use only
- [ ] Create a simple demo webpage
- [ ] Determine methods to measure user search satisfaction

## Example

NEXT:

```ts
// Usage
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

// Initialize the service
// Note: Load or create a new embedding if not exists xD
await emojiSearchService.initialize();

// Search for emojis
const results = await emojiSearchService.search("instant foods"); // [ '🥫', '🍨', '🍲', '🧑‍🍳', '🥘' ]
```
