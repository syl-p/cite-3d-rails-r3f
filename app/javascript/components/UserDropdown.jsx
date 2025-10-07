import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx"
import {Link} from "@inertiajs/react";
import SettingsBtn from "./SettingsBtn.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function UserDropdown({user}) {
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    {user.username}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem  onSelect={(e) => e.preventDefault()}>
                    <SettingsBtn user={user}/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link method="delete" href="/session">Se déconnecter</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}