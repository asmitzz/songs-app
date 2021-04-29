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
    
    const [state,dispatch] = useReducer(userReducer,JSON.parse(localStorage?.getItem('AuthToken')) || { login:false , data:null })
 
    function signout(){
        return new Promise( (resolve) => {
            setTimeout( () => {
                localStorage?.removeItem('AuthToken');
                dispatch({type:"SIGNOUT"});
                resolve({ success: true,status:200})
            },2000);
        })
    }
  
    return (
        <AuthContext.Provider value={{isUserloggedIn:state.login,uid:state?.data?.uid,userDetails:state.data,dispatch,signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);