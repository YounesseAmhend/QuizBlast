import Profile from "./Propfile"
interface Props {
    is_authenticated: boolean,
    loginDisplay(): void,
    registerDisplay(): void,
    logout(): void
}

export default function Unkn(props: Props) {
    return (
        <>
            {!props.is_authenticated ?
                <div className="flex justify-center gap-3 max-[600px]:gap-2">
                        <div className="nav-link-custom cursor-pointer rounded-2xl py-1 px-2 bg-slate-500 m-0" onClick={props.loginDisplay}>Log In</div>
                        <div className="nav-link-custom cursor-pointer rounded-2xl py-1 px-2 bg-slate-600 m-0" onClick={props.registerDisplay}>Register</div>
                </div>
                :
                <div className="flex justify-center">
                    <Profile logout={props.logout} />
                    {/* <a className="nav-link-custom cursor-pointer" id="logout" href="/" onClick={props.logout}>Log Out</a> */}
                </div>
            }
        </>
    )
}