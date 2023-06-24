import {useState, useEffect, useRef, useCallback } from "react"

type method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export function useAuth(){

    const [is_authenticated, setAuthentication] = useState<boolean | undefined>(undefined)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(undefined)

    useEffect(()=>{
        
            const isAuthenticateds = async () => {

                await fetch("/auth",{
                    method: "GET",
                    })

                    .then((response) => response.json())

                    .then((result) => {
                        console.log(result)
                        setAuthentication(result.is_authenticated)
                        setLoaded(true)
                    })

                    .catch((Error)=>setError(Error))

            }

            isAuthenticateds()

        }
    ,[])

    return {is_authenticated, loaded, error}
}

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

                    setData((old:any)=>[...old,...result])
                    
                    setLoaded(true)
                    
                    
                }
                else{

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
                    console.log(response)
                    return response.json()
                })
                .then((result)=>{
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