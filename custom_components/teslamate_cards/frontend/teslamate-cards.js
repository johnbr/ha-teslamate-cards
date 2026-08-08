function e(e,t,n,i){var l,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(l=e[o])&&(s=(r<3?l(s):r>3?l(t,n,s):l(t,n))||s);return r>3&&s&&Object.defineProperty(t,n,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),l=new WeakMap;let r=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=l.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&l.set(t,e))}return e}toString(){return this.cssText}};const s=e=>new r("string"==typeof e?e:e+"",void 0,i),o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new r(n,e,i)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return s(t)})(e):e,{is:c,defineProperty:u,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,g=globalThis,m=g.trustedTypes,_=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},x=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&u(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:l}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);l?.call(this,t),this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),l=t.litNonce;void 0!==l&&i.setAttribute("nonce",l),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const l=(void 0!==n.converter?.toAttribute?n.converter:y).toAttribute(t,n.type);this._$Em=e,null==l?this.removeAttribute(i):this.setAttribute(i,l),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),l="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i;const r=l.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,n,i=!1,l){if(void 0!==e){const r=this.constructor;if(!1===i&&(l=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??x)(l,t)||n.useDefault&&n.reflect&&l===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:l},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==l||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,S=e=>e,A=k.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+M,P=`<${T}>`,z=document,D=()=>z.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,W=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,H=/>/g,U=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,q=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),B=q(1),Y=q(2),K=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,Z=z.createTreeWalker(z,129);function J(e,t){if(!W(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Q=(e,t)=>{const n=e.length-1,i=[];let l,r=2===t?"<svg>":3===t?"<math>":"",s=R;for(let t=0;t<n;t++){const n=e[t];let o,a,c=-1,u=0;for(;u<n.length&&(s.lastIndex=u,a=s.exec(n),null!==a);)u=s.lastIndex,s===R?"!--"===a[1]?s=F:void 0!==a[1]?s=H:void 0!==a[2]?(j.test(a[2])&&(l=RegExp("</"+a[2],"g")),s=U):void 0!==a[3]&&(s=U):s===U?">"===a[0]?(s=l??R,c=-1):void 0===a[1]?c=-2:(c=s.lastIndex-a[2].length,o=a[1],s=void 0===a[3]?U:'"'===a[3]?I:L):s===I||s===L?s=U:s===F||s===H?s=R:(s=U,l=void 0);const h=s===U&&e[t+1].startsWith("/>")?" ":"";r+=s===R?n+P:c>=0?(i.push(o),n.slice(0,c)+E+n.slice(c)+M+h):n+M+(-2===c?t:h)}return[J(e,r+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let l=0,r=0;const s=e.length-1,o=this.parts,[a,c]=Q(e,t);if(this.el=X.createElement(a,n),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Z.nextNode())&&o.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=c[r++],n=i.getAttribute(e).split(M),s=/([.?@])?(.*)/.exec(t);o.push({type:1,index:l,name:s[2],strings:n,ctor:"."===s[1]?le:"?"===s[1]?re:"@"===s[1]?se:ie}),i.removeAttribute(e)}else e.startsWith(M)&&(o.push({type:6,index:l}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(M),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],D()),Z.nextNode(),o.push({type:2,index:++l});i.append(e[t],D())}}}else if(8===i.nodeType)if(i.data===T)o.push({type:2,index:l});else{let e=-1;for(;-1!==(e=i.data.indexOf(M,e+1));)o.push({type:7,index:l}),e+=M.length-1}l++}}static createElement(e,t){const n=z.createElement("template");return n.innerHTML=e,n}}function ee(e,t,n=e,i){if(t===K)return t;let l=void 0!==i?n._$Co?.[i]:n._$Cl;const r=O(t)?void 0:t._$litDirective$;return l?.constructor!==r&&(l?._$AO?.(!1),void 0===r?l=void 0:(l=new r(e),l._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=l:n._$Cl=l),void 0!==l&&(t=ee(e,l._$AS(e,t.values),l,i)),t}class te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??z).importNode(t,!0);Z.currentNode=i;let l=Z.nextNode(),r=0,s=0,o=n[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new ne(l,l.nextSibling,this,e):1===o.type?t=new o.ctor(l,o.name,o.strings,this,e):6===o.type&&(t=new oe(l,this,e)),this._$AV.push(t),o=n[++s]}r!==o?.index&&(l=Z.nextNode(),r++)}return Z.currentNode=z,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),O(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>W(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=X.createElement(J(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new te(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const l of e)i===t.length?t.push(n=new ne(this.O(D()),this.O(D()),this,this.options)):n=t[i],n._$AI(l),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,l){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=l,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=V}_$AI(e,t=this,n,i){const l=this.strings;let r=!1;if(void 0===l)e=ee(this,e,t,0),r=!O(e)||e!==this._$AH&&e!==K,r&&(this._$AH=e);else{const i=e;let s,o;for(e=l[0],s=0;s<l.length-1;s++)o=ee(this,i[n+s],t,s),o===K&&(o=this._$AH[s]),r||=!O(o)||o!==this._$AH[s],o===V?e=V:e!==V&&(e+=(o??"")+l[s+1]),this._$AH[s]=o}r&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class le extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class re extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class se extends ie{constructor(e,t,n,i,l){super(e,t,n,i,l),this.type=5}_$AI(e,t=this){if((e=ee(this,e,t,0)??V)===K)return;const n=this._$AH,i=e===V&&n!==V||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,l=e!==V&&(n===V||i);i&&this.element.removeEventListener(this.name,this,n),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(X,ne),(k.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;class ue extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let l=i._$litPart$;if(void 0===l){const e=n?.renderBefore??null;i._$litPart$=l=new ne(t.insertBefore(D(),e),e,void 0,n??{})}return l._$AI(e),l})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}ue._$litElement$=!0,ue.finalized=!0,ce.litElementHydrateSupport?.({LitElement:ue});const he=ce.litElementPolyfillSupport;he?.({LitElement:ue}),(ce.litElementVersions??=[]).push("4.2.2");const de=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},fe=(e=pe,t,n)=>{const{kind:i,metadata:l}=n;let r=globalThis.litPropertyMetadata.get(l);if(void 0===r&&globalThis.litPropertyMetadata.set(l,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const l=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,l,e,!0,n)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const l=this[i];t.call(this,n),this.requestUpdate(i,l,e,!0,n)}}throw Error("Unsupported decorator location: "+i)};function ge(e){return(t,n)=>"object"==typeof n?fe(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function me(e){return ge({...e,state:!0,attribute:!1})}const _e=o`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 16px 8px;
  }

  .title {
    font-size: var(--ha-card-header-font-size, 24px);
    font-weight: 400;
    color: var(--ha-card-header-color, var(--primary-text-color));
    line-height: 1.2;
  }

  .subtitle {
    font-size: 12px;
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .scroller {
    overflow-x: auto;
    /* Keep vertical scrolling and pinch-zoom native — never touch-action: none. */
    -webkit-overflow-scrolling: touch;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    text-align: right;
    font-weight: 500;
    white-space: nowrap;
    padding: 8px 10px;
    color: var(--secondary-text-color);
    background: var(--card-background-color, var(--ha-card-background));
    border-bottom: 1px solid var(--divider-color);
  }

  th.left,
  td.left {
    text-align: left;
  }

  th.center,
  td.center {
    text-align: center;
  }

  td {
    text-align: right;
    white-space: nowrap;
    padding: 7px 10px;
    border-bottom: 1px solid var(--divider-color);
    color: var(--primary-text-color);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: var(--secondary-background-color);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 16px 12px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .pager {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  button {
    font: inherit;
    color: var(--primary-text-color);
    background: none;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 2px 10px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  button:not(:disabled):hover {
    background: var(--secondary-background-color);
  }

  .state {
    padding: 24px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .state.error {
    color: var(--error-color);
    text-align: left;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .cold {
    color: var(--info-color, #3d71d7);
  }

  /* Summary stat row — upstream's reducers over the table's own rows. */
  .summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    padding: 4px 16px 12px;
  }

  .stat {
    text-align: center;
    min-width: 0;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 500;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stat-label {
    font-size: 11px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subheader {
    padding: 14px 16px 4px;
    font-size: 13px;
    font-weight: 500;
    color: var(--secondary-text-color);
    border-top: 1px solid var(--divider-color);
    margin-top: 8px;
  }

  /* ── Bars, split bars and gauges (see gauge.ts) ────────────────────── */

  .bars {
    padding: 4px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bar-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 4px;
  }

  .bar-label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .bar-value {
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  .bar-track {
    position: relative;
    height: 10px;
    border-radius: 5px;
    background: var(--divider-color);
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 5px;
  }

  /* Charge-limit guidance, drawn over the fill rather than colouring it: the
     right SOC depends on what the car is about to do. */
  .bar-marker {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--card-background-color, #fff);
    opacity: 0.85;
  }

  .split {
    padding: 4px 16px 12px;
  }

  .split-track {
    display: flex;
    height: 12px;
    border-radius: 6px;
    overflow: hidden;
    background: var(--divider-color);
  }

  .split-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    margin-top: 8px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .split-pct {
    color: var(--primary-text-color);
    font-weight: 500;
  }

  .swatch {
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 2px;
    margin-right: 5px;
  }

  .gauge {
    text-align: center;
    min-width: 0;
  }

  .gauge-svg {
    width: 100%;
    max-width: 130px;
    height: auto;
  }

  .gauge-track {
    fill: none;
    stroke: var(--divider-color);
    stroke-width: 9;
    stroke-linecap: round;
  }

  .gauge-fill {
    fill: none;
    stroke-width: 9;
    stroke-linecap: round;
  }

  .gauge-value {
    font-size: 20px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    margin-top: -6px;
  }

  .gauge-label {
    font-size: 11px;
    color: var(--secondary-text-color);
  }

  .chart-wrap {
    padding: 4px 8px 8px 4px;
  }

  /* Secondary columns: worth having on a desktop, noise on a phone. These
     tables are already wide enough to need horizontal scrolling. */
  @media (max-width: 700px) {
    th.optional,
    td.optional {
      display: none;
    }

    .summary {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 10px;
    }

    .stat-value {
      font-size: 18px;
    }
  }
`;async function ve(e,t,n){const i=n.days??90,l=new Date,r=new Date(l.getTime()-864e5*i);return(await e.callWS({type:"teslamate_cards/query",query_id:t,car_id:n.car_id??1,time_from:r.toISOString(),time_to:l.toISOString(),length_unit:n.length_unit??"km",temp_unit:n.temp_unit??"C",preferred_range:n.preferred_range??"rated",geofence_ids:n.geofence_ids??null,location:n.location??"",charge_type:n.charge_type??"",vars:n.vars??{}})).rows}class be extends ue{constructor(){super(...arguments),this._rows=[],this._extra={},this._loading=!0,this._error=null,this._page=0,this._requested=!1}static{this.styles=_e}secondaryQueryIds(){return[]}set hass(e){this._hass=e,this._requested||(this._requested=!0,this.refresh())}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this._page=0,this._requested=!1,this._hass&&(this._requested=!0,this.refresh())}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>{this.refresh()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer),this._timer=void 0}async refresh(){if(!this._hass||!this._config)return;const e=this._hass,t=this.queryOptions();try{const n=this.secondaryQueryIds(),[i,...l]=await Promise.all([ve(e,this.queryId(),t),...n.map(n=>ve(e,n,t))]);this._rows=i,this._extra=Object.fromEntries(n.map((e,t)=>[e,l[t]??[]])),this._error=null}catch(e){this._error=function(e){return String("object"==typeof e&&null!==e&&"message"in e?e.message:e)}(e)}finally{this._loading=!1}}paginate(e){const t=this.pageSize(),n=Math.max(1,Math.ceil(e.length/t)),i=Math.min(this._page,n-1);return{visible:e.slice(i*t,i*t+t),page:i,pages:n}}pageSize(){return 25}renderHeader(e){return B`
      <div class="header">
        <div class="title">${this._config.title??this.defaultTitle()}</div>
        ${e?B`<div class="subtitle">${e}</div>`:null}
      </div>
    `}renderPager(e,t){return t<=1?null:B`
      <div class="footer">
        <span>Page ${e+1} of ${t}</span>
        <span class="pager">
          <button ?disabled=${0===e} @click=${()=>this._page=e-1}>Previous</button>
          <button ?disabled=${e>=t-1} @click=${()=>this._page=e+1}>Next</button>
        </span>
      </div>
    `}defaultTitle(){return"TeslaMate"}unitKey(e){return`${e}_${this._config.length_unit??"km"}`}tempKey(e){return`${e}_${(this._config.temp_unit??"C").toLowerCase()}`}render(){return this._config?this._error?B`<ha-card>${this.renderHeader()}<div class="state error">${this._error}</div></ha-card>`:this._loading?B`<ha-card>${this.renderHeader()}<div class="state">Loading…</div></ha-card>`:this.renderContent():B``}}function ye(e,t,n,i){const l=new Map;for(const r of e){const e=n(r),s=i(r);if(!Number.isFinite(e)||!Number.isFinite(s))continue;const o=t(r),a=l.get(o);a?a.push([e,s]):l.set(o,[[e,s]])}for(const e of l.values())e.sort((e,t)=>e[0]-t[0]);return l}e([me()],be.prototype,"_rows",void 0),e([me()],be.prototype,"_extra",void 0),e([me()],be.prototype,"_loading",void 0),e([me()],be.prototype,"_error",void 0),e([me()],be.prototype,"_page",void 0);const xe="u-off",we="u-label",$e="width",ke="height",Se="top",Ae="bottom",Ce="left",Ee="right",Me="#000",Te=Me+"0",Pe="mousemove",ze="mousedown",De="mouseup",Oe="mouseenter",We="mouseleave",Ne="dblclick",Re="change",Fe="dppxchange",He="--",Ue="undefined"!=typeof window,Le=Ue?document:null,Ie=Ue?window:null,je=Ue?navigator:null;let qe,Be;function Ye(e,t){if(null!=t){let n=e.classList;!n.contains(t)&&n.add(t)}}function Ke(e,t){let n=e.classList;n.contains(t)&&n.remove(t)}function Ve(e,t,n){e.style[t]=n+"px"}function Ge(e,t,n,i){let l=Le.createElement(e);return null!=t&&Ye(l,t),null!=n&&n.insertBefore(l,i),l}function Ze(e,t){return Ge("div",e,t)}const Je=new WeakMap;function Qe(e,t,n,i,l){let r="translate("+t+"px,"+n+"px)";r!=Je.get(e)&&(e.style.transform=r,Je.set(e,r),t<0||n<0||t>i||n>l?Ye(e,xe):Ke(e,xe))}const Xe=new WeakMap;function et(e,t,n){let i=t+n;i!=Xe.get(e)&&(Xe.set(e,i),e.style.background=t,e.style.borderColor=n)}const tt=new WeakMap;function nt(e,t,n,i){let l=t+""+n;l!=tt.get(e)&&(tt.set(e,l),e.style.height=n+"px",e.style.width=t+"px",e.style.marginLeft=i?-t/2+"px":0,e.style.marginTop=i?-n/2+"px":0)}const it={passive:!0},lt={...it,capture:!0};function rt(e,t,n,i){t.addEventListener(e,n,i?lt:it)}function st(e,t,n,i){t.removeEventListener(e,n,it)}function ot(e,t,n,i){let l;n=n||0;let r=(i=i||t.length-1)<=2147483647;for(;i-n>1;)l=r?n+i>>1:At((n+i)/2),t[l]<e?n=l:i=l;return e-t[n]<=t[i]-e?n:i}function at(e){return(t,n,i)=>{let l=-1,r=-1;for(let r=n;r<=i;r++)if(e(t[r])){l=r;break}for(let l=i;l>=n;l--)if(e(t[l])){r=l;break}return[l,r]}}Ue&&function e(){let t=devicePixelRatio;qe!=t&&(qe=t,Be&&st(Re,Be,e),Be=matchMedia(`(min-resolution: ${qe-.001}dppx) and (max-resolution: ${qe+.001}dppx)`),rt(Re,Be,e),Ie.dispatchEvent(new CustomEvent(Fe)))}();const ct=e=>null!=e,ut=e=>null!=e&&e>0,ht=at(ct),dt=at(ut);function pt(e,t,n,i){let l=zt(e),r=zt(t);e==t&&(-1==l?(e*=n,t/=n):(e/=n,t*=n));let s=10==n?Dt:Ot,o=1==r?Et:At,a=(1==l?At:Et)(s(St(e))),c=o(s(St(t))),u=Pt(n,a),h=Pt(n,c);return 10==n&&(a<0&&(u=Jt(u,-a)),c<0&&(h=Jt(h,-c))),i||2==n?(e=u*l,t=h*r):(e=Zt(e,u),t=Gt(t,h)),[e,t]}function ft(e,t,n,i){let l=pt(e,t,n,i);return 0==e&&(l[0]=0),0==t&&(l[1]=0),l}const gt={mode:3,pad:.1},mt={pad:0,soft:null,mode:0},_t={min:mt,max:mt};function vt(e,t,n,i){return an(n)?yt(e,t,n):(mt.pad=n,mt.soft=i?0:null,mt.mode=i?3:0,yt(e,t,_t))}function bt(e,t){return e??t}function yt(e,t,n){let i=n.min,l=n.max,r=bt(i.pad,0),s=bt(l.pad,0),o=bt(i.hard,-Nt),a=bt(l.hard,Nt),c=bt(i.soft,Nt),u=bt(l.soft,-Nt),h=bt(i.mode,0),d=bt(l.mode,0),p=t-e,f=Dt(p),g=Tt(St(e),St(t)),m=Dt(g),_=St(m-f);(p<1e-24||_>10)&&(p=0,0!=e&&0!=t||(p=1e-24,2==h&&c!=Nt&&(r=0),2==d&&u!=-Nt&&(s=0)));let v=p||g||1e3,b=Dt(v),y=Pt(10,At(b)),x=Jt(Zt(e-v*(0==p?0==e?.1:1:r),y/10),24),w=e>=c&&(1==h||3==h&&x<=c||2==h&&x>=c)?c:Nt,$=Tt(o,x<w&&e>=w?w:Mt(w,x)),k=Jt(Gt(t+v*(0==p?0==t?.1:1:s),y/10),24),S=t<=u&&(1==d||3==d&&k>=u||2==d&&k<=u)?u:-Nt,A=Mt(a,k>S&&t<=S?S:Tt(S,k));return $==A&&0==$&&(A=100),[$,A]}const xt=new Intl.NumberFormat(Ue?je.language:"en-US"),wt=e=>xt.format(e),$t=Math,kt=$t.PI,St=$t.abs,At=$t.floor,Ct=$t.round,Et=$t.ceil,Mt=$t.min,Tt=$t.max,Pt=$t.pow,zt=$t.sign,Dt=$t.log10,Ot=$t.log2,Wt=(e,t=1)=>$t.asinh(e/t),Nt=1/0;function Rt(e){return 1+(0|Dt((e^e>>31)-(e>>31)))}function Ft(e,t,n){return Mt(Tt(e,t),n)}function Ht(e){return"function"==typeof e}function Ut(e){return Ht(e)?e:()=>e}const Lt=e=>e,It=(e,t)=>t,jt=e=>null,qt=e=>!0,Bt=(e,t)=>e==t,Yt=/\.\d*?(?=9{6,}|0{6,})/gm,Kt=e=>{if(sn(e)||Qt.has(e))return e;const t=`${e}`,n=t.match(Yt);if(null==n)return e;let i=n[0].length-1;if(-1!=t.indexOf("e-")){let[e,n]=t.split("e");return+`${Kt(e)}e${n}`}return Jt(e,i)};function Vt(e,t){return Kt(Jt(Kt(e/t))*t)}function Gt(e,t){return Kt(Et(Kt(e/t))*t)}function Zt(e,t){return Kt(At(Kt(e/t))*t)}function Jt(e,t=0){if(sn(e))return e;let n=10**t,i=e*n*(1+Number.EPSILON);return Ct(i)/n}const Qt=new Map;function Xt(e){return((""+e).split(".")[1]||"").length}function en(e,t,n,i){let l=[],r=i.map(Xt);for(let s=t;s<n;s++){let t=St(s),n=Jt(Pt(e,s),t);for(let o=0;o<i.length;o++){let a=10==e?+`${i[o]}e${s}`:i[o]*n,c=(s>=0?0:t)+(s>=r[o]?0:r[o]),u=10==e?a:Jt(a,c);l.push(u),Qt.set(u,c)}}return l}const tn={},nn=[],ln=[null,null],rn=Array.isArray,sn=Number.isInteger;function on(e){return"string"==typeof e}function an(e){let t=!1;if(null!=e){let n=e.constructor;t=null==n||n==Object}return t}function cn(e){return null!=e&&"object"==typeof e}const un=Object.getPrototypeOf(Uint8Array),hn="__proto__";function dn(e,t=an){let n;if(rn(e)){let i=e.find(e=>null!=e);if(rn(i)||t(i)){n=Array(e.length);for(let i=0;i<e.length;i++)n[i]=dn(e[i],t)}else n=e.slice()}else if(e instanceof un)n=e.slice();else if(t(e)){n={};for(let i in e)i!=hn&&(n[i]=dn(e[i],t))}else n=e;return n}function pn(e){let t=arguments;for(let n=1;n<t.length;n++){let i=t[n];for(let t in i)t!=hn&&(an(e[t])?pn(e[t],dn(i[t])):e[t]=dn(i[t]))}return e}function fn(e,t,n){for(let i,l=0,r=-1;l<t.length;l++){let s=t[l];if(s>r){for(i=s-1;i>=0&&null==e[i];)e[i--]=null;for(i=s+1;i<n&&null==e[i];)e[r=i++]=null}}}const gn="undefined"==typeof queueMicrotask?e=>Promise.resolve().then(e):queueMicrotask;const mn=["January","February","March","April","May","June","July","August","September","October","November","December"],_n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function vn(e){return e.slice(0,3)}const bn=_n.map(vn),yn=mn.map(vn),xn={MMMM:mn,MMM:yn,WWWW:_n,WWW:bn};function wn(e){return(e<10?"0":"")+e}const $n={YYYY:e=>e.getFullYear(),YY:e=>(e.getFullYear()+"").slice(2),MMMM:(e,t)=>t.MMMM[e.getMonth()],MMM:(e,t)=>t.MMM[e.getMonth()],MM:e=>wn(e.getMonth()+1),M:e=>e.getMonth()+1,DD:e=>wn(e.getDate()),D:e=>e.getDate(),WWWW:(e,t)=>t.WWWW[e.getDay()],WWW:(e,t)=>t.WWW[e.getDay()],HH:e=>wn(e.getHours()),H:e=>e.getHours(),h:e=>{let t=e.getHours();return 0==t?12:t>12?t-12:t},AA:e=>e.getHours()>=12?"PM":"AM",aa:e=>e.getHours()>=12?"pm":"am",a:e=>e.getHours()>=12?"p":"a",mm:e=>wn(e.getMinutes()),m:e=>e.getMinutes(),ss:e=>wn(e.getSeconds()),s:e=>e.getSeconds(),fff:e=>{return((t=e.getMilliseconds())<10?"00":t<100?"0":"")+t;var t}};function kn(e,t){t=t||xn;let n,i=[],l=/\{([a-z]+)\}|[^{]+/gi;for(;n=l.exec(e);)i.push("{"==n[0][0]?$n[n[1]]:n[0]);return e=>{let n="";for(let l=0;l<i.length;l++)n+="string"==typeof i[l]?i[l]:i[l](e,t);return n}}const Sn=(new Intl.DateTimeFormat).resolvedOptions().timeZone;const An=e=>e%1==0,Cn=[1,2,2.5,5],En=en(10,-32,0,Cn),Mn=en(10,0,32,Cn),Tn=Mn.filter(An),Pn=En.concat(Mn),zn="{YYYY}",Dn="\n"+zn,On="{M}/{D}",Wn="\n"+On,Nn=Wn+"/{YY}",Rn="{aa}",Fn="{h}:{mm}"+Rn,Hn="\n"+Fn,Un=":{ss}",Ln=null;function In(e){let t=1e3*e,n=60*t,i=60*n,l=24*i,r=30*l,s=365*l;return[(1==e?en(10,0,3,Cn).filter(An):en(10,-3,0,Cn)).concat([t,5*t,10*t,15*t,30*t,n,5*n,10*n,15*n,30*n,i,2*i,3*i,4*i,6*i,8*i,12*i,l,2*l,3*l,4*l,5*l,6*l,7*l,8*l,9*l,10*l,15*l,r,2*r,3*r,4*r,6*r,s,2*s,5*s,10*s,25*s,50*s,100*s]),[[s,zn,Ln,Ln,Ln,Ln,Ln,Ln,1],[28*l,"{MMM}",Dn,Ln,Ln,Ln,Ln,Ln,1],[l,On,Dn,Ln,Ln,Ln,Ln,Ln,1],[i,"{h}"+Rn,Nn,Ln,Wn,Ln,Ln,Ln,1],[n,Fn,Nn,Ln,Wn,Ln,Ln,Ln,1],[t,Un,Nn+" "+Fn,Ln,Wn+" "+Fn,Ln,Hn,Ln,1],[e,Un+".{fff}",Nn+" "+Fn,Ln,Wn+" "+Fn,Ln,Hn,Ln,1]],function(t){return(o,a,c,u,h,d)=>{let p=[],f=h>=s,g=h>=r&&h<s,m=t(c),_=Jt(m*e,3),v=Jn(m.getFullYear(),f?0:m.getMonth(),g||f?1:m.getDate()),b=Jt(v*e,3);if(g||f){let n=g?h/r:0,i=f?h/s:0,l=_==b?_:Jt(Jn(v.getFullYear()+i,v.getMonth()+n,1)*e,3),o=new Date(Ct(l/e)),a=o.getFullYear(),c=o.getMonth();for(let r=0;l<=u;r++){let s=Jn(a+i*r,c+n*r,1),o=s-t(Jt(s*e,3));l=Jt((+s+o)*e,3),l<=u&&p.push(l)}}else{let r=h>=l?l:h,s=b+(At(c)-At(_))+Gt(_-b,r);p.push(s);let f=t(s),g=f.getHours()+f.getMinutes()/n+f.getSeconds()/i,m=h/i,v=d/o.axes[a]._space;for(;s=Jt(s+h,1==e?0:3),!(s>u);)if(m>1){let e=At(Jt(g+m,6))%24,n=t(s).getHours()-e;n>1&&(n=-1),s-=n*i,g=(g+m)%24,Jt((s-p[p.length-1])/h,3)*v>=.7&&p.push(s)}else p.push(s)}return p}}]}const[jn,qn,Bn]=In(1),[Yn,Kn,Vn]=In(.001);function Gn(e,t){return e.map(e=>e.map((n,i)=>0==i||8==i||null==n?n:t(1==i||0==e[8]?n:e[1]+n)))}function Zn(e,t){return(n,i,l,r,s)=>{let o,a,c,u,h,d,p=t.find(e=>s>=e[0])||t[t.length-1];return i.map(t=>{let n=e(t),i=n.getFullYear(),l=n.getMonth(),r=n.getDate(),s=n.getHours(),f=n.getMinutes(),g=n.getSeconds(),m=i!=o&&p[2]||l!=a&&p[3]||r!=c&&p[4]||s!=u&&p[5]||f!=h&&p[6]||g!=d&&p[7]||p[1];return o=i,a=l,c=r,u=s,h=f,d=g,m(n)})}}function Jn(e,t,n){return new Date(e,t,n)}function Qn(e,t){return t(e)}en(2,-53,53,[1]);function Xn(e,t){return(n,i,l,r)=>null==r?He:t(e(i))}const ei={show:!0,live:!0,isolate:!1,mount:()=>{},markers:{show:!0,width:2,stroke:function(e,t){let n=e.series[t];return n.width?n.stroke(e,t):n.points.width?n.points.stroke(e,t):null},fill:function(e,t){return e.series[t].fill(e,t)},dash:"solid"},idx:null,idxs:null,values:[]};const ti=[0,0];function ni(e,t,n,i=!0){return e=>{0==e.button&&(!i||e.target==t)&&n(e)}}function ii(e,t,n,i=!0){return e=>{(!i||e.target==t)&&n(e)}}const li={show:!0,x:!0,y:!0,lock:!1,move:function(e,t,n){return ti[0]=t,ti[1]=n,ti},points:{one:!1,show:function(e,t){let n=e.cursor.points,i=Ze(),l=n.size(e,t);Ve(i,$e,l),Ve(i,ke,l);let r=l/-2;Ve(i,"marginLeft",r),Ve(i,"marginTop",r);let s=n.width(e,t,l);return s&&Ve(i,"borderWidth",s),i},size:function(e,t){return e.series[t].points.size},width:0,stroke:function(e,t){let n=e.series[t].points;return n._stroke||n._fill},fill:function(e,t){let n=e.series[t].points;return n._fill||n._stroke}},bind:{mousedown:ni,mouseup:ni,click:ni,dblclick:ni,mousemove:ii,mouseleave:ii,mouseenter:ii},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(e,t)=>{t.stopPropagation(),t.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(e,t,n,i,l)=>i-l,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},ri={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},si=pn({},ri,{filter:It}),oi=pn({},si,{size:10}),ai=pn({},ri,{show:!1}),ci='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',ui="bold "+ci,hi={show:!0,scale:"x",stroke:Me,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:ui,side:2,grid:si,ticks:oi,border:ai,font:ci,lineGap:1.5,rotate:0},di={show:!0,scale:"x",auto:!1,sorted:1,min:Nt,max:-Nt,idxs:[]};function pi(e,t,n,i,l){return t.map(e=>null==e?"":wt(e))}function fi(e,t,n,i,l,r,s){let o=[],a=Qt.get(l)||0;for(let e=n=s?n:Jt(Gt(n,l),a);e<=i;e=Jt(e+l,a))o.push(Object.is(e,-0)?0:e);return o}function gi(e,t,n,i,l,r,s){const o=[],a=e.scales[e.axes[t].scale].log,c=At((10==a?Dt:Ot)(n));l=Pt(a,c),10==a&&(l=Pn[ot(l,Pn)]);let u=n,h=l*a;10==a&&(h=Pn[ot(h,Pn)]);do{o.push(u),u+=l,10!=a||Qt.has(u)||(u=Jt(u,Qt.get(l))),u>=h&&(h=(l=u)*a,10==a&&(h=Pn[ot(h,Pn)]))}while(u<=i);return o}function mi(e,t,n,i,l,r,s){let o=e.scales[e.axes[t].scale].asinh,a=i>o?gi(e,t,Tt(o,n),i,l):[o],c=i>=0&&n<=0?[0]:[];return(n<-o?gi(e,t,Tt(o,-i),-n,l):[o]).reverse().map(e=>-e).concat(c,a)}const _i=/./,vi=/[12357]/,bi=/[125]/,yi=/1/,xi=(e,t,n,i)=>e.map((e,l)=>4==t&&0==e||l%i==0&&n.test(e.toExponential()[e<0?1:0])?e:null);function wi(e,t,n,i,l){let r=e.axes[n],s=r.scale,o=e.scales[s],a=e.valToPos,c=r._space,u=a(10,s),h=a(9,s)-u>=c?_i:a(7,s)-u>=c?vi:a(5,s)-u>=c?bi:yi;if(h==yi){let e=St(a(1,s)-u);if(e<c)return xi(t.slice().reverse(),o.distr,h,Et(c/e)).reverse()}return xi(t,o.distr,h,1)}function $i(e,t,n,i,l){let r=e.axes[n],s=r.scale,o=r._space,a=e.valToPos,c=St(a(1,s)-a(2,s));return c<o?xi(t.slice().reverse(),3,_i,Et(o/c)).reverse():t}function ki(e,t,n,i){return null==i?He:null==t?"":wt(t)}const Si={show:!0,scale:"y",stroke:Me,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:ui,side:3,grid:si,ticks:oi,border:ai,font:ci,lineGap:1.5,rotate:0};const Ai={scale:null,auto:!0,sorted:0,min:Nt,max:-Nt},Ci=(e,t,n,i,l)=>l,Ei={show:!0,auto:!0,sorted:0,gaps:Ci,alpha:1,facets:[pn({},Ai,{scale:"x"}),pn({},Ai,{scale:"y"})]},Mi={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:Ci,alpha:1,points:{show:function(e,t){let{scale:n,idxs:i}=e.series[0],l=e._data[0],r=e.valToPos(l[i[0]],n,!0),s=e.valToPos(l[i[1]],n,!0),o=St(s-r)/(e.series[t].points.space*qe);return i[1]-i[0]<=o},filter:null},values:null,min:Nt,max:-Nt,idxs:[],path:null,clip:null};function Ti(e,t,n,i,l){return n/10}const Pi={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},zi=pn({},Pi,{time:!1,ori:1}),Di={};function Oi(e,t){let n=Di[e];return n||(n={key:e,plots:[],sub(e){n.plots.push(e)},unsub(e){n.plots=n.plots.filter(t=>t!=e)},pub(e,t,i,l,r,s,o){for(let a=0;a<n.plots.length;a++)n.plots[a]!=t&&n.plots[a].pub(e,t,i,l,r,s,o)}},null!=e&&(Di[e]=n)),n}function Wi(e,t,n){const i=e.mode,l=e.series[t],r=2==i?e._data[t]:e._data,s=e.scales,o=e.bbox;let a=r[0],c=2==i?r[1]:r[t],u=2==i?s[l.facets[0].scale]:s[e.series[0].scale],h=2==i?s[l.facets[1].scale]:s[l.scale],d=o.left,p=o.top,f=o.width,g=o.height,m=e.valToPosH,_=e.valToPosV;return 0==u.ori?n(l,a,c,u,h,m,_,d,p,f,g,ji,Bi,Ki,Gi,Ji):n(l,a,c,u,h,_,m,p,d,g,f,qi,Yi,Vi,Zi,Qi)}function Ni(e,t){let n=0,i=0,l=bt(e.bands,nn);for(let e=0;e<l.length;e++){let r=l[e];r.series[0]==t?n=r.dir:r.series[1]==t&&(1==r.dir?i|=1:i|=2)}return[n,1==i?-1:2==i?1:3==i?2:0]}function Ri(e,t,n,i,l){let r=e.mode,s=e.series[t],o=2==r?s.facets[1].scale:s.scale,a=e.scales[o];return-1==l?a.min:1==l?a.max:3==a.distr?1==a.dir?a.min:a.max:0}function Fi(e,t,n,i,l,r){return Wi(e,t,(e,t,s,o,a,c,u,h,d,p,f)=>{let g=e.pxRound;const m=o.dir*(0==o.ori?1:-1),_=0==o.ori?Bi:Yi;let v,b;1==m?(v=n,b=i):(v=i,b=n);let y=g(c(t[v],o,p,h)),x=g(u(s[v],a,f,d)),w=g(c(t[b],o,p,h)),$=g(u(1==r?a.max:a.min,a,f,d)),k=new Path2D(l);return _(k,w,$),_(k,y,$),_(k,y,x),k})}function Hi(e,t,n,i,l,r){let s=null;if(e.length>0){s=new Path2D;const o=0==t?Ki:Vi;let a=n;for(let t=0;t<e.length;t++){let n=e[t];if(n[1]>n[0]){let e=n[0]-a;e>0&&o(s,a,i,e,i+r),a=n[1]}}let c=n+l-a,u=10;c>0&&o(s,a,i-u/2,c,i+r+u)}return s}function Ui(e,t,n,i,l,r,s){let o=[],a=e.length;for(let c=1==l?n:i;c>=n&&c<=i;c+=l){if(null===t[c]){let u=c,h=c;if(1==l)for(;++c<=i&&null===t[c];)h=c;else for(;--c>=n&&null===t[c];)h=c;let d=r(e[u]),p=h==u?d:r(e[h]),f=u-l;d=s<=0&&f>=0&&f<a?r(e[f]):d;let g=h+l;p=s>=0&&g>=0&&g<a?r(e[g]):p,p>=d&&o.push([d,p])}}return o}function Li(e){return 0==e?Lt:1==e?Ct:t=>Vt(t,e)}function Ii(e){let t=0==e?ji:qi,n=0==e?(e,t,n,i,l,r)=>{e.arcTo(t,n,i,l,r)}:(e,t,n,i,l,r)=>{e.arcTo(n,t,l,i,r)},i=0==e?(e,t,n,i,l)=>{e.rect(t,n,i,l)}:(e,t,n,i,l)=>{e.rect(n,t,l,i)};return(e,l,r,s,o,a=0,c=0)=>{0==a&&0==c?i(e,l,r,s,o):(a=Mt(a,s/2,o/2),c=Mt(c,s/2,o/2),t(e,l+a,r),n(e,l+s,r,l+s,r+o,a),n(e,l+s,r+o,l,r+o,c),n(e,l,r+o,l,r,c),n(e,l,r,l+s,r,a),e.closePath())}}const ji=(e,t,n)=>{e.moveTo(t,n)},qi=(e,t,n)=>{e.moveTo(n,t)},Bi=(e,t,n)=>{e.lineTo(t,n)},Yi=(e,t,n)=>{e.lineTo(n,t)},Ki=Ii(0),Vi=Ii(1),Gi=(e,t,n,i,l,r)=>{e.arc(t,n,i,l,r)},Zi=(e,t,n,i,l,r)=>{e.arc(n,t,i,l,r)},Ji=(e,t,n,i,l,r,s)=>{e.bezierCurveTo(t,n,i,l,r,s)},Qi=(e,t,n,i,l,r,s)=>{e.bezierCurveTo(n,t,l,i,s,r)};function Xi(e){return(e,t,n,i,l)=>Wi(e,t,(t,r,s,o,a,c,u,h,d,p,f)=>{let g,m,{pxRound:_,points:v}=t;0==o.ori?(g=ji,m=Gi):(g=qi,m=Zi);const b=Jt(v.width*qe,3);let y=(v.size-v.width)/2*qe,x=Jt(2*y,3),w=new Path2D,$=new Path2D,{left:k,top:S,width:A,height:C}=e.bbox;Ki($,k-x,S-x,A+2*x,C+2*x);const E=e=>{if(null!=s[e]){let t=_(c(r[e],o,p,h)),n=_(u(s[e],a,f,d));g(w,t+y,n),m(w,t,n,y,0,2*kt)}};if(l)l.forEach(E);else for(let e=n;e<=i;e++)E(e);return{stroke:b>0?w:null,fill:w,clip:$,flags:3}})}function el(e){return(t,n,i,l,r,s)=>{i!=l&&(r!=i&&s!=i&&e(t,n,i),r!=l&&s!=l&&e(t,n,l),e(t,n,s))}}const tl=el(Bi),nl=el(Yi);function il(e){const t=bt(e?.alignGaps,0);return(e,n,i,l)=>Wi(e,n,(r,s,o,a,c,u,h,d,p,f,g)=>{[i,l]=ht(o,i,l);let m,_,v=r.pxRound,b=e=>v(u(e,a,f,d)),y=e=>v(h(e,c,g,p));0==a.ori?(m=Bi,_=tl):(m=Yi,_=nl);const x=a.dir*(0==a.ori?1:-1),w={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},$=w.stroke;let k=!1;if(l-i>=4*f){let t,n,r,c=t=>e.posToVal(t,a.key,!0),u=null,h=null,d=b(s[1==x?i:l]),p=b(s[i]),f=b(s[l]),g=c(1==x?p+1:f-1);for(let e=1==x?i:l;e>=i&&e<=l;e+=x){let i=s[e],l=(1==x?i<g:i>g)?d:b(i),r=o[e];l==d?null!=r?(n=r,null==u?(m($,l,y(n)),t=u=h=n):n<u?u=n:n>h&&(h=n)):null===r&&(k=!0):(null!=u&&_($,d,y(u),y(h),y(t),y(n)),null!=r?(n=r,m($,l,y(n)),u=h=t=n):(u=h=null,null===r&&(k=!0)),d=l,g=c(d+x))}null!=u&&u!=h&&r!=d&&_($,d,y(u),y(h),y(t),y(n))}else for(let e=1==x?i:l;e>=i&&e<=l;e+=x){let t=o[e];null===t?k=!0:null!=t&&m($,b(s[e]),y(t))}let[S,A]=Ni(e,n);if(null!=r.fill||0!=S){let t=w.fill=new Path2D($),o=y(r.fillTo(e,n,r.min,r.max,S)),a=b(s[i]),c=b(s[l]);-1==x&&([c,a]=[a,c]),m(t,c,o),m(t,a,o)}if(!r.spanGaps){let c=[];k&&c.push(...Ui(s,o,i,l,x,b,t)),w.gaps=c=r.gaps(e,n,i,l,c),w.clip=Hi(c,a.ori,d,p,f,g)}return 0!=A&&(w.band=2==A?[Fi(e,n,i,l,$,-1),Fi(e,n,i,l,$,1)]:Fi(e,n,i,l,$,A)),w})}function ll(e,t,n,i,l,r,s=Nt){if(e.length>1){let o=null;for(let a=0,c=1/0;a<e.length;a++)if(void 0!==t[a]){if(null!=o){let t=St(e[a]-e[o]);t<c&&(c=t,s=St(n(e[a],i,l,r)-n(e[o],i,l,r)))}o=a}}return s}function rl(e,t,n,i,l,r){const s=e.length;if(s<2)return null;const o=new Path2D;if(n(o,e[0],t[0]),2==s)i(o,e[1],t[1]);else{let n=Array(s),i=Array(s-1),r=Array(s-1),a=Array(s-1);for(let n=0;n<s-1;n++)r[n]=t[n+1]-t[n],a[n]=e[n+1]-e[n],i[n]=r[n]/a[n];n[0]=i[0];for(let e=1;e<s-1;e++)0===i[e]||0===i[e-1]||i[e-1]>0!=i[e]>0?n[e]=0:(n[e]=3*(a[e-1]+a[e])/((2*a[e]+a[e-1])/i[e-1]+(a[e]+2*a[e-1])/i[e]),isFinite(n[e])||(n[e]=0));n[s-1]=i[s-2];for(let i=0;i<s-1;i++)l(o,e[i]+a[i]/3,t[i]+n[i]*a[i]/3,e[i+1]-a[i]/3,t[i+1]-n[i+1]*a[i]/3,e[i+1],t[i+1])}return o}const sl=new Set;function ol(){for(let e of sl)e.syncRect(!0)}Ue&&(rt("resize",Ie,ol),rt("scroll",Ie,ol,!0),rt(Fe,Ie,()=>{wl.pxRatio=qe}));const al=il(),cl=Xi();function ul(e,t,n,i){return(i?[e[0],e[1]].concat(e.slice(2)):[e[0]].concat(e.slice(1))).map((e,i)=>hl(e,i,t,n))}function hl(e,t,n,i){return pn({},0==t?n:i,e)}function dl(e,t,n){return null==t?ln:[t,n]}const pl=dl;function fl(e,t,n){return null==t?ln:vt(t,n,.1,!0)}function gl(e,t,n,i){return null==t?ln:pt(t,n,e.scales[i].log,!1)}const ml=gl;function _l(e,t,n,i){return null==t?ln:ft(t,n,e.scales[i].log,!1)}const vl=_l;function bl(e,t,n,i,l){let r=Tt(Rt(e),Rt(t)),s=t-e,o=ot(l/i*s,n);do{let e=n[o],t=i*e/s;if(t>=l&&r+(e<5?Qt.get(e):0)<=17)return[e,t]}while(++o<n.length);return[0,0]}function yl(e){let t,n;return[e=e.replace(/(\d+)px/,(e,i)=>(t=Ct((n=+i)*qe))+"px"),t,n]}function xl(e){e.show&&[e.font,e.labelFont].forEach(e=>{let t=Jt(e[2]*qe,1);e[0]=e[0].replace(/[0-9.]+px/,t+"px"),e[1]=t})}function wl(e,t,n){const i={mode:bt(e.mode,1)},l=i.mode;function r(e,t,n,i){let l=t.valToPct(e);return i+n*(-1==t.dir?1-l:l)}function s(e,t,n,i){let l=t.valToPct(e);return i+n*(-1==t.dir?l:1-l)}function o(e,t,n,i){return 0==t.ori?r(e,t,n,i):s(e,t,n,i)}i.valToPosH=r,i.valToPosV=s;let a=!1;i.status=0;const c=i.root=Ze("uplot");if(null!=e.id&&(c.id=e.id),Ye(c,e.class),e.title){Ze("u-title",c).textContent=e.title}const u=Ge("canvas"),h=i.ctx=u.getContext("2d"),d=Ze("u-wrap",c);rt("click",d,e=>{if(e.target===f){(ai!=ii||ci!=ri)&&Di.click(i,e)}},!0);const p=i.under=Ze("u-under",d);d.appendChild(u);const f=i.over=Ze("u-over",d),g=+bt((e=dn(e)).pxAlign,1),m=Li(g);(e.plugins||[]).forEach(t=>{t.opts&&(e=t.opts(i,e)||e)});const _=e.ms||.001,v=i.series=1==l?ul(e.series||[],di,Mi,!1):function(e,t){return e.map((e,n)=>0==n?{}:pn({},t,e))}(e.series||[null],Ei),b=i.axes=ul(e.axes||[],hi,Si,!0),y=i.scales={},x=i.bands=e.bands||[];x.forEach(e=>{e.fill=Ut(e.fill||null),e.dir=bt(e.dir,-1)});const w=2==l?v[1].facets[0].scale:v[0].scale,$={axes:function(){for(let e=0;e<b.length;e++){let t=b[e];if(!t.show||!t._show)continue;let n,l,r=t.side,s=r%2,a=t.stroke(i,e),c=0==r||3==r?-1:1,[u,d]=t._found;if(null!=t.label){let o=t.labelGap*c,p=Ct((t._lpos+o)*qe);Sn(t.labelFont[0],a,"center",2==r?Se:Ae),h.save(),1==s?(n=l=0,h.translate(p,Ct(fe+me/2)),h.rotate((3==r?-kt:kt)/2)):(n=Ct(pe+ge/2),l=p);let f=Ht(t.label)?t.label(i,e,u,d):t.label;h.fillText(f,n,l),h.restore()}if(0==d)continue;let p=y[t.scale],f=0==s?ge:me,g=0==s?pe:fe,_=t._splits,v=2==p.distr?_.map(e=>bn[e]):_,x=2==p.distr?bn[_[1]]-bn[_[0]]:u,w=t.ticks,$=t.border,k=w.show?w.size:0,S=Ct(k*qe),A=Ct((2==t.alignTo?t._size-k-t.gap:t.gap)*qe),C=t._rotate*-kt/180,E=m(t._pos*qe),M=E+(S+A)*c;l=0==s?M:0,n=1==s?M:0,Sn(t.font[0],a,1==t.align?Ce:2==t.align?Ee:C>0?Ce:C<0?Ee:0==s?"center":3==r?Ee:Ce,C||1==s?"middle":2==r?Se:Ae);let T=t.font[1]*t.lineGap,P=_.map(e=>m(o(e,p,f,g))),z=t._values;for(let e=0;e<z.length;e++){let t=z[e];if(null!=t){0==s?n=P[e]:l=P[e],t=""+t;let i=-1==t.indexOf("\n")?[t]:t.split(/\n/gm);for(let e=0;e<i.length;e++){let t=i[e];C?(h.save(),h.translate(n,l+e*T),h.rotate(C),h.fillText(t,0,0),h.restore()):h.fillText(t,n,l+e*T)}}}w.show&&Nn(P,w.filter(i,v,e,d,x),s,r,E,S,Jt(w.width*qe,3),w.stroke(i,e),w.dash,w.cap);let D=t.grid;D.show&&Nn(P,D.filter(i,v,e,d,x),s,0==s?2:1,0==s?fe:pe,0==s?me:ge,Jt(D.width*qe,3),D.stroke(i,e),D.dash,D.cap),$.show&&Nn([E],[1],0==s?1:0,0==s?1:2,1==s?fe:pe,1==s?me:ge,Jt($.width*qe,3),$.stroke(i,e),$.dash,$.cap)}Dl("drawAxes")},series:function(){if(Rt>0){let e=v.some(e=>e._focus)&&vn!=tt.alpha;e&&(h.globalAlpha=vn=tt.alpha),v.forEach((e,n)=>{if(n>0&&e.show&&(En(n,!1),En(n,!0),null==e._paths)){let r=vn;vn!=e.alpha&&(h.globalAlpha=vn=e.alpha);let s=2==l?[0,t[n][0].length-1]:function(e){let t=Ft(Lt-1,0,Rt-1),n=Ft(Yt+1,0,Rt-1);for(;null==e[t]&&t>0;)t--;for(;null==e[n]&&n<Rt-1;)n++;return[t,n]}(t[n]);e._paths=e.paths(i,n,s[0],s[1]),vn!=r&&(h.globalAlpha=vn=r)}}),v.forEach((e,t)=>{if(t>0&&e.show){let n=vn;vn!=e.alpha&&(h.globalAlpha=vn=e.alpha),null!=e._paths&&Mn(t,!1);{let n=null!=e._paths?e._paths.gaps:null,l=e.points.show(i,t,Lt,Yt,n),r=e.points.filter(i,t,l,n);(l||r)&&(e.points._paths=e.points.paths(i,t,Lt,Yt,r),Mn(t,!0))}vn!=n&&(h.globalAlpha=vn=n),Dl("drawSeries",t)}}),e&&(h.globalAlpha=vn=1)}}},k=(e.drawOrder||["axes","series"]).map(e=>$[e]);function S(e){const t=3==e.distr?t=>Dt(t>0?t:e.clamp(i,t,e.min,e.max,e.key)):4==e.distr?t=>Wt(t,e.asinh):100==e.distr?t=>e.fwd(t):e=>e;return n=>{let i=t(n),{_min:l,_max:r}=e;return(i-l)/(r-l)}}function A(t){let n=y[t];if(null==n){let i=(e.scales||tn)[t]||tn;if(null!=i.from){A(i.from);let e=pn({},y[i.from],i,{key:t});e.valToPct=S(e),y[t]=e}else{n=y[t]=pn({},t==w?Pi:zi,i),n.key=t;let e=n.time,r=n.range,s=rn(r);if((t!=w||2==l&&!e)&&(!s||null!=r[0]&&null!=r[1]||(r={min:null==r[0]?gt:{mode:1,hard:r[0],soft:r[0]},max:null==r[1]?gt:{mode:1,hard:r[1],soft:r[1]}},s=!1),!s&&an(r))){let e=r;r=(t,n,i)=>null==n?ln:vt(n,i,e)}n.range=Ut(r||(e?pl:t==w?3==n.distr?ml:4==n.distr?vl:dl:3==n.distr?gl:4==n.distr?_l:fl)),n.auto=Ut(!s&&n.auto),n.clamp=Ut(n.clamp||Ti),n._min=n._max=null,n.valToPct=S(n)}}}A("x"),A("y"),1==l&&v.forEach(e=>{A(e.scale)}),b.forEach(e=>{A(e.scale)});for(let t in e.scales)A(t);const C=y[w],E=C.distr;let M,T;0==C.ori?(Ye(c,"u-hz"),M=r,T=s):(Ye(c,"u-vt"),M=s,T=r);const P={};for(let e in y){let t=y[e];null==t.min&&null==t.max||(P[e]={min:t.min,max:t.max},t.min=t.max=null)}const z=e.tzDate||(e=>new Date(Ct(e/_))),D=e.fmtDate||kn,O=1==_?Bn(z):Vn(z),W=Zn(z,Gn(1==_?qn:Kn,D)),N=Xn(z,Qn("{YYYY}-{MM}-{DD} {h}:{mm}{aa}",D)),R=[],F=i.legend=pn({},ei,e.legend),H=i.cursor=pn({},li,{drag:{y:2==l}},e.cursor),U=F.show,L=H.show,I=F.markers;let j,q,B;F.idxs=R,I.width=Ut(I.width),I.dash=Ut(I.dash),I.stroke=Ut(I.stroke),I.fill=Ut(I.fill);let Y,K=[],V=[],G=!1,Z={};if(F.live){const e=v[1]?v[1].values:null;G=null!=e,Y=G?e(i,1,0):{_:0};for(let e in Y)Z[e]=He}if(U)if(j=Ge("table","u-legend",c),B=Ge("tbody",null,j),F.mount(i,j),G){q=Ge("thead",null,j,B);let e=Ge("tr",null,q);for(var J in Ge("th",null,e),Y)Ge("th",we,e).textContent=J}else Ye(j,"u-inline"),F.live&&Ye(j,"u-live");const Q={show:!0},X={show:!1};const ee=new Map;function te(e,t,n,l=!0){const r=ee.get(t)||{},s=H.bind[e](i,t,n,l);s&&(rt(e,t,r[e]=s),ee.set(t,r))}function ne(e,t,n){const i=ee.get(t)||{};for(let n in i)null!=e&&n!=e||(st(n,t,i[n]),delete i[n]);null==e&&ee.delete(t)}let ie=0,le=0,re=0,se=0,oe=0,ae=0,ce=oe,ue=ae,he=re,de=se,pe=0,fe=0,ge=0,me=0;i.bbox={};let _e=!1,ve=!1,be=!1,ye=!1,Me=!1,Re=!1;function Ue(e,t,n){(n||e!=i.width||t!=i.height)&&je(e,t),Hn(!1),be=!0,ve=!0,yi()}function je(e,t){i.width=ie=re=e,i.height=le=se=t,oe=ae=0,function(){let e=!1,t=!1,n=!1,i=!1;b.forEach((l,r)=>{if(l.show&&l._show){let{side:r,_size:s}=l,o=r%2,a=s+(null!=l.label?l.labelSize:0);a>0&&(o?(re-=a,3==r?(oe+=a,i=!0):n=!0):(se-=a,0==r?(ae+=a,e=!0):t=!0))}}),wt[0]=e,wt[1]=n,wt[2]=t,wt[3]=i,re-=Ot[1]+Ot[3],oe+=Ot[3],se-=Ot[2]+Ot[0],ae+=Ot[0]}(),function(){let e=oe+re,t=ae+se,n=oe,i=ae;function l(l,r){switch(l){case 1:return e+=r,e-r;case 2:return t+=r,t-r;case 3:return n-=r,n+r;case 0:return i-=r,i+r}}b.forEach((e,t)=>{if(e.show&&e._show){let t=e.side;e._pos=l(t,e._size),null!=e.label&&(e._lpos=l(t,e.labelSize))}})}();let n=i.bbox;pe=n.left=Vt(oe*qe,.5),fe=n.top=Vt(ae*qe,.5),ge=n.width=Vt(re*qe,.5),me=n.height=Vt(se*qe,.5)}const Be=3;if(i.setSize=function({width:e,height:t}){Ue(e,t)},null==H.dataIdx){let e=H.hover,n=e.skip=new Set(e.skip??[]);n.add(void 0);let i=e.prox=Ut(e.prox),l=e.bias??=0;H.dataIdx=(e,r,s,o)=>{if(0==r)return s;let a=s,c=i(e,r,s,o)??Nt,u=c>=0&&c<Nt,h=0==C.ori?re:se,d=H.left,p=t[0],f=t[r];if(n.has(f[s])){a=null;let e,t=null,i=null;if(0==l||-1==l)for(e=s;null==t&&e-- >0;)n.has(f[e])||(t=e);if(0==l||1==l)for(e=s;null==i&&e++<f.length;)n.has(f[e])||(i=e);if(null!=t||null!=i)if(u){let e=d-(null==t?-1/0:M(p[t],C,h,0)),n=(null==i?1/0:M(p[i],C,h,0))-d;e<=n?e<=c&&(a=t):n<=c&&(a=i)}else a=null==i?t:null==t?i:s-t<=i-s?t:i}else if(u){St(d-M(p[s],C,h,0))>c&&(a=null)}return a}}const Je=e=>{H.event=e};H.idxs=R,H._lock=!1;let Xe=H.points;Xe.show=Ut(Xe.show),Xe.size=Ut(Xe.size),Xe.stroke=Ut(Xe.stroke),Xe.width=Ut(Xe.width),Xe.fill=Ut(Xe.fill);const tt=i.focus=pn({},e.focus||{alpha:.3},H.focus),it=tt.prox>=0,lt=it&&Xe.one;let at=[],mt=[],_t=[];function yt(e,t){let n=Xe.show(i,t);if(n instanceof HTMLElement)return Ye(n,"u-cursor-pt"),Ye(n,e.class),Qe(n,-10,-10,re,se),f.insertBefore(n,at[t]),n}function xt(e,t){if(1==l||t>0){let t=1==l&&y[e.scale].time,n=e.value;e.value=t?on(n)?Xn(z,Qn(n,D)):n||N:n||ki,e.label=e.label||(t?"Time":"Value")}if(lt||t>0){e.width=null==e.width?1:e.width,e.paths=e.paths||al||jt,e.fillTo=Ut(e.fillTo||Ri),e.pxAlign=+bt(e.pxAlign,g),e.pxRound=Li(e.pxAlign),e.stroke=Ut(e.stroke||null),e.fill=Ut(e.fill||null),e._stroke=e._fill=e._paths=e._focus=null;let t=Jt((3+2*(Tt(1,e.width)||1))*1,3),n=e.points=pn({},{size:t,width:Tt(1,.2*t),stroke:e.stroke,space:2*t,paths:cl,_stroke:null,_fill:null},e.points);n.show=Ut(n.show),n.filter=Ut(n.filter),n.fill=Ut(n.fill),n.stroke=Ut(n.stroke),n.paths=Ut(n.paths),n.pxAlign=e.pxAlign}if(U){let n=function(e,t){if(0==t&&(G||!F.live||2==l))return ln;let n=[],r=Ge("tr","u-series",B,B.childNodes[t]);Ye(r,e.class),e.show||Ye(r,xe);let s=Ge("th",null,r);if(I.show){let e=Ze("u-marker",s);if(t>0){let n=I.width(i,t);n&&(e.style.border=n+"px "+I.dash(i,t)+" "+I.stroke(i,t)),e.style.background=I.fill(i,t)}}let o=Ze(we,s);for(var a in e.label instanceof HTMLElement?o.appendChild(e.label):o.textContent=e.label,t>0&&(I.show||(o.style.color=e.width>0?I.stroke(i,t):I.fill(i,t)),te("click",s,t=>{if(H._lock)return;Je(t);let n=v.indexOf(e);if((t.ctrlKey||t.metaKey)!=F.isolate){let e=v.some((e,t)=>t>0&&t!=n&&e.show);v.forEach((t,i)=>{i>0&&ji(i,e?i==n?Q:X:Q,!0,Wl.setSeries)})}else ji(n,{show:!e.show},!0,Wl.setSeries)},!1),it&&te(Oe,s,t=>{H._lock||(Je(t),ji(v.indexOf(e),Ki,!0,Wl.setSeries))},!1)),Y){let e=Ge("td","u-value",r);e.textContent="--",n.push(e)}return[r,n]}(e,t);K.splice(t,0,n[0]),V.splice(t,0,n[1]),F.values.push(null)}if(L){R.splice(t,0,null);let n=null;lt?0==t&&(n=yt(e,t)):t>0&&(n=yt(e,t)),at.splice(t,0,n),mt.splice(t,0,0),_t.splice(t,0,0)}Dl("addSeries",t)}i.addSeries=function(e,t){t=t??v.length,e=1==l?hl(e,t,di,Mi):hl(e,t,{},Ei),v.splice(t,0,e),xt(v[t],t)},i.delSeries=function(e){if(v.splice(e,1),U){F.values.splice(e,1),V.splice(e,1);let t=K.splice(e,1)[0];ne(null,t.firstChild),t.remove()}L&&(R.splice(e,1),at.splice(e,1)[0].remove(),mt.splice(e,1),_t.splice(e,1)),Dl("delSeries",e)};const wt=[!1,!1,!1,!1];function At(e,t,n,i){let[l,r,s,o]=n,a=t%2,c=0;return 0==a&&(o||r)&&(c=0==t&&!l||2==t&&!s?Ct(hi.size/3):0),1==a&&(l||s)&&(c=1==t&&!r||3==t&&!o?Ct(Si.size/2):0),c}const zt=i.padding=(e.padding||[At,At,At,At]).map(e=>Ut(bt(e,At))),Ot=i._padding=zt.map((e,t)=>e(i,t,wt,0));let Rt,Lt=null,Yt=null;const Kt=1==l?v[0].idxs:null;let Gt,Zt,en,sn,un,hn,fn,mn,_n,vn,bn=null,yn=!1;function xn(e,n){if(t=e??[],i.data=i._data=t,2==l){Rt=0;for(let e=1;e<v.length;e++)Rt+=t[e][0].length}else{0==t.length&&(i.data=i._data=t=[[]]),bn=t[0],Rt=bn.length;let e=t;if(2==E){e=t.slice();let n=e[0]=Array(Rt);for(let e=0;e<Rt;e++)n[e]=e}i._data=t=e}if(Hn(!0),Dl("setData"),2==E&&(be=!0),!1!==n){let e=C;e.auto(i,yn)?wn():Ii(w,e.min,e.max),ye=ye||H.left>=0,Re=!0,yi()}}function wn(){let e,n;yn=!0,1==l&&(Rt>0?(Lt=Kt[0]=0,Yt=Kt[1]=Rt-1,e=t[0][Lt],n=t[0][Yt],2==E?(e=Lt,n=Yt):e==n&&(3==E?[e,n]=pt(e,e,C.log,!1):4==E?[e,n]=ft(e,e,C.log,!1):C.time?n=e+Ct(86400/_):[e,n]=vt(e,n,.1,!0))):(Lt=Kt[0]=e=null,Yt=Kt[1]=n=null)),Ii(w,e,n)}function $n(e,t,n,i,l,r){e??=Te,n??=nn,i??="butt",l??=Te,r??="round",e!=Gt&&(h.strokeStyle=Gt=e),l!=Zt&&(h.fillStyle=Zt=l),t!=en&&(h.lineWidth=en=t),r!=un&&(h.lineJoin=un=r),i!=hn&&(h.lineCap=hn=i),n!=sn&&h.setLineDash(sn=n)}function Sn(e,t,n,i){t!=Zt&&(h.fillStyle=Zt=t),e!=fn&&(h.font=fn=e),n!=mn&&(h.textAlign=mn=n),i!=_n&&(h.textBaseline=_n=i)}function An(e,t,n,l,r=0){if(l.length>0&&e.auto(i,yn)&&(null==t||null==t.min)){let t=bt(Lt,0),i=bt(Yt,l.length-1),s=null==n.min?function(e,t,n,i=0,l=!1){let r=l?dt:ht,s=l?ut:ct;[t,n]=r(e,t,n);let o=e[t],a=e[t];if(t>-1)if(1==i)o=e[t],a=e[n];else if(-1==i)o=e[n],a=e[t];else for(let i=t;i<=n;i++){let t=e[i];s(t)&&(t<o?o=t:t>a&&(a=t))}return[o??Nt,a??-Nt]}(l,t,i,r,3==e.distr):[n.min,n.max];e.min=Mt(e.min,n.min=s[0]),e.max=Tt(e.max,n.max=s[1])}}i.setData=xn;const Cn={min:null,max:null};function En(e,t){let n=t?v[e].points:v[e];n._stroke=n.stroke(i,e),n._fill=n.fill(i,e)}function Mn(e,n){let l=n?v[e].points:v[e],{stroke:r,fill:s,clip:o,flags:a,_stroke:c=l._stroke,_fill:u=l._fill,_width:d=l.width}=l._paths;d=Jt(d*qe,3);let p=null,f=d%2/2;n&&null==u&&(u=d>0?"#fff":c);let g=1==l.pxAlign&&f>0;if(g&&h.translate(f,f),!n){let e=pe-d/2,t=fe-d/2,n=ge+d,i=me+d;p=new Path2D,p.rect(e,t,n,i)}n?Dn(c,d,l.dash,l.cap,u,r,s,a,o):function(e,n,l,r,s,o,a,c,u,h,d){let p=!1;0!=u&&x.forEach((f,g)=>{if(f.series[0]==e){let e,m=v[f.series[1]],_=t[f.series[1]],b=(m._paths||tn).band;rn(b)&&(b=1==f.dir?b[0]:b[1]);let y=null;m.show&&b&&function(e,t,n){for(t=bt(t,0),n=bt(n,e.length-1);t<=n;){if(null!=e[t])return!0;t++}return!1}(_,Lt,Yt)?(y=f.fill(i,g)||o,e=m._paths.clip):b=null,Dn(n,l,r,s,y,a,c,u,h,d,e,b),p=!0}}),p||Dn(n,l,r,s,o,a,c,u,h,d)}(e,c,d,l.dash,l.cap,u,r,s,a,p,o),g&&h.translate(-f,-f)}const zn=3;function Dn(e,t,n,i,l,r,s,o,a,c,u,d){$n(e,t,n,i,l),(a||c||d)&&(h.save(),a&&h.clip(a),c&&h.clip(c)),d?(o&zn)==zn?(h.clip(d),u&&h.clip(u),Wn(l,s),On(e,r,t)):2&o?(Wn(l,s),h.clip(d),On(e,r,t)):1&o&&(h.save(),h.clip(d),u&&h.clip(u),Wn(l,s),h.restore(),On(e,r,t)):(Wn(l,s),On(e,r,t)),(a||c||d)&&h.restore()}function On(e,t,n){n>0&&(t instanceof Map?t.forEach((e,t)=>{h.strokeStyle=Gt=t,h.stroke(e)}):null!=t&&e&&h.stroke(t))}function Wn(e,t){t instanceof Map?t.forEach((e,t)=>{h.fillStyle=Zt=t,h.fill(e)}):null!=t&&e&&h.fill(t)}function Nn(e,t,n,i,l,r,s,o,a,c){let u=s%2/2;1==g&&h.translate(u,u),$n(o,s,a,c,o),h.beginPath();let d,p,f,m,_=l+(0==i||3==i?-r:r);0==n?(p=l,m=_):(d=l,f=_);for(let i=0;i<e.length;i++)null!=t[i]&&(0==n?d=f=e[i]:p=m=e[i],h.moveTo(d,p),h.lineTo(f,m));h.stroke(),1==g&&h.translate(-u,-u)}function Rn(e){let t=!0;return b.forEach((n,l)=>{if(!n.show)return;let r=y[n.scale];if(null==r.min)return void(n._show&&(t=!1,n._show=!1,Hn(!1)));n._show||(t=!1,n._show=!0,Hn(!1));let s=n.side,o=s%2,{min:a,max:c}=r,[u,h]=function(e,t,n,l){let r,s=b[e];if(l<=0)r=[0,0];else{let o=s._space=s.space(i,e,t,n,l);r=bl(t,n,s._incrs=s.incrs(i,e,t,n,l,o),l,o)}return s._found=r}(l,a,c,0==o?re:se);if(0==h)return;let d=2==r.distr,p=n._splits=n.splits(i,l,a,c,u,h,d),f=2==r.distr?p.map(e=>bn[e]):p,g=2==r.distr?bn[p[1]]-bn[p[0]]:u,m=n._values=n.values(i,n.filter(i,f,l,h,g),l,h,g);n._rotate=2==s?n.rotate(i,m,l,h):0;let _=n._size;n._size=Et(n.size(i,m,l,e)),null!=_&&n._size!=_&&(t=!1)}),t}function Fn(e){let t=!0;return zt.forEach((n,l)=>{let r=n(i,l,wt,e);r!=Ot[l]&&(t=!1),Ot[l]=r}),t}function Hn(e){v.forEach((t,n)=>{n>0&&(t._paths=null,e&&(1==l?(t.min=null,t.max=null):t.facets.forEach(e=>{e.min=null,e.max=null})))})}let Un,Ln,In,Jn,ti,ni,ii,ri,si,oi,ai,ci,ui=!1,_i=!1,vi=[];function bi(){_i=!1;for(let e=0;e<vi.length;e++)Dl(...vi[e]);vi.length=0}function yi(){ui||(gn(xi),ui=!0)}function xi(){if(_e&&(!function(){for(let e in y){let t=y[e];null==P[e]&&(null==t.min||null!=P[w]&&t.auto(i,yn))&&(P[e]=Cn)}for(let e in y){let t=y[e];null==P[e]&&null!=t.from&&null!=P[t.from]&&(P[e]=Cn)}null!=P[w]&&Hn(!0);let e={};for(let t in P){let n=P[t];if(null!=n){let r=e[t]=dn(y[t],cn);if(null!=n.min)pn(r,n);else if(t!=w||2==l)if(0==Rt&&null==r.from){let e=r.range(i,null,null,t);r.min=e[0],r.max=e[1]}else r.min=Nt,r.max=-Nt}}if(Rt>0){v.forEach((n,r)=>{if(1==l){let l=n.scale,s=P[l];if(null==s)return;let o=e[l];if(0==r){let e=o.range(i,o.min,o.max,l);o.min=e[0],o.max=e[1],Lt=ot(o.min,t[0]),Yt=ot(o.max,t[0]),Yt-Lt>1&&(t[0][Lt]<o.min&&Lt++,t[0][Yt]>o.max&&Yt--),n.min=bn[Lt],n.max=bn[Yt]}else n.show&&n.auto&&An(o,s,n,t[r],n.sorted);n.idxs[0]=Lt,n.idxs[1]=Yt}else if(r>0&&n.show&&n.auto){let[i,l]=n.facets,s=i.scale,o=l.scale,[a,c]=t[r],u=e[s],h=e[o];null!=u&&An(u,P[s],i,a,i.sorted),null!=h&&An(h,P[o],l,c,l.sorted),n.min=l.min,n.max=l.max}});for(let t in e){let n=e[t],l=P[t];if(null==n.from&&(null==l||null==l.min)){let e=n.range(i,n.min==Nt?null:n.min,n.max==-Nt?null:n.max,t);n.min=e[0],n.max=e[1]}}}for(let t in e){let n=e[t];if(null!=n.from){let l=e[n.from];if(null==l.min)n.min=n.max=null;else{let e=n.range(i,l.min,l.max,t);n.min=e[0],n.max=e[1]}}}let n={},r=!1;for(let t in e){let i=e[t],l=y[t];if(l.min!=i.min||l.max!=i.max){l.min=i.min,l.max=i.max;let e=l.distr;l._min=3==e?Dt(l.min):4==e?Wt(l.min,l.asinh):100==e?l.fwd(l.min):l.min,l._max=3==e?Dt(l.max):4==e?Wt(l.max,l.asinh):100==e?l.fwd(l.max):l.max,n[t]=r=!0}}if(r){v.forEach((e,t)=>{2==l?t>0&&n.y&&(e._paths=null):n[e.scale]&&(e._paths=null)});for(let e in n)be=!0,Dl("setScale",e);L&&H.left>=0&&(ye=Re=!0)}for(let e in P)P[e]=null}(),_e=!1),be&&(!function(){let e=!1,t=0;for(;!e;){t++;let n=Rn(t),l=Fn(t);e=t==Be||n&&l,e||(je(i.width,i.height),ve=!0)}}(),be=!1),ve){if(Ve(p,Ce,oe),Ve(p,Se,ae),Ve(p,$e,re),Ve(p,ke,se),Ve(f,Ce,oe),Ve(f,Se,ae),Ve(f,$e,re),Ve(f,ke,se),Ve(d,$e,ie),Ve(d,ke,le),u.width=Ct(ie*qe),u.height=Ct(le*qe),b.forEach(({_el:e,_show:t,_size:n,_pos:i,side:l})=>{if(null!=e)if(t){let t=l%2==1;Ve(e,t?"left":"top",i-(3===l||0===l?n:0)),Ve(e,t?"width":"height",n),Ve(e,t?"top":"left",t?ae:oe),Ve(e,t?"height":"width",t?se:re),Ke(e,xe)}else Ye(e,xe)}),Gt=Zt=en=un=hn=fn=mn=_n=sn=null,vn=1,il(!0),oe!=ce||ae!=ue||re!=he||se!=de){Hn(!1);let e=re/he,t=se/de;if(L&&!ye&&H.left>=0){H.left*=e,H.top*=t,In&&Qe(In,Ct(H.left),0,re,se),Jn&&Qe(Jn,0,Ct(H.top),re,se);for(let n=0;n<at.length;n++){let i=at[n];null!=i&&(mt[n]*=e,_t[n]*=t,Qe(i,Et(mt[n]),Et(_t[n]),re,se))}}if(Fi.show&&!Me&&Fi.left>=0&&Fi.width>0){Fi.left*=e,Fi.width*=e,Fi.top*=t,Fi.height*=t;for(let e in ol)Ve(Hi,e,Fi[e])}ce=oe,ue=ae,he=re,de=se}Dl("setSize"),ve=!1}ie>0&&le>0&&(h.clearRect(0,0,u.width,u.height),Dl("drawClear"),k.forEach(e=>e()),Dl("draw")),Fi.show&&Me&&(Ui(Fi),Me=!1),L&&ye&&(tl(null,!0,!1),ye=!1),F.show&&F.live&&Re&&(Xi(),Re=!1),a||(a=!0,i.status=1,Dl("ready")),yn=!1,ui=!1}function Ai(e,n){let l=y[e];if(null==l.from){if(0==Rt){let t=l.range(i,n.min,n.max,e);n.min=t[0],n.max=t[1]}if(n.min>n.max){let e=n.min;n.min=n.max,n.max=e}if(Rt>1&&null!=n.min&&null!=n.max&&n.max-n.min<1e-16)return;e==w&&2==l.distr&&Rt>0&&(n.min=ot(n.min,t[0]),n.max=ot(n.max,t[0]),n.min==n.max&&n.max++),P[e]=n,_e=!0,yi()}}i.batch=function(e,t=!1){ui=!0,_i=t,e(i),xi(),t&&vi.length>0&&queueMicrotask(bi)},i.redraw=(e,t)=>{be=t||!1,!1!==e?Ii(w,C.min,C.max):yi()},i.setScale=Ai;let Ci=!1;const Di=H.drag;let Wi=Di.x,Ni=Di.y;L&&(H.x&&(Un=Ze("u-cursor-x",f)),H.y&&(Ln=Ze("u-cursor-y",f)),0==C.ori?(In=Un,Jn=Ln):(In=Ln,Jn=Un),ai=H.left,ci=H.top);const Fi=i.select=pn({show:!0,over:!0,left:0,width:0,top:0,height:0},e.select),Hi=Fi.show?Ze("u-select",Fi.over?f:p):null;function Ui(e,t){if(Fi.show){for(let t in e)Fi[t]=e[t],t in ol&&Ve(Hi,t,e[t]);!1!==t&&Dl("setSelect")}}function Ii(e,t,n){Ai(e,{min:t,max:n})}function ji(e,t,n,r){null!=t.focus&&function(e){if(e!=Yi){let t=null==e,n=1!=tt.alpha;v.forEach((i,r)=>{if(1==l||r>0){let l=t||0==r||r==e;i._focus=t?null:l,n&&function(e,t){v[e].alpha=t,L&&null!=at[e]&&(at[e].style.opacity=t);U&&K[e]&&(K[e].style.opacity=t)}(r,l?1:tt.alpha)}}),Yi=e,n&&yi()}}(e),null!=t.show&&v.forEach((n,i)=>{i>0&&(e==i||null==e)&&(n.show=t.show,function(e){if(v[e].show)U&&Ke(K[e],xe);else if(U&&Ye(K[e],xe),L){let t=lt?at[0]:at[e];null!=t&&Qe(t,-10,-10,re,se)}}(i),2==l?(Ii(n.facets[0].scale,null,null),Ii(n.facets[1].scale,null,null)):Ii(n.scale,null,null),yi())}),!1!==n&&Dl("setSeries",e,t),r&&Fl("setSeries",i,e,t)}let qi,Bi,Yi;i.setSelect=Ui,i.setSeries=ji,i.addBand=function(e,t){e.fill=Ut(e.fill||null),e.dir=bt(e.dir,-1),t=t??x.length,x.splice(t,0,e)},i.setBand=function(e,t){pn(x[e],t)},i.delBand=function(e){null==e?x.length=0:x.splice(e,1)};const Ki={focus:!0};function Vi(e,t,n){let i=y[t];n&&(e=e/qe-(1==i.ori?ae:oe));let l=re;1==i.ori&&(l=se,e=l-e),-1==i.dir&&(e=l-e);let r=i._min,s=r+(i._max-r)*(e/l),o=i.distr;return 3==o?Pt(10,s):4==o?((e,t=1)=>$t.sinh(e)*t)(s,i.asinh):100==o?i.bwd(s):s}function Gi(e,t){Ve(Hi,Ce,Fi.left=e),Ve(Hi,$e,Fi.width=t)}function Zi(e,t){Ve(Hi,Se,Fi.top=e),Ve(Hi,ke,Fi.height=t)}U&&it&&te(We,j,e=>{H._lock||(Je(e),null!=Yi&&ji(null,Ki,!0,Wl.setSeries))}),i.valToIdx=e=>ot(e,t[0]),i.posToIdx=function(e,n){return ot(Vi(e,w,n),t[0],Lt,Yt)},i.posToVal=Vi,i.valToPos=(e,t,n)=>0==y[t].ori?r(e,y[t],n?ge:re,n?pe:0):s(e,y[t],n?me:se,n?fe:0),i.setCursor=(e,t,n)=>{ai=e.left,ci=e.top,tl(null,t,n)};let Ji=0==C.ori?Gi:Zi,Qi=1==C.ori?Gi:Zi;function Xi(e,t){if(null!=e&&(e.idxs?e.idxs.forEach((e,t)=>{R[t]=e}):(e=>void 0===e)(e.idx)||R.fill(e.idx),F.idx=R[0]),U&&F.live){for(let e=0;e<v.length;e++)(e>0||1==l&&!G)&&el(e,R[e]);!function(){if(U&&F.live)for(let e=2==l?1:0;e<v.length;e++){if(0==e&&G)continue;let t=F.values[e],n=0;for(let i in t)V[e][n++].firstChild.nodeValue=t[i]}}()}Re=!1,!1!==t&&Dl("setLegend")}function el(e,n){let l,r=v[e],s=0==e&&2==E?bn:t[e];G?l=r.values(i,e,n)??Z:(l=r.value(i,null==n?null:s[n],e,n),l=null==l?Z:{_:l}),F.values[e]=l}function tl(e,n,r){let s;si=ai,oi=ci,[ai,ci]=H.move(i,ai,ci),H.left=ai,H.top=ci,L&&(In&&Qe(In,Ct(ai),0,re,se),Jn&&Qe(Jn,0,Ct(ci),re,se));let o=Lt>Yt;qi=Nt,Bi=null;let a=0==C.ori?re:se,c=1==C.ori?re:se;if(ai<0||0==Rt||o){s=H.idx=null;for(let e=0;e<v.length;e++){let t=at[e];null!=t&&Qe(t,-10,-10,re,se)}it&&ji(null,Ki,!0,null==e&&Wl.setSeries),F.live&&(R.fill(s),Re=!0)}else{let e,n,r;1==l&&(e=0==C.ori?ai:ci,n=Vi(e,w),s=H.idx=ot(n,t[0],Lt,Yt),r=M(t[0][s],C,a,0));let o=-10,u=-10,h=0,d=0,p=!0,f="",g="";for(let e=2==l?1:0;e<v.length;e++){let m=v[e],_=R[e],b=null==_?null:1==l?t[e][_]:t[e][1][_],x=H.dataIdx(i,e,s,n),w=null==x?null:1==l?t[e][x]:t[e][1][x];if(Re=Re||w!=b||x!=_,R[e]=x,e>0&&m.show){let n=null==x?-10:x==s?r:M(1==l?t[0][x]:t[e][0][x],C,a,0),_=null==w?-10:T(w,1==l?y[m.scale]:y[m.facets[1].scale],c,0);if(it&&null!=w){let t=1==C.ori?ai:ci,n=St(tt.dist(i,e,x,_,t));if(n<qi){let i=tt.bias;if(0!=i){let l=Vi(t,m.scale),r=l>=0?1:-1;r==(w>=0?1:-1)&&(1==r?1==i?w>=l:w<=l:1==i?w<=l:w>=l)&&(qi=n,Bi=e)}else qi=n,Bi=e}}if(Re||lt){let t,l;0==C.ori?(t=n,l=_):(t=_,l=n);let r,s,a,c,m,v,b=!0,y=Xe.bbox;if(null!=y){b=!1;let t=y(i,e);a=t.left,c=t.top,r=t.width,s=t.height}else a=t,c=l,r=s=Xe.size(i,e);if(v=Xe.fill(i,e),m=Xe.stroke(i,e),lt)e==Bi&&qi<=tt.prox&&(o=a,u=c,h=r,d=s,p=b,f=v,g=m);else{let t=at[e];null!=t&&(mt[e]=a,_t[e]=c,nt(t,r,s,b),et(t,v,m),Qe(t,Et(a),Et(c),re,se))}}}}if(lt){let e=tt.prox;if(Re||(null==Yi?qi<=e:qi>e||Bi!=Yi)){let e=at[0];null!=e&&(mt[0]=o,_t[0]=u,nt(e,h,d,p),et(e,f,g),Qe(e,Et(o),Et(u),re,se))}}}if(Fi.show&&Ci)if(null!=e){let[t,n]=Wl.scales,[i,l]=Wl.match,[r,s]=e.cursor.sync.scales,o=e.cursor.drag;if(Wi=o._x,Ni=o._y,Wi||Ni){let o,u,h,d,p,{left:f,top:g,width:m,height:_}=e.select,v=e.scales[r].ori,b=e.posToVal,x=null!=t&&i(t,r),w=null!=n&&l(n,s);x&&Wi?(0==v?(o=f,u=m):(o=g,u=_),h=y[t],d=M(b(o,r),h,a,0),p=M(b(o+u,r),h,a,0),Ji(Mt(d,p),St(p-d))):Ji(0,a),w&&Ni?(1==v?(o=f,u=m):(o=g,u=_),h=y[n],d=T(b(o,s),h,c,0),p=T(b(o+u,s),h,c,0),Qi(Mt(d,p),St(p-d))):Qi(0,c)}else wl()}else{let e=St(si-ti),t=St(oi-ni);if(1==C.ori){let n=e;e=t,t=n}Wi=Di.x&&e>=Di.dist,Ni=Di.y&&t>=Di.dist;let n,i,l=Di.uni;null!=l?Wi&&Ni&&(Wi=e>=l,Ni=t>=l,Wi||Ni||(t>e?Ni=!0:Wi=!0)):Di.x&&Di.y&&(Wi||Ni)&&(Wi=Ni=!0),Wi&&(0==C.ori?(n=ii,i=ai):(n=ri,i=ci),Ji(Mt(n,i),St(i-n)),Ni||Qi(0,c)),Ni&&(1==C.ori?(n=ii,i=ai):(n=ri,i=ci),Qi(Mt(n,i),St(i-n)),Wi||Ji(0,a)),Wi||Ni||(Ji(0,0),Qi(0,0))}if(Di._x=Wi,Di._y=Ni,null==e){if(r){if(null!=Nl){let[e,t]=Wl.scales;Wl.values[0]=null!=e?Vi(0==C.ori?ai:ci,e):null,Wl.values[1]=null!=t?Vi(1==C.ori?ai:ci,t):null}Fl(Pe,i,ai,ci,re,se,s)}if(it){let e=r&&Wl.setSeries,t=tt.prox;null==Yi?qi<=t&&ji(Bi,Ki,!0,e):qi>t?ji(null,Ki,!0,e):Bi!=Yi&&ji(Bi,Ki,!0,e)}}Re&&(F.idx=s,Xi()),!1!==n&&Dl("setCursor")}i.setLegend=Xi;let nl=null;function il(e=!1){e?nl=null:(nl=f.getBoundingClientRect(),Dl("syncRect",nl))}function ll(e,t,n,i,l,r,s){H._lock||Ci&&null!=e&&0==e.movementX&&0==e.movementY||(rl(e,t,n,i,l,r,s,!1,null!=e),null!=e?tl(null,!0,!0):tl(t,!0,!1))}function rl(e,t,n,l,r,s,a,c,u){if(null==nl&&il(!1),Je(e),null!=e)n=e.clientX-nl.left,l=e.clientY-nl.top;else{if(n<0||l<0)return ai=-10,void(ci=-10);let[e,i]=Wl.scales,a=t.cursor.sync,[c,u]=a.values,[h,d]=a.scales,[p,f]=Wl.match,g=t.axes[0].side%2==1,m=0==C.ori?re:se,_=1==C.ori?re:se,v=g?s:r,b=g?r:s,x=g?l:n,w=g?n:l;if(n=null!=h?p(e,h)?o(c,y[e],m,0):-10:m*(x/v),l=null!=d?f(i,d)?o(u,y[i],_,0):-10:_*(w/b),1==C.ori){let e=n;n=l,l=e}}!u||null!=t&&t.cursor.event.type!=Pe||((n<=1||n>=re-1)&&(n=Vt(n,re)),(l<=1||l>=se-1)&&(l=Vt(l,se))),c?(ti=n,ni=l,[ii,ri]=H.move(i,n,l)):(ai=n,ci=l)}Object.defineProperty(i,"rect",{get:()=>(null==nl&&il(!1),nl)});const ol={width:0,height:0,left:0,top:0};function wl(){Ui(ol,!1)}let $l,kl,Sl,Al;function Cl(e,t,n,l,r,s,o){Ci=!0,Wi=Ni=Di._x=Di._y=!1,rl(e,t,n,l,r,s,0,!0,!1),null!=e&&(te(De,Le,El,!1),Fl(ze,i,ii,ri,re,se,null));let{left:a,top:c,width:u,height:h}=Fi;$l=a,kl=c,Sl=u,Al=h}function El(e,t,n,l,r,s,o){Ci=Di._x=Di._y=!1,rl(e,t,n,l,r,s,0,!1,!0);let{left:a,top:c,width:u,height:h}=Fi,d=u>0||h>0,p=$l!=a||kl!=c||Sl!=u||Al!=h;if(d&&p&&Ui(Fi),Di.setScale&&d&&p){let e=a,t=u,n=c,i=h;if(1==C.ori&&(e=c,t=h,n=a,i=u),Wi&&Ii(w,Vi(e,w),Vi(e+t,w)),Ni)for(let e in y){let t=y[e];e!=w&&null==t.from&&t.min!=Nt&&Ii(e,Vi(n+i,e),Vi(n,e))}wl()}else H.lock&&(H._lock=!H._lock,tl(t,!0,null!=e));null!=e&&(ne(De,Le),Fl(De,i,ai,ci,re,se,null))}function Ml(e,t,n,l,r,s,o){H._lock||(Je(e),wn(),wl(),null!=e&&Fl(Ne,i,ai,ci,re,se,null))}function Tl(){b.forEach(xl),Ue(i.width,i.height,!0)}rt(Fe,Ie,Tl);const Pl={};Pl.mousedown=Cl,Pl.mousemove=ll,Pl.mouseup=El,Pl.dblclick=Ml,Pl.setSeries=(e,t,n,l)=>{-1!=(n=(0,Wl.match[2])(i,t,n))&&ji(n,l,!0,!1)},L&&(te(ze,f,Cl),te(Pe,f,ll),te(Oe,f,e=>{Je(e),il(!1)}),te(We,f,function(e,t,n,i,l,r,s){if(H._lock)return;Je(e);let o=Ci;if(Ci){let e,t,n=!0,i=!0,l=10;0==C.ori?(e=Wi,t=Ni):(e=Ni,t=Wi),e&&t&&(n=ai<=l||ai>=re-l,i=ci<=l||ci>=se-l),e&&n&&(ai=ai<ii?0:re),t&&i&&(ci=ci<ri?0:se),tl(null,!0,!0),Ci=!1}ai=-10,ci=-10,R.fill(null),tl(null,!0,!0),o&&(Ci=o)}),te(Ne,f,Ml),sl.add(i),i.syncRect=il);const zl=i.hooks=e.hooks||{};function Dl(e,t,n){_i?vi.push([e,t,n]):e in zl&&zl[e].forEach(e=>{e.call(null,i,t,n)})}(e.plugins||[]).forEach(e=>{for(let t in e.hooks)zl[t]=(zl[t]||[]).concat(e.hooks[t])});const Ol=(e,t,n)=>n,Wl=pn({key:null,setSeries:!1,filters:{pub:qt,sub:qt},scales:[w,v[1]?v[1].scale:null],match:[Bt,Bt,Ol],values:[null,null]},H.sync);2==Wl.match.length&&Wl.match.push(Ol),H.sync=Wl;const Nl=Wl.key,Rl=Oi(Nl);function Fl(e,t,n,i,l,r,s){Wl.filters.pub(e,t,n,i,l,r,s)&&Rl.pub(e,t,n,i,l,r,s)}function Hl(){Dl("init",e,t),xn(t||e.data,!1),P[w]?Ai(w,P[w]):wn(),Me=Fi.show&&(Fi.width>0||Fi.height>0),ye=Re=!0,Ue(e.width,e.height)}return Rl.sub(i),i.pub=function(e,t,n,i,l,r,s){Wl.filters.sub(e,t,n,i,l,r,s)&&Pl[e](null,t,n,i,l,r,s)},i.destroy=function(){Rl.unsub(i),sl.delete(i),ee.clear(),st(Fe,Ie,Tl),c.remove(),j?.remove(),Dl("destroy")},v.forEach(xt),b.forEach(function(e,t){if(e._show=e.show,e.show){let n=e.side%2,l=y[e.scale];null==l&&(e.scale=n?v[1].scale:w,l=y[e.scale]);let r=l.time;e.size=Ut(e.size),e.space=Ut(e.space),e.rotate=Ut(e.rotate),rn(e.incrs)&&e.incrs.forEach(e=>{!Qt.has(e)&&Qt.set(e,Xt(e))}),e.incrs=Ut(e.incrs||(2==l.distr?Tn:r?1==_?jn:Yn:Pn)),e.splits=Ut(e.splits||(r&&1==l.distr?O:3==l.distr?gi:4==l.distr?mi:fi)),e.stroke=Ut(e.stroke),e.grid.stroke=Ut(e.grid.stroke),e.ticks.stroke=Ut(e.ticks.stroke),e.border.stroke=Ut(e.border.stroke);let s=e.values;e.values=rn(s)&&!rn(s[0])?Ut(s):r?rn(s)?Zn(z,Gn(s,D)):on(s)?function(e,t){let n=kn(t);return(t,i,l,r,s)=>i.map(t=>n(e(t)))}(z,s):s||W:s||pi,e.filter=Ut(e.filter||(l.distr>=3&&10==l.log?wi:3==l.distr&&2==l.log?$i:It)),e.font=yl(e.font),e.labelFont=yl(e.labelFont),e._size=e.size(i,null,t,0),e._space=e._rotate=e._incrs=e._found=e._splits=e._values=null,e._size>0&&(wt[t]=!0,e._el=Ze("u-axis",d))}}),n?n instanceof HTMLElement?(n.appendChild(c),Hl()):n(i,Hl):Hl(),i}wl.assign=pn,wl.fmtNum=wt,wl.rangeNum=vt,wl.rangeLog=pt,wl.rangeAsinh=ft,wl.orient=Wi,wl.pxRatio=qe,wl.join=function(e,t){if(function(e){let t=e[0][0],n=t.length;for(let i=1;i<e.length;i++){let l=e[i][0];if(l.length!=n)return!1;if(l!=t)for(let e=0;e<n;e++)if(l[e]!=t[e])return!1}return!0}(e)){let t=e[0].slice();for(let n=1;n<e.length;n++)t.push(...e[n].slice(1));return function(e,t=100){const n=e.length;if(n<=1)return!0;let i=0,l=n-1;for(;i<=l&&null==e[i];)i++;for(;l>=i&&null==e[l];)l--;if(l<=i)return!0;const r=Tt(1,At((l-i+1)/t));for(let t=e[i],n=i+r;n<=l;n+=r){const i=e[n];if(null!=i){if(i<=t)return!1;t=i}}return!0}(t[0])||(t=function(e){let t=e[0],n=t.length,i=Array(n);for(let e=0;e<i.length;e++)i[e]=e;i.sort((e,n)=>t[e]-t[n]);let l=[];for(let t=0;t<e.length;t++){let r=e[t],s=Array(n);for(let e=0;e<n;e++)s[e]=r[i[e]];l.push(s)}return l}(t)),t}let n=new Set;for(let t=0;t<e.length;t++){let i=e[t][0],l=i.length;for(let e=0;e<l;e++)n.add(i[e])}let i=[Array.from(n).sort((e,t)=>e-t)],l=i[0].length,r=new Map;for(let e=0;e<l;e++)r.set(i[0][e],e);for(let n=0;n<e.length;n++){let s=e[n],o=s[0];for(let e=1;e<s.length;e++){let a=s[e],c=Array(l).fill(void 0),u=t?t[n][e]:1,h=[];for(let e=0;e<a.length;e++){let t=a[e],n=r.get(o[e]);null===t?0!=u&&(c[n]=t,2==u&&h.push(n)):c[n]=t}fn(c,h,l),i.push(c)}}return i},wl.fmtDate=kn,wl.tzDate=function(e,t){let n;return"UTC"==t||"Etc/UTC"==t?n=new Date(+e+6e4*e.getTimezoneOffset()):t==Sn?n=e:(n=new Date(e.toLocaleString("en-US",{timeZone:t})),n.setMilliseconds(e.getMilliseconds())),n},wl.sync=Oi;{wl.addGap=function(e,t,n){let i=e[e.length-1];i&&i[0]==t?i[1]=n:e.push([t,n])},wl.clipGaps=Hi;let e=wl.paths={points:Xi};e.linear=il,e.stepped=function(e){const t=bt(e.align,1),n=bt(e.ascDesc,!1),i=bt(e.alignGaps,0),l=bt(e.extend,!1);return(e,r,s,o)=>Wi(e,r,(a,c,u,h,d,p,f,g,m,_,v)=>{[s,o]=ht(u,s,o);let b=a.pxRound,{left:y,width:x}=e.bbox,w=e=>b(p(e,h,_,g)),$=e=>b(f(e,d,v,m)),k=0==h.ori?Bi:Yi;const S={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},A=S.stroke,C=h.dir*(0==h.ori?1:-1);let E=$(u[1==C?s:o]),M=w(c[1==C?s:o]),T=M,P=M;l&&-1==t&&(P=y,k(A,P,E)),k(A,M,E);for(let e=1==C?s:o;e>=s&&e<=o;e+=C){let n=u[e];if(null==n)continue;let i=w(c[e]),l=$(n);1==t?k(A,i,E):k(A,T,l),k(A,i,l),E=l,T=i}let z=T;l&&1==t&&(z=y+x,k(A,z,E));let[D,O]=Ni(e,r);if(null!=a.fill||0!=D){let t=S.fill=new Path2D(A),n=$(a.fillTo(e,r,a.min,a.max,D));k(t,z,n),k(t,P,n)}if(!a.spanGaps){let l=[];l.push(...Ui(c,u,s,o,C,w,i));let d=a.width*qe/2,p=n||1==t?d:-d,f=n||-1==t?-d:d;l.forEach(e=>{e[0]+=p,e[1]+=f}),S.gaps=l=a.gaps(e,r,s,o,l),S.clip=Hi(l,h.ori,g,m,_,v)}return 0!=O&&(S.band=2==O?[Fi(e,r,s,o,A,-1),Fi(e,r,s,o,A,1)]:Fi(e,r,s,o,A,O)),S})},e.bars=function(e){const t=bt((e=e||tn).size,[.6,Nt,1]),n=e.align||0,i=e.gap||0;let l=e.radius;l=null==l?[0,0]:"number"==typeof l?[l,0]:l;const r=Ut(l),s=1-t[0],o=bt(t[1],Nt),a=bt(t[2],1),c=bt(e.disp,tn),u=bt(e.each,e=>{}),{fill:h,stroke:d}=c;return(e,t,l,p)=>Wi(e,t,(f,g,m,_,v,b,y,x,w,$,k)=>{let S,A,C=f.pxRound,E=n,M=i*qe,T=o*qe,P=a*qe;0==_.ori?[S,A]=r(e,t):[A,S]=r(e,t);const z=_.dir*(0==_.ori?1:-1);let D,O,W,N=0==_.ori?Ki:Vi,R=0==_.ori?u:(e,t,n,i,l,r,s)=>{u(e,t,n,l,i,s,r)},F=bt(e.bands,nn).find(e=>e.series[0]==t),H=null!=F?F.dir:0,U=f.fillTo(e,t,f.min,f.max,H),L=C(y(U,v,k,w)),I=$,j=C(f.width*qe),q=!1,B=null,Y=null,K=null,V=null;null==h||0!=j&&null==d||(q=!0,B=h.values(e,t,l,p),Y=new Map,new Set(B).forEach(e=>{null!=e&&Y.set(e,new Path2D)}),j>0&&(K=d.values(e,t,l,p),V=new Map,new Set(K).forEach(e=>{null!=e&&V.set(e,new Path2D)})));let{x0:G,size:Z}=c;if(null!=G&&null!=Z){E=1,g=G.values(e,t,l,p),2==G.unit&&(g=g.map(t=>e.posToVal(x+t*$,_.key,!0)));let n=Z.values(e,t,l,p);O=2==Z.unit?n[0]*$:b(n[0],_,$,x)-b(0,_,$,x),I=ll(g,m,b,_,$,x,I),W=I-O+M}else I=ll(g,m,b,_,$,x,I),W=I*s+M,O=I-W;W<1&&(W=0),j>=O/2&&(j=0),W<5&&(C=Lt);let J=W>0;O=C(Ft(I-W-(J?j:0),P,T)),D=(0==E?O/2:E==z?0:O)-E*z*((0==E?M/2:0)+(J?j/2:0));const Q={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},X=q?null:new Path2D;let ee=null;if(null!=F)ee=e.data[F.series[1]];else{let{y0:n,y1:i}=c;null!=n&&null!=i&&(m=i.values(e,t,l,p),ee=n.values(e,t,l,p))}let te=S*O,ne=A*O;for(let n=1==z?l:p;n>=l&&n<=p;n+=z){let i=m[n];if(null==i)continue;if(null!=ee){let e=ee[n]??0;if(i-e==0)continue;L=y(e,v,k,w)}let l=b(2!=_.distr||null!=c?g[n]:n,_,$,x),r=y(bt(i,U),v,k,w),s=C(l-D),o=C(Tt(r,L)),a=C(Mt(r,L)),u=o-a;if(null!=i){let l=i<0?ne:te,r=i<0?te:ne;q?(j>0&&null!=K[n]&&N(V.get(K[n]),s,a+At(j/2),O,Tt(0,u-j),l,r),null!=B[n]&&N(Y.get(B[n]),s,a+At(j/2),O,Tt(0,u-j),l,r)):N(X,s,a+At(j/2),O,Tt(0,u-j),l,r),R(e,t,n,s-j/2,a,O+j,u)}}return j>0?Q.stroke=q?V:X:q||(Q._fill=0==f.width?f._fill:f._stroke??f._fill,Q.width=0),Q.fill=q?Y:X,Q})},e.spline=function(e){return function(e,t){const n=bt(t?.alignGaps,0);return(t,i,l,r)=>Wi(t,i,(s,o,a,c,u,h,d,p,f,g,m)=>{[l,r]=ht(a,l,r);let _,v,b,y=s.pxRound,x=e=>y(h(e,c,g,p)),w=e=>y(d(e,u,m,f));0==c.ori?(_=ji,b=Bi,v=Ji):(_=qi,b=Yi,v=Qi);const $=c.dir*(0==c.ori?1:-1);let k=x(o[1==$?l:r]),S=k,A=[],C=[];for(let e=1==$?l:r;e>=l&&e<=r;e+=$)if(null!=a[e]){let t=x(o[e]);A.push(S=t),C.push(w(a[e]))}const E={stroke:e(A,C,_,b,v,y),fill:null,clip:null,band:null,gaps:null,flags:1},M=E.stroke;let[T,P]=Ni(t,i);if(null!=s.fill||0!=T){let e=E.fill=new Path2D(M),n=w(s.fillTo(t,i,s.min,s.max,T));b(e,S,n),b(e,k,n)}if(!s.spanGaps){let e=[];e.push(...Ui(o,a,l,r,$,x,n)),E.gaps=e=s.gaps(t,i,l,r,e),E.clip=Hi(e,c.ori,p,f,g,m)}return 0!=P&&(E.band=2==P?[Fi(t,i,l,r,M,-1),Fi(t,i,l,r,M,1)]:Fi(t,i,l,r,M,P)),E})}(rl,e)}}function $l(e,t){return e?{show:!1}:{show:!0,size:4,width:0,stroke:t,fill:t}}const kl=["#2196f3","#ff9800","#4caf50","#e91e63","#9c27b0","#00bcd4","#ffc107","#795548","#607d8b","#8bc34a"];function Sl(e,t){return t??kl[e%kl.length]}let Al=class extends ue{constructor(){super(...arguments),this.series=[],this.config={},this._builtFor=""}static{this.styles=[s('.uplot,.uplot *,.uplot :after,.uplot :before{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5;width:min-content}.u-title{font-size:18px;font-weight:700;text-align:center}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;height:100%;position:relative;width:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{display:inline-block;vertical-align:middle}.u-legend .u-marker{background-clip:padding-box!important;height:1em;margin-right:4px;width:1em}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:rgba(0,0,0,.07)}.u-cursor-x,.u-cursor-y,.u-select{pointer-events:none;position:absolute}.u-cursor-x,.u-cursor-y{left:0;top:0;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{background-clip:padding-box!important;border:0 solid;border-radius:50%;left:0;pointer-events:none;position:absolute;top:0;will-change:transform}.u-axis.u-off,.u-cursor-pt.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-select.u-off{display:none}'),o`
      :host {
        display: block;
        /* Keep vertical scroll and pinch-zoom native over the plot. */
        touch-action: pan-y pinch-zoom;
      }

      .holder {
        position: relative;
        width: 100%;
      }

      /* uPlot sets width:min-content on .uplot, which would collapse the
         holder; the explicit pixel width it is given is authoritative.
         (No backticks in here -- they would close the Lit css template.) */
      .uplot {
        width: 100% !important;
      }

      .readout {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 14px;
        min-height: 18px;
        padding: 2px 4px 6px;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }

      .readout .swatch {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 2px;
        margin-right: 5px;
        vertical-align: baseline;
      }

      .empty {
        padding: 24px 8px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
    `]}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0,this._plot?.destroy(),this._plot=void 0,this._builtFor=""}firstUpdated(){const e=this._holder();e&&(this._observer=new ResizeObserver(()=>this._sync()),this._observer.observe(e),this._sync())}updated(e){this._sync()}_holder(){return this.renderRoot.querySelector(".holder")}_shape(){return JSON.stringify([this.series.map((e,t)=>[e.label,Sl(t,e.color),!0===e.line,e.width??0,e.axis??"left"]),!0===this.config.timeAxis,!0===this.config.yFromZero])}_hasRightAxis(){return this.series.some(e=>"right"===e.axis)}_sync(){const e=this._holder();if(!e||0===this.series.length)return;const t=Math.floor(e.clientWidth);if(t<1)return;const n=this.config.height??220,{xs:i,ys:l}=function(e){const t=e.map(e=>{const t=new Map;for(const[n,i]of e.points)Number.isFinite(n)&&Number.isFinite(i)&&t.set(n,i);return t}),n=new Set;for(const e of t)for(const t of e.keys())n.add(t);const i=[...n].sort((e,t)=>e-t),l=t.map(e=>i.map(t=>e.has(t)?e.get(t):null));return{xs:i,ys:l}}(this.series),r=[i,...l];if(this._plot&&this._builtFor===this._shape())return this._plot.setSize({width:t,height:n}),void this._plot.setData(r);this._plot?.destroy(),this._plot=new wl(this._options(t,n),r,e),this._builtFor=this._shape()}_themeColor(e,t){return getComputedStyle(this).getPropertyValue(e).trim()||t}_options(e,t){const n=this._themeColor("--divider-color","rgba(127,127,127,0.3)"),i=this._themeColor("--secondary-text-color","#888"),l=this.config;return{width:e,height:t,...l.timeAxis?{}:{mode:1},tzDate:void 0,legend:{show:!1},cursor:{drag:{x:!1,y:!1,setScale:!1},points:{size:6}},scales:{x:{time:!0===l.timeAxis},y:{range:l.yFromZero?(e,t,n)=>[0,n]:void 0},...this._hasRightAxis()?{y2:{}}:{}},axes:[{stroke:i,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:l.xLabel,labelFont:"11px system-ui, sans-serif",labelSize:l.xLabel?18:0},{stroke:i,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:l.yLabel,labelFont:"11px system-ui, sans-serif",labelSize:l.yLabel?18:0,size:48},...this._hasRightAxis()?[{scale:"y2",side:1,stroke:i,grid:{show:!1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:l.y2Label,labelFont:"11px system-ui, sans-serif",labelSize:l.y2Label?18:0,size:48}]:[]],series:[{},...this.series.map((e,t)=>{const n=Sl(t,e.color);return{label:e.label,stroke:n,width:e.width??2,..."right"===e.axis?{scale:"y2"}:{},...e.line?{}:{paths:()=>null},points:$l(!0===e.line,n)}})],hooks:{setCursor:[e=>this._updateReadout(e)]}}}_updateReadout(e){const t=this.renderRoot.querySelector(".readout");if(!t)return;const n=e.cursor.idx;if(null==n)return void(t.textContent="");const i=this.config,l=e.data[0][n],r=document.createElement("span");r.textContent=i.xFormat&&"number"==typeof l?i.xFormat(l):String(l??""),t.replaceChildren(r),this.series.forEach((l,r)=>{const s=e.data[r+1]?.[n];if(null==s)return;const o=document.createElement("span"),a=document.createElement("span");a.className="swatch",a.style.background=Sl(r,l.color),o.append(a);const c="right"===l.axis?i.y2Format??i.yFormat:i.yFormat,u=c?c(Number(s)):String(s);o.append(document.createTextNode(`${l.label} ${u}`)),t.append(o)})}render(){return 0===this.series.length||this.series.every(e=>0===e.points.length)?B`<div class="empty">No data in this range.</div>`:B`
      <div class="holder"></div>
      <div class="readout"></div>
    `}};function Cl(e){if(null==e||""===e)return null;const t="number"==typeof e?e:Number(e);return Number.isFinite(t)?t:null}function El(e,t,n=""){const i=Cl(e);return null===i?"—":`${i.toFixed(t)}${n}`}function Ml(e){const t=Cl(e);if(null===t)return"—";const n=Math.abs(Math.round(t)),i=Math.floor(n/86400),l=Math.floor(n%86400/3600),r=Math.floor(n%3600/60);return i>0?`${i}d ${l}h`:l>0?`${l}h ${r}m`:`${r}m`}function Tl(e){const t=Cl(e);return null===t?"—":`${Math.round(100*t)}%`}function Pl(e){const t=Cl(e);return null===t?"—":`${t}%`}function zl(e,t){if(!e)return"—";const n=String(e),i=n.includes("T")?n:n.replace(" ","T"),l=new Date(i.endsWith("Z")?i:`${i}Z`);return Number.isNaN(l.getTime())?n:l.toLocaleString(t||void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}function Dl(e,t,n){const i=Cl(e);if(null===i)return n;let l=n;for(const[e,n]of t)i>=e&&(l=n);return l}function Ol(e,t){const n=[];for(const i of e){const e=Cl(i[t]);null!==e&&n.push(e)}return n}function Wl(e,t){return Ol(e,t).reduce((e,t)=>e+t,0)}function Nl(e){const{label:t,value:n,max:i,text:l,color:r,markers:s=[]}=e,o=null!==n&&i>0?Math.max(0,Math.min(100,n/i*100)):0;return B`
    <div class="bar-row">
      <div class="bar-head">
        <span class="bar-label">${t}</span>
        <span class="bar-value">${l}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style=${`width:${o}%;background:${r??"var(--primary-color)"}`}></div>
        ${s.filter(e=>i>0&&e.at>=0&&e.at<=i).map(e=>B`
              <div
                class="bar-marker"
                style=${`left:${e.at/i*100}%`}
                title=${e.label??String(e.at)}
              ></div>
            `)}
      </div>
    </div>
  `}function Rl(e,t){const n=e.filter(e=>Number.isFinite(e.value)&&e.value>0),i=n.reduce((e,t)=>e+t.value,0);return i<=0?null:B`
    <div class="split">
      <div class="split-track">
        ${n.map(e=>B`
            <div
              class="split-seg"
              style=${`width:${e.value/i*100}%;background:${e.color}`}
              title=${`${e.label}: ${e.value.toFixed(1)} ${t}`}
            ></div>
          `)}
      </div>
      <div class="split-legend">
        ${n.map(e=>B`
            <span class="split-item">
              <span class="swatch" style=${`background:${e.color}`}></span>
              ${e.label} ${e.value.toFixed(0)} ${t}
              <span class="split-pct">${Math.round(e.value/i*100)}%</span>
            </span>
          `)}
      </div>
    </div>
  `}function Fl(e,t){return B`
    <div class="scroller">
      <table>
        <thead>
          <tr>
            ${e.map(e=>B`<th class="${e.align??"right"} ${e.optional?"optional":""}">${e.label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${t.map(t=>B`
              <tr>
                ${e.map(e=>{const n=e.color?.(t),i=e.title?.(t);return B`<td
                    class="${e.align??"right"} ${e.optional?"optional":""}"
                    style=${n?`color: ${n}`:V}
                    title=${i??V}
                  >
                    ${e.render(t)}
                  </td>`})}
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `}function Hl(e){return B`
    <div class="summary">
      ${e.map(e=>B`
          <div class="stat">
            <div class="stat-value">${e.value}</div>
            <div class="stat-label">${e.label}</div>
          </div>
        `)}
    </div>
  `}e([ge({attribute:!1})],Al.prototype,"series",void 0),e([ge({attribute:!1})],Al.prototype,"config",void 0),Al=e([de("teslamate-chart")],Al);const Ul=[[0,"var(--error-color)"],[80,"var(--warning-color)"],[90,"var(--success-color)"]];let Ll=class extends be{queryId(){return"battery_health"}secondaryQueryIds(){return["battery_capacity_history"]}queryOptions(){const e={};return void 0!==this._config.custom_kwh_new&&(e.custom_kwh_new=this._config.custom_kwh_new),void 0!==this._config.custom_max_range&&(e.custom_max_range=this._config.custom_max_range),{...this._config,vars:e}}defaultTitle(){return"Battery Health"}_summary(e){const t=this._config.length_unit??"km",n=Cl(e.current_capacity),i=Cl(e.max_capacity);return Hl([{label:"Usable now (kWh)",value:El(n,1)},{label:"When new (kWh)",value:El(i,1)},{label:`Range (${t})`,value:El(e.current_range,0)},{label:`Wh/${t}`,value:El(e.efficiency,0)}])}_panels(e){const t=this._config.length_unit??"km",n=Cl(e.health_pct),i=Cl(e.degradation_pct),l=Cl(e.current_capacity),r=Cl(e.current_soc),s=Cl(e.stored_energy),o=Cl(e.soc_lower),a=Cl(e.soc_upper),c=Cl(e.max_capacity),u=Cl(e.max_range),h=Dl(n,Ul,"var(--primary-color)");return B`
      <div class="panels">
        ${function(e){const{label:t,value:n,text:i,color:l}=e,r=null===n?0:Math.max(0,Math.min(100,n)),s="M 10 52 A 42 42 0 0 1 94 52";return B`
    <div class="gauge">
      <svg viewBox="0 0 104 64" class="gauge-svg" role="img" aria-label=${`${t}: ${i}`}>
        ${Y`
          <path d=${s} class="gauge-track" pathLength="100" />
          <path d=${s} pathLength="100" stroke=${l} class="gauge-fill"
                stroke-dasharray=${`${r} 100`} />
        `}
      </svg>
      <div class="gauge-value" style=${`color:${l}`}>${i}</div>
      <div class="gauge-label">${t}</div>
    </div>
  `}({label:null===i?"Battery health":`${i.toFixed(1)}% degradation`,value:n,text:null===n?"—":`${n.toFixed(1)}%`,color:h})}
        <div class="bars">
          ${Nl({label:"Charge level",value:r,max:100,text:null===r?"—":`${r}%`,color:"var(--primary-color)",markers:[...null===o?[]:[{at:o,label:`${o}% daily minimum`}],...null===a?[]:[{at:a,label:`${a}% recommended limit`}]]})}
          ${Nl({label:"Stored energy",value:s,max:l??100,text:`${El(s,1)} / ${El(l,1)} kWh`,color:"var(--success-color)"})}
          ${Nl({label:"Range against best recorded",value:Cl(e.current_range),max:u??100,text:`${El(e.current_range,0)} / ${El(u,0)} ${t}`,color:"var(--info-color, #3d71d7)"})}
        </div>
      </div>
      ${Rl([{label:"Remaining",value:null!==l&&null!==c?l:0,color:"var(--success-color)"},{label:"Lost to degradation",value:null!==l&&null!==c?Math.max(0,c-l):0,color:"var(--error-color)"}],"kWh")}
    `}_capacitySeries(){const e=ye(this._extra.battery_capacity_history??[],e=>String(e.series),e=>Number(e.odometer),e=>Number(e.kwh)),t=[],n=e.get("sample");n?.length&&t.push({label:"Per charge",points:n,color:"#90a4ae"});const i=e.get("median");return i?.length&&t.push({label:"Median",points:i,color:"#2196f3",line:!0,width:2}),t}_chart(){const e=this._capacitySeries();if(0===e.length)return null;const t=this._config.length_unit??"km";return B`
      <div class="subheader">Usable capacity by odometer</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${e}
          .config=${{height:this._config.chart_height??240,xLabel:`Odometer (${t})`,yLabel:"kWh",xFormat:e=>`${Math.round(e).toLocaleString()} ${t}`,yFormat:e=>`${e.toFixed(1)} kWh`}}
        ></teslamate-chart>
      </div>
    `}renderContent(){const e=this._rows[0];return e?B`
      <ha-card>
        ${this.renderHeader(`${El(e.rated_efficiency,1)} Wh/km rated`)} ${this._summary(e)}
        ${this._panels(e)} ${this._chart()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging history to derive battery health from.</div>
        </ha-card>
      `}};Ll=e([de("teslamate-battery-health-card")],Ll);const Il={AC:"var(--success-color)",DC:"var(--warning-color)"};let jl=class extends be{queryId(){return"charges"}secondaryQueryIds(){return["incomplete_charges"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration_min=this._config.min_duration_minutes),{...this._config,days:this._config.days??90,charge_type:this._config.charge_type??"",vars:e}}defaultTitle(){return"Charges"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",n=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>zl(e.start_date,this._hass?.locale?.language)},{label:"Location",align:"left",render:e=>e.address??"—"},{label:"Type",align:"center",render:e=>e.charge_type??"—",color:e=>Il[String(e.charge_type)]},{label:"Duration",render:e=>El(e.duration_min,0," min")},{label:"SoC",render:e=>`${Pl(e.start_battery_level)} → ${Pl(e.end_battery_level)}`},{label:"Added",render:e=>El(e.charge_energy_added,1," kWh")},{label:"Range",render:t=>El(t[this.unitKey("range_added")],0,` ${e}`)},{label:"Ø Power",render:e=>El(e.charge_energy_added_per_hour,1," kW")},{label:"Ø Rate",render:e=>El(e[this.unitKey("range_added_per_hour")],0,` ${t}`),optional:!0},{label:"Cost",render:e=>null===e.cost?"free":El(e.cost,2)},{label:"Cost/kWh",render:e=>null===e.cost_per_kwh?"—":El(e.cost_per_kwh,3),optional:!0},{label:"Used",render:e=>El(e.charge_energy_used,1," kWh"),optional:!0},{label:"Efficiency",render:e=>Tl(e.charging_efficiency),optional:!0},{label:"Temp",render:e=>El(e[this.tempKey("outside_temp_avg")],0,`°${n}`),optional:!0}]}_summary(){const e=Wl(this._rows,"charge_energy_added"),t=Wl(this._rows,"charge_energy_used"),n=Wl(this._rows,"cost"),i=function(e,t){const n=Ol(e,t);return 0===n.length?0:n.reduce((e,t)=>e+t,0)/n.length}(this._rows,"duration_min"),l=this._rows.filter(e=>Number(e.cost)>0).length;return Hl([{label:"Energy added (kWh)",value:e.toFixed(0)},{label:"Energy used (kWh)",value:t.toFixed(0)},{label:0===l?"Cost (all free)":"Cost",value:n.toFixed(2)},{label:"Ø Duration",value:`${Math.round(i)} min`}])}_renderIncomplete(){const e=this._extra.incomplete_charges??[];if(0===e.length)return null;const t=[{label:"Started",align:"left",render:e=>zl(e.start_date,this._hass?.locale?.language)},{label:"Added",render:e=>El(e.charge_energy_added,1," kWh")},{label:"Duration",render:e=>El(e.duration_min,0," min")}];return B`
      <div class="subheader" title="Charging processes with no recorded end — usually a logging gap">
        Incomplete charges (${e.length})
      </div>
      ${Fl(t,e)}
    `}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charges in the last ${this._config.days??90} days.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows);return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} charges`)} ${this._summary()}
        ${Fl(this._columns(),e)} ${this.renderPager(t,n)} ${this._renderIncomplete()}
      </ha-card>
    `}};jl=e([de("teslamate-charges-card")],jl);let ql=class extends be{queryId(){return"charging_totals"}secondaryQueryIds(){return["charging_cost_per_distance","charge_delta","dc_charging_curve","top_stations_energy","top_stations_cost"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration=this._config.min_duration_minutes),{...this._config,days:this._config.days??90,geofence_ids:this._config.geofence_ids??null,vars:e}}defaultTitle(){return"Charging Stats"}_currency(e,t=2){const n=Cl(e);if(null===n)return"—";return`${this._config.currency??""}${n.toFixed(t)}`}_summary(e){const t=this._config.length_unit??"km",n=Cl(this._extra.charging_cost_per_distance?.[0]?.cost_mileage),i=Cl(e.paid_count)??0,l=Cl(e.charge_count)??0;return Hl([{label:"Charges",value:l.toFixed(0)},{label:"Energy added (kWh)",value:El(e.energy_added,0)},{label:0===i?"Cost (all free)":`Cost (${i} of ${l} paid)`,value:this._currency(e.total_cost)},{label:`Cost per 100 ${t}`,value:null===n?"—":this._currency(n)}])}_rates(e){const t=Cl(e.cost_per_kwh),n=Cl(e.cost_per_kwh_ac),i=Cl(e.cost_per_kwh_dc),l=Cl(e.charging_efficiency),r=Cl(e.suc_cost);return Hl([{label:"Ø Cost/kWh",value:null===t?"—":this._currency(t,3)},{label:"AC",value:null===n?"—":this._currency(n,3)},{label:"DC",value:null===i?"—":this._currency(i,3)},{label:0===r?"Supercharging (free)":"Supercharging",value:this._currency(r)},{label:"Charging efficiency",value:null===l?"—":`${(100*l).toFixed(1)}%`}])}_acdc(e){const t=Rl([{label:"AC",value:Cl(e.energy_ac)??0,color:"var(--success-color)"},{label:"DC",value:Cl(e.energy_dc)??0,color:"var(--warning-color)"}],"kWh");return t?B`<div class="subheader">Energy used by charger type</div>
      ${t}`:null}_deltaChart(){const e=this._extra.charge_delta??[];if(0===e.length)return null;const t=e=>{const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`).getTime()/1e3},n=[],i=[];for(const l of e){const e=t(l.time),r=Cl(l.start_soc),s=Cl(l.end_soc);Number.isFinite(e)&&(null!==r&&n.push([e,r]),null!==s&&i.push([e,s]))}if(0===n.length&&0===i.length)return null;return B`
      <div class="subheader">Charge delta</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Start SOC",points:n,color:"#ff9800",line:!0},{label:"End SOC",points:i,color:"#4caf50",line:!0}]}
          .config=${{height:this._config.chart_height??200,timeAxis:!0,yLabel:"SOC %",yFormat:e=>`${Math.round(e)}%`,xFormat:e=>new Date(1e3*e).toLocaleDateString(this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_curveChart(){const e=this._extra.dc_charging_curve??[];if(0===e.length)return null;const t=ye(e,e=>"median"===e.series?"__median":String(e.label??e.session_id??"session"),e=>Number(e.soc),e=>Number(e.power)),n=t.get("__median");t.delete("__median");const i=this._config.max_curve_sessions??6,l=[...t.entries()].slice(-i),r=l.map(([e,t])=>({label:e,points:t,line:!0,width:1}));if(n?.length&&r.push({label:"Median",points:n,color:"var(--primary-text-color)",line:!0,width:3}),0===r.length)return null;const s=t.size-l.length;return B`
      <div class="subheader">
        DC charging curve${s>0?B` <span class="hint">(newest ${l.length} of ${t.size})</span>`:null}
      </div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${r}
          .config=${{height:this._config.chart_height??220,xLabel:"SOC %",yLabel:"kW",yFromZero:!0,xFormat:e=>`${Math.round(e)}% SOC`,yFormat:e=>`${Math.round(e)} kW`}}
        ></teslamate-chart>
      </div>
    `}_stations(){const e=this._extra.top_stations_energy??[],t=this._extra.top_stations_cost??[];if(0===e.length&&0===t.length)return null;const n=[{label:"Location",align:"left",render:e=>e.location??"—"},{label:"Energy",render:e=>El(e.charge_energy_added,1," kWh")}],i=[{label:"Location",align:"left",render:e=>e.location??"—"},{label:"Cost",render:e=>this._currency(e.cost)}];return B`
      ${e.length?B`<div class="subheader">Top locations by energy</div>
            ${Fl(n,e)}`:null}
      ${t.length?B`<div class="subheader">Top locations by cost</div>
            ${Fl(i,t)}`:null}
    `}renderContent(){const e=this._rows[0],t=Cl(e?.charge_count)??0;return e&&0!==t?B`
      <ha-card>
        ${this.renderHeader(`last ${this._config.days??90} days`)} ${this._summary(e)}
        ${this._rates(e)} ${this._acdc(e)} ${this._deltaChart()} ${this._curveChart()} ${this._stations()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging sessions in the last ${this._config.days??90} days.</div>
        </ha-card>
      `}};ql=e([de("teslamate-charging-stats-card")],ql);let Bl=class extends be{queryId(){return"drives"}secondaryQueryIds(){return["incomplete_drives"]}queryOptions(){const e={};return void 0!==this._config.min_distance&&(e.min_dist=this._config.min_distance),void 0!==this._config.min_speed&&(e.min_speed=this._config.min_speed),this._config.efficiency_mode&&(e.efficiency=this._config.efficiency_mode),{...this._config,days:this._config.days??90,vars:e}}defaultTitle(){return"Drives"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",n=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>zl(e.start_date,this._hass?.locale?.language)},{label:"Start",align:"left",render:e=>e.start_address??"—"},{label:"Destination",align:"left",render:e=>e.end_address??"—"},{label:"Duration",render:e=>El(e.duration_min,0," min")},{label:"Distance",render:t=>El(t[this.unitKey("distance")],1,` ${e}`)},{label:"SoC",render:e=>`${Pl(e["% Start"])} → ${Pl(e["% End"])}`,optional:!0},{label:"",align:"center",render:e=>e.has_reduced_range?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>e.has_reduced_range?"Reduced range: part of the pack was unavailable":void 0},{label:"Energy",render:e=>El(e.consumption_kWh,1," kWh")},{label:`Ø Wh/${e}`,render:t=>El(t[`consumption_kwh_${e}`],0)},{label:"Ø Speed",render:e=>El(e[this.unitKey("speed_avg")],0,` ${t}`),optional:!0},{label:"Max Speed",render:e=>El(e[this.unitKey("speed_max")],0,` ${t}`),optional:!0},{label:"Max Power",render:e=>El(e.power_max,0," kW"),optional:!0},{label:"Temp",render:e=>El(e[this.tempKey("outside_temp")],0,`°${n}`),optional:!0}]}_summary(){const e=this._config.length_unit??"km",t=Wl(this._rows,this.unitKey("distance")),n=Wl(this._rows,"consumption_kWh"),i=Wl(this._rows,"duration_min"),l=t>0?n/t*1e3:0;return Hl([{label:`Distance (${e})`,value:t.toFixed(0)},{label:"Duration",value:`${Math.floor(i/60)}h ${Math.round(i%60)}m`},{label:"Energy (kWh)",value:n.toFixed(1)},{label:`Ø Wh/${e}`,value:l.toFixed(0)}])}_renderIncomplete(){const e=this._extra.incomplete_drives??[];if(0===e.length)return null;const t=[{label:"Drive",align:"left",render:e=>e["Drive ID"]??"—"},{label:"Started",align:"left",render:e=>zl(e.start_date,this._hass?.locale?.language)},{label:"Distance",render:e=>El(e.distance,1)},{label:"Duration",render:e=>El(e.duration_min,0," min")}];return B`
      <div class="subheader" title="Drives TeslaMate never saw the end of — usually a logging gap">
        Incomplete drives (${e.length})
      </div>
      ${Fl(t,e)}
    `}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No drives in the last ${this._config.days??90} days.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows);return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} drives`)} ${this._summary()}
        ${Fl(this._columns(),e)} ${this.renderPager(t,n)} ${this._renderIncomplete()}
      </ha-card>
    `}};Bl=e([de("teslamate-drives-card")],Bl);const Yl="var(--success-color)",Kl="var(--warning-color)";let Vl=class extends be{queryId(){return"trip_summary"}secondaryQueryIds(){return["trip_energy","trip_battery","trip_elevation","drives","charges"]}queryOptions(){return{...this._config,days:this._config.days??3,vars:{}}}defaultTitle(){return"Trip"}pageSize(){return this._config.page_size??10}_currency(e,t=2){const n=Cl(e);return null===n?"—":`${this._config.currency??""}${n.toFixed(t)}`}_summary(e){const t=this._config.length_unit??"km",n=this._extra.trip_energy?.[0]??{},i="mi"===t?"mph":"km/h";return B`
      ${Hl([{label:`Distance (${t})`,value:El(e.distance,0)},{label:"Driving time",value:Ml(e.driving_seconds)},{label:`Ø Speed (${i})`,value:El(e.avg_speed_driving,0)},{label:"Energy used (kWh)",value:El(n.energy_consumed,0)}])}
      ${Hl([{label:`Wh/${t}`,value:El(n.consumption,0)},{label:`Ø incl. charging (${i})`,value:El(e.avg_speed_with_charging,0)},{label:0===(Cl(e.paid_count)??0)?"Cost (all free)":"Cost",value:this._currency(e.total_cost)},{label:`Cost per 100 ${t}`,value:this._currency(n.cost_per_distance)}])}
    `}_timeSpent(e){const t=Rl([{label:"Driving",value:(Cl(e.driving_seconds)??0)/3600,color:"#2196f3"},{label:"Charging AC",value:(Cl(e.charging_ac_seconds)??0)/3600,color:Yl},{label:"Charging DC",value:(Cl(e.charging_dc_seconds)??0)/3600,color:Kl}],"h");return t?B`<div class="subheader">Time spent</div>
      ${t}`:null}_energyAdded(e){const t=Rl([{label:"AC",value:Cl(e.energy_added_ac)??0,color:Yl},{label:"DC",value:Cl(e.energy_added_dc)??0,color:Kl}],"kWh");return t?B`<div class="subheader">Energy added</div>
      ${t}`:null}_epoch(e){const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`).getTime()/1e3}_batteryChart(){const e=this._extra.trip_battery??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=[],i=[];for(const t of e){const e=this._epoch(t.time);if(!Number.isFinite(e))continue;const l=Cl(t.battery_level),r=Cl(t.range);null!==l&&n.push([e,l]),null!==r&&i.push([e,r])}if(0===n.length&&0===i.length)return null;return B`
      <div class="subheader">Battery level &amp; range</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Battery",points:n,color:"#4caf50",line:!0},{label:"Range",points:i,color:"#2196f3",line:!0,axis:"right"}]}
          .config=${{height:this._config.chart_height??200,timeAxis:!0,yLabel:"%",y2Label:t,yFormat:e=>`${Math.round(e)}%`,y2Format:e=>`${Math.round(e)} ${t}`,xFormat:e=>zl(new Date(1e3*e).toISOString(),this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_elevationChart(){const e=this._extra.trip_elevation??[],t=[];for(const n of e){const e=this._epoch(n.time),i=Cl(n.elevation);Number.isFinite(e)&&null!==i&&t.push([e,i])}if(0===t.length)return null;const n="mi"===(this._config.length_unit??"km")?"ft":"m";return B`
      <div class="subheader">Elevation</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Elevation",points:t,color:"#795548",line:!0}]}
          .config=${{height:this._config.chart_height??160,timeAxis:!0,yLabel:n,yFormat:e=>`${Math.round(e).toLocaleString()} ${n}`,xFormat:e=>zl(new Date(1e3*e).toISOString(),this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_drives(){const e=this._extra.drives??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=this._hass?.locale?.language,i=[{label:"Start",align:"left",render:e=>zl(e.start_date,n)},{label:"From",align:"left",render:e=>e.start_address??"—"},{label:"To",align:"left",render:e=>e.end_address??"—"},{label:"Duration",render:e=>El(e.duration_min,0," min")},{label:"Distance",render:e=>El(e[this.unitKey("distance")],1,` ${t}`)},{label:"SoC",render:e=>`${El(e.start_battery_level,0)}% → ${El(e.end_battery_level,0)}%`},{label:`Wh/${t}`,render:e=>El(e[this.unitKey("consumption_kwh")],0),optional:!0}],{visible:l,page:r,pages:s}=this.paginate(e);return B`
      <div class="subheader">Drives (${e.length})</div>
      ${Fl(i,l)} ${this.renderPager(r,s)}
    `}_charges(){const e=this._extra.charges??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=this._hass?.locale?.language,i=[{label:"Start",align:"left",render:e=>zl(e.start_date,n)},{label:"Location",align:"left",render:e=>e.address??"—"},{label:"Duration",render:e=>El(e.duration_min,0," min")},{label:"Added",render:e=>El(e.charge_energy_added,1," kWh")},{label:"Range",render:e=>El(e[this.unitKey("range_added")],0,` ${t}`)},{label:"SoC",render:e=>`${El(e.start_battery_level,0)}% → ${El(e.end_battery_level,0)}%`},{label:"Cost",render:e=>null===e.cost?"free":this._currency(e.cost)}];return B`
      <div class="subheader">Charges (${e.length})</div>
      ${Fl(i,e.slice(0,this.pageSize()))}
    `}renderContent(){const e=this._rows[0],t=Cl(e?.distance);return e&&null!==t&&0!==t?B`
      <ha-card>
        ${this.renderHeader(`last ${this._config.days??3} days`)} ${this._summary(e)}
        ${this._timeSpent(e)} ${this._energyAdded(e)} ${this._batteryChart()} ${this._elevationChart()}
        ${this._drives()} ${this._charges()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No travel recorded in the last ${this._config.days??3} days.</div>
        </ha-card>
      `}};Vl=e([de("teslamate-trip-card")],Vl);const Gl=[[0,"#FF7383"],[.3,"#FFB357"],[.85,"#56A64B"]],Zl=[[0,"rgb(133, 142, 133)"],[43200,"#56A64B"]];let Jl=class extends be{queryId(){return"vampire_drain"}queryOptions(){return{...this._config,days:this._config.days??90,vars:{duration:this._config.min_duration_hours??6}}}defaultTitle(){return"Vampire Drain"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t=this._hass?.locale?.language;return[{label:"Start",align:"left",render:e=>zl(e.start_date,t)},{label:"End",align:"left",render:e=>zl(e.end_date,t)},{label:"Period",render:e=>Ml(e.duration),color:e=>Dl(e.duration,Zl,"inherit")},{label:"Standby",render:e=>Tl(e.standby),color:e=>Dl(e.standby,Gl,"inherit")},{label:"SoC",render:e=>Pl(e.soc_diff),optional:!0},{label:"",align:"center",render:e=>1===Cl(e.has_reduced_range)?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>1===Cl(e.has_reduced_range)?"Reduced range: part of the pack was unavailable, so range loss cannot be estimated":void 0},{label:"Range loss",render:t=>El(t[this.unitKey("range_diff")],2,` ${e}`)},{label:"Energy",render:e=>El(e.consumption,2," kWh"),optional:!0},{label:"Ø Power",render:e=>El(e.avg_power,0," W"),optional:!0},{label:"Ø Loss / h",render:t=>El(t[this.unitKey("range_lost_per_hour")],2,` ${e}`)}]}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">
            No standby periods longer than ${this._config.min_duration_hours??6} h in the last
            ${this._config.days??90} days.
          </div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows),i=Wl(this._rows,"consumption");return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} periods · ${i.toFixed(1)} kWh drained`)}
        ${Fl(this._columns(),e)} ${this.renderPager(t,n)}
      </ha-card>
    `}};Jl=e([de("teslamate-vampire-drain-card")],Jl);const Ql=new URL(import.meta.url).searchParams.get("v")??"dev",Xl="https://github.com/johnbr/ha-teslamate-cards";window.customCards=window.customCards??[],window.customCards.push({type:"teslamate-drives-card",name:"TeslaMate Drives",description:"Every drive: route, distance, duration and energy.",preview:!1,documentationURL:Xl},{type:"teslamate-charges-card",name:"TeslaMate Charges",description:"Every charging session: energy, range gained, rate and cost.",preview:!1,documentationURL:Xl},{type:"teslamate-vampire-drain-card",name:"TeslaMate Vampire Drain",description:"Standby battery losses between drives and charges.",preview:!1,documentationURL:Xl},{type:"teslamate-battery-health-card",name:"TeslaMate Battery Health",description:"Usable capacity, degradation and range, with capacity by odometer.",preview:!1,documentationURL:Xl},{type:"teslamate-charging-stats-card",name:"TeslaMate Charging Stats",description:"Charging totals, cost per kWh, AC/DC split and the DC charging curve.",preview:!1,documentationURL:Xl},{type:"teslamate-trip-card",name:"TeslaMate Trip",description:"A past journey: distance, time split, energy, cost, battery and elevation.",preview:!1,documentationURL:Xl}),console.info(`%c TESLAMATE-CARDS %c ${Ql} `,"color:#fff;background:#2b3038;font-weight:700","color:#2b3038;background:#ff9d4d;font-weight:700");
