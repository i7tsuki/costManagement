<template>
  <div class="container">
    <div class="order">
      <router-link to="/orderDetails"><button @click="newOrder">新規</button></router-link>
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
      		  <router-link to="/orderDetails"><button @click="orderEdit(o.orderNo)">注文変更</button></router-link>
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
			order: [],
    }
  },
	async created() {
	  await this.$store.commit('order/clearOrder');
	  this.order = this.$store.state.order.order;
		await this.$store.dispatch('order/getOrder', this.$store.state.user.userId);
		this.order = this.$store.state.order.order;
	},
  methods: {
    newOrder() {
      this.$store.commit('orderDetails/setOrderNo', '');
    },
  	deliver(deliveryDay) {
  	  this.editDeliveryDay = deliveryDay;
  	  this.isShowModal = true;
  	}, 
  	async editOK(orderNo) {
  	  await this.$store.commit('order/clearOrder');
  	  await this.$store.dispatch('order/setDeliverDay', {
  	    orderNo: orderNo, 
  	    userId: this.$store.state.user.userId,
  	    deliveryDay: this.editDeliveryDay,
  	  });
  	  await this.$store.commit('order/clearOrder');
  	  await this.$store.dispatch('order/getOrder', this.$store.state.user.userId);
  	  this.isShowModal = false;
  	  this.order = this.$store.state.order.order;
  	},
  	orderEdit(orderNo) {
  	  this.$store.commit('orderDetails/setOrderNo', orderNo);
  	}, 
  	async del(orderNo) {
    	await this.$store.commit('order/clearOrder');
  	  await this.$store.dispatch('order/delOrder', {
  	    orderNo: orderNo,
  	    userId: this.$store.state.user.userId,
  	  });
  	  await this.$store.commit('order/clearOrder');
  	  await this.$store.dispatch('order/getOrder', this.$store.state.user.userId);
  	  this.order = this.$store.state.order.order;
  	},
  	editCancel() {
  	  this.isShowModal = false;
  	},
  },
}
</script>

<style>
.order {
  width: 70%;
  margin: 0 auto;
}
</style>
