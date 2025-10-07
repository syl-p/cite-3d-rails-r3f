import { useForm } from '@inertiajs/react'
import { Button } from '../../components/ui/button.jsx'
import { Input } from '../../components/ui/input.jsx'
import { Label } from '../../components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.jsx'

export default function New() {
    const { data, setData, post, processing, errors } = useForm({
        email_address: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/session', {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Label htmlFor="email" className="mb-3">Email</Label>
            <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email_address', e.target.value)}
                required
            />
            {errors.email_address && <p className="text-sm text-red-500 mt-1">{errors.email_address}</p>}
        </div>

        <div>
            <Label htmlFor="password" className="mb-3">Mot de passe</Label>
            <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        {errors.auth && <p className="text-sm text-red-500">{errors.auth}</p>}

        <Button type="submit" className="w-full" disabled={processing}>
            Se connecter
        </Button>
    </form>
    )
}