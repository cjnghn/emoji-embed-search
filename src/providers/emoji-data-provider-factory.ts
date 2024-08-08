import { EmojiDataProviderConfig, EmojiDataProvider } from "../types";
import { JsonEmojiDataProvider } from "./json-emoji-data-provider";

export class EmojiDataProviderFactory {
  static create(config: EmojiDataProviderConfig): EmojiDataProvider {
    switch (config.type) {
      case "json":
        return new JsonEmojiDataProvider(config);
      // Add other provider types here
      default:
        throw new Error(`Unknown emoji data provider type: ${config.type}`);
    }
  }
}
