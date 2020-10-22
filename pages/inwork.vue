<template>
  <div class="container">
    <div>
      <Logo />
      <label>工事番号</label><input type="text" v-model="constructionNo">
      <label>作業内容</label><input type="text" v-model="name">
      <label>金額</label><input type="text" v-model="money">
      <button @click="add">追加</button>
      <table>
      	<tr>
      		<th>工事番号</th>
      		<th>作業内容</th>
      		<th>金額</th>
      	</tr>
      	<tr v-for="inwork in inWorks" v-bind:key="inwork.no">
      		<td>{{ inwork.constructionNo }}</td>
      		<td>{{ inwork.name }}</td>
      		<td>{{ inwork.money }}
      		<td><button @click="edit">編集</button></td>
      	</tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
	data: function() {
		return {
		  inWorks: [
		    {
		      no: 1,
		      constructionNo: '11-1111',
		      name: '作業内容１',
		      money: 100
		    },
		    {
		      no: 2,
		      constructionNo: '11-1111',
		      name: '作業内容２',
		      money: 300
		    }
		  ]
    }
  },
  methods: {
  	add() {
  		this.$store.dispatch('addInWork', {
  			constructionNo: this.constructionNo,
  			name: this.name,
  			money: this.money
  		});
  	}, 
  	edit() {
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
