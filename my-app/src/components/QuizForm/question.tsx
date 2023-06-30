import { QuestionInput } from './QuestionInput';
import ExplicationInput from './ExplicationInput';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Options from './Options';
import Input from './Input';
import QuestionHead from './QuestoinHeadForm';
import Time from './Time';
import { CompareOptions, updateQuestions, getQuestion, subQuestion, isOnlySpace, isSelect, makeid, remove } from '../ts/staticFunctions';

interface Props {
    visible: boolean,
    onBack(): void,
    quiz_id: number,
    setSave(par: boolean): void,
    onSave(): void,
}
interface Option {
    id: string,
    text: string,
    correct: boolean,
}
interface Question {
    count: number,
    quiz_id: number,
    id: number | undefined,
    content: string,
    options: Option[],
    timer: number,
    quote?: string,
}
export default function QuestionForm(props: Props) {
    const VALIDATIONS = {
        OPTIONS_LIMIT : 4,
        OPTIONS_MAX_LENGTH: 100,
        OPTIONS_MIN : 2,
        OPTIONS_MAX_EXPLINATION_LENGTH: 500,
        QUESTION_MIN_LENGTH: 5,
    }
    const ID_LENGTH = 6
    
    const [text, setText] = useState('');
    const [time, setTime] = useState<number>(0)
    const InputQ = useRef<HTMLInputElement>(null)
    const [questions, setQuestions] = useState<Question[]>([])
    const [visible, setVisible] = useState(false)
    const [inputs, setInputs] = useState({
        question: "",
        option: ""
    })
    const [options, setOptions] = useState<Option[]>([])
    const [currentCount, setCurrentCount] = useState(1)
    const [changed, SetChanged] = useState(false)
    // functions
    function UpdateQuestion() {
        let question = questions[currentCount - 1];
        question.quote = text
        question.content = inputs.question;
        question.options = options;
        question.timer = time;

        setQuestions(updateQuestions(questions, question));
    }
    function changeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setInputs({ question: inputs.question, option: event.target.value });
    }

    function add() {
        visible ? setVisible(false) : setVisible(true)
        if (inputs.option !== "" && options.length < VALIDATIONS.OPTIONS_LIMIT && inputs.option.length < VALIDATIONS.OPTIONS_MAX_LENGTH && isOnlySpace(inputs.option)) {
            setOptions([...options, { id: makeid(ID_LENGTH), text: inputs.option, correct: false }])
        }
        setText("")
        setInputs({ question: inputs.question, option: "" })
    }

    function addOptionKey(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && options.length < VALIDATIONS.OPTIONS_LIMIT && inputs.option !== "" && inputs.option.length < VALIDATIONS.OPTIONS_MAX_LENGTH && isOnlySpace(inputs.option)) {
            setOptions([...options, { id: makeid(ID_LENGTH), text: inputs.option, correct: false }])
            setInputs({ question: inputs.question, option: "" })
        }
    }
    function changeFocus(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            setVisible(true);
        }
    }
    function removeOption(id: string) {
        setOptions([...remove(options, id)])
    }
    function corrected(key: string) {
        let ops = options
        SetChanged(true)
        ops.forEach((option) => {
            option.id === key ? option.correct = true : option.correct = false;
        })
        setOptions([...ops])
    }
    function changeInputQuestion(event: React.ChangeEvent<HTMLInputElement>) {
        setInputs({ option: inputs.option, question: event.target.value })
    }
    async function next(event: React.MouseEvent<HTMLElement>) {
        event.currentTarget.blur();
        InputQ.current?.focus()
        const changing =  changed || !CompareOptions(questions[currentCount - 1].options, options) || questions[currentCount - 1].content !== inputs.question || time !== questions[currentCount - 1].timer
        if (options.length > VALIDATIONS.OPTIONS_MIN && inputs.question.length > VALIDATIONS.QUESTION_MIN_LENGTH && isSelect(options) && questions.length === currentCount - 1) {
            setVisible(false)
            
            let quiz_id = props.quiz_id
            let optionsToSubmit = options.map(({ id, ...rest }) => rest);
            let input = inputs.question
            let timer = time
            let quote = text
            setInputs({ question: "", option: "" })
            setOptions([])
            setText("")

            setVisible(false)
            window.scrollTo(0, 0);

            let question_id: number | undefined = await subQuestion(quiz_id, input, quote, timer, optionsToSubmit)
            setCurrentCount(currentCount + 1)
            setQuestions([...questions, { count: questions.length + 1, quiz_id: quiz_id, options: options, id: question_id, content: input, timer:timer, quote:text  }])
        }
        else if (options.length > VALIDATIONS.OPTIONS_MIN && inputs.question.length > VALIDATIONS.QUESTION_MIN_LENGTH && isSelect(options) && questions.length > currentCount) {
            let question = getQuestion(currentCount + 1, questions)
            setTime(question.timer)
            setText(question.quote || "")
            if (changing) {
                UpdateQuestion();
            }
            
            setCurrentCount(currentCount + 1)
            setInputs({ question: question.content, option: "" })
            setOptions(question.options)
            
        }
        else if (currentCount - 1 < questions.length) {
            if (currentCount === questions.length && (changing)) {
                UpdateQuestion();
            }
            setOptions([])
            setInputs({ question: "", option: "" })
            setCurrentCount(currentCount + 1)
            setText("")
            
        }
        SetChanged(false)
        
    }
    function back() {
        if (currentCount > 1) {
            if (currentCount === questions.length && (changed || !CompareOptions(questions[currentCount - 1].options, options) || questions[currentCount - 1].content !== inputs.question || time !== questions[currentCount - 1].timer)) {
                UpdateQuestion();
            }
            setCurrentCount(currentCount - 1)
            let question = getQuestion(currentCount - 1, questions)
            setOptions(question.options)
            SetChanged(false)
            setTime(question.timer)
            setText(question.quote || "")
            setInputs({ question: question.content, option: "" })
        }
        else {
            
            if (currentCount === questions.length && (changed || !CompareOptions(questions[currentCount - 1].options, options) || questions[currentCount - 1].content !== inputs.question || time !== questions[currentCount - 1].timer)) {
                UpdateQuestion();
            }
            if (questions.length > 1) { props.setSave(true) }
            props.onBack()
        }
    }
    return (
        <>
            {props.visible &&
                <>
                    <div className="flex justify-center mb-3">
                        <div className="flex justify-between quiz-form">
                            <div className='text-4xl font-medium max-[600px]:text-3xl'>Question</div>
                            <Time time={time} setTime={setTime} />
                        </div>
                    </div>
                    <div id='quiz-form-container' >
                        
                        <div className='quiz-form'>
                            <QuestionInput Ref={InputQ} value={inputs.question} changeInputQuestion={changeInputQuestion} changeFocus={changeFocus} />
                            <div className='all-options mb-3'>
                                <QuestionHead add={add} />
                                <Options remove={removeOption} Options={options} corrected={corrected} />
                            </div>
                            <Input visible={visible} addOptionKey={addOptionKey} input={inputs.option} changeInput={changeInput} />
                            <ExplicationInput text={text} setText={setText} />
                            <div className='space-between'>
                                <div>
                                    <Button className="bg-blue-600" id="back-btn" onClick={back} variant="primary">
                                        Back
                                    </Button>
                                    <Button className="bg-blue-600" variant="primary" onClick={next}>
                                        Next
                                    </Button>
                                </div>
                                {questions.length > 1 &&
                                    <Button onClick={props.onSave} className="bg-blue-600" variant="primary">
                                        Save
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}