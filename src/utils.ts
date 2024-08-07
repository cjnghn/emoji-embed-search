export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, value, i) => acc + value * vecB[i], 0);
  const magnitudeA = Math.sqrt(
    vecA.reduce((acc, value) => acc + value ** 2, 0)
  );
  const magnitudeB = Math.sqrt(
    vecB.reduce((acc, value) => acc + value ** 2, 0)
  );

  return dotProduct / (magnitudeA * magnitudeB);
}
