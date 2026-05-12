import {useProgress} from "@react-three/drei";
import {useEffect, useState} from "react";

export default function SplashScreen() {
    const {progress} = useProgress()
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => setVisible(false), 500)
            return () => clearTimeout(timer)
        }
    }, [progress])

    if (!visible) return null

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500"
            style={{opacity: progress >= 100 ? 0 : 1}}
        >
            <div className="flex flex-col items-center space-y-8">
                <h1 className="font-spectral text-center">
                    <span className="block text-4xl tracking-wide">Cité</span>
                    <span className="block text-2xl font-bold tracking-widest">de Carcassonne</span>
                </h1>

                <div className="w-72 space-y-3">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-500 rounded-full transition-all duration-300 ease-out"
                            style={{width: `${progress}%`}}
                        />
                    </div>
                    <p className="text-center text-sm text-gray-500 font-mono">
                        {Math.round(progress)}%
                    </p>
                </div>
            </div>
        </div>
    )
}
