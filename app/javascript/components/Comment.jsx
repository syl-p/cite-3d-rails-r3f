import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default ({comment}) => {
    return <div className="mb-6">
        <div className="flex space-x-3 items-center mb-1">
            <Avatar>
                <AvatarImage src={comment.user.avatar_path} />
                <AvatarFallback>
                    CN
                </AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground">{comment.user.username}, le {comment.created_at}</p>
        </div>
        <div>
            <p>{comment.content}</p>
        </div>
    </div>
}