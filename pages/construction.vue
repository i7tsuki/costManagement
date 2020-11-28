<template>
  <div class="container">
    <div class="construction">
      <div class="input-form">
        <p v-if="errMsg" class="err-msg">{{ message }}</p>
	      <label>製品番号</label><input type="text" v-model="constructionNo">
	      <label>名称</label><input type="text" v-model="constructionName">
	      <label>受注金額</label><input type="text" v-model="money">
	      <label>出荷日</label><input type="date" v-model="shipDay">
	      <button @click="add" class="add-button">追加</button>
	    </div>
      <table>
      	<tr>
      		<th>製品番号</th>
      		<th>名称</th>
      		<th>受注金額</th>
      		<th>出荷日</th>
      	</tr>
      	<tr v-for="c in construction" v-bind:key="c.constructionNo">
      		<td class="td-data">{{ c.constructionNo }}</td>
      		<td class="td-data">{{ c.constructionName }}</td>
      		<td class="td-data">{{ c.money }}
      		<td class="td-data">{{ c.shipDay }}
      		<td><router-link to="/costDetails"><button @click="costDetail(c.constructionNo)" class="panel-button">原価</button></router-link></td>
      		<td><button @click="edit(c.constructionNo, c.constructionName, c.money, c.shipDay)" class="panel-button">編集</button></td>
      		<EditModal v-if="isShowEditModal" @close="isShowEditModal = false">
      		  <h3 slot="header"></h3>
      		  <h3 slot="body">
      		    <p v-if="errFormMsg" class="err-msg">{{ formMessage }}</p>
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
              <button @click="editOK(c.constructionNo)" class="add-button">更新</button>
              <button @click="editCancel" class="add-button">キャンセル</button>
            </h3>
          </EditModal>
      		<td><button @click="del(c.constructionNo)" class="panel-button">削除</button></td>
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
		  errMsg: false,
		  message: null,
		  errFormMsg: false,
		  formMessage: null
    }
  },
	async created() {
	  await this.$store.commit('construction/clearConstruction');
		await this.$store.dispatch('construction/getConstructionNo', this.$store.state.user.userId);
		this.construction = this.$store.state.construction.construction;
	},
  methods: {
  	setErrMsg(msg) {
  	  if(msg !== '') {
  	    this.errMsg = true;
  	    this.message = msg;
  	    return ;
  	  } else {
  	    this.errMsg = false;
  	  }
  	},
  	setErrFormMsg(msg) {
  	  if (msg !== '') {
  	    this.errFormMsg = true;
  	    this.formMessage = msg;
  	  } else {
  	    this.errFormMsg = false;
  	  }
  	},
  	async add() {
  	  if (this.constructionNo === '') {
  	    this.setErrMsg('製品番号が入力されていません。');
  	    return;
  	  }
  	  if (this.constructionName === '') {
  	    this.setErrMsg('名称が入力されていません。');
  	    return;
  	  }
  	  if(this.money === '') {
  		  this.setErrMsg('受注金額を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.money)) {
  		  this.setErrMsg('受注金額を正しく入力してください。');
  			return;
  	  }
  	  this.setErrMsg('');
  	  await this.$store.commit('construction/clearConstruction');
  	  try {
	  		await this.$store.dispatch('construction/addConstructionNo', {
	  		  userId: this.$store.state.user.userId,
	  			constructionNo: this.constructionNo,
	  			constructionName: this.constructionName,
	  			money: this.money,
	  			shipDay: this.shipDay,
	  		});
	    } catch (error) {
	      this.setErrMsg(error);
	      return;
      }
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
  	  if (this.editConstructionNo === '') {
  	    this.setErrFormMsg('製品番号が入力されていません。');
  	    return;
  	  }
  	  if (this.editConstructionName === '') {
  	    this.setErrFormMsg('名称が入力されていません。');
  	    return;
  	  }
  	  if(this.editMoney === '') {
  		  this.setErrFormMsg('受注金額を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editMoney)) {
  		  this.setErrFormMsg('受注金額を正しく入力してください。');
  			return;
  	  }
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
  	  this.setErrFormMsg('');
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
.construction {
  width: 70%;
  margin: 0 auto;
}
.construction .input-form {
  border: solid 1px #C0C0C0;
  padding: 10px;
}
.construction .err-msg {
  color: red;
}
</style>
