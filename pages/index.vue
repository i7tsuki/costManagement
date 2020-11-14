<template>
  <div class="container">
    <div>
      <header>
        <div id="title">
          <h1>原価計算システム</h1>
        </div>
			  <ul class="menu">
				  <li class="menu__single">
  	        <router-link to="order"><div class="init-bottom">注文</div></router-link>
			    </li>
				  <li class="menu__single">
  	        <router-link to="materialAndManufacturing"><div class="init-bottom"><p>材料・外注</p></div></router-link>
			    </li>
				  <li class="menu__single">
  	        <router-link to="inwork"><div class="init-bottom"><p>直接工</p></div></router-link>
			    </li>
				  <li class="menu__single">
  	        <router-link to="construction"><div class="init-bottom"><p>工事一覧</p></div></router-link>
			    </li>
				  <li class="menu__single">
  	        <router-link to="worker"><div class="init-bottom"><p>工員</p></div></router-link>
			    </li>
				</ul>
      </header>
   		<p>原価計算用のシステムになります。</p>
   		<p>製品製造の受注後、材料・外注の注文、直接工を経て、製品が完成され、その後出荷されます。</p>
   		<p>また、直接工・間接工の給料を元に、内作を円換算しております。</p>
   		<p>以上の金額を集計して、一製品当たりの原価を計算します。</p>
   		<Overview />
    </div>
  </div>
</template>

<script>
import Overview from '~/assets/overview.svg';

export default {
  components: { Overview },
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

svg {
  margin-top: 20px;
  max-width: 80%;
  height: auto;
}
/*メニュー用*/
header {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 150px;
  margin-top: 30px;
}

#title {
  width: 100%;
}

#title h1 {
  font-size: 1.5rem;
  text-align: left;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.menu {
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 0;
	padding: 0;
}

.menu > li {
	width: 20%; /* グローバルナビ5つの場合 */
  line-height: 50px;
  background: rgb(29, 33, 19);
}

.menu {
  *zoom: 1;
}
.menu > li.menu__single {
  position: relative;
}

li.menu__single  {
  position: absolute;
  top: 40px;
  width: 100%;
  background: #072A24;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
	display: flex;
	justify-content: center;
}

li.menu__single:hover {
  top: 50px;
  visibility: visible;
  opacity: 1;
}

li.menu__single a {
  text-decoration: none;
  color: #fff;
  width: 100%;
  height: auto;
}

li.menu__single a:hover {
  color: #999;
}

li.menu__single .init-bottom {
	display: flex;
	justify-content: center;
}
</style>
