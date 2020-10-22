<template>
  <div class="container">
    <div>
      <Logo />
      <table>
        <tr>
          <td>工事番号</td>
          <td>{{ constructionNo }}</td>
        <tr>
        	<td>材料</td>
        	<td>{{ material }}</td>
        </tr>
        <tr>
        	<td>外注</td>
        	<td>{{ manufacturing }}</td>
        </tr>
       	<tr>
        	<td>内作</td>
        	<td>{{ inWork }}</td>
        </tr>
        <tr>
          <td>合計</td>
          <td>{{ totalCost }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
	data: function() {
		return {
		  constructionNo: '11-1111',
    }
  },
	created() {
		this.$store.dispatch('getCost', this.constructionNo);
	},
	computed: {
	  material: function() {
	    return this.$store.state.costMaterial;
	  },
	  manufacturing: function() {
	    return this.$store.state.costManufacturing;
	  },
	  inWork: function() {
	    return this.$store.state.costInWork;
	  },
	  totalCost: function() {
	    return this.material + this.manufacturing + this.inWork;
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
