import React, { createContext, useContext, useReducer } from 'react';
import { VideosData } from '../VideosData';

export const VideosContext = createContext();

export const VideosContextProvider = ({children}) => {

    const VideosReducer = (state,action) => {
        return state;
    }

    const [state, dispatch] = useReducer(VideosReducer, { allVideos:VideosData,watchLater:[],playlist:[],history:[] });
    
    return (
        <VideosContext.Provider value={{state,dispatch}}>
           {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    return useContext(VideosContext);
}


