import {Html} from "@react-three/drei";
import {Link} from "@inertiajs/react";

export default function Spot({part, position: {x, y, z}}) {
    return <Html position={[x, y, z]} center className="group relative">
        <div className="w-[18px] h-[18px] rounded-full bg-yellow-500 p-1">
        </div>

        <div
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white p-2 min-w-[200px] opacity-0 group-hover:opacity-100 transition transition-opacity duration-150">
            <Link href={`/parts/${part.id}`}>{part.title}</Link>
        </div>
    </Html>
}