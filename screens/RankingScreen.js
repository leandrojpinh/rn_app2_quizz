import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { db } from '../data/FirebaseDb';
import { Card } from 'react-native-elements';
let itemsRef = db.ref('players/');

export default class RankingScreen extends React.Component {
  static navigationOptions = {
    title: 'Ranking',
  };

  state = {
    players: null
  }

  componentDidMount() {
    itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      console.log('data:' + data);
      let items = Object.values(data);
      console.log('items:' + items);
      this.setState({players: items});
     });
  }

  render() {
    if(this.state.players === null){
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    } else {
      const users = this.state.players.map((item) => {
        return(
          <View>
            <Card title={item.email}>              
              <Text style={styles.acertoText}>Acertos: {item.acertos}</Text>
              <Text style={styles.erroText}>Erros: {item.erros}</Text>
              <Text style={styles.simpleText}>Data: {item.data}</Text>
            </Card>            
          </View>
        );
      })

      return (
        <View style={styles.container}>
          <ScrollView>
            <View>
              {users}
            </View>
          </ScrollView>
        </View>
      )

    }
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  simpleText: {
    color: '#3498db'
  },
  acertoText: {
    color: '#2ecc71'
  },
  erroText: {
    color: '#e74c3c'
  }
});
