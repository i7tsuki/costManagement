<template>
  <div class="container">
    <div>
      <Logo />
      <label>工事番号</label><input type="text" v-model="constructionNo">
      <label>名称</label><input type="text" v-model="name">
      <label>金額</label><input type="text" v-model="money">
      <input type="radio" value="material" name="class" v-model="classification">材料
      <input type="radio" value="manufacturing" name="class" v-model="classification">外注
      <button @click="add">追加</button>
      <table>
      	<tr>
      		<th>工事番号</th>
      		<th>名称</th>
      		<th>金額</th>
      		<th>区分</th>
      	</tr>
      	<tr v-for="m in materialAndManufacturing" v-bind:key="m.no">
      		<td>{{ m.constructionNo }}</td>
      		<td>{{ m.name }}</td>
      		<td>{{ m.money }}
      		<td>{{ m.classification }}</td>
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
			constructionNo: '',
			name: '',
			money: 0,
			classification: 'material',
			materialAndManufacturing: [
				{
	        no: 1, 
	        constructionNo: '11-1111', 
	        name: '材料1',
	        money: 100,
	        classification: '材料'
	      },
        {
        	no: 2, 
        	constructionNo: '11-1111', 
        	name: '材料2', 
        	money: 200, 
        	classification: '材料'
        },
				{
	        no: 3, 
	        constructionNo: '11-1111', 
	        name: '外注1',
	        money: 100, 
	        classification: '外注'
	      },
        {
        	no: 4, 
        	constructionNo: '11-1111', 
        	name: '外注2', 
        	money: 200,
        	classification: '外注'
        },
      ]
    }
  },
  methods: {
  	add() {
  		this.$store.commit('addMaterialAndManufacturing', {
  			constructionNo: this.constructionNo,
  			name: this.name,
  			money: this.money,
  			classification: this.classification
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
