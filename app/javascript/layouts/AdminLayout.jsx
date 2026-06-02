import FlashMessages from "@/components/FlashMessages";
import Header from "@/components/Header";

export default function AdminLayout({children}) {
    return <>
        <Header />
        <main className="px-6 relative">
            {children}

            <FlashMessages />
        </main>
    </>
}