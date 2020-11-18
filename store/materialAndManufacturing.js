import Firebase from '../assets/firebase-config';
const dbMaterialAndManufacturing = 'materialAndManufacturing';

export const state = () => ({
  materialAndManufacturing: [],
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
}
export const actions = {
	getMaterialAndManufacturing(context, userId) {
		Firebase.database().ref(dbMaterialAndManufacturing)
		  .orderByChild('materialAndManufacturingNo')
		  .on('value', function(snapshot) {
		    snapshot.forEach(function(childSnapshot) {
		      if(userId === childSnapshot.val().userId) {
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
			    }
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
      userId: arg.userId,
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
};