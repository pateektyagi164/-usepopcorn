export default function Movie({ movie, setselectedId, setnewStart }) {
  function handleClick() {

    setnewStart(true);

    setselectedId(prevId =>
      prevId === movie.imdbID ? null : movie.imdbID
    );
  }

  return (
    <li onClick={handleClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
