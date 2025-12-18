import Navbar from './Navbar.js'
import Main from './Main.js'
import Numresults from './Numresults.js'
import Listbox from './Box.js'
import {useState,useEffect,useRef} from 'react'
import Movielist from './Movielist.js'
import Searchbar from './Searchbar.js'
import Watchedbox from './Box.js'
import Watchedsummary from'./Watchedsummary.js'
import Watchedlist from './Watchedlist.js'
import MovieDetails from'./Moviedetails.js'

const apikey='d3c5c70c';

export default function App() {
  const [watched, setWatched] = useState(function(){
  const data = localStorage.getItem("watched");
  return data ? JSON.parse(data) : [];
});
  const searchEL=useRef(null);
  const [query,setquery]=useState("");
  const [loading,setloading]=useState(false);
  const [movies, setMovies] = useState([]);
  const [error,seterror]=useState("");
  const[selectedId,setselectedId]=useState(null);
  const [userRating,setuserRating]=useState(0);
  const [newStart,setnewStart]=useState(true);

function handleCloseMovie(){
  setselectedId(null);
 }

  
  // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=interstellar`).then((res)=>res.json()).then((data)=>console.log(data.Search));
  // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=interstellar`).then((res)=>res.json()).then((data)=>setMovies(data.Search));
  // we cant use this because our react app will trap under infinite loop as each time when setMovies function is used the component instance rerender and will kept on doing so infinite time and thus raising infinite api calls
  /*
  
  useEffect(function(){
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=interstellar`).then((res)=>res.json()).then((data)=>setMovies(data.Search));
  },[]);


  */
  // the useeffect make sure the effect works when the component is painted on the screen 
  // the empty array here make sure the effect works only when the component instance is mounted i.e when rendered for thr first time so that it does not fall in infinite loop
  // this array that we used in our useEffect is callled as dependency array 
  // note that side effect is the communication between the react component and the component outside the react world i.e real world
  //side effect can be triggred by using both event handlers(onClick,onChange,onMouseEnter etc) or by using effects(useEffects) that makes them happen at different life cycle of the component instance by using the dependency array to keep the side effect in sync with our UI
  //always prefer to use event handlers to triggers side effects 
  useEffect(() => {
    searchEL.current?.focus();
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      handleCloseMovie();
      console.log('sala randi');
    }
    else if(e.key==='Enter'){
      searchEL.current?.focus();
    }
    else if(e.key==='Delete'){
      setquery("");
    }
  }


  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  useEffect(function(){
    const controller = new AbortController(); // this is browser api like fetch
    async function fetchresult(){
      try{
        if(!query){
          setMovies([]);
          seterror("");
          return
        };
        setloading(true);
        seterror("");
        const response= await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&s=${query}`,{ signal: controller.signal });
        if(!response.ok){
          
          throw new Error('something went wrong');
        };
        const data=await response.json();
        if(data.Response==='False'){
             throw new Error('no movie founded');
        }
       
        setMovies(data.Search);
        console.log(data.Search);
      }catch(err){
        if (err.name !== "AbortError") {
        seterror(err.message);
      }

      }finally{
      setloading(false);
      }
    };

    fetchresult();
    return () => controller.abort();// this is the clean up function
  },[query]);
  return (
    <>
    <Navbar >
      <Searchbar ref={searchEL} query={query} setquery={setquery} />
    {(error.length>0)? <Numresults movies={[]}/>: <Numresults movies={movies} />}
     
      </Navbar>
    <Main > 
      <Listbox >
       {!(error.length>0)?(loading?<Loader />: <Movielist movies={movies} setselectedId={setselectedId} setnewStart={setnewStart}/>):<Errormessage message={error}/>}
        </Listbox>
        <Watchedbox>
          {selectedId ?<MovieDetails apikey={apikey}watched={watched} selectedId={selectedId} onCloseMovie={handleCloseMovie} setWatched={setWatched} setselectedId={setselectedId} userRating={userRating} setuserRating={setuserRating} setnewStart={setnewStart} newStart={newStart}/>:<>
          <Watchedsummary watched={watched} />
        <Watchedlist setWatched={setWatched} watched={watched} />
          </>}
        
        </Watchedbox>

      </Main>
    </>
  );
};
function Errormessage({message}){
  return (
    <h1 className='error'><span>❌</span>{message}</h1>
  )
};
function Loader(){
  return (
    <h1 className='Loader'><strong>Loading🔃🔃🔃🔃🔃🔃</strong></h1>
  )
};
