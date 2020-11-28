<template>
  <div class="container">
    <div class="worker">
      <div class="input-form">
        <p v-if="errMsg" class="err-msg">{{ message }}</p>
	      <label>年（西暦）</label><input type="text" v-model="year">
	      <label>給料</label><input type="text" v-model="salary">
	      <label>実働時間</label><input type="text" v-model="workTime">
	      <input type="radio" value="直接工" name="class" v-model="classification">直接工
	      <input type="radio" value="間接工" name="class" v-model="classification">間接工
	      <button @click="add" class="add-button">追加</button>
	    </div>
      <table>
      	<tr>
      	  <th>年（西暦）</th>
      	  <th>給料</th>
      	  <th>実働時間</th>
      		<th>区分</th>
      	</tr>
      	<tr v-for="w in worker" v-bind:key="w.id">
      	  <td class="td-data">{{ w.year }}</td>
      		<td class="td-data">{{ w.salary }}</td>
      		<td class="td-data">{{ w.workTime }}</td>
      		<td class="td-data">{{ w.classification }}</td>
      		<td><button @click="edit(w.id, w.year, w.salary, w.workTime, w.classification)" class="panel-button">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header"></h3>
      		  <h3 slot="body">
      		    <p v-if="errFormMsg" class="err-msg">{{ formMessage }}</p>
      		    <p>年（西暦）</p>
      		    <p><input type="text" v-model="editYear"></p>
      		    <p>給料</p>
      		    <p><input type="text" v-model="editSalary"></p>
      		    <p>実働時間</p>
      		    <p><input type="text" v-model="editWorkTime"></p>
      		    <p>区分</p>
				      <p><input type="radio" value="直接工" name="class" v-model="editClassification">直接工</p>
				      <p><input type="radio" value="間接工" name="class" v-model="editClassification">間接工</p>
 				    </h3>
            <h3 slot="footer">
              <button @click="editOK" class="add-button">更新</button>
              <button @click="editCancel" class="add-button">キャンセル</button>
            </h3>
          </EditModal>
          <td><button @click="del(w.id)" class="panel-button">削除</button></td>
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
		  year: '',
		  salary: 0,
		  workTime: 0,
		  classification: '直接工',
		  editId: '',
		  editYear: '',
		  editSalary: 0,
		  editClassification: '直接工',
		  worker: [],
		  isShowModal: false,
		  errMsg: false,
		  message: null,
		  errFormMsg: false,
		  formMessage: null,
    }
  },
	async created() {
	  await this.$store.commit('worker/clearWorker');
		await this.$store.dispatch('worker/getWorker', this.$store.state.user.userId);
		this.worker = this.$store.state.worker.worker;
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
  	  if(this.year === '') {
  		  this.setErrMsg('年（西暦）を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.year)) {
  		  this.setErrMsg('年（西暦）を正しく入力してください。');
  			return;
  	  }
  	  if(this.salary === '') {
  		  this.setErrMsg('給料を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.salary)) {
  		  this.setErrMsg('給料を正しく入力してください。');
  			return;
  	  }
  	  if(this.workTime === '') {
  		  this.setErrMsg('実働時間を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.workTime)) {
  		  this.setErrMsg('実働時間を正しく入力してください。');
  			return;
  	  }
  	  this.setErrMsg('');
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('worker/clearWorker');
  		await this.$store.dispatch('worker/addWorker', {
  		  userId: this.$store.state.user.userId,
  			year: this.year,
  			salary: this.salary, 
  			workTime: this.workTime,
  			classification: this.classification
  		});
  		await this.$store.commit('worker/clearWorker');
  		await this.$store.dispatch('worker/getWorker', this.$store.state.user.userId);
  		this.worker = this.$store.state.worker.worker;
  	}, 
  	edit(id, year, salary, workTime, classification) {
  	  this.editId = id;
  	  this.editYear = year;
  	  this.editSalary = salary;
  	  this.editWorkTime = workTime;
  	  this.editClassification = classification;
  	  this.isShowModal = true;
  	},
  	async editOK() {
  	  if(this.editYear === '') {
  		  this.setErrFormMsg('年（西暦）を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editYear)) {
  		  this.setErrFormMsg('年（西暦）を正しく入力してください。');
  			return;
  	  }
  	  if(this.editSalary === '') {
  		  this.setErrFormMsg('給料を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editSalary)) {
  		  this.setErrFormMsg('給料を正しく入力してください。');
  			return;
  	  }
  	  if(this.editWorkTime === '') {
  		  this.setErrFormMsg('実働時間を正しく入力してください。');
  			return;
  	  }
  	  if(isNaN(this.editWorkTime)) {
  		  this.setErrFormMsg('実働時間を正しく入力してください。');
  			return;
  	  }
  	  this.setErrFormMsg('');
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('worker/clearWorker');
  	  await this.$store.dispatch('worker/editWorker', {
  	  	id: this.editId,
  	  	year: this.editYear,
  	  	salary: this.editSalary,
  	  	workTime: this.editWorkTime,
  	  	classification: this.editClassification,
  	  });
  		this.isShowModal = false;
  		//データ更新前にローカルデータリセット：Duplicate keys detected対策
  		await this.$store.commit('worker/clearWorker');
  		await this.$store.dispatch('worker/getWorker', this.$store.state.user.userId);
  		this.worker = this.$store.state.worker.worker;
  	},
  	editCancel() {
  	  this.setErrFormMsg('');
  	  this.isShowModal = false;
  	},
  	async del(id) {
			if(!confirm('削除しますか？')) {
			  return;
			}
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('worker/clearWorker');
  	  await this.$store.dispatch('worker/delWorker', id);
  	  await this.$store.commit('worker/clearWorker');
  	  await this.$store.dispatch('worker/getWorker', this.$store.state.user.userId);
  	  this.worker = this.$store.state.worker.worker;
  	},
  }
}
</script>

<style>
.worker {
  width: 70%;
  margin: 0 auto;
}
.worker .input-form {
  border: solid 1px #C0C0C0;
  padding: 10px;
}
.worker .err-msg {
  color: red;
}
</style>
