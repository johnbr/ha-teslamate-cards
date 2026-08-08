function e(e,t,n,i){var r,l=arguments.length,s=l<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(l<3?r(s):l>3?r(t,n,s):r(t,n))||s);return l>3&&s&&Object.defineProperty(t,n,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let l=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&r.set(t,e))}return e}toString(){return this.cssText}};const s=e=>new l("string"==typeof e?e:e+"",void 0,i),o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new l(n,e,i)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return s(t)})(e):e,{is:c,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,g=globalThis,m=g.trustedTypes,_=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},x=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&u(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const l=i?.call(this);r?.call(this,t),this.requestUpdate(e,l,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:y).toAttribute(t,n.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i;const l=r.fromAttribute(t,e.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(void 0!==e){const l=this.constructor;if(!1===i&&(r=this[e]),n??=l.getPropertyOptions(e),!((n.hasChanged??x)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(l._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},l){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,l??t??this[e]),!0!==r||void 0!==l)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,S=e=>e,A=k.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+M,D=`<${T}>`,P=document,z=()=>P.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,O="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,W=/-->/g,L=/>/g,H=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,q=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),B=q(1),Y=q(2),K=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,Z=P.createTreeWalker(P,129);function J(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Q=(e,t)=>{const n=e.length-1,i=[];let r,l=2===t?"<svg>":3===t?"<math>":"",s=F;for(let t=0;t<n;t++){const n=e[t];let o,a,c=-1,u=0;for(;u<n.length&&(s.lastIndex=u,a=s.exec(n),null!==a);)u=s.lastIndex,s===F?"!--"===a[1]?s=W:void 0!==a[1]?s=L:void 0!==a[2]?(j.test(a[2])&&(r=RegExp("</"+a[2],"g")),s=H):void 0!==a[3]&&(s=H):s===H?">"===a[0]?(s=r??F,c=-1):void 0===a[1]?c=-2:(c=s.lastIndex-a[2].length,o=a[1],s=void 0===a[3]?H:'"'===a[3]?I:U):s===I||s===U?s=H:s===W||s===L?s=F:(s=H,r=void 0);const d=s===H&&e[t+1].startsWith("/>")?" ":"";l+=s===F?n+D:c>=0?(i.push(o),n.slice(0,c)+E+n.slice(c)+M+d):n+M+(-2===c?t:d)}return[J(e,l+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,l=0;const s=e.length-1,o=this.parts,[a,c]=Q(e,t);if(this.el=X.createElement(a,n),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Z.nextNode())&&o.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=c[l++],n=i.getAttribute(e).split(M),s=/([.?@])?(.*)/.exec(t);o.push({type:1,index:r,name:s[2],strings:n,ctor:"."===s[1]?re:"?"===s[1]?le:"@"===s[1]?se:ie}),i.removeAttribute(e)}else e.startsWith(M)&&(o.push({type:6,index:r}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(M),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],z()),Z.nextNode(),o.push({type:2,index:++r});i.append(e[t],z())}}}else if(8===i.nodeType)if(i.data===T)o.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(M,e+1));)o.push({type:7,index:r}),e+=M.length-1}r++}}static createElement(e,t){const n=P.createElement("template");return n.innerHTML=e,n}}function ee(e,t,n=e,i){if(t===K)return t;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const l=R(t)?void 0:t._$litDirective$;return r?.constructor!==l&&(r?._$AO?.(!1),void 0===l?r=void 0:(r=new l(e),r._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(t=ee(e,r._$AS(e,t.values),r,i)),t}class te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??P).importNode(t,!0);Z.currentNode=i;let r=Z.nextNode(),l=0,s=0,o=n[0];for(;void 0!==o;){if(l===o.index){let t;2===o.type?t=new ne(r,r.nextSibling,this,e):1===o.type?t=new o.ctor(r,o.name,o.strings,this,e):6===o.type&&(t=new oe(r,this,e)),this._$AV.push(t),o=n[++s]}l!==o?.index&&(r=Z.nextNode(),l++)}return Z.currentNode=P,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),R(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=X.createElement(J(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new te(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new ne(this.O(z()),this.O(z()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=V}_$AI(e,t=this,n,i){const r=this.strings;let l=!1;if(void 0===r)e=ee(this,e,t,0),l=!R(e)||e!==this._$AH&&e!==K,l&&(this._$AH=e);else{const i=e;let s,o;for(e=r[0],s=0;s<r.length-1;s++)o=ee(this,i[n+s],t,s),o===K&&(o=this._$AH[s]),l||=!R(o)||o!==this._$AH[s],o===V?e=V:e!==V&&(e+=(o??"")+r[s+1]),this._$AH[s]=o}l&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class le extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class se extends ie{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=ee(this,e,t,0)??V)===K)return;const n=this._$AH,i=e===V&&n!==V||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==V&&(n===V||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(X,ne),(k.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;class ue extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=n?.renderBefore??null;i._$litPart$=r=new ne(t.insertBefore(z(),e),e,void 0,n??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}ue._$litElement$=!0,ue.finalized=!0,ce.litElementHydrateSupport?.({LitElement:ue});const de=ce.litElementPolyfillSupport;de?.({LitElement:ue}),(ce.litElementVersions??=[]).push("4.2.2");const he=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x},fe=(e=pe,t,n)=>{const{kind:i,metadata:r}=n;let l=globalThis.litPropertyMetadata.get(r);if(void 0===l&&globalThis.litPropertyMetadata.set(r,l=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),l.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const r=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,r,e,!0,n)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];t.call(this,n),this.requestUpdate(i,r,e,!0,n)}}throw Error("Unsupported decorator location: "+i)};function ge(e){return(t,n)=>"object"==typeof n?fe(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function me(e){return ge({...e,state:!0,attribute:!1})}function _e(e){return 1===e?"1 day":`${e} days`}const ve=o`
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

  /* Title and subtitle travel together so the range picker can sit opposite
     them, rather than the subtitle being pushed to the middle. */
  .header-text {
    display: flex;
    align-items: baseline;
    gap: 12px;
    min-width: 0;
  }

  .header-text .subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  select.range {
    flex: none;
    align-self: center;
    font-family: inherit;
    font-size: 13px;
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 5px 8px;
    cursor: pointer;
  }

  select.range:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 1px;
  }

  /* The options render in the browser's own popup, outside the shadow root and
     therefore outside this stylesheet — on a dark theme they would otherwise be
     black-on-black wherever the platform honours the page's colours. */
  select.range option {
    background: var(--card-background-color, var(--ha-card-background));
    color: var(--primary-text-color);
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

  /* Rows that drive something else on the card — the Drives map. */
  tbody tr.selectable {
    cursor: pointer;
  }

  tbody tr.selectable:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }

  tbody tr.selected td {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
  }

  /* A left edge on the first cell, so the selected row is still identifiable
     once the table is scrolled sideways and the marker column is off screen. */
  tbody tr.selected td:first-child {
    box-shadow: inset 3px 0 0 0 var(--primary-color);
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

  /* The from → to line under the Drives route map. */
  .route-caption {
    padding: 6px 16px 12px;
    font-size: 12px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
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
`;async function be(e,t,n){const i=n.days??90,r=new Date,l=new Date(r.getTime()-864e5*i);return(await e.callWS({type:"teslamate_cards/query",query_id:t,car_id:n.car_id??1,time_from:l.toISOString(),time_to:r.toISOString(),length_unit:n.length_unit??"km",temp_unit:n.temp_unit??"C",preferred_range:n.preferred_range??"rated",geofence_ids:n.geofence_ids??null,location:n.location??"",charge_type:n.charge_type??"",vars:n.vars??{}})).rows}class ye extends ue{constructor(){super(...arguments),this._rows=[],this._extra={},this._loading=!0,this._error=null,this._page=0,this._requested=!1}static{this.styles=ve}secondaryQueryIds(){return[]}set hass(e){this._hass=e,this._requested||(this._requested=!0,this.refresh())}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this._page=0,this._days=void 0,this._requested=!1,this._hass&&(this._requested=!0,this.refresh())}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>{this.refresh()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer),this._timer=void 0}async refresh(){if(!this._hass||!this._config)return;const e=this._hass,t=this.queryOptions();try{const n=this.secondaryQueryIds(),[i,...r]=await Promise.all([be(e,this.queryId(),t),...n.map(n=>be(e,n,t))]);this._rows=i,this._extra=Object.fromEntries(n.map((e,t)=>[e,r[t]??[]])),this._error=null}catch(e){this._error=function(e){return String("object"==typeof e&&null!==e&&"message"in e?e.message:e)}(e)}finally{this._loading=!1}}paginate(e){const t=this.pageSize(),n=Math.max(1,Math.ceil(e.length/t)),i=Math.min(this._page,n-1);return{visible:e.slice(i*t,i*t+t),page:i,pages:n}}pageSize(){return 25}days(){return this._days??this._config.days??this.defaultDays()}defaultDays(){return 90}defaultRanges(){return[7,30,90]}showRangePicker(){return!0}onRangeChanged(){}_ranges(){return function(e,t){const n=e.filter(e=>Number.isFinite(e)&&e>0);return[...new Set([...n,t])].sort((e,t)=>e-t)}(this._config.ranges??this.defaultRanges(),this._config.days??this.defaultDays())}_onRangeChange(e){const t=Number(e.target.value);Number.isFinite(t)&&t!==this.days()&&(this._days=t,this._page=0,this.onRangeChanged(),this.refresh())}renderRangePicker(){if(!this.showRangePicker())return null;const e=this._ranges();if(e.length<2)return null;const t=this.days();return B`
      <select
        class="range"
        aria-label="Look-back window"
        .value=${String(t)}
        @change=${e=>this._onRangeChange(e)}
      >
        ${e.map(e=>B`<option value=${e} ?selected=${e===t}>${_e(e)}</option>`)}
      </select>
    `}renderHeader(e){return B`
      <div class="header">
        <div class="header-text">
          <div class="title">${this._config.title??this.defaultTitle()}</div>
          ${e?B`<div class="subtitle">${e}</div>`:null}
        </div>
        ${this.renderRangePicker()}
      </div>
    `}renderPager(e,t){return t<=1?null:B`
      <div class="footer">
        <span>Page ${e+1} of ${t}</span>
        <span class="pager">
          <button ?disabled=${0===e} @click=${()=>this._page=e-1}>Previous</button>
          <button ?disabled=${e>=t-1} @click=${()=>this._page=e+1}>Next</button>
        </span>
      </div>
    `}defaultTitle(){return"TeslaMate"}unitKey(e){return`${e}_${this._config.length_unit??"km"}`}tempKey(e){return`${e}_${(this._config.temp_unit??"C").toLowerCase()}`}render(){return this._config?this._error?B`<ha-card>${this.renderHeader()}<div class="state error">${this._error}</div></ha-card>`:this._loading?B`<ha-card>${this.renderHeader()}<div class="state">Loading…</div></ha-card>`:this.renderContent():B``}}function xe(e,t,n,i){const r=new Map;for(const l of e){const e=n(l),s=i(l);if(!Number.isFinite(e)||!Number.isFinite(s))continue;const o=t(l),a=r.get(o);a?a.push([e,s]):r.set(o,[[e,s]])}for(const e of r.values())e.sort((e,t)=>e[0]-t[0]);return r}e([me()],ye.prototype,"_rows",void 0),e([me()],ye.prototype,"_extra",void 0),e([me()],ye.prototype,"_loading",void 0),e([me()],ye.prototype,"_error",void 0),e([me()],ye.prototype,"_page",void 0),e([me()],ye.prototype,"_days",void 0);const we="u-off",$e="u-label",ke="width",Se="height",Ae="top",Ce="bottom",Ee="left",Me="right",Te="#000",De=Te+"0",Pe="mousemove",ze="mousedown",Re="mouseup",Ne="mouseenter",Oe="mouseleave",Fe="dblclick",We="change",Le="dppxchange",He="--",Ue="undefined"!=typeof window,Ie=Ue?document:null,je=Ue?window:null,qe=Ue?navigator:null;let Be,Ye;function Ke(e,t){if(null!=t){let n=e.classList;!n.contains(t)&&n.add(t)}}function Ve(e,t){let n=e.classList;n.contains(t)&&n.remove(t)}function Ge(e,t,n){e.style[t]=n+"px"}function Ze(e,t,n,i){let r=Ie.createElement(e);return null!=t&&Ke(r,t),null!=n&&n.insertBefore(r,i),r}function Je(e,t){return Ze("div",e,t)}const Qe=new WeakMap;function Xe(e,t,n,i,r){let l="translate("+t+"px,"+n+"px)";l!=Qe.get(e)&&(e.style.transform=l,Qe.set(e,l),t<0||n<0||t>i||n>r?Ke(e,we):Ve(e,we))}const et=new WeakMap;function tt(e,t,n){let i=t+n;i!=et.get(e)&&(et.set(e,i),e.style.background=t,e.style.borderColor=n)}const nt=new WeakMap;function it(e,t,n,i){let r=t+""+n;r!=nt.get(e)&&(nt.set(e,r),e.style.height=n+"px",e.style.width=t+"px",e.style.marginLeft=i?-t/2+"px":0,e.style.marginTop=i?-n/2+"px":0)}const rt={passive:!0},lt={...rt,capture:!0};function st(e,t,n,i){t.addEventListener(e,n,i?lt:rt)}function ot(e,t,n,i){t.removeEventListener(e,n,rt)}function at(e,t,n,i){let r;n=n||0;let l=(i=i||t.length-1)<=2147483647;for(;i-n>1;)r=l?n+i>>1:Ct((n+i)/2),t[r]<e?n=r:i=r;return e-t[n]<=t[i]-e?n:i}function ct(e){return(t,n,i)=>{let r=-1,l=-1;for(let l=n;l<=i;l++)if(e(t[l])){r=l;break}for(let r=i;r>=n;r--)if(e(t[r])){l=r;break}return[r,l]}}Ue&&function e(){let t=devicePixelRatio;Be!=t&&(Be=t,Ye&&ot(We,Ye,e),Ye=matchMedia(`(min-resolution: ${Be-.001}dppx) and (max-resolution: ${Be+.001}dppx)`),st(We,Ye,e),je.dispatchEvent(new CustomEvent(Le)))}();const ut=e=>null!=e,dt=e=>null!=e&&e>0,ht=ct(ut),pt=ct(dt);function ft(e,t,n,i){let r=zt(e),l=zt(t);e==t&&(-1==r?(e*=n,t/=n):(e/=n,t*=n));let s=10==n?Rt:Nt,o=1==l?Mt:Ct,a=(1==r?Ct:Mt)(s(At(e))),c=o(s(At(t))),u=Pt(n,a),d=Pt(n,c);return 10==n&&(a<0&&(u=Qt(u,-a)),c<0&&(d=Qt(d,-c))),i||2==n?(e=u*r,t=d*l):(e=Jt(e,u),t=Zt(t,d)),[e,t]}function gt(e,t,n,i){let r=ft(e,t,n,i);return 0==e&&(r[0]=0),0==t&&(r[1]=0),r}const mt={mode:3,pad:.1},_t={pad:0,soft:null,mode:0},vt={min:_t,max:_t};function bt(e,t,n,i){return cn(n)?xt(e,t,n):(_t.pad=n,_t.soft=i?0:null,_t.mode=i?3:0,xt(e,t,vt))}function yt(e,t){return e??t}function xt(e,t,n){let i=n.min,r=n.max,l=yt(i.pad,0),s=yt(r.pad,0),o=yt(i.hard,-Ft),a=yt(r.hard,Ft),c=yt(i.soft,Ft),u=yt(r.soft,-Ft),d=yt(i.mode,0),h=yt(r.mode,0),p=t-e,f=Rt(p),g=Dt(At(e),At(t)),m=Rt(g),_=At(m-f);(p<1e-24||_>10)&&(p=0,0!=e&&0!=t||(p=1e-24,2==d&&c!=Ft&&(l=0),2==h&&u!=-Ft&&(s=0)));let v=p||g||1e3,b=Rt(v),y=Pt(10,Ct(b)),x=Qt(Jt(e-v*(0==p?0==e?.1:1:l),y/10),24),w=e>=c&&(1==d||3==d&&x<=c||2==d&&x>=c)?c:Ft,$=Dt(o,x<w&&e>=w?w:Tt(w,x)),k=Qt(Zt(t+v*(0==p?0==t?.1:1:s),y/10),24),S=t<=u&&(1==h||3==h&&k>=u||2==h&&k<=u)?u:-Ft,A=Tt(a,k>S&&t<=S?S:Dt(S,k));return $==A&&0==$&&(A=100),[$,A]}const wt=new Intl.NumberFormat(Ue?qe.language:"en-US"),$t=e=>wt.format(e),kt=Math,St=kt.PI,At=kt.abs,Ct=kt.floor,Et=kt.round,Mt=kt.ceil,Tt=kt.min,Dt=kt.max,Pt=kt.pow,zt=kt.sign,Rt=kt.log10,Nt=kt.log2,Ot=(e,t=1)=>kt.asinh(e/t),Ft=1/0;function Wt(e){return 1+(0|Rt((e^e>>31)-(e>>31)))}function Lt(e,t,n){return Tt(Dt(e,t),n)}function Ht(e){return"function"==typeof e}function Ut(e){return Ht(e)?e:()=>e}const It=e=>e,jt=(e,t)=>t,qt=e=>null,Bt=e=>!0,Yt=(e,t)=>e==t,Kt=/\.\d*?(?=9{6,}|0{6,})/gm,Vt=e=>{if(on(e)||Xt.has(e))return e;const t=`${e}`,n=t.match(Kt);if(null==n)return e;let i=n[0].length-1;if(-1!=t.indexOf("e-")){let[e,n]=t.split("e");return+`${Vt(e)}e${n}`}return Qt(e,i)};function Gt(e,t){return Vt(Qt(Vt(e/t))*t)}function Zt(e,t){return Vt(Mt(Vt(e/t))*t)}function Jt(e,t){return Vt(Ct(Vt(e/t))*t)}function Qt(e,t=0){if(on(e))return e;let n=10**t,i=e*n*(1+Number.EPSILON);return Et(i)/n}const Xt=new Map;function en(e){return((""+e).split(".")[1]||"").length}function tn(e,t,n,i){let r=[],l=i.map(en);for(let s=t;s<n;s++){let t=At(s),n=Qt(Pt(e,s),t);for(let o=0;o<i.length;o++){let a=10==e?+`${i[o]}e${s}`:i[o]*n,c=(s>=0?0:t)+(s>=l[o]?0:l[o]),u=10==e?a:Qt(a,c);r.push(u),Xt.set(u,c)}}return r}const nn={},rn=[],ln=[null,null],sn=Array.isArray,on=Number.isInteger;function an(e){return"string"==typeof e}function cn(e){let t=!1;if(null!=e){let n=e.constructor;t=null==n||n==Object}return t}function un(e){return null!=e&&"object"==typeof e}const dn=Object.getPrototypeOf(Uint8Array),hn="__proto__";function pn(e,t=cn){let n;if(sn(e)){let i=e.find(e=>null!=e);if(sn(i)||t(i)){n=Array(e.length);for(let i=0;i<e.length;i++)n[i]=pn(e[i],t)}else n=e.slice()}else if(e instanceof dn)n=e.slice();else if(t(e)){n={};for(let i in e)i!=hn&&(n[i]=pn(e[i],t))}else n=e;return n}function fn(e){let t=arguments;for(let n=1;n<t.length;n++){let i=t[n];for(let t in i)t!=hn&&(cn(e[t])?fn(e[t],pn(i[t])):e[t]=pn(i[t]))}return e}function gn(e,t,n){for(let i,r=0,l=-1;r<t.length;r++){let s=t[r];if(s>l){for(i=s-1;i>=0&&null==e[i];)e[i--]=null;for(i=s+1;i<n&&null==e[i];)e[l=i++]=null}}}const mn="undefined"==typeof queueMicrotask?e=>Promise.resolve().then(e):queueMicrotask;const _n=["January","February","March","April","May","June","July","August","September","October","November","December"],vn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function bn(e){return e.slice(0,3)}const yn=vn.map(bn),xn=_n.map(bn),wn={MMMM:_n,MMM:xn,WWWW:vn,WWW:yn};function $n(e){return(e<10?"0":"")+e}const kn={YYYY:e=>e.getFullYear(),YY:e=>(e.getFullYear()+"").slice(2),MMMM:(e,t)=>t.MMMM[e.getMonth()],MMM:(e,t)=>t.MMM[e.getMonth()],MM:e=>$n(e.getMonth()+1),M:e=>e.getMonth()+1,DD:e=>$n(e.getDate()),D:e=>e.getDate(),WWWW:(e,t)=>t.WWWW[e.getDay()],WWW:(e,t)=>t.WWW[e.getDay()],HH:e=>$n(e.getHours()),H:e=>e.getHours(),h:e=>{let t=e.getHours();return 0==t?12:t>12?t-12:t},AA:e=>e.getHours()>=12?"PM":"AM",aa:e=>e.getHours()>=12?"pm":"am",a:e=>e.getHours()>=12?"p":"a",mm:e=>$n(e.getMinutes()),m:e=>e.getMinutes(),ss:e=>$n(e.getSeconds()),s:e=>e.getSeconds(),fff:e=>{return((t=e.getMilliseconds())<10?"00":t<100?"0":"")+t;var t}};function Sn(e,t){t=t||wn;let n,i=[],r=/\{([a-z]+)\}|[^{]+/gi;for(;n=r.exec(e);)i.push("{"==n[0][0]?kn[n[1]]:n[0]);return e=>{let n="";for(let r=0;r<i.length;r++)n+="string"==typeof i[r]?i[r]:i[r](e,t);return n}}const An=(new Intl.DateTimeFormat).resolvedOptions().timeZone;const Cn=e=>e%1==0,En=[1,2,2.5,5],Mn=tn(10,-32,0,En),Tn=tn(10,0,32,En),Dn=Tn.filter(Cn),Pn=Mn.concat(Tn),zn="{YYYY}",Rn="\n"+zn,Nn="{M}/{D}",On="\n"+Nn,Fn=On+"/{YY}",Wn="{aa}",Ln="{h}:{mm}"+Wn,Hn="\n"+Ln,Un=":{ss}",In=null;function jn(e){let t=1e3*e,n=60*t,i=60*n,r=24*i,l=30*r,s=365*r;return[(1==e?tn(10,0,3,En).filter(Cn):tn(10,-3,0,En)).concat([t,5*t,10*t,15*t,30*t,n,5*n,10*n,15*n,30*n,i,2*i,3*i,4*i,6*i,8*i,12*i,r,2*r,3*r,4*r,5*r,6*r,7*r,8*r,9*r,10*r,15*r,l,2*l,3*l,4*l,6*l,s,2*s,5*s,10*s,25*s,50*s,100*s]),[[s,zn,In,In,In,In,In,In,1],[28*r,"{MMM}",Rn,In,In,In,In,In,1],[r,Nn,Rn,In,In,In,In,In,1],[i,"{h}"+Wn,Fn,In,On,In,In,In,1],[n,Ln,Fn,In,On,In,In,In,1],[t,Un,Fn+" "+Ln,In,On+" "+Ln,In,Hn,In,1],[e,Un+".{fff}",Fn+" "+Ln,In,On+" "+Ln,In,Hn,In,1]],function(t){return(o,a,c,u,d,h)=>{let p=[],f=d>=s,g=d>=l&&d<s,m=t(c),_=Qt(m*e,3),v=Qn(m.getFullYear(),f?0:m.getMonth(),g||f?1:m.getDate()),b=Qt(v*e,3);if(g||f){let n=g?d/l:0,i=f?d/s:0,r=_==b?_:Qt(Qn(v.getFullYear()+i,v.getMonth()+n,1)*e,3),o=new Date(Et(r/e)),a=o.getFullYear(),c=o.getMonth();for(let l=0;r<=u;l++){let s=Qn(a+i*l,c+n*l,1),o=s-t(Qt(s*e,3));r=Qt((+s+o)*e,3),r<=u&&p.push(r)}}else{let l=d>=r?r:d,s=b+(Ct(c)-Ct(_))+Zt(_-b,l);p.push(s);let f=t(s),g=f.getHours()+f.getMinutes()/n+f.getSeconds()/i,m=d/i,v=h/o.axes[a]._space;for(;s=Qt(s+d,1==e?0:3),!(s>u);)if(m>1){let e=Ct(Qt(g+m,6))%24,n=t(s).getHours()-e;n>1&&(n=-1),s-=n*i,g=(g+m)%24,Qt((s-p[p.length-1])/d,3)*v>=.7&&p.push(s)}else p.push(s)}return p}}]}const[qn,Bn,Yn]=jn(1),[Kn,Vn,Gn]=jn(.001);function Zn(e,t){return e.map(e=>e.map((n,i)=>0==i||8==i||null==n?n:t(1==i||0==e[8]?n:e[1]+n)))}function Jn(e,t){return(n,i,r,l,s)=>{let o,a,c,u,d,h,p=t.find(e=>s>=e[0])||t[t.length-1];return i.map(t=>{let n=e(t),i=n.getFullYear(),r=n.getMonth(),l=n.getDate(),s=n.getHours(),f=n.getMinutes(),g=n.getSeconds(),m=i!=o&&p[2]||r!=a&&p[3]||l!=c&&p[4]||s!=u&&p[5]||f!=d&&p[6]||g!=h&&p[7]||p[1];return o=i,a=r,c=l,u=s,d=f,h=g,m(n)})}}function Qn(e,t,n){return new Date(e,t,n)}function Xn(e,t){return t(e)}tn(2,-53,53,[1]);function ei(e,t){return(n,i,r,l)=>null==l?He:t(e(i))}const ti={show:!0,live:!0,isolate:!1,mount:()=>{},markers:{show:!0,width:2,stroke:function(e,t){let n=e.series[t];return n.width?n.stroke(e,t):n.points.width?n.points.stroke(e,t):null},fill:function(e,t){return e.series[t].fill(e,t)},dash:"solid"},idx:null,idxs:null,values:[]};const ni=[0,0];function ii(e,t,n,i=!0){return e=>{0==e.button&&(!i||e.target==t)&&n(e)}}function ri(e,t,n,i=!0){return e=>{(!i||e.target==t)&&n(e)}}const li={show:!0,x:!0,y:!0,lock:!1,move:function(e,t,n){return ni[0]=t,ni[1]=n,ni},points:{one:!1,show:function(e,t){let n=e.cursor.points,i=Je(),r=n.size(e,t);Ge(i,ke,r),Ge(i,Se,r);let l=r/-2;Ge(i,"marginLeft",l),Ge(i,"marginTop",l);let s=n.width(e,t,r);return s&&Ge(i,"borderWidth",s),i},size:function(e,t){return e.series[t].points.size},width:0,stroke:function(e,t){let n=e.series[t].points;return n._stroke||n._fill},fill:function(e,t){let n=e.series[t].points;return n._fill||n._stroke}},bind:{mousedown:ii,mouseup:ii,click:ii,dblclick:ii,mousemove:ri,mouseleave:ri,mouseenter:ri},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(e,t)=>{t.stopPropagation(),t.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(e,t,n,i,r)=>i-r,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},si={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},oi=fn({},si,{filter:jt}),ai=fn({},oi,{size:10}),ci=fn({},si,{show:!1}),ui='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',di="bold "+ui,hi={show:!0,scale:"x",stroke:Te,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:di,side:2,grid:oi,ticks:ai,border:ci,font:ui,lineGap:1.5,rotate:0},pi={show:!0,scale:"x",auto:!1,sorted:1,min:Ft,max:-Ft,idxs:[]};function fi(e,t,n,i,r){return t.map(e=>null==e?"":$t(e))}function gi(e,t,n,i,r,l,s){let o=[],a=Xt.get(r)||0;for(let e=n=s?n:Qt(Zt(n,r),a);e<=i;e=Qt(e+r,a))o.push(Object.is(e,-0)?0:e);return o}function mi(e,t,n,i,r,l,s){const o=[],a=e.scales[e.axes[t].scale].log,c=Ct((10==a?Rt:Nt)(n));r=Pt(a,c),10==a&&(r=Pn[at(r,Pn)]);let u=n,d=r*a;10==a&&(d=Pn[at(d,Pn)]);do{o.push(u),u+=r,10!=a||Xt.has(u)||(u=Qt(u,Xt.get(r))),u>=d&&(d=(r=u)*a,10==a&&(d=Pn[at(d,Pn)]))}while(u<=i);return o}function _i(e,t,n,i,r,l,s){let o=e.scales[e.axes[t].scale].asinh,a=i>o?mi(e,t,Dt(o,n),i,r):[o],c=i>=0&&n<=0?[0]:[];return(n<-o?mi(e,t,Dt(o,-i),-n,r):[o]).reverse().map(e=>-e).concat(c,a)}const vi=/./,bi=/[12357]/,yi=/[125]/,xi=/1/,wi=(e,t,n,i)=>e.map((e,r)=>4==t&&0==e||r%i==0&&n.test(e.toExponential()[e<0?1:0])?e:null);function $i(e,t,n,i,r){let l=e.axes[n],s=l.scale,o=e.scales[s],a=e.valToPos,c=l._space,u=a(10,s),d=a(9,s)-u>=c?vi:a(7,s)-u>=c?bi:a(5,s)-u>=c?yi:xi;if(d==xi){let e=At(a(1,s)-u);if(e<c)return wi(t.slice().reverse(),o.distr,d,Mt(c/e)).reverse()}return wi(t,o.distr,d,1)}function ki(e,t,n,i,r){let l=e.axes[n],s=l.scale,o=l._space,a=e.valToPos,c=At(a(1,s)-a(2,s));return c<o?wi(t.slice().reverse(),3,vi,Mt(o/c)).reverse():t}function Si(e,t,n,i){return null==i?He:null==t?"":$t(t)}const Ai={show:!0,scale:"y",stroke:Te,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:di,side:3,grid:oi,ticks:ai,border:ci,font:ui,lineGap:1.5,rotate:0};const Ci={scale:null,auto:!0,sorted:0,min:Ft,max:-Ft},Ei=(e,t,n,i,r)=>r,Mi={show:!0,auto:!0,sorted:0,gaps:Ei,alpha:1,facets:[fn({},Ci,{scale:"x"}),fn({},Ci,{scale:"y"})]},Ti={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:Ei,alpha:1,points:{show:function(e,t){let{scale:n,idxs:i}=e.series[0],r=e._data[0],l=e.valToPos(r[i[0]],n,!0),s=e.valToPos(r[i[1]],n,!0),o=At(s-l)/(e.series[t].points.space*Be);return i[1]-i[0]<=o},filter:null},values:null,min:Ft,max:-Ft,idxs:[],path:null,clip:null};function Di(e,t,n,i,r){return n/10}const Pi={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},zi=fn({},Pi,{time:!1,ori:1}),Ri={};function Ni(e,t){let n=Ri[e];return n||(n={key:e,plots:[],sub(e){n.plots.push(e)},unsub(e){n.plots=n.plots.filter(t=>t!=e)},pub(e,t,i,r,l,s,o){for(let a=0;a<n.plots.length;a++)n.plots[a]!=t&&n.plots[a].pub(e,t,i,r,l,s,o)}},null!=e&&(Ri[e]=n)),n}function Oi(e,t,n){const i=e.mode,r=e.series[t],l=2==i?e._data[t]:e._data,s=e.scales,o=e.bbox;let a=l[0],c=2==i?l[1]:l[t],u=2==i?s[r.facets[0].scale]:s[e.series[0].scale],d=2==i?s[r.facets[1].scale]:s[r.scale],h=o.left,p=o.top,f=o.width,g=o.height,m=e.valToPosH,_=e.valToPosV;return 0==u.ori?n(r,a,c,u,d,m,_,h,p,f,g,qi,Yi,Vi,Zi,Qi):n(r,a,c,u,d,_,m,p,h,g,f,Bi,Ki,Gi,Ji,Xi)}function Fi(e,t){let n=0,i=0,r=yt(e.bands,rn);for(let e=0;e<r.length;e++){let l=r[e];l.series[0]==t?n=l.dir:l.series[1]==t&&(1==l.dir?i|=1:i|=2)}return[n,1==i?-1:2==i?1:3==i?2:0]}function Wi(e,t,n,i,r){let l=e.mode,s=e.series[t],o=2==l?s.facets[1].scale:s.scale,a=e.scales[o];return-1==r?a.min:1==r?a.max:3==a.distr?1==a.dir?a.min:a.max:0}function Li(e,t,n,i,r,l){return Oi(e,t,(e,t,s,o,a,c,u,d,h,p,f)=>{let g=e.pxRound;const m=o.dir*(0==o.ori?1:-1),_=0==o.ori?Yi:Ki;let v,b;1==m?(v=n,b=i):(v=i,b=n);let y=g(c(t[v],o,p,d)),x=g(u(s[v],a,f,h)),w=g(c(t[b],o,p,d)),$=g(u(1==l?a.max:a.min,a,f,h)),k=new Path2D(r);return _(k,w,$),_(k,y,$),_(k,y,x),k})}function Hi(e,t,n,i,r,l){let s=null;if(e.length>0){s=new Path2D;const o=0==t?Vi:Gi;let a=n;for(let t=0;t<e.length;t++){let n=e[t];if(n[1]>n[0]){let e=n[0]-a;e>0&&o(s,a,i,e,i+l),a=n[1]}}let c=n+r-a,u=10;c>0&&o(s,a,i-u/2,c,i+l+u)}return s}function Ui(e,t,n,i,r,l,s){let o=[],a=e.length;for(let c=1==r?n:i;c>=n&&c<=i;c+=r){if(null===t[c]){let u=c,d=c;if(1==r)for(;++c<=i&&null===t[c];)d=c;else for(;--c>=n&&null===t[c];)d=c;let h=l(e[u]),p=d==u?h:l(e[d]),f=u-r;h=s<=0&&f>=0&&f<a?l(e[f]):h;let g=d+r;p=s>=0&&g>=0&&g<a?l(e[g]):p,p>=h&&o.push([h,p])}}return o}function Ii(e){return 0==e?It:1==e?Et:t=>Gt(t,e)}function ji(e){let t=0==e?qi:Bi,n=0==e?(e,t,n,i,r,l)=>{e.arcTo(t,n,i,r,l)}:(e,t,n,i,r,l)=>{e.arcTo(n,t,r,i,l)},i=0==e?(e,t,n,i,r)=>{e.rect(t,n,i,r)}:(e,t,n,i,r)=>{e.rect(n,t,r,i)};return(e,r,l,s,o,a=0,c=0)=>{0==a&&0==c?i(e,r,l,s,o):(a=Tt(a,s/2,o/2),c=Tt(c,s/2,o/2),t(e,r+a,l),n(e,r+s,l,r+s,l+o,a),n(e,r+s,l+o,r,l+o,c),n(e,r,l+o,r,l,c),n(e,r,l,r+s,l,a),e.closePath())}}const qi=(e,t,n)=>{e.moveTo(t,n)},Bi=(e,t,n)=>{e.moveTo(n,t)},Yi=(e,t,n)=>{e.lineTo(t,n)},Ki=(e,t,n)=>{e.lineTo(n,t)},Vi=ji(0),Gi=ji(1),Zi=(e,t,n,i,r,l)=>{e.arc(t,n,i,r,l)},Ji=(e,t,n,i,r,l)=>{e.arc(n,t,i,r,l)},Qi=(e,t,n,i,r,l,s)=>{e.bezierCurveTo(t,n,i,r,l,s)},Xi=(e,t,n,i,r,l,s)=>{e.bezierCurveTo(n,t,r,i,s,l)};function er(e){return(e,t,n,i,r)=>Oi(e,t,(t,l,s,o,a,c,u,d,h,p,f)=>{let g,m,{pxRound:_,points:v}=t;0==o.ori?(g=qi,m=Zi):(g=Bi,m=Ji);const b=Qt(v.width*Be,3);let y=(v.size-v.width)/2*Be,x=Qt(2*y,3),w=new Path2D,$=new Path2D,{left:k,top:S,width:A,height:C}=e.bbox;Vi($,k-x,S-x,A+2*x,C+2*x);const E=e=>{if(null!=s[e]){let t=_(c(l[e],o,p,d)),n=_(u(s[e],a,f,h));g(w,t+y,n),m(w,t,n,y,0,2*St)}};if(r)r.forEach(E);else for(let e=n;e<=i;e++)E(e);return{stroke:b>0?w:null,fill:w,clip:$,flags:3}})}function tr(e){return(t,n,i,r,l,s)=>{i!=r&&(l!=i&&s!=i&&e(t,n,i),l!=r&&s!=r&&e(t,n,r),e(t,n,s))}}const nr=tr(Yi),ir=tr(Ki);function rr(e){const t=yt(e?.alignGaps,0);return(e,n,i,r)=>Oi(e,n,(l,s,o,a,c,u,d,h,p,f,g)=>{[i,r]=ht(o,i,r);let m,_,v=l.pxRound,b=e=>v(u(e,a,f,h)),y=e=>v(d(e,c,g,p));0==a.ori?(m=Yi,_=nr):(m=Ki,_=ir);const x=a.dir*(0==a.ori?1:-1),w={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},$=w.stroke;let k=!1;if(r-i>=4*f){let t,n,l,c=t=>e.posToVal(t,a.key,!0),u=null,d=null,h=b(s[1==x?i:r]),p=b(s[i]),f=b(s[r]),g=c(1==x?p+1:f-1);for(let e=1==x?i:r;e>=i&&e<=r;e+=x){let i=s[e],r=(1==x?i<g:i>g)?h:b(i),l=o[e];r==h?null!=l?(n=l,null==u?(m($,r,y(n)),t=u=d=n):n<u?u=n:n>d&&(d=n)):null===l&&(k=!0):(null!=u&&_($,h,y(u),y(d),y(t),y(n)),null!=l?(n=l,m($,r,y(n)),u=d=t=n):(u=d=null,null===l&&(k=!0)),h=r,g=c(h+x))}null!=u&&u!=d&&l!=h&&_($,h,y(u),y(d),y(t),y(n))}else for(let e=1==x?i:r;e>=i&&e<=r;e+=x){let t=o[e];null===t?k=!0:null!=t&&m($,b(s[e]),y(t))}let[S,A]=Fi(e,n);if(null!=l.fill||0!=S){let t=w.fill=new Path2D($),o=y(l.fillTo(e,n,l.min,l.max,S)),a=b(s[i]),c=b(s[r]);-1==x&&([c,a]=[a,c]),m(t,c,o),m(t,a,o)}if(!l.spanGaps){let c=[];k&&c.push(...Ui(s,o,i,r,x,b,t)),w.gaps=c=l.gaps(e,n,i,r,c),w.clip=Hi(c,a.ori,h,p,f,g)}return 0!=A&&(w.band=2==A?[Li(e,n,i,r,$,-1),Li(e,n,i,r,$,1)]:Li(e,n,i,r,$,A)),w})}function lr(e,t,n,i,r,l,s=Ft){if(e.length>1){let o=null;for(let a=0,c=1/0;a<e.length;a++)if(void 0!==t[a]){if(null!=o){let t=At(e[a]-e[o]);t<c&&(c=t,s=At(n(e[a],i,r,l)-n(e[o],i,r,l)))}o=a}}return s}function sr(e,t,n,i,r,l){const s=e.length;if(s<2)return null;const o=new Path2D;if(n(o,e[0],t[0]),2==s)i(o,e[1],t[1]);else{let n=Array(s),i=Array(s-1),l=Array(s-1),a=Array(s-1);for(let n=0;n<s-1;n++)l[n]=t[n+1]-t[n],a[n]=e[n+1]-e[n],i[n]=l[n]/a[n];n[0]=i[0];for(let e=1;e<s-1;e++)0===i[e]||0===i[e-1]||i[e-1]>0!=i[e]>0?n[e]=0:(n[e]=3*(a[e-1]+a[e])/((2*a[e]+a[e-1])/i[e-1]+(a[e]+2*a[e-1])/i[e]),isFinite(n[e])||(n[e]=0));n[s-1]=i[s-2];for(let i=0;i<s-1;i++)r(o,e[i]+a[i]/3,t[i]+n[i]*a[i]/3,e[i+1]-a[i]/3,t[i+1]-n[i+1]*a[i]/3,e[i+1],t[i+1])}return o}const or=new Set;function ar(){for(let e of or)e.syncRect(!0)}Ue&&(st("resize",je,ar),st("scroll",je,ar,!0),st(Le,je,()=>{$r.pxRatio=Be}));const cr=rr(),ur=er();function dr(e,t,n,i){return(i?[e[0],e[1]].concat(e.slice(2)):[e[0]].concat(e.slice(1))).map((e,i)=>hr(e,i,t,n))}function hr(e,t,n,i){return fn({},0==t?n:i,e)}function pr(e,t,n){return null==t?ln:[t,n]}const fr=pr;function gr(e,t,n){return null==t?ln:bt(t,n,.1,!0)}function mr(e,t,n,i){return null==t?ln:ft(t,n,e.scales[i].log,!1)}const _r=mr;function vr(e,t,n,i){return null==t?ln:gt(t,n,e.scales[i].log,!1)}const br=vr;function yr(e,t,n,i,r){let l=Dt(Wt(e),Wt(t)),s=t-e,o=at(r/i*s,n);do{let e=n[o],t=i*e/s;if(t>=r&&l+(e<5?Xt.get(e):0)<=17)return[e,t]}while(++o<n.length);return[0,0]}function xr(e){let t,n;return[e=e.replace(/(\d+)px/,(e,i)=>(t=Et((n=+i)*Be))+"px"),t,n]}function wr(e){e.show&&[e.font,e.labelFont].forEach(e=>{let t=Qt(e[2]*Be,1);e[0]=e[0].replace(/[0-9.]+px/,t+"px"),e[1]=t})}function $r(e,t,n){const i={mode:yt(e.mode,1)},r=i.mode;function l(e,t,n,i){let r=t.valToPct(e);return i+n*(-1==t.dir?1-r:r)}function s(e,t,n,i){let r=t.valToPct(e);return i+n*(-1==t.dir?r:1-r)}function o(e,t,n,i){return 0==t.ori?l(e,t,n,i):s(e,t,n,i)}i.valToPosH=l,i.valToPosV=s;let a=!1;i.status=0;const c=i.root=Je("uplot");if(null!=e.id&&(c.id=e.id),Ke(c,e.class),e.title){Je("u-title",c).textContent=e.title}const u=Ze("canvas"),d=i.ctx=u.getContext("2d"),h=Je("u-wrap",c);st("click",h,e=>{if(e.target===f){(ai!=ii||ci!=ri)&&Ei.click(i,e)}},!0);const p=i.under=Je("u-under",h);h.appendChild(u);const f=i.over=Je("u-over",h),g=+yt((e=pn(e)).pxAlign,1),m=Ii(g);(e.plugins||[]).forEach(t=>{t.opts&&(e=t.opts(i,e)||e)});const _=e.ms||.001,v=i.series=1==r?dr(e.series||[],pi,Ti,!1):function(e,t){return e.map((e,n)=>0==n?{}:fn({},t,e))}(e.series||[null],Mi),b=i.axes=dr(e.axes||[],hi,Ai,!0),y=i.scales={},x=i.bands=e.bands||[];x.forEach(e=>{e.fill=Ut(e.fill||null),e.dir=yt(e.dir,-1)});const w=2==r?v[1].facets[0].scale:v[0].scale,$={axes:function(){for(let e=0;e<b.length;e++){let t=b[e];if(!t.show||!t._show)continue;let n,r,l=t.side,s=l%2,a=t.stroke(i,e),c=0==l||3==l?-1:1,[u,h]=t._found;if(null!=t.label){let o=t.labelGap*c,p=Et((t._lpos+o)*Be);kn(t.labelFont[0],a,"center",2==l?Ae:Ce),d.save(),1==s?(n=r=0,d.translate(p,Et(fe+me/2)),d.rotate((3==l?-St:St)/2)):(n=Et(pe+ge/2),r=p);let f=Ht(t.label)?t.label(i,e,u,h):t.label;d.fillText(f,n,r),d.restore()}if(0==h)continue;let p=y[t.scale],f=0==s?ge:me,g=0==s?pe:fe,_=t._splits,v=2==p.distr?_.map(e=>bn[e]):_,x=2==p.distr?bn[_[1]]-bn[_[0]]:u,w=t.ticks,$=t.border,k=w.show?w.size:0,S=Et(k*Be),A=Et((2==t.alignTo?t._size-k-t.gap:t.gap)*Be),C=t._rotate*-St/180,E=m(t._pos*Be),M=E+(S+A)*c;r=0==s?M:0,n=1==s?M:0,kn(t.font[0],a,1==t.align?Ee:2==t.align?Me:C>0?Ee:C<0?Me:0==s?"center":3==l?Me:Ee,C||1==s?"middle":2==l?Ae:Ce);let T=t.font[1]*t.lineGap,D=_.map(e=>m(o(e,p,f,g))),P=t._values;for(let e=0;e<P.length;e++){let t=P[e];if(null!=t){0==s?n=D[e]:r=D[e],t=""+t;let i=-1==t.indexOf("\n")?[t]:t.split(/\n/gm);for(let e=0;e<i.length;e++){let t=i[e];C?(d.save(),d.translate(n,r+e*T),d.rotate(C),d.fillText(t,0,0),d.restore()):d.fillText(t,n,r+e*T)}}}w.show&&On(D,w.filter(i,v,e,h,x),s,l,E,S,Qt(w.width*Be,3),w.stroke(i,e),w.dash,w.cap);let z=t.grid;z.show&&On(D,z.filter(i,v,e,h,x),s,0==s?2:1,0==s?fe:pe,0==s?me:ge,Qt(z.width*Be,3),z.stroke(i,e),z.dash,z.cap),$.show&&On([E],[1],0==s?1:0,0==s?1:2,1==s?fe:pe,1==s?me:ge,Qt($.width*Be,3),$.stroke(i,e),$.dash,$.cap)}zr("drawAxes")},series:function(){if(Nt>0){let e=v.some(e=>e._focus)&&vn!=et.alpha;e&&(d.globalAlpha=vn=et.alpha),v.forEach((e,n)=>{if(n>0&&e.show&&(En(n,!1),En(n,!0),null==e._paths)){let l=vn;vn!=e.alpha&&(d.globalAlpha=vn=e.alpha);let s=2==r?[0,t[n][0].length-1]:function(e){let t=Lt(Wt-1,0,Nt-1),n=Lt(It+1,0,Nt-1);for(;null==e[t]&&t>0;)t--;for(;null==e[n]&&n<Nt-1;)n++;return[t,n]}(t[n]);e._paths=e.paths(i,n,s[0],s[1]),vn!=l&&(d.globalAlpha=vn=l)}}),v.forEach((e,t)=>{if(t>0&&e.show){let n=vn;vn!=e.alpha&&(d.globalAlpha=vn=e.alpha),null!=e._paths&&Mn(t,!1);{let n=null!=e._paths?e._paths.gaps:null,r=e.points.show(i,t,Wt,It,n),l=e.points.filter(i,t,r,n);(r||l)&&(e.points._paths=e.points.paths(i,t,Wt,It,l),Mn(t,!0))}vn!=n&&(d.globalAlpha=vn=n),zr("drawSeries",t)}}),e&&(d.globalAlpha=vn=1)}}},k=(e.drawOrder||["axes","series"]).map(e=>$[e]);function S(e){const t=3==e.distr?t=>Rt(t>0?t:e.clamp(i,t,e.min,e.max,e.key)):4==e.distr?t=>Ot(t,e.asinh):100==e.distr?t=>e.fwd(t):e=>e;return n=>{let i=t(n),{_min:r,_max:l}=e;return(i-r)/(l-r)}}function A(t){let n=y[t];if(null==n){let i=(e.scales||nn)[t]||nn;if(null!=i.from){A(i.from);let e=fn({},y[i.from],i,{key:t});e.valToPct=S(e),y[t]=e}else{n=y[t]=fn({},t==w?Pi:zi,i),n.key=t;let e=n.time,l=n.range,s=sn(l);if((t!=w||2==r&&!e)&&(!s||null!=l[0]&&null!=l[1]||(l={min:null==l[0]?mt:{mode:1,hard:l[0],soft:l[0]},max:null==l[1]?mt:{mode:1,hard:l[1],soft:l[1]}},s=!1),!s&&cn(l))){let e=l;l=(t,n,i)=>null==n?ln:bt(n,i,e)}n.range=Ut(l||(e?fr:t==w?3==n.distr?_r:4==n.distr?br:pr:3==n.distr?mr:4==n.distr?vr:gr)),n.auto=Ut(!s&&n.auto),n.clamp=Ut(n.clamp||Di),n._min=n._max=null,n.valToPct=S(n)}}}A("x"),A("y"),1==r&&v.forEach(e=>{A(e.scale)}),b.forEach(e=>{A(e.scale)});for(let t in e.scales)A(t);const C=y[w],E=C.distr;let M,T;0==C.ori?(Ke(c,"u-hz"),M=l,T=s):(Ke(c,"u-vt"),M=s,T=l);const D={};for(let e in y){let t=y[e];null==t.min&&null==t.max||(D[e]={min:t.min,max:t.max},t.min=t.max=null)}const P=e.tzDate||(e=>new Date(Et(e/_))),z=e.fmtDate||Sn,R=1==_?Yn(P):Gn(P),N=Jn(P,Zn(1==_?Bn:Vn,z)),O=ei(P,Xn("{YYYY}-{MM}-{DD} {h}:{mm}{aa}",z)),F=[],W=i.legend=fn({},ti,e.legend),L=i.cursor=fn({},li,{drag:{y:2==r}},e.cursor),H=W.show,U=L.show,I=W.markers;let j,q,B;W.idxs=F,I.width=Ut(I.width),I.dash=Ut(I.dash),I.stroke=Ut(I.stroke),I.fill=Ut(I.fill);let Y,K=[],V=[],G=!1,Z={};if(W.live){const e=v[1]?v[1].values:null;G=null!=e,Y=G?e(i,1,0):{_:0};for(let e in Y)Z[e]=He}if(H)if(j=Ze("table","u-legend",c),B=Ze("tbody",null,j),W.mount(i,j),G){q=Ze("thead",null,j,B);let e=Ze("tr",null,q);for(var J in Ze("th",null,e),Y)Ze("th",$e,e).textContent=J}else Ke(j,"u-inline"),W.live&&Ke(j,"u-live");const Q={show:!0},X={show:!1};const ee=new Map;function te(e,t,n,r=!0){const l=ee.get(t)||{},s=L.bind[e](i,t,n,r);s&&(st(e,t,l[e]=s),ee.set(t,l))}function ne(e,t,n){const i=ee.get(t)||{};for(let n in i)null!=e&&n!=e||(ot(n,t,i[n]),delete i[n]);null==e&&ee.delete(t)}let ie=0,re=0,le=0,se=0,oe=0,ae=0,ce=oe,ue=ae,de=le,he=se,pe=0,fe=0,ge=0,me=0;i.bbox={};let _e=!1,ve=!1,be=!1,ye=!1,xe=!1,Te=!1;function We(e,t,n){(n||e!=i.width||t!=i.height)&&Ue(e,t),Ln(!1),be=!0,ve=!0,yi()}function Ue(e,t){i.width=ie=le=e,i.height=re=se=t,oe=ae=0,function(){let e=!1,t=!1,n=!1,i=!1;b.forEach((r,l)=>{if(r.show&&r._show){let{side:l,_size:s}=r,o=l%2,a=s+(null!=r.label?r.labelSize:0);a>0&&(o?(le-=a,3==l?(oe+=a,i=!0):n=!0):(se-=a,0==l?(ae+=a,e=!0):t=!0))}}),wt[0]=e,wt[1]=n,wt[2]=t,wt[3]=i,le-=zt[1]+zt[3],oe+=zt[3],se-=zt[2]+zt[0],ae+=zt[0]}(),function(){let e=oe+le,t=ae+se,n=oe,i=ae;function r(r,l){switch(r){case 1:return e+=l,e-l;case 2:return t+=l,t-l;case 3:return n-=l,n+l;case 0:return i-=l,i+l}}b.forEach((e,t)=>{if(e.show&&e._show){let t=e.side;e._pos=r(t,e._size),null!=e.label&&(e._lpos=r(t,e.labelSize))}})}();let n=i.bbox;pe=n.left=Gt(oe*Be,.5),fe=n.top=Gt(ae*Be,.5),ge=n.width=Gt(le*Be,.5),me=n.height=Gt(se*Be,.5)}const qe=3;if(i.setSize=function({width:e,height:t}){We(e,t)},null==L.dataIdx){let e=L.hover,n=e.skip=new Set(e.skip??[]);n.add(void 0);let i=e.prox=Ut(e.prox),r=e.bias??=0;L.dataIdx=(e,l,s,o)=>{if(0==l)return s;let a=s,c=i(e,l,s,o)??Ft,u=c>=0&&c<Ft,d=0==C.ori?le:se,h=L.left,p=t[0],f=t[l];if(n.has(f[s])){a=null;let e,t=null,i=null;if(0==r||-1==r)for(e=s;null==t&&e-- >0;)n.has(f[e])||(t=e);if(0==r||1==r)for(e=s;null==i&&e++<f.length;)n.has(f[e])||(i=e);if(null!=t||null!=i)if(u){let e=h-(null==t?-1/0:M(p[t],C,d,0)),n=(null==i?1/0:M(p[i],C,d,0))-h;e<=n?e<=c&&(a=t):n<=c&&(a=i)}else a=null==i?t:null==t?i:s-t<=i-s?t:i}else if(u){At(h-M(p[s],C,d,0))>c&&(a=null)}return a}}const Ye=e=>{L.event=e};L.idxs=F,L._lock=!1;let Qe=L.points;Qe.show=Ut(Qe.show),Qe.size=Ut(Qe.size),Qe.stroke=Ut(Qe.stroke),Qe.width=Ut(Qe.width),Qe.fill=Ut(Qe.fill);const et=i.focus=fn({},e.focus||{alpha:.3},L.focus),nt=et.prox>=0,rt=nt&&Qe.one;let lt=[],ct=[],_t=[];function vt(e,t){let n=Qe.show(i,t);if(n instanceof HTMLElement)return Ke(n,"u-cursor-pt"),Ke(n,e.class),Xe(n,-10,-10,le,se),f.insertBefore(n,lt[t]),n}function xt(e,t){if(1==r||t>0){let t=1==r&&y[e.scale].time,n=e.value;e.value=t?an(n)?ei(P,Xn(n,z)):n||O:n||Si,e.label=e.label||(t?"Time":"Value")}if(rt||t>0){e.width=null==e.width?1:e.width,e.paths=e.paths||cr||qt,e.fillTo=Ut(e.fillTo||Wi),e.pxAlign=+yt(e.pxAlign,g),e.pxRound=Ii(e.pxAlign),e.stroke=Ut(e.stroke||null),e.fill=Ut(e.fill||null),e._stroke=e._fill=e._paths=e._focus=null;let t=Qt((3+2*(Dt(1,e.width)||1))*1,3),n=e.points=fn({},{size:t,width:Dt(1,.2*t),stroke:e.stroke,space:2*t,paths:ur,_stroke:null,_fill:null},e.points);n.show=Ut(n.show),n.filter=Ut(n.filter),n.fill=Ut(n.fill),n.stroke=Ut(n.stroke),n.paths=Ut(n.paths),n.pxAlign=e.pxAlign}if(H){let n=function(e,t){if(0==t&&(G||!W.live||2==r))return ln;let n=[],l=Ze("tr","u-series",B,B.childNodes[t]);Ke(l,e.class),e.show||Ke(l,we);let s=Ze("th",null,l);if(I.show){let e=Je("u-marker",s);if(t>0){let n=I.width(i,t);n&&(e.style.border=n+"px "+I.dash(i,t)+" "+I.stroke(i,t)),e.style.background=I.fill(i,t)}}let o=Je($e,s);for(var a in e.label instanceof HTMLElement?o.appendChild(e.label):o.textContent=e.label,t>0&&(I.show||(o.style.color=e.width>0?I.stroke(i,t):I.fill(i,t)),te("click",s,t=>{if(L._lock)return;Ye(t);let n=v.indexOf(e);if((t.ctrlKey||t.metaKey)!=W.isolate){let e=v.some((e,t)=>t>0&&t!=n&&e.show);v.forEach((t,i)=>{i>0&&ji(i,e?i==n?Q:X:Q,!0,Nr.setSeries)})}else ji(n,{show:!e.show},!0,Nr.setSeries)},!1),nt&&te(Ne,s,t=>{L._lock||(Ye(t),ji(v.indexOf(e),Ki,!0,Nr.setSeries))},!1)),Y){let e=Ze("td","u-value",l);e.textContent="--",n.push(e)}return[l,n]}(e,t);K.splice(t,0,n[0]),V.splice(t,0,n[1]),W.values.push(null)}if(U){F.splice(t,0,null);let n=null;rt?0==t&&(n=vt(e,t)):t>0&&(n=vt(e,t)),lt.splice(t,0,n),ct.splice(t,0,0),_t.splice(t,0,0)}zr("addSeries",t)}i.addSeries=function(e,t){t=t??v.length,e=1==r?hr(e,t,pi,Ti):hr(e,t,{},Mi),v.splice(t,0,e),xt(v[t],t)},i.delSeries=function(e){if(v.splice(e,1),H){W.values.splice(e,1),V.splice(e,1);let t=K.splice(e,1)[0];ne(null,t.firstChild),t.remove()}U&&(F.splice(e,1),lt.splice(e,1)[0].remove(),ct.splice(e,1),_t.splice(e,1)),zr("delSeries",e)};const wt=[!1,!1,!1,!1];function $t(e,t,n,i){let[r,l,s,o]=n,a=t%2,c=0;return 0==a&&(o||l)&&(c=0==t&&!r||2==t&&!s?Et(hi.size/3):0),1==a&&(r||s)&&(c=1==t&&!l||3==t&&!o?Et(Ai.size/2):0),c}const Ct=i.padding=(e.padding||[$t,$t,$t,$t]).map(e=>Ut(yt(e,$t))),zt=i._padding=Ct.map((e,t)=>e(i,t,wt,0));let Nt,Wt=null,It=null;const Kt=1==r?v[0].idxs:null;let Vt,Zt,Jt,tn,on,dn,hn,gn,_n,vn,bn=null,yn=!1;function xn(e,n){if(t=e??[],i.data=i._data=t,2==r){Nt=0;for(let e=1;e<v.length;e++)Nt+=t[e][0].length}else{0==t.length&&(i.data=i._data=t=[[]]),bn=t[0],Nt=bn.length;let e=t;if(2==E){e=t.slice();let n=e[0]=Array(Nt);for(let e=0;e<Nt;e++)n[e]=e}i._data=t=e}if(Ln(!0),zr("setData"),2==E&&(be=!0),!1!==n){let e=C;e.auto(i,yn)?wn():Ui(w,e.min,e.max),ye=ye||L.left>=0,Te=!0,yi()}}function wn(){let e,n;yn=!0,1==r&&(Nt>0?(Wt=Kt[0]=0,It=Kt[1]=Nt-1,e=t[0][Wt],n=t[0][It],2==E?(e=Wt,n=It):e==n&&(3==E?[e,n]=ft(e,e,C.log,!1):4==E?[e,n]=gt(e,e,C.log,!1):C.time?n=e+Et(86400/_):[e,n]=bt(e,n,.1,!0))):(Wt=Kt[0]=e=null,It=Kt[1]=n=null)),Ui(w,e,n)}function $n(e,t,n,i,r,l){e??=De,n??=rn,i??="butt",r??=De,l??="round",e!=Vt&&(d.strokeStyle=Vt=e),r!=Zt&&(d.fillStyle=Zt=r),t!=Jt&&(d.lineWidth=Jt=t),l!=on&&(d.lineJoin=on=l),i!=dn&&(d.lineCap=dn=i),n!=tn&&d.setLineDash(tn=n)}function kn(e,t,n,i){t!=Zt&&(d.fillStyle=Zt=t),e!=hn&&(d.font=hn=e),n!=gn&&(d.textAlign=gn=n),i!=_n&&(d.textBaseline=_n=i)}function An(e,t,n,r,l=0){if(r.length>0&&e.auto(i,yn)&&(null==t||null==t.min)){let t=yt(Wt,0),i=yt(It,r.length-1),s=null==n.min?function(e,t,n,i=0,r=!1){let l=r?pt:ht,s=r?dt:ut;[t,n]=l(e,t,n);let o=e[t],a=e[t];if(t>-1)if(1==i)o=e[t],a=e[n];else if(-1==i)o=e[n],a=e[t];else for(let i=t;i<=n;i++){let t=e[i];s(t)&&(t<o?o=t:t>a&&(a=t))}return[o??Ft,a??-Ft]}(r,t,i,l,3==e.distr):[n.min,n.max];e.min=Tt(e.min,n.min=s[0]),e.max=Dt(e.max,n.max=s[1])}}i.setData=xn;const Cn={min:null,max:null};function En(e,t){let n=t?v[e].points:v[e];n._stroke=n.stroke(i,e),n._fill=n.fill(i,e)}function Mn(e,n){let r=n?v[e].points:v[e],{stroke:l,fill:s,clip:o,flags:a,_stroke:c=r._stroke,_fill:u=r._fill,_width:h=r.width}=r._paths;h=Qt(h*Be,3);let p=null,f=h%2/2;n&&null==u&&(u=h>0?"#fff":c);let g=1==r.pxAlign&&f>0;if(g&&d.translate(f,f),!n){let e=pe-h/2,t=fe-h/2,n=ge+h,i=me+h;p=new Path2D,p.rect(e,t,n,i)}n?zn(c,h,r.dash,r.cap,u,l,s,a,o):function(e,n,r,l,s,o,a,c,u,d,h){let p=!1;0!=u&&x.forEach((f,g)=>{if(f.series[0]==e){let e,m=v[f.series[1]],_=t[f.series[1]],b=(m._paths||nn).band;sn(b)&&(b=1==f.dir?b[0]:b[1]);let y=null;m.show&&b&&function(e,t,n){for(t=yt(t,0),n=yt(n,e.length-1);t<=n;){if(null!=e[t])return!0;t++}return!1}(_,Wt,It)?(y=f.fill(i,g)||o,e=m._paths.clip):b=null,zn(n,r,l,s,y,a,c,u,d,h,e,b),p=!0}}),p||zn(n,r,l,s,o,a,c,u,d,h)}(e,c,h,r.dash,r.cap,u,l,s,a,p,o),g&&d.translate(-f,-f)}const Tn=3;function zn(e,t,n,i,r,l,s,o,a,c,u,h){$n(e,t,n,i,r),(a||c||h)&&(d.save(),a&&d.clip(a),c&&d.clip(c)),h?(o&Tn)==Tn?(d.clip(h),u&&d.clip(u),Nn(r,s),Rn(e,l,t)):2&o?(Nn(r,s),d.clip(h),Rn(e,l,t)):1&o&&(d.save(),d.clip(h),u&&d.clip(u),Nn(r,s),d.restore(),Rn(e,l,t)):(Nn(r,s),Rn(e,l,t)),(a||c||h)&&d.restore()}function Rn(e,t,n){n>0&&(t instanceof Map?t.forEach((e,t)=>{d.strokeStyle=Vt=t,d.stroke(e)}):null!=t&&e&&d.stroke(t))}function Nn(e,t){t instanceof Map?t.forEach((e,t)=>{d.fillStyle=Zt=t,d.fill(e)}):null!=t&&e&&d.fill(t)}function On(e,t,n,i,r,l,s,o,a,c){let u=s%2/2;1==g&&d.translate(u,u),$n(o,s,a,c,o),d.beginPath();let h,p,f,m,_=r+(0==i||3==i?-l:l);0==n?(p=r,m=_):(h=r,f=_);for(let i=0;i<e.length;i++)null!=t[i]&&(0==n?h=f=e[i]:p=m=e[i],d.moveTo(h,p),d.lineTo(f,m));d.stroke(),1==g&&d.translate(-u,-u)}function Fn(e){let t=!0;return b.forEach((n,r)=>{if(!n.show)return;let l=y[n.scale];if(null==l.min)return void(n._show&&(t=!1,n._show=!1,Ln(!1)));n._show||(t=!1,n._show=!0,Ln(!1));let s=n.side,o=s%2,{min:a,max:c}=l,[u,d]=function(e,t,n,r){let l,s=b[e];if(r<=0)l=[0,0];else{let o=s._space=s.space(i,e,t,n,r);l=yr(t,n,s._incrs=s.incrs(i,e,t,n,r,o),r,o)}return s._found=l}(r,a,c,0==o?le:se);if(0==d)return;let h=2==l.distr,p=n._splits=n.splits(i,r,a,c,u,d,h),f=2==l.distr?p.map(e=>bn[e]):p,g=2==l.distr?bn[p[1]]-bn[p[0]]:u,m=n._values=n.values(i,n.filter(i,f,r,d,g),r,d,g);n._rotate=2==s?n.rotate(i,m,r,d):0;let _=n._size;n._size=Mt(n.size(i,m,r,e)),null!=_&&n._size!=_&&(t=!1)}),t}function Wn(e){let t=!0;return Ct.forEach((n,r)=>{let l=n(i,r,wt,e);l!=zt[r]&&(t=!1),zt[r]=l}),t}function Ln(e){v.forEach((t,n)=>{n>0&&(t._paths=null,e&&(1==r?(t.min=null,t.max=null):t.facets.forEach(e=>{e.min=null,e.max=null})))})}let Hn,Un,In,jn,Qn,ni,ii,ri,si,oi,ai,ci,ui=!1,di=!1,vi=[];function bi(){di=!1;for(let e=0;e<vi.length;e++)zr(...vi[e]);vi.length=0}function yi(){ui||(mn(xi),ui=!0)}function xi(){if(_e&&(!function(){for(let e in y){let t=y[e];null==D[e]&&(null==t.min||null!=D[w]&&t.auto(i,yn))&&(D[e]=Cn)}for(let e in y){let t=y[e];null==D[e]&&null!=t.from&&null!=D[t.from]&&(D[e]=Cn)}null!=D[w]&&Ln(!0);let e={};for(let t in D){let n=D[t];if(null!=n){let l=e[t]=pn(y[t],un);if(null!=n.min)fn(l,n);else if(t!=w||2==r)if(0==Nt&&null==l.from){let e=l.range(i,null,null,t);l.min=e[0],l.max=e[1]}else l.min=Ft,l.max=-Ft}}if(Nt>0){v.forEach((n,l)=>{if(1==r){let r=n.scale,s=D[r];if(null==s)return;let o=e[r];if(0==l){let e=o.range(i,o.min,o.max,r);o.min=e[0],o.max=e[1],Wt=at(o.min,t[0]),It=at(o.max,t[0]),It-Wt>1&&(t[0][Wt]<o.min&&Wt++,t[0][It]>o.max&&It--),n.min=bn[Wt],n.max=bn[It]}else n.show&&n.auto&&An(o,s,n,t[l],n.sorted);n.idxs[0]=Wt,n.idxs[1]=It}else if(l>0&&n.show&&n.auto){let[i,r]=n.facets,s=i.scale,o=r.scale,[a,c]=t[l],u=e[s],d=e[o];null!=u&&An(u,D[s],i,a,i.sorted),null!=d&&An(d,D[o],r,c,r.sorted),n.min=r.min,n.max=r.max}});for(let t in e){let n=e[t],r=D[t];if(null==n.from&&(null==r||null==r.min)){let e=n.range(i,n.min==Ft?null:n.min,n.max==-Ft?null:n.max,t);n.min=e[0],n.max=e[1]}}}for(let t in e){let n=e[t];if(null!=n.from){let r=e[n.from];if(null==r.min)n.min=n.max=null;else{let e=n.range(i,r.min,r.max,t);n.min=e[0],n.max=e[1]}}}let n={},l=!1;for(let t in e){let i=e[t],r=y[t];if(r.min!=i.min||r.max!=i.max){r.min=i.min,r.max=i.max;let e=r.distr;r._min=3==e?Rt(r.min):4==e?Ot(r.min,r.asinh):100==e?r.fwd(r.min):r.min,r._max=3==e?Rt(r.max):4==e?Ot(r.max,r.asinh):100==e?r.fwd(r.max):r.max,n[t]=l=!0}}if(l){v.forEach((e,t)=>{2==r?t>0&&n.y&&(e._paths=null):n[e.scale]&&(e._paths=null)});for(let e in n)be=!0,zr("setScale",e);U&&L.left>=0&&(ye=Te=!0)}for(let e in D)D[e]=null}(),_e=!1),be&&(!function(){let e=!1,t=0;for(;!e;){t++;let n=Fn(t),r=Wn(t);e=t==qe||n&&r,e||(Ue(i.width,i.height),ve=!0)}}(),be=!1),ve){if(Ge(p,Ee,oe),Ge(p,Ae,ae),Ge(p,ke,le),Ge(p,Se,se),Ge(f,Ee,oe),Ge(f,Ae,ae),Ge(f,ke,le),Ge(f,Se,se),Ge(h,ke,ie),Ge(h,Se,re),u.width=Et(ie*Be),u.height=Et(re*Be),b.forEach(({_el:e,_show:t,_size:n,_pos:i,side:r})=>{if(null!=e)if(t){let t=r%2==1;Ge(e,t?"left":"top",i-(3===r||0===r?n:0)),Ge(e,t?"width":"height",n),Ge(e,t?"top":"left",t?ae:oe),Ge(e,t?"height":"width",t?se:le),Ve(e,we)}else Ke(e,we)}),Vt=Zt=Jt=on=dn=hn=gn=_n=tn=null,vn=1,ir(!0),oe!=ce||ae!=ue||le!=de||se!=he){Ln(!1);let e=le/de,t=se/he;if(U&&!ye&&L.left>=0){L.left*=e,L.top*=t,In&&Xe(In,Et(L.left),0,le,se),jn&&Xe(jn,0,Et(L.top),le,se);for(let n=0;n<lt.length;n++){let i=lt[n];null!=i&&(ct[n]*=e,_t[n]*=t,Xe(i,Mt(ct[n]),Mt(_t[n]),le,se))}}if(Fi.show&&!xe&&Fi.left>=0&&Fi.width>0){Fi.left*=e,Fi.width*=e,Fi.top*=t,Fi.height*=t;for(let e in sr)Ge(Li,e,Fi[e])}ce=oe,ue=ae,de=le,he=se}zr("setSize"),ve=!1}ie>0&&re>0&&(d.clearRect(0,0,u.width,u.height),zr("drawClear"),k.forEach(e=>e()),zr("draw")),Fi.show&&xe&&(Hi(Fi),xe=!1),U&&ye&&(tr(null,!0,!1),ye=!1),W.show&&W.live&&Te&&(Xi(),Te=!1),a||(a=!0,i.status=1,zr("ready")),yn=!1,ui=!1}function wi(e,n){let r=y[e];if(null==r.from){if(0==Nt){let t=r.range(i,n.min,n.max,e);n.min=t[0],n.max=t[1]}if(n.min>n.max){let e=n.min;n.min=n.max,n.max=e}if(Nt>1&&null!=n.min&&null!=n.max&&n.max-n.min<1e-16)return;e==w&&2==r.distr&&Nt>0&&(n.min=at(n.min,t[0]),n.max=at(n.max,t[0]),n.min==n.max&&n.max++),D[e]=n,_e=!0,yi()}}i.batch=function(e,t=!1){ui=!0,di=t,e(i),xi(),t&&vi.length>0&&queueMicrotask(bi)},i.redraw=(e,t)=>{be=t||!1,!1!==e?Ui(w,C.min,C.max):yi()},i.setScale=wi;let Ci=!1;const Ei=L.drag;let Ri=Ei.x,Oi=Ei.y;U&&(L.x&&(Hn=Je("u-cursor-x",f)),L.y&&(Un=Je("u-cursor-y",f)),0==C.ori?(In=Hn,jn=Un):(In=Un,jn=Hn),ai=L.left,ci=L.top);const Fi=i.select=fn({show:!0,over:!0,left:0,width:0,top:0,height:0},e.select),Li=Fi.show?Je("u-select",Fi.over?f:p):null;function Hi(e,t){if(Fi.show){for(let t in e)Fi[t]=e[t],t in sr&&Ge(Li,t,e[t]);!1!==t&&zr("setSelect")}}function Ui(e,t,n){wi(e,{min:t,max:n})}function ji(e,t,n,l){null!=t.focus&&function(e){if(e!=Yi){let t=null==e,n=1!=et.alpha;v.forEach((i,l)=>{if(1==r||l>0){let r=t||0==l||l==e;i._focus=t?null:r,n&&function(e,t){v[e].alpha=t,U&&null!=lt[e]&&(lt[e].style.opacity=t);H&&K[e]&&(K[e].style.opacity=t)}(l,r?1:et.alpha)}}),Yi=e,n&&yi()}}(e),null!=t.show&&v.forEach((n,i)=>{i>0&&(e==i||null==e)&&(n.show=t.show,function(e){if(v[e].show)H&&Ve(K[e],we);else if(H&&Ke(K[e],we),U){let t=rt?lt[0]:lt[e];null!=t&&Xe(t,-10,-10,le,se)}}(i),2==r?(Ui(n.facets[0].scale,null,null),Ui(n.facets[1].scale,null,null)):Ui(n.scale,null,null),yi())}),!1!==n&&zr("setSeries",e,t),l&&Wr("setSeries",i,e,t)}let qi,Bi,Yi;i.setSelect=Hi,i.setSeries=ji,i.addBand=function(e,t){e.fill=Ut(e.fill||null),e.dir=yt(e.dir,-1),t=t??x.length,x.splice(t,0,e)},i.setBand=function(e,t){fn(x[e],t)},i.delBand=function(e){null==e?x.length=0:x.splice(e,1)};const Ki={focus:!0};function Vi(e,t,n){let i=y[t];n&&(e=e/Be-(1==i.ori?ae:oe));let r=le;1==i.ori&&(r=se,e=r-e),-1==i.dir&&(e=r-e);let l=i._min,s=l+(i._max-l)*(e/r),o=i.distr;return 3==o?Pt(10,s):4==o?((e,t=1)=>kt.sinh(e)*t)(s,i.asinh):100==o?i.bwd(s):s}function Gi(e,t){Ge(Li,Ee,Fi.left=e),Ge(Li,ke,Fi.width=t)}function Zi(e,t){Ge(Li,Ae,Fi.top=e),Ge(Li,Se,Fi.height=t)}H&&nt&&te(Oe,j,e=>{L._lock||(Ye(e),null!=Yi&&ji(null,Ki,!0,Nr.setSeries))}),i.valToIdx=e=>at(e,t[0]),i.posToIdx=function(e,n){return at(Vi(e,w,n),t[0],Wt,It)},i.posToVal=Vi,i.valToPos=(e,t,n)=>0==y[t].ori?l(e,y[t],n?ge:le,n?pe:0):s(e,y[t],n?me:se,n?fe:0),i.setCursor=(e,t,n)=>{ai=e.left,ci=e.top,tr(null,t,n)};let Ji=0==C.ori?Gi:Zi,Qi=1==C.ori?Gi:Zi;function Xi(e,t){if(null!=e&&(e.idxs?e.idxs.forEach((e,t)=>{F[t]=e}):(e=>void 0===e)(e.idx)||F.fill(e.idx),W.idx=F[0]),H&&W.live){for(let e=0;e<v.length;e++)(e>0||1==r&&!G)&&er(e,F[e]);!function(){if(H&&W.live)for(let e=2==r?1:0;e<v.length;e++){if(0==e&&G)continue;let t=W.values[e],n=0;for(let i in t)V[e][n++].firstChild.nodeValue=t[i]}}()}Te=!1,!1!==t&&zr("setLegend")}function er(e,n){let r,l=v[e],s=0==e&&2==E?bn:t[e];G?r=l.values(i,e,n)??Z:(r=l.value(i,null==n?null:s[n],e,n),r=null==r?Z:{_:r}),W.values[e]=r}function tr(e,n,l){let s;si=ai,oi=ci,[ai,ci]=L.move(i,ai,ci),L.left=ai,L.top=ci,U&&(In&&Xe(In,Et(ai),0,le,se),jn&&Xe(jn,0,Et(ci),le,se));let o=Wt>It;qi=Ft,Bi=null;let a=0==C.ori?le:se,c=1==C.ori?le:se;if(ai<0||0==Nt||o){s=L.idx=null;for(let e=0;e<v.length;e++){let t=lt[e];null!=t&&Xe(t,-10,-10,le,se)}nt&&ji(null,Ki,!0,null==e&&Nr.setSeries),W.live&&(F.fill(s),Te=!0)}else{let e,n,l;1==r&&(e=0==C.ori?ai:ci,n=Vi(e,w),s=L.idx=at(n,t[0],Wt,It),l=M(t[0][s],C,a,0));let o=-10,u=-10,d=0,h=0,p=!0,f="",g="";for(let e=2==r?1:0;e<v.length;e++){let m=v[e],_=F[e],b=null==_?null:1==r?t[e][_]:t[e][1][_],x=L.dataIdx(i,e,s,n),w=null==x?null:1==r?t[e][x]:t[e][1][x];if(Te=Te||w!=b||x!=_,F[e]=x,e>0&&m.show){let n=null==x?-10:x==s?l:M(1==r?t[0][x]:t[e][0][x],C,a,0),_=null==w?-10:T(w,1==r?y[m.scale]:y[m.facets[1].scale],c,0);if(nt&&null!=w){let t=1==C.ori?ai:ci,n=At(et.dist(i,e,x,_,t));if(n<qi){let i=et.bias;if(0!=i){let r=Vi(t,m.scale),l=r>=0?1:-1;l==(w>=0?1:-1)&&(1==l?1==i?w>=r:w<=r:1==i?w<=r:w>=r)&&(qi=n,Bi=e)}else qi=n,Bi=e}}if(Te||rt){let t,r;0==C.ori?(t=n,r=_):(t=_,r=n);let l,s,a,c,m,v,b=!0,y=Qe.bbox;if(null!=y){b=!1;let t=y(i,e);a=t.left,c=t.top,l=t.width,s=t.height}else a=t,c=r,l=s=Qe.size(i,e);if(v=Qe.fill(i,e),m=Qe.stroke(i,e),rt)e==Bi&&qi<=et.prox&&(o=a,u=c,d=l,h=s,p=b,f=v,g=m);else{let t=lt[e];null!=t&&(ct[e]=a,_t[e]=c,it(t,l,s,b),tt(t,v,m),Xe(t,Mt(a),Mt(c),le,se))}}}}if(rt){let e=et.prox;if(Te||(null==Yi?qi<=e:qi>e||Bi!=Yi)){let e=lt[0];null!=e&&(ct[0]=o,_t[0]=u,it(e,d,h,p),tt(e,f,g),Xe(e,Mt(o),Mt(u),le,se))}}}if(Fi.show&&Ci)if(null!=e){let[t,n]=Nr.scales,[i,r]=Nr.match,[l,s]=e.cursor.sync.scales,o=e.cursor.drag;if(Ri=o._x,Oi=o._y,Ri||Oi){let o,u,d,h,p,{left:f,top:g,width:m,height:_}=e.select,v=e.scales[l].ori,b=e.posToVal,x=null!=t&&i(t,l),w=null!=n&&r(n,s);x&&Ri?(0==v?(o=f,u=m):(o=g,u=_),d=y[t],h=M(b(o,l),d,a,0),p=M(b(o+u,l),d,a,0),Ji(Tt(h,p),At(p-h))):Ji(0,a),w&&Oi?(1==v?(o=f,u=m):(o=g,u=_),d=y[n],h=T(b(o,s),d,c,0),p=T(b(o+u,s),d,c,0),Qi(Tt(h,p),At(p-h))):Qi(0,c)}else ar()}else{let e=At(si-Qn),t=At(oi-ni);if(1==C.ori){let n=e;e=t,t=n}Ri=Ei.x&&e>=Ei.dist,Oi=Ei.y&&t>=Ei.dist;let n,i,r=Ei.uni;null!=r?Ri&&Oi&&(Ri=e>=r,Oi=t>=r,Ri||Oi||(t>e?Oi=!0:Ri=!0)):Ei.x&&Ei.y&&(Ri||Oi)&&(Ri=Oi=!0),Ri&&(0==C.ori?(n=ii,i=ai):(n=ri,i=ci),Ji(Tt(n,i),At(i-n)),Oi||Qi(0,c)),Oi&&(1==C.ori?(n=ii,i=ai):(n=ri,i=ci),Qi(Tt(n,i),At(i-n)),Ri||Ji(0,a)),Ri||Oi||(Ji(0,0),Qi(0,0))}if(Ei._x=Ri,Ei._y=Oi,null==e){if(l){if(null!=Or){let[e,t]=Nr.scales;Nr.values[0]=null!=e?Vi(0==C.ori?ai:ci,e):null,Nr.values[1]=null!=t?Vi(1==C.ori?ai:ci,t):null}Wr(Pe,i,ai,ci,le,se,s)}if(nt){let e=l&&Nr.setSeries,t=et.prox;null==Yi?qi<=t&&ji(Bi,Ki,!0,e):qi>t?ji(null,Ki,!0,e):Bi!=Yi&&ji(Bi,Ki,!0,e)}}Te&&(W.idx=s,Xi()),!1!==n&&zr("setCursor")}i.setLegend=Xi;let nr=null;function ir(e=!1){e?nr=null:(nr=f.getBoundingClientRect(),zr("syncRect",nr))}function rr(e,t,n,i,r,l,s){L._lock||Ci&&null!=e&&0==e.movementX&&0==e.movementY||(lr(e,t,n,i,r,l,s,!1,null!=e),null!=e?tr(null,!0,!0):tr(t,!0,!1))}function lr(e,t,n,r,l,s,a,c,u){if(null==nr&&ir(!1),Ye(e),null!=e)n=e.clientX-nr.left,r=e.clientY-nr.top;else{if(n<0||r<0)return ai=-10,void(ci=-10);let[e,i]=Nr.scales,a=t.cursor.sync,[c,u]=a.values,[d,h]=a.scales,[p,f]=Nr.match,g=t.axes[0].side%2==1,m=0==C.ori?le:se,_=1==C.ori?le:se,v=g?s:l,b=g?l:s,x=g?r:n,w=g?n:r;if(n=null!=d?p(e,d)?o(c,y[e],m,0):-10:m*(x/v),r=null!=h?f(i,h)?o(u,y[i],_,0):-10:_*(w/b),1==C.ori){let e=n;n=r,r=e}}!u||null!=t&&t.cursor.event.type!=Pe||((n<=1||n>=le-1)&&(n=Gt(n,le)),(r<=1||r>=se-1)&&(r=Gt(r,se))),c?(Qn=n,ni=r,[ii,ri]=L.move(i,n,r)):(ai=n,ci=r)}Object.defineProperty(i,"rect",{get:()=>(null==nr&&ir(!1),nr)});const sr={width:0,height:0,left:0,top:0};function ar(){Hi(sr,!1)}let $r,kr,Sr,Ar;function Cr(e,t,n,r,l,s,o){Ci=!0,Ri=Oi=Ei._x=Ei._y=!1,lr(e,t,n,r,l,s,0,!0,!1),null!=e&&(te(Re,Ie,Er,!1),Wr(ze,i,ii,ri,le,se,null));let{left:a,top:c,width:u,height:d}=Fi;$r=a,kr=c,Sr=u,Ar=d}function Er(e,t,n,r,l,s,o){Ci=Ei._x=Ei._y=!1,lr(e,t,n,r,l,s,0,!1,!0);let{left:a,top:c,width:u,height:d}=Fi,h=u>0||d>0,p=$r!=a||kr!=c||Sr!=u||Ar!=d;if(h&&p&&Hi(Fi),Ei.setScale&&h&&p){let e=a,t=u,n=c,i=d;if(1==C.ori&&(e=c,t=d,n=a,i=u),Ri&&Ui(w,Vi(e,w),Vi(e+t,w)),Oi)for(let e in y){let t=y[e];e!=w&&null==t.from&&t.min!=Ft&&Ui(e,Vi(n+i,e),Vi(n,e))}ar()}else L.lock&&(L._lock=!L._lock,tr(t,!0,null!=e));null!=e&&(ne(Re,Ie),Wr(Re,i,ai,ci,le,se,null))}function Mr(e,t,n,r,l,s,o){L._lock||(Ye(e),wn(),ar(),null!=e&&Wr(Fe,i,ai,ci,le,se,null))}function Tr(){b.forEach(wr),We(i.width,i.height,!0)}st(Le,je,Tr);const Dr={};Dr.mousedown=Cr,Dr.mousemove=rr,Dr.mouseup=Er,Dr.dblclick=Mr,Dr.setSeries=(e,t,n,r)=>{-1!=(n=(0,Nr.match[2])(i,t,n))&&ji(n,r,!0,!1)},U&&(te(ze,f,Cr),te(Pe,f,rr),te(Ne,f,e=>{Ye(e),ir(!1)}),te(Oe,f,function(e,t,n,i,r,l,s){if(L._lock)return;Ye(e);let o=Ci;if(Ci){let e,t,n=!0,i=!0,r=10;0==C.ori?(e=Ri,t=Oi):(e=Oi,t=Ri),e&&t&&(n=ai<=r||ai>=le-r,i=ci<=r||ci>=se-r),e&&n&&(ai=ai<ii?0:le),t&&i&&(ci=ci<ri?0:se),tr(null,!0,!0),Ci=!1}ai=-10,ci=-10,F.fill(null),tr(null,!0,!0),o&&(Ci=o)}),te(Fe,f,Mr),or.add(i),i.syncRect=ir);const Pr=i.hooks=e.hooks||{};function zr(e,t,n){di?vi.push([e,t,n]):e in Pr&&Pr[e].forEach(e=>{e.call(null,i,t,n)})}(e.plugins||[]).forEach(e=>{for(let t in e.hooks)Pr[t]=(Pr[t]||[]).concat(e.hooks[t])});const Rr=(e,t,n)=>n,Nr=fn({key:null,setSeries:!1,filters:{pub:Bt,sub:Bt},scales:[w,v[1]?v[1].scale:null],match:[Yt,Yt,Rr],values:[null,null]},L.sync);2==Nr.match.length&&Nr.match.push(Rr),L.sync=Nr;const Or=Nr.key,Fr=Ni(Or);function Wr(e,t,n,i,r,l,s){Nr.filters.pub(e,t,n,i,r,l,s)&&Fr.pub(e,t,n,i,r,l,s)}function Lr(){zr("init",e,t),xn(t||e.data,!1),D[w]?wi(w,D[w]):wn(),xe=Fi.show&&(Fi.width>0||Fi.height>0),ye=Te=!0,We(e.width,e.height)}return Fr.sub(i),i.pub=function(e,t,n,i,r,l,s){Nr.filters.sub(e,t,n,i,r,l,s)&&Dr[e](null,t,n,i,r,l,s)},i.destroy=function(){Fr.unsub(i),or.delete(i),ee.clear(),ot(Le,je,Tr),c.remove(),j?.remove(),zr("destroy")},v.forEach(xt),b.forEach(function(e,t){if(e._show=e.show,e.show){let n=e.side%2,r=y[e.scale];null==r&&(e.scale=n?v[1].scale:w,r=y[e.scale]);let l=r.time;e.size=Ut(e.size),e.space=Ut(e.space),e.rotate=Ut(e.rotate),sn(e.incrs)&&e.incrs.forEach(e=>{!Xt.has(e)&&Xt.set(e,en(e))}),e.incrs=Ut(e.incrs||(2==r.distr?Dn:l?1==_?qn:Kn:Pn)),e.splits=Ut(e.splits||(l&&1==r.distr?R:3==r.distr?mi:4==r.distr?_i:gi)),e.stroke=Ut(e.stroke),e.grid.stroke=Ut(e.grid.stroke),e.ticks.stroke=Ut(e.ticks.stroke),e.border.stroke=Ut(e.border.stroke);let s=e.values;e.values=sn(s)&&!sn(s[0])?Ut(s):l?sn(s)?Jn(P,Zn(s,z)):an(s)?function(e,t){let n=Sn(t);return(t,i,r,l,s)=>i.map(t=>n(e(t)))}(P,s):s||N:s||fi,e.filter=Ut(e.filter||(r.distr>=3&&10==r.log?$i:3==r.distr&&2==r.log?ki:jt)),e.font=xr(e.font),e.labelFont=xr(e.labelFont),e._size=e.size(i,null,t,0),e._space=e._rotate=e._incrs=e._found=e._splits=e._values=null,e._size>0&&(wt[t]=!0,e._el=Je("u-axis",h))}}),n?n instanceof HTMLElement?(n.appendChild(c),Lr()):n(i,Lr):Lr(),i}$r.assign=fn,$r.fmtNum=$t,$r.rangeNum=bt,$r.rangeLog=ft,$r.rangeAsinh=gt,$r.orient=Oi,$r.pxRatio=Be,$r.join=function(e,t){if(function(e){let t=e[0][0],n=t.length;for(let i=1;i<e.length;i++){let r=e[i][0];if(r.length!=n)return!1;if(r!=t)for(let e=0;e<n;e++)if(r[e]!=t[e])return!1}return!0}(e)){let t=e[0].slice();for(let n=1;n<e.length;n++)t.push(...e[n].slice(1));return function(e,t=100){const n=e.length;if(n<=1)return!0;let i=0,r=n-1;for(;i<=r&&null==e[i];)i++;for(;r>=i&&null==e[r];)r--;if(r<=i)return!0;const l=Dt(1,Ct((r-i+1)/t));for(let t=e[i],n=i+l;n<=r;n+=l){const i=e[n];if(null!=i){if(i<=t)return!1;t=i}}return!0}(t[0])||(t=function(e){let t=e[0],n=t.length,i=Array(n);for(let e=0;e<i.length;e++)i[e]=e;i.sort((e,n)=>t[e]-t[n]);let r=[];for(let t=0;t<e.length;t++){let l=e[t],s=Array(n);for(let e=0;e<n;e++)s[e]=l[i[e]];r.push(s)}return r}(t)),t}let n=new Set;for(let t=0;t<e.length;t++){let i=e[t][0],r=i.length;for(let e=0;e<r;e++)n.add(i[e])}let i=[Array.from(n).sort((e,t)=>e-t)],r=i[0].length,l=new Map;for(let e=0;e<r;e++)l.set(i[0][e],e);for(let n=0;n<e.length;n++){let s=e[n],o=s[0];for(let e=1;e<s.length;e++){let a=s[e],c=Array(r).fill(void 0),u=t?t[n][e]:1,d=[];for(let e=0;e<a.length;e++){let t=a[e],n=l.get(o[e]);null===t?0!=u&&(c[n]=t,2==u&&d.push(n)):c[n]=t}gn(c,d,r),i.push(c)}}return i},$r.fmtDate=Sn,$r.tzDate=function(e,t){let n;return"UTC"==t||"Etc/UTC"==t?n=new Date(+e+6e4*e.getTimezoneOffset()):t==An?n=e:(n=new Date(e.toLocaleString("en-US",{timeZone:t})),n.setMilliseconds(e.getMilliseconds())),n},$r.sync=Ni;{$r.addGap=function(e,t,n){let i=e[e.length-1];i&&i[0]==t?i[1]=n:e.push([t,n])},$r.clipGaps=Hi;let e=$r.paths={points:er};e.linear=rr,e.stepped=function(e){const t=yt(e.align,1),n=yt(e.ascDesc,!1),i=yt(e.alignGaps,0),r=yt(e.extend,!1);return(e,l,s,o)=>Oi(e,l,(a,c,u,d,h,p,f,g,m,_,v)=>{[s,o]=ht(u,s,o);let b=a.pxRound,{left:y,width:x}=e.bbox,w=e=>b(p(e,d,_,g)),$=e=>b(f(e,h,v,m)),k=0==d.ori?Yi:Ki;const S={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},A=S.stroke,C=d.dir*(0==d.ori?1:-1);let E=$(u[1==C?s:o]),M=w(c[1==C?s:o]),T=M,D=M;r&&-1==t&&(D=y,k(A,D,E)),k(A,M,E);for(let e=1==C?s:o;e>=s&&e<=o;e+=C){let n=u[e];if(null==n)continue;let i=w(c[e]),r=$(n);1==t?k(A,i,E):k(A,T,r),k(A,i,r),E=r,T=i}let P=T;r&&1==t&&(P=y+x,k(A,P,E));let[z,R]=Fi(e,l);if(null!=a.fill||0!=z){let t=S.fill=new Path2D(A),n=$(a.fillTo(e,l,a.min,a.max,z));k(t,P,n),k(t,D,n)}if(!a.spanGaps){let r=[];r.push(...Ui(c,u,s,o,C,w,i));let h=a.width*Be/2,p=n||1==t?h:-h,f=n||-1==t?-h:h;r.forEach(e=>{e[0]+=p,e[1]+=f}),S.gaps=r=a.gaps(e,l,s,o,r),S.clip=Hi(r,d.ori,g,m,_,v)}return 0!=R&&(S.band=2==R?[Li(e,l,s,o,A,-1),Li(e,l,s,o,A,1)]:Li(e,l,s,o,A,R)),S})},e.bars=function(e){const t=yt((e=e||nn).size,[.6,Ft,1]),n=e.align||0,i=e.gap||0;let r=e.radius;r=null==r?[0,0]:"number"==typeof r?[r,0]:r;const l=Ut(r),s=1-t[0],o=yt(t[1],Ft),a=yt(t[2],1),c=yt(e.disp,nn),u=yt(e.each,e=>{}),{fill:d,stroke:h}=c;return(e,t,r,p)=>Oi(e,t,(f,g,m,_,v,b,y,x,w,$,k)=>{let S,A,C=f.pxRound,E=n,M=i*Be,T=o*Be,D=a*Be;0==_.ori?[S,A]=l(e,t):[A,S]=l(e,t);const P=_.dir*(0==_.ori?1:-1);let z,R,N,O=0==_.ori?Vi:Gi,F=0==_.ori?u:(e,t,n,i,r,l,s)=>{u(e,t,n,r,i,s,l)},W=yt(e.bands,rn).find(e=>e.series[0]==t),L=null!=W?W.dir:0,H=f.fillTo(e,t,f.min,f.max,L),U=C(y(H,v,k,w)),I=$,j=C(f.width*Be),q=!1,B=null,Y=null,K=null,V=null;null==d||0!=j&&null==h||(q=!0,B=d.values(e,t,r,p),Y=new Map,new Set(B).forEach(e=>{null!=e&&Y.set(e,new Path2D)}),j>0&&(K=h.values(e,t,r,p),V=new Map,new Set(K).forEach(e=>{null!=e&&V.set(e,new Path2D)})));let{x0:G,size:Z}=c;if(null!=G&&null!=Z){E=1,g=G.values(e,t,r,p),2==G.unit&&(g=g.map(t=>e.posToVal(x+t*$,_.key,!0)));let n=Z.values(e,t,r,p);R=2==Z.unit?n[0]*$:b(n[0],_,$,x)-b(0,_,$,x),I=lr(g,m,b,_,$,x,I),N=I-R+M}else I=lr(g,m,b,_,$,x,I),N=I*s+M,R=I-N;N<1&&(N=0),j>=R/2&&(j=0),N<5&&(C=It);let J=N>0;R=C(Lt(I-N-(J?j:0),D,T)),z=(0==E?R/2:E==P?0:R)-E*P*((0==E?M/2:0)+(J?j/2:0));const Q={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},X=q?null:new Path2D;let ee=null;if(null!=W)ee=e.data[W.series[1]];else{let{y0:n,y1:i}=c;null!=n&&null!=i&&(m=i.values(e,t,r,p),ee=n.values(e,t,r,p))}let te=S*R,ne=A*R;for(let n=1==P?r:p;n>=r&&n<=p;n+=P){let i=m[n];if(null==i)continue;if(null!=ee){let e=ee[n]??0;if(i-e==0)continue;U=y(e,v,k,w)}let r=b(2!=_.distr||null!=c?g[n]:n,_,$,x),l=y(yt(i,H),v,k,w),s=C(r-z),o=C(Dt(l,U)),a=C(Tt(l,U)),u=o-a;if(null!=i){let r=i<0?ne:te,l=i<0?te:ne;q?(j>0&&null!=K[n]&&O(V.get(K[n]),s,a+Ct(j/2),R,Dt(0,u-j),r,l),null!=B[n]&&O(Y.get(B[n]),s,a+Ct(j/2),R,Dt(0,u-j),r,l)):O(X,s,a+Ct(j/2),R,Dt(0,u-j),r,l),F(e,t,n,s-j/2,a,R+j,u)}}return j>0?Q.stroke=q?V:X:q||(Q._fill=0==f.width?f._fill:f._stroke??f._fill,Q.width=0),Q.fill=q?Y:X,Q})},e.spline=function(e){return function(e,t){const n=yt(t?.alignGaps,0);return(t,i,r,l)=>Oi(t,i,(s,o,a,c,u,d,h,p,f,g,m)=>{[r,l]=ht(a,r,l);let _,v,b,y=s.pxRound,x=e=>y(d(e,c,g,p)),w=e=>y(h(e,u,m,f));0==c.ori?(_=qi,b=Yi,v=Qi):(_=Bi,b=Ki,v=Xi);const $=c.dir*(0==c.ori?1:-1);let k=x(o[1==$?r:l]),S=k,A=[],C=[];for(let e=1==$?r:l;e>=r&&e<=l;e+=$)if(null!=a[e]){let t=x(o[e]);A.push(S=t),C.push(w(a[e]))}const E={stroke:e(A,C,_,b,v,y),fill:null,clip:null,band:null,gaps:null,flags:1},M=E.stroke;let[T,D]=Fi(t,i);if(null!=s.fill||0!=T){let e=E.fill=new Path2D(M),n=w(s.fillTo(t,i,s.min,s.max,T));b(e,S,n),b(e,k,n)}if(!s.spanGaps){let e=[];e.push(...Ui(o,a,r,l,$,x,n)),E.gaps=e=s.gaps(t,i,r,l,e),E.clip=Hi(e,c.ori,p,f,g,m)}return 0!=D&&(E.band=2==D?[Li(t,i,r,l,M,-1),Li(t,i,r,l,M,1)]:Li(t,i,r,l,M,D)),E})}(sr,e)}}function kr(e,t){return e?{show:!1}:{show:!0,size:4,width:0,stroke:t,fill:t}}const Sr=["#2196f3","#ff9800","#4caf50","#e91e63","#9c27b0","#00bcd4","#ffc107","#795548","#607d8b","#8bc34a"];function Ar(e,t){return t??Sr[e%Sr.length]}let Cr=class extends ue{constructor(){super(...arguments),this.series=[],this.config={},this._builtFor=""}static{this.styles=[s('.uplot,.uplot *,.uplot :after,.uplot :before{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5;width:min-content}.u-title{font-size:18px;font-weight:700;text-align:center}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;height:100%;position:relative;width:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{display:inline-block;vertical-align:middle}.u-legend .u-marker{background-clip:padding-box!important;height:1em;margin-right:4px;width:1em}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:rgba(0,0,0,.07)}.u-cursor-x,.u-cursor-y,.u-select{pointer-events:none;position:absolute}.u-cursor-x,.u-cursor-y{left:0;top:0;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{background-clip:padding-box!important;border:0 solid;border-radius:50%;left:0;pointer-events:none;position:absolute;top:0;will-change:transform}.u-axis.u-off,.u-cursor-pt.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-select.u-off{display:none}'),o`
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
    `]}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0,this._plot?.destroy(),this._plot=void 0,this._builtFor=""}firstUpdated(){const e=this._holder();e&&(this._observer=new ResizeObserver(()=>this._sync()),this._observer.observe(e),this._sync())}updated(e){this._sync()}_holder(){return this.renderRoot.querySelector(".holder")}_shape(){return JSON.stringify([this.series.map((e,t)=>[e.label,Ar(t,e.color),!0===e.line,e.width??0,e.axis??"left"]),!0===this.config.timeAxis,!0===this.config.yFromZero])}_hasRightAxis(){return this.series.some(e=>"right"===e.axis)}_sync(){const e=this._holder();if(!e||0===this.series.length)return;const t=Math.floor(e.clientWidth);if(t<1)return;const n=this.config.height??220,{xs:i,ys:r}=function(e){const t=e.map(e=>{const t=new Map;for(const[n,i]of e.points)Number.isFinite(n)&&Number.isFinite(i)&&t.set(n,i);return t}),n=new Set;for(const e of t)for(const t of e.keys())n.add(t);const i=[...n].sort((e,t)=>e-t),r=t.map(e=>i.map(t=>e.has(t)?e.get(t):null));return{xs:i,ys:r}}(this.series),l=[i,...r];if(this._plot&&this._builtFor===this._shape())return this._plot.setSize({width:t,height:n}),void this._plot.setData(l);this._plot?.destroy(),this._plot=new $r(this._options(t,n),l,e),this._builtFor=this._shape()}_themeColor(e,t){return getComputedStyle(this).getPropertyValue(e).trim()||t}_options(e,t){const n=this._themeColor("--divider-color","rgba(127,127,127,0.3)"),i=this._themeColor("--secondary-text-color","#888"),r=this.config;return{width:e,height:t,...r.timeAxis?{}:{mode:1},tzDate:void 0,legend:{show:!1},cursor:{drag:{x:!1,y:!1,setScale:!1},points:{size:6}},scales:{x:{time:!0===r.timeAxis},y:{range:r.yFromZero?(e,t,n)=>[0,n]:void 0},...this._hasRightAxis()?{y2:{}}:{}},axes:[{stroke:i,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:r.xLabel,labelFont:"11px system-ui, sans-serif",labelSize:r.xLabel?18:0},{stroke:i,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:r.yLabel,labelFont:"11px system-ui, sans-serif",labelSize:r.yLabel?18:0,size:48},...this._hasRightAxis()?[{scale:"y2",side:1,stroke:i,grid:{show:!1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:r.y2Label,labelFont:"11px system-ui, sans-serif",labelSize:r.y2Label?18:0,size:48}]:[]],series:[{},...this.series.map((e,t)=>{const n=Ar(t,e.color);return{label:e.label,stroke:n,width:e.width??2,..."right"===e.axis?{scale:"y2"}:{},...e.line?{}:{paths:()=>null},points:kr(!0===e.line,n)}})],hooks:{setCursor:[e=>this._updateReadout(e)]}}}_updateReadout(e){const t=this.renderRoot.querySelector(".readout");if(!t)return;const n=e.cursor.idx;if(null==n)return void(t.textContent="");const i=this.config,r=e.data[0][n],l=document.createElement("span");l.textContent=i.xFormat&&"number"==typeof r?i.xFormat(r):String(r??""),t.replaceChildren(l),this.series.forEach((r,l)=>{const s=e.data[l+1]?.[n];if(null==s)return;const o=document.createElement("span"),a=document.createElement("span");a.className="swatch",a.style.background=Ar(l,r.color),o.append(a);const c="right"===r.axis?i.y2Format??i.yFormat:i.yFormat,u=c?c(Number(s)):String(s);o.append(document.createTextNode(`${r.label} ${u}`)),t.append(o)})}render(){return 0===this.series.length||this.series.every(e=>0===e.points.length)?B`<div class="empty">No data in this range.</div>`:B`
      <div class="holder"></div>
      <div class="readout"></div>
    `}};function Er(e){if(null==e||""===e)return null;const t="number"==typeof e?e:Number(e);return Number.isFinite(t)?t:null}function Mr(e,t,n=""){const i=Er(e);return null===i?"—":`${i.toFixed(t)}${n}`}function Tr(e){const t=Er(e);if(null===t)return"—";const n=Math.abs(Math.round(t)),i=Math.floor(n/86400),r=Math.floor(n%86400/3600),l=Math.floor(n%3600/60);return i>0?`${i}d ${r}h`:r>0?`${r}h ${l}m`:`${l}m`}function Dr(e){const t=Er(e);return null===t?"—":`${Math.round(100*t)}%`}function Pr(e){const t=Er(e);return null===t?"—":`${t}%`}function zr(e,t){if(!e)return"—";const n=String(e),i=n.includes("T")?n:n.replace(" ","T"),r=new Date(i.endsWith("Z")?i:`${i}Z`);return Number.isNaN(r.getTime())?n:r.toLocaleString(t||void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}function Rr(e,t,n){const i=Er(e);if(null===i)return n;let r=n;for(const[e,n]of t)i>=e&&(r=n);return r}function Nr(e,t){const n=[];for(const i of e){const e=Er(i[t]);null!==e&&n.push(e)}return n}function Or(e,t){return Nr(e,t).reduce((e,t)=>e+t,0)}function Fr(e){const{label:t,value:n,max:i,text:r,color:l,markers:s=[]}=e,o=null!==n&&i>0?Math.max(0,Math.min(100,n/i*100)):0;return B`
    <div class="bar-row">
      <div class="bar-head">
        <span class="bar-label">${t}</span>
        <span class="bar-value">${r}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style=${`width:${o}%;background:${l??"var(--primary-color)"}`}></div>
        ${s.filter(e=>i>0&&e.at>=0&&e.at<=i).map(e=>B`
              <div
                class="bar-marker"
                style=${`left:${e.at/i*100}%`}
                title=${e.label??String(e.at)}
              ></div>
            `)}
      </div>
    </div>
  `}function Wr(e,t){const n=e.filter(e=>Number.isFinite(e.value)&&e.value>0),i=n.reduce((e,t)=>e+t.value,0);return i<=0?null:B`
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
  `}function Lr(e,t,n){return B`
    <div class="scroller">
      <table>
        <thead>
          <tr>
            ${e.map(e=>B`<th class="${e.align??"right"} ${e.optional?"optional":""}">${e.label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${t.map(t=>B`
              <tr
                class="${n?"selectable":""} ${n?.isSelected?.(t)?"selected":""}"
                role=${n?"button":V}
                tabindex=${n?0:V}
                title=${n?.describe?.(t)??V}
                @click=${n?()=>n.onSelect(t):V}
                @keydown=${n?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n.onSelect(t))}:V}
              >
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
  `}function Hr(e){return B`
    <div class="summary">
      ${e.map(e=>B`
          <div class="stat">
            <div class="stat-value">${e.value}</div>
            <div class="stat-label">${e.label}</div>
          </div>
        `)}
    </div>
  `}e([ge({attribute:!1})],Cr.prototype,"series",void 0),e([ge({attribute:!1})],Cr.prototype,"config",void 0),Cr=e([he("teslamate-chart")],Cr);const Ur=[[0,"var(--error-color)"],[80,"var(--warning-color)"],[90,"var(--success-color)"]];let Ir=class extends ye{queryId(){return"battery_health"}secondaryQueryIds(){return["battery_capacity_history"]}queryOptions(){const e={};return void 0!==this._config.custom_kwh_new&&(e.custom_kwh_new=this._config.custom_kwh_new),void 0!==this._config.custom_max_range&&(e.custom_max_range=this._config.custom_max_range),{...this._config,vars:e}}showRangePicker(){return!1}defaultTitle(){return"Battery Health"}_summary(e){const t=this._config.length_unit??"km",n=Er(e.current_capacity),i=Er(e.max_capacity);return Hr([{label:"Usable now (kWh)",value:Mr(n,1)},{label:"When new (kWh)",value:Mr(i,1)},{label:`Range (${t})`,value:Mr(e.current_range,0)},{label:`Wh/${t}`,value:Mr(e.efficiency,0)}])}_panels(e){const t=this._config.length_unit??"km",n=Er(e.health_pct),i=Er(e.degradation_pct),r=Er(e.current_capacity),l=Er(e.current_soc),s=Er(e.stored_energy),o=Er(e.soc_lower),a=Er(e.soc_upper),c=Er(e.max_capacity),u=Er(e.max_range),d=Rr(n,Ur,"var(--primary-color)");return B`
      <div class="panels">
        ${function(e){const{label:t,value:n,text:i,color:r}=e,l=null===n?0:Math.max(0,Math.min(100,n)),s="M 10 52 A 42 42 0 0 1 94 52";return B`
    <div class="gauge">
      <svg viewBox="0 0 104 64" class="gauge-svg" role="img" aria-label=${`${t}: ${i}`}>
        ${Y`
          <path d=${s} class="gauge-track" pathLength="100" />
          <path d=${s} pathLength="100" stroke=${r} class="gauge-fill"
                stroke-dasharray=${`${l} 100`} />
        `}
      </svg>
      <div class="gauge-value" style=${`color:${r}`}>${i}</div>
      <div class="gauge-label">${t}</div>
    </div>
  `}({label:null===i?"Battery health":`${i.toFixed(1)}% degradation`,value:n,text:null===n?"—":`${n.toFixed(1)}%`,color:d})}
        <div class="bars">
          ${Fr({label:"Charge level",value:l,max:100,text:null===l?"—":`${l}%`,color:"var(--primary-color)",markers:[...null===o?[]:[{at:o,label:`${o}% daily minimum`}],...null===a?[]:[{at:a,label:`${a}% recommended limit`}]]})}
          ${Fr({label:"Stored energy",value:s,max:r??100,text:`${Mr(s,1)} / ${Mr(r,1)} kWh`,color:"var(--success-color)"})}
          ${Fr({label:"Range against best recorded",value:Er(e.current_range),max:u??100,text:`${Mr(e.current_range,0)} / ${Mr(u,0)} ${t}`,color:"var(--info-color, #3d71d7)"})}
        </div>
      </div>
      ${Wr([{label:"Remaining",value:null!==r&&null!==c?r:0,color:"var(--success-color)"},{label:"Lost to degradation",value:null!==r&&null!==c?Math.max(0,c-r):0,color:"var(--error-color)"}],"kWh")}
    `}_capacitySeries(){const e=xe(this._extra.battery_capacity_history??[],e=>String(e.series),e=>Number(e.odometer),e=>Number(e.kwh)),t=[],n=e.get("sample");n?.length&&t.push({label:"Per charge",points:n,color:"#90a4ae"});const i=e.get("median");return i?.length&&t.push({label:"Median",points:i,color:"#2196f3",line:!0,width:2}),t}_chart(){const e=this._capacitySeries();if(0===e.length)return null;const t=this._config.length_unit??"km";return B`
      <div class="subheader">Usable capacity by odometer</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${e}
          .config=${{height:this._config.chart_height??240,xLabel:`Odometer (${t})`,yLabel:"kWh",xFormat:e=>`${Math.round(e).toLocaleString()} ${t}`,yFormat:e=>`${e.toFixed(1)} kWh`}}
        ></teslamate-chart>
      </div>
    `}renderContent(){const e=this._rows[0];return e?B`
      <ha-card>
        ${this.renderHeader(`${Mr(e.rated_efficiency,1)} Wh/km rated`)} ${this._summary(e)}
        ${this._panels(e)} ${this._chart()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging history to derive battery health from.</div>
        </ha-card>
      `}};Ir=e([he("teslamate-battery-health-card")],Ir);const jr={AC:"var(--success-color)",DC:"var(--warning-color)"};let qr=class extends ye{queryId(){return"charges"}secondaryQueryIds(){return["incomplete_charges"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration_min=this._config.min_duration_minutes),{...this._config,days:this.days(),charge_type:this._config.charge_type??"",vars:e}}defaultTitle(){return"Charges"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",n=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>zr(e.start_date,this._hass?.locale?.language)},{label:"Location",align:"left",render:e=>e.address??"—"},{label:"Type",align:"center",render:e=>e.charge_type??"—",color:e=>jr[String(e.charge_type)]},{label:"Duration",render:e=>Mr(e.duration_min,0," min")},{label:"SoC",render:e=>`${Pr(e.start_battery_level)} → ${Pr(e.end_battery_level)}`},{label:"Added",render:e=>Mr(e.charge_energy_added,1," kWh")},{label:"Range",render:t=>Mr(t[this.unitKey("range_added")],0,` ${e}`)},{label:"Ø Power",render:e=>Mr(e.charge_energy_added_per_hour,1," kW")},{label:"Ø Rate",render:e=>Mr(e[this.unitKey("range_added_per_hour")],0,` ${t}`),optional:!0},{label:"Cost",render:e=>null===e.cost?"free":Mr(e.cost,2)},{label:"Cost/kWh",render:e=>null===e.cost_per_kwh?"—":Mr(e.cost_per_kwh,3),optional:!0},{label:"Used",render:e=>Mr(e.charge_energy_used,1," kWh"),optional:!0},{label:"Efficiency",render:e=>Dr(e.charging_efficiency),optional:!0},{label:"Temp",render:e=>Mr(e[this.tempKey("outside_temp_avg")],0,`°${n}`),optional:!0}]}_summary(){const e=Or(this._rows,"charge_energy_added"),t=Or(this._rows,"charge_energy_used"),n=Or(this._rows,"cost"),i=function(e,t){const n=Nr(e,t);return 0===n.length?0:n.reduce((e,t)=>e+t,0)/n.length}(this._rows,"duration_min"),r=this._rows.filter(e=>Number(e.cost)>0).length;return Hr([{label:"Energy added (kWh)",value:e.toFixed(0)},{label:"Energy used (kWh)",value:t.toFixed(0)},{label:0===r?"Cost (all free)":"Cost",value:n.toFixed(2)},{label:"Ø Duration",value:`${Math.round(i)} min`}])}_renderIncomplete(){const e=this._extra.incomplete_charges??[];if(0===e.length)return null;const t=[{label:"Started",align:"left",render:e=>zr(e.start_date,this._hass?.locale?.language)},{label:"Added",render:e=>Mr(e.charge_energy_added,1," kWh")},{label:"Duration",render:e=>Mr(e.duration_min,0," min")}];return B`
      <div class="subheader" title="Charging processes with no recorded end — usually a logging gap">
        Incomplete charges (${e.length})
      </div>
      ${Lr(t,e)}
    `}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charges in the last ${_e(this.days())}.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows);return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} charges`)} ${this._summary()}
        ${Lr(this._columns(),e)} ${this.renderPager(t,n)} ${this._renderIncomplete()}
      </ha-card>
    `}};qr=e([he("teslamate-charges-card")],qr);let Br=class extends ye{queryId(){return"charging_totals"}secondaryQueryIds(){return["charging_cost_per_distance","charge_delta","dc_charging_curve","top_stations_energy","top_stations_cost"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration=this._config.min_duration_minutes),{...this._config,days:this.days(),geofence_ids:this._config.geofence_ids??null,vars:e}}defaultTitle(){return"Charging Stats"}_currency(e,t=2){const n=Er(e);if(null===n)return"—";return`${this._config.currency??""}${n.toFixed(t)}`}_summary(e){const t=this._config.length_unit??"km",n=Er(this._extra.charging_cost_per_distance?.[0]?.cost_mileage),i=Er(e.paid_count)??0,r=Er(e.charge_count)??0;return Hr([{label:"Charges",value:r.toFixed(0)},{label:"Energy added (kWh)",value:Mr(e.energy_added,0)},{label:0===i?"Cost (all free)":`Cost (${i} of ${r} paid)`,value:this._currency(e.total_cost)},{label:`Cost per 100 ${t}`,value:null===n?"—":this._currency(n)}])}_rates(e){const t=Er(e.cost_per_kwh),n=Er(e.cost_per_kwh_ac),i=Er(e.cost_per_kwh_dc),r=Er(e.charging_efficiency),l=Er(e.suc_cost);return Hr([{label:"Ø Cost/kWh",value:null===t?"—":this._currency(t,3)},{label:"AC",value:null===n?"—":this._currency(n,3)},{label:"DC",value:null===i?"—":this._currency(i,3)},{label:0===l?"Supercharging (free)":"Supercharging",value:this._currency(l)},{label:"Charging efficiency",value:null===r?"—":`${(100*r).toFixed(1)}%`}])}_acdc(e){const t=Wr([{label:"AC",value:Er(e.energy_ac)??0,color:"var(--success-color)"},{label:"DC",value:Er(e.energy_dc)??0,color:"var(--warning-color)"}],"kWh");return t?B`<div class="subheader">Energy used by charger type</div>
      ${t}`:null}_deltaChart(){const e=this._extra.charge_delta??[];if(0===e.length)return null;const t=e=>{const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`).getTime()/1e3},n=[],i=[];for(const r of e){const e=t(r.time),l=Er(r.start_soc),s=Er(r.end_soc);Number.isFinite(e)&&(null!==l&&n.push([e,l]),null!==s&&i.push([e,s]))}if(0===n.length&&0===i.length)return null;return B`
      <div class="subheader">Charge delta</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Start SOC",points:n,color:"#ff9800",line:!0},{label:"End SOC",points:i,color:"#4caf50",line:!0}]}
          .config=${{height:this._config.chart_height??200,timeAxis:!0,yLabel:"SOC %",yFormat:e=>`${Math.round(e)}%`,xFormat:e=>new Date(1e3*e).toLocaleDateString(this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_curveChart(){const e=this._extra.dc_charging_curve??[];if(0===e.length)return null;const t=xe(e,e=>"median"===e.series?"__median":String(e.label??e.session_id??"session"),e=>Number(e.soc),e=>Number(e.power)),n=t.get("__median");t.delete("__median");const i=this._config.max_curve_sessions??6,r=[...t.entries()].slice(-i),l=r.map(([e,t])=>({label:e,points:t,line:!0,width:1}));if(n?.length&&l.push({label:"Median",points:n,color:"var(--primary-text-color)",line:!0,width:3}),0===l.length)return null;const s=t.size-r.length;return B`
      <div class="subheader">
        DC charging curve${s>0?B` <span class="hint">(newest ${r.length} of ${t.size})</span>`:null}
      </div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${l}
          .config=${{height:this._config.chart_height??220,xLabel:"SOC %",yLabel:"kW",yFromZero:!0,xFormat:e=>`${Math.round(e)}% SOC`,yFormat:e=>`${Math.round(e)} kW`}}
        ></teslamate-chart>
      </div>
    `}_stations(){const e=this._extra.top_stations_energy??[],t=this._extra.top_stations_cost??[];if(0===e.length&&0===t.length)return null;const n=[{label:"Location",align:"left",render:e=>e.location??"—"},{label:"Energy",render:e=>Mr(e.charge_energy_added,1," kWh")}],i=[{label:"Location",align:"left",render:e=>e.location??"—"},{label:"Cost",render:e=>this._currency(e.cost)}];return B`
      ${e.length?B`<div class="subheader">Top locations by energy</div>
            ${Lr(n,e)}`:null}
      ${t.length?B`<div class="subheader">Top locations by cost</div>
            ${Lr(i,t)}`:null}
    `}renderContent(){const e=this._rows[0],t=Er(e?.charge_count)??0;return e&&0!==t?B`
      <ha-card>
        ${this.renderHeader(`last ${_e(this.days())}`)} ${this._summary(e)}
        ${this._rates(e)} ${this._acdc(e)} ${this._deltaChart()} ${this._curveChart()} ${this._stations()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charging sessions in the last ${_e(this.days())}.</div>
        </ha-card>
      `}};Br=e([he("teslamate-charging-stats-card")],Br);let Yr;let Kr=class extends ue{constructor(){super(...arguments),this.rows=[],this.color="#2196f3",this.height=400,this._available=null}static{this.styles=o`
    :host {
      display: block;
    }
    ha-map {
      display: block;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }
    .state {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
    }
  `}connectedCallback(){super.connectedCallback(),null===this._available&&async function(){return!!customElements.get("ha-map")||(Yr??=(async()=>{try{const e=await(window.loadCardHelpers?.());if(!e)return!1;await e.createCardElement({type:"map",show_all:!0})}catch{}return!!customElements.get("ha-map")||Promise.race([customElements.whenDefined("ha-map").then(()=>!0),new Promise(e=>setTimeout(()=>e(!1),1e4))])})(),Yr)}().then(e=>this._available=e)}updated(e){(e.has("rows")||e.has("color")||e.has("_available"))&&this._drawRoute()}_date(e){const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`)}_points(){const e=[];for(const t of this.rows){const n=Number(t.latitude),i=Number(t.longitude),r=this._date(t.time);Number.isFinite(n)&&Number.isFinite(i)&&!Number.isNaN(r.getTime())&&e.push({point:[n,i],timestamp:r})}return e}get _map(){return this.renderRoot?.querySelector("ha-map")??null}async _ready(e){const t=Date.now()+5e3;for(;(!e.Leaflet||!e._loaded)&&Date.now()<t;)await new Promise(e=>setTimeout(e,50));return e.Leaflet}async _drawRoute(){const e=this._map;if(!e)return;const t=this._points();if(t.length<2)return;const n=t.map(e=>e.point),i=await this._ready(e);if(!i)return void(e.paths=[{points:t,color:this.color,name:this.label,fullDatetime:!0}]);const r=t[0],l=t[t.length-1],s=(e,t,n)=>i.circleMarker(e.point,{radius:6,color:"#fff",weight:2,fillColor:t,fillOpacity:1,interactive:!0}).bindTooltip(`${n}<br>${zr(e.timestamp.toISOString(),this.language)}`,{direction:"top"});e.layers=[i.polyline(n,{color:this.color,weight:4,opacity:.9,lineJoin:"round",lineCap:"round",interactive:!1}),s(r,"#4caf50","Start"),s(l,"#f44336","End")],await e.updateComplete,e.fitBounds(n,{pad:.08,zoom:17})}render(){return this._points().length<2?V:null===this._available?B`<div class="state" style="height:${this.height}px">Loading map…</div>`:this._available?B`<ha-map style="height:${this.height}px" .themeMode=${"auto"}></ha-map>`:B`<div class="state">Map unavailable — Home Assistant's map component did not load.</div>`}};e([ge({attribute:!1})],Kr.prototype,"rows",void 0),e([ge({attribute:!1})],Kr.prototype,"color",void 0),e([ge({attribute:!1})],Kr.prototype,"label",void 0),e([ge({attribute:!1})],Kr.prototype,"language",void 0),e([ge({type:Number})],Kr.prototype,"height",void 0),e([me()],Kr.prototype,"_available",void 0),Kr=e([he("teslamate-map")],Kr);let Vr=class extends ye{constructor(){super(...arguments),this._route=[],this._routeLoading=!1,this._routeToken=0}queryId(){return"drives"}secondaryQueryIds(){return["incomplete_drives"]}queryOptions(){const e={};return void 0!==this._config.min_distance&&(e.min_dist=this._config.min_distance),void 0!==this._config.min_speed&&(e.min_speed=this._config.min_speed),this._config.efficiency_mode&&(e.efficiency=this._config.efficiency_mode),{...this._config,days:this.days(),vars:e}}defaultTitle(){return"Drives"}pageSize(){return this._config.page_size??25}onRangeChanged(){this._selected=void 0,this._route=[],this._routeToken+=1}async _selectDrive(e){const t=Number(e.drive_id);if(!Number.isFinite(t))return;if(this._selected&&Number(this._selected.drive_id)===t)return this._selected=void 0,this._route=[],void(this._routeToken+=1);const n=++this._routeToken;this._selected=e,this._route=[],this._routeLoading=!0;try{const e=await be(this._hass,"drive_route",{...this.queryOptions(),vars:{drive_id:t}});if(n!==this._routeToken)return;this._route=e}catch{n===this._routeToken&&(this._route=[])}finally{n===this._routeToken&&(this._routeLoading=!1)}}_renderRoute(){if(!this._selected)return null;const e=this._config.length_unit??"km",t=this._selected,n=[`${t.start_address??"—"} → ${t.end_address??"—"}`,Mr(t[this.unitKey("distance")],1,` ${e}`),Mr(t.duration_min,0," min")].join(" · ");return B`
      <div class="subheader">${zr(t.start_date,this._hass?.locale?.language)}</div>
      ${this._routeLoading?B`<div class="state">Loading route…</div>`:0===this._route.length?B`<div class="state">No positions logged for this drive.</div>`:B`
              <teslamate-map
                .rows=${this._route}
                .color=${"#2196f3"}
                .label=${String(t.end_address??"Drive")}
                .language=${this._hass?.locale?.language}
                .height=${this._config.map_height??400}
              ></teslamate-map>
            `}
      <div class="route-caption">${n}</div>
    `}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",n=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>zr(e.start_date,this._hass?.locale?.language)},{label:"Start",align:"left",render:e=>e.start_address??"—"},{label:"Destination",align:"left",render:e=>e.end_address??"—"},{label:"Duration",render:e=>Mr(e.duration_min,0," min")},{label:"Distance",render:t=>Mr(t[this.unitKey("distance")],1,` ${e}`)},{label:"SoC",render:e=>`${Pr(e["% Start"])} → ${Pr(e["% End"])}`,optional:!0},{label:"",align:"center",render:e=>e.has_reduced_range?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>e.has_reduced_range?"Reduced range: part of the pack was unavailable":void 0},{label:"Energy",render:e=>Mr(e.consumption_kWh,1," kWh")},{label:`Ø Wh/${e}`,render:t=>Mr(t[`consumption_kwh_${e}`],0)},{label:"Ø Speed",render:e=>Mr(e[this.unitKey("speed_avg")],0,` ${t}`),optional:!0},{label:"Max Speed",render:e=>Mr(e[this.unitKey("speed_max")],0,` ${t}`),optional:!0},{label:"Max Power",render:e=>Mr(e.power_max,0," kW"),optional:!0},{label:"Temp",render:e=>Mr(e[this.tempKey("outside_temp")],0,`°${n}`),optional:!0}]}_summary(){const e=this._config.length_unit??"km",t=Or(this._rows,this.unitKey("distance")),n=Or(this._rows,"consumption_kWh"),i=Or(this._rows,"duration_min"),r=t>0?n/t*1e3:0;return Hr([{label:`Distance (${e})`,value:t.toFixed(0)},{label:"Duration",value:`${Math.floor(i/60)}h ${Math.round(i%60)}m`},{label:"Energy (kWh)",value:n.toFixed(1)},{label:`Ø Wh/${e}`,value:r.toFixed(0)}])}_renderIncomplete(){const e=this._extra.incomplete_drives??[];if(0===e.length)return null;const t=[{label:"Drive",align:"left",render:e=>e["Drive ID"]??"—"},{label:"Started",align:"left",render:e=>zr(e.start_date,this._hass?.locale?.language)},{label:"Distance",render:e=>Mr(e.distance,1)},{label:"Duration",render:e=>Mr(e.duration_min,0," min")}];return B`
      <div class="subheader" title="Drives TeslaMate never saw the end of — usually a logging gap">
        Incomplete drives (${e.length})
      </div>
      ${Lr(t,e)}
    `}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No drives in the last ${_e(this.days())}.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows);return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} drives`)} ${this._summary()} ${this._renderRoute()}
        ${Lr(this._columns(),e,{onSelect:e=>{this._selectDrive(e)},isSelected:e=>void 0!==this._selected&&e.drive_id===this._selected.drive_id,describe:e=>void 0!==this._selected&&e.drive_id===this._selected.drive_id?"Hide this route":`Show the route from ${e.start_address??"—"} to ${e.end_address??"—"}`})}
        ${this.renderPager(t,n)} ${this._renderIncomplete()}
      </ha-card>
    `}};e([me()],Vr.prototype,"_selected",void 0),e([me()],Vr.prototype,"_route",void 0),e([me()],Vr.prototype,"_routeLoading",void 0),Vr=e([he("teslamate-drives-card")],Vr);const Gr="#2196f3",Zr="var(--success-color)",Jr="var(--warning-color)";let Qr=class extends ye{queryId(){return"trip_summary"}secondaryQueryIds(){return["trip_energy","trip_battery","trip_elevation","trip_route","drives","charges"]}queryOptions(){return{...this._config,days:this.days(),vars:{}}}defaultDays(){return 3}defaultRanges(){return[3,7,30]}defaultTitle(){return"Trip"}pageSize(){return this._config.page_size??10}_currency(e,t=2){const n=Er(e);return null===n?"—":`${this._config.currency??""}${n.toFixed(t)}`}_summary(e){const t=this._config.length_unit??"km",n=this._extra.trip_energy?.[0]??{},i="mi"===t?"mph":"km/h";return B`
      ${Hr([{label:`Distance (${t})`,value:Mr(e.distance,0)},{label:"Driving time",value:Tr(e.driving_seconds)},{label:`Ø Speed (${i})`,value:Mr(e.avg_speed_driving,0)},{label:"Energy used (kWh)",value:Mr(n.energy_consumed,0)}])}
      ${Hr([{label:`Wh/${t}`,value:Mr(n.consumption,0)},{label:`Ø incl. charging (${i})`,value:Mr(e.avg_speed_with_charging,0)},{label:0===(Er(e.paid_count)??0)?"Cost (all free)":"Cost",value:this._currency(e.total_cost)},{label:`Cost per 100 ${t}`,value:this._currency(n.cost_per_distance)}])}
    `}_timeSpent(e){const t=Wr([{label:"Driving",value:(Er(e.driving_seconds)??0)/3600,color:Gr},{label:"Charging AC",value:(Er(e.charging_ac_seconds)??0)/3600,color:Zr},{label:"Charging DC",value:(Er(e.charging_dc_seconds)??0)/3600,color:Jr}],"h");return t?B`<div class="subheader">Time spent</div>
      ${t}`:null}_energyAdded(e){const t=Wr([{label:"AC",value:Er(e.energy_added_ac)??0,color:Zr},{label:"DC",value:Er(e.energy_added_dc)??0,color:Jr}],"kWh");return t?B`<div class="subheader">Energy added</div>
      ${t}`:null}_epoch(e){const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`).getTime()/1e3}_route(){const e=this._extra.trip_route??[];return 0===e.length?null:B`
      <teslamate-map
        .rows=${e}
        .color=${Gr}
        .label=${"Trip"}
        .language=${this._hass?.locale?.language}
        .height=${this._config.map_height??420}
      ></teslamate-map>
    `}_batteryChart(){const e=this._extra.trip_battery??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=[],i=[];for(const t of e){const e=this._epoch(t.time);if(!Number.isFinite(e))continue;const r=Er(t.battery_level),l=Er(t.range);null!==r&&n.push([e,r]),null!==l&&i.push([e,l])}if(0===n.length&&0===i.length)return null;return B`
      <div class="subheader">Battery level &amp; range</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Battery",points:n,color:"#4caf50",line:!0},{label:"Range",points:i,color:"#2196f3",line:!0,axis:"right"}]}
          .config=${{height:this._config.chart_height??200,timeAxis:!0,yLabel:"%",y2Label:t,yFormat:e=>`${Math.round(e)}%`,y2Format:e=>`${Math.round(e)} ${t}`,xFormat:e=>zr(new Date(1e3*e).toISOString(),this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_elevationChart(){const e=this._extra.trip_elevation??[],t=[];for(const n of e){const e=this._epoch(n.time),i=Er(n.elevation);Number.isFinite(e)&&null!==i&&t.push([e,i])}if(0===t.length)return null;const n="mi"===(this._config.length_unit??"km")?"ft":"m";return B`
      <div class="subheader">Elevation</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Elevation",points:t,color:"#795548",line:!0}]}
          .config=${{height:this._config.chart_height??160,timeAxis:!0,yLabel:n,yFormat:e=>`${Math.round(e).toLocaleString()} ${n}`,xFormat:e=>zr(new Date(1e3*e).toISOString(),this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_drives(){const e=this._extra.drives??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=this._hass?.locale?.language,i=[{label:"Start",align:"left",render:e=>zr(e.start_date,n)},{label:"From",align:"left",render:e=>e.start_address??"—"},{label:"To",align:"left",render:e=>e.end_address??"—"},{label:"Duration",render:e=>Mr(e.duration_min,0," min")},{label:"Distance",render:e=>Mr(e[this.unitKey("distance")],1,` ${t}`)},{label:"SoC",render:e=>`${Mr(e.start_battery_level,0)}% → ${Mr(e.end_battery_level,0)}%`},{label:`Wh/${t}`,render:e=>Mr(e[this.unitKey("consumption_kwh")],0),optional:!0}],{visible:r,page:l,pages:s}=this.paginate(e);return B`
      <div class="subheader">Drives (${e.length})</div>
      ${Lr(i,r)} ${this.renderPager(l,s)}
    `}_charges(){const e=this._extra.charges??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=this._hass?.locale?.language,i=[{label:"Start",align:"left",render:e=>zr(e.start_date,n)},{label:"Location",align:"left",render:e=>e.address??"—"},{label:"Duration",render:e=>Mr(e.duration_min,0," min")},{label:"Added",render:e=>Mr(e.charge_energy_added,1," kWh")},{label:"Range",render:e=>Mr(e[this.unitKey("range_added")],0,` ${t}`)},{label:"SoC",render:e=>`${Mr(e.start_battery_level,0)}% → ${Mr(e.end_battery_level,0)}%`},{label:"Cost",render:e=>null===e.cost?"free":this._currency(e.cost)}];return B`
      <div class="subheader">Charges (${e.length})</div>
      ${Lr(i,e.slice(0,this.pageSize()))}
    `}renderContent(){const e=this._rows[0],t=Er(e?.distance);return e&&null!==t&&0!==t?B`
      <ha-card>
        ${this.renderHeader(`last ${_e(this.days())}`)} ${this._route()}
        ${this._summary(e)} ${this._timeSpent(e)} ${this._energyAdded(e)} ${this._batteryChart()}
        ${this._elevationChart()} ${this._drives()} ${this._charges()}
      </ha-card>
    `:B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No travel recorded in the last ${_e(this.days())}.</div>
        </ha-card>
      `}};Qr=e([he("teslamate-trip-card")],Qr);const Xr=[[0,"#FF7383"],[.3,"#FFB357"],[.85,"#56A64B"]],el=[[0,"rgb(133, 142, 133)"],[43200,"#56A64B"]];let tl=class extends ye{queryId(){return"vampire_drain"}queryOptions(){return{...this._config,days:this.days(),vars:{duration:this._config.min_duration_hours??6}}}defaultTitle(){return"Vampire Drain"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t=this._hass?.locale?.language;return[{label:"Start",align:"left",render:e=>zr(e.start_date,t)},{label:"End",align:"left",render:e=>zr(e.end_date,t)},{label:"Period",render:e=>Tr(e.duration),color:e=>Rr(e.duration,el,"inherit")},{label:"Standby",render:e=>Dr(e.standby),color:e=>Rr(e.standby,Xr,"inherit")},{label:"SoC",render:e=>Pr(e.soc_diff),optional:!0},{label:"",align:"center",render:e=>1===Er(e.has_reduced_range)?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>1===Er(e.has_reduced_range)?"Reduced range: part of the pack was unavailable, so range loss cannot be estimated":void 0},{label:"Range loss",render:t=>Mr(t[this.unitKey("range_diff")],2,` ${e}`)},{label:"Energy",render:e=>Mr(e.consumption,2," kWh"),optional:!0},{label:"Ø Power",render:e=>Mr(e.avg_power,0," W"),optional:!0},{label:"Ø Loss / h",render:t=>Mr(t[this.unitKey("range_lost_per_hour")],2,` ${e}`)}]}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">
            No standby periods longer than ${this._config.min_duration_hours??6} h in the last
            ${_e(this.days())}.
          </div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows),i=Or(this._rows,"consumption");return B`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} periods · ${i.toFixed(1)} kWh drained`)}
        ${Lr(this._columns(),e)} ${this.renderPager(t,n)}
      </ha-card>
    `}};tl=e([he("teslamate-vampire-drain-card")],tl);const nl=new URL(import.meta.url).searchParams.get("v")??"dev",il="https://github.com/johnbr/ha-teslamate-cards";window.customCards=window.customCards??[],window.customCards.push({type:"teslamate-drives-card",name:"TeslaMate Drives",description:"Every drive: route, distance, duration and energy.",preview:!1,documentationURL:il},{type:"teslamate-charges-card",name:"TeslaMate Charges",description:"Every charging session: energy, range gained, rate and cost.",preview:!1,documentationURL:il},{type:"teslamate-vampire-drain-card",name:"TeslaMate Vampire Drain",description:"Standby battery losses between drives and charges.",preview:!1,documentationURL:il},{type:"teslamate-battery-health-card",name:"TeslaMate Battery Health",description:"Usable capacity, degradation and range, with capacity by odometer.",preview:!1,documentationURL:il},{type:"teslamate-charging-stats-card",name:"TeslaMate Charging Stats",description:"Charging totals, cost per kWh, AC/DC split and the DC charging curve.",preview:!1,documentationURL:il},{type:"teslamate-trip-card",name:"TeslaMate Trip",description:"A past journey: distance, time split, energy, cost, battery and elevation.",preview:!1,documentationURL:il}),console.info(`%c TESLAMATE-CARDS %c ${nl} `,"color:#fff;background:#2b3038;font-weight:700","color:#2b3038;background:#ff9d4d;font-weight:700");
