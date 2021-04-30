import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import {useAuth} from "./AuthContext";
export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {
    const {uid} = useAuth();
    
    useEffect(() => {
        (async function(){
          try {
          const {data} = await axios.get(`https://hotmusic20-21.herokuapp.com/api/users/${uid}`);
          const user = data?.user;
          dispatch({type:"INITIAL_STATE",payload:{playlist:user.playlists,watchLater:user.watchLater,history:user.history}})
          } catch (error) {
             console.log(error);
          }
        })()
    },[uid])

    useEffect(() => {
        (async function(){
          try {
          const {data}= await axios.get(`https://hotmusic20-21.herokuapp.com/api/allvideos`);
          const allVideos = data?.allVideos;  
          dispatch({type:"INITIAL_STATE",payload:{allVideos}})
          } catch (error) {
              console.log(error);
          }
        })()
    },[uid])

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


    const VideosReducer = (state,action) => {
        switch (action.type) {
            case "INITIAL_STATE":
            return {...state,...action.payload}
            case "ADD_TO_WATCH_LATER":
            return {...state,watchLater:[action.payload,...state.watchLater]}    
            case "REMOVE_FROM_WATCH_LATER":
            return {...state,watchLater:state.watchLater.filter( v => v.id !== action.payload )}
            case "CREATE_PLAYLIST":
            return {...state,playlist:[...state.playlist,action.payload]};
            case "REMOVE_PLAYLIST":
            return {...state,playlist:state.playlist.filter( list => list.id !== action.payload )};
            case "ADD_TO_PLAYLIST":
            return {...state,playlist:state.playlist.map( list => list.id === action.payload.playlistID ? {...list,videos:[...list.videos,action.payload.video]} : list )}
            case "REMOVE_FROM_PLAYLIST":
            return {...state,playlist:state.playlist.map( list => list.id === action.payload.playlistID ? {...list,videos:list.videos.filter( v => v.id !== action.payload.videoID)} : list )}
            case "ADD_TO_HISTORY":
            return {...state, history:[action.payload,...state.history]}
            case "REMOVE_FROM_HISTORY":
            return {...state, history:state.history.filter( v => v.id !== action.payload)}
            default:
            return state;
        }
    }

    const [{allVideos,videosByCategory,playlist,watchLater,history}, dispatch] = useReducer(VideosReducer, {allVideos:[],videosByCategory:[],playlist:[],watchLater:[],history:[]});

    const handleWatchLater = (video) => {
        if( watchLater.find( v => v.id === video.id) ){
          return dispatch({type:"REMOVE_FROM_WATCH_LATER",payload:video.id});
        };
        dispatch({type:"ADD_TO_WATCH_LATER",payload:video});
    }

    const addVideoToPlaylist = (video,playlistID,playlistIndex) => {
        if( playlist[playlistIndex].videos.find( v => v.id === video.id) ){
          return dispatch({type:"REMOVE_FROM_PLAYLIST",payload:{videoID:video.id,playlistID}});
        };
        dispatch({type:"ADD_TO_PLAYLIST",payload:{video,playlistID}});
    }

    const removeVideoFromPlaylist = (videoID,playlistID) => {
        dispatch({type:"REMOVE_FROM_PLAYLIST",payload:{videoID,playlistID}});
    }

    const addToHistory = (video) => {
        if( history.find( v => v.id === video.id) ){
           dispatch({type:"REMOVE_FROM_HISTORY",payload:video.id});
        }
        dispatch({type:"ADD_TO_HISTORY",payload:video});
    }

    const removeFromHistory = (videoID) => {
        dispatch({type:"REMOVE_FROM_HISTORY",payload:videoID});
    }

    return (
        <VideosContext.Provider value={{allVideos,videosByCategory,watchLater,history,userPlaylists:playlist,handleWatchLater,addToHistory,removeFromHistory,addVideoToPlaylist,removeVideoFromPlaylist,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


