import { Collapse, useDisclosure } from '@chakra-ui/react'
interface Results{
    count: number;
    Quesiton:string;
    answer:string;
    correct: boolean;
    correctAnswer:string;
    quote?:string;
}
interface Props{
    result?: Results[];
}



export default function MoreBtn(props: Props){ 
    const {result} = props
    const { isOpen, onToggle } = useDisclosure()

    return (
        <>  
            <Collapse in={isOpen} animateOpacity>
                <div>
                        <hr className='mb-4'/>
                        {result?.map(r=>
                            <div className=' ml-20'>
                                <div className="text-xl font-semibold mb-3">{r.count}. {r.Quesiton}</div>
                                {r.correct ? 
                                    <div className=" text-green-500 font-medium mb-3 pl-4">You Answer: {r.answer}</div>:
                                    <>
                                        <div className="text-red-600 font-medium pl-4" >You Answer: {r.answer}</div>
                                        <div className="font-medium mb-4 pl-4">Correct answer: {r.correctAnswer}</div>
                                    </>
                                 }
                                <div className="mb-3">{r.quote}</div>
                            
                            </div>
                        )}
                    </div>
            </Collapse>
                    
            
            <div onClick={onToggle} className="cursor-pointer p-2 bg-blue-500 text-white rounded-md text-center m-3">
                {isOpen ? <> Less Details </> : <>More Details</>}
            </div>
            
        </>
    )
}