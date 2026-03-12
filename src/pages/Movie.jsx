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

     const slugTitle = ( slug ) => { //ChatGPT
         return slug
          .split("-")
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(" ")
    }

    

     useEffect(() => { //ChatGPT
         const findFilm = async () => {
             const title = slugTitle(slug)
             try{
                const res = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
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
             
            //  .then(res => res.json())
            //  .then(data => {
            //      if(data.Response === "False" ) {
            //          setError("Finner ikke film")
            //      }else{
            //          setFilm(data)
            //      }
            //   })
            //  .catch(err => console.error(err))
        }

    findFilm()

    }, [slug])



    console.log("Film:", film)



    return (
        <section>
            <Link to={'/'}>Hjem</Link>
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
                <p>Laster film...</p>
            ) : null}

        </section>
    )

}

