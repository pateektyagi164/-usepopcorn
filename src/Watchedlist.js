import Watchedmovie from './Watchedmovie.js'
import {useLocalStorage} from './localstorage.js'
export default function Watchedlist({watched,setWatched}){
  useLocalStorage(watched);
  function removemovie(id){
    const arr=watched.filter((movie)=>movie.imdbId!==id);
    setWatched(arr)
  }
  return (
    <ul className="list">
                {watched.map((movie) => (
                   <Watchedmovie movie={movie} key={movie.imdbID} removemovie={removemovie}/>
                ))}
              </ul>
   

  )
};