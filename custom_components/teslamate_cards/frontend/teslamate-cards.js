function e(e,t,n,l){var i,r=arguments.length,s=r<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,n):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,l);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(s=(r<3?i(s):r>3?i(t,n,s):i(t,n))||s);return r>3&&s&&Object.defineProperty(t,n,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),i=new WeakMap;let r=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&i.set(t,e))}return e}toString(){return this.cssText}};const s=e=>new r("string"==typeof e?e:e+"",void 0,l),o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,l)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[l+1],e[0]);return new r(n,e,l)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return s(t)})(e):e,{is:c,defineProperty:u,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,g=globalThis,m=g.trustedTypes,_=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},x=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),l=this.getPropertyDescriptor(e,n,t);void 0!==l&&u(this.prototype,e,l)}}static getPropertyDescriptor(e,t,n){const{get:l,set:i}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:l,set(t){const r=l?.call(this);i?.call(this,t),this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,l)=>{if(n)e.adoptedStyleSheets=l.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of l){const l=document.createElement("style"),i=t.litNonce;void 0!==i&&l.setAttribute("nonce",i),l.textContent=n.cssText,e.appendChild(l)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),l=this.constructor._$Eu(e,n);if(void 0!==l&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:y).toAttribute(t,n.type);this._$Em=e,null==i?this.removeAttribute(l):this.setAttribute(l,i),this._$Em=null}}_$AK(e,t){const n=this.constructor,l=n._$Eh.get(e);if(void 0!==l&&this._$Em!==l){const e=n.getPropertyOptions(l),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=l;const r=i.fromAttribute(t,e.type);this[l]=r??this._$Ej?.get(l)??r,this._$Em=null}}requestUpdate(e,t,n,l=!1,i){if(void 0!==e){const r=this.constructor;if(!1===l&&(i=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??x)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:l,wrapped:i},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===l&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,l=this[t];!0!==e||this._$AL.has(t)||void 0===l||this.C(t,void 0,n,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,S=e=>e,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+M,P=`<${T}>`,z=document,D=()=>z.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,W="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,U=/>/g,F=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,q=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),B=q(1),Y=q(2),K=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,Z=z.createTreeWalker(z,129);function J(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Q=(e,t)=>{const n=e.length-1,l=[];let i,r=2===t?"<svg>":3===t?"<math>":"",s=R;for(let t=0;t<n;t++){const n=e[t];let o,a,c=-1,u=0;for(;u<n.length&&(s.lastIndex=u,a=s.exec(n),null!==a);)u=s.lastIndex,s===R?"!--"===a[1]?s=H:void 0!==a[1]?s=U:void 0!==a[2]?(j.test(a[2])&&(i=RegExp("</"+a[2],"g")),s=F):void 0!==a[3]&&(s=F):s===F?">"===a[0]?(s=i??R,c=-1):void 0===a[1]?c=-2:(c=s.lastIndex-a[2].length,o=a[1],s=void 0===a[3]?F:'"'===a[3]?I:L):s===I||s===L?s=F:s===H||s===U?s=R:(s=F,i=void 0);const h=s===F&&e[t+1].startsWith("/>")?" ":"";r+=s===R?n+P:c>=0?(l.push(o),n.slice(0,c)+C+n.slice(c)+M+h):n+M+(-2===c?t:h)}return[J(e,r+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),l]};class X{constructor({strings:e,_$litType$:t},n){let l;this.parts=[];let i=0,r=0;const s=e.length-1,o=this.parts,[a,c]=Q(e,t);if(this.el=X.createElement(a,n),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(l=Z.nextNode())&&o.length<s;){if(1===l.nodeType){if(l.hasAttributes())for(const e of l.getAttributeNames())if(e.endsWith(C)){const t=c[r++],n=l.getAttribute(e).split(M),s=/([.?@])?(.*)/.exec(t);o.push({type:1,index:i,name:s[2],strings:n,ctor:"."===s[1]?ie:"?"===s[1]?re:"@"===s[1]?se:le}),l.removeAttribute(e)}else e.startsWith(M)&&(o.push({type:6,index:i}),l.removeAttribute(e));if(j.test(l.tagName)){const e=l.textContent.split(M),t=e.length-1;if(t>0){l.textContent=A?A.emptyScript:"";for(let n=0;n<t;n++)l.append(e[n],D()),Z.nextNode(),o.push({type:2,index:++i});l.append(e[t],D())}}}else if(8===l.nodeType)if(l.data===T)o.push({type:2,index:i});else{let e=-1;for(;-1!==(e=l.data.indexOf(M,e+1));)o.push({type:7,index:i}),e+=M.length-1}i++}}static createElement(e,t){const n=z.createElement("template");return n.innerHTML=e,n}}function ee(e,t,n=e,l){if(t===K)return t;let i=void 0!==l?n._$Co?.[l]:n._$Cl;const r=O(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,n,l)),void 0!==l?(n._$Co??=[])[l]=i:n._$Cl=i),void 0!==i&&(t=ee(e,i._$AS(e,t.values),i,l)),t}class te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,l=(e?.creationScope??z).importNode(t,!0);Z.currentNode=l;let i=Z.nextNode(),r=0,s=0,o=n[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new ne(i,i.nextSibling,this,e):1===o.type?t=new o.ctor(i,o.name,o.strings,this,e):6===o.type&&(t=new oe(i,this,e)),this._$AV.push(t),o=n[++s]}r!==o?.index&&(i=Z.nextNode(),r++)}return Z.currentNode=z,l}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,l){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),O(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,l="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=X.createElement(J(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===l)this._$AH.p(t);else{const e=new te(l,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,l=0;for(const i of e)l===t.length?t.push(n=new ne(this.O(D()),this.O(D()),this,this.options)):n=t[l],n._$AI(i),l++;l<t.length&&(this._$AR(n&&n._$AB.nextSibling,l),t.length=l)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class le{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,l,i){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=l,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=V}_$AI(e,t=this,n,l){const i=this.strings;let r=!1;if(void 0===i)e=ee(this,e,t,0),r=!O(e)||e!==this._$AH&&e!==K,r&&(this._$AH=e);else{const l=e;let s,o;for(e=i[0],s=0;s<i.length-1;s++)o=ee(this,l[n+s],t,s),o===K&&(o=this._$AH[s]),r||=!O(o)||o!==this._$AH[s],o===V?e=V:e!==V&&(e+=(o??"")+i[s+1]),this._$AH[s]=o}r&&!l&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends le{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class re extends le{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class se extends le{constructor(e,t,n,l,i){super(e,t,n,l,i),this.type=5}_$AI(e,t=this){if((e=ee(this,e,t,0)??V)===K)return;const n=this._$AH,l=e===V&&n!==V||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==V&&(n===V||l);l&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(X,ne),(k.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;class ue extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const l=n?.renderBefore??t;let i=l._$litPart$;if(void 0===i){const e=n?.renderBefore??null;l._$litPart$=i=new ne(t.insertBefore(D(),e),e,void 0,n??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}ue._$litElement$=!0,ue.finalized=!0,ce.litElementHydrateSupport?.({LitElement:ue});const he=ce.litElementPolyfillSupport;he?.({LitElement:ue}),(ce.litElementVersions??=[]).push("4.2.2");const de=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},fe=(e=pe,t,n)=>{const{kind:l,metadata:i}=n;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===l&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),"accessor"===l){const{name:l}=n;return{set(n){const i=t.get.call(this);t.set.call(this,n),this.requestUpdate(l,i,e,!0,n)},init(t){return void 0!==t&&this.C(l,void 0,e,t),t}}}if("setter"===l){const{name:l}=n;return function(n){const i=this[l];t.call(this,n),this.requestUpdate(l,i,e,!0,n)}}throw Error("Unsupported decorator location: "+l)};function ge(e){return(t,n)=>"object"==typeof n?fe(e,t,n):((e,t,n)=>{const l=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),l?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function me(e){return ge({...e,state:!0,attribute:!1})}const _e=o`
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
`;async function ve(e,t,n){const l=n.days??90,i=new Date,r=new Date(i.getTime()-864e5*l);return(await e.callWS({type:"teslamate_cards/query",query_id:t,car_id:n.car_id??1,time_from:r.toISOString(),time_to:i.toISOString(),length_unit:n.length_unit??"km",temp_unit:n.temp_unit??"C",preferred_range:n.preferred_range??"rated",geofence_ids:n.geofence_ids??null,location:n.location??"",charge_type:n.charge_type??"",vars:n.vars??{}})).rows}class be extends ue{constructor(){super(...arguments),this._rows=[],this._extra={},this._loading=!0,this._error=null,this._page=0,this._requested=!1}static{this.styles=_e}secondaryQueryIds(){return[]}set hass(e){this._hass=e,this._requested||(this._requested=!0,this.refresh())}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this._page=0,this._requested=!1,this._hass&&(this._requested=!0,this.refresh())}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>{this.refresh()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer),this._timer=void 0}async refresh(){if(!this._hass||!this._config)return;const e=this._hass,t=this.queryOptions();try{const n=this.secondaryQueryIds(),[l,...i]=await Promise.all([ve(e,this.queryId(),t),...n.map(n=>ve(e,n,t))]);this._rows=l,this._extra=Object.fromEntries(n.map((e,t)=>[e,i[t]??[]])),this._error=null}catch(e){this._error=function(e){return String("object"==typeof e&&null!==e&&"message"in e?e.message:e)}(e)}finally{this._loading=!1}}paginate(e){const t=this.pageSize(),n=Math.max(1,Math.ceil(e.length/t)),l=Math.min(this._page,n-1);return{visible:e.slice(l*t,l*t+t),page:l,pages:n}}pageSize(){return 25}renderHeader(e){return B`
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
    `}defaultTitle(){return"TeslaMate"}unitKey(e){return`${e}_${this._config.length_unit??"km"}`}tempKey(e){return`${e}_${(this._config.temp_unit??"C").toLowerCase()}`}render(){return this._config?this._error?B`<ha-card>${this.renderHeader()}<div class="state error">${this._error}</div></ha-card>`:this._loading?B`<ha-card>${this.renderHeader()}<div class="state">Loading…</div></ha-card>`:this.renderContent():B``}}function ye(e,t,n,l){const i=new Map;for(const r of e){const e=n(r),s=l(r);if(!Number.isFinite(e)||!Number.isFinite(s))continue;const o=t(r),a=i.get(o);a?a.push([e,s]):i.set(o,[[e,s]])}for(const e of i.values())e.sort((e,t)=>e[0]-t[0]);return i}e([me()],be.prototype,"_rows",void 0),e([me()],be.prototype,"_extra",void 0),e([me()],be.prototype,"_loading",void 0),e([me()],be.prototype,"_error",void 0),e([me()],be.prototype,"_page",void 0);const xe="u-off",we="u-label",$e="width",ke="height",Se="top",Ae="bottom",Ee="left",Ce="right",Me="#000",Te=Me+"0",Pe="mousemove",ze="mousedown",De="mouseup",Oe="mouseenter",Ne="mouseleave",We="dblclick",Re="change",He="dppxchange",Ue="--",Fe="undefined"!=typeof window,Le=Fe?document:null,Ie=Fe?window:null,je=Fe?navigator:null;let qe,Be;function Ye(e,t){if(null!=t){let n=e.classList;!n.contains(t)&&n.add(t)}}function Ke(e,t){let n=e.classList;n.contains(t)&&n.remove(t)}function Ve(e,t,n){e.style[t]=n+"px"}function Ge(e,t,n,l){let i=Le.createElement(e);return null!=t&&Ye(i,t),null!=n&&n.insertBefore(i,l),i}function Ze(e,t){return Ge("div",e,t)}const Je=new WeakMap;function Qe(e,t,n,l,i){let r="translate("+t+"px,"+n+"px)";r!=Je.get(e)&&(e.style.transform=r,Je.set(e,r),t<0||n<0||t>l||n>i?Ye(e,xe):Ke(e,xe))}const Xe=new WeakMap;function et(e,t,n){let l=t+n;l!=Xe.get(e)&&(Xe.set(e,l),e.style.background=t,e.style.borderColor=n)}const tt=new WeakMap;function nt(e,t,n,l){let i=t+""+n;i!=tt.get(e)&&(tt.set(e,i),e.style.height=n+"px",e.style.width=t+"px",e.style.marginLeft=l?-t/2+"px":0,e.style.marginTop=l?-n/2+"px":0)}const lt={passive:!0},it={...lt,capture:!0};function rt(e,t,n,l){t.addEventListener(e,n,l?it:lt)}function st(e,t,n,l){t.removeEventListener(e,n,lt)}function ot(e,t,n,l){let i;n=n||0;let r=(l=l||t.length-1)<=2147483647;for(;l-n>1;)i=r?n+l>>1:At((n+l)/2),t[i]<e?n=i:l=i;return e-t[n]<=t[l]-e?n:l}function at(e){return(t,n,l)=>{let i=-1,r=-1;for(let r=n;r<=l;r++)if(e(t[r])){i=r;break}for(let i=l;i>=n;i--)if(e(t[i])){r=i;break}return[i,r]}}Fe&&function e(){let t=devicePixelRatio;qe!=t&&(qe=t,Be&&st(Re,Be,e),Be=matchMedia(`(min-resolution: ${qe-.001}dppx) and (max-resolution: ${qe+.001}dppx)`),rt(Re,Be,e),Ie.dispatchEvent(new CustomEvent(He)))}();const ct=e=>null!=e,ut=e=>null!=e&&e>0,ht=at(ct),dt=at(ut);function pt(e,t,n,l){let i=zt(e),r=zt(t);e==t&&(-1==i?(e*=n,t/=n):(e/=n,t*=n));let s=10==n?Dt:Ot,o=1==r?Ct:At,a=(1==i?At:Ct)(s(St(e))),c=o(s(St(t))),u=Pt(n,a),h=Pt(n,c);return 10==n&&(a<0&&(u=Jt(u,-a)),c<0&&(h=Jt(h,-c))),l||2==n?(e=u*i,t=h*r):(e=Zt(e,u),t=Gt(t,h)),[e,t]}function ft(e,t,n,l){let i=pt(e,t,n,l);return 0==e&&(i[0]=0),0==t&&(i[1]=0),i}const gt={mode:3,pad:.1},mt={pad:0,soft:null,mode:0},_t={min:mt,max:mt};function vt(e,t,n,l){return an(n)?yt(e,t,n):(mt.pad=n,mt.soft=l?0:null,mt.mode=l?3:0,yt(e,t,_t))}function bt(e,t){return e??t}function yt(e,t,n){let l=n.min,i=n.max,r=bt(l.pad,0),s=bt(i.pad,0),o=bt(l.hard,-Wt),a=bt(i.hard,Wt),c=bt(l.soft,Wt),u=bt(i.soft,-Wt),h=bt(l.mode,0),d=bt(i.mode,0),p=t-e,f=Dt(p),g=Tt(St(e),St(t)),m=Dt(g),_=St(m-f);(p<1e-24||_>10)&&(p=0,0!=e&&0!=t||(p=1e-24,2==h&&c!=Wt&&(r=0),2==d&&u!=-Wt&&(s=0)));let v=p||g||1e3,b=Dt(v),y=Pt(10,At(b)),x=Jt(Zt(e-v*(0==p?0==e?.1:1:r),y/10),24),w=e>=c&&(1==h||3==h&&x<=c||2==h&&x>=c)?c:Wt,$=Tt(o,x<w&&e>=w?w:Mt(w,x)),k=Jt(Gt(t+v*(0==p?0==t?.1:1:s),y/10),24),S=t<=u&&(1==d||3==d&&k>=u||2==d&&k<=u)?u:-Wt,A=Mt(a,k>S&&t<=S?S:Tt(S,k));return $==A&&0==$&&(A=100),[$,A]}const xt=new Intl.NumberFormat(Fe?je.language:"en-US"),wt=e=>xt.format(e),$t=Math,kt=$t.PI,St=$t.abs,At=$t.floor,Et=$t.round,Ct=$t.ceil,Mt=$t.min,Tt=$t.max,Pt=$t.pow,zt=$t.sign,Dt=$t.log10,Ot=$t.log2,Nt=(e,t=1)=>$t.asinh(e/t),Wt=1/0;function Rt(e){return 1+(0|Dt((e^e>>31)-(e>>31)))}function Ht(e,t,n){return Mt(Tt(e,t),n)}function Ut(e){return"function"==typeof e}function Ft(e){return Ut(e)?e:()=>e}const Lt=e=>e,It=(e,t)=>t,jt=e=>null,qt=e=>!0,Bt=(e,t)=>e==t,Yt=/\.\d*?(?=9{6,}|0{6,})/gm,Kt=e=>{if(sn(e)||Qt.has(e))return e;const t=`${e}`,n=t.match(Yt);if(null==n)return e;let l=n[0].length-1;if(-1!=t.indexOf("e-")){let[e,n]=t.split("e");return+`${Kt(e)}e${n}`}return Jt(e,l)};function Vt(e,t){return Kt(Jt(Kt(e/t))*t)}function Gt(e,t){return Kt(Ct(Kt(e/t))*t)}function Zt(e,t){return Kt(At(Kt(e/t))*t)}function Jt(e,t=0){if(sn(e))return e;let n=10**t,l=e*n*(1+Number.EPSILON);return Et(l)/n}const Qt=new Map;function Xt(e){return((""+e).split(".")[1]||"").length}function en(e,t,n,l){let i=[],r=l.map(Xt);for(let s=t;s<n;s++){let t=St(s),n=Jt(Pt(e,s),t);for(let o=0;o<l.length;o++){let a=10==e?+`${l[o]}e${s}`:l[o]*n,c=(s>=0?0:t)+(s>=r[o]?0:r[o]),u=10==e?a:Jt(a,c);i.push(u),Qt.set(u,c)}}return i}const tn={},nn=[],ln=[null,null],rn=Array.isArray,sn=Number.isInteger;function on(e){return"string"==typeof e}function an(e){let t=!1;if(null!=e){let n=e.constructor;t=null==n||n==Object}return t}function cn(e){return null!=e&&"object"==typeof e}const un=Object.getPrototypeOf(Uint8Array),hn="__proto__";function dn(e,t=an){let n;if(rn(e)){let l=e.find(e=>null!=e);if(rn(l)||t(l)){n=Array(e.length);for(let l=0;l<e.length;l++)n[l]=dn(e[l],t)}else n=e.slice()}else if(e instanceof un)n=e.slice();else if(t(e)){n={};for(let l in e)l!=hn&&(n[l]=dn(e[l],t))}else n=e;return n}function pn(e){let t=arguments;for(let n=1;n<t.length;n++){let l=t[n];for(let t in l)t!=hn&&(an(e[t])?pn(e[t],dn(l[t])):e[t]=dn(l[t]))}return e}function fn(e,t,n){for(let l,i=0,r=-1;i<t.length;i++){let s=t[i];if(s>r){for(l=s-1;l>=0&&null==e[l];)e[l--]=null;for(l=s+1;l<n&&null==e[l];)e[r=l++]=null}}}const gn="undefined"==typeof queueMicrotask?e=>Promise.resolve().then(e):queueMicrotask;const mn=["January","February","March","April","May","June","July","August","September","October","November","December"],_n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function vn(e){return e.slice(0,3)}const bn=_n.map(vn),yn=mn.map(vn),xn={MMMM:mn,MMM:yn,WWWW:_n,WWW:bn};function wn(e){return(e<10?"0":"")+e}const $n={YYYY:e=>e.getFullYear(),YY:e=>(e.getFullYear()+"").slice(2),MMMM:(e,t)=>t.MMMM[e.getMonth()],MMM:(e,t)=>t.MMM[e.getMonth()],MM:e=>wn(e.getMonth()+1),M:e=>e.getMonth()+1,DD:e=>wn(e.getDate()),D:e=>e.getDate(),WWWW:(e,t)=>t.WWWW[e.getDay()],WWW:(e,t)=>t.WWW[e.getDay()],HH:e=>wn(e.getHours()),H:e=>e.getHours(),h:e=>{let t=e.getHours();return 0==t?12:t>12?t-12:t},AA:e=>e.getHours()>=12?"PM":"AM",aa:e=>e.getHours()>=12?"pm":"am",a:e=>e.getHours()>=12?"p":"a",mm:e=>wn(e.getMinutes()),m:e=>e.getMinutes(),ss:e=>wn(e.getSeconds()),s:e=>e.getSeconds(),fff:e=>{return((t=e.getMilliseconds())<10?"00":t<100?"0":"")+t;var t}};function kn(e,t){t=t||xn;let n,l=[],i=/\{([a-z]+)\}|[^{]+/gi;for(;n=i.exec(e);)l.push("{"==n[0][0]?$n[n[1]]:n[0]);return e=>{let n="";for(let i=0;i<l.length;i++)n+="string"==typeof l[i]?l[i]:l[i](e,t);return n}}const Sn=(new Intl.DateTimeFormat).resolvedOptions().timeZone;const An=e=>e%1==0,En=[1,2,2.5,5],Cn=en(10,-32,0,En),Mn=en(10,0,32,En),Tn=Mn.filter(An),Pn=Cn.concat(Mn),zn="{YYYY}",Dn="\n"+zn,On="{M}/{D}",Nn="\n"+On,Wn=Nn+"/{YY}",Rn="{aa}",Hn="{h}:{mm}"+Rn,Un="\n"+Hn,Fn=":{ss}",Ln=null;function In(e){let t=1e3*e,n=60*t,l=60*n,i=24*l,r=30*i,s=365*i;return[(1==e?en(10,0,3,En).filter(An):en(10,-3,0,En)).concat([t,5*t,10*t,15*t,30*t,n,5*n,10*n,15*n,30*n,l,2*l,3*l,4*l,6*l,8*l,12*l,i,2*i,3*i,4*i,5*i,6*i,7*i,8*i,9*i,10*i,15*i,r,2*r,3*r,4*r,6*r,s,2*s,5*s,10*s,25*s,50*s,100*s]),[[s,zn,Ln,Ln,Ln,Ln,Ln,Ln,1],[28*i,"{MMM}",Dn,Ln,Ln,Ln,Ln,Ln,1],[i,On,Dn,Ln,Ln,Ln,Ln,Ln,1],[l,"{h}"+Rn,Wn,Ln,Nn,Ln,Ln,Ln,1],[n,Hn,Wn,Ln,Nn,Ln,Ln,Ln,1],[t,Fn,Wn+" "+Hn,Ln,Nn+" "+Hn,Ln,Un,Ln,1],[e,Fn+".{fff}",Wn+" "+Hn,Ln,Nn+" "+Hn,Ln,Un,Ln,1]],function(t){return(o,a,c,u,h,d)=>{let p=[],f=h>=s,g=h>=r&&h<s,m=t(c),_=Jt(m*e,3),v=Jn(m.getFullYear(),f?0:m.getMonth(),g||f?1:m.getDate()),b=Jt(v*e,3);if(g||f){let n=g?h/r:0,l=f?h/s:0,i=_==b?_:Jt(Jn(v.getFullYear()+l,v.getMonth()+n,1)*e,3),o=new Date(Et(i/e)),a=o.getFullYear(),c=o.getMonth();for(let r=0;i<=u;r++){let s=Jn(a+l*r,c+n*r,1),o=s-t(Jt(s*e,3));i=Jt((+s+o)*e,3),i<=u&&p.push(i)}}else{let r=h>=i?i:h,s=b+(At(c)-At(_))+Gt(_-b,r);p.push(s);let f=t(s),g=f.getHours()+f.getMinutes()/n+f.getSeconds()/l,m=h/l,v=d/o.axes[a]._space;for(;s=Jt(s+h,1==e?0:3),!(s>u);)if(m>1){let e=At(Jt(g+m,6))%24,n=t(s).getHours()-e;n>1&&(n=-1),s-=n*l,g=(g+m)%24,Jt((s-p[p.length-1])/h,3)*v>=.7&&p.push(s)}else p.push(s)}return p}}]}const[jn,qn,Bn]=In(1),[Yn,Kn,Vn]=In(.001);function Gn(e,t){return e.map(e=>e.map((n,l)=>0==l||8==l||null==n?n:t(1==l||0==e[8]?n:e[1]+n)))}function Zn(e,t){return(n,l,i,r,s)=>{let o,a,c,u,h,d,p=t.find(e=>s>=e[0])||t[t.length-1];return l.map(t=>{let n=e(t),l=n.getFullYear(),i=n.getMonth(),r=n.getDate(),s=n.getHours(),f=n.getMinutes(),g=n.getSeconds(),m=l!=o&&p[2]||i!=a&&p[3]||r!=c&&p[4]||s!=u&&p[5]||f!=h&&p[6]||g!=d&&p[7]||p[1];return o=l,a=i,c=r,u=s,h=f,d=g,m(n)})}}function Jn(e,t,n){return new Date(e,t,n)}function Qn(e,t){return t(e)}en(2,-53,53,[1]);function Xn(e,t){return(n,l,i,r)=>null==r?Ue:t(e(l))}const el={show:!0,live:!0,isolate:!1,mount:()=>{},markers:{show:!0,width:2,stroke:function(e,t){let n=e.series[t];return n.width?n.stroke(e,t):n.points.width?n.points.stroke(e,t):null},fill:function(e,t){return e.series[t].fill(e,t)},dash:"solid"},idx:null,idxs:null,values:[]};const tl=[0,0];function nl(e,t,n,l=!0){return e=>{0==e.button&&(!l||e.target==t)&&n(e)}}function ll(e,t,n,l=!0){return e=>{(!l||e.target==t)&&n(e)}}const il={show:!0,x:!0,y:!0,lock:!1,move:function(e,t,n){return tl[0]=t,tl[1]=n,tl},points:{one:!1,show:function(e,t){let n=e.cursor.points,l=Ze(),i=n.size(e,t);Ve(l,$e,i),Ve(l,ke,i);let r=i/-2;Ve(l,"marginLeft",r),Ve(l,"marginTop",r);let s=n.width(e,t,i);return s&&Ve(l,"borderWidth",s),l},size:function(e,t){return e.series[t].points.size},width:0,stroke:function(e,t){let n=e.series[t].points;return n._stroke||n._fill},fill:function(e,t){let n=e.series[t].points;return n._fill||n._stroke}},bind:{mousedown:nl,mouseup:nl,click:nl,dblclick:nl,mousemove:ll,mouseleave:ll,mouseenter:ll},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(e,t)=>{t.stopPropagation(),t.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(e,t,n,l,i)=>l-i,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},rl={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},sl=pn({},rl,{filter:It}),ol=pn({},sl,{size:10}),al=pn({},rl,{show:!1}),cl='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',ul="bold "+cl,hl={show:!0,scale:"x",stroke:Me,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:ul,side:2,grid:sl,ticks:ol,border:al,font:cl,lineGap:1.5,rotate:0},dl={show:!0,scale:"x",auto:!1,sorted:1,min:Wt,max:-Wt,idxs:[]};function pl(e,t,n,l,i){return t.map(e=>null==e?"":wt(e))}function fl(e,t,n,l,i,r,s){let o=[],a=Qt.get(i)||0;for(let e=n=s?n:Jt(Gt(n,i),a);e<=l;e=Jt(e+i,a))o.push(Object.is(e,-0)?0:e);return o}function gl(e,t,n,l,i,r,s){const o=[],a=e.scales[e.axes[t].scale].log,c=At((10==a?Dt:Ot)(n));i=Pt(a,c),10==a&&(i=Pn[ot(i,Pn)]);let u=n,h=i*a;10==a&&(h=Pn[ot(h,Pn)]);do{o.push(u),u+=i,10!=a||Qt.has(u)||(u=Jt(u,Qt.get(i))),u>=h&&(h=(i=u)*a,10==a&&(h=Pn[ot(h,Pn)]))}while(u<=l);return o}function ml(e,t,n,l,i,r,s){let o=e.scales[e.axes[t].scale].asinh,a=l>o?gl(e,t,Tt(o,n),l,i):[o],c=l>=0&&n<=0?[0]:[];return(n<-o?gl(e,t,Tt(o,-l),-n,i):[o]).reverse().map(e=>-e).concat(c,a)}const _l=/./,vl=/[12357]/,bl=/[125]/,yl=/1/,xl=(e,t,n,l)=>e.map((e,i)=>4==t&&0==e||i%l==0&&n.test(e.toExponential()[e<0?1:0])?e:null);function wl(e,t,n,l,i){let r=e.axes[n],s=r.scale,o=e.scales[s],a=e.valToPos,c=r._space,u=a(10,s),h=a(9,s)-u>=c?_l:a(7,s)-u>=c?vl:a(5,s)-u>=c?bl:yl;if(h==yl){let e=St(a(1,s)-u);if(e<c)return xl(t.slice().reverse(),o.distr,h,Ct(c/e)).reverse()}return xl(t,o.distr,h,1)}function $l(e,t,n,l,i){let r=e.axes[n],s=r.scale,o=r._space,a=e.valToPos,c=St(a(1,s)-a(2,s));return c<o?xl(t.slice().reverse(),3,_l,Ct(o/c)).reverse():t}function kl(e,t,n,l){return null==l?Ue:null==t?"":wt(t)}const Sl={show:!0,scale:"y",stroke:Me,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:ul,side:3,grid:sl,ticks:ol,border:al,font:cl,lineGap:1.5,rotate:0};const Al={scale:null,auto:!0,sorted:0,min:Wt,max:-Wt},El=(e,t,n,l,i)=>i,Cl={show:!0,auto:!0,sorted:0,gaps:El,alpha:1,facets:[pn({},Al,{scale:"x"}),pn({},Al,{scale:"y"})]},Ml={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:El,alpha:1,points:{show:function(e,t){let{scale:n,idxs:l}=e.series[0],i=e._data[0],r=e.valToPos(i[l[0]],n,!0),s=e.valToPos(i[l[1]],n,!0),o=St(s-r)/(e.series[t].points.space*qe);return l[1]-l[0]<=o},filter:null},values:null,min:Wt,max:-Wt,idxs:[],path:null,clip:null};function Tl(e,t,n,l,i){return n/10}const Pl={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},zl=pn({},Pl,{time:!1,ori:1}),Dl={};function Ol(e,t){let n=Dl[e];return n||(n={key:e,plots:[],sub(e){n.plots.push(e)},unsub(e){n.plots=n.plots.filter(t=>t!=e)},pub(e,t,l,i,r,s,o){for(let a=0;a<n.plots.length;a++)n.plots[a]!=t&&n.plots[a].pub(e,t,l,i,r,s,o)}},null!=e&&(Dl[e]=n)),n}function Nl(e,t,n){const l=e.mode,i=e.series[t],r=2==l?e._data[t]:e._data,s=e.scales,o=e.bbox;let a=r[0],c=2==l?r[1]:r[t],u=2==l?s[i.facets[0].scale]:s[e.series[0].scale],h=2==l?s[i.facets[1].scale]:s[i.scale],d=o.left,p=o.top,f=o.width,g=o.height,m=e.valToPosH,_=e.valToPosV;return 0==u.ori?n(i,a,c,u,h,m,_,d,p,f,g,jl,Bl,Kl,Gl,Jl):n(i,a,c,u,h,_,m,p,d,g,f,ql,Yl,Vl,Zl,Ql)}function Wl(e,t){let n=0,l=0,i=bt(e.bands,nn);for(let e=0;e<i.length;e++){let r=i[e];r.series[0]==t?n=r.dir:r.series[1]==t&&(1==r.dir?l|=1:l|=2)}return[n,1==l?-1:2==l?1:3==l?2:0]}function Rl(e,t,n,l,i){let r=e.mode,s=e.series[t],o=2==r?s.facets[1].scale:s.scale,a=e.scales[o];return-1==i?a.min:1==i?a.max:3==a.distr?1==a.dir?a.min:a.max:0}function Hl(e,t,n,l,i,r){return Nl(e,t,(e,t,s,o,a,c,u,h,d,p,f)=>{let g=e.pxRound;const m=o.dir*(0==o.ori?1:-1),_=0==o.ori?Bl:Yl;let v,b;1==m?(v=n,b=l):(v=l,b=n);let y=g(c(t[v],o,p,h)),x=g(u(s[v],a,f,d)),w=g(c(t[b],o,p,h)),$=g(u(1==r?a.max:a.min,a,f,d)),k=new Path2D(i);return _(k,w,$),_(k,y,$),_(k,y,x),k})}function Ul(e,t,n,l,i,r){let s=null;if(e.length>0){s=new Path2D;const o=0==t?Kl:Vl;let a=n;for(let t=0;t<e.length;t++){let n=e[t];if(n[1]>n[0]){let e=n[0]-a;e>0&&o(s,a,l,e,l+r),a=n[1]}}let c=n+i-a,u=10;c>0&&o(s,a,l-u/2,c,l+r+u)}return s}function Fl(e,t,n,l,i,r,s){let o=[],a=e.length;for(let c=1==i?n:l;c>=n&&c<=l;c+=i){if(null===t[c]){let u=c,h=c;if(1==i)for(;++c<=l&&null===t[c];)h=c;else for(;--c>=n&&null===t[c];)h=c;let d=r(e[u]),p=h==u?d:r(e[h]),f=u-i;d=s<=0&&f>=0&&f<a?r(e[f]):d;let g=h+i;p=s>=0&&g>=0&&g<a?r(e[g]):p,p>=d&&o.push([d,p])}}return o}function Ll(e){return 0==e?Lt:1==e?Et:t=>Vt(t,e)}function Il(e){let t=0==e?jl:ql,n=0==e?(e,t,n,l,i,r)=>{e.arcTo(t,n,l,i,r)}:(e,t,n,l,i,r)=>{e.arcTo(n,t,i,l,r)},l=0==e?(e,t,n,l,i)=>{e.rect(t,n,l,i)}:(e,t,n,l,i)=>{e.rect(n,t,i,l)};return(e,i,r,s,o,a=0,c=0)=>{0==a&&0==c?l(e,i,r,s,o):(a=Mt(a,s/2,o/2),c=Mt(c,s/2,o/2),t(e,i+a,r),n(e,i+s,r,i+s,r+o,a),n(e,i+s,r+o,i,r+o,c),n(e,i,r+o,i,r,c),n(e,i,r,i+s,r,a),e.closePath())}}const jl=(e,t,n)=>{e.moveTo(t,n)},ql=(e,t,n)=>{e.moveTo(n,t)},Bl=(e,t,n)=>{e.lineTo(t,n)},Yl=(e,t,n)=>{e.lineTo(n,t)},Kl=Il(0),Vl=Il(1),Gl=(e,t,n,l,i,r)=>{e.arc(t,n,l,i,r)},Zl=(e,t,n,l,i,r)=>{e.arc(n,t,l,i,r)},Jl=(e,t,n,l,i,r,s)=>{e.bezierCurveTo(t,n,l,i,r,s)},Ql=(e,t,n,l,i,r,s)=>{e.bezierCurveTo(n,t,i,l,s,r)};function Xl(e){return(e,t,n,l,i)=>Nl(e,t,(t,r,s,o,a,c,u,h,d,p,f)=>{let g,m,{pxRound:_,points:v}=t;0==o.ori?(g=jl,m=Gl):(g=ql,m=Zl);const b=Jt(v.width*qe,3);let y=(v.size-v.width)/2*qe,x=Jt(2*y,3),w=new Path2D,$=new Path2D,{left:k,top:S,width:A,height:E}=e.bbox;Kl($,k-x,S-x,A+2*x,E+2*x);const C=e=>{if(null!=s[e]){let t=_(c(r[e],o,p,h)),n=_(u(s[e],a,f,d));g(w,t+y,n),m(w,t,n,y,0,2*kt)}};if(i)i.forEach(C);else for(let e=n;e<=l;e++)C(e);return{stroke:b>0?w:null,fill:w,clip:$,flags:3}})}function ei(e){return(t,n,l,i,r,s)=>{l!=i&&(r!=l&&s!=l&&e(t,n,l),r!=i&&s!=i&&e(t,n,i),e(t,n,s))}}const ti=ei(Bl),ni=ei(Yl);function li(e){const t=bt(e?.alignGaps,0);return(e,n,l,i)=>Nl(e,n,(r,s,o,a,c,u,h,d,p,f,g)=>{[l,i]=ht(o,l,i);let m,_,v=r.pxRound,b=e=>v(u(e,a,f,d)),y=e=>v(h(e,c,g,p));0==a.ori?(m=Bl,_=ti):(m=Yl,_=ni);const x=a.dir*(0==a.ori?1:-1),w={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},$=w.stroke;let k=!1;if(i-l>=4*f){let t,n,r,c=t=>e.posToVal(t,a.key,!0),u=null,h=null,d=b(s[1==x?l:i]),p=b(s[l]),f=b(s[i]),g=c(1==x?p+1:f-1);for(let e=1==x?l:i;e>=l&&e<=i;e+=x){let l=s[e],i=(1==x?l<g:l>g)?d:b(l),r=o[e];i==d?null!=r?(n=r,null==u?(m($,i,y(n)),t=u=h=n):n<u?u=n:n>h&&(h=n)):null===r&&(k=!0):(null!=u&&_($,d,y(u),y(h),y(t),y(n)),null!=r?(n=r,m($,i,y(n)),u=h=t=n):(u=h=null,null===r&&(k=!0)),d=i,g=c(d+x))}null!=u&&u!=h&&r!=d&&_($,d,y(u),y(h),y(t),y(n))}else for(let e=1==x?l:i;e>=l&&e<=i;e+=x){let t=o[e];null===t?k=!0:null!=t&&m($,b(s[e]),y(t))}let[S,A]=Wl(e,n);if(null!=r.fill||0!=S){let t=w.fill=new Path2D($),o=y(r.fillTo(e,n,r.min,r.max,S)),a=b(s[l]),c=b(s[i]);-1==x&&([c,a]=[a,c]),m(t,c,o),m(t,a,o)}if(!r.spanGaps){let c=[];k&&c.push(...Fl(s,o,l,i,x,b,t)),w.gaps=c=r.gaps(e,n,l,i,c),w.clip=Ul(c,a.ori,d,p,f,g)}return 0!=A&&(w.band=2==A?[Hl(e,n,l,i,$,-1),Hl(e,n,l,i,$,1)]:Hl(e,n,l,i,$,A)),w})}function ii(e,t,n,l,i,r,s=Wt){if(e.length>1){let o=null;for(let a=0,c=1/0;a<e.length;a++)if(void 0!==t[a]){if(null!=o){let t=St(e[a]-e[o]);t<c&&(c=t,s=St(n(e[a],l,i,r)-n(e[o],l,i,r)))}o=a}}return s}function ri(e,t,n,l,i,r){const s=e.length;if(s<2)return null;const o=new Path2D;if(n(o,e[0],t[0]),2==s)l(o,e[1],t[1]);else{let n=Array(s),l=Array(s-1),r=Array(s-1),a=Array(s-1);for(let n=0;n<s-1;n++)r[n]=t[n+1]-t[n],a[n]=e[n+1]-e[n],l[n]=r[n]/a[n];n[0]=l[0];for(let e=1;e<s-1;e++)0===l[e]||0===l[e-1]||l[e-1]>0!=l[e]>0?n[e]=0:(n[e]=3*(a[e-1]+a[e])/((2*a[e]+a[e-1])/l[e-1]+(a[e]+2*a[e-1])/l[e]),isFinite(n[e])||(n[e]=0));n[s-1]=l[s-2];for(let l=0;l<s-1;l++)i(o,e[l]+a[l]/3,t[l]+n[l]*a[l]/3,e[l+1]-a[l]/3,t[l+1]-n[l+1]*a[l]/3,e[l+1],t[l+1])}return o}const si=new Set;function oi(){for(let e of si)e.syncRect(!0)}Fe&&(rt("resize",Ie,oi),rt("scroll",Ie,oi,!0),rt(He,Ie,()=>{wi.pxRatio=qe}));const ai=li(),ci=Xl();function ui(e,t,n,l){return(l?[e[0],e[1]].concat(e.slice(2)):[e[0]].concat(e.slice(1))).map((e,l)=>hi(e,l,t,n))}function hi(e,t,n,l){return pn({},0==t?n:l,e)}function di(e,t,n){return null==t?ln:[t,n]}const pi=di;function fi(e,t,n){return null==t?ln:vt(t,n,.1,!0)}function gi(e,t,n,l){return null==t?ln:pt(t,n,e.scales[l].log,!1)}const mi=gi;function _i(e,t,n,l){return null==t?ln:ft(t,n,e.scales[l].log,!1)}const vi=_i;function bi(e,t,n,l,i){let r=Tt(Rt(e),Rt(t)),s=t-e,o=ot(i/l*s,n);do{let e=n[o],t=l*e/s;if(t>=i&&r+(e<5?Qt.get(e):0)<=17)return[e,t]}while(++o<n.length);return[0,0]}function yi(e){let t,n;return[e=e.replace(/(\d+)px/,(e,l)=>(t=Et((n=+l)*qe))+"px"),t,n]}function xi(e){e.show&&[e.font,e.labelFont].forEach(e=>{let t=Jt(e[2]*qe,1);e[0]=e[0].replace(/[0-9.]+px/,t+"px"),e[1]=t})}function wi(e,t,n){const l={mode:bt(e.mode,1)},i=l.mode;function r(e,t,n,l){let i=t.valToPct(e);return l+n*(-1==t.dir?1-i:i)}function s(e,t,n,l){let i=t.valToPct(e);return l+n*(-1==t.dir?i:1-i)}function o(e,t,n,l){return 0==t.ori?r(e,t,n,l):s(e,t,n,l)}l.valToPosH=r,l.valToPosV=s;let a=!1;l.status=0;const c=l.root=Ze("uplot");if(null!=e.id&&(c.id=e.id),Ye(c,e.class),e.title){Ze("u-title",c).textContent=e.title}const u=Ge("canvas"),h=l.ctx=u.getContext("2d"),d=Ze("u-wrap",c);rt("click",d,e=>{if(e.target===f){(al!=ll||cl!=rl)&&Dl.click(l,e)}},!0);const p=l.under=Ze("u-under",d);d.appendChild(u);const f=l.over=Ze("u-over",d),g=+bt((e=dn(e)).pxAlign,1),m=Ll(g);(e.plugins||[]).forEach(t=>{t.opts&&(e=t.opts(l,e)||e)});const _=e.ms||.001,v=l.series=1==i?ui(e.series||[],dl,Ml,!1):function(e,t){return e.map((e,n)=>0==n?{}:pn({},t,e))}(e.series||[null],Cl),b=l.axes=ui(e.axes||[],hl,Sl,!0),y=l.scales={},x=l.bands=e.bands||[];x.forEach(e=>{e.fill=Ft(e.fill||null),e.dir=bt(e.dir,-1)});const w=2==i?v[1].facets[0].scale:v[0].scale,$={axes:function(){for(let e=0;e<b.length;e++){let t=b[e];if(!t.show||!t._show)continue;let n,i,r=t.side,s=r%2,a=t.stroke(l,e),c=0==r||3==r?-1:1,[u,d]=t._found;if(null!=t.label){let o=t.labelGap*c,p=Et((t._lpos+o)*qe);Sn(t.labelFont[0],a,"center",2==r?Se:Ae),h.save(),1==s?(n=i=0,h.translate(p,Et(fe+me/2)),h.rotate((3==r?-kt:kt)/2)):(n=Et(pe+ge/2),i=p);let f=Ut(t.label)?t.label(l,e,u,d):t.label;h.fillText(f,n,i),h.restore()}if(0==d)continue;let p=y[t.scale],f=0==s?ge:me,g=0==s?pe:fe,_=t._splits,v=2==p.distr?_.map(e=>bn[e]):_,x=2==p.distr?bn[_[1]]-bn[_[0]]:u,w=t.ticks,$=t.border,k=w.show?w.size:0,S=Et(k*qe),A=Et((2==t.alignTo?t._size-k-t.gap:t.gap)*qe),E=t._rotate*-kt/180,C=m(t._pos*qe),M=C+(S+A)*c;i=0==s?M:0,n=1==s?M:0,Sn(t.font[0],a,1==t.align?Ee:2==t.align?Ce:E>0?Ee:E<0?Ce:0==s?"center":3==r?Ce:Ee,E||1==s?"middle":2==r?Se:Ae);let T=t.font[1]*t.lineGap,P=_.map(e=>m(o(e,p,f,g))),z=t._values;for(let e=0;e<z.length;e++){let t=z[e];if(null!=t){0==s?n=P[e]:i=P[e],t=""+t;let l=-1==t.indexOf("\n")?[t]:t.split(/\n/gm);for(let e=0;e<l.length;e++){let t=l[e];E?(h.save(),h.translate(n,i+e*T),h.rotate(E),h.fillText(t,0,0),h.restore()):h.fillText(t,n,i+e*T)}}}w.show&&Wn(P,w.filter(l,v,e,d,x),s,r,C,S,Jt(w.width*qe,3),w.stroke(l,e),w.dash,w.cap);let D=t.grid;D.show&&Wn(P,D.filter(l,v,e,d,x),s,0==s?2:1,0==s?fe:pe,0==s?me:ge,Jt(D.width*qe,3),D.stroke(l,e),D.dash,D.cap),$.show&&Wn([C],[1],0==s?1:0,0==s?1:2,1==s?fe:pe,1==s?me:ge,Jt($.width*qe,3),$.stroke(l,e),$.dash,$.cap)}Di("drawAxes")},series:function(){if(Rt>0){let e=v.some(e=>e._focus)&&vn!=tt.alpha;e&&(h.globalAlpha=vn=tt.alpha),v.forEach((e,n)=>{if(n>0&&e.show&&(Cn(n,!1),Cn(n,!0),null==e._paths)){let r=vn;vn!=e.alpha&&(h.globalAlpha=vn=e.alpha);let s=2==i?[0,t[n][0].length-1]:function(e){let t=Ht(Lt-1,0,Rt-1),n=Ht(Yt+1,0,Rt-1);for(;null==e[t]&&t>0;)t--;for(;null==e[n]&&n<Rt-1;)n++;return[t,n]}(t[n]);e._paths=e.paths(l,n,s[0],s[1]),vn!=r&&(h.globalAlpha=vn=r)}}),v.forEach((e,t)=>{if(t>0&&e.show){let n=vn;vn!=e.alpha&&(h.globalAlpha=vn=e.alpha),null!=e._paths&&Mn(t,!1);{let n=null!=e._paths?e._paths.gaps:null,i=e.points.show(l,t,Lt,Yt,n),r=e.points.filter(l,t,i,n);(i||r)&&(e.points._paths=e.points.paths(l,t,Lt,Yt,r),Mn(t,!0))}vn!=n&&(h.globalAlpha=vn=n),Di("drawSeries",t)}}),e&&(h.globalAlpha=vn=1)}}},k=(e.drawOrder||["axes","series"]).map(e=>$[e]);function S(e){const t=3==e.distr?t=>Dt(t>0?t:e.clamp(l,t,e.min,e.max,e.key)):4==e.distr?t=>Nt(t,e.asinh):100==e.distr?t=>e.fwd(t):e=>e;return n=>{let l=t(n),{_min:i,_max:r}=e;return(l-i)/(r-i)}}function A(t){let n=y[t];if(null==n){let l=(e.scales||tn)[t]||tn;if(null!=l.from){A(l.from);let e=pn({},y[l.from],l,{key:t});e.valToPct=S(e),y[t]=e}else{n=y[t]=pn({},t==w?Pl:zl,l),n.key=t;let e=n.time,r=n.range,s=rn(r);if((t!=w||2==i&&!e)&&(!s||null!=r[0]&&null!=r[1]||(r={min:null==r[0]?gt:{mode:1,hard:r[0],soft:r[0]},max:null==r[1]?gt:{mode:1,hard:r[1],soft:r[1]}},s=!1),!s&&an(r))){let e=r;r=(t,n,l)=>null==n?ln:vt(n,l,e)}n.range=Ft(r||(e?pi:t==w?3==n.distr?mi:4==n.distr?vi:di:3==n.distr?gi:4==n.distr?_i:fi)),n.auto=Ft(!s&&n.auto),n.clamp=Ft(n.clamp||Tl),n._min=n._max=null,n.valToPct=S(n)}}}A("x"),A("y"),1==i&&v.forEach(e=>{A(e.scale)}),b.forEach(e=>{A(e.scale)});for(let t in e.scales)A(t);const E=y[w],C=E.distr;let M,T;0==E.ori?(Ye(c,"u-hz"),M=r,T=s):(Ye(c,"u-vt"),M=s,T=r);const P={};for(let e in y){let t=y[e];null==t.min&&null==t.max||(P[e]={min:t.min,max:t.max},t.min=t.max=null)}const z=e.tzDate||(e=>new Date(Et(e/_))),D=e.fmtDate||kn,O=1==_?Bn(z):Vn(z),N=Zn(z,Gn(1==_?qn:Kn,D)),W=Xn(z,Qn("{YYYY}-{MM}-{DD} {h}:{mm}{aa}",D)),R=[],H=l.legend=pn({},el,e.legend),U=l.cursor=pn({},il,{drag:{y:2==i}},e.cursor),F=H.show,L=U.show,I=H.markers;let j,q,B;H.idxs=R,I.width=Ft(I.width),I.dash=Ft(I.dash),I.stroke=Ft(I.stroke),I.fill=Ft(I.fill);let Y,K=[],V=[],G=!1,Z={};if(H.live){const e=v[1]?v[1].values:null;G=null!=e,Y=G?e(l,1,0):{_:0};for(let e in Y)Z[e]=Ue}if(F)if(j=Ge("table","u-legend",c),B=Ge("tbody",null,j),H.mount(l,j),G){q=Ge("thead",null,j,B);let e=Ge("tr",null,q);for(var J in Ge("th",null,e),Y)Ge("th",we,e).textContent=J}else Ye(j,"u-inline"),H.live&&Ye(j,"u-live");const Q={show:!0},X={show:!1};const ee=new Map;function te(e,t,n,i=!0){const r=ee.get(t)||{},s=U.bind[e](l,t,n,i);s&&(rt(e,t,r[e]=s),ee.set(t,r))}function ne(e,t,n){const l=ee.get(t)||{};for(let n in l)null!=e&&n!=e||(st(n,t,l[n]),delete l[n]);null==e&&ee.delete(t)}let le=0,ie=0,re=0,se=0,oe=0,ae=0,ce=oe,ue=ae,he=re,de=se,pe=0,fe=0,ge=0,me=0;l.bbox={};let _e=!1,ve=!1,be=!1,ye=!1,Me=!1,Re=!1;function Fe(e,t,n){(n||e!=l.width||t!=l.height)&&je(e,t),Un(!1),be=!0,ve=!0,yl()}function je(e,t){l.width=le=re=e,l.height=ie=se=t,oe=ae=0,function(){let e=!1,t=!1,n=!1,l=!1;b.forEach((i,r)=>{if(i.show&&i._show){let{side:r,_size:s}=i,o=r%2,a=s+(null!=i.label?i.labelSize:0);a>0&&(o?(re-=a,3==r?(oe+=a,l=!0):n=!0):(se-=a,0==r?(ae+=a,e=!0):t=!0))}}),wt[0]=e,wt[1]=n,wt[2]=t,wt[3]=l,re-=Ot[1]+Ot[3],oe+=Ot[3],se-=Ot[2]+Ot[0],ae+=Ot[0]}(),function(){let e=oe+re,t=ae+se,n=oe,l=ae;function i(i,r){switch(i){case 1:return e+=r,e-r;case 2:return t+=r,t-r;case 3:return n-=r,n+r;case 0:return l-=r,l+r}}b.forEach((e,t)=>{if(e.show&&e._show){let t=e.side;e._pos=i(t,e._size),null!=e.label&&(e._lpos=i(t,e.labelSize))}})}();let n=l.bbox;pe=n.left=Vt(oe*qe,.5),fe=n.top=Vt(ae*qe,.5),ge=n.width=Vt(re*qe,.5),me=n.height=Vt(se*qe,.5)}const Be=3;if(l.setSize=function({width:e,height:t}){Fe(e,t)},null==U.dataIdx){let e=U.hover,n=e.skip=new Set(e.skip??[]);n.add(void 0);let l=e.prox=Ft(e.prox),i=e.bias??=0;U.dataIdx=(e,r,s,o)=>{if(0==r)return s;let a=s,c=l(e,r,s,o)??Wt,u=c>=0&&c<Wt,h=0==E.ori?re:se,d=U.left,p=t[0],f=t[r];if(n.has(f[s])){a=null;let e,t=null,l=null;if(0==i||-1==i)for(e=s;null==t&&e-- >0;)n.has(f[e])||(t=e);if(0==i||1==i)for(e=s;null==l&&e++<f.length;)n.has(f[e])||(l=e);if(null!=t||null!=l)if(u){let e=d-(null==t?-1/0:M(p[t],E,h,0)),n=(null==l?1/0:M(p[l],E,h,0))-d;e<=n?e<=c&&(a=t):n<=c&&(a=l)}else a=null==l?t:null==t?l:s-t<=l-s?t:l}else if(u){St(d-M(p[s],E,h,0))>c&&(a=null)}return a}}const Je=e=>{U.event=e};U.idxs=R,U._lock=!1;let Xe=U.points;Xe.show=Ft(Xe.show),Xe.size=Ft(Xe.size),Xe.stroke=Ft(Xe.stroke),Xe.width=Ft(Xe.width),Xe.fill=Ft(Xe.fill);const tt=l.focus=pn({},e.focus||{alpha:.3},U.focus),lt=tt.prox>=0,it=lt&&Xe.one;let at=[],mt=[],_t=[];function yt(e,t){let n=Xe.show(l,t);if(n instanceof HTMLElement)return Ye(n,"u-cursor-pt"),Ye(n,e.class),Qe(n,-10,-10,re,se),f.insertBefore(n,at[t]),n}function xt(e,t){if(1==i||t>0){let t=1==i&&y[e.scale].time,n=e.value;e.value=t?on(n)?Xn(z,Qn(n,D)):n||W:n||kl,e.label=e.label||(t?"Time":"Value")}if(it||t>0){e.width=null==e.width?1:e.width,e.paths=e.paths||ai||jt,e.fillTo=Ft(e.fillTo||Rl),e.pxAlign=+bt(e.pxAlign,g),e.pxRound=Ll(e.pxAlign),e.stroke=Ft(e.stroke||null),e.fill=Ft(e.fill||null),e._stroke=e._fill=e._paths=e._focus=null;let t=Jt((3+2*(Tt(1,e.width)||1))*1,3),n=e.points=pn({},{size:t,width:Tt(1,.2*t),stroke:e.stroke,space:2*t,paths:ci,_stroke:null,_fill:null},e.points);n.show=Ft(n.show),n.filter=Ft(n.filter),n.fill=Ft(n.fill),n.stroke=Ft(n.stroke),n.paths=Ft(n.paths),n.pxAlign=e.pxAlign}if(F){let n=function(e,t){if(0==t&&(G||!H.live||2==i))return ln;let n=[],r=Ge("tr","u-series",B,B.childNodes[t]);Ye(r,e.class),e.show||Ye(r,xe);let s=Ge("th",null,r);if(I.show){let e=Ze("u-marker",s);if(t>0){let n=I.width(l,t);n&&(e.style.border=n+"px "+I.dash(l,t)+" "+I.stroke(l,t)),e.style.background=I.fill(l,t)}}let o=Ze(we,s);for(var a in e.label instanceof HTMLElement?o.appendChild(e.label):o.textContent=e.label,t>0&&(I.show||(o.style.color=e.width>0?I.stroke(l,t):I.fill(l,t)),te("click",s,t=>{if(U._lock)return;Je(t);let n=v.indexOf(e);if((t.ctrlKey||t.metaKey)!=H.isolate){let e=v.some((e,t)=>t>0&&t!=n&&e.show);v.forEach((t,l)=>{l>0&&jl(l,e?l==n?Q:X:Q,!0,Ni.setSeries)})}else jl(n,{show:!e.show},!0,Ni.setSeries)},!1),lt&&te(Oe,s,t=>{U._lock||(Je(t),jl(v.indexOf(e),Kl,!0,Ni.setSeries))},!1)),Y){let e=Ge("td","u-value",r);e.textContent="--",n.push(e)}return[r,n]}(e,t);K.splice(t,0,n[0]),V.splice(t,0,n[1]),H.values.push(null)}if(L){R.splice(t,0,null);let n=null;it?0==t&&(n=yt(e,t)):t>0&&(n=yt(e,t)),at.splice(t,0,n),mt.splice(t,0,0),_t.splice(t,0,0)}Di("addSeries",t)}l.addSeries=function(e,t){t=t??v.length,e=1==i?hi(e,t,dl,Ml):hi(e,t,{},Cl),v.splice(t,0,e),xt(v[t],t)},l.delSeries=function(e){if(v.splice(e,1),F){H.values.splice(e,1),V.splice(e,1);let t=K.splice(e,1)[0];ne(null,t.firstChild),t.remove()}L&&(R.splice(e,1),at.splice(e,1)[0].remove(),mt.splice(e,1),_t.splice(e,1)),Di("delSeries",e)};const wt=[!1,!1,!1,!1];function At(e,t,n,l){let[i,r,s,o]=n,a=t%2,c=0;return 0==a&&(o||r)&&(c=0==t&&!i||2==t&&!s?Et(hl.size/3):0),1==a&&(i||s)&&(c=1==t&&!r||3==t&&!o?Et(Sl.size/2):0),c}const zt=l.padding=(e.padding||[At,At,At,At]).map(e=>Ft(bt(e,At))),Ot=l._padding=zt.map((e,t)=>e(l,t,wt,0));let Rt,Lt=null,Yt=null;const Kt=1==i?v[0].idxs:null;let Gt,Zt,en,sn,un,hn,fn,mn,_n,vn,bn=null,yn=!1;function xn(e,n){if(t=e??[],l.data=l._data=t,2==i){Rt=0;for(let e=1;e<v.length;e++)Rt+=t[e][0].length}else{0==t.length&&(l.data=l._data=t=[[]]),bn=t[0],Rt=bn.length;let e=t;if(2==C){e=t.slice();let n=e[0]=Array(Rt);for(let e=0;e<Rt;e++)n[e]=e}l._data=t=e}if(Un(!0),Di("setData"),2==C&&(be=!0),!1!==n){let e=E;e.auto(l,yn)?wn():Il(w,e.min,e.max),ye=ye||U.left>=0,Re=!0,yl()}}function wn(){let e,n;yn=!0,1==i&&(Rt>0?(Lt=Kt[0]=0,Yt=Kt[1]=Rt-1,e=t[0][Lt],n=t[0][Yt],2==C?(e=Lt,n=Yt):e==n&&(3==C?[e,n]=pt(e,e,E.log,!1):4==C?[e,n]=ft(e,e,E.log,!1):E.time?n=e+Et(86400/_):[e,n]=vt(e,n,.1,!0))):(Lt=Kt[0]=e=null,Yt=Kt[1]=n=null)),Il(w,e,n)}function $n(e,t,n,l,i,r){e??=Te,n??=nn,l??="butt",i??=Te,r??="round",e!=Gt&&(h.strokeStyle=Gt=e),i!=Zt&&(h.fillStyle=Zt=i),t!=en&&(h.lineWidth=en=t),r!=un&&(h.lineJoin=un=r),l!=hn&&(h.lineCap=hn=l),n!=sn&&h.setLineDash(sn=n)}function Sn(e,t,n,l){t!=Zt&&(h.fillStyle=Zt=t),e!=fn&&(h.font=fn=e),n!=mn&&(h.textAlign=mn=n),l!=_n&&(h.textBaseline=_n=l)}function An(e,t,n,i,r=0){if(i.length>0&&e.auto(l,yn)&&(null==t||null==t.min)){let t=bt(Lt,0),l=bt(Yt,i.length-1),s=null==n.min?function(e,t,n,l=0,i=!1){let r=i?dt:ht,s=i?ut:ct;[t,n]=r(e,t,n);let o=e[t],a=e[t];if(t>-1)if(1==l)o=e[t],a=e[n];else if(-1==l)o=e[n],a=e[t];else for(let l=t;l<=n;l++){let t=e[l];s(t)&&(t<o?o=t:t>a&&(a=t))}return[o??Wt,a??-Wt]}(i,t,l,r,3==e.distr):[n.min,n.max];e.min=Mt(e.min,n.min=s[0]),e.max=Tt(e.max,n.max=s[1])}}l.setData=xn;const En={min:null,max:null};function Cn(e,t){let n=t?v[e].points:v[e];n._stroke=n.stroke(l,e),n._fill=n.fill(l,e)}function Mn(e,n){let i=n?v[e].points:v[e],{stroke:r,fill:s,clip:o,flags:a,_stroke:c=i._stroke,_fill:u=i._fill,_width:d=i.width}=i._paths;d=Jt(d*qe,3);let p=null,f=d%2/2;n&&null==u&&(u=d>0?"#fff":c);let g=1==i.pxAlign&&f>0;if(g&&h.translate(f,f),!n){let e=pe-d/2,t=fe-d/2,n=ge+d,l=me+d;p=new Path2D,p.rect(e,t,n,l)}n?Dn(c,d,i.dash,i.cap,u,r,s,a,o):function(e,n,i,r,s,o,a,c,u,h,d){let p=!1;0!=u&&x.forEach((f,g)=>{if(f.series[0]==e){let e,m=v[f.series[1]],_=t[f.series[1]],b=(m._paths||tn).band;rn(b)&&(b=1==f.dir?b[0]:b[1]);let y=null;m.show&&b&&function(e,t,n){for(t=bt(t,0),n=bt(n,e.length-1);t<=n;){if(null!=e[t])return!0;t++}return!1}(_,Lt,Yt)?(y=f.fill(l,g)||o,e=m._paths.clip):b=null,Dn(n,i,r,s,y,a,c,u,h,d,e,b),p=!0}}),p||Dn(n,i,r,s,o,a,c,u,h,d)}(e,c,d,i.dash,i.cap,u,r,s,a,p,o),g&&h.translate(-f,-f)}const zn=3;function Dn(e,t,n,l,i,r,s,o,a,c,u,d){$n(e,t,n,l,i),(a||c||d)&&(h.save(),a&&h.clip(a),c&&h.clip(c)),d?(o&zn)==zn?(h.clip(d),u&&h.clip(u),Nn(i,s),On(e,r,t)):2&o?(Nn(i,s),h.clip(d),On(e,r,t)):1&o&&(h.save(),h.clip(d),u&&h.clip(u),Nn(i,s),h.restore(),On(e,r,t)):(Nn(i,s),On(e,r,t)),(a||c||d)&&h.restore()}function On(e,t,n){n>0&&(t instanceof Map?t.forEach((e,t)=>{h.strokeStyle=Gt=t,h.stroke(e)}):null!=t&&e&&h.stroke(t))}function Nn(e,t){t instanceof Map?t.forEach((e,t)=>{h.fillStyle=Zt=t,h.fill(e)}):null!=t&&e&&h.fill(t)}function Wn(e,t,n,l,i,r,s,o,a,c){let u=s%2/2;1==g&&h.translate(u,u),$n(o,s,a,c,o),h.beginPath();let d,p,f,m,_=i+(0==l||3==l?-r:r);0==n?(p=i,m=_):(d=i,f=_);for(let l=0;l<e.length;l++)null!=t[l]&&(0==n?d=f=e[l]:p=m=e[l],h.moveTo(d,p),h.lineTo(f,m));h.stroke(),1==g&&h.translate(-u,-u)}function Rn(e){let t=!0;return b.forEach((n,i)=>{if(!n.show)return;let r=y[n.scale];if(null==r.min)return void(n._show&&(t=!1,n._show=!1,Un(!1)));n._show||(t=!1,n._show=!0,Un(!1));let s=n.side,o=s%2,{min:a,max:c}=r,[u,h]=function(e,t,n,i){let r,s=b[e];if(i<=0)r=[0,0];else{let o=s._space=s.space(l,e,t,n,i);r=bi(t,n,s._incrs=s.incrs(l,e,t,n,i,o),i,o)}return s._found=r}(i,a,c,0==o?re:se);if(0==h)return;let d=2==r.distr,p=n._splits=n.splits(l,i,a,c,u,h,d),f=2==r.distr?p.map(e=>bn[e]):p,g=2==r.distr?bn[p[1]]-bn[p[0]]:u,m=n._values=n.values(l,n.filter(l,f,i,h,g),i,h,g);n._rotate=2==s?n.rotate(l,m,i,h):0;let _=n._size;n._size=Ct(n.size(l,m,i,e)),null!=_&&n._size!=_&&(t=!1)}),t}function Hn(e){let t=!0;return zt.forEach((n,i)=>{let r=n(l,i,wt,e);r!=Ot[i]&&(t=!1),Ot[i]=r}),t}function Un(e){v.forEach((t,n)=>{n>0&&(t._paths=null,e&&(1==i?(t.min=null,t.max=null):t.facets.forEach(e=>{e.min=null,e.max=null})))})}let Fn,Ln,In,Jn,tl,nl,ll,rl,sl,ol,al,cl,ul=!1,_l=!1,vl=[];function bl(){_l=!1;for(let e=0;e<vl.length;e++)Di(...vl[e]);vl.length=0}function yl(){ul||(gn(xl),ul=!0)}function xl(){if(_e&&(!function(){for(let e in y){let t=y[e];null==P[e]&&(null==t.min||null!=P[w]&&t.auto(l,yn))&&(P[e]=En)}for(let e in y){let t=y[e];null==P[e]&&null!=t.from&&null!=P[t.from]&&(P[e]=En)}null!=P[w]&&Un(!0);let e={};for(let t in P){let n=P[t];if(null!=n){let r=e[t]=dn(y[t],cn);if(null!=n.min)pn(r,n);else if(t!=w||2==i)if(0==Rt&&null==r.from){let e=r.range(l,null,null,t);r.min=e[0],r.max=e[1]}else r.min=Wt,r.max=-Wt}}if(Rt>0){v.forEach((n,r)=>{if(1==i){let i=n.scale,s=P[i];if(null==s)return;let o=e[i];if(0==r){let e=o.range(l,o.min,o.max,i);o.min=e[0],o.max=e[1],Lt=ot(o.min,t[0]),Yt=ot(o.max,t[0]),Yt-Lt>1&&(t[0][Lt]<o.min&&Lt++,t[0][Yt]>o.max&&Yt--),n.min=bn[Lt],n.max=bn[Yt]}else n.show&&n.auto&&An(o,s,n,t[r],n.sorted);n.idxs[0]=Lt,n.idxs[1]=Yt}else if(r>0&&n.show&&n.auto){let[l,i]=n.facets,s=l.scale,o=i.scale,[a,c]=t[r],u=e[s],h=e[o];null!=u&&An(u,P[s],l,a,l.sorted),null!=h&&An(h,P[o],i,c,i.sorted),n.min=i.min,n.max=i.max}});for(let t in e){let n=e[t],i=P[t];if(null==n.from&&(null==i||null==i.min)){let e=n.range(l,n.min==Wt?null:n.min,n.max==-Wt?null:n.max,t);n.min=e[0],n.max=e[1]}}}for(let t in e){let n=e[t];if(null!=n.from){let i=e[n.from];if(null==i.min)n.min=n.max=null;else{let e=n.range(l,i.min,i.max,t);n.min=e[0],n.max=e[1]}}}let n={},r=!1;for(let t in e){let l=e[t],i=y[t];if(i.min!=l.min||i.max!=l.max){i.min=l.min,i.max=l.max;let e=i.distr;i._min=3==e?Dt(i.min):4==e?Nt(i.min,i.asinh):100==e?i.fwd(i.min):i.min,i._max=3==e?Dt(i.max):4==e?Nt(i.max,i.asinh):100==e?i.fwd(i.max):i.max,n[t]=r=!0}}if(r){v.forEach((e,t)=>{2==i?t>0&&n.y&&(e._paths=null):n[e.scale]&&(e._paths=null)});for(let e in n)be=!0,Di("setScale",e);L&&U.left>=0&&(ye=Re=!0)}for(let e in P)P[e]=null}(),_e=!1),be&&(!function(){let e=!1,t=0;for(;!e;){t++;let n=Rn(t),i=Hn(t);e=t==Be||n&&i,e||(je(l.width,l.height),ve=!0)}}(),be=!1),ve){if(Ve(p,Ee,oe),Ve(p,Se,ae),Ve(p,$e,re),Ve(p,ke,se),Ve(f,Ee,oe),Ve(f,Se,ae),Ve(f,$e,re),Ve(f,ke,se),Ve(d,$e,le),Ve(d,ke,ie),u.width=Et(le*qe),u.height=Et(ie*qe),b.forEach(({_el:e,_show:t,_size:n,_pos:l,side:i})=>{if(null!=e)if(t){let t=i%2==1;Ve(e,t?"left":"top",l-(3===i||0===i?n:0)),Ve(e,t?"width":"height",n),Ve(e,t?"top":"left",t?ae:oe),Ve(e,t?"height":"width",t?se:re),Ke(e,xe)}else Ye(e,xe)}),Gt=Zt=en=un=hn=fn=mn=_n=sn=null,vn=1,li(!0),oe!=ce||ae!=ue||re!=he||se!=de){Un(!1);let e=re/he,t=se/de;if(L&&!ye&&U.left>=0){U.left*=e,U.top*=t,In&&Qe(In,Et(U.left),0,re,se),Jn&&Qe(Jn,0,Et(U.top),re,se);for(let n=0;n<at.length;n++){let l=at[n];null!=l&&(mt[n]*=e,_t[n]*=t,Qe(l,Ct(mt[n]),Ct(_t[n]),re,se))}}if(Hl.show&&!Me&&Hl.left>=0&&Hl.width>0){Hl.left*=e,Hl.width*=e,Hl.top*=t,Hl.height*=t;for(let e in oi)Ve(Ul,e,Hl[e])}ce=oe,ue=ae,he=re,de=se}Di("setSize"),ve=!1}le>0&&ie>0&&(h.clearRect(0,0,u.width,u.height),Di("drawClear"),k.forEach(e=>e()),Di("draw")),Hl.show&&Me&&(Fl(Hl),Me=!1),L&&ye&&(ti(null,!0,!1),ye=!1),H.show&&H.live&&Re&&(Xl(),Re=!1),a||(a=!0,l.status=1,Di("ready")),yn=!1,ul=!1}function Al(e,n){let i=y[e];if(null==i.from){if(0==Rt){let t=i.range(l,n.min,n.max,e);n.min=t[0],n.max=t[1]}if(n.min>n.max){let e=n.min;n.min=n.max,n.max=e}if(Rt>1&&null!=n.min&&null!=n.max&&n.max-n.min<1e-16)return;e==w&&2==i.distr&&Rt>0&&(n.min=ot(n.min,t[0]),n.max=ot(n.max,t[0]),n.min==n.max&&n.max++),P[e]=n,_e=!0,yl()}}l.batch=function(e,t=!1){ul=!0,_l=t,e(l),xl(),t&&vl.length>0&&queueMicrotask(bl)},l.redraw=(e,t)=>{be=t||!1,!1!==e?Il(w,E.min,E.max):yl()},l.setScale=Al;let El=!1;const Dl=U.drag;let Nl=Dl.x,Wl=Dl.y;L&&(U.x&&(Fn=Ze("u-cursor-x",f)),U.y&&(Ln=Ze("u-cursor-y",f)),0==E.ori?(In=Fn,Jn=Ln):(In=Ln,Jn=Fn),al=U.left,cl=U.top);const Hl=l.select=pn({show:!0,over:!0,left:0,width:0,top:0,height:0},e.select),Ul=Hl.show?Ze("u-select",Hl.over?f:p):null;function Fl(e,t){if(Hl.show){for(let t in e)Hl[t]=e[t],t in oi&&Ve(Ul,t,e[t]);!1!==t&&Di("setSelect")}}function Il(e,t,n){Al(e,{min:t,max:n})}function jl(e,t,n,r){null!=t.focus&&function(e){if(e!=Yl){let t=null==e,n=1!=tt.alpha;v.forEach((l,r)=>{if(1==i||r>0){let i=t||0==r||r==e;l._focus=t?null:i,n&&function(e,t){v[e].alpha=t,L&&null!=at[e]&&(at[e].style.opacity=t);F&&K[e]&&(K[e].style.opacity=t)}(r,i?1:tt.alpha)}}),Yl=e,n&&yl()}}(e),null!=t.show&&v.forEach((n,l)=>{l>0&&(e==l||null==e)&&(n.show=t.show,function(e){if(v[e].show)F&&Ke(K[e],xe);else if(F&&Ye(K[e],xe),L){let t=it?at[0]:at[e];null!=t&&Qe(t,-10,-10,re,se)}}(l),2==i?(Il(n.facets[0].scale,null,null),Il(n.facets[1].scale,null,null)):Il(n.scale,null,null),yl())}),!1!==n&&Di("setSeries",e,t),r&&Hi("setSeries",l,e,t)}let ql,Bl,Yl;l.setSelect=Fl,l.setSeries=jl,l.addBand=function(e,t){e.fill=Ft(e.fill||null),e.dir=bt(e.dir,-1),t=t??x.length,x.splice(t,0,e)},l.setBand=function(e,t){pn(x[e],t)},l.delBand=function(e){null==e?x.length=0:x.splice(e,1)};const Kl={focus:!0};function Vl(e,t,n){let l=y[t];n&&(e=e/qe-(1==l.ori?ae:oe));let i=re;1==l.ori&&(i=se,e=i-e),-1==l.dir&&(e=i-e);let r=l._min,s=r+(l._max-r)*(e/i),o=l.distr;return 3==o?Pt(10,s):4==o?((e,t=1)=>$t.sinh(e)*t)(s,l.asinh):100==o?l.bwd(s):s}function Gl(e,t){Ve(Ul,Ee,Hl.left=e),Ve(Ul,$e,Hl.width=t)}function Zl(e,t){Ve(Ul,Se,Hl.top=e),Ve(Ul,ke,Hl.height=t)}F&&lt&&te(Ne,j,e=>{U._lock||(Je(e),null!=Yl&&jl(null,Kl,!0,Ni.setSeries))}),l.valToIdx=e=>ot(e,t[0]),l.posToIdx=function(e,n){return ot(Vl(e,w,n),t[0],Lt,Yt)},l.posToVal=Vl,l.valToPos=(e,t,n)=>0==y[t].ori?r(e,y[t],n?ge:re,n?pe:0):s(e,y[t],n?me:se,n?fe:0),l.setCursor=(e,t,n)=>{al=e.left,cl=e.top,ti(null,t,n)};let Jl=0==E.ori?Gl:Zl,Ql=1==E.ori?Gl:Zl;function Xl(e,t){if(null!=e&&(e.idxs?e.idxs.forEach((e,t)=>{R[t]=e}):(e=>void 0===e)(e.idx)||R.fill(e.idx),H.idx=R[0]),F&&H.live){for(let e=0;e<v.length;e++)(e>0||1==i&&!G)&&ei(e,R[e]);!function(){if(F&&H.live)for(let e=2==i?1:0;e<v.length;e++){if(0==e&&G)continue;let t=H.values[e],n=0;for(let l in t)V[e][n++].firstChild.nodeValue=t[l]}}()}Re=!1,!1!==t&&Di("setLegend")}function ei(e,n){let i,r=v[e],s=0==e&&2==C?bn:t[e];G?i=r.values(l,e,n)??Z:(i=r.value(l,null==n?null:s[n],e,n),i=null==i?Z:{_:i}),H.values[e]=i}function ti(e,n,r){let s;sl=al,ol=cl,[al,cl]=U.move(l,al,cl),U.left=al,U.top=cl,L&&(In&&Qe(In,Et(al),0,re,se),Jn&&Qe(Jn,0,Et(cl),re,se));let o=Lt>Yt;ql=Wt,Bl=null;let a=0==E.ori?re:se,c=1==E.ori?re:se;if(al<0||0==Rt||o){s=U.idx=null;for(let e=0;e<v.length;e++){let t=at[e];null!=t&&Qe(t,-10,-10,re,se)}lt&&jl(null,Kl,!0,null==e&&Ni.setSeries),H.live&&(R.fill(s),Re=!0)}else{let e,n,r;1==i&&(e=0==E.ori?al:cl,n=Vl(e,w),s=U.idx=ot(n,t[0],Lt,Yt),r=M(t[0][s],E,a,0));let o=-10,u=-10,h=0,d=0,p=!0,f="",g="";for(let e=2==i?1:0;e<v.length;e++){let m=v[e],_=R[e],b=null==_?null:1==i?t[e][_]:t[e][1][_],x=U.dataIdx(l,e,s,n),w=null==x?null:1==i?t[e][x]:t[e][1][x];if(Re=Re||w!=b||x!=_,R[e]=x,e>0&&m.show){let n=null==x?-10:x==s?r:M(1==i?t[0][x]:t[e][0][x],E,a,0),_=null==w?-10:T(w,1==i?y[m.scale]:y[m.facets[1].scale],c,0);if(lt&&null!=w){let t=1==E.ori?al:cl,n=St(tt.dist(l,e,x,_,t));if(n<ql){let l=tt.bias;if(0!=l){let i=Vl(t,m.scale),r=i>=0?1:-1;r==(w>=0?1:-1)&&(1==r?1==l?w>=i:w<=i:1==l?w<=i:w>=i)&&(ql=n,Bl=e)}else ql=n,Bl=e}}if(Re||it){let t,i;0==E.ori?(t=n,i=_):(t=_,i=n);let r,s,a,c,m,v,b=!0,y=Xe.bbox;if(null!=y){b=!1;let t=y(l,e);a=t.left,c=t.top,r=t.width,s=t.height}else a=t,c=i,r=s=Xe.size(l,e);if(v=Xe.fill(l,e),m=Xe.stroke(l,e),it)e==Bl&&ql<=tt.prox&&(o=a,u=c,h=r,d=s,p=b,f=v,g=m);else{let t=at[e];null!=t&&(mt[e]=a,_t[e]=c,nt(t,r,s,b),et(t,v,m),Qe(t,Ct(a),Ct(c),re,se))}}}}if(it){let e=tt.prox;if(Re||(null==Yl?ql<=e:ql>e||Bl!=Yl)){let e=at[0];null!=e&&(mt[0]=o,_t[0]=u,nt(e,h,d,p),et(e,f,g),Qe(e,Ct(o),Ct(u),re,se))}}}if(Hl.show&&El)if(null!=e){let[t,n]=Ni.scales,[l,i]=Ni.match,[r,s]=e.cursor.sync.scales,o=e.cursor.drag;if(Nl=o._x,Wl=o._y,Nl||Wl){let o,u,h,d,p,{left:f,top:g,width:m,height:_}=e.select,v=e.scales[r].ori,b=e.posToVal,x=null!=t&&l(t,r),w=null!=n&&i(n,s);x&&Nl?(0==v?(o=f,u=m):(o=g,u=_),h=y[t],d=M(b(o,r),h,a,0),p=M(b(o+u,r),h,a,0),Jl(Mt(d,p),St(p-d))):Jl(0,a),w&&Wl?(1==v?(o=f,u=m):(o=g,u=_),h=y[n],d=T(b(o,s),h,c,0),p=T(b(o+u,s),h,c,0),Ql(Mt(d,p),St(p-d))):Ql(0,c)}else wi()}else{let e=St(sl-tl),t=St(ol-nl);if(1==E.ori){let n=e;e=t,t=n}Nl=Dl.x&&e>=Dl.dist,Wl=Dl.y&&t>=Dl.dist;let n,l,i=Dl.uni;null!=i?Nl&&Wl&&(Nl=e>=i,Wl=t>=i,Nl||Wl||(t>e?Wl=!0:Nl=!0)):Dl.x&&Dl.y&&(Nl||Wl)&&(Nl=Wl=!0),Nl&&(0==E.ori?(n=ll,l=al):(n=rl,l=cl),Jl(Mt(n,l),St(l-n)),Wl||Ql(0,c)),Wl&&(1==E.ori?(n=ll,l=al):(n=rl,l=cl),Ql(Mt(n,l),St(l-n)),Nl||Jl(0,a)),Nl||Wl||(Jl(0,0),Ql(0,0))}if(Dl._x=Nl,Dl._y=Wl,null==e){if(r){if(null!=Wi){let[e,t]=Ni.scales;Ni.values[0]=null!=e?Vl(0==E.ori?al:cl,e):null,Ni.values[1]=null!=t?Vl(1==E.ori?al:cl,t):null}Hi(Pe,l,al,cl,re,se,s)}if(lt){let e=r&&Ni.setSeries,t=tt.prox;null==Yl?ql<=t&&jl(Bl,Kl,!0,e):ql>t?jl(null,Kl,!0,e):Bl!=Yl&&jl(Bl,Kl,!0,e)}}Re&&(H.idx=s,Xl()),!1!==n&&Di("setCursor")}l.setLegend=Xl;let ni=null;function li(e=!1){e?ni=null:(ni=f.getBoundingClientRect(),Di("syncRect",ni))}function ii(e,t,n,l,i,r,s){U._lock||El&&null!=e&&0==e.movementX&&0==e.movementY||(ri(e,t,n,l,i,r,s,!1,null!=e),null!=e?ti(null,!0,!0):ti(t,!0,!1))}function ri(e,t,n,i,r,s,a,c,u){if(null==ni&&li(!1),Je(e),null!=e)n=e.clientX-ni.left,i=e.clientY-ni.top;else{if(n<0||i<0)return al=-10,void(cl=-10);let[e,l]=Ni.scales,a=t.cursor.sync,[c,u]=a.values,[h,d]=a.scales,[p,f]=Ni.match,g=t.axes[0].side%2==1,m=0==E.ori?re:se,_=1==E.ori?re:se,v=g?s:r,b=g?r:s,x=g?i:n,w=g?n:i;if(n=null!=h?p(e,h)?o(c,y[e],m,0):-10:m*(x/v),i=null!=d?f(l,d)?o(u,y[l],_,0):-10:_*(w/b),1==E.ori){let e=n;n=i,i=e}}!u||null!=t&&t.cursor.event.type!=Pe||((n<=1||n>=re-1)&&(n=Vt(n,re)),(i<=1||i>=se-1)&&(i=Vt(i,se))),c?(tl=n,nl=i,[ll,rl]=U.move(l,n,i)):(al=n,cl=i)}Object.defineProperty(l,"rect",{get:()=>(null==ni&&li(!1),ni)});const oi={width:0,height:0,left:0,top:0};function wi(){Fl(oi,!1)}let $i,ki,Si,Ai;function Ei(e,t,n,i,r,s,o){El=!0,Nl=Wl=Dl._x=Dl._y=!1,ri(e,t,n,i,r,s,0,!0,!1),null!=e&&(te(De,Le,Ci,!1),Hi(ze,l,ll,rl,re,se,null));let{left:a,top:c,width:u,height:h}=Hl;$i=a,ki=c,Si=u,Ai=h}function Ci(e,t,n,i,r,s,o){El=Dl._x=Dl._y=!1,ri(e,t,n,i,r,s,0,!1,!0);let{left:a,top:c,width:u,height:h}=Hl,d=u>0||h>0,p=$i!=a||ki!=c||Si!=u||Ai!=h;if(d&&p&&Fl(Hl),Dl.setScale&&d&&p){let e=a,t=u,n=c,l=h;if(1==E.ori&&(e=c,t=h,n=a,l=u),Nl&&Il(w,Vl(e,w),Vl(e+t,w)),Wl)for(let e in y){let t=y[e];e!=w&&null==t.from&&t.min!=Wt&&Il(e,Vl(n+l,e),Vl(n,e))}wi()}else U.lock&&(U._lock=!U._lock,ti(t,!0,null!=e));null!=e&&(ne(De,Le),Hi(De,l,al,cl,re,se,null))}function Mi(e,t,n,i,r,s,o){U._lock||(Je(e),wn(),wi(),null!=e&&Hi(We,l,al,cl,re,se,null))}function Ti(){b.forEach(xi),Fe(l.width,l.height,!0)}rt(He,Ie,Ti);const Pi={};Pi.mousedown=Ei,Pi.mousemove=ii,Pi.mouseup=Ci,Pi.dblclick=Mi,Pi.setSeries=(e,t,n,i)=>{-1!=(n=(0,Ni.match[2])(l,t,n))&&jl(n,i,!0,!1)},L&&(te(ze,f,Ei),te(Pe,f,ii),te(Oe,f,e=>{Je(e),li(!1)}),te(Ne,f,function(e,t,n,l,i,r,s){if(U._lock)return;Je(e);let o=El;if(El){let e,t,n=!0,l=!0,i=10;0==E.ori?(e=Nl,t=Wl):(e=Wl,t=Nl),e&&t&&(n=al<=i||al>=re-i,l=cl<=i||cl>=se-i),e&&n&&(al=al<ll?0:re),t&&l&&(cl=cl<rl?0:se),ti(null,!0,!0),El=!1}al=-10,cl=-10,R.fill(null),ti(null,!0,!0),o&&(El=o)}),te(We,f,Mi),si.add(l),l.syncRect=li);const zi=l.hooks=e.hooks||{};function Di(e,t,n){_l?vl.push([e,t,n]):e in zi&&zi[e].forEach(e=>{e.call(null,l,t,n)})}(e.plugins||[]).forEach(e=>{for(let t in e.hooks)zi[t]=(zi[t]||[]).concat(e.hooks[t])});const Oi=(e,t,n)=>n,Ni=pn({key:null,setSeries:!1,filters:{pub:qt,sub:qt},scales:[w,v[1]?v[1].scale:null],match:[Bt,Bt,Oi],values:[null,null]},U.sync);2==Ni.match.length&&Ni.match.push(Oi),U.sync=Ni;const Wi=Ni.key,Ri=Ol(Wi);function Hi(e,t,n,l,i,r,s){Ni.filters.pub(e,t,n,l,i,r,s)&&Ri.pub(e,t,n,l,i,r,s)}function Ui(){Di("init",e,t),xn(t||e.data,!1),P[w]?Al(w,P[w]):wn(),Me=Hl.show&&(Hl.width>0||Hl.height>0),ye=Re=!0,Fe(e.width,e.height)}return Ri.sub(l),l.pub=function(e,t,n,l,i,r,s){Ni.filters.sub(e,t,n,l,i,r,s)&&Pi[e](null,t,n,l,i,r,s)},l.destroy=function(){Ri.unsub(l),si.delete(l),ee.clear(),st(He,Ie,Ti),c.remove(),j?.remove(),Di("destroy")},v.forEach(xt),b.forEach(function(e,t){if(e._show=e.show,e.show){let n=e.side%2,i=y[e.scale];null==i&&(e.scale=n?v[1].scale:w,i=y[e.scale]);let r=i.time;e.size=Ft(e.size),e.space=Ft(e.space),e.rotate=Ft(e.rotate),rn(e.incrs)&&e.incrs.forEach(e=>{!Qt.has(e)&&Qt.set(e,Xt(e))}),e.incrs=Ft(e.incrs||(2==i.distr?Tn:r?1==_?jn:Yn:Pn)),e.splits=Ft(e.splits||(r&&1==i.distr?O:3==i.distr?gl:4==i.distr?ml:fl)),e.stroke=Ft(e.stroke),e.grid.stroke=Ft(e.grid.stroke),e.ticks.stroke=Ft(e.ticks.stroke),e.border.stroke=Ft(e.border.stroke);let s=e.values;e.values=rn(s)&&!rn(s[0])?Ft(s):r?rn(s)?Zn(z,Gn(s,D)):on(s)?function(e,t){let n=kn(t);return(t,l,i,r,s)=>l.map(t=>n(e(t)))}(z,s):s||N:s||pl,e.filter=Ft(e.filter||(i.distr>=3&&10==i.log?wl:3==i.distr&&2==i.log?$l:It)),e.font=yi(e.font),e.labelFont=yi(e.labelFont),e._size=e.size(l,null,t,0),e._space=e._rotate=e._incrs=e._found=e._splits=e._values=null,e._size>0&&(wt[t]=!0,e._el=Ze("u-axis",d))}}),n?n instanceof HTMLElement?(n.appendChild(c),Ui()):n(l,Ui):Ui(),l}wi.assign=pn,wi.fmtNum=wt,wi.rangeNum=vt,wi.rangeLog=pt,wi.rangeAsinh=ft,wi.orient=Nl,wi.pxRatio=qe,wi.join=function(e,t){if(function(e){let t=e[0][0],n=t.length;for(let l=1;l<e.length;l++){let i=e[l][0];if(i.length!=n)return!1;if(i!=t)for(let e=0;e<n;e++)if(i[e]!=t[e])return!1}return!0}(e)){let t=e[0].slice();for(let n=1;n<e.length;n++)t.push(...e[n].slice(1));return function(e,t=100){const n=e.length;if(n<=1)return!0;let l=0,i=n-1;for(;l<=i&&null==e[l];)l++;for(;i>=l&&null==e[i];)i--;if(i<=l)return!0;const r=Tt(1,At((i-l+1)/t));for(let t=e[l],n=l+r;n<=i;n+=r){const l=e[n];if(null!=l){if(l<=t)return!1;t=l}}return!0}(t[0])||(t=function(e){let t=e[0],n=t.length,l=Array(n);for(let e=0;e<l.length;e++)l[e]=e;l.sort((e,n)=>t[e]-t[n]);let i=[];for(let t=0;t<e.length;t++){let r=e[t],s=Array(n);for(let e=0;e<n;e++)s[e]=r[l[e]];i.push(s)}return i}(t)),t}let n=new Set;for(let t=0;t<e.length;t++){let l=e[t][0],i=l.length;for(let e=0;e<i;e++)n.add(l[e])}let l=[Array.from(n).sort((e,t)=>e-t)],i=l[0].length,r=new Map;for(let e=0;e<i;e++)r.set(l[0][e],e);for(let n=0;n<e.length;n++){let s=e[n],o=s[0];for(let e=1;e<s.length;e++){let a=s[e],c=Array(i).fill(void 0),u=t?t[n][e]:1,h=[];for(let e=0;e<a.length;e++){let t=a[e],n=r.get(o[e]);null===t?0!=u&&(c[n]=t,2==u&&h.push(n)):c[n]=t}fn(c,h,i),l.push(c)}}return l},wi.fmtDate=kn,wi.tzDate=function(e,t){let n;return"UTC"==t||"Etc/UTC"==t?n=new Date(+e+6e4*e.getTimezoneOffset()):t==Sn?n=e:(n=new Date(e.toLocaleString("en-US",{timeZone:t})),n.setMilliseconds(e.getMilliseconds())),n},wi.sync=Ol;{wi.addGap=function(e,t,n){let l=e[e.length-1];l&&l[0]==t?l[1]=n:e.push([t,n])},wi.clipGaps=Ul;let e=wi.paths={points:Xl};e.linear=li,e.stepped=function(e){const t=bt(e.align,1),n=bt(e.ascDesc,!1),l=bt(e.alignGaps,0),i=bt(e.extend,!1);return(e,r,s,o)=>Nl(e,r,(a,c,u,h,d,p,f,g,m,_,v)=>{[s,o]=ht(u,s,o);let b=a.pxRound,{left:y,width:x}=e.bbox,w=e=>b(p(e,h,_,g)),$=e=>b(f(e,d,v,m)),k=0==h.ori?Bl:Yl;const S={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},A=S.stroke,E=h.dir*(0==h.ori?1:-1);let C=$(u[1==E?s:o]),M=w(c[1==E?s:o]),T=M,P=M;i&&-1==t&&(P=y,k(A,P,C)),k(A,M,C);for(let e=1==E?s:o;e>=s&&e<=o;e+=E){let n=u[e];if(null==n)continue;let l=w(c[e]),i=$(n);1==t?k(A,l,C):k(A,T,i),k(A,l,i),C=i,T=l}let z=T;i&&1==t&&(z=y+x,k(A,z,C));let[D,O]=Wl(e,r);if(null!=a.fill||0!=D){let t=S.fill=new Path2D(A),n=$(a.fillTo(e,r,a.min,a.max,D));k(t,z,n),k(t,P,n)}if(!a.spanGaps){let i=[];i.push(...Fl(c,u,s,o,E,w,l));let d=a.width*qe/2,p=n||1==t?d:-d,f=n||-1==t?-d:d;i.forEach(e=>{e[0]+=p,e[1]+=f}),S.gaps=i=a.gaps(e,r,s,o,i),S.clip=Ul(i,h.ori,g,m,_,v)}return 0!=O&&(S.band=2==O?[Hl(e,r,s,o,A,-1),Hl(e,r,s,o,A,1)]:Hl(e,r,s,o,A,O)),S})},e.bars=function(e){const t=bt((e=e||tn).size,[.6,Wt,1]),n=e.align||0,l=e.gap||0;let i=e.radius;i=null==i?[0,0]:"number"==typeof i?[i,0]:i;const r=Ft(i),s=1-t[0],o=bt(t[1],Wt),a=bt(t[2],1),c=bt(e.disp,tn),u=bt(e.each,e=>{}),{fill:h,stroke:d}=c;return(e,t,i,p)=>Nl(e,t,(f,g,m,_,v,b,y,x,w,$,k)=>{let S,A,E=f.pxRound,C=n,M=l*qe,T=o*qe,P=a*qe;0==_.ori?[S,A]=r(e,t):[A,S]=r(e,t);const z=_.dir*(0==_.ori?1:-1);let D,O,N,W=0==_.ori?Kl:Vl,R=0==_.ori?u:(e,t,n,l,i,r,s)=>{u(e,t,n,i,l,s,r)},H=bt(e.bands,nn).find(e=>e.series[0]==t),U=null!=H?H.dir:0,F=f.fillTo(e,t,f.min,f.max,U),L=E(y(F,v,k,w)),I=$,j=E(f.width*qe),q=!1,B=null,Y=null,K=null,V=null;null==h||0!=j&&null==d||(q=!0,B=h.values(e,t,i,p),Y=new Map,new Set(B).forEach(e=>{null!=e&&Y.set(e,new Path2D)}),j>0&&(K=d.values(e,t,i,p),V=new Map,new Set(K).forEach(e=>{null!=e&&V.set(e,new Path2D)})));let{x0:G,size:Z}=c;if(null!=G&&null!=Z){C=1,g=G.values(e,t,i,p),2==G.unit&&(g=g.map(t=>e.posToVal(x+t*$,_.key,!0)));let n=Z.values(e,t,i,p);O=2==Z.unit?n[0]*$:b(n[0],_,$,x)-b(0,_,$,x),I=ii(g,m,b,_,$,x,I),N=I-O+M}else I=ii(g,m,b,_,$,x,I),N=I*s+M,O=I-N;N<1&&(N=0),j>=O/2&&(j=0),N<5&&(E=Lt);let J=N>0;O=E(Ht(I-N-(J?j:0),P,T)),D=(0==C?O/2:C==z?0:O)-C*z*((0==C?M/2:0)+(J?j/2:0));const Q={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},X=q?null:new Path2D;let ee=null;if(null!=H)ee=e.data[H.series[1]];else{let{y0:n,y1:l}=c;null!=n&&null!=l&&(m=l.values(e,t,i,p),ee=n.values(e,t,i,p))}let te=S*O,ne=A*O;for(let n=1==z?i:p;n>=i&&n<=p;n+=z){let l=m[n];if(null==l)continue;if(null!=ee){let e=ee[n]??0;if(l-e==0)continue;L=y(e,v,k,w)}let i=b(2!=_.distr||null!=c?g[n]:n,_,$,x),r=y(bt(l,F),v,k,w),s=E(i-D),o=E(Tt(r,L)),a=E(Mt(r,L)),u=o-a;if(null!=l){let i=l<0?ne:te,r=l<0?te:ne;q?(j>0&&null!=K[n]&&W(V.get(K[n]),s,a+At(j/2),O,Tt(0,u-j),i,r),null!=B[n]&&W(Y.get(B[n]),s,a+At(j/2),O,Tt(0,u-j),i,r)):W(X,s,a+At(j/2),O,Tt(0,u-j),i,r),R(e,t,n,s-j/2,a,O+j,u)}}return j>0?Q.stroke=q?V:X:q||(Q._fill=0==f.width?f._fill:f._stroke??f._fill,Q.width=0),Q.fill=q?Y:X,Q})},e.spline=function(e){return function(e,t){const n=bt(t?.alignGaps,0);return(t,l,i,r)=>Nl(t,l,(s,o,a,c,u,h,d,p,f,g,m)=>{[i,r]=ht(a,i,r);let _,v,b,y=s.pxRound,x=e=>y(h(e,c,g,p)),w=e=>y(d(e,u,m,f));0==c.ori?(_=jl,b=Bl,v=Jl):(_=ql,b=Yl,v=Ql);const $=c.dir*(0==c.ori?1:-1);let k=x(o[1==$?i:r]),S=k,A=[],E=[];for(let e=1==$?i:r;e>=i&&e<=r;e+=$)if(null!=a[e]){let t=x(o[e]);A.push(S=t),E.push(w(a[e]))}const C={stroke:e(A,E,_,b,v,y),fill:null,clip:null,band:null,gaps:null,flags:1},M=C.stroke;let[T,P]=Wl(t,l);if(null!=s.fill||0!=T){let e=C.fill=new Path2D(M),n=w(s.fillTo(t,l,s.min,s.max,T));b(e,S,n),b(e,k,n)}if(!s.spanGaps){let e=[];e.push(...Fl(o,a,i,r,$,x,n)),C.gaps=e=s.gaps(t,l,i,r,e),C.clip=Ul(e,c.ori,p,f,g,m)}return 0!=P&&(C.band=2==P?[Hl(t,l,i,r,M,-1),Hl(t,l,i,r,M,1)]:Hl(t,l,i,r,M,P)),C})}(ri,e)}}const $i=["#2196f3","#ff9800","#4caf50","#e91e63","#9c27b0","#00bcd4","#ffc107","#795548","#607d8b","#8bc34a"];function ki(e,t){return t??$i[e%$i.length]}let Si=class extends ue{constructor(){super(...arguments),this.series=[],this.config={},this._builtFor=""}static{this.styles=[s('.uplot,.uplot *,.uplot :after,.uplot :before{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5;width:min-content}.u-title{font-size:18px;font-weight:700;text-align:center}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;height:100%;position:relative;width:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{display:inline-block;vertical-align:middle}.u-legend .u-marker{background-clip:padding-box!important;height:1em;margin-right:4px;width:1em}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:rgba(0,0,0,.07)}.u-cursor-x,.u-cursor-y,.u-select{pointer-events:none;position:absolute}.u-cursor-x,.u-cursor-y{left:0;top:0;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{background-clip:padding-box!important;border:0 solid;border-radius:50%;left:0;pointer-events:none;position:absolute;top:0;will-change:transform}.u-axis.u-off,.u-cursor-pt.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-select.u-off{display:none}'),o`
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
    `]}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0,this._plot?.destroy(),this._plot=void 0,this._builtFor=""}firstUpdated(){const e=this._holder();e&&(this._observer=new ResizeObserver(()=>this._sync()),this._observer.observe(e),this._sync())}updated(e){this._sync()}_holder(){return this.renderRoot.querySelector(".holder")}_shape(){return JSON.stringify([this.series.map((e,t)=>[e.label,ki(t,e.color),!0===e.line,e.width??0]),!0===this.config.timeAxis,!0===this.config.yFromZero])}_sync(){const e=this._holder();if(!e||0===this.series.length)return;const t=Math.floor(e.clientWidth);if(t<1)return;const n=this.config.height??220,{xs:l,ys:i}=function(e){const t=e.map(e=>{const t=new Map;for(const[n,l]of e.points)Number.isFinite(n)&&Number.isFinite(l)&&t.set(n,l);return t}),n=new Set;for(const e of t)for(const t of e.keys())n.add(t);const l=[...n].sort((e,t)=>e-t),i=t.map(e=>l.map(t=>e.has(t)?e.get(t):null));return{xs:l,ys:i}}(this.series),r=[l,...i];if(this._plot&&this._builtFor===this._shape())return this._plot.setSize({width:t,height:n}),void this._plot.setData(r);this._plot?.destroy(),this._plot=new wi(this._options(t,n),r,e),this._builtFor=this._shape()}_themeColor(e,t){return getComputedStyle(this).getPropertyValue(e).trim()||t}_options(e,t){const n=this._themeColor("--divider-color","rgba(127,127,127,0.3)"),l=this._themeColor("--secondary-text-color","#888"),i=this.config;return{width:e,height:t,...i.timeAxis?{}:{mode:1},tzDate:void 0,legend:{show:!1},cursor:{drag:{x:!1,y:!1,setScale:!1},points:{size:6}},scales:{x:{time:!0===i.timeAxis},y:{range:i.yFromZero?(e,t,n)=>[0,n]:void 0}},axes:[{stroke:l,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:i.xLabel,labelFont:"11px system-ui, sans-serif",labelSize:i.xLabel?18:0},{stroke:l,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:i.yLabel,labelFont:"11px system-ui, sans-serif",labelSize:i.yLabel?18:0,size:48}],series:[{},...this.series.map((e,t)=>{const n=ki(t,e.color);return{label:e.label,stroke:n,width:e.width??2,...e.line?{}:{paths:()=>null},points:{show:!0,size:e.line?0:4,stroke:n,fill:n}}})],hooks:{setCursor:[e=>this._updateReadout(e)]}}}_updateReadout(e){const t=this.renderRoot.querySelector(".readout");if(!t)return;const n=e.cursor.idx;if(null==n)return void(t.textContent="");const l=this.config,i=e.data[0][n],r=document.createElement("span");r.textContent=l.xFormat&&"number"==typeof i?l.xFormat(i):String(i??""),t.replaceChildren(r),this.series.forEach((i,r)=>{const s=e.data[r+1]?.[n];if(null==s)return;const o=document.createElement("span"),a=document.createElement("span");a.className="swatch",a.style.background=ki(r,i.color),o.append(a);const c=l.yFormat?l.yFormat(Number(s)):String(s);o.append(document.createTextNode(`${i.label} ${c}`)),t.append(o)})}render(){return 0===this.series.length||this.series.every(e=>0===e.points.length)?B`<div class="empty">No data in this range.</div>`:B`
      <div class="holder"></div>
      <div class="readout"></div>
    `}};function Ai(e){if(null==e||""===e)return null;const t="number"==typeof e?e:Number(e);return Number.isFinite(t)?t:null}function Ei(e,t,n=""){const l=Ai(e);return null===l?"—":`${l.toFixed(t)}${n}`}function Ci(e){const t=Ai(e);return null===t?"—":`${Math.round(100*t)}%`}function Mi(e){const t=Ai(e);return null===t?"—":`${t}%`}function Ti(e,t){if(!e)return"—";const n=String(e),l=n.includes("T")?n:n.replace(" ","T"),i=new Date(l.endsWith("Z")?l:`${l}Z`);return Number.isNaN(i.getTime())?n:i.toLocaleString(t||void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}function Pi(e,t,n){const l=Ai(e);if(null===l)return n;let i=n;for(const[e,n]of t)l>=e&&(i=n);return i}function zi(e,t){const n=[];for(const l of e){const e=Ai(l[t]);null!==e&&n.push(e)}return n}function Di(e,t){return zi(e,t).reduce((e,t)=>e+t,0)}function Oi(e){const{label:t,value:n,max:l,text:i,color:r,markers:s=[]}=e,o=null!==n&&l>0?Math.max(0,Math.min(100,n/l*100)):0;return B`
    <div class="bar-row">
      <div class="bar-head">
        <span class="bar-label">${t}</span>
        <span class="bar-value">${i}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style=${`width:${o}%;background:${r??"var(--primary-color)"}`}></div>
        ${s.filter(e=>l>0&&e.at>=0&&e.at<=l).map(e=>B`
              <div
                class="bar-marker"
                style=${`left:${e.at/l*100}%`}
                title=${e.label??String(e.at)}
              ></div>
            `)}
      </div>
    </div>
  `}function Ni(e,t){const n=e.filter(e=>Number.isFinite(e.value)&&e.value>0),l=n.reduce((e,t)=>e+t.value,0);return l<=0?null:B`
    <div class="split">
      <div class="split-track">
        ${n.map(e=>B`
            <div
              class="split-seg"
              style=${`width:${e.value/l*100}%;background:${e.color}`}
              title=${`${e.label}: ${e.value.toFixed(1)} ${t}`}
            ></div>
          `)}
      </div>
      <div class="split-legend">
        ${n.map(e=>B`
            <span class="split-item">
              <span class="swatch" style=${`background:${e.color}`}></span>
              ${e.label} ${e.value.toFixed(0)} ${t}
              <span class="split-pct">${Math.round(e.value/l*100)}%</span>
            </span>
          `)}
      </div>
    </div>
  `}function Wi(e,t){return B`
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
                ${e.map(e=>{const n=e.color?.(t),l=e.title?.(t);return B`<td
                    class="${e.align??"right"} ${e.optional?"optional":""}"
                    style=${n?`color: ${n}`:V}
                    title=${l??V}
                  >
                    ${e.render(t)}
                  </td>`})}
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `}function Ri(e){return B`
    <div class="summary">
      ${e.map(e=>B`
          <div class="stat">
            <div class="stat-value">${e.value}</div>
            <div class="stat-label">${e.label}</div>
          </div>
        `)}
    </div>
  `}e([ge({attribute:!1})],Si.prototype,"series",void 0),e([ge({attribute:!1})],Si.prototype,"config",void 0),Si=e([de("teslamate-chart")],Si);const Hi=[[0,"var(--error-color)"],[80,"var(--warning-color)"],[90,"var(--success-color)"]];let Ui=class extends be{queryId(){return"battery_health"}secondaryQueryIds(){return["battery_capacity_history"]}queryOptions(){const e={};return void 0!==this._config.custom_kwh_new&&(e.custom_kwh_new=this._config.custom_kwh_new),void 0!==this._config.custom_max_range&&(e.custom_max_range=this._config.custom_max_range),{...this._config,vars:e}}defaultTitle(){return"Battery Health"}_summary(e){const t=this._config.length_unit??"km",n=Ai(e.current_capacity),l=Ai(e.max_capacity);return Ri([{label:"Usable now (kWh)",value:Ei(n,1)},{label:"When new (kWh)",value:Ei(l,1)},{label:`Range (${t})`,value:Ei(e.current_range,0)},{label:`Wh/${t}`,value:Ei(e.efficiency,0)}])}_panels(e){const t=this._config.length_unit??"km",n=Ai(e.health_pct),l=Ai(e.degradation_pct),i=Ai(e.current_capacity),r=Ai(e.current_soc),s=Ai(e.stored_energy),o=Ai(e.soc_lower),a=Ai(e.soc_upper),c=Ai(e.max_capacity),u=Ai(e.max_range),h=Pi(n,Hi,"var(--primary-color)");return B`
      <div class="panels">
        ${function(e){const{label:t,value:n,text:l,color:i}=e,r=null===n?0:Math.max(0,Math.min(100,n)),s="M 10 52 A 42 42 0 0 1 94 52";return B`
    <div class="gauge">
      <svg viewBox="0 0 104 64" class="gauge-svg" role="img" aria-label=${`${t}: ${l}`}>
        ${Y`
          <path d=${s} class="gauge-track" pathLength="100" />
          <path d=${s} pathLength="100" stroke=${i} class="gauge-fill"
                stroke-dasharray=${`${r} 100`} />
        `}
      </svg>
      <div class="gauge-value" style=${`color:${i}`}>${l}</div>
      <div class="gauge-label">${t}</div>
    </div>
  `}({label:null===l?"Battery health":`${l.toFixed(1)}% degradation`,value:n,text:null===n?"—":`${n.toFixed(1)}%`,color:h})}
        <div class="bars">
          ${Oi({label:"Charge level",value:r,max:100,text:null===r?"—":`${r}%`,color:"var(--primary-color)",markers:[...null===o?[]:[{at:o,label:`${o}% daily minimum`}],...null===a?[]:[{at:a,label:`${a}% recommended limit`}]]})}
          ${Oi({label:"Stored energy",value:s,max:i??100,text:`${Ei(s,1)} / ${Ei(i,1)} kWh`,color:"var(--success-color)"})}
          ${Oi({label:"Range against best recorded",value:Ai(e.current_range),max:u??100,text:`${Ei(e.current_range,0)} / ${Ei(u,0)} ${t}`,color:"var(--info-color, #3d71d7)"})}
        </div>
      </div>
      ${Ni([{label:"Remaining",value:null!==i&&null!==c?i:0,color:"var(--success-color)"},{label:"Lost to degradation",value:null!==i&&null!==c?Math.max(0,c-i):0,color:"var(--error-color)"}],"kWh")}
    `}_capacitySeries(){const e=ye(this._extra.battery_capacity_history??[],e=>String(e.series),e=>Number(e.odometer),e=>Number(e.kwh)),t=[],n=e.get("sample");n?.length&&t.push({label:"Per charge",points:n,color:"#90a4ae"});const l=e.get("median");return l?.length&&t.push({label:"Median",points:l,color:"#2196f3",line:!0,width:2}),t}_chart(){const e=this._capacitySeries();if(0===e.length)return null;const t=this._config.length_unit??"km";return B`
      <div class="subheader">Usable capacity by odometer</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${e}
          .config=${{height:this._config.chart_height??240,xLabel:`Odometer (${t})`,yLabel:"kWh",xFormat:e=>`${Math.round(e).toLocaleString()} ${t}`,yFormat:e=>`${e.toFixed(1)} kWh`}}
        ></teslamate-chart>
      </div>
    `}renderContent(){const e=this._rows[0];return e?B`
      <ha-card>
        ${this.renderHeader(`${Ei(e.rated_efficiency,1)} Wh/km rated`)} ${this._summary(e)}
        ${this._panels(e)} ${this._chart()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging history to derive battery health from.</div>
        </ha-card>
      `}};Ui=e([de("teslamate-battery-health-card")],Ui);const Fi={AC:"var(--success-color)",DC:"var(--warning-color)"};let Li=class extends be{queryId(){return"charges"}secondaryQueryIds(){return["incomplete_charges"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration_min=this._config.min_duration_minutes),{...this._config,days:this._config.days??90,charge_type:this._config.charge_type??"",vars:e}}defaultTitle(){return"Charges"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",n=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>Ti(e.start_date,this._hass?.locale?.language)},{label:"Location",align:"left",render:e=>e.address??"—"},{label:"Type",align:"center",render:e=>e.charge_type??"—",color:e=>Fi[String(e.charge_type)]},{label:"Duration",render:e=>Ei(e.duration_min,0," min")},{label:"SoC",render:e=>`${Mi(e.start_battery_level)} → ${Mi(e.end_battery_level)}`},{label:"Added",render:e=>Ei(e.charge_energy_added,1," kWh")},{label:"Range",render:t=>Ei(t[this.unitKey("range_added")],0,` ${e}`)},{label:"Ø Power",render:e=>Ei(e.charge_energy_added_per_hour,1," kW")},{label:"Ø Rate",render:e=>Ei(e[this.unitKey("range_added_per_hour")],0,` ${t}`),optional:!0},{label:"Cost",render:e=>null===e.cost?"free":Ei(e.cost,2)},{label:"Cost/kWh",render:e=>null===e.cost_per_kwh?"—":Ei(e.cost_per_kwh,3),optional:!0},{label:"Used",render:e=>Ei(e.charge_energy_used,1," kWh"),optional:!0},{label:"Efficiency",render:e=>Ci(e.charging_efficiency),optional:!0},{label:"Temp",render:e=>Ei(e[this.tempKey("outside_temp_avg")],0,`°${n}`),optional:!0}]}_summary(){const e=Di(this._rows,"charge_energy_added"),t=Di(this._rows,"charge_energy_used"),n=Di(this._rows,"cost"),l=function(e,t){const n=zi(e,t);return 0===n.length?0:n.reduce((e,t)=>e+t,0)/n.length}(this._rows,"duration_min"),i=this._rows.filter(e=>Number(e.cost)>0).length;return Ri([{label:"Energy added (kWh)",value:e.toFixed(0)},{label:"Energy used (kWh)",value:t.toFixed(0)},{label:0===i?"Cost (all free)":"Cost",value:n.toFixed(2)},{label:"Ø Duration",value:`${Math.round(l)} min`}])}_renderIncomplete(){const e=this._extra.incomplete_charges??[];if(0===e.length)return null;const t=[{label:"Started",align:"left",render:e=>Ti(e.start_date,this._hass?.locale?.language)},{label:"Added",render:e=>Ei(e.charge_energy_added,1," kWh")},{label:"Duration",render:e=>Ei(e.duration_min,0," min")}];return B`
      <div class="subheader" title="Charging processes with no recorded end — usually a logging gap">
        Incomplete charges (${e.length})
      </div>
      ${Wi(t,e)}
    `}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charges in the last ${this._config.days??90} days.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows);return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} charges`)} ${this._summary()}
        ${Wi(this._columns(),e)} ${this.renderPager(t,n)} ${this._renderIncomplete()}
      </ha-card>
    `}};Li=e([de("teslamate-charges-card")],Li);let Ii=class extends be{queryId(){return"charging_totals"}secondaryQueryIds(){return["charging_cost_per_distance","charge_delta","dc_charging_curve","top_stations_energy","top_stations_cost"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration=this._config.min_duration_minutes),{...this._config,days:this._config.days??90,geofence_ids:this._config.geofence_ids??null,vars:e}}defaultTitle(){return"Charging Stats"}_currency(e,t=2){const n=Ai(e);if(null===n)return"—";return`${this._config.currency??""}${n.toFixed(t)}`}_summary(e){const t=this._config.length_unit??"km",n=Ai(this._extra.charging_cost_per_distance?.[0]?.cost_mileage),l=Ai(e.paid_count)??0,i=Ai(e.charge_count)??0;return Ri([{label:"Charges",value:i.toFixed(0)},{label:"Energy added (kWh)",value:Ei(e.energy_added,0)},{label:0===l?"Cost (all free)":`Cost (${l} of ${i} paid)`,value:this._currency(e.total_cost)},{label:`Cost per 100 ${t}`,value:null===n?"—":this._currency(n)}])}_rates(e){const t=Ai(e.cost_per_kwh),n=Ai(e.cost_per_kwh_ac),l=Ai(e.cost_per_kwh_dc),i=Ai(e.charging_efficiency),r=Ai(e.suc_cost);return Ri([{label:"Ø Cost/kWh",value:null===t?"—":this._currency(t,3)},{label:"AC",value:null===n?"—":this._currency(n,3)},{label:"DC",value:null===l?"—":this._currency(l,3)},{label:0===r?"Supercharging (free)":"Supercharging",value:this._currency(r)},{label:"Charging efficiency",value:null===i?"—":`${(100*i).toFixed(1)}%`}])}_acdc(e){const t=Ni([{label:"AC",value:Ai(e.energy_ac)??0,color:"var(--success-color)"},{label:"DC",value:Ai(e.energy_dc)??0,color:"var(--warning-color)"}],"kWh");return t?B`<div class="subheader">Energy used by charger type</div>
      ${t}`:null}_deltaChart(){const e=this._extra.charge_delta??[];if(0===e.length)return null;const t=e=>{const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`).getTime()/1e3},n=[],l=[];for(const i of e){const e=t(i.time),r=Ai(i.start_soc),s=Ai(i.end_soc);Number.isFinite(e)&&(null!==r&&n.push([e,r]),null!==s&&l.push([e,s]))}if(0===n.length&&0===l.length)return null;return B`
      <div class="subheader">Charge delta</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Start SOC",points:n,color:"#ff9800",line:!0},{label:"End SOC",points:l,color:"#4caf50",line:!0}]}
          .config=${{height:this._config.chart_height??200,timeAxis:!0,yLabel:"SOC %",yFormat:e=>`${Math.round(e)}%`,xFormat:e=>new Date(1e3*e).toLocaleDateString(this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_curveChart(){const e=this._extra.dc_charging_curve??[];if(0===e.length)return null;const t=ye(e,e=>"median"===e.series?"__median":String(e.label??e.session_id??"session"),e=>Number(e.soc),e=>Number(e.power)),n=t.get("__median");t.delete("__median");const l=this._config.max_curve_sessions??6,i=[...t.entries()].slice(-l),r=i.map(([e,t])=>({label:e,points:t,line:!0,width:1}));if(n?.length&&r.push({label:"Median",points:n,color:"var(--primary-text-color)",line:!0,width:3}),0===r.length)return null;const s=t.size-i.length;return B`
      <div class="subheader">
        DC charging curve${s>0?B` <span class="hint">(newest ${i.length} of ${t.size})</span>`:null}
      </div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${r}
          .config=${{height:this._config.chart_height??220,xLabel:"SOC %",yLabel:"kW",yFromZero:!0,xFormat:e=>`${Math.round(e)}% SOC`,yFormat:e=>`${Math.round(e)} kW`}}
        ></teslamate-chart>
      </div>
    `}_stations(){const e=this._extra.top_stations_energy??[],t=this._extra.top_stations_cost??[];if(0===e.length&&0===t.length)return null;const n=[{label:"Location",align:"left",render:e=>e.location??"—"},{label:"Energy",render:e=>Ei(e.charge_energy_added,1," kWh")}],l=[{label:"Location",align:"left",render:e=>e.location??"—"},{label:"Cost",render:e=>this._currency(e.cost)}];return B`
      ${e.length?B`<div class="subheader">Top locations by energy</div>
            ${Wi(n,e)}`:null}
      ${t.length?B`<div class="subheader">Top locations by cost</div>
            ${Wi(l,t)}`:null}
    `}renderContent(){const e=this._rows[0],t=Ai(e?.charge_count)??0;return e&&0!==t?B`
      <ha-card>
        ${this.renderHeader(`last ${this._config.days??90} days`)} ${this._summary(e)}
        ${this._rates(e)} ${this._acdc(e)} ${this._deltaChart()} ${this._curveChart()} ${this._stations()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging sessions in the last ${this._config.days??90} days.</div>
        </ha-card>
      `}};Ii=e([de("teslamate-charging-stats-card")],Ii);let ji=class extends be{queryId(){return"drives"}secondaryQueryIds(){return["incomplete_drives"]}queryOptions(){const e={};return void 0!==this._config.min_distance&&(e.min_dist=this._config.min_distance),void 0!==this._config.min_speed&&(e.min_speed=this._config.min_speed),this._config.efficiency_mode&&(e.efficiency=this._config.efficiency_mode),{...this._config,days:this._config.days??90,vars:e}}defaultTitle(){return"Drives"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",n=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>Ti(e.start_date,this._hass?.locale?.language)},{label:"Start",align:"left",render:e=>e.start_address??"—"},{label:"Destination",align:"left",render:e=>e.end_address??"—"},{label:"Duration",render:e=>Ei(e.duration_min,0," min")},{label:"Distance",render:t=>Ei(t[this.unitKey("distance")],1,` ${e}`)},{label:"SoC",render:e=>`${Mi(e["% Start"])} → ${Mi(e["% End"])}`,optional:!0},{label:"",align:"center",render:e=>e.has_reduced_range?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>e.has_reduced_range?"Reduced range: part of the pack was unavailable":void 0},{label:"Energy",render:e=>Ei(e.consumption_kWh,1," kWh")},{label:`Ø Wh/${e}`,render:t=>Ei(t[`consumption_kwh_${e}`],0)},{label:"Ø Speed",render:e=>Ei(e[this.unitKey("speed_avg")],0,` ${t}`),optional:!0},{label:"Max Speed",render:e=>Ei(e[this.unitKey("speed_max")],0,` ${t}`),optional:!0},{label:"Max Power",render:e=>Ei(e.power_max,0," kW"),optional:!0},{label:"Temp",render:e=>Ei(e[this.tempKey("outside_temp")],0,`°${n}`),optional:!0}]}_summary(){const e=this._config.length_unit??"km",t=Di(this._rows,this.unitKey("distance")),n=Di(this._rows,"consumption_kWh"),l=Di(this._rows,"duration_min"),i=t>0?n/t*1e3:0;return Ri([{label:`Distance (${e})`,value:t.toFixed(0)},{label:"Duration",value:`${Math.floor(l/60)}h ${Math.round(l%60)}m`},{label:"Energy (kWh)",value:n.toFixed(1)},{label:`Ø Wh/${e}`,value:i.toFixed(0)}])}_renderIncomplete(){const e=this._extra.incomplete_drives??[];if(0===e.length)return null;const t=[{label:"Drive",align:"left",render:e=>e["Drive ID"]??"—"},{label:"Started",align:"left",render:e=>Ti(e.start_date,this._hass?.locale?.language)},{label:"Distance",render:e=>Ei(e.distance,1)},{label:"Duration",render:e=>Ei(e.duration_min,0," min")}];return B`
      <div class="subheader" title="Drives TeslaMate never saw the end of — usually a logging gap">
        Incomplete drives (${e.length})
      </div>
      ${Wi(t,e)}
    `}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No drives in the last ${this._config.days??90} days.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows);return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} drives`)} ${this._summary()}
        ${Wi(this._columns(),e)} ${this.renderPager(t,n)} ${this._renderIncomplete()}
      </ha-card>
    `}};ji=e([de("teslamate-drives-card")],ji);const qi=[[0,"#FF7383"],[.3,"#FFB357"],[.85,"#56A64B"]],Bi=[[0,"rgb(133, 142, 133)"],[43200,"#56A64B"]];let Yi=class extends be{queryId(){return"vampire_drain"}queryOptions(){return{...this._config,days:this._config.days??90,vars:{duration:this._config.min_duration_hours??6}}}defaultTitle(){return"Vampire Drain"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t=this._hass?.locale?.language;return[{label:"Start",align:"left",render:e=>Ti(e.start_date,t)},{label:"End",align:"left",render:e=>Ti(e.end_date,t)},{label:"Period",render:e=>function(e){const t=Ai(e);if(null===t)return"—";const n=Math.abs(Math.round(t)),l=Math.floor(n/86400),i=Math.floor(n%86400/3600),r=Math.floor(n%3600/60);return l>0?`${l}d ${i}h`:i>0?`${i}h ${r}m`:`${r}m`}(e.duration),color:e=>Pi(e.duration,Bi,"inherit")},{label:"Standby",render:e=>Ci(e.standby),color:e=>Pi(e.standby,qi,"inherit")},{label:"SoC",render:e=>Mi(e.soc_diff),optional:!0},{label:"",align:"center",render:e=>1===Ai(e.has_reduced_range)?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>1===Ai(e.has_reduced_range)?"Reduced range: part of the pack was unavailable, so range loss cannot be estimated":void 0},{label:"Range loss",render:t=>Ei(t[this.unitKey("range_diff")],2,` ${e}`)},{label:"Energy",render:e=>Ei(e.consumption,2," kWh"),optional:!0},{label:"Ø Power",render:e=>Ei(e.avg_power,0," W"),optional:!0},{label:"Ø Loss / h",render:t=>Ei(t[this.unitKey("range_lost_per_hour")],2,` ${e}`)}]}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">
            No standby periods longer than ${this._config.min_duration_hours??6} h in the last
            ${this._config.days??90} days.
          </div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows),l=Di(this._rows,"consumption");return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} periods · ${l.toFixed(1)} kWh drained`)}
        ${Wi(this._columns(),e)} ${this.renderPager(t,n)}
      </ha-card>
    `}};Yi=e([de("teslamate-vampire-drain-card")],Yi);const Ki=new URL(import.meta.url).searchParams.get("v")??"dev",Vi="https://github.com/johnbr/ha-teslamate-cards";window.customCards=window.customCards??[],window.customCards.push({type:"teslamate-drives-card",name:"TeslaMate Drives",description:"Every drive: route, distance, duration and energy.",preview:!1,documentationURL:Vi},{type:"teslamate-charges-card",name:"TeslaMate Charges",description:"Every charging session: energy, range gained, rate and cost.",preview:!1,documentationURL:Vi},{type:"teslamate-vampire-drain-card",name:"TeslaMate Vampire Drain",description:"Standby battery losses between drives and charges.",preview:!1,documentationURL:Vi},{type:"teslamate-battery-health-card",name:"TeslaMate Battery Health",description:"Usable capacity, degradation and range, with capacity by odometer.",preview:!1,documentationURL:Vi},{type:"teslamate-charging-stats-card",name:"TeslaMate Charging Stats",description:"Charging totals, cost per kWh, AC/DC split and the DC charging curve.",preview:!1,documentationURL:Vi}),console.info(`%c TESLAMATE-CARDS %c ${Ki} `,"color:#fff;background:#2b3038;font-weight:700","color:#2b3038;background:#ff9d4d;font-weight:700");
