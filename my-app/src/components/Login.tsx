import CSRFToken from "./ts/components/csrf"
interface Props{
    goRegister():void
}
export default function Login(props: Props){
    return(
        <>
        <h2 className="text-3xl">Login</h2>
        <div  className="form-style">
            <form action="/login" method="post">
                <CSRFToken />
                <div className="form-group">
                    <input autoFocus className="form-control" type="text" name="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" placeholder="Password"/>
                </div>
                <input className="btn bg-blue-500 text-white p-2 text-lg" type="submit" value="Login"/>
                <div className="link-rl-container">Don't have an account? <span className="link-rl cursor-pointer" onClick={props.goRegister}>Register here.</span></div>
            </form>
        </div>
        </>
    )
}