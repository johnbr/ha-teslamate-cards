function e(e,t,n,i){var r,s=arguments.length,l=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(l=(s<3?r(l):s>3?r(t,n,l):r(t,n))||l);return s>3&&l&&Object.defineProperty(t,n,l),l}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&r.set(t,e))}return e}toString(){return this.cssText}};const l=e=>new s("string"==typeof e?e:e+"",void 0,i),o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new s(n,e,i)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return l(t)})(e):e,{is:c,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,g=globalThis,m=g.trustedTypes,_=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},x=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&u(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const s=i?.call(this);r?.call(this,t),this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(t,n.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const s=r.fromAttribute(t,e.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(void 0!==e){const s=this.constructor;if(!1===i&&(r=this[e]),n??=s.getPropertyOptions(e),!((n.hasChanged??x)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},s){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=new Map,$[y("finalized")]=new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,S=e=>e,A=k.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+M,D=`<${T}>`,P=document,z=()=>P.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,O="[ \t\n\f\r]",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,L=/>/g,H=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,q=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),B=q(1),K=q(2),Y=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,Z=P.createTreeWalker(P,129);function J(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Q=(e,t)=>{const n=e.length-1,i=[];let r,s=2===t?"<svg>":3===t?"<math>":"",l=W;for(let t=0;t<n;t++){const n=e[t];let o,a,c=-1,u=0;for(;u<n.length&&(l.lastIndex=u,a=l.exec(n),null!==a);)u=l.lastIndex,l===W?"!--"===a[1]?l=F:void 0!==a[1]?l=L:void 0!==a[2]?(j.test(a[2])&&(r=RegExp("</"+a[2],"g")),l=H):void 0!==a[3]&&(l=H):l===H?">"===a[0]?(l=r??W,c=-1):void 0===a[1]?c=-2:(c=l.lastIndex-a[2].length,o=a[1],l=void 0===a[3]?H:'"'===a[3]?I:U):l===I||l===U?l=H:l===F||l===L?l=W:(l=H,r=void 0);const d=l===H&&e[t+1].startsWith("/>")?" ":"";s+=l===W?n+D:c>=0?(i.push(o),n.slice(0,c)+E+n.slice(c)+M+d):n+M+(-2===c?t:d)}return[J(e,s+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,s=0;const l=e.length-1,o=this.parts,[a,c]=Q(e,t);if(this.el=X.createElement(a,n),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Z.nextNode())&&o.length<l;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=c[s++],n=i.getAttribute(e).split(M),l=/([.?@])?(.*)/.exec(t);o.push({type:1,index:r,name:l[2],strings:n,ctor:"."===l[1]?re:"?"===l[1]?se:"@"===l[1]?le:ie}),i.removeAttribute(e)}else e.startsWith(M)&&(o.push({type:6,index:r}),i.removeAttribute(e));if(j.test(i.tagName)){const e=i.textContent.split(M),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],z()),Z.nextNode(),o.push({type:2,index:++r});i.append(e[t],z())}}}else if(8===i.nodeType)if(i.data===T)o.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(M,e+1));)o.push({type:7,index:r}),e+=M.length-1}r++}}static createElement(e,t){const n=P.createElement("template");return n.innerHTML=e,n}}function ee(e,t,n=e,i){if(t===Y)return t;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const s=R(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(t=ee(e,r._$AS(e,t.values),r,i)),t}class te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??P).importNode(t,!0);Z.currentNode=i;let r=Z.nextNode(),s=0,l=0,o=n[0];for(;void 0!==o;){if(s===o.index){let t;2===o.type?t=new ne(r,r.nextSibling,this,e):1===o.type?t=new o.ctor(r,o.name,o.strings,this,e):6===o.type&&(t=new oe(r,this,e)),this._$AV.push(t),o=n[++l]}s!==o?.index&&(r=Z.nextNode(),s++)}return Z.currentNode=P,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),R(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=X.createElement(J(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new te(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new X(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new ne(this.O(z()),this.O(z()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=V}_$AI(e,t=this,n,i){const r=this.strings;let s=!1;if(void 0===r)e=ee(this,e,t,0),s=!R(e)||e!==this._$AH&&e!==Y,s&&(this._$AH=e);else{const i=e;let l,o;for(e=r[0],l=0;l<r.length-1;l++)o=ee(this,i[n+l],t,l),o===Y&&(o=this._$AH[l]),s||=!R(o)||o!==this._$AH[l],o===V?e=V:e!==V&&(e+=(o??"")+r[l+1]),this._$AH[l]=o}s&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class se extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class le extends ie{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=ee(this,e,t,0)??V)===Y)return;const n=this._$AH,i=e===V&&n!==V||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==V&&(n===V||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(X,ne),(k.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;class ue extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=n?.renderBefore??null;i._$litPart$=r=new ne(t.insertBefore(z(),e),e,void 0,n??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}ue._$litElement$=!0,ue.finalized=!0,ce.litElementHydrateSupport?.({LitElement:ue});const de=ce.litElementPolyfillSupport;de?.({LitElement:ue}),(ce.litElementVersions??=[]).push("4.2.2");const he=e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},fe=(e=pe,t,n)=>{const{kind:i,metadata:r}=n;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const r=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,r,e,!0,n)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];t.call(this,n),this.requestUpdate(i,r,e,!0,n)}}throw Error("Unsupported decorator location: "+i)};function ge(e){return(t,n)=>"object"==typeof n?fe(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function me(e){return ge({...e,state:!0,attribute:!1})}function _e(e){return 1===e?"1 day":`${e} days`}const ve=o`
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
`;async function ye(e,t,n){const i=n.days??90,r=new Date,s=new Date(r.getTime()-864e5*i);return(await e.callWS({type:"teslamate_cards/query",query_id:t,car_id:n.car_id??1,time_from:s.toISOString(),time_to:r.toISOString(),length_unit:n.length_unit??"km",temp_unit:n.temp_unit??"C",preferred_range:n.preferred_range??"rated",period:n.period??"month",geofence_ids:n.geofence_ids??null,location:n.location??"",charge_type:n.charge_type??"",vars:n.vars??{}})).rows}class be extends ue{constructor(){super(...arguments),this._rows=[],this._extra={},this._loading=!0,this._error=null,this._page=0,this._requested=!1}static{this.styles=ve}secondaryQueryIds(){return[]}set hass(e){this._hass=e,this._requested||(this._requested=!0,this.refresh())}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this._page=0,this._days=void 0,this._requested=!1,this._hass&&(this._requested=!0,this.refresh())}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>{this.refresh()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer),this._timer=void 0}async refresh(){if(!this._hass||!this._config)return;const e=this._hass,t=this.queryOptions();try{const n=this.secondaryQueryIds(),[i,...r]=await Promise.all([ye(e,this.queryId(),t),...n.map(n=>ye(e,n,t))]);this._rows=i,this._extra=Object.fromEntries(n.map((e,t)=>[e,r[t]??[]])),this._error=null}catch(e){this._error=function(e){return String("object"==typeof e&&null!==e&&"message"in e?e.message:e)}(e)}finally{this._loading=!1}}paginate(e){const t=this.pageSize(),n=Math.max(1,Math.ceil(e.length/t)),i=Math.min(this._page,n-1);return{visible:e.slice(i*t,i*t+t),page:i,pages:n}}pageSize(){return 25}days(){return this._days??this._config.days??this.defaultDays()}defaultDays(){return 90}defaultRanges(){return[7,30,90]}showRangePicker(){return!0}onRangeChanged(){}_ranges(){return function(e,t){const n=e.filter(e=>Number.isFinite(e)&&e>0);return[...new Set([...n,t])].sort((e,t)=>e-t)}(this._config.ranges??this.defaultRanges(),this._config.days??this.defaultDays())}_onRangeChange(e){const t=Number(e.target.value);Number.isFinite(t)&&t!==this.days()&&(this._days=t,this._page=0,this.onRangeChanged(),this.refresh())}renderRangePicker(){if(!this.showRangePicker())return null;const e=this._ranges();if(e.length<2)return null;const t=this.days();return B`
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
    `}defaultTitle(){return"TeslaMate"}unitKey(e){return`${e}_${this._config.length_unit??"km"}`}tempKey(e){return`${e}_${(this._config.temp_unit??"C").toLowerCase()}`}render(){return this._config?this._error?B`<ha-card>${this.renderHeader()}<div class="state error">${this._error}</div></ha-card>`:this._loading?B`<ha-card>${this.renderHeader()}<div class="state">Loading…</div></ha-card>`:this.renderContent():B``}}function xe(e,t,n,i){const r=new Map;for(const s of e){const e=n(s),l=i(s);if(!Number.isFinite(e)||!Number.isFinite(l))continue;const o=t(s),a=r.get(o);a?a.push([e,l]):r.set(o,[[e,l]])}for(const e of r.values())e.sort((e,t)=>e[0]-t[0]);return r}e([me()],be.prototype,"_rows",void 0),e([me()],be.prototype,"_extra",void 0),e([me()],be.prototype,"_loading",void 0),e([me()],be.prototype,"_error",void 0),e([me()],be.prototype,"_page",void 0),e([me()],be.prototype,"_days",void 0);const we="u-off",$e="u-label",ke="width",Se="height",Ae="top",Ce="bottom",Ee="left",Me="right",Te="#000",De=Te+"0",Pe="mousemove",ze="mousedown",Re="mouseup",Ne="mouseenter",Oe="mouseleave",We="dblclick",Fe="change",Le="dppxchange",He="--",Ue="undefined"!=typeof window,Ie=Ue?document:null,je=Ue?window:null,qe=Ue?navigator:null;let Be,Ke;function Ye(e,t){if(null!=t){let n=e.classList;!n.contains(t)&&n.add(t)}}function Ve(e,t){let n=e.classList;n.contains(t)&&n.remove(t)}function Ge(e,t,n){e.style[t]=n+"px"}function Ze(e,t,n,i){let r=Ie.createElement(e);return null!=t&&Ye(r,t),null!=n&&n.insertBefore(r,i),r}function Je(e,t){return Ze("div",e,t)}const Qe=new WeakMap;function Xe(e,t,n,i,r){let s="translate("+t+"px,"+n+"px)";s!=Qe.get(e)&&(e.style.transform=s,Qe.set(e,s),t<0||n<0||t>i||n>r?Ye(e,we):Ve(e,we))}const et=new WeakMap;function tt(e,t,n){let i=t+n;i!=et.get(e)&&(et.set(e,i),e.style.background=t,e.style.borderColor=n)}const nt=new WeakMap;function it(e,t,n,i){let r=t+""+n;r!=nt.get(e)&&(nt.set(e,r),e.style.height=n+"px",e.style.width=t+"px",e.style.marginLeft=i?-t/2+"px":0,e.style.marginTop=i?-n/2+"px":0)}const rt={passive:!0},st={...rt,capture:!0};function lt(e,t,n,i){t.addEventListener(e,n,i?st:rt)}function ot(e,t,n,i){t.removeEventListener(e,n,rt)}function at(e,t,n,i){let r;n=n||0;let s=(i=i||t.length-1)<=2147483647;for(;i-n>1;)r=s?n+i>>1:Ct((n+i)/2),t[r]<e?n=r:i=r;return e-t[n]<=t[i]-e?n:i}function ct(e){return(t,n,i)=>{let r=-1,s=-1;for(let s=n;s<=i;s++)if(e(t[s])){r=s;break}for(let r=i;r>=n;r--)if(e(t[r])){s=r;break}return[r,s]}}Ue&&function e(){let t=devicePixelRatio;Be!=t&&(Be=t,Ke&&ot(Fe,Ke,e),Ke=matchMedia(`(min-resolution: ${Be-.001}dppx) and (max-resolution: ${Be+.001}dppx)`),lt(Fe,Ke,e),je.dispatchEvent(new CustomEvent(Le)))}();const ut=e=>null!=e,dt=e=>null!=e&&e>0,ht=ct(ut),pt=ct(dt);function ft(e,t,n,i){let r=zt(e),s=zt(t);e==t&&(-1==r?(e*=n,t/=n):(e/=n,t*=n));let l=10==n?Rt:Nt,o=1==s?Mt:Ct,a=(1==r?Ct:Mt)(l(At(e))),c=o(l(At(t))),u=Pt(n,a),d=Pt(n,c);return 10==n&&(a<0&&(u=Qt(u,-a)),c<0&&(d=Qt(d,-c))),i||2==n?(e=u*r,t=d*s):(e=Jt(e,u),t=Zt(t,d)),[e,t]}function gt(e,t,n,i){let r=ft(e,t,n,i);return 0==e&&(r[0]=0),0==t&&(r[1]=0),r}const mt={mode:3,pad:.1},_t={pad:0,soft:null,mode:0},vt={min:_t,max:_t};function yt(e,t,n,i){return cn(n)?xt(e,t,n):(_t.pad=n,_t.soft=i?0:null,_t.mode=i?3:0,xt(e,t,vt))}function bt(e,t){return e??t}function xt(e,t,n){let i=n.min,r=n.max,s=bt(i.pad,0),l=bt(r.pad,0),o=bt(i.hard,-Wt),a=bt(r.hard,Wt),c=bt(i.soft,Wt),u=bt(r.soft,-Wt),d=bt(i.mode,0),h=bt(r.mode,0),p=t-e,f=Rt(p),g=Dt(At(e),At(t)),m=Rt(g),_=At(m-f);(p<1e-24||_>10)&&(p=0,0!=e&&0!=t||(p=1e-24,2==d&&c!=Wt&&(s=0),2==h&&u!=-Wt&&(l=0)));let v=p||g||1e3,y=Rt(v),b=Pt(10,Ct(y)),x=Qt(Jt(e-v*(0==p?0==e?.1:1:s),b/10),24),w=e>=c&&(1==d||3==d&&x<=c||2==d&&x>=c)?c:Wt,$=Dt(o,x<w&&e>=w?w:Tt(w,x)),k=Qt(Zt(t+v*(0==p?0==t?.1:1:l),b/10),24),S=t<=u&&(1==h||3==h&&k>=u||2==h&&k<=u)?u:-Wt,A=Tt(a,k>S&&t<=S?S:Dt(S,k));return $==A&&0==$&&(A=100),[$,A]}const wt=new Intl.NumberFormat(Ue?qe.language:"en-US"),$t=e=>wt.format(e),kt=Math,St=kt.PI,At=kt.abs,Ct=kt.floor,Et=kt.round,Mt=kt.ceil,Tt=kt.min,Dt=kt.max,Pt=kt.pow,zt=kt.sign,Rt=kt.log10,Nt=kt.log2,Ot=(e,t=1)=>kt.asinh(e/t),Wt=1/0;function Ft(e){return 1+(0|Rt((e^e>>31)-(e>>31)))}function Lt(e,t,n){return Tt(Dt(e,t),n)}function Ht(e){return"function"==typeof e}function Ut(e){return Ht(e)?e:()=>e}const It=e=>e,jt=(e,t)=>t,qt=e=>null,Bt=e=>!0,Kt=(e,t)=>e==t,Yt=/\.\d*?(?=9{6,}|0{6,})/gm,Vt=e=>{if(on(e)||Xt.has(e))return e;const t=`${e}`,n=t.match(Yt);if(null==n)return e;let i=n[0].length-1;if(-1!=t.indexOf("e-")){let[e,n]=t.split("e");return+`${Vt(e)}e${n}`}return Qt(e,i)};function Gt(e,t){return Vt(Qt(Vt(e/t))*t)}function Zt(e,t){return Vt(Mt(Vt(e/t))*t)}function Jt(e,t){return Vt(Ct(Vt(e/t))*t)}function Qt(e,t=0){if(on(e))return e;let n=10**t,i=e*n*(1+Number.EPSILON);return Et(i)/n}const Xt=new Map;function en(e){return((""+e).split(".")[1]||"").length}function tn(e,t,n,i){let r=[],s=i.map(en);for(let l=t;l<n;l++){let t=At(l),n=Qt(Pt(e,l),t);for(let o=0;o<i.length;o++){let a=10==e?+`${i[o]}e${l}`:i[o]*n,c=(l>=0?0:t)+(l>=s[o]?0:s[o]),u=10==e?a:Qt(a,c);r.push(u),Xt.set(u,c)}}return r}const nn={},rn=[],sn=[null,null],ln=Array.isArray,on=Number.isInteger;function an(e){return"string"==typeof e}function cn(e){let t=!1;if(null!=e){let n=e.constructor;t=null==n||n==Object}return t}function un(e){return null!=e&&"object"==typeof e}const dn=Object.getPrototypeOf(Uint8Array),hn="__proto__";function pn(e,t=cn){let n;if(ln(e)){let i=e.find(e=>null!=e);if(ln(i)||t(i)){n=Array(e.length);for(let i=0;i<e.length;i++)n[i]=pn(e[i],t)}else n=e.slice()}else if(e instanceof dn)n=e.slice();else if(t(e)){n={};for(let i in e)i!=hn&&(n[i]=pn(e[i],t))}else n=e;return n}function fn(e){let t=arguments;for(let n=1;n<t.length;n++){let i=t[n];for(let t in i)t!=hn&&(cn(e[t])?fn(e[t],pn(i[t])):e[t]=pn(i[t]))}return e}function gn(e,t,n){for(let i,r=0,s=-1;r<t.length;r++){let l=t[r];if(l>s){for(i=l-1;i>=0&&null==e[i];)e[i--]=null;for(i=l+1;i<n&&null==e[i];)e[s=i++]=null}}}const mn="undefined"==typeof queueMicrotask?e=>Promise.resolve().then(e):queueMicrotask;const _n=["January","February","March","April","May","June","July","August","September","October","November","December"],vn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function yn(e){return e.slice(0,3)}const bn=vn.map(yn),xn=_n.map(yn),wn={MMMM:_n,MMM:xn,WWWW:vn,WWW:bn};function $n(e){return(e<10?"0":"")+e}const kn={YYYY:e=>e.getFullYear(),YY:e=>(e.getFullYear()+"").slice(2),MMMM:(e,t)=>t.MMMM[e.getMonth()],MMM:(e,t)=>t.MMM[e.getMonth()],MM:e=>$n(e.getMonth()+1),M:e=>e.getMonth()+1,DD:e=>$n(e.getDate()),D:e=>e.getDate(),WWWW:(e,t)=>t.WWWW[e.getDay()],WWW:(e,t)=>t.WWW[e.getDay()],HH:e=>$n(e.getHours()),H:e=>e.getHours(),h:e=>{let t=e.getHours();return 0==t?12:t>12?t-12:t},AA:e=>e.getHours()>=12?"PM":"AM",aa:e=>e.getHours()>=12?"pm":"am",a:e=>e.getHours()>=12?"p":"a",mm:e=>$n(e.getMinutes()),m:e=>e.getMinutes(),ss:e=>$n(e.getSeconds()),s:e=>e.getSeconds(),fff:e=>{return((t=e.getMilliseconds())<10?"00":t<100?"0":"")+t;var t}};function Sn(e,t){t=t||wn;let n,i=[],r=/\{([a-z]+)\}|[^{]+/gi;for(;n=r.exec(e);)i.push("{"==n[0][0]?kn[n[1]]:n[0]);return e=>{let n="";for(let r=0;r<i.length;r++)n+="string"==typeof i[r]?i[r]:i[r](e,t);return n}}const An=(new Intl.DateTimeFormat).resolvedOptions().timeZone;const Cn=e=>e%1==0,En=[1,2,2.5,5],Mn=tn(10,-32,0,En),Tn=tn(10,0,32,En),Dn=Tn.filter(Cn),Pn=Mn.concat(Tn),zn="{YYYY}",Rn="\n"+zn,Nn="{M}/{D}",On="\n"+Nn,Wn=On+"/{YY}",Fn="{aa}",Ln="{h}:{mm}"+Fn,Hn="\n"+Ln,Un=":{ss}",In=null;function jn(e){let t=1e3*e,n=60*t,i=60*n,r=24*i,s=30*r,l=365*r;return[(1==e?tn(10,0,3,En).filter(Cn):tn(10,-3,0,En)).concat([t,5*t,10*t,15*t,30*t,n,5*n,10*n,15*n,30*n,i,2*i,3*i,4*i,6*i,8*i,12*i,r,2*r,3*r,4*r,5*r,6*r,7*r,8*r,9*r,10*r,15*r,s,2*s,3*s,4*s,6*s,l,2*l,5*l,10*l,25*l,50*l,100*l]),[[l,zn,In,In,In,In,In,In,1],[28*r,"{MMM}",Rn,In,In,In,In,In,1],[r,Nn,Rn,In,In,In,In,In,1],[i,"{h}"+Fn,Wn,In,On,In,In,In,1],[n,Ln,Wn,In,On,In,In,In,1],[t,Un,Wn+" "+Ln,In,On+" "+Ln,In,Hn,In,1],[e,Un+".{fff}",Wn+" "+Ln,In,On+" "+Ln,In,Hn,In,1]],function(t){return(o,a,c,u,d,h)=>{let p=[],f=d>=l,g=d>=s&&d<l,m=t(c),_=Qt(m*e,3),v=Qn(m.getFullYear(),f?0:m.getMonth(),g||f?1:m.getDate()),y=Qt(v*e,3);if(g||f){let n=g?d/s:0,i=f?d/l:0,r=_==y?_:Qt(Qn(v.getFullYear()+i,v.getMonth()+n,1)*e,3),o=new Date(Et(r/e)),a=o.getFullYear(),c=o.getMonth();for(let s=0;r<=u;s++){let l=Qn(a+i*s,c+n*s,1),o=l-t(Qt(l*e,3));r=Qt((+l+o)*e,3),r<=u&&p.push(r)}}else{let s=d>=r?r:d,l=y+(Ct(c)-Ct(_))+Zt(_-y,s);p.push(l);let f=t(l),g=f.getHours()+f.getMinutes()/n+f.getSeconds()/i,m=d/i,v=h/o.axes[a]._space;for(;l=Qt(l+d,1==e?0:3),!(l>u);)if(m>1){let e=Ct(Qt(g+m,6))%24,n=t(l).getHours()-e;n>1&&(n=-1),l-=n*i,g=(g+m)%24,Qt((l-p[p.length-1])/d,3)*v>=.7&&p.push(l)}else p.push(l)}return p}}]}const[qn,Bn,Kn]=jn(1),[Yn,Vn,Gn]=jn(.001);function Zn(e,t){return e.map(e=>e.map((n,i)=>0==i||8==i||null==n?n:t(1==i||0==e[8]?n:e[1]+n)))}function Jn(e,t){return(n,i,r,s,l)=>{let o,a,c,u,d,h,p=t.find(e=>l>=e[0])||t[t.length-1];return i.map(t=>{let n=e(t),i=n.getFullYear(),r=n.getMonth(),s=n.getDate(),l=n.getHours(),f=n.getMinutes(),g=n.getSeconds(),m=i!=o&&p[2]||r!=a&&p[3]||s!=c&&p[4]||l!=u&&p[5]||f!=d&&p[6]||g!=h&&p[7]||p[1];return o=i,a=r,c=s,u=l,d=f,h=g,m(n)})}}function Qn(e,t,n){return new Date(e,t,n)}function Xn(e,t){return t(e)}tn(2,-53,53,[1]);function ei(e,t){return(n,i,r,s)=>null==s?He:t(e(i))}const ti={show:!0,live:!0,isolate:!1,mount:()=>{},markers:{show:!0,width:2,stroke:function(e,t){let n=e.series[t];return n.width?n.stroke(e,t):n.points.width?n.points.stroke(e,t):null},fill:function(e,t){return e.series[t].fill(e,t)},dash:"solid"},idx:null,idxs:null,values:[]};const ni=[0,0];function ii(e,t,n,i=!0){return e=>{0==e.button&&(!i||e.target==t)&&n(e)}}function ri(e,t,n,i=!0){return e=>{(!i||e.target==t)&&n(e)}}const si={show:!0,x:!0,y:!0,lock:!1,move:function(e,t,n){return ni[0]=t,ni[1]=n,ni},points:{one:!1,show:function(e,t){let n=e.cursor.points,i=Je(),r=n.size(e,t);Ge(i,ke,r),Ge(i,Se,r);let s=r/-2;Ge(i,"marginLeft",s),Ge(i,"marginTop",s);let l=n.width(e,t,r);return l&&Ge(i,"borderWidth",l),i},size:function(e,t){return e.series[t].points.size},width:0,stroke:function(e,t){let n=e.series[t].points;return n._stroke||n._fill},fill:function(e,t){let n=e.series[t].points;return n._fill||n._stroke}},bind:{mousedown:ii,mouseup:ii,click:ii,dblclick:ii,mousemove:ri,mouseleave:ri,mouseenter:ri},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(e,t)=>{t.stopPropagation(),t.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(e,t,n,i,r)=>i-r,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},li={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},oi=fn({},li,{filter:jt}),ai=fn({},oi,{size:10}),ci=fn({},li,{show:!1}),ui='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',di="bold "+ui,hi={show:!0,scale:"x",stroke:Te,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:di,side:2,grid:oi,ticks:ai,border:ci,font:ui,lineGap:1.5,rotate:0},pi={show:!0,scale:"x",auto:!1,sorted:1,min:Wt,max:-Wt,idxs:[]};function fi(e,t,n,i,r){return t.map(e=>null==e?"":$t(e))}function gi(e,t,n,i,r,s,l){let o=[],a=Xt.get(r)||0;for(let e=n=l?n:Qt(Zt(n,r),a);e<=i;e=Qt(e+r,a))o.push(Object.is(e,-0)?0:e);return o}function mi(e,t,n,i,r,s,l){const o=[],a=e.scales[e.axes[t].scale].log,c=Ct((10==a?Rt:Nt)(n));r=Pt(a,c),10==a&&(r=Pn[at(r,Pn)]);let u=n,d=r*a;10==a&&(d=Pn[at(d,Pn)]);do{o.push(u),u+=r,10!=a||Xt.has(u)||(u=Qt(u,Xt.get(r))),u>=d&&(d=(r=u)*a,10==a&&(d=Pn[at(d,Pn)]))}while(u<=i);return o}function _i(e,t,n,i,r,s,l){let o=e.scales[e.axes[t].scale].asinh,a=i>o?mi(e,t,Dt(o,n),i,r):[o],c=i>=0&&n<=0?[0]:[];return(n<-o?mi(e,t,Dt(o,-i),-n,r):[o]).reverse().map(e=>-e).concat(c,a)}const vi=/./,yi=/[12357]/,bi=/[125]/,xi=/1/,wi=(e,t,n,i)=>e.map((e,r)=>4==t&&0==e||r%i==0&&n.test(e.toExponential()[e<0?1:0])?e:null);function $i(e,t,n,i,r){let s=e.axes[n],l=s.scale,o=e.scales[l],a=e.valToPos,c=s._space,u=a(10,l),d=a(9,l)-u>=c?vi:a(7,l)-u>=c?yi:a(5,l)-u>=c?bi:xi;if(d==xi){let e=At(a(1,l)-u);if(e<c)return wi(t.slice().reverse(),o.distr,d,Mt(c/e)).reverse()}return wi(t,o.distr,d,1)}function ki(e,t,n,i,r){let s=e.axes[n],l=s.scale,o=s._space,a=e.valToPos,c=At(a(1,l)-a(2,l));return c<o?wi(t.slice().reverse(),3,vi,Mt(o/c)).reverse():t}function Si(e,t,n,i){return null==i?He:null==t?"":$t(t)}const Ai={show:!0,scale:"y",stroke:Te,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:di,side:3,grid:oi,ticks:ai,border:ci,font:ui,lineGap:1.5,rotate:0};const Ci={scale:null,auto:!0,sorted:0,min:Wt,max:-Wt},Ei=(e,t,n,i,r)=>r,Mi={show:!0,auto:!0,sorted:0,gaps:Ei,alpha:1,facets:[fn({},Ci,{scale:"x"}),fn({},Ci,{scale:"y"})]},Ti={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:Ei,alpha:1,points:{show:function(e,t){let{scale:n,idxs:i}=e.series[0],r=e._data[0],s=e.valToPos(r[i[0]],n,!0),l=e.valToPos(r[i[1]],n,!0),o=At(l-s)/(e.series[t].points.space*Be);return i[1]-i[0]<=o},filter:null},values:null,min:Wt,max:-Wt,idxs:[],path:null,clip:null};function Di(e,t,n,i,r){return n/10}const Pi={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},zi=fn({},Pi,{time:!1,ori:1}),Ri={};function Ni(e,t){let n=Ri[e];return n||(n={key:e,plots:[],sub(e){n.plots.push(e)},unsub(e){n.plots=n.plots.filter(t=>t!=e)},pub(e,t,i,r,s,l,o){for(let a=0;a<n.plots.length;a++)n.plots[a]!=t&&n.plots[a].pub(e,t,i,r,s,l,o)}},null!=e&&(Ri[e]=n)),n}function Oi(e,t,n){const i=e.mode,r=e.series[t],s=2==i?e._data[t]:e._data,l=e.scales,o=e.bbox;let a=s[0],c=2==i?s[1]:s[t],u=2==i?l[r.facets[0].scale]:l[e.series[0].scale],d=2==i?l[r.facets[1].scale]:l[r.scale],h=o.left,p=o.top,f=o.width,g=o.height,m=e.valToPosH,_=e.valToPosV;return 0==u.ori?n(r,a,c,u,d,m,_,h,p,f,g,qi,Ki,Vi,Zi,Qi):n(r,a,c,u,d,_,m,p,h,g,f,Bi,Yi,Gi,Ji,Xi)}function Wi(e,t){let n=0,i=0,r=bt(e.bands,rn);for(let e=0;e<r.length;e++){let s=r[e];s.series[0]==t?n=s.dir:s.series[1]==t&&(1==s.dir?i|=1:i|=2)}return[n,1==i?-1:2==i?1:3==i?2:0]}function Fi(e,t,n,i,r){let s=e.mode,l=e.series[t],o=2==s?l.facets[1].scale:l.scale,a=e.scales[o];return-1==r?a.min:1==r?a.max:3==a.distr?1==a.dir?a.min:a.max:0}function Li(e,t,n,i,r,s){return Oi(e,t,(e,t,l,o,a,c,u,d,h,p,f)=>{let g=e.pxRound;const m=o.dir*(0==o.ori?1:-1),_=0==o.ori?Ki:Yi;let v,y;1==m?(v=n,y=i):(v=i,y=n);let b=g(c(t[v],o,p,d)),x=g(u(l[v],a,f,h)),w=g(c(t[y],o,p,d)),$=g(u(1==s?a.max:a.min,a,f,h)),k=new Path2D(r);return _(k,w,$),_(k,b,$),_(k,b,x),k})}function Hi(e,t,n,i,r,s){let l=null;if(e.length>0){l=new Path2D;const o=0==t?Vi:Gi;let a=n;for(let t=0;t<e.length;t++){let n=e[t];if(n[1]>n[0]){let e=n[0]-a;e>0&&o(l,a,i,e,i+s),a=n[1]}}let c=n+r-a,u=10;c>0&&o(l,a,i-u/2,c,i+s+u)}return l}function Ui(e,t,n,i,r,s,l){let o=[],a=e.length;for(let c=1==r?n:i;c>=n&&c<=i;c+=r){if(null===t[c]){let u=c,d=c;if(1==r)for(;++c<=i&&null===t[c];)d=c;else for(;--c>=n&&null===t[c];)d=c;let h=s(e[u]),p=d==u?h:s(e[d]),f=u-r;h=l<=0&&f>=0&&f<a?s(e[f]):h;let g=d+r;p=l>=0&&g>=0&&g<a?s(e[g]):p,p>=h&&o.push([h,p])}}return o}function Ii(e){return 0==e?It:1==e?Et:t=>Gt(t,e)}function ji(e){let t=0==e?qi:Bi,n=0==e?(e,t,n,i,r,s)=>{e.arcTo(t,n,i,r,s)}:(e,t,n,i,r,s)=>{e.arcTo(n,t,r,i,s)},i=0==e?(e,t,n,i,r)=>{e.rect(t,n,i,r)}:(e,t,n,i,r)=>{e.rect(n,t,r,i)};return(e,r,s,l,o,a=0,c=0)=>{0==a&&0==c?i(e,r,s,l,o):(a=Tt(a,l/2,o/2),c=Tt(c,l/2,o/2),t(e,r+a,s),n(e,r+l,s,r+l,s+o,a),n(e,r+l,s+o,r,s+o,c),n(e,r,s+o,r,s,c),n(e,r,s,r+l,s,a),e.closePath())}}const qi=(e,t,n)=>{e.moveTo(t,n)},Bi=(e,t,n)=>{e.moveTo(n,t)},Ki=(e,t,n)=>{e.lineTo(t,n)},Yi=(e,t,n)=>{e.lineTo(n,t)},Vi=ji(0),Gi=ji(1),Zi=(e,t,n,i,r,s)=>{e.arc(t,n,i,r,s)},Ji=(e,t,n,i,r,s)=>{e.arc(n,t,i,r,s)},Qi=(e,t,n,i,r,s,l)=>{e.bezierCurveTo(t,n,i,r,s,l)},Xi=(e,t,n,i,r,s,l)=>{e.bezierCurveTo(n,t,r,i,l,s)};function er(e){return(e,t,n,i,r)=>Oi(e,t,(t,s,l,o,a,c,u,d,h,p,f)=>{let g,m,{pxRound:_,points:v}=t;0==o.ori?(g=qi,m=Zi):(g=Bi,m=Ji);const y=Qt(v.width*Be,3);let b=(v.size-v.width)/2*Be,x=Qt(2*b,3),w=new Path2D,$=new Path2D,{left:k,top:S,width:A,height:C}=e.bbox;Vi($,k-x,S-x,A+2*x,C+2*x);const E=e=>{if(null!=l[e]){let t=_(c(s[e],o,p,d)),n=_(u(l[e],a,f,h));g(w,t+b,n),m(w,t,n,b,0,2*St)}};if(r)r.forEach(E);else for(let e=n;e<=i;e++)E(e);return{stroke:y>0?w:null,fill:w,clip:$,flags:3}})}function tr(e){return(t,n,i,r,s,l)=>{i!=r&&(s!=i&&l!=i&&e(t,n,i),s!=r&&l!=r&&e(t,n,r),e(t,n,l))}}const nr=tr(Ki),ir=tr(Yi);function rr(e){const t=bt(e?.alignGaps,0);return(e,n,i,r)=>Oi(e,n,(s,l,o,a,c,u,d,h,p,f,g)=>{[i,r]=ht(o,i,r);let m,_,v=s.pxRound,y=e=>v(u(e,a,f,h)),b=e=>v(d(e,c,g,p));0==a.ori?(m=Ki,_=nr):(m=Yi,_=ir);const x=a.dir*(0==a.ori?1:-1),w={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},$=w.stroke;let k=!1;if(r-i>=4*f){let t,n,s,c=t=>e.posToVal(t,a.key,!0),u=null,d=null,h=y(l[1==x?i:r]),p=y(l[i]),f=y(l[r]),g=c(1==x?p+1:f-1);for(let e=1==x?i:r;e>=i&&e<=r;e+=x){let i=l[e],r=(1==x?i<g:i>g)?h:y(i),s=o[e];r==h?null!=s?(n=s,null==u?(m($,r,b(n)),t=u=d=n):n<u?u=n:n>d&&(d=n)):null===s&&(k=!0):(null!=u&&_($,h,b(u),b(d),b(t),b(n)),null!=s?(n=s,m($,r,b(n)),u=d=t=n):(u=d=null,null===s&&(k=!0)),h=r,g=c(h+x))}null!=u&&u!=d&&s!=h&&_($,h,b(u),b(d),b(t),b(n))}else for(let e=1==x?i:r;e>=i&&e<=r;e+=x){let t=o[e];null===t?k=!0:null!=t&&m($,y(l[e]),b(t))}let[S,A]=Wi(e,n);if(null!=s.fill||0!=S){let t=w.fill=new Path2D($),o=b(s.fillTo(e,n,s.min,s.max,S)),a=y(l[i]),c=y(l[r]);-1==x&&([c,a]=[a,c]),m(t,c,o),m(t,a,o)}if(!s.spanGaps){let c=[];k&&c.push(...Ui(l,o,i,r,x,y,t)),w.gaps=c=s.gaps(e,n,i,r,c),w.clip=Hi(c,a.ori,h,p,f,g)}return 0!=A&&(w.band=2==A?[Li(e,n,i,r,$,-1),Li(e,n,i,r,$,1)]:Li(e,n,i,r,$,A)),w})}function sr(e,t,n,i,r,s,l=Wt){if(e.length>1){let o=null;for(let a=0,c=1/0;a<e.length;a++)if(void 0!==t[a]){if(null!=o){let t=At(e[a]-e[o]);t<c&&(c=t,l=At(n(e[a],i,r,s)-n(e[o],i,r,s)))}o=a}}return l}function lr(e,t,n,i,r,s){const l=e.length;if(l<2)return null;const o=new Path2D;if(n(o,e[0],t[0]),2==l)i(o,e[1],t[1]);else{let n=Array(l),i=Array(l-1),s=Array(l-1),a=Array(l-1);for(let n=0;n<l-1;n++)s[n]=t[n+1]-t[n],a[n]=e[n+1]-e[n],i[n]=s[n]/a[n];n[0]=i[0];for(let e=1;e<l-1;e++)0===i[e]||0===i[e-1]||i[e-1]>0!=i[e]>0?n[e]=0:(n[e]=3*(a[e-1]+a[e])/((2*a[e]+a[e-1])/i[e-1]+(a[e]+2*a[e-1])/i[e]),isFinite(n[e])||(n[e]=0));n[l-1]=i[l-2];for(let i=0;i<l-1;i++)r(o,e[i]+a[i]/3,t[i]+n[i]*a[i]/3,e[i+1]-a[i]/3,t[i+1]-n[i+1]*a[i]/3,e[i+1],t[i+1])}return o}const or=new Set;function ar(){for(let e of or)e.syncRect(!0)}Ue&&(lt("resize",je,ar),lt("scroll",je,ar,!0),lt(Le,je,()=>{$r.pxRatio=Be}));const cr=rr(),ur=er();function dr(e,t,n,i){return(i?[e[0],e[1]].concat(e.slice(2)):[e[0]].concat(e.slice(1))).map((e,i)=>hr(e,i,t,n))}function hr(e,t,n,i){return fn({},0==t?n:i,e)}function pr(e,t,n){return null==t?sn:[t,n]}const fr=pr;function gr(e,t,n){return null==t?sn:yt(t,n,.1,!0)}function mr(e,t,n,i){return null==t?sn:ft(t,n,e.scales[i].log,!1)}const _r=mr;function vr(e,t,n,i){return null==t?sn:gt(t,n,e.scales[i].log,!1)}const yr=vr;function br(e,t,n,i,r){let s=Dt(Ft(e),Ft(t)),l=t-e,o=at(r/i*l,n);do{let e=n[o],t=i*e/l;if(t>=r&&s+(e<5?Xt.get(e):0)<=17)return[e,t]}while(++o<n.length);return[0,0]}function xr(e){let t,n;return[e=e.replace(/(\d+)px/,(e,i)=>(t=Et((n=+i)*Be))+"px"),t,n]}function wr(e){e.show&&[e.font,e.labelFont].forEach(e=>{let t=Qt(e[2]*Be,1);e[0]=e[0].replace(/[0-9.]+px/,t+"px"),e[1]=t})}function $r(e,t,n){const i={mode:bt(e.mode,1)},r=i.mode;function s(e,t,n,i){let r=t.valToPct(e);return i+n*(-1==t.dir?1-r:r)}function l(e,t,n,i){let r=t.valToPct(e);return i+n*(-1==t.dir?r:1-r)}function o(e,t,n,i){return 0==t.ori?s(e,t,n,i):l(e,t,n,i)}i.valToPosH=s,i.valToPosV=l;let a=!1;i.status=0;const c=i.root=Je("uplot");if(null!=e.id&&(c.id=e.id),Ye(c,e.class),e.title){Je("u-title",c).textContent=e.title}const u=Ze("canvas"),d=i.ctx=u.getContext("2d"),h=Je("u-wrap",c);lt("click",h,e=>{if(e.target===f){(ai!=ii||ci!=ri)&&Ei.click(i,e)}},!0);const p=i.under=Je("u-under",h);h.appendChild(u);const f=i.over=Je("u-over",h),g=+bt((e=pn(e)).pxAlign,1),m=Ii(g);(e.plugins||[]).forEach(t=>{t.opts&&(e=t.opts(i,e)||e)});const _=e.ms||.001,v=i.series=1==r?dr(e.series||[],pi,Ti,!1):function(e,t){return e.map((e,n)=>0==n?{}:fn({},t,e))}(e.series||[null],Mi),y=i.axes=dr(e.axes||[],hi,Ai,!0),b=i.scales={},x=i.bands=e.bands||[];x.forEach(e=>{e.fill=Ut(e.fill||null),e.dir=bt(e.dir,-1)});const w=2==r?v[1].facets[0].scale:v[0].scale,$={axes:function(){for(let e=0;e<y.length;e++){let t=y[e];if(!t.show||!t._show)continue;let n,r,s=t.side,l=s%2,a=t.stroke(i,e),c=0==s||3==s?-1:1,[u,h]=t._found;if(null!=t.label){let o=t.labelGap*c,p=Et((t._lpos+o)*Be);kn(t.labelFont[0],a,"center",2==s?Ae:Ce),d.save(),1==l?(n=r=0,d.translate(p,Et(fe+me/2)),d.rotate((3==s?-St:St)/2)):(n=Et(pe+ge/2),r=p);let f=Ht(t.label)?t.label(i,e,u,h):t.label;d.fillText(f,n,r),d.restore()}if(0==h)continue;let p=b[t.scale],f=0==l?ge:me,g=0==l?pe:fe,_=t._splits,v=2==p.distr?_.map(e=>yn[e]):_,x=2==p.distr?yn[_[1]]-yn[_[0]]:u,w=t.ticks,$=t.border,k=w.show?w.size:0,S=Et(k*Be),A=Et((2==t.alignTo?t._size-k-t.gap:t.gap)*Be),C=t._rotate*-St/180,E=m(t._pos*Be),M=E+(S+A)*c;r=0==l?M:0,n=1==l?M:0,kn(t.font[0],a,1==t.align?Ee:2==t.align?Me:C>0?Ee:C<0?Me:0==l?"center":3==s?Me:Ee,C||1==l?"middle":2==s?Ae:Ce);let T=t.font[1]*t.lineGap,D=_.map(e=>m(o(e,p,f,g))),P=t._values;for(let e=0;e<P.length;e++){let t=P[e];if(null!=t){0==l?n=D[e]:r=D[e],t=""+t;let i=-1==t.indexOf("\n")?[t]:t.split(/\n/gm);for(let e=0;e<i.length;e++){let t=i[e];C?(d.save(),d.translate(n,r+e*T),d.rotate(C),d.fillText(t,0,0),d.restore()):d.fillText(t,n,r+e*T)}}}w.show&&On(D,w.filter(i,v,e,h,x),l,s,E,S,Qt(w.width*Be,3),w.stroke(i,e),w.dash,w.cap);let z=t.grid;z.show&&On(D,z.filter(i,v,e,h,x),l,0==l?2:1,0==l?fe:pe,0==l?me:ge,Qt(z.width*Be,3),z.stroke(i,e),z.dash,z.cap),$.show&&On([E],[1],0==l?1:0,0==l?1:2,1==l?fe:pe,1==l?me:ge,Qt($.width*Be,3),$.stroke(i,e),$.dash,$.cap)}zr("drawAxes")},series:function(){if(Nt>0){let e=v.some(e=>e._focus)&&vn!=et.alpha;e&&(d.globalAlpha=vn=et.alpha),v.forEach((e,n)=>{if(n>0&&e.show&&(En(n,!1),En(n,!0),null==e._paths)){let s=vn;vn!=e.alpha&&(d.globalAlpha=vn=e.alpha);let l=2==r?[0,t[n][0].length-1]:function(e){let t=Lt(Ft-1,0,Nt-1),n=Lt(It+1,0,Nt-1);for(;null==e[t]&&t>0;)t--;for(;null==e[n]&&n<Nt-1;)n++;return[t,n]}(t[n]);e._paths=e.paths(i,n,l[0],l[1]),vn!=s&&(d.globalAlpha=vn=s)}}),v.forEach((e,t)=>{if(t>0&&e.show){let n=vn;vn!=e.alpha&&(d.globalAlpha=vn=e.alpha),null!=e._paths&&Mn(t,!1);{let n=null!=e._paths?e._paths.gaps:null,r=e.points.show(i,t,Ft,It,n),s=e.points.filter(i,t,r,n);(r||s)&&(e.points._paths=e.points.paths(i,t,Ft,It,s),Mn(t,!0))}vn!=n&&(d.globalAlpha=vn=n),zr("drawSeries",t)}}),e&&(d.globalAlpha=vn=1)}}},k=(e.drawOrder||["axes","series"]).map(e=>$[e]);function S(e){const t=3==e.distr?t=>Rt(t>0?t:e.clamp(i,t,e.min,e.max,e.key)):4==e.distr?t=>Ot(t,e.asinh):100==e.distr?t=>e.fwd(t):e=>e;return n=>{let i=t(n),{_min:r,_max:s}=e;return(i-r)/(s-r)}}function A(t){let n=b[t];if(null==n){let i=(e.scales||nn)[t]||nn;if(null!=i.from){A(i.from);let e=fn({},b[i.from],i,{key:t});e.valToPct=S(e),b[t]=e}else{n=b[t]=fn({},t==w?Pi:zi,i),n.key=t;let e=n.time,s=n.range,l=ln(s);if((t!=w||2==r&&!e)&&(!l||null!=s[0]&&null!=s[1]||(s={min:null==s[0]?mt:{mode:1,hard:s[0],soft:s[0]},max:null==s[1]?mt:{mode:1,hard:s[1],soft:s[1]}},l=!1),!l&&cn(s))){let e=s;s=(t,n,i)=>null==n?sn:yt(n,i,e)}n.range=Ut(s||(e?fr:t==w?3==n.distr?_r:4==n.distr?yr:pr:3==n.distr?mr:4==n.distr?vr:gr)),n.auto=Ut(!l&&n.auto),n.clamp=Ut(n.clamp||Di),n._min=n._max=null,n.valToPct=S(n)}}}A("x"),A("y"),1==r&&v.forEach(e=>{A(e.scale)}),y.forEach(e=>{A(e.scale)});for(let t in e.scales)A(t);const C=b[w],E=C.distr;let M,T;0==C.ori?(Ye(c,"u-hz"),M=s,T=l):(Ye(c,"u-vt"),M=l,T=s);const D={};for(let e in b){let t=b[e];null==t.min&&null==t.max||(D[e]={min:t.min,max:t.max},t.min=t.max=null)}const P=e.tzDate||(e=>new Date(Et(e/_))),z=e.fmtDate||Sn,R=1==_?Kn(P):Gn(P),N=Jn(P,Zn(1==_?Bn:Vn,z)),O=ei(P,Xn("{YYYY}-{MM}-{DD} {h}:{mm}{aa}",z)),W=[],F=i.legend=fn({},ti,e.legend),L=i.cursor=fn({},si,{drag:{y:2==r}},e.cursor),H=F.show,U=L.show,I=F.markers;let j,q,B;F.idxs=W,I.width=Ut(I.width),I.dash=Ut(I.dash),I.stroke=Ut(I.stroke),I.fill=Ut(I.fill);let K,Y=[],V=[],G=!1,Z={};if(F.live){const e=v[1]?v[1].values:null;G=null!=e,K=G?e(i,1,0):{_:0};for(let e in K)Z[e]=He}if(H)if(j=Ze("table","u-legend",c),B=Ze("tbody",null,j),F.mount(i,j),G){q=Ze("thead",null,j,B);let e=Ze("tr",null,q);for(var J in Ze("th",null,e),K)Ze("th",$e,e).textContent=J}else Ye(j,"u-inline"),F.live&&Ye(j,"u-live");const Q={show:!0},X={show:!1};const ee=new Map;function te(e,t,n,r=!0){const s=ee.get(t)||{},l=L.bind[e](i,t,n,r);l&&(lt(e,t,s[e]=l),ee.set(t,s))}function ne(e,t,n){const i=ee.get(t)||{};for(let n in i)null!=e&&n!=e||(ot(n,t,i[n]),delete i[n]);null==e&&ee.delete(t)}let ie=0,re=0,se=0,le=0,oe=0,ae=0,ce=oe,ue=ae,de=se,he=le,pe=0,fe=0,ge=0,me=0;i.bbox={};let _e=!1,ve=!1,ye=!1,be=!1,xe=!1,Te=!1;function Fe(e,t,n){(n||e!=i.width||t!=i.height)&&Ue(e,t),Ln(!1),ye=!0,ve=!0,bi()}function Ue(e,t){i.width=ie=se=e,i.height=re=le=t,oe=ae=0,function(){let e=!1,t=!1,n=!1,i=!1;y.forEach((r,s)=>{if(r.show&&r._show){let{side:s,_size:l}=r,o=s%2,a=l+(null!=r.label?r.labelSize:0);a>0&&(o?(se-=a,3==s?(oe+=a,i=!0):n=!0):(le-=a,0==s?(ae+=a,e=!0):t=!0))}}),wt[0]=e,wt[1]=n,wt[2]=t,wt[3]=i,se-=zt[1]+zt[3],oe+=zt[3],le-=zt[2]+zt[0],ae+=zt[0]}(),function(){let e=oe+se,t=ae+le,n=oe,i=ae;function r(r,s){switch(r){case 1:return e+=s,e-s;case 2:return t+=s,t-s;case 3:return n-=s,n+s;case 0:return i-=s,i+s}}y.forEach((e,t)=>{if(e.show&&e._show){let t=e.side;e._pos=r(t,e._size),null!=e.label&&(e._lpos=r(t,e.labelSize))}})}();let n=i.bbox;pe=n.left=Gt(oe*Be,.5),fe=n.top=Gt(ae*Be,.5),ge=n.width=Gt(se*Be,.5),me=n.height=Gt(le*Be,.5)}const qe=3;if(i.setSize=function({width:e,height:t}){Fe(e,t)},null==L.dataIdx){let e=L.hover,n=e.skip=new Set(e.skip??[]);n.add(void 0);let i=e.prox=Ut(e.prox),r=e.bias??=0;L.dataIdx=(e,s,l,o)=>{if(0==s)return l;let a=l,c=i(e,s,l,o)??Wt,u=c>=0&&c<Wt,d=0==C.ori?se:le,h=L.left,p=t[0],f=t[s];if(n.has(f[l])){a=null;let e,t=null,i=null;if(0==r||-1==r)for(e=l;null==t&&e-- >0;)n.has(f[e])||(t=e);if(0==r||1==r)for(e=l;null==i&&e++<f.length;)n.has(f[e])||(i=e);if(null!=t||null!=i)if(u){let e=h-(null==t?-1/0:M(p[t],C,d,0)),n=(null==i?1/0:M(p[i],C,d,0))-h;e<=n?e<=c&&(a=t):n<=c&&(a=i)}else a=null==i?t:null==t?i:l-t<=i-l?t:i}else if(u){At(h-M(p[l],C,d,0))>c&&(a=null)}return a}}const Ke=e=>{L.event=e};L.idxs=W,L._lock=!1;let Qe=L.points;Qe.show=Ut(Qe.show),Qe.size=Ut(Qe.size),Qe.stroke=Ut(Qe.stroke),Qe.width=Ut(Qe.width),Qe.fill=Ut(Qe.fill);const et=i.focus=fn({},e.focus||{alpha:.3},L.focus),nt=et.prox>=0,rt=nt&&Qe.one;let st=[],ct=[],_t=[];function vt(e,t){let n=Qe.show(i,t);if(n instanceof HTMLElement)return Ye(n,"u-cursor-pt"),Ye(n,e.class),Xe(n,-10,-10,se,le),f.insertBefore(n,st[t]),n}function xt(e,t){if(1==r||t>0){let t=1==r&&b[e.scale].time,n=e.value;e.value=t?an(n)?ei(P,Xn(n,z)):n||O:n||Si,e.label=e.label||(t?"Time":"Value")}if(rt||t>0){e.width=null==e.width?1:e.width,e.paths=e.paths||cr||qt,e.fillTo=Ut(e.fillTo||Fi),e.pxAlign=+bt(e.pxAlign,g),e.pxRound=Ii(e.pxAlign),e.stroke=Ut(e.stroke||null),e.fill=Ut(e.fill||null),e._stroke=e._fill=e._paths=e._focus=null;let t=Qt((3+2*(Dt(1,e.width)||1))*1,3),n=e.points=fn({},{size:t,width:Dt(1,.2*t),stroke:e.stroke,space:2*t,paths:ur,_stroke:null,_fill:null},e.points);n.show=Ut(n.show),n.filter=Ut(n.filter),n.fill=Ut(n.fill),n.stroke=Ut(n.stroke),n.paths=Ut(n.paths),n.pxAlign=e.pxAlign}if(H){let n=function(e,t){if(0==t&&(G||!F.live||2==r))return sn;let n=[],s=Ze("tr","u-series",B,B.childNodes[t]);Ye(s,e.class),e.show||Ye(s,we);let l=Ze("th",null,s);if(I.show){let e=Je("u-marker",l);if(t>0){let n=I.width(i,t);n&&(e.style.border=n+"px "+I.dash(i,t)+" "+I.stroke(i,t)),e.style.background=I.fill(i,t)}}let o=Je($e,l);for(var a in e.label instanceof HTMLElement?o.appendChild(e.label):o.textContent=e.label,t>0&&(I.show||(o.style.color=e.width>0?I.stroke(i,t):I.fill(i,t)),te("click",l,t=>{if(L._lock)return;Ke(t);let n=v.indexOf(e);if((t.ctrlKey||t.metaKey)!=F.isolate){let e=v.some((e,t)=>t>0&&t!=n&&e.show);v.forEach((t,i)=>{i>0&&ji(i,e?i==n?Q:X:Q,!0,Nr.setSeries)})}else ji(n,{show:!e.show},!0,Nr.setSeries)},!1),nt&&te(Ne,l,t=>{L._lock||(Ke(t),ji(v.indexOf(e),Yi,!0,Nr.setSeries))},!1)),K){let e=Ze("td","u-value",s);e.textContent="--",n.push(e)}return[s,n]}(e,t);Y.splice(t,0,n[0]),V.splice(t,0,n[1]),F.values.push(null)}if(U){W.splice(t,0,null);let n=null;rt?0==t&&(n=vt(e,t)):t>0&&(n=vt(e,t)),st.splice(t,0,n),ct.splice(t,0,0),_t.splice(t,0,0)}zr("addSeries",t)}i.addSeries=function(e,t){t=t??v.length,e=1==r?hr(e,t,pi,Ti):hr(e,t,{},Mi),v.splice(t,0,e),xt(v[t],t)},i.delSeries=function(e){if(v.splice(e,1),H){F.values.splice(e,1),V.splice(e,1);let t=Y.splice(e,1)[0];ne(null,t.firstChild),t.remove()}U&&(W.splice(e,1),st.splice(e,1)[0].remove(),ct.splice(e,1),_t.splice(e,1)),zr("delSeries",e)};const wt=[!1,!1,!1,!1];function $t(e,t,n,i){let[r,s,l,o]=n,a=t%2,c=0;return 0==a&&(o||s)&&(c=0==t&&!r||2==t&&!l?Et(hi.size/3):0),1==a&&(r||l)&&(c=1==t&&!s||3==t&&!o?Et(Ai.size/2):0),c}const Ct=i.padding=(e.padding||[$t,$t,$t,$t]).map(e=>Ut(bt(e,$t))),zt=i._padding=Ct.map((e,t)=>e(i,t,wt,0));let Nt,Ft=null,It=null;const Yt=1==r?v[0].idxs:null;let Vt,Zt,Jt,tn,on,dn,hn,gn,_n,vn,yn=null,bn=!1;function xn(e,n){if(t=e??[],i.data=i._data=t,2==r){Nt=0;for(let e=1;e<v.length;e++)Nt+=t[e][0].length}else{0==t.length&&(i.data=i._data=t=[[]]),yn=t[0],Nt=yn.length;let e=t;if(2==E){e=t.slice();let n=e[0]=Array(Nt);for(let e=0;e<Nt;e++)n[e]=e}i._data=t=e}if(Ln(!0),zr("setData"),2==E&&(ye=!0),!1!==n){let e=C;e.auto(i,bn)?wn():Ui(w,e.min,e.max),be=be||L.left>=0,Te=!0,bi()}}function wn(){let e,n;bn=!0,1==r&&(Nt>0?(Ft=Yt[0]=0,It=Yt[1]=Nt-1,e=t[0][Ft],n=t[0][It],2==E?(e=Ft,n=It):e==n&&(3==E?[e,n]=ft(e,e,C.log,!1):4==E?[e,n]=gt(e,e,C.log,!1):C.time?n=e+Et(86400/_):[e,n]=yt(e,n,.1,!0))):(Ft=Yt[0]=e=null,It=Yt[1]=n=null)),Ui(w,e,n)}function $n(e,t,n,i,r,s){e??=De,n??=rn,i??="butt",r??=De,s??="round",e!=Vt&&(d.strokeStyle=Vt=e),r!=Zt&&(d.fillStyle=Zt=r),t!=Jt&&(d.lineWidth=Jt=t),s!=on&&(d.lineJoin=on=s),i!=dn&&(d.lineCap=dn=i),n!=tn&&d.setLineDash(tn=n)}function kn(e,t,n,i){t!=Zt&&(d.fillStyle=Zt=t),e!=hn&&(d.font=hn=e),n!=gn&&(d.textAlign=gn=n),i!=_n&&(d.textBaseline=_n=i)}function An(e,t,n,r,s=0){if(r.length>0&&e.auto(i,bn)&&(null==t||null==t.min)){let t=bt(Ft,0),i=bt(It,r.length-1),l=null==n.min?function(e,t,n,i=0,r=!1){let s=r?pt:ht,l=r?dt:ut;[t,n]=s(e,t,n);let o=e[t],a=e[t];if(t>-1)if(1==i)o=e[t],a=e[n];else if(-1==i)o=e[n],a=e[t];else for(let i=t;i<=n;i++){let t=e[i];l(t)&&(t<o?o=t:t>a&&(a=t))}return[o??Wt,a??-Wt]}(r,t,i,s,3==e.distr):[n.min,n.max];e.min=Tt(e.min,n.min=l[0]),e.max=Dt(e.max,n.max=l[1])}}i.setData=xn;const Cn={min:null,max:null};function En(e,t){let n=t?v[e].points:v[e];n._stroke=n.stroke(i,e),n._fill=n.fill(i,e)}function Mn(e,n){let r=n?v[e].points:v[e],{stroke:s,fill:l,clip:o,flags:a,_stroke:c=r._stroke,_fill:u=r._fill,_width:h=r.width}=r._paths;h=Qt(h*Be,3);let p=null,f=h%2/2;n&&null==u&&(u=h>0?"#fff":c);let g=1==r.pxAlign&&f>0;if(g&&d.translate(f,f),!n){let e=pe-h/2,t=fe-h/2,n=ge+h,i=me+h;p=new Path2D,p.rect(e,t,n,i)}n?zn(c,h,r.dash,r.cap,u,s,l,a,o):function(e,n,r,s,l,o,a,c,u,d,h){let p=!1;0!=u&&x.forEach((f,g)=>{if(f.series[0]==e){let e,m=v[f.series[1]],_=t[f.series[1]],y=(m._paths||nn).band;ln(y)&&(y=1==f.dir?y[0]:y[1]);let b=null;m.show&&y&&function(e,t,n){for(t=bt(t,0),n=bt(n,e.length-1);t<=n;){if(null!=e[t])return!0;t++}return!1}(_,Ft,It)?(b=f.fill(i,g)||o,e=m._paths.clip):y=null,zn(n,r,s,l,b,a,c,u,d,h,e,y),p=!0}}),p||zn(n,r,s,l,o,a,c,u,d,h)}(e,c,h,r.dash,r.cap,u,s,l,a,p,o),g&&d.translate(-f,-f)}const Tn=3;function zn(e,t,n,i,r,s,l,o,a,c,u,h){$n(e,t,n,i,r),(a||c||h)&&(d.save(),a&&d.clip(a),c&&d.clip(c)),h?(o&Tn)==Tn?(d.clip(h),u&&d.clip(u),Nn(r,l),Rn(e,s,t)):2&o?(Nn(r,l),d.clip(h),Rn(e,s,t)):1&o&&(d.save(),d.clip(h),u&&d.clip(u),Nn(r,l),d.restore(),Rn(e,s,t)):(Nn(r,l),Rn(e,s,t)),(a||c||h)&&d.restore()}function Rn(e,t,n){n>0&&(t instanceof Map?t.forEach((e,t)=>{d.strokeStyle=Vt=t,d.stroke(e)}):null!=t&&e&&d.stroke(t))}function Nn(e,t){t instanceof Map?t.forEach((e,t)=>{d.fillStyle=Zt=t,d.fill(e)}):null!=t&&e&&d.fill(t)}function On(e,t,n,i,r,s,l,o,a,c){let u=l%2/2;1==g&&d.translate(u,u),$n(o,l,a,c,o),d.beginPath();let h,p,f,m,_=r+(0==i||3==i?-s:s);0==n?(p=r,m=_):(h=r,f=_);for(let i=0;i<e.length;i++)null!=t[i]&&(0==n?h=f=e[i]:p=m=e[i],d.moveTo(h,p),d.lineTo(f,m));d.stroke(),1==g&&d.translate(-u,-u)}function Wn(e){let t=!0;return y.forEach((n,r)=>{if(!n.show)return;let s=b[n.scale];if(null==s.min)return void(n._show&&(t=!1,n._show=!1,Ln(!1)));n._show||(t=!1,n._show=!0,Ln(!1));let l=n.side,o=l%2,{min:a,max:c}=s,[u,d]=function(e,t,n,r){let s,l=y[e];if(r<=0)s=[0,0];else{let o=l._space=l.space(i,e,t,n,r);s=br(t,n,l._incrs=l.incrs(i,e,t,n,r,o),r,o)}return l._found=s}(r,a,c,0==o?se:le);if(0==d)return;let h=2==s.distr,p=n._splits=n.splits(i,r,a,c,u,d,h),f=2==s.distr?p.map(e=>yn[e]):p,g=2==s.distr?yn[p[1]]-yn[p[0]]:u,m=n._values=n.values(i,n.filter(i,f,r,d,g),r,d,g);n._rotate=2==l?n.rotate(i,m,r,d):0;let _=n._size;n._size=Mt(n.size(i,m,r,e)),null!=_&&n._size!=_&&(t=!1)}),t}function Fn(e){let t=!0;return Ct.forEach((n,r)=>{let s=n(i,r,wt,e);s!=zt[r]&&(t=!1),zt[r]=s}),t}function Ln(e){v.forEach((t,n)=>{n>0&&(t._paths=null,e&&(1==r?(t.min=null,t.max=null):t.facets.forEach(e=>{e.min=null,e.max=null})))})}let Hn,Un,In,jn,Qn,ni,ii,ri,li,oi,ai,ci,ui=!1,di=!1,vi=[];function yi(){di=!1;for(let e=0;e<vi.length;e++)zr(...vi[e]);vi.length=0}function bi(){ui||(mn(xi),ui=!0)}function xi(){if(_e&&(!function(){for(let e in b){let t=b[e];null==D[e]&&(null==t.min||null!=D[w]&&t.auto(i,bn))&&(D[e]=Cn)}for(let e in b){let t=b[e];null==D[e]&&null!=t.from&&null!=D[t.from]&&(D[e]=Cn)}null!=D[w]&&Ln(!0);let e={};for(let t in D){let n=D[t];if(null!=n){let s=e[t]=pn(b[t],un);if(null!=n.min)fn(s,n);else if(t!=w||2==r)if(0==Nt&&null==s.from){let e=s.range(i,null,null,t);s.min=e[0],s.max=e[1]}else s.min=Wt,s.max=-Wt}}if(Nt>0){v.forEach((n,s)=>{if(1==r){let r=n.scale,l=D[r];if(null==l)return;let o=e[r];if(0==s){let e=o.range(i,o.min,o.max,r);o.min=e[0],o.max=e[1],Ft=at(o.min,t[0]),It=at(o.max,t[0]),It-Ft>1&&(t[0][Ft]<o.min&&Ft++,t[0][It]>o.max&&It--),n.min=yn[Ft],n.max=yn[It]}else n.show&&n.auto&&An(o,l,n,t[s],n.sorted);n.idxs[0]=Ft,n.idxs[1]=It}else if(s>0&&n.show&&n.auto){let[i,r]=n.facets,l=i.scale,o=r.scale,[a,c]=t[s],u=e[l],d=e[o];null!=u&&An(u,D[l],i,a,i.sorted),null!=d&&An(d,D[o],r,c,r.sorted),n.min=r.min,n.max=r.max}});for(let t in e){let n=e[t],r=D[t];if(null==n.from&&(null==r||null==r.min)){let e=n.range(i,n.min==Wt?null:n.min,n.max==-Wt?null:n.max,t);n.min=e[0],n.max=e[1]}}}for(let t in e){let n=e[t];if(null!=n.from){let r=e[n.from];if(null==r.min)n.min=n.max=null;else{let e=n.range(i,r.min,r.max,t);n.min=e[0],n.max=e[1]}}}let n={},s=!1;for(let t in e){let i=e[t],r=b[t];if(r.min!=i.min||r.max!=i.max){r.min=i.min,r.max=i.max;let e=r.distr;r._min=3==e?Rt(r.min):4==e?Ot(r.min,r.asinh):100==e?r.fwd(r.min):r.min,r._max=3==e?Rt(r.max):4==e?Ot(r.max,r.asinh):100==e?r.fwd(r.max):r.max,n[t]=s=!0}}if(s){v.forEach((e,t)=>{2==r?t>0&&n.y&&(e._paths=null):n[e.scale]&&(e._paths=null)});for(let e in n)ye=!0,zr("setScale",e);U&&L.left>=0&&(be=Te=!0)}for(let e in D)D[e]=null}(),_e=!1),ye&&(!function(){let e=!1,t=0;for(;!e;){t++;let n=Wn(t),r=Fn(t);e=t==qe||n&&r,e||(Ue(i.width,i.height),ve=!0)}}(),ye=!1),ve){if(Ge(p,Ee,oe),Ge(p,Ae,ae),Ge(p,ke,se),Ge(p,Se,le),Ge(f,Ee,oe),Ge(f,Ae,ae),Ge(f,ke,se),Ge(f,Se,le),Ge(h,ke,ie),Ge(h,Se,re),u.width=Et(ie*Be),u.height=Et(re*Be),y.forEach(({_el:e,_show:t,_size:n,_pos:i,side:r})=>{if(null!=e)if(t){let t=r%2==1;Ge(e,t?"left":"top",i-(3===r||0===r?n:0)),Ge(e,t?"width":"height",n),Ge(e,t?"top":"left",t?ae:oe),Ge(e,t?"height":"width",t?le:se),Ve(e,we)}else Ye(e,we)}),Vt=Zt=Jt=on=dn=hn=gn=_n=tn=null,vn=1,ir(!0),oe!=ce||ae!=ue||se!=de||le!=he){Ln(!1);let e=se/de,t=le/he;if(U&&!be&&L.left>=0){L.left*=e,L.top*=t,In&&Xe(In,Et(L.left),0,se,le),jn&&Xe(jn,0,Et(L.top),se,le);for(let n=0;n<st.length;n++){let i=st[n];null!=i&&(ct[n]*=e,_t[n]*=t,Xe(i,Mt(ct[n]),Mt(_t[n]),se,le))}}if(Wi.show&&!xe&&Wi.left>=0&&Wi.width>0){Wi.left*=e,Wi.width*=e,Wi.top*=t,Wi.height*=t;for(let e in lr)Ge(Li,e,Wi[e])}ce=oe,ue=ae,de=se,he=le}zr("setSize"),ve=!1}ie>0&&re>0&&(d.clearRect(0,0,u.width,u.height),zr("drawClear"),k.forEach(e=>e()),zr("draw")),Wi.show&&xe&&(Hi(Wi),xe=!1),U&&be&&(tr(null,!0,!1),be=!1),F.show&&F.live&&Te&&(Xi(),Te=!1),a||(a=!0,i.status=1,zr("ready")),bn=!1,ui=!1}function wi(e,n){let r=b[e];if(null==r.from){if(0==Nt){let t=r.range(i,n.min,n.max,e);n.min=t[0],n.max=t[1]}if(n.min>n.max){let e=n.min;n.min=n.max,n.max=e}if(Nt>1&&null!=n.min&&null!=n.max&&n.max-n.min<1e-16)return;e==w&&2==r.distr&&Nt>0&&(n.min=at(n.min,t[0]),n.max=at(n.max,t[0]),n.min==n.max&&n.max++),D[e]=n,_e=!0,bi()}}i.batch=function(e,t=!1){ui=!0,di=t,e(i),xi(),t&&vi.length>0&&queueMicrotask(yi)},i.redraw=(e,t)=>{ye=t||!1,!1!==e?Ui(w,C.min,C.max):bi()},i.setScale=wi;let Ci=!1;const Ei=L.drag;let Ri=Ei.x,Oi=Ei.y;U&&(L.x&&(Hn=Je("u-cursor-x",f)),L.y&&(Un=Je("u-cursor-y",f)),0==C.ori?(In=Hn,jn=Un):(In=Un,jn=Hn),ai=L.left,ci=L.top);const Wi=i.select=fn({show:!0,over:!0,left:0,width:0,top:0,height:0},e.select),Li=Wi.show?Je("u-select",Wi.over?f:p):null;function Hi(e,t){if(Wi.show){for(let t in e)Wi[t]=e[t],t in lr&&Ge(Li,t,e[t]);!1!==t&&zr("setSelect")}}function Ui(e,t,n){wi(e,{min:t,max:n})}function ji(e,t,n,s){null!=t.focus&&function(e){if(e!=Ki){let t=null==e,n=1!=et.alpha;v.forEach((i,s)=>{if(1==r||s>0){let r=t||0==s||s==e;i._focus=t?null:r,n&&function(e,t){v[e].alpha=t,U&&null!=st[e]&&(st[e].style.opacity=t);H&&Y[e]&&(Y[e].style.opacity=t)}(s,r?1:et.alpha)}}),Ki=e,n&&bi()}}(e),null!=t.show&&v.forEach((n,i)=>{i>0&&(e==i||null==e)&&(n.show=t.show,function(e){if(v[e].show)H&&Ve(Y[e],we);else if(H&&Ye(Y[e],we),U){let t=rt?st[0]:st[e];null!=t&&Xe(t,-10,-10,se,le)}}(i),2==r?(Ui(n.facets[0].scale,null,null),Ui(n.facets[1].scale,null,null)):Ui(n.scale,null,null),bi())}),!1!==n&&zr("setSeries",e,t),s&&Fr("setSeries",i,e,t)}let qi,Bi,Ki;i.setSelect=Hi,i.setSeries=ji,i.addBand=function(e,t){e.fill=Ut(e.fill||null),e.dir=bt(e.dir,-1),t=t??x.length,x.splice(t,0,e)},i.setBand=function(e,t){fn(x[e],t)},i.delBand=function(e){null==e?x.length=0:x.splice(e,1)};const Yi={focus:!0};function Vi(e,t,n){let i=b[t];n&&(e=e/Be-(1==i.ori?ae:oe));let r=se;1==i.ori&&(r=le,e=r-e),-1==i.dir&&(e=r-e);let s=i._min,l=s+(i._max-s)*(e/r),o=i.distr;return 3==o?Pt(10,l):4==o?((e,t=1)=>kt.sinh(e)*t)(l,i.asinh):100==o?i.bwd(l):l}function Gi(e,t){Ge(Li,Ee,Wi.left=e),Ge(Li,ke,Wi.width=t)}function Zi(e,t){Ge(Li,Ae,Wi.top=e),Ge(Li,Se,Wi.height=t)}H&&nt&&te(Oe,j,e=>{L._lock||(Ke(e),null!=Ki&&ji(null,Yi,!0,Nr.setSeries))}),i.valToIdx=e=>at(e,t[0]),i.posToIdx=function(e,n){return at(Vi(e,w,n),t[0],Ft,It)},i.posToVal=Vi,i.valToPos=(e,t,n)=>0==b[t].ori?s(e,b[t],n?ge:se,n?pe:0):l(e,b[t],n?me:le,n?fe:0),i.setCursor=(e,t,n)=>{ai=e.left,ci=e.top,tr(null,t,n)};let Ji=0==C.ori?Gi:Zi,Qi=1==C.ori?Gi:Zi;function Xi(e,t){if(null!=e&&(e.idxs?e.idxs.forEach((e,t)=>{W[t]=e}):(e=>void 0===e)(e.idx)||W.fill(e.idx),F.idx=W[0]),H&&F.live){for(let e=0;e<v.length;e++)(e>0||1==r&&!G)&&er(e,W[e]);!function(){if(H&&F.live)for(let e=2==r?1:0;e<v.length;e++){if(0==e&&G)continue;let t=F.values[e],n=0;for(let i in t)V[e][n++].firstChild.nodeValue=t[i]}}()}Te=!1,!1!==t&&zr("setLegend")}function er(e,n){let r,s=v[e],l=0==e&&2==E?yn:t[e];G?r=s.values(i,e,n)??Z:(r=s.value(i,null==n?null:l[n],e,n),r=null==r?Z:{_:r}),F.values[e]=r}function tr(e,n,s){let l;li=ai,oi=ci,[ai,ci]=L.move(i,ai,ci),L.left=ai,L.top=ci,U&&(In&&Xe(In,Et(ai),0,se,le),jn&&Xe(jn,0,Et(ci),se,le));let o=Ft>It;qi=Wt,Bi=null;let a=0==C.ori?se:le,c=1==C.ori?se:le;if(ai<0||0==Nt||o){l=L.idx=null;for(let e=0;e<v.length;e++){let t=st[e];null!=t&&Xe(t,-10,-10,se,le)}nt&&ji(null,Yi,!0,null==e&&Nr.setSeries),F.live&&(W.fill(l),Te=!0)}else{let e,n,s;1==r&&(e=0==C.ori?ai:ci,n=Vi(e,w),l=L.idx=at(n,t[0],Ft,It),s=M(t[0][l],C,a,0));let o=-10,u=-10,d=0,h=0,p=!0,f="",g="";for(let e=2==r?1:0;e<v.length;e++){let m=v[e],_=W[e],y=null==_?null:1==r?t[e][_]:t[e][1][_],x=L.dataIdx(i,e,l,n),w=null==x?null:1==r?t[e][x]:t[e][1][x];if(Te=Te||w!=y||x!=_,W[e]=x,e>0&&m.show){let n=null==x?-10:x==l?s:M(1==r?t[0][x]:t[e][0][x],C,a,0),_=null==w?-10:T(w,1==r?b[m.scale]:b[m.facets[1].scale],c,0);if(nt&&null!=w){let t=1==C.ori?ai:ci,n=At(et.dist(i,e,x,_,t));if(n<qi){let i=et.bias;if(0!=i){let r=Vi(t,m.scale),s=r>=0?1:-1;s==(w>=0?1:-1)&&(1==s?1==i?w>=r:w<=r:1==i?w<=r:w>=r)&&(qi=n,Bi=e)}else qi=n,Bi=e}}if(Te||rt){let t,r;0==C.ori?(t=n,r=_):(t=_,r=n);let s,l,a,c,m,v,y=!0,b=Qe.bbox;if(null!=b){y=!1;let t=b(i,e);a=t.left,c=t.top,s=t.width,l=t.height}else a=t,c=r,s=l=Qe.size(i,e);if(v=Qe.fill(i,e),m=Qe.stroke(i,e),rt)e==Bi&&qi<=et.prox&&(o=a,u=c,d=s,h=l,p=y,f=v,g=m);else{let t=st[e];null!=t&&(ct[e]=a,_t[e]=c,it(t,s,l,y),tt(t,v,m),Xe(t,Mt(a),Mt(c),se,le))}}}}if(rt){let e=et.prox;if(Te||(null==Ki?qi<=e:qi>e||Bi!=Ki)){let e=st[0];null!=e&&(ct[0]=o,_t[0]=u,it(e,d,h,p),tt(e,f,g),Xe(e,Mt(o),Mt(u),se,le))}}}if(Wi.show&&Ci)if(null!=e){let[t,n]=Nr.scales,[i,r]=Nr.match,[s,l]=e.cursor.sync.scales,o=e.cursor.drag;if(Ri=o._x,Oi=o._y,Ri||Oi){let o,u,d,h,p,{left:f,top:g,width:m,height:_}=e.select,v=e.scales[s].ori,y=e.posToVal,x=null!=t&&i(t,s),w=null!=n&&r(n,l);x&&Ri?(0==v?(o=f,u=m):(o=g,u=_),d=b[t],h=M(y(o,s),d,a,0),p=M(y(o+u,s),d,a,0),Ji(Tt(h,p),At(p-h))):Ji(0,a),w&&Oi?(1==v?(o=f,u=m):(o=g,u=_),d=b[n],h=T(y(o,l),d,c,0),p=T(y(o+u,l),d,c,0),Qi(Tt(h,p),At(p-h))):Qi(0,c)}else ar()}else{let e=At(li-Qn),t=At(oi-ni);if(1==C.ori){let n=e;e=t,t=n}Ri=Ei.x&&e>=Ei.dist,Oi=Ei.y&&t>=Ei.dist;let n,i,r=Ei.uni;null!=r?Ri&&Oi&&(Ri=e>=r,Oi=t>=r,Ri||Oi||(t>e?Oi=!0:Ri=!0)):Ei.x&&Ei.y&&(Ri||Oi)&&(Ri=Oi=!0),Ri&&(0==C.ori?(n=ii,i=ai):(n=ri,i=ci),Ji(Tt(n,i),At(i-n)),Oi||Qi(0,c)),Oi&&(1==C.ori?(n=ii,i=ai):(n=ri,i=ci),Qi(Tt(n,i),At(i-n)),Ri||Ji(0,a)),Ri||Oi||(Ji(0,0),Qi(0,0))}if(Ei._x=Ri,Ei._y=Oi,null==e){if(s){if(null!=Or){let[e,t]=Nr.scales;Nr.values[0]=null!=e?Vi(0==C.ori?ai:ci,e):null,Nr.values[1]=null!=t?Vi(1==C.ori?ai:ci,t):null}Fr(Pe,i,ai,ci,se,le,l)}if(nt){let e=s&&Nr.setSeries,t=et.prox;null==Ki?qi<=t&&ji(Bi,Yi,!0,e):qi>t?ji(null,Yi,!0,e):Bi!=Ki&&ji(Bi,Yi,!0,e)}}Te&&(F.idx=l,Xi()),!1!==n&&zr("setCursor")}i.setLegend=Xi;let nr=null;function ir(e=!1){e?nr=null:(nr=f.getBoundingClientRect(),zr("syncRect",nr))}function rr(e,t,n,i,r,s,l){L._lock||Ci&&null!=e&&0==e.movementX&&0==e.movementY||(sr(e,t,n,i,r,s,l,!1,null!=e),null!=e?tr(null,!0,!0):tr(t,!0,!1))}function sr(e,t,n,r,s,l,a,c,u){if(null==nr&&ir(!1),Ke(e),null!=e)n=e.clientX-nr.left,r=e.clientY-nr.top;else{if(n<0||r<0)return ai=-10,void(ci=-10);let[e,i]=Nr.scales,a=t.cursor.sync,[c,u]=a.values,[d,h]=a.scales,[p,f]=Nr.match,g=t.axes[0].side%2==1,m=0==C.ori?se:le,_=1==C.ori?se:le,v=g?l:s,y=g?s:l,x=g?r:n,w=g?n:r;if(n=null!=d?p(e,d)?o(c,b[e],m,0):-10:m*(x/v),r=null!=h?f(i,h)?o(u,b[i],_,0):-10:_*(w/y),1==C.ori){let e=n;n=r,r=e}}!u||null!=t&&t.cursor.event.type!=Pe||((n<=1||n>=se-1)&&(n=Gt(n,se)),(r<=1||r>=le-1)&&(r=Gt(r,le))),c?(Qn=n,ni=r,[ii,ri]=L.move(i,n,r)):(ai=n,ci=r)}Object.defineProperty(i,"rect",{get:()=>(null==nr&&ir(!1),nr)});const lr={width:0,height:0,left:0,top:0};function ar(){Hi(lr,!1)}let $r,kr,Sr,Ar;function Cr(e,t,n,r,s,l,o){Ci=!0,Ri=Oi=Ei._x=Ei._y=!1,sr(e,t,n,r,s,l,0,!0,!1),null!=e&&(te(Re,Ie,Er,!1),Fr(ze,i,ii,ri,se,le,null));let{left:a,top:c,width:u,height:d}=Wi;$r=a,kr=c,Sr=u,Ar=d}function Er(e,t,n,r,s,l,o){Ci=Ei._x=Ei._y=!1,sr(e,t,n,r,s,l,0,!1,!0);let{left:a,top:c,width:u,height:d}=Wi,h=u>0||d>0,p=$r!=a||kr!=c||Sr!=u||Ar!=d;if(h&&p&&Hi(Wi),Ei.setScale&&h&&p){let e=a,t=u,n=c,i=d;if(1==C.ori&&(e=c,t=d,n=a,i=u),Ri&&Ui(w,Vi(e,w),Vi(e+t,w)),Oi)for(let e in b){let t=b[e];e!=w&&null==t.from&&t.min!=Wt&&Ui(e,Vi(n+i,e),Vi(n,e))}ar()}else L.lock&&(L._lock=!L._lock,tr(t,!0,null!=e));null!=e&&(ne(Re,Ie),Fr(Re,i,ai,ci,se,le,null))}function Mr(e,t,n,r,s,l,o){L._lock||(Ke(e),wn(),ar(),null!=e&&Fr(We,i,ai,ci,se,le,null))}function Tr(){y.forEach(wr),Fe(i.width,i.height,!0)}lt(Le,je,Tr);const Dr={};Dr.mousedown=Cr,Dr.mousemove=rr,Dr.mouseup=Er,Dr.dblclick=Mr,Dr.setSeries=(e,t,n,r)=>{-1!=(n=(0,Nr.match[2])(i,t,n))&&ji(n,r,!0,!1)},U&&(te(ze,f,Cr),te(Pe,f,rr),te(Ne,f,e=>{Ke(e),ir(!1)}),te(Oe,f,function(e,t,n,i,r,s,l){if(L._lock)return;Ke(e);let o=Ci;if(Ci){let e,t,n=!0,i=!0,r=10;0==C.ori?(e=Ri,t=Oi):(e=Oi,t=Ri),e&&t&&(n=ai<=r||ai>=se-r,i=ci<=r||ci>=le-r),e&&n&&(ai=ai<ii?0:se),t&&i&&(ci=ci<ri?0:le),tr(null,!0,!0),Ci=!1}ai=-10,ci=-10,W.fill(null),tr(null,!0,!0),o&&(Ci=o)}),te(We,f,Mr),or.add(i),i.syncRect=ir);const Pr=i.hooks=e.hooks||{};function zr(e,t,n){di?vi.push([e,t,n]):e in Pr&&Pr[e].forEach(e=>{e.call(null,i,t,n)})}(e.plugins||[]).forEach(e=>{for(let t in e.hooks)Pr[t]=(Pr[t]||[]).concat(e.hooks[t])});const Rr=(e,t,n)=>n,Nr=fn({key:null,setSeries:!1,filters:{pub:Bt,sub:Bt},scales:[w,v[1]?v[1].scale:null],match:[Kt,Kt,Rr],values:[null,null]},L.sync);2==Nr.match.length&&Nr.match.push(Rr),L.sync=Nr;const Or=Nr.key,Wr=Ni(Or);function Fr(e,t,n,i,r,s,l){Nr.filters.pub(e,t,n,i,r,s,l)&&Wr.pub(e,t,n,i,r,s,l)}function Lr(){zr("init",e,t),xn(t||e.data,!1),D[w]?wi(w,D[w]):wn(),xe=Wi.show&&(Wi.width>0||Wi.height>0),be=Te=!0,Fe(e.width,e.height)}return Wr.sub(i),i.pub=function(e,t,n,i,r,s,l){Nr.filters.sub(e,t,n,i,r,s,l)&&Dr[e](null,t,n,i,r,s,l)},i.destroy=function(){Wr.unsub(i),or.delete(i),ee.clear(),ot(Le,je,Tr),c.remove(),j?.remove(),zr("destroy")},v.forEach(xt),y.forEach(function(e,t){if(e._show=e.show,e.show){let n=e.side%2,r=b[e.scale];null==r&&(e.scale=n?v[1].scale:w,r=b[e.scale]);let s=r.time;e.size=Ut(e.size),e.space=Ut(e.space),e.rotate=Ut(e.rotate),ln(e.incrs)&&e.incrs.forEach(e=>{!Xt.has(e)&&Xt.set(e,en(e))}),e.incrs=Ut(e.incrs||(2==r.distr?Dn:s?1==_?qn:Yn:Pn)),e.splits=Ut(e.splits||(s&&1==r.distr?R:3==r.distr?mi:4==r.distr?_i:gi)),e.stroke=Ut(e.stroke),e.grid.stroke=Ut(e.grid.stroke),e.ticks.stroke=Ut(e.ticks.stroke),e.border.stroke=Ut(e.border.stroke);let l=e.values;e.values=ln(l)&&!ln(l[0])?Ut(l):s?ln(l)?Jn(P,Zn(l,z)):an(l)?function(e,t){let n=Sn(t);return(t,i,r,s,l)=>i.map(t=>n(e(t)))}(P,l):l||N:l||fi,e.filter=Ut(e.filter||(r.distr>=3&&10==r.log?$i:3==r.distr&&2==r.log?ki:jt)),e.font=xr(e.font),e.labelFont=xr(e.labelFont),e._size=e.size(i,null,t,0),e._space=e._rotate=e._incrs=e._found=e._splits=e._values=null,e._size>0&&(wt[t]=!0,e._el=Je("u-axis",h))}}),n?n instanceof HTMLElement?(n.appendChild(c),Lr()):n(i,Lr):Lr(),i}$r.assign=fn,$r.fmtNum=$t,$r.rangeNum=yt,$r.rangeLog=ft,$r.rangeAsinh=gt,$r.orient=Oi,$r.pxRatio=Be,$r.join=function(e,t){if(function(e){let t=e[0][0],n=t.length;for(let i=1;i<e.length;i++){let r=e[i][0];if(r.length!=n)return!1;if(r!=t)for(let e=0;e<n;e++)if(r[e]!=t[e])return!1}return!0}(e)){let t=e[0].slice();for(let n=1;n<e.length;n++)t.push(...e[n].slice(1));return function(e,t=100){const n=e.length;if(n<=1)return!0;let i=0,r=n-1;for(;i<=r&&null==e[i];)i++;for(;r>=i&&null==e[r];)r--;if(r<=i)return!0;const s=Dt(1,Ct((r-i+1)/t));for(let t=e[i],n=i+s;n<=r;n+=s){const i=e[n];if(null!=i){if(i<=t)return!1;t=i}}return!0}(t[0])||(t=function(e){let t=e[0],n=t.length,i=Array(n);for(let e=0;e<i.length;e++)i[e]=e;i.sort((e,n)=>t[e]-t[n]);let r=[];for(let t=0;t<e.length;t++){let s=e[t],l=Array(n);for(let e=0;e<n;e++)l[e]=s[i[e]];r.push(l)}return r}(t)),t}let n=new Set;for(let t=0;t<e.length;t++){let i=e[t][0],r=i.length;for(let e=0;e<r;e++)n.add(i[e])}let i=[Array.from(n).sort((e,t)=>e-t)],r=i[0].length,s=new Map;for(let e=0;e<r;e++)s.set(i[0][e],e);for(let n=0;n<e.length;n++){let l=e[n],o=l[0];for(let e=1;e<l.length;e++){let a=l[e],c=Array(r).fill(void 0),u=t?t[n][e]:1,d=[];for(let e=0;e<a.length;e++){let t=a[e],n=s.get(o[e]);null===t?0!=u&&(c[n]=t,2==u&&d.push(n)):c[n]=t}gn(c,d,r),i.push(c)}}return i},$r.fmtDate=Sn,$r.tzDate=function(e,t){let n;return"UTC"==t||"Etc/UTC"==t?n=new Date(+e+6e4*e.getTimezoneOffset()):t==An?n=e:(n=new Date(e.toLocaleString("en-US",{timeZone:t})),n.setMilliseconds(e.getMilliseconds())),n},$r.sync=Ni;{$r.addGap=function(e,t,n){let i=e[e.length-1];i&&i[0]==t?i[1]=n:e.push([t,n])},$r.clipGaps=Hi;let e=$r.paths={points:er};e.linear=rr,e.stepped=function(e){const t=bt(e.align,1),n=bt(e.ascDesc,!1),i=bt(e.alignGaps,0),r=bt(e.extend,!1);return(e,s,l,o)=>Oi(e,s,(a,c,u,d,h,p,f,g,m,_,v)=>{[l,o]=ht(u,l,o);let y=a.pxRound,{left:b,width:x}=e.bbox,w=e=>y(p(e,d,_,g)),$=e=>y(f(e,h,v,m)),k=0==d.ori?Ki:Yi;const S={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:1},A=S.stroke,C=d.dir*(0==d.ori?1:-1);let E=$(u[1==C?l:o]),M=w(c[1==C?l:o]),T=M,D=M;r&&-1==t&&(D=b,k(A,D,E)),k(A,M,E);for(let e=1==C?l:o;e>=l&&e<=o;e+=C){let n=u[e];if(null==n)continue;let i=w(c[e]),r=$(n);1==t?k(A,i,E):k(A,T,r),k(A,i,r),E=r,T=i}let P=T;r&&1==t&&(P=b+x,k(A,P,E));let[z,R]=Wi(e,s);if(null!=a.fill||0!=z){let t=S.fill=new Path2D(A),n=$(a.fillTo(e,s,a.min,a.max,z));k(t,P,n),k(t,D,n)}if(!a.spanGaps){let r=[];r.push(...Ui(c,u,l,o,C,w,i));let h=a.width*Be/2,p=n||1==t?h:-h,f=n||-1==t?-h:h;r.forEach(e=>{e[0]+=p,e[1]+=f}),S.gaps=r=a.gaps(e,s,l,o,r),S.clip=Hi(r,d.ori,g,m,_,v)}return 0!=R&&(S.band=2==R?[Li(e,s,l,o,A,-1),Li(e,s,l,o,A,1)]:Li(e,s,l,o,A,R)),S})},e.bars=function(e){const t=bt((e=e||nn).size,[.6,Wt,1]),n=e.align||0,i=e.gap||0;let r=e.radius;r=null==r?[0,0]:"number"==typeof r?[r,0]:r;const s=Ut(r),l=1-t[0],o=bt(t[1],Wt),a=bt(t[2],1),c=bt(e.disp,nn),u=bt(e.each,e=>{}),{fill:d,stroke:h}=c;return(e,t,r,p)=>Oi(e,t,(f,g,m,_,v,y,b,x,w,$,k)=>{let S,A,C=f.pxRound,E=n,M=i*Be,T=o*Be,D=a*Be;0==_.ori?[S,A]=s(e,t):[A,S]=s(e,t);const P=_.dir*(0==_.ori?1:-1);let z,R,N,O=0==_.ori?Vi:Gi,W=0==_.ori?u:(e,t,n,i,r,s,l)=>{u(e,t,n,r,i,l,s)},F=bt(e.bands,rn).find(e=>e.series[0]==t),L=null!=F?F.dir:0,H=f.fillTo(e,t,f.min,f.max,L),U=C(b(H,v,k,w)),I=$,j=C(f.width*Be),q=!1,B=null,K=null,Y=null,V=null;null==d||0!=j&&null==h||(q=!0,B=d.values(e,t,r,p),K=new Map,new Set(B).forEach(e=>{null!=e&&K.set(e,new Path2D)}),j>0&&(Y=h.values(e,t,r,p),V=new Map,new Set(Y).forEach(e=>{null!=e&&V.set(e,new Path2D)})));let{x0:G,size:Z}=c;if(null!=G&&null!=Z){E=1,g=G.values(e,t,r,p),2==G.unit&&(g=g.map(t=>e.posToVal(x+t*$,_.key,!0)));let n=Z.values(e,t,r,p);R=2==Z.unit?n[0]*$:y(n[0],_,$,x)-y(0,_,$,x),I=sr(g,m,y,_,$,x,I),N=I-R+M}else I=sr(g,m,y,_,$,x,I),N=I*l+M,R=I-N;N<1&&(N=0),j>=R/2&&(j=0),N<5&&(C=It);let J=N>0;R=C(Lt(I-N-(J?j:0),D,T)),z=(0==E?R/2:E==P?0:R)-E*P*((0==E?M/2:0)+(J?j/2:0));const Q={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},X=q?null:new Path2D;let ee=null;if(null!=F)ee=e.data[F.series[1]];else{let{y0:n,y1:i}=c;null!=n&&null!=i&&(m=i.values(e,t,r,p),ee=n.values(e,t,r,p))}let te=S*R,ne=A*R;for(let n=1==P?r:p;n>=r&&n<=p;n+=P){let i=m[n];if(null==i)continue;if(null!=ee){let e=ee[n]??0;if(i-e==0)continue;U=b(e,v,k,w)}let r=y(2!=_.distr||null!=c?g[n]:n,_,$,x),s=b(bt(i,H),v,k,w),l=C(r-z),o=C(Dt(s,U)),a=C(Tt(s,U)),u=o-a;if(null!=i){let r=i<0?ne:te,s=i<0?te:ne;q?(j>0&&null!=Y[n]&&O(V.get(Y[n]),l,a+Ct(j/2),R,Dt(0,u-j),r,s),null!=B[n]&&O(K.get(B[n]),l,a+Ct(j/2),R,Dt(0,u-j),r,s)):O(X,l,a+Ct(j/2),R,Dt(0,u-j),r,s),W(e,t,n,l-j/2,a,R+j,u)}}return j>0?Q.stroke=q?V:X:q||(Q._fill=0==f.width?f._fill:f._stroke??f._fill,Q.width=0),Q.fill=q?K:X,Q})},e.spline=function(e){return function(e,t){const n=bt(t?.alignGaps,0);return(t,i,r,s)=>Oi(t,i,(l,o,a,c,u,d,h,p,f,g,m)=>{[r,s]=ht(a,r,s);let _,v,y,b=l.pxRound,x=e=>b(d(e,c,g,p)),w=e=>b(h(e,u,m,f));0==c.ori?(_=qi,y=Ki,v=Qi):(_=Bi,y=Yi,v=Xi);const $=c.dir*(0==c.ori?1:-1);let k=x(o[1==$?r:s]),S=k,A=[],C=[];for(let e=1==$?r:s;e>=r&&e<=s;e+=$)if(null!=a[e]){let t=x(o[e]);A.push(S=t),C.push(w(a[e]))}const E={stroke:e(A,C,_,y,v,b),fill:null,clip:null,band:null,gaps:null,flags:1},M=E.stroke;let[T,D]=Wi(t,i);if(null!=l.fill||0!=T){let e=E.fill=new Path2D(M),n=w(l.fillTo(t,i,l.min,l.max,T));y(e,S,n),y(e,k,n)}if(!l.spanGaps){let e=[];e.push(...Ui(o,a,r,s,$,x,n)),E.gaps=e=l.gaps(t,i,r,s,e),E.clip=Hi(e,c.ori,p,f,g,m)}return 0!=D&&(E.band=2==D?[Li(t,i,r,s,M,-1),Li(t,i,r,s,M,1)]:Li(t,i,r,s,M,D)),E})}(lr,e)}}function kr(e,t){return e?{show:!1}:{show:!0,size:4,width:0,stroke:t,fill:t}}const Sr=["#2196f3","#ff9800","#4caf50","#e91e63","#9c27b0","#00bcd4","#ffc107","#795548","#607d8b","#8bc34a"];function Ar(e,t){return t??Sr[e%Sr.length]}let Cr=class extends ue{constructor(){super(...arguments),this.series=[],this.config={},this._builtFor=""}static{this.styles=[l('.uplot,.uplot *,.uplot :after,.uplot :before{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5;width:min-content}.u-title{font-size:18px;font-weight:700;text-align:center}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;height:100%;position:relative;width:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{display:inline-block;vertical-align:middle}.u-legend .u-marker{background-clip:padding-box!important;height:1em;margin-right:4px;width:1em}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:rgba(0,0,0,.07)}.u-cursor-x,.u-cursor-y,.u-select{pointer-events:none;position:absolute}.u-cursor-x,.u-cursor-y{left:0;top:0;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{border-right:1px dashed #607d8b;height:100%}.u-hz .u-cursor-y,.u-vt .u-cursor-x{border-bottom:1px dashed #607d8b;width:100%}.u-cursor-pt{background-clip:padding-box!important;border:0 solid;border-radius:50%;left:0;pointer-events:none;position:absolute;top:0;will-change:transform}.u-axis.u-off,.u-cursor-pt.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-select.u-off{display:none}'),o`
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
    `]}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=void 0,this._plot?.destroy(),this._plot=void 0,this._builtFor=""}firstUpdated(){const e=this._holder();e&&(this._observer=new ResizeObserver(()=>this._sync()),this._observer.observe(e),this._sync())}updated(e){this._sync()}_holder(){return this.renderRoot.querySelector(".holder")}_shape(){return JSON.stringify([this.series.map((e,t)=>[e.label,Ar(t,e.color),!0===e.line,e.width??0,e.axis??"left"]),!0===this.config.timeAxis,!0===this.config.yFromZero])}_hasRightAxis(){return this.series.some(e=>"right"===e.axis)}_sync(){const e=this._holder();if(!e||0===this.series.length)return;const t=Math.floor(e.clientWidth);if(t<1)return;const n=this.config.height??220,{xs:i,ys:r}=function(e){const t=e.map(e=>{const t=new Map;for(const[n,i]of e.points)Number.isFinite(n)&&Number.isFinite(i)&&t.set(n,i);return t}),n=new Set;for(const e of t)for(const t of e.keys())n.add(t);const i=[...n].sort((e,t)=>e-t),r=t.map(e=>i.map(t=>e.has(t)?e.get(t):null));return{xs:i,ys:r}}(this.series),s=[i,...r];if(this._plot&&this._builtFor===this._shape())return this._plot.setSize({width:t,height:n}),void this._plot.setData(s);this._plot?.destroy(),this._plot=new $r(this._options(t,n),s,e),this._builtFor=this._shape()}_themeColor(e,t){return getComputedStyle(this).getPropertyValue(e).trim()||t}_options(e,t){const n=this._themeColor("--divider-color","rgba(127,127,127,0.3)"),i=this._themeColor("--secondary-text-color","#888"),r=this.config;return{width:e,height:t,...r.timeAxis?{}:{mode:1},tzDate:void 0,legend:{show:!1},cursor:{drag:{x:!1,y:!1,setScale:!1},points:{size:6}},scales:{x:{time:!0===r.timeAxis},y:{range:r.yFromZero?(e,t,n)=>[0,n]:void 0},...this._hasRightAxis()?{y2:{}}:{}},axes:[{stroke:i,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:r.xLabel,labelFont:"11px system-ui, sans-serif",labelSize:r.xLabel?18:0},{stroke:i,grid:{stroke:n,width:1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:r.yLabel,labelFont:"11px system-ui, sans-serif",labelSize:r.yLabel?18:0,size:48},...this._hasRightAxis()?[{scale:"y2",side:1,stroke:i,grid:{show:!1},ticks:{stroke:n},font:"11px system-ui, sans-serif",label:r.y2Label,labelFont:"11px system-ui, sans-serif",labelSize:r.y2Label?18:0,size:48}]:[]],series:[{},...this.series.map((e,t)=>{const n=Ar(t,e.color);return{label:e.label,stroke:n,width:e.width??2,..."right"===e.axis?{scale:"y2"}:{},...e.line?{}:{paths:()=>null},points:kr(!0===e.line,n)}})],hooks:{setCursor:[e=>this._updateReadout(e)]}}}_updateReadout(e){const t=this.renderRoot.querySelector(".readout");if(!t)return;const n=e.cursor.idx;if(null==n)return void(t.textContent="");const i=this.config,r=e.data[0][n],s=document.createElement("span");s.textContent=i.xFormat&&"number"==typeof r?i.xFormat(r):String(r??""),t.replaceChildren(s),this.series.forEach((r,s)=>{const l=e.data[s+1]?.[n];if(null==l)return;const o=document.createElement("span"),a=document.createElement("span");a.className="swatch",a.style.background=Ar(s,r.color),o.append(a);const c="right"===r.axis?i.y2Format??i.yFormat:i.yFormat,u=c?c(Number(l)):String(l);o.append(document.createTextNode(`${r.label} ${u}`)),t.append(o)})}render(){return 0===this.series.length||this.series.every(e=>0===e.points.length)?B`<div class="empty">No data in this range.</div>`:B`
      <div class="holder"></div>
      <div class="readout"></div>
    `}};function Er(e){if(null==e||""===e)return null;const t="number"==typeof e?e:Number(e);return Number.isFinite(t)?t:null}function Mr(e,t,n=""){const i=Er(e);return null===i?"—":`${i.toFixed(t)}${n}`}function Tr(e){const t=Er(e);if(null===t)return"—";const n=Math.abs(Math.round(t)),i=Math.floor(n/86400),r=Math.floor(n%86400/3600),s=Math.floor(n%3600/60);return i>0?`${i}d ${r}h`:r>0?`${r}h ${s}m`:`${s}m`}function Dr(e){const t=Er(e);return null===t?"—":`${Math.round(100*t)}%`}function Pr(e){const t=Er(e);return null===t?"—":`${t}%`}function zr(e,t){if(!e)return"—";const n=String(e),i=n.includes("T")?n:n.replace(" ","T"),r=new Date(i.endsWith("Z")?i:`${i}Z`);return Number.isNaN(r.getTime())?n:r.toLocaleString(t||void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}function Rr(e,t,n){const i=Er(e);if(null===i)return n;let r=n;for(const[e,n]of t)i>=e&&(r=n);return r}function Nr(e,t){const n=[];for(const i of e){const e=Er(i[t]);null!==e&&n.push(e)}return n}function Or(e,t){return Nr(e,t).reduce((e,t)=>e+t,0)}function Wr(e){const{label:t,value:n,max:i,text:r,color:s,markers:l=[]}=e,o=null!==n&&i>0?Math.max(0,Math.min(100,n/i*100)):0;return B`
    <div class="bar-row">
      <div class="bar-head">
        <span class="bar-label">${t}</span>
        <span class="bar-value">${r}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style=${`width:${o}%;background:${s??"var(--primary-color)"}`}></div>
        ${l.filter(e=>i>0&&e.at>=0&&e.at<=i).map(e=>B`
              <div
                class="bar-marker"
                style=${`left:${e.at/i*100}%`}
                title=${e.label??String(e.at)}
              ></div>
            `)}
      </div>
    </div>
  `}function Fr(e,t){const n=e.filter(e=>Number.isFinite(e.value)&&e.value>0),i=n.reduce((e,t)=>e+t.value,0);return i<=0?null:B`
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
  `}e([ge({attribute:!1})],Cr.prototype,"series",void 0),e([ge({attribute:!1})],Cr.prototype,"config",void 0),Cr=e([he("teslamate-chart")],Cr);const Ur=[[0,"var(--error-color)"],[80,"var(--warning-color)"],[90,"var(--success-color)"]];let Ir=class extends be{queryId(){return"battery_health"}secondaryQueryIds(){return["battery_capacity_history"]}queryOptions(){const e={};return void 0!==this._config.custom_kwh_new&&(e.custom_kwh_new=this._config.custom_kwh_new),void 0!==this._config.custom_max_range&&(e.custom_max_range=this._config.custom_max_range),{...this._config,vars:e}}showRangePicker(){return!1}defaultTitle(){return"Battery Health"}_summary(e){const t=this._config.length_unit??"km",n=Er(e.current_capacity),i=Er(e.max_capacity);return Hr([{label:"Usable now (kWh)",value:Mr(n,1)},{label:"When new (kWh)",value:Mr(i,1)},{label:`Range (${t})`,value:Mr(e.current_range,0)},{label:`Wh/${t}`,value:Mr(e.efficiency,0)}])}_panels(e){const t=this._config.length_unit??"km",n=Er(e.health_pct),i=Er(e.degradation_pct),r=Er(e.current_capacity),s=Er(e.current_soc),l=Er(e.stored_energy),o=Er(e.soc_lower),a=Er(e.soc_upper),c=Er(e.max_capacity),u=Er(e.max_range),d=Rr(n,Ur,"var(--primary-color)");return B`
      <div class="panels">
        ${function(e){const{label:t,value:n,text:i,color:r}=e,s=null===n?0:Math.max(0,Math.min(100,n)),l="M 10 52 A 42 42 0 0 1 94 52";return B`
    <div class="gauge">
      <svg viewBox="0 0 104 64" class="gauge-svg" role="img" aria-label=${`${t}: ${i}`}>
        ${K`
          <path d=${l} class="gauge-track" pathLength="100" />
          <path d=${l} pathLength="100" stroke=${r} class="gauge-fill"
                stroke-dasharray=${`${s} 100`} />
        `}
      </svg>
      <div class="gauge-value" style=${`color:${r}`}>${i}</div>
      <div class="gauge-label">${t}</div>
    </div>
  `}({label:null===i?"Battery health":`${i.toFixed(1)}% degradation`,value:n,text:null===n?"—":`${n.toFixed(1)}%`,color:d})}
        <div class="bars">
          ${Wr({label:"Charge level",value:s,max:100,text:null===s?"—":`${s}%`,color:"var(--primary-color)",markers:[...null===o?[]:[{at:o,label:`${o}% daily minimum`}],...null===a?[]:[{at:a,label:`${a}% recommended limit`}]]})}
          ${Wr({label:"Stored energy",value:l,max:r??100,text:`${Mr(l,1)} / ${Mr(r,1)} kWh`,color:"var(--success-color)"})}
          ${Wr({label:"Range against best recorded",value:Er(e.current_range),max:u??100,text:`${Mr(e.current_range,0)} / ${Mr(u,0)} ${t}`,color:"var(--info-color, #3d71d7)"})}
        </div>
      </div>
      ${Fr([{label:"Remaining",value:null!==r&&null!==c?r:0,color:"var(--success-color)"},{label:"Lost to degradation",value:null!==r&&null!==c?Math.max(0,c-r):0,color:"var(--error-color)"}],"kWh")}
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
      `}};Ir=e([he("teslamate-battery-health-card")],Ir);const jr={AC:"var(--success-color)",DC:"var(--warning-color)"};let qr=class extends be{queryId(){return"charges"}secondaryQueryIds(){return["incomplete_charges"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration_min=this._config.min_duration_minutes),{...this._config,days:this.days(),charge_type:this._config.charge_type??"",vars:e}}defaultTitle(){return"Charges"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",n=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>zr(e.start_date,this._hass?.locale?.language)},{label:"Location",align:"left",render:e=>e.address??"—"},{label:"Type",align:"center",render:e=>e.charge_type??"—",color:e=>jr[String(e.charge_type)]},{label:"Duration",render:e=>Mr(e.duration_min,0," min")},{label:"SoC",render:e=>`${Pr(e.start_battery_level)} → ${Pr(e.end_battery_level)}`},{label:"Added",render:e=>Mr(e.charge_energy_added,1," kWh")},{label:"Range",render:t=>Mr(t[this.unitKey("range_added")],0,` ${e}`)},{label:"Ø Power",render:e=>Mr(e.charge_energy_added_per_hour,1," kW")},{label:"Ø Rate",render:e=>Mr(e[this.unitKey("range_added_per_hour")],0,` ${t}`),optional:!0},{label:"Cost",render:e=>null===e.cost?"free":Mr(e.cost,2)},{label:"Cost/kWh",render:e=>null===e.cost_per_kwh?"—":Mr(e.cost_per_kwh,3),optional:!0},{label:"Used",render:e=>Mr(e.charge_energy_used,1," kWh"),optional:!0},{label:"Efficiency",render:e=>Dr(e.charging_efficiency),optional:!0},{label:"Temp",render:e=>Mr(e[this.tempKey("outside_temp_avg")],0,`°${n}`),optional:!0}]}_summary(){const e=Or(this._rows,"charge_energy_added"),t=Or(this._rows,"charge_energy_used"),n=Or(this._rows,"cost"),i=function(e,t){const n=Nr(e,t);return 0===n.length?0:n.reduce((e,t)=>e+t,0)/n.length}(this._rows,"duration_min"),r=this._rows.filter(e=>Number(e.cost)>0).length;return Hr([{label:"Energy added (kWh)",value:e.toFixed(0)},{label:"Energy used (kWh)",value:t.toFixed(0)},{label:0===r?"Cost (all free)":"Cost",value:n.toFixed(2)},{label:"Ø Duration",value:`${Math.round(i)} min`}])}_renderIncomplete(){const e=this._extra.incomplete_charges??[];if(0===e.length)return null;const t=[{label:"Started",align:"left",render:e=>zr(e.start_date,this._hass?.locale?.language)},{label:"Added",render:e=>Mr(e.charge_energy_added,1," kWh")},{label:"Duration",render:e=>Mr(e.duration_min,0," min")}];return B`
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
    `}};qr=e([he("teslamate-charges-card")],qr);let Br=class extends be{queryId(){return"charging_totals"}secondaryQueryIds(){return["charging_cost_per_distance","charge_delta","dc_charging_curve","top_stations_energy","top_stations_cost"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration=this._config.min_duration_minutes),{...this._config,days:this.days(),geofence_ids:this._config.geofence_ids??null,vars:e}}defaultTitle(){return"Charging Stats"}_currency(e,t=2){const n=Er(e);if(null===n)return"—";return`${this._config.currency??""}${n.toFixed(t)}`}_summary(e){const t=this._config.length_unit??"km",n=Er(this._extra.charging_cost_per_distance?.[0]?.cost_mileage),i=Er(e.paid_count)??0,r=Er(e.charge_count)??0;return Hr([{label:"Charges",value:r.toFixed(0)},{label:"Energy added (kWh)",value:Mr(e.energy_added,0)},{label:0===i?"Cost (all free)":`Cost (${i} of ${r} paid)`,value:this._currency(e.total_cost)},{label:`Cost per 100 ${t}`,value:null===n?"—":this._currency(n)}])}_rates(e){const t=Er(e.cost_per_kwh),n=Er(e.cost_per_kwh_ac),i=Er(e.cost_per_kwh_dc),r=Er(e.charging_efficiency),s=Er(e.suc_cost);return Hr([{label:"Ø Cost/kWh",value:null===t?"—":this._currency(t,3)},{label:"AC",value:null===n?"—":this._currency(n,3)},{label:"DC",value:null===i?"—":this._currency(i,3)},{label:0===s?"Supercharging (free)":"Supercharging",value:this._currency(s)},{label:"Charging efficiency",value:null===r?"—":`${(100*r).toFixed(1)}%`}])}_acdc(e){const t=Fr([{label:"AC",value:Er(e.energy_ac)??0,color:"var(--success-color)"},{label:"DC",value:Er(e.energy_dc)??0,color:"var(--warning-color)"}],"kWh");return t?B`<div class="subheader">Energy used by charger type</div>
      ${t}`:null}_deltaChart(){const e=this._extra.charge_delta??[];if(0===e.length)return null;const t=e=>{const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`).getTime()/1e3},n=[],i=[];for(const r of e){const e=t(r.time),s=Er(r.start_soc),l=Er(r.end_soc);Number.isFinite(e)&&(null!==s&&n.push([e,s]),null!==l&&i.push([e,l]))}if(0===n.length&&0===i.length)return null;return B`
      <div class="subheader">Charge delta</div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${[{label:"Start SOC",points:n,color:"#ff9800",line:!0},{label:"End SOC",points:i,color:"#4caf50",line:!0}]}
          .config=${{height:this._config.chart_height??200,timeAxis:!0,yLabel:"SOC %",yFormat:e=>`${Math.round(e)}%`,xFormat:e=>new Date(1e3*e).toLocaleDateString(this._hass?.locale?.language)}}
        ></teslamate-chart>
      </div>
    `}_curveChart(){const e=this._extra.dc_charging_curve??[];if(0===e.length)return null;const t=xe(e,e=>"median"===e.series?"__median":String(e.label??e.session_id??"session"),e=>Number(e.soc),e=>Number(e.power)),n=t.get("__median");t.delete("__median");const i=this._config.max_curve_sessions??6,r=[...t.entries()].slice(-i),s=r.map(([e,t])=>({label:e,points:t,line:!0,width:1}));if(n?.length&&s.push({label:"Median",points:n,color:"var(--primary-text-color)",line:!0,width:3}),0===s.length)return null;const l=t.size-r.length;return B`
      <div class="subheader">
        DC charging curve${l>0?B` <span class="hint">(newest ${r.length} of ${t.size})</span>`:null}
      </div>
      <div class="chart-wrap">
        <teslamate-chart
          .series=${s}
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
      `}};Br=e([he("teslamate-charging-stats-card")],Br);let Kr;let Yr=class extends ue{constructor(){super(...arguments),this.rows=[],this.color="#2196f3",this.height=400,this._available=null}static{this.styles=o`
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
  `}connectedCallback(){super.connectedCallback(),null===this._available&&async function(){return!!customElements.get("ha-map")||(Kr??=(async()=>{try{const e=await(window.loadCardHelpers?.());if(!e)return!1;await e.createCardElement({type:"map",show_all:!0})}catch{}return!!customElements.get("ha-map")||Promise.race([customElements.whenDefined("ha-map").then(()=>!0),new Promise(e=>setTimeout(()=>e(!1),1e4))])})(),Kr)}().then(e=>this._available=e)}updated(e){(e.has("rows")||e.has("color")||e.has("_available"))&&this._drawRoute()}_date(e){const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`)}_points(){const e=[];for(const t of this.rows){const n=Number(t.latitude),i=Number(t.longitude),r=this._date(t.time);Number.isFinite(n)&&Number.isFinite(i)&&!Number.isNaN(r.getTime())&&e.push({point:[n,i],timestamp:r})}return e}get _map(){return this.renderRoot?.querySelector("ha-map")??null}async _ready(e){const t=Date.now()+5e3;for(;(!e.Leaflet||!e._loaded)&&Date.now()<t;)await new Promise(e=>setTimeout(e,50));return e.Leaflet}async _drawRoute(){const e=this._map;if(!e)return;const t=this._points();if(t.length<2)return;const n=t.map(e=>e.point),i=await this._ready(e);if(!i)return void(e.paths=[{points:t,color:this.color,name:this.label,fullDatetime:!0}]);const r=t[0],s=t[t.length-1],l=(e,t,n)=>i.circleMarker(e.point,{radius:6,color:"#fff",weight:2,fillColor:t,fillOpacity:1,interactive:!0}).bindTooltip(`${n}<br>${zr(e.timestamp.toISOString(),this.language)}`,{direction:"top"});e.layers=[i.polyline(n,{color:this.color,weight:4,opacity:.9,lineJoin:"round",lineCap:"round",interactive:!1}),l(r,"#4caf50","Start"),l(s,"#f44336","End")],await e.updateComplete,e.fitBounds(n,{pad:.08,zoom:17})}render(){return this._points().length<2?V:null===this._available?B`<div class="state" style="height:${this.height}px">Loading map…</div>`:this._available?B`<ha-map style="height:${this.height}px" .themeMode=${"auto"}></ha-map>`:B`<div class="state">Map unavailable — Home Assistant's map component did not load.</div>`}};e([ge({attribute:!1})],Yr.prototype,"rows",void 0),e([ge({attribute:!1})],Yr.prototype,"color",void 0),e([ge({attribute:!1})],Yr.prototype,"label",void 0),e([ge({attribute:!1})],Yr.prototype,"language",void 0),e([ge({type:Number})],Yr.prototype,"height",void 0),e([me()],Yr.prototype,"_available",void 0),Yr=e([he("teslamate-map")],Yr);let Vr=class extends be{constructor(){super(...arguments),this._route=[],this._routeLoading=!1,this._routeToken=0}queryId(){return"drives"}secondaryQueryIds(){return["incomplete_drives"]}queryOptions(){const e={};return void 0!==this._config.min_distance&&(e.min_dist=this._config.min_distance),void 0!==this._config.min_speed&&(e.min_speed=this._config.min_speed),this._config.efficiency_mode&&(e.efficiency=this._config.efficiency_mode),{...this._config,days:this.days(),vars:e}}defaultTitle(){return"Drives"}pageSize(){return this._config.page_size??25}onRangeChanged(){this._selected=void 0,this._route=[],this._routeToken+=1}async _selectDrive(e){const t=Number(e.drive_id);if(!Number.isFinite(t))return;if(this._selected&&Number(this._selected.drive_id)===t)return this._selected=void 0,this._route=[],void(this._routeToken+=1);const n=++this._routeToken;this._selected=e,this._route=[],this._routeLoading=!0;try{const e=await ye(this._hass,"drive_route",{...this.queryOptions(),vars:{drive_id:t}});if(n!==this._routeToken)return;this._route=e}catch{n===this._routeToken&&(this._route=[])}finally{n===this._routeToken&&(this._routeLoading=!1)}}_renderRoute(){if(!this._selected)return null;const e=this._config.length_unit??"km",t=this._selected,n=[`${t.start_address??"—"} → ${t.end_address??"—"}`,Mr(t[this.unitKey("distance")],1,` ${e}`),Mr(t.duration_min,0," min")].join(" · ");return B`
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
    `}};e([me()],Vr.prototype,"_selected",void 0),e([me()],Vr.prototype,"_route",void 0),e([me()],Vr.prototype,"_routeLoading",void 0),Vr=e([he("teslamate-drives-card")],Vr);const Gr=["day","week","month","year"];function Zr(e){return"string"==typeof e&&Gr.includes(e)}const Jr=[[0,"var(--warning-color)"],[.65,"var(--primary-text-color)"],[.99,"var(--success-color)"]];let Qr=class extends be{queryId(){return"statistics"}queryOptions(){return{...this._config,days:this.days(),period:this.period(),vars:{high_precision:this._config.high_precision?1:0}}}setConfig(e){this._period=void 0,super.setConfig(e)}defaultTitle(){return"Statistics"}defaultDays(){return 3650}pageSize(){return this._config.page_size??25}period(){return this._period??this._config.period??"month"}_onPeriodChange(e){const t=e.target.value;t!==this.period()&&(this._period=t,this._page=0,this.refresh())}renderRangePicker(){const e=this.period(),t=function(e,t){const n=(e??Gr).filter(Zr),i=new Set([...n,t]);return Gr.filter(e=>i.has(e))}(this._config.periods,e);return t.length<2?null:B`
      <select
        class="range"
        aria-label="Rollup period"
        .value=${e}
        @change=${e=>this._onPeriodChange(e)}
      >
        ${t.map(t=>{return B`<option value=${t} ?selected=${t===e}>${n=t,`Per ${n}`}</option>`;var n})}
      </select>
    `}_currency(e,t=2){const n=Er(e);return null===n?"—":`${this._config.currency??""}${n.toFixed(t)}`}_columns(){const e=this._config.length_unit??"km",t=this._config.temp_unit??"C";return[{label:"Period",align:"left",render:e=>String(e.display??"—").trim()},{label:"Time driven",render:e=>Tr(e.sum_duration_h)},{label:"Distance",render:t=>Mr(t[this.unitKey("sum_distance")],0,` ${e}`)},{label:"Ø Temp",render:e=>Mr(e[this.tempKey("avg_outside_temp")],0,`°${t}`),optional:!0},{label:"Drives",render:e=>Mr(e.cnt,0)},{label:"Efficiency",render:e=>Dr(e.efficiency),color:e=>Rr(e.efficiency,Jr,"var(--primary-text-color)"),title:()=>"Distance driven against range consumed"},{label:"Energy used",render:e=>Mr(e.sum_energy_used_kwh,1," kWh")},{label:"Ø Energy / charge",render:e=>Mr(e.avg_energy_charged_kwh,1," kWh"),optional:!0},{label:"Cost",render:e=>this._currency(e.cost_charges)},{label:"Charges",render:e=>Mr(e.cnt_charges,0)},{label:"Ø Cost / kWh",render:e=>this._currency(e.avg_cost_kwh,3),optional:!0},{label:`Ø Cost / 100 ${e}`,render:e=>this._currency(e[this.unitKey("avg_cost")]),optional:!0},{label:"Ø Consumption",render:t=>Mr(t[this.unitKey("consumption_gross")],0,` Wh/${e}`),title:()=>"Gross: includes range lost while parked"},{label:"Ø Net",render:t=>Mr(t[this.unitKey("consumption_net")],0,` Wh/${e}`),title:()=>"Net: the drives alone, excluding standby losses",optional:!0},{label:"Overhead",render:e=>Dr(e[this.unitKey("overhead_pct")]),title:()=>"Share of consumption that was not spent driving",optional:!0},{label:"Data",align:"center",render:e=>e.is_incomplete?"⁉️":"🆗",title:e=>e.is_incomplete?"Some drive or charge in or before this period has no recorded end, so the figures understate it":"Every drive and charge in this period was logged completely"}]}renderContent(){if(0===this._rows.length)return B`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No drives or charges recorded in this window.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:n}=this.paginate(this._rows),i=this._rows.reduce((e,t)=>e+(Er(t.cnt)??0),0),r=`${this._rows.length} ${1===this._rows.length?"period":"periods"} · ${i} drives`;return B`
      <ha-card>
        ${this.renderHeader(r)} ${Lr(this._columns(),e)} ${this.renderPager(t,n)}
      </ha-card>
    `}};e([me()],Qr.prototype,"_period",void 0),Qr=e([he("teslamate-statistics-card")],Qr);const Xr="#2196f3",es="var(--success-color)",ts="var(--warning-color)";let ns=class extends be{queryId(){return"trip_summary"}secondaryQueryIds(){return["trip_energy","trip_battery","trip_elevation","trip_route","drives","charges"]}queryOptions(){return{...this._config,days:this.days(),vars:{}}}defaultDays(){return 3}defaultRanges(){return[3,7,30]}defaultTitle(){return"Trip"}pageSize(){return this._config.page_size??10}_currency(e,t=2){const n=Er(e);return null===n?"—":`${this._config.currency??""}${n.toFixed(t)}`}_summary(e){const t=this._config.length_unit??"km",n=this._extra.trip_energy?.[0]??{},i="mi"===t?"mph":"km/h";return B`
      ${Hr([{label:`Distance (${t})`,value:Mr(e.distance,0)},{label:"Driving time",value:Tr(e.driving_seconds)},{label:`Ø Speed (${i})`,value:Mr(e.avg_speed_driving,0)},{label:"Energy used (kWh)",value:Mr(n.energy_consumed,0)}])}
      ${Hr([{label:`Wh/${t}`,value:Mr(n.consumption,0)},{label:`Ø incl. charging (${i})`,value:Mr(e.avg_speed_with_charging,0)},{label:0===(Er(e.paid_count)??0)?"Cost (all free)":"Cost",value:this._currency(e.total_cost)},{label:`Cost per 100 ${t}`,value:this._currency(n.cost_per_distance)}])}
    `}_timeSpent(e){const t=Fr([{label:"Driving",value:(Er(e.driving_seconds)??0)/3600,color:Xr},{label:"Charging AC",value:(Er(e.charging_ac_seconds)??0)/3600,color:es},{label:"Charging DC",value:(Er(e.charging_dc_seconds)??0)/3600,color:ts}],"h");return t?B`<div class="subheader">Time spent</div>
      ${t}`:null}_energyAdded(e){const t=Fr([{label:"AC",value:Er(e.energy_added_ac)??0,color:es},{label:"DC",value:Er(e.energy_added_dc)??0,color:ts}],"kWh");return t?B`<div class="subheader">Energy added</div>
      ${t}`:null}_epoch(e){const t=String(e??""),n=t.includes("T")?t:t.replace(" ","T");return new Date(n.endsWith("Z")?n:`${n}Z`).getTime()/1e3}_route(){const e=this._extra.trip_route??[];return 0===e.length?null:B`
      <teslamate-map
        .rows=${e}
        .color=${Xr}
        .label=${"Trip"}
        .language=${this._hass?.locale?.language}
        .height=${this._config.map_height??420}
      ></teslamate-map>
    `}_batteryChart(){const e=this._extra.trip_battery??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=[],i=[];for(const t of e){const e=this._epoch(t.time);if(!Number.isFinite(e))continue;const r=Er(t.battery_level),s=Er(t.range);null!==r&&n.push([e,r]),null!==s&&i.push([e,s])}if(0===n.length&&0===i.length)return null;return B`
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
    `}_drives(){const e=this._extra.drives??[];if(0===e.length)return null;const t=this._config.length_unit??"km",n=this._hass?.locale?.language,i=[{label:"Start",align:"left",render:e=>zr(e.start_date,n)},{label:"From",align:"left",render:e=>e.start_address??"—"},{label:"To",align:"left",render:e=>e.end_address??"—"},{label:"Duration",render:e=>Mr(e.duration_min,0," min")},{label:"Distance",render:e=>Mr(e[this.unitKey("distance")],1,` ${t}`)},{label:"SoC",render:e=>`${Mr(e.start_battery_level,0)}% → ${Mr(e.end_battery_level,0)}%`},{label:`Wh/${t}`,render:e=>Mr(e[this.unitKey("consumption_kwh")],0),optional:!0}],{visible:r,page:s,pages:l}=this.paginate(e);return B`
      <div class="subheader">Drives (${e.length})</div>
      ${Lr(i,r)} ${this.renderPager(s,l)}
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
      `}};ns=e([he("teslamate-trip-card")],ns);const is=[[0,"#FF7383"],[.3,"#FFB357"],[.85,"#56A64B"]],rs=[[0,"rgb(133, 142, 133)"],[43200,"#56A64B"]];let ss=class extends be{queryId(){return"vampire_drain"}queryOptions(){return{...this._config,days:this.days(),vars:{duration:this._config.min_duration_hours??6}}}defaultTitle(){return"Vampire Drain"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t=this._hass?.locale?.language;return[{label:"Start",align:"left",render:e=>zr(e.start_date,t)},{label:"End",align:"left",render:e=>zr(e.end_date,t)},{label:"Period",render:e=>Tr(e.duration),color:e=>Rr(e.duration,rs,"inherit")},{label:"Standby",render:e=>Dr(e.standby),color:e=>Rr(e.standby,is,"inherit")},{label:"SoC",render:e=>Pr(e.soc_diff),optional:!0},{label:"",align:"center",render:e=>1===Er(e.has_reduced_range)?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>1===Er(e.has_reduced_range)?"Reduced range: part of the pack was unavailable, so range loss cannot be estimated":void 0},{label:"Range loss",render:t=>Mr(t[this.unitKey("range_diff")],2,` ${e}`)},{label:"Energy",render:e=>Mr(e.consumption,2," kWh"),optional:!0},{label:"Ø Power",render:e=>Mr(e.avg_power,0," W"),optional:!0},{label:"Ø Loss / h",render:t=>Mr(t[this.unitKey("range_lost_per_hour")],2,` ${e}`)}]}renderContent(){if(0===this._rows.length)return B`
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
    `}};ss=e([he("teslamate-vampire-drain-card")],ss);const ls=new URL(import.meta.url).searchParams.get("v")??"dev",os="https://github.com/johnbr/ha-teslamate-cards";window.customCards=window.customCards??[],window.customCards.push({type:"teslamate-drives-card",name:"TeslaMate Drives",description:"Every drive: route, distance, duration and energy.",preview:!1,documentationURL:os},{type:"teslamate-charges-card",name:"TeslaMate Charges",description:"Every charging session: energy, range gained, rate and cost.",preview:!1,documentationURL:os},{type:"teslamate-vampire-drain-card",name:"TeslaMate Vampire Drain",description:"Standby battery losses between drives and charges.",preview:!1,documentationURL:os},{type:"teslamate-battery-health-card",name:"TeslaMate Battery Health",description:"Usable capacity, degradation and range, with capacity by odometer.",preview:!1,documentationURL:os},{type:"teslamate-charging-stats-card",name:"TeslaMate Charging Stats",description:"Charging totals, cost per kWh, AC/DC split and the DC charging curve.",preview:!1,documentationURL:os},{type:"teslamate-trip-card",name:"TeslaMate Trip",description:"A past journey: distance, time split, energy, cost, battery and elevation.",preview:!1,documentationURL:os},{type:"teslamate-statistics-card",name:"TeslaMate Statistics",description:"Distance, energy, cost and consumption rolled up per day, week, month or year.",preview:!1,documentationURL:os}),console.info(`%c TESLAMATE-CARDS %c ${ls} `,"color:#fff;background:#2b3038;font-weight:700","color:#2b3038;background:#ff9d4d;font-weight:700");
