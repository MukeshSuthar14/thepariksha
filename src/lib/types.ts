export interface QuizData {
    name: string,
    score: number
}

export interface QuestionData {
    category?: string,
    id: string,
    correctAnswer: string,
    incorrectAnswers: string[],
    question: {
        text: string
    },
    tags?: string[],
    type?: string,
    difficulty: string,
    regions?: any[],
    isNiche?: boolean
}