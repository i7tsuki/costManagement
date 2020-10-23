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
      	  <th>No</th>
      		<th>工事番号</th>
      		<th>名称</th>
      		<th>受注金額</th>
      	</tr>
      	<tr v-for="c in construction" v-bind:key="c.constructionNo">
      		<td>{{ c.constructionNo }}</td>
      		<td>{{ c.name }}</td>
      		<td>{{ c.money }}
      		<td><button @click="edit(c.constructionNo, c.name, c.money)">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
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
			isShowModal: false,
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
  	edit(constructionNo, name, money) {
  		this.editConstructionNo = constructionNo;
  		this.editName = name;
  		this.editMoney = money;
  		this.isShowModal = true;
  	}, 
  	editOK(constructionNo) {
  	  this.$store.dispatch('editConstructionNo', {
  	  	constructionNo: this.editConstructionNo,
  	  	name: this.editName,
  	  	money: this.editMoney,
  	  });
  		this.isShowModal = false;
  		this.$store.dispatch('getConstructionNo');
  	},
  	editCancel() {
  		this.isShowModal = false;
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
