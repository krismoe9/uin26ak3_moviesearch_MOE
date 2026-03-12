import { Link } from "react-router-dom"

export default function MovieCard({title, year, poster}){


    const slug = title
        ?.toLowerCase()
        ?.replace(/\s+/g, '-')
        ?.replace(/[^\w-]+/g, '')


        console.log("Slug", title)

    return( 
        <Link to={`/movie/${slug}`}>
            <article className="MovieCard">  
                <h3>{title}</h3>
                <p>{year}</p> 
                <img src={poster} alt={title} />
            </article>
        </Link>
    )
}
