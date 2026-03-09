import { useState, useEffect } from "react"


export default function MovieCard(){
    const [movies, setMovies] = useState([]) //Tom liste

    const apiKey = import.meta.env.VITE_APP_API_KEY //Nøkkelen må være definert før vi bruker den
    const searchQuery = "james bond"
    const baseUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${apiKey}`

        useEffect(()=>{

        const getMovies = async ()=>{
            const response = await fetch(baseUrl)
            const data = await response.json()
            if (data.Response === "True") { //if-statement: hvis true viser bare de 10 første filmene
                setMovies(data.Search.slice(0,10))
            }
            console.log("Dette kommer fra getMovies", data)
            setMovies(data)
        }
        
        getMovies()
        }, [])



    return( 
        <article> 
            <h3>Topp 10</h3>
            {movies ? (
                <> {/* ternary operator -> Hvis vi har filmen, vis den. Hvis ikke, vis ‘Laster film… */}
                    <img src={movies.Poster} alt={movies.Title} />
                    <p>{movies.Title}</p>
                    <p>{movies.Year}</p>
                </>
             ) : (
                    <p>Finner film...</p> // vises mens vi venter på API
            )}
        </article>
    )
}