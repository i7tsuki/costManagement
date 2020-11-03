<template>
  <div class="container">
    <div>
      <Logo />
      <label>年</label><input type="text" v-model="year">
      <label>給料</label><input type="text" v-model="salary">
      <label>実働時間</label><input type="text" v-model="workTime">
      <input type="radio" value="直接工" name="class" v-model="classification">直接工
      <input type="radio" value="間接工" name="class" v-model="classification">間接工
      <button @click="add">追加</button>
      <table>
      	<tr>
      	  <th>年</th>
      	  <th>給料</th>
      	  <th>実働時間</th>
      		<th>区分</th>
      	</tr>
      	<tr v-for="w in worker" v-bind:key="w.id">
      	  <td>{{ w.year }}</td>
      		<td>{{ w.salary }}</td>
      		<td>{{ w.workTime }}</td>
      		<td>{{ w.classification }}</td>
      		<td><button @click="edit(w.id, w.year, w.salary, w.workTime, w.classification)">編集</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header">{{ editId }}</h3>
      		  <h3 slot="body">
      		    <p>年</p>
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
              <button @click="editOK">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
          <td><button @click="del(w.id)">削除</button></td>
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
    }
  },
	async created() {
	  await this.$store.commit('clearWorker');
		await this.$store.dispatch('getWorker');
		this.worker = this.$store.state.worker;
	},
  methods: {
  	async add() {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('clearWorker');
  		await this.$store.dispatch('addWorker', {
  			year: this.year,
  			salary: this.salary, 
  			workTime: this.workTime,
  			classification: this.classification
  		});
  		await this.$store.commit('clearWorker');
  		await this.$store.dispatch('getWorker');
  		this.worker = this.$store.state.worker;
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
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('clearWorker');
  	  await this.$store.dispatch('editWorker', {
  	  	id: this.editId,
  	  	year: this.editYear,
  	  	salary: this.editSalary,
  	  	workTime: this.editWorkTime,
  	  	classification: this.editClassification,
  	  });
  		this.isShowModal = false;
  		//データ更新前にローカルデータリセット：Duplicate keys detected対策
  		await this.$store.commit('clearWorker');
  		await this.$store.dispatch('getWorker');
  		this.worker = this.$store.state.worker;
  	},
  	editCancel() {
  	  this.isShowModal = false;
  	},
  	async del(id) {
  	  //データ更新前にローカルデータリセット：Duplicate keys detected対策
  	  await this.$store.commit('clearWorker');
  	  await this.$store.dispatch('delWorker', id);
  	  await this.$store.commit('clearWorker');
  	  await this.$store.dispatch('getWorker');
  	  this.worker = this.$store.state.worker;
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
