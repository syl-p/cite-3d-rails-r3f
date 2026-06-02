import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react"

export default function PartForm({part, method, url, title}) {
    const form = useForm({
        title: part.title ?? '',
        description: part.description ?? '',
        object_name: part.object_name ?? '',
        body: part.body ?? ''
    })

    function handleSubmit(e) {
        e.preventDefault();
        form[method](url, {onError: () => {}})
    }

    return <div className="container mx-auto">
        <h1 className="text-xl mb-3">{title}</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Label for="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    value={form.data.title}
                    onChange={e => form.setData('title', e.target.value)}
                />
                {form.errors.title && <p className="text-red-500 mt-2">{form.errors.title}</p>}
            </div>

            <div className="mb-3">
                <Label for="description">Description</Label>
                <Textarea
                    id="description"
                    value={form.data.description}
                    onChange={e => form.setData('description', e.target.value)}
                />
                {form.errors.description && <p className="text-red-500 mt-2">{form.errors.description}</p>}
            </div>

            <div className="mb-3">
                <Label for="content">Contenu</Label>
                <Textarea
                    id="content"
                    value={form.data.body}
                    onChange={e => form.setData('body', e.target.value)}
                />
                {form.errors.body && <p className="text-red-500 mt-2">{form.errors.body}</p>}
            </div>

            <div className="mb-3">
                <Label for="object_name">Object Name</Label>
                <Input
                    id="object_name"
                    type="text"
                    value={form.data.object_name}
                    onChange={e => form.setData('object_name', e.target.value)}
                />
                {form.errors.object_name && <p className="text-red-500 mt-2">{form.errors.object_name}</p>}
            </div>

            <Button type="submit" disabled={form.processing} className="mt-4">
                {method === 'patch' ? 'Enregistrer' : 'Créer'}
            </Button>
        </form>
    </div>
}
