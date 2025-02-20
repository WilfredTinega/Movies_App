import React, { useEffect, useState } from 'react'

const ContextMovies = () => {
    const [shows, setShows] = useState([])
    const [streams, setStreams] = useState([]);
    const [cards, setCards] = useState([]);

    const Shows =  async () => {
        try {
            const url = 'https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=Batman&series_granularity=show&show_type=movie&output_language=en';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_MOVIES_KEY,
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data[0]);

            setShows(
                data
            )
            setStreams(
                data[0].streamingOptions
            )
            setCards()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        Shows()
        
    },[])
    
  return (
    <div>
        <h1 className='text-4xl'>All Shows</h1>
        <hr />
        {
            shows.map((show, index)=>(
                <div key={index}>
                    <p>title:{show.title} </p>
                    <p>image: <img src={show.imageSet.verticalPoster.w720} alt="" /></p>
                    <p>Overview: {show.overview}</p>
                    <p>release year: {show.releaseYear}</p>
                    <p>time: {show.runtime} minutes</p>
                    <p>Genres: {show.genres[0].name}, {show.genres[1].name}</p>
                    <p>rating:{show.rating}</p>


                    <div>
                        <h1 className="text-sm underline text-amber-300">Where to stream:</h1>
                        <div className=''>
                        {
                            show.streamingOptions?.us?.length > 0 ? (
                                show.streamingOptions.us.map((streamingSite, index1) => (
                                    <div key={index1}>
                                        <p>{streamingSite.service.name || "Unknown Platform"} <img src={streamingSite.service.imageSet.lightThemeImage} alt="" /></p>
                                        <p>
                                            <a className='bg-blue-500' href={streamingSite.videoLink || "Unknown Platform"}>Watch</a>
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No streaming options available</p>
                            )
                        }</div>
                    </div>

                </div>
            )).slice(0,10)

        }      
    </div>
  )
}

export default ContextMovies
