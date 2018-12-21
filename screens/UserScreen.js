import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { db } from '../data/FirebaseDb';

export default class UserScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: ''
    }
  }

  componentDidMount() {        
    let user = db.app.auth().currentUser
    if(user !== undefined && user !== null) {
      this.setState({
        currentUser: user.email
      })
    }
  }

  static navigationOptions = {
    title: 'Usuário',
  };

  _handleLogout() {    
    this.props.navigation.navigate('Login')
  }

  render() {    
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
          <View style={styles.scrollViewContainer}>
            <Text style={styles.simpleText}>
              {this.state.currentUser}
            </Text>
            <TouchableOpacity key='Logout' onPress={() => this._handleLogout()} style={styles.buttonOption}>
              <Text style={styles.buttonOptionText}>Logout</Text>
            </TouchableOpacity>    
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView : {    
    height : Dimensions.get('window').height, 
  }, 
  mainContainer : {
    backgroundColor: '#fff',
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
  buttonOptionText: {
    fontSize: 20,
    color: '#2e78b7',
  },
  simpleText: {
    color: '#2ecc71',
    fontSize: 30
  }
});