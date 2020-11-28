<template>
  <div class="container">
    <div class="cost-details">
      <div class="card">
	      <h1 class="cost">製品番号：{{ constructionNo }}</h1>
	      <div class="cost-sum">
		      <h3>受注金額：{{ constructionMoney }}</h3>
		      <h3>原価：{{ costAll }}</h3>
		      <h3>粗利：{{ costConstruction }}</h3>
		    </div>
	    </div>
	    <div class="card">
	      <h2 class="material">材料</h2>
	      <div class="center">
		      <table>
		      	<tr>
		      	  <th>注文番号</th>
		      		<th>名称</th>
		      		<th>単価</th>
		      		<th>数量</th>
		      		<th>金額</th>
		      	</tr>
		      	<tr v-for="material in costDetailMaterial" v-bind:key="material.materialNo">
		          <td class="td-data">{{ material.orderNo }}</td>
		      		<td class="td-data">{{ material.materialName }}</td>
		      		<td class="td-data">{{ material.unitPrice }}</td>
		      		<td class="td-data">{{ material.num }}</td>
		      		<td class="td-data">{{ material.money }}</td>
		      	</tr>
		      </table>
		    </div>
		    <h3 class="subtotal">小計：{{ costMaterial }}</h3>
		  </div>
		  <div class="card">
	      <h2 class="manufacturing">外注</h2>
	      <div class="center">
		      <table>
		      	<tr>
		      	  <th>注文番号</th>
		      		<th>名称</th>
		      		<th>単価</th>
		      		<th>数量</th>
		      		<th>金額</th>
		      	</tr>
		      	<tr v-for="manufacturing in costDetailManufacturing" v-bind:key="manufacturing.manufacturingNo">
		      	  <td class="td-data">{{ manufacturing.orderNo }}</td>
		      		<td class="td-data">{{ manufacturing.manufacturingName }}</td>
		      		<td class="td-data">{{ manufacturing.unitPrice }}</td>
		      		<td class="td-data">{{ manufacturing.num }}</td>
		      		<td class="td-data">{{ manufacturing.money }}</td>
		      	</tr>
		      </table>
		    </div>
	      <h3 class="subtotal">小計：{{ costManufacturing }}</h3>
	    </div>
	    <div class="card">
	      <h2 class="direct-work">直接工</h2>
	      <div class="center">
			    <table>
			    	<tr>
			    	  <th>作業日</th>
			    		<th>作業内容</th>
			    		<th>作業時間[h]</th>
			    	</tr>
			    	<tr v-for="dwork in costDetailDirectWork" v-bind:key="dwork.workNo">
			    	  <td class="td-data">{{ dwork.workDay }}</td>
			    		<td class="td-data">{{ dwork.workName }}</td>
			    		<td class="td-data">{{ dwork.time }}</td>
			    	</tr>
			    </table>
		    </div>
	      <div class="center">
		      <table>
		      	<tr>
		      		<th>年</th>
		      		<th>作業時間[h]</th>
		      		<th>総給料</th>
		      		<th>総作業時間[h]</th>
		      		<th>作業時間＊総給料/総作業時間</th>
		      	</tr>
		      	<tr v-for="cdws in costDirectWorkSalary" v-bind:key="cdws.year">
		      		<td class="td-data">{{ cdws.year }}</td>
		      		<td class="td-data">{{ cdws.time }}</td>
		      		<td class="td-data">{{ cdws.salary }}</td>
		      		<td class="td-data">{{ cdws.workTime }}</td>
		      		<td class="td-data">{{ cdws.time * cdws.salary / cdws.workTime }}</td>
		      	</tr>
		      </table>
		    </div>
	      <h3 class="subtotal">小計：{{ costDirectWork }}</h3>
	    </div>
	    <div class="card">
	      <h2 class="in-direct-work">間接工</h2>
	      <h3>出荷日に属する年に出荷した製品一覧</h3>
	      <div class="center">
		      <table>
		      	<tr>
		      	  <th>製品番号</th>
		      	  <th>名称</th>
		      		<th>出荷日</th>
		      		<th>受注金額</th>
		      	</tr>
		      	<tr v-for="c in anotherConstruction" v-bind:key="c.constructionNo">
		      		<td class="td-data">{{ c.constructionNo }}</td>
		      		<td class="td-data">{{ c.constructionName }}</td>
		      		<td class="td-data">{{ c.shipDay }}</td>
		      		<td class="td-data">{{ c.money }}</td>
		      	</tr>
		      </table>
		    </div>
	      <h3>間接工給料</h3>
	      <div class="center">
		      <table>
		      	<tr>
		      		<th>年</th>
		      		<th>給料</th>
		      	</tr>
		      	<tr>
		      		<td class="td-data">{{ shipYear }}</td>
		      		<td class="td-data">{{ inDirectSalary }}</td>
		      	</tr>
		      </table>
		    </div>
	      <h3 class="subtotal">小計(按分金額)：{{ costInDirectWork }}</h3>
	    </div>
    </div>
  </div>
