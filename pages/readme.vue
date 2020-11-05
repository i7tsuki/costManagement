<template>
  <div class="container">
    <div>
      <Logo />
   		<p>原価計算用のシステムになります。</p>
   		<p>製品受注後、材料/外注の注文、直接工を経て、製品が完成され、その後出荷されます。</p>
   		<p>また、直接工・間接工の給料を元に、内作を円換算しております。</p>
   		<p>以上の金額を集計して、一製品当たりの原価を計算します。</p>
   		
    </div>
  </div>
</template>

<script>
export default {
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
