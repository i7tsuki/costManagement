<template>
  <div class="container">
    <div class="section">
	    <label>注文番号</label><input type="text" v-model="orderNo">
	    <label>製品番号</label><input type="text" v-model="constructionNo">
	    <label>名称</label><input type="text" v-model="materialAndManufacturingName">
	    <label>単価</label><input type="text" v-model="unitPrice">
	    <label>数量</label><input type="text" v-model="num">
	    <label>金額</label><input type="text" v-model="money">
	    <input type="radio" value="材料" name="class" v-model="classification">材料
	    <input type="radio" value="外注" name="class" v-model="classification">外注
	    <button @click="add">追加</button>
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
	       	<td>{{ m.orderNo }}</td>
	    		<td>{{ m.constructionNo }}</td>
	    		<td>{{ m.materialAndManufacturingName }}</td>
	    		<td>{{ m.unitPrice }}
	    		<td>{{ m.num }}
	    		<td>{{ m.money }}
	    		<td>{{ m.classification }}</td>
	    		<td><button @click="edit(m.materialAndManufacturingNo, m.orderNo, m.constructionNo, m.materialAndManufacturingName, m.unitPrice, m.num, m.money, m.classification)">編集</button></td>
	    		<EditModal v-if="isShowModal" @close="isShowModal = false">
	    		  <h3 slot="header">No: {{ editNo }}</h3>
	    		  <h3 slot="body">
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
	            <button @click="editOK(m.materialAndManufacturingNo)">更新</button>
	            <button @click="editCancel">キャンセル</button>
	          </h3>
	        </EditModal>
	    		<td><button @click="del(m.materialAndManufacturingNo)">削除</button></td>
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
    }
  },
	async created() {
	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
		await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing');
		this.materialAndManufacturing = this.$store.state.materialAndManufacturing.materialAndManufacturing;
	},
  methods: {
  	async add() {
  	  if (this.materialAndManufacturingName === '') {
  	    console.log('正しく入力されていません。');
  	    return ;
  	  }
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  		await this.$store.dispatch('materialAndManufacturing/addMaterialAndManufacturing', {
  		  orderNo: this.orderNo, 
  			constructionNo: this.constructionNo,
  			materialAndManufacturingName: this.materialAndManufacturingName,
  			unitPrice: this.unitPrice, 
  			num: this.num,
  			money: this.money,
  			classification: this.classification
  		});
  		await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  		await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing');
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
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  	  await this.$store.dispatch('materialAndManufacturing/editMaterialAndManufacturing', {
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
  		await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing');
  		this.materialAndManufacturing = this.$store.state.materialAndManufacturing.materialAndManufacturing;
  	},
  	editCancel() {
  		this.isShowModal = false;
  	},
  	async del(materialAndManufacturingNo) {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  	  await this.$store.dispatch('materialAndManufacturing/delMaterialAndManufacturing', materialAndManufacturingNo);
  	  await this.$store.commit('materialAndManufacturing/clearMaterialAndManufacturing');
  	  await this.$store.dispatch('materialAndManufacturing/getMaterialAndManufacturing');
  	  this.materialAndManufacturing = this.$store.state.materialAndManufacturing.materialAndManufacturing;
  	},
  },
}
</script>
.container {
  width: 70%;
  margin: 0 auto;
}
.section {
  margin: 0 auto;
}
</style>
