import Movie from './Movie.js'


export default function Movielist({movies,setselectedId,setnewStart}){
  
  
  return (
    <ul className="list list-movies">
              {movies?.map((movie) => (<Movie movie={movie}  key={movie.imdbID}  setselectedId={setselectedId} setnewStart={setnewStart}/>))}
            </ul>
    
  )
};