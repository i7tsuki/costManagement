<template>
  <div class="container">
    <div class="signup">
      <div class="form">
	      <h1>原価計算システム</h1>
				<div class="sk-chase" v-if="loading">
				  <div class="sk-chase-dot"></div>
				  <div class="sk-chase-dot"></div>
				  <div class="sk-chase-dot"></div>
				  <div class="sk-chase-dot"></div>
				  <div class="sk-chase-dot"></div>
				  <div class="sk-chase-dot"></div>
				</div>
	      <p v-if="errMsg" class="err-msg">{{ message }}</p>
		    <p><input type="text" placeholder="ユーザー名" v-model="userName"></p>
		    <p><input type="email" placeholder="E-mail" v-model="mail"></p>
		    <p><input type="text" placeholder="Password" v-model="password"></p>
		    <p><button @click="signup" class="login-button">新規登録</button></p>
		    <router-link to="/login"><small>ログインはこちらから</small></router-link>
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
		  userName: '',
		  mail: '',
		  password: '',
		  errMsg: false,
		  message: null,
		  loading: false,
		}
  },
  methods: {
    async signup() {
      if (this.userName.trim().length < 1) {
        this.setMessage('ユーザー名を入力してください。');
        return;
      }
      if (!isMailAdress(this.mail)) {
        this.setMessage('メールアドレスが正しく入力されていません。');
        return;
      }
      if (!isPassword(this.password)) {
        this.setMessage('パスワードは8文字以上を入力してください。');
        return;
      }
      this.setMessage('');
      this.loading = true;
      const user = {
        userName: this.userName.trim(), 
        mail: this.mail.trim(), 
        password: this.password.trim()
      };
      try {
        await this.$store.dispatch('user/createUserAccount', user);
        await this.$store.dispatch('user/login', user);
        await this.$router.push('/');
      } catch(error) {
        console.log({ error });
        this.setMessage(this.$store.state.user.message);
        this.loading = false;
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
.signup {
  margin-top: 100px;
}
.signup h1 {
  font-weight: normal;
  font-size: 1.2rem;
  text-align: center;
}
.signup .form {
  background:#fafafa;
  border-radius:6px;
  box-shadow:15px 15px 0px rgba(0,0,0,.1);
  padding: 30px;
  width: 400px;
}
.signup input {
  line-height: 1.7rem;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  border:1px solid #eee;
  padding: 5px;
}
.signup input:focus {
  outline: none;
}
.signup small {
  display: block;
  padding-top: 30px;
  color: blue;
  font-size: 0.7rem;
}
.signup .err-msg {
  color: red;
  font-size: 0.7rem;
  word-break:break-all;
}
</style>
