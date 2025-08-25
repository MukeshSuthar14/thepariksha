import { useForm } from "react-hook-form"
import { AlertDialogCancel, AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog"
import { Button } from "../components/ui/button"
import { Form } from "../components/ui/form"
import Input from "../components/inputs/Input"
import QuizForm from "./QuizForm"
import { zodResolver } from "@hookform/resolvers/zod";
import QuizDashboard from "./QuizDashboard"
import { QuizFormSchema, type QuizFormProps } from "../zod-schema/QuizFormSchema"
import { toast } from "sonner"

type Props = {
    dialogOpen: boolean,
    setDialogOpen: Function,
    quizStart: boolean, 
    setQuizStart: Function
}

export default function Home({
    dialogOpen,
    setDialogOpen,
    quizStart, 
    setQuizStart
}: Props) {
    const defaultValues = { name: "" }
    const form = useForm<QuizFormProps>({
        defaultValues,
        resolver: zodResolver(QuizFormSchema)
    });

    const handleTaskStart = (data: any) => {
        if (data.name) localStorage.setItem("currentUserName", data.name);
        setQuizStart(true);
        setDialogOpen(false);
        toast(`Hello ${data?.name}. Welcome to quiz app. you can start your quiz.`);
        form.reset(defaultValues);
    }

    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            form.handleSubmit(handleTaskStart)();
        }
    }

    return (
        <div className="py-auto">
            {quizStart ? (
                <QuizForm dialogOpen={dialogOpen} setQuizStart={setQuizStart} />
            ) : (
                <QuizDashboard setDialogOpen={setDialogOpen} />
            )}
            <AlertDialog open={dialogOpen}>
                <Form {...form}>
                    <form className="block m-auto" onSubmit={form.handleSubmit(handleTaskStart)}>
                        <AlertDialogContent className="sm:max-w-[425px] bg-(--background)">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-2xl">Take a Quiz</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription className="text-gray-400">
                                Enter Your Name...
                            </AlertDialogDescription>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Input type="text" className="w-[100%]" autoComplete="off" placeholder="Enter Your Name Here..." name="name" onKeyDown={handleKeyDown} />
                                </div>
                            </div>
                            <AlertDialogFooter className="gap-3">
                                <AlertDialogCancel asChild>
                                    <Button className="border-(--foreground)" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                                </AlertDialogCancel>
                                <Button type="submit" className="border-(--foreground)" onClick={form.handleSubmit(handleTaskStart)}>Add</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </form>
                </Form>
            </AlertDialog>
        </div>
    )
}