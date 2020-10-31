<template>
  <div class="container">
    <div>
      <Logo />
      <h1>工事番号：{{ constructionNo }}</h1>
      <h2>材料</h2>
      <table>
      	<tr>
      	  <th>注文番号</th>
      		<th>名称</th>
      		<th>単価</th>
      		<th>数量</th>
      		<th>金額</th>
      	</tr>
      	<tr v-for="material in costDetailMaterial" v-bind:key="material.no">
          <td>{{ material.orderNo }}</td>
      		<td>{{ material.materialAndManufacturingName }}</td>
      		<td>{{ material.unitPrice }}</td>
      		<td>{{ material.num }}</td>
      		<td>{{ material.money }}</td>
      	</tr>
      </table>
      <h3>小計：{{ costMaterial }}</h3>
      <h2>外注</h2>
      <table>
      	<tr>
      	  <th>注文番号</th>
      		<th>名称</th>
      		<th>単価</th>
      		<th>数量</th>
      		<th>金額</th>
      	</tr>
      	<tr v-for="manufacturing in costDetailManufacturing" v-bind:key="manufacturing.no">
      	  <td>{{ manufacturing.orderNo }}</td>
      		<td>{{ manufacturing.materialAndManufacturingName }}</td>
      		<td>{{ manufacturing.unitPrice }}</td>
      		<td>{{ manufacturing.num }}</td>
      		<td>{{ manufacturing.money }}</td>
      	</tr>
      </table>
      <h3>小計：{{ costManufacturing }}</h3>
      <h2>内作</h2>
      <table>
      	<tr>
      		<th>名称</th>
      		<th>作業時間[h]</th>
      		<th>区分</th>
      	</tr>
      	<tr v-for="work in costDetailInWork" v-bind:key="work.no">
      		<td>{{ work.workName }}</td>
      		<td>{{ work.time }}</td>
      		<td>{{ work.classification }}</td>
      	</tr>
      </table>
      <h3>小計：{{ costInWork }}</h3>
    </div>
  </div>
</template>

<script>
export default {
	created() {
		this.$store.dispatch('getCostDetails', this.constructionNo);
	},
	computed: {
	  costDetailMaterial: function() {
	    return this.$store.state.costDetailMaterial
	  },
	  costDetailManufacturing: function() {
	    return this.$store.state.costDetailManufacturing
	  },
	  costDetailInWork: function() {
	    return this.$store.state.costDetailInWork;
	  },
	  constructionNo: function() {
	  	return this.$store.state.constructionNo;
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
