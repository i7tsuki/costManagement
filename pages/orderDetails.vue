<template>
  <div class="container">
    <div>
      <Logo />
      <button @click="commit()">登録</button>
      <p>注文日</p>
      <input type="text" v-model="orderDay">
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
      	<tr v-for="(o, index) in order" v-bind:key="o.orderNo">
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
</template>

<script>
import EditModal from '~/components/EditModal';

export default {
  components: { EditModal },
	data: function() {
		return {
			order: [],
			orderDay: '',
			orderNo: '',
			orderName: '',
			newName: '',
			newUnitPrice: 0,
			newNum: 0,
			newMoney: 0,
			newClassification: '材料',
			newConstructionNo: '',
			isShowModal: false,
    }
  },
  methods: {
  	addOrder() {
  	  this.order.push({
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
  		  orderData: this.order
  		});
  		console.log('登録しました。');
  	},
  	del(index) {
  		this.order.splice(index, 1);
  	},
  	edit(index) {
			this.editName = this.order[index].materialAndManufacturingName;
			this.editUnitPrice = this.order[index].unitPrice;
			this.editNum = this.order[index].num;
			this.editMoney = this.order[index].money;
			this.editClassification = this.order[index].classification;
			this.editConstructionNo = this.order[index].constructionNo;
  		this.isShowModal = true;
  	},
  	editCancel() {
  	  this.isShowModal = false;
  	},
  	editOK(index) {
			this.order[index].materialAndManufacturingName = this.editName;
			this.order[index].unitPrice = this.editUnitPrice;
			this.order[index].num = this.editNum;
			this.order[index].money = this.editMoney;
			this.order[index].classification = this.editClassification;
			this.order[index].constructionNo = this.editConstructionNo;
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
</style>
