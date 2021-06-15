import React,{ createContext,useContext, useReducer } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const userReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
            return {login:true,data:action.payload}
            case "SIGNOUT":
            return {login : false, data : null}
            default:
            return state;
        }
    }
    
    const [state,dispatch] = useReducer(userReducer,JSON.parse(localStorage?.getItem('authToken')) || { login:false , data:null })

    function signout(spinner){
        spinner(true)
        return new Promise( (resolve) => {
            setTimeout( () => {
                localStorage?.removeItem('authToken');
                dispatch({type:"SIGNOUT"});
                resolve({ success: true,status:200})
               spinner(false)
            },1000);
        })
    }
  
    return (
        <AuthContext.Provider value={{isUserloggedIn:state.login,uid:state?.data?.uid,userDetails:state.data,dispatch,signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);