import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard
} from 'react-native';

import api from './src/Services/api';

export default function App() {

  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);

  const inputRef = useRef(null);


  function limpar(){
    setCep('')
    inputRef.current.focus();
    setCepUser(null)
  }

  async function buscar(){
    if(cep === ''){
      alert('Digite um cep válido');
      setCep('');
      return;
    }

    try{
      const response = await api.get(`${cep}/json/`)
      Keyboard.dismiss();

      setCepUser(response.data)

    } catch(error) {
      alert('CEP Inválido')
    }

}  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput 
          style={styles.input}
          placeholder='Ex. 79003241'
          value={cep}
          onChangeText={(value) => setCep(value)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd'}]} onPress={buscar} >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#cd3e1d'}]} onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>

      </View>

      {cepUser && 
        <View style={styles.result}>
          <Text styles={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text styles={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text styles={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text styles={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text styles={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 13,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 12
  },
  botaoText:{
    fontSize: 20,
    color: '#fff'
  },
  result:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  itemText:{
    fontSize: 25
  }

});

