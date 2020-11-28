<template>
  <div class="container">
    <div class="materialAndManufacturing">
      <div class="input-form">
      　<p v-if="errMsg" class="err-msg">{{ message }}</p>
		    <label>注文番号</label><input type="text" v-model="orderNo">
		    <label>製品番号</label><input type="text" v-model="constructionNo">
		    <label>名称</label><input type="text" v-model="materialAndManufacturingName">
		    <label>単価</label><input type="text" v-model="unitPrice">
		    <label>数量</label><input type="text" v-model="num">
		    <label>金額</label><input type="text" v-model="money">
		    <input type="radio" value="材料" name="class" v-model="classification">材料
		    <input type="radio" value="外注" name="class" v-model="classification">外注
	    	<button @click="add" class="add-button">追加</button>
	    </div>
	    <table>
	    	<tr>
	    	  <th>注文番号</th>
	    		<th>製品番号</th>
	    		<th>名称</th>
	    		<th>単価</th>
	    		<th>数量</th>
	    		<th>金額</th>
	    		<th>区分</th>
	    	</tr>
	    	<tr v-for="m in materialAndManufacturing" v-bind:key="m.materialAndManufacturingNo">
	       	<td class="td-data">{{ m.orderNo }}</td>
	    		<td class="td-data">{{ m.constructionNo }}</td>
	    		<td class="td-data">{{ m.materialAndManufacturingName }}</td>
	    		<td class="td-data">{{ m.unitPrice }}
	    		<td class="td-data">{{ m.num }}
	    		<td class="td-data">{{ m.money }}
	    		<td class="td-data">{{ m.classification }}</td>
	    		<td><button @click="edit(m.materialAndManufacturingNo, m.orderNo, m.constructionNo, m.materialAndManufacturingName, m.unitPrice, m.num, m.money, m.classification)" class="panel-button">編集</button></td>
	    		<EditModal v-if="isShowModal" @close="isShowModal = false">
	    		  <h3 slot="header"></h3>
	    		  <h3 slot="body">
	    		    <p v-if="errFormMsg" class="err-msg">{{ formMessage }}</p>
	    		    <p>注文番号</p>
	    		    <p><input type="text" v-model="editOrderNo"></p>
	    		    <p>製品番号</p>
	    		    <p><input type="text" v-model="editConstructionNo"></p>
	    		    <p>名称</p>
	    		    <p><input type="text" v-model="editMaterialAndManufacturingName"></p>
	    		    <p>単価</p>
	    		    <p><input type="text" v-model="editUnitPrice"></p>
	    		    <p>数量</p>
	    		    <p><input type="text" v-model="editNum"></p>
	    		    <p>金額</p>
	    		    <p><input type="text" v-model="editMoney"></p>
	    		    <p>区分</p>
				      <input type="radio" value="材料" name="editClass" v-model="editClassification">材料
				      <input type="radio" value="外注" name="editClass" v-model="editClassification">外注
				    </h3>
	          <h3 slot="footer">
	            <button @click="editOK(m.materialAndManufacturingNo)" class="add-button">更新</button>
	            <button @click="editCancel" class="add-button">キャンセル</button>
	          </h3>
	        </EditModal>
	    		<td><button @click="del(m.materialAndManufacturingNo)" class="panel-button">削除</button></td>
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
		  orderNo: '',
			constructionNo: '',
			materialAndManufacturingName: '',
			unitPrice: 0,
			num: 0,
			money: 0,
			classification: '材料',
			isShowModal: false,
			materialAndManufacturing: [],
			editNo: '',
			editOrderNo: '',
			editConstructionNo: '',
			editMaterialAndManufacturingName: '',
			editUnitPricey: 0,
			editNum: 0,
			editMoney: 0,
			editClassification: '材料',
		  errMsg: false,
		  message: null,
		  errFormMsg: false,
		  formMessage: null,
    }
  },
	async created() {
	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
		await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing', this.$store.state.user.userId);
		this.materialAndManufacturing = this.$store.state.materialAndManufacturing.materialAndManufacturing;
	},
  methods: {
  	setErrMsg(msg) {
  	  if (msg !== '') {
  	    this.errMsg = true;
  	    this.message = msg;
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
  	  if (this.materialAndManufacturingName == '') {
  	    this.setErrMsg('名称が入力されていません。');
  	    return ;
  	  }
  	  if(this.unitPrice === '') {
  		  this.setErrMsg('単価を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.unitPrice)) {
  		  this.setErrMsg('単価を正しく入力してください。');
  			return;
  	  }
  	  if(this.num === '') {
  		  this.setErrMsg('数量を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.num)) {
  		  this.setErrMsg('数量を正しく入力してください。');
  			return;
  	  }
  	  if(this.money === '') {
  		  this.setErrMsg('金額を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.money)) {
  		  this.setErrMsg('金額を正しく入力してください。');
  			return;
  	  }
  	  this.setErrMsg('');
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  		await this.$store.dispatch('materialAndManufacturing/addMaterialAndManufacturing', {
  		  userId: this.$store.state.user.userId,
  		  orderNo: this.orderNo, 
  			constructionNo: this.constructionNo,
  			materialAndManufacturingName: this.materialAndManufacturingName,
  			unitPrice: this.unitPrice, 
  			num: this.num,
  			money: this.money,
  			classification: this.classification
  		});
  		await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  		await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing', this.$store.state.user.userId);
  		this.materialAndManufacturing = this.$store.state.materialAndManufacturing.materialAndManufacturing;
  	}, 
  	edit(materialAndManufacturingNo, orderNo, constructionNo, materialAndManufacturingName, unitPrice, num, money, classification) {
  	  this.editNo = materialAndManufacturingNo;
  	  this.editOrderNo = orderNo;
  		this.editConstructionNo = constructionNo;
  		this.editMaterialAndManufacturingName = materialAndManufacturingName;
  		this.editUnitPrice = unitPrice;
  		this.editNum = num;
  		this.editMoney = money;
  		this.editClassification = classification;
  		this.isShowModal = true;
  	}, 
  	async editOK() {
  	  if (this.editMaterialAndManufacturingName == '') {
  	    this.setErrFormMsg('名称が入力されていません。');
  	    return ;
  	  }
  	  if(this.editUnitPrice === '') {
  		  this.setErrFormMsg('単価を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editUnitPrice)) {
  		  this.setErrFormMsg('単価を正しく入力してください。');
  			return;
  	  }
  	  if(this.editNum === '') {
  		  this.setErrFormMsg('数量を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editNum)) {
  		  this.setErrFormMsg('数量を正しく入力してください。');
  			return;
  	  }
  	  if(this.editMoney === '') {
  		  this.setErrFormMsg('金額を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editMoney)) {
  		  this.setErrFormMsg('金額を正しく入力してください。');
  			return;
  	  }
  	  this.setErrFormMsg('');
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  	  await this.$store.dispatch('materialAndManufacturing/editMaterialAndManufacturing', {
  	    userId: this.$store.state.user.userId,
  	  	materialAndManufacturingNo: this.editNo,
  	  	orderNo: this.editOrderNo, 
  	  	constructionNo: this.editConstructionNo,
  	  	materialAndManufacturingName: this.editMaterialAndManufacturingName,
  	  	unitPrice: this.editUnitPrice,
  	  	num: this.editNum, 
  	  	money: this.editMoney,
  	  	classification: this.editClassification
  	  });
  		this.isShowModal = false;
  		//データ更新前にローカルデータリセット：Duplicate keys detected対策
  		await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  		await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing', this.$store.state.user.userId);
  		this.materialAndManufacturing = this.$store.state.materialAndManufacturing.materialAndManufacturing;
  	},
  	editCancel() {
  	  this.setErrFormMsg('');
  		this.isShowModal = false;
  	},
  	async del(materialAndManufacturingNo) {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  	  await this.$store.dispatch('materialAndManufacturing/delMaterialAndManufacturing', materialAndManufacturingNo);
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  	  await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing', this.$store.state.user.userId);
  	  this.materialAndManufacturing = this.$store.state.materialAndManufacturing.materialAndManufacturing;
  	},
  },
}
</script>

<style>
.materialAndManufacturing {
  width: 70%;
  margin: 0 auto;
}
.materialAndManufacturing .input-form {
  border: solid 1px #C0C0C0;
  padding: 10px;
}
.materialAndManufacturing .err-msg {
  color: red;
}
</style>
