import {useForm} from "@inertiajs/react";
import {Button} from "@/components/ui/button.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";

export default function CommentForm({part_id}) {
    const {data, setData, error, processing, post} = useForm({
        content: ""
    })

    function handleSubmit(e) {
        e.preventDefault();
        post(`/parts/${part_id}/comments`, {
            onSuccess: () => {
                setData({
                    content: ""
                })
            },
            onError: () => {
            }
        })
    }

    return <form onSubmit={handleSubmit}>
        <Textarea onChange={e => setData('content', e.target.value)} defaultValue={data.content}></Textarea>
        <Button type="submit" className="my-3">Commenter</Button>
    </form>
}