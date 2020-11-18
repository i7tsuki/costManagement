<template>
  <div>
    <div class="header">
      <div id="title">
        <router-link to="/"><h1>原価計算システム</h1></router-link>
        <div>
	        <p>ユーザーID:{{ userId }}</p>
	        <p>{{ userName }}様</p>
	        <button @click="logout">ログアウト</button>
	      </div>
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
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  async beforeCreate () {
    if(this.$store.state.user.mail === null) {
      this.$router.push('/login');
    } 
  },
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
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
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

.header {
  width: 80%;
  height: 150px;
  margin: 0 auto 30px auto;
  padding-top: 5px;
}

#title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

#title h1 {
  font-size: 1.5rem;
  text-align: left;
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
