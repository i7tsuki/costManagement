import Firebase from '../assets/firebase-config';
const dbMaterialAndManufacturing = 'materialAndManufacturing';
const dbInWork = 'inWork';
const dbConstruction = 'construction';
const dbWorker = 'worker';

export const state = () => ({
  costMaterial: 0,
  costManufacturing: 0,
  costInWork: 0,
  costDetailMaterial: [],
  costDetailManufacturing: [],
  costDetailInWork: [],
  costDirectWorkSalary: [],
  constructionMoney: 0,
  inDirectSalary: 0,
  anotherConstruction: [],
});
export const mutations = {
  setCost(state, arg) {
	  state.costMaterial = arg.material;
	  state.costManufacturing = arg.manufacturing;
	  state.costInWork = arg.inWork;
  },
	setCostDetail(state, arg) {
	  state.costMaterial = arg.material;
	  state.costManufacturing = arg.manufacturing;
	  state.costDetailMaterial = arg.materialData;
	  state.costDetailManufacturing = arg.manufacturingData;
	  state.costDetailDirectWork = arg.directWorkData;
	},
  setCostDirectWorkSalary(state, years) {
    state.costDirectWorkSalary = years;
  },
  setInDirectSalary(state, inDirectSalary) {
    state.inDirectSalary = inDirectSalary;
  },
  setConstructionInfo(state, money) {
    state.constructionMoney = money;
  },
  setShipYearAndAnotherConstruction(state, arg) {
    state.anotherConstruction = arg.constructionData;
    state.shipYear = arg.shipYear;
  },
}
export const actions = {
	async getCostDetails(context, arg) {
	  let material = 0, manufacturing = 0, directWork = 0;
		let materialData =[], manufacturingData = [], directWorkData = [];
		const getCostMaterialAndManufacturing =
		   Firebase.database().ref(dbMaterialAndManufacturing)
			  .orderByChild('constructionNo')
			  .startAt(arg.constructionNo).endAt(arg.constructionNo)
			  .once('value', async function(snapshot) {
			    await snapshot.forEach(function(childSnapshot) {
            if(arg.userId === childSnapshot.val().userId) {
			        if(childSnapshot.val().classification = '材料') {
			          material += childSnapshot.val().money;
			          materialData.push({
			            materialNo: childSnapshot.val().materialAndManufacturingNo,
			            orderNo: childSnapshot.val().orderNo,
			          	materialName: childSnapshot.val().materialAndManufacturingName,
			          	unitPrice: childSnapshot.val().unitPrice,
			          	num: childSnapshot.val().num,
			          	money: childSnapshot.val().money,
			          });
			        } else if (childSnapshot.val().classification = '外注') {
			          manufacturing += childSnapshot.val().money;
			          manufacturingData.push({
			            manufacturingNo: childSnapshot.val().materialAndManufacturingNo,
			            orderNo: childSnapshot.val().orderNo,
			          	manufacturingName: childSnapshot.val().materialAndManufacturingName,
			          	unitPrice: childSnapshot.val().unitPrice,
			          	num: childSnapshot.val().num,
			          	money: childSnapshot.val().money
			          });
			        }
			      }
			    });
			  });
		const getCostDirectWork =
		  Firebase.database().ref(dbInWork)
			  .orderByChild('constructionNo')
			  .startAt(arg.constructionNo).endAt(arg.constructionNo)
			  .once('value', async function(snapshot) {
			    await snapshot.forEach(function(childSnapshot) {
			      if(arg.userId === childSnapshot.val().userId) {
		          directWorkData.push({
		            workNo: childSnapshot.val().workNo,
		            workDay: childSnapshot.val().workDay,
		          	workName: childSnapshot.val().workName,
		          	time: childSnapshot.val().time,
		          });
		        }
			    });
			  });
	  await Promise.all([getCostMaterialAndManufacturing, getCostDirectWork]).then(() => {
			context.commit('setCostDetail', {
			  material: material,
			  manufacturing: manufacturing,
			  materialData: materialData,
			  manufacturingData: manufacturingData,
			  directWorkData: directWorkData
			});
		});
	},
	async getCostDirectWorkSalary(context, arg) {
	  let years = [];
	  let getYears, findYear;
	  //年ごとの工数
	  for(let i = 0; i < arg.costDetailDirectWork.length; i++) {
	    findYear = 0;
	    getYears = arg.costDetailDirectWork[i].workDay.substr(0, 4);
	    for(let y = 0; y < years.length; y++) {
	      if (years[y].year === getYears) {
	        years[y].time += arg.costDetailDirectWork[i].time;
	        findYear = 1;
	        break;
	      }
	    }
	    if (findYear === 0) {
	      years.push({
	        year: getYears,
	        time: arg.costDetailDirectWork[i].time,
	        salary: 0,
	        workTime: 0,
	      });
	    }
	  }
	  //年ごとの給料
	  for(let y = 0; y < years.length; y++) {
			await Firebase.database().ref(dbWorker)
				.orderByChild('year')
				.startAt(years[y].year).endAt(years[y].year)
				.once('value', async function(snapshot) {
				  await snapshot.forEach(function(childSnapshot) {
				    if(arg.userId === childSnapshot.val().userId && 
				      childSnapshot.val().year === years[y].year && 
				      childSnapshot.val().classification === '直接工') { 
				        years[y].salary += childSnapshot.val().salary;
				        years[y].workTime += childSnapshot.val().workTime;
				      }
				  });
				});
		}
		context.commit('setCostDirectWorkSalary', years);
	},
	async getConstructionInfo(context, arg) {
	  let money;
		await Firebase.database().ref(dbConstruction)
		  .orderByChild('constructionNo')
		  .startAt(arg.constructionNo).endAt(arg.constructionNo)
		  .once('value', async function(snapshot) {
        await snapshot.forEach(function(childSnapshot) {
          if(arg.userId === childSnapshot.val().userId) {
  		      money = childSnapshot.val().money;
  		    }
		    });
		  });
	  context.commit('setConstructionInfo', money);
	},
	async getShipYearAndAnotherConstruction(context, arg) {
	  let shipDay, shipYear;
	  let constructionData = [];
		await Firebase.database().ref(dbConstruction)
		  .orderByChild('constructionNo')
		  .startAt(arg.constructionNo).endAt(arg.constructionNo)
		  .once('value', async function(snapshot) {
        await snapshot.forEach(function(childSnapshot) {
          if(arg.userId === childSnapshot.val().userId) {
  		      shipDay = childSnapshot.val().shipDay;
  		    }
		    });
	 	  });
	  if (typeof shipDay === 'undefined' ||  shipDay === '') {
	    console.log('製品出荷日が確定していないため、間接工の計算ができません。');
			context.commit('setShipYearAndAnotherConstruction', {
			  constructionData: constructionData,
			  shipYear: null,
			});
	    return;
	  } 
	  shipYear = shipDay.substr(0, 4);
		//出荷日に属する年に出荷したすべての製品
		await Firebase.database().ref(dbConstruction)
		  .orderByChild('shipDay')
		  .startAt(shipYear).endAt(shipYear + '\uf8ff')
		  .on('value', async function(snapshot) {
        await snapshot.forEach(function(childSnapshot) {
          if(arg.userId === childSnapshot.val().userId) {
			      constructionData.push({
			        constructionNo: childSnapshot.val().constructionNo,
			        constructionName: childSnapshot.val().constructionName,
			        shipDay: childSnapshot.val().shipDay,
			        money: childSnapshot.val().money,
			      });
			    }
		    });
	 	  });
		context.commit('setShipYearAndAnotherConstruction', {
		  constructionData: constructionData,
		  shipYear: shipYear,
		});
	},
	async getInDirectSalary(context, arg) {
	  let inDirectSalary = 0;
		await Firebase.database().ref(dbWorker)
		  .orderByChild('year')
		  .startAt(arg.shipYear).endAt(arg.shipYear)
		  .on('value', function(snapshot) {
	      snapshot.forEach(function(childSnapshot) {
	        if(arg.userId === childSnapshot.val().userId) {
				    if (childSnapshot.val().classification === '間接工') {
				      inDirectSalary += childSnapshot.val().salary;
				    }
				  }
			  });
			});
	 	context.commit('setInDirectSalary', inDirectSalary);
	},
};