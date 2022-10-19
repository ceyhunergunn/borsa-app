import React, { useState, useEffect }  from "react";
import {View, Text, ScrollView,SafeAreaView, TouchableOpacity} from 'react-native';
import Loading from '../../utils/Loading'
const VeriScreen = () => {
    
    const [data, setData] = useState([]);
    const [isLoding, setIsLoading] = useState(false);

    const getData = async () => {
        try {
            setIsLoading(true);
            let response = await fetch('https://www.paribu.com/ticker')
            let responseData = await response.json();
            setData(responseData);
            setIsLoading(false);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=>{
        getData();
        return null;
    },[])


    return(
        <SafeAreaView style={{flex:1}}>
            {isLoding?(<Loading/>):(
            <View 
            style={{
                flex:1,
                backgroundColor:'#c6e5d9',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text style={{fontSize:26,color:'black',margin:10,fontWeight:'700'}}>Piyasalar</Text>
                <ScrollView style={{
                    flex:1,
                    width:'100%'
                }}>
                {Object.keys(data).map((key,index)=>(
                    <TouchableOpacity
                    key={index.toString}
                    style={{
                        backgroundColor:'white',
                        flexDirection:'row',
                        width:'95%',
                        height:60,
                        borderWidth:2,
                        borderTopLeftRadius:0,
                        borderBottomRightRadius:0,
                        borderRadius:20,
                        margin:10,
                        padding:10,
                        justifyContent:'space-between',
                        alignItems:'center',
                    }}>

                        <View style={{flex:1}}>
                            <Text style={{textAlign:'left',fontSize:18,color:data[key].percentChange>0?'green':'red'}}>{key}</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={{textAlign:'center',fontSize:18,color:data[key].percentChange>0?'green':'red'}}>{data[key].last}</Text>
                        </View>

                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',fontSize:18,color:data[key].percentChange>0?'green':'red'}}>%{data[key].percentChange}</Text>
                        </View>

                    </TouchableOpacity>
                ))}

                </ScrollView>

        </View>)}
            
        </SafeAreaView>
    )
}

export default VeriScreen;