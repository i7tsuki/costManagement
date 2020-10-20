<template>
  <div class="container">
    <div>
      <Logo />
      <table>
        <tr>
          <td>工事番号</td>
          <td>11-1111</td>
        <tr>
        	<td>材料</td>
        	<td>9000</td>
        </tr>
        <tr>
        	<td>外注</td>
        	<td>3000</td>
        </tr>
       	<tr>
        	<td>内作</td>
        	<td>5000</td>
        </tr>
        <tr>
          <td>合計</td>
          <td>17000</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {}
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
