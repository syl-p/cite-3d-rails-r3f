import { Link } from "@inertiajs/react"
import PartForm from "@/components/admin/PartForm"

export default function New({part}) {
    return <div className="container mx-auto">
        <Link href="/admin/parts" className="mb-4"> Retour </Link>
        <PartForm part={part} method="post" url="/admin/parts" title="Admin - Nouvelle Partie" />
    </div>
}
