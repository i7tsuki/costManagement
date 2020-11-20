import Firebase from '../assets/firebase-config';
const dbConstruction = 'construction';

export const state = () => ({
  construction: [],
  constructionNo: '',
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
  setConstructionNo(state, constructionNo) {
  	state.constructionNo = constructionNo;
  },
}
export const actions = {
	async addConstructionNo(context, arg) {
	  let findFlag = 0;
		await Firebase.database().ref(dbConstruction)
			.orderByChild('constructionNo')
			.startAt(arg.constructionNo).endAt(arg.constructionNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
			    if(arg.userId === childSnapshot.val().userId && 
			      arg.constructionNo === childSnapshot.val().constructionNo) {
			        findFlag = 1;
			    }
  		  });
			});
		if(findFlag === 1) {
	    throw('該当の製品番号は既に登録済みです。');
		  return;
		}
	  //データ登録
    await Firebase.database().ref(dbConstruction).push({
      userId: arg.userId,
      constructionNo: arg.constructionNo,
      constructionName: arg.constructionName,
      money: parseFloat(arg.money),
      shipDay: arg.shipDay,
	  });
  },
	getConstructionNo(context, userId) {
	  context.commit('clearConstruction');
		Firebase.database().ref(dbConstruction)
		  .orderByChild('constructionNo').on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if(userId === childSnapshot.val().userId) { 
			      context.commit('setConstruction', {
			      	constructionNo: childSnapshot.val().constructionNo, 
			      	constructionName: childSnapshot.val().constructionName, 
			      	money: childSnapshot.val().money, 
			      	shipDay: childSnapshot.val().shipDay, 
			      });
			    }
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
			    if(arg.userId === childSnapshot.val().userId) { 
  		      key = childSnapshot.key;
  		    }
			  });
			});
		await Firebase.database().ref(dbConstruction).child(key).update({
			constructionNo: arg.afterConstructionNo,
			constructionName: arg.constructionName,
			money: arg.money,
			shipDay: arg.shipDay,
		});
	},
	async delConstructionNo(context, arg) {
	  let key;
		await Firebase.database().ref(dbConstruction)
		  .orderByChild('constructionNo')
		  .startAt(arg.constructionNo).endAt(arg.constructionNo)
		  .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
	        if(arg.userId === childSnapshot.val().userId) { 
	  	      key = childSnapshot.key;
		      }
		    });
		  });
	  await Firebase.database().ref(dbConstruction).child(key).remove();
	},
};