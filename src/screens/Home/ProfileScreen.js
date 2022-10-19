import React, { useContext ,useState,useEffect}  from "react";
import {View, Text,TouchableOpacity,SafeAreaView, ImageBackground,TextInput,Button, Modal, ActivityIndicator} from 'react-native';
import { AuthContext } from "../../navigation/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import Loading from '../../utils/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker'
import storage from "@react-native-firebase/storage";

const ProfileScreen = () => {

    const {signout,user}=useContext(AuthContext)
    const [currentUser,setCurrentUser] = useState({});
    const [isLoding, setIsLoading] = useState(false);

    const [isUploding, setIsUploading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [downloadURL, setDownloadURL] = useState();
    const [uploadTask, setUploadTask] = useState();
    const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});

    const [currentUserName,setCurrentUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const usersColl = firestore().collection("users");

    const onTakePhoto = () => {
        launchCamera({mediaType:'photo', saveToPhotos: true},
        onMediaSelect)
    };

    const onMediaSelect = async media => {
        if(!media.didCancel){
            setIsUploading(true);
            const ref = storage().ref('uploads/users/'+media.assets[0].fileName,);
            const task = ref.putFile(media.assets[0].uri);
            setUploadTask(task);
            task.on('state_changed',taskSnapshot=>{
                setUploadTaskSnapshot(taskSnapshot);
            });

            task.then(async()=>{
                const downloadURL = await ref.getDownloadURL();
                setDownloadURL(downloadURL);
                await usersColl.doc(user.uid).update({
                    ImageURL : downloadURL,
                });
                setIsUploading(false);  
                setUploadTaskSnapshot({});
                setShowModal(false);
                getCurrentUser();
            });
        }
    }
    const onImagePressSelect = () => {
        launchImageLibrary({mediaType:'photo', saveToPhotos: true},
        onMediaSelect)
    }

    const getCurrentUser = async () => {
        usersColl
            .doc(user.uid)
            .get()
            .then((result) =>{
                setCurrentUser(result.data());
                setCurrentUserName(result.data().Name);
            });
    };

    const updateCurrentUser = async () => {
        setIsLoading(true)
        await usersColl.doc(user.uid).update({
            Name : currentUserName,
        });
        await user.updateProfile({
            displayName: currentUserName,
        })
        getCurrentUser();
        setIsLoading(false)
    };

        useEffect(()=>{
            setIsLoading(true)
            getCurrentUser();
            
            setIsLoading(false);
        },[]);

    return(
        <SafeAreaView style={{
            flex:1,
            alignItems:'center',
            backgroundColor:'#c6e5d9'

        }}>
            {isLoding ?
            (<Loading/>)
            :(
            <View style={{
                flex:1, 
                justifyContent:'center',
                alignItems:'center'}}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    
                    onRequestClose={()=>{
                    }}>
                        
                    <View style={{
                        borderWidth:2,
                        borderColor:'black',
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'white',
                        padding:10,
                        margin:20,
                        borderRadius:25

                        }}>
                    
                    <TouchableOpacity
                        onPress={onTakePhoto}
                        style={{
                            backgroundColor:'#c6e5d9',
                            marginBottom:20,
                            justifyContent:'center',
                            alignItems:'center',
                            height:50,
                            borderRadius:30,
                            borderWidth:2,
                            borderColor:'black',
                            width:'80%'}}>
                        <Text style={{color:'black',fontSize:18,fontWeight:'600'}}>
                            Fotoğraf Çek
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={onImagePressSelect}
                        style={{
                            backgroundColor:'#c6e5d9',
                            marginBottom:20,
                            justifyContent:'center',
                            alignItems:'center',
                            height:50,
                            borderRadius:30,
                            borderWidth:2,
                            borderColor:'black',
                            width:'80%'}}>
                        <Text style={{color:'black',fontSize:18,fontWeight:'600'}}>
                            Kütüphaneden Seç
                        </Text>
                        
                    </TouchableOpacity>
                    
                    {isUploding&&(
                        <View style={{
                            alignItems:'center',
                            justifyContent:'center',
                            marginTop:50,
                            marginBottom:10
                        }}>
                            <ActivityIndicator size={50} color="black"/>
                            <Text style={{color:'black', fontSize:20,margin:20}}>Yükleniyor..</Text>
                            <Text style={{color:'black', fontSize:20,margin:20}}>
                                %{((uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes)* 100).toFixed(2)}/100
                            </Text>
                        </View>
                    )}
                    <TouchableOpacity
                    onPress={()=>setShowModal(!showModal)}
                    style={{
                        backgroundColor:'white',
                        width:200,
                        height:45,
                        borderRadius:12,
                        marginTop:30,
                        borderWidth:2,
                        borderColor:'black',
                        justifyContent:'center',
                        alignItems:'center',
                        borderBottomRightRadius:30,
                        borderBottomLeftRadius:30,}}>
                    <Text style={{fontSize:18,fontWeight:'600',color:'black'}}>Kapat</Text>
                    </TouchableOpacity>

                </View>
                </Modal>
                <TouchableOpacity 
                onPress={()=> setShowModal(!showModal)}
                style={{
                    borderWidth:2,
                    width:100,
                    height:100,
                    borderRadius:40,
                    margin:10,
                }}>
                    <ImageBackground source={{
                        uri:currentUser.ImageURL}}
                        imageStyle={{borderRadius:40}}
                    style={{
                        resizeMode:'cover',
                        flex:1}}>
                    </ImageBackground>

                    <View style={{
                        position:'absolute',
                        bottom:0,
                        right:0,
                        width:32,
                        height:32,
                        borderRadius:13,
                        backgroundColor:'white',
                        borderWidth:2,
                        borderColor:'black',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <Icon name="camera" size={16} color='black'/>
                    </View>
                </TouchableOpacity>
                <Text style={{
                    fontSize:24,
                    color:'black'}}>{currentUser.Name}</Text>

                <TextInput 
                        name='name' 
                        placeholder="İsim"
                        style={{
                            backgroundColor:'white',
                            height:45,
                            width:300,
                            margin:10,
                            padding:10,
                            borderColor:'#888',
                            borderWidth:2,
                            borderColor:'black',
                            borderRadius:10,
                            fontSize:16,
                            color:'#7D858A'
                        }}
                        onChangeText={(value)=>setCurrentUserName(value)}
                        value={currentUserName}
                        />
                <TouchableOpacity
                    onPress={updateCurrentUser}
                    style={{
                        backgroundColor:'white',
                        width:200,
                        height:45,
                        margin:20,
                        borderRadius:12,
                        borderWidth:2,
                        borderColor:'black',
                        justifyContent:'center',
                        alignItems:'center',
                        borderBottomRightRadius:30,
                        borderBottomLeftRadius:30,}}>
                    <Text style={{
                        fontSize:18,
                        fontWeight:'600',
                        color:'black'}}>Güncelle</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                    onPress={signout}
                    style={{
                        backgroundColor:'white',
                        width:200,
                        height:45,
                        borderRadius:12,
                        borderWidth:2,
                        borderColor:'black',
                        justifyContent:'center',
                        alignItems:'center',
                        borderBottomRightRadius:30,
                        borderBottomLeftRadius:30,}}>
                    <Text style={{fontSize:18,fontWeight:'600',color:'black'}}>Çıkış</Text>
                </TouchableOpacity> 

            </View>)}
        </SafeAreaView>
    )
}

export default ProfileScreen;