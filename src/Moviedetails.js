import {useEffect,useState} from 'react'
import Star from'./Star.js'
export default function MovieDetails({apikey,watched,selectedId,onCloseMovie,setWatched,setselectedId,userRating,setuserRating,setnewStart,newStart}){

  function userating(x){
    setuserRating(x);
  };
  const[movie,setmovie]=useState({});
const {Title:title,Year:year,Poster:poster,Runtime:runtime,imdbRating,Plot:plot,Released:released,Actors:actors,Director:director,Genre:genre}=movie;
 const imdbId=selectedId;
    useEffect(function(){
    async function getMoviesDetails(){
    const res= await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${selectedId}`);
    const data=await res.json();
    console.log(data);
    setmovie(data);
   
  };
  
  getMoviesDetails();
    },[selectedId]);

    useEffect(function(){
      if(movie.Title){
      document.title=movie.Title;
      }
      // bellow this is the clenup function 
      // what do you mean by javascript closers
      return function(){
        document.title='🍿Usepopcorn'
      }


    },[movie.Title]);

  function addtowatchlist(){
    const addarr={
      title,
      year:Number(year),
      poster,
      runtime:runtime?Number(runtime.split(" ").at(0)):0,
      imdbRating:Number(imdbRating),
      plot,
      released,
      actors,
      director,
      genre,
      userRating,
      imdbId
    }

    setWatched((arr)=>[...arr,addarr ]);
    setselectedId(null);
    setuserRating(0);
    setnewStart(true);

  }
  const tempId=watched.map((movie)=>movie.imdbId).includes(selectedId);
    const temprating=watched.find((movie)=>movie.imdbId===selectedId)?.userRating;
  
    return (
      <div className='details'>
        <header>
          <img src={poster} alt={`Poster of ${movie}`}>
        </img>
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB rating
          </p>

        </div>
        </header>
        
       
        <section>
          <div className='rating' >
            {tempId?<div>{`The movie is alreday rated by you ${temprating} `}</div>: <>
            <Star setnewStart={setnewStart} newStart={newStart} userating={userating} maxstars={10} size={23} starcolor={'yellow'} gapinstar={1} messages={[]}/>
           {userRating>0?<button className='btn-add' onClick={()=>addtowatchlist()}> + ADD to watch list</button>:<></>}
           {console.log(userRating)}
           </>
           }
          
           
        </div>
          <p>
            <em>{plot}`</em>
          </p>
          <p>Staring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        
        <button className='btn-back' onClick={onCloseMovie}> &larr;</button>
      </div>
    )
  };
 






