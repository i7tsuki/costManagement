<template>
  <div class="container">
    <div class="orderDetails">
      <button @click="commit()" class="add-button">登録</button>
      <p v-if="errMsg" class="err-msg">{{ message }}</p>
      <div class>
	      <label>注文日</label>
	      <input type="date" v-model="orderDay">
	      <label>注文番号</label>
	      <input type="text" v-model="orderNo">
	      <label>注文名</label>
	      <input type="text" v-model="orderName">
	    </div>
      <table>
      	<tr>
      	  <th>No</th>
      		<th>名称</th>
      		<th>単価</th>
      		<th>数量</th>
      		<th>金額</th>
      		<th>区分</th>
      		<th>製品番号</th>
      	</tr>
      	<tr v-for="(o, index) in orderDetails" v-bind:key="index">
      	  <td class="td-data">{{ index + 1 }}</td>
      		<td class="td-data">{{ o.materialAndManufacturingName }}</td>
      		<td class="td-data">{{ o.unitPrice }}</td>
      		<td class="td-data">{{ o.num }}</td>
      		<td class="td-data">{{ o.money }}
  		    <td class="td-data">{{ o.classification }}
      		<td class="td-data">{{ o.constructionNo }}</td>
      		<td><button @click="edit(index)" class="panel-button">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header"></h3>
      		  <h3 slot="body">
      		    <p v-if="errEditMsg" class="err-msg">{{ editMessage }}</p>
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
      		    <p>製品番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
				    </h3>
            <h3 slot="footer">
              <button @click="editOK(index)" class="add-button">更新</button>
              <button @click="editCancel" class="add-button">キャンセル</button>
            </h3>
          </EditModal>
      		<td><button @click="del(index)" class="panel-button">削除</button></td>
      	</tr>
      </table>
      <div class="input-form">
        <p v-if="errFormMsg" class="err-msg">{{ formMessage }}</p>
        <div class="input-box">
		      <label>名称</label>
		      <input type="text" v-model="newName">
		      <label>単価</label>
		      <input type="text" v-model="newUnitPrice">
		      <label>数量</label>
		      <input type="text" v-model="newNum">
		      <label>金額</label>
		      <input type="text" v-model="newMoney">
		      <input type="radio" value="材料" name="newClass" v-model="newClassification">材料
		      <input type="radio" value="外注" name="newClass" v-model="newClassification">外注
		      </select>
		      <label>製品番号</label>
	      	<input type="text" v-model="newConstructionNo">
	      </div>
	      <p><button @click="addOrder" class="add-button">明細追加</button></p>
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
		  errMsg: false,
		  errFormMsg: false,
		  message: null,
		  formMessage: null,
		  errEditMsg: false,
		  editMessage: null,
    }
  },
  async created() {
    if (this.$store.state.orderDetails.orderNo !== '') {
      this.orderNo = this.$store.state.orderDetails.orderNo;
      await this.$store.dispatch('orderDetails/getOrderOne', {
        orderNo: this.orderNo,
        userId: this.$store.state.user.userId,
      });
      await this.$store.dispatch('orderDetails/getOrderDetails', {
        orderNo: this.orderNo,
        userId: this.$store.state.user.userId,
      });
      this.orderDetails = this.$store.state.orderDetails.orderDetails;
      this.orderName = this.$store.state.orderDetails.orderName;
      this.orderDay = this.$store.state.orderDetails.orderDay;
    }
  },
  destroyed() {
    this.$store.commit('orderDetails/setOrderNo', '');
  },
  methods: {
  	addOrder() {
  	  if(this.newName.trim() === '') {
  		  this.setErrMsgForm('名称が入力されていません。');
  			return;
  	  }
  	  if(this.newUnitPrice === '') {
  		  this.setErrMsgForm('単価を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.newUnitPrice)) {
  		  this.setErrMsgForm('単価を正しく入力してください。');
  			return;
  	  }
  	  if(this.newNum === '') {
  		  this.setErrMsgForm('数量を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.newNum)) {
  		  this.setErrMsgForm('数量を正しく入力してください。');
  			return;
  	  }
  	  if(this.newMoney === '') {
  		  this.setErrMsgForm('金額を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.newMoney)) {
  		  this.setErrMsgForm('金額を正しく入力してください。');
  			return;
  	  }
  	  this.setErrMsgForm('');
  	  this.orderDetails.push({
  	    materialAndManufacturingName: this.newName,
  	    unitPrice: this.newUnitPrice,
  	    num: this.newNum,
  	    money: this.newMoney,
  			classification: this.newClassification,
  	    constructionNo: this.newConstructionNo,
  	  });
  	},
  	async commit() {
  		if (this.orderNo === '') {
  		  this.setErrMsg('注文番号が入力されていません。');
  			return;
  		}
  		if (this.orderName === '') {
  		  this.setErrMsg('注文名が入力されていません。');
  			return;
  		}
  		await this.$store.dispatch('orderDetails/commitOrder', {
  		  userId: this.$store.state.user.userId,
  		  orderDay: this.orderDay,
  		  orderNo: this.orderNo, 
  		  orderName: this.orderName,
  		  orderDetails: this.orderDetails
  		});
  		if(this.$store.state.orderDetails.cancelFlag === 1) {
  		  console.log('注文データ更新をキャンセルしました。');
  		  return;
  		} 
  		this.$router.push('/order');
  	},
  	setErrMsg(msg) {
  		if (msg !== '') {
  		  this.errMsg = true;
  			this.message = msg;
  		} else {
  		  this.errMsg = false;
  		}
  	},
  	setErrMsgForm(msg) {
  		if (msg !== '') {
  		  this.errFormMsg = true;
  			this.formMessage = msg;
  		} else {
  		  this.errFormMsg = false;
  		}
  	},
  	setErrMsgEdit(msg) {
  		if (msg !== '') {
  		  this.errEditMsg = true;
  			this.editMessage = msg;
  		} else {
  		  this.errEditMsg = false;
  		}
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
  	  this.setErrMsgEdit('');
  	},
  	editOK(index) {
  	  if(this.editName.trim() === '') {
  		  this.setErrMsgEdit('名称が入力されていません。');
  			return;
  	  }
  	  if(this.editUnitPrice === '') {
  		  this.setErrMsgEdit('単価を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editUnitPrice)) {
  		  this.setErrMsgEdit('単価を正しく入力してください。');
  			return;
  	  }
  	  if(this.editNum === '') {
  		  this.setErrMsgEdit('数量を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editNum)) {
  		  this.setErrMsgEdit('数量を正しく入力してください。');
  			return;
  	  }
  	  if(this.editMoney === '') {
  		  this.setErrMsgEdit('金額を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editMoney)) {
  		  this.setErrMsgEdit('金額を正しく入力してください。');
  			return;
  	  }
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
.orderDetails {
  width: 70%;
  margin: 0 auto;
}
.orderDetails table {
  margin-top: 15px;
}
.orderDetails .input-form {
  margin-top: 30px;
  border: solid 1px #C0C0C0;
}
.orderDetails .input-form p {
  display: flex;
  justify-content: center;
}
.orderDetails .err-msg {
  color: red;
}
</style>
