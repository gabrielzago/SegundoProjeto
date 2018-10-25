import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Image, TextInput,} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();

    this.state = {
        nome: "",
        idade: null,
        avatar_url: '',
    };
  }

  //lifecycle method
  componentDidMount() {
    this.atualizarInfo();
  }

  atualizarInfo(){
    fetch('http://server.adekz.com/web/metagabriel/arquivos/db.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        nome: responseJson['pessoas'][1]['nome'],
        idade: responseJson['pessoas'][1]['idade']+'',
        avatar_url: responseJson['pessoas'][1]['avatar_url']
      });
    });
  }

  criarPessoa(){
    fetch('http://localhost:3000/pessoas/', {
      method: 'POST',
      headers: {
        'Acept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        nome: this.state.nome,
        idade: this.state.idade,
        avatar_url: "https://slm-assets3.secondlife.com/assets/1556733/view_large/a839a7ee6526cd10eb5be44185d4d545.jpg?1277248625",
      })
    });
  }

  editarPerfil(){
    fetch('http://localhost:3000/pessoas/1', {
      method: 'PATCH',
      headers: {
        'Acept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        nome: this.state.nome,
        idade: this.state.idade,
        avatar_url: this.state.avatar_url,
      })
    }).then( (responde) => response.json())
      .then( (responseJson) => console.log(responseJson));
  }

  deletarPerfil(){
    fetch('http://localhost:3000/pessoas/1', {
      method: 'DELETE',
    }).then( (responde) => response.json())
      .then( (responseJson) => {
        console.log(responseJson);
       
        this.setState({
          nome: '',
          idade: '',
          avatar_url : '',
        });

      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* LISTA PESSOA
        <Text>Perfil</Text>
        <Image source={{uri: this.state.avatar_url }} style={styles.avatar}/> 

        <Text style={styles.label}>Nome</Text> 
        <Text>{this.state.nome}</Text> 

        <Text style={styles.label}>Idade</Text>
        <Text>{this.state.idade}</Text>

        <TouchableHighlight 
          style={styles.botao}
          onPress={this.atualizarInfo.bind(this)}
        >
          <Text style={styles.botaoTexto}>Atualizar</Text>
        </TouchableHighlight>*/}

        {/* INSERE PESSOA
        <Text>Perfil</Text>
        <Image source={{uri: this.state.avatar_url }} style={styles.avatar}/> 

        <Text style={styles.label}>Nome</Text> 
        <TextInput
          placeholder="Digite seu nome"
          style={styles.campodetexto}
          value={this.state.nome}
          onChangeText={ (nome) => this.setState( { nome }) }
        />
       
        <Text style={styles.label}>Idade</Text> 
        <TextInput
          placeholder="Digite sua idade"
          style={styles.campodetexto}
          value={this.state.idade}
          onChangeText={ idade => this.setState( { idade }) }
        />

        <TouchableHighlight 
          style={styles.botao}
          onPress={this.criarPessoa.bind(this)}
        >
          <Text style={styles.botaoTexto}>Atualizar</Text>
        </TouchableHighlight>*/}
        
        {/* */}
        <Text>Perfil</Text>
        <Image source={{uri: this.state.avatar_url }} style={styles.avatar}/> 

        <Text style={styles.label}>Nome</Text> 
        <TextInput
          placeholder="Digite seu nome"
          style={styles.campodetexto}
          value={this.state.nome}
          onChangeText={ (nome) => this.setState( { nome }) }
        />
       
        <Text style={styles.label}>Idade</Text> 
        <TextInput
          placeholder="Digite sua idade"
          style={styles.campodetexto}
          value={this.state.idade}
          onChangeText={ idade => this.setState( { idade }) }
        />

        <View style={styles.alinhaBotao}>
          <TouchableHighlight 
            onPress={ () => this.editarPerfil()}
            style={styles.botao}
          >
          <Text style={styles.botaoTexto}>Editar</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.deletarPerfil().bind(this) }
            style={styles.botao}
          >
          <Text style={styles.botaoTexto}>Deletar</Text>
          </TouchableHighlight>
          //BIND arow function  definem o componente e a  () => this.funcao() sem o bind define o elemento
        </View> 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  botao: {
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 5,
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: 'bold',
  },  
  label: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
  campodetexto: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    margin: 12,
    width: "90%", 
  },
  alinhaBotao: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
});
