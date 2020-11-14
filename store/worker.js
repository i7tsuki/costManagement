import Firebase from '../assets/firebase-config';
const dbWorker = 'worker';

export const state = () => ({
  worker: [],
});
export const mutations = {
  clearWorker(state) {
  	state.worker = [];
  },
	setWorker(state, arg) {
	  state.worker.push({
	  	id: arg.id, 
	  	year: arg.year, 
	  	salary: arg.salary,
	  	workTime: arg.workTime,
	  	classification: arg.classification
	  });
  },
}
export const actions = {
	async addWorker(context, arg) {
	  let workerIdMax = 0;
	  //既に登録されているNoの最大値取得
		await Firebase.database().ref(dbWorker)
		  .orderByChild('id')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if (workerIdMax < childSnapshot.val().id) {
		      	workerIdMax = childSnapshot.val().id;
		      }
		    })
		  });
	  //新規登録用No（＋1）
	  workerIdMax += 1;
	  //データ登録
    await Firebase.database().ref(dbWorker).push({
      id: workerIdMax,
      year: arg.year,
      salary: parseFloat(arg.salary),
      workTime: parseFloat(arg.workTime),
      classification: arg.classification,
	  });
	},
	getWorker(context) {
		Firebase.database().ref(dbWorker)
		  .orderByChild('id')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      context.commit('setWorker', {
		      	id: childSnapshot.val().id, 
		      	year: childSnapshot.val().year, 
		      	salary: childSnapshot.val().salary, 
		      	workTime: childSnapshot.val().workTime, 
		      	classification: childSnapshot.val().classification,
		      });
		    });
	  });
  },
	editWorker(context, arg) {
		Firebase.database().ref(dbWorker)
			.orderByChild('id')
			.startAt(arg.id).endAt(arg.id)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      Firebase.database().ref(dbWorker).child(childSnapshot.key).update({
		        year: arg.year,
		        salary: parseFloat(arg.salary),
		        workTime: parseFloat(arg.workTime),
		        classification: arg.classification,
		      });
			  });
			});
	},
	delWorker(context, id) {
	  let key;
		Firebase.database().ref(dbWorker)
		.orderByChild('id')
		.startAt(id).endAt(id)
		.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
		    key = childSnapshot.key;
		  });
		});
	  Firebase.database().ref(dbWorker).child(key).remove();
	},
};