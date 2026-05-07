import {useForm, router} from "@inertiajs/react";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function Profile({user}) {
    const {data, setData, put, processing, errors} = useForm({
        username: user.username || '',
        email_address: user.email_address || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/users/${user.id}`, {
            onSuccess: () => {
                // TODO: Flash
            }
        })
    }

    return <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Label htmlFor="username" className="mb-3">Username</Label>
            <Input
                id="username"
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
        </div>

        <div>
            <Label htmlFor="email" className="mb-3">Email</Label>
            <Input
                id="email"
                type="email"
                value={data.email_address}
                onChange={(e) => setData('email_address', e.target.value)}
            />
            {errors.email_address && <p className="text-sm text-red-500">{errors.email_address}</p>}
        </div>

        <div className="flex space-x-3">
            <Button type="submit" disabled={processing} className="flex-1">
                Enregistrer
            </Button>
            <Button
                type="button"
                variant="destructive"
                disabled={processing}
                onClick={() => {
                    if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
                        router.delete(`/settings/profile/${user.id}`)
                    }
                }}
            >
                Supprimer mon compte
            </Button>
        </div>
    </form>
}