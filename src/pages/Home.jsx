import { useEffect, useState } from "react"
import History from "../components/History"
import { Link, useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import Movie from "./Movie"


export default function Home(){
    
    const storedHistory = localStorage.getItem("search") //kode fra undervisning
    
    let parsedHistory = [] //ChatGPT-samtale https://chatgpt.com/c/69afecc5-2d28-8325-9ffd-fcf356278103
    try {
        parsedHistory = storedHistory ? JSON.parse(storedHistory) : []
        if (!Array.isArray(parsedHistory)) parsedHistory = []
    } catch (e) {
        parsedHistory = []
    }

    const [history, setHistory] = useState(parsedHistory)
    const [focused, setFocused] = useState(false)
    
    const [search, setSearch] = useState("james+bond") //fikk hjelp av studentassistenene med denne koden
    const [data, setData] = useState()
    const [error, setError] = useState()




    console.log("Denne kommer fra storage", storedHistory)  

    //Kode fra undervisning
    const apiKey = import.meta.env.VITE_APP_API_KEY
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`

    console.log(baseUrl)  
    

    useEffect(()=>{ // Flyttet getMovies inn i useEffect, useEffect refresher siden (refresher ved hvert søk pga [search]) (Fikk hjelp av studentassistentene med dette)
        //varsel når man skriver under 3 bokstaver i søkefeltet kilde: https://www.geeksforgeeks.org/reactjs/how-to-restrict-user-character-input-limit-in-reactjs/
        //ChatGPT-samtale https://chatgpt.com/share/69b286a8-b940-8011-b2c5-ea5249fd7a86
    
        if (search.length < 3) {
            setError("Du må skrive minst 3 bokstaver")
            return
        } else {
            setError("")
        }

        if(Array.isArray(history)) {
            localStorage.setItem("search", JSON.stringify(history))
        }


        //ChatGPT-samtale https://chatgpt.com/share/69b286d3-e944-8011-b517-dae01e0c4a60
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

     }, [search,history]) //ChatGPT-samtale https://chatgpt.com/share/69b286fb-ee90-8011-a944-5d545ea6d50d

        

    const handleChange = (e)=>{
        setSearch(e.target.value)
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault() 
        
        setHistory(prev => Array.isArray(prev) ? [...prev, search] : [search]) //ChatGPT 
    }
  

    return (
        <main>
            <article className="SearchSection">
            <h1>Forside</h1>
            <p>Søk etter film</p>
            <form onSubmit={handleSubmit}>
                <label>
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
                    key={film.imdbID /* key for å identifisere de forskjellige filmene  ChatGPT-samtale https://chatgpt.com/c/69afd1d7-f6cc-8325-b58b-7951de55c6cc */}
                    title={film.Title}
                    year={film.Year}
                    poster={film.Poster}
                />
            ))}
            </section>
        </main>
    )

}

