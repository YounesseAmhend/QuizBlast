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
                <div className="center-flex">
                    <div className="nav-link-custom">
                        <div className="nav-link-custom cursor-pointer" onClick={props.loginDisplay}>Log In</div>
                    </div>
                    <div className="nav-link-custom">
                        <div className="nav-link-custom cursor-pointer" onClick={props.registerDisplay}>Register</div>
                    </div>
                </div>
                :
                <div className="center-flex">
                    <a className="nav-link-custom cursor-pointer" id="logout" href="/" onClick={props.logout}>Log Out</a>
                </div>
            }
        </>
    )
}