import React, { createContext, useContext, useReducer } from 'react';

export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {

    const VideosReducer = (state,action) => {
        switch (action.type) {
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

    const [{playlist,watchLater,history}, dispatch] = useReducer(VideosReducer, {playlist:[],watchLater:[],history:[],selectedPlaylist:null });

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
        <VideosContext.Provider value={{watchLater,history,userPlaylists:playlist,handleWatchLater,addToHistory,removeFromHistory,addVideoToPlaylist,removeVideoFromPlaylist,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


