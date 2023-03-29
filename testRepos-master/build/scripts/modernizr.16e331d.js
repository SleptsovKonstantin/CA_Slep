!function(e){var t={};function __webpack_require__(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,__webpack_require__),i.l=!0,i.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},__webpack_require__.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)__webpack_require__.d(n,i,function(t){return e[t]}.bind(null,i));return n},__webpack_require__.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="/",__webpack_require__(__webpack_require__.s=250)}({250:function(e,t,n){"use strict";n.r(t);var i=n(56),m=n.n(i),_={init:function(){this.browser=this.searchString(this.dataBrowser)||"Other",this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"Unknown"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;if(this.versionSearchString=e[t].subString,-1!==n.indexOf(e[t].subString))return e[t].identity}return""},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(-1===t)return"";var n=e.indexOf("rv:");return"Trident"===this.versionSearchString&&-1!==n?parseFloat(e.substring(n+3)):parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Edge",identity:"MS Edge"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer"},{string:navigator.userAgent,subString:"Trident",identity:"Explorer"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Opera",identity:"Opera"},{string:navigator.userAgent,subString:"OPR",identity:"Opera"},{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"Safari",identity:"Safari"}]};_.init(),m.a.addTest("ipad",Boolean(navigator.userAgent.match(/iPad/i))),m.a.addTest("iphone",Boolean(navigator.userAgent.match(/iPhone/i))),m.a.addTest("ipod",Boolean(navigator.userAgent.match(/iPod/i))),m.a.addTest("ios",m.a.ipad||m.a.ipod||m.a.iphone),m.a.addTest("ie",Boolean("Explorer"===_.browser))},253:function(e,t){!function(t){var n="Modernizr"in t,i=t.Modernizr;!function(e,t,n,i){function r(e,t){return typeof e===t}function o(e){var t=A.className,n=Modernizr._config.classPrefix||"";if(x&&(t=t.baseVal),Modernizr._config.enableJSClass){var i=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(i,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(e.length>0&&(t+=" "+n+e.join(" "+n)),x?A.className.baseVal=t:A.className=t)}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):x?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function s(e,t){return!!~(""+e).indexOf(t)}function c(e,t,i,m){var _,b,S,C,k="modernizr",P=a("div"),E=function(){var e=n.body;return e||((e=a(x?"svg":"body")).fake=!0),e}();if(parseInt(i,10))for(;i--;)(S=a("div")).id=m?m[i]:k+(i+1),P.appendChild(S);return(_=a("style")).type="text/css",_.id="s"+k,(E.fake?E:P).appendChild(_),E.appendChild(P),_.styleSheet?_.styleSheet.cssText=e:_.appendChild(n.createTextNode(e)),P.id=k,E.fake&&(E.style.background="",E.style.overflow="hidden",C=A.style.overflow,A.style.overflow="hidden",A.appendChild(E)),b=t(P,e),E.fake?(E.parentNode.removeChild(E),A.style.overflow=C,A.offsetHeight):P.parentNode.removeChild(P),!!b}function l(e){return e.replace(/([A-Z])/g,(function(e,t){return"-"+t.toLowerCase()})).replace(/^ms-/,"-ms-")}function u(e,n,i){var m;if("getComputedStyle"in t){m=getComputedStyle.call(t,e,n);var _=t.console;if(null!==m)i&&(m=m.getPropertyValue(i));else if(_){_[_.error?"error":"log"].call(_,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else m=!n&&e.currentStyle&&e.currentStyle[i];return m}function f(e,n){var m=e.length;if("CSS"in t&&"supports"in t.CSS){for(;m--;)if(t.CSS.supports(l(e[m]),n))return!0;return!1}if("CSSSupportsRule"in t){for(var _=[];m--;)_.push("("+l(e[m])+":"+n+")");return c("@supports ("+(_=_.join(" or "))+") { #modernizr { position: absolute; } }",(function(e){return"absolute"===u(e,null,"position")}))}return i}function p(e){return e.replace(/([a-z])-([a-z])/g,(function(e,t,n){return t+n.toUpperCase()})).replace(/^-/,"")}function h(e,t,n,m){function d(){b&&(delete P.style,delete P.modElem)}if(m=!r(m,"undefined")&&m,!r(n,"undefined")){var _=f(e,n);if(!r(_,"undefined"))return _}for(var b,A,x,S,C,k=["modernizr","tspan","samp"];!P.style&&k.length;)b=!0,P.modElem=a(k.shift()),P.style=P.modElem.style;for(x=e.length,A=0;A<x;A++)if(S=e[A],C=P.style[S],s(S,"-")&&(S=p(S)),P.style[S]!==i){if(m||r(n,"undefined"))return d(),"pfx"!==t||S;try{P.style[S]=n}catch(e){}if(P.style[S]!==C)return d(),"pfx"!==t||S}return d(),!1}function v(e,t){return function(){return e.apply(t,arguments)}}function g(e,t,n,i,m){var _=e.charAt(0).toUpperCase()+e.slice(1),b=(e+" "+C.join(_+" ")+_).split(" ");return r(t,"string")||r(t,"undefined")?h(b,t,i,m):function(e,t,n){var i;for(var m in e)if(e[m]in t)return!1===n?e[m]:r(i=t[e[m]],"function")?v(i,n||t):i;return!1}(b=(e+" "+E.join(_+" ")+_).split(" "),t,n)}function T(e,t,n){return g(e,i,i,t,n)}function y(e,t){return e-1===t||e===t||e+1===t}function w(e,t){if("object"==typeof e)for(var n in e)I(e,n)&&w(n,e[n]);else{var i=(e=e.toLowerCase()).split("."),m=Modernizr[i[0]];if(2===i.length&&(m=m[i[1]]),void 0!==m)return Modernizr;t="function"==typeof t?t():t,1===i.length?Modernizr[i[0]]=t:(!Modernizr[i[0]]||Modernizr[i[0]]instanceof Boolean||(Modernizr[i[0]]=new Boolean(Modernizr[i[0]])),Modernizr[i[0]][i[1]]=t),o([(t&&!1!==t?"":"no-")+i.join("-")]),Modernizr._trigger(e,t)}return Modernizr}var m=[],_={_version:"3.11.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout((function(){t(n[e])}),0)},addTest:function(e,t,n){m.push({name:e,fn:t,options:n})},addAsyncTest:function(e){m.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=_,Modernizr=new Modernizr;var b=[],A=n.documentElement,x="svg"===A.nodeName.toLowerCase();Modernizr.addTest("applicationcache","applicationCache"in t),function(){var e=a("audio");Modernizr.addTest("audio",(function(){var t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t))}catch(e){}return t}));try{e.canPlayType&&(Modernizr.addTest("audio.ogg",e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"")),Modernizr.addTest("audio.mp3",e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,"")),Modernizr.addTest("audio.opus",e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,"")),Modernizr.addTest("audio.wav",e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"")),Modernizr.addTest("audio.m4a",(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,"")))}catch(e){}}(),Modernizr.addTest("canvas",(function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))})),Modernizr.addTest("contenteditable",(function(){if("contentEditable"in A){var e=a("div");return e.contentEditable=!0,"true"===e.contentEditable}})),Modernizr.addTest("contextmenu","contextMenu"in A&&"HTMLMenuItemElement"in t),Modernizr.addTest("cookies",(function(){try{n.cookie="cookietest=1";var e=-1!==n.cookie.indexOf("cookietest=");return n.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(e){return!1}}));var S="Moz O ms Webkit",C=_._config.usePrefixes?S.split(" "):[];_._cssomPrefixes=C;var k={elem:a("modernizr")};Modernizr._q.push((function(){delete k.elem}));var P={style:k.elem.style};Modernizr._q.unshift((function(){delete P.style}));var E=_._config.usePrefixes?S.toLowerCase().split(" "):[];_._domPrefixes=E,_.testAllProps=g,_.testAllProps=T,Modernizr.addTest("cssanimations",T("animationName","a",!0)),Modernizr.addTest("backdropfilter",T("backdropFilter"));var R=function(e){var n,m=O.length,_=t.CSSRule;if(void 0===_)return i;if(!e)return!1;if((n=(e=e.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in _)return"@"+e;for(var b=0;b<m;b++){var A=O[b];if(A.toUpperCase()+"_"+n in _)return"@-"+A.toLowerCase()+"-"+e}return!1};_.atRule=R;var z=_.prefixed=function(e,t,n){return 0===e.indexOf("@")?R(e):(-1!==e.indexOf("-")&&(e=p(e)),t?g(e,t,n):g(e,"pfx"))};Modernizr.addTest("backgroundblendmode",z("backgroundBlendMode","text")),Modernizr.addTest("backgroundcliptext",(function(){return T("backgroundClip","text")})),Modernizr.addTest("bgsizecover",T("backgroundSize","cover")),Modernizr.addTest("borderradius",T("borderRadius","0px",!0)),Modernizr.addTest("boxshadow",T("boxShadow","1px 1px",!0));var O=_._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];_._prefixes=O,Modernizr.addTest("csscalc",(function(){var e=a("a");return e.style.cssText="width:"+O.join("calc(10px);width:"),!!e.style.length}));var M="CSS"in t&&"supports"in t.CSS,B="supportsCSS"in t;Modernizr.addTest("supports",M||B),Modernizr.addTest("cssfilters",(function(){if(Modernizr.supports)return T("filter","blur(2px)");var e=a("a");return e.style.cssText=O.join("filter:blur(2px); "),!!e.style.length&&(n.documentMode===i||n.documentMode>9)})),Modernizr.addTest("flexbox",T("flexBasis","1px",!0));var q=_.testStyles=c;!function(){var e=navigator.userAgent,t=e.match(/w(eb)?osbrowser/gi),n=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9;return t||n}()?q('@font-face {font-family:"font";src:url("https://")}',(function(e,t){var i=n.getElementById("smodernizr"),m=i.sheet||i.styleSheet,_=m?m.cssRules&&m.cssRules[0]?m.cssRules[0].cssText:m.cssText||"":"",b=/src/i.test(_)&&0===_.indexOf(t.split(" ")[0]);Modernizr.addTest("fontface",b)})):Modernizr.addTest("fontface",!1),Modernizr.addTest("cssgradients",(function(){for(var e,t="background-image:",n="",i=0,m=O.length-1;i<m;i++)e=0===i?"to ":"",n+=t+O[i]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(n+=t+"-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));");var _=a("a").style;return _.cssText=n,(""+_.backgroundImage).indexOf("gradient")>-1}));var j=function(){var e=t.matchMedia||t.msMatchMedia;return e?function(t){var n=e(t);return n&&n.matches||!1}:function(e){var t=!1;return c("@media "+e+" { #modernizr { position: absolute; } }",(function(e){t="absolute"===u(e,null,"position")})),t}}();_.mq=j,Modernizr.addTest("mediaqueries",j("only all")),q("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}",(function(e){var t=e.getElementsByTagName("div"),n=t[0].offsetWidth===t[2].offsetWidth&&t[1].offsetWidth===t[3].offsetWidth&&t[0].offsetWidth!==t[1].offsetWidth;Modernizr.addTest("nthchild",n)}),4),Modernizr.addTest("opacity",(function(){var e=a("a").style;return e.cssText=O.join("opacity:.55;"),/^0.55$/.test(e.opacity)})),Modernizr.addTest("csspointerevents",(function(){var e=a("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents})),Modernizr.addTest("cssremunit",(function(){var e=a("a").style;try{e.fontSize="3rem"}catch(e){}return/rem/.test(e.fontSize)})),Modernizr.addTest("csstransforms",(function(){return-1===navigator.userAgent.indexOf("Android 2.")&&T("transform","scale(1)",!0)})),Modernizr.addTest("csstransforms3d",(function(){return!!T("perspective","1px",!0)})),Modernizr.addTest("preserve3d",(function(){var e,n,i=t.CSS,m=!1;return!!(i&&i.supports&&i.supports("(transform-style: preserve-3d)"))||(e=a("a"),n=a("a"),e.style.cssText="display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);",n.style.cssText="display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);",e.appendChild(n),A.appendChild(e),m=n.getBoundingClientRect(),A.removeChild(e),m.width&&m.width<4)})),Modernizr.addTest("csstransitions",T("transition","all",!0)),q("#modernizr { height: 50vh; max-height: 10px; }",(function(e){var t=parseInt(u(e,null,"height"),10);Modernizr.addTest("cssvhunit",10===t)})),q("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",(function(e){var t=e.childNodes[2],n=e.childNodes[1],i=e.childNodes[0],m=parseInt((n.offsetWidth-n.clientWidth)/2,10),_=i.clientWidth/100,b=i.clientHeight/100,A=parseInt(50*Math.max(_,b),10),x=parseInt(u(t,null,"width"),10);Modernizr.addTest("cssvmaxunit",y(A,x)||y(A,x-m))}),3),q("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",(function(e){var t=e.childNodes[2],n=e.childNodes[1],i=e.childNodes[0],m=parseInt((n.offsetWidth-n.clientWidth)/2,10),_=i.clientWidth/100,b=i.clientHeight/100,A=parseInt(50*Math.min(_,b),10),x=parseInt(u(t,null,"width"),10);Modernizr.addTest("cssvminunit",y(A,x)||y(A,x-m))}),3),q("#modernizr { width: 50vw; }",(function(e){var n=parseInt(t.innerWidth/2,10),i=parseInt(u(e,null,"width"),10);Modernizr.addTest("cssvwunit",y(i,n))})),Modernizr.addTest("willchange","willChange"in A.style),Modernizr.addTest("classlist","classList"in A),Modernizr.addTest("dataset",(function(){var e=a("div");return e.setAttribute("data-a-b","c"),!(!e.dataset||"c"!==e.dataset.aB)})),Modernizr.addTest("canvastext",(function(){return!1!==Modernizr.canvas&&"function"==typeof a("canvas").getContext("2d").fillText})),Modernizr.addTest("emoji",(function(){if(!Modernizr.canvastext)return!1;var e=a("canvas").getContext("2d"),t=12*(e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1);return e.fillStyle="#f00",e.textBaseline="top",e.font="32px Arial",e.fillText("\u{1f428}",0,0),0!==e.getImageData(t,t,1,1).data[0]})),Modernizr.addTest("devicemotion","DeviceMotionEvent"in t),Modernizr.addTest("deviceorientation","DeviceOrientationEvent"in t),Modernizr.addTest("eventlistener","addEventListener"in t),Modernizr.addTest("filereader",!!(t.File&&t.FileList&&t.FileReader));var I,N=function(){var e=!("onblur"in A);return function(t,n){var m;return!!t&&(n&&"string"!=typeof n||(n=a(n||"div")),!(m=(t="on"+t)in n)&&e&&(n.setAttribute||(n=a("div")),n.setAttribute(t,""),m="function"==typeof n[t],n[t]!==i&&(n[t]=i),n.removeAttribute(t)),m)}}();_.hasEvent=N,Modernizr.addTest("hashchange",(function(){return!1!==N("hashchange",t)&&(n.documentMode===i||n.documentMode>7)})),function(){var e={}.hasOwnProperty;I=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),_._l={},_.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout((function(){Modernizr._trigger(e,Modernizr[e])}),0)},_._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout((function(){var e;for(e=0;e<n.length;e++)(0,n[e])(t)}),0),delete this._l[e]}},Modernizr._q.push((function(){_.addTest=w})),Modernizr.addAsyncTest((function(){var e,t,n=a("img"),i="sizes"in n;!i&&"srcset"in n?("data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",t=function(){w("sizes",2===n.width)},n.onload=t,n.onerror=t,n.setAttribute("sizes","9px"),n.srcset=e+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 8w",n.src=e):w("sizes",i)})),Modernizr.addTest("json","JSON"in t&&"parse"in JSON&&"stringify"in JSON),Modernizr.addTest("fetch","fetch"in t);var L=!0;try{t.postMessage({toString:function(){L=!1}},"*")}catch(e){}Modernizr.addTest("postmessage",new Boolean("postMessage"in t)),Modernizr.addTest("postmessage.structuredclones",L),Modernizr.addTest("queryselector","querySelector"in n&&"querySelectorAll"in n),Modernizr.addTest("scriptasync","async"in a("script")),Modernizr.addTest("scriptdefer","defer"in a("script")),Modernizr.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("svgasimg",n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),Modernizr.addTest("svgfilters",(function(){var e=!1;try{e="SVGFEColorMatrixElement"in t&&2===SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(e){}return e})),Modernizr.addTest("inlinesvg",(function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"===("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)})),Modernizr.addTest("touchevents",(function(){if("ontouchstart"in t||t.TouchEvent||t.DocumentTouch&&n instanceof DocumentTouch)return!0;var e=["(",O.join("touch-enabled),("),"heartz",")"].join("");return j(e)})),function(){var e=a("video");Modernizr.addTest("video",(function(){var t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t))}catch(e){}return t}));try{e.canPlayType&&(Modernizr.addTest("video.ogg",e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,"")),Modernizr.addTest("video.h264",e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,"")),Modernizr.addTest("video.h265",e.canPlayType('video/mp4; codecs="hev1"').replace(/^no$/,"")),Modernizr.addTest("video.webm",e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")),Modernizr.addTest("video.vp9",e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,"")),Modernizr.addTest("video.hls",e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,"")),Modernizr.addTest("video.av1",e.canPlayType('video/mp4; codecs="av01"').replace(/^no$/,"")))}catch(e){}}(),Modernizr.addTest("matchmedia",!!z("matchMedia",t)),Modernizr.addTest("sharedworkers","SharedWorker"in t),Modernizr.addTest("webworkers","Worker"in t),function(){var e,t,n,i,_,A;for(var x in m)if(m.hasOwnProperty(x)){if(e=[],(t=m[x]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,_=0;_<e.length;_++)1===(A=e[_].split(".")).length?Modernizr[A[0]]=i:(Modernizr[A[0]]&&(!Modernizr[A[0]]||Modernizr[A[0]]instanceof Boolean)||(Modernizr[A[0]]=new Boolean(Modernizr[A[0]])),Modernizr[A[0]][A[1]]=i),b.push((i?"":"no-")+A.join("-"))}}(),o(b),delete _.addTest,delete _.addAsyncTest;for(var $=0;$<Modernizr._q.length;$++)Modernizr._q[$]();e.Modernizr=Modernizr}(t,t,document),e.exports=t.Modernizr,n?t.Modernizr=i:delete t.Modernizr}(window)},56:function(e,t,n){(function(t){e.exports=t.Modernizr=n(253)}).call(this,n(76))},76:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(i){"object"===typeof window&&(n=window)}e.exports=n}});