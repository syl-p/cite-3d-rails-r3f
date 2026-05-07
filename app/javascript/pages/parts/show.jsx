import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import UploadMediaDialog from "@/components/UploadMediaDialog.jsx";
import {Link} from "@inertiajs/react";
import CommentForm from "@/components/CommentForm.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import LoginBtn from "@/components/LoginBtn.jsx";

export default function show({current_user, part, media, comments}) {
    const Cta = ({children}) => {
        return <div className="w-full group relative flex items-center justify-end space-x-2">
                                <span
                                    className="relative z-10 text-sm font-bold uppercase leading-6 tracking-wide before:absolute
                                    before:-left-6 before:-top-1/2 before:-z-10 before:h-12 before:w-12 before:rounded-full
                                    before:bg-yellow-400 before:content-[''] group-hover:underline">{children}</span>

            <div className="relative">
                                  <span className="inline-block transition-transform group-hover:translate-x-1">
                                    ➔
                                  </span>
            </div>
        </div>
    }

    const Comment = ({comment}) => {
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

    return <>
        <Link href="/" className="text-xl">Découvrir la cité</Link>
        <h1 className="text-4xl mb-3">{part.title}</h1>
        <p className="italic text-sm mb-6 text-muted-foreground">{part.description}</p>
        <Tabs defaultValue="description">
            <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="comments">Commentaires</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
                {media && media.length > 0 ?
                    <Carousel className="my-6">
                        <CarouselContent>
                            {media.map(medium => (
                                <CarouselItem key={medium.id} className="basis-1/3 h-[300px] w-[190px]">
                                    <img src={medium.file_url} className="w-fit h-full w-full rounded-xl object-cover"/>
                                </CarouselItem>))}
                        </CarouselContent>
                    </Carousel> :
                    <div className="py-6">Aucune photo n'a encore été postée sur la galerie de cette
                        partie de
                        la cité.</div>
                }


                {
                    <div className="w-full flex justify-end mb-12 mt-6">
                        {
                            current_user ? <UploadMediaDialog partId={part.id}>
                                    <Cta>
                                        Participe à la Galerie photo.
                                    </Cta>
                                </UploadMediaDialog> :
                                <LoginBtn>
                                    <Cta>
                                        Connecte toi pour envoyer tes photos.
                                    </Cta>
                                </LoginBtn>
                        }
                    </div>
                }
                <p>{part.body}</p>
            </TabsContent>
            <TabsContent value="comments">
                <div className="mt-6">
                    {current_user && <div className="mb-6">
                        <CommentForm part_id={part.id}/>
                    </div>}

                    <ul className="space-y-3">
                        {comments && comments.map((comment) =>
                            <li key={comment.id}>
                                <Comment comment={comment}/>
                            </li>
                        )}
                    </ul>
                </div>
            </TabsContent>
        </Tabs>
    </>
}