import Firebase from '../assets/firebase-config';
const dbOrder = 'order';
const dbOrderDetails = 'orderDetails';

export const mutations = {
  setOrderOne(state, arg) {
    state.orderNo = arg.orderNo;
    state.orderDay = arg.orderDay;
    state.orderName = arg.orderName;
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
}
export const actions = {
	async commitOrder(context, arg) {
	  let updateFlag = 0, orderDetailNo = 1;
	  let key, keys = [];
		await Firebase.database().ref(dbOrder)
		  .orderByChild('orderNo')
		  .startAt(arg.orderNo).endAt(arg.orderNo)
		  .once('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if(arg.userId === childSnapshot.val().userId && 
		        arg.orderNo === childSnapshot.val().orderNo) {
		      	  updateFlag = 1;
		      	  console.log('既存の注文番号のため、注文データを更新します。');
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
	        if(childSnapshot.val().userId === arg.userId) {
			      key = childSnapshot.key;
			    }
			  });
			});
		  await Firebase.database().ref(dbOrder).child(key).remove();
		  //２　dbOrderDetails
			await Firebase.database().ref(dbOrderDetails)
			.orderByChild('orderNo')
			.startAt(arg.orderNo).endAt(arg.orderNo)
			.once('value', function(snapshot) {
	      snapshot.forEach(function(childSnapshot) {
	        if(childSnapshot.val().userId === arg.userId) {
  	        keys.push(childSnapshot.key);
          }
	  		});
			});
			for (let i = 0; i < keys.length; i++) {
			  await Firebase.database().ref(dbOrderDetails).child(keys[i]).remove();
			}
	  }
	  //登録する
	  //１　dbOrder
    await Firebase.database().ref(dbOrder).push({
      userId: arg.userId,
      orderNo: arg.orderNo,
      orderDay: arg.orderDay,
      orderName: arg.orderName,
      deliveryDay: null,
	  });
	  //２　dbOrderDetails　連番
	  for (let i = 0; i < arg.orderDetails.length; i++) {	
	    await Firebase.database().ref(dbOrderDetails).push({
	      userId: arg.userId,
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
	async getOrderDetails(context, orderNo) {
	  let orderDetails = [];
		await Firebase.database().ref(dbOrderDetails)
		  .orderByChild('orderNo')
		  .startAt(arg.orderNo).endAt(arg.orderNo)
		  .on('value', async function(snapshot) {
		    await snapshot.forEach(async function(childSnapshot) {
		      if(arg.userId === childSnapshot.val().userId) {
			      await orderDetails.push({
			        materialAndManufacturingName: childSnapshot.val().materialAndManufacturingName,
			        unitPrice: childSnapshot.val().unitPrice,
			        num: childSnapshot.val().num,
			        money: childSnapshot.val().money,
			        classification: childSnapshot.val().classification,
			        constructionNo: childSnapshot.val().constructionNo,
			      });
			    }
		    });
	    });
	  context.commit('setStateOrderDetails', orderDetails);
  },
	async getOrderOne(context, arg) {
		await Firebase.database().ref(dbOrder)
		  .orderByChild('orderNo')
		  .startAt(arg.orderNo).endAt(arg.orderNo)
		  .once('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if(arg.userId === childSnapshot.val().userId) { 
			      context.commit('setOrderOne', {
			      	orderNo: arg.orderNo, 
			      	orderDay: childSnapshot.val().orderDay, 
			      	orderName: childSnapshot.val().orderName, 
			      });
			    }
		    });
	  });
  },
};