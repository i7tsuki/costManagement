<template>
  <div class="home">
	  <div>
	    <Nuxt />
  	</div>
  	<div>
			<ul class="circles">
		    <li><IconSpanner /></li>
		    <li><IconPliers /></li>
		    <li><IconImpactDriver /></li>
		    <li><IconWrench /></li>
		    <li><IconDriver2 /></li>
		    <li><IconMinusDriver /></li>
		    <li><IconMonkeyWrench /></li>
		    <li><IconPliers2 /></li>
		    <li><IconSaw /></li>
		    <li><IconToolBox /></li>
			</ul>
	  </div>
  </div>
</template>

<script>
import IconSpanner from '~/assets/home/spanner.svg';
import IconPliers from '~/assets/home/needleNosePliers.svg';
import IconImpactDriver from '~/assets/home/ImpactDriver.svg';
import IconWrench from '~/assets/home/wrenchAndDriver.svg';
import IconDriver2 from '~/assets/home/impactDriver2.svg';
import IconMinusDriver from '~/assets/home/minusDriver.svg';
import IconMonkeyWrench from '~/assets/home/monkeyWrench.svg';
import IconPliers2 from '~/assets/home/pliers2.svg';
import IconSaw from '~/assets/home/saw.svg';
import IconToolBox from '~/assets/home/toolBox.svg';
export default {
  components: { 
    IconSpanner,
    IconPliers,
    IconImpactDriver,
    IconWrench,
    IconDriver2,
    IconMinusDriver,
    IconMonkeyWrench,
    IconPliers2,
    IconSaw,
    IconToolBox,
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
  font-size: 25px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.home {
  position: absolute;
  z-index: 0;
  background: #e9e9e9;
  height: 100vh;
  width: 100vw;
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
/* *********** ローディング********** */
.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
  margin: 5px auto;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0; 
  animation: sk-chase-dot 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #2C3E50;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
}
/* ********************************** */
/* ***********アイコン********** */
.circles{
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.circles li{
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  animation: animate 25s linear infinite;
  bottom: -150px; 
}
.circles li:nth-child(1){
  left: 25%;
  animation-delay: 0s;
}
.circles li:nth-child(2){
  left: 10%;
  animation-delay: 2s;
  animation-duration: 12s;
}
.circles li:nth-child(3){
  left: 70%;
  animation-delay: 4s;
}
.circles li:nth-child(4){
  left: 40%;
  animation-delay: 0s;
  animation-duration: 18s;
}
.circles li:nth-child(5){
  height: 20px;
  animation-delay: 0s;
}
.circles li:nth-child(6){
  height: 110px;
  animation-delay: 3s;
}
.circles li:nth-child(7){
  left: 35%;
  animation-delay: 7s;
}
.circles li:nth-child(8){
  left: 50%;
  animation-delay: 15s;
  animation-duration: 45s;
}
.circles li:nth-child(9){
  left: 20%;
  animation-delay: 2s;
  animation-duration: 35s;
}
.circles li:nth-child(10){
	left: 85%;
	animation-delay: 0s;
	animation-duration: 11s;
}
@keyframes animate {
	0%{
	  transform: translateY(0) rotate(0deg);
	  opacity: 1;
	  border-radius: 0;
	}
	100%{
	  transform: translateY(-1000px) rotate(720deg);
	  opacity: 0;
	  border-radius: 50%;
	}
}
/* ********************************* */
</style>
