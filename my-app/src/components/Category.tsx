import { lazy, Suspense, useRef } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { useFetch } from "./ts/hooks";
import Loading from "./ts/components/loading";
import SearchBar from "./utilities/SearchBar";
import { useCategory, useUser } from "./ts/states/userStates";
import { useDisplay } from "./ts/states/useDisplay";

interface Props {
    goView(): void,
    displayUser(id: number): void,
}

interface Quiz {
    id: number;
    userId: number;
    username: string;
    name: string;
}

const Quiz = lazy(() => import("./QuizView/Quiz"));

export default function Category(props: Props) {
    const pageCount = useRef(0)
    const { categoryId } = useCategory()
    const { setId } = useUser()
    const { data: quizs, loaded, fetchMore, hasMore} = useFetch<Quiz[]>("/category/"+categoryId, [], "POST");
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
        { (categoryId !== undefined) &&
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
                                setId={setId}
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
