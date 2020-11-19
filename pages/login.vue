<template>
  <div class="container">
    <div class="login">
      <h1>ログイン</h1>
	    <p><input type="email" placeholder="E-mail" v-model="mail"></p>
	    <p><input type="text" placeholder="Password" v-model="password"></p>
	    <p><button @click="login">ログイン</button></p>
	    <router-link to="signup"><small>新規登録はこちらから</small></router-link>
 		</div>
  </div>
</template>

<script>
import { isMailAdress, isPassword } from '~/plugins/definiton';

export default {
  layout: 'home', 
	data: function() {
		return {
		  mail: '',
		  password: '',
		}
  },
  methods: {
    async login() {
      if (!isMailAdress(this.mail) || !isPassword(this.password)) {
        console.log('バリデーションエラー');
        return;
      }
      try {
        await this.$store.dispatch('user/login', {
          mail: this.mail.trim(), 
          password: this.password.trim()
        });
        await this.$router.push('/');
      } catch(error) {
        console.log({ error });
      }
    },
  },
  
}
</script>

<style>
.login {
  width: 70%;
  margin: 0 auto;
}
h1 {
  font-size: 1.5rem;
}
h2 {
  font-size: 1.3rem;
}
small {
  color: blue;
}
</style>
