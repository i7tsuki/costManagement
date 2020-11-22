<template>
  <div class="container">
    <div class="login">
      <h1>ログイン</h1>
      <p v-if="errMsg" class="err-msg">{{ message }}</p>
	    <p><input type="email" placeholder="E-mail" v-model="mail"></p>
	    <p><input type="text" placeholder="Password" v-model="password"></p>
	    <p><button @click="login">ログイン</button></p>
	    <router-link to="/signup"><small>新規登録はこちらから</small></router-link>
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
		  errMsg: false,
		  message: null,
		}
  },
  methods: {
    async login() {
      if (!isMailAdress(this.mail) || !isPassword(this.password)) {
        this.setMessage('バリデーションエラー');
        return;
      }
      try {
        await this.$store.dispatch('user/login', {
          mail: this.mail.trim(), 
          password: this.password.trim()
        });
        await this.$router.push('/');
      } catch(error) {
        console.log(error);
        if(error.code === 'auth/user-not-found') {
          this.setMessage('該当のユーザーは登録されていません。');
        }
      }
    },
    setMessage(msg) {
      if(msg === null) {
        this.errMsg = false;
      } else {
        this.errMsg = true;
        this.message = msg;
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
.login h1 {
  font-size: 1.5rem;
}
.login h2 {
  font-size: 1.3rem;
}
.login small {
  color: blue;
}
.login .err-msg {
  color: red;
}
</style>
