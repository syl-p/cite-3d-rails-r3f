import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import UploadMediaDialog from "@/components/UploadMediaDialog.jsx";
import {Link} from "@inertiajs/react";
import CommentForm from "@/components/CommentForm.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import LoginBtn from "@/components/LoginBtn.jsx";
import useAppStore from "@/stores/useAppStore";
import { useEffect } from "react";
import Comment from "@/components/Comment";
import Cta from "@/components/Cta";

export default function show({current_user, part}) {
    const showSpots = useAppStore((s) => s.showSpots)
    const setShowSpots = useAppStore((s) => s.setShowSpots)
    
    useEffect(() => {
        if(!showSpots) {
            setShowSpots(true)
        }
    }, [showSpots])

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
                {part.media && part.media.length > 0 ?
                    <Carousel className="my-6">
                        <CarouselContent>
                            {part.media.map(medium => (
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
                        {part.comments && part.comments.map((comment) => (
                            <li key={comment.id}>
                                <Comment comment={comment}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </TabsContent>
        </Tabs>
    </>
}