import { useEffect, useState } from "react"
import History from "../components/History"
import { Link, useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import Movie from "./Movie"


export default function Home(){
    
    const storedHistory = localStorage.getItem("search") //kommentert ut av studentassisten
    //const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])  //gammel kode
    
    let parsedHistory = [] //ChatGPT
    try {
        parsedHistory = storedHistory ? JSON.parse(storedHistory) : []
        if (!Array.isArray(parsedHistory)) parsedHistory = []
    } catch (e) {
        parsedHistory = []
    }

    const [history, setHistory] = useState(parsedHistory)
    const [focused, setFocused] = useState(false)
    const [search, setSearch] = useState("james+bond")
    const [data, setData] = useState()
    const [error, setError] = useState()



    console.log("Denne kommer fra storage", storedHistory)  //kommentert ut av studentassisten

    //Kode fra undervisning
    const apiKey = import.meta.env.VITE_APP_API_KEY
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`

    console.log(baseUrl)  //kommentert ut av studentassisten
    

    useEffect(()=>{ // Flyttet getMovies inn i useEffect, useEffect refresher siden (refresher ved hvert søk pga [search]) (Fikk hjelp av studentassistentene med dette)
        //varsel når man skriver under 3 bokstaver i søkefeltet
        if (search.length < 3) {
            setError("Du må skrive minst 3 bokstaver")
            
            return
        } else {
            setError("")
        }

        if(Array.isArray(history)) {
            localStorage.setItem("search", JSON.stringify(history)) //kommentert ut av studentassistent
        }



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
        getMovies()

     }, [search,history]) //ChatGPT

        

    const handleChange = (e)=>{
        setSearch(e.target.value)
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setSearch(e)
        e.target.reset() 
        
        setHistory(prev => Array.isArray(prev) ? [...prev, search] : [search]) //ChatGPT 
    }
  

    return (
        <main>
            <article>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input type="search" placeholder="Indiana Jones" onChange={handleChange} onFocus={()=> setFocused(true)}></input>
                    {error && (
                            <span>{error}</span>
                    )}
                </label>
                { focused ? <History history={history} setSearch={setSearch} /> : null }
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

