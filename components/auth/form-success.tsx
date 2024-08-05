import { CheckCircle2 } from "lucide-react"



export const FormSuccess = ({ message }: { message?: string }) => {
    if(!message) return null

    return (
        <div className="bg-teal-400/25 flex text-sm font-medium items-center gap-2 my-3 text-secondary-foreground p-3 rounded-md">
            <CheckCircle2 className="w-4 h-4"/>
            <p>{message}</p>
        </div>
    )
}