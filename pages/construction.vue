<template>
  <div class="container">
    <div>
      <Logo />
      <label>工事番号</label><input type="text" v-model="constructionNo">
      <label>名称</label><input type="text" v-model="constructionName">
      <label>受注日</label><input type="date" v-model="orderDay">
      <label>受注金額</label><input type="text" v-model="money">
      <label>出荷日</label><input type="date" v-model="shipDay">
      <button @click="add">追加</button>
      <table>
      	<tr>
      		<th>工事番号</th>
      		<th>名称</th>
      		<th>受注日</th>
      		<th>受注金額</th>
      		<th>出荷日</th>
      	</tr>
      	<tr v-for="c in construction" v-bind:key="c.constructionNo">
      		<td>{{ c.constructionNo }}</td>
      		<td>{{ c.constructionName }}</td>
      		<td>{{ c.orderDay }}</td>
      		<td>{{ c.money }}
      		<td>{{ c.shipDay }}
      		<td><button @click="cost(c.constructionNo)">原価</button></td>
      		<EditModal v-if="isShowCostModal" @close="isShowCostModal = false">
      		  <h3 slot="header">
      		    <p>{{ c.constructionNo }}</p>
      		  </h3>
      		  <h3 slot="body">
      		    <p></p>
      		    <p>材料</p>
      		    <p>{{ costMaterial }}</p>
      		    <p>外注</p>
      		    <p>{{ costManufacturing }}</p>
      		    <p>内作</p>
      		    <p>{{ costInWork }}</p>
      		    <p>合計</p>
      		    <p>{{ totalCost }}</p>
				    </h3>
            <h3 slot="footer">
              <router-link to="costDetails"><button @click="costDetail(c.constructionNo)">明細</button></router-link>
              <button @click="costClose">閉じる</button>
            </h3>
          </EditModal>
      		<td><button @click="edit(c.constructionNo, c.constructionName, c.orderDay, c.money, c.shipDay)">編集</button></td>
      		<EditModal v-if="isShowEditModal" @close="isShowEditModal = false">
      		  <h3 slot="header">
      		    <p></p>
      		  </h3>
      		  <h3 slot="body">
      		    <p>工事番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
      		    <p>名称</p>
      		    <p><input type="text" v-model="editConstructionName"></p>
      		    <p>受注日</p>
      		    <p><input type="date" v-model="editOrderDay"></p>
      		    <p>受注金額</p>
      		    <p><input type="text" v-model="editMoney"></p>
      		    <p>出荷日</p>
      		    <p><input type="date" v-model="editShipDay"></p>
				    </h3>
            <h3 slot="footer">
              <button @click="editOK(c.constructionNo)">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
      		<td><button @click="del(c.constructionNo)">削除</button></td>
      	</tr>
      </table>
    </div>
  </div>
</template>

<script>
import EditModal from '~/components/EditModal';

export default {
  components: { EditModal },
	data: function() {
		return {
			constructionNo: '',
			constructionName: '',
			orderDay: '',
			money: 0,
			shipDay: '',
			editConstructionNo: '',
			editConstructionName: '',
			editOrderDay: '',
			editMoney: 0,
			editShipDay: '',
			isShowEditModal: false,
			isShowCostModal: false,
    }
  },
  methods: {
  	async add() {
  	  if (this.constructionName === '') {
  	    console.log('正しく入力されていません。');
  	    return ;
  	  }
  	  await this.$store.commit('clearConstruction');
  		await this.$store.dispatch('addConstructionNo', {
  			constructionNo: this.constructionNo,
  			constructionName: this.constructionName,
  			orderDay: this.orderDay,
  			money: this.money,
  			shipDay: this.shipDay,
  		});
  		await this.$store.commit('clearConstruction');
  		await this.$store.dispatch('getConstructionNo');
  	}, 
  	cost(constructionNo) {
     	this.$store.dispatch('getCost', constructionNo);
  		this.isShowCostModal = true;		
  	},
  	costClose() {
  	  this.isShowCostModal = false;
  	},
  	edit(constructionNo, constructionName, orderDay, money, shipDay) {
  		this.editConstructionNo = constructionNo;
  		this.editConstructionName = constructionName;
  		this.editOrderDay = orderDay;
  		this.editMoney = money;
  		this.editShipDay = shipDay;
  		this.isShowEditModal = true;
  	}, 
  	async editOK(constructionNo) {
  	  await this.$store.commit('clearConstruction');
  	  await this.$store.dispatch('editConstructionNo', {
  	    beforeConstructionNo: constructionNo,
  	  	afterConstructionNo: this.editConstructionNo,
  	  	constructionName: this.editConstructionName,
  	  	orderDay: this.editOrderDay,
  	  	money: this.editMoney,
  	  	shipDay: this.editShipDay,
  	  });
  		this.isShowEditModal = false;
  		this.$store.dispatch('getConstructionNo');
  	},
  	editCancel() {
  		this.isShowEditModal = false;
  	},
  	async del(constructionNo) {
  	  await this.$store.commit('clearConstruction');
  	  await this.$store.dispatch('delConstructionNo', constructionNo);
  	  await this.$store.commit('clearConstruction');
  	  this.$store.dispatch('getConstructionNo');
  	},
  	costDetail(constructionNo) {
  		this.$store.commit('setconstructionNo', constructionNo);
  	},
  },
	created() {
		this.$store.dispatch('getConstructionNo');
	},
	computed: {
	  construction: function() {
	    return this.$store.state.construction
	  },
	  costMaterial: function() {
	    return this.$store.state.costMaterial;
	  },
	  costManufacturing: function() {
	    return this.$store.state.costManufacturing;
	  },
	  costInWork: function() {
	    return this.$store.state.costInWork;
	  },
	  totalCost: function() {
	    return this.costMaterial + this.costManufacturing + this.costInWork;
	  },
	}
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
