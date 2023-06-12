import React from "react";
interface Props{
    visible: boolean;
    setPageCount:React.Dispatch<React.SetStateAction<number>>;
    setChosed:React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedOption:React.Dispatch<React.SetStateAction<number|undefined>>
    setVisible():void;
    pageCount: number;
    questionLength: number | undefined
}

export default function NextBtn(props: Props){
    const { visible, setPageCount, pageCount, setChosed, setSelectedOption, questionLength, setVisible } = props
    function nextPage(){
        console.log("alert")
        if (questionLength === pageCount){
            console.log("no next page")
            setVisible()
        }
        setPageCount(pageCount+1)
        setChosed(false)
        setSelectedOption(undefined)
        
    }
    return(
        <>
            {visible && 
            <div onClick={nextPage} className="cursor-pointer p-2 bg-blue-500 text-white rounded-md text-center m-3">
                Next
            </div> 
            }
        </>
    )
}