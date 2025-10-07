import { useForm, usePage } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function Settings({user}) {
    const { data, setData, put, processing, errors } = useForm({
        username: user.username || '',
        email_address: user.email_address || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/users/${user.id}`)
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

        <Button type="submit" disabled={processing} className="w-full">
            Enregistrer
        </Button>
    </form>
}