function e(e,t,r,s){var i,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(n<3?i(o):n>3?i(t,r,o):i(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,r=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const r=void 0!==t&&1===t.length;r&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&i.set(t,e))}return e}toString(){return this.cssText}};const o=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:c,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,g=_?_.emptyScript:"",f=p.reactiveElementPolyfillSupport,m=(e,t)=>e,$={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},y=(e,t)=>!a(e,t),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(e,r,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){const{get:s,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);i?.call(this,t),this.requestUpdate(e,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...h(e),...c(e)];for(const r of t)this.createProperty(r,e[r])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,r]of t)this.elementProperties.set(e,r)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const r=this._$Eu(e,t);void 0!==r&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(r)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const r of s){const s=document.createElement("style"),i=t.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=r.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){const r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(void 0!==s&&!0===r.reflect){const i=(void 0!==r.converter?.toAttribute?r.converter:$).toAttribute(t,r.type);this._$Em=e,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){const r=this.constructor,s=r._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=r.getPropertyOptions(s),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:$;this._$Em=s;const n=i.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,r,s=!1,i){if(void 0!==e){const n=this.constructor;if(!1===s&&(i=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??y)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==i||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,r]of e){const{wrapped:e}=r,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,r,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[m("elementProperties")]=new Map,b[m("finalized")]=new Map,f?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=e=>e,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,M=document,T=()=>M.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,H="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,z=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,W=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...r)=>({_$litType$:e,strings:t,values:r}))(1),q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),K=new WeakMap,F=M.createTreeWalker(M,129);function V(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Q=(e,t)=>{const r=e.length-1,s=[];let i,n=2===t?"<svg>":3===t?"<math>":"",o=D;for(let t=0;t<r;t++){const r=e[t];let a,l,d=-1,h=0;for(;h<r.length&&(o.lastIndex=h,l=o.exec(r),null!==l);)h=o.lastIndex,o===D?"!--"===l[1]?o=N:void 0!==l[1]?o=R:void 0!==l[2]?(j.test(l[2])&&(i=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=i??D,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?W:I):o===W||o===I?o=z:o===N||o===R?o=D:(o=z,i=void 0);const c=o===z&&e[t+1].startsWith("/>")?" ":"";n+=o===D?r+P:d>=0?(s.push(a),r.slice(0,d)+E+r.slice(d)+C+c):r+C+(-2===d?t:c)}return[V(e,n+(e[r]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let i=0,n=0;const o=e.length-1,a=this.parts,[l,d]=Q(e,t);if(this.el=Z.createElement(l,r),F.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=F.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(E)){const t=d[n++],r=s.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:o[2],strings:r,ctor:"."===o[1]?ee:"?"===o[1]?te:"@"===o[1]?re:Y}),s.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:i}),s.removeAttribute(e));if(j.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=x?x.emptyScript:"";for(let r=0;r<t;r++)s.append(e[r],T()),F.nextNode(),a.push({type:2,index:++i});s.append(e[t],T())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)a.push({type:7,index:i}),e+=C.length-1}i++}}static createElement(e,t){const r=M.createElement("template");return r.innerHTML=e,r}}function J(e,t,r=e,s){if(t===q)return t;let i=void 0!==s?r._$Co?.[s]:r._$Cl;const n=O(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),void 0===n?i=void 0:(i=new n(e),i._$AT(e,r,s)),void 0!==s?(r._$Co??=[])[s]=i:r._$Cl=i),void 0!==i&&(t=J(e,i._$AS(e,t.values),i,s)),t}class G{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,s=(e?.creationScope??M).importNode(t,!0);F.currentNode=s;let i=F.nextNode(),n=0,o=0,a=r[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new X(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new se(i,this,e)),this._$AV.push(t),a=r[++o]}n!==a?.index&&(i=F.nextNode(),n++)}return F.currentNode=M,s}p(e){let t=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),O(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Z.createElement(V(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new G(s,this),r=e.u(this.options);e.p(t),this.T(r),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new Z(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,s=0;for(const i of e)s===t.length?t.push(r=new X(this.O(T()),this.O(T()),this,this.options)):r=t[s],r._$AI(i),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,i){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=B}_$AI(e,t=this,r,s){const i=this.strings;let n=!1;if(void 0===i)e=J(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==q,n&&(this._$AH=e);else{const s=e;let o,a;for(e=i[0],o=0;o<i.length-1;o++)a=J(this,s[r+o],t,o),a===q&&(a=this._$AH[o]),n||=!O(a)||a!==this._$AH[o],a===B?e=B:e!==B&&(e+=(a??"")+i[o+1]),this._$AH[o]=a}n&&!s&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class te extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class re extends Y{constructor(e,t,r,s,i){super(e,t,r,s,i),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??B)===q)return;const r=this._$AH,s=e===B&&r!==B||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==B&&(r===B||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const ie=w.litHtmlPolyfillSupport;ie?.(Z,X),(w.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;class oe extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,r)=>{const s=r?.renderBefore??t;let i=s._$litPart$;if(void 0===i){const e=r?.renderBefore??null;s._$litPart$=i=new X(t.insertBefore(T(),e),e,void 0,r??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}oe._$litElement$=!0,oe.finalized=!0,ne.litElementHydrateSupport?.({LitElement:oe});const ae=ne.litElementPolyfillSupport;ae?.({LitElement:oe}),(ne.litElementVersions??=[]).push("4.2.2");const le=e=>(t,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},he=(e=de,t,r)=>{const{kind:s,metadata:i}=r;let n=globalThis.litPropertyMetadata.get(i);if(void 0===n&&globalThis.litPropertyMetadata.set(i,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(r.name,e),"accessor"===s){const{name:s}=r;return{set(r){const i=t.get.call(this);t.set.call(this,r),this.requestUpdate(s,i,e,!0,r)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=r;return function(r){const i=this[s];t.call(this,r),this.requestUpdate(s,i,e,!0,r)}}throw Error("Unsupported decorator location: "+s)};function ce(e){return function(e){return(t,r)=>"object"==typeof r?he(e,t,r):((e,t,r)=>{const s=t.hasOwnProperty(r);return t.constructor.createProperty(r,e),s?Object.getOwnPropertyDescriptor(t,r):void 0})(e,t,r)}({...e,state:!0,attribute:!1})}const ue=((e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,r,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new n(r,e,s)})`
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
`;async function pe(e,t,r){const s=r.days??90,i=new Date,n=new Date(i.getTime()-864e5*s);return(await e.callWS({type:"teslamate_cards/query",query_id:t,car_id:r.car_id??1,time_from:n.toISOString(),time_to:i.toISOString(),length_unit:r.length_unit??"km",temp_unit:r.temp_unit??"C",preferred_range:r.preferred_range??"rated",geofence_ids:r.geofence_ids??null,location:r.location??"",charge_type:r.charge_type??"",vars:r.vars??{}})).rows}class _e extends oe{constructor(){super(...arguments),this._rows=[],this._extra={},this._loading=!0,this._error=null,this._page=0,this._requested=!1}static{this.styles=ue}secondaryQueryIds(){return[]}set hass(e){this._hass=e,this._requested||(this._requested=!0,this.refresh())}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this._page=0,this._requested=!1,this._hass&&(this._requested=!0,this.refresh())}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>{this.refresh()},3e5)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer),this._timer=void 0}async refresh(){if(!this._hass||!this._config)return;const e=this._hass,t=this.queryOptions();try{const r=this.secondaryQueryIds(),[s,...i]=await Promise.all([pe(e,this.queryId(),t),...r.map(r=>pe(e,r,t))]);this._rows=s,this._extra=Object.fromEntries(r.map((e,t)=>[e,i[t]??[]])),this._error=null}catch(e){this._error=function(e){return String("object"==typeof e&&null!==e&&"message"in e?e.message:e)}(e)}finally{this._loading=!1}}paginate(e){const t=this.pageSize(),r=Math.max(1,Math.ceil(e.length/t)),s=Math.min(this._page,r-1);return{visible:e.slice(s*t,s*t+t),page:s,pages:r}}pageSize(){return 25}renderHeader(e){return L`
      <div class="header">
        <div class="title">${this._config.title??this.defaultTitle()}</div>
        ${e?L`<div class="subtitle">${e}</div>`:null}
      </div>
    `}renderPager(e,t){return t<=1?null:L`
      <div class="footer">
        <span>Page ${e+1} of ${t}</span>
        <span class="pager">
          <button ?disabled=${0===e} @click=${()=>this._page=e-1}>Previous</button>
          <button ?disabled=${e>=t-1} @click=${()=>this._page=e+1}>Next</button>
        </span>
      </div>
    `}defaultTitle(){return"TeslaMate"}unitKey(e){return`${e}_${this._config.length_unit??"km"}`}tempKey(e){return`${e}_${(this._config.temp_unit??"C").toLowerCase()}`}render(){return this._config?this._error?L`<ha-card>${this.renderHeader()}<div class="state error">${this._error}</div></ha-card>`:this._loading?L`<ha-card>${this.renderHeader()}<div class="state">Loading…</div></ha-card>`:this.renderContent():L``}}function ge(e){if(null==e||""===e)return null;const t="number"==typeof e?e:Number(e);return Number.isFinite(t)?t:null}function fe(e,t,r=""){const s=ge(e);return null===s?"—":`${s.toFixed(t)}${r}`}function me(e){const t=ge(e);return null===t?"—":`${Math.round(100*t)}%`}function $e(e){const t=ge(e);return null===t?"—":`${t}%`}function ye(e,t){if(!e)return"—";const r=String(e),s=r.includes("T")?r:r.replace(" ","T"),i=new Date(s.endsWith("Z")?s:`${s}Z`);return Number.isNaN(i.getTime())?r:i.toLocaleString(t||void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}function ve(e,t,r){const s=ge(e);if(null===s)return r;let i=r;for(const[e,r]of t)s>=e&&(i=r);return i}function be(e,t){const r=[];for(const s of e){const e=ge(s[t]);null!==e&&r.push(e)}return r}function we(e,t){return be(e,t).reduce((e,t)=>e+t,0)}function Ae(e,t){return L`
    <div class="scroller">
      <table>
        <thead>
          <tr>
            ${e.map(e=>L`<th class="${e.align??"right"} ${e.optional?"optional":""}">${e.label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${t.map(t=>L`
              <tr>
                ${e.map(e=>{const r=e.color?.(t),s=e.title?.(t);return L`<td
                    class="${e.align??"right"} ${e.optional?"optional":""}"
                    style=${r?`color: ${r}`:B}
                    title=${s??B}
                  >
                    ${e.render(t)}
                  </td>`})}
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `}function xe(e){return L`
    <div class="summary">
      ${e.map(e=>L`
          <div class="stat">
            <div class="stat-value">${e.value}</div>
            <div class="stat-label">${e.label}</div>
          </div>
        `)}
    </div>
  `}e([ce()],_e.prototype,"_rows",void 0),e([ce()],_e.prototype,"_extra",void 0),e([ce()],_e.prototype,"_loading",void 0),e([ce()],_e.prototype,"_error",void 0),e([ce()],_e.prototype,"_page",void 0);const Se={AC:"var(--success-color)",DC:"var(--warning-color)"};let Ee=class extends _e{queryId(){return"charges"}secondaryQueryIds(){return["incomplete_charges"]}queryOptions(){const e={};return void 0!==this._config.min_duration_minutes&&(e.min_duration_min=this._config.min_duration_minutes),{...this._config,days:this._config.days??90,charge_type:this._config.charge_type??"",vars:e}}defaultTitle(){return"Charges"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",r=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>ye(e.start_date,this._hass?.locale?.language)},{label:"Location",align:"left",render:e=>e.address??"—"},{label:"Type",align:"center",render:e=>e.charge_type??"—",color:e=>Se[String(e.charge_type)]},{label:"Duration",render:e=>fe(e.duration_min,0," min")},{label:"SoC",render:e=>`${$e(e.start_battery_level)} → ${$e(e.end_battery_level)}`},{label:"Added",render:e=>fe(e.charge_energy_added,1," kWh")},{label:"Range",render:t=>fe(t[this.unitKey("range_added")],0,` ${e}`)},{label:"Ø Power",render:e=>fe(e.charge_energy_added_per_hour,1," kW")},{label:"Ø Rate",render:e=>fe(e[this.unitKey("range_added_per_hour")],0,` ${t}`),optional:!0},{label:"Cost",render:e=>null===e.cost?"free":fe(e.cost,2)},{label:"Cost/kWh",render:e=>null===e.cost_per_kwh?"—":fe(e.cost_per_kwh,3),optional:!0},{label:"Used",render:e=>fe(e.charge_energy_used,1," kWh"),optional:!0},{label:"Efficiency",render:e=>me(e.charging_efficiency),optional:!0},{label:"Temp",render:e=>fe(e[this.tempKey("outside_temp_avg")],0,`°${r}`),optional:!0}]}_summary(){const e=we(this._rows,"charge_energy_added"),t=we(this._rows,"charge_energy_used"),r=we(this._rows,"cost"),s=function(e,t){const r=be(e,t);return 0===r.length?0:r.reduce((e,t)=>e+t,0)/r.length}(this._rows,"duration_min"),i=this._rows.filter(e=>Number(e.cost)>0).length;return xe([{label:"Energy added (kWh)",value:e.toFixed(0)},{label:"Energy used (kWh)",value:t.toFixed(0)},{label:0===i?"Cost (all free)":"Cost",value:r.toFixed(2)},{label:"Ø Duration",value:`${Math.round(s)} min`}])}_renderIncomplete(){const e=this._extra.incomplete_charges??[];if(0===e.length)return null;const t=[{label:"Started",align:"left",render:e=>ye(e.start_date,this._hass?.locale?.language)},{label:"Added",render:e=>fe(e.charge_energy_added,1," kWh")},{label:"Duration",render:e=>fe(e.duration_min,0," min")}];return L`
      <div class="subheader" title="Charging processes with no recorded end — usually a logging gap">
        Incomplete charges (${e.length})
      </div>
      ${Ae(t,e)}
    `}renderContent(){if(0===this._rows.length)return L`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No charges in the last ${this._config.days??90} days.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:r}=this.paginate(this._rows);return L`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} charges`)} ${this._summary()}
        ${Ae(this._columns(),e)} ${this.renderPager(t,r)} ${this._renderIncomplete()}
      </ha-card>
    `}};Ee=e([le("teslamate-charges-card")],Ee);let Ce=class extends _e{queryId(){return"drives"}secondaryQueryIds(){return["incomplete_drives"]}queryOptions(){const e={};return void 0!==this._config.min_distance&&(e.min_dist=this._config.min_distance),void 0!==this._config.min_speed&&(e.min_speed=this._config.min_speed),this._config.efficiency_mode&&(e.efficiency=this._config.efficiency_mode),{...this._config,days:this._config.days??90,vars:e}}defaultTitle(){return"Drives"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t="mi"===e?"mph":"km/h",r=this._config.temp_unit??"C";return[{label:"Date",align:"left",render:e=>ye(e.start_date,this._hass?.locale?.language)},{label:"Start",align:"left",render:e=>e.start_address??"—"},{label:"Destination",align:"left",render:e=>e.end_address??"—"},{label:"Duration",render:e=>fe(e.duration_min,0," min")},{label:"Distance",render:t=>fe(t[this.unitKey("distance")],1,` ${e}`)},{label:"SoC",render:e=>`${$e(e["% Start"])} → ${$e(e["% End"])}`,optional:!0},{label:"",align:"center",render:e=>e.has_reduced_range?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>e.has_reduced_range?"Reduced range: part of the pack was unavailable":void 0},{label:"Energy",render:e=>fe(e.consumption_kWh,1," kWh")},{label:`Ø Wh/${e}`,render:t=>fe(t[`consumption_kwh_${e}`],0)},{label:"Ø Speed",render:e=>fe(e[this.unitKey("speed_avg")],0,` ${t}`),optional:!0},{label:"Max Speed",render:e=>fe(e[this.unitKey("speed_max")],0,` ${t}`),optional:!0},{label:"Max Power",render:e=>fe(e.power_max,0," kW"),optional:!0},{label:"Temp",render:e=>fe(e[this.tempKey("outside_temp")],0,`°${r}`),optional:!0}]}_summary(){const e=this._config.length_unit??"km",t=we(this._rows,this.unitKey("distance")),r=we(this._rows,"consumption_kWh"),s=we(this._rows,"duration_min"),i=t>0?r/t*1e3:0;return xe([{label:`Distance (${e})`,value:t.toFixed(0)},{label:"Duration",value:`${Math.floor(s/60)}h ${Math.round(s%60)}m`},{label:"Energy (kWh)",value:r.toFixed(1)},{label:`Ø Wh/${e}`,value:i.toFixed(0)}])}_renderIncomplete(){const e=this._extra.incomplete_drives??[];if(0===e.length)return null;const t=[{label:"Drive",align:"left",render:e=>e["Drive ID"]??"—"},{label:"Started",align:"left",render:e=>ye(e.start_date,this._hass?.locale?.language)},{label:"Distance",render:e=>fe(e.distance,1)},{label:"Duration",render:e=>fe(e.duration_min,0," min")}];return L`
      <div class="subheader" title="Drives TeslaMate never saw the end of — usually a logging gap">
        Incomplete drives (${e.length})
      </div>
      ${Ae(t,e)}
    `}renderContent(){if(0===this._rows.length)return L`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">No drives in the last ${this._config.days??90} days.</div>
        </ha-card>
      `;const{visible:e,page:t,pages:r}=this.paginate(this._rows);return L`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} drives`)} ${this._summary()}
        ${Ae(this._columns(),e)} ${this.renderPager(t,r)} ${this._renderIncomplete()}
      </ha-card>
    `}};Ce=e([le("teslamate-drives-card")],Ce);const ke=[[0,"#FF7383"],[.3,"#FFB357"],[.85,"#56A64B"]],Pe=[[0,"rgb(133, 142, 133)"],[43200,"#56A64B"]];let Me=class extends _e{queryId(){return"vampire_drain"}queryOptions(){return{...this._config,days:this._config.days??90,vars:{duration:this._config.min_duration_hours??6}}}defaultTitle(){return"Vampire Drain"}pageSize(){return this._config.page_size??25}_columns(){const e=this._config.length_unit??"km",t=this._hass?.locale?.language;return[{label:"Start",align:"left",render:e=>ye(e.start_date,t)},{label:"End",align:"left",render:e=>ye(e.end_date,t)},{label:"Period",render:e=>function(e){const t=ge(e);if(null===t)return"—";const r=Math.abs(Math.round(t)),s=Math.floor(r/86400),i=Math.floor(r%86400/3600),n=Math.floor(r%3600/60);return s>0?`${s}d ${i}h`:i>0?`${i}h ${n}m`:`${n}m`}(e.duration),color:e=>ve(e.duration,Pe,"inherit")},{label:"Standby",render:e=>me(e.standby),color:e=>ve(e.standby,ke,"inherit")},{label:"SoC",render:e=>$e(e.soc_diff),optional:!0},{label:"",align:"center",render:e=>1===ge(e.has_reduced_range)?"❄":"",color:()=>"var(--info-color, #3d71d7)",title:e=>1===ge(e.has_reduced_range)?"Reduced range: part of the pack was unavailable, so range loss cannot be estimated":void 0},{label:"Range loss",render:t=>fe(t[this.unitKey("range_diff")],2,` ${e}`)},{label:"Energy",render:e=>fe(e.consumption,2," kWh"),optional:!0},{label:"Ø Power",render:e=>fe(e.avg_power,0," W"),optional:!0},{label:"Ø Loss / h",render:t=>fe(t[this.unitKey("range_lost_per_hour")],2,` ${e}`)}]}renderContent(){if(0===this._rows.length)return L`
        <ha-card>
          ${this.renderHeader()}
          <div class="state">
            No standby periods longer than ${this._config.min_duration_hours??6} h in the last
            ${this._config.days??90} days.
          </div>
        </ha-card>
      `;const{visible:e,page:t,pages:r}=this.paginate(this._rows),s=we(this._rows,"consumption");return L`
      <ha-card>
        ${this.renderHeader(`${this._rows.length} periods · ${s.toFixed(1)} kWh drained`)}
        ${Ae(this._columns(),e)} ${this.renderPager(t,r)}
      </ha-card>
    `}};Me=e([le("teslamate-vampire-drain-card")],Me);const Te="https://github.com/johnbr/ha-teslamate-cards";window.customCards=window.customCards??[],window.customCards.push({type:"teslamate-drives-card",name:"TeslaMate Drives",description:"Every drive: route, distance, duration and energy.",preview:!1,documentationURL:Te},{type:"teslamate-charges-card",name:"TeslaMate Charges",description:"Every charging session: energy, range gained, rate and cost.",preview:!1,documentationURL:Te},{type:"teslamate-vampire-drain-card",name:"TeslaMate Vampire Drain",description:"Standby battery losses between drives and charges.",preview:!1,documentationURL:Te}),console.info("%c TESLAMATE-CARDS %c 0.1.0 ","color:#fff;background:#2b3038;font-weight:700","color:#2b3038;background:#ff9d4d;font-weight:700");
