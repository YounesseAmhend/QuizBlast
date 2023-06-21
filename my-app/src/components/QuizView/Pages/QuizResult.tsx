import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
// import { sleep } from '../../ts/staticFunctions';
// import { easeQuadInOut } from 'd3-ease';
// import AnimatedProgressProvider from './AnimatedProgressProvider';
import MoreBtn from './components/MoreBtn';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect, useMemo } from 'react';

interface Results{
    count:number;
    Quesiton:string;
    answer:string;
    correct: boolean;
    correctAnswer:string;
    quote?:string;
}
interface Props{
    visible: boolean;
    score: number;
    correctQuestions:number;
    questionLength:number | undefined;
    quizname:string | undefined;
    result?:Results[];
}

export default function QuizResult(props: Props){
    const { visible, score, correctQuestions, questionLength, quizname, result } = props;
    const [animatedValue, setAnimatedValue] = useState<number>(0);

    useEffect(() => {
        if (visible) {
            let timer = setTimeout(() => {
                if(animatedValue < correctQuestions)
                setAnimatedValue((old)=>{
                    return parseFloat((old+(correctQuestions/100)).toFixed(2));
                    
                });
                
            }, 10)
            return () => clearTimeout(timer);
        }
    }, [visible, animatedValue]);
    useMemo(()=>{
        console.log(result)
    },[visible])
    return (
        <>
            {visible && 
                <div className="flex justify-center mb-10">
                     <div className="flex-col w-4/5 page-container">
                        <div className="text-center text-xl font-semibold pt-3">{quizname}</div>
                        <div className="flex justify-center">
                            <div className='w-48 h-48 mt-6 mb-4'>
                                <CircularProgressbarWithChildren
                                    maxValue={questionLength}
                                    value={animatedValue}
                                    styles={{
                                        trail:{
                                            color: "rgb(2 132 199)",
                                        }
                                    }}
                                >
                                    <>
                                        <div className="text-4xl font-extrabold text-sky-600 text-center">{Math.round(animatedValue)}/{questionLength}</div>
                                        <div className="text-sm text-center">{Math.round(animatedValue*score/correctQuestions)||0} points</div>
                                    </>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        <MoreBtn result={result}/>
                    </div>
                </div>
            }
        </>
    );
}
