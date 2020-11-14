<template>
  <div class="container">
    <div class="section">
	    <p>●●●様、ようこそ！</p>
	    <img src="~/assets/factory.jpg">
	 		<p>原価計算用のシステムになります。</p>
	 		<p>製品製造の受注後、材料・外注の注文、直接工を経て、製品が完成され、その後出荷されます。</p>
	 		<p>また、直接工・間接工の給料を元に、内作を円換算しております。</p>
	 		<p>以上の金額を集計して、一製品当たりの原価を計算します。</p>
	 		<div class="overview"><Overview /></div>
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
.container {
  width: 70%;
  margin: 0 auto;
}
.section {
  margin: 0 auto;
}
img {
  width: 100%;
}
.overview {
  display: flex;
  justify-content: center;
}
svg {
  margin: 0 auto;
  height: 95%;
  width: 50%;
}
</style>
