<template>
  <div class="container">
    <div class="login">
      <div class="form">
	      <h1>原価計算システム</h1>
	      <p v-if="errMsg" class="err-msg">{{ message }}</p>
		    <p><input type="email" placeholder="E-mail" v-model="mail"></p>
		    <p><input type="text" placeholder="Password" v-model="password"></p>
		    <p><button @click="login" class="login-button">ログイン</button></p>
		    <router-link to="/signup"><small>新規登録はこちらから</small></router-link>
		  </div>
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
  margin-top: 100px;
}
.login h1 {
  font-weight: normal;
  font-size: 1.2rem;
  text-align: center;
}
.login .form {
  background:#fafafa;
  border-radius:6px;
  box-shadow:15px 15px 0px rgba(0,0,0,.1);
  padding: 30px;
}
.login input {
  line-height: 1.7rem;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  border:1px solid #eee;
  padding: 5px;
}
.login input:focus {
  outline: none;
}
.login small {
  display: block;
  padding-top: 30px;
  color: blue;
  font-size: 0.7rem;
}
.login .err-msg {
  color: red;
}
</style>
