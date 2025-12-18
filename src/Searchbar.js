import {forwardRef} from 'react'
export default forwardRef(function Searchbar({query,setquery},ref){
 return (
  <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          ref={ref}
          onChange={(e) => setquery(e.target.value)}
        />
 )
});