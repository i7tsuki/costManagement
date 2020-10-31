<template>
  <div class="container">
    <div>
      <Logo />
      <label>工事番号</label><input type="text" v-model="constructionNo">
      <label>作業内容</label><input type="text" v-model="workName">
      <label>金額</label><input type="text" v-model="money">
      <button @click="add">追加</button>
      <table>
      	<tr>
      		<th>工事番号</th>
      		<th>作業内容</th>
      		<th>金額</th>
      	</tr>
      	<tr v-for="w in inWork" v-bind:key="w.workNo">
      		<td>{{ w.constructionNo }}</td>
      		<td>{{ w.workName }}</td>
      		<td>{{ w.money }}
      		<td><button @click="edit(w.workNo, w.constructionNo, w.workName, w.money)">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header">No: {{ editNo }}</h3>
      		  <h3 slot="body">
      		    <p>工事番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
      		    <p>名称</p>
      		    <p><input type="text" v-model="editWorkName"></p>
      		    <p>金額</p>
      		    <p><input type="text" v-model="editMoney"></p>
				    </h3>
            <h3 slot="footer">
              <button @click="editOK">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
          <td><button @click="del(w.workNo)">削除</button></td>
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
		  workName: '',
		  money: 0,
		  inWork: [],
		  editConstructionNo: '',
		  editWorkName: '',
		  editMoney: 0,
		  isShowModal: false,
    }
  },
	async created() {
	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
	  await this.$store.commit('clearInWork');
		await this.$store.dispatch('getInWork');
		this.inWork = this.$store.state.inWork;
	},
  methods: {
  	async add() {
  	  if (this.workName === '') {
  	    console.log('作業内容を入力してください。');
  	    return;
  	  }
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('clearInWork');
  		await this.$store.dispatch('addInWork', {
  			constructionNo: this.constructionNo,
  			workName: this.workName,
  			money: this.money
  		});
  		await this.$store.commit('clearInWork');
  		await this.$store.dispatch('getInWork');
  		this.inWork = this.$store.state.inWork;
  	}, 
  	edit(workNo, constructionNo, workName, money) {
  	  this.editNo = workNo;
  	  this.editConstructionNo = constructionNo;
  	  this.editWorkName = workName;
  	  this.editMoney = money;
  	  this.isShowModal = true;
  	},
  	async editOK() {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('clearInWork');
  	  await this.$store.dispatch('editInWork', {
  	  	workNo: this.editNo,
  	  	constructionNo: this.editConstructionNo,
  	  	workName: this.workName,
  	  	money: this.editMoney,
  	  });
  		this.isShowModal = false;
  		//データ更新前にローカルデータリセット：Duplicate keys detected対策
  		await this.$store.commit('clearInWork');
  		await this.$store.dispatch('getInWork');
  		this.inWork = this.$store.state.inWork;
  	},
  	editCancel() {
  	  this.isShowModal = false;
  	},
  	async del(workNo) {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('clearInWork');
  	  await this.$store.dispatch('delInWork', workNo);
  	  await this.$store.commit('clearInWork');
  	  await this.$store.dispatch('getInWork');
  	  this.inWork = this.$store.state.inWork;
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
