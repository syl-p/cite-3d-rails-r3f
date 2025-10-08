import {Link, usePage} from '@inertiajs/react'
import {Canvas} from "@react-three/fiber";
import Experience from "@/components/Experience.jsx";
import UserDropdown from "@/components/UserDropdown.jsx";
import LoginBtn from "./components/LoginBtn.jsx";
import {useEffect, useState} from "react";
import {Stats} from "@react-three/drei"

export default function Layout({children}) {
    const {current_user, part, parts} = usePage().props
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (part) {
            const currentIndex = parts.findIndex(p => p.id === part.id)
            setCurrentIndex(currentIndex);
        }
    }, [part, parts]);

    function Pagination() {
        const previous = parts.at(currentIndex - 1)
        const next = parts.at(currentIndex + 1)
        const props = {
            className: "border p-3 flex flex-col items-center justify-center"
        };
        return <div className="flex">
            {previous && <Link href={`/parts/${previous.id}`} {...props}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                </svg>
            </Link>}
            {next && <Link href={`/parts/${next.id}`} {...props}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
            </Link>}
        </div>
    }

    return (
        <main className="p-4">
            <header className="z-50 px-8 fixed flex items-center justify-between top-8 left-0 w-full">
                <div>
                    <Link href="/" className="uppercase font-spectral flex space-x-3 items-center">
                        <span className="block p-2 bg-yellow-500 text-white font-bold">
                        </span>
                        <span className="hidden md:block">
                          Cité<br/>
                          de <span className="font-bold">Carcassonne</span>
                        </span>
                    </Link>
                </div>
                <div className="flex-1 flex space-x-3 items-center justify-end">
                    {current_user ? <UserDropdown user={current_user}/> : <LoginBtn/>}
                </div>
            </header>
            <section className="lg:grid lg:grid-cols-6 lg:gap-6">
                <section
                    className={"relative lg:sticky lg:left-0 lg:top-4 border mb-6 lg:mb-0 rounded shadow overflow-hidden "
                        + (part ? 'lg:col-span-3 h-[50vh] lg:h-[calc(100vh-theme(spacing.8))]' : 'lg:col-span-6 h-[calc(100vh-theme(spacing.8))]')}>
                    <Canvas flat>
                        <Experience/>
                        <Stats/>
                    </Canvas>
                    <div className="absolute left-0 bottom-0">
                        {part && <Pagination/>}
                    </div>
                </section>
                {part && <section className="col-span-3 lg:pt-22">
                    {children}
                </section>}
            </section>
        </main>
    )
}