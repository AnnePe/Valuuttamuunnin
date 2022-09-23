import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import kuva from './kuvat/euro.png';

export default function App() {

  const [rates, setRates] = useState('');
  const [selected, setSelected] = useState('');
  const [luku, setLuku] = useState('');
  const [summa, setSumma] = useState('');
  
var myHeaders = new Headers();
myHeaders.append("apikey", "nmtwz4V1eyhLM1iNGNcKfpd6RRinMiH4");

var options = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
var url = `https://api.apilayer.com/exchangerates_data/latest`;

const getData=   async () => {
   // const url = `https://api.apilayer.com/exchangerates_data/latest`;
    try{
      const response = await fetch(url,options);
      const data = await response.json();
      setRates(data.rates);
    }catch(error){ 
          Alert.alert('Error', error); 
      };    
    }
     console.log(rates);
/*//fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=symbols&base=EUR", requestOptions)
fetch('https://api.apilayer.com/exchangerates_data/latest', {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
 */ 
useEffect(() => {
  getData();
}, []);



  const convert = () => {
    const summa = (Number(luku) / rates[selected]).toFixed(2); 
    setSumma(summa);
    }

  const Array = () => {
    return Object.keys(rates).map((rate) => {
      return <Picker.Item key={rate} label={rate} value={rate} />;
    });
  };

  return (
    <View style={styles.container}>
      <Image style={{width:100, height:100, margintop:100}} source={kuva} />
      <Text style={{fontSize: 18, marginBottom:10, marginTop:30}}>{summa}  €</Text>
      <View style={styles.converter}>
        <TextInput 
          style={{fontSize: 18, width: 80}} 
          placeholder='value' 
          onChangeText={luku => setLuku(luku)} value={luku}
          keyboardType='numeric'
          returnKeyType="done" />
         
       <Picker style={{height: 200, width: 150}}
          selectedValue={selected}
          onValueChange={(itemValue,itemIndex) =>{
          console.log(itemValue,itemIndex);
          setSelected(itemValue);
          
          }}
          >
          {Array()}
        </Picker>
        </View>
      <Button title="Convert" onPress={() => convert()} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom:30,
  marginTop:30,
 },
 converter: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 50,
},
});

