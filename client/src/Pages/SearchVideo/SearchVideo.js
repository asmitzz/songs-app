import { useState,useEffect } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { useVideos } from "../../contexts/VideosContextProvider";

import "./SearchVideo.css";

const SearchVideo = () => {
    useEffect( () => {
        window.scroll({
          behavior:"smooth",
          top:0
        })
    },[])

    const {videos} = useVideos();
    const [input,setInput] = useState("");

    const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(input.toLowerCase()) || input === "" )

    const logicalArrayForGrid = filteredVideos.reduce( (acc,video,index) => {
        const chunkIndex = Math.floor(index/14);
        if( !acc[chunkIndex] ){
            acc[chunkIndex] = [];
        }
        acc[chunkIndex] = [...acc[chunkIndex],video]
        return acc;
    },[]);

    return (
        <div className="search__video__container">
           <h1 className="search__heading">Search</h1> 
           <div className="search__bar">
               <i className="fa fa-search"></i>
               <input type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search songs.." className="search__bar__input"/>
           </div>
           {
               logicalArrayForGrid.map( (videos,i) => {
                    let gridCount = 0;
                    return(<div key={i} className="videos__section">
                        {
                            videos.map( video => (
                               <Link key={video._id} className={`video video${gridCount++}`} to={`/watch/${video._id}`}><ReactPlayer playIcon={<i></i>}  width="100%" height="100%" light={true} url={video.url}/></Link>
                            ))
                        }
                    </div>)
                   })
           }
        </div>
    );
};

export default SearchVideo;
