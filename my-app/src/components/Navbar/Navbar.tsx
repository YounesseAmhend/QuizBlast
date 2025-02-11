import { logout } from "../ts/staticFunctions";
import Auth from "./Auth";
import Unkn from "./Unkn";
import { PAGES } from "../../App";
import { Page } from "../../App";
interface Props {
    is_authenticated: boolean | undefined;
    homeDisplay(): void,
    newDisplay(): void,
    displayUser(id: number): void,
    displaySettings(): void,
    displayAny(page: Page): void,

    loginDisplay(): void,
    registerDisplay(): void,
}
export default function Navbar(props: Props) {
    const { is_authenticated } = props
    return (
        <div className="navbar-custom mb-4 font-medium items-center max-[600px]:text-xs">
            {is_authenticated !== undefined &&
                <div className="flex justify-between w-full max-[600px]:px-0 min-[600px]:px-5">
                    <div className="flex justify-start gap-10 max-[600px]:gap-7  ">
                        <div className="pl-3 nav-link-custom cursor-pointer py-1 self-center " id="home" onClick={props.homeDisplay}>Home</div>
                        <Auth is_authenticated={is_authenticated} newDisplay={props.newDisplay} />
                        <div className="nav-link-custom cursor-pointer py-1 self-center " id="home" onClick={()=>{props.displayAny(PAGES.CATEGORIES)}}>Categories</div>
                    </div>
                    <Unkn  displaySettings={props.displaySettings} displayUser={props.displayUser} is_authenticated={is_authenticated} loginDisplay={props.loginDisplay} registerDisplay={props.registerDisplay} logout={logout}/>
                </div>
            }
        </div>
    )

}