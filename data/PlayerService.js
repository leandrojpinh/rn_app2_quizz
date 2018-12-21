import { db } from './FirebaseDb';

export const addPlayer = (item) => {
    db.app.database().ref('players/' + item.uid).set({
        email: item.email,
        acertos: item.acertos,
        erros: item.erros,
        data: item.data
    });
}