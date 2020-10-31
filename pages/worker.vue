<template>
  <div class="container">
    <div>
      <Logo />
      <table>
      	<tr>
      	  <th>名前</th>
      	  <th>年</th>
      	  <th>月</th>
      	  <th>給料</th>
      		<th>区分</th>
      	</tr>
      	<tr>
      		<td>直接工</td>
      		<td>{{ directWork }}</td>
      		<td><button @click="edit('directWork')">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header">直接工</h3>
      		  <h3 slot="body">
      		    <p>一時間当たりの金額</p>
      		    <p><input type="text" v-model="money"></p>
 				    </h3>
            <h3 slot="footer">
              <button @click="editOK('directWork')">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
      　</tr>
      　<tr>
      		<td>間接工</td>
      		<td>{{ indirectWork }}</td>
      		<td><button @click="edit('indirectWork')">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header">間接工</h3>
      		  <h3 slot="body">
      		    <p>一時間当たりの金額</p>
      		    <p><input type="text" v-model="money"></p>
 				    </h3>
            <h3 slot="footer">
              <button @click="editOK('indirectWork')">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
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
		  directWork: 0,
		  indirectWork: 0,
    }
  },
	created() {
		this.$store.dispatch('getInWork');
		this.inWork = this.$store.state.inWork;
	},
  methods: {
  	edit(workNo, constructionNo, workName, time, classification) {
  	  this.editNo = workNo;
  	  this.editConstructionNo = constructionNo;
  	  this.editWorkName = workName;
  	  this.editTime = time;
  	  this.editClassification = classification;
  	  this.isShowModal = true;
  	},
  	async editOK() {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('clearInWork');
  	  await this.$store.dispatch('editInWork', {
  	  	workNo: this.editNo,
  	  	constructionNo: this.editConstructionNo,
  	  	workName: this.workName,
  	  	time: this.editTime,
  	  	classification: this.editClassification,
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
