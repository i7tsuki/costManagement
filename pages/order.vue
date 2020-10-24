<template>
  <div class="container">
    <div>
      <Logo />
      <router-link to="orderDetails"><button>新規</button></router-link>
      <table>
      	<tr>
      	  <th>注文番号</th>
      		<th>名称</th>
      		<th>金額</th>
      		<th>区分</th>
      	</tr>
      	<tr v-for="o in orderNum" v-bind:key="o.orderNo">
	      	<td>{{ o.orderNo }}</td>
      		<td>{{ o.orderName }}</td>
      		<td>{{ o.orderMoney }}
      		<td>{{ o.constructionNo }}</td>
      		<td><button @click="edit(o.orderNo)">編集</button></td>
      		<td><button @click="del(o.orderNo)">削除</button></td>
      	</tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  	newOrder() {
  	}, 
  	edit(orderNo) {
  	}, 
  	del(orderNo) {
  	},
  },
	created() {
		this.$store.dispatch('getOrder');
	},
	computed: {
	  order: function() {
	    return this.$store.state.order
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
