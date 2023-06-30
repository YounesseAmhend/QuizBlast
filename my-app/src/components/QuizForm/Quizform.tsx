import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  {useState} from "react"
import QuestionForm from './question';
import { subQuiz } from '../ts/staticFunctions';
import {UpQuiz, isOnlySpace } from '../ts/staticFunctions';
import Loading from '../ts/components/loading';

interface Props {
    goHome():void,
}
export default function QuizForm(props: Props){
    const VALIDATION = {
        input: 25,
    }
    // hooks
    const [loading, setLoading] =  useState<boolean>(false)
    const [input, setInput] = useState("")
    function changeInput(e:React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value);
    }
    const [quiz_id, setId]=useState(0) 
    const [save, setSave] = useState<boolean>(false)
    const [visible, setVisible] = useState({
        quiz:true,
        question:false,
        isback:false,
    })
    async function addQuiz(event: React.FormEvent) {
        event.preventDefault();
        if (input !== "" && input.length < VALIDATION.input && isOnlySpace(input)) {
          if (!visible.isback) {
            setLoading(true);
            const id = await subQuiz(input);
            setId(id);
            setVisible({ quiz: false, question: true, isback: false });
          } else {
            setVisible({ quiz: false, question: true, isback: true });
            if (oldInput !== input) {
              if (input.length < 100 && isOnlySpace(input)) {
                UpQuiz(input, quiz_id);
              }
            }
          }
        }

      }
      
    const [oldInput, setOldInput] = useState("")
    function goBack(){
        setVisible({
            quiz:true,
            question:false,
            isback:true,
        })
        setOldInput(input)
    }
    const saveQ = () => {
        props.goHome()
    }
    return (
        <>
        { 
        visible.quiz && <div>
            <Loading loaded={!loading}/>
            {(!loading) &&
            <>
            <h2 className='text-4xl max-[600px]:text-3xl font-medium'>Quiz</h2>
            <div id='quiz-form-container' >
                
                <Form  className='quiz-form' onSubmit={addQuiz}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        
                        <Form.Control type="text" name="quizname" autoFocus placeholder="Enter name" value={input} onChange={changeInput}/>
                    </Form.Group>
                    <div className='flex justify-between'>
                    <Button className="bg-blue-600" variant="primary" type="submit">
                        Next
                    </Button>
                    { save && <Button onClick={saveQ} className="bg-blue-600" variant="primary">
                        Save
                    </Button>}
                    </div>
                </Form>
            </div></>}
        </div>
        }
        <QuestionForm setSave={setSave} onSave={saveQ} visible={visible.question} onBack={goBack} quiz_id={quiz_id}/>
        </>
    )
}