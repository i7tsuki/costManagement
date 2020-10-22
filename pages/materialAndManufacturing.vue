<template>
  <div class="container">
    <div>
      <Logo />
      <label>工事番号</label><input type="text" v-model="constructionNo">
      <label>名称</label><input type="text" v-model="name">
      <label>金額</label><input type="text" v-model="money">
      <input type="radio" value="材料" name="class" v-model="classification">材料
      <input type="radio" value="外注" name="class" v-model="classification">外注
      <button @click="add">追加</button>
      <table>
      	<tr>
      	  <th>No</th>
      		<th>工事番号</th>
      		<th>名称</th>
      		<th>金額</th>
      		<th>区分</th>
      	</tr>
      	<tr v-for="m in materialAndManufacturing" v-bind:key="m.no">
	      	<td>{{ m.no }}</td>
      		<td>{{ m.constructionNo }}</td>
      		<td>{{ m.name }}</td>
      		<td>{{ m.money }}
      		<td>{{ m.classification }}</td>
      		<td><button @click="edit(m.no, m.constructionNo, m.name, m.money, m.classification)">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header" v-model="editNo">No: {{ m.no }}</h3>
      		  <h3 slot="body">
      		    <p>工事番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
      		    <p>名称</p>
      		    <p><input type="text" v-model="editName"></p>
      		    <p>金額</p>
      		    <p><input type="text" v-model="editMoney"></p>
      		    <p>区分</p>
				      <input type="radio" value="材料" name="editClass" v-model="editClassification">材料
				      <input type="radio" value="外注" name="editClass" v-model="editClassification">外注
				    </h3>
            <h3 slot="footer">
              <button @click="editOK(m.no)">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
      		<td><button @click="del(m.no)">削除</button></td>
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
			name: '',
			money: 0,
			classification: '材料',
			isShowModal: false,
    }
  },
  methods: {
  	add() {
  	  if (this.name === '' || this.money <= 0) {
  	    console.log('正しく入力されていません。');
  	    return ;
  	  }
  		this.$store.dispatch('addMaterialAndManufacturing', {
  			constructionNo: this.constructionNo,
  			name: this.name,
  			money: this.money,
  			classification: this.classification
  		});
  		this.$store.dispatch('getMaterialAndManufacturing');
  	}, 
  	edit(no, constructionNo, name, money, classification) {
  		this.editConstructionNo = constructionNo;
  		this.editName = name;
  		this.editMoney = money;
  		this.editClassification = classification;
  		this.isShowModal = true;
  	}, 
  	editOK(no) {
  	  this.$store.dispatch('editMaterialAndManufacturing', {
  	  	no: no, 
  	  	constructionNo: this.editConstructionNo,
  	  	name: this.editName,
  	  	money: this.editMoney,
  	  	classification: this.editClassification
  	  });
  		this.isShowModal = false;
  		this.$store.dispatch('getMaterialAndManufacturing');
  	},
  	editCancel() {
  		this.isShowModal = false;
  	},
  	del(no) {
  	  this.$store.dispatch('delMaterialAndManufacturing', no);
  	  this.$store.dispatch('getMaterialAndManufacturing');
  	}
  },
	created() {
		this.$store.dispatch('getMaterialAndManufacturing');
	},
	computed: {
	  materialAndManufacturing: function() {
	    return this.$store.state.materialAndManufacturing
	  }
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
