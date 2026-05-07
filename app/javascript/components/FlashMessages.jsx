import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {usePage} from "@inertiajs/react";
import {useEffect} from "react";
import {CheckCircle2Icon, AlertCircleIcon} from "lucide-react";


export default function FlashMessages({children}) {
    const page = usePage()
    const flash = page.flash || page.props.flash

    useEffect(() => {
        if (flash?.notice || flash?.error) {
            console.log('FLASH DISPLAYED:', flash)
        }
    }, [flash])

    if (!flash || (!flash.notice && !flash.error)) return null

    const isError = !!flash.error
    const variant = isError ? "destructive" : "success"
    const message = flash.error || flash.notice

    return (
        <div className="fixed bottom-4 right-4 z-50 w-auto max-w-md">
            <Alert variant={variant}>
                {isError ?  <AlertCircleIcon/> : <CheckCircle2Icon/>}
                <AlertTitle>{isError ? "Erreur" : "Succès"}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        </div>
    )
}