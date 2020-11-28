<template>
  <div class="container">
    <div class="index">
	    <img src="~/assets/factory.jpg">
	    <div class="system">
		    <div class="message">
			 		<p>原価計算用のシステムになります。</p>
			 		<p>製品製造の受注後、材料・外注の注文、直接工を経て、製品が完成され、その後出荷されます。</p>
			 		<p>また、直接工・間接工の給料を元に、内作を円換算しております。</p>
			 		<p>以上の金額を集計して、一製品当たりの原価を計算します。</p>
			 	</div>
		 		<div class="overview"><Overview /></div>
		 </div>
 		</div>
  </div>
</template>

<script>
import Overview from '~/assets/overview.svg';
export default {
  components: { 
    Overview,
  },
}
</script>

<style>
.index img {
  width: 100%;
}
.index .system {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 95%;
}
.index .message {
  width: 40%;
  height: 100%;
  margin-top: 5%;
  padding: 30px;
  line-height: 1.5rem;
  background: #faf6e0;
  box-shadow: 0 .25rem .25rem hsla(0, 0%, 0%, .1);
}
.index .message p {
  font-weight: bold;
}
.index .overview {
  width: 60%;
  padding-top: 15px;
}
.index svg {
  height: 70%;
  width: 95%;
}
</style>
