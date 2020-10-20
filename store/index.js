import Firebase from '../assets/firebase-config'
import Vuex from 'vuex'

const materialAndManufacturing = 'materialAndManufacturing'

export const state = () => ({
  materialAndManufacturing: null,
  inWorks: null,
})
export const mutations = {
	addMaterialAndManufacturing(state, arg) {
	  let noMax = 0;
	  //既に登録されているNoの最大値取得
		Firebase.database().ref(materialAndManufacturing)
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
    Firebase.database().ref(materialAndManufacturing).push({
      no: noMax,
      constructionNo: arg.constructionNo,
      money: parseFloat(arg.money),
      classification: arg.classification,
	  });
	},
	inWorksAdd(state, arg) {
	}
}