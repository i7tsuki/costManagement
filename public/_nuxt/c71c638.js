(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{225:function(e,t,r){"use strict";var n=r(5),o=r(230).trim;n({target:"String",proto:!0,forced:r(231)("trim")},{trim:function(){return o(this)}})},226:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},230:function(e,t,r){var n=r(21),o="["+r(226)+"]",c=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),m=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(c,"")),2&e&&(r=r.replace(l,"")),r}};e.exports={start:m(1),end:m(2),trim:m(3)}},231:function(e,t,r){var n=r(9),o=r(226);e.exports=function(e){return n((function(){return!!o[e]()||"​᠎"!="​᠎"[e]()||o[e].name!==e}))}},232:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return o}));r(225);function n(e){return/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(e)}function o(e){return e.trim().length>5}},237:function(e,t,r){var content=r(256);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(62).default)("763f0384",content,!0,{sourceMap:!1})},255:function(e,t,r){"use strict";var n=r(237);r.n(n).a},256:function(e,t,r){(t=r(61)(!1)).push([e.i,".signup{width:70%;margin:0 auto}.signup h1{font-size:1.5rem}.signup h2{font-size:1.3rem}.signup small{color:#00f}",""]),e.exports=t},270:function(e,t,r){"use strict";r.r(t);r(225),r(15);var n=r(3),o=r(232),c={layout:"home",data:function(){return{userName:"",mail:"",password:""}},methods:{signup:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.userName.trim().length<1)&&Object(o.a)(e.mail)&&Object(o.b)(e.password)){t.next=3;break}return console.log("バリデーションエラー"),t.abrupt("return");case 3:return r={userName:e.userName.trim(),mail:e.mail.trim(),password:e.password.trim()},t.prev=4,t.next=7,e.$store.dispatch("user/createUserAccount",r);case 7:return t.next=9,e.$store.dispatch("user/login",r);case 9:return t.next=11,e.$router.push("/");case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(4),console.log({error:t.t0});case 16:case"end":return t.stop()}}),t,null,[[4,13]])})))()}}},l=(r(255),r(30)),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{staticClass:"signup"},[r("h1",[e._v("新規登録")]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],attrs:{type:"text",placeholder:"ユーザー名"},domProps:{value:e.userName},on:{input:function(t){t.target.composing||(e.userName=t.target.value)}}})]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.mail,expression:"mail"}],attrs:{type:"email",placeholder:"E-mail"},domProps:{value:e.mail},on:{input:function(t){t.target.composing||(e.mail=t.target.value)}}})]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"text",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),r("p",[r("button",{on:{click:e.signup}},[e._v("新規登録")])]),e._v(" "),r("router-link",{attrs:{to:"login"}},[r("small",[e._v("ログインはこちらから")])])],1)])}),[],!1,null,null,null);t.default=component.exports}}]);