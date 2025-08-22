import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form"
import { Input as FormInput } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import type { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

type Props = {
    title?: string,
    name: string,
    className?: string,
    description?: string,
    hideError?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({
    title,
    name,
    className,
    description,
    hideError = false,
    ...props
}: Props) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    {title && (
                        <Label className="text-base" htmlFor={name}>{title}</Label>
                    )}
                    <FormControl>
                        <FormInput className={`w-full ${className || ""}`} autoComplete="off" {...field} {...props} />
                    </FormControl>
                    {description && (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    )}
                    {!hideError && (
                        <FormMessage />
                    )}
                </FormItem>
            )}
        />
    )
}