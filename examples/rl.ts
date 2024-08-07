import readline from "readline";
import {
  EmojiSearchService,
  OpenAIEmbeddingProvider,
  JsonEmojiDataProvider,
} from "../src";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function searchEmojis(query: string) {
  const emojiSearchService = new EmojiSearchService(
    new OpenAIEmbeddingProvider(process.env.OPENAI_API_KEY as string),
    new JsonEmojiDataProvider("data/embeddings.json")
  );

  await emojiSearchService.initialize();

  const results = await emojiSearchService.search(query);
  console.log(results);
}

function promptUser() {
  rl.question("Enter emoji search query: ", async (input) => {
    await searchEmojis(input);
    promptUser(); // Prompt again for the next query
  });
}

promptUser();
