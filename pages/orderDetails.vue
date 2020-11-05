<template>
  <div class="container">
    <div>
      <Logo />
      <button @click="commit()">登録</button>
      <p>注文日</p>
      <input type="date" v-model="orderDay">
      <p>注文番号</p>
      <input type="text" v-model="orderNo">
      <p>注文名</p>
      <input type="text" v-model="orderName">
      <table>
      	<tr>
      	  <th>No</th>
      		<th>名称</th>
      		<th>単価</th>
      		<th>数量</th>
      		<th>金額</th>
      		<th>区分</th>
      		<th>工事番号</th>
      	</tr>
      	<tr v-for="(o, index) in orderDetails" v-bind:key="index">
      	  <td>{{ index + 1 }}</td>
      		<td>{{ o.materialAndManufacturingName }}</td>
      		<td>{{ o.unitPrice }}</td>
      		<td>{{ o.num }}</td>
      		<td>{{ o.money }}
  		    <td>{{ o.classification }}
      		<td>{{ o.constructionNo }}</td>
      		<td><button @click="edit(index)">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header"></h3>
      		  <h3 slot="body">
      		    <p>名称</p>
      		    <p><input type="text" v-model="editName"></p>
      		    <p>単価</p>
      		    <p><input type="text" v-model="editUnitPrice"></p>
      		    <p>数量</p>
      		    <p><input type="text" v-model="editNum"></p>
      		    <p>金額</p>
      		    <p><input type="text" v-model="editMoney"></p>
      		    <p>区分</p>
				      <input type="radio" value="材料" name="editClass" v-model="editClassification">材料
				      <input type="radio" value="外注" name="editClass" v-model="editClassification">外注
      		    <p>工事番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
				    </h3>
            <h3 slot="footer">
              <button @click="editOK(index)">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
      		<td><button @click="del(index)">削除</button></td>
      	</tr>
      </table>
      <div id="input-form">
	      <p>名称</p>
	      <input type="text" v-model="newName">
	      <p>単価</p>
	      <input type="text" v-model="newUnitPrice">
	      <p>数量</p>
	      <input type="text" v-model="newNum">
	      <p>金額</p>
	      <input type="text" v-model="newMoney">
	      <p>区分</p>
	      <input type="radio" value="材料" name="newClass" v-model="newClassification">材料
	      <input type="radio" value="外注" name="newClass" v-model="newClassification">外注
	      </select>
	      <p>工事番号</p>
	      <input type="text" v-model="newConstructionNo">
	      <button @click="addOrder">明細追加</button>
      </div>
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
			orderDay: '',
			orderName: '',
			newName: '',
			newUnitPrice: 0,
			newNum: 0,
			newMoney: 0,
			newClassification: '材料',
			newConstructionNo: '',
			isShowModal: false,
			selectRow: null,
			orderDetails: [],
    }
  },
  async created() {
    if (this.$store.state.orderNo !== '') {
      this.orderNo = this.$store.state.orderNo;
      await this.$store.dispatch('getOrderOne', this.orderNo);
      await this.$store.dispatch('getOrderDetails', this.orderNo);
      this.orderDetails = this.$store.state.orderDetails;
      this.orderName = this.$store.state.orderName;
      this.orderDay = this.$store.state.orderDay;
    }
  },
  destroyed() {
    this.$store.commit('setOrderNo', '');
  },
  methods: {
  	addOrder() {
  	  this.orderDetails.push({
  	    materialAndManufacturingName: this.newName,
  	    unitPrice: this.newUnitPrice,
  	    num: this.newNum,
  	    money: this.newMoney,
  			classification: this.newClassification,
  	    constructionNo: this.newConstructionNo,
  	  });
  	},
  	commit() {
  		if (this.orderNo === '') {
  			console.log('注文番号が入力されていません。');
  			return;
  		}
  		this.$store.dispatch('commitOrder', {
  		  orderDay: this.orderDay,
  		  orderNo: this.orderNo, 
  		  orderName: this.orderName,
  		  orderDetails: this.orderDetails
  		});
  		console.log('登録しました。');
  		this.$router.push('/order');
  	},
  	del(index) {
  		this.orderDetails.splice(index, 1);
  	},
  	edit(index) {
			this.editName = this.orderDetails[index].materialAndManufacturingName;
			this.editUnitPrice = this.orderDetails[index].unitPrice;
			this.editNum = this.orderDetails[index].num;
			this.editMoney = this.orderDetails[index].money;
			this.editClassification = this.orderDetails[index].classification;
			this.editConstructionNo = this.orderDetails[index].constructionNo;
			this.selectRow = index;
  		this.isShowModal = true;
  	},
  	editCancel() {
  	  this.isShowModal = false;
  	},
  	editOK(index) {
  	  console.log(this.selectRow);
			this.orderDetails[this.selectRow].materialAndManufacturingName = this.editName;
			this.orderDetails[this.selectRow].unitPrice = this.editUnitPrice;
			this.orderDetails[this.selectRow].num = this.editNum;
			this.orderDetails[this.selectRow].money = this.editMoney;
			this.orderDetails[this.selectRow].classification = this.editClassification;
			this.orderDetails[this.selectRow].constructionNo = this.editConstructionNo;
  	  this.isShowModal = false;
  	},
  },
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

#input-form {
  border: 1px solid;
  margin-top: 30px;
}
</style>
