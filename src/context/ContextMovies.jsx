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
            console.log(data);

            setShows(
                data
            )

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        Shows()
    },[])
    
  return (
    <div className='bg-blue-500'>
        <h1 className='text-4xl'>All Shows</h1>
        <hr />
        <div >
        {
            shows.map((show, index)=>(
                <div className='bg-white m-2' key={index}>
                    <p><img className='w-20 h-20' src={show.imageSet.verticalPoster.w720} alt="" /></p>
                    <p>{show.title} [{show.genres[0].name}, {show.genres[1].name}]</p>
                    <p>Description: {show.overview}</p>
                    <p>Release Year: {show.releaseYear}</p>
                    <p>Duration: {show.runtime} minutes</p>


                    <div>
                        <h1 className="text-sm underline text-amber-300">Where to stream:</h1>
                        <div className='flex flex-col sm:flex-row '>
                        {
                            show.streamingOptions?.us?.length > 0 ? (
                                show.streamingOptions.us.map((streamingSite, index1) => (
                                    <div className='flex items-center' key={index1}>
                                        <p><img src={streamingSite.service.imageSet.lightThemeImage} alt="" /></p>
                                        <p className='p-2 '>
                                            <a  className='bg-blue-500 p-1 rounded-full' href={streamingSite.videoLink || "Unknown Platform"}>Watch</a>
                                        </p>
                                    </div>
                                )).slice(0,2)
                            ) : (
                                <p>No streaming options available</p>
                            )
                        }</div>
                    </div>

                </div>
            )).slice(0,10)
        }  
        </div>
    </div>
  )
}

export default ContextMovies
