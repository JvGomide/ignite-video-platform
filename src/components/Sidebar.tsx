import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Lesson } from "./Lesson";

const GET_LESONS_QUERY = gql`
    query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
            id
            lessonType
            title
            slug
            availableAt
        }
    }
`

interface GetLessonQueryResponse{
    lessons: {
        id: string,
        title: string,
        slug: string,
        availableAt: string,
        lessonType: "class" | "live"
    }[]
}

export function Sidebar() {
    const { data } = useQuery<GetLessonQueryResponse>(GET_LESONS_QUERY);

    return(
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="font-bold text-xl pb-6 mb-8 border-b border-gray-500 block">Cronograma de Aulas</span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => {
                    return(
                        <Lesson
                            key = {lesson.id}
                            title = {lesson.title}
                            slug = {lesson.slug}
                            availableAt = {new Date(lesson.availableAt)}
                            type = {lesson.lessonType}
                        />
                    )
                })}
            </div>
        </aside>
    )
}