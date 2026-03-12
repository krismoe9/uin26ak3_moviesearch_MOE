import { Link } from "react-router-dom"

export default function MovieCard({title, year, poster}){
    //ChatGPT-samtale https://chatgpt.com/share/69afe64c-0978-8011-93f0-4f944f254ec9

    //kilde slug https://rohitmondallblog.hashnode.dev/usingslug-to-make-dynamic-and-user-friendly-urls-for-our-website
    //kiilde slug https://www.youtube.com/shorts/xkWvkjaW4k8
    //ChatGPT-samtale https://chatgpt.com/share/69affb83-440c-8011-9771-10c751302e5e

    
    const slug = title
        ?.toLowerCase() //gjør om til små bokstaver i hele teksen
        ?.replace(/\s+/g, '-') //
        ?.replace(/[^\w-]+/g, '')

        console.log(title)

    return( 
        <Link to={`/${slug}`} className="MovieCardLink"> 
            <article className="MovieCard">  
                <h3>{title}</h3>
                <p>{year}</p> 
                <img src={poster} alt={title} />
            </article>
        </Link>
    )
    /*ChatGPT-samtale https://chatgpt.com/share/69af32e4-9090-8011-88be-283be5876cba*/ 
}
