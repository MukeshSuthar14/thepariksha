export default function Footer() {
    return (
        <footer className="mx-auto flex items-center gap-x-4 p-3 md:p-5 border-gray-300 border-t-2 bg-(--background) text-(--foreground) fixed bottom-0 left-0 right-0">
            <div className="flex flex-col md:flex-row justify-between w-full max-w-[1440px] mx-auto">
                <div className="text-xl font-medium">Copyright ©{new Date().getFullYear()} Pariksha. All Rights Reserved.</div>
                <p className="">Developed By <a className="decoration-none" target="__blank" href="https://linkedin.com/in/mukeshsuthar90">Mukesh Suthar</a></p>
            </div>
        </footer>
    )
}