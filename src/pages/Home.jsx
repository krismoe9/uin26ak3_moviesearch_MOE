import { useState } from "react"

export default function Home(){
    const [search, setSearch] = useState()

    //Kode fra undervisning, skal ikke gjøres sånn
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    const apiKey = 'fc3b5c2c'

    const getMovies = async()=>{
        try
        {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)


        }
        catch(err){
            console.error(err);
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    return (
        <main>
            <h1>Forside</h1>
            <form>
                <label>
                    Søk etter film
                    <input type="search" placeholder="Indiana Jones" onChange={handleChange}></input>
                </label>
            </form>
            <button onClick={getMovies}>Søk</button>
        </main>
    )

}

