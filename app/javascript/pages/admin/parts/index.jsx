import { Link } from "@inertiajs/react";

export default function Index({ _current_user, parts }) {
    return <div className="container mx-auto">
        <h1 className="text-xl mb-3">Parts</h1>
        <table className="w-full border">
            <thead>
                <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {parts.map(part => (
                    <tr key={part.id}>
                        <td className="border p-2">{part.id}</td>
                        <td className="border p-2">{part.title}</td>
                        <td className="border p-2">
                            <Link href={`/admin/parts/${part.id}/edit`}>
                                Editer
                            </Link>
                            <Link href={`/admin/parts/${part.id}`} method="delete" as="button" className="ml-4 text-red-500">
                                Supprimer
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="w-full flex justify-end mb-12 mt-6">
            <Link href="/admin/parts/new">
                Ajouter une partie
            </Link>
        </div>
    </div>
}