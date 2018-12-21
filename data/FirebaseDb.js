import firebase from 'firebase';

let config = {    
    //Lembrar de adicionar os dados o firebase
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""    
};

let app = firebase.initializeApp(config);
export const db = app.database();