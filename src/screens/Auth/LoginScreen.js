import React, { useContext,useState } from "react";
import {View, Text,SafeAreaView,TextInput, Button, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import Icon from "react-native-vector-icons/FontAwesome";
import {Formik} from 'formik';
import * as yup from "yup";



const LoginScreen = ({navigation}) => {
    
    const [isSecurePass,setIsSecurePass]= useState(true);
    const [isSecurePassConfirm,setIsSecurePassConfirm ]= useState(true);
    const {login}=useContext(AuthContext)

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Lütfen E-Mail Giriniz!')
            .email('Geçerli Bir E-Mail Giriniz!'),
        password: yup
            .string()
            .required('Lütfen Şifre Giriniz')
            .min(6,({min})=>'Şifreniz En Az '+min+' Karakter Olmalıdır!')
    });

    return(
        <SafeAreaView style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'white'
        }}>
            <View style={{
                width:'80%',
                alignItems:'center', 
                padding:10,
                borderWidth:2,
                borderColor:'black',
                backgroundColor:'#c6e5d9',
                borderRadius:30
            }}>
                <Text style={{fontSize:20,color:'#000',fontWeight:'700'}}>Üye Girişi</Text>
                
                <Formik
                    validationSchema={loginValidationSchema}
                    initialValues={{email:'',password:''}}
                    onSubmit={(values)=> login(values.email,values.password)}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        isValid
                    })=>(
                        <>
                    <TextInput 
                        name='email' 
                        placeholder="E-Mail"
                        placeholderTextColor="gray"
                        style={{
                            color:'black',
                            backgroundColor:'white',
                            height:40,
                            width:'90%',
                            margin:10,
                            padding:10,
                            borderColor:'black',
                            borderWidth:2,
                            borderRadius:10,
                            fontSize:16
                        }}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        />
                        {errors.email && (
                            <Text style={{color:'red', fontSize:14,fontWeight:'500'}}>
                                {errors.email}
                            </Text>
                        )}
                    
                    <View 
                        style={{
                            borderColor:'black',
                            borderWidth:2,
                            borderRadius:10,
                            width:'90%',
                            margin:10,
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent:'space-between',
                            backgroundColor:'white'
                            
                        }}>
                        <TextInput 
                            name='password' 
                            placeholder="Şifre"
                            placeholderTextColor="gray"
                            style={{
                                color:'black',
                                height:40,
                                borderWidth:0,
                                fontSize:16
                            }}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry = {isSecurePass}
                            keyboardType="default"
                        />

                        <TouchableOpacity
                            onPress={()=> setIsSecurePass(!isSecurePass)}>
                            <Icon style={{marginRight:12}}size={24} name={isSecurePass? 'eye-slash': 'eye'} color="black"/>
                        </TouchableOpacity>         
                    </View>
                            {errors.password && (
                                <Text style={{color:'red', fontSize:14,fontWeight:'500'}}>
                                    {errors.password}
                                </Text>
                            )}

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={!isValid}
                        style={{
                            backgroundColor:'white',
                            width:200,
                            height:40,
                            margin:10,
                            borderRadius:12,
                            borderWidth:2,
                            borderColor:'black',
                            justifyContent:'center',
                            alignItems:'center',
                            borderBottomRightRadius:30,
                            borderBottomLeftRadius:30,}}>
                        <Text style={{fontSize:18,fontWeight:'600',color:'black'}}>Giriş</Text>
                    </TouchableOpacity>
                        </>
                        )}
                        
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;