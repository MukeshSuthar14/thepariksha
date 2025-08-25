import type React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "../components/ui/sonner"
import { ConfirmDialogProvider } from "../context/Confirm";

export default function Layout({
    children,
    setDialogOpen,
    quizStart
}: {
    children: React.ReactNode,
    setDialogOpen: Function,
    quizStart: boolean
}) {
    return (
        <ConfirmDialogProvider>
            <div className="bg-(--background) text-(--foreground)">
                <Header setDialogOpen={setDialogOpen} quizStart={quizStart} />
                <div className="w-full max-w-[1440px] mx-auto py-[110px] z-1">
                    {children}
                    <Toaster position="top-center" />
                </div>
                <Footer />
            </div>
        </ConfirmDialogProvider>
    )
}