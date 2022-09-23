import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React , {useState} from 'react';
import {Picker} from "@react-native-picker/picker";

export default function App() {
  //const [Enable , setEnable]  = useState("courses");

  const [valuutta, setvaluutat] = useState([]);
  
  const getValuutat = async () => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "kG8CdRFUL6O8w2u1vuUo8cV1RgYo2Rb5");

  var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
try{
//await fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=symbols&base=base", requestOptions)
 fetch("https://api.apilayer.com/exchangerates_data/latest?access_key=kG8CdRFUL6O8w2u1vuUo8cV1RgYo2Rb5")
 //"http://api.exchangeratesapi.io/latest?access_key=kG8CdRFUL6O8w2u1vuUo8cV1RgYo2Rb5"
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
     const data = await response.json();
  //  setRepositories(data.meals);
  }catch(error){ 
        Alert.alert('Error', error); 
    };    
  }
  
  return (
   <View style={styles.container}>
        <Picker
          selectedValue={Enable}
          style={{ height: 50, width: 250 }}
          mode={"dialog"}
          onValueChange={(itemValue) => setEnable(itemValue)}
        >
           // Items
          <Picker.Item label="Courses" value="courses" />
          
        </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
