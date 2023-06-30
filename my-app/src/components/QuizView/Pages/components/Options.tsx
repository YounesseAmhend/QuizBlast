import React, { useEffect } from 'react'

interface Option {
  id: number;
  content: string;
  correct: boolean;
}
interface Results{
  count:number;
  Quesiton:string;
  answer:string;
  correct: boolean;
  correctAnswer:string;
  quote?:string;
}
interface half{
  count:number;
  Quesiton:string;
  quote?:string;
}
interface Props {
  timeIsOut:boolean;
  options: Option[];
  setChosed(value: boolean): void;
  setVisibleQuote(value: boolean): void;
  setSelectedOption: React.Dispatch<React.SetStateAction<number | undefined>>
  setScore: React.Dispatch<React.SetStateAction<number>>
  setCorrectQuestions: React.Dispatch<React.SetStateAction<number>>
  setResults: React.Dispatch<React.SetStateAction<Results[]>>
  halfResult: half;
  selectedOption: number | undefined;
}
export default function Options(props: Props) {
  let correctOption: string;
  function showResult(id: number, correct: boolean, content: string) {
    if (props.selectedOption === undefined) {
      props.setChosed(true)
      props.setVisibleQuote(true)
      props.setSelectedOption(id)
      if (correct) {
        props.setScore(score => score + 100)
        props.setCorrectQuestions(value => value + 1)
      }
      props.setResults(results=>[...results, {...props.halfResult, correct:correct, correctAnswer:correctOption, answer:content }])
    }
    
  }
  useEffect(()=>{
    for (const option of props.options) {
      if (option.correct) {
        correctOption = option.content;
        break;
      }
    }
    if (props.timeIsOut){
      props.setResults(results=>[...results, {...props.halfResult, correct: false, correctAnswer:correctOption, answer:"", timeOut:true }])
    }
  },[props.timeIsOut])
  return (
    <div className="m-3 grid-cols-2 grid max-[600px]:grid-cols-1">
      {props.options?.map(option => {
        return (
          <div key={option.id}>
            {(props.selectedOption!== undefined && !props.timeIsOut) ?
              <>
                {option.correct &&
                  <div className={' option-view option-correct cursor-pointer'}>{option.content}</div>
                }
                {((props.selectedOption === option.id) && !option.correct) &&
                  <div className={' option-view option-wrong cursor-pointer'}>{option.content}</div>
                }
                {((props.selectedOption !== option.id) && !option.correct) &&
                  <div className={' option-view option-disabled cursor-pointer'}>{option.content}</div>
                }
              </>
              :
              <>
                {props.timeIsOut ? 
                  <>
                      {option.correct ?
                        <div className={' option-view option-correct cursor-pointer'}>{option.content}</div>
                        :
                        <div className={' option-view option-disabled cursor-pointer'}>{option.content}</div>
                      }
                  </>
                  :
                  <div onClick={() => showResult(option.id, option.correct, option.content)} className='option-view option-normal cursor-pointer'>{option.content}</div>
                }
              </>
            }
          </div>
        )
      }
      )}
    </div>
  )
}
