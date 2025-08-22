import { Button } from "../components/ui/button";

export default function Header({
    setDialogOpen
}: {
    setDialogOpen: Function
}) {
    return (
        <header className="fixed left-0 right-0 top-0 z-20 p-2 md:p-5 bg-(--background) text-(--foreground) border-(--foreground) border-b-1">
            <div className="flex justify-between gap-5 max-w-[1440px] mx-auto">
                <div>
                    <a className="flex gap-2 md:gap-5" href="/">
                        <div>
                            <img className="h-20 md:h-[3.75rem] shrink-0 rounded-xl" src="/favicon.ico" alt="Pariksha Logo" />
                        </div>
                        <div className="my-auto">
                            <div className="text-xl md:text-3xl font-bold"><h1>Pariksha</h1></div>
                            <div className="opacity-[0.5] pl-1"><h2>Pariksha, The Quiz Game!!</h2></div>
                        </div>
                    </a>
                </div>
                <div className="fixed bottom-2 right-2 md:static">
                    <Button className="h-full font-bold text-base" onClick={() => setDialogOpen(true)}>Take a Quiz</Button>
                </div>
            </div>
        </header>
    )
}