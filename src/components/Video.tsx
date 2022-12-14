import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css';

const GET_LESSON_BY_SLUG_QUERY = gql`
    query GetLessonByQuery($slug: String) {
        lesson(where: {slug: $slug}) {
            title
            videoId
            description
            teacher {
            bio
            avatarURL
            name
            }
        }
    }
`
interface GetLessonByQueryResponse {
    lesson: {
        title: string;
        videoId: string;
        description: string;
        teacher: {
            bio: string;
            avatarURL: string;
            name: string;
        }
    }
}

interface videoProps{
    lessonSlug: string;
}


export function Video(props: videoProps) {
    const { data } = useQuery<GetLessonByQueryResponse>(GET_LESSON_BY_SLUG_QUERY, {
        variables: {
            slug: props.lessonSlug,
        }
    })

    if(!data){
        return(
            <div className="flex-1">
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">{data.lesson.description}</p>

                        <div className="flex items-center gap-4 mt-6">
                            <img src={data.lesson.teacher.avatarURL} alt="Professor" className="h-16 w-16 rounded-full border-1 border-blue-500"/>
                            <div className="leading-relaxed">
                                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                                <span className="text-gray-200">{data.lesson.teacher.bio}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <a href="http://" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24} />
                            Comunidade do Discord
                        </a>
                        <a href="http://" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
                            <Lightning size={24} />
                            Acesse o Desafio
                        </a>
                    </div>
                </div>

                <div className="gap-8 mt-20 grid grid-cols-2">
                    <a href="http://" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-500 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={20} />
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Material Complementar</strong>
                            <p className="text-sm text-gray-200 mt-2">Lorem ipsuzinho do material complementar</p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                    <a href="http://" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-500 transition-colors">
                        <div className="bg-green-700 h-full p-6 flex items-center">
                            <FileArrowDown size={20} />
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Wallpapers Exclusivos</strong>
                            <p className="text-sm text-gray-200 mt-2">Lorem ipsuzinho dos wallpappers exclusivos</p>
                        </div>
                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}