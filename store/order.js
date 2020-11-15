import Firebase from '../assets/firebase-config';
const dbOrder = 'order';
const dbOrderDetails = 'orderDetails';
const dbMaterialAndManufacturing = 'materialAndManufacturing';

export const state = () => ({
  orderXXX: [],
  deliveryDay: '',
  orderNo: '',
  orderDetails: [],
  orderDay: null,
  orderName: '',
})
export const mutations = {
  clearOrder(state) {
    console.log(1111);
    console.log(state.orderXXX);
    if (state.orderXXX.length > 0) {
      console.log(state.orderXXX[0].orderNo);
    }
    state.orderXXX = null;
    state.orderXXX = [];
    console.log(2222);
  	console.log(state.orderXXX[0]);
  	console.log(state.orderXXX);
  	console.log(state.orderXXX.length);
    console.log(4444);
  },
  setStateDeliverDay(state, deliveryDay) {
    state.deliveryDay = deliveryDay;  
  },
  setOrder(state, arg) {
    state.orderXXX.push({
      userId: arg.userId,
      orderNo: arg.orderNo,
      orderDay: arg.orderDay,
      orderName: arg.orderName,
      deliveryDay: arg.deliveryDay,
    });
  },
  setOrderNo(state, orderNo) {
    state.orderNo = orderNo;
  },
}
export const actions = {
	async getOrder(context) {
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
	},};