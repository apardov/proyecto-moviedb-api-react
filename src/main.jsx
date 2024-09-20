import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {MoviesApp} from "./MoviesApp.jsx";
import './main.css';


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<MoviesApp/>
	</StrictMode>,
)
