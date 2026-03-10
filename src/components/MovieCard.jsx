
export default function MovieCard({title, year, poster}){

    return( 
        <article className="MovieCard">  
            <h3>{title}</h3>
            <p>{year}</p> 
            <img src={poster} alt={title} />
        </article>
    )
}