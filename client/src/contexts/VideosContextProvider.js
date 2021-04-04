import React, { createContext, useContext, useReducer } from 'react';
import { VideosData } from '../VideosData';

export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {

    const VideosReducer = (state,action) => {
        switch (action.type) {
            case "ADD_TO_WATCH_LATER":
            return {...state,allVideos:{...state.allVideos,watchLater:[...state.allVideos.watchLater,action.payload]}}    
            case "REMOVE_FROM_WATCH_LATER":
            return {...state,allVideos:{...state.allVideos,watchLater:state.allVideos.watchLater.filter( v => v.id !== action.payload )}}
            case "CREATE_PLAYLIST":
            return {...state,playlist:[...state.playlist,action.payload]};
            case "REMOVE_PLAYLIST":
            return {...state,playlist:state.playlist.filter( list => list.id !== action.payload )};
            case "CHANGE_SELECTED_PLAYLIST":
            return {...state,selectedPlaylist:action.payload};
            case "ADD_TO_PLAYLIST":
            return {...state,playlist:state.playlist.map( list => list.id === state.selectedPlaylist ? {...list,playlist:[...list.playlist,action.payload]} : list) };
            case "REMOVE_FROM_PLAYLIST":
            return {...state,playlist:state.playlist.map( list => list.id === state.selectedPlaylist ? {...list,playlist:list.playlist.filter( v => v.id !== action.payload )} : list) };
            default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(VideosReducer, { allVideos:VideosData,playlist:[],selectedPlaylist:null });

    return (
        <VideosContext.Provider value={{state,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


