import { lazy, Suspense, useRef } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { useFetch } from "../ts/hooks";
import Loading from "../ts/components/loading";

interface Props {
    id: number,
    visible: boolean,
    displayUser(id: number): void;
    goView(): void,
    setId(id: number): void, 
}

interface Quiz {
    id: number;
    userId: number;
    username: string;
    name: string;
}

const Quiz = lazy(() => import("../QuizView/Quiz"));

export default function Home(props: Props) {
    const pageCount = useRef(0)
    const { data: quizs, loaded, fetchMore, hasMore} = useFetch<Quiz[]>(`/user/${props.id}`, [], "POST");
    const firstime = useRef(true)
    /* TODO:
        1- add a follow button for each user except the current one
        2- show the follower count 
        3- show the following count
        4- add an option for the user to see his favorites 
        5- add an option for the user to see his liked quizzes
    */
    const getMore = async () => {
            if(loaded){
                pageCount.current++;
                await fetchMore({"page_number":pageCount.current})
            }
            else if(firstime.current){
                firstime.current = false
                pageCount.current++;
                await fetchMore({"page_number":pageCount.current})
            }
            console.log("done")

    }

    return (
        <>
        {props.visible &&
        <Suspense fallback={<Loading loaded={false} />}>
            {(quizs.length > 0) && <div className="text-center text-3xl mb-11 mt-4">{quizs[0].username}</div>}
            <InfiniteScroll
                loadMore={getMore}
                hasMore={hasMore.current }
            >   
                <div onScrollCapture={() => {}} className="quiz-container mb-4 ">
                    {quizs?.map(function (quiz: Quiz) {
                        return (
                            <Quiz
                                displayUser={props.displayUser}
                                userId={quiz.userId}
                                goView={props.goView}
                                setId={props.setId}
                                key={quiz.id}
                                id={quiz.id}
                                username={quiz.username}
                                name={quiz.name}
                            />
                        );
                    })}
                </div>
            </InfiniteScroll>
            <Loading loaded={loaded}/>
        </Suspense>
        }
        </>
    );
}
