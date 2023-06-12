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

    // todo react infinite scroll
    const getMore = async () => {
            pageCount.current++;
            await fetchMore({"page_number":pageCount.current})
            
            console.log("done")

            // updating the page counter

            

            console.log(pageCount.current)

    }

    return (
        <Suspense fallback={<Loading loaded={false} />}>
            <Loading loaded={loaded}/>
            <InfiniteScroll
                loadMore={getMore}
                hasMore={hasMore.current}
                loader={<Loading loaded={true} />}
            >
                <div onScrollCapture={() => {}} className="quiz-container">
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
        </Suspense>
    );
}
