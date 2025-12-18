import {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
const Containerstyle={
    display:'flex',
    allignItems:'center',
    gap:'16px'
};
Star.propTypes={
    maxstars:PropTypes.number,
    size:PropTypes.number,
    starcolor:PropTypes.string,
    gapinstar:PropTypes.number,
    messages:PropTypes.array,
}

export default function Star({setnewStart,newStart,userating,maxstars=5,size=48,starcolor='yellow',gapinstar=4,messages=[]}){
    const [ratings,setratings]=useState(0);
    const[tempratings,settempratings]=useState(0);
  
   useEffect(() => {
    if (newStart) {
      setratings(0);
      userating(0);
      setnewStart(false);
    }
  }, [newStart]);

  // ✅ SYNC RATING UPWARD
  useEffect(() => {
    userating(ratings);
  }, [ratings]);

    function rating(value){
        if(value===ratings){
            setratings(0);
        }
        else{
         setratings(value);
         }
    };
    const Starcontainerstyle={
    display:'flex',
    gap:`${gapinstar}px`,
};
const Parastyle={
    lineHeight:'20px',
    margin:`${size/3}px`,
    fontSize:`${size/3}px`

};
    
    return(
        <div style={Containerstyle}>
            <div style={Starcontainerstyle}>
                {Array.from({length:maxstars},(_,i)=>(
                    <Starrating key={i} onrate={()=>rating(i+1)}  full={tempratings>0?tempratings>=(i+1):ratings>=(i+1)} onHoverIn={()=>settempratings(i+1)} onHoverOut={()=>settempratings(0)} starcolor={starcolor} starsize={size} />
                ))}
            </div>
            <p style={Parastyle}>
            {messages.length>=maxstars ? (messages[tempratings>0 ? tempratings-1:ratings-1]):(tempratings>0 ? tempratings:ratings)}
            </p>

        </div>
    )
};

function Starrating({onrate,full,onHoverIn,onHoverOut,starcolor,starsize}){
    const Starstyle={
    width:`${starsize}px`,
    height:`${starsize}px`,
    dislay:'block',
    cursor:'pointer'

}
    return (
    <span style={Starstyle} role="button" onClick={onrate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
       {full ? <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill={starcolor}
  stroke={starcolor}
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>:<svg 
  xmlns="http://www.w3.org/2000/svg"
  fill='none'
  viewBox="0 0 24 24"
  stroke={starcolor}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>
}
    </span>
    )
}