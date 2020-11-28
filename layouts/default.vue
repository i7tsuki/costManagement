<template>
  <div class="default">
    <div class="header">
      <div id="title">
        <router-link to="/"><h1>原価計算システム</h1></router-link>
        <div class="info">
	        <p>ユーザーID:{{ userId }}</p>
	        <p>{{ userName }}様</p>
	        <button @click="logout" class="logout-button">ログアウト</button>
	      </div>
      </div>
		  <ul class="menu">
			  <li class="menu__single">
	        <router-link to="/order"><div class="init-bottom">注文</div></router-link>
		    </li>
			  <li class="menu__single">
	        <router-link to="/materialAndManufacturing"><div class="init-bottom"><p>材料・外注</p></div></router-link>
		    </li>
			  <li class="menu__single">
	        <router-link to="/inWork"><div class="init-bottom"><p>直接工</p></div></router-link>
		    </li>
			  <li class="menu__single">
	        <router-link to="/construction"><div class="init-bottom"><p>工事一覧</p></div></router-link>
		    </li>
			  <li class="menu__single">
	        <router-link to="/worker"><div class="init-bottom"><p>工員</p></div></router-link>
		    </li>
			</ul>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'pageLayout',
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.push('/login');
    },
  },
  computed: { 
    userId: function () {
      return this.$store.state.user.userId;
    },
    userName: function () {
      return this.$store.state.user.userName;
    },
  },
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.default {
  height: 100vh;
  background: #fff;
  font-size: 0.8rem;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.main {
  background: #fafafa;
  height: 100vh;
}
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
a {
  text-decoration: none;
  color: #000;
}
button {
  cursor: pointer;
  border:0;
}
#title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
#title h1 {
  font-size: 1.2rem;
  text-align: center;
  padding-left: 50px;
  padding-top: 30px;
}
#title .info {
  margin-right: 50px;
  font-size: 0.8rem;
}
.menu {
	width: 100%;
	display: flex;
	justify-content: center;
}
.menu > li {
	width: 20%; /* グローバルナビ5つの場合 */
  line-height: 50px;
  background: rgb(29, 33, 19);
}
.menu > li.menu__single {
  position: relative;
}
li.menu__single  {
  position: absolute;
  top: 0px;
  width: 100%;
  background: #072A24;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
	display: flex;
	justify-content: center;
}
li.menu__single:hover {
  top: 10px;
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
table {
  border-collapse: collapse;
  font-size: 0.7rem;
}
table th {
  background-color: #167F92;
  color:#fff;
  padding: 1em 10px 1em 1em;
  border-right: 2px solid #fff;
}
table .td-data {
  padding: 1em 10px 1em 1em;
  border-right: 2px solid #fff;
  background-color: #e6f2f5;
  border-bottom: 2px solid #fff;
  height: 100%;
}
table .panel-button {
  padding: 1.4em 10px 1.4em 1em;
  border-right: 2px solid #fff;
  background-color: #3498db;
  border-bottom: 2px solid #fff;
  color: #fff;
}
table .panel-button a {
  color: #fff;
}
.add-button {
  background-color: #3498db;
  border-radius: 0.3em;
  border: 2px solid #3498db;
  color: #fff;
  width: 3.5rem;
  height: 1.5rem;
  margin: 10px 10px 10px 0;
}
.logout-button {
  background-color: #808000;
  border-radius: 0.3em;
  color: #fff;
  width: 3.5rem;
  height: 1.5rem;
  margin: 10px 10px 10px 0;
  outline: 0;
  box-shadow:0px 3px 0px #c1524e;
}
.logout-button:active {
  top:3px;
  box-shadow:none;
}
</style>
