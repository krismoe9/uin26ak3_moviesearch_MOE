import { useEffect, useState } from "react"
import History from "../components/History"
import { Link } from "react-router-dom"
import MovieCard from "../components/MovieCard"

export default function Home(){
    
    /* const storedHistory = localStorage.getItem("search") */ //kommentert ut av studentassisten
    const [focused, setFocused] = useState(false)
    
    /* const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : []) */ //kommentert ut av studentassisten
    const [search, setSearch] = useState("james+bond")
    const [data, setData] = useState()
    const [error, setError] = useState()

    /* console.log("Denne kommer fra storage", storedHistory) */ //kommentert ut av studentassisten

    //Kode fra undervisning
    const apiKey = import.meta.env.VITE_APP_API_KEY
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`

    /* console.log(baseUrl) */ //kommentert ut av studentassisten
    

    useEffect(()=>{ // Flyttet getMovies inn i useEffect, useEffect refresher siden (refresher ved hvert søk pga [search]) (Fikk hjelp av studentassistentene med dette)
        const getMovies = async()=>{
            try
            {
                const response = await fetch(`${baseUrl}`)
                const data = await response.json()
                setData(data.Search)
    
    
            }
            catch(err){
                console.error(err);
            }
        }
        getMovies();
    }, [search])

    

    const handleChange = (e)=>{
        setSearch(e.target.value)
        
        //varsel når man skriver under 3 bokstaver i søkefeltet
        if (e.target.value.length < 3) { 
            setError("Du må skrive minst 3 bokstaver") //varsel-tekst
        } else {
            setError("")
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setSearch(e)
        e.target.reset()        
    }
    console.log(data)

    return (
        <main>
            <article>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input type="search" placeholder="Indiana Jones" onChange={handleChange}></input>
                    {error && (
                            <span>{error}</span>
                    )}
                </label>
                {/* { focused ? <History history={history} setSearch={setSearch} /> : null } */ /* kommentert ut av studentassisten */ } 
                <button>Søk</button>
            </form>
            </article>

            <section className="PosterSection">
            {data?.map((film) => (
                <MovieCard
                    key={film.imdbID /* key for å identifisere de forskjellige filmene */}
                    title={film.Title}
                    year={film.Year}
                    poster={film.Poster}
                />
            ))}
            </section>
        </main>
    )

}

