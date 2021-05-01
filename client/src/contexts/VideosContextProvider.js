import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import {useAuth} from "./AuthContext";
export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {
    const {uid} = useAuth();
    
    useEffect(() => {
        (async function(){
          try {
          const {data} = await axios.get(`http://localhost:5000/api/users/${uid}`);
          const user = data?.user;

          dispatch({type:"INITIAL_STATE",payload:{userDetails:user,playlists:user.playlists,watchLater:user.watchLater,history:user.history}})
          } catch (error) {
             console.log(error);
          }
        })()
    },[uid])

    useEffect(() => {
        (async function(){
          try {
          const {data}= await axios.get(`http://localhost:5000/api/allvideos`);
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
          const {data} = await axios.get(`http://localhost:5000/api/videosbycategory`);
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
            return {...state,watchLater:state.watchLater.filter( v => v._id !== action.payload )}
            case "CREATE_PLAYLIST":
            return {...state,playlists:[...state.playlists,action.payload]};
            case "REMOVE_PLAYLIST":
            return {...state,playlists:state.playlists.filter( list => list._id !== action.payload )};
            case "ADD_TO_PLAYLIST":
            return {...state,playlists:state.playlists.map( list => list._id === action.payload.playlistID ? {...list,videos:[...list.videos,action.payload.video]} : list )}
            case "REMOVE_FROM_PLAYLIST":
            return {...state,playlists:state.playlists.map( list => list._id === action.payload.playlistID ? {...list,videos:list.videos.filter( v => v._id !== action.payload.videoID)} : list )}
            case "ADD_TO_HISTORY":
            return {...state, history:[action.payload,...state.history]}
            case "REMOVE_FROM_HISTORY":
            return {...state, history:state.history.filter( v => v._id !== action.payload)}
            default:
            return state;
        }
    }

    const [{allVideos,videosByCategory,playlists,watchLater,history,userDetails}, dispatch] = useReducer(VideosReducer, {allVideos:[],videosByCategory:[],playlists:[],watchLater:[],history:[],userDetails:{}});

    const handleWatchLater = async(video) => {
        try {
            await axios.post(`http://localhost:5000/api/users/watchlater/${uid}`,{videoID:video._id});

            if( watchLater.find( v => v._id === video._id) ){
                return dispatch({type:"REMOVE_FROM_WATCH_LATER",payload:video._id});
            };
            dispatch({type:"ADD_TO_WATCH_LATER",payload:video});
        } catch (error) {
            console.log(error);
        }
    }

    const addVideoToPlaylist = (video,playlistID,playlistIndex) => {
        if( playlists[playlistIndex].videos.find( v => v._id === video._id) ){
          return dispatch({type:"REMOVE_FROM_PLAYLIST",payload:{videoID:video._id,playlistID}});
        };
        dispatch({type:"ADD_TO_PLAYLIST",payload:{video,playlistID}});
    }

    const removeVideoFromPlaylist = (videoID,playlistID) => {
        dispatch({type:"REMOVE_FROM_PLAYLIST",payload:{videoID,playlistID}});
    }

    const addToHistory = async(video) => {
        try {
            await axios.post(`http://localhost:5000/api/users/history/${uid}`,{videoID:video._id})
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
           await axios.delete(`http://localhost:5000/api/users/history/${uid}/${videoID}`)
           dispatch({type:"REMOVE_FROM_HISTORY",payload:videoID});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <VideosContext.Provider value={{userDetails,allVideos,videosByCategory,watchLater,history,playlists,handleWatchLater,addToHistory,removeFromHistory,addVideoToPlaylist,removeVideoFromPlaylist,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


