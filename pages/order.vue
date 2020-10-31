<template>
  <div class="container">
    <div>
      <Logo />
      <router-link to="orderDetails"><button @click="newOrder">新規</button></router-link>
      <table>
      	<tr>
      	  <th>注文番号</th>
      	  <th>注文日</th>
      		<th>名称</th>
      		<th>納品日</th>
      	</tr>
      	<tr v-for="o in order" v-bind:key="o.orderNo">
	      	<td>{{ o.orderNo }}</td>
	      	<td>{{ o.orderDay }}</td>
      		<td>{{ o.orderName }}</td>
      		<td>{{ o.deliveryDay }}</td>
      		<td><button @click="deliver(o.deliveryDay)">納品</button></td>
      		<EditModal v-if="isShowModal" @close="isShowModal = false">
      		  <h3 slot="header">注文番号: {{ o.orderNo }}</h3>
      		  <h3 slot="body">
      		    <p>納品日</p>
      		    <p><input type="date" v-model="editDeliveryDay"></p>
				    </h3>
            <h3 slot="footer">
              <button @click="editOK(o.orderNo)">更新</button>
              <button @click="editCancel">キャンセル</button>
            </h3>
          </EditModal>
      		<td>
      		  <router-link to="orderDetails"><button @click="orderEdit(o.orderNo)">注文変更</button></router-link>
      		</td>
      		<td><button @click="del(o.orderNo)">削除</button></td>
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
			isShowModal: false,
			editDeliveryDay: '',
			order: []
    }
  },
	async beforeCreate() {
	  await this.$store.commit('clearOrder');
		await this.$store.dispatch('getOrder');
		this.order = this.$store.state.order;
	},
  methods: {
    newOrder() {
      this.$store.commit('setOrderNo', '');
    },
  	deliver(deliveryDay) {
  	  this.editDeliveryDay = deliveryDay;
  	  this.isShowModal = true;
  	}, 
  	async editOK(orderNo) {
  	  await this.$store.commit('clearOrder');
  	  await this.$store.dispatch('setDeliverDay', {
  	    orderNo: orderNo, 
  	    deliveryDay: this.editDeliveryDay,
  	  });
  	  await this.$store.commit('clearOrder');
  	  await this.$store.dispatch('getOrder');
  	  this.isShowModal = false;
  	  this.order = this.$store.state.order;
  	},
  	orderEdit(orderNo) {
  	  this.$store.commit('setOrderNo', orderNo);
  	}, 
  	async del(orderNo) {
    	await this.$store.commit('clearOrder');
  	  await this.$store.dispatch('delOrder', orderNo);
  	  await this.$store.commit('clearOrder');
  	  await this.$store.dispatch('getOrder');
  	  this.order = this.$store.state.order;
  	},
  	editCancel() {
  	  this.isShowModal = false;
  	},
  },
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
