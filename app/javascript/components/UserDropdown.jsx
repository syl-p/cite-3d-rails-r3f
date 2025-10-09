import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx"
import {Link} from "@inertiajs/react";
import {Button} from "@/components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import Profile from "@/pages/settings/Profile.jsx";

export default function UserDropdown({user}) {
    const ProfileDropdown = () => {
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
                <Profile user={user}/>
            </DialogContent>
        </Dialog>
    }
    
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    {user.username}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <ProfileDropdown/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link method="delete" href="/session">Se déconnecter</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}