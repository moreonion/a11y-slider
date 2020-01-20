/* a11y-slider - v0.1.1
* https://github.com/mmahandev/a11y-slider
* Copyright (c) 2020 mmahandev. Licensed MIT */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).A11YSlider=e()}(this,(function(){"use strict";var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,e){return t(e={exports:{}},e.exports),e.exports}var n=function(t){return t&&t.Math==Math&&t},i=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof t&&t)||Function("return this")(),r=function(t){try{return!!t()}catch(t){return!0}},o=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),s={}.propertyIsEnumerable,a=Object.getOwnPropertyDescriptor,l={f:a&&!s.call({1:2},1)?function(t){var e=a(this,t);return!!e&&e.enumerable}:s},u=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},c={}.toString,d=function(t){return c.call(t).slice(8,-1)},f="".split,h=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==d(t)?f.call(t,""):Object(t)}:Object,v=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},p=function(t){return h(v(t))},y=function(t){return"object"==typeof t?null!==t:"function"==typeof t},b=function(t,e){if(!y(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!y(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!y(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!y(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")},g={}.hasOwnProperty,m=function(t,e){return g.call(t,e)},S=i.document,_=y(S)&&y(S.createElement),w=function(t){return _?S.createElement(t):{}},E=!o&&!r((function(){return 7!=Object.defineProperty(w("div"),"a",{get:function(){return 7}}).a})),A=Object.getOwnPropertyDescriptor,O={f:o?A:function(t,e){if(t=p(t),e=b(e,!0),E)try{return A(t,e)}catch(t){}if(m(t,e))return u(!l.f.call(t,e),t[e])}},L=function(t){if(!y(t))throw TypeError(String(t)+" is not an object");return t},k=Object.defineProperty,x={f:o?k:function(t,e,n){if(L(t),e=b(e,!0),L(n),E)try{return k(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},C=o?function(t,e,n){return x.f(t,e,u(1,n))}:function(t,e,n){return t[e]=n,t},j=function(t,e){try{C(i,t,e)}catch(n){i[t]=e}return e},T=i["__core-js_shared__"]||j("__core-js_shared__",{}),P=Function.toString;"function"!=typeof T.inspectSource&&(T.inspectSource=function(t){return P.call(t)});var N,D,M,H=T.inspectSource,I=i.WeakMap,B="function"==typeof I&&/native code/.test(H(I)),F=e((function(t){(t.exports=function(t,e){return T[t]||(T[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.4",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),R=0,z=Math.random(),G=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++R+z).toString(36)},V=F("keys"),W=function(t){return V[t]||(V[t]=G(t))},q={},Y=i.WeakMap;if(B){var U=new Y,J=U.get,$=U.has,K=U.set;N=function(t,e){return K.call(U,t,e),e},D=function(t){return J.call(U,t)||{}},M=function(t){return $.call(U,t)}}else{var Q=W("state");q[Q]=!0,N=function(t,e){return C(t,Q,e),e},D=function(t){return m(t,Q)?t[Q]:{}},M=function(t){return m(t,Q)}}var X,Z={set:N,get:D,has:M,enforce:function(t){return M(t)?D(t):N(t,{})},getterFor:function(t){return function(e){var n;if(!y(e)||(n=D(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},tt=e((function(t){var e=Z.get,n=Z.enforce,r=String(String).split("String");(t.exports=function(t,e,o,s){var a=!!s&&!!s.unsafe,l=!!s&&!!s.enumerable,u=!!s&&!!s.noTargetGet;"function"==typeof o&&("string"!=typeof e||m(o,"name")||C(o,"name",e),n(o).source=r.join("string"==typeof e?e:"")),t!==i?(a?!u&&t[e]&&(l=!0):delete t[e],l?t[e]=o:C(t,e,o)):l?t[e]=o:j(e,o)})(Function.prototype,"toString",(function(){return"function"==typeof this&&e(this).source||H(this)}))})),et=i,nt=function(t){return"function"==typeof t?t:void 0},it=function(t,e){return arguments.length<2?nt(et[t])||nt(i[t]):et[t]&&et[t][e]||i[t]&&i[t][e]},rt=Math.ceil,ot=Math.floor,st=function(t){return isNaN(t=+t)?0:(t>0?ot:rt)(t)},at=Math.min,lt=function(t){return t>0?at(st(t),9007199254740991):0},ut=Math.max,ct=Math.min,dt=function(t){return function(e,n,i){var r,o=p(e),s=lt(o.length),a=function(t,e){var n=st(t);return n<0?ut(n+e,0):ct(n,e)}(i,s);if(t&&n!=n){for(;s>a;)if((r=o[a++])!=r)return!0}else for(;s>a;a++)if((t||a in o)&&o[a]===n)return t||a||0;return!t&&-1}},ft={includes:dt(!0),indexOf:dt(!1)},ht=ft.indexOf,vt=function(t,e){var n,i=p(t),r=0,o=[];for(n in i)!m(q,n)&&m(i,n)&&o.push(n);for(;e.length>r;)m(i,n=e[r++])&&(~ht(o,n)||o.push(n));return o},pt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],yt=pt.concat("length","prototype"),bt={f:Object.getOwnPropertyNames||function(t){return vt(t,yt)}},gt={f:Object.getOwnPropertySymbols},mt=it("Reflect","ownKeys")||function(t){var e=bt.f(L(t)),n=gt.f;return n?e.concat(n(t)):e},St=function(t,e){for(var n=mt(e),i=x.f,r=O.f,o=0;o<n.length;o++){var s=n[o];m(t,s)||i(t,s,r(e,s))}},_t=/#|\.prototype\./,wt=function(t,e){var n=At[Et(t)];return n==Lt||n!=Ot&&("function"==typeof e?r(e):!!e)},Et=wt.normalize=function(t){return String(t).replace(_t,".").toLowerCase()},At=wt.data={},Ot=wt.NATIVE="N",Lt=wt.POLYFILL="P",kt=wt,xt=O.f,Ct=function(t,e){var n,r,o,s,a,l=t.target,u=t.global,c=t.stat;if(n=u?i:c?i[l]||j(l,{}):(i[l]||{}).prototype)for(r in e){if(s=e[r],o=t.noTargetGet?(a=xt(n,r))&&a.value:n[r],!kt(u?r:l+(c?".":"#")+r,t.forced)&&void 0!==o){if(typeof s==typeof o)continue;St(s,o)}(t.sham||o&&o.sham)&&C(s,"sham",!0),tt(n,r,s,t)}},jt=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())})),Tt=jt&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Pt=Array.isArray||function(t){return"Array"==d(t)},Nt=function(t){return Object(v(t))},Dt=Object.keys||function(t){return vt(t,pt)},Mt=o?Object.defineProperties:function(t,e){L(t);for(var n,i=Dt(e),r=i.length,o=0;r>o;)x.f(t,n=i[o++],e[n]);return t},Ht=it("document","documentElement"),It=W("IE_PROTO"),Bt=function(){},Ft=function(t){return"<script>"+t+"<\/script>"},Rt=function(){try{X=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;Rt=X?function(t){t.write(Ft("")),t.close();var e=t.parentWindow.Object;return t=null,e}(X):((e=w("iframe")).style.display="none",Ht.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(Ft("document.F=Object")),t.close(),t.F);for(var n=pt.length;n--;)delete Rt.prototype[pt[n]];return Rt()};q[It]=!0;var zt=Object.create||function(t,e){var n;return null!==t?(Bt.prototype=L(t),n=new Bt,Bt.prototype=null,n[It]=t):n=Rt(),void 0===e?n:Mt(n,e)},Gt=bt.f,Vt={}.toString,Wt="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],qt={f:function(t){return Wt&&"[object Window]"==Vt.call(t)?function(t){try{return Gt(t)}catch(t){return Wt.slice()}}(t):Gt(p(t))}},Yt=F("wks"),Ut=i.Symbol,Jt=Tt?Ut:Ut&&Ut.withoutSetter||G,$t=function(t){return m(Yt,t)||(jt&&m(Ut,t)?Yt[t]=Ut[t]:Yt[t]=Jt("Symbol."+t)),Yt[t]},Kt={f:$t},Qt=x.f,Xt=function(t){var e=et.Symbol||(et.Symbol={});m(e,t)||Qt(e,t,{value:Kt.f(t)})},Zt=x.f,te=$t("toStringTag"),ee=function(t,e,n){t&&!m(t=n?t:t.prototype,te)&&Zt(t,te,{configurable:!0,value:e})},ne=function(t,e,n){if(function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function")}(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}},ie=$t("species"),re=function(t,e){var n;return Pt(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!Pt(n.prototype)?y(n)&&null===(n=n[ie])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},oe=[].push,se=function(t){var e=1==t,n=2==t,i=3==t,r=4==t,o=6==t,s=5==t||o;return function(a,l,u,c){for(var d,f,v=Nt(a),p=h(v),y=ne(l,u,3),b=lt(p.length),g=0,m=c||re,S=e?m(a,b):n?m(a,0):void 0;b>g;g++)if((s||g in p)&&(f=y(d=p[g],g,v),t))if(e)S[g]=f;else if(f)switch(t){case 3:return!0;case 5:return d;case 6:return g;case 2:oe.call(S,d)}else if(r)return!1;return o?-1:i||r?r:S}},ae={forEach:se(0),map:se(1),filter:se(2),some:se(3),every:se(4),find:se(5),findIndex:se(6)}.forEach,le=W("hidden"),ue=$t("toPrimitive"),ce=Z.set,de=Z.getterFor("Symbol"),fe=Object.prototype,he=i.Symbol,ve=it("JSON","stringify"),pe=O.f,ye=x.f,be=qt.f,ge=l.f,me=F("symbols"),Se=F("op-symbols"),_e=F("string-to-symbol-registry"),we=F("symbol-to-string-registry"),Ee=F("wks"),Ae=i.QObject,Oe=!Ae||!Ae.prototype||!Ae.prototype.findChild,Le=o&&r((function(){return 7!=zt(ye({},"a",{get:function(){return ye(this,"a",{value:7}).a}})).a}))?function(t,e,n){var i=pe(fe,e);i&&delete fe[e],ye(t,e,n),i&&t!==fe&&ye(fe,e,i)}:ye,ke=function(t,e){var n=me[t]=zt(he.prototype);return ce(n,{type:"Symbol",tag:t,description:e}),o||(n.description=e),n},xe=Tt?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof he},Ce=function(t,e,n){t===fe&&Ce(Se,e,n),L(t);var i=b(e,!0);return L(n),m(me,i)?(n.enumerable?(m(t,le)&&t[le][i]&&(t[le][i]=!1),n=zt(n,{enumerable:u(0,!1)})):(m(t,le)||ye(t,le,u(1,{})),t[le][i]=!0),Le(t,i,n)):ye(t,i,n)},je=function(t,e){L(t);var n=p(e),i=Dt(n).concat(De(n));return ae(i,(function(e){o&&!Te.call(n,e)||Ce(t,e,n[e])})),t},Te=function(t){var e=b(t,!0),n=ge.call(this,e);return!(this===fe&&m(me,e)&&!m(Se,e))&&(!(n||!m(this,e)||!m(me,e)||m(this,le)&&this[le][e])||n)},Pe=function(t,e){var n=p(t),i=b(e,!0);if(n!==fe||!m(me,i)||m(Se,i)){var r=pe(n,i);return!r||!m(me,i)||m(n,le)&&n[le][i]||(r.enumerable=!0),r}},Ne=function(t){var e=be(p(t)),n=[];return ae(e,(function(t){m(me,t)||m(q,t)||n.push(t)})),n},De=function(t){var e=t===fe,n=be(e?Se:p(t)),i=[];return ae(n,(function(t){!m(me,t)||e&&!m(fe,t)||i.push(me[t])})),i};if(jt||(tt((he=function(){if(this instanceof he)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=G(t),n=function(t){this===fe&&n.call(Se,t),m(this,le)&&m(this[le],e)&&(this[le][e]=!1),Le(this,e,u(1,t))};return o&&Oe&&Le(fe,e,{configurable:!0,set:n}),ke(e,t)}).prototype,"toString",(function(){return de(this).tag})),tt(he,"withoutSetter",(function(t){return ke(G(t),t)})),l.f=Te,x.f=Ce,O.f=Pe,bt.f=qt.f=Ne,gt.f=De,Kt.f=function(t){return ke($t(t),t)},o&&(ye(he.prototype,"description",{configurable:!0,get:function(){return de(this).description}}),tt(fe,"propertyIsEnumerable",Te,{unsafe:!0}))),Ct({global:!0,wrap:!0,forced:!jt,sham:!jt},{Symbol:he}),ae(Dt(Ee),(function(t){Xt(t)})),Ct({target:"Symbol",stat:!0,forced:!jt},{for:function(t){var e=String(t);if(m(_e,e))return _e[e];var n=he(e);return _e[e]=n,we[n]=e,n},keyFor:function(t){if(!xe(t))throw TypeError(t+" is not a symbol");if(m(we,t))return we[t]},useSetter:function(){Oe=!0},useSimple:function(){Oe=!1}}),Ct({target:"Object",stat:!0,forced:!jt,sham:!o},{create:function(t,e){return void 0===e?zt(t):je(zt(t),e)},defineProperty:Ce,defineProperties:je,getOwnPropertyDescriptor:Pe}),Ct({target:"Object",stat:!0,forced:!jt},{getOwnPropertyNames:Ne,getOwnPropertySymbols:De}),Ct({target:"Object",stat:!0,forced:r((function(){gt.f(1)}))},{getOwnPropertySymbols:function(t){return gt.f(Nt(t))}}),ve){var Me=!jt||r((function(){var t=he();return"[null]"!=ve([t])||"{}"!=ve({a:t})||"{}"!=ve(Object(t))}));Ct({target:"JSON",stat:!0,forced:Me},{stringify:function(t,e,n){for(var i,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(i=e,(y(e)||void 0!==t)&&!xe(t))return Pt(e)||(e=function(t,e){if("function"==typeof i&&(e=i.call(this,t,e)),!xe(e))return e}),r[1]=e,ve.apply(null,r)}})}he.prototype[ue]||C(he.prototype,ue,he.prototype.valueOf),ee(he,"Symbol"),q[le]=!0;var He=x.f,Ie=i.Symbol;if(o&&"function"==typeof Ie&&(!("description"in Ie.prototype)||void 0!==Ie().description)){var Be={},Fe=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof Fe?new Ie(t):void 0===t?Ie():Ie(t);return""===t&&(Be[e]=!0),e};St(Fe,Ie);var Re=Fe.prototype=Ie.prototype;Re.constructor=Fe;var ze=Re.toString,Ge="Symbol(test)"==String(Ie("test")),Ve=/^Symbol\((.*)\)[^)]+$/;He(Re,"description",{configurable:!0,get:function(){var t=y(this)?this.valueOf():this,e=ze.call(t);if(m(Be,t))return"";var n=Ge?e.slice(7,-1):e.replace(Ve,"$1");return""===n?void 0:n}}),Ct({global:!0,forced:!0},{Symbol:Fe})}Xt("iterator");var We=Object.defineProperty,qe={},Ye=function(t){throw t},Ue=ft.indexOf,Je=[].indexOf,$e=!!Je&&1/[1].indexOf(1,-0)<0,Ke=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}("indexOf"),Qe=function(t,e){if(m(qe,t))return qe[t];e||(e={});var n=[][t],i=!!m(e,"ACCESSORS")&&e.ACCESSORS,s=m(e,0)?e[0]:Ye,a=m(e,1)?e[1]:void 0;return qe[t]=!!n&&!r((function(){if(i&&!o)return!0;var t={length:-1};i?We(t,1,{enumerable:!0,get:Ye}):t[1]=1,n.call(t,s,a)}))}("indexOf",{ACCESSORS:!0,1:0});Ct({target:"Array",proto:!0,forced:$e||!Ke||!Qe},{indexOf:function(t){return $e?Je.apply(this,arguments)||0:Ue(this,t,arguments.length>1?arguments[1]:void 0)}});var Xe=$t("unscopables"),Ze=Array.prototype;null==Ze[Xe]&&x.f(Ze,Xe,{configurable:!0,value:zt(null)});var tn,en,nn,rn=function(t){Ze[Xe][t]=!0},on=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype})),sn=W("IE_PROTO"),an=Object.prototype,ln=on?Object.getPrototypeOf:function(t){return t=Nt(t),m(t,sn)?t[sn]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?an:null},un=$t("iterator"),cn=!1;[].keys&&("next"in(nn=[].keys())?(en=ln(ln(nn)))!==Object.prototype&&(tn=en):cn=!0),null==tn&&(tn={}),m(tn,un)||C(tn,un,(function(){return this}));var dn={IteratorPrototype:tn,BUGGY_SAFARI_ITERATORS:cn},fn=dn.IteratorPrototype,hn=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,i){return L(n),function(t){if(!y(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype")}(i),e?t.call(n,i):n.__proto__=i,n}}():void 0),vn=dn.IteratorPrototype,pn=dn.BUGGY_SAFARI_ITERATORS,yn=$t("iterator"),bn=function(){return this},gn=function(t,e,n,i,r,o,s){!function(t,e,n){var i=e+" Iterator";t.prototype=zt(fn,{next:u(1,n)}),ee(t,i,!1)}(n,e,i);var a,l,c,d=function(t){if(t===r&&y)return y;if(!pn&&t in v)return v[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},f=e+" Iterator",h=!1,v=t.prototype,p=v[yn]||v["@@iterator"]||r&&v[r],y=!pn&&p||d(r),b="Array"==e&&v.entries||p;if(b&&(a=ln(b.call(new t)),vn!==Object.prototype&&a.next&&(ln(a)!==vn&&(hn?hn(a,vn):"function"!=typeof a[yn]&&C(a,yn,bn)),ee(a,f,!0))),"values"==r&&p&&"values"!==p.name&&(h=!0,y=function(){return p.call(this)}),v[yn]!==y&&C(v,yn,y),r)if(l={values:d("values"),keys:o?y:d("keys"),entries:d("entries")},s)for(c in l)!pn&&!h&&c in v||tt(v,c,l[c]);else Ct({target:e,proto:!0,forced:pn||h},l);return l},mn=Z.set,Sn=Z.getterFor("Array Iterator"),_n=gn(Array,"Array",(function(t,e){mn(this,{type:"Array Iterator",target:p(t),index:0,kind:e})}),(function(){var t=Sn(this),e=t.target,n=t.kind,i=t.index++;return!e||i>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:i,done:!1}:"values"==n?{value:e[i],done:!1}:{value:[i,e[i]],done:!1}}),"values");rn("keys"),rn("values"),rn("entries");var wn=Object.assign,En=Object.defineProperty,An=!wn||r((function(){if(o&&1!==wn({b:1},wn(En({},"a",{enumerable:!0,get:function(){En(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},e={},n=Symbol();return t[n]=7,"abcdefghijklmnopqrst".split("").forEach((function(t){e[t]=t})),7!=wn({},t)[n]||"abcdefghijklmnopqrst"!=Dt(wn({},e)).join("")}))?function(t,e){for(var n=Nt(t),i=arguments.length,r=1,s=gt.f,a=l.f;i>r;)for(var u,c=h(arguments[r++]),d=s?Dt(c).concat(s(c)):Dt(c),f=d.length,v=0;f>v;)u=d[v++],o&&!a.call(c,u)||(n[u]=c[u]);return n}:wn;Ct({target:"Object",stat:!0,forced:Object.assign!==An},{assign:An});var On={};On[$t("toStringTag")]="z";var Ln="[object z]"===String(On),kn=$t("toStringTag"),xn="Arguments"==d(function(){return arguments}()),Cn=Ln?d:function(t){var e,n,i;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),kn))?n:xn?d(e):"Object"==(i=d(e))&&"function"==typeof e.callee?"Arguments":i},jn=Ln?{}.toString:function(){return"[object "+Cn(this)+"]"};Ln||tt(Object.prototype,"toString",jn,{unsafe:!0});var Tn=function(t){return function(e,n){var i,r,o=String(v(e)),s=st(n),a=o.length;return s<0||s>=a?t?"":void 0:(i=o.charCodeAt(s))<55296||i>56319||s+1===a||(r=o.charCodeAt(s+1))<56320||r>57343?t?o.charAt(s):i:t?o.slice(s,s+2):r-56320+(i-55296<<10)+65536}},Pn={codeAt:Tn(!1),charAt:Tn(!0)}.charAt,Nn=Z.set,Dn=Z.getterFor("String Iterator");gn(String,"String",(function(t){Nn(this,{type:"String Iterator",string:String(t),index:0})}),(function(){var t,e=Dn(this),n=e.string,i=e.index;return i>=n.length?{value:void 0,done:!0}:(t=Pn(n,i),e.index+=t.length,{value:t,done:!1})}));var Mn={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},Hn=$t("iterator"),In=$t("toStringTag"),Bn=_n.values;for(var Fn in Mn){var Rn=i[Fn],zn=Rn&&Rn.prototype;if(zn){if(zn[Hn]!==Bn)try{C(zn,Hn,Bn)}catch(t){zn[Hn]=Bn}if(zn[In]||C(zn,In,Fn),Mn[Fn])for(var Gn in _n)if(zn[Gn]!==_n[Gn])try{C(zn,Gn,_n[Gn])}catch(t){zn[Gn]=_n[Gn]}}}function Vn(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var Wn,qn,Yn,Un,Jn=function(t,e,n){var i;return void 0===e&&(e=50),void 0===n&&(n={isImmediate:!1}),function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];var s=this,a=n.isImmediate&&void 0===i;void 0!==i&&clearTimeout(i),i=setTimeout((function(){i=void 0,n.isImmediate||t.apply(s,r)}),e),a&&t.apply(s,r)}},$n=function(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild},Kn=function(t){var e=t.charCode||t.keyCode,n=t.type;return"click"===n||"keydown"===n&&(32===e||13===e)&&(t.preventDefault(),!0)},Qn=function(t,e){var n=t instanceof HTMLElement?[t]:t,i=!0,r=!1,o=void 0;try{for(var s,a=n[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var l=s.value;l instanceof HTMLElement&&e&&e(l)}}catch(t){r=!0,o=t}finally{try{i||null==a.return||a.return()}finally{if(r)throw o}}},Xn=function(t,e,n){var i=!!window.getComputedStyle,r=window.getComputedStyle||function(){},o=function(){if(!i)return!1;var t=document.body||document.documentElement,e=document.createElement("div");e.style.cssText="width:10px;padding:2px;-webkit-box-sizing:border-box;box-sizing:border-box;",t.appendChild(e);var n="10px"===r(e,null).width;return t.removeChild(e),n}(),s=function(t){return t=parseFloat(t),e=t,!isNaN(parseFloat(e))&&isFinite(e)?t:0;var e};return function(t,e,n){if(i){n=n||r(t,null);var a=s(n[e]);return o||"width"!==e?o||"height"!==e||(a+=s(n.paddingTop)+s(n.paddingBottom)+s(n.borderTopWidth)+s(n.borderBottomWidth)):a+=s(n.paddingLeft)+s(n.paddingRight)+s(n.borderLeftWidth)+s(n.borderRightWidth),a}return s(t.style[e])}(t,e,n)};return function(t){t[t.Prev=0]="Prev",t[t.Next=1]="Next"}(Wn||(Wn={})),function(t){t[t.Enabled=1]="Enabled",t[t.Disabled=0]="Disabled"}(qn||(qn={})),function(t){t[t.Enable=0]="Enable",t[t.Disable=1]="Disable"}(Yn||(Yn={})),function(t){t[t.Yes=0]="Yes",t[t.No=0]="No"}(Un||(Un={})),function(){function t(e,n){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.slider=e,this.slides=e.children,this.sliderContainer=$n('<div class="a11y-slider-container"></div>'),this._activeClass="a11y-slider-active",this._visibleClass="a11y-slider-visible",this._dotsClass="a11y-slider-dots",this._sliderClass="a11y-slider",this._focusable="a, area, input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]",this._autoplayTimer=Un.No,this._autoplayBtn=$n('<button type="button" class="a11y-slider-autoplay">Toggle slider autoplay</button>'),this._pauseOnMouseLeave=!1,this._skipBtns=[],this.dots=null,this.activeSlide=this.slides[0],this.visibleSlides=[],this.sliderEnabled=qn.Disabled,this._hasCustomArrows=!!(n&&n.prevArrow||n&&n.nextArrow),this.options={container:!0,arrows:!0,prevArrow:n&&n.prevArrow||$n('<button type="button" class="a11y-slider-prev">Previous slide</button>'),nextArrow:n&&n.nextArrow||$n('<button type="button" class="a11y-slider-next">Next slide</button>'),dots:!0,adaptiveHeight:!1,skipBtn:!0,slidesToShow:!1,autoplay:!1,autoplaySpeed:4e3,autoplayHoverPause:!0,centerMode:!1},Object.assign(this.options,n),this._handlePrev=this._handlePrev.bind(this),this._handleNext=this._handleNext.bind(this),this._handleAutoplay=this._handleAutoplay.bind(this),this._handleAutoplayHover=this._handleAutoplayHover.bind(this),this._checkShouldEnableDebounced=Jn(this._checkShouldEnable.bind(this),250),this._updateHeightDebounced=Jn(this._updateHeight.bind(this),250),this._generateDotsDebounced=Jn(this._generateDots.bind(this),250),this._updateScrollPosition=Jn((function(){return i.scrollToSlide(i.activeSlide)}),250),this._handleScroll=Jn(this._handleScroll.bind(this),175),this._init()}var e,n,i;return e=t,(n=[{key:"_init",value:function(){this._checkShouldEnable(),window.addEventListener("resize",this._checkShouldEnableDebounced),this._dispatchEvent("init",{a11ySlider:this})}},{key:"_checkShouldEnable",value:function(){var t=this,e=!0;this.slides.length<=1&&(e=!1),this._getActiveAndVisible(null,(function(n){n.length===t.slides.length&&(e=!1)})),this.slides.length===this.options.slidesToShow&&(e=!1),e&&this.sliderEnabled===qn.Disabled?this._enableSlider():e||this.sliderEnabled!==qn.Enabled||this._disableSlider(),!e&&this._hasCustomArrows&&(Qn(this.options.prevArrow,(function(t){t.classList.add("a11y-slider-hide")})),Qn(this.options.nextArrow,(function(t){t.classList.add("a11y-slider-hide")})))}},{key:"_enableSlider",value:function(){var t=this;this.sliderEnabled=qn.Enabled,setTimeout((function(){return t.slider.scrollLeft=0}),1),this.options.container&&(this.slider.insertAdjacentElement("beforebegin",this.sliderContainer),this.sliderContainer.insertAdjacentElement("afterbegin",this.slider)),this.options.skipBtn&&this._addSkipBtn(),this.options.arrows&&!this._hasCustomArrows&&(this.options.prevArrow instanceof HTMLElement&&this.slider.insertAdjacentElement("beforebegin",this.options.prevArrow),this.options.nextArrow instanceof HTMLElement&&this.slider.insertAdjacentElement("beforebegin",this.options.nextArrow)),Qn(this.options.prevArrow,(function(e){e.addEventListener("click",t._handlePrev,{passive:!0}),e.addEventListener("keypress",t._handlePrev,{passive:!0}),t._hasCustomArrows&&e.classList.remove("a11y-slider-hide")})),Qn(this.options.nextArrow,(function(e){e.addEventListener("click",t._handleNext,{passive:!0}),e.addEventListener("keypress",t._handleNext,{passive:!0}),t._hasCustomArrows&&e.classList.remove("a11y-slider-hide")})),this.options.dots&&this._generateDots(),this.slider.addEventListener("scroll",this._handleScroll,!1),this._setCSS(),!0===this.options.adaptiveHeight&&(this._updateHeight(this.activeSlide),window.addEventListener("resize",this._updateHeightDebounced.bind(this))),this.options.autoplay&&this._enableAutoplay(),window.addEventListener("resize",this._updateScrollPosition)}},{key:"_disableSlider",value:function(){var t=this;this.sliderEnabled=qn.Disabled,document.body.contains(this.sliderContainer)&&(this.sliderContainer.insertAdjacentElement("beforebegin",this.slider),this.sliderContainer.parentNode&&this.sliderContainer.parentNode.removeChild(this.sliderContainer)),this._removeSkipBtn(),Qn(this.options.prevArrow,(function(e){e.removeEventListener("click",t._handlePrev),e.removeEventListener("keypress",t._handlePrev),t._hasCustomArrows?e.classList.add("a11y-slider-hide"):e.parentNode&&e.parentNode.removeChild(e)})),Qn(this.options.nextArrow,(function(e){e.removeEventListener("click",t._handleNext),e.removeEventListener("keypress",t._handleNext),t._hasCustomArrows?e.classList.add("a11y-slider-hide"):e.parentNode&&e.parentNode.removeChild(e)})),this._removeDots(),this.slider.removeEventListener("scroll",this._handleScroll,!1),this._removeCSS(),window.removeEventListener("resize",this._updateHeightDebounced),this._updateHeight(!1),this.options.autoplay&&this._disableAutoplay(),window.removeEventListener("resize",this._updateScrollPosition)}},{key:"_setCSS",value:function(t){this._updateItemsCSS(),this._getActiveAndVisible(t||null),this.slider.classList.add(this._sliderClass);var e=!0,n=!1,i=void 0;try{for(var r,o=this.slides[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){var s=r.value;s.classList.remove(this._activeClass),s.classList.remove(this._visibleClass)}}catch(t){n=!0,i=t}finally{try{e||null==o.return||o.return()}finally{if(n)throw i}}this.activeSlide.classList.add(this._activeClass);var a=!0,l=!1,u=void 0;try{for(var c,d=this.visibleSlides[Symbol.iterator]();!(a=(c=d.next()).done);a=!0)c.value.classList.add(this._visibleClass)}catch(t){l=!0,u=t}finally{try{a||null==d.return||d.return()}finally{if(l)throw u}}this._updateDots(this.activeSlide),this._addFocusable()}},{key:"_removeCSS",value:function(){this._removeItemsCSS(),this.slider.classList.remove(this._sliderClass);var t=!0,e=!1,n=void 0;try{for(var i,r=this.slides[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value;o.classList.remove(this._activeClass),o.classList.remove(this._visibleClass)}}catch(t){e=!0,n=t}finally{try{t||null==r.return||r.return()}finally{if(e)throw n}}this._removeFocusable()}},{key:"_updateItemsCSS",value:function(){if("number"==typeof(d=this.options.slidesToShow)&&isFinite(d)&&Math.floor(d)===d){var t=100/this.options.slidesToShow;this.slider.style.display="flex";var e=!0,n=!1,i=void 0;try{for(var r,o=this.slides[Symbol.iterator]();!(e=(r=o.next()).done);e=!0)r.value.style.width="".concat(t,"%")}catch(t){n=!0,i=t}finally{try{e||null==o.return||o.return()}finally{if(n)throw i}}}else{this.slider.style.removeProperty("display");var s=!0,a=!1,l=void 0;try{for(var u,c=this.slides[Symbol.iterator]();!(s=(u=c.next()).done);s=!0)u.value.style.removeProperty("width")}catch(t){a=!0,l=t}finally{try{s||null==c.return||c.return()}finally{if(a)throw l}}}var d}},{key:"_removeItemsCSS",value:function(){this.slider.style.removeProperty("display");var t=!0,e=!1,n=void 0;try{for(var i,r=this.slides[Symbol.iterator]();!(t=(i=r.next()).done);t=!0)i.value.style.removeProperty("width")}catch(t){e=!0,n=t}finally{try{t||null==r.return||r.return()}finally{if(e)throw n}}}},{key:"_addFocusable",value:function(){this._removeFocusable();var t=!0,e=!1,n=void 0;try{for(var i,r=this.slides[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value,s=o.querySelectorAll(this._focusable);o.classList.contains(this._visibleClass)||(o.setAttribute("tabindex","-1"),o.setAttribute("aria-hidden","true"));var a=!0,l=!1,u=void 0;try{for(var c,d=s[Symbol.iterator]();!(a=(c=d.next()).done);a=!0){var f=c.value;o.classList.contains(this._visibleClass)||f.setAttribute("tabindex","-1")}}catch(t){l=!0,u=t}finally{try{a||null==d.return||d.return()}finally{if(l)throw u}}}}catch(t){e=!0,n=t}finally{try{t||null==r.return||r.return()}finally{if(e)throw n}}}},{key:"_removeFocusable",value:function(){var t=!0,e=!1,n=void 0;try{for(var i,r=this.slides[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value,s=o.querySelectorAll(this._focusable);o.removeAttribute("tabindex"),o.removeAttribute("aria-hidden");var a=!0,l=!1,u=void 0;try{for(var c,d=s[Symbol.iterator]();!(a=(c=d.next()).done);a=!0)c.value.removeAttribute("tabindex")}catch(t){l=!0,u=t}finally{try{a||null==d.return||d.return()}finally{if(l)throw u}}}}catch(t){e=!0,n=t}finally{try{t||null==r.return||r.return()}finally{if(e)throw n}}}},{key:"_addSkipBtn",value:function(){var t=$n('<button class="a11y-slider-sr-only" type="button" tabindex="0">Click to skip slider carousel</button>'),e=$n('<div class="a11y-slider-sr-only" tabindex="-1">End of slider carousel</div>'),n=function(t){!0===Kn(t)&&e.focus()};t.addEventListener("click",n,{passive:!0}),t.addEventListener("keypress",n,{passive:!0}),this.slider.insertAdjacentElement("beforebegin",t),this.slider.insertAdjacentElement("afterend",e),this._skipBtns=[],this._skipBtns.push(t,e)}},{key:"_removeSkipBtn",value:function(){Qn(this._skipBtns,(function(t){t.parentNode&&t.parentNode.removeChild(t)}))}},{key:"_generateDots",value:function(){var t=this;if(this._removeDots(),this.sliderEnabled!==qn.Disabled){this.dots=$n('<ul class="'.concat(this._dotsClass,'"></ul>'));for(var e=function(e){var n=$n("<li></li>"),i=$n('<button type="button"></button>');i.textContent="Move slider to item #".concat(e+1);var r=function(n){!0===Kn(n)&&(t.scrollToSlide(t.slides[e]),t._toggleAutoplay(Yn.Disable))};i.addEventListener("click",r,{passive:!0}),i.addEventListener("keypress",r,{passive:!0}),n.insertAdjacentElement("beforeend",i),t.dots.insertAdjacentElement("beforeend",n)},n=0;n<this._getDotCount();n++)e(n);this._updateDots(this.activeSlide),this.slider.insertAdjacentElement("afterend",this.dots),window.addEventListener("resize",this._generateDotsDebounced)}}},{key:"_getDotCount",value:function(){return this.slides.length-(this.options.slidesToShow||this.visibleSlides.length)+1}},{key:"_removeDots",value:function(){window.removeEventListener("resize",this._generateDotsDebounced),this.dots instanceof HTMLElement&&this.dots.parentNode&&this.dots.parentNode.removeChild(this.dots)}},{key:"_updateDots",value:function(t){if(this.dots instanceof HTMLElement){var e=Array.prototype.indexOf.call(t.parentNode&&t.parentNode.children,t);e>this.dots.children.length&&(e=this.dots.children.length-1);var n=!0,i=!1,r=void 0;try{for(var o,s=this.dots.children[Symbol.iterator]();!(n=(o=s.next()).done);n=!0)o.value.querySelector("button").classList.remove("active")}catch(t){i=!0,r=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw r}}this.dots.children[e].querySelector("button").classList.add("active")}}},{key:"_enableAutoplay",value:function(){this._autoplayBtn.addEventListener("click",this._handleAutoplay,{passive:!0}),this._autoplayBtn.addEventListener("keypress",this._handleAutoplay,{passive:!0}),this.options.autoplayHoverPause&&(this.slider.addEventListener("mouseenter",this._handleAutoplayHover,{passive:!0}),this.slider.addEventListener("mouseleave",this._handleAutoplayHover,{passive:!0})),this.slider.insertAdjacentElement("beforebegin",this._autoplayBtn),this._toggleAutoplay(Yn.Enable)}},{key:"_disableAutoplay",value:function(){this._toggleAutoplay(Yn.Disable),this._autoplayBtn.removeEventListener("click",this._handleAutoplay),this._autoplayBtn.removeEventListener("keypress",this._handleAutoplay),this.slider.removeEventListener("mouseenter",this._handleAutoplayHover),this.slider.removeEventListener("mouseleave",this._handleAutoplayHover),this._autoplayBtn.parentNode&&this._autoplayBtn.parentNode.removeChild(this._autoplayBtn)}},{key:"_toggleAutoplay",value:function(t){var e=this;t===Yn.Enable?(e._autoplayTimer=window.setInterval((function(){e._goPrevOrNext(Wn.Next)}),e.options.autoplaySpeed),e._autoplayBtn.setAttribute("data-autoplaying","true")):t===Yn.Disable&&(window.clearInterval(e._autoplayTimer),e._autoplayTimer=Un.No,e._autoplayBtn.setAttribute("data-autoplaying","false"))}},{key:"_goPrevOrNext",value:function(t){var e=this;this._getActiveAndVisible(null,(function(n,i){var r=e.slider.firstElementChild,o=e.slider.lastElementChild,s=n[0],a=n[n.length-1];t===Wn.Next?a===o?e.scrollToSlide(r):e.scrollToSlide(i&&i.nextElementSibling):t===Wn.Prev&&(s===r?e.scrollToSlide(o):e.scrollToSlide(i&&i.previousElementSibling))}))}},{key:"scrollToSlide",value:function(t){var e=this,n=!!HTMLElement.prototype.scrollTo,i=this.slider.scrollLeft;this._dispatchEvent("beforeChange",{currentSlide:this.activeSlide,nextSlide:t,a11ySlider:this}),!0===this.options.adaptiveHeight&&this._updateHeight(t),n?this.slider.scroll({left:t.offsetLeft,behavior:"smooth"}):this.slider.scrollLeft=t.offsetLeft,setTimeout((function(){e.slider.scrollLeft===i&&e.sliderEnabled===qn.Enabled&&e._setCSS(t)}),50),this._updateDots(t)}},{key:"updateOptions",value:function(t){Object.assign(this.options,t),this._disableSlider(),this._checkShouldEnable()}},{key:"_updateHeight",value:function(t){if(t instanceof HTMLElement){var e=Xn(t,"height");this.slider.style.height="".concat(e,"px")}else this.slider.style.height=""}},{key:"refreshHeight",value:function(){this._updateHeight(this.activeSlide)}},{key:"_getActiveAndVisible",value:function(t,e){var n=[],i=Math.round(this.slider.getBoundingClientRect().width),r=this.slider.scrollLeft,o=!0,s=!1,a=void 0;try{for(var l,u=this.slides[Symbol.iterator]();!(o=(l=u.next()).done);o=!0){var c=l.value,d=c.offsetLeft;d>=r&&d<r+i&&n.push(c)}}catch(t){s=!0,a=t}finally{try{o||null==u.return||u.return()}finally{if(s)throw a}}this.visibleSlides=n,t?this.activeSlide=t:!0===this.options.centerMode?this.activeSlide=this.visibleSlides[Math.floor((this.visibleSlides.length-1)/2)]:this.activeSlide=n[0],e&&e(this.visibleSlides,this.activeSlide)}},{key:"_handlePrev",value:function(t){!0===Kn(t)&&(this._goPrevOrNext(Wn.Prev),this._toggleAutoplay(Yn.Disable))}},{key:"_handleNext",value:function(t){!0===Kn(t)&&(this._goPrevOrNext(Wn.Next),this._toggleAutoplay(Yn.Disable))}},{key:"_handleAutoplay",value:function(t){!0===Kn(t)&&(this._autoplayTimer===Un.No?this._toggleAutoplay(Yn.Enable):this._toggleAutoplay(Yn.Disable))}},{key:"_handleAutoplayHover",value:function(t){"mouseenter"===t.type?this._autoplayTimer!==Un.No&&(this._toggleAutoplay(Yn.Disable),this._pauseOnMouseLeave=!0):"mouseleave"===t.type&&this._pauseOnMouseLeave&&this._autoplayTimer===Un.No&&(this._toggleAutoplay(Yn.Enable),this._pauseOnMouseLeave=!1)}},{key:"_handleScroll",value:function(){this._setCSS(),this._dispatchEvent("afterChange",{currentSlide:this.activeSlide,a11ySlider:this})}},{key:"_dispatchEvent",value:function(t,e){var n=function(t,e){var n=document.createEvent("CustomEvent");return e=e||{bubbles:!1,cancelable:!1,detail:void 0},n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}(t,{detail:e});this.slider.dispatchEvent(n)}},{key:"destroy",value:function(){this._disableSlider(),window.removeEventListener("resize",this._checkShouldEnableDebounced),this._dispatchEvent("destroy",{a11ySlider:this})}}])&&Vn(e.prototype,n),i&&Vn(e,i),t}()}));
