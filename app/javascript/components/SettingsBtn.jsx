import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog.jsx";
import Settings from "./Settings.jsx";

export default function SettingsBtn({user}) {
    return <Dialog>
        <DialogTrigger>Mes informations</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Modifier mes informations</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                </DialogDescription>
            </DialogHeader>
            <Settings user={user}/>
        </DialogContent>
    </Dialog>
}