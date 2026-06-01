import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import UploadMediaDialog from "@/components/UploadMediaDialog.jsx";
import {Link} from "@inertiajs/react";
import CommentForm from "@/components/CommentForm.jsx";
import LoginBtn from "@/components/LoginBtn.jsx";
import useAppStore from "@/stores/useAppStore";
import { useEffect } from "react";
import Comment from "@/components/Comment";
import Cta from "@/components/Cta";
import Medium from "@/components/Medium";

export default function show({current_user, part}) {
    const showSpots = useAppStore((s) => s.showSpots)
    const setShowSpots = useAppStore((s) => s.setShowSpots)
    
    useEffect(() => {
        if(!showSpots) {
            setShowSpots(true)
        }
    }, [showSpots])

    const MediaEmptyZone = () => {
        return <div className="bg-secondary my-6 p-8 rounded-lg">
            <p className="mb-6">Aucune photo n'a encore été postée sur la galerie de cette partie de la cité.</p>
            <div className="w-full flex justify-end">
                {
                        current_user ? <UploadMediaDialog partId={part.id}>
                            <Cta>
                                Participe à la Galerie photo.
                            </Cta>
                        </UploadMediaDialog> :
                        <LoginBtn>
                            <Cta>
                                Connectez vous pour envoyer vos photos.
                            </Cta>
                        </LoginBtn>
                }
            </div>
        </div>
    }

    const CommentEmptyZone = () => {
        return <div className="bg-secondary my-6 p-8 rounded-lg">
            <p className="mb-6">Soyez le premier à donner vos impressions !</p>
            <div className="w-full flex justify-end">
                {!current_user && <LoginBtn>
                    <Cta>
                        Connectez vous pour écrire un commentaire !
                    </Cta>
                </LoginBtn>}
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
                {(part.media && part.media.length > 0) &&
                    <>
                        <Carousel className="my-6">
                            <CarouselContent>
                                {part.media.map(medium => (
                                    <CarouselItem key={medium.id} className="basis-1/3 h-[300px] w-[190px]">
                                        <Medium medium={medium}/>
                                    </CarouselItem>))}
                            </CarouselContent>
                        </Carousel>
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
                    </>
                }

                {(!part.media || part.media.length === 0) && <MediaEmptyZone/>}

                <p>{part.body}</p>
            </TabsContent>
            <TabsContent value="comments">
                <div className="mt-6">
                    {current_user && <div className="mb-6">
                        <CommentForm part_id={part.id}/>
                    </div>}
                        
                    {(!part.comments || part.comments.length === 0) && <CommentEmptyZone/>}

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