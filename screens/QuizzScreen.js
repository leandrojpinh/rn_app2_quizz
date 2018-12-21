import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { Card } from 'react-native-elements'
import { db } from '../data/FirebaseDb';
import { addPlayer } from '../data/PlayerService';

export default class QuizzScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear(),
      question_id : 0,
      questions: 0,
      questionsList:
      [
        {
          "id": 0,
          "url": "http://estatico.globoesporte.globo.com/2012/12/16/Wallpaper_Corinthians_1600x1080.jpg",
          "question":"Quem foi o campeão do Brasileirão Série A em 2017?",
          "correct":"Corinthians",
          "options": ["Palmeiras", "Corinthians", "Ceará", "São Paulo"]
        },
        {
          "id": 1,
          "url": "https://www.soescola.com/wp-content/uploads/2017/10/o-que-e-o-que-e.jpg",
          "question":"O que é o que é: Cai em pé e corre deitado?",
          "correct":"Chuva",
          "options": ["Telha", "Pneu", "Chuva", "Terra"]
        },
        {
          "id": 2,
          "url": "https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2016/08/urna-eletronica-mao.png",
          "question":"Quem foi eleito para Presidente do Brasil para 2019??",
          "correct":"Bolsonaro",
          "options": ["Lula", "Marina", "Haddad", "Bolsonaro"]
        },
        {
          "id": 3,
          "url": "https://i2.wp.com/moraremportugal.com/wp-content/uploads/2018/09/trabalhar-com-visto-de-estudante-em-portugal-e-possivel-1.jpg?resize=696%2C346&ssl=1",
          "question":"Qual país é considerado excelente para trabalhar com TI?",
          "correct":"Irlanda",
          "options": ["Irlanda", "Brasil", "Costa Rica", "Portugal"]
        },
        {
          "id": 4,
          "url": "http://f.i.uol.com.br/folha/esporte/images/17161117.jpeg",
          "question":"Quem foi eleito melhor Jogador de 2018?",
          "correct":"Modric",
          "options": ["Messi", "Neymar", "Modric", "Cristiano Ronaldo"]
        }    
      ]
    }    
  }

  _handleAnswer(answer) {    
      let question = this.state.questionsList[this.state.question_id];
      if(answer === question.correct) {
        this.setState({
          questions: this.state.questions + 1
        });
      }
      
      if(this.state.question_id !== this.state.questionsList.length) {
        this.setState({
          question_id: this.state.question_id + 1
        });
      }
  }

  _handleShowResult() {
    let score = this.state.questions
    this.props.navigation.navigate('Ranking', { score: score })
  }

  _handleRestart() {    
      this.setState({
        question_id: 0,
        questions: 0
      });
  }

  _finishedQuizz() {
    let _acertos = this.state.questions;    
    let _erros = 5 - this.state.questions;
    let _data = this.state.data;
    let user = {
      uid: db.app.auth().currentUser.uid,
      email: db.app.auth().currentUser.email,
      acertos: _acertos,
      erros: _erros,
      data: _data
    }
    
    addPlayer(user);
  }

  componentDidMount() {
    db.app.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Quizz' : 'Login')
    })
  }
  render() {
    if(this.state.question_id !== this.state.questionsList.length) {
      let question = this.state.questionsList[this.state.question_id];
      let options = question.options.map(option => (
        <TouchableOpacity key={option} onPress={() => this._handleAnswer(option)} style={styles.buttonOption}>
          <Text style={styles.buttonOptionText}>{option}</Text>
        </TouchableOpacity>
      ));    

      return (
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
              <View style={styles.scrollViewContainer}>
                <Card title={'Questão ' + (this.state.question_id+1)}>
                  <View>
                    <Image style={{height: 200}} source={{ uri: question.url }} />
                    <Text style={{marginBottom: 10}}> {question.question} </Text>
                    {options}
                  </View>
                </Card>                
              </View>
          </ScrollView>
        </View>
      );
    } else {
      this._finishedQuizz();
      return (
        <View style={styles.resultContainer}>
          <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
              <View style={styles.scrollViewContainer}>                
                <Text>Você acertou { this.state.questions }</Text>
                <Text>Você errou { 5 - this.state.questions }</Text>
                <Text>{ this.state.data }</Text>

                <TouchableOpacity key='restart' onPress={() => this._handleRestart()} style={styles.buttonResult}>
                  <Text style={styles.buttonResultText}>Restart the Quizz!</Text>
                </TouchableOpacity>
              </View>              
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollView : {
    height : Dimensions.get('window').height, 
  }, 
  mainContainer : {
    backgroundColor: '#fff',
    flex : 1 
  }, 
  resultContainer : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer : {
    color: 'blue'
  }, 
  buttonOption: {
    paddingVertical: 15,
  },
  buttonResult: {
    paddingVertical: 15,
    borderColor: '#f0f0f0',
  },
  buttonOptionText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  buttonResultText: {
    fontSize: 20,
    color: '#2e78b7',    
  },
});
