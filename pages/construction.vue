<template>
  <div class="container">
    <div>
      <Logo />
      <label>工事番号</label><input type="text" v-model="constructionNo">
      <label>名称</label><input type="text" v-model="name">
      <label>受注金額</label><input type="text" v-model="money">
      <button @click="add">追加</button>
      <table>
      	<tr>
      		<th>工事番号</th>
      		<th>名称</th>
      		<th>受注金額</th>
      	</tr>
      	<tr v-for="c in construction" v-bind:key="c.constructionNo">
      		<td>{{ c.constructionNo }}</td>
      		<td>{{ c.name }}</td>
      		<td>{{ c.money }}
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
              <button @click="costClose">閉じる</button>
            </h3>
          </EditModal>
      		<td><button @click="edit(c.constructionNo, c.name, c.money)">編集</button></td>
      		<EditModal v-if="isShowEditModal" @close="isShowEditModal = false">
      		  <h3 slot="header">
      		    <p></p>
      		  </h3>
      		  <h3 slot="body">
      		    <p>工事番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
      		    <p>名称</p>
      		    <p><input type="text" v-model="editName"></p>
      		    <p>金額</p>
      		    <p><input type="text" v-model="editMoney"></p>
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
			name: '',
			money: 0,
			isShowEditModal: false,
			isShowCostModal: false,
    }
  },
  methods: {
  	add() {
  	  if (this.name === '' || this.money <= 0) {
  	    console.log('正しく入力されていません。');
  	    return ;
  	  }
  		this.$store.dispatch('addConstructionNo', {
  			constructionNo: this.constructionNo,
  			name: this.name,
  			money: this.money,
  		});
  		this.$store.dispatch('getConstructionNo');
  	}, 
  	cost(constructionNo) {
     	this.$store.dispatch('getCost', constructionNo);
  		this.isShowCostModal = true;		
  	},
  	costClose() {
  	  this.isShowCostModal = false;
  	},
  	edit(constructionNo, name, money) {
  		this.editConstructionNo = constructionNo;
  		this.editName = name;
  		this.editMoney = money;
  		this.isShowEditModal = true;
  	}, 
  	editOK(constructionNo) {
  	  this.$store.dispatch('editConstructionNo', {
  	    beforeConstructionNo: constructionNo,
  	  	afterConstructionNo: this.editConstructionNo,
  	  	name: this.editName,
  	  	money: this.editMoney,
  	  });
  		this.isShowEditModal = false;
  		this.$store.dispatch('getConstructionNo');
  	},
  	editCancel() {
  		this.isShowEditModal = false;
  	},
  	del(constructionNo) {
  	  this.$store.dispatch('delConstructionNo', constructionNo);
  	  this.$store.dispatch('getConstructionNo');
  	}
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
