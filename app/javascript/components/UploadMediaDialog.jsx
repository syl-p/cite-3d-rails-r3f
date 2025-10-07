import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {useForm} from "@inertiajs/react";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";

export default function UploadMediaDialog({partId, children}) {
    const [open, setOpen] = useState(false)
    const {data, setData, processing, post, errors} = useForm({
        file: null
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(`/parts/${partId}/media`, {
            onSuccess: (data) => {
                // media.push(data)
                setOpen(false)
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Ajoutez votre photo</DialogTitle>
            <Input type="file"
                   errors={errors}
                   onChange={e => setData('file', e.target.files[0])}/>
            {errors.file && <p className="text-sm text-red-500 mt-1">{errors.file.join(', ')}</p>}
            <DialogFooter>
                <Button onClick={handleSubmit} disabled={processing}>Upload !</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}