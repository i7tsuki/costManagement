(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{225:function(t,e,r){"use strict";var n=r(5),o=r(230).trim;n({target:"String",proto:!0,forced:r(231)("trim")},{trim:function(){return o(this)}})},226:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},230:function(t,e,r){var n=r(21),o="["+r(226)+"]",c=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),m=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(c,"")),2&t&&(r=r.replace(l,"")),r}};t.exports={start:m(1),end:m(2),trim:m(3)}},231:function(t,e,r){var n=r(9),o=r(226);t.exports=function(t){return n((function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t}))}},232:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return o}));r(225);function n(t){return/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(t)}function o(t){return t.trim().length>5}},233:function(t,e,r){var content=r(246);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(62).default)("8383740c",content,!0,{sourceMap:!1})},245:function(t,e,r){"use strict";var n=r(233);r.n(n).a},246:function(t,e,r){(e=r(61)(!1)).push([t.i,".container{width:70%}.container,.section{margin:0 auto}h1{font-size:1.5rem}h2{font-size:1.3rem}small{color:#00f}",""]),t.exports=e},263:function(t,e,r){"use strict";r.r(e);r(225),r(15);var n=r(3),o=r(232),c={layout:"home",data:function(){return{mail:"",password:""}},methods:{login:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Object(o.a)(t.mail)&&Object(o.b)(t.password)){e.next=3;break}return console.log("バリデーションエラー"),e.abrupt("return");case 3:return e.prev=3,e.next=6,t.$store.dispatch("user/login",{mail:t.mail.trim(),password:t.password.trim()});case 6:return e.next=8,t.$router.push("/");case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log({error:e.t0});case 13:case"end":return e.stop()}}),e,null,[[3,10]])})))()}}},l=(r(245),r(30)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"section"},[r("h1",[t._v("ログイン")]),t._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.mail,expression:"mail"}],attrs:{type:"email",placeholder:"E-mail"},domProps:{value:t.mail},on:{input:function(e){e.target.composing||(t.mail=e.target.value)}}})]),t._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"text",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),r("p",[r("button",{on:{click:t.login}},[t._v("ログイン")])]),t._v(" "),r("router-link",{attrs:{to:"signup"}},[r("small",[t._v("新規登録はこちらから")])])],1)])}),[],!1,null,null,null);e.default=component.exports}}]);