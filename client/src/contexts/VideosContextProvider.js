import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import {useAuth} from "./AuthContext";
export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {
    const {uid,isUserloggedIn} = useAuth();
    const [errorToast,setErrorToast] = useState(false);

    useEffect(() => {
        (async function(){
          try {
          const {data} = await axios.get(`https://hotmusic20-21.herokuapp.com/api/videos`);
          const videos = data?.videos;
          dispatch({type:"INITIAL_STATE",payload:{videos}})
          } catch (error) {
            setErrorToast(true)
          }
        })()
    },[])
    
    useEffect(() => {
        (async function(){
          try {
          if(!isUserloggedIn) return;
          const {data} = await axios.get(`https://hotmusic20-21.herokuapp.com/api/users/${uid}`);
          const user = data?.user;

          dispatch({type:"INITIAL_STATE",payload:{userDetails:user,playlists:user.playlists,watchLater:user.watchLater,history:user.history}})
          } catch (error) {
             setErrorToast(true)
          }
        })()
    },[isUserloggedIn,uid])

    const VideosReducer = (state,action) => {
        switch (action.type) {
            case "INITIAL_STATE":
            return {...state,...action.payload}
            case "UPDATE_WATCH_LATER":
            return {...state,watchLater:action.payload}    
            case "CREATE_PLAYLIST":
            return {...state,playlists:action.payload};
            case "REMOVE_PLAYLIST":
            return {...state,playlists:action.payload};
            case "ADD_TO_PLAYLIST":
            return {...state,playlists:action.payload}
            case "REMOVE_FROM_PLAYLIST":
            return {...state,playlists:action.payload}
            case "UPDATE_HISTORY":
            return {...state, history:action.payload}
            default:
            return state;
        }
    }

    const [{videos,playlists,watchLater,history,userDetails}, dispatch] = useReducer(VideosReducer, {videos:[],playlists:[],watchLater:[],history:[],userDetails:{}});
   
    const videosByCategory = videos.reduce((acc,i) => {
        if(acc.find(cat => cat._id === i.category._id)){
          return acc.map(cat => {
             if(cat._id === i.category._id){
               return {...cat,videos:[...cat.videos,i]}
             }
              return cat
          })
        }
        return [...acc,{_id:i.category._id,name:i.category.name,videos:[i]}]
     },[])

     const handleWatchLater = async(video,toast) => {
        try {
           const {data,status} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/watchlater/${uid}/${video._id}`);
           if(status === 200){
              dispatch({ type:"UPDATE_WATCH_LATER",payload:data.watchLater })
           }
        } catch (error) {
            toast(true);
            setTimeout( () => {
                toast(false);
            },2000)
        }
    }

    const createPlaylist = async(name,toast) => {
        try {
            const {status,data} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}`,{name});
            if(status === 200){
                dispatch({type:"CREATE_PLAYLIST",payload:data.playlists});
            }
        } catch (error) {
            toast(true);
            setTimeout( () => {
                toast(false);
            },2000)
        }
    }

    const removePlaylist = async(playlistID,toast) => {
        try {
            const {status,data} = await axios.delete(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}/${playlistID}`);
            if(status === 200){
                dispatch({type:"REMOVE_PLAYLIST",payload:data.playlists});
            }
        } catch (error) {
            toast(true);
            setTimeout( () => {
                toast(false);
            },2000)
        }
    }

    const addVideoToPlaylist = async(videoID,playlistID,playlistIndex,toast) => {
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
            toast(true);
            setTimeout( () => {
                toast(false);
            },2000)
        }
        
    }

    const removeVideoFromPlaylist = async(videoID,playlistID,toast) => {
        const {status,data} = await axios.delete(`https://hotmusic20-21.herokuapp.com/api/playlists/${uid}/${playlistID}/${videoID}`);
         if(status === 200){
            return dispatch({type:"REMOVE_FROM_PLAYLIST",payload:data.playlists});
         }
    }

    const addToHistory = async(video,toast) => {
        try {
            const {data,status} = await axios.post(`https://hotmusic20-21.herokuapp.com/api/history/${uid}/${video._id}`);
            if(status === 200){
                dispatch({type:"UPDATE_HISTORY",payload:data.history});
            }
        } catch (error) {
            toast(true);
            setTimeout( () => {
                toast(false);
            },2000)
        }
        
    }

    const removeFromHistory = async(videoID,toast) => {
        try {
           const {data,status} = await axios.delete(`https://hotmusic20-21.herokuapp.com/api/history/${uid}/${videoID}`)
           if(status === 200){
            dispatch({type:"UPDATE_HISTORY",payload:data.history});
           }
        } catch (error) {
            toast(true);
            setTimeout( () => {
                toast(false);
            },2000)
        }
    }

    return (
        <VideosContext.Provider value={{errorToast,setErrorToast,userDetails,createPlaylist,removePlaylist,videosByCategory,videos,watchLater,history,playlists,handleWatchLater,addToHistory,removeFromHistory,addVideoToPlaylist,removeVideoFromPlaylist,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


