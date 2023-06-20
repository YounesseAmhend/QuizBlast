import { lazy, Suspense, useEffect, useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { useFetch } from "../ts/hooks";
import Loading from "../ts/components/loading";

interface Props {
    goView(): void,
    setId(par: number): void, 
}

interface Quiz {
    id: number;
    username: string;
    name: string;
}

const Quiz = lazy(() => import("./Quiz"));

export default function Home(props: Props) {
    const pageCount = useRef(0)
    const { data: quizs, loaded, fetchMore, error ,hasMore} = useFetch<Quiz[]>("/quiz", [], "POST");
    const oldData = useRef()

    const getMore = async () => {
            if(loaded){
                pageCount.current++;
                await fetchMore({"page_number":pageCount.current})
            }
            console.log("done")

    }

    return (
        <Suspense fallback={<Loading loaded={false} />}>
            <InfiniteScroll
                loadMore={getMore}
                hasMore={hasMore.current }
            >
                <div onScrollCapture={() => {}} className="quiz-container mb-2">
                    {quizs?.map(function (quiz: Quiz) {
                        return (
                            <Quiz
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
    );
}
