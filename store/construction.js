import Firebase from '../assets/firebase-config';
const dbConstruction = 'construction';

export const state = () => ({
  construction: [],
  constructionNo: '',
  anotherConstruction: [],
  shipYear: '',
});
export const mutations = {
  clearConstruction(state) {
  	state.construction = [];
  },
	setConstruction(state, arg) {
	  state.construction.push({
	  	constructionNo: arg.constructionNo, 
	  	constructionName: arg.constructionName, 
	  	orderDay: arg.orderDay, 
	  	money: arg.money, 
	  	shipDay: arg.shipDay, 
	  });
  }, 
  setconstructionNo(state, constructionNo) {
  	state.constructionNo = constructionNo;
  },
  setConstructionInfo(state, money) {
    state.constructionMoney = money;
  },
  setShipYearAndAnotherConstruction(state, arg) {
    state.anotherConstruction = arg.constructionData;
    state.shipYear = arg.shipYear;
  },
}
export const actions = {
	addConstructionNo(context, arg) {
	  //データ登録
    Firebase.database().ref(dbConstruction).push({
      constructionNo: arg.constructionNo,
      constructionName: arg.constructionName,
      money: parseFloat(arg.money),
      shipDay: arg.shipDay,
	  });
  },
	getConstructionNo(context) {
	  context.commit('clearConstruction');
		Firebase.database().ref(dbConstruction)
		  .orderByChild('constructionNo').on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      context.commit('setConstruction', {
		      	constructionNo: childSnapshot.val().constructionNo, 
		      	constructionName: childSnapshot.val().constructionName, 
		      	money: childSnapshot.val().money, 
		      	shipDay: childSnapshot.val().shipDay, 
		      });
		    });
	  });
  },
	async editConstructionNo(context, arg) {
	  let key;
		await Firebase.database().ref(dbConstruction)
			.orderByChild('constructionNo')
			.startAt(arg.beforeConstructionNo).endAt(arg.beforeConstructionNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      key = childSnapshot.key;
			  });
			});
		await Firebase.database().ref(dbConstruction).child(key).update({
			constructionNo: arg.afterConstructionNo,
			constructionName: arg.constructionName,
			money: arg.money,
			shipDay: arg.shipDay,
		});
	},
	delConstructionNo(context, constructionNo) {
	  let key;
		Firebase.database().ref(dbConstruction)
		.orderByChild('constructionNo')
		.startAt(constructionNo).endAt(constructionNo)
		.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
		    key = childSnapshot.key;
		  });
		});
	  Firebase.database().ref(dbConstruction).child(key).remove();
	},
};