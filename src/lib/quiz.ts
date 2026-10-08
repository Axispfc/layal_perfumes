// Future quiz contract. Recommendations require the official catalog.
export type QuizAnswers = { occasion: "daily" | "evening"; family: "floral" | "woody" | "fresh"; intensity: "soft" | "intense" };
export interface FragranceQuizService { recommend(answers: QuizAnswers): Promise<string[]> }
