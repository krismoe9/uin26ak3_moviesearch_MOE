import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react"

export default function Movie(){
    const { slug } = useParams()
    const [film, setFilm] = useState(null);
    const [error, setError] = useState("");

    const apiKey = import.meta.env.VITE_APP_API_KEY

     const slugTitle = ( slug ) => {
         return slug
        //  .split("-")
        //  .map(word => word[0].toUpperCase() + word.slice(1))
        //  .join(" ");
    }

     useEffect(() => {
         const findFilm = async () => {
             const title = slugTitle(slug)
             fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
             .then(res => res.json())
             .then(data => {
                 if(data.Response === "False" ) {
                     setError("Finner ikke film")
                 }else{
                     setFilm(data)
                 }
              })
             .catch(err => console.error(err))
        }
    findFilm()
    }, [slug])

    console.log("Film:", film)

    return (
        <section>
            <h1>{ slug }</h1>
            <article>
                <MovieCard
                    key={film?.imdbID /* key for å identifisere de forskjellige filmene */}
                    title={film?.Title}
                    year={film?.Year}
                    poster={film?.Poster}
                />
            </article>
        </section>
    )

}