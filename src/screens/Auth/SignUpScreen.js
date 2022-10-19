import React, { useContext, useState } from "react";
import {View, Text,SafeAreaView,TextInput, Button,TouchableOpacity} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import Icon from "react-native-vector-icons/FontAwesome";
import {Formik} from 'formik';
import * as yup from "yup";



const SignUpScreen = ({navigation}) => {

    const [isSecurePass,setIsSecurePass]= useState(true);
    const [isSecurePassConfirm,setIsSecurePassConfirm ]= useState(true);

    const {signup}=useContext(AuthContext)

    const signupValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Lütfen İsminizi Giriniz'),
        phone: yup
            .string()
            .required('Lütfen Numaranızı Giriniz'),
        email: yup
            .string()
            .required('Lütfen E-Mail Giriniz!')
            .email('Geçerli Bir E-Mail Giriniz!'),
        password: yup
            .string()
            .required('Lütfen Şifre Giriniz')
            .min(6,({min})=>'Şifreniz En Az '+min+' Karakter Olmalıdır!')
            .matches(/\w*[a-z]\w*/,'En Az Bir Küçük Harf Kullanmalısınız!')
            .matches(/\w*[A-Z]\w*/,'En Az Bir Büyük Harf Kullanmalısınız!')
            .matches(/\d/,'En Az Bir Rakam Kullanmalısınız!')
            .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/,'En Az Bir Adet Özel Karakter Kullanmalısınız!'),
        passwordConfirm: yup
            .string()
            .required('Lütfen Şirenizi Tekrar Giriniz!')
            .oneOf([yup.ref('password')], 'Lütfen Aynı Şifreyi Giriniz!'),
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
                backgroundColor:'#c6e5d9',
                borderRadius:30,
                borderWidth:2
            }}>
                <Text style={{fontSize:20,color:'#000',fontWeight:'700'}}>Üye Kayıt</Text>
                
                <Formik
                    validationSchema={signupValidationSchema}
                    initialValues={{email:'',password:'',name:'',phone:'',passwordConfirm:''}}
                    onSubmit={(values)=> signup(values.email,values.password,values.name,values.phone, navigation)}>
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
                        name='name' 
                        placeholder="İsim"
                        placeholderTextColor="gray"
                        style={{
                            color:'black',
                            backgroundColor:'white',
                            bordercColor:'black',
                            borderWidth:2,
                            height:40,
                            width:'90%',
                            margin:10,
                            padding:10,
                            borderRadius:10,
                            fontSize:16
                        }}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        keyboardType="email-address"
                        />
                        {errors.name && (
                            <Text style={{color:'red', fontSize:13}}>
                                {errors.name}
                            </Text>
                        )}  

                    
                    <TextInput 
                        name='phone' 
                        placeholder="Numara"
                        placeholderTextColor="gray"
                        style={{
                            color:'black',
                            height:40,
                            width:'90%',
                            margin:10,
                            padding:10,
                            backgroundColor:'white',
                            bordercColor:'black',
                            borderWidth:2,
                            borderRadius:10,
                            fontSize:16
                        }}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        keyboardType="email-address"
                        />
                        {errors.phone && (
                            <Text style={{color:'red', fontSize:13}}>
                                {errors.phone}
                            </Text>
                        )}                      

                    <TextInput 
                        name='email' 
                        placeholder="E-Mail"
                        placeholderTextColor="gray"
                        style={{
                            color:'black',
                            height:40,
                            width:'90%',
                            margin:10,
                            padding:10,
                            backgroundColor:'white',
                            bordercColor:'black',
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
                            <Text style={{color:'red', fontSize:13}}>
                                {errors.email}
                            </Text>
                        )}
                    <View 
                        style={{
                            backgroundColor:'white',
                            bordercColor:'black',
                            borderWidth:2,
                            borderRadius:10,
                            width:'90%',
                            margin:10,
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent:'space-between',
                            
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
                            secureTextEntry= {isSecurePass}
                            keyboardType="default"
                            />

                        <TouchableOpacity
                            onPress={()=> setIsSecurePass(!isSecurePass)}>
                            <Icon style={{marginRight:12}}size={24} name={isSecurePass? 'eye-slash': 'eye'} color="black"/>
                        </TouchableOpacity>     
                    </View>
                            {errors.password && (
                                <Text style={{color:'red', fontSize:13}}>
                                    {errors.password}
                                </Text>
                            )}
                    
                    <View 
                        style={{
                            backgroundColor:'white',
                            bordercColor:'black',
                            borderWidth:2,
                            borderRadius:10,
                            width:'90%',
                            margin:10,
                            flexDirection:'row',
                            alignItems: 'center',
                            justifyContent:'space-between',
                            
                    }}>
                        <TextInput 
                            name='passwordConfirm' 
                            placeholder="Şifre Tekrarı"
                            placeholderTextColor="gray"
                            style={{
                                color:'black',
                                height:40,                                
                                borderWidth:0,
                                fontSize:16
                            }}
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm}
                            secureTextEntry = {isSecurePassConfirm}
                            keyboardType="default"
                            />
                    
                        <TouchableOpacity
                            onPress={()=> setIsSecurePassConfirm(!isSecurePassConfirm)}>
                            <Icon style={{marginRight:12}}size={24} name={isSecurePassConfirm? 'eye-slash': 'eye'} color="black"/>
                        </TouchableOpacity>     
                    </View>
                            {errors.passwordConfirm && (
                                <Text style={{color:'red', fontSize:13}}>
                                    {errors.passwordConfirm}
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
                        <Text style={{fontSize:18,fontWeight:'600',color:'black'}}>Kayıt Ol</Text>
                    </TouchableOpacity>
                        </>
                        )}
                        
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default SignUpScreen;