/* a11y-slider - v0.0.2
* https://github.com/mmahandev/a11y-slider
* Copyright (c) 2019 mmahandev. Licensed MIT */
var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,e){return t(e={exports:{}},e.exports),e.exports}var n="object",i=function(t){return t&&t.Math==Math&&t},r=i(typeof globalThis==n&&globalThis)||i(typeof window==n&&window)||i(typeof self==n&&self)||i(typeof t==n&&t)||Function("return this")(),o=r,s={}.hasOwnProperty,a=function(t,e){return s.call(t,e)},l=function(t){try{return!!t()}catch(t){return!0}},c=!l((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})),u=function(t){return"object"==typeof t?null!==t:"function"==typeof t},d=r.document,f=u(d)&&u(d.createElement),h=function(t){return f?d.createElement(t):{}},v=!c&&!l((function(){return 7!=Object.defineProperty(h("div"),"a",{get:function(){return 7}}).a})),p=function(t){if(!u(t))throw TypeError(String(t)+" is not an object");return t},y=function(t,e){if(!u(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!u(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!u(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!u(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")},b=Object.defineProperty,g={f:c?b:function(t,e,n){if(p(t),e=y(e,!0),p(n),v)try{return b(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},S=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},m=c?function(t,e,n){return g.f(t,e,S(1,n))}:function(t,e,n){return t[e]=n,t},_=function(t,e){try{m(r,t,e)}catch(n){r[t]=e}return e},E=e((function(t){var e=r["__core-js_shared__"]||_("__core-js_shared__",{});(t.exports=function(t,n){return e[t]||(e[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.2.1",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})})),L=0,x=Math.random(),O=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++L+x).toString(36)},k=!!Object.getOwnPropertySymbols&&!l((function(){return!String(Symbol())})),C=r.Symbol,T=E("wks"),w=function(t){return T[t]||(T[t]=k&&C[t]||(k?C:O)("Symbol."+t))},j={f:w},P=g.f;!function(t){var e=o.Symbol||(o.Symbol={});a(e,t)||P(e,t,{value:j.f(t)})}("iterator");var A,M,B,N={}.propertyIsEnumerable,D=Object.getOwnPropertyDescriptor,I={f:D&&!N.call({1:2},1)?function(t){var e=D(this,t);return!!e&&e.enumerable}:N},H={}.toString,F="".split,R=l((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==function(t){return H.call(t).slice(8,-1)}(t)?F.call(t,""):Object(t)}:Object,G=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},V=function(t){return R(G(t))},q=Object.getOwnPropertyDescriptor,z={f:c?q:function(t,e){if(t=V(t),e=y(e,!0),v)try{return q(t,e)}catch(t){}if(a(t,e))return S(!I.f.call(t,e),t[e])}},W=E("native-function-to-string",Function.toString),Y=r.WeakMap,U="function"==typeof Y&&/native code/.test(W.call(Y)),K=E("keys"),J=function(t){return K[t]||(K[t]=O(t))},Q={},X=r.WeakMap;if(U){var Z=new X,$=Z.get,tt=Z.has,et=Z.set;A=function(t,e){return et.call(Z,t,e),e},M=function(t){return $.call(Z,t)||{}},B=function(t){return tt.call(Z,t)}}else{var nt=J("state");Q[nt]=!0,A=function(t,e){return m(t,nt,e),e},M=function(t){return a(t,nt)?t[nt]:{}},B=function(t){return a(t,nt)}}var it={set:A,get:M,has:B,enforce:function(t){return B(t)?M(t):A(t,{})},getterFor:function(t){return function(e){var n;if(!u(e)||(n=M(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},rt=e((function(t){var e=it.get,n=it.enforce,i=String(W).split("toString");E("inspectSource",(function(t){return W.call(t)})),(t.exports=function(t,e,o,s){var l=!!s&&!!s.unsafe,c=!!s&&!!s.enumerable,u=!!s&&!!s.noTargetGet;"function"==typeof o&&("string"!=typeof e||a(o,"name")||m(o,"name",e),n(o).source=i.join("string"==typeof e?e:"")),t!==r?(l?!u&&t[e]&&(c=!0):delete t[e],c?t[e]=o:m(t,e,o)):c?t[e]=o:_(e,o)})(Function.prototype,"toString",(function(){return"function"==typeof this&&e(this).source||W.call(this)}))})),ot=function(t){return"function"==typeof t?t:void 0},st=function(t,e){return arguments.length<2?ot(o[t])||ot(r[t]):o[t]&&o[t][e]||r[t]&&r[t][e]},at=Math.ceil,lt=Math.floor,ct=function(t){return isNaN(t=+t)?0:(t>0?lt:at)(t)},ut=Math.min,dt=Math.max,ft=Math.min,ht=function(t){return function(e,n,i){var r,o,s=V(e),a=(r=s.length)>0?ut(ct(r),9007199254740991):0,l=function(t,e){var n=ct(t);return n<0?dt(n+e,0):ft(n,e)}(i,a);if(t&&n!=n){for(;a>l;)if((o=s[l++])!=o)return!0}else for(;a>l;l++)if((t||l in s)&&s[l]===n)return t||l||0;return!t&&-1}},vt={includes:ht(!0),indexOf:ht(!1)}.indexOf,pt=function(t,e){var n,i=V(t),r=0,o=[];for(n in i)!a(Q,n)&&a(i,n)&&o.push(n);for(;e.length>r;)a(i,n=e[r++])&&(~vt(o,n)||o.push(n));return o},yt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],bt=yt.concat("length","prototype"),gt={f:Object.getOwnPropertyNames||function(t){return pt(t,bt)}},St={f:Object.getOwnPropertySymbols},mt=st("Reflect","ownKeys")||function(t){var e=gt.f(p(t)),n=St.f;return n?e.concat(n(t)):e},_t=function(t,e){for(var n=mt(e),i=g.f,r=z.f,o=0;o<n.length;o++){var s=n[o];a(t,s)||i(t,s,r(e,s))}},Et=/#|\.prototype\./,Lt=function(t,e){var n=Ot[xt(t)];return n==Ct||n!=kt&&("function"==typeof e?l(e):!!e)},xt=Lt.normalize=function(t){return String(t).replace(Et,".").toLowerCase()},Ot=Lt.data={},kt=Lt.NATIVE="N",Ct=Lt.POLYFILL="P",Tt=Lt,wt=z.f,jt=function(t,e){var n,i,o,s,a,l=t.target,c=t.global,u=t.stat;if(n=c?r:u?r[l]||_(l,{}):(r[l]||{}).prototype)for(i in e){if(s=e[i],o=t.noTargetGet?(a=wt(n,i))&&a.value:n[i],!Tt(c?i:l+(u?".":"#")+i,t.forced)&&void 0!==o){if(typeof s==typeof o)continue;_t(s,o)}(t.sham||o&&o.sham)&&m(s,"sham",!0),rt(n,i,s,t)}},Pt=Object.keys||function(t){return pt(t,yt)},At=function(t){return Object(G(t))},Mt=Object.assign,Bt=!Mt||l((function(){var t={},e={},n=Symbol();return t[n]=7,"abcdefghijklmnopqrst".split("").forEach((function(t){e[t]=t})),7!=Mt({},t)[n]||"abcdefghijklmnopqrst"!=Pt(Mt({},e)).join("")}))?function(t,e){for(var n=At(t),i=arguments.length,r=1,o=St.f,s=I.f;i>r;)for(var a,l=R(arguments[r++]),u=o?Pt(l).concat(o(l)):Pt(l),d=u.length,f=0;d>f;)a=u[f++],c&&!s.call(l,a)||(n[a]=l[a]);return n}:Mt;jt({target:"Object",stat:!0,forced:Object.assign!==Bt},{assign:Bt});var Nt,Dt,It,Ht=function(t){return function(e,n){var i,r,o=String(G(e)),s=ct(n),a=o.length;return s<0||s>=a?t?"":void 0:(i=o.charCodeAt(s))<55296||i>56319||s+1===a||(r=o.charCodeAt(s+1))<56320||r>57343?t?o.charAt(s):i:t?o.slice(s,s+2):r-56320+(i-55296<<10)+65536}},Ft={codeAt:Ht(!1),charAt:Ht(!0)},Rt=!l((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype})),Gt=J("IE_PROTO"),Vt=Object.prototype,qt=Rt?Object.getPrototypeOf:function(t){return t=At(t),a(t,Gt)?t[Gt]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?Vt:null},zt=w("iterator"),Wt=!1;[].keys&&("next"in(It=[].keys())?(Dt=qt(qt(It)))!==Object.prototype&&(Nt=Dt):Wt=!0),null==Nt&&(Nt={}),a(Nt,zt)||m(Nt,zt,(function(){return this}));var Yt={IteratorPrototype:Nt,BUGGY_SAFARI_ITERATORS:Wt},Ut=c?Object.defineProperties:function(t,e){p(t);for(var n,i=Pt(e),r=i.length,o=0;r>o;)g.f(t,n=i[o++],e[n]);return t},Kt=st("document","documentElement"),Jt=J("IE_PROTO"),Qt=function(){},Xt=function(){var t,e=h("iframe"),n=yt.length;for(e.style.display="none",Kt.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),Xt=t.F;n--;)delete Xt.prototype[yt[n]];return Xt()},Zt=Object.create||function(t,e){var n;return null!==t?(Qt.prototype=p(t),n=new Qt,Qt.prototype=null,n[Jt]=t):n=Xt(),void 0===e?n:Ut(n,e)};Q[Jt]=!0;var $t=g.f,te=w("toStringTag"),ee=function(t,e,n){t&&!a(t=n?t:t.prototype,te)&&$t(t,te,{configurable:!0,value:e})},ne=Yt.IteratorPrototype,ie=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,i){return p(n),function(t){if(!u(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype")}(i),e?t.call(n,i):n.__proto__=i,n}}():void 0),re=Yt.IteratorPrototype,oe=Yt.BUGGY_SAFARI_ITERATORS,se=w("iterator"),ae=function(){return this},le=function(t,e,n,i,r,o,s){!function(t,e,n){var i=e+" Iterator";t.prototype=Zt(ne,{next:S(1,n)}),ee(t,i,!1)}(n,e,i);var a,l,c,u=function(t){if(t===r&&p)return p;if(!oe&&t in h)return h[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},d=e+" Iterator",f=!1,h=t.prototype,v=h[se]||h["@@iterator"]||r&&h[r],p=!oe&&v||u(r),y="Array"==e&&h.entries||v;if(y&&(a=qt(y.call(new t)),re!==Object.prototype&&a.next&&(qt(a)!==re&&(ie?ie(a,re):"function"!=typeof a[se]&&m(a,se,ae)),ee(a,d,!0))),"values"==r&&v&&"values"!==v.name&&(f=!0,p=function(){return v.call(this)}),h[se]!==p&&m(h,se,p),r)if(l={values:u("values"),keys:o?p:u("keys"),entries:u("entries")},s)for(c in l)!oe&&!f&&c in h||rt(h,c,l[c]);else jt({target:e,proto:!0,forced:oe||f},l);return l},ce=Ft.charAt,ue=it.set,de=it.getterFor("String Iterator");le(String,"String",(function(t){ue(this,{type:"String Iterator",string:String(t),index:0})}),(function(){var t,e=de(this),n=e.string,i=e.index;return i>=n.length?{value:void 0,done:!0}:(t=ce(n,i),e.index+=t.length,{value:t,done:!1})}));var fe={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},he=w("unscopables"),ve=Array.prototype;null==ve[he]&&m(ve,he,Zt(null));var pe=function(t){ve[he][t]=!0},ye=it.set,be=it.getterFor("Array Iterator"),ge=le(Array,"Array",(function(t,e){ye(this,{type:"Array Iterator",target:V(t),index:0,kind:e})}),(function(){var t=be(this),e=t.target,n=t.kind,i=t.index++;return!e||i>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:i,done:!1}:"values"==n?{value:e[i],done:!1}:{value:[i,e[i]],done:!1}}),"values");pe("keys"),pe("values"),pe("entries");var Se=w("iterator"),me=w("toStringTag"),_e=ge.values;for(var Ee in fe){var Le=r[Ee],xe=Le&&Le.prototype;if(xe){if(xe[Se]!==_e)try{m(xe,Se,_e)}catch(t){xe[Se]=_e}if(xe[me]||m(xe,me,Ee),fe[Ee])for(var Oe in ge)if(xe[Oe]!==ge[Oe])try{m(xe,Oe,ge[Oe])}catch(t){xe[Oe]=ge[Oe]}}}function ke(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var Ce,Te,we=function(t,e,n){var i;return void 0===e&&(e=50),void 0===n&&(n={isImmediate:!1}),function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];var s=this,a=n.isImmediate&&void 0===i;void 0!==i&&clearTimeout(i),i=setTimeout((function(){i=void 0,n.isImmediate||t.apply(s,r)}),e),a&&t.apply(s,r)}},je=function(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild},Pe=function(t){var e=t.charCode||t.keyCode,n=t.type;return"click"===n||"keydown"===n&&(32===e||13===e)&&(t.preventDefault(),!0)};!function(t){t[t.Prev=0]="Prev",t[t.Next=1]="Next"}(Ce||(Ce={})),function(t){t[t.Enabled=0]="Enabled",t[t.Disabled=1]="Disabled"}(Te||(Te={}));var Ae=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.slider=e,this.slides=e.children,this.sliderContainer=je('<div class="a11y-slider-container"></div>'),this.activeClass="a11y-slider-active",this.visibleClass="a11y-slider-visible",this.dotsClass="a11y-slider-dots",this.sliderClass="a11y-slider",this.dots=null,this.activeSlide=this.slides[0],this.visibleSlides=[],this.sliderEnabled=Te.Disabled,this.hasCustomBtns=!!(n&&n.prevBtn||n&&n.nextBtn),this.options={container:!0,navBtns:!0,prevBtn:n&&n.prevBtn||je('<button class="a11y-slider-prev">Previous slide</button>'),nextBtn:n&&n.nextBtn||je('<button class="a11y-slider-next">Next slide</button>'),dots:!0,adaptiveHeight:!1},Object.assign(this.options,n),this._handlePrev=this._handlePrev.bind(this),this._handleNext=this._handleNext.bind(this),this._checkShouldEnableDebounced=we(this._checkShouldEnable.bind(this),250),this._handleScroll=we(this._handleScroll.bind(this),150),this._init()}var e,n,i;return e=t,(n=[{key:"_init",value:function(){this._checkShouldEnable(),window.addEventListener("resize",this._checkShouldEnableDebounced),this._dispatchEvent("init",{a11ySlider:this})}},{key:"_checkShouldEnable",value:function(){var t=this,e=!0;this.slides.length<=1&&(e=!1),this._getActiveAndVisible((function(n){n.length===t.slides.length&&(e=!1)})),e&&this.sliderEnabled===Te.Disabled?this._enableSlider():e||this.sliderEnabled!==Te.Enabled||this._disableSlider()}},{key:"_enableSlider",value:function(){this.sliderEnabled=Te.Enabled,this.options.container&&(this.slider.insertAdjacentElement("beforebegin",this.sliderContainer),this.sliderContainer.insertAdjacentElement("afterbegin",this.slider)),this.options.navBtns&&!this.hasCustomBtns&&(this.options.prevBtn instanceof HTMLElement&&this.slider.insertAdjacentElement("beforebegin",this.options.prevBtn),this.options.nextBtn instanceof HTMLElement&&this.slider.insertAdjacentElement("beforebegin",this.options.nextBtn));var t=this.options.prevBtn instanceof HTMLElement?[this.options.prevBtn]:this.options.prevBtn,e=this.options.nextBtn instanceof HTMLElement?[this.options.nextBtn]:this.options.nextBtn,n=!0,i=!1,r=void 0;try{for(var o,s=t[Symbol.iterator]();!(n=(o=s.next()).done);n=!0){var a=o.value;a.addEventListener("click",this._handlePrev,{passive:!0}),a.addEventListener("keypress",this._handlePrev,{passive:!0})}}catch(t){i=!0,r=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw r}}var l=!0,c=!1,u=void 0;try{for(var d,f=e[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){var h=d.value;h.addEventListener("click",this._handleNext,{passive:!0}),h.addEventListener("keypress",this._handleNext,{passive:!0})}}catch(t){c=!0,u=t}finally{try{l||null==f.return||f.return()}finally{if(c)throw u}}this.options.dots&&this._generateDots(),this.slider.addEventListener("scroll",this._handleScroll,!1),this._setCSS(),!0===this.options.adaptiveHeight&&this._updateHeight(this.activeSlide)}},{key:"_disableSlider",value:function(){this.sliderEnabled=Te.Disabled,document.body.contains(this.sliderContainer)&&(this.sliderContainer.insertAdjacentElement("beforebegin",this.slider),this.sliderContainer.parentNode.removeChild(this.sliderContainer));var t=this.options.prevBtn instanceof HTMLElement?[this.options.prevBtn]:this.options.prevBtn,e=this.options.nextBtn instanceof HTMLElement?[this.options.nextBtn]:this.options.nextBtn,n=!0,i=!1,r=void 0;try{for(var o,s=t[Symbol.iterator]();!(n=(o=s.next()).done);n=!0){var a=o.value;a.removeEventListener("click",this._handlePrev),a.removeEventListener("keypress",this._handlePrev),this.hasCustomBtns||a.parentNode.removeChild(a)}}catch(t){i=!0,r=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw r}}var l=!0,c=!1,u=void 0;try{for(var d,f=e[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){var h=d.value;h.removeEventListener("click",this._handleNext),h.removeEventListener("keypress",this._handleNext),this.hasCustomBtns||h.parentNode.removeChild(h)}}catch(t){c=!0,u=t}finally{try{l||null==f.return||f.return()}finally{if(c)throw u}}this._removeDots(),this.slider.removeEventListener("scroll",this._handleScroll,!1),this._removeCSS(),!0===this.options.adaptiveHeight&&this._updateHeight(!1)}},{key:"_setCSS",value:function(){this._getActiveAndVisible(),this.slider.classList.add(this.sliderClass);var t=!0,e=!1,n=void 0;try{for(var i,r=this.slides[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value;o.classList.remove(this.activeClass),o.classList.remove(this.visibleClass)}}catch(t){e=!0,n=t}finally{try{t||null==r.return||r.return()}finally{if(e)throw n}}this.activeSlide.classList.add(this.activeClass);var s=!0,a=!1,l=void 0;try{for(var c,u=this.visibleSlides[Symbol.iterator]();!(s=(c=u.next()).done);s=!0)c.value.classList.add(this.visibleClass)}catch(t){a=!0,l=t}finally{try{s||null==u.return||u.return()}finally{if(a)throw l}}this._updateDots(this.activeSlide)}},{key:"_removeCSS",value:function(){this.slider.classList.remove(this.sliderClass);var t=!0,e=!1,n=void 0;try{for(var i,r=this.slides[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value;o.classList.remove(this.activeClass),o.classList.remove(this.visibleClass)}}catch(t){e=!0,n=t}finally{try{t||null==r.return||r.return()}finally{if(e)throw n}}}},{key:"_generateDots",value:function(){var t=this;this.dots=je('<ul class="'.concat(this.dotsClass,'"></ul>'));for(var e=function(e){var n=je("<li></li>"),i=je('<button type="button"></button>');i.textContent="Move slider to item #".concat(e+1);var r=function(n){!0===Pe(n)&&t.scrollToSlide(t.slides[e])};i.addEventListener("click",r,{passive:!0}),i.addEventListener("keypress",r,{passive:!0}),n.insertAdjacentElement("beforeend",i),t.dots.insertAdjacentElement("beforeend",n)},n=0;n<this.slides.length;n++)e(n);this.slider.insertAdjacentElement("afterend",this.dots)}},{key:"_removeDots",value:function(){this.dots instanceof HTMLElement&&this.dots.parentNode.removeChild(this.dots)}},{key:"_updateDots",value:function(t){if(this.dots instanceof HTMLElement){var e=Array.prototype.indexOf.call(t.parentNode.children,t),n=!0,i=!1,r=void 0;try{for(var o,s=this.dots.children[Symbol.iterator]();!(n=(o=s.next()).done);n=!0)o.value.querySelector("button").classList.remove("active")}catch(t){i=!0,r=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw r}}this.dots.children[e].querySelector("button").classList.add("active")}}},{key:"_goPrevOrNext",value:function(t){var e=this;this._getActiveAndVisible((function(n,i){var r=e.slider.firstElementChild,o=e.slider.lastElementChild,s=n[0],a=n[n.length-1];t===Ce.Next?a===o?e.scrollToSlide(r):e.scrollToSlide(i.nextElementSibling):t===Ce.Prev&&(s===r?e.scrollToSlide(o):e.scrollToSlide(i.previousElementSibling))}))}},{key:"scrollToSlide",value:function(t){var e=!!HTMLElement.prototype.scrollTo;this._dispatchEvent("beforeChange",{currentSlide:this.activeSlide,nextSlide:t,a11ySlider:this}),!0===this.options.adaptiveHeight&&this._updateHeight(t),e?this.slider.scroll({left:t.offsetLeft,behavior:"smooth"}):this.slider.scrollLeft=t.offsetLeft,this._updateDots(t)}},{key:"_updateHeight",value:function(t){if(t instanceof HTMLElement){var e=t.offsetHeight;this.slider.style.height="".concat(e,"px")}else this.slider.style.height=""}},{key:"_getActiveAndVisible",value:function(t){var e=[],n=!0,i=!1,r=void 0;try{for(var o,s=this.slides[Symbol.iterator]();!(n=(o=s.next()).done);n=!0){var a=o.value,l=this.slider.clientWidth,c=this.slider.scrollLeft,u=a.offsetLeft;u>=c&&u<c+l&&e.push(a)}}catch(t){i=!0,r=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw r}}this.visibleSlides=e,this.activeSlide=e[0],t&&t(this.visibleSlides,this.activeSlide)}},{key:"_handlePrev",value:function(t){!0===Pe(t)&&this._goPrevOrNext(Ce.Prev)}},{key:"_handleNext",value:function(t){!0===Pe(t)&&this._goPrevOrNext(Ce.Next)}},{key:"_handleScroll",value:function(){this._setCSS(),this._dispatchEvent("afterChange",{currentSlide:this.activeSlide,a11ySlider:this})}},{key:"_dispatchEvent",value:function(t,e){var n=function(t,e){var n=document.createEvent("CustomEvent");return e=e||{bubbles:!1,cancelable:!1,detail:void 0},n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}(t,{detail:e});this.slider.dispatchEvent(n)}},{key:"destroy",value:function(){this._disableSlider(),window.removeEventListener("resize",this._checkShouldEnableDebounced),this._dispatchEvent("destroy",{a11ySlider:this})}}])&&ke(e.prototype,n),i&&ke(e,i),t}();export default Ae;