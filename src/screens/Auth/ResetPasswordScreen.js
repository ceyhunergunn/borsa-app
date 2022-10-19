import React, { useContext } from "react";
import {View, Text,SafeAreaView,TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import { Icon } from "react-native-vector-icons/FontAwesome5";
import {Formik} from 'formik';
import * as yup from "yup";



const ResetPasswordScreen = ({navigation}) => {
    
    const {resetPassword}=useContext(AuthContext)

    const resetValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required('Lütfen E-Mail Giriniz!')
            .email('Geçerli Bir E-Mail Giriniz!')
    });

    return(
        <SafeAreaView style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'white'
        }}>
            <View style={{
                borderColor:'black',
                borderWidth:2,

                width:'80%',
                alignItems:'center', 
                padding:10,
                backgroundColor:'#c6e5d9',
                borderRadius:30
            }}>
                <Text style={{fontSize:20,color:'#000',fontWeight:'700'}}>Şifre Sıfırla</Text>
                
                <Formik
                    validationSchema={resetValidationSchema}
                    initialValues={{email:''}}
                    onSubmit={(values)=> resetPassword(values.email)}>
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
                            <Text style={{color:'red', fontSize:13}}>
                                {errors.email}
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
                            <Text style={{fontSize:18,fontWeight:'600',color:'black'}}>E-Mail Gönder</Text>
                        </TouchableOpacity>
                        </>
                        )}
                        
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default ResetPasswordScreen;