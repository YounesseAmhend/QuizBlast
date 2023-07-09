import {useState, useEffect, useRef, useCallback } from "react"

type method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export function useFetch<T>(link: string, init?: T, method: method = 'GET', request?: any){

    const [data, setData] = useState<any | undefined | T>(init)

    const [loaded, setLoaded] = useState(false)

    const hasMore = useRef(true)

    const [error, setError] = useState<string | undefined>()

    const fetchMore = async (request: any) =>{
            setLoaded(false)
            console.log(request)
            await fetch(link, {
                method: method,
                body: JSON.stringify(request),
            })
            
            .then(response =>{
                return response.json()
            })

            .then((result)=>{
                console.log(result)
                if(result.error===undefined){

                    console.log(data)

                    setData((old:T[])=>[...old,...result as T[]])
                    
                    setLoaded(true)
                    
                    
                }
                else{
                    setData((old:T[])=>[...old,...result.quizs])
                    setError(result.error);
                    hasMore.current = false;
                    setLoaded(true)
                    console.log("Enough");
                }
            })
            .catch(err=>setError(err))
        }
    useEffect(()=>{

        if(method === 'GET'){

            const fetchdata = async () => {
                await fetch(link)
                .then(response =>{
                    
                    return response.json()
                })
                .then((result)=>{
                    console.log(result)
                    setData(result)
                    setLoaded(true)
                })
                .catch(err=>setError(err))
            }   

            fetchdata()
        }
    },[])
    
    return {data, loaded, error, hasMore, fetchMore}
}
