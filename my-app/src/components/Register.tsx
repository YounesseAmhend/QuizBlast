import CSRFToken from "./ts/components/csrf"

interface Props{
    goLogin():void,
}
export default function Register(props: Props){
    return(
        <>
            <h2 className="text-3xl">Register</h2>
                <div></div>
            <div className="form-style">
                <form action="/register" method="post">
                    <CSRFToken />
                    <div className="form-group">
                        <input className="form-control" autoFocus type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" placeholder="Email Address"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password"/>
                    </div>
                    <input className="btn bg-blue-500 text-white p-2 text-lg" type="submit" value="Register"/>
                    <div className="link-rl-container">Already have an account? <span className="link-rl" onClick={props.goLogin}>Log In here.</span></div>
                </form>
            </div>
        </>
    )
}