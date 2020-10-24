import Firebase from '../assets/firebase-config'
import Vuex from 'vuex'

const dbMaterialAndManufacturing = 'materialAndManufacturing'
const dbInWork = 'inWork'
const dbConstruction = 'construction'
const dbOrder = 'order'
const dbOrderDetails = 'orderDetails'

export const state = () => ({
  materialAndManufacturing: [],
  inWorks: null,
  costMaterial: 0,
  costManufacturing: 0,
  costInWork: 0,
  construction: [],
  constructionNo: null,
  costDetailMaterial: [],
  costDetailManufacturing: [],
  costDetailInWork: []
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
  setconstructionNo(state, constructionNo) {
  	state.constructionNo = constructionNo;
  },
	setCostDetail(state, arg) {
	  state.costMaterial = arg.material;
	  state.costManufacturing = arg.manufacturing;
	  state.costInWork = arg.inWork;
	  state.costDetailMaterial = arg.materialData;
	  state.costDetailManufacturing = arg.manufacturingData;
	  state.costDetailInWork = arg.inWorkData;
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
	  let key;
		Firebase.database().ref(dbConstruction)
			.orderByChild('constructionNo')
			.startAt(arg.beforeConstructionNo).endAt(arg.beforeConstructionNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      key = childSnapshot.key;
			  });
			});
		Firebase.database().ref(dbConstruction).child(key).update({
			constructionNo: arg.afterConstructionNo,
			name: arg.name,
			money: arg.money,
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
	getCostDetails(context, constructionNo) {
	  let material = 0, manufacturing = 0, inWork = 0;
		let materialData =[], manufacturingData = [], inWorkData = [];
		const getCostMaterial =
		   Firebase.database().ref(dbMaterialAndManufacturing)
			  .orderByChild('constructionNo')
			  .startAt(constructionNo).endAt(constructionNo)
			  .once('value', function(snapshot) {
			    snapshot.forEach(function(childSnapshot) {
		        if (childSnapshot.classification = '材料') {
		          material += childSnapshot.val().money;
		          materialData.push({
		          	name: childSnapshot.val().name,
		          	money: childSnapshot.val().money
		          });
		        } else if (childSnapshot.classification = '外注') {
		          manufacturing += childSnapshot.val().money;
		          manufacturingData.push({
		          	name: childSnapshot.val().name,
		          	money: childSnapshot.val().money
		          });
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
	          inWorkData.push({
	          	name: childSnapshot.val().name,
	          	money: childSnapshot.val().money
	          });
			    });
			  });
	  Promise.all([getCostMaterial, getCostManufacturing]).then(() => {
			context.commit('setCostDetail', {
			  material: material,
			  manufacturing: manufacturing,
			  inWork: inWork,
			  materialData: materialData,
			  manufacturingData: manufacturingData,
			  inWorkData: inWorkData
			});
		});
	},
	async commitOrder(context, arg) {
	  let updateFlag = 0, no = 1;
	  let key, keys = [];
	  //既に登録されている注文番号かどうか確認
		await Firebase.database().ref(dbOrder)
		  .orderByChild('orderNo')
		  .startAt(arg.orderNo).endAt(arg.orderNo)
		  .once('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if (arg.orderNo === childSnapshot.val().orderNo) {
		      	updateFlag = 1;
		      }
		    })
		  });
		//既に登録されている場合、データを削除する。
		if (updateFlag === 1) {
		  //１　dbOrder
		  let key;
			await Firebase.database().ref(dbOrder)
			.orderByChild('orderNo')
			.startAt(arg.orderNo).endAt(arg.orderNo)
			.once('value', function(snapshot) {
	      snapshot.forEach(function(childSnapshot) {
			    key = childSnapshot.key;
			  });
			});
		  await Firebase.database().ref(dbOrder).child(key).remove();
		  //２　dbOrderDetails
			await Firebase.database().ref(dbOrderDetails)
			.orderByChild('orderNo')
			.startAt(arg.orderNo).endAt(arg.orderNo)
			.once('value', function(snapshot) {
	      snapshot.forEach(function(childSnapshot) {
	        keys.push(childSnapshot.key);
			  });
			});
			for (let i = 0; i < keys.length; i++) {
			  await Firebase.database().ref(dbOrderDetails).child(keys[i]).remove();
			}
	  }
	  //登録する
	  //１　dbOrder
    await Firebase.database().ref(dbOrder).push({
      orderNo: arg.orderNo,
      orderDay: arg.orderDay,
      orderName: arg.orderName,
	  });
	  //２　dbOrderDetails　連番
	  for (let i = 0; i < arg.orderData.length; i++) {	
	    await Firebase.database().ref(dbOrderDetails).push({
	      no: no,
	      orderNo: arg.orderNo,
	      materialAndManufacturingName: arg.orderData[i].materialAndManufacturingName,
	      unitPrice: parseFloat(arg.orderData[i].unitPrice),
	      num: parseFloat(arg.orderData[i].num),
	      money: parseFloat(arg.orderData[i].money),
	      classification: arg.orderData[i].classification,
	      constructionNo: arg.orderData[i].constructionNo,
		  });
		  no++;
    }
	},
}