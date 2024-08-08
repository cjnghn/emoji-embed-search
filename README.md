# emoji embedding search

## TODO

- [ ] Consider separating embedding files from the main library
- [ ] Trigger this separation when the user initializes the search service
- [ ] Develop a lightweight embedding model for local use only

## Example

NEXT:

```ts
// This uses your env `OPENAI_API_KEY`
const result = await emojiEmbeddingSearch("ramen");
```

If you want to customize embeds you can do this:

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
// or
// const emojiSearchService = new EmojiService();

// Initialize the service
// Note: Load or create a new embedding if not exists xD
await emojiSearchService.initialize();

// Search for emojis
const results = await emojiSearchService.search("ramen"); // ["🍜", "🍚", "🍲", "🥟", "🍝"];
```
