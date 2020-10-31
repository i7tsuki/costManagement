import Firebase from '../assets/firebase-config';
import Vuex from 'vuex';

const dbMaterialAndManufacturing = 'materialAndManufacturing';
const dbInWork = 'inWork';
const dbConstruction = 'construction';
const dbOrder = 'order';
const dbOrderDetails = 'orderDetails';

export const state = () => ({
  materialAndManufacturing: [],
  inWork: [],
  costMaterial: 0,
  costManufacturing: 0,
  costInWork: 0,
  construction: [],
  constructionNo: '',
  costDetailMaterial: [],
  costDetailManufacturing: [],
  costDetailInWork: [],
  order: [],
  orderNo: '',
  orderDetails: [],
});
export const mutations = {
	setMaterialAndManufacturing(state, arg) {
	  state.materialAndManufacturing.push({
	  	materialAndManufacturingNo: arg.materialAndManufacturingNo, 
	  	orderNo: arg.orderNo, 
	  	constructionNo: arg.constructionNo, 
	  	materialAndManufacturingName: arg.materialAndManufacturingName, 
	  	unitPrice: arg.unitPrice,
	  	num: arg.num,
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
  clearOrder(state) {
  	state.order = [];
  },
  setStateDeliverDay(state, deliveryDay) {
    state.deliveryDay = deliveryDay;  
  },
  setOrder(state, arg) {
    state.order.push({
      orderNo: arg.orderNo,
      orderDay: arg.orderDay,
      orderName: arg.orderName,
      deliveryDay: arg.deliveryDay,
    });
  },
  setStateOrderDetails(state, orderDetails) {
    state.orderDetails = [];
    for(let i = 0; i < orderDetails.length; i++) {
      state.orderDetails.push({
	      materialAndManufacturingName: orderDetails[i].materialAndManufacturingName,
	      unitPrice: orderDetails[i].unitPrice,
	      num: orderDetails[i].num,
	      money: orderDetails[i].money,
	      classification: orderDetails[i].classification,
	      constructionNo: orderDetails[i].constructionNo,
      });
    }
  },
  setOrderNo(state, orderNo) {
    state.orderNo = orderNo;
  },
  clearInWork(state) {
  	state.inWork = [];
  },
	setInWork(state, arg) {
	  state.inWork.push({
	  	workNo: arg.workNo, 
	  	constructionNo: arg.constructionNo, 
	  	workName: arg.workName, 
	  	money: arg.money, 
	  });
	},
};

export const actions = {
	getMaterialAndManufacturing(context) {
		Firebase.database().ref(dbMaterialAndManufacturing)
		  .orderByChild('materialAndManufacturingNo')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      context.commit('setMaterialAndManufacturing', {
		      	materialAndManufacturingNo: childSnapshot.val().materialAndManufacturingNo, 
		      	orderNo: childSnapshot.val().orderNo, 
		      	constructionNo: childSnapshot.val().constructionNo, 
		      	materialAndManufacturingName: childSnapshot.val().materialAndManufacturingName, 
		      	unitPrice: childSnapshot.val().unitPrice, 
		      	num: childSnapshot.val().num, 
		      	money: childSnapshot.val().money, 
		      	classification: childSnapshot.val().classification
		      });
		    });
	  });
  },
	async addMaterialAndManufacturing(context, arg) {
	  let materialAndManufacturingNoMax = 0;
	  //既に登録されているNoの最大値取得
		await Firebase.database().ref(dbMaterialAndManufacturing)
		  .orderByChild('materialAndManufacturingNo')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if (materialAndManufacturingNoMax < childSnapshot.val().materialAndManufacturingNo) {
		      	materialAndManufacturingNoMax = childSnapshot.val().materialAndManufacturingNo;
		      }
		    })
		  });
	  //新規登録用No（＋1）
	  materialAndManufacturingNoMax += 1;
	  //データ登録
    await Firebase.database().ref(dbMaterialAndManufacturing).push({
      materialAndManufacturingNo: materialAndManufacturingNoMax,
      orderNo: arg.orderNo,
      constructionNo: arg.constructionNo,
      materialAndManufacturingName: arg.materialAndManufacturingName,
      unitPrice: parseFloat(arg.unitPrice),
      num: parseFloat(arg.num),
      money: parseFloat(arg.money),
      classification: arg.classification,
	  });
	},
	delMaterialAndManufacturing(context, materialAndManufacturingNo) {
	  let key;
		Firebase.database().ref(dbMaterialAndManufacturing)
		.orderByChild('materialAndManufacturingNo')
		.startAt(materialAndManufacturingNo).endAt(materialAndManufacturingNo)
		.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
		    key = childSnapshot.key;
		  });
		});
	  Firebase.database().ref(dbMaterialAndManufacturing).child(key).remove();
	},
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
	editMaterialAndManufacturing(context, arg) {
		Firebase.database().ref(dbMaterialAndManufacturing)
			.orderByChild('materialAndManufacturingNo')
			.startAt(arg.materialAndManufacturingNo).endAt(arg.materialAndManufacturingNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      Firebase.database().ref(dbMaterialAndManufacturing).child(childSnapshot.key).update({
		        orderNo: arg.orderNo,
		        constructionNo: arg.constructionNo,
		        materialAndManufacturingName: arg.materialAndManufacturingName,
		        unitPrice: parseFloat(arg.unitPrice),
		        num: parseFloat(arg.num),
		        money: parseFloat(arg.money),
		        classification: arg.classification
		      });
			  });
			});
	},
	editInWork(context, arg) {
		Firebase.database().ref(dbInWork)
			.orderByChild('workNo')
			.startAt(arg.workNo).endAt(arg.workNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      Firebase.database().ref(dbInWork).child(childSnapshot.key).update({
		        constructionNo: arg.constructionNo,
		        workName: arg.workName,
		        money: parseFloat(arg.money),
		      });
			  });
			});
	},
	getInWork(context) {
		Firebase.database().ref(dbInWork)
		  .orderByChild('workNo')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      context.commit('setInWork', {
		      	workNo: childSnapshot.val().workNo, 
		      	constructionNo: childSnapshot.val().constructionNo, 
		      	workName: childSnapshot.val().workName, 
		      	money: childSnapshot.val().money, 
		      });
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
      workNo: workNoMax,
      constructionNo: arg.constructionNo,
      workName: arg.workName,
      money: parseFloat(arg.money),
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
	  let updateFlag = 0, orderDetailNo = 1;
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
      deliveryDay: null,
	  });
	  //２　dbOrderDetails　連番
	  for (let i = 0; i < arg.orderDetails.length; i++) {	
	    await Firebase.database().ref(dbOrderDetails).push({
	      orderNo: arg.orderNo,
	      orderDetailNo: orderDetailNo,
	      materialAndManufacturingName: arg.orderDetails[i].materialAndManufacturingName,
	      unitPrice: parseFloat(arg.orderDetails[i].unitPrice),
	      num: parseFloat(arg.orderDetails[i].num),
	      money: parseFloat(arg.orderDetails[i].money),
	      classification: arg.orderDetails[i].classification,
	      constructionNo: arg.orderDetails[i].constructionNo,
		  });
		  orderDetailNo++;
    }
	},
	async getOrder(context) {
	  context.commit('clearOrder');
		await Firebase.database().ref(dbOrder)
		  .orderByChild('orderNo')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      context.commit('setOrder', {
		      	orderNo: childSnapshot.val().orderNo, 
		      	orderDay: childSnapshot.val().orderDay, 
		      	orderName: childSnapshot.val().orderName, 
		      	deliveryDay: childSnapshot.val().deliveryDay
		      });
		    });
	  });
  },
	async getOrderDetails(context, orderNo) {
	  let orderDetails = [];
		await Firebase.database().ref(dbOrderDetails)
		  .orderByChild('orderNo')
		  .startAt(orderNo).endAt(orderNo)
		  .on('value', async function(snapshot) {
		    await snapshot.forEach(async function(childSnapshot) {
		      await orderDetails.push({
		        materialAndManufacturingName: childSnapshot.val().materialAndManufacturingName,
		        unitPrice: childSnapshot.val().unitPrice,
		        num: childSnapshot.val().num,
		        money: childSnapshot.val().money,
		        classification: childSnapshot.val().classification,
		        constructionNo: childSnapshot.val().constructionNo,
		      });
		    });
	    });
	  context.commit('setStateOrderDetails', orderDetails);
  },
	async delOrder(context, orderNo) {
	  let key;
	  let keys = [];
	  //１　dbOrder
		await Firebase.database().ref(dbOrder)
		  .orderByChild('orderNo')
		  .startAt(orderNo).endAt(orderNo)
		  .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
		      key = childSnapshot.key;
		    });
		  });
	  await Firebase.database().ref(dbOrder).child(key).remove();
	  //２　dbOrderDetails
		await Firebase.database().ref(dbOrderDetails)
      .orderByChild('orderNo')
		  .startAt(orderNo).endAt(orderNo)
		  .once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          keys.push(childSnapshot.key);
		    });
		  });
	  for (let i = 0; i < keys.length; i++) {
	    await Firebase.database().ref(dbOrderDetails).child(keys[i]).remove();
  	}
	},
	async setDeliverDay(context, arg) {
	  let key;
	  let materialAndManufacturingNoMax = 0;
	  let orderDetails = [];
	  let keys = [];
		await Firebase.database().ref(dbOrder)
			.orderByChild('orderNo')
			.startAt(arg.orderNo).endAt(arg.orderNo)
			.once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
		      key = childSnapshot.key;
			  });
			});
		await Firebase.database().ref(dbOrder).child(key).update({
			deliveryDay: arg.deliveryDay,
		});
    //材料外注データを作成する。
    //既にデータがあれば、特に処理無し。
    //なお、納品日が空の場合は材料外注データを削除する。
    if (arg.deliveryDay === '') {
			await Firebase.database().ref(dbMaterialAndManufacturing)
			.orderByChild('orderNo')
			.startAt(arg.orderNo).endAt(arg.orderNo)
			.once('value', function(snapshot) {
	      snapshot.forEach(function(childSnapshot) {
			    keys.push(childSnapshot.key);
			  });
			});
			for (let i = 0; i < keys.length; i++) {
			  await Firebase.database().ref(dbConstruction).child(keys[i]).remove();
			}
    } else {
			await Firebase.database().ref(dbOrderDetails)
			  .orderByChild('orderNo')
			  .startAt(arg.orderNo).endAt(arg.orderNo)
			  .once('value', function(snapshot) {
	        snapshot.forEach(function(childSnapshot) {
			      orderDetails.push({
			        orderNo: childSnapshot.val().orderNo,
			        orderDetailNo: childSnapshot.val().orderDetailNo,
			        materialAndManufacturingName: childSnapshot.val().materialAndManufacturingName,
			        unitPrice: childSnapshot.val().unitPrice,
			        num: childSnapshot.val().num,
			        money: childSnapshot.val().money,
			        classification: childSnapshot.val().classification,
			        constructionNo: childSnapshot.val().constructionNo,
			    });
			  });
			});
      //材料外注データの最大連番を取得
			await Firebase.database().ref(dbMaterialAndManufacturing)
			  .orderByChild('materialAndManufacturingNoMax').on('value', function(snapshot) {
			    snapshot.forEach(function(childSnapshot) {
			      if (materialAndManufacturingNoMax < childSnapshot.val().materialAndManufacturingNo) {
			      	materialAndManufacturingNoMax = childSnapshot.val().materialAndManufacturingNo;
			      }
			    })
			  });
		  //新規登録用No（＋1）
		  materialAndManufacturingNoMax += 1;
      //材料外注データを追加する。
      for (let i = 0; i < orderDetails.length; i++) {
		    await Firebase.database().ref(dbMaterialAndManufacturing).push({
		      materialAndManufacturingNo: materialAndManufacturingNoMax,
	        orderNo: orderDetails[i].orderNo,
	        orderDetailNo: orderDetails[i].orderDetailNo,
	        materialAndManufacturingName: orderDetails[i].materialAndManufacturingName,
	        unitPrice: orderDetails[i].unitPrice,
	        num: orderDetails[i].num,
	        money: orderDetails[i].money,
	        classification: orderDetails[i].classification,
	        constructionNo: orderDetails[i].constructionNo,
			  });
			  materialAndManufacturingNoMax += 1;
	    }
	  }
	  context.commit('setStateDeliverDay', arg.deliveryDay);
	},
};