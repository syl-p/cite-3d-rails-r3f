import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import UploadMediaDialog from "@/components/UploadMediaDialog.jsx";
import {Link} from "@inertiajs/react";
import CommentForm from "@/components/CommentForm.jsx";

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
        return <div className="border rounded">
            <div className="bg-primary-foreground p-3">
                <p>{comment.user.username}, le {comment.created_at}</p>
            </div>
            <div className="p-3">
                <p>{comment.content}</p>
            </div>
        </div>
    }

    return <>
        <Link href="/" className="text-xl">Découvrir la cité</Link>
        <h1 className="text-4xl mb-6">{part.title}</h1>
        <Tabs defaultValue="description">
            <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="comments">Commentaires</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
                <p className="mb-6">{part.description}</p>
                {media && media.length > 0 ?
                    <Carousel className="my-6">
                        <CarouselContent>
                            {media.map(medium => (
                                <CarouselItem key={medium.id} className="basis-1/3 h-[300px] w-[190px]">
                                    <img src={medium.file_url} className="w-fit h-full w-full rounded-xl object-cover"/>
                                </CarouselItem>))}
                        </CarouselContent>
                    </Carousel> :
                    <div className="py-6 text-xl font-bold">Aucune photo n'a encore été postée sur la galerie de cette
                        partie de
                        la cité.</div>
                }


                {
                    <div className="w-full flex justify-end mb-12">
                        {
                            current_user ? <UploadMediaDialog partId={part.id}>
                                    <Cta>
                                        Participe à la Galerie photo.
                                    </Cta>
                                </UploadMediaDialog> :
                                <Cta>
                                    Connecte toi.
                                </Cta>
                        }
                    </div>
                }
                <p>{part.body}</p>
            </TabsContent>
            <TabsContent value="comments">
                <div className="mb-6">
                    <CommentForm part_id={part.id}/>
                </div>
                <ul className="space-y-3">
                    {comments && comments.map((comment) =>
                        <li>
                            <Comment comment={comment} key={comment.id}/>
                        </li>
                    )}
                </ul>
            </TabsContent>
        </Tabs>
    </>
}