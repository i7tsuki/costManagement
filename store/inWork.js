import Firebase from '../assets/firebase-config';
const dbInWork = 'inWork';

export const state = () => ({
  inWork: [],
});
export const mutations = {
  clearInWork(state) {
  	state.inWork = [];
  },
	setInWork(state, arg) {
	  state.inWork.push({
	  	workNo: arg.workNo, 
	  	constructionNo: arg.constructionNo, 
	  	workDay: arg.workDay, 
	  	workName: arg.workName, 
	  	time: arg.time, 
	  	classification: arg.classification, 
	  });
	},
}
export const actions = {
	delInWork(context, workNo) {
	  let key;
		Firebase.database().ref(dbInWork)
		.orderByChild('workNo')
		.startAt(workNo).endAt(workNo)
		.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
		    key = childSnapshot.key;
		  });
		});
	  Firebase.database().ref(dbInWork).child(key).remove();
	},
	editInWork(context, arg) {
		Firebase.database().ref(dbInWork)
			.orderByChild('workNo')
			.startAt(arg.workNo).endAt(arg.workNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      Firebase.database().ref(dbInWork).child(childSnapshot.key).update({
		        constructionNo: arg.constructionNo,
		        workDay: arg.workDay,
		        workName: arg.workName,
		        time: parseFloat(arg.time),
		      });
			  });
			});
	},
	getInWork(context, userId) {
		Firebase.database().ref(dbInWork)
		  .orderByChild('workNo')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if(userId === childSnapshot.val().userId) {
			      context.commit('setInWork', {
			      	workNo: childSnapshot.val().workNo, 
			      	constructionNo: childSnapshot.val().constructionNo, 
			      	workDay: childSnapshot.val().workDay, 
			      	workName: childSnapshot.val().workName, 
			      	time: childSnapshot.val().time,
			      });
			    }
		    });
	  });
	},
	async addInWork(context, arg) {
	  let workNoMax = 0;
	  //既に登録されているNoの最大値取得
		await Firebase.database().ref(dbInWork)
		  .orderByChild('workNo')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if (workNoMax < childSnapshot.val().workNo) {
		      	workNoMax = childSnapshot.val().workNo;
		      }
		    })
		  });
	  //新規登録用No（＋1）
	  workNoMax += 1;
	  //データ登録
    await Firebase.database().ref(dbInWork).push({
      userId: arg.userId,
      workNo: workNoMax,
      constructionNo: arg.constructionNo,
      workDay: arg.workDay,
      workName: arg.workName,
      time: parseFloat(arg.time),
	  });
	},
};