import { lazy, Suspense, useRef } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { useFetch } from "../ts/hooks";
import Loading from "../ts/components/loading";
import SearchBar from "../utilities/SearchBar";

interface Props {
    visible: boolean,
    goView(): void,
    displayUser(id: number): void,
    setId(id: number): void, 
}

interface Quiz {
    id: number;
    userId: number;
    username: string;
    name: string;
}

const Quiz = lazy(() => import("./Quiz"));

export default function Home(props: Props) {
    const pageCount = useRef(0)
    const { data: quizs, loaded, fetchMore, error ,hasMore} = useFetch<Quiz[]>("/quiz", [], "POST");
    const firstime = useRef(true)

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
            <SearchBar />
            <InfiniteScroll
                loadMore={getMore}
                hasMore={hasMore.current }
            >
                <div onScrollCapture={() => {}} className="quiz-container mb-4 ">
                    {quizs?.map(function (quiz: Quiz) {
                        return (
                            <Quiz
                                goView={props.goView}
                                setId={props.setId}
                                key={quiz.id}
                                id={quiz.id}
                                displayUser={props.displayUser}
                                userId={quiz.userId}
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
