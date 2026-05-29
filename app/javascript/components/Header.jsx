import { Link, usePage } from "@inertiajs/react";
import UserDropdown from "./UserDropdown";
import LoginBtn from "./LoginBtn";

export default function Header() {
    const {current_user} = usePage().props
    return <header className="z-50 h-18 bg-white px-6 lg:sticky lg:top-0 flex items-center justify-between top-8 left-0 w-full">
        <div>
            <Link href="/" className="uppercase font-spectral flex space-x-3 items-center">
                <span className="block p-2 bg-yellow-500 text-white font-bold">
                </span>
                <span className="hidden md:block">
                    Cité<br/>
                    de <span className="font-bold">Carcassonne</span>
                </span>
            </Link>
        </div>
        <div className="flex-1 flex space-x-3 items-center justify-end">
            {current_user ? <UserDropdown user={current_user}/> : <LoginBtn>Se connecter</LoginBtn>}
        </div>
    </header>
}