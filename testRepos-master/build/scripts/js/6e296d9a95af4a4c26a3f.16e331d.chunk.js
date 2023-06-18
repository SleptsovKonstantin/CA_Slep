(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{451:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return r})),t.d(a,"c",(function(){return l}));var n=[{id:"1high",value:"rgb(247, 0, 0, .68)"},{id:"2general",value:"rgba(255,208,34,0.8)"},{id:"3passive",value:"rgba(29,146,0,0.8)"}],r={"1high":"rgb(247, 0, 0, .3)","2general":"rgba(255,208,34,0.3)","3passive":"rgba(29,146,0,0.3)"},l={type:"",position:"",workGroup:"",plan:0,real_plan:0,openedAt:"",closedAt:"",comment:"",passiveSearchBy:"",activeSearchBy:"",link:""}},454:function(e,a,t){"use strict";t.d(a,"e",(function(){return getStaff})),t.d(a,"d",(function(){return getPossibleStaffForApplication})),t.d(a,"c",(function(){return getEmployeeSalary})),t.d(a,"a",(function(){return createEmployee})),t.d(a,"f",(function(){return updateEmployee})),t.d(a,"b",(function(){return deleteEmployee}));var n=t(18),getStaff=function(e){return new Promise((function(a){n.a.get("/staff",e).then((function(e){a(e)})).catch(console.warn)}))},getPossibleStaffForApplication=function(e){return new Promise((function(a){n.a.get("/staff/applications/possible",e).then((function(e){a(e)})).catch(console.warn)}))},getEmployeeSalary=function(e){return new Promise((function(a){n.a.get("/staff/employee/salary",e).then((function(e){a(e)})).catch(console.warn)}))},createEmployee=function(e){return new Promise((function(a,t){n.a.post("/staff",e).then((function(e){a(e)})).catch(t)}))},updateEmployee=function(e){return new Promise((function(a,t){n.a.put("/staff",e).then((function(e){a(e)})).catch(t)}))},deleteEmployee=function(e){return new Promise((function(a,t){n.a.delete("/staff",e).then((function(e){a(e)})).catch(t)}))}},460:function(e,a,t){"use strict";t(0);var n=t(1),r=t.n(n),l=t(43),ShowByPermission=function(e){var a=e.user,t=e.group,n=e.permission,r=e.any,l=e.children,c=e.team,o=e.userTeam;if(!a)return null;var i=c;if(o&&(i=a.team),a.permissions.FULL)return l;if("GLOBAL"===t)return a.permissions[t]&n?l:null;if(r&&!i){for(var s in a.permissions){if(n&&n&a.permissions[s][t])return l;if(!n&&a.permissions[s][t]>0)return l}return null}return r&&i&&a.permissions[i][t]>0||(i||"GLOBAL"===t)&&("GLOBAL"===t||i||a.permissions[t]&n)&&a.permissions[i][t]&n?l:null};ShowByPermission.propTypes={any:r.a.bool,user:r.a.object,permission:r.a.number,group:r.a.string,team:r.a.string,userTeam:r.a.bool};var c=Object(l.b)((function(e){return{user:e.auth.user}}))(ShowByPermission);a.a=c},467:function(e,a,t){"use strict";var n=t(38),r=t.n(n),l=t(0),c=t.n(l),o=(t(244),t(1)),i=t.n(o),s=t(411),u=t(487),p=t(240),d=t(413),ListSelectorTable=function(e){var a=e.items,t=e.itemIdKey,n=e.itemNameKey,l=e.label,o=e.selectedValue,i=e.onChange,m=e.dkey,b=e.className,f=e.required,y=e.multiple,g=e.renderValue;return c.a.createElement(s.a,{className:b},l&&c.a.createElement(u.a,{shrink:!0,id:"demo-simple-select-helper-label"},l),c.a.createElement(d.a,r()({labelId:"demo-simple-select-helper-label",id:"demo-simple-select-helper",value:o,MenuProps:{classes:{paper:"ListSelectorTable-select"}},onChange:i},y?{multiple:!0}:{}),!f&&c.a.createElement(p.a,{value:"",dkey:m||"",className:"empty_select"},c.a.createElement("em",null,"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435")),a.map((function(e){return c.a.createElement(p.a,{value:e[t],key:e[t],dkey:m||""},g?g(e[n],e):e[n])}))))};ListSelectorTable.propTypes={dkey:i.a.string,renderValue:i.a.func,items:i.a.array.isRequired,itemIdKey:i.a.string.isRequired,itemNameKey:i.a.string.isRequired,onChange:i.a.func.isRequired,selectedValue:i.a.any.isRequired,label:i.a.string,className:i.a.string.isRequired,required:i.a.bool,multiple:i.a.bool},a.a=ListSelectorTable},481:function(e,a,t){},484:function(e,a,t){"use strict";t.d(a,"a",(function(){return EnhancedTable}));var n=t(7),r=t.n(n),l=t(30),c=t.n(l),o=t(0),i=t.n(o),s=t(1),u=t.n(s),p=t(160),d=t.n(p),m=t(510),b=t(511),f=t(505),y=t(509),g=t(507),E=t(534),h=t(508),v=t(535),w=t(443),k=t(444),j=t(442),O=t(462),x=d()((function(e){return{root:{width:"100%"},paper:{width:"100%",marginBottom:e.spacing(2)},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}}));function ownKeys(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function _objectSpread(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?ownKeys(Object(t),!0).forEach((function(a){r()(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var Table_EnhancedTableHead=function(e){var a=e.classes,t=e.order,n=e.orderBy,r=e.subField,l=e.onRequestSort,c=e.headCells,o=e.hasActions,createSortHandler=function(e,a){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){"function"===typeof l&&n&&l(t,e,a)}},isActiveCell=function(e){return n===e.id&&r===e.subField};return i.a.createElement(g.a,null,i.a.createElement(h.a,null,c.map((function(e){return i.a.createElement(f.a,{key:"head-cell-".concat(e.id,"_").concat(e.subField||""),sortDirection:!!isActiveCell(e)&&t},i.a.createElement(v.a,{active:isActiveCell(e),hideSortIcon:!1===e.canSort,direction:isActiveCell(e)?t:"asc",onClick:createSortHandler(e.id,e.subField,e.canSort)},e.label,isActiveCell(e)?i.a.createElement("span",{className:a.visuallyHidden},"desc"===t?"sorted descending":"sorted ascending"):null))})),o&&i.a.createElement(f.a,{key:"actions"},"Actions")))};Table_EnhancedTableHead.defaultProps={order:"asc",orderBy:""},Table_EnhancedTableHead.propTypes={classes:u.a.object.isRequired,headCells:u.a.array.isRequired,onRequestSort:u.a.func,order:u.a.oneOf(["asc","desc"]),orderBy:u.a.string,subField:u.a.string,hasActions:u.a.bool};var _=d()((function(e){return{root:{width:"fit-content",paddingLeft:e.spacing(2),paddingRight:e.spacing(1)},highlight:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{display:"flex"}}})),Table_EnhancedTableToolbar=function(e){var a=_(),t=e.title,n=e.children;return i.a.createElement(w.a,{className:a.root},i.a.createElement(k.a,{className:a.title,variant:"h6",id:"tableTitle",component:"div"},t,n||""))};function EnhancedTable(e){var a=e.rows,t=e.rowsPerPage,n=e.order,r=e.orderBy,l=e.subField,s=e.headCells,u=e.idKey,p=e.page,d=e.title,g=e.loading,v=e.renderActions,w=e.renderFilters,_=e.renderTableCell,N=e.onClick,S=e.renderRow,C=e.loadData,T=e.onCellClick,P=e.checkValidRow,R=e.count,A=x(),K=Object(o.useState)({subField:l,order:n,orderBy:r,rowsPerPage:t,page:p,count:a.length||R||0}),G=c()(K,2),D=G[0],I=G[1];Object(o.useEffect)((function(){I({subField:l,order:n,orderBy:r,rowsPerPage:t,page:p,count:R||a.length||0})}),[a,R,p,t,r]);var changeConfig=function(e){I(e),C(e)},getFieldValueRaw=function(e,a){return e.subField&&a[e.id]?String(a[e.id][e.subField]||"--"):String(a[e.id]||"--")},getFieldValue=function(e,a){return _?_(e,a,getFieldValueRaw):getFieldValueRaw(e,a)},handleClick=function(e){return function(){"function"===typeof N&&N(e)}},B=Math.min(t,a.length-t);return i.a.createElement("div",{className:A.root},i.a.createElement(j.a,{className:A.paper},i.a.createElement(Table_EnhancedTableToolbar,{title:d},w&&w()),g&&i.a.createElement(O.a,null),i.a.createElement(y.a,null,i.a.createElement(m.a,{className:A.table,"aria-labelledby":"tableTitle",size:"medium","aria-label":"enhanced table"},i.a.createElement(Table_EnhancedTableHead,{classes:A,headCells:s,order:D.order,orderBy:D.orderBy,subField:D.subField,onRequestSort:function(e,a,t){var n="asc"===e?"desc":"asc",r=_objectSpread(_objectSpread({},D),{},{order:n,orderBy:a,subField:t});changeConfig(r)},hasActions:Boolean(v)}),i.a.createElement(b.a,null,a.map((function(e){return S?S({row:e,headCells:s,renderActions:v,idKey:u,getFieldValue,handleClick,onCellClick:T}):i.a.createElement(h.a,{hover:!0,role:"checkbox",tabIndex:-1,key:e[u],className:P&&P(e)?"bgError":"",onClick:handleClick(e)},s.map((function(a){return i.a.createElement(f.a,{key:"cell-".concat(e[u],"-").concat(a.id,"_").concat(a.subField||""),onClick:function(t){return T(a,e,t)},align:"left"},getFieldValue(a,e))})),v&&i.a.createElement(f.a,{key:"cell-".concat(e[u],"*action"),align:"left"},v(e)))})),a.length<=0&&i.a.createElement(h.a,null,i.a.createElement(f.a,{colSpan:6},i.a.createElement(k.a,null,"\u041d\u0435\u0442 ",d))),B>0&&i.a.createElement(h.a,{style:{height:53*B}},i.a.createElement(f.a,{colSpan:6}))))),t&&i.a.createElement(E.a,{rowsPerPageOptions:[5,10,25],component:"div",count:D.count,rowsPerPage:D.rowsPerPage,page:D.page||0,onChangePage:function(e,a){var t=_objectSpread(_objectSpread({},D),{},{page:a,order:D.order});changeConfig(t)},onChangeRowsPerPage:function(e,a){var t=_objectSpread(_objectSpread({},D),{},{rowsPerPage:a.props.value,page:0});changeConfig(t)}})))}Table_EnhancedTableToolbar.propTypes={title:u.a.string.isRequired,children:u.a.any},EnhancedTable.defaultProps={onCellClick:function(){}},EnhancedTable.propTypes={count:u.a.number,headCells:u.a.array,idKey:u.a.string,loadData:u.a.func,checkValidRow:u.a.func,loading:u.a.bool,onClick:u.a.func,onCellClick:u.a.func,order:u.a.string,orderBy:u.a.string,subField:u.a.string,page:u.a.number,renderActions:u.a.func,renderFilters:u.a.func,renderRow:u.a.func,renderTableCell:u.a.func,rows:u.a.array,rowsPerPage:u.a.number,title:u.a.string}},528:function(e,a,t){},529:function(e,a,t){},530:function(e,a,t){},531:function(e,a,t){},532:function(e,a,t){},551:function(e,a,t){"use strict";t.r(a);var n=t(162),r=t.n(n),l=t(7),c=t.n(l),o=t(17),i=t.n(o),s=t(89),u=t.n(s),p=t(30),d=t.n(p),m=t(38),b=t.n(m),f=t(0),y=t.n(f),g=t(1),E=t.n(g),h=t(43),v=(t(528),t(534)),w=t(496),k=t(552),j=t(543),O=t(243),x=t.n(O),_=t(12),N=t(453),S=t.n(N),C=t(88),T=t(454),P=t(159),R=t(19),A=t(482),K=t.n(A),G=(t(481),t(412)),D=t(157),I=t(467),B=t(58),F=t(468),L=t.n(F),V=(t(529),function(e){var a=e.state;return y.a.createElement("div",{className:"RowState"},"loading"===a&&y.a.createElement("div",{className:"RowState-loader"}),"saved"===a&&y.a.createElement("div",{className:"RowState-icon saved"},y.a.createElement(L.a,null)),"not_saved"===a&&y.a.createElement("div",{className:"RowState-icon RowState-not_saved"},y.a.createElement(L.a,null)))});V.propTypes={state:E.a.string};var q=V,M=t(451),U=t(46),z=t.n(U),W=t(181),Y=t.n(W),H=t(553),J=t(540),$=t(541),Q=t(542),X=t(445),Z=t(459),ee=t.n(Z),ae=t(444),te=t(464),ne=t.n(te),re=t(484),le=(t(530),["children","classes","onClose"]),ce=Y()((function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var a=e.children,t=e.classes,n=e.onClose,r=z()(e,le);return y.a.createElement(J.a,b()({disableTypography:!0,className:t.root},r),y.a.createElement(ae.a,{variant:"h6"},a),n?y.a.createElement(X.a,{"aria-label":"close",className:t.closeButton,onClick:n},y.a.createElement(ee.a,null)):null)})),oe=Y()((function(e){return{root:{padding:e.spacing(2)}}}))($.a),ie=Y()((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(Q.a),se=[{id:"fio",label:"\u0424\u0418\u041e"},{id:"age",label:"\u0412\u043e\u0437\u0440\u0430\u0441\u0442"},{id:"workGroup",label:"\u0413\u0440\u0443\u043f\u043f\u0430"},{id:"position",label:"\u041f\u043e\u0437\u0438\u0446\u0438\u044f"},{id:"status",label:"\u0421\u0442\u0430\u0442\u0443\u0441"},{id:"trainingDate",label:"\u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435"},{id:"internDate",label:"\u0421\u0442\u0430\u0436\u0438\u0440\u043e\u0432\u043a\u0430"},{id:"startWorkDate",label:"\u041d\u0430\u0447\u0430\u043b \u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c"},{id:"leftDate",label:"\u0423\u0432\u043e\u043b\u0435\u043d"}],ue=[{id:"fio",label:"\u0424\u0418\u041e"},{id:"age",label:"\u0412\u043e\u0437\u0440\u0430\u0441\u0442"},{id:"workGroup",label:"\u0413\u0440\u0443\u043f\u043f\u0430"},{id:"position",label:"\u041f\u043e\u0437\u0438\u0446\u0438\u044f"},{id:"result",label:"\u0421\u0442\u0430\u0442\u0443\u0441"},{id:"interviewDate",label:"\u0421\u043e\u0431\u0435\u0441\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u0435"},{id:"channel",label:"\u041a\u0430\u043d\u0430\u043b"}],LinkEmployeeModal_LinkEmployeeModal_LinkEmployeeModal=function(e){var a,t=e.isOpen,n=e.onCancel,r=e.initialValues,l=e.workGroupsIndexes,c=e.channelsIndexes,o=Object(f.useState)([]),s=d()(o,2),p=s[0],m=s[1],b=Object(f.useState)([]),g=d()(b,2),E=g[0],h=g[1],v=Object(f.useCallback)((a=l,function(e,t,n){return"leftDate"===e.id?t.leftDate?"\u0434\u0430":"\u043d\u0435\u0442 ":-1!==e.id.indexOf("Date")?t[e.id]?ne()(t[e.id]).format("YYYY-MM-DD"):"--":"status"===e.id?C.h[t.status]||"--":"workGroup"===e.id?a[t.workGroup]?a[t.workGroup].name:"--":"position"===e.id?C.q[t.position]:n(e,t)}),[]),k=Object(f.useCallback)(function(e,a){return function(t,n,r){return"channel"===t.id?a[n.channel]&&a[n.channel].name||"-":"position"===t.id?C.q[n.position]:"workGroup"===t.id?e[n.workGroup]?e[n.workGroup].name:"--":"result"===t.id?C.d[n.result]||"--":r(t,n)}}(l,c),[]),j=function(){var e=u()(i.a.mark((function _callee(){var e,a,t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(T.d)(r);case 3:e=n.sent,a=e.employees,t=e.candidates,m(a),h(t),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),console.warn(n.t0);case 13:case"end":return n.stop()}}),_callee,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();Object(f.useEffect)((function(){t&&j()}),[t]);var handleClose=function(){n()},O=E.filter((function(e){return Boolean(e.employee)})),x=E.filter((function(e){return!e.employee}));return y.a.createElement("div",null,y.a.createElement(H.a,{onClose:handleClose,"aria-labelledby":"customized-dialog-title",open:t,className:"LinkEmployeeModal"},y.a.createElement(ce,{id:"customized-dialog-title",onClose:handleClose},"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u044b\u0435 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u0438\u0437 \u0437\u0430\u044f\u0432\u043a\u0438"),y.a.createElement(oe,{dividers:!0,className:"Modal AddTeam"},y.a.createElement(re.a,{title:"\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 ".concat(p.length),idKey:"_id",headCells:se,rows:p,renderTableCell:v}),y.a.createElement(re.a,{title:"\u041a\u0430\u043d\u0434\u0438\u0434\u0430\u0442\u044b \u041d\u0430\u043d\u044f\u0442\u044b\u0435 ".concat(O.length),idKey:"_id",renderTableCell:k,headCells:ue,rows:O}),y.a.createElement(re.a,{title:"\u041a\u0430\u043d\u0434\u0438\u0434\u0430\u0442\u044b \u041d\u0435 \u043d\u0430\u043d\u044f\u0442\u044b\u0435 ".concat(x.length),idKey:"_id",renderTableCell:k,headCells:ue,rows:x})),y.a.createElement(ie,null,y.a.createElement(w.a,{autoFocus:!0,onClick:handleClose,color:"primary"},"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"))))};LinkEmployeeModal_LinkEmployeeModal_LinkEmployeeModal.propTypes={isOpen:E.a.bool,onCancel:E.a.func.isRequired,initialValues:E.a.object,workGroupsIndexes:E.a.object,channelsIndexes:E.a.object};var pe=Object(h.b)((function(e){return{workGroupsIndexes:e.app.workGroupsIndexes,channelsIndexes:e.app.channelsIndexes}}))(LinkEmployeeModal_LinkEmployeeModal_LinkEmployeeModal),de=(t(531),t(460));function ownKeys(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function _objectSpread(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?ownKeys(Object(t),!0).forEach((function(a){c()(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var me=Object(D.a)(1800),ApplicationsTableRow_prepareData=function(e){if(!e)return M.c;var a=_objectSpread(_objectSpread({},M.c),e);return a.openedAt&&(a.openedAt=Object(D.b)(a.openedAt)),a.closedAt&&(a.closedAt=Object(D.b)(a.closedAt)),a.closedAtReal&&(a.closedAtReal=Object(D.b)(a.closedAtReal)),a},prepareFoSave=function(e){return _objectSpread({},e)},ApplicationsTableRow_ApplicationsTableRow_ApplicationsTableRow=function(e){var a=e.item,t=e.workGroups,n=e.onDelete,r=e.staff,l=Object(f.useState)(ApplicationsTableRow_prepareData(a)),c=d()(l,2),o=c[0],s=c[1],p=Object(f.useState)(!1),m=d()(p,2),b=m[0],g=m[1],E=Object(f.useState)(!1),h=d()(E,2),v=h[0],w=h[1],k=Object(f.useRef)(!1),j=function(){var e=u()(i.a.mark((function _callee(e){var t,n;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(k.current){r.next=2;break}return r.abrupt("return");case 2:if(g(!0),r.prev=3,!e._id){r.next=12;break}return(t=prepareFoSave(e)).fio===a.fio&&delete t.fio,r.next=9,Object(P.e)(t);case 9:return k.current=!1,g(!1),r.abrupt("return");case 12:return r.next=14,Object(P.a)(e);case 14:n=r.sent,s(ApplicationsTableRow_prepareData(n)),k.current=!1,g(!1),r.next=24;break;case 20:r.prev=20,r.t0=r.catch(3),B.a.error(r.t0),console.error(r.t0);case 24:case"end":return r.stop()}}),_callee,null,[[3,20]])})));return function(a){return e.apply(this,arguments)}}(),handleChangeInput=function(e){var t=e.target,n=t.value,r=t.getAttribute("dkey"),l=_objectSpread({},o),c=r.split(".");c.length>1?l[c[0]][c[1]]=n:l[r]=n,s(l),me(a._id||"row",j,l),k.current=!0},handleKeyUp=function(e){13===e.keyCode&&j(o)},handleChangeSelect=function(e,t){if(t&&t.props){var n=t.props,r=n.dkey,l=n.value,c=_objectSpread({},o),i=r.split(".");i.length>1?c[i[0]][i[1]]=l:c[r]=l,s(c),me(a._id||"row",j,c),k.current=!0}},O=function(){var e=u()(i.a.mark((function _callee2(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.confirm("\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0423\u0414\u0410\u041b\u0418\u0422\u042c \u0417\u0430\u044f\u0432\u043a\u0443 \n".concat(o.fio))){e.next=2;break}return e.abrupt("return");case 2:if(g(!0),e.prev=3,o._id){e.next=7;break}return n(),e.abrupt("return");case 7:return e.next=9,Object(P.b)(o._id);case 9:n(o._id),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),console.warn("deleteCandidate",e.t0);case 15:case"end":return e.stop()}}),_callee2,null,[[3,12]])})));return function(){return e.apply(this,arguments)}}(),x=b?"loading":k.current?"not_saved":"saved";return y.a.createElement("div",{className:"ExcelTableRow ExcelTableRow-position-".concat(o.position||""," ApplicationsTableRow")},v&&y.a.createElement(pe,{isOpen:!0,onCancel:function(){w(!1)},initialValues:o}),y.a.createElement("label",{className:"ExcelTableRow-input xs05 first_input"},y.a.createElement(I.a,{items:M.a,renderValue:function(e){return y.a.createElement("div",{className:"ApplicationsTableRow-type",style:{background:e}})},itemIdKey:"id",itemNameKey:"value",dkey:"type",onChange:handleChangeSelect,selectedValue:o.type||"",className:""})),y.a.createElement("label",{className:"ExcelTableRow-input xs1_5 sp"},y.a.createElement(I.a,{items:C.a,itemIdKey:"id",itemNameKey:"value",dkey:"position",onChange:handleChangeSelect,selectedValue:o.position||"",className:""})),y.a.createElement("label",{className:"ExcelTableRow-input xs2 "},y.a.createElement(I.a,{items:t||[],itemIdKey:"_id",dkey:"workGroup",itemNameKey:"name",onChange:handleChangeSelect,selectedValue:o.workGroup||"",className:""})),y.a.createElement("label",{className:"ExcelTableRow-input xs08"},y.a.createElement("input",{onKeyUp:handleKeyUp,value:o.plan,dkey:"plan",onChange:handleChangeInput})),y.a.createElement("label",{className:"ExcelTableRow-input xs08 textOnly",title:"\u041f\u0440\u043e\u0448\u043b\u0438 2 \u043d\u0435\u0434\u0435\u043b\u0438/ \u041d\u0435 \u043f\u0440\u043e\u0448\u043b\u0438 2 \u043d\u0435\u0434\u0435\u043b\u0438",onClick:function(){return w(!0)}},o.countLess2Weeks||0,"/",o.countMore2Weeks||0),y.a.createElement("label",{className:"ExcelTableRow-input xs1_5 sp"},y.a.createElement("input",{onKeyUp:handleKeyUp,type:"date",value:o.openedAt,dkey:"openedAt",onChange:handleChangeInput})),y.a.createElement("label",{className:"ExcelTableRow-input xs1_5 sp"},y.a.createElement("input",{onKeyUp:handleKeyUp,type:"date",value:o.closedAt,dkey:"closedAt",onChange:handleChangeInput})),y.a.createElement("label",{className:"ExcelTableRow-input xs1_5 sp"},y.a.createElement("input",{onKeyUp:handleKeyUp,type:"date",value:o.closedAtReal,dkey:"closedAtReal",onChange:handleChangeInput})),y.a.createElement(de.a,{group:"GLOBAL",permission:R.h.GLOBAL.RECRUITING_REPORTS},y.a.createElement(y.a.Fragment,null,y.a.createElement("div",{className:"ExcelTableRow-input xs2 sp"},y.a.createElement(I.a,{items:r,itemIdKey:"_id",itemNameKey:"fio",dkey:"passiveSearchBy",onChange:handleChangeSelect,selectedValue:o.passiveSearchBy||"",className:""})),y.a.createElement("div",{className:"ExcelTableRow-input xs2 sp"},y.a.createElement(I.a,{items:r,itemIdKey:"_id",itemNameKey:"fio",dkey:"activeSearchBy",onChange:handleChangeSelect,selectedValue:o.activeSearchBy||"",className:""})))),y.a.createElement("label",{className:"ExcelTableRow-input xs1_5"},y.a.createElement("input",{onKeyUp:handleKeyUp,value:o.link,dkey:"link",onChange:handleChangeInput})),y.a.createElement("label",{className:"ExcelTableRow-input xs1_5"},y.a.createElement("input",{onKeyUp:handleKeyUp,value:o.vacancy,dkey:"vacancy",onChange:handleChangeInput})),y.a.createElement("label",{className:"ExcelTableRow-input xs5 first_input"},y.a.createElement(G.a,{dkey:"comment",onChange:handleChangeInput,onKeyUp:handleKeyUp,value:o.comment,"aria-label":"minimum height",rowsMax:2,placeholder:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438"})),y.a.createElement("label",{className:"ExcelTableRow-input xs05"},y.a.createElement(q,{state:x}),y.a.createElement(K.a,{className:"DeleteItem",onClick:O})))};ApplicationsTableRow_ApplicationsTableRow_ApplicationsTableRow.propTypes={item:E.a.object,workGroups:E.a.array,staff:E.a.array,onDelete:E.a.func};var be=ApplicationsTableRow_ApplicationsTableRow_ApplicationsTableRow,fe=(t(164),t(532),function(e){var a=e.data,t=e.workGroups,n=e.handleDelete,r=e.staff;return y.a.createElement("div",{className:"ExcelTable ApplicationsTable"},y.a.createElement("div",{className:"ExcelTable-header"},y.a.createElement("div",{className:"ExcelTable-col xs05 first_input"},"\u0412\u0438\u0434"),y.a.createElement("div",{className:"ExcelTable-col xs1_5 "},"\u041f\u043e\u0437\u0438\u0446\u0438\u044f"),y.a.createElement("div",{className:"ExcelTable-col xs2 "},"\u0420\u0430\u0431\u043e\u0447\u0430\u044f \u0433\u0440\u0443\u043f\u043f\u0430"),y.a.createElement("div",{className:"ExcelTable-col xs08"},"\u041f\u043b\u0430\u043d \u043d\u0430\u0439\u043c\u0430"),y.a.createElement("div",{className:"ExcelTable-col xs08"},"\u0424\u0430\u043a\u0442 \u043d\u0430\u0439\u043c\u0430"),y.a.createElement("div",{className:"ExcelTable-col xs1_5"},"\u0414\u0430\u0442\u0430 \u043e\u0442\u043a\u0440"),y.a.createElement("div",{className:"ExcelTable-col xs1_5"},"\u0414\u0430\u0442\u0430 \u0437\u0430\u043a\u0440"),y.a.createElement("div",{className:"ExcelTable-col xs1_5"},"\u0414\u0430\u0442\u0430 \u0437\u0430\u043a\u0440 \u0424\u0430\u043a\u0442"),y.a.createElement(de.a,{group:"GLOBAL",permission:R.h.GLOBAL.RECRUITING_REPORTS},y.a.createElement(y.a.Fragment,null,y.a.createElement("div",{className:"ExcelTable-col xs2"},"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u043f\u0430\u0441.\u043f"),y.a.createElement("div",{className:"ExcelTable-col xs2"},"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u0430\u043a\u0442.\u043f"))),y.a.createElement("div",{className:"ExcelTable-col xs1_5"},"\u0421\u0441\u044b\u043b\u043a\u0430"),y.a.createElement("div",{className:"ExcelTable-col xs1_5"},"\u0412\u0430\u043a\u0430\u043d\u0441\u0438\u044f"),y.a.createElement("div",{className:"ExcelTable-col xs5 "},"\u041a\u043e\u043c\u043c\u0435\u043d\u0442"),y.a.createElement("div",{className:"ExcelTable-col xs05"})),y.a.createElement("div",{className:"ExcelTable-content"},(Array.isArray(a)?a:[]).map((function(e,a){return y.a.createElement(be,{item:e,staff:r,key:e._id||e.createdAt,workGroups:t,onDelete:n(a)})}))))});fe.propTypes={data:E.a.array,staff:E.a.array,workGroups:E.a.array,handleDelete:E.a.func};var ye=fe,ge=t(127);function applications_ownKeys(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function applications_objectSpread(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?applications_ownKeys(Object(t),!0).forEach((function(a){c()(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):applications_ownKeys(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var Ee=Object(_.a)({root:{color:x.a[400],"&$checked":{color:x.a[400]}},checked:{}})((function(e){return y.a.createElement(k.a,b()({color:"default"},e))})),applicationsComparator=function(e,a){return e.type>a.type?1:e.type<a.type||e.openedAt>a.openedAt?-1:e.openedAt<a.openedAt?1:0},applications_Applications=function(e){e.location;var a=e.workGroups,t=Object(f.useState)([]),n=d()(t,2),l=n[0],c=n[1],o=Object(f.useState)([]),s=d()(o,2),p=s[0],m=s[1],b=Object(f.useState)(null),g=d()(b,2),E=g[0],h=g[1],k=Object(f.useState)({position:"",result:"",month:(new Date).getMonth(),team:"",workGroup:"",showClosed:!1}),O=d()(k,2),x=O[0],_=O[1],N=function(){var e=u()(i.a.mark((function _callee(){var e;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(T.e)({positions:["hr","recruiter"]});case 2:e=a.sent,c(e.items),h({count:e.count,limit:e.limit,page:e.skip/e.limit});case 5:case"end":return a.stop()}}),_callee)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=u()(i.a.mark((function _callee2(){var e,a,t=arguments;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=t.length>0&&void 0!==t[0]?t[0]:{},n.next=3,Object(P.c)(e);case 3:a=n.sent,m(a.items.sort(applicationsComparator)),h({count:a.count,limit:a.limit,page:a.skip/a.limit});case 6:case"end":return n.stop()}}),_callee2)})));return function(){return e.apply(this,arguments)}}();Object(f.useEffect)((function(){N(),A(applications_objectSpread({},x))}),[]);var handleChangeSelect=function(e,a){if(a&&a.props){var t=a.props,n=t.dkey,r=t.value,l=applications_objectSpread(applications_objectSpread({},E||{}),{},{page:0});"workGroup"===n&&(localStorage.setItem("workGroup_int",r||""),h(l));var c=applications_objectSpread({},x);c[n]=r||"",_(c),A(applications_objectSpread(applications_objectSpread({},l),c))}};return y.a.createElement("div",{className:"Interview"},y.a.createElement("div",{className:"Interview-filters"},y.a.createElement("div",{className:"Interview-filters-selectors"},y.a.createElement("div",{className:"mr10"},y.a.createElement(w.a,{variant:"contained",color:"primary",size:"small",onClick:function(){var e=r()(p);e.sort(applicationsComparator),e.unshift(applications_objectSpread(applications_objectSpread({},M.c),{},{openedAt:new Date,createdAt:new Date})),m(e)},className:"ExcelTable-addBtn",startIcon:y.a.createElement(S.a,null)},"\u0417\u0430\u044f\u0432\u043a\u0430")),y.a.createElement(ge.a,{label:"\u041c\u0435\u0441\u044f\u0446",items:R.g,itemIdKey:"id",dkey:"month",itemNameKey:"value",onChange:handleChangeSelect,selectedValue:x.month||"",className:""}),y.a.createElement(ge.a,{label:"\u041f\u043e\u0437\u0438\u0446\u0438\u044f",items:C.p,itemIdKey:"id",itemNameKey:"value",dkey:"position",onChange:handleChangeSelect,selectedValue:x.position||"",className:""}),y.a.createElement(ge.a,{label:"\u0420\u0430\u0431\u043e\u0447\u0430\u044f \u0433\u0440\u0443\u043f\u043f\u0430",items:a,itemIdKey:"_id",itemNameKey:"name",dkey:"workGroup",onChange:handleChangeSelect,selectedValue:x.workGroup||"",className:""}),y.a.createElement(j.a,{control:y.a.createElement(Ee,{checked:x.onlyMy,onChange:function(e){var a=applications_objectSpread({},x);a.showClosed=e.target.checked,_(a),A(applications_objectSpread(applications_objectSpread({},E),a))},name:"checkedB",color:"primary"}),label:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0435"})),y.a.createElement("div",{className:"Interview-filters-search"})),y.a.createElement(ye,{data:p,staff:l,workGroups:a,handleDelete:function(e){return function(a){m(a?p.filter((function(e){return e._id!==a})).sort(applicationsComparator):p.filter((function(a,t){return t!==e})).sort(applicationsComparator))}}}),E&&y.a.createElement(v.a,{rowsPerPageOptions:[5,10,15,20,25],component:"div",count:E.count,rowsPerPage:E.limit,page:E.page||0,onChangePage:function(e,a){var t=applications_objectSpread(applications_objectSpread({},E),{},{page:a});A(applications_objectSpread(applications_objectSpread({},t),x))},onChangeRowsPerPage:function(e,a){var t=applications_objectSpread(applications_objectSpread({},E),{},{limit:a.props.value,page:0});A(applications_objectSpread(applications_objectSpread({},t),x))}}))};applications_Applications.propTypes={location:E.a.object,workGroups:E.a.array};a.default=Object(h.b)((function(e){return{user:e.auth.user,teams:e.app.teams,workGroups:e.app.workGroups}}))(applications_Applications)}}]);