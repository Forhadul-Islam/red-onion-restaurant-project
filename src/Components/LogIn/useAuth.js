import React, { useState, createContext, useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseAuthConfig';
import { Route, Redirect } from 'react-router-dom';
import DeliveryForm from '../DeliveryForm/DeliveryForm';


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext()
export const AuthContextProvider = (props) => {
    const auth = AuthProvider()
    return <AuthContext.Provider value={auth}>{props.children} </AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext);
}

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user.isSignedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}



const AuthProvider = () => {
    const [user, setUser] = useState({
        hasAnAccount: false,
        isSignedIn: false,

    })
    // console.log(user)

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

    //create user 
    const createAccount = (event) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const signedInUser = {
                    ...user,
                    isSignedIn: true
                }
                setUser(signedInUser);

                const currentUser = firebase.auth().currentUser;

                currentUser.updateProfile({
                    displayName: user.name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(function () {
                    // Update successful.
                }).catch(function (error) {
                    // An error happened.
                });

            })
            .catch(err => {
                const error = err.message;
                const createUser = {
                    ...user,
                    isSignedIn: false,
                    error: error
                }

                setUser(createUser);

            })
        event.preventDefault();
        event.target.reset();

    }

    //sign in user
    const signInWithEmailAndPassword = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                // console.log(res)
                const signedInUser = {
                    ...user,
                    isSignedIn: true
                }
                setUser(signedInUser);
            })
            .catch(err => {
                const error = err.message;
                const createUser = {
                    ...user,
                    isSignedIn: false,
                    error: error
                }
                setUser(createUser);
            })
        e.preventDefault();
        e.target.reset();
    }




    //sign in user with google
    const signInWithGoogle = (e) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    isSignedIn: true

                }
                setUser(signedInUser);
            })
            .catch(err => {
                console.log(err)
            })
        // e.preventDefault();
    }


    const signOut = (e) => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    hasAnAccount: false,
                    name: '',
                    email: '',
                    password: '',
                    isSignedIn: false
                }
                setUser(signedOutUser)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // console.log(user)
                const { displayName, photoURL, email } = user;
                const createUser = {
                    name: displayName,
                    photo: photoURL,
                    email: email,
                    isSignedIn: true

                }
                setUser(createUser);
            } else {
                // No user is signed in.
            }
        });
    }, [])

    return {
        user,
        handleSwitchToLogin,
        handleSwitchToSignIn,
        handleChange,
        createAccount,
        signInWithGoogle,
        signInWithEmailAndPassword,
        signOut
    }
}
export default AuthProvider;
