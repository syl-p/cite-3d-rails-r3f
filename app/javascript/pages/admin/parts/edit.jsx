import { Link } from "@inertiajs/react"
import PartForm from "@/components/admin/PartForm"

export default function Edit({part}) {
    return <div className="container mx-auto">
        <Link href="/admin/parts" className="mb-4"> Retour </Link>
        <PartForm part={part} method="patch" url={`/admin/parts/${part.id}`} title={`Admin - Edit Part #${part.id}`} />
    </div>
}
