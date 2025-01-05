import Link from "next/link"

export default function Footer(){

    const year = new Date().getFullYear()

    return(
        <footer className="fixed bottom-0 w-full bg-transparent text-center py-1">
            <p className="text-sm text-zinc-500">&copy; {year} - <Link href="/" className="underline">anonChat</Link></p>
        </footer>
    )
}