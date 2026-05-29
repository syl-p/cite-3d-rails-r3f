import Cta from "@/components/Cta";
import { Link, router } from "@inertiajs/react";

export default function index({ parts }) {
  return <article className="h-full overflow-hidden overflow-y-auto">
    <ul className="divide-y space-y-3">
        {parts.map(part => (
            <li key={part.id} className="p-6 border">
                <h3 className="mb-1">
                    <Link href={`/parts/${part.id}`} className="text-2xl">
                        {part.title}
                    </Link>
                </h3>
                <p className="mb-3">{part.description}</p>
                <Cta>
                    <Link href={`/parts/${part.id}`}>
                        Voir plus
                    </Link>
                </Cta>
            </li>
        ))}
    </ul>
</article>
}
