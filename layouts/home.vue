<template>
  <div class="home">
    <Nuxt />
  </div>
</template>

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
  font-size: 25px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.home {
  background: #e9e9e9;
  height: 100vh;
  display: flex;
  justify-content: center;
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
.login-button {
  cursor: pointer;
  border:0;
  background-color: #2196F3;
  width: 100%;
  box-shadow:0px 3px 0px #c1524e;
  line-height: 2rem;
  color:#fff;
}
.login-button:active {
  top:3px;
  box-shadow:none;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
