import { getCookie } from "./components/csrf";

// interfaces
interface Quiz{
    id:number,
    username:string,
    name:string,
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
interface optionSub{
    text: string;
    correct: boolean;
}
export function makeid(length: number) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    let str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
export function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
export function remove(list: any[], id: any): any[]{
    return list.filter((item)=>item.id !== id)
}

export async function getQuizs():Promise<Quiz[]>{
    let quizs:any =""
    await fetch("/quiz")
    .then(response =>{
        return response.json()
    })
    .then((result)=>{
        quizs = result
    })
    return quizs;
}
export async function subQuiz(input:string):Promise<number>{
    let id:any=""
    await fetch("/new",{
        method: "POST",
        body: JSON.stringify({
            "name": input
        })
    })
    .then((response)=>response.json())
    .then(result=>
        id = result.quiz_id
    )
    return id
}

export async function subQuestion(quiz_id: number, input: string, quote: string, timer: number, optionsToSub: optionSub[]){
    let question_id : number | undefined = undefined
    if (optionsToSub.length > 0 && input !== ""){
        await fetch("/question",{
                method: "POST",
                body: JSON.stringify({
                    "quiz_id": quiz_id,
                    "content": input,
                    "option": optionsToSub,
                    "timer": timer,
                    "quote": quote,
                })
            })
            .then((response)=>response.json())
            .then(result=>
                question_id = result.question_id
            )
            return question_id
    }
}
export function isOnlySpace(input: string): boolean {
    return !input.trim().length ? false : true
}
export function isSelect(option:Option[]):boolean {
    for (let i = 0; i < option.length; i++) {
        if(option[i].correct){
            return true
        }
    }
    return false
}
export function getQuestion(count:number,questions: Question[]):Question{
    for(let i = 0; i < questions.length; i++) {
        if(questions[i].count === count){
            return questions[i]
        }
    }
    return questions[0]
}

export function updateQuestions(questions: Question[], question: Question): Question[]{
    subUpQuestion(question)
    let index = question.count-1
    questions[index] = question
    return questions
}

export function CompareOptions(options_A: Option[], options_B: Option[]): boolean{
    return options_A.length === options_B.length
}
export async function subUpQuestion(question: Question){
    await fetch("/question",{
        method:"PUT",
        body: JSON.stringify({
            question_id: question.id,
            content: question.content,
            options: question.options,
            timer: question.timer,
            quote: question.quote,
        })
    })
}
export async function UpQuiz(input: string, id: number | undefined){
    if(id)
    await fetch("/new",{
        method: "PUT",
        body: JSON.stringify({
            name : input,
            quiz_id: id
        })
    })
}
export const logout = async () => {
    const csrftoken = getCookie('csrftoken');
    let headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);
    fetch("/logout", {
        method: 'POST',
        headers: headers,
        credentials: 'include'
    })
}
export function truncateTitle(title: string, maxLength: number = 40): string {
    if (title.length <= maxLength) {
      return title;
    } else {
      return title.slice(0, maxLength - 3) + "...";
    }
  }

export function endsWithNumber(inputString: string): boolean {
// Use a regular expression to match a number at the end of the string
const regex = /\d+$/;
return regex.test(inputString);
}