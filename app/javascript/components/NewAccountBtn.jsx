import New from "@/pages/registration/New.jsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog.jsx";


export default function NewAccountBtn({children}) {
    return <Dialog>
        <DialogTrigger className="cursor-pointer">
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Inscription</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                </DialogDescription>
            </DialogHeader>
            <New />
        </DialogContent>
    </Dialog>
}