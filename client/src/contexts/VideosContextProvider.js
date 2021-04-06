import React, { createContext, useContext, useReducer } from 'react';
import { VideosData } from '../VideosData';

export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {

    const VideosReducer = (state,action) => {
        switch (action.type) {
            case "ADD_TO_WATCH_LATER":
            return {...state,watchLater:[...state.watchLater,action.payload]}    
            case "REMOVE_FROM_WATCH_LATER":
            return {...state,watchLater:state.watchLater.filter( v => v.id !== action.payload )}
            case "CREATE_PLAYLIST":
            return {...state,playlist:[...state.playlist,action.payload]};
            case "REMOVE_PLAYLIST":
            return {...state,playlist:state.playlist.filter( list => list.id !== action.payload )};
            case "CURRENT_PLAYLIST":
            return action.payload !== "none" ? {...state,selectedPlaylist:state.playlist.find( list => list.id === action.payload) } : {...state,selectedPlaylist:null};
            case "ADD_TO_PLAYLIST":
            return {...state,playlist:state.playlist.map( list => list.id === action.playlist ? {...list,playlist:[...list.playlist,action.payload]} : list )};
            case "REMOVE_FROM_PLAYLIST":
            return {...state,playlist:state.playlist.map( list => list.id === action.playlist ? {...list,playlist:list.playlist.filter( v => v.id !== action.payload )} : list) };
            case "ADD_TO_HISTORY":
            return {...state, history:[action.payload,...state.history]}
            default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(VideosReducer, {...VideosData,playlist:[],selectedPlaylist:null });

    return (
        <VideosContext.Provider value={{state,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


