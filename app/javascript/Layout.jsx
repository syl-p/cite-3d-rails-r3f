import {Link, usePage} from '@inertiajs/react'
import {Canvas} from "@react-three/fiber";
import Experience from "@/components/Experience.jsx";
import {useEffect, useMemo, useState} from "react";
import {Stats} from "@react-three/drei"
import FlashMessages from "@/components/FlashMessages.jsx";
import SplashScreen from "@/components/SplashScreen.jsx";
import useAppStore from "@/stores/useAppStore";
import Header from './components/Header.jsx';

export default function Layout({children}) {
    const { part, parts} = usePage().props
    const [currentIndex, setCurrentIndex] = useState(0);
    const showSpots = useAppStore((s) => s.showSpots)
    const setShowSpots = useAppStore((s) => s.setShowSpots)

    useEffect(() => {
        if (part) {
            const currentIndex = parts.findIndex(p => p.id === part.id)
            setCurrentIndex(currentIndex);
        }
    }, [part, parts]);

    const sectionClass = useMemo(() => {
    const baseClass = "relative lg:sticky lg:left-0 lg:top-4 border mb-6 lg:mb-0 rounded shadow overflow-hidden transition-all duration-700 ease-in-out "
        if (part) {
            // Show: moitié/moitié
            return baseClass + 'lg:w-3/6 h-[50vh] lg:h-[calc(100vh-theme(spacing.24))]'
        } else if (showSpots) {
            // Index + showSpots: canvas 4/6, panel 2/6
            return baseClass + 'lg:w-4/6 h-[calc(100vh-theme(spacing.24))]'
        } else {
            // Index + immersif: canvas full, panel caché
            return baseClass + 'lg:w-full h-[calc(100vh-theme(spacing.24))]'
        }
    }, [part, showSpots])

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

    return <>
        <Header />
        <main className="px-6 relative">
            <section className="lg:flex lg:gap-6">
                <section
                    className={sectionClass}>
                    <Canvas flat>
                        <Experience/>
                    </Canvas>
                    <div className="absolute left-0 bottom-0">
                        {part && <Pagination/>}
                    </div>
                </section>
                <section className={
                    (part ? 'lg:w-3/6' : showSpots ? 'lg:w-2/6' : 'hidden')
                    + ' overflow-hidden overflow-y-auto transition-all duration-600 ease-in-out'
                }>
                    {children}
                </section>
            </section>
            <SplashScreen/>
            <FlashMessages />
        </main>
    </>
}