import Firebase from '../assets/firebase-config';
const dbUsers = 'users';

export const state = () => ({
  userId: null,
  userName: null,
  mail: null,
  password: null,
  message: null,
})
export const mutations = {
  setUser(state, arg) {
    state.userId = arg.userId;
    state.userName = arg.userName;
    state.mail = arg.mail;
    state.password = arg.password;
  },
  setMessage(state, msg) {
    state.message = msg;
  },
}
export const actions = {
  async login(context, arg) {
    let userId, userName;
    await Firebase.auth().signInWithEmailAndPassword(arg.mail, arg.password)
      .then(async function(result) {
		    await Firebase.database().ref(dbUsers)
		      .orderByChild('mail')
		      .startAt(arg.mail).endAt(arg.mail)
		      .once('value', function(snapshot) {
		        for (let childSnapshot in snapshot.val()) {
		          userId = snapshot.val()[childSnapshot].userId;
		          userName = snapshot.val()[childSnapshot].userName;
		        };
		      });
      });
    context.commit('setUser', {
      userId: userId,
      userName: userName,
      mail: arg.mail,
      password: arg.password,
    });
  },
  async createUserAccount(context, arg) {
    let nextUserId = 0;
    await Firebase.database().ref(dbUsers)
      .orderByChild('mail')
      .startAt(arg.mail).endAt(arg.mail)
      .once('value', function(snapshot) {
        if (snapshot.exists()) { 
          context.commit('setMessage', '既に同じメールアドレスが登録済みです。');
          context.commit('setUser', {
            mail: arg.mail,
          });
        } else { 
          console.log('該当のメールアドレスは未登録です。');
          context.commit('setUser', {
            mail: null,
          });
        }
      }).catch(error => console.error(error));
    if (context.getters.mail !== null) {
      throw new Error('既にメールアドレスが登録済みです!');
    } else {
      nextUserId = await context.getters.getMaxId;
		  //新規登録用ID（＋1）
		  nextUserId += 1;
      await context.dispatch('createUserEmailAndPassword', {
        userId: nextUserId,
        userName: arg.userName,
        mail: arg.mail,
        password: arg.password, 
      });
    }
  },
  async createUserEmailAndPassword(context, arg) {
    await Firebase.auth().createUserWithEmailAndPassword(arg.mail, arg.password);
    context.commit('setUser', {
      userId: arg.userId,
      userName: arg.userName,
      mail: arg.mail,
      password: arg.password, 
    });
    await Firebase.database().ref(dbUsers).push({
      userId: arg.userId,
      userName: arg.userName,
      mail: arg.mail,
      password: arg.password,
    });
    console.log("Create Account");
  },
  logout(context) {
    Firebase.auth().signOut().then(function() {
      context.commit('setUser', {
        userId: null,
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
  getMaxId: async function(state) {
    let getMaxId = 0;
    await Firebase.database().ref(dbUsers)
      .once('value', function(snapshot) {
	      if (snapshot.val() !== null) {
	        for (let childSnapshot in snapshot.val()) {
				    if (getMaxId < snapshot.val()[childSnapshot].userId) {
				    	getMaxId = snapshot.val()[childSnapshot].userId; 	
				    }
				  }
		    }
	    });
    console.log('既に登録されているIDの最大値:' + getMaxId)
    return getMaxId;
  },
}