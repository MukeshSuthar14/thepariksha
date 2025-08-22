import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import type { QuizData } from "../lib/types";
import { getScoreBoardData } from "../lib/helper";

export default function QuizDashboard({
    setDialogOpen
}: {
    setDialogOpen: Function
}) {
    const [quizData, setQuizData] = useState<QuizData[] | null>(null);

    useEffect(() => {
        const quiz = getScoreBoardData();
        if (!quiz) {
            setQuizData(null)
            return;
        }
        setQuizData(quiz);
    }, []);

    const startQuizeButton = () => <Button className="h-full font-bold text-base" onClick={() => setDialogOpen(true)}>Take a Quiz</Button>

    return (
        <div className="flex flex-col-reverse gap-10 justify-between items-center md:flex-row md:gap-5 w-full mx-auto my-10" style={{}}>
            <div className="flex flex-col items-center w-full md:w-[50%] mb-5 md:mb-0">
                <div className="text-3xl font-bold"><h3>Dashboard</h3></div>
                <div className="mt-5">
                    <table className="shadow-lg">
                        <thead>
                            <tr>
                                <th className="p-2 border-(--foreground) border-1 text-center">Sr. No.</th>
                                <th className="p-2 border-(--foreground) border-1 text-center">Name</th>
                                <th className="p-2 border-(--foreground) border-1 text-center">Scores</th>
                            </tr>
                        </thead>
                        <thead>
                            {quizData && quizData?.length > 0 ? (
                                quizData.map((quiz: QuizData, key: number) => (
                                    <tr key={key}>
                                        <td className="p-2 border-(--foreground) border-1 text-center">{key + 1}</td>
                                        <td className="p-2 border-(--foreground) border-1 text-center">{quiz?.name}</td>
                                        <td className="p-2 border-(--foreground) border-1 text-center">{quiz?.score}</td>
                                    </tr>
                                ))
                            ): (
                                <tr>
                                    <td className="p-2 border-(--foreground) border-1 text-center" colSpan={3}>No Data Found.</td>
                                </tr>
                            )}
                        </thead>
                    </table>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 w-full md:w-[50%]">
                <img className="hidden md:block size-30" src="favicon.ico" alt="Pariksha Logo" />
                <h1 className="text-5xl font-bold">Pariksha</h1>
                <h2 className="text-2xl">The Quiz App.</h2>
                <div className="fixed bottom-2 right-2 md:static mt-5">
                    {startQuizeButton()}
                </div>
            </div>
        </div>
    )
}