(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{221:function(e,t,r){var content=r(224);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(62).default)("9ed86490",content,!0,{sourceMap:!1})},222:function(e,t,r){"use strict";r.r(t);r(223);var o=r(30),component=Object(o.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"EditModal"}},[r("div",{staticClass:"modal-mask"},[r("div",{staticClass:"modal-wrapper"},[r("div",{staticClass:"modal-container"},[r("div",{staticClass:"modal-header"},[e._t("header",[e._v("\n            default header\n          ")])],2),e._v(" "),r("div",{staticClass:"modal-body"},[e._t("body",[e._v("\n            default body\n          ")])],2),e._v(" "),r("div",{staticClass:"modal-footer"},[e._t("footer",[r("button",{staticClass:"modal-default-button",on:{click:function(t){return e.$emit("close")}}},[e._v("\n              Close\n            ")])])],2)])])])])}),[],!1,null,null,null);t.default=component.exports},223:function(e,t,r){"use strict";var o=r(221);r.n(o).a},224:function(e,t,r){(t=r(61)(!1)).push([e.i,".modal-mask{position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:hsla(0,0%,63.9%,.05);display:table;transition:opacity .3s ease}.modal-wrapper{display:table-cell;vertical-align:middle}.modal-container{width:300px;margin:0 auto;padding:20px 30px;background-color:#fff;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.33);transition:all .3s ease;font-family:Helvetica,Arial,sans-serif}.modal-header h3{margin-top:0;color:#42b983}.modal-body{margin:20px 0}.modal-default-button{float:right}.modal-enter,.modal-leave-active{opacity:0}.modal-enter .modal-container,.modal-leave-active .modal-container{transform:scale(1.1)}",""]),e.exports=t},237:function(e,t,r){var content=r(255);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(62).default)("84f7cf60",content,!0,{sourceMap:!1})},254:function(e,t,r){"use strict";var o=r(237);r.n(o).a},255:function(e,t,r){(t=r(61)(!1)).push([e.i,".container{width:70%}.container,.section{margin:0 auto}",""]),e.exports=t},268:function(e,t,r){"use strict";r.r(t);r(15);var o=r(3),n={components:{EditModal:r(222).default},data:function(){return{year:"",salary:0,workTime:0,classification:"直接工",editId:"",editYear:"",editSalary:0,editClassification:"直接工",worker:[],isShowModal:!1}},created:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.commit("worker/clearWorker");case 2:return t.next=4,e.$store.dispatch("worker/getWorker",e.$store.state.user.userId);case 4:e.worker=e.$store.state.worker.worker;case 5:case"end":return t.stop()}}),t)})))()},methods:{add:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==e.year&&""!==e.salary&&""!==e.workTime&&""!==e.classification){t.next=3;break}return console.log("入力してください。"),t.abrupt("return");case 3:return t.next=5,e.$store.commit("worker/clearWorker");case 5:return t.next=7,e.$store.dispatch("worker/addWorker",{userId:e.$store.state.user.userId,year:e.year,salary:e.salary,workTime:e.workTime,classification:e.classification});case 7:return t.next=9,e.$store.commit("worker/clearWorker");case 9:return t.next=11,e.$store.dispatch("worker/getWorker",e.$store.state.user.userId);case 11:e.worker=e.$store.state.worker.worker;case 12:case"end":return t.stop()}}),t)})))()},edit:function(e,t,r,o,n){this.editId=e,this.editYear=t,this.editSalary=r,this.editWorkTime=o,this.editClassification=n,this.isShowModal=!0},editOK:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.commit("worker/clearWorker");case 2:return t.next=4,e.$store.dispatch("worker/editWorker",{id:e.editId,year:e.editYear,salary:e.editSalary,workTime:e.editWorkTime,classification:e.editClassification});case 4:return e.isShowModal=!1,t.next=7,e.$store.commit("worker/clearWorker");case 7:return t.next=9,e.$store.dispatch("worker/getWorker",e.$store.state.user.userId);case 9:e.worker=e.$store.state.worker.worker;case 10:case"end":return t.stop()}}),t)})))()},editCancel:function(){this.isShowModal=!1},del:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$store.commit("worker/clearWorker");case 2:return r.next=4,t.$store.dispatch("worker/delWorker",e);case 4:return r.next=6,t.$store.commit("worker/clearWorker");case 6:return r.next=8,t.$store.dispatch("worker/getWorker",t.$store.state.user.userId);case 8:t.worker=t.$store.state.worker.worker;case 9:case"end":return r.stop()}}),r)})))()}}},c=(r(254),r(30)),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{staticClass:"section"},[r("label",[e._v("年")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.year,expression:"year"}],attrs:{type:"text"},domProps:{value:e.year},on:{input:function(t){t.target.composing||(e.year=t.target.value)}}}),e._v(" "),r("label",[e._v("給料")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.salary,expression:"salary"}],attrs:{type:"text"},domProps:{value:e.salary},on:{input:function(t){t.target.composing||(e.salary=t.target.value)}}}),e._v(" "),r("label",[e._v("実働時間")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.workTime,expression:"workTime"}],attrs:{type:"text"},domProps:{value:e.workTime},on:{input:function(t){t.target.composing||(e.workTime=t.target.value)}}}),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.classification,expression:"classification"}],attrs:{type:"radio",value:"直接工",name:"class"},domProps:{checked:e._q(e.classification,"直接工")},on:{change:function(t){e.classification="直接工"}}}),e._v("直接工\n      "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.classification,expression:"classification"}],attrs:{type:"radio",value:"間接工",name:"class"},domProps:{checked:e._q(e.classification,"間接工")},on:{change:function(t){e.classification="間接工"}}}),e._v("間接工\n      "),r("button",{on:{click:e.add}},[e._v("追加")]),e._v(" "),r("table",[e._m(0),e._v(" "),e._l(e.worker,(function(t){return r("tr",{key:t.id},[r("td",[e._v(e._s(t.year))]),e._v(" "),r("td",[e._v(e._s(t.salary))]),e._v(" "),r("td",[e._v(e._s(t.workTime))]),e._v(" "),r("td",[e._v(e._s(t.classification))]),e._v(" "),r("td",[r("button",{on:{click:function(r){return e.edit(t.id,t.year,t.salary,t.workTime,t.classification)}}},[e._v("編集")])]),e._v(" "),e.isShowModal?r("EditModal",{on:{close:function(t){e.isShowModal=!1}}},[r("h3",{attrs:{slot:"header"},slot:"header"},[e._v(e._s(e.editId))]),e._v(" "),r("h3",{attrs:{slot:"body"},slot:"body"},[r("p",[e._v("年")]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.editYear,expression:"editYear"}],attrs:{type:"text"},domProps:{value:e.editYear},on:{input:function(t){t.target.composing||(e.editYear=t.target.value)}}})]),e._v(" "),r("p",[e._v("給料")]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.editSalary,expression:"editSalary"}],attrs:{type:"text"},domProps:{value:e.editSalary},on:{input:function(t){t.target.composing||(e.editSalary=t.target.value)}}})]),e._v(" "),r("p",[e._v("実働時間")]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.editWorkTime,expression:"editWorkTime"}],attrs:{type:"text"},domProps:{value:e.editWorkTime},on:{input:function(t){t.target.composing||(e.editWorkTime=t.target.value)}}})]),e._v(" "),r("p",[e._v("区分")]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.editClassification,expression:"editClassification"}],attrs:{type:"radio",value:"直接工",name:"class"},domProps:{checked:e._q(e.editClassification,"直接工")},on:{change:function(t){e.editClassification="直接工"}}}),e._v("直接工")]),e._v(" "),r("p",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.editClassification,expression:"editClassification"}],attrs:{type:"radio",value:"間接工",name:"class"},domProps:{checked:e._q(e.editClassification,"間接工")},on:{change:function(t){e.editClassification="間接工"}}}),e._v("間接工")])]),e._v(" "),r("h3",{attrs:{slot:"footer"},slot:"footer"},[r("button",{on:{click:e.editOK}},[e._v("更新")]),e._v(" "),r("button",{on:{click:e.editCancel}},[e._v("キャンセル")])])]):e._e(),e._v(" "),r("td",[r("button",{on:{click:function(r){return e.del(t.id)}}},[e._v("削除")])])],1)}))],2)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("tr",[t("th",[this._v("年")]),this._v(" "),t("th",[this._v("給料")]),this._v(" "),t("th",[this._v("実働時間")]),this._v(" "),t("th",[this._v("区分")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{EditModal:r(222).default})}}]);