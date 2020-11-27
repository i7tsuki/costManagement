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
  padding-top: 15%;
  line-height: 1.5rem;
}
.index .message p {
  font-weight: bold;
  text-decoration: underline;
}
.index .overview {
  width: 60%;
}
.index svg {
  height: 70%;
  width: 95%;
}
</style>
