import React from 'react'

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
  options: Option[];
  setChosed(value: boolean): void;
  setSelectedOption: React.Dispatch<React.SetStateAction<number | undefined>>
  setScore: React.Dispatch<React.SetStateAction<number>>
  setCorrectQuestions: React.Dispatch<React.SetStateAction<number>>
  setResults: React.Dispatch<React.SetStateAction<Results[]>>
  halfResult: half;
  selectedOption: number | undefined;
}
export default function Options(props: Props) {
  let correctOption:string;
  function showResult(id: number, correct: boolean, content: string) {
    if (props.selectedOption === undefined) {
      for(let i = 0; i < (props.options?.length || 0); i++){
       if(props.options[i].correct){
        correctOption = props.options[i].content;
       }
      }
      props.setChosed(true)
      props.setSelectedOption(id)
      if (correct) {
        props.setScore(score => score + 100)
        props.setCorrectQuestions(value => value + 1)
      }
      props.setResults(results=>[...results, {...props.halfResult, correct:correct, correctAnswer:correctOption, answer:content }])
    }
  }
  return (
    <div className="options-container m-3 grid-cols-2 grid max-[600px]:grid-cols-1">
      {props.options?.map(option => {
        return (
          <div key={option.id}>
            {props.selectedOption ?
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
              <div onClick={() => showResult(option.id, option.correct, option.content)} className='option-view option-normal cursor-pointer'>{option.content}</div>
            }
          </div>
        )
      }
      )}
    </div>
  )
}
