import { logout } from "../ts/staticFunctions";
import Auth from "./Auth";
import Unkn from "./Unkn";

interface Props {
    is_authenticated: boolean | undefined;
    homeDisplay(): void,
    newDisplay(): void,
    loginDisplay(): void,
    registerDisplay(): void
}
export default function Navbar(props: Props) {
    const { is_authenticated } = props
    return (
        <div className="navbar-custom">
            {is_authenticated !== undefined &&
                <div className="content-container-nav">
                    <div className="center-flex">
                        <div className="nav-link-custom cursor-pointer" id="home" onClick={props.homeDisplay}>Home</div>
                        <Auth is_authenticated={is_authenticated} newDisplay={props.newDisplay} />
                    </div>
                    <Unkn is_authenticated={is_authenticated} loginDisplay={props.loginDisplay} registerDisplay={props.registerDisplay} logout={logout}/>
                </div>
            }
        </div>
    )

}