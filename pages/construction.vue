<template>
  <div class="container">
    <div class="section">
      <label>製品番号</label><input type="text" v-model="constructionNo">
      <label>名称</label><input type="text" v-model="constructionName">
      <label>受注金額</label><input type="text" v-model="money">
      <label>出荷日</label><input type="date" v-model="shipDay">
      <button @click="add">追加</button>
      <table>
      	<tr>
      		<th>製品番号</th>
      		<th>名称</th>
      		<th>受注金額</th>
      		<th>出荷日</th>
      	</tr>
      	<tr v-for="c in construction" v-bind:key="c.constructionNo">
      		<td>{{ c.constructionNo }}</td>
      		<td>{{ c.constructionName }}</td>
      		<td>{{ c.money }}
      		<td>{{ c.shipDay }}
      		<td><router-link to="costDetails"><button @click="costDetail(c.constructionNo)">原価</button></router-link></td>
      		<td><button @click="edit(c.constructionNo, c.constructionName, c.money, c.shipDay)">編集</button></td>
      		<EditModal v-if="isShowEditModal" @close="isShowEditModal = false">
      		  <h3 slot="header">
      		    <p></p>
      		  </h3>
      		  <h3 slot="body">
      		    <p>製品番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
      		    <p>名称</p>
      		    <p><input type="text" v-model="editConstructionName"></p>
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
		  construction: [],
			constructionNo: '',
			constructionName: '',
			money: 0,
			shipDay: '',
			editConstructionNo: '',
			editConstructionName: '',
			editMoney: 0,
			editShipDay: '',
			isShowEditModal: false,
    }
  },
	async created() {
	  await this.$store.commit('construction/clearConstruction');
		await this.$store.dispatch('construction/getConstructionNo', this.$store.state.user.userId);
		this.construction = this.$store.state.construction.construction;
	},
  methods: {
  	async add() {
  	  if (this.constructionNo === '' || this.constructionName === '') {
  	    console.log('正しく入力されていません。');
  	    return ;
  	  }
  	  await this.$store.commit('construction/clearConstruction');
  		await this.$store.dispatch('construction/addConstructionNo', {
  		  userId: this.$store.state.user.userId,
  			constructionNo: this.constructionNo,
  			constructionName: this.constructionName,
  			money: this.money,
  			shipDay: this.shipDay,
  		});
  		await this.$store.commit('construction/clearConstruction');
  		await this.$store.dispatch('construction/getConstructionNo', this.$store.state.user.userId);
  		this.construction = this.$store.state.construction.construction;
  	}, 
  	costClose() {
  	  this.isShowCostModal = false;
  	},
  	edit(constructionNo, constructionName, money, shipDay) {
  		this.editConstructionNo = constructionNo;
  		this.editConstructionName = constructionName;
  		this.editMoney = money;
  		this.editShipDay = shipDay;
  		this.isShowEditModal = true;
  	}, 
  	async editOK(constructionNo) {
  	  await this.$store.commit('construction/clearConstruction');
  	  await this.$store.dispatch('construction/editConstructionNo', {
  	    userId: this.$store.state.user.userId, 
  	    beforeConstructionNo: constructionNo,
  	  	afterConstructionNo: this.editConstructionNo,
  	  	constructionName: this.editConstructionName,
  	  	money: this.editMoney,
  	  	shipDay: this.editShipDay,
  	  });
  		this.isShowEditModal = false;
  		await this.$store.commit('construction/clearConstruction');
  		this.$store.dispatch('construction/getConstructionNo', this.$store.state.user.userId);
  		this.construction = this.$store.state.construction.construction;
  	},
  	editCancel() {
  		this.isShowEditModal = false;
  	},
  	async del(constructionNo) {
  	  await this.$store.commit('construction/clearConstruction');
  	  await this.$store.dispatch('construction/delConstructionNo', {
  	    userId: this.$store.state.user.userId, 
  	    constructionNo: constructionNo
  	  });
  	  await this.$store.commit('construction/clearConstruction');
  	  this.$store.dispatch('construction/getConstructionNo', this.$store.state.user.userId);
  	  this.construction = this.$store.state.construction.construction;
  	},
  	costDetail(constructionNo) {
  		this.$store.commit('construction/setConstructionNo', constructionNo);
  	},
  },
}
</script>

<style>
.container {
  width: 70%;
  margin: 0 auto;
}
.section {
  margin: 0 auto;
}
</style>
