(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{221:function(t,e,n){var content=n(224);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(62).default)("9ed86490",content,!0,{sourceMap:!1})},222:function(t,e,n){"use strict";n.r(e);n(223);var r=n(30),component=Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"EditModal"}},[n("div",{staticClass:"modal-mask"},[n("div",{staticClass:"modal-wrapper"},[n("div",{staticClass:"modal-container"},[n("div",{staticClass:"modal-header"},[t._t("header",[t._v("\n            default header\n          ")])],2),t._v(" "),n("div",{staticClass:"modal-body"},[t._t("body",[t._v("\n            default body\n          ")])],2),t._v(" "),n("div",{staticClass:"modal-footer"},[t._t("footer",[n("button",{staticClass:"modal-default-button",on:{click:function(e){return t.$emit("close")}}},[t._v("\n              Close\n            ")])])],2)])])])])}),[],!1,null,null,null);e.default=component.exports},223:function(t,e,n){"use strict";var r=n(221);n.n(r).a},224:function(t,e,n){(e=n(61)(!1)).push([t.i,".modal-mask{position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:hsla(0,0%,63.9%,.05);display:table;transition:opacity .3s ease}.modal-wrapper{display:table-cell;vertical-align:middle}.modal-container{width:300px;margin:0 auto;padding:20px 30px;background-color:#fff;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.33);transition:all .3s ease;font-family:Helvetica,Arial,sans-serif}.modal-header h3{margin-top:0;color:#42b983}.modal-body{margin:20px 0}.modal-default-button{float:right}.modal-enter,.modal-leave-active{opacity:0}.modal-enter .modal-container,.modal-leave-active .modal-container{transform:scale(1.1)}",""]),t.exports=e},234:function(t,e,n){var content=n(249);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(62).default)("22a89cf0",content,!0,{sourceMap:!1})},248:function(t,e,n){"use strict";var r=n(234);n.n(r).a},249:function(t,e,n){(e=n(61)(!1)).push([t.i,".materialAndManufacturing{width:70%;margin:0 auto}.materialAndManufacturing .input-form{border:1px solid silver;padding:10px}.materialAndManufacturing .err-msg{color:red}",""]),t.exports=e},267:function(t,e,n){"use strict";n.r(e);n(15);var r=n(3),o={components:{EditModal:n(222).default},data:function(){return{orderNo:"",constructionNo:"",materialAndManufacturingName:"",unitPrice:0,num:0,money:0,classification:"材料",isShowModal:!1,materialAndManufacturing:[],editNo:"",editOrderNo:"",editConstructionNo:"",editMaterialAndManufacturingName:"",editUnitPricey:0,editNum:0,editMoney:0,editClassification:"材料",errMsg:!1,message:null}},created:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.commit("materialAndManufacturing/clearMaterialAndManufacturing");case 2:return e.next=4,t.$store.dispatch("materialAndManufacturing/getMaterialAndManufacturing",t.$store.state.user.userId);case 4:t.materialAndManufacturing=t.$store.state.materialAndManufacturing.materialAndManufacturing;case 5:case"end":return e.stop()}}),e)})))()},methods:{add:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.materialAndManufacturingName){e.next=6;break}return t.errMsg=!0,t.message="バリデーションエラー",e.abrupt("return");case 6:t.errMsg=!1;case 7:return e.next=9,t.$store.commit("materialAndManufacturing/clearMaterialAndManufacturing");case 9:return e.next=11,t.$store.dispatch("materialAndManufacturing/addMaterialAndManufacturing",{userId:t.$store.state.user.userId,orderNo:t.orderNo,constructionNo:t.constructionNo,materialAndManufacturingName:t.materialAndManufacturingName,unitPrice:t.unitPrice,num:t.num,money:t.money,classification:t.classification});case 11:return e.next=13,t.$store.commit("materialAndManufacturing/clearMaterialAndManufacturing");case 13:return e.next=15,t.$store.dispatch("materialAndManufacturing/getMaterialAndManufacturing",t.$store.state.user.userId);case 15:t.materialAndManufacturing=t.$store.state.materialAndManufacturing.materialAndManufacturing;case 16:case"end":return e.stop()}}),e)})))()},edit:function(t,e,n,r,o,c,d,l){this.editNo=t,this.editOrderNo=e,this.editConstructionNo=n,this.editMaterialAndManufacturingName=r,this.editUnitPrice=o,this.editNum=c,this.editMoney=d,this.editClassification=l,this.isShowModal=!0},editOK:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.commit("materialAndManufacturing/clearMaterialAndManufacturing");case 2:return e.next=4,t.$store.dispatch("materialAndManufacturing/editMaterialAndManufacturing",{userId:t.$store.state.user.userId,materialAndManufacturingNo:t.editNo,orderNo:t.editOrderNo,constructionNo:t.editConstructionNo,materialAndManufacturingName:t.editMaterialAndManufacturingName,unitPrice:t.editUnitPrice,num:t.editNum,money:t.editMoney,classification:t.editClassification});case 4:return t.isShowModal=!1,e.next=7,t.$store.commit("materialAndManufacturing/clearMaterialAndManufacturing");case 7:return e.next=9,t.$store.dispatch("materialAndManufacturing/getMaterialAndManufacturing",t.$store.state.user.userId);case 9:t.materialAndManufacturing=t.$store.state.materialAndManufacturing.materialAndManufacturing;case 10:case"end":return e.stop()}}),e)})))()},editCancel:function(){this.isShowModal=!1},del:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$store.commit("materialAndManufacturing/clearMaterialAndManufacturing");case 2:return n.next=4,e.$store.dispatch("materialAndManufacturing/delMaterialAndManufacturing",t);case 4:return n.next=6,e.$store.commit("materialAndManufacturing/clearMaterialAndManufacturing");case 6:return n.next=8,e.$store.dispatch("materialAndManufacturing/getMaterialAndManufacturing",e.$store.state.user.userId);case 8:e.materialAndManufacturing=e.$store.state.materialAndManufacturing.materialAndManufacturing;case 9:case"end":return n.stop()}}),n)})))()}}},c=(n(248),n(30)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"materialAndManufacturing"},[t.errMsg?n("p",{staticClass:"err-msg"},[t._v(t._s(t.message))]):t._e(),t._v(" "),n("div",{staticClass:"input-form"},[n("label",[t._v("注文番号")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.orderNo,expression:"orderNo"}],attrs:{type:"text"},domProps:{value:t.orderNo},on:{input:function(e){e.target.composing||(t.orderNo=e.target.value)}}}),t._v(" "),n("label",[t._v("製品番号")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.constructionNo,expression:"constructionNo"}],attrs:{type:"text"},domProps:{value:t.constructionNo},on:{input:function(e){e.target.composing||(t.constructionNo=e.target.value)}}}),t._v(" "),n("label",[t._v("名称")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.materialAndManufacturingName,expression:"materialAndManufacturingName"}],attrs:{type:"text"},domProps:{value:t.materialAndManufacturingName},on:{input:function(e){e.target.composing||(t.materialAndManufacturingName=e.target.value)}}}),t._v(" "),n("label",[t._v("単価")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.unitPrice,expression:"unitPrice"}],attrs:{type:"text"},domProps:{value:t.unitPrice},on:{input:function(e){e.target.composing||(t.unitPrice=e.target.value)}}}),t._v(" "),n("label",[t._v("数量")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.num,expression:"num"}],attrs:{type:"text"},domProps:{value:t.num},on:{input:function(e){e.target.composing||(t.num=e.target.value)}}}),t._v(" "),n("label",[t._v("金額")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.money,expression:"money"}],attrs:{type:"text"},domProps:{value:t.money},on:{input:function(e){e.target.composing||(t.money=e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.classification,expression:"classification"}],attrs:{type:"radio",value:"材料",name:"class"},domProps:{checked:t._q(t.classification,"材料")},on:{change:function(e){t.classification="材料"}}}),t._v("材料\n\t\t    "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.classification,expression:"classification"}],attrs:{type:"radio",value:"外注",name:"class"},domProps:{checked:t._q(t.classification,"外注")},on:{change:function(e){t.classification="外注"}}}),t._v("外注\n\t    \t"),n("button",{on:{click:t.add}},[t._v("追加")])]),t._v(" "),n("table",[t._m(0),t._v(" "),t._l(t.materialAndManufacturing,(function(e){return n("tr",{key:e.materialAndManufacturingNo},[n("td",[t._v(t._s(e.orderNo))]),t._v(" "),n("td",[t._v(t._s(e.constructionNo))]),t._v(" "),n("td",[t._v(t._s(e.materialAndManufacturingName))]),t._v(" "),n("td",[t._v(t._s(e.unitPrice)+"\n\t    \t\t")]),n("td",[t._v(t._s(e.num)+"\n\t    \t\t")]),n("td",[t._v(t._s(e.money)+"\n\t    \t\t")]),n("td",[t._v(t._s(e.classification))]),t._v(" "),n("td",[n("button",{on:{click:function(n){return t.edit(e.materialAndManufacturingNo,e.orderNo,e.constructionNo,e.materialAndManufacturingName,e.unitPrice,e.num,e.money,e.classification)}}},[t._v("編集")])]),t._v(" "),t.isShowModal?n("EditModal",{on:{close:function(e){t.isShowModal=!1}}},[n("h3",{attrs:{slot:"header"},slot:"header"},[t._v("No: "+t._s(t.editNo))]),t._v(" "),n("h3",{attrs:{slot:"body"},slot:"body"},[n("p",[t._v("注文番号")]),t._v(" "),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.editOrderNo,expression:"editOrderNo"}],attrs:{type:"text"},domProps:{value:t.editOrderNo},on:{input:function(e){e.target.composing||(t.editOrderNo=e.target.value)}}})]),t._v(" "),n("p",[t._v("製品番号")]),t._v(" "),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.editConstructionNo,expression:"editConstructionNo"}],attrs:{type:"text"},domProps:{value:t.editConstructionNo},on:{input:function(e){e.target.composing||(t.editConstructionNo=e.target.value)}}})]),t._v(" "),n("p",[t._v("名称")]),t._v(" "),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.editMaterialAndManufacturingName,expression:"editMaterialAndManufacturingName"}],attrs:{type:"text"},domProps:{value:t.editMaterialAndManufacturingName},on:{input:function(e){e.target.composing||(t.editMaterialAndManufacturingName=e.target.value)}}})]),t._v(" "),n("p",[t._v("単価")]),t._v(" "),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.editUnitPrice,expression:"editUnitPrice"}],attrs:{type:"text"},domProps:{value:t.editUnitPrice},on:{input:function(e){e.target.composing||(t.editUnitPrice=e.target.value)}}})]),t._v(" "),n("p",[t._v("数量")]),t._v(" "),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.editNum,expression:"editNum"}],attrs:{type:"text"},domProps:{value:t.editNum},on:{input:function(e){e.target.composing||(t.editNum=e.target.value)}}})]),t._v(" "),n("p",[t._v("金額")]),t._v(" "),n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.editMoney,expression:"editMoney"}],attrs:{type:"text"},domProps:{value:t.editMoney},on:{input:function(e){e.target.composing||(t.editMoney=e.target.value)}}})]),t._v(" "),n("p",[t._v("区分")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.editClassification,expression:"editClassification"}],attrs:{type:"radio",value:"材料",name:"editClass"},domProps:{checked:t._q(t.editClassification,"材料")},on:{change:function(e){t.editClassification="材料"}}}),t._v("材料\n\t\t\t\t      "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.editClassification,expression:"editClassification"}],attrs:{type:"radio",value:"外注",name:"editClass"},domProps:{checked:t._q(t.editClassification,"外注")},on:{change:function(e){t.editClassification="外注"}}}),t._v("外注\n\t\t\t\t    ")]),t._v(" "),n("h3",{attrs:{slot:"footer"},slot:"footer"},[n("button",{on:{click:function(n){return t.editOK(e.materialAndManufacturingNo)}}},[t._v("更新")]),t._v(" "),n("button",{on:{click:t.editCancel}},[t._v("キャンセル")])])]):t._e(),t._v(" "),n("td",[n("button",{on:{click:function(n){return t.del(e.materialAndManufacturingNo)}}},[t._v("削除")])])],1)}))],2)])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",[t._v("注文番号")]),t._v(" "),n("th",[t._v("製品番号")]),t._v(" "),n("th",[t._v("名称")]),t._v(" "),n("th",[t._v("単価")]),t._v(" "),n("th",[t._v("数量")]),t._v(" "),n("th",[t._v("金額")]),t._v(" "),n("th",[t._v("区分")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{EditModal:n(222).default})}}]);