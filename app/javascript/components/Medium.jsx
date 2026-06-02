import {Dialog, DialogContent, DialogTrigger} from "./ui/dialog.jsx";

export default function Medium({medium}) {
    return <Dialog>
        <DialogTrigger className="cursor-pointer">
            <img src={medium.file_url} 
                className="h-full w-full rounded-xl object-cover"/>
        </DialogTrigger>
        <DialogContent>
            <img src={medium.file_url} alt={medium.id} 
                className="w-full h-auto rounded-lg"/>
        </DialogContent>
    </Dialog>
}