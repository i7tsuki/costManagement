<template>
  <div class="container">
    <div class="section">
      <h1>新規登録</h1>
	    <p><input type="text" placeholder="ユーザー名" v-model="userName"></p>
	    <p><input type="email" placeholder="E-mail" v-model="mail"></p>
	    <p><input type="text" placeholder="Password" v-model="password"></p>
	    <p><button @click="signup">新規登録</button></p>
	    <router-link to="login"><small>ログインはこちらから</small></router-link>
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
		}
  },
  methods: {
    async signup() {
      if (
        this.userName.trim().length < 1 ||
        !isMailAdress(this.mail) ||
        !isPassword(this.password)
      ) {
        console.log('バリデーションエラー');
        return;
      }
      const user = {
        userName: this.userName.trim(), 
        mail: this.mail.trim(), 
        password: this.password.trim()
      };
      try {
        await this.$store.dispatch('user/createUserAccount', user);
        console.log('createOK');
        await this.$store.dispatch('user/login', user);
        console.log('createOK②');
        await this.$router.push('/');
      } catch(error) {
        console.log({ error });
      }
    },
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
