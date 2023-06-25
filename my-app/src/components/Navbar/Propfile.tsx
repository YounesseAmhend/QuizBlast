import { useState, useEffect, useRef } from "react"
import { useFetch } from "../ts/hooks";
interface Props{
    logout: () => void;
}

export default function Profile(props: Props){
    const { logout } = props
    const [visiblePopUp, setVisiblePopUp] = useState(false)
    const { data, loaded } = useFetch<string>("/user/username")
    const popupRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (popupRef.current && event.target instanceof Node && !popupRef.current.contains(event.target)) {
            setVisiblePopUp(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    return (
        <div ref={popupRef}>
            {(visiblePopUp && loaded) && 
                <div  className= " bg-neutral-300 fixed rounded shadow-lg p-4 right-0 py-2 mt-8 mr-24 max-[600px]:mr-20">
                    <div className="mb-2 cursor-pointer hover:text-zinc-400">{data.username}</div>
                    <div className="mb-2 cursor-pointer hover:text-zinc-400">Settings</div>
                    <a href="/" className="cursor-pointer hover:text-red-600" onClick={logout}>Logout</a>
                </div>
            }
            <div className="cursor-pointer flex items-center justify-center w-12 h-12  shadow-md">
                <img className="w-11 h-11 rounded-full" src="static/images/profile/default.jpg"  onClick={()=>setVisiblePopUp((v)=>!v)}></img>
            </div>
        </div>
    )
}