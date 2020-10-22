import Firebase from '../assets/firebase-config'
import Vuex from 'vuex'

const dbMaterialAndManufacturing = 'materialAndManufacturing'
const dbInWork = 'inWork'

export const state = () => ({
  materialAndManufacturing: [],
  inWorks: null,
})
export const mutations = {
	setMaterialAndManufacturing(state, arg) {
	  state.materialAndManufacturing.push({
	  	no: arg.no, 
	  	constructionNo: arg.constructionNo, 
	  	name: arg.name, 
	  	money: arg.money, 
	  	classification: arg.classification
	  });
  }, 
  clearMaterialAndManufacturing(state) {
  	state.materialAndManufacturing = []
  }
}

export const actions = {
	getMaterialAndManufacturing(context) {
	  context.commit('clearMaterialAndManufacturing');
		Firebase.database().ref(dbMaterialAndManufacturing)
		  .orderByChild('no').on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      context.commit('setMaterialAndManufacturing', {
		      	no: childSnapshot.val().no, 
		      	constructionNo: childSnapshot.val().constructionNo, 
		      	name: childSnapshot.val().name, 
		      	money: childSnapshot.val().money, 
		      	classification: childSnapshot.val().classification
		      });
		    });
	  });
  },
	addMaterialAndManufacturing(state, arg) {
	  let noMax = 0;
	  //既に登録されているNoの最大値取得
		Firebase.database().ref(dbMaterialAndManufacturing)
		  .orderByChild('no').on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if (noMax < childSnapshot.val().no) {
		      	noMax = childSnapshot.val().no;
		      }
		    })
		  });
	  //新規登録用No（＋1）
	  noMax += 1;
	  //データ登録
    Firebase.database().ref(dbMaterialAndManufacturing).push({
      no: noMax,
      constructionNo: arg.constructionNo,
      name: arg.name,
      money: parseFloat(arg.money),
      classification: arg.classification,
	  });
	},
	delMaterialAndManufacturing(state, no) {
	  let key;
		Firebase.database().ref(dbMaterialAndManufacturing)
		.orderByChild('no')
		.startAt(no).endAt(no)
		.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
		    key = childSnapshot.key;
		  });
		});
	  Firebase.database().ref(dbMaterialAndManufacturing).child(key).remove();
	},
	editMaterialAndManufacturing(state, arg) {
		Firebase.database().ref(dbMaterialAndManufacturing)
			.orderByChild('no')
			.startAt(arg.no).endAt(arg.no)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      Firebase.database().ref(dbMaterialAndManufacturing).child(childSnapshot.key).update({
		        constructionNo: arg.constructionNo,
		        name: arg.name,
		        money: arg.money,
		        classification: arg.classification
		      });
			  });
			});
	},
	addInWork(state, arg) {
	  let noMax = 0;
	  //既に登録されているNoの最大値取得
		Firebase.database().ref(dbInWork)
		  .orderByChild('no').on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if (noMax < childSnapshot.val().no) {
		      	noMax = childSnapshot.val().no;
		      }
		    })
		  });
	  
	  //新規登録用No（＋1）
	  noMax += 1;
		
	  //データ登録
    Firebase.database().ref(dbInWork).push({
      no: noMax,
      constructionNo: arg.constructionNo,
      name: arg.name, 
      money: parseFloat(arg.money)
	  });
	},
}