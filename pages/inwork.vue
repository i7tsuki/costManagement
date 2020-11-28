<template>
  <div class="container">
    <div class="inwork">
      <div class="input-form">
        <p v-if="errMsg" class="err-msg">{{ message }}</p>
	      <label>製品番号</label><input type="text" v-model="constructionNo">
	      <label>作業日</label><input type="date" v-model="workDay">
	      <label>作業内容</label><input type="text" v-model="workName">
	      <label>作業時間[h]</label><input type="text" v-model="time">
	      <button @click="add" class="add-button">追加</button>
	    </div>
      <table>
      	<tr>
      		<th>製品番号</th>
      		<th>作業日</th>
      		<th>作業内容</th>
      		<th>作業時間[h]</th>
      	</tr>
      	<tr v-for="w in inWork" v-bind:key="w.workNo">
      		<td class="td-data">{{ w.constructionNo }}</td>
      		<td class="td-data">{{ w.workDay }}</td>
      		<td class="td-data">{{ w.workName }}</td>
      		<td class="td-data">{{ w.time }}</td>
      		<td><button @click="edit(w.workNo, w.constructionNo, w.workDay, w.workName, w.time)" class="panel-button">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header"></h3>
      		  <h3 slot="body">
      		    <p v-if="errFormMsg" class="err-msg">{{ formMessage }}</p>
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
              <button @click="editOK" class="add-button">更新</button>
              <button @click="editCancel" class="add-button">キャンセル</button>
            </h3>
          </EditModal>
          <td><button @click="del(w.workNo)" class="panel-button">削除</button></td>
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
		  errMsg: false,
		  message: null,
		  errFormMsg: false,
		  formMessage: null,
    }
  },
	async created() {
	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
	  await this.$store.commit('inWork/clearInWork');
		await this.$store.dispatch('inWork/getInWork', this.$store.state.user.userId);
		this.inWork = this.$store.state.inWork.inWork;
	},
  methods: {
  	setErrMsg(msg) {
  	  if(msg !== '') {
  	    this.errMsg = true;
  	    this.message = msg;
  	    return ;
  	  } else {
  	    this.errMsg = false;
  	  }
  	},
  	setErrFormMsg(msg) {
  	  if (msg !== '') {
  	    this.errFormMsg = true;
  	    this.formMessage = msg;
  	  } else {
  	    this.errFormMsg = false;
  	  }
  	},
  	async add() {
  	  if (this.workDay === '') {
  	    this.setErrMsg('作業日を入力してください。');
  	    return ;
  	  }
  	  if (this.workName === '') {
  	    this.setErrMsg('作業内容を入力してください。');
  	    return ;
  	  }
  	  if(this.time === '') {
  		  this.setErrMsg('作業時間[h]を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.time)) {
  		  this.setErrMsg('作業時間[h]を正しく入力してください。');
  			return;
  	  }
      this.setErrMsg('');
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
  	  if (this.editWorkDay == '') {
  	    this.setErrFormMsg('作業日が入力されていません。');
  	    return ;
  	  }
  	  if (this.editWorkName == '') {
  	    this.setErrFormMsg('名称が入力されていません。');
  	    return ;
  	  }
  	  if(this.editTime === '') {
  		  this.setErrFormMsg('作業時間[h]を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editTime)) {
  		  this.setErrFormMsg('作業時間[h]を正しく入力してください。');
  			return;
  	  }  	  
  	  this.setErrFormMsg('');
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
  	  this.setErrFormMsg('');
  	  this.isShowModal = false;
  	},
  	async del(workNo) {
			if(!confirm('削除しますか？')) {
			  return;
			}
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
.inwork {
  width: 70%;
  margin: 0 auto;
}
.inwork .input-form {
  border: solid 1px #C0C0C0;
  padding: 10px;
}
.inwork .err-msg {
  color: red;
}
</style>
