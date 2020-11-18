<template>
  <div class="container">
    <div class="section">
      <label>製品番号</label><input type="text" v-model="constructionNo">
      <label>作業日</label><input type="date" v-model="workDay">
      <label>作業内容</label><input type="text" v-model="workName">
      <label>作業時間[h]</label><input type="text" v-model="time">
      <button @click="add">追加</button>
      <table>
      	<tr>
      		<th>製品番号</th>
      		<th>作業日</th>
      		<th>作業内容</th>
      		<th>作業時間[h]</th>
      	</tr>
      	<tr v-for="w in inWork" v-bind:key="w.workNo">
      		<td>{{ w.constructionNo }}</td>
      		<td>{{ w.workDay }}</td>
      		<td>{{ w.workName }}</td>
      		<td>{{ w.time }}</td>
      		<td><button @click="edit(w.workNo, w.constructionNo, w.workDay, w.workName, w.time)">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header">No: {{ editNo }}</h3>
      		  <h3 slot="body">
      		    <p>製品番号</p>
      		    <p><input type="text" v-model="editConstructionNo"></p>
      		    <p>作業日</p>
      		    <p><input type="date" v-model="editWorkDay"></p>
      		    <p>作業内容</p>
      		    <p><input type="text" v-model="editWorkName"></p>
      		    <p>作業時間[h]</p>
      		    <p><input type="text" v-model="editTime"></p>
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
		  workDay: '',
		  workName: '',
		  time: 0,
		  inWork: [],
		  editConstructionNo: '',
		  editWorkDay: '',
		  editWorkName: '',
		  editTime: 0,
		  isShowModal: false,
    }
  },
	async created() {
	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
	  await this.$store.commit('inWork/clearInWork');
		await this.$store.dispatch('inWork/getInWork', this.$store.state.user.userId);
		this.inWork = this.$store.state.inWork.inWork;
	},
  methods: {
  	async add() {
  	  if (this.workName === '') {
  	    console.log('作業内容を入力してください。');
  	    return;
  	  }
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('inWork/clearInWork');
  		await this.$store.dispatch('inWork/addInWork', {
  		  userId: this.$store.state.user.userId,
  			constructionNo: this.constructionNo,
  			workDay: this.workDay,
  			workName: this.workName,
  			time: this.time,
  		});
  		await this.$store.commit('inWork/clearInWork');
  		await this.$store.dispatch('inWork/getInWork', this.$store.state.user.userId);
  		this.inWork = this.$store.state.inWork.inWork;
  	}, 
  	edit(workNo, constructionNo, workDay, workName, time) {
  	  this.editNo = workNo;
  	  this.editConstructionNo = constructionNo;
  	  this.editWorkDay = workDay;
  	  this.editWorkName = workName;
  	  this.editTime = time;
  	  this.isShowModal = true;
  	},
  	async editOK() {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('inWork/clearInWork');
  	  await this.$store.dispatch('inWork/editInWork', {
  	  	workNo: this.editNo,
  	  	constructionNo: this.editConstructionNo,
  	  	workDay: this.editWorkDay,
  	  	workName: this.editWorkName,
  	  	time: this.editTime,
  	  });
  		this.isShowModal = false;
  		//データ更新前にローカルデータリセット：Duplicate keys detected対策
  		await this.$store.commit('inWork/clearInWork');
  		await this.$store.dispatch('inWork/getInWork', this.$store.state.user.userId);
  		this.inWork = this.$store.state.inWork.inWork;
  	},
  	editCancel() {
  	  this.isShowModal = false;
  	},
  	async del(workNo) {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('inWork/clearInWork');
  	  await this.$store.dispatch('inWork/delInWork', workNo);
  	  await this.$store.commit('inWork/clearInWork');
  	  await this.$store.dispatch('inWork/getInWork', this.$store.state.user.userId);
  	  this.inWork = this.$store.state.inWork.inWork;
  	},
  }
}
</script>

<style>
.container {
  width: 70%;
  margin: 0 auto;
}
.section {
  margin: 0 auto;
}
</style>
