import CSRFToken from "./ts/components/csrf"
import { FormEvent, useRef } from "react"
interface Props{
    goLogin():void,
}
export default function Register(props: Props){
    const inputRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    function RegisterAsQuest(event: FormEvent){
        event.preventDefault();
        inputRef.current!.value = 'true';
        console.log("Register");
        formRef.current!.submit();
    }
    return(
        <>
            <div className="form-style flex-col items-center">
                <form ref={formRef} action="/register" method="post">
                    <h2 className="text-3xl max-[600px]:text-2xl m-0 mb-4 mt-3">Register</h2>
                    <CSRFToken />
                    <div className="form-group">
                        <input className="form-control" autoFocus type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password"/>
                    </div>
                    <input className="btn bg-blue-500 text-white p-2 text-lg" type="submit" value="Register"/>

                    <input type="hidden" defaultValue={"false"} name="guest" ref={inputRef}/>

                    <div className="link-rl-container">Already have an account? <span className="link-rl cursor-pointer" onClick={props.goLogin}>Log In here.</span></div>

                    <button onClick={RegisterAsQuest} type="submit" className="block mt-2 rounded-md w-full btn-guest bg-green-500 text-white p-2 text-lg focus:outline-none">Register as guest</button>
                    
                </form>
                
            </div>
        </>
    )
}