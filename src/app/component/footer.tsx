export default function Footer(){

    const year = new Date().getFullYear()

    return(
        <footer className="fixed bottom-0 w-full bg-transparent py-3 text-center">
            <p className="text-lg text-zinc-500">{year} - anonChat</p>
        </footer>
    )
}