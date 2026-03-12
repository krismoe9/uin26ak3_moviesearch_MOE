import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react"
import Home from "./Home"
import { Link } from "react-router-dom"

export default function Movie(){
    const { slug } = useParams()
    const [film, setFilm] = useState(null);
    const [error, setError] = useState("");

    const apiKey = import.meta.env.VITE_APP_API_KEY

     const slugTitle = ( slug ) => { //ChatGPT-samtale https://chatgpt.com/share/69b286e7-8424-8011-ab42-295a1bca7eff
         return slug //retunerer slug som en lesbar tittel
          .split("-") //deler teksten ved hver "-" og deler de opp i en array
          .map(word => word[0].toUpperCase() + word.slice(1))//gjør om til stor forbokstav i hvert ord
          .join(" ")// setter arrayen sammen igjen til en string med mellomrom mellom ordene
    }

    

     useEffect(() => { //ChatGPT-samtale https://chatgpt.com/c/69b28803-304c-832b-bc10-2b8fcb72177d
         const findFilm = async () => {
             const title = slugTitle(slug)
             try{
                const res = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`) //ChatGPT-samtale https://chatgpt.com/share/69b28fdb-29d4-8011-89c7-8f5d13bcbcc7
                const data = await res.json()
             
             if(data.Response === "False") {
                setError("Finner ikke film")
             } else {
                setFilm(data.Search[0])
             }
             } catch (err) {
                console.error(err)
                setError("Noe gikk galt")
             }
             
        }

    findFilm()

    }, [slug])

    console.log("Film:", film)



    return (
        <section className="ResultSection">
            <Link to={'/'}>Tilbake</Link>
            <h2>{ slugTitle(slug) }</h2> {/* ChatGPT*/}

            {error && <p>{error}</p>}

            {film ? ( //ChatGPT
                <MovieCard
                    key={film?.imdbID /* key for å identifisere de forskjellige filmene */}
                    title={film?.Title}
                    year={film?.Year}
                    poster={film?.Poster}
                />
            ) : !error ? (
                <p>Laster film...</p> // tekst som kommer hvis siden ikke klarer å finne filmen
            ) : null}

        </section>
    )

}

