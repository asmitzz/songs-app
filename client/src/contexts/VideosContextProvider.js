import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import {useAuth} from "./AuthContext";
export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {
    const {uid} = useAuth();

    useEffect(() => {
        (async function(){
          try {
          const {data} = await axios.get(`https://hotmusic20-21.herokuapp.com/api/videosbycategory`);
          const videosByCategory = data?.videosByCategory;
          dispatch({type:"INITIAL_STATE",payload:{videosByCategory}})
          } catch (error) {
            console.log(error);
          }
        })()
    },[uid])
    
    useEffect(() => {
        (async function(){
          try {
          const {data} = await axios.get(`https://hotmusic20-21.herokuapp.com/api/users/${uid}`);
          const user = data?.user;

          dispatch({type:"INITIAL_STATE",payload:{userDetails:user,playlists:user.playlists,watchLater:user.watchLater,history:user.history}})
          } catch (error) {
             console.log(error);
          }
        })()
    },[uid])

    const VideosReducer = (state,action) => {
        switch (action.type) {
            case "INITIAL_STATE":
            return {...state,...action.payload}
            case "ADD_TO_WATCH_LATER":
            return {...state,watchLater:[action.payload,...state.watchLater]}    
            case "REMOVE_FROM_WATCH_LATER":
            return {...state,watchLater:state.watchLater.filter( v => v._id !== action.payload )}
            case "CREATE_PLAYLIST":
            return {...state,playlists:action.payload};
            case "REMOVE_PLAYLIST":
            return {...state,playlists:action.payload};
            case "ADD_TO_PLAYLIST":
            return {...state,playlists:action.payload}
            case "REMOVE_FROM_PLAYLIST":
            return {...state,playlists:action.payload}
            case "ADD_TO_HISTORY":
            return {...state, history:[action.payload,...state.history]}
            case "REMOVE_FROM_HISTORY":
            return {...state, history:state.history.filter( v => v._id !== action.payload)}
            default:
            return state;
        }
    }

    const [{videosByCategory,playlists,watchLater,history,userDetails}, dispatch] = useReducer(VideosReducer, {videosByCategory:[],playlists:[],watchLater:[],history:[],userDetails:{}});
   
     const handleWatchLater = async(video) => {
        try {
            await axios.post(`https://hotmusic20-21.herokuapp.com/api/watchlater/${uid}/${video._id}`);

            if( watchLater.find( v => v._id === video._id) ){
                return dispatch({type:"REMOVE_FROM_WATCH_LATER",payload:video._id});
            };
            dispatch({type:"ADD_TO_WATCH_LATER",payload:video});
        } catch (error) {
            console.log(error);
        }
    }

    const createPlaylist = async(name) => {
        try {
            const {status,data} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}`,{name});
            if(status === 200){
                dispatch({type:"CREATE_PLAYLIST",payload:data.playlists});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removePlaylist = async(playlistID) => {
        try {
            const {status,data} = await axios.delete(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}/${playlistID}`);
            if(status === 200){
                dispatch({type:"REMOVE_PLAYLIST",payload:data.playlists});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addVideoToPlaylist = async(videoID,playlistID,playlistIndex) => {
        try {
            if( playlists[playlistIndex].videos.find( v => v._id === videoID) ){
                const {status,data} = await axios.delete(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}/${playlistID}/${videoID}`);
                if(status === 200){
                     dispatch({type:"REMOVE_FROM_PLAYLIST",payload:data.playlists});
                }
              return;
            };

            const {status,data} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}/${playlistID}/${videoID}`);
            if(status === 200){
                dispatch({type:"ADD_TO_PLAYLIST",payload:data.playlists});
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    const removeVideoFromPlaylist = async(videoID,playlistID) => {
        const {status,data} = await axios.delete(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}/${playlistID}/${videoID}`);
         if(status === 200){
            return dispatch({type:"REMOVE_FROM_PLAYLIST",payload:data.playlists});
         }
    }

    const addToHistory = async(video) => {
        try {
            await axios.post(`https://hotmusic20-21.herokuapp.com/api/history/${uid}/${video._id}`)
            if( history.find( v => v._id === video._id) ){
                dispatch({type:"REMOVE_FROM_HISTORY",payload:video._id});
             }
             dispatch({type:"ADD_TO_HISTORY",payload:video});
        } catch (error) {
            console.log(error);
        }
        
    }

    const removeFromHistory = async(videoID) => {
        try {
           await axios.delete(`https://hotmusic20-21.herokuapp.com/api/history/${uid}/${videoID}`)
           dispatch({type:"REMOVE_FROM_HISTORY",payload:videoID});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <VideosContext.Provider value={{userDetails,createPlaylist,removePlaylist,videosByCategory,watchLater,history,playlists,handleWatchLater,addToHistory,removeFromHistory,addVideoToPlaylist,removeVideoFromPlaylist,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


