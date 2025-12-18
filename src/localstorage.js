import {useEffect} from 'react'
export function useLocalStorage(watched){
    useEffect(()=>{
        localStorage.setItem('watched',JSON.stringify(watched));
        },[watched])}