</template>

<script>
export default {
	data: function() {
		return {
		  constructionNo: '',
		  costDetailDirectWork: [],
		  costDirectWorkSalary: [],
		  constructionMoney: 0,
		  costConstruction: 0,
		  anotherConstruction: [],
		  shipYear: '',
		  inDirectSalary: 0,
    }
  },
	async beforeCreate() {
	  //受注金額取得
	  await this.$store.dispatch('costDetails/getConstructionInfo', { 
	    userId: this.$store.state.user.userId, 
	    constructionNo: this.$store.state.construction.constructionNo, 
	  });
	  this.constructionMoney = this.$store.state.costDetails.constructionMoney;
		//材料・外注・内作直接工取得
		await this.$store.dispatch('costDetails/getCostDetails', {
		  userId: this.$store.state.user.userId, 
		  constructionNo: this.$store.state.construction.constructionNo,
		});
		this.costDetailDirectWork = this.$store.state.costDetails.costDetailDirectWork;
		//該当の直接工取得
		await this.$store.dispatch('costDetails/getCostDirectWorkSalary', {
		  userId: this.$store.state.user.userId, 
		  constructionNo: this.$store.state.construction.constructionNo, 
		  costDetailDirectWork: this.costDetailDirectWork
		});
		this.costDirectWorkSalary = this.$store.state.costDetails.costDirectWorkSalary;
		//出荷日に属する年に出荷した全製品
		await this.$store.dispatch('costDetails/getShipYearAndAnotherConstruction', {
		  userId: this.$store.state.user.userId, 
		  constructionNo: this.$store.state.construction.constructionNo,
		});
    this.anotherConstruction = this.$store.state.costDetails.anotherConstruction;
		//間接工給料取得
		await this.$store.dispatch('costDetails/getInDirectSalary', {
		  userId: this.$store.state.user.userId, 
		  shipYear: this.$store.state.costDetails.shipYear,
		});
		//原価計算
		this.costConstruction = this.constructionMoney;
		this.constructionNo = this.$store.state.construction.constructionNo;
		this.shipYear = this.$store.state.costDetails.shipYear;
		this.inDirectSalary = this.$store.state.costDetails.inDirectSalary;
	},
	computed: {
	  costDetailMaterial: function() {
	    return this.$store.state.costDetails.costDetailMaterial
	  },
	  costDetailManufacturing: function() {
	    return this.$store.state.costDetails.costDetailManufacturing
	  },
	  costMaterial: function() {
	  	return this.$store.state.costDetails.costMaterial;
	  },
	  costManufacturing: function() {
	  	return this.$store.state.costDetails.costManufacturing;
	  },
	  costDirectWork: function() {
	    let cost = 0;
	    for (let i = 0; i < this.costDirectWorkSalary.length; i++) {
	      if(this.costDirectWorkSalary[i].workTime !== 0) {
		      cost += this.costDirectWorkSalary[i].time * this.costDirectWorkSalary[i].salary / this.costDirectWorkSalary[i].workTime;
		    }
	    }
	  	return cost;
	  },
	  costInDirectWork: function() {
	    let cost = 0;
	    let allConstructionMoney = 0;
	    for (let i = 0; i < this.anotherConstruction.length; i++) {
	      allConstructionMoney += this.anotherConstruction[i].money;
	    }
	    cost = this.inDirectSalary * this.constructionMoney / allConstructionMoney;
	  	return cost;
	  },
	  costAll: function() {
	    return this.costMaterial + this.costManufacturing + this.costDirectWork + this.costInDirectWork;
	  },
	}
}
</script>

<style>
.cost-details {
  width: 70%;
  margin: 0 auto;
}
.cost-details .card {
  background: #fffafa;
  box-shadow: 10px 10px 15px -10px;
  margin-bottom: 45px;
}
.cost-details .cost {
  border-left: 10px solid #75FF70;
  padding: 15px;
  font-size: 1.1rem;
}
.cost-details .material, 
.cost-details .manufacturing {
  border-left: 10px solid #00C1FF;
  padding: 15px;
  font-size: 1.0rem;
}
.cost-details .direct-work {
  border-left: 10px solid #D2B51A;
  padding: 15px;
  font-size: 1.0rem;
}
.cost-details .in-direct-work {
  border-left: 10px solid #FFFF1C;
  padding: 15px;
  font-size: 1.0rem;
}
.cost-details h3 {
  text-align: center;
}
.cost-details p,
.center {
  display: flex;
  justify-content: center;
}
</style>
