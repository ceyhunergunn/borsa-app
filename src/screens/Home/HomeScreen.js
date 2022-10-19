import React, { useContext ,useState,useEffect}  from "react";
import {View, Text,TouchableOpacity,SafeAreaView,FlatList} from 'react-native';
import { AuthContext } from "../../navigation/AuthProvider";
import {deviceHeight, deviceWidth} from '../../utils/dimesions';
import firestore from "@react-native-firebase/firestore";
import Loading from '../../utils/Loading'

const HomeScreen = () => {

    const {signout,user}=useContext(AuthContext)
    const [currentUser,setCurrentUser] = useState({});
    const [userCoinList,setUserCoinList] = useState([]);
    const [coinList,setCoinList] = useState([]);
    const [isLoding, setIsLoading] = useState(false);



    const usersColl = firestore().collection("users");
    const coinsColl = firestore().collection("coins");
    const userCoinsColl = firestore().collection("userCoins");

    const RenderItem = ({item,index}) => {
        return(
        <TouchableOpacity
            key={item.id}
            style={{
                backgroundColor:'white',
                flexDirection:'row',
                width:'95%',
                height:60, 
                borderWidth:2,
                margin:10,
                borderRadius:20,
                padding:10,
                justifyContent:'space-between',
                alignItems:'center',
            }}>

                <View style={{flex:1}}>
                    
                    {
                        coinList.map(x=>{
                            if (x.id == item.coinID) {
                                return(
                                <Text style={{textAlign:'left',fontSize:18,color:'black'}}>{x.name}</Text>
                                )
                            }
                        })
                    }

                </View>

                <View style={{flex:1}}>
                    <Text style={{textAlign:'right',fontSize:18,color:'black'}}>
                        {item.value}
                    </Text>
                </View>
            </TouchableOpacity>)
    }

        useEffect(()=>{
            setIsLoading(true)
            usersColl
            .doc(user.uid)
            .get()
            .then((data) =>{
                setCurrentUser(data.data());
                userCoinsColl.onSnapshot((querySnapshot)=>{
                    let list = [];
                    querySnapshot.forEach(doc=>{
                        const {userID,coinID,value} = doc.data();
                        if (userID== user.uid) {
                            list.push({id:doc.id, userID, coinID, value})
                        }

                        setUserCoinList(list);
                    })
                })

                coinsColl.onSnapshot((querySnapshot)=>{
                    let list = [];
                    querySnapshot.forEach(doc=>{
                        const {name} = doc.data();
                            list.push({id:doc.id, name,})
                        setCoinList(list);
                    })
                })
            });
            setIsLoading(false)
        },[])


    return(
        <SafeAreaView style={{
            flex:1,
            alignItems:'center',
            backgroundColor:'#c6e5d9'

        }}>
            {isLoding ?
            (<Loading/>)
            :(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <View style={{
                    backgroundColor:'white',
                    margin:20,
                    padding:20,
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center',
                    borderWidth:5,
                    width:deviceWidth/2,
                    height:deviceHeight/4,
                    borderRadius:deviceWidth/2
                }}>
                    <Text style={{color:'black', fontWeight:'400',fontSize:24,textAlign:'center'}}>
                        Merhaba  
                    </Text>
                    <Text style={{color:'black', fontWeight:'400',fontSize:24,textAlign:'center'}}>
                        {user.displayName}
                    </Text> 

                    <Text style={{color:'black', fontWeight:'bold',fontSize:24, marginTop:15,textAlign:'center'}}>
                            Bakiye:
                        </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black', fontWeight:'bold',fontSize:24,textAlign:'center'}}>
                        {currentUser.TRY}
                        </Text>
                        <View style={{justifyContent:'flex-end',marginBottom:2,marginLeft:5}}>
                            <Text style={{color:'black',fontSize:15}}>TL</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:3}}>
                    <FlatList
                    data={userCoinList}
                    keyExtractor={(item)=>item.id}
                    renderItem={RenderItem}>
                    </FlatList>
                </View>
            </View>)}
        </SafeAreaView>
    )
}

export default HomeScreen;