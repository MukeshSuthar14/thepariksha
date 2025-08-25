import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { shuffle, updateScoreBoard } from "../lib/helper";
import type { QuestionData } from "../lib/types";
import { Check, X } from "lucide-react";

export default function QuizForm({
    setQuizStart,
    dialogOpen
}: {
    setQuizStart: Function,
    dialogOpen: boolean
}) {
    const queryClient = useQueryClient();
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['questions'],
        queryFn: () => fetch('https://the-trivia-api.com/v2/questions').then((res) => res.json()),
        refetchOnWindowFocus: false
    });

    const [questions, setQuestions] = useState<QuestionData[] | null>(null);
    const [runingQuestionIndex, setRuningQuestionIndex] = useState<number>(0);
    const [revelAnswer, setRevelAnswer] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [suffleAnswer, setSuffleAnswer] = useState<string[] | null>(null);

    const handleCheckAnswer = (check: boolean) => {
        setRevelAnswer(true);
        if (!revelAnswer) {
            check && setScore(score + 10);
        }
    }

    const goToNextQuestion = () => {
        setRevelAnswer(false);
        if (questions?.length && (runingQuestionIndex + 1) < questions?.length) {
            answerSet(data[runingQuestionIndex + 1]);
            setRuningQuestionIndex(runingQuestionIndex + 1)
        } else {
            toast("Quiz Completed. Please Check Your Score In Dashboard.");
            updateScoreBoard({
                name: localStorage.getItem("currentUserName") as string,
                score: score
            })
            setQuizStart(false);
        }
    }

    const answerSet = (runingQuestion: QuestionData) => {
        let ans = shuffle([...runingQuestion.incorrectAnswers, runingQuestion.correctAnswer])
        setSuffleAnswer(ans);
    }

    useEffect(() => {
        if (!isPending) {
            if (!error) {
                setQuestions(data)
                if (data && data[runingQuestionIndex]) {
                    answerSet(data[runingQuestionIndex])
                }
            }
        }
    }, [isPending])

    useEffect(() => {
        if (!dialogOpen && data) {
            queryClient.removeQueries({ queryKey: ['questions'], exact: true });
            refetch();
        }
    }, [dialogOpen]);

    return (
        <div className="flex flex-col gap-3 justify-center items-center">
            {(!isPending && questions && questions?.length > 0) ? ((question: any) => (
                <div className="flex flex-col gap-3 p-3 md:w-full md:text-2xl">
                    <div className="flex justify-between gap-2 px-2">
                        <div>Difficulty: {question.difficulty}</div>
                        <div>Category: {question.category}</div>
                    </div>
                    {question.tags.length > 0 && <div className="px-2">Tags: {question.tags.map((tag: string, key: number) => <span key={key}> #{tag}</span>)}</div>}
                    <div className="flex justify-between gap-2 px-2 mt-5">
                        <div>Questions: {runingQuestionIndex + 1} of {questions?.length}</div>
                        <div>Score: {score}</div>
                    </div>
                    <div className="px-2">
                        {runingQuestionIndex + 1}) {question?.question?.text}
                    </div>
                    <div className="mt-5">
                        {suffleAnswer && suffleAnswer?.map((ans: string, key: number) => (
                            <div key={key} className={`flex justify-between gap-3 my-1 rounded-xl py-1 px-2 ${revelAnswer ? (ans === question?.correctAnswer ? "border border-green-400" : "border border-red-300") : ""}`} onClick={() => handleCheckAnswer(ans === question?.correctAnswer)}>{`${(["A", "B", "C", "D"])[key]}) ${ans}`}{revelAnswer && (ans === question?.correctAnswer ? <Check className="my-auto" /> : <X className="my-auto" />)}</div>
                        ))}
                    </div>
                    {revelAnswer && <Button className="md:self-end md:text-xl md:w-30" onClick={goToNextQuestion}>Next</Button>}
                </div>
            ))(questions[runingQuestionIndex]) : (
                !error ? (<div className="flex justify-center items-center font-bold text-4xl">Loading...</div>): (<div className="flex justify-center items-center font-bold text-4xl">{error.message}</div>)
            )}
        </div>
    )
}