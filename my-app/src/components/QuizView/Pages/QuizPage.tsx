import { useState, useEffect, useRef } from "react";
import {Options, NextBtn, Header, Title, Quote} from "./components/index"

interface Option {
    id: number;
    content: string;
    correct: boolean;
}
interface Quiz {
    id: number;
    name: string;
    username: string;
}
interface Question {
    count: number,
    quiz_id: number,
    id: number ,
    content: string,
    options: Option[],
    quote: string,
    timer:number,
}
interface FullQuestion {
    question: Question,
    options: Option[],
}
interface FullQuiz {
    quiz: Quiz,
    questions: FullQuestion[]
}
interface half{
    count:number;
    Quesiton:string;
    quote?:string;
  }
interface Results{
    count:number;
    Quesiton:string;
    answer:string;
    correct: boolean;
    correctAnswer:string;
    quote?:string;
}
interface Props {
    visible: boolean,
    Quiz: FullQuiz,
    score: number
    setVisible(): void,
    setScore:React.Dispatch<React.SetStateAction<number>>
    setCorrectQuestions: React.Dispatch<React.SetStateAction<number>>
    setResults: React.Dispatch<React.SetStateAction<Results[]>>
}

export default function QuizPage(props: Props) {
    const { visible, Quiz, setVisible, score , setScore, setCorrectQuestions, setResults } = props
    const [chosed, setChosed] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined)
    const [halfResult, setResult] = useState<half>();
    const [timeIsOut, setTimeIsOut] = useState(false);
    const [visibleQuote, setVisibleQuote] = useState(false);
    useEffect(()=>{
        if(visible){
            console.log(Quiz)
            setResult({
                count:pageCount,
                Quesiton:Quiz?.questions[pageCount-1].question.content,
                quote:Quiz?.questions[pageCount-1].question.quote,
            })
        }
    },[pageCount, visible])
    console.log(halfResult);
    
    return (
        <>
            {visible &&
                <div className="flex justify-center">
                    <div id="page-container" className="w-4/5 page-container">
                        <Header setVisibleQuote={setVisibleQuote} id={Quiz?.questions[pageCount-1].question.id} TimeIsOut={timeIsOut} setTimeIsOut={setTimeIsOut} setChosed={setChosed} paused={chosed} timer={Quiz?.questions[pageCount-1].question.timer} quizname={Quiz.quiz.name} pageCount={pageCount} score={score} questionLength={Quiz?.questions.length}/>
                        <Title title={Quiz.questions[pageCount-1].question.content}/>
                        <Options setVisibleQuote={setVisibleQuote} timeIsOut={timeIsOut} halfResult={halfResult!} setResults={setResults} setCorrectQuestions={setCorrectQuestions} setScore={setScore} selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={Quiz?.questions[pageCount-1]?.options} setChosed={setChosed}/>
                        <NextBtn setTimeIsOut={setTimeIsOut} setVisibleQuote={setVisibleQuote} questionLength={Quiz.questions.length} setVisible={setVisible} setSelectedOption={setSelectedOption} setChosed={setChosed} pageCount={pageCount} setPageCount={setPageCount} visible={chosed}/>
 
                        <Quote visible={visibleQuote} text={Quiz.questions[pageCount-1]?.question.quote}/>
                    </div>
                </div>
            }
        </>
        
    )
}