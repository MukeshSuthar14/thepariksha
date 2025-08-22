import { z } from "zod"

export const QuizFormSchema = z.object({
    name: z.string().trim().nonempty({ message: "Please Enter Your Name" })
});

export type QuizFormProps = z.infer<typeof QuizFormSchema>;