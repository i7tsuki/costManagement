import Firebase from '../assets/firebase-config'
import Vuex from 'vuex'

const dbMaterialAndManufacturing = 'materialAndManufacturing'
const dbInWork = 'inWork'
const dbConstruction = 'construction'

export const state = () => ({
  materialAndManufacturing: [],
  inWorks: null,
  costMaterial: 0,
  costManufacturing: 0,
  costInWork: 0,
  construction: [],
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
  },
  setCost(state, arg) {
	  state.costMaterial = arg.material;
	  state.costManufacturing = arg.manufacturing;
	  state.costInWork = arg.inWork;
  },
  clearConstruction(state) {
  	state.construction = [];
  },
	setConstruction(state, arg) {
	  state.construction.push({
	  	constructionNo: arg.constructionNo, 
	  	name: arg.name, 
	  	money: arg.money, 
	  });
  }, 
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
	addMaterialAndManufacturing(context, arg) {
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
	delMaterialAndManufacturing(context, no) {
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
	editMaterialAndManufacturing(context, arg) {
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
	addInWork(context, arg) {
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
	getCost(context, constructionNo) {
	  let material = 0, manufacturing = 0, inWork = 0;
	
		const getCostMaterial =
		   Firebase.database().ref(dbMaterialAndManufacturing)
			  .orderByChild('constructionNo')
			  .startAt(constructionNo).endAt(constructionNo)
			  .once('value', function(snapshot) {
			    snapshot.forEach(function(childSnapshot) {
		        if (childSnapshot.classification = '材料') {
		          material += childSnapshot.val().money;
		        } else if (childSnapshot.classification = '外注') {
		          manufacturing += childSnapshot.val().money;
		        }
			    });
			  });
		const getCostManufacturing =
		  Firebase.database().ref(dbInWork)
			  .orderByChild('constructionNo')
			  .startAt(constructionNo).endAt(constructionNo)
			  .once('value', function(snapshot) {
			    snapshot.forEach(function(childSnapshot) {
		        inWork += childSnapshot.val().money;
			    });
			  });
	  Promise.all([getCostMaterial, getCostManufacturing]).then(() => {
			context.commit('setCost', {
			  material: material,
			  manufacturing: manufacturing,
			  inWork: inWork,
			});
		});
	},
	addConstructionNo(context, arg) {
	  //データ登録
    Firebase.database().ref(dbConstruction).push({
      constructionNo: arg.constructionNo,
      name: arg.name,
      money: parseFloat(arg.money)
	  });
  },
	getConstructionNo(context) {
	  context.commit('clearConstruction');
		Firebase.database().ref(dbConstruction)
		  .orderByChild('constructionNo').on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      context.commit('setConstruction', {
		      	constructionNo: childSnapshot.val().constructionNo, 
		      	name: childSnapshot.val().name, 
		      	money: childSnapshot.val().money, 
		      });
		    });
	  });
  },
	editConstructionNo(context, arg) {
		Firebase.database().ref(dbConstruction)
			.orderByChild('constructionNo')
			.startAt(arg.constructionNo).endAt(arg.constructionNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      Firebase.database().ref(dbConstruction).child(childSnapshot.key).update({
		        constructionNo: arg.constructionNo,
		        name: arg.name,
		        money: arg.money,
		      });
			  });
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
}