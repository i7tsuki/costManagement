import Firebase from '../assets/firebase-config';
const dbUsers = 'users';

export const state = () => ({
  userName: null,
  mail: null,
  password: null
})
export const mutations = {
  setUser(state, arg) {
    state.userName = arg.userName;
    state.mail = arg.mail;
    state.password = arg.password;
  },
}
export const actions = {
  login(context, arg) {
    let userName, wallet;
    const signIn = 
      Firebase
        .auth()
        .signInWithEmailAndPassword(arg.mail, arg.password);
    const getUserName = 
      Firebase.database().ref(dbUsers)
        .orderByChild('mail')
        .startAt(arg.mail).endAt(arg.mail)
        .once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            userName = childSnapshot.val().userName;
          });
        });
    return Promise.all([signIn, getUserName])
      .then(function() {
        context.commit('setUser', {
          userName: userName,
          mail: arg.mail,
          password: arg.password,
        });
      });
  },
  async createUserAccount(context, arg) {
    await context.dispatch('readUserByEmail', arg.mail);
    if (context.getters.mail !== null) {
      throw new Error('既にメールアドレスが登録済みです!');
    } else {
      await context.dispatch('createUserEmailAndPassword', {
        userName: arg.userName,
        mail: arg.mail,
        password: arg.password, 
      });
    }
  },
  readUserByEmail(context, mail) {
    Firebase.database().ref(dbUsers)
      .orderByChild('mail')
      .startAt(mail).endAt(mail)
      .once('value', function(snapshot) {
        //既にメールアドレスが登録済みのユーザでないかどうか確認    
        if (snapshot.exists()) { //登録済みの場合
          context.commit('setUser', {
            mail: mail,
          });
        } else { //未登録の場合
          context.commit('setUser', {
            mail: null,
          });
        }
      }).catch(error => alert(error));
  },
  createUserEmailAndPassword(context, arg) {
    const localSetUser = 
      Firebase
        .auth()
        .createUserWithEmailAndPassword(arg.mail, arg.password)
        .then(() => {
          context.commit('setUser', {
            userName: arg.userName,
            mail: arg.mail,
            password: arg.password, 
          });
      });
    const dbSetUser = 
      Firebase.database().ref(dbUsers).push({
        userName: arg.userName,
        mail: arg.mail,
        password: arg.password,
      });
    return Promise.all([localSetUser, dbSetUser]).then(() => {
      console.log("Create Account");
    }).catch(error => alert(error));
  },
  logout(context) {
    Firebase.auth().signOut().then(function() {
      context.commit('setUser', {
        userName: null,
        mail: null,
        password: null,
      });
    }).catch(function(error) {
      console.log(error);
    });
  },
}
export const getters = {
  mail: function(state) {
    return state.mail
  },
}