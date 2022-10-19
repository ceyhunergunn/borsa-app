import React, {useState, useEffect, createContext} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const usersColl = firestore().collection("users")
    const [user, setUser] = useState(null);
    return(
        <AuthContext.Provider
            value={{
                user, 
                setUser,
                login:async(email,password)=>{
                    try {
                        await auth().signInWithEmailAndPassword(email,password)
                        .then(async result=>{
                            if(!result.user.emailVerified){
                                result.user.sendEmailVerification();
                                alert("Lütfen Mailinizi Onaylayınız!")
                            }
                        });
                    } catch (error) {
                        console.log(error)
                    }
                },
                
                signup: async(email,password,name,phone,navigation)=>{
                    try {
                        await auth().createUserWithEmailAndPassword(email,password)
                        .then(async result => {
                            var uid = result.user.uid;
                            result.user.sendEmailVerification();
                            result.user.updateProfile({
                                displayName: name,
                            })
                            await usersColl.doc(uid).set({
                                CountryCode:'',
                                CreatedDate: new Date(),
                                Email: email,
                                Password: password,
                                ImageURL:'',
                                LastName: '',
                                Name: name,
                                Likes:0,
                                View:0,
                                Phone:phone,
                                Username:'',
                                TRY:'',
                            });

                            alert("Üyelik Oluşturulu! Lütfen Mailinizi Onaylayınız!");
                            navigation.navigate('LoginScreen');
                        });
                       
                    } catch (error) {
                        console.log(error)
                    }
                },
                resetPassword: async email =>{
                    try {
                        await auth().sendPasswordResetEmail(email);
                        alert("Şifre Sıfırlama Linki Gönderildi!")
                    } catch (error) {
                        console.log(error)
                    }
                },
                signout: async () =>{
                    try {
                        await auth().signOut()
                    } catch (error) {
                        console.log(error)
                    }
                }
            }}>
            {children}
        </AuthContext.Provider>
    )
};
