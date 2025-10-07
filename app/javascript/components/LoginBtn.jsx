import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog.jsx";
import New from "../pages/sessions/New.jsx";

export default function LoginBtn() {
    return <Dialog>
        <DialogTrigger>Se connecter</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Connection</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                </DialogDescription>
            </DialogHeader>
            <New />
        </DialogContent>
    </Dialog>
}