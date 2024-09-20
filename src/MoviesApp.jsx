import {useState} from "react";
import './MoviesApp.css';
import ratingImg from './assets/rating.png';
import releaseImg from './assets/release.png';

export const MoviesApp = () => {

	const urlBase = 'https://api.themoviedb.org/3/search/movie';
	const API_KEY = import.meta.env.VITE_API_KEY;

	const [movies, setMovie] = useState('');
	const [movieData, setMovieData] = useState([]);
	const [error, setError] = useState('');

	const fetchMovieData = async () => {
		try {
			if (!movies) return setError("Debe ingresar una pelicula a buscar..")
			const response = await fetch(`${urlBase}?query=${movies}&api_key=${API_KEY}&language=es-ES`);
			const data = await response.json();
			console.log(data.results)
			if (!data.results || data.results.length === 0) return setError("No existe la pelicula ingresada");
			setMovieData(data.results);
		} catch (error) {
			console.error("Ha ocurrido un error:", error)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchMovieData();
		setMovie('');
	}

	const handleChange = (e) => {
		setMovie(e.target.value);
		setError('');

	}

	return (
		<div className="container">
			<h1>Buscador de Peliculas</h1>
			<form onSubmit={handleSubmit}>
				<input type={"text"} placeholder={"Ingresa la película que deseas buscar"} onChange={handleChange}
				       value={movies}/>
				<button type={"submit"}>Buscar</button>
				<span>{error}</span>
			</form>

			{movieData &&
				<div className="movie-list">
					{movieData.map(movie => (

						<div key={movie.id} className={"movie-card"}>
							<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
							<h2>{movie.title}</h2>
							<h4>Rating</h4>
							<p><img src={ratingImg} alt={"Rating"}/> {movie.vote_average}</p>
							<h4>Release Date</h4>
							<p><img src={releaseImg} alt={""}/>{movie.release_date}</p>
						</div>
					))}
				</div>
			}
		</div>
	)
}