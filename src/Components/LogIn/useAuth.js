import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseAuthConfig';


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext()
export const AuthContextProvider = (props) => {
    const auth = AuthProvider()
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext);
}


const AuthProvider = () => {
    const [user, setUser] = useState({
        hasAnAccount: false,
        name: '',
        email: '',
        password: '',
        confirmedPassword: ''
    })
    console.log(user);
    const handleSwitchToLogin = event => {
        setUser({ ...user, hasAnAccount: true })
    }
    const handleSwitchToSignIn = event => {
        setUser({ ...user, hasAnAccount: false })
    }
    const handleChange = (event) => {

        const newUser = {
            ...user,
            [event.target.name]: event.target.value
        }
        setUser(newUser);

    }
    const createAccount = (event) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        event.preventDefault();

    }



    return {
        user,
        handleSwitchToLogin,
        handleSwitchToSignIn,
        handleChange,
        createAccount
    }
}
export default AuthProvider;
