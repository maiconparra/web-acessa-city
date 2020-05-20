import firebase from 'firebase/app'
import api from './API'

const currentUser = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              user.getIdTokenResult().then((token) => {
                const claims = token.claims;
                api.get('/user/'+claims.app_user_id).
                  then(response => {
                      resolve(response.data)
                  })
              })
            }
        });
    }) 
}

export default currentUser;