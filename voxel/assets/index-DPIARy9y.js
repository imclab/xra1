var $h=Object.defineProperty;var Zh=(e,t,n)=>t in e?$h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var hc=(e,t,n)=>Zh(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ur="170",cs={ROTATE:0,DOLLY:1,PAN:2},as={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},jh=0,uc=1,Kh=2,Fl=1,Ol=2,kn=3,ui=0,Xe=1,Tn=2,li=0,ls=1,fc=2,dc=3,pc=4,Jh=5,Si=100,Qh=101,tu=102,eu=103,nu=104,iu=200,su=201,au=202,ou=203,Ho=204,Go=205,ru=206,cu=207,lu=208,hu=209,uu=210,fu=211,du=212,pu=213,mu=214,Wo=0,Xo=1,Yo=2,ds=3,qo=4,$o=5,Zo=6,jo=7,zl=0,_u=1,gu=2,hi=0,Mu=1,xu=2,vu=3,yu=4,Su=5,bu=6,Eu=7,Bl=300,ps=301,ms=302,Ko=303,Jo=304,Xa=306,Qo=1e3,Ei=1001,tr=1002,je=1003,Tu=1004,Ks=1005,wn=1006,to=1007,Ti=1008,Xn=1009,kl=1010,Vl=1011,Bs=1012,Nr=1013,Di=1014,Rn=1015,Hs=1016,Fr=1017,Or=1018,_s=1020,Hl=35902,Gl=1021,Wl=1022,pn=1023,Xl=1024,Yl=1025,hs=1026,gs=1027,zr=1028,Br=1029,ql=1030,kr=1031,Vr=1033,wa=33776,Ra=33777,Aa=33778,Ca=33779,er=35840,nr=35841,ir=35842,sr=35843,ar=36196,or=37492,rr=37496,cr=37808,lr=37809,hr=37810,ur=37811,fr=37812,dr=37813,pr=37814,mr=37815,_r=37816,gr=37817,Mr=37818,xr=37819,vr=37820,yr=37821,Pa=36492,Sr=36494,br=36495,$l=36283,Er=36284,Tr=36285,wr=36286,wu=3200,Ru=3201,Zl=0,Au=1,ri="",en="srgb",ys="srgb-linear",Ya="linear",he="srgb",Gi=7680,mc=519,Cu=512,Pu=513,Lu=514,jl=515,Du=516,Iu=517,Uu=518,Nu=519,_c=35044,gc="300 es",Hn=2e3,Ia=2001;class Fi{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let a=0,o=s.length;a<o;a++)s[a].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],La=Math.PI/180,Rr=180/Math.PI;function Gs(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ue[e&255]+Ue[e>>8&255]+Ue[e>>16&255]+Ue[e>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[n&63|128]+Ue[n>>8&255]+"-"+Ue[n>>16&255]+Ue[n>>24&255]+Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]).toLowerCase()}function ze(e,t,n){return Math.max(t,Math.min(n,e))}function Fu(e,t){return(e%t+t)%t}function eo(e,t,n){return(1-n)*e+n*t}function As(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function He(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const Ou={DEG2RAD:La};class $t{constructor(t=0,n=0){$t.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,o=this.y-t.y;return this.x=a*i-o*s+t.x,this.y=a*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,n,i,s,a,o,r,c,l){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,o,r,c,l)}set(t,n,i,s,a,o,r,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=r,h[3]=n,h[4]=a,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,a=this.elements,o=i[0],r=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],_=i[8],g=s[0],m=s[3],p=s[6],x=s[1],M=s[4],v=s[7],T=s[2],b=s[5],E=s[8];return a[0]=o*g+r*x+c*T,a[3]=o*m+r*M+c*b,a[6]=o*p+r*v+c*E,a[1]=l*g+h*x+u*T,a[4]=l*m+h*M+u*b,a[7]=l*p+h*v+u*E,a[2]=f*g+d*x+_*T,a[5]=f*m+d*M+_*b,a[8]=f*p+d*v+_*E,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8];return n*o*h-n*r*l-i*a*h+i*r*c+s*a*l-s*o*c}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8],u=h*o-r*l,f=r*c-h*a,d=l*a-o*c,_=n*u+i*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(s*l-h*i)*g,t[2]=(r*i-s*o)*g,t[3]=f*g,t[4]=(h*n-s*c)*g,t[5]=(s*a-r*n)*g,t[6]=d*g,t[7]=(i*c-l*n)*g,t[8]=(o*n-i*a)*g,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,o,r){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*o+l*r)+o+t,-s*l,s*c,-s*(-l*o+c*r)+r+n,0,0,1),this}scale(t,n){return this.premultiply(no.makeScale(t,n)),this}rotate(t){return this.premultiply(no.makeRotation(-t)),this}translate(t,n){return this.premultiply(no.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const no=new qt;function Kl(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ua(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function zu(){const e=Ua("canvas");return e.style.display="block",e}const Mc={};function Fs(e){e in Mc||(Mc[e]=!0,console.warn(e))}function Bu(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}function ku(e){const t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Vu(e){const t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ne={enabled:!0,workingColorSpace:ys,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===he&&(e.r=Gn(e.r),e.g=Gn(e.g),e.b=Gn(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===he&&(e.r=us(e.r),e.g=us(e.g),e.b=us(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===ri?Ya:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function Gn(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function us(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}const xc=[.64,.33,.3,.6,.15,.06],vc=[.2126,.7152,.0722],yc=[.3127,.329],Sc=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bc=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ne.define({[ys]:{primaries:xc,whitePoint:yc,transfer:Ya,toXYZ:Sc,fromXYZ:bc,luminanceCoefficients:vc,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:xc,whitePoint:yc,transfer:he,toXYZ:Sc,fromXYZ:bc,luminanceCoefficients:vc,outputColorSpaceConfig:{drawingBufferColorSpace:en}}});let Wi;class Hu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Wi===void 0&&(Wi=Ua("canvas")),Wi.width=t.width,Wi.height=t.height;const i=Wi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Wi}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Ua("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let o=0;o<a.length;o++)a[o]=Gn(a[o]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Gn(n[i]/255)*255):n[i]=Gn(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Gu=0;class Jl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Gs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let o=0,r=s.length;o<r;o++)s[o].isDataTexture?a.push(io(s[o].image)):a.push(io(s[o]))}else a=io(s);i.url=a}return n||(t.images[this.uuid]=i),i}}function io(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Hu.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wu=0;class Be extends Fi{constructor(t=Be.DEFAULT_IMAGE,n=Be.DEFAULT_MAPPING,i=Ei,s=Ei,a=wn,o=Ti,r=pn,c=Xn,l=Be.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=Gs(),this.name="",this.source=new Jl(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=r,this.internalFormat=null,this.type=c,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Qo:t.x=t.x-Math.floor(t.x);break;case Ei:t.x=t.x<0?0:1;break;case tr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Qo:t.y=t.y-Math.floor(t.y);break;case Ei:t.y=t.y<0?0:1;break;case tr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Bl;Be.DEFAULT_ANISOTROPY=1;class be{constructor(t=0,n=0,i=0,s=1){be.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,a=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*s+o[12]*a,this.y=o[1]*n+o[5]*i+o[9]*s+o[13]*a,this.z=o[2]*n+o[6]*i+o[10]*s+o[14]*a,this.w=o[3]*n+o[7]*i+o[11]*s+o[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],_=c[9],g=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(_+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(l+1)/2,v=(d+1)/2,T=(p+1)/2,b=(h+f)/4,E=(u+g)/4,w=(_+m)/4;return M>v&&M>T?M<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(M),s=b/i,a=E/i):v>T?v<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(v),i=b/s,a=w/s):T<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(T),i=E/a,s=w/a),this.set(i,s,a,n),this}let x=Math.sqrt((m-_)*(m-_)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(u-g)/x,this.z=(f-h)/x,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xu extends Fi{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new be(0,0,t,n),this.scissorTest=!1,this.viewport=new be(0,0,t,n);const s={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new Be(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let r=0;r<o;r++)this.textures[r]=a.clone(),this.textures[r].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new Jl(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ii extends Xu{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class Ql extends Be{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yu extends Be{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ui{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,o,r){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const f=a[o+0],d=a[o+1],_=a[o+2],g=a[o+3];if(r===0){t[n+0]=c,t[n+1]=l,t[n+2]=h,t[n+3]=u;return}if(r===1){t[n+0]=f,t[n+1]=d,t[n+2]=_,t[n+3]=g;return}if(u!==g||c!==f||l!==d||h!==_){let m=1-r;const p=c*f+l*d+h*_+u*g,x=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const T=Math.sqrt(M),b=Math.atan2(T,p*x);m=Math.sin(m*b)/T,r=Math.sin(r*b)/T}const v=r*x;if(c=c*m+f*v,l=l*m+d*v,h=h*m+_*v,u=u*m+g*v,m===1-r){const T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[n]=c,t[n+1]=l,t[n+2]=h,t[n+3]=u}static multiplyQuaternionsFlat(t,n,i,s,a,o){const r=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=a[o],f=a[o+1],d=a[o+2],_=a[o+3];return t[n]=r*_+h*u+c*d-l*f,t[n+1]=c*_+h*f+l*u-r*d,t[n+2]=l*_+h*d+r*f-c*u,t[n+3]=h*_-r*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,s=t._y,a=t._z,o=t._order,r=Math.cos,c=Math.sin,l=r(i/2),h=r(s/2),u=r(a/2),f=c(i/2),d=c(s/2),_=c(a/2);switch(o){case"XYZ":this._x=f*h*u+l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u-f*d*_;break;case"YXZ":this._x=f*h*u+l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u+f*d*_;break;case"ZXY":this._x=f*h*u-l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u-f*d*_;break;case"ZYX":this._x=f*h*u-l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u+f*d*_;break;case"YZX":this._x=f*h*u+l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u-f*d*_;break;case"XZY":this._x=f*h*u-l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],s=n[4],a=n[8],o=n[1],r=n[5],c=n[9],l=n[2],h=n[6],u=n[10],f=i+r+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(a-l)*d,this._z=(o-s)*d}else if(i>r&&i>u){const d=2*Math.sqrt(1+i-r-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(a+l)/d}else if(r>u){const d=2*Math.sqrt(1+r-i-u);this._w=(a-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-i-r);this._w=(o-s)/d,this._x=(a+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ze(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,s=t._y,a=t._z,o=t._w,r=n._x,c=n._y,l=n._z,h=n._w;return this._x=i*h+o*r+s*l-a*c,this._y=s*h+o*c+a*r-i*l,this._z=a*h+o*l+i*c-s*r,this._w=o*h-i*r-s*c-a*l,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,s=this._y,a=this._z,o=this._w;let r=o*t._w+i*t._x+s*t._y+a*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=o,this._x=i,this._y=s,this._z=a,this;const c=1-r*r;if(c<=Number.EPSILON){const d=1-n;return this._w=d*o+n*this._w,this._x=d*i+n*this._x,this._y=d*s+n*this._y,this._z=d*a+n*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,r),u=Math.sin((1-n)*h)/l,f=Math.sin(n*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=a*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(t=0,n=0,i=0){Y.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Ec.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Ec.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,a=t.elements,o=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*o,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*o,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,s=this.z,a=t.x,o=t.y,r=t.z,c=t.w,l=2*(o*s-r*i),h=2*(r*n-a*s),u=2*(a*i-o*n);return this.x=n+c*l+o*u-r*h,this.y=i+c*h+r*l-a*u,this.z=s+c*u+a*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,s=t.y,a=t.z,o=n.x,r=n.y,c=n.z;return this.x=s*c-a*r,this.y=a*o-i*c,this.z=i*r-s*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return so.copy(this).projectOnVector(t),this.sub(so)}reflect(t){return this.sub(so.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const so=new Y,Ec=new Ui;class Oi{constructor(t=new Y(1/0,1/0,1/0),n=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(ln.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(ln.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=ln.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let o=0,r=a.count;o<r;o++)t.isMesh===!0?t.getVertexPosition(o,ln):ln.fromBufferAttribute(a,o),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Js.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Js.copy(i.boundingBox)),Js.applyMatrix4(t.matrixWorld),this.union(Js)}const s=t.children;for(let a=0,o=s.length;a<o;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cs),Qs.subVectors(this.max,Cs),Xi.subVectors(t.a,Cs),Yi.subVectors(t.b,Cs),qi.subVectors(t.c,Cs),ti.subVectors(Yi,Xi),ei.subVectors(qi,Yi),mi.subVectors(Xi,qi);let n=[0,-ti.z,ti.y,0,-ei.z,ei.y,0,-mi.z,mi.y,ti.z,0,-ti.x,ei.z,0,-ei.x,mi.z,0,-mi.x,-ti.y,ti.x,0,-ei.y,ei.x,0,-mi.y,mi.x,0];return!ao(n,Xi,Yi,qi,Qs)||(n=[1,0,0,0,1,0,0,0,1],!ao(n,Xi,Yi,qi,Qs))?!1:(ta.crossVectors(ti,ei),n=[ta.x,ta.y,ta.z],ao(n,Xi,Yi,qi,Qs))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Nn=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],ln=new Y,Js=new Oi,Xi=new Y,Yi=new Y,qi=new Y,ti=new Y,ei=new Y,mi=new Y,Cs=new Y,Qs=new Y,ta=new Y,_i=new Y;function ao(e,t,n,i,s){for(let a=0,o=e.length-3;a<=o;a+=3){_i.fromArray(e,a);const r=s.x*Math.abs(_i.x)+s.y*Math.abs(_i.y)+s.z*Math.abs(_i.z),c=t.dot(_i),l=n.dot(_i),h=i.dot(_i);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>r)return!1}return!0}const qu=new Oi,Ps=new Y,oo=new Y;class Ss{constructor(t=new Y,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):qu.setFromPoints(t).getCenter(i);let s=0;for(let a=0,o=t.length;a<o;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ps.subVectors(t,this.center);const n=Ps.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Ps,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ps.copy(t.center).add(oo)),this.expandByPoint(Ps.copy(t.center).sub(oo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fn=new Y,ro=new Y,ea=new Y,ni=new Y,co=new Y,na=new Y,lo=new Y;class Hr{constructor(t=new Y,n=new Y(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Fn.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,n),Fn.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){ro.copy(t).add(n).multiplyScalar(.5),ea.copy(n).sub(t).normalize(),ni.copy(this.origin).sub(ro);const a=t.distanceTo(n)*.5,o=-this.direction.dot(ea),r=ni.dot(this.direction),c=-ni.dot(ea),l=ni.lengthSq(),h=Math.abs(1-o*o);let u,f,d,_;if(h>0)if(u=o*c-r,f=o*r-c,_=a*h,u>=0)if(f>=-_)if(f<=_){const g=1/h;u*=g,f*=g,d=u*(u+o*f+2*r)+f*(o*u+f+2*c)+l}else f=a,u=Math.max(0,-(o*f+r)),d=-u*u+f*(f+2*c)+l;else f=-a,u=Math.max(0,-(o*f+r)),d=-u*u+f*(f+2*c)+l;else f<=-_?(u=Math.max(0,-(-o*a+r)),f=u>0?-a:Math.min(Math.max(-a,-c),a),d=-u*u+f*(f+2*c)+l):f<=_?(u=0,f=Math.min(Math.max(-a,-c),a),d=f*(f+2*c)+l):(u=Math.max(0,-(o*a+r)),f=u>0?a:Math.min(Math.max(-a,-c),a),d=-u*u+f*(f+2*c)+l);else f=o>0?-a:a,u=Math.max(0,-(o*f+r)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ro).addScaledVector(ea,f),d}intersectSphere(t,n){Fn.subVectors(t.center,this.origin);const i=Fn.dot(this.direction),s=Fn.dot(Fn)-i*i,a=t.radius*t.radius;if(s>a)return null;const o=Math.sqrt(a-s),r=i-o,c=i+o;return c<0?null:r<0?this.at(c,n):this.at(r,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,o,r,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(a=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(a=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||a>s||((a>i||isNaN(i))&&(i=a),(o<s||isNaN(s))&&(s=o),u>=0?(r=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(r=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||r>s)||((r>i||i!==i)&&(i=r),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,n,i,s,a){co.subVectors(n,t),na.subVectors(i,t),lo.crossVectors(co,na);let o=this.direction.dot(lo),r;if(o>0){if(s)return null;r=1}else if(o<0)r=-1,o=-o;else return null;ni.subVectors(this.origin,t);const c=r*this.direction.dot(na.crossVectors(ni,na));if(c<0)return null;const l=r*this.direction.dot(co.cross(ni));if(l<0||c+l>o)return null;const h=-r*ni.dot(lo);return h<0?null:this.at(h/o,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,n,i,s,a,o,r,c,l,h,u,f,d,_,g,m){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,o,r,c,l,h,u,f,d,_,g,m)}set(t,n,i,s,a,o,r,c,l,h,u,f,d,_,g,m){const p=this.elements;return p[0]=t,p[4]=n,p[8]=i,p[12]=s,p[1]=a,p[5]=o,p[9]=r,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,s=1/$i.setFromMatrixColumn(t,0).length(),a=1/$i.setFromMatrixColumn(t,1).length(),o=1/$i.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,s=t.y,a=t.z,o=Math.cos(i),r=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(a),u=Math.sin(a);if(t.order==="XYZ"){const f=o*h,d=o*u,_=r*h,g=r*u;n[0]=c*h,n[4]=-c*u,n[8]=l,n[1]=d+_*l,n[5]=f-g*l,n[9]=-r*c,n[2]=g-f*l,n[6]=_+d*l,n[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,_=l*h,g=l*u;n[0]=f+g*r,n[4]=_*r-d,n[8]=o*l,n[1]=o*u,n[5]=o*h,n[9]=-r,n[2]=d*r-_,n[6]=g+f*r,n[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,_=l*h,g=l*u;n[0]=f-g*r,n[4]=-o*u,n[8]=_+d*r,n[1]=d+_*r,n[5]=o*h,n[9]=g-f*r,n[2]=-o*l,n[6]=r,n[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,_=r*h,g=r*u;n[0]=c*h,n[4]=_*l-d,n[8]=f*l+g,n[1]=c*u,n[5]=g*l+f,n[9]=d*l-_,n[2]=-l,n[6]=r*c,n[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,_=r*c,g=r*l;n[0]=c*h,n[4]=g-f*u,n[8]=_*u+d,n[1]=u,n[5]=o*h,n[9]=-r*h,n[2]=-l*h,n[6]=d*u+_,n[10]=f-g*u}else if(t.order==="XZY"){const f=o*c,d=o*l,_=r*c,g=r*l;n[0]=c*h,n[4]=-u,n[8]=l*h,n[1]=f*u+g,n[5]=o*h,n[9]=d*u-_,n[2]=_*u-d,n[6]=r*h,n[10]=g*u+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose($u,t,Zu)}lookAt(t,n,i){const s=this.elements;return $e.subVectors(t,n),$e.lengthSq()===0&&($e.z=1),$e.normalize(),ii.crossVectors(i,$e),ii.lengthSq()===0&&(Math.abs(i.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),ii.crossVectors(i,$e)),ii.normalize(),ia.crossVectors($e,ii),s[0]=ii.x,s[4]=ia.x,s[8]=$e.x,s[1]=ii.y,s[5]=ia.y,s[9]=$e.y,s[2]=ii.z,s[6]=ia.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,a=this.elements,o=i[0],r=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],_=i[2],g=i[6],m=i[10],p=i[14],x=i[3],M=i[7],v=i[11],T=i[15],b=s[0],E=s[4],w=s[8],S=s[12],y=s[1],A=s[5],I=s[9],L=s[13],D=s[2],F=s[6],O=s[10],X=s[14],V=s[3],tt=s[7],et=s[11],U=s[15];return a[0]=o*b+r*y+c*D+l*V,a[4]=o*E+r*A+c*F+l*tt,a[8]=o*w+r*I+c*O+l*et,a[12]=o*S+r*L+c*X+l*U,a[1]=h*b+u*y+f*D+d*V,a[5]=h*E+u*A+f*F+d*tt,a[9]=h*w+u*I+f*O+d*et,a[13]=h*S+u*L+f*X+d*U,a[2]=_*b+g*y+m*D+p*V,a[6]=_*E+g*A+m*F+p*tt,a[10]=_*w+g*I+m*O+p*et,a[14]=_*S+g*L+m*X+p*U,a[3]=x*b+M*y+v*D+T*V,a[7]=x*E+M*A+v*F+T*tt,a[11]=x*w+M*I+v*O+T*et,a[15]=x*S+M*L+v*X+T*U,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],o=t[1],r=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],_=t[3],g=t[7],m=t[11],p=t[15];return _*(+a*c*u-s*l*u-a*r*f+i*l*f+s*r*d-i*c*d)+g*(+n*c*d-n*l*f+a*o*f-s*o*d+s*l*h-a*c*h)+m*(+n*l*u-n*r*d-a*o*u+i*o*d+a*r*h-i*l*h)+p*(-s*r*h-n*c*u+n*r*f+s*o*u-i*o*f+i*c*h)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],_=t[12],g=t[13],m=t[14],p=t[15],x=u*m*l-g*f*l+g*c*d-r*m*d-u*c*p+r*f*p,M=_*f*l-h*m*l-_*c*d+o*m*d+h*c*p-o*f*p,v=h*g*l-_*u*l+_*r*d-o*g*d-h*r*p+o*u*p,T=_*u*c-h*g*c-_*r*f+o*g*f+h*r*m-o*u*m,b=n*x+i*M+s*v+a*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/b;return t[0]=x*E,t[1]=(g*f*a-u*m*a-g*s*d+i*m*d+u*s*p-i*f*p)*E,t[2]=(r*m*a-g*c*a+g*s*l-i*m*l-r*s*p+i*c*p)*E,t[3]=(u*c*a-r*f*a-u*s*l+i*f*l+r*s*d-i*c*d)*E,t[4]=M*E,t[5]=(h*m*a-_*f*a+_*s*d-n*m*d-h*s*p+n*f*p)*E,t[6]=(_*c*a-o*m*a-_*s*l+n*m*l+o*s*p-n*c*p)*E,t[7]=(o*f*a-h*c*a+h*s*l-n*f*l-o*s*d+n*c*d)*E,t[8]=v*E,t[9]=(_*u*a-h*g*a-_*i*d+n*g*d+h*i*p-n*u*p)*E,t[10]=(o*g*a-_*r*a+_*i*l-n*g*l-o*i*p+n*r*p)*E,t[11]=(h*r*a-o*u*a-h*i*l+n*u*l+o*i*d-n*r*d)*E,t[12]=T*E,t[13]=(h*g*s-_*u*s+_*i*f-n*g*f-h*i*m+n*u*m)*E,t[14]=(_*r*s-o*g*s-_*i*c+n*g*c+o*i*m-n*r*m)*E,t[15]=(o*u*s-h*r*s+h*i*c-n*u*c-o*i*f+n*r*f)*E,this}scale(t){const n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),s=Math.sin(n),a=1-i,o=t.x,r=t.y,c=t.z,l=a*o,h=a*r;return this.set(l*o+i,l*r-s*c,l*c+s*r,0,l*r+s*c,h*r+i,h*c-s*o,0,l*c-s*r,h*c+s*o,a*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,o){return this.set(1,i,a,0,t,1,o,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){const s=this.elements,a=n._x,o=n._y,r=n._z,c=n._w,l=a+a,h=o+o,u=r+r,f=a*l,d=a*h,_=a*u,g=o*h,m=o*u,p=r*u,x=c*l,M=c*h,v=c*u,T=i.x,b=i.y,E=i.z;return s[0]=(1-(g+p))*T,s[1]=(d+v)*T,s[2]=(_-M)*T,s[3]=0,s[4]=(d-v)*b,s[5]=(1-(f+p))*b,s[6]=(m+x)*b,s[7]=0,s[8]=(_+M)*E,s[9]=(m-x)*E,s[10]=(1-(f+g))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){const s=this.elements;let a=$i.set(s[0],s[1],s[2]).length();const o=$i.set(s[4],s[5],s[6]).length(),r=$i.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const l=1/a,h=1/o,u=1/r;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,n.setFromRotationMatrix(hn),i.x=a,i.y=o,i.z=r,this}makePerspective(t,n,i,s,a,o,r=Hn){const c=this.elements,l=2*a/(n-t),h=2*a/(i-s),u=(n+t)/(n-t),f=(i+s)/(i-s);let d,_;if(r===Hn)d=-(o+a)/(o-a),_=-2*o*a/(o-a);else if(r===Ia)d=-o/(o-a),_=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,o,r=Hn){const c=this.elements,l=1/(n-t),h=1/(i-s),u=1/(o-a),f=(n+t)*l,d=(i+s)*h;let _,g;if(r===Hn)_=(o+a)*u,g=-2*u;else if(r===Ia)_=a*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const $i=new Y,hn=new me,$u=new Y(0,0,0),Zu=new Y(1,1,1),ii=new Y,ia=new Y,$e=new Y,Tc=new me,wc=new Ui;class Cn{constructor(t=0,n=0,i=0,s=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const s=t.elements,a=s[0],o=s[4],r=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(n){case"XYZ":this._y=Math.asin(ze(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(r,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(r,d));break;case"XZY":this._z=Math.asin(-ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(r,a)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Tc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Tc,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return wc.setFromEuler(this),this.setFromQuaternion(wc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class th{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ju=0;const Rc=new Y,Zi=new Ui,On=new me,sa=new Y,Ls=new Y,Ku=new Y,Ju=new Ui,Ac=new Y(1,0,0),Cc=new Y(0,1,0),Pc=new Y(0,0,1),Lc={type:"added"},Qu={type:"removed"},ji={type:"childadded",child:null},ho={type:"childremoved",child:null};class Te extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new Y,n=new Cn,i=new Ui,s=new Y(1,1,1);function a(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new qt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new th,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Zi.setFromAxisAngle(t,n),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,n){return Zi.setFromAxisAngle(t,n),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(Ac,t)}rotateY(t){return this.rotateOnAxis(Cc,t)}rotateZ(t){return this.rotateOnAxis(Pc,t)}translateOnAxis(t,n){return Rc.copy(t).applyQuaternion(this.quaternion),this.position.add(Rc.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Ac,t)}translateY(t){return this.translateOnAxis(Cc,t)}translateZ(t){return this.translateOnAxis(Pc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?sa.copy(t):sa.set(t,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(Ls,sa,this.up):On.lookAt(sa,Ls,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(On),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lc),ji.child=t,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Qu),ho.child=t,this.dispatchEvent(ho),ho.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lc),ji.child=t,this.dispatchEvent(ji),ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,t,Ku),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,Ju,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(r,c){return r[c.uuid]===void 0&&(r[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const c=r.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];a(t.shapes,u)}else a(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let c=0,l=this.material.length;c<l;c++)r.push(a(t.materials,this.material[c]));s.material=r}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let r=0;r<this.children.length;r++)s.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let r=0;r<this.animations.length;r++){const c=this.animations[r];s.animations.push(a(t.animations,c))}}if(n){const r=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),_=o(t.nodes);r.length>0&&(i.geometries=r),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(r){const c=[];for(const l in r){const h=r[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Te.DEFAULT_UP=new Y(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new Y,zn=new Y,uo=new Y,Bn=new Y,Ki=new Y,Ji=new Y,Dc=new Y,fo=new Y,po=new Y,mo=new Y,_o=new be,go=new be,Mo=new be;class dn{constructor(t=new Y,n=new Y,i=new Y){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),un.subVectors(t,n),s.cross(un);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){un.subVectors(s,n),zn.subVectors(i,n),uo.subVectors(t,n);const o=un.dot(un),r=un.dot(zn),c=un.dot(uo),l=zn.dot(zn),h=zn.dot(uo),u=o*l-r*r;if(u===0)return a.set(0,0,0),null;const f=1/u,d=(l*c-r*h)*f,_=(o*h-r*c)*f;return a.set(1-d-_,_,d)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(t,n,i,s,a,o,r,c){return this.getBarycoord(t,n,i,s,Bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Bn.x),c.addScaledVector(o,Bn.y),c.addScaledVector(r,Bn.z),c)}static getInterpolatedAttribute(t,n,i,s,a,o){return _o.setScalar(0),go.setScalar(0),Mo.setScalar(0),_o.fromBufferAttribute(t,n),go.fromBufferAttribute(t,i),Mo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(_o,a.x),o.addScaledVector(go,a.y),o.addScaledVector(Mo,a.z),o}static isFrontFacing(t,n,i,s){return un.subVectors(i,n),zn.subVectors(t,n),un.cross(zn).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),un.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return dn.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return dn.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,s=this.b,a=this.c;let o,r;Ki.subVectors(s,i),Ji.subVectors(a,i),fo.subVectors(t,i);const c=Ki.dot(fo),l=Ji.dot(fo);if(c<=0&&l<=0)return n.copy(i);po.subVectors(t,s);const h=Ki.dot(po),u=Ji.dot(po);if(h>=0&&u<=h)return n.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),n.copy(i).addScaledVector(Ki,o);mo.subVectors(t,a);const d=Ki.dot(mo),_=Ji.dot(mo);if(_>=0&&d<=_)return n.copy(a);const g=d*l-c*_;if(g<=0&&l>=0&&_<=0)return r=l/(l-_),n.copy(i).addScaledVector(Ji,r);const m=h*_-d*u;if(m<=0&&u-h>=0&&d-_>=0)return Dc.subVectors(a,s),r=(u-h)/(u-h+(d-_)),n.copy(s).addScaledVector(Dc,r);const p=1/(m+g+f);return o=g*p,r=f*p,n.copy(i).addScaledVector(Ki,o).addScaledVector(Ji,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},aa={h:0,s:0,l:0};function xo(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class Qt{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=en){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,n),this}setRGB(t,n,i,s=ne.workingColorSpace){return this.r=t,this.g=n,this.b=i,ne.toWorkingColorSpace(this,s),this}setHSL(t,n,i,s=ne.workingColorSpace){if(t=Fu(t,1),n=ze(n,0,1),i=ze(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,o=2*i-a;this.r=xo(o,a,t+1/3),this.g=xo(o,a,t),this.b=xo(o,a,t-1/3)}return ne.toWorkingColorSpace(this,s),this}setStyle(t,n=en){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const o=s[1],r=s[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=s[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(a,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=en){const i=eh[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=us(t.r),this.g=us(t.g),this.b=us(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=en){return ne.fromWorkingColorSpace(Ne.copy(this),t),Math.round(ze(Ne.r*255,0,255))*65536+Math.round(ze(Ne.g*255,0,255))*256+Math.round(ze(Ne.b*255,0,255))}getHexString(t=en){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=ne.workingColorSpace){ne.fromWorkingColorSpace(Ne.copy(this),n);const i=Ne.r,s=Ne.g,a=Ne.b,o=Math.max(i,s,a),r=Math.min(i,s,a);let c,l;const h=(r+o)/2;if(r===o)c=0,l=0;else{const u=o-r;switch(l=h<=.5?u/(o+r):u/(2-o-r),o){case i:c=(s-a)/u+(s<a?6:0);break;case s:c=(a-i)/u+2;break;case a:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,n=ne.workingColorSpace){return ne.fromWorkingColorSpace(Ne.copy(this),n),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=en){ne.fromWorkingColorSpace(Ne.copy(this),t);const n=Ne.r,i=Ne.g,s=Ne.b;return t!==en?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(si),this.setHSL(si.h+t,si.s+n,si.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(si),t.getHSL(aa);const i=eo(si.h,aa.h,n),s=eo(si.s,aa.s,n),a=eo(si.l,aa.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Qt;Qt.NAMES=eh;let tf=0;class bs extends Fi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=Gs(),this.name="",this.blending=ls,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ho,this.blendDst=Go,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gi,this.stencilZFail=Gi,this.stencilZPass=Gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(i.blending=this.blending),this.side!==ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ho&&(i.blendSrc=this.blendSrc),this.blendDst!==Go&&(i.blendDst=this.blendDst),this.blendEquation!==Si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Gi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Gi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const o=[];for(const r in a){const c=a[r];delete c.metadata,o.push(c)}return o}if(n){const a=s(t.textures),o=s(t.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class nh extends bs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new Y,oa=new $t;class mn{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=_c,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)oa.fromBufferAttribute(this,n),oa.applyMatrix3(t),this.setXY(n,oa.x,oa.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ee.fromBufferAttribute(this,n),Ee.applyMatrix3(t),this.setXYZ(n,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ee.fromBufferAttribute(this,n),Ee.applyMatrix4(t),this.setXYZ(n,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ee.fromBufferAttribute(this,n),Ee.applyNormalMatrix(t),this.setXYZ(n,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ee.fromBufferAttribute(this,n),Ee.transformDirection(t),this.setXYZ(n,Ee.x,Ee.y,Ee.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=As(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=He(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=As(n,this.array)),n}setX(t,n){return this.normalized&&(n=He(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=As(n,this.array)),n}setY(t,n){return this.normalized&&(n=He(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=As(n,this.array)),n}setZ(t,n){return this.normalized&&(n=He(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=As(n,this.array)),n}setW(t,n){return this.normalized&&(n=He(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=He(n,this.array),i=He(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=He(n,this.array),i=He(i,this.array),s=He(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=He(n,this.array),i=He(i,this.array),s=He(s,this.array),a=He(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==_c&&(t.usage=this.usage),t}}class ih extends mn{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class sh extends mn{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class _n extends mn{constructor(t,n,i){super(new Float32Array(t),n,i)}}let ef=0;const Qe=new me,vo=new Te,Qi=new Y,Ze=new Oi,Ds=new Oi,Pe=new Y;class $n extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Gs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kl(t)?sh:ih)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new qt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,n,i){return Qe.makeTranslation(t,n,i),this.applyMatrix4(Qe),this}scale(t,n,i){return Qe.makeScale(t,n,i),this.applyMatrix4(Qe),this}lookAt(t){return vo.lookAt(t),vo.updateMatrix(),this.applyMatrix4(vo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,a=t.length;s<a;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _n(i,3))}else{for(let i=0,s=n.count;i<s;i++){const a=t[i];n.setXYZ(i,a.x,a.y,a.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oi);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){const a=n[i];Ze.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ss);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(t){const i=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const r=n[a];Ds.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(Ze.min,Ds.min),Ze.expandByPoint(Pe),Pe.addVectors(Ze.max,Ds.max),Ze.expandByPoint(Pe)):(Ze.expandByPoint(Ds.min),Ze.expandByPoint(Ds.max))}Ze.getCenter(i);let s=0;for(let a=0,o=t.count;a<o;a++)Pe.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(Pe));if(n)for(let a=0,o=n.length;a<o;a++){const r=n[a],c=this.morphTargetsRelative;for(let l=0,h=r.count;l<h;l++)Pe.fromBufferAttribute(r,l),c&&(Qi.fromBufferAttribute(t,l),Pe.add(Qi)),s=Math.max(s,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),r=[],c=[];for(let w=0;w<i.count;w++)r[w]=new Y,c[w]=new Y;const l=new Y,h=new Y,u=new Y,f=new $t,d=new $t,_=new $t,g=new Y,m=new Y;function p(w,S,y){l.fromBufferAttribute(i,w),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,y),f.fromBufferAttribute(a,w),d.fromBufferAttribute(a,S),_.fromBufferAttribute(a,y),h.sub(l),u.sub(l),d.sub(f),_.sub(f);const A=1/(d.x*_.y-_.x*d.y);isFinite(A)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(u,-d.y).multiplyScalar(A),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-_.x).multiplyScalar(A),r[w].add(g),r[S].add(g),r[y].add(g),c[w].add(m),c[S].add(m),c[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let w=0,S=x.length;w<S;++w){const y=x[w],A=y.start,I=y.count;for(let L=A,D=A+I;L<D;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const M=new Y,v=new Y,T=new Y,b=new Y;function E(w){T.fromBufferAttribute(s,w),b.copy(T);const S=r[w];M.copy(S),M.sub(T.multiplyScalar(T.dot(S))).normalize(),v.crossVectors(b,S);const A=v.dot(c[w])<0?-1:1;o.setXYZW(w,M.x,M.y,M.z,A)}for(let w=0,S=x.length;w<S;++w){const y=x[w],A=y.start,I=y.count;for(let L=A,D=A+I;L<D;L+=3)E(t.getX(L+0)),E(t.getX(L+1)),E(t.getX(L+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new mn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new Y,a=new Y,o=new Y,r=new Y,c=new Y,l=new Y,h=new Y,u=new Y;if(t)for(let f=0,d=t.count;f<d;f+=3){const _=t.getX(f+0),g=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(n,_),a.fromBufferAttribute(n,g),o.fromBufferAttribute(n,m),h.subVectors(o,a),u.subVectors(s,a),h.cross(u),r.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,m),r.add(h),c.add(h),l.add(h),i.setXYZ(_,r.x,r.y,r.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=n.count;f<d;f+=3)s.fromBufferAttribute(n,f+0),a.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),h.subVectors(o,a),u.subVectors(s,a),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Pe.fromBufferAttribute(t,n),Pe.normalize(),t.setXYZ(n,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(r,c){const l=r.array,h=r.itemSize,u=r.normalized,f=new l.constructor(c.length*h);let d=0,_=0;for(let g=0,m=c.length;g<m;g++){r.isInterleavedBufferAttribute?d=c[g]*r.data.stride+r.offset:d=c[g]*h;for(let p=0;p<h;p++)f[_++]=l[d++]}return new mn(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new $n,i=this.index.array,s=this.attributes;for(const r in s){const c=s[r],l=t(c,i);n.setAttribute(r,l)}const a=this.morphAttributes;for(const r in a){const c=[],l=a[r];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,i);c.push(d)}n.morphAttributes[r]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let r=0,c=o.length;r<c;r++){const l=o[r];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(n))}const a=t.morphAttributes;for(const l in a){const h=[],u=a[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(n));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ic=new me,gi=new Hr,ra=new Ss,Uc=new Y,ca=new Y,la=new Y,ha=new Y,yo=new Y,ua=new Y,Nc=new Y,fa=new Y;class sn extends Te{constructor(t=new $n,n=new nh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}getVertexPosition(t,n){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(s,t);const r=this.morphTargetInfluences;if(a&&r){ua.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const h=r[c],u=a[c];h!==0&&(yo.fromBufferAttribute(u,t),o?ua.addScaledVector(yo,h):ua.addScaledVector(yo.sub(n),h))}n.add(ua)}return n}raycast(t,n){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ra.copy(i.boundingSphere),ra.applyMatrix4(a),gi.copy(t.ray).recast(t.near),!(ra.containsPoint(gi.origin)===!1&&(gi.intersectSphere(ra,Uc)===null||gi.origin.distanceToSquared(Uc)>(t.far-t.near)**2))&&(Ic.copy(a).invert(),gi.copy(t.ray).applyMatrix4(Ic),!(i.boundingBox!==null&&gi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,gi)))}_computeIntersections(t,n,i){let s;const a=this.geometry,o=this.material,r=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,u=a.attributes.normal,f=a.groups,d=a.drawRange;if(r!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(r.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,T=M;v<T;v+=3){const b=r.getX(v),E=r.getX(v+1),w=r.getX(v+2);s=da(this,p,t,i,l,h,u,b,E,w),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(r.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const x=r.getX(m),M=r.getX(m+1),v=r.getX(m+2);s=da(this,o,t,i,l,h,u,x,M,v),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=x,T=M;v<T;v+=3){const b=v,E=v+1,w=v+2;s=da(this,p,t,i,l,h,u,b,E,w),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(c.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const x=m,M=m+1,v=m+2;s=da(this,o,t,i,l,h,u,x,M,v),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}}function nf(e,t,n,i,s,a,o,r){let c;if(t.side===Xe?c=i.intersectTriangle(o,a,s,!0,r):c=i.intersectTriangle(s,a,o,t.side===ui,r),c===null)return null;fa.copy(r),fa.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(fa);return l<n.near||l>n.far?null:{distance:l,point:fa.clone(),object:e}}function da(e,t,n,i,s,a,o,r,c,l){e.getVertexPosition(r,ca),e.getVertexPosition(c,la),e.getVertexPosition(l,ha);const h=nf(e,t,n,i,ca,la,ha,Nc);if(h){const u=new Y;dn.getBarycoord(Nc,ca,la,ha,u),s&&(h.uv=dn.getInterpolatedAttribute(s,r,c,l,u,new $t)),a&&(h.uv1=dn.getInterpolatedAttribute(a,r,c,l,u,new $t)),o&&(h.normal=dn.getInterpolatedAttribute(o,r,c,l,u,new Y),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:r,b:c,c:l,normal:new Y,materialIndex:0};dn.getNormal(ca,la,ha,f.normal),h.face=f,h.barycoord=u}return h}class Es extends $n{constructor(t=1,n=1,i=1,s=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:o};const r=this;s=Math.floor(s),a=Math.floor(a),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;_("z","y","x",-1,-1,i,n,t,o,a,0),_("z","y","x",1,-1,i,n,-t,o,a,1),_("x","z","y",1,1,t,i,n,s,o,2),_("x","z","y",1,-1,t,i,-n,s,o,3),_("x","y","z",1,-1,t,n,i,s,a,4),_("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new _n(l,3)),this.setAttribute("normal",new _n(h,3)),this.setAttribute("uv",new _n(u,2));function _(g,m,p,x,M,v,T,b,E,w,S){const y=v/E,A=T/w,I=v/2,L=T/2,D=b/2,F=E+1,O=w+1;let X=0,V=0;const tt=new Y;for(let et=0;et<O;et++){const U=et*A-L;for(let B=0;B<F;B++){const $=B*y-I;tt[g]=$*x,tt[m]=U*M,tt[p]=D,l.push(tt.x,tt.y,tt.z),tt[g]=0,tt[m]=0,tt[p]=b>0?1:-1,h.push(tt.x,tt.y,tt.z),u.push(B/E),u.push(1-et/w),X+=1}}for(let et=0;et<w;et++)for(let U=0;U<E;U++){const B=f+U+F*et,$=f+U+F*(et+1),N=f+(U+1)+F*(et+1),k=f+(U+1)+F*et;c.push(B,$,k),c.push($,N,k),V+=6}r.addGroup(d,V,S),d+=V,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ms(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function Oe(e){const t={};for(let n=0;n<e.length;n++){const i=Ms(e[n]);for(const s in i)t[s]=i[s]}return t}function sf(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ah(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const af={clone:Ms,merge:Oe};var of=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends bs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=of,this.fragmentShader=rf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=sf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?n.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[s]={type:"m4",value:o.toArray()}:n.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class oh extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Hn}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ai=new Y,Fc=new $t,Oc=new $t;class nn extends oh{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Rr*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(La*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rr*2*Math.atan(Math.tan(La*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ai.x,ai.y).multiplyScalar(-t/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ai.x,ai.y).multiplyScalar(-t/ai.z)}getViewSize(t,n){return this.getViewBounds(t,Fc,Oc),n.subVectors(Oc,Fc)}setViewOffset(t,n,i,s,a,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(La*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;a+=o.offsetX*s/c,n-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const r=this.filmOffset;r!==0&&(a+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ts=-90,es=1;class cf extends Te{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(ts,es,t,n);s.layers=this.layers,this.add(s);const a=new nn(ts,es,t,n);a.layers=this.layers,this.add(a);const o=new nn(ts,es,t,n);o.layers=this.layers,this.add(o);const r=new nn(ts,es,t,n);r.layers=this.layers,this.add(r);const c=new nn(ts,es,t,n);c.layers=this.layers,this.add(c);const l=new nn(ts,es,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,s,a,o,r,c]=n;for(const l of n)this.remove(l);if(t===Hn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ia)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,o,r,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(n,a),t.setRenderTarget(i,1,s),t.render(n,o),t.setRenderTarget(i,2,s),t.render(n,r),t.setRenderTarget(i,3,s),t.render(n,c),t.setRenderTarget(i,4,s),t.render(n,l),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(n,h),t.setRenderTarget(u,f,d),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class rh extends Be{constructor(t,n,i,s,a,o,r,c,l,h){t=t!==void 0?t:[],n=n!==void 0?n:ps,super(t,n,i,s,a,o,r,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class lf extends Ii{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new rh(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:wn}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Es(5,5,5),a=new Yn({name:"CubemapFromEquirect",uniforms:Ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:li});a.uniforms.tEquirect.value=n;const o=new sn(s,a),r=n.minFilter;return n.minFilter===Ti&&(n.minFilter=wn),new cf(1,10,this).update(t,o),n.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,s){const a=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,s);t.setRenderTarget(a)}}const So=new Y,hf=new Y,uf=new qt;class oi{constructor(t=new Y(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const s=So.subVectors(i,n).cross(hf.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(So),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||uf.getNormalMatrix(t),s=this.coplanarPoint(So).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new Ss,pa=new Y;class Gr{constructor(t=new oi,n=new oi,i=new oi,s=new oi,a=new oi,o=new oi){this.planes=[t,n,i,s,a,o]}set(t,n,i,s,a,o){const r=this.planes;return r[0].copy(t),r[1].copy(n),r[2].copy(i),r[3].copy(s),r[4].copy(a),r[5].copy(o),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Hn){const i=this.planes,s=t.elements,a=s[0],o=s[1],r=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],_=s[9],g=s[10],m=s[11],p=s[12],x=s[13],M=s[14],v=s[15];if(i[0].setComponents(c-a,f-l,m-d,v-p).normalize(),i[1].setComponents(c+a,f+l,m+d,v+p).normalize(),i[2].setComponents(c+o,f+h,m+_,v+x).normalize(),i[3].setComponents(c-o,f-h,m-_,v-x).normalize(),i[4].setComponents(c-r,f-u,m-g,v-M).normalize(),n===Hn)i[5].setComponents(c+r,f+u,m+g,v+M).normalize();else if(n===Ia)i[5].setComponents(r,u,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Mi.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(t){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(t){const n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(pa.x=s.normal.x>0?t.max.x:t.min.x,pa.y=s.normal.y>0?t.max.y:t.min.y,pa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(pa)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ch(){let e=null,t=!1,n=null,i=null;function s(a,o){n(a,o),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function ff(e){const t=new WeakMap;function n(r,c){const l=r.array,h=r.usage,u=l.byteLength,f=e.createBuffer();e.bindBuffer(c,f),e.bufferData(c,l,h),r.onUploadCallback();let d;if(l instanceof Float32Array)d=e.FLOAT;else if(l instanceof Uint16Array)r.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=e.SHORT;else if(l instanceof Uint32Array)d=e.UNSIGNED_INT;else if(l instanceof Int32Array)d=e.INT;else if(l instanceof Int8Array)d=e.BYTE;else if(l instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:r.version,size:u}}function i(r,c,l){const h=c.array,u=c.updateRanges;if(e.bindBuffer(l,r),u.length===0)e.bufferSubData(l,0,h);else{u.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<u.length;d++){const _=u[f],g=u[d];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,u[f]=g)}u.length=f+1;for(let d=0,_=u.length;d<_;d++){const g=u[d];e.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(r){return r.isInterleavedBufferAttribute&&(r=r.data),t.get(r)}function a(r){r.isInterleavedBufferAttribute&&(r=r.data);const c=t.get(r);c&&(e.deleteBuffer(c.buffer),t.delete(r))}function o(r,c){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const h=t.get(r);(!h||h.version<r.version)&&t.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const l=t.get(r);if(l===void 0)t.set(r,n(r,c));else if(l.version<r.version){if(l.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,r,c),l.version=r.version}}return{get:s,remove:a,update:o}}class Ws extends $n{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};const a=t/2,o=n/2,r=Math.floor(i),c=Math.floor(s),l=r+1,h=c+1,u=t/r,f=n/c,d=[],_=[],g=[],m=[];for(let p=0;p<h;p++){const x=p*f-o;for(let M=0;M<l;M++){const v=M*u-a;_.push(v,-x,0),g.push(0,0,1),m.push(M/r),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<r;x++){const M=x+l*p,v=x+l*(p+1),T=x+1+l*(p+1),b=x+1+l*p;d.push(M,v,b),d.push(v,T,b)}this.setIndex(d),this.setAttribute("position",new _n(_,3)),this.setAttribute("normal",new _n(g,3)),this.setAttribute("uv",new _n(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.width,t.height,t.widthSegments,t.heightSegments)}}var df=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_f=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ff=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Of=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,td=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ad=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ud=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,md=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_d=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Md=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ed=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Td=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ad=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Fd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$d=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Zd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,t0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,n0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,i0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,s0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,a0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,o0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,r0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,u0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const f0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,d0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,M0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,x0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,v0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,y0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,b0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,T0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,w0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,L0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,I0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,U0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,O0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,V0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,W0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:df,alphahash_pars_fragment:pf,alphamap_fragment:mf,alphamap_pars_fragment:_f,alphatest_fragment:gf,alphatest_pars_fragment:Mf,aomap_fragment:xf,aomap_pars_fragment:vf,batching_pars_vertex:yf,batching_vertex:Sf,begin_vertex:bf,beginnormal_vertex:Ef,bsdfs:Tf,iridescence_fragment:wf,bumpmap_pars_fragment:Rf,clipping_planes_fragment:Af,clipping_planes_pars_fragment:Cf,clipping_planes_pars_vertex:Pf,clipping_planes_vertex:Lf,color_fragment:Df,color_pars_fragment:If,color_pars_vertex:Uf,color_vertex:Nf,common:Ff,cube_uv_reflection_fragment:Of,defaultnormal_vertex:zf,displacementmap_pars_vertex:Bf,displacementmap_vertex:kf,emissivemap_fragment:Vf,emissivemap_pars_fragment:Hf,colorspace_fragment:Gf,colorspace_pars_fragment:Wf,envmap_fragment:Xf,envmap_common_pars_fragment:Yf,envmap_pars_fragment:qf,envmap_pars_vertex:$f,envmap_physical_pars_fragment:ad,envmap_vertex:Zf,fog_vertex:jf,fog_pars_vertex:Kf,fog_fragment:Jf,fog_pars_fragment:Qf,gradientmap_pars_fragment:td,lightmap_pars_fragment:ed,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:sd,lights_toon_fragment:od,lights_toon_pars_fragment:rd,lights_phong_fragment:cd,lights_phong_pars_fragment:ld,lights_physical_fragment:hd,lights_physical_pars_fragment:ud,lights_fragment_begin:fd,lights_fragment_maps:dd,lights_fragment_end:pd,logdepthbuf_fragment:md,logdepthbuf_pars_fragment:_d,logdepthbuf_pars_vertex:gd,logdepthbuf_vertex:Md,map_fragment:xd,map_pars_fragment:vd,map_particle_fragment:yd,map_particle_pars_fragment:Sd,metalnessmap_fragment:bd,metalnessmap_pars_fragment:Ed,morphinstance_vertex:Td,morphcolor_vertex:wd,morphnormal_vertex:Rd,morphtarget_pars_vertex:Ad,morphtarget_vertex:Cd,normal_fragment_begin:Pd,normal_fragment_maps:Ld,normal_pars_fragment:Dd,normal_pars_vertex:Id,normal_vertex:Ud,normalmap_pars_fragment:Nd,clearcoat_normal_fragment_begin:Fd,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:zd,iridescence_pars_fragment:Bd,opaque_fragment:kd,packing:Vd,premultiplied_alpha_fragment:Hd,project_vertex:Gd,dithering_fragment:Wd,dithering_pars_fragment:Xd,roughnessmap_fragment:Yd,roughnessmap_pars_fragment:qd,shadowmap_pars_fragment:$d,shadowmap_pars_vertex:Zd,shadowmap_vertex:jd,shadowmask_pars_fragment:Kd,skinbase_vertex:Jd,skinning_pars_vertex:Qd,skinning_vertex:t0,skinnormal_vertex:e0,specularmap_fragment:n0,specularmap_pars_fragment:i0,tonemapping_fragment:s0,tonemapping_pars_fragment:a0,transmission_fragment:o0,transmission_pars_fragment:r0,uv_pars_fragment:c0,uv_pars_vertex:l0,uv_vertex:h0,worldpos_vertex:u0,background_vert:f0,background_frag:d0,backgroundCube_vert:p0,backgroundCube_frag:m0,cube_vert:_0,cube_frag:g0,depth_vert:M0,depth_frag:x0,distanceRGBA_vert:v0,distanceRGBA_frag:y0,equirect_vert:S0,equirect_frag:b0,linedashed_vert:E0,linedashed_frag:T0,meshbasic_vert:w0,meshbasic_frag:R0,meshlambert_vert:A0,meshlambert_frag:C0,meshmatcap_vert:P0,meshmatcap_frag:L0,meshnormal_vert:D0,meshnormal_frag:I0,meshphong_vert:U0,meshphong_frag:N0,meshphysical_vert:F0,meshphysical_frag:O0,meshtoon_vert:z0,meshtoon_frag:B0,points_vert:k0,points_frag:V0,shadow_vert:H0,shadow_frag:G0,sprite_vert:W0,sprite_frag:X0},dt={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},En={basic:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Oe([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Oe([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Oe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Oe([dt.points,dt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Oe([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Oe([dt.common,dt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Oe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Oe([dt.sprite,dt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:Oe([dt.common,dt.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:Oe([dt.lights,dt.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};En.physical={uniforms:Oe([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new $t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const ma={r:0,b:0,g:0},xi=new Cn,Y0=new me;function q0(e,t,n,i,s,a,o){const r=new Qt(0);let c=a===!0?0:1,l,h,u=null,f=0,d=null;function _(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?n:t).get(M)),M}function g(x){let M=!1;const v=_(x);v===null?p(r,c):v&&v.isColor&&(p(v,1),M=!0);const T=e.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(x,M){const v=_(M);v&&(v.isCubeTexture||v.mapping===Xa)?(h===void 0&&(h=new sn(new Es(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:Ms(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),xi.copy(M.backgroundRotation),xi.x*=-1,xi.y*=-1,xi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Y0.makeRotationFromEuler(xi)),h.material.toneMapped=ne.getTransfer(v.colorSpace)!==he,(u!==v||f!==v.version||d!==e.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=e.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new sn(new Ws(2,2),new Yn({name:"BackgroundMaterial",uniforms:Ms(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ne.getTransfer(v.colorSpace)!==he,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==e.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=e.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,M){x.getRGB(ma,ah(e)),i.buffers.color.setClear(ma.r,ma.g,ma.b,M,o)}return{getClearColor:function(){return r},setClearColor:function(x,M=1){r.set(x),c=M,p(r,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(r,c)},render:g,addToRenderList:m}}function $0(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=f(null);let a=s,o=!1;function r(y,A,I,L,D){let F=!1;const O=u(L,I,A);a!==O&&(a=O,l(a.object)),F=d(y,L,I,D),F&&_(y,L,I,D),D!==null&&t.update(D,e.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,v(y,A,I,L),D!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function c(){return e.createVertexArray()}function l(y){return e.bindVertexArray(y)}function h(y){return e.deleteVertexArray(y)}function u(y,A,I){const L=I.wireframe===!0;let D=i[y.id];D===void 0&&(D={},i[y.id]=D);let F=D[A.id];F===void 0&&(F={},D[A.id]=F);let O=F[L];return O===void 0&&(O=f(c()),F[L]=O),O}function f(y){const A=[],I=[],L=[];for(let D=0;D<n;D++)A[D]=0,I[D]=0,L[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:I,attributeDivisors:L,object:y,attributes:{},index:null}}function d(y,A,I,L){const D=a.attributes,F=A.attributes;let O=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){const et=D[V];let U=F[V];if(U===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(U=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(U=y.instanceColor)),et===void 0||et.attribute!==U||U&&et.data!==U.data)return!0;O++}return a.attributesNum!==O||a.index!==L}function _(y,A,I,L){const D={},F=A.attributes;let O=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){let et=F[V];et===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(et=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(et=y.instanceColor));const U={};U.attribute=et,et&&et.data&&(U.data=et.data),D[V]=U,O++}a.attributes=D,a.attributesNum=O,a.index=L}function g(){const y=a.newAttributes;for(let A=0,I=y.length;A<I;A++)y[A]=0}function m(y){p(y,0)}function p(y,A){const I=a.newAttributes,L=a.enabledAttributes,D=a.attributeDivisors;I[y]=1,L[y]===0&&(e.enableVertexAttribArray(y),L[y]=1),D[y]!==A&&(e.vertexAttribDivisor(y,A),D[y]=A)}function x(){const y=a.newAttributes,A=a.enabledAttributes;for(let I=0,L=A.length;I<L;I++)A[I]!==y[I]&&(e.disableVertexAttribArray(I),A[I]=0)}function M(y,A,I,L,D,F,O){O===!0?e.vertexAttribIPointer(y,A,I,D,F):e.vertexAttribPointer(y,A,I,L,D,F)}function v(y,A,I,L){g();const D=L.attributes,F=I.getAttributes(),O=A.defaultAttributeValues;for(const X in F){const V=F[X];if(V.location>=0){let tt=D[X];if(tt===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(tt=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(tt=y.instanceColor)),tt!==void 0){const et=tt.normalized,U=tt.itemSize,B=t.get(tt);if(B===void 0)continue;const $=B.buffer,N=B.type,k=B.bytesPerElement,J=N===e.INT||N===e.UNSIGNED_INT||tt.gpuType===Nr;if(tt.isInterleavedBufferAttribute){const K=tt.data,Q=K.stride,lt=tt.offset;if(K.isInstancedInterleavedBuffer){for(let ft=0;ft<V.locationSize;ft++)p(V.location+ft,K.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ft=0;ft<V.locationSize;ft++)m(V.location+ft);e.bindBuffer(e.ARRAY_BUFFER,$);for(let ft=0;ft<V.locationSize;ft++)M(V.location+ft,U/V.locationSize,N,et,Q*k,(lt+U/V.locationSize*ft)*k,J)}else{if(tt.isInstancedBufferAttribute){for(let K=0;K<V.locationSize;K++)p(V.location+K,tt.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let K=0;K<V.locationSize;K++)m(V.location+K);e.bindBuffer(e.ARRAY_BUFFER,$);for(let K=0;K<V.locationSize;K++)M(V.location+K,U/V.locationSize,N,et,U*k,U/V.locationSize*K*k,J)}}else if(O!==void 0){const et=O[X];if(et!==void 0)switch(et.length){case 2:e.vertexAttrib2fv(V.location,et);break;case 3:e.vertexAttrib3fv(V.location,et);break;case 4:e.vertexAttrib4fv(V.location,et);break;default:e.vertexAttrib1fv(V.location,et)}}}}x()}function T(){w();for(const y in i){const A=i[y];for(const I in A){const L=A[I];for(const D in L)h(L[D].object),delete L[D];delete A[I]}delete i[y]}}function b(y){if(i[y.id]===void 0)return;const A=i[y.id];for(const I in A){const L=A[I];for(const D in L)h(L[D].object),delete L[D];delete A[I]}delete i[y.id]}function E(y){for(const A in i){const I=i[A];if(I[y.id]===void 0)continue;const L=I[y.id];for(const D in L)h(L[D].object),delete L[D];delete I[y.id]}}function w(){S(),o=!0,a!==s&&(a=s,l(a.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:r,reset:w,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function Z0(e,t,n){let i;function s(l){i=l}function a(l,h){e.drawArrays(i,l,h),n.update(h,i,1)}function o(l,h,u){u!==0&&(e.drawArraysInstanced(i,l,h,u),n.update(h,i,u))}function r(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let d=0;for(let _=0;_<u;_++)d+=h[_];n.update(d,i,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<l.length;_++)o(l[_],h[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let _=0;for(let g=0;g<u;g++)_+=h[g]*f[g];n.update(_,i,1)}}this.setMode=s,this.render=a,this.renderInstances=o,this.renderMultiDraw=r,this.renderMultiDrawInstances=c}function j0(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==pn&&i.convert(E)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(E){const w=E===Hs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Xn&&i.convert(E)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Rn&&!w)}function c(E){if(E==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),p=e.getParameter(e.MAX_VERTEX_ATTRIBS),x=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=_>0,b=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:r,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:T,maxSamples:b}}function K0(e){const t=this;let n=null,i=0,s=!1,a=!1;const o=new oi,r=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,f){n=h(u,f,0)},this.setState=function(u,f,d){const _=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,p=e.get(u);if(!s||_===null||_.length===0||a&&!m)a?h(null):l();else{const x=a?0:i,M=x*4;let v=p.clippingState||null;c.value=v,v=h(_,f,M,d);for(let T=0;T!==M;++T)v[T]=n[T];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,_){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=c.value,_!==!0||m===null){const p=d+g*4,x=f.matrixWorldInverse;r.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=d;M!==g;++M,v+=4)o.copy(u[M]).applyMatrix4(x,r),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function J0(e){let t=new WeakMap;function n(o,r){return r===Ko?o.mapping=ps:r===Jo&&(o.mapping=ms),o}function i(o){if(o&&o.isTexture){const r=o.mapping;if(r===Ko||r===Jo)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new lf(c.height);return l.fromEquirectangularTexture(e,o),t.set(o,l),o.addEventListener("dispose",s),n(l.texture,o.mapping)}else return null}}return o}function s(o){const r=o.target;r.removeEventListener("dispose",s);const c=t.get(r);c!==void 0&&(t.delete(r),c.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}class lh extends oh{constructor(t=-1,n=1,i=1,s=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-t,o=i+t,r=s+n,c=s-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,o=a+l*this.view.width,r-=h*this.view.offsetY,c=r-h*this.view.height}this.projectionMatrix.makeOrthographic(a,o,r,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const os=4,zc=[.125,.215,.35,.446,.526,.582],bi=20,bo=new lh,Bc=new Qt;let Eo=null,To=0,wo=0,Ro=!1;const yi=(1+Math.sqrt(5))/2,ns=1/yi,kc=[new Y(-yi,ns,0),new Y(yi,ns,0),new Y(-ns,0,yi),new Y(ns,0,yi),new Y(0,yi,-ns),new Y(0,yi,ns),new Y(-1,1,-1),new Y(1,1,-1),new Y(-1,1,1),new Y(1,1,1)];class Vc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,s=100){Eo=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,i,s,a),n>0&&this._blur(a,0,0,n),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Eo,To,wo),this._renderer.xr.enabled=Ro,t.scissorTest=!1,_a(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ps||t.mapping===ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Eo=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Hs,format:pn,colorSpace:ys,depthBuffer:!1},s=Hc(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hc(t,n,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Q0(a)),this._blurMaterial=tp(a,t,n)}return s}_compileMaterial(t){const n=new sn(this._lodPlanes[0],t);this._renderer.compile(n,bo)}_sceneToCubeUV(t,n,i,s){const r=new nn(90,1,n,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Bc),h.toneMapping=hi,h.autoClear=!1;const d=new nh({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),_=new sn(new Es,d);let g=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,g=!0):(d.color.copy(Bc),g=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(r.up.set(0,c[p],0),r.lookAt(l[p],0,0)):x===1?(r.up.set(0,0,c[p]),r.lookAt(0,l[p],0)):(r.up.set(0,c[p],0),r.lookAt(0,0,l[p]));const M=this._cubeSize;_a(s,x*M,p>2?M:0,M,M),h.setRenderTarget(s),g&&h.render(_,r),h.render(t,r)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,n){const i=this._renderer,s=t.mapping===ps||t.mapping===ms;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gc());const a=s?this._cubemapMaterial:this._equirectMaterial,o=new sn(this._lodPlanes[0],a),r=a.uniforms;r.envMap.value=t;const c=this._cubeSize;_a(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,bo)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),r=kc[(s-a-1)%kc.length];this._blur(t,a-1,a,o,r)}n.autoClear=i}_blur(t,n,i,s,a){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,s,"latitudinal",a),this._halfBlur(o,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,o,r){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new sn(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*d):2*Math.PI/(2*bi-1),g=a/_,m=isFinite(a)?1+Math.floor(h*g):bi;m>bi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const p=[];let x=0;for(let E=0;E<bi;++E){const w=E/g,S=Math.exp(-w*w/2);p.push(S),E===0?x+=S:E<m&&(x+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/x;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",r&&(f.poleAxis.value=r);const{_lodMax:M}=this;f.dTheta.value=_,f.mipInt.value=M-i;const v=this._sizeLods[s],T=3*v*(s>M-os?s-M+os:0),b=4*(this._cubeSize-v);_a(n,T,b,3*v,2*v),c.setRenderTarget(n),c.render(u,bo)}}function Q0(e){const t=[],n=[],i=[];let s=e;const a=e-os+1+zc.length;for(let o=0;o<a;o++){const r=Math.pow(2,s);n.push(r);let c=1/r;o>e-os?c=zc[o-e+os-1]:o===0&&(c=0),i.push(c);const l=1/(r-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,_=6,g=3,m=2,p=1,x=new Float32Array(g*_*d),M=new Float32Array(m*_*d),v=new Float32Array(p*_*d);for(let b=0;b<d;b++){const E=b%3*2/3-1,w=b>2?0:-1,S=[E,w,0,E+2/3,w,0,E+2/3,w+1,0,E,w,0,E+2/3,w+1,0,E,w+1,0];x.set(S,g*_*b),M.set(f,m*_*b);const y=[b,b,b,b,b,b];v.set(y,p*_*b)}const T=new $n;T.setAttribute("position",new mn(x,g)),T.setAttribute("uv",new mn(M,m)),T.setAttribute("faceIndex",new mn(v,p)),t.push(T),s>os&&s--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function Hc(e,t,n){const i=new Ii(e,t,n);return i.texture.mapping=Xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _a(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function tp(e,t,n){const i=new Float32Array(bi),s=new Y(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Gc(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Wc(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Wr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ep(e){let t=new WeakMap,n=null;function i(r){if(r&&r.isTexture){const c=r.mapping,l=c===Ko||c===Jo,h=c===ps||c===ms;if(l||h){let u=t.get(r);const f=u!==void 0?u.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==f)return n===null&&(n=new Vc(e)),u=l?n.fromEquirectangular(r,u):n.fromCubemap(r,u),u.texture.pmremVersion=r.pmremVersion,t.set(r,u),u.texture;if(u!==void 0)return u.texture;{const d=r.image;return l&&d&&d.height>0||h&&d&&s(d)?(n===null&&(n=new Vc(e)),u=l?n.fromEquirectangular(r):n.fromCubemap(r),u.texture.pmremVersion=r.pmremVersion,t.set(r,u),r.addEventListener("dispose",a),u.texture):null}}}return r}function s(r){let c=0;const l=6;for(let h=0;h<l;h++)r[h]!==void 0&&c++;return c===l}function a(r){const c=r.target;c.removeEventListener("dispose",a);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function np(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&Fs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function ip(e,t,n,i){const s={},a=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);for(const _ in f.morphAttributes){const g=f.morphAttributes[_];for(let m=0,p=g.length;m<p;m++)t.remove(g[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=a.get(f);d&&(t.remove(d),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function r(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,n.memory.geometries++),f}function c(u){const f=u.attributes;for(const _ in f)t.update(f[_],e.ARRAY_BUFFER);const d=u.morphAttributes;for(const _ in d){const g=d[_];for(let m=0,p=g.length;m<p;m++)t.update(g[m],e.ARRAY_BUFFER)}}function l(u){const f=[],d=u.index,_=u.attributes.position;let g=0;if(d!==null){const x=d.array;g=d.version;for(let M=0,v=x.length;M<v;M+=3){const T=x[M+0],b=x[M+1],E=x[M+2];f.push(T,b,b,E,E,T)}}else if(_!==void 0){const x=_.array;g=_.version;for(let M=0,v=x.length/3-1;M<v;M+=3){const T=M+0,b=M+1,E=M+2;f.push(T,b,b,E,E,T)}}else return;const m=new(Kl(f)?sh:ih)(f,1);m.version=g;const p=a.get(u);p&&t.remove(p),a.set(u,m)}function h(u){const f=a.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return a.get(u)}return{get:r,update:c,getWireframeAttribute:h}}function sp(e,t,n){let i;function s(f){i=f}let a,o;function r(f){a=f.type,o=f.bytesPerElement}function c(f,d){e.drawElements(i,d,a,f*o),n.update(d,i,1)}function l(f,d,_){_!==0&&(e.drawElementsInstanced(i,d,a,f*o,_),n.update(d,i,_))}function h(f,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];n.update(m,i,1)}function u(f,d,_,g){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,a,f,0,g,0,_);let p=0;for(let x=0;x<_;x++)p+=d[x]*g[x];n.update(p,i,1)}}this.setMode=s,this.setIndex=r,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ap(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,r){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=r*(a/3);break;case e.LINES:n.lines+=r*(a/2);break;case e.LINE_STRIP:n.lines+=r*(a-1);break;case e.LINE_LOOP:n.lines+=r*a;break;case e.POINTS:n.points+=r*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function op(e,t,n){const i=new WeakMap,s=new be;function a(o,r,c){const l=o.morphTargetInfluences,h=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(r);if(f===void 0||f.count!==u){let y=function(){w.dispose(),i.delete(r),r.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const _=r.morphAttributes.position!==void 0,g=r.morphAttributes.normal!==void 0,m=r.morphAttributes.color!==void 0,p=r.morphAttributes.position||[],x=r.morphAttributes.normal||[],M=r.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let T=r.attributes.position.count*v,b=1;T>t.maxTextureSize&&(b=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const E=new Float32Array(T*b*4*u),w=new Ql(E,T,b,u);w.type=Rn,w.needsUpdate=!0;const S=v*4;for(let A=0;A<u;A++){const I=p[A],L=x[A],D=M[A],F=T*b*4*A;for(let O=0;O<I.count;O++){const X=O*S;_===!0&&(s.fromBufferAttribute(I,O),E[F+X+0]=s.x,E[F+X+1]=s.y,E[F+X+2]=s.z,E[F+X+3]=0),g===!0&&(s.fromBufferAttribute(L,O),E[F+X+4]=s.x,E[F+X+5]=s.y,E[F+X+6]=s.z,E[F+X+7]=0),m===!0&&(s.fromBufferAttribute(D,O),E[F+X+8]=s.x,E[F+X+9]=s.y,E[F+X+10]=s.z,E[F+X+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:w,size:new $t(T,b)},i.set(r,f),r.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let _=0;for(let m=0;m<l.length;m++)_+=l[m];const g=r.morphTargetsRelative?1:1-_;c.getUniforms().setValue(e,"morphTargetBaseInfluence",g),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",f.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:a}}function rp(e,t,n,i){let s=new WeakMap;function a(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",r)===!1&&c.addEventListener("dispose",r),s.get(c)!==l&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function r(c){const l=c.target;l.removeEventListener("dispose",r),n.remove(l.instanceMatrix),l.instanceColor!==null&&n.remove(l.instanceColor)}return{update:a,dispose:o}}class hh extends Be{constructor(t,n,i,s,a,o,r,c,l,h=hs){if(h!==hs&&h!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===hs&&(i=Di),i===void 0&&h===gs&&(i=_s),super(null,s,a,o,r,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=r!==void 0?r:je,this.minFilter=c!==void 0?c:je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const uh=new Be,Xc=new hh(1,1),fh=new Ql,dh=new Yu,ph=new rh,Yc=[],qc=[],$c=new Float32Array(16),Zc=new Float32Array(9),jc=new Float32Array(4);function Ts(e,t,n){const i=e[0];if(i<=0||i>0)return e;const s=t*n;let a=Yc[s];if(a===void 0&&(a=new Float32Array(s),Yc[s]=a),t!==0){i.toArray(a,0);for(let o=1,r=0;o!==t;++o)r+=n,e[o].toArray(a,r)}return a}function Ae(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ce(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function qa(e,t){let n=qc[t];n===void 0&&(n=new Int32Array(t),qc[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function cp(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function lp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ae(n,t))return;e.uniform2fv(this.addr,t),Ce(n,t)}}function hp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ae(n,t))return;e.uniform3fv(this.addr,t),Ce(n,t)}}function up(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ae(n,t))return;e.uniform4fv(this.addr,t),Ce(n,t)}}function fp(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ae(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ce(n,t)}else{if(Ae(n,i))return;jc.set(i),e.uniformMatrix2fv(this.addr,!1,jc),Ce(n,i)}}function dp(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ae(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ce(n,t)}else{if(Ae(n,i))return;Zc.set(i),e.uniformMatrix3fv(this.addr,!1,Zc),Ce(n,i)}}function pp(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ae(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ce(n,t)}else{if(Ae(n,i))return;$c.set(i),e.uniformMatrix4fv(this.addr,!1,$c),Ce(n,i)}}function mp(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function _p(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ae(n,t))return;e.uniform2iv(this.addr,t),Ce(n,t)}}function gp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ae(n,t))return;e.uniform3iv(this.addr,t),Ce(n,t)}}function Mp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ae(n,t))return;e.uniform4iv(this.addr,t),Ce(n,t)}}function xp(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function vp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ae(n,t))return;e.uniform2uiv(this.addr,t),Ce(n,t)}}function yp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ae(n,t))return;e.uniform3uiv(this.addr,t),Ce(n,t)}}function Sp(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ae(n,t))return;e.uniform4uiv(this.addr,t),Ce(n,t)}}function bp(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(Xc.compareFunction=jl,a=Xc):a=uh,n.setTexture2D(t||a,s)}function Ep(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||dh,s)}function Tp(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||ph,s)}function wp(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||fh,s)}function Rp(e){switch(e){case 5126:return cp;case 35664:return lp;case 35665:return hp;case 35666:return up;case 35674:return fp;case 35675:return dp;case 35676:return pp;case 5124:case 35670:return mp;case 35667:case 35671:return _p;case 35668:case 35672:return gp;case 35669:case 35673:return Mp;case 5125:return xp;case 36294:return vp;case 36295:return yp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return bp;case 35679:case 36299:case 36307:return Ep;case 35680:case 36300:case 36308:case 36293:return Tp;case 36289:case 36303:case 36311:case 36292:return wp}}function Ap(e,t){e.uniform1fv(this.addr,t)}function Cp(e,t){const n=Ts(t,this.size,2);e.uniform2fv(this.addr,n)}function Pp(e,t){const n=Ts(t,this.size,3);e.uniform3fv(this.addr,n)}function Lp(e,t){const n=Ts(t,this.size,4);e.uniform4fv(this.addr,n)}function Dp(e,t){const n=Ts(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ip(e,t){const n=Ts(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Up(e,t){const n=Ts(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Np(e,t){e.uniform1iv(this.addr,t)}function Fp(e,t){e.uniform2iv(this.addr,t)}function Op(e,t){e.uniform3iv(this.addr,t)}function zp(e,t){e.uniform4iv(this.addr,t)}function Bp(e,t){e.uniform1uiv(this.addr,t)}function kp(e,t){e.uniform2uiv(this.addr,t)}function Vp(e,t){e.uniform3uiv(this.addr,t)}function Hp(e,t){e.uniform4uiv(this.addr,t)}function Gp(e,t,n){const i=this.cache,s=t.length,a=qa(n,s);Ae(i,a)||(e.uniform1iv(this.addr,a),Ce(i,a));for(let o=0;o!==s;++o)n.setTexture2D(t[o]||uh,a[o])}function Wp(e,t,n){const i=this.cache,s=t.length,a=qa(n,s);Ae(i,a)||(e.uniform1iv(this.addr,a),Ce(i,a));for(let o=0;o!==s;++o)n.setTexture3D(t[o]||dh,a[o])}function Xp(e,t,n){const i=this.cache,s=t.length,a=qa(n,s);Ae(i,a)||(e.uniform1iv(this.addr,a),Ce(i,a));for(let o=0;o!==s;++o)n.setTextureCube(t[o]||ph,a[o])}function Yp(e,t,n){const i=this.cache,s=t.length,a=qa(n,s);Ae(i,a)||(e.uniform1iv(this.addr,a),Ce(i,a));for(let o=0;o!==s;++o)n.setTexture2DArray(t[o]||fh,a[o])}function qp(e){switch(e){case 5126:return Ap;case 35664:return Cp;case 35665:return Pp;case 35666:return Lp;case 35674:return Dp;case 35675:return Ip;case 35676:return Up;case 5124:case 35670:return Np;case 35667:case 35671:return Fp;case 35668:case 35672:return Op;case 35669:case 35673:return zp;case 5125:return Bp;case 36294:return kp;case 36295:return Vp;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return Gp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return Yp}}class $p{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Rp(n.type)}}class Zp{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=qp(n.type)}}class jp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const s=this.seq;for(let a=0,o=s.length;a!==o;++a){const r=s[a];r.setValue(t,n[r.id],i)}}}const Ao=/(\w+)(\])?(\[|\.)?/g;function Kc(e,t){e.seq.push(t),e.map[t.id]=t}function Kp(e,t,n){const i=e.name,s=i.length;for(Ao.lastIndex=0;;){const a=Ao.exec(i),o=Ao.lastIndex;let r=a[1];const c=a[2]==="]",l=a[3];if(c&&(r=r|0),l===void 0||l==="["&&o+2===s){Kc(n,l===void 0?new $p(r,e,t):new Zp(r,e,t));break}else{let u=n.map[r];u===void 0&&(u=new jp(r),Kc(n,u)),n=u}}}class Da{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=t.getActiveUniform(n,s),o=t.getUniformLocation(n,a.name);Kp(a,o,this)}}setValue(t,n,i,s){const a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){const s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,o=n.length;a!==o;++a){const r=n[a],c=i[r.id];c.needsUpdate!==!1&&r.setValue(t,c.value,s)}}static seqWithValue(t,n){const i=[];for(let s=0,a=t.length;s!==a;++s){const o=t[s];o.id in n&&i.push(o)}return i}}function Jc(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const Jp=37297;let Qp=0;function tm(e,t){const n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let o=s;o<a;o++){const r=o+1;i.push(`${r===t?">":" "} ${r}: ${n[o]}`)}return i.join(`
`)}const Qc=new qt;function em(e){ne._getMatrix(Qc,ne.workingColorSpace,e);const t=`mat3( ${Qc.elements.map(n=>n.toFixed(4))} )`;switch(ne.getTransfer(e)){case Ya:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function tl(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),s=e.getShaderInfoLog(t).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+tm(e.getShaderSource(t),o)}else return s}function nm(e,t){const n=em(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function im(e,t){let n;switch(t){case Mu:n="Linear";break;case xu:n="Reinhard";break;case vu:n="Cineon";break;case yu:n="ACESFilmic";break;case bu:n="AgX";break;case Eu:n="Neutral";break;case Su:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ga=new Y;function sm(){ne.getLuminanceCoefficients(ga);const e=ga.x.toFixed(4),t=ga.y.toFixed(4),n=ga.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function am(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function om(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function rm(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=e.getActiveAttrib(t,s),o=a.name;let r=1;a.type===e.FLOAT_MAT2&&(r=2),a.type===e.FLOAT_MAT3&&(r=3),a.type===e.FLOAT_MAT4&&(r=4),n[o]={type:a.type,location:e.getAttribLocation(t,o),locationSize:r}}return n}function Os(e){return e!==""}function el(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const cm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ar(e){return e.replace(cm,hm)}const lm=new Map;function hm(e,t){let n=jt[t];if(n===void 0){const i=lm.get(t);if(i!==void 0)n=jt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ar(n)}const um=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function il(e){return e.replace(um,fm)}function fm(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function sl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function dm(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Fl?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===Ol?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function pm(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case ps:case ms:t="ENVMAP_TYPE_CUBE";break;case Xa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mm(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case ms:t="ENVMAP_MODE_REFRACTION";break}return t}function _m(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case zl:t="ENVMAP_BLENDING_MULTIPLY";break;case _u:t="ENVMAP_BLENDING_MIX";break;case gu:t="ENVMAP_BLENDING_ADD";break}return t}function gm(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function Mm(e,t,n,i){const s=e.getContext(),a=n.defines;let o=n.vertexShader,r=n.fragmentShader;const c=dm(n),l=pm(n),h=mm(n),u=_m(n),f=gm(n),d=am(n),_=om(a),g=s.createProgram();let m,p,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Os).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Os).join(`
`),p.length>0&&(p+=`
`)):(m=[sl(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),p=[sl(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==hi?"#define TONE_MAPPING":"",n.toneMapping!==hi?jt.tonemapping_pars_fragment:"",n.toneMapping!==hi?im("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,nm("linearToOutputTexel",n.outputColorSpace),sm(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Os).join(`
`)),o=Ar(o),o=el(o,n),o=nl(o,n),r=Ar(r),r=el(r,n),r=nl(r,n),o=il(o),r=il(r),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+m+o,v=x+p+r,T=Jc(s,s.VERTEX_SHADER,M),b=Jc(s,s.FRAGMENT_SHADER,v);s.attachShader(g,T),s.attachShader(g,b),n.index0AttributeName!==void 0?s.bindAttribLocation(g,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(A){if(e.debug.checkShaderErrors){const I=s.getProgramInfoLog(g).trim(),L=s.getShaderInfoLog(T).trim(),D=s.getShaderInfoLog(b).trim();let F=!0,O=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(F=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,g,T,b);else{const X=tl(s,T,"vertex"),V=tl(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+I+`
`+X+`
`+V)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(L===""||D==="")&&(O=!1);O&&(A.diagnostics={runnable:F,programLog:I,vertexShader:{log:L,prefix:m},fragmentShader:{log:D,prefix:p}})}s.deleteShader(T),s.deleteShader(b),w=new Da(s,g),S=rm(s,g)}let w;this.getUniforms=function(){return w===void 0&&E(this),w};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let y=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(g,Jp)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Qp++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=b,this}let xm=0;class vm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new ym(t),n.set(t,i)),i}}class ym{constructor(t){this.id=xm++,this.code=t,this.usedTimes=0}}function Sm(e,t,n,i,s,a,o){const r=new th,c=new vm,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,A,I,L){const D=I.fog,F=L.geometry,O=S.isMeshStandardMaterial?I.environment:null,X=(S.isMeshStandardMaterial?n:t).get(S.envMap||O),V=X&&X.mapping===Xa?X.image.height:null,tt=_[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const et=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,U=et!==void 0?et.length:0;let B=0;F.morphAttributes.position!==void 0&&(B=1),F.morphAttributes.normal!==void 0&&(B=2),F.morphAttributes.color!==void 0&&(B=3);let $,N,k,J;if(tt){const ce=En[tt];$=ce.vertexShader,N=ce.fragmentShader}else $=S.vertexShader,N=S.fragmentShader,c.update(S),k=c.getVertexShaderID(S),J=c.getFragmentShaderID(S);const K=e.getRenderTarget(),Q=e.state.buffers.depth.getReversed(),lt=L.isInstancedMesh===!0,ft=L.isBatchedMesh===!0,bt=!!S.map,St=!!S.matcap,Kt=!!X,z=!!S.aoMap,fe=!!S.lightMap,zt=!!S.bumpMap,Ot=!!S.normalMap,Tt=!!S.displacementMap,Jt=!!S.emissiveMap,Ct=!!S.metalnessMap,P=!!S.roughnessMap,R=S.anisotropy>0,q=S.clearcoat>0,nt=S.dispersion>0,rt=S.iridescence>0,at=S.sheen>0,Pt=S.transmission>0,pt=R&&!!S.anisotropyMap,yt=q&&!!S.clearcoatMap,ee=q&&!!S.clearcoatNormalMap,ht=q&&!!S.clearcoatRoughnessMap,wt=rt&&!!S.iridescenceMap,Nt=rt&&!!S.iridescenceThicknessMap,kt=at&&!!S.sheenColorMap,Rt=at&&!!S.sheenRoughnessMap,te=!!S.specularMap,Zt=!!S.specularColorMap,de=!!S.specularIntensityMap,H=Pt&&!!S.transmissionMap,mt=Pt&&!!S.thicknessMap,it=!!S.gradientMap,ot=!!S.alphaMap,xt=S.alphaTest>0,_t=!!S.alphaHash,Xt=!!S.extensions;let Se=hi;S.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Se=e.toneMapping);const Ie={shaderID:tt,shaderType:S.type,shaderName:S.name,vertexShader:$,fragmentShader:N,defines:S.defines,customVertexShaderID:k,customFragmentShaderID:J,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:ft,batchingColor:ft&&L._colorsTexture!==null,instancing:lt,instancingColor:lt&&L.instanceColor!==null,instancingMorph:lt&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?e.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:ys,alphaToCoverage:!!S.alphaToCoverage,map:bt,matcap:St,envMap:Kt,envMapMode:Kt&&X.mapping,envMapCubeUVHeight:V,aoMap:z,lightMap:fe,bumpMap:zt,normalMap:Ot,displacementMap:f&&Tt,emissiveMap:Jt,normalMapObjectSpace:Ot&&S.normalMapType===Au,normalMapTangentSpace:Ot&&S.normalMapType===Zl,metalnessMap:Ct,roughnessMap:P,anisotropy:R,anisotropyMap:pt,clearcoat:q,clearcoatMap:yt,clearcoatNormalMap:ee,clearcoatRoughnessMap:ht,dispersion:nt,iridescence:rt,iridescenceMap:wt,iridescenceThicknessMap:Nt,sheen:at,sheenColorMap:kt,sheenRoughnessMap:Rt,specularMap:te,specularColorMap:Zt,specularIntensityMap:de,transmission:Pt,transmissionMap:H,thicknessMap:mt,gradientMap:it,opaque:S.transparent===!1&&S.blending===ls&&S.alphaToCoverage===!1,alphaMap:ot,alphaTest:xt,alphaHash:_t,combine:S.combine,mapUv:bt&&g(S.map.channel),aoMapUv:z&&g(S.aoMap.channel),lightMapUv:fe&&g(S.lightMap.channel),bumpMapUv:zt&&g(S.bumpMap.channel),normalMapUv:Ot&&g(S.normalMap.channel),displacementMapUv:Tt&&g(S.displacementMap.channel),emissiveMapUv:Jt&&g(S.emissiveMap.channel),metalnessMapUv:Ct&&g(S.metalnessMap.channel),roughnessMapUv:P&&g(S.roughnessMap.channel),anisotropyMapUv:pt&&g(S.anisotropyMap.channel),clearcoatMapUv:yt&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ee&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ht&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&g(S.sheenRoughnessMap.channel),specularMapUv:te&&g(S.specularMap.channel),specularColorMapUv:Zt&&g(S.specularColorMap.channel),specularIntensityMapUv:de&&g(S.specularIntensityMap.channel),transmissionMapUv:H&&g(S.transmissionMap.channel),thicknessMapUv:mt&&g(S.thicknessMap.channel),alphaMapUv:ot&&g(S.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Ot||R),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!F.attributes.uv&&(bt||ot),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Q,skinning:L.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:B,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:e.shadowMap.enabled&&A.length>0,shadowMapType:e.shadowMap.type,toneMapping:Se,decodeVideoTexture:bt&&S.map.isVideoTexture===!0&&ne.getTransfer(S.map.colorSpace)===he,decodeVideoTextureEmissive:Jt&&S.emissiveMap.isVideoTexture===!0&&ne.getTransfer(S.emissiveMap.colorSpace)===he,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Tn,flipSided:S.side===Xe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Xt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&S.extensions.multiDraw===!0||ft)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ie.vertexUv1s=l.has(1),Ie.vertexUv2s=l.has(2),Ie.vertexUv3s=l.has(3),l.clear(),Ie}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const A in S.defines)y.push(A),y.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(x(y,S),M(y,S),y.push(e.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function x(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){r.disableAll(),y.supportsVertexTextures&&r.enable(0),y.instancing&&r.enable(1),y.instancingColor&&r.enable(2),y.instancingMorph&&r.enable(3),y.matcap&&r.enable(4),y.envMap&&r.enable(5),y.normalMapObjectSpace&&r.enable(6),y.normalMapTangentSpace&&r.enable(7),y.clearcoat&&r.enable(8),y.iridescence&&r.enable(9),y.alphaTest&&r.enable(10),y.vertexColors&&r.enable(11),y.vertexAlphas&&r.enable(12),y.vertexUv1s&&r.enable(13),y.vertexUv2s&&r.enable(14),y.vertexUv3s&&r.enable(15),y.vertexTangents&&r.enable(16),y.anisotropy&&r.enable(17),y.alphaHash&&r.enable(18),y.batching&&r.enable(19),y.dispersion&&r.enable(20),y.batchingColor&&r.enable(21),S.push(r.mask),r.disableAll(),y.fog&&r.enable(0),y.useFog&&r.enable(1),y.flatShading&&r.enable(2),y.logarithmicDepthBuffer&&r.enable(3),y.reverseDepthBuffer&&r.enable(4),y.skinning&&r.enable(5),y.morphTargets&&r.enable(6),y.morphNormals&&r.enable(7),y.morphColors&&r.enable(8),y.premultipliedAlpha&&r.enable(9),y.shadowMapEnabled&&r.enable(10),y.doubleSided&&r.enable(11),y.flipSided&&r.enable(12),y.useDepthPacking&&r.enable(13),y.dithering&&r.enable(14),y.transmission&&r.enable(15),y.sheen&&r.enable(16),y.opaque&&r.enable(17),y.pointsUvs&&r.enable(18),y.decodeVideoTexture&&r.enable(19),y.decodeVideoTextureEmissive&&r.enable(20),y.alphaToCoverage&&r.enable(21),S.push(r.mask)}function v(S){const y=_[S.type];let A;if(y){const I=En[y];A=af.clone(I.uniforms)}else A=S.uniforms;return A}function T(S,y){let A;for(let I=0,L=h.length;I<L;I++){const D=h[I];if(D.cacheKey===y){A=D,++A.usedTimes;break}}return A===void 0&&(A=new Mm(e,y,S,a),h.push(A)),A}function b(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function E(S){c.remove(S)}function w(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:b,releaseShaderCache:E,programs:h,dispose:w}}function bm(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let r=e.get(o);return r===void 0&&(r={},e.set(o,r)),r}function i(o){e.delete(o)}function s(o,r,c){e.get(o)[r]=c}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function Em(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function al(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function ol(){const e=[];let t=0;const n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function o(u,f,d,_,g,m){let p=e[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},e[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=g,p.group=m),t++,p}function r(u,f,d,_,g,m){const p=o(u,f,d,_,g,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):n.push(p)}function c(u,f,d,_,g,m){const p=o(u,f,d,_,g,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):n.unshift(p)}function l(u,f){n.length>1&&n.sort(u||Em),i.length>1&&i.sort(f||al),s.length>1&&s.sort(f||al)}function h(){for(let u=t,f=e.length;u<f;u++){const d=e[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:r,unshift:c,finish:h,sort:l}}function Tm(){let e=new WeakMap;function t(i,s){const a=e.get(i);let o;return a===void 0?(o=new ol,e.set(i,[o])):s>=a.length?(o=new ol,a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function wm(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new Y,color:new Qt};break;case"SpotLight":n={position:new Y,direction:new Y,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Y,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Y,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":n={color:new Qt,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return e[t.id]=n,n}}}function Rm(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let Am=0;function Cm(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function Pm(e){const t=new wm,n=Rm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new Y);const s=new Y,a=new me,o=new me;function r(l){let h=0,u=0,f=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let d=0,_=0,g=0,m=0,p=0,x=0,M=0,v=0,T=0,b=0,E=0;l.sort(Cm);for(let S=0,y=l.length;S<y;S++){const A=l[S],I=A.color,L=A.intensity,D=A.distance,F=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=I.r*L,u+=I.g*L,f+=I.b*L;else if(A.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(A.sh.coefficients[O],L);E++}else if(A.isDirectionalLight){const O=t.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const X=A.shadow,V=n.get(A);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.directionalShadow[d]=V,i.directionalShadowMap[d]=F,i.directionalShadowMatrix[d]=A.shadow.matrix,x++}i.directional[d]=O,d++}else if(A.isSpotLight){const O=t.get(A);O.position.setFromMatrixPosition(A.matrixWorld),O.color.copy(I).multiplyScalar(L),O.distance=D,O.coneCos=Math.cos(A.angle),O.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),O.decay=A.decay,i.spot[g]=O;const X=A.shadow;if(A.map&&(i.spotLightMap[T]=A.map,T++,X.updateMatrices(A),A.castShadow&&b++),i.spotLightMatrix[g]=X.matrix,A.castShadow){const V=n.get(A);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=F,v++}g++}else if(A.isRectAreaLight){const O=t.get(A);O.color.copy(I).multiplyScalar(L),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=O,m++}else if(A.isPointLight){const O=t.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),O.distance=A.distance,O.decay=A.decay,A.castShadow){const X=A.shadow,V=n.get(A);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,V.shadowCameraNear=X.camera.near,V.shadowCameraFar=X.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=F,i.pointShadowMatrix[_]=A.shadow.matrix,M++}i.point[_]=O,_++}else if(A.isHemisphereLight){const O=t.get(A);O.skyColor.copy(A.color).multiplyScalar(L),O.groundColor.copy(A.groundColor).multiplyScalar(L),i.hemi[p]=O,p++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const w=i.hash;(w.directionalLength!==d||w.pointLength!==_||w.spotLength!==g||w.rectAreaLength!==m||w.hemiLength!==p||w.numDirectionalShadows!==x||w.numPointShadows!==M||w.numSpotShadows!==v||w.numSpotMaps!==T||w.numLightProbes!==E)&&(i.directional.length=d,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=v+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=E,w.directionalLength=d,w.pointLength=_,w.spotLength=g,w.rectAreaLength=m,w.hemiLength=p,w.numDirectionalShadows=x,w.numPointShadows=M,w.numSpotShadows=v,w.numSpotMaps=T,w.numLightProbes=E,i.version=Am++)}function c(l,h){let u=0,f=0,d=0,_=0,g=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const M=l[p];if(M.isDirectionalLight){const v=i.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(M.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const v=i.rectArea[_];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),a.copy(M.matrixWorld),a.premultiply(m),o.extractRotation(a),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const v=i.hemi[g];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:r,setupView:c,state:i}}function rl(e){const t=new Pm(e),n=[],i=[];function s(h){l.camera=h,n.length=0,i.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function r(){t.setup(n)}function c(h){t.setupView(n,h)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:r,setupLightsView:c,pushLight:a,pushShadow:o}}function Lm(e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let r;return o===void 0?(r=new rl(e),t.set(s,[r])):a>=o.length?(r=new rl(e),o.push(r)):r=o[a],r}function i(){t=new WeakMap}return{get:n,dispose:i}}class Dm extends bs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Im extends bs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Um=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Fm(e,t,n){let i=new Gr;const s=new $t,a=new $t,o=new be,r=new Dm({depthPacking:Ru}),c=new Im,l={},h=n.maxTextureSize,u={[ui]:Xe,[Xe]:ui,[Tn]:Tn},f=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:Um,fragmentShader:Nm}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new $n;_.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new sn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fl;let p=this.type;this.render=function(b,E,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const S=e.getRenderTarget(),y=e.getActiveCubeFace(),A=e.getActiveMipmapLevel(),I=e.state;I.setBlending(li),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const L=p!==kn&&this.type===kn,D=p===kn&&this.type!==kn;for(let F=0,O=b.length;F<O;F++){const X=b[F],V=X.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const tt=V.getFrameExtents();if(s.multiply(tt),a.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/tt.x),s.x=a.x*tt.x,V.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/tt.y),s.y=a.y*tt.y,V.mapSize.y=a.y)),V.map===null||L===!0||D===!0){const U=this.type!==kn?{minFilter:je,magFilter:je}:{};V.map!==null&&V.map.dispose(),V.map=new Ii(s.x,s.y,U),V.map.texture.name=X.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();const et=V.getViewportCount();for(let U=0;U<et;U++){const B=V.getViewport(U);o.set(a.x*B.x,a.y*B.y,a.x*B.z,a.y*B.w),I.viewport(o),V.updateMatrices(X,U),i=V.getFrustum(),v(E,w,V.camera,X,this.type)}V.isPointLightShadow!==!0&&this.type===kn&&x(V,w),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,e.setRenderTarget(S,y,A)};function x(b,E){const w=t.update(g);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ii(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(E,null,w,f,g,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(E,null,w,d,g,null)}function M(b,E,w,S){let y=null;const A=w.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)y=A;else if(y=w.isPointLight===!0?c:r,e.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const I=y.uuid,L=E.uuid;let D=l[I];D===void 0&&(D={},l[I]=D);let F=D[L];F===void 0&&(F=y.clone(),D[L]=F,E.addEventListener("dispose",T)),y=F}if(y.visible=E.visible,y.wireframe=E.wireframe,S===kn?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:u[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const I=e.properties.get(y);I.light=w}return y}function v(b,E,w,S,y){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===kn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,b.matrixWorld);const L=t.update(b),D=b.material;if(Array.isArray(D)){const F=L.groups;for(let O=0,X=F.length;O<X;O++){const V=F[O],tt=D[V.materialIndex];if(tt&&tt.visible){const et=M(b,tt,S,y);b.onBeforeShadow(e,b,E,w,L,et,V),e.renderBufferDirect(w,null,L,et,b,V),b.onAfterShadow(e,b,E,w,L,et,V)}}}else if(D.visible){const F=M(b,D,S,y);b.onBeforeShadow(e,b,E,w,L,F,null),e.renderBufferDirect(w,null,L,F,b,null),b.onAfterShadow(e,b,E,w,L,F,null)}}const I=b.children;for(let L=0,D=I.length;L<D;L++)v(I[L],E,w,S,y)}function T(b){b.target.removeEventListener("dispose",T);for(const w in l){const S=l[w],y=b.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const Om={[Wo]:Xo,[Yo]:Zo,[qo]:jo,[ds]:$o,[Xo]:Wo,[Zo]:Yo,[jo]:qo,[$o]:ds};function zm(e,t){function n(){let H=!1;const mt=new be;let it=null;const ot=new be(0,0,0,0);return{setMask:function(xt){it!==xt&&!H&&(e.colorMask(xt,xt,xt,xt),it=xt)},setLocked:function(xt){H=xt},setClear:function(xt,_t,Xt,Se,Ie){Ie===!0&&(xt*=Se,_t*=Se,Xt*=Se),mt.set(xt,_t,Xt,Se),ot.equals(mt)===!1&&(e.clearColor(xt,_t,Xt,Se),ot.copy(mt))},reset:function(){H=!1,it=null,ot.set(-1,0,0,0)}}}function i(){let H=!1,mt=!1,it=null,ot=null,xt=null;return{setReversed:function(_t){if(mt!==_t){const Xt=t.get("EXT_clip_control");mt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const Se=xt;xt=null,this.setClear(Se)}mt=_t},getReversed:function(){return mt},setTest:function(_t){_t?K(e.DEPTH_TEST):Q(e.DEPTH_TEST)},setMask:function(_t){it!==_t&&!H&&(e.depthMask(_t),it=_t)},setFunc:function(_t){if(mt&&(_t=Om[_t]),ot!==_t){switch(_t){case Wo:e.depthFunc(e.NEVER);break;case Xo:e.depthFunc(e.ALWAYS);break;case Yo:e.depthFunc(e.LESS);break;case ds:e.depthFunc(e.LEQUAL);break;case qo:e.depthFunc(e.EQUAL);break;case $o:e.depthFunc(e.GEQUAL);break;case Zo:e.depthFunc(e.GREATER);break;case jo:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ot=_t}},setLocked:function(_t){H=_t},setClear:function(_t){xt!==_t&&(mt&&(_t=1-_t),e.clearDepth(_t),xt=_t)},reset:function(){H=!1,it=null,ot=null,xt=null,mt=!1}}}function s(){let H=!1,mt=null,it=null,ot=null,xt=null,_t=null,Xt=null,Se=null,Ie=null;return{setTest:function(ce){H||(ce?K(e.STENCIL_TEST):Q(e.STENCIL_TEST))},setMask:function(ce){mt!==ce&&!H&&(e.stencilMask(ce),mt=ce)},setFunc:function(ce,rn,In){(it!==ce||ot!==rn||xt!==In)&&(e.stencilFunc(ce,rn,In),it=ce,ot=rn,xt=In)},setOp:function(ce,rn,In){(_t!==ce||Xt!==rn||Se!==In)&&(e.stencilOp(ce,rn,In),_t=ce,Xt=rn,Se=In)},setLocked:function(ce){H=ce},setClear:function(ce){Ie!==ce&&(e.clearStencil(ce),Ie=ce)},reset:function(){H=!1,mt=null,it=null,ot=null,xt=null,_t=null,Xt=null,Se=null,Ie=null}}}const a=new n,o=new i,r=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,x=null,M=null,v=null,T=null,b=null,E=new Qt(0,0,0),w=0,S=!1,y=null,A=null,I=null,L=null,D=null;const F=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,X=0;const V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(V)[1]),O=X>=1):V.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),O=X>=2);let tt=null,et={};const U=e.getParameter(e.SCISSOR_BOX),B=e.getParameter(e.VIEWPORT),$=new be().fromArray(U),N=new be().fromArray(B);function k(H,mt,it,ot){const xt=new Uint8Array(4),_t=e.createTexture();e.bindTexture(H,_t),e.texParameteri(H,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(H,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Xt=0;Xt<it;Xt++)H===e.TEXTURE_3D||H===e.TEXTURE_2D_ARRAY?e.texImage3D(mt,0,e.RGBA,1,1,ot,0,e.RGBA,e.UNSIGNED_BYTE,xt):e.texImage2D(mt+Xt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,xt);return _t}const J={};J[e.TEXTURE_2D]=k(e.TEXTURE_2D,e.TEXTURE_2D,1),J[e.TEXTURE_CUBE_MAP]=k(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[e.TEXTURE_2D_ARRAY]=k(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),J[e.TEXTURE_3D]=k(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),r.setClear(0),K(e.DEPTH_TEST),o.setFunc(ds),zt(!1),Ot(uc),K(e.CULL_FACE),z(li);function K(H){h[H]!==!0&&(e.enable(H),h[H]=!0)}function Q(H){h[H]!==!1&&(e.disable(H),h[H]=!1)}function lt(H,mt){return u[H]!==mt?(e.bindFramebuffer(H,mt),u[H]=mt,H===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=mt),H===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=mt),!0):!1}function ft(H,mt){let it=d,ot=!1;if(H){it=f.get(mt),it===void 0&&(it=[],f.set(mt,it));const xt=H.textures;if(it.length!==xt.length||it[0]!==e.COLOR_ATTACHMENT0){for(let _t=0,Xt=xt.length;_t<Xt;_t++)it[_t]=e.COLOR_ATTACHMENT0+_t;it.length=xt.length,ot=!0}}else it[0]!==e.BACK&&(it[0]=e.BACK,ot=!0);ot&&e.drawBuffers(it)}function bt(H){return _!==H?(e.useProgram(H),_=H,!0):!1}const St={[Si]:e.FUNC_ADD,[Qh]:e.FUNC_SUBTRACT,[tu]:e.FUNC_REVERSE_SUBTRACT};St[eu]=e.MIN,St[nu]=e.MAX;const Kt={[iu]:e.ZERO,[su]:e.ONE,[au]:e.SRC_COLOR,[Ho]:e.SRC_ALPHA,[uu]:e.SRC_ALPHA_SATURATE,[lu]:e.DST_COLOR,[ru]:e.DST_ALPHA,[ou]:e.ONE_MINUS_SRC_COLOR,[Go]:e.ONE_MINUS_SRC_ALPHA,[hu]:e.ONE_MINUS_DST_COLOR,[cu]:e.ONE_MINUS_DST_ALPHA,[fu]:e.CONSTANT_COLOR,[du]:e.ONE_MINUS_CONSTANT_COLOR,[pu]:e.CONSTANT_ALPHA,[mu]:e.ONE_MINUS_CONSTANT_ALPHA};function z(H,mt,it,ot,xt,_t,Xt,Se,Ie,ce){if(H===li){g===!0&&(Q(e.BLEND),g=!1);return}if(g===!1&&(K(e.BLEND),g=!0),H!==Jh){if(H!==m||ce!==S){if((p!==Si||v!==Si)&&(e.blendEquation(e.FUNC_ADD),p=Si,v=Si),ce)switch(H){case ls:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case fc:e.blendFunc(e.ONE,e.ONE);break;case dc:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case pc:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case ls:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case fc:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case dc:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case pc:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}x=null,M=null,T=null,b=null,E.set(0,0,0),w=0,m=H,S=ce}return}xt=xt||mt,_t=_t||it,Xt=Xt||ot,(mt!==p||xt!==v)&&(e.blendEquationSeparate(St[mt],St[xt]),p=mt,v=xt),(it!==x||ot!==M||_t!==T||Xt!==b)&&(e.blendFuncSeparate(Kt[it],Kt[ot],Kt[_t],Kt[Xt]),x=it,M=ot,T=_t,b=Xt),(Se.equals(E)===!1||Ie!==w)&&(e.blendColor(Se.r,Se.g,Se.b,Ie),E.copy(Se),w=Ie),m=H,S=!1}function fe(H,mt){H.side===Tn?Q(e.CULL_FACE):K(e.CULL_FACE);let it=H.side===Xe;mt&&(it=!it),zt(it),H.blending===ls&&H.transparent===!1?z(li):z(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),a.setMask(H.colorWrite);const ot=H.stencilWrite;r.setTest(ot),ot&&(r.setMask(H.stencilWriteMask),r.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),r.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Jt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?K(e.SAMPLE_ALPHA_TO_COVERAGE):Q(e.SAMPLE_ALPHA_TO_COVERAGE)}function zt(H){y!==H&&(H?e.frontFace(e.CW):e.frontFace(e.CCW),y=H)}function Ot(H){H!==jh?(K(e.CULL_FACE),H!==A&&(H===uc?e.cullFace(e.BACK):H===Kh?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Q(e.CULL_FACE),A=H}function Tt(H){H!==I&&(O&&e.lineWidth(H),I=H)}function Jt(H,mt,it){H?(K(e.POLYGON_OFFSET_FILL),(L!==mt||D!==it)&&(e.polygonOffset(mt,it),L=mt,D=it)):Q(e.POLYGON_OFFSET_FILL)}function Ct(H){H?K(e.SCISSOR_TEST):Q(e.SCISSOR_TEST)}function P(H){H===void 0&&(H=e.TEXTURE0+F-1),tt!==H&&(e.activeTexture(H),tt=H)}function R(H,mt,it){it===void 0&&(tt===null?it=e.TEXTURE0+F-1:it=tt);let ot=et[it];ot===void 0&&(ot={type:void 0,texture:void 0},et[it]=ot),(ot.type!==H||ot.texture!==mt)&&(tt!==it&&(e.activeTexture(it),tt=it),e.bindTexture(H,mt||J[H]),ot.type=H,ot.texture=mt)}function q(){const H=et[tt];H!==void 0&&H.type!==void 0&&(e.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function nt(){try{e.compressedTexImage2D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function rt(){try{e.compressedTexImage3D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function at(){try{e.texSubImage2D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Pt(){try{e.texSubImage3D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function pt(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function yt(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ee(){try{e.texStorage2D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ht(){try{e.texStorage3D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function wt(){try{e.texImage2D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Nt(){try{e.texImage3D.apply(e,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function kt(H){$.equals(H)===!1&&(e.scissor(H.x,H.y,H.z,H.w),$.copy(H))}function Rt(H){N.equals(H)===!1&&(e.viewport(H.x,H.y,H.z,H.w),N.copy(H))}function te(H,mt){let it=l.get(mt);it===void 0&&(it=new WeakMap,l.set(mt,it));let ot=it.get(H);ot===void 0&&(ot=e.getUniformBlockIndex(mt,H.name),it.set(H,ot))}function Zt(H,mt){const ot=l.get(mt).get(H);c.get(mt)!==ot&&(e.uniformBlockBinding(mt,ot,H.__bindingPointIndex),c.set(mt,ot))}function de(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),h={},tt=null,et={},u={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,x=null,M=null,v=null,T=null,b=null,E=new Qt(0,0,0),w=0,S=!1,y=null,A=null,I=null,L=null,D=null,$.set(0,0,e.canvas.width,e.canvas.height),N.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),r.reset()}return{buffers:{color:a,depth:o,stencil:r},enable:K,disable:Q,bindFramebuffer:lt,drawBuffers:ft,useProgram:bt,setBlending:z,setMaterial:fe,setFlipSided:zt,setCullFace:Ot,setLineWidth:Tt,setPolygonOffset:Jt,setScissorTest:Ct,activeTexture:P,bindTexture:R,unbindTexture:q,compressedTexImage2D:nt,compressedTexImage3D:rt,texImage2D:wt,texImage3D:Nt,updateUBOMapping:te,uniformBlockBinding:Zt,texStorage2D:ee,texStorage3D:ht,texSubImage2D:at,texSubImage3D:Pt,compressedTexSubImage2D:pt,compressedTexSubImage3D:yt,scissor:kt,viewport:Rt,reset:de}}function cl(e,t,n,i){const s=Bm(i);switch(n){case Gl:return e*t;case Xl:return e*t;case Yl:return e*t*2;case zr:return e*t/s.components*s.byteLength;case Br:return e*t/s.components*s.byteLength;case ql:return e*t*2/s.components*s.byteLength;case kr:return e*t*2/s.components*s.byteLength;case Wl:return e*t*3/s.components*s.byteLength;case pn:return e*t*4/s.components*s.byteLength;case Vr:return e*t*4/s.components*s.byteLength;case wa:case Ra:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Aa:case Ca:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case nr:case sr:return Math.max(e,16)*Math.max(t,8)/4;case er:case ir:return Math.max(e,8)*Math.max(t,8)/2;case ar:case or:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case rr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case cr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case lr:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case hr:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ur:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case fr:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case dr:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case pr:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case mr:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _r:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case gr:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Mr:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case xr:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case vr:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case yr:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Pa:case Sr:case br:return Math.ceil(e/4)*Math.ceil(t/4)*16;case $l:case Er:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Tr:case wr:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Bm(e){switch(e){case Xn:case kl:return{byteLength:1,components:1};case Bs:case Vl:case Hs:return{byteLength:2,components:1};case Fr:case Or:return{byteLength:2,components:4};case Di:case Nr:case Rn:return{byteLength:4,components:1};case Hl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function km(e,t,n,i,s,a,o){const r=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $t,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,R){return d?new OffscreenCanvas(P,R):Ua("canvas")}function g(P,R,q){let nt=1;const rt=Ct(P);if((rt.width>q||rt.height>q)&&(nt=q/Math.max(rt.width,rt.height)),nt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const at=Math.floor(nt*rt.width),Pt=Math.floor(nt*rt.height);u===void 0&&(u=_(at,Pt));const pt=R?_(at,Pt):u;return pt.width=at,pt.height=Pt,pt.getContext("2d").drawImage(P,0,0,at,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+at+"x"+Pt+")."),pt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){e.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?e.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function M(P,R,q,nt,rt=!1){if(P!==null){if(e[P]!==void 0)return e[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let at=R;if(R===e.RED&&(q===e.FLOAT&&(at=e.R32F),q===e.HALF_FLOAT&&(at=e.R16F),q===e.UNSIGNED_BYTE&&(at=e.R8)),R===e.RED_INTEGER&&(q===e.UNSIGNED_BYTE&&(at=e.R8UI),q===e.UNSIGNED_SHORT&&(at=e.R16UI),q===e.UNSIGNED_INT&&(at=e.R32UI),q===e.BYTE&&(at=e.R8I),q===e.SHORT&&(at=e.R16I),q===e.INT&&(at=e.R32I)),R===e.RG&&(q===e.FLOAT&&(at=e.RG32F),q===e.HALF_FLOAT&&(at=e.RG16F),q===e.UNSIGNED_BYTE&&(at=e.RG8)),R===e.RG_INTEGER&&(q===e.UNSIGNED_BYTE&&(at=e.RG8UI),q===e.UNSIGNED_SHORT&&(at=e.RG16UI),q===e.UNSIGNED_INT&&(at=e.RG32UI),q===e.BYTE&&(at=e.RG8I),q===e.SHORT&&(at=e.RG16I),q===e.INT&&(at=e.RG32I)),R===e.RGB_INTEGER&&(q===e.UNSIGNED_BYTE&&(at=e.RGB8UI),q===e.UNSIGNED_SHORT&&(at=e.RGB16UI),q===e.UNSIGNED_INT&&(at=e.RGB32UI),q===e.BYTE&&(at=e.RGB8I),q===e.SHORT&&(at=e.RGB16I),q===e.INT&&(at=e.RGB32I)),R===e.RGBA_INTEGER&&(q===e.UNSIGNED_BYTE&&(at=e.RGBA8UI),q===e.UNSIGNED_SHORT&&(at=e.RGBA16UI),q===e.UNSIGNED_INT&&(at=e.RGBA32UI),q===e.BYTE&&(at=e.RGBA8I),q===e.SHORT&&(at=e.RGBA16I),q===e.INT&&(at=e.RGBA32I)),R===e.RGB&&q===e.UNSIGNED_INT_5_9_9_9_REV&&(at=e.RGB9_E5),R===e.RGBA){const Pt=rt?Ya:ne.getTransfer(nt);q===e.FLOAT&&(at=e.RGBA32F),q===e.HALF_FLOAT&&(at=e.RGBA16F),q===e.UNSIGNED_BYTE&&(at=Pt===he?e.SRGB8_ALPHA8:e.RGBA8),q===e.UNSIGNED_SHORT_4_4_4_4&&(at=e.RGBA4),q===e.UNSIGNED_SHORT_5_5_5_1&&(at=e.RGB5_A1)}return(at===e.R16F||at===e.R32F||at===e.RG16F||at===e.RG32F||at===e.RGBA16F||at===e.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function v(P,R){let q;return P?R===null||R===Di||R===_s?q=e.DEPTH24_STENCIL8:R===Rn?q=e.DEPTH32F_STENCIL8:R===Bs&&(q=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Di||R===_s?q=e.DEPTH_COMPONENT24:R===Rn?q=e.DEPTH_COMPONENT32F:R===Bs&&(q=e.DEPTH_COMPONENT16),q}function T(P,R){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==je&&P.minFilter!==wn?Math.log2(Math.max(R.width,R.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?R.mipmaps.length:1}function b(P){const R=P.target;R.removeEventListener("dispose",b),w(R),R.isVideoTexture&&h.delete(R)}function E(P){const R=P.target;R.removeEventListener("dispose",E),y(R)}function w(P){const R=i.get(P);if(R.__webglInit===void 0)return;const q=P.source,nt=f.get(q);if(nt){const rt=nt[R.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&S(P),Object.keys(nt).length===0&&f.delete(q)}i.remove(P)}function S(P){const R=i.get(P);e.deleteTexture(R.__webglTexture);const q=P.source,nt=f.get(q);delete nt[R.__cacheKey],o.memory.textures--}function y(P){const R=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(R.__webglFramebuffer[nt]))for(let rt=0;rt<R.__webglFramebuffer[nt].length;rt++)e.deleteFramebuffer(R.__webglFramebuffer[nt][rt]);else e.deleteFramebuffer(R.__webglFramebuffer[nt]);R.__webglDepthbuffer&&e.deleteRenderbuffer(R.__webglDepthbuffer[nt])}else{if(Array.isArray(R.__webglFramebuffer))for(let nt=0;nt<R.__webglFramebuffer.length;nt++)e.deleteFramebuffer(R.__webglFramebuffer[nt]);else e.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&e.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&e.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let nt=0;nt<R.__webglColorRenderbuffer.length;nt++)R.__webglColorRenderbuffer[nt]&&e.deleteRenderbuffer(R.__webglColorRenderbuffer[nt]);R.__webglDepthRenderbuffer&&e.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const q=P.textures;for(let nt=0,rt=q.length;nt<rt;nt++){const at=i.get(q[nt]);at.__webglTexture&&(e.deleteTexture(at.__webglTexture),o.memory.textures--),i.remove(q[nt])}i.remove(P)}let A=0;function I(){A=0}function L(){const P=A;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),A+=1,P}function D(P){const R=[];return R.push(P.wrapS),R.push(P.wrapT),R.push(P.wrapR||0),R.push(P.magFilter),R.push(P.minFilter),R.push(P.anisotropy),R.push(P.internalFormat),R.push(P.format),R.push(P.type),R.push(P.generateMipmaps),R.push(P.premultiplyAlpha),R.push(P.flipY),R.push(P.unpackAlignment),R.push(P.colorSpace),R.join()}function F(P,R){const q=i.get(P);if(P.isVideoTexture&&Tt(P),P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){const nt=P.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(q,P,R);return}}n.bindTexture(e.TEXTURE_2D,q.__webglTexture,e.TEXTURE0+R)}function O(P,R){const q=i.get(P);if(P.version>0&&q.__version!==P.version){N(q,P,R);return}n.bindTexture(e.TEXTURE_2D_ARRAY,q.__webglTexture,e.TEXTURE0+R)}function X(P,R){const q=i.get(P);if(P.version>0&&q.__version!==P.version){N(q,P,R);return}n.bindTexture(e.TEXTURE_3D,q.__webglTexture,e.TEXTURE0+R)}function V(P,R){const q=i.get(P);if(P.version>0&&q.__version!==P.version){k(q,P,R);return}n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture,e.TEXTURE0+R)}const tt={[Qo]:e.REPEAT,[Ei]:e.CLAMP_TO_EDGE,[tr]:e.MIRRORED_REPEAT},et={[je]:e.NEAREST,[Tu]:e.NEAREST_MIPMAP_NEAREST,[Ks]:e.NEAREST_MIPMAP_LINEAR,[wn]:e.LINEAR,[to]:e.LINEAR_MIPMAP_NEAREST,[Ti]:e.LINEAR_MIPMAP_LINEAR},U={[Cu]:e.NEVER,[Nu]:e.ALWAYS,[Pu]:e.LESS,[jl]:e.LEQUAL,[Lu]:e.EQUAL,[Uu]:e.GEQUAL,[Du]:e.GREATER,[Iu]:e.NOTEQUAL};function B(P,R){if(R.type===Rn&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===wn||R.magFilter===to||R.magFilter===Ks||R.magFilter===Ti||R.minFilter===wn||R.minFilter===to||R.minFilter===Ks||R.minFilter===Ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(P,e.TEXTURE_WRAP_S,tt[R.wrapS]),e.texParameteri(P,e.TEXTURE_WRAP_T,tt[R.wrapT]),(P===e.TEXTURE_3D||P===e.TEXTURE_2D_ARRAY)&&e.texParameteri(P,e.TEXTURE_WRAP_R,tt[R.wrapR]),e.texParameteri(P,e.TEXTURE_MAG_FILTER,et[R.magFilter]),e.texParameteri(P,e.TEXTURE_MIN_FILTER,et[R.minFilter]),R.compareFunction&&(e.texParameteri(P,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(P,e.TEXTURE_COMPARE_FUNC,U[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===je||R.minFilter!==Ks&&R.minFilter!==Ti||R.type===Rn&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||i.get(R).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");e.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),i.get(R).__currentAnisotropy=R.anisotropy}}}function $(P,R){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,R.addEventListener("dispose",b));const nt=R.source;let rt=f.get(nt);rt===void 0&&(rt={},f.set(nt,rt));const at=D(R);if(at!==P.__cacheKey){rt[at]===void 0&&(rt[at]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,q=!0),rt[at].usedTimes++;const Pt=rt[P.__cacheKey];Pt!==void 0&&(rt[P.__cacheKey].usedTimes--,Pt.usedTimes===0&&S(R)),P.__cacheKey=at,P.__webglTexture=rt[at].texture}return q}function N(P,R,q){let nt=e.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(nt=e.TEXTURE_2D_ARRAY),R.isData3DTexture&&(nt=e.TEXTURE_3D);const rt=$(P,R),at=R.source;n.bindTexture(nt,P.__webglTexture,e.TEXTURE0+q);const Pt=i.get(at);if(at.version!==Pt.__version||rt===!0){n.activeTexture(e.TEXTURE0+q);const pt=ne.getPrimaries(ne.workingColorSpace),yt=R.colorSpace===ri?null:ne.getPrimaries(R.colorSpace),ee=R.colorSpace===ri||pt===yt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,R.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,R.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let ht=g(R.image,!1,s.maxTextureSize);ht=Jt(R,ht);const wt=a.convert(R.format,R.colorSpace),Nt=a.convert(R.type);let kt=M(R.internalFormat,wt,Nt,R.colorSpace,R.isVideoTexture);B(nt,R);let Rt;const te=R.mipmaps,Zt=R.isVideoTexture!==!0,de=Pt.__version===void 0||rt===!0,H=at.dataReady,mt=T(R,ht);if(R.isDepthTexture)kt=v(R.format===gs,R.type),de&&(Zt?n.texStorage2D(e.TEXTURE_2D,1,kt,ht.width,ht.height):n.texImage2D(e.TEXTURE_2D,0,kt,ht.width,ht.height,0,wt,Nt,null));else if(R.isDataTexture)if(te.length>0){Zt&&de&&n.texStorage2D(e.TEXTURE_2D,mt,kt,te[0].width,te[0].height);for(let it=0,ot=te.length;it<ot;it++)Rt=te[it],Zt?H&&n.texSubImage2D(e.TEXTURE_2D,it,0,0,Rt.width,Rt.height,wt,Nt,Rt.data):n.texImage2D(e.TEXTURE_2D,it,kt,Rt.width,Rt.height,0,wt,Nt,Rt.data);R.generateMipmaps=!1}else Zt?(de&&n.texStorage2D(e.TEXTURE_2D,mt,kt,ht.width,ht.height),H&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ht.width,ht.height,wt,Nt,ht.data)):n.texImage2D(e.TEXTURE_2D,0,kt,ht.width,ht.height,0,wt,Nt,ht.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){Zt&&de&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,kt,te[0].width,te[0].height,ht.depth);for(let it=0,ot=te.length;it<ot;it++)if(Rt=te[it],R.format!==pn)if(wt!==null)if(Zt){if(H)if(R.layerUpdates.size>0){const xt=cl(Rt.width,Rt.height,R.format,R.type);for(const _t of R.layerUpdates){const Xt=Rt.data.subarray(_t*xt/Rt.data.BYTES_PER_ELEMENT,(_t+1)*xt/Rt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,it,0,0,_t,Rt.width,Rt.height,1,wt,Xt)}R.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,it,0,0,0,Rt.width,Rt.height,ht.depth,wt,Rt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,it,kt,Rt.width,Rt.height,ht.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Zt?H&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,it,0,0,0,Rt.width,Rt.height,ht.depth,wt,Nt,Rt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,it,kt,Rt.width,Rt.height,ht.depth,0,wt,Nt,Rt.data)}else{Zt&&de&&n.texStorage2D(e.TEXTURE_2D,mt,kt,te[0].width,te[0].height);for(let it=0,ot=te.length;it<ot;it++)Rt=te[it],R.format!==pn?wt!==null?Zt?H&&n.compressedTexSubImage2D(e.TEXTURE_2D,it,0,0,Rt.width,Rt.height,wt,Rt.data):n.compressedTexImage2D(e.TEXTURE_2D,it,kt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Zt?H&&n.texSubImage2D(e.TEXTURE_2D,it,0,0,Rt.width,Rt.height,wt,Nt,Rt.data):n.texImage2D(e.TEXTURE_2D,it,kt,Rt.width,Rt.height,0,wt,Nt,Rt.data)}else if(R.isDataArrayTexture)if(Zt){if(de&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,kt,ht.width,ht.height,ht.depth),H)if(R.layerUpdates.size>0){const it=cl(ht.width,ht.height,R.format,R.type);for(const ot of R.layerUpdates){const xt=ht.data.subarray(ot*it/ht.data.BYTES_PER_ELEMENT,(ot+1)*it/ht.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ot,ht.width,ht.height,1,wt,Nt,xt)}R.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,wt,Nt,ht.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,kt,ht.width,ht.height,ht.depth,0,wt,Nt,ht.data);else if(R.isData3DTexture)Zt?(de&&n.texStorage3D(e.TEXTURE_3D,mt,kt,ht.width,ht.height,ht.depth),H&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,wt,Nt,ht.data)):n.texImage3D(e.TEXTURE_3D,0,kt,ht.width,ht.height,ht.depth,0,wt,Nt,ht.data);else if(R.isFramebufferTexture){if(de)if(Zt)n.texStorage2D(e.TEXTURE_2D,mt,kt,ht.width,ht.height);else{let it=ht.width,ot=ht.height;for(let xt=0;xt<mt;xt++)n.texImage2D(e.TEXTURE_2D,xt,kt,it,ot,0,wt,Nt,null),it>>=1,ot>>=1}}else if(te.length>0){if(Zt&&de){const it=Ct(te[0]);n.texStorage2D(e.TEXTURE_2D,mt,kt,it.width,it.height)}for(let it=0,ot=te.length;it<ot;it++)Rt=te[it],Zt?H&&n.texSubImage2D(e.TEXTURE_2D,it,0,0,wt,Nt,Rt):n.texImage2D(e.TEXTURE_2D,it,kt,wt,Nt,Rt);R.generateMipmaps=!1}else if(Zt){if(de){const it=Ct(ht);n.texStorage2D(e.TEXTURE_2D,mt,kt,it.width,it.height)}H&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,wt,Nt,ht)}else n.texImage2D(e.TEXTURE_2D,0,kt,wt,Nt,ht);m(R)&&p(nt),Pt.__version=at.version,R.onUpdate&&R.onUpdate(R)}P.__version=R.version}function k(P,R,q){if(R.image.length!==6)return;const nt=$(P,R),rt=R.source;n.bindTexture(e.TEXTURE_CUBE_MAP,P.__webglTexture,e.TEXTURE0+q);const at=i.get(rt);if(rt.version!==at.__version||nt===!0){n.activeTexture(e.TEXTURE0+q);const Pt=ne.getPrimaries(ne.workingColorSpace),pt=R.colorSpace===ri?null:ne.getPrimaries(R.colorSpace),yt=R.colorSpace===ri||Pt===pt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,R.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,R.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const ee=R.isCompressedTexture||R.image[0].isCompressedTexture,ht=R.image[0]&&R.image[0].isDataTexture,wt=[];for(let ot=0;ot<6;ot++)!ee&&!ht?wt[ot]=g(R.image[ot],!0,s.maxCubemapSize):wt[ot]=ht?R.image[ot].image:R.image[ot],wt[ot]=Jt(R,wt[ot]);const Nt=wt[0],kt=a.convert(R.format,R.colorSpace),Rt=a.convert(R.type),te=M(R.internalFormat,kt,Rt,R.colorSpace),Zt=R.isVideoTexture!==!0,de=at.__version===void 0||nt===!0,H=rt.dataReady;let mt=T(R,Nt);B(e.TEXTURE_CUBE_MAP,R);let it;if(ee){Zt&&de&&n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,te,Nt.width,Nt.height);for(let ot=0;ot<6;ot++){it=wt[ot].mipmaps;for(let xt=0;xt<it.length;xt++){const _t=it[xt];R.format!==pn?kt!==null?Zt?H&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt,0,0,_t.width,_t.height,kt,_t.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt,te,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Zt?H&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt,0,0,_t.width,_t.height,kt,Rt,_t.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt,te,_t.width,_t.height,0,kt,Rt,_t.data)}}}else{if(it=R.mipmaps,Zt&&de){it.length>0&&mt++;const ot=Ct(wt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,te,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(ht){Zt?H&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,wt[ot].width,wt[ot].height,kt,Rt,wt[ot].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,te,wt[ot].width,wt[ot].height,0,kt,Rt,wt[ot].data);for(let xt=0;xt<it.length;xt++){const Xt=it[xt].image[ot].image;Zt?H&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt+1,0,0,Xt.width,Xt.height,kt,Rt,Xt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt+1,te,Xt.width,Xt.height,0,kt,Rt,Xt.data)}}else{Zt?H&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,kt,Rt,wt[ot]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,te,kt,Rt,wt[ot]);for(let xt=0;xt<it.length;xt++){const _t=it[xt];Zt?H&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt+1,0,0,kt,Rt,_t.image[ot]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt+1,te,kt,Rt,_t.image[ot])}}}m(R)&&p(e.TEXTURE_CUBE_MAP),at.__version=rt.version,R.onUpdate&&R.onUpdate(R)}P.__version=R.version}function J(P,R,q,nt,rt,at){const Pt=a.convert(q.format,q.colorSpace),pt=a.convert(q.type),yt=M(q.internalFormat,Pt,pt,q.colorSpace),ee=i.get(R),ht=i.get(q);if(ht.__renderTarget=R,!ee.__hasExternalTextures){const wt=Math.max(1,R.width>>at),Nt=Math.max(1,R.height>>at);rt===e.TEXTURE_3D||rt===e.TEXTURE_2D_ARRAY?n.texImage3D(rt,at,yt,wt,Nt,R.depth,0,Pt,pt,null):n.texImage2D(rt,at,yt,wt,Nt,0,Pt,pt,null)}n.bindFramebuffer(e.FRAMEBUFFER,P),Ot(R)?r.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,nt,rt,ht.__webglTexture,0,zt(R)):(rt===e.TEXTURE_2D||rt>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,nt,rt,ht.__webglTexture,at),n.bindFramebuffer(e.FRAMEBUFFER,null)}function K(P,R,q){if(e.bindRenderbuffer(e.RENDERBUFFER,P),R.depthBuffer){const nt=R.depthTexture,rt=nt&&nt.isDepthTexture?nt.type:null,at=v(R.stencilBuffer,rt),Pt=R.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,pt=zt(R);Ot(R)?r.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,pt,at,R.width,R.height):q?e.renderbufferStorageMultisample(e.RENDERBUFFER,pt,at,R.width,R.height):e.renderbufferStorage(e.RENDERBUFFER,at,R.width,R.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Pt,e.RENDERBUFFER,P)}else{const nt=R.textures;for(let rt=0;rt<nt.length;rt++){const at=nt[rt],Pt=a.convert(at.format,at.colorSpace),pt=a.convert(at.type),yt=M(at.internalFormat,Pt,pt,at.colorSpace),ee=zt(R);q&&Ot(R)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,ee,yt,R.width,R.height):Ot(R)?r.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ee,yt,R.width,R.height):e.renderbufferStorage(e.RENDERBUFFER,yt,R.width,R.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Q(P,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,P),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=i.get(R.depthTexture);nt.__renderTarget=R,(!nt.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),F(R.depthTexture,0);const rt=nt.__webglTexture,at=zt(R);if(R.depthTexture.format===hs)Ot(R)?r.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,rt,0,at):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,rt,0);else if(R.depthTexture.format===gs)Ot(R)?r.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,rt,0,at):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function lt(P){const R=i.get(P),q=P.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==P.depthTexture){const nt=P.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),nt){const rt=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,nt.removeEventListener("dispose",rt)};nt.addEventListener("dispose",rt),R.__depthDisposeCallback=rt}R.__boundDepthTexture=nt}if(P.depthTexture&&!R.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Q(R.__webglFramebuffer,P)}else if(q){R.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(n.bindFramebuffer(e.FRAMEBUFFER,R.__webglFramebuffer[nt]),R.__webglDepthbuffer[nt]===void 0)R.__webglDepthbuffer[nt]=e.createRenderbuffer(),K(R.__webglDepthbuffer[nt],P,!1);else{const rt=P.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,at=R.__webglDepthbuffer[nt];e.bindRenderbuffer(e.RENDERBUFFER,at),e.framebufferRenderbuffer(e.FRAMEBUFFER,rt,e.RENDERBUFFER,at)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=e.createRenderbuffer(),K(R.__webglDepthbuffer,P,!1);else{const nt=P.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,rt=R.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,rt),e.framebufferRenderbuffer(e.FRAMEBUFFER,nt,e.RENDERBUFFER,rt)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ft(P,R,q){const nt=i.get(P);R!==void 0&&J(nt.__webglFramebuffer,P,P.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),q!==void 0&&lt(P)}function bt(P){const R=P.texture,q=i.get(P),nt=i.get(R);P.addEventListener("dispose",E);const rt=P.textures,at=P.isWebGLCubeRenderTarget===!0,Pt=rt.length>1;if(Pt||(nt.__webglTexture===void 0&&(nt.__webglTexture=e.createTexture()),nt.__version=R.version,o.memory.textures++),at){q.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(R.mipmaps&&R.mipmaps.length>0){q.__webglFramebuffer[pt]=[];for(let yt=0;yt<R.mipmaps.length;yt++)q.__webglFramebuffer[pt][yt]=e.createFramebuffer()}else q.__webglFramebuffer[pt]=e.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){q.__webglFramebuffer=[];for(let pt=0;pt<R.mipmaps.length;pt++)q.__webglFramebuffer[pt]=e.createFramebuffer()}else q.__webglFramebuffer=e.createFramebuffer();if(Pt)for(let pt=0,yt=rt.length;pt<yt;pt++){const ee=i.get(rt[pt]);ee.__webglTexture===void 0&&(ee.__webglTexture=e.createTexture(),o.memory.textures++)}if(P.samples>0&&Ot(P)===!1){q.__webglMultisampledFramebuffer=e.createFramebuffer(),q.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let pt=0;pt<rt.length;pt++){const yt=rt[pt];q.__webglColorRenderbuffer[pt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,q.__webglColorRenderbuffer[pt]);const ee=a.convert(yt.format,yt.colorSpace),ht=a.convert(yt.type),wt=M(yt.internalFormat,ee,ht,yt.colorSpace,P.isXRRenderTarget===!0),Nt=zt(P);e.renderbufferStorageMultisample(e.RENDERBUFFER,Nt,wt,P.width,P.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+pt,e.RENDERBUFFER,q.__webglColorRenderbuffer[pt])}e.bindRenderbuffer(e.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=e.createRenderbuffer(),K(q.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(at){n.bindTexture(e.TEXTURE_CUBE_MAP,nt.__webglTexture),B(e.TEXTURE_CUBE_MAP,R);for(let pt=0;pt<6;pt++)if(R.mipmaps&&R.mipmaps.length>0)for(let yt=0;yt<R.mipmaps.length;yt++)J(q.__webglFramebuffer[pt][yt],P,R,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,yt);else J(q.__webglFramebuffer[pt],P,R,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(R)&&p(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Pt){for(let pt=0,yt=rt.length;pt<yt;pt++){const ee=rt[pt],ht=i.get(ee);n.bindTexture(e.TEXTURE_2D,ht.__webglTexture),B(e.TEXTURE_2D,ee),J(q.__webglFramebuffer,P,ee,e.COLOR_ATTACHMENT0+pt,e.TEXTURE_2D,0),m(ee)&&p(e.TEXTURE_2D)}n.unbindTexture()}else{let pt=e.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(pt=P.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(pt,nt.__webglTexture),B(pt,R),R.mipmaps&&R.mipmaps.length>0)for(let yt=0;yt<R.mipmaps.length;yt++)J(q.__webglFramebuffer[yt],P,R,e.COLOR_ATTACHMENT0,pt,yt);else J(q.__webglFramebuffer,P,R,e.COLOR_ATTACHMENT0,pt,0);m(R)&&p(pt),n.unbindTexture()}P.depthBuffer&&lt(P)}function St(P){const R=P.textures;for(let q=0,nt=R.length;q<nt;q++){const rt=R[q];if(m(rt)){const at=x(P),Pt=i.get(rt).__webglTexture;n.bindTexture(at,Pt),p(at),n.unbindTexture()}}}const Kt=[],z=[];function fe(P){if(P.samples>0){if(Ot(P)===!1){const R=P.textures,q=P.width,nt=P.height;let rt=e.COLOR_BUFFER_BIT;const at=P.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Pt=i.get(P),pt=R.length>1;if(pt)for(let yt=0;yt<R.length;yt++)n.bindFramebuffer(e.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Pt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let yt=0;yt<R.length;yt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(rt|=e.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(rt|=e.STENCIL_BUFFER_BIT)),pt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Pt.__webglColorRenderbuffer[yt]);const ee=i.get(R[yt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ee,0)}e.blitFramebuffer(0,0,q,nt,0,0,q,nt,rt,e.NEAREST),c===!0&&(Kt.length=0,z.length=0,Kt.push(e.COLOR_ATTACHMENT0+yt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Kt.push(at),z.push(at),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,z)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Kt))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),pt)for(let yt=0;yt<R.length;yt++){n.bindFramebuffer(e.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.RENDERBUFFER,Pt.__webglColorRenderbuffer[yt]);const ee=i.get(R[yt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Pt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+yt,e.TEXTURE_2D,ee,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const R=P.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[R])}}}function zt(P){return Math.min(s.maxSamples,P.samples)}function Ot(P){const R=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Tt(P){const R=o.render.frame;h.get(P)!==R&&(h.set(P,R),P.update())}function Jt(P,R){const q=P.colorSpace,nt=P.format,rt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==ys&&q!==ri&&(ne.getTransfer(q)===he?(nt!==pn||rt!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),R}function Ct(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=I,this.setTexture2D=F,this.setTexture2DArray=O,this.setTexture3D=X,this.setTextureCube=V,this.rebindTextures=ft,this.setupRenderTarget=bt,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Ot}function Vm(e,t){function n(i,s=ri){let a;const o=ne.getTransfer(s);if(i===Xn)return e.UNSIGNED_BYTE;if(i===Fr)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Or)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Hl)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===kl)return e.BYTE;if(i===Vl)return e.SHORT;if(i===Bs)return e.UNSIGNED_SHORT;if(i===Nr)return e.INT;if(i===Di)return e.UNSIGNED_INT;if(i===Rn)return e.FLOAT;if(i===Hs)return e.HALF_FLOAT;if(i===Gl)return e.ALPHA;if(i===Wl)return e.RGB;if(i===pn)return e.RGBA;if(i===Xl)return e.LUMINANCE;if(i===Yl)return e.LUMINANCE_ALPHA;if(i===hs)return e.DEPTH_COMPONENT;if(i===gs)return e.DEPTH_STENCIL;if(i===zr)return e.RED;if(i===Br)return e.RED_INTEGER;if(i===ql)return e.RG;if(i===kr)return e.RG_INTEGER;if(i===Vr)return e.RGBA_INTEGER;if(i===wa||i===Ra||i===Aa||i===Ca)if(o===he)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===wa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ra)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Aa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ca)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===wa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ra)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Aa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ca)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===er||i===nr||i===ir||i===sr)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===er)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nr)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ir)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sr)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ar||i===or||i===rr)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===ar||i===or)return o===he?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===rr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===cr||i===lr||i===hr||i===ur||i===fr||i===dr||i===pr||i===mr||i===_r||i===gr||i===Mr||i===xr||i===vr||i===yr)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===cr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ur)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===dr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_r)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===vr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===yr)return o===he?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pa||i===Sr||i===br)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Pa)return o===he?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Sr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===br)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$l||i===Er||i===Tr||i===wr)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Pa)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Er)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Tr)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wr)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===_s?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}class Hm extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class rs extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gm={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,o=null;const r=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const g of t.hand.values()){const m=n.getJointPose(g,i),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,_=.005;l.inputState.pinching&&f>d+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));r!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(r.matrix.fromArray(s.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,s.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(s.linearVelocity)):r.hasLinearVelocity=!1,s.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(s.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(Gm)))}return r!==null&&(r.visible=s!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new rs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const Wm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ym{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){const s=new Be,a=t.properties.get(s);a.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Yn({vertexShader:Wm,fragmentShader:Xm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new sn(new Ws(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qm extends Fi{constructor(t,n){super();const i=this;let s=null,a=1,o=null,r="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,_=null;const g=new Ym,m=n.getContextAttributes();let p=null,x=null;const M=[],v=[],T=new $t;let b=null;const E=new nn;E.viewport=new be;const w=new nn;w.viewport=new be;const S=[E,w],y=new Hm;let A=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let k=M[N];return k===void 0&&(k=new Co,M[N]=k),k.getTargetRaySpace()},this.getControllerGrip=function(N){let k=M[N];return k===void 0&&(k=new Co,M[N]=k),k.getGripSpace()},this.getHand=function(N){let k=M[N];return k===void 0&&(k=new Co,M[N]=k),k.getHandSpace()};function L(N){const k=v.indexOf(N.inputSource);if(k===-1)return;const J=M[k];J!==void 0&&(J.update(N.inputSource,N.frame,l||o),J.dispatchEvent({type:N.type,data:N.inputSource}))}function D(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",F);for(let N=0;N<M.length;N++){const k=v[N];k!==null&&(v[N]=null,M[N].disconnect(k))}A=null,I=null,g.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,x=null,$.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){a=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){r=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",D),s.addEventListener("inputsourceschange",F),m.xrCompatible!==!0&&await n.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const k={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(s,n,k),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Ii(d.framebufferWidth,d.framebufferHeight,{format:pn,type:Xn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let k=null,J=null,K=null;m.depth&&(K=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,k=m.stencil?gs:hs,J=m.stencil?_s:Di);const Q={colorFormat:n.RGBA8,depthFormat:K,scaleFactor:a};u=new XRWebGLBinding(s,n),f=u.createProjectionLayer(Q),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Ii(f.textureWidth,f.textureHeight,{format:pn,type:Xn,depthTexture:new hh(f.textureWidth,f.textureHeight,J,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(r),$.setContext(s),$.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function F(N){for(let k=0;k<N.removed.length;k++){const J=N.removed[k],K=v.indexOf(J);K>=0&&(v[K]=null,M[K].disconnect(J))}for(let k=0;k<N.added.length;k++){const J=N.added[k];let K=v.indexOf(J);if(K===-1){for(let lt=0;lt<M.length;lt++)if(lt>=v.length){v.push(J),K=lt;break}else if(v[lt]===null){v[lt]=J,K=lt;break}if(K===-1)break}const Q=M[K];Q&&Q.connect(J)}}const O=new Y,X=new Y;function V(N,k,J){O.setFromMatrixPosition(k.matrixWorld),X.setFromMatrixPosition(J.matrixWorld);const K=O.distanceTo(X),Q=k.projectionMatrix.elements,lt=J.projectionMatrix.elements,ft=Q[14]/(Q[10]-1),bt=Q[14]/(Q[10]+1),St=(Q[9]+1)/Q[5],Kt=(Q[9]-1)/Q[5],z=(Q[8]-1)/Q[0],fe=(lt[8]+1)/lt[0],zt=ft*z,Ot=ft*fe,Tt=K/(-z+fe),Jt=Tt*-z;if(k.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(Jt),N.translateZ(Tt),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),Q[10]===-1)N.projectionMatrix.copy(k.projectionMatrix),N.projectionMatrixInverse.copy(k.projectionMatrixInverse);else{const Ct=ft+Tt,P=bt+Tt,R=zt-Jt,q=Ot+(K-Jt),nt=St*bt/P*Ct,rt=Kt*bt/P*Ct;N.projectionMatrix.makePerspective(R,q,nt,rt,Ct,P),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function tt(N,k){k===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(k.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;let k=N.near,J=N.far;g.texture!==null&&(g.depthNear>0&&(k=g.depthNear),g.depthFar>0&&(J=g.depthFar)),y.near=w.near=E.near=k,y.far=w.far=E.far=J,(A!==y.near||I!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,I=y.far),E.layers.mask=N.layers.mask|2,w.layers.mask=N.layers.mask|4,y.layers.mask=E.layers.mask|w.layers.mask;const K=N.parent,Q=y.cameras;tt(y,K);for(let lt=0;lt<Q.length;lt++)tt(Q[lt],K);Q.length===2?V(y,E,w):y.projectionMatrix.copy(E.projectionMatrix),et(N,y,K)};function et(N,k,J){J===null?N.matrix.copy(k.matrixWorld):(N.matrix.copy(J.matrixWorld),N.matrix.invert(),N.matrix.multiply(k.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(k.projectionMatrix),N.projectionMatrixInverse.copy(k.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=Rr*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(N){c=N,f!==null&&(f.fixedFoveation=N),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=N)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(y)};let U=null;function B(N,k){if(h=k.getViewerPose(l||o),_=k,h!==null){const J=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let K=!1;J.length!==y.cameras.length&&(y.cameras.length=0,K=!0);for(let lt=0;lt<J.length;lt++){const ft=J[lt];let bt=null;if(d!==null)bt=d.getViewport(ft);else{const Kt=u.getViewSubImage(f,ft);bt=Kt.viewport,lt===0&&(t.setRenderTargetTextures(x,Kt.colorTexture,f.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(x))}let St=S[lt];St===void 0&&(St=new nn,St.layers.enable(lt),St.viewport=new be,S[lt]=St),St.matrix.fromArray(ft.transform.matrix),St.matrix.decompose(St.position,St.quaternion,St.scale),St.projectionMatrix.fromArray(ft.projectionMatrix),St.projectionMatrixInverse.copy(St.projectionMatrix).invert(),St.viewport.set(bt.x,bt.y,bt.width,bt.height),lt===0&&(y.matrix.copy(St.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),K===!0&&y.cameras.push(St)}const Q=s.enabledFeatures;if(Q&&Q.includes("depth-sensing")){const lt=u.getDepthInformation(J[0]);lt&&lt.isValid&&lt.texture&&g.init(t,lt,s.renderState)}}for(let J=0;J<M.length;J++){const K=v[J],Q=M[J];K!==null&&Q!==void 0&&Q.update(K,k,l||o)}U&&U(N,k),k.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:k}),_=null}const $=new ch;$.setAnimationLoop(B),this.setAnimationLoop=function(N){U=N},this.dispose=function(){}}}const vi=new Cn,$m=new me;function Zm(e,t){function n(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ah(e)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),u(m,p)):p.isMeshPhongMaterial?(a(m,p),h(m,p)):p.isMeshStandardMaterial?(a(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(a(m,p),_(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),g(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&r(m,p)):p.isPointsMaterial?c(m,p,x,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=t.get(p),M=x.envMap,v=x.envMapRotation;M&&(m.envMap.value=M,vi.copy(v),vi.x*=-1,vi.y*=-1,vi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),m.envMapRotation.value.setFromMatrix4($m.makeRotationFromEuler(vi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform))}function r(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,n(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const x=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function jm(e,t,n,i){let s={},a={},o=[];const r=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const v=M.program;i.uniformBlockBinding(x,v)}function l(x,M){let v=s[x.id];v===void 0&&(_(x),v=h(x),s[x.id]=v,x.addEventListener("dispose",m));const T=M.program;i.updateUBOMapping(x,T);const b=t.render.frame;a[x.id]!==b&&(f(x),a[x.id]=b)}function h(x){const M=u();x.__bindingPointIndex=M;const v=e.createBuffer(),T=x.__size,b=x.usage;return e.bindBuffer(e.UNIFORM_BUFFER,v),e.bufferData(e.UNIFORM_BUFFER,T,b),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,v),v}function u(){for(let x=0;x<r;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=s[x.id],v=x.uniforms,T=x.__cache;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let b=0,E=v.length;b<E;b++){const w=Array.isArray(v[b])?v[b]:[v[b]];for(let S=0,y=w.length;S<y;S++){const A=w[S];if(d(A,b,S,T)===!0){const I=A.__offset,L=Array.isArray(A.value)?A.value:[A.value];let D=0;for(let F=0;F<L.length;F++){const O=L[F],X=g(O);typeof O=="number"||typeof O=="boolean"?(A.__data[0]=O,e.bufferSubData(e.UNIFORM_BUFFER,I+D,A.__data)):O.isMatrix3?(A.__data[0]=O.elements[0],A.__data[1]=O.elements[1],A.__data[2]=O.elements[2],A.__data[3]=0,A.__data[4]=O.elements[3],A.__data[5]=O.elements[4],A.__data[6]=O.elements[5],A.__data[7]=0,A.__data[8]=O.elements[6],A.__data[9]=O.elements[7],A.__data[10]=O.elements[8],A.__data[11]=0):(O.toArray(A.__data,D),D+=X.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,I,A.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(x,M,v,T){const b=x.value,E=M+"_"+v;if(T[E]===void 0)return typeof b=="number"||typeof b=="boolean"?T[E]=b:T[E]=b.clone(),!0;{const w=T[E];if(typeof b=="number"||typeof b=="boolean"){if(w!==b)return T[E]=b,!0}else if(w.equals(b)===!1)return w.copy(b),!0}return!1}function _(x){const M=x.uniforms;let v=0;const T=16;for(let E=0,w=M.length;E<w;E++){const S=Array.isArray(M[E])?M[E]:[M[E]];for(let y=0,A=S.length;y<A;y++){const I=S[y],L=Array.isArray(I.value)?I.value:[I.value];for(let D=0,F=L.length;D<F;D++){const O=L[D],X=g(O),V=v%T,tt=V%X.boundary,et=V+tt;v+=tt,et!==0&&T-et<X.storage&&(v+=T-et),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=X.storage}}}const b=v%T;return b>0&&(v+=T-b),x.__size=v,x.__cache={},this}function g(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),e.deleteBuffer(s[M.id]),delete s[M.id],delete a[M.id]}function p(){for(const x in s)e.deleteBuffer(s[x]);o=[],s={},a={}}return{bind:c,update:l,dispose:p}}class Km{constructor(t={}){const{canvas:n=zu(),context:i=null,depth:s=!0,stencil:a=!1,alpha:o=!1,antialias:r=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const x=[],M=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=en,this.toneMapping=hi,this.toneMappingExposure=1;const v=this;let T=!1,b=0,E=0,w=null,S=-1,y=null;const A=new be,I=new be;let L=null;const D=new Qt(0);let F=0,O=n.width,X=n.height,V=1,tt=null,et=null;const U=new be(0,0,O,X),B=new be(0,0,O,X);let $=!1;const N=new Gr;let k=!1,J=!1;const K=new me,Q=new me,lt=new Y,ft=new be,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let St=!1;function Kt(){return w===null?V:1}let z=i;function fe(C,G){return n.getContext(C,G)}try{const C={alpha:!0,depth:s,stencil:a,antialias:r,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ur}`),n.addEventListener("webglcontextlost",ot,!1),n.addEventListener("webglcontextrestored",xt,!1),n.addEventListener("webglcontextcreationerror",_t,!1),z===null){const G="webgl2";if(z=fe(G,C),z===null)throw fe(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let zt,Ot,Tt,Jt,Ct,P,R,q,nt,rt,at,Pt,pt,yt,ee,ht,wt,Nt,kt,Rt,te,Zt,de,H;function mt(){zt=new np(z),zt.init(),Zt=new Vm(z,zt),Ot=new j0(z,zt,t,Zt),Tt=new zm(z,zt),Ot.reverseDepthBuffer&&f&&Tt.buffers.depth.setReversed(!0),Jt=new ap(z),Ct=new bm,P=new km(z,zt,Tt,Ct,Ot,Zt,Jt),R=new J0(v),q=new ep(v),nt=new ff(z),de=new $0(z,nt),rt=new ip(z,nt,Jt,de),at=new rp(z,rt,nt,Jt),kt=new op(z,Ot,P),ht=new K0(Ct),Pt=new Sm(v,R,q,zt,Ot,de,ht),pt=new Zm(v,Ct),yt=new Tm,ee=new Lm(zt),Nt=new q0(v,R,q,Tt,at,d,c),wt=new Fm(v,at,Ot),H=new jm(z,Jt,Ot,Tt),Rt=new Z0(z,zt,Jt),te=new sp(z,zt,Jt),Jt.programs=Pt.programs,v.capabilities=Ot,v.extensions=zt,v.properties=Ct,v.renderLists=yt,v.shadowMap=wt,v.state=Tt,v.info=Jt}mt();const it=new qm(v,z);this.xr=it,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const C=zt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=zt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(C){C!==void 0&&(V=C,this.setSize(O,X,!1))},this.getSize=function(C){return C.set(O,X)},this.setSize=function(C,G,Z=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,X=G,n.width=Math.floor(C*V),n.height=Math.floor(G*V),Z===!0&&(n.style.width=C+"px",n.style.height=G+"px"),this.setViewport(0,0,C,G)},this.getDrawingBufferSize=function(C){return C.set(O*V,X*V).floor()},this.setDrawingBufferSize=function(C,G,Z){O=C,X=G,V=Z,n.width=Math.floor(C*Z),n.height=Math.floor(G*Z),this.setViewport(0,0,C,G)},this.getCurrentViewport=function(C){return C.copy(A)},this.getViewport=function(C){return C.copy(U)},this.setViewport=function(C,G,Z,j){C.isVector4?U.set(C.x,C.y,C.z,C.w):U.set(C,G,Z,j),Tt.viewport(A.copy(U).multiplyScalar(V).round())},this.getScissor=function(C){return C.copy(B)},this.setScissor=function(C,G,Z,j){C.isVector4?B.set(C.x,C.y,C.z,C.w):B.set(C,G,Z,j),Tt.scissor(I.copy(B).multiplyScalar(V).round())},this.getScissorTest=function(){return $},this.setScissorTest=function(C){Tt.setScissorTest($=C)},this.setOpaqueSort=function(C){tt=C},this.setTransparentSort=function(C){et=C},this.getClearColor=function(C){return C.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(C=!0,G=!0,Z=!0){let j=0;if(C){let W=!1;if(w!==null){const ut=w.texture.format;W=ut===Vr||ut===kr||ut===Br}if(W){const ut=w.texture.type,gt=ut===Xn||ut===Di||ut===Bs||ut===_s||ut===Fr||ut===Or,Lt=Nt.getClearColor(),Dt=Nt.getClearAlpha(),Ht=Lt.r,Yt=Lt.g,It=Lt.b;gt?(_[0]=Ht,_[1]=Yt,_[2]=It,_[3]=Dt,z.clearBufferuiv(z.COLOR,0,_)):(g[0]=Ht,g[1]=Yt,g[2]=It,g[3]=Dt,z.clearBufferiv(z.COLOR,0,g))}else j|=z.COLOR_BUFFER_BIT}G&&(j|=z.DEPTH_BUFFER_BIT),Z&&(j|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ot,!1),n.removeEventListener("webglcontextrestored",xt,!1),n.removeEventListener("webglcontextcreationerror",_t,!1),yt.dispose(),ee.dispose(),Ct.dispose(),R.dispose(),q.dispose(),at.dispose(),de.dispose(),H.dispose(),Pt.dispose(),it.dispose(),it.removeEventListener("sessionstart",nc),it.removeEventListener("sessionend",ic),pi.stop()};function ot(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=Jt.autoReset,G=wt.enabled,Z=wt.autoUpdate,j=wt.needsUpdate,W=wt.type;mt(),Jt.autoReset=C,wt.enabled=G,wt.autoUpdate=Z,wt.needsUpdate=j,wt.type=W}function _t(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Xt(C){const G=C.target;G.removeEventListener("dispose",Xt),Se(G)}function Se(C){Ie(C),Ct.remove(C)}function Ie(C){const G=Ct.get(C).programs;G!==void 0&&(G.forEach(function(Z){Pt.releaseProgram(Z)}),C.isShaderMaterial&&Pt.releaseShaderCache(C))}this.renderBufferDirect=function(C,G,Z,j,W,ut){G===null&&(G=bt);const gt=W.isMesh&&W.matrixWorld.determinant()<0,Lt=Xh(C,G,Z,j,W);Tt.setMaterial(j,gt);let Dt=Z.index,Ht=1;if(j.wireframe===!0){if(Dt=rt.getWireframeAttribute(Z),Dt===void 0)return;Ht=2}const Yt=Z.drawRange,It=Z.attributes.position;let ie=Yt.start*Ht,pe=(Yt.start+Yt.count)*Ht;ut!==null&&(ie=Math.max(ie,ut.start*Ht),pe=Math.min(pe,(ut.start+ut.count)*Ht)),Dt!==null?(ie=Math.max(ie,0),pe=Math.min(pe,Dt.count)):It!=null&&(ie=Math.max(ie,0),pe=Math.min(pe,It.count));const _e=pe-ie;if(_e<0||_e===1/0)return;de.setup(W,j,Lt,Z,Dt);let Ve,ae=Rt;if(Dt!==null&&(Ve=nt.get(Dt),ae=te,ae.setIndex(Ve)),W.isMesh)j.wireframe===!0?(Tt.setLineWidth(j.wireframeLinewidth*Kt()),ae.setMode(z.LINES)):ae.setMode(z.TRIANGLES);else if(W.isLine){let Ut=j.linewidth;Ut===void 0&&(Ut=1),Tt.setLineWidth(Ut*Kt()),W.isLineSegments?ae.setMode(z.LINES):W.isLineLoop?ae.setMode(z.LINE_LOOP):ae.setMode(z.LINE_STRIP)}else W.isPoints?ae.setMode(z.POINTS):W.isSprite&&ae.setMode(z.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)ae.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))ae.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ut=W._multiDrawStarts,Un=W._multiDrawCounts,oe=W._multiDrawCount,cn=Dt?nt.get(Dt).bytesPerElement:1,Hi=Ct.get(j).currentProgram.getUniforms();for(let qe=0;qe<oe;qe++)Hi.setValue(z,"_gl_DrawID",qe),ae.render(Ut[qe]/cn,Un[qe])}else if(W.isInstancedMesh)ae.renderInstances(ie,_e,W.count);else if(Z.isInstancedBufferGeometry){const Ut=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Un=Math.min(Z.instanceCount,Ut);ae.renderInstances(ie,_e,Un)}else ae.render(ie,_e)};function ce(C,G,Z){C.transparent===!0&&C.side===Tn&&C.forceSinglePass===!1?(C.side=Xe,C.needsUpdate=!0,js(C,G,Z),C.side=ui,C.needsUpdate=!0,js(C,G,Z),C.side=Tn):js(C,G,Z)}this.compile=function(C,G,Z=null){Z===null&&(Z=C),p=ee.get(Z),p.init(G),M.push(p),Z.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),C!==Z&&C.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();const j=new Set;return C.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ut=W.material;if(ut)if(Array.isArray(ut))for(let gt=0;gt<ut.length;gt++){const Lt=ut[gt];ce(Lt,Z,W),j.add(Lt)}else ce(ut,Z,W),j.add(ut)}),M.pop(),p=null,j},this.compileAsync=function(C,G,Z=null){const j=this.compile(C,G,Z);return new Promise(W=>{function ut(){if(j.forEach(function(gt){Ct.get(gt).currentProgram.isReady()&&j.delete(gt)}),j.size===0){W(C);return}setTimeout(ut,10)}zt.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let rn=null;function In(C){rn&&rn(C)}function nc(){pi.stop()}function ic(){pi.start()}const pi=new ch;pi.setAnimationLoop(In),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(C){rn=C,it.setAnimationLoop(C),C===null?pi.stop():pi.start()},it.addEventListener("sessionstart",nc),it.addEventListener("sessionend",ic),this.render=function(C,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(G),G=it.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,G,w),p=ee.get(C,M.length),p.init(G),M.push(p),Q.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),N.setFromProjectionMatrix(Q),J=this.localClippingEnabled,k=ht.init(this.clippingPlanes,J),m=yt.get(C,x.length),m.init(),x.push(m),it.enabled===!0&&it.isPresenting===!0){const ut=v.xr.getDepthSensingMesh();ut!==null&&Qa(ut,G,-1/0,v.sortObjects)}Qa(C,G,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(tt,et),St=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,St&&Nt.addToRenderList(m,C),this.info.render.frame++,k===!0&&ht.beginShadows();const Z=p.state.shadowsArray;wt.render(Z,C,G),k===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,W=m.transmissive;if(p.setupLights(),G.isArrayCamera){const ut=G.cameras;if(W.length>0)for(let gt=0,Lt=ut.length;gt<Lt;gt++){const Dt=ut[gt];ac(j,W,C,Dt)}St&&Nt.render(C);for(let gt=0,Lt=ut.length;gt<Lt;gt++){const Dt=ut[gt];sc(m,C,Dt,Dt.viewport)}}else W.length>0&&ac(j,W,C,G),St&&Nt.render(C),sc(m,C,G);w!==null&&(P.updateMultisampleRenderTarget(w),P.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(v,C,G),de.resetDefaultState(),S=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],k===!0&&ht.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Qa(C,G,Z,j){if(C.visible===!1)return;if(C.layers.test(G.layers)){if(C.isGroup)Z=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(G);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||N.intersectsSprite(C)){j&&ft.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Q);const gt=at.update(C),Lt=C.material;Lt.visible&&m.push(C,gt,Lt,Z,ft.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||N.intersectsObject(C))){const gt=at.update(C),Lt=C.material;if(j&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ft.copy(C.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),ft.copy(gt.boundingSphere.center)),ft.applyMatrix4(C.matrixWorld).applyMatrix4(Q)),Array.isArray(Lt)){const Dt=gt.groups;for(let Ht=0,Yt=Dt.length;Ht<Yt;Ht++){const It=Dt[Ht],ie=Lt[It.materialIndex];ie&&ie.visible&&m.push(C,gt,ie,Z,ft.z,It)}}else Lt.visible&&m.push(C,gt,Lt,Z,ft.z,null)}}const ut=C.children;for(let gt=0,Lt=ut.length;gt<Lt;gt++)Qa(ut[gt],G,Z,j)}function sc(C,G,Z,j){const W=C.opaque,ut=C.transmissive,gt=C.transparent;p.setupLightsView(Z),k===!0&&ht.setGlobalState(v.clippingPlanes,Z),j&&Tt.viewport(A.copy(j)),W.length>0&&Zs(W,G,Z),ut.length>0&&Zs(ut,G,Z),gt.length>0&&Zs(gt,G,Z),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function ac(C,G,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Ii(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?Hs:Xn,minFilter:Ti,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const ut=p.state.transmissionRenderTarget[j.id],gt=j.viewport||A;ut.setSize(gt.z,gt.w);const Lt=v.getRenderTarget();v.setRenderTarget(ut),v.getClearColor(D),F=v.getClearAlpha(),F<1&&v.setClearColor(16777215,.5),v.clear(),St&&Nt.render(Z);const Dt=v.toneMapping;v.toneMapping=hi;const Ht=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),k===!0&&ht.setGlobalState(v.clippingPlanes,j),Zs(C,Z,j),P.updateMultisampleRenderTarget(ut),P.updateRenderTargetMipmap(ut),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let It=0,ie=G.length;It<ie;It++){const pe=G[It],_e=pe.object,Ve=pe.geometry,ae=pe.material,Ut=pe.group;if(ae.side===Tn&&_e.layers.test(j.layers)){const Un=ae.side;ae.side=Xe,ae.needsUpdate=!0,oc(_e,Z,j,Ve,ae,Ut),ae.side=Un,ae.needsUpdate=!0,Yt=!0}}Yt===!0&&(P.updateMultisampleRenderTarget(ut),P.updateRenderTargetMipmap(ut))}v.setRenderTarget(Lt),v.setClearColor(D,F),Ht!==void 0&&(j.viewport=Ht),v.toneMapping=Dt}function Zs(C,G,Z){const j=G.isScene===!0?G.overrideMaterial:null;for(let W=0,ut=C.length;W<ut;W++){const gt=C[W],Lt=gt.object,Dt=gt.geometry,Ht=j===null?gt.material:j,Yt=gt.group;Lt.layers.test(Z.layers)&&oc(Lt,G,Z,Dt,Ht,Yt)}}function oc(C,G,Z,j,W,ut){C.onBeforeRender(v,G,Z,j,W,ut),C.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(v,G,Z,j,C,ut),W.transparent===!0&&W.side===Tn&&W.forceSinglePass===!1?(W.side=Xe,W.needsUpdate=!0,v.renderBufferDirect(Z,G,j,W,C,ut),W.side=ui,W.needsUpdate=!0,v.renderBufferDirect(Z,G,j,W,C,ut),W.side=Tn):v.renderBufferDirect(Z,G,j,W,C,ut),C.onAfterRender(v,G,Z,j,W,ut)}function js(C,G,Z){G.isScene!==!0&&(G=bt);const j=Ct.get(C),W=p.state.lights,ut=p.state.shadowsArray,gt=W.state.version,Lt=Pt.getParameters(C,W.state,ut,G,Z),Dt=Pt.getProgramCacheKey(Lt);let Ht=j.programs;j.environment=C.isMeshStandardMaterial?G.environment:null,j.fog=G.fog,j.envMap=(C.isMeshStandardMaterial?q:R).get(C.envMap||j.environment),j.envMapRotation=j.environment!==null&&C.envMap===null?G.environmentRotation:C.envMapRotation,Ht===void 0&&(C.addEventListener("dispose",Xt),Ht=new Map,j.programs=Ht);let Yt=Ht.get(Dt);if(Yt!==void 0){if(j.currentProgram===Yt&&j.lightsStateVersion===gt)return cc(C,Lt),Yt}else Lt.uniforms=Pt.getUniforms(C),C.onBeforeCompile(Lt,v),Yt=Pt.acquireProgram(Lt,Dt),Ht.set(Dt,Yt),j.uniforms=Lt.uniforms;const It=j.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(It.clippingPlanes=ht.uniform),cc(C,Lt),j.needsLights=qh(C),j.lightsStateVersion=gt,j.needsLights&&(It.ambientLightColor.value=W.state.ambient,It.lightProbe.value=W.state.probe,It.directionalLights.value=W.state.directional,It.directionalLightShadows.value=W.state.directionalShadow,It.spotLights.value=W.state.spot,It.spotLightShadows.value=W.state.spotShadow,It.rectAreaLights.value=W.state.rectArea,It.ltc_1.value=W.state.rectAreaLTC1,It.ltc_2.value=W.state.rectAreaLTC2,It.pointLights.value=W.state.point,It.pointLightShadows.value=W.state.pointShadow,It.hemisphereLights.value=W.state.hemi,It.directionalShadowMap.value=W.state.directionalShadowMap,It.directionalShadowMatrix.value=W.state.directionalShadowMatrix,It.spotShadowMap.value=W.state.spotShadowMap,It.spotLightMatrix.value=W.state.spotLightMatrix,It.spotLightMap.value=W.state.spotLightMap,It.pointShadowMap.value=W.state.pointShadowMap,It.pointShadowMatrix.value=W.state.pointShadowMatrix),j.currentProgram=Yt,j.uniformsList=null,Yt}function rc(C){if(C.uniformsList===null){const G=C.currentProgram.getUniforms();C.uniformsList=Da.seqWithValue(G.seq,C.uniforms)}return C.uniformsList}function cc(C,G){const Z=Ct.get(C);Z.outputColorSpace=G.outputColorSpace,Z.batching=G.batching,Z.batchingColor=G.batchingColor,Z.instancing=G.instancing,Z.instancingColor=G.instancingColor,Z.instancingMorph=G.instancingMorph,Z.skinning=G.skinning,Z.morphTargets=G.morphTargets,Z.morphNormals=G.morphNormals,Z.morphColors=G.morphColors,Z.morphTargetsCount=G.morphTargetsCount,Z.numClippingPlanes=G.numClippingPlanes,Z.numIntersection=G.numClipIntersection,Z.vertexAlphas=G.vertexAlphas,Z.vertexTangents=G.vertexTangents,Z.toneMapping=G.toneMapping}function Xh(C,G,Z,j,W){G.isScene!==!0&&(G=bt),P.resetTextureUnits();const ut=G.fog,gt=j.isMeshStandardMaterial?G.environment:null,Lt=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:ys,Dt=(j.isMeshStandardMaterial?q:R).get(j.envMap||gt),Ht=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Yt=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),It=!!Z.morphAttributes.position,ie=!!Z.morphAttributes.normal,pe=!!Z.morphAttributes.color;let _e=hi;j.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(_e=v.toneMapping);const Ve=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ae=Ve!==void 0?Ve.length:0,Ut=Ct.get(j),Un=p.state.lights;if(k===!0&&(J===!0||C!==y)){const Je=C===y&&j.id===S;ht.setState(j,C,Je)}let oe=!1;j.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Un.state.version||Ut.outputColorSpace!==Lt||W.isBatchedMesh&&Ut.batching===!1||!W.isBatchedMesh&&Ut.batching===!0||W.isBatchedMesh&&Ut.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ut.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ut.instancing===!1||!W.isInstancedMesh&&Ut.instancing===!0||W.isSkinnedMesh&&Ut.skinning===!1||!W.isSkinnedMesh&&Ut.skinning===!0||W.isInstancedMesh&&Ut.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ut.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ut.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ut.instancingMorph===!1&&W.morphTexture!==null||Ut.envMap!==Dt||j.fog===!0&&Ut.fog!==ut||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==ht.numPlanes||Ut.numIntersection!==ht.numIntersection)||Ut.vertexAlphas!==Ht||Ut.vertexTangents!==Yt||Ut.morphTargets!==It||Ut.morphNormals!==ie||Ut.morphColors!==pe||Ut.toneMapping!==_e||Ut.morphTargetsCount!==ae)&&(oe=!0):(oe=!0,Ut.__version=j.version);let cn=Ut.currentProgram;oe===!0&&(cn=js(j,G,W));let Hi=!1,qe=!1,ws=!1;const ge=cn.getUniforms(),Sn=Ut.uniforms;if(Tt.useProgram(cn.program)&&(Hi=!0,qe=!0,ws=!0),j.id!==S&&(S=j.id,qe=!0),Hi||y!==C){Tt.buffers.depth.getReversed()?(K.copy(C.projectionMatrix),ku(K),Vu(K),ge.setValue(z,"projectionMatrix",K)):ge.setValue(z,"projectionMatrix",C.projectionMatrix),ge.setValue(z,"viewMatrix",C.matrixWorldInverse);const Jn=ge.map.cameraPosition;Jn!==void 0&&Jn.setValue(z,lt.setFromMatrixPosition(C.matrixWorld)),Ot.logarithmicDepthBuffer&&ge.setValue(z,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ge.setValue(z,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,qe=!0,ws=!0)}if(W.isSkinnedMesh){ge.setOptional(z,W,"bindMatrix"),ge.setOptional(z,W,"bindMatrixInverse");const Je=W.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),ge.setValue(z,"boneTexture",Je.boneTexture,P))}W.isBatchedMesh&&(ge.setOptional(z,W,"batchingTexture"),ge.setValue(z,"batchingTexture",W._matricesTexture,P),ge.setOptional(z,W,"batchingIdTexture"),ge.setValue(z,"batchingIdTexture",W._indirectTexture,P),ge.setOptional(z,W,"batchingColorTexture"),W._colorsTexture!==null&&ge.setValue(z,"batchingColorTexture",W._colorsTexture,P));const Rs=Z.morphAttributes;if((Rs.position!==void 0||Rs.normal!==void 0||Rs.color!==void 0)&&kt.update(W,Z,cn),(qe||Ut.receiveShadow!==W.receiveShadow)&&(Ut.receiveShadow=W.receiveShadow,ge.setValue(z,"receiveShadow",W.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Sn.envMap.value=Dt,Sn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&G.environment!==null&&(Sn.envMapIntensity.value=G.environmentIntensity),qe&&(ge.setValue(z,"toneMappingExposure",v.toneMappingExposure),Ut.needsLights&&Yh(Sn,ws),ut&&j.fog===!0&&pt.refreshFogUniforms(Sn,ut),pt.refreshMaterialUniforms(Sn,j,V,X,p.state.transmissionRenderTarget[C.id]),Da.upload(z,rc(Ut),Sn,P)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Da.upload(z,rc(Ut),Sn,P),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ge.setValue(z,"center",W.center),ge.setValue(z,"modelViewMatrix",W.modelViewMatrix),ge.setValue(z,"normalMatrix",W.normalMatrix),ge.setValue(z,"modelMatrix",W.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Je=j.uniformsGroups;for(let Jn=0,Qn=Je.length;Jn<Qn;Jn++){const lc=Je[Jn];H.update(lc,cn),H.bind(lc,cn)}}return cn}function Yh(C,G){C.ambientLightColor.needsUpdate=G,C.lightProbe.needsUpdate=G,C.directionalLights.needsUpdate=G,C.directionalLightShadows.needsUpdate=G,C.pointLights.needsUpdate=G,C.pointLightShadows.needsUpdate=G,C.spotLights.needsUpdate=G,C.spotLightShadows.needsUpdate=G,C.rectAreaLights.needsUpdate=G,C.hemisphereLights.needsUpdate=G}function qh(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,G,Z){Ct.get(C.texture).__webglTexture=G,Ct.get(C.depthTexture).__webglTexture=Z;const j=Ct.get(C);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=Z===void 0,j.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,G){const Z=Ct.get(C);Z.__webglFramebuffer=G,Z.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(C,G=0,Z=0){w=C,b=G,E=Z;let j=!0,W=null,ut=!1,gt=!1;if(C){const Dt=Ct.get(C);if(Dt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(z.FRAMEBUFFER,null),j=!1;else if(Dt.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(Dt.__hasExternalTextures)P.rebindTextures(C,Ct.get(C.texture).__webglTexture,Ct.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const It=C.depthTexture;if(Dt.__boundDepthTexture!==It){if(It!==null&&Ct.has(It)&&(C.width!==It.image.width||C.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const Ht=C.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(gt=!0);const Yt=Ct.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Yt[G])?W=Yt[G][Z]:W=Yt[G],ut=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?W=Ct.get(C).__webglMultisampledFramebuffer:Array.isArray(Yt)?W=Yt[Z]:W=Yt,A.copy(C.viewport),I.copy(C.scissor),L=C.scissorTest}else A.copy(U).multiplyScalar(V).floor(),I.copy(B).multiplyScalar(V).floor(),L=$;if(Tt.bindFramebuffer(z.FRAMEBUFFER,W)&&j&&Tt.drawBuffers(C,W),Tt.viewport(A),Tt.scissor(I),Tt.setScissorTest(L),ut){const Dt=Ct.get(C.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+G,Dt.__webglTexture,Z)}else if(gt){const Dt=Ct.get(C.texture),Ht=G||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Dt.__webglTexture,Z||0,Ht)}S=-1},this.readRenderTargetPixels=function(C,G,Z,j,W,ut,gt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&gt!==void 0&&(Lt=Lt[gt]),Lt){Tt.bindFramebuffer(z.FRAMEBUFFER,Lt);try{const Dt=C.texture,Ht=Dt.format,Yt=Dt.type;if(!Ot.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ot.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=C.width-j&&Z>=0&&Z<=C.height-W&&z.readPixels(G,Z,j,W,Zt.convert(Ht),Zt.convert(Yt),ut)}finally{const Dt=w!==null?Ct.get(w).__webglFramebuffer:null;Tt.bindFramebuffer(z.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(C,G,Z,j,W,ut,gt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&gt!==void 0&&(Lt=Lt[gt]),Lt){const Dt=C.texture,Ht=Dt.format,Yt=Dt.type;if(!Ot.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ot.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=C.width-j&&Z>=0&&Z<=C.height-W){Tt.bindFramebuffer(z.FRAMEBUFFER,Lt);const It=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,It),z.bufferData(z.PIXEL_PACK_BUFFER,ut.byteLength,z.STREAM_READ),z.readPixels(G,Z,j,W,Zt.convert(Ht),Zt.convert(Yt),0);const ie=w!==null?Ct.get(w).__webglFramebuffer:null;Tt.bindFramebuffer(z.FRAMEBUFFER,ie);const pe=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Bu(z,pe,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,It),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ut),z.deleteBuffer(It),z.deleteSync(pe),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,G=null,Z=0){C.isTexture!==!0&&(Fs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,C=arguments[1]);const j=Math.pow(2,-Z),W=Math.floor(C.image.width*j),ut=Math.floor(C.image.height*j),gt=G!==null?G.x:0,Lt=G!==null?G.y:0;P.setTexture2D(C,0),z.copyTexSubImage2D(z.TEXTURE_2D,Z,0,0,gt,Lt,W,ut),Tt.unbindTexture()},this.copyTextureToTexture=function(C,G,Z=null,j=null,W=0){C.isTexture!==!0&&(Fs("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,C=arguments[1],G=arguments[2],W=arguments[3]||0,Z=null);let ut,gt,Lt,Dt,Ht,Yt,It,ie,pe;const _e=C.isCompressedTexture?C.mipmaps[W]:C.image;Z!==null?(ut=Z.max.x-Z.min.x,gt=Z.max.y-Z.min.y,Lt=Z.isBox3?Z.max.z-Z.min.z:1,Dt=Z.min.x,Ht=Z.min.y,Yt=Z.isBox3?Z.min.z:0):(ut=_e.width,gt=_e.height,Lt=_e.depth||1,Dt=0,Ht=0,Yt=0),j!==null?(It=j.x,ie=j.y,pe=j.z):(It=0,ie=0,pe=0);const Ve=Zt.convert(G.format),ae=Zt.convert(G.type);let Ut;G.isData3DTexture?(P.setTexture3D(G,0),Ut=z.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(P.setTexture2DArray(G,0),Ut=z.TEXTURE_2D_ARRAY):(P.setTexture2D(G,0),Ut=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);const Un=z.getParameter(z.UNPACK_ROW_LENGTH),oe=z.getParameter(z.UNPACK_IMAGE_HEIGHT),cn=z.getParameter(z.UNPACK_SKIP_PIXELS),Hi=z.getParameter(z.UNPACK_SKIP_ROWS),qe=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,_e.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,_e.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Dt),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ht),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Yt);const ws=C.isDataArrayTexture||C.isData3DTexture,ge=G.isDataArrayTexture||G.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const Sn=Ct.get(C),Rs=Ct.get(G),Je=Ct.get(Sn.__renderTarget),Jn=Ct.get(Rs.__renderTarget);Tt.bindFramebuffer(z.READ_FRAMEBUFFER,Je.__webglFramebuffer),Tt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Jn.__webglFramebuffer);for(let Qn=0;Qn<Lt;Qn++)ws&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ct.get(C).__webglTexture,W,Yt+Qn),C.isDepthTexture?(ge&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ct.get(G).__webglTexture,W,pe+Qn),z.blitFramebuffer(Dt,Ht,ut,gt,It,ie,ut,gt,z.DEPTH_BUFFER_BIT,z.NEAREST)):ge?z.copyTexSubImage3D(Ut,W,It,ie,pe+Qn,Dt,Ht,ut,gt):z.copyTexSubImage2D(Ut,W,It,ie,pe+Qn,Dt,Ht,ut,gt);Tt.bindFramebuffer(z.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else ge?C.isDataTexture||C.isData3DTexture?z.texSubImage3D(Ut,W,It,ie,pe,ut,gt,Lt,Ve,ae,_e.data):G.isCompressedArrayTexture?z.compressedTexSubImage3D(Ut,W,It,ie,pe,ut,gt,Lt,Ve,_e.data):z.texSubImage3D(Ut,W,It,ie,pe,ut,gt,Lt,Ve,ae,_e):C.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,W,It,ie,ut,gt,Ve,ae,_e.data):C.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,W,It,ie,_e.width,_e.height,Ve,_e.data):z.texSubImage2D(z.TEXTURE_2D,W,It,ie,ut,gt,Ve,ae,_e);z.pixelStorei(z.UNPACK_ROW_LENGTH,Un),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,oe),z.pixelStorei(z.UNPACK_SKIP_PIXELS,cn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Hi),z.pixelStorei(z.UNPACK_SKIP_IMAGES,qe),W===0&&G.generateMipmaps&&z.generateMipmap(Ut),Tt.unbindTexture()},this.copyTextureToTexture3D=function(C,G,Z=null,j=null,W=0){return C.isTexture!==!0&&(Fs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,j=arguments[1]||null,C=arguments[2],G=arguments[3],W=arguments[4]||0),Fs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,G,Z,j,W)},this.initRenderTarget=function(C){Ct.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),Tt.unbindTexture()},this.resetState=function(){b=0,E=0,w=null,Tt.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=ne._getDrawingBufferColorSpace(t),n.unpackColorSpace=ne._getUnpackColorSpace()}}class Xr{constructor(t,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Qt(t),this.near=n,this.far=i}clone(){return new Xr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Jm extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Ma=new Y,ll=new Y;class mh extends Te{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const n=t.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];this.addLevel(a.object.clone(),a.distance,a.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,n=0,i=0){n=Math.abs(n);const s=this.levels;let a;for(a=0;a<s.length&&!(n<s[a].distance);a++);return s.splice(a,0,{distance:n,hysteresis:i,object:t}),this.add(t),this}removeLevel(t){const n=this.levels;for(let i=0;i<n.length;i++)if(n[i].distance===t){const s=n.splice(i,1);return this.remove(s[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const n=this.levels;if(n.length>0){let i,s;for(i=1,s=n.length;i<s;i++){let a=n[i].distance;if(n[i].object.visible&&(a-=a*n[i].hysteresis),t<a)break}return n[i-1].object}return null}raycast(t,n){if(this.levels.length>0){Ma.setFromMatrixPosition(this.matrixWorld);const s=t.ray.origin.distanceTo(Ma);this.getObjectForDistance(s).raycast(t,n)}}update(t){const n=this.levels;if(n.length>1){Ma.setFromMatrixPosition(t.matrixWorld),ll.setFromMatrixPosition(this.matrixWorld);const i=Ma.distanceTo(ll)/t.zoom;n[0].object.visible=!0;let s,a;for(s=1,a=n.length;s<a;s++){let o=n[s].distance;if(n[s].object.visible&&(o-=o*n[s].hysteresis),i>=o)n[s-1].object.visible=!1,n[s].object.visible=!0;else break}for(this._currentLevel=s-1;s<a;s++)n[s].object.visible=!1}}toJSON(t){const n=super.toJSON(t);this.autoUpdate===!1&&(n.object.autoUpdate=!1),n.object.levels=[];const i=this.levels;for(let s=0,a=i.length;s<a;s++){const o=i[s];n.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return n}}class Qm extends Be{constructor(t=null,n=1,i=1,s,a,o,r,c,l=je,h=je,u,f){super(null,o,r,c,l,h,s,a,u,f),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cr extends mn{constructor(t,n,i,s=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const is=new me,hl=new me,xa=[],ul=new Oi,t_=new me,Is=new sn,Us=new Ss;class e_ extends sn{constructor(t,n,i){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new Cr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,t_)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Oi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,is),ul.copy(t.boundingBox).applyMatrix4(is),this.boundingBox.union(ul)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ss),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,is),Us.copy(t.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Us)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const i=n.morphTargetInfluences,s=this.morphTexture.source.data.data,a=i.length+1,o=t*a+1;for(let r=0;r<i.length;r++)i[r]=s[o+r]}raycast(t,n){const i=this.matrixWorld,s=this.count;if(Is.geometry=this.geometry,Is.material=this.material,Is.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Us.copy(this.boundingSphere),Us.applyMatrix4(i),t.ray.intersectsSphere(Us)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,is),hl.multiplyMatrices(i,is),Is.matrixWorld=hl,Is.raycast(t,xa);for(let o=0,r=xa.length;o<r;o++){const c=xa[o];c.instanceId=a,c.object=this,n.push(c)}xa.length=0}}setColorAt(t,n){this.instanceColor===null&&(this.instanceColor=new Cr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,n){n.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,n){const i=n.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Qm(new Float32Array(s*this.count),s,this.count,zr,Rn));const a=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const r=this.geometry.morphTargetsRelative?1:1-o,c=s*t;a[c]=r,a.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class _h extends bs{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Na=new Y,Fa=new Y,fl=new me,Ns=new Hr,va=new Ss,Po=new Y,dl=new Y;class n_ extends Te{constructor(t=new $n,n=new _h){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let s=1,a=n.count;s<a;s++)Na.fromBufferAttribute(n,s-1),Fa.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=Na.distanceTo(Fa);t.setAttribute("lineDistance",new _n(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),va.copy(i.boundingSphere),va.applyMatrix4(s),va.radius+=a,t.ray.intersectsSphere(va)===!1)return;fl.copy(s).invert(),Ns.copy(t.ray).applyMatrix4(fl);const r=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=r*r,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const d=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let g=d,m=_-1;g<m;g+=l){const p=h.getX(g),x=h.getX(g+1),M=ya(this,t,Ns,c,p,x);M&&n.push(M)}if(this.isLineLoop){const g=h.getX(_-1),m=h.getX(d),p=ya(this,t,Ns,c,g,m);p&&n.push(p)}}else{const d=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=d,m=_-1;g<m;g+=l){const p=ya(this,t,Ns,c,g,g+1);p&&n.push(p)}if(this.isLineLoop){const g=ya(this,t,Ns,c,_-1,d);g&&n.push(g)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=s.length;a<o;a++){const r=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}}function ya(e,t,n,i,s,a){const o=e.geometry.attributes.position;if(Na.fromBufferAttribute(o,s),Fa.fromBufferAttribute(o,a),n.distanceSqToSegment(Na,Fa,Po,dl)>i)return;Po.applyMatrix4(e.matrixWorld);const c=t.ray.origin.distanceTo(Po);if(!(c<t.near||c>t.far))return{distance:c,point:dl.clone().applyMatrix4(e.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:e}}const pl=new Y,ml=new Y;class i_ extends n_{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let s=0,a=n.count;s<a;s+=2)pl.fromBufferAttribute(n,s),ml.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+pl.distanceTo(ml);t.setAttribute("lineDistance",new _n(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Xs extends bs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zl,this.normalScale=new $t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gh extends Te{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class s_ extends gh{constructor(t,n,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qt(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}}const Lo=new me,_l=new Y,gl=new Y;class a_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $t(512,512),this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gr,this._frameExtents=new $t(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,i=this.matrix;_l.setFromMatrixPosition(t.matrixWorld),n.position.copy(_l),gl.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(gl),n.updateMatrixWorld(),Lo.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class o_ extends a_{constructor(){super(new lh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ml extends gh{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new o_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class r_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=xl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=xl();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function xl(){return performance.now()}class vl{constructor(t=1,n=0,i=0){return this.radius=t,this.phi=n,this.theta=i,this}set(t,n,i){return this.radius=t,this.phi=n,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,i){return this.radius=Math.sqrt(t*t+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ze(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class c_ extends i_{constructor(t=10,n=10,i=4473924,s=8947848){i=new Qt(i),s=new Qt(s);const a=n/2,o=t/n,r=t/2,c=[],l=[];for(let f=0,d=0,_=-r;f<=n;f++,_+=o){c.push(-r,0,_,r,0,_),c.push(_,0,-r,_,0,r);const g=f===a?i:s;g.toArray(l,d),d+=3,g.toArray(l,d),d+=3,g.toArray(l,d),d+=3,g.toArray(l,d),d+=3}const h=new $n;h.setAttribute("position",new _n(c,3)),h.setAttribute("color",new _n(l,3));const u=new _h({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class l_ extends Fi{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ur}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ur);const yl={type:"change"},Yr={type:"start"},Mh={type:"end"},Sa=new Hr,Sl=new oi,h_=Math.cos(70*Ou.DEG2RAD),Re=new Y,Ge=2*Math.PI,ue={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Do=1e-6;class u_ extends l_{constructor(t,n=null){super(t,n),this.state=ue.NONE,this.enabled=!0,this.target=new Y,this.cursor=new Y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:cs.ROTATE,MIDDLE:cs.DOLLY,RIGHT:cs.PAN},this.touches={ONE:as.ROTATE,TWO:as.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Y,this._lastQuaternion=new Ui,this._lastTargetPosition=new Y,this._quat=new Ui().setFromUnitVectors(t.up,new Y(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vl,this._sphericalDelta=new vl,this._scale=1,this._panOffset=new Y,this._rotateStart=new $t,this._rotateEnd=new $t,this._rotateDelta=new $t,this._panStart=new $t,this._panEnd=new $t,this._panDelta=new $t,this._dollyStart=new $t,this._dollyEnd=new $t,this._dollyDelta=new $t,this._dollyDirection=new Y,this._mouse=new $t,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=d_.bind(this),this._onPointerDown=f_.bind(this),this._onPointerUp=p_.bind(this),this._onContextMenu=y_.bind(this),this._onMouseWheel=g_.bind(this),this._onKeyDown=M_.bind(this),this._onTouchStart=x_.bind(this),this._onTouchMove=v_.bind(this),this._onMouseDown=m_.bind(this),this._onMouseMove=__.bind(this),this._interceptControlDown=S_.bind(this),this._interceptControlUp=b_.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(yl),this.update(),this.state=ue.NONE}update(t=null){const n=this.object.position;Re.copy(n).sub(this.target),Re.applyQuaternion(this._quat),this._spherical.setFromVector3(Re),this.autoRotate&&this.state===ue.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ge:i>Math.PI&&(i-=Ge),s<-Math.PI?s+=Ge:s>Math.PI&&(s-=Ge),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=o!=this._spherical.radius}if(Re.setFromSpherical(this._spherical),Re.applyQuaternion(this._quatInverse),n.copy(this.target).add(Re),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const r=Re.length();o=this._clampDistance(r*this._scale);const c=r-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),a=!!c}else if(this.object.isOrthographicCamera){const r=new Y(this._mouse.x,this._mouse.y,0);r.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=c!==this.object.zoom;const l=new Y(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(r),this.object.updateMatrixWorld(),o=Re.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Sa.origin.copy(this.object.position),Sa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sa.direction))<h_?this.object.lookAt(this.target):(Sl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sa.intersectPlane(Sl,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Do||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Do||this._lastTargetPosition.distanceToSquared(this.target)>Do?(this.dispatchEvent(yl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ge/60*this.autoRotateSpeed*t:Ge/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){Re.setFromMatrixColumn(n,0),Re.multiplyScalar(-t),this._panOffset.add(Re)}_panUp(t,n){this.screenSpacePanning===!0?Re.setFromMatrixColumn(n,1):(Re.setFromMatrixColumn(n,0),Re.crossVectors(this.object.up,Re)),Re.multiplyScalar(t),this._panOffset.add(Re)}_pan(t,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Re.copy(s).sub(this.target);let a=Re.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*a/i.clientHeight,this.object.matrix),this._panUp(2*n*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,a=n-i.top,o=i.width,r=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(a/r)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/n.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ge*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ge*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ge*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ge*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,s=t.pageY-n.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),a=.5*(t.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/n.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,s=t.pageY-n.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+n.x)*.5,r=(t.pageY+n.y)*.5;this._updateZoomParameters(o,r)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new $t,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function f_(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function d_(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function p_(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Mh),this.state=ue.NONE;break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function m_(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ue.DOLLY;break;case cs.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ue.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ue.ROTATE}break;case cs.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ue.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ue.PAN}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(Yr)}function __(e){switch(this.state){case ue.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ue.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ue.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function g_(e){this.enabled===!1||this.enableZoom===!1||this.state!==ue.NONE||(e.preventDefault(),this.dispatchEvent(Yr),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Mh))}function M_(e){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(e)}function x_(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case as.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ue.TOUCH_ROTATE;break;case as.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ue.TOUCH_PAN;break;default:this.state=ue.NONE}break;case 2:switch(this.touches.TWO){case as.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ue.TOUCH_DOLLY_PAN;break;case as.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ue.TOUCH_DOLLY_ROTATE;break;default:this.state=ue.NONE}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(Yr)}function v_(e){switch(this._trackPointer(e),this.state){case ue.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ue.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ue.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ue.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ue.NONE}}function y_(e){this.enabled!==!1&&e.preventDefault()}function S_(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function b_(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class E_{constructor(t){this.renderer=new Km({canvas:t,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ol,this.renderer.setClearColor(658192),this.scene=new Jm,this.scene.fog=new Xr(658192,60,200),this.camera=new nn(50,window.innerWidth/window.innerHeight,.01,500),this.camera.position.set(6,4,6),this.camera.lookAt(0,2,0),this.controls=new u_(this.camera,t),this.controls.target.set(0,2,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=3,this.controls.maxDistance=150,this.controls.maxPolarAngle=Math.PI*.48,this.controls.update(),this.keyboardNavEnabled=!1,this.moveKeys=new Set,this._lastRenderTime=performance.now(),this._moveVec=new Y,this._forward=new Y,this._right=new Y,this._worldUp=new Y(0,1,0),this.sun=new Ml(16774368,1.2),this.sun.position.set(15,25,10),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=100,this.sun.shadow.camera.left=-40,this.sun.shadow.camera.right=40,this.sun.shadow.camera.top=40,this.sun.shadow.camera.bottom=-40,this.sun.shadow.bias=-.002,this.scene.add(this.sun),this._sunDist=30;const n=new s_(8234454,4008735,.45);this.scene.add(n);const i=new Ml(12636392,.2);i.position.set(-10,10,-8),this.scene.add(i);const s=new Ws(200,200),a=new Xs({color:1711134,roughness:.95,metalness:0}),o=new sn(s,a);o.rotation.x=-Math.PI/2,o.receiveShadow=!0,this.scene.add(o);const r=new c_(120,60,2237480,1579550);r.position.y=.01,this.scene.add(r),window.addEventListener("resize",()=>this._onResize()),window.addEventListener("keydown",c=>this._onKeyDown(c)),window.addEventListener("keyup",c=>this._onKeyUp(c))}_isTypingTarget(t){if(!t)return!1;const n=t.tagName;return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||t.isContentEditable}_onKeyDown(t){if(!this.keyboardNavEnabled||this._isTypingTarget(t.target))return;const n=t.key.toLowerCase();["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(n)&&(this.moveKeys.add(n),t.preventDefault())}_onKeyUp(t){const n=t.key.toLowerCase();this.moveKeys.delete(n)}_updateKeyboardNavigation(t){if(!this.keyboardNavEnabled||this.moveKeys.size===0)return;const n=(this.moveKeys.has("d")||this.moveKeys.has("arrowright")?1:0)-(this.moveKeys.has("a")||this.moveKeys.has("arrowleft")?1:0),i=(this.moveKeys.has("w")||this.moveKeys.has("arrowup")?1:0)-(this.moveKeys.has("s")||this.moveKeys.has("arrowdown")?1:0);if(n===0&&i===0||(this.camera.getWorldDirection(this._forward),this._forward.y=0,this._forward.lengthSq()<1e-6?this._forward.set(0,0,-1):this._forward.normalize(),this._right.crossVectors(this._forward,this._worldUp).normalize(),this._moveVec.set(0,0,0),this._moveVec.addScaledVector(this._forward,i),this._moveVec.addScaledVector(this._right,n),this._moveVec.lengthSq()===0))return;this._moveVec.normalize();const a=Math.max(10,this.camera.position.distanceTo(this.controls.target)*1.1)*t*1.9;this._moveVec.multiplyScalar(a),this.camera.position.add(this._moveVec),this.controls.target.add(this._moveVec)}_onResize(){const t=window.innerWidth,n=window.innerHeight;this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,n)}render(){const t=performance.now(),n=Math.min(.05,(t-this._lastRenderTime)/1e3);this._lastRenderTime=t,this._updateKeyboardNavigation(n),this.controls.update(),this.renderer.render(this.scene,this.camera)}setKeyboardNavigationEnabled(t){this.keyboardNavEnabled=t,t||this.moveKeys.clear()}setSunDirection(t,n=.65){const i=this._sunDist,s=n*Math.PI*.45+.2,a=Math.sin(s)*i,o=Math.cos(s)*i;this.sun.position.set(Math.cos(t)*o,a,Math.sin(t)*o)}getCameraDistance(){return this.camera.position.distanceTo(this.controls.target)}}const T_=`
  attribute vec3 color;

  uniform float uTime;
  uniform float uWaveHeight;

  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  varying vec3 vColor;
  varying float vWaveH;
  varying float vCalmness;

  // Simple hash for wave displacement
  float hash(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return -1.0 + 2.0 * mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float seaOctave(vec2 uv, float choppy) {
    uv += noise(uv);
    vec2 wv = 1.0 - abs(sin(uv));
    vec2 swv = abs(cos(uv));
    wv = mix(wv, swv, wv);
    return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
  }

  void main() {
    // Instance transform
    vec4 worldPos = instanceMatrix * vec4(position, 1.0);

    // Detect swampy/murky water: green dominant over blue = calmer water
    float swampiness = clamp((color.g - color.b) * 3.0, 0.0, 1.0);
    vCalmness = swampiness;

    // Wave displacement on top faces (normal pointing up)
    float speedMult = mix(0.8, 0.15, swampiness);
    float seaTime = uTime * speedMult;
    float freq = mix(0.16, 0.08, swampiness);
    float amp = uWaveHeight * mix(1.0, 0.2, swampiness);
    float choppy = mix(4.0, 1.2, swampiness);
    vec2 uv = worldPos.xz * 80.0; // scale to shader space
    uv.x *= 0.75;

    mat2 octave_m = mat2(1.6, 1.2, -1.2, 1.6);
    float h = 0.0;
    for (int i = 0; i < 3; i++) {
      float d = seaOctave((uv + seaTime) * freq, choppy);
      d += seaOctave((uv - seaTime) * freq, choppy);
      h += d * amp;
      uv = octave_m * uv;
      freq *= 1.9;
      amp *= 0.22;
      choppy = mix(choppy, 1.0, 0.2);
    }

    // Only displace top faces upward
    vec3 displaced = worldPos.xyz;
    if (normal.y > 0.5) {
      displaced.y += h * 0.003;
    }
    vWaveH = h;

    vWorldPos = displaced;
    vWorldNormal = normalize(mat3(instanceMatrix) * normal);
    vColor = color;

    vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPos;
  }
`,w_=`
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uSkyColor;

  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  varying vec3 vColor;
  varying float vWaveH;
  varying float vCalmness;

  const float PI = 3.141592;
  const vec3 SEA_BASE = vec3(0.0, 0.09, 0.18);
  const vec3 SEA_WATER_COLOR = vec3(0.8, 0.9, 0.6) * 0.6;
  const vec3 SWAMP_BASE = vec3(0.08, 0.12, 0.04);
  const vec3 SWAMP_WATER_COLOR = vec3(0.25, 0.30, 0.12);
  const float SEA_HEIGHT = 0.6;

  float hash(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return -1.0 + 2.0 * mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float seaOctave(vec2 uv, float choppy) {
    uv += noise(uv);
    vec2 wv = 1.0 - abs(sin(uv));
    vec2 swv = abs(cos(uv));
    wv = mix(wv, swv, wv);
    return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
  }

  // Compute detailed wave height for normal calculation
  float mapDetailed(vec3 p) {
    float speedMult = mix(0.8, 0.15, vCalmness);
    float seaTime = uTime * speedMult;
    float freq = mix(0.16, 0.08, vCalmness);
    float amp = SEA_HEIGHT * mix(1.0, 0.2, vCalmness);
    float choppy = mix(4.0, 1.2, vCalmness);
    vec2 uv = p.xz;
    uv.x *= 0.75;

    mat2 octave_m = mat2(1.6, 1.2, -1.2, 1.6);
    float h = 0.0;
    for (int i = 0; i < 5; i++) {
      float d = seaOctave((uv + seaTime) * freq, choppy);
      d += seaOctave((uv - seaTime) * freq, choppy);
      h += d * amp;
      uv = octave_m * uv;
      freq *= 1.9;
      amp *= 0.22;
      choppy = mix(choppy, 1.0, 0.2);
    }
    return p.y - h;
  }

  // Wave normal via central differences
  vec3 getWaveNormal(vec3 p, float eps) {
    vec3 n;
    n.y = mapDetailed(p);
    n.x = mapDetailed(vec3(p.x + eps, p.y, p.z)) - n.y;
    n.z = mapDetailed(vec3(p.x, p.y, p.z + eps)) - n.y;
    n.y = eps;
    return normalize(n);
  }

  // Sky color for reflections
  vec3 getSkyColor(vec3 e) {
    e.y = (max(e.y, 0.0) * 0.8 + 0.2) * 0.8;
    return vec3(pow(1.0 - e.y, 2.0), 1.0 - e.y, 0.6 + (1.0 - e.y) * 0.4) * 1.1;
  }

  float diffuseTerm(vec3 n, vec3 l, float p) {
    return pow(dot(n, l) * 0.4 + 0.6, p);
  }

  float specularTerm(vec3 n, vec3 l, vec3 e, float s) {
    float nrm = (s + 8.0) / (PI * 8.0);
    return pow(max(dot(reflect(e, n), l), 0.0), s) * nrm;
  }

  void main() {
    vec3 eyeDir = normalize(vWorldPos - cameraPosition);
    vec3 light = normalize(uSunDir);

    // Compute wave-perturbed normal on top faces
    vec3 normal = vWorldNormal;
    if (vWorldNormal.y > 0.5) {
      vec3 seaPos = vWorldPos * 80.0;
      seaPos.y = SEA_HEIGHT;
      vec3 waveN = getWaveNormal(seaPos, 0.1);
      // Less wave normal blending for calm/swamp water
      float waveBlend = mix(0.85, 0.25, vCalmness);
      normal = normalize(mix(vWorldNormal, waveN, waveBlend));
    }

    // Fresnel — reduced for swamp (murkier, less reflective)
    float fresnel = clamp(1.0 - dot(normal, -eyeDir), 0.0, 1.0);
    fresnel = min(fresnel * fresnel * fresnel, mix(0.5, 0.15, vCalmness));

    // Reflected sky
    vec3 reflected = getSkyColor(reflect(eyeDir, normal));

    // Refracted / deep water color — blend between ocean and swamp palettes
    vec3 waterBase = mix(SEA_BASE, SWAMP_BASE, vCalmness);
    vec3 waterTint = mix(SEA_WATER_COLOR, SWAMP_WATER_COLOR, vCalmness);
    vec3 baseColor = mix(waterBase, vColor * 0.6, 0.4);
    vec3 refracted = baseColor + diffuseTerm(normal, light, 80.0) * waterTint * 0.12;

    // Mix refracted and reflected via fresnel
    vec3 color = mix(refracted, reflected, fresnel);

    // Depth-based brightening
    color += waterTint * (vWaveH * 0.001 - SEA_HEIGHT) * 0.18;

    // Specular highlight — muted for swamp
    float specPow = mix(120.0, 30.0, vCalmness);
    float spec = specularTerm(normal, light, eyeDir, specPow) * mix(1.0, 0.3, vCalmness);
    color += vec3(spec);

    // Slight transparency at edges
    float alpha = 0.88 + fresnel * 0.12;

    // Gamma
    color = pow(color, vec3(0.75));

    gl_FragColor = vec4(color, alpha);
  }
`;function R_(){return new Yn({vertexShader:T_,fragmentShader:w_,uniforms:{uTime:{value:0},uWaveHeight:{value:3.6},uSunDir:{value:new Y(.6,.8,.4)},uSkyColor:{value:new Y(.5,.7,1)}},transparent:!0,depthWrite:!0,side:Tn})}const Oa=[];function A_(){const e=R_();return Oa.push(e),e}function C_(e){const t=Oa.indexOf(e);t!==-1&&Oa.splice(t,1),e.dispose()}function P_(e,t){for(const n of Oa)n.uniforms.uTime.value=e,t&&n.uniforms.uSunDir.value.copy(t)}const za=[];function L_(){const e=new Xs({vertexColors:!0,roughness:.85,metalness:0});return e.userData.uTime={value:0},e.onBeforeCompile=t=>{t.uniforms.uTime=e.userData.uTime,t.vertexShader=t.vertexShader.replace("#include <common>",`
      #include <common>
      uniform float uTime;

      float grassHash(float p) {
        return fract(sin(p) * 43758.2317);
      }
      float grassHash2d(vec2 p) {
        return grassHash(dot(p, vec2(87.1, 313.7)));
      }
      float grassNoise(vec2 p) {
        vec2 F = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(grassHash2d(F), grassHash2d(F + vec2(1.0, 0.0)), f.x),
          mix(grassHash2d(F + vec2(0.0, 1.0)), grassHash2d(F + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }
      vec2 grassWind(vec2 p) {
        float n1 = grassNoise(p * 0.1 + uTime * 0.8);
        float n2 = grassNoise(p * 0.1 + vec2(31.7, 47.3) + uTime * 0.8);
        return vec2(n1, n2) - 0.5;
      }
      `),t.vertexShader=t.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>

      // Wind sway on top vertices of each voxel cube
      #ifdef USE_INSTANCING
        vec4 grassWorldPos = instanceMatrix * vec4(transformed, 1.0);
        float topness = step(0.0, position.y);
        vec2 wind = grassWind(grassWorldPos.xz * 40.0) * topness;
        transformed.x += wind.x * 0.03;
        transformed.z += wind.y * 0.03;
        transformed.y += (wind.x + wind.y) * 0.008;
      #endif
      `)},e.customProgramCacheKey=()=>"grass_wind_"+e.id,e}function D_(){const e=L_();return za.push(e),e}function I_(e){const t=za.indexOf(e);t!==-1&&za.splice(t,1),e.dispose()}function U_(e,t){for(const n of za)n.userData.uTime.value=e}function bl({roughness:e=.85,metalness:t=0,grainScale:n=120,grainStrength:i=.12}={}){const s=new Xs({vertexColors:!0,roughness:e,metalness:t});return s.onBeforeCompile=a=>{a.uniforms.uGrainScale={value:n},a.uniforms.uGrainStrength={value:i},a.fragmentShader=a.fragmentShader.replace("#include <common>",`
      #include <common>
      uniform float uGrainScale;
      uniform float uGrainStrength;

      // Simple 3D hash for sand grain
      float sandHash(vec3 p) {
        p = fract(p * vec3(443.8975, 397.2973, 491.1871));
        p += dot(p, p.yzx + 19.19);
        return fract((p.x + p.y) * p.z);
      }

      // Value noise 3D
      float sandNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);

        float n000 = sandHash(i);
        float n100 = sandHash(i + vec3(1,0,0));
        float n010 = sandHash(i + vec3(0,1,0));
        float n110 = sandHash(i + vec3(1,1,0));
        float n001 = sandHash(i + vec3(0,0,1));
        float n101 = sandHash(i + vec3(1,0,1));
        float n011 = sandHash(i + vec3(0,1,1));
        float n111 = sandHash(i + vec3(1,1,1));

        float nx00 = mix(n000, n100, f.x);
        float nx10 = mix(n010, n110, f.x);
        float nx01 = mix(n001, n101, f.x);
        float nx11 = mix(n011, n111, f.x);
        float nxy0 = mix(nx00, nx10, f.y);
        float nxy1 = mix(nx01, nx11, f.y);
        return mix(nxy0, nxy1, f.z);
      }

      // Multi-octave sand grain
      float sandGrain(vec3 p) {
        float n = sandNoise(p * 1.0) * 0.5
                + sandNoise(p * 2.0) * 0.3
                + sandNoise(p * 4.0) * 0.2;
        return n;
      }
      `),a.fragmentShader=a.fragmentShader.replace("#include <color_fragment>",`
      #include <color_fragment>

      // Apply sand grain noise to diffuse color
      vec3 sandWorldPos = vViewPosition; // view-space position as grain seed
      float grain = sandGrain(sandWorldPos * uGrainScale);
      // Modulate: mix in subtle brightness variation
      float grainMod = 1.0 + (grain - 0.5) * uGrainStrength * 2.0;
      diffuseColor.rgb *= grainMod;
      `)},s.customProgramCacheKey=()=>`sand_${e}_${t}_${n}_${i}`,s}const N_=3,F_=5,O_=6,z_=7;function wi(e,t,n,i=.98){if(e.size===0)return{mesh:new rs,maxHeight:0};const a=[],o=[],r=[],c=[],l=[];let h=0;for(const[_,g]of e){const[m,p,x]=_.split(",").map(Number),M=g.scale||1,v=M>1?t*(M-1)*.5:0,T=m*t+v,b=p*t+v,E=x*t+v;b>h&&(h=b);const w={wx:T,wy:b,wz:E,scale:M,color:g.color};g.type===N_?o.push(w):g.type===F_?r.push(w):g.type===O_?c.push(w):g.type===z_?l.push(w):a.push(w)}const u=new rs,f=new Te;function d(_,g,m=!0){if(_.length===0)return null;const p=new Map;for(const x of _){const M=x.scale;p.has(M)||p.set(M,[]),p.get(M).push(x)}for(const[x,M]of p){const v=t*x*i,T=new Es(v,v,v),b=new e_(T,g,M.length),E=new Float32Array(M.length*3);for(let w=0;w<M.length;w++){const S=M[w];f.position.set(S.wx,S.wy,S.wz),f.updateMatrix(),b.setMatrixAt(w,f.matrix),E[w*3]=S.color[0],E[w*3+1]=S.color[1],E[w*3+2]=S.color[2]}b.instanceMatrix.needsUpdate=!0,b.geometry.setAttribute("color",new Cr(E,3)),b.castShadow=m,b.receiveShadow=m,u.add(b)}}if(d(a,n),o.length){const _=A_();d(o,_,!1)}if(r.length){const _=D_();d(r,_,!0)}if(c.length){const _=bl({roughness:.35,metalness:.1});d(c,_,!0)}if(l.length){const _=bl({roughness:.85,metalness:0});d(l,_,!0)}return{mesh:u,maxHeight:h+t}}function B_(e){const t=new Map;for(const[n,i]of e){const[s,a,o]=n.split(",").map(Number),r=i.color;for(let c=0;c<2;c++)for(let l=0;l<2;l++)for(let h=0;h<2;h++){const u=`${s*2+c},${a*2+l},${o*2+h}`,f=((c+l+h)%2===0?1:-1)*.012;t.set(u,{color:[Math.max(0,Math.min(1,r[0]+f)),Math.max(0,Math.min(1,r[1]+f)),Math.max(0,Math.min(1,r[2]+f))],type:i.type})}}return t}function Ba(e,t){const n=new Map;for(const[s,a]of e){const[o,r,c]=s.split(",").map(Number),l=Math.floor(o/t),h=Math.floor(r/t),u=Math.floor(c/t),f=`${l},${h},${u}`;n.has(f)||n.set(f,{colors:[],types:[],maxScale:1});const d=n.get(f);d.colors.push(a.color),d.types.push(a.type),a.scale&&a.scale>d.maxScale&&(d.maxScale=a.scale)}const i=new Map;for(const[s,a]of n){const o=a.colors.length,r=[0,0,0];for(const u of a.colors)r[0]+=u[0],r[1]+=u[1],r[2]+=u[2];r[0]/=o,r[1]/=o,r[2]/=o;const c={};for(const u of a.types)c[u]=(c[u]||0)+1;const l=+Object.entries(c).sort((u,f)=>f[1]-u[1])[0][0],h={color:r,type:l};a.maxScale>1&&(h.scale=a.maxScale),i.set(s,h)}return i}const ba=.01,ci=[0,6,16],k_=4e4;function Pr(e,t={}){const n=new mh,{highGapFactor:i=1,mediumGapFactor:s=.98,lowGapFactor:a=.98}=t,o=()=>new Xs({vertexColors:!0,roughness:.8,metalness:0});let r;if(e.size<=k_){const f=B_(e),d=wi(f,ba*.5,o(),i);n.addLevel(d.mesh,ci[0]),r=f.size}else{const f=wi(e,ba,o(),i);n.addLevel(f.mesh,ci[0]),r=e.size}const c=Ba(e,2),l=wi(c,ba*2,o(),s);n.addLevel(l.mesh,ci[1]);const h=Ba(e,4),u=wi(h,ba*4,o(),a);return n.addLevel(u.mesh,ci[2]),n.userData.voxelCounts=[r,c.size,h.size],{lod:n,maxHeight:l.maxHeight,voxelCounts:n.userData.voxelCounts}}const Io=.03,Uo=[0,12,30];function V_(e){const t=new mh,n=()=>new Xs({vertexColors:!0,roughness:.8,metalness:0}),i=wi(e,Io,n(),1);t.addLevel(i.mesh,Uo[0]);const s=e.size,a=Ba(e,2),o=wi(a,Io*2,n(),1);t.addLevel(o.mesh,Uo[1]);const r=Ba(e,4),c=wi(r,Io*4,n(),1);return t.addLevel(c.mesh,Uo[2]),t.userData.voxelCounts=[s,a.size,r.size],{lod:t,maxHeight:o.maxHeight,voxelCounts:t.userData.voxelCounts}}function H_(e){return e<ci[1]?"HIGH":e<ci[2]?"MED":"LOW"}function G_(e,t){const n=e.userData.voxelCounts;return n?t<ci[1]?n[0]:t<ci[2]?n[1]:n[2]:0}const Wa=class Wa{constructor(t=42){this.seed=Math.abs(Math.floor(t))||1}next(){return this.seed=this.seed*16807%2147483647,this.seed/2147483647}range(t,n){return t+this.next()*(n-t)}intRange(t,n){return Math.floor(this.range(t,n+.999))}chance(t){return this.next()<t}pick(t){return t[this.intRange(0,t.length-1)]}colorVariation(t,n=.05){return[Math.max(0,Math.min(1,t[0]+this.range(-n,n))),Math.max(0,Math.min(1,t[1]+this.range(-n,n))),Math.max(0,Math.min(1,t[2]+this.range(-n,n)))]}initPerm(){if(this._perm)return;this._perm=new Uint8Array(512);const t=new Uint8Array(256);for(let n=0;n<256;n++)t[n]=n;for(let n=255;n>0;n--){const i=this.intRange(0,n);[t[n],t[i]]=[t[i],t[n]]}for(let n=0;n<512;n++)this._perm[n]=t[n&255]}noise1D(t){this.initPerm();const n=Math.floor(t),i=t-n,s=i-1,a=1-i*i,o=1-s*s,r=a>0?a*a*a*a*(this._perm[n&255]%2*2-1)*i:0,c=o>0?o*o*o*o*(this._perm[n+1&255]%2*2-1)*s:0;return(r+c)*.5+.5}noise2D(t,n){this.initPerm();const i=Wa.GRAD3,s=.5*(Math.sqrt(3)-1),a=(3-Math.sqrt(3))/6,o=(t+n)*s,r=Math.floor(t+o),c=Math.floor(n+o),l=(r+c)*a,h=r-l,u=c-l,f=t-h,d=n-u,_=f>d?1:0,g=f>d?0:1,m=f-_+a,p=d-g+a,x=f-1+2*a,M=d-1+2*a,v=r&255,T=c&255,b=this._perm[v+this._perm[T]]%12,E=this._perm[v+_+this._perm[T+g]]%12,w=this._perm[v+1+this._perm[T+1]]%12;let S=0,y=0,A=0,I=.5-f*f-d*d;I>0&&(I*=I,S=I*I*(i[b][0]*f+i[b][1]*d));let L=.5-m*m-p*p;L>0&&(L*=L,y=L*L*(i[E][0]*m+i[E][1]*p));let D=.5-x*x-M*M;return D>0&&(D*=D,A=D*D*(i[w][0]*x+i[w][1]*M)),35*(S+y+A)+.5}fbm(t,n=4,i=2,s=.5){let a=0,o=1,r=1,c=0;for(let l=0;l<n;l++)a+=this.noise1D(t*r)*o,c+=o,o*=s,r*=i;return a/c}smoothstep(t){return t*t*(3-2*t)}smoothLerp(t,n,i){return t+(n-t)*this.smoothstep(Math.max(0,Math.min(1,i)))}};hc(Wa,"GRAD3",[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]);let xn=Wa;const we=0,xe=1,le=2,Ri=4;function Mt(e,t,n,i,s,a){e.set(`${Math.round(t)},${Math.round(n)},${Math.round(i)}`,{color:s,type:a})}function Zn(e,t,n){return e+(t-e)*n}function Pn(e){return e*e*(3-2*e)}function Me(e,t,n){return Math.max(t,Math.min(n,e))}function El(e){const[t,n,i]=e;return[[Me(t*.62,0,1),Me(n*.72,0,1),Me(i*.68,0,1)],[Me(t*.82,0,1),Me(n*.9+.02,0,1),Me(i*.82,0,1)],[Me(t,0,1),Me(n,0,1),Me(i,0,1)],[Me(t+.07,0,1),Me(n+.07,0,1),Me(i+.02,0,1)],[Me(t+.14,0,1),Me(n+.12,0,1),Me(i+.03,0,1)]]}function vn(e,t){return Array.isArray(t)&&typeof t[0]=="number"?e.pick(El(t)):t&&Array.isArray(t.palette)&&t.palette.length?e.pick(t.palette):t&&t.color?e.pick(El(t.color)):[.4,.55,.22]}function Ke(e,t,n=.04){const i=(t[0]+t[1]+t[2])/3,s=e.range(.88,1.18),a=e.range(-.03,.035),o=e.range(-.05,.07),r=e.range(-.02,.045),c=[i+(t[0]-i)*s+a*.8+o*.7,i+(t[1]-i)*s+r+o,i+(t[2]-i)*s-a*.45+o*.5];return e.colorVariation([Me(c[0],0,1),Me(c[1],0,1),Me(c[2],0,1)],n)}function xs(e,t,n,i,s,a,o,r,c=.03){const l=Math.max(1,s),h=Math.ceil(l);for(let u=-h;u<=h;u++)for(let f=-h;f<=h;f++)for(let d=-h;d<=h;d++)u*u+f*f+d*d<=l*l&&Mt(e,t+u,n+f,i+d,r.colorVariation(a,c),o)}function Ni(e,t,n,i,s,a,o,r,c=null,l=0){const h=Math.max(1,s),u=Math.ceil(h);for(let f=-u;f<=u;f++)for(let d=-u;d<=u;d++)if(f*f+d*d<=h*h){const _=c&&r.chance(l)?r.colorVariation(c,.03):r.colorVariation(a,.03);Mt(e,t+f,n,i+d,_,o)}}function Dn(e,t,n){const{height:i,baseRadius:s,topRadius:a,bark:o,markColor:r=null,markProb:c=0,lean:l=.02,curvature:h=.15,curveFreq:u=.025,flareHeight:f=.08,flareAmount:d=.55}=n,_=[];let g=0,m=0;const p=t.range(0,Math.PI*2),x=t.range(0,1e3),M=t.range(0,1e3),v=n.numButtresses||t.intRange(3,5),T=[],b=[];for(let E=0;E<v;E++)T.push(E/v*Math.PI*2+t.range(-.4,.4)),b.push(t.range(.6,1.4));for(let E=0;E<i;E++){const w=E/i,S=E<i*f?1+(1-E/(i*f))*d:1,y=Math.max(1,(s+(a-s)*w)*S),A=t.fbm(E*u+x,3,2,.5)-.5,I=t.fbm(E*u+M,3,2,.5)-.5;g+=Math.cos(p)*l+A*h,m+=Math.sin(p)*l+I*h;const L=E/(i*f*1.5);if(L<1){const D=Math.ceil(y*1.8);for(let F=-D;F<=D;F++)for(let O=-D;O<=D;O++){const X=Math.sqrt(F*F+O*O),V=Math.atan2(O,F),tt=1-L;let et=y*(.6+L*.3);for(let U=0;U<v;U++){const B=Math.abs(Math.atan2(Math.sin(V-T[U]),Math.cos(V-T[U]))),$=Math.max(0,1-B/.47),N=y*(1+tt*b[U]*.9);et=Math.max(et,N*$)}if(X<=et){const U=r&&t.chance(c)?t.colorVariation(r,.03):t.colorVariation(o,.03);Mt(e,g+F,E,m+O,U,we)}}}else Ni(e,g,E,m,y,o,we,t,r,c);_.push({x:g,y:E,z:m,r:y,angle:p})}return _}function W_(e,t,n){const{height:i,baseRadius:s,topRadius:a,bark:o,markColor:r=null,markProb:c=0,darkMarkColor:l=null,darkMarkProb:h=0,lean:u=.12,curvature:f=.18,curveFreq:d=.012,flareHeight:_=.06,flareAmount:g=.3}=n,m=[],p=t.range(0,Math.PI*2),x=Math.cos(p),M=Math.sin(p),v=-M,T=x,b=u*i*t.range(.85,1.05),E=f*i*.16*t.range(.85,1.1),w=Me(d*55,.7,1.15),S=t.range(-.18,.18),y=t.range(.08,.18),A=t.range(0,Math.PI*2),I=t.range(0,Math.PI*2);for(let L=0;L<i;L++){const D=L/Math.max(1,i-1),F=L<i*_?1+(1-L/(i*_))*g:1,O=Math.max(1,(s+(a-s)*D)*F),X=Pn(D),V=Math.sin(D*Math.PI),tt=Math.sin((D+S)*Math.PI*w)*E*V,et=Math.max(0,(D-.72)/.28)*b*y,U=b*X-et,B=x*U+v*tt,$=M*U+T*tt,N=Math.ceil(O);for(let k=-N;k<=N;k++)for(let J=-N;J<=N;J++){const K=Math.sqrt(k*k+J*J);if(K>O)continue;const Q=Math.atan2(J,k),lt=Me((K-Math.max(0,O-1.35))/1.35,0,1),ft=Math.sin(L*.46+A)*.5+.5,bt=Math.sin(Q*5.5+L*.18+I)*Math.cos(Q*2.4-L*.31+I*.7)*.5+.5;let St=o;lt>0?l&&(ft>.62&&lt>.55||bt>.74&&t.chance(h))?St=l:r&&(ft>.52||t.chance(c))&&(St=r):r&&t.chance(c*.35)&&(St=r),Mt(e,B+k,L,$+J,t.colorVariation(St,.03),we)}m.push({x:B,y:L,z:$,r:O,angle:p})}return m}function Ln(e,t,n,i,s){const{x:a,y:o,z:r,r:c}=n,l=a+Math.cos(i)*c,h=r+Math.sin(i)*c,u=Math.min(c*.4,2);if(u>=1)for(let f=-1;f<=1;f++){const d=o+f,_=u*(1-Math.abs(f)*.3);Ni(e,l,d,h,_,s,we,t)}return{x:l,y:o,z:h}}function X_(e,t,n){const{gravity:i=.015,phototropism:s=.008,weightEffect:a=.5,tipRecovery:o=.7}=n,r=e*a,c=i*(1+r),l=s*Pn(e)*o;return t-c+l}function An(e,t,n,i,s,a){const{angle:o,elevation:r,length:c,startRadius:l,bark:h,order:u=0,maxOrder:f=3,childProb:d=.45,childAngleVar:_=.8,taperRate:g=.7,leafConfig:m=null,physics:p={}}=a,x=[];let M=n,v=i,T=s,b=o,E=r;const w=t.range(0,1e3),S=.08/(u+1),y=.08,A=g-u*.08;let I=t.range(0,.5);const L=.06+u*.04;for(let D=0;D<c;D++){const F=D/c,O=1-Math.pow(F,.8+u*.2)*A,X=Math.max(.5,l*O),V=t.fbm(D*y+w,2,2,.5)-.5;b+=V*S,E=X_(F,E,p);const tt=Math.cos(E),et=1;if(M+=Math.cos(b)*tt*et,v+=Math.sin(E)*et,T+=Math.sin(b)*tt*et,X>=1?xs(e,M,v,T,X,h,xe,t,.04):Mt(e,M,v,T,t.colorVariation(h,.04),xe),u>=f-1&&m&&F>.3&&t.chance(.12)){const U=t.intRange(3,8),B=vn(t,m);for(let $=0;$<U;$++){const N=M+t.range(-m.leafSpread,m.leafSpread),k=v+t.range(-m.leafSpread*.3,m.leafSpread*.5),J=T+t.range(-m.leafSpread,m.leafSpread);Mt(e,N,k,J,Ke(t,B,.02),le)}}if(I+=1/c,u<f&&F>.12&&F<.88&&I>=L&&(I=0,t.chance(d*(1-F*.3)))){const U=t.chance(.5)?1:-1,B=b+U*(.4+t.range(0,_)),$=E+t.range(-.2,.3),N=Math.floor(c*t.range(.3,.6)/(u+1)),k=Math.max(.5,X*.7);x.push(...An(e,t,M,v,T,{angle:B,elevation:$,length:N,startRadius:k,bark:h,order:u+1,maxOrder:f,childProb:d*.7,childAngleVar:_,taperRate:g,leafConfig:m,physics:p}))}}return m&&u>=1&&Y_(e,t,M,v,T,b,E,m),x.push({x:M,y:v,z:T,angle:b,elevation:E}),x}function Y_(e,t,n,i,s,a,o,r){const{color:c,twigCount:l=[3,6],twigLength:h=[4,10],leavesPerTwig:u=[5,15],leafSpread:f=6,leafBias:d=.3}=r,_=t.intRange(l[0],l[1]);for(let g=0;g<_;g++){const m=a+t.range(-1.2,1.2),p=o+t.range(-.3,.5),x=t.intRange(h[0],h[1]),M=vn(t,r);let v=n,T=i,b=s;for(let E=0;E<x;E++){const w=E/x;if(v+=Math.cos(m)*Math.cos(p)*.8,T+=Math.sin(p)*.8+d*w,b+=Math.sin(m)*Math.cos(p)*.8,E>0&&Mt(e,v,T,b,Ke(t,M,.03),le),w>.3||E===x-1){const S=E===x-1?t.intRange(u[0],u[1]):t.intRange(1,3);for(let y=0;y<S;y++){const A=v+t.range(-f,f),I=T+t.range(-f*.4,f*.6),L=b+t.range(-f,f);Mt(e,A,I,L,Ke(t,M,.02),le)}}}}}function Lr(e,t,n,i,s,a){const{radius:o,height:r,color:c,density:l=.4,shellThickness:h=.3,voidChance:u=.15}=a,f=[],d=o,_=r*.5,g=o;for(let m=-d;m<=d;m++)for(let p=-_;p<=_;p++)for(let x=-g;x<=g;x++){const M=m/d,v=p/_,T=x/g,b=Math.sqrt(M*M+v*v+T*T);if(b<=1){const E=b>1-h,w=E?l:l*.3;if(!E&&t.chance(u))continue;if(t.chance(w)){const S=vn(t,a),y=n+m,A=i+p,I=s+x;Mt(e,y,A,I,Ke(t,S,.02),le),f.push({x:y,y:A,z:I})}}}return f}function q_(e){const t=new Map,n=e.intRange(250,340),i=[.84,.8,.72],a=Dn(t,e,{height:n,baseRadius:5,topRadius:2,bark:i,markColor:[.22,.2,.18],markProb:.1,lean:.008,curvature:.05,curveFreq:.015}),o={color:[.42,.6,.22],palette:[[.26,.38,.16],[.34,.48,.19],[.42,.6,.22],[.54,.68,.28],[.64,.74,.33]],twigCount:[4,8],twigLength:[5,12],leavesPerTwig:[8,18],leafSpread:6,leafBias:.2},r={gravity:.012,phototropism:.01,weightEffect:.3,tipRecovery:.8},c=e.intRange(20,32),l=[.35,.92];for(let f=0;f<c;f++){const d=f/c,_=Math.floor(n*Zn(l[0],l[1],d)),g=a[Math.min(_,a.length-1)],m=e.range(0,Math.PI*2),p=Ln(t,e,g,m,i);An(t,e,p.x,p.y,p.z,{angle:m,elevation:e.range(.15,.45),length:e.intRange(28,55),startRadius:e.range(1.5,2.5),bark:[.78,.74,.66],order:0,maxOrder:3,childProb:.6,childAngleVar:.6,taperRate:.72,leafConfig:o,physics:r})}const h=Math.max(0,a.length-e.intRange(8,15)),u=e.intRange(2,3);for(let f=0;f<u;f++){const d=h+e.intRange(0,6),_=a[Math.min(d,a.length-1)],g=f/u*Math.PI*2+e.range(-.5,.5),m=e.range(.35,.7);An(t,e,_.x,_.y,_.z,{angle:g,elevation:m,length:e.intRange(10,20),startRadius:e.range(1.2,2),bark:[.78,.74,.66],order:0,maxOrder:3,childProb:.55,childAngleVar:.5,taperRate:.72,leafConfig:o,physics:r})}return t}function qr(e,t){const n=new Map,i=e.intRange(235,320),s=[.84,.82,.74],o=Dn(n,e,{height:i,baseRadius:5.5,topRadius:2.2,bark:s,markColor:[.24,.24,.22],markProb:.12,lean:.012,curvature:.08,curveFreq:.014,flareAmount:.48}),r={color:t[2],palette:t,twigCount:[4,8],twigLength:[5,11],leavesPerTwig:[10,20],leafSpread:7,leafBias:.22},c={gravity:.013,phototropism:.01,weightEffect:.36,tipRecovery:.82},l=[.34,.9],h=e.intRange(18,28);for(let f=0;f<h;f++){const d=f/Math.max(1,h-1),_=Math.floor(i*Zn(l[0],l[1],d)),g=o[Math.min(_,o.length-1)],m=e.range(0,Math.PI*2),p=Ln(n,e,g,m,s);An(n,e,p.x,p.y,p.z,{angle:m,elevation:e.range(.08,.38),length:e.intRange(34,62),startRadius:e.range(1.6,2.8),bark:[.76,.74,.68],order:0,maxOrder:3,childProb:.58,childAngleVar:.65,taperRate:.72,leafConfig:r,physics:c})}const u=o[Math.max(0,o.length-e.intRange(24,42))];for(let f=0;f<e.intRange(6,10);f++)Lr(n,e,u.x+e.range(-26,26),u.y+e.range(4,24),u.z+e.range(-26,26),{...r,radius:e.range(18,28),height:e.range(20,30),density:.28,shellThickness:.36,voidChance:.18});return n}function $_(e){return qr(e,[[.32,.48,.16],[.4,.58,.2],[.48,.66,.24],[.62,.72,.28],[.76,.78,.34]])}function Z_(e){return qr(e,[[.46,.38,.1],[.64,.52,.12],[.82,.7,.16],[.92,.8,.22],[.98,.88,.36]])}function j_(e){return qr(e,[[.34,.14,.08],[.52,.18,.1],[.7,.24,.12],[.82,.34,.14],[.92,.48,.2]])}function K_(e){const t=new Map,n=e.intRange(270,360),i=[.42,.34,.24],a=Dn(t,e,{height:n,baseRadius:5,topRadius:2,bark:i,markColor:[.28,.22,.16],markProb:.08,lean:.01,curvature:.05,curveFreq:.012,flareAmount:.34}),o={color:[.34,.56,.18],palette:[[.22,.38,.12],[.28,.46,.15],[.34,.56,.18],[.42,.62,.22],[.54,.68,.28]],twigCount:[3,6],twigLength:[4,9],leavesPerTwig:[8,16],leafSpread:5,leafBias:.18},r={gravity:.01,phototropism:.012,weightEffect:.24,tipRecovery:.88},c=[.42,.94],l=e.intRange(16,24);for(let f=0;f<l;f++){const d=f/Math.max(1,l-1),_=Math.floor(n*Zn(c[0],c[1],d)),g=a[Math.min(_,a.length-1)],m=e.range(0,Math.PI*2),p=Ln(t,e,g,m,i);An(t,e,p.x,p.y,p.z,{angle:m,elevation:e.range(.35,.75),length:e.intRange(11,21),startRadius:e.range(1.2,2.1),bark:[.36,.3,.22],order:0,maxOrder:3,childProb:.46,childAngleVar:.42,taperRate:.74,leafConfig:o,physics:r})}const h=Math.floor(a.length*.35);for(let f=h;f<a.length;f+=e.intRange(8,13)){const d=a[f];Lr(t,e,d.x+e.range(-5,5),d.y+e.range(-2,4),d.z+e.range(-5,5),{...o,radius:e.range(10,15),height:e.range(18,26),density:.34,shellThickness:.42,voidChance:.14})}const u=a[a.length-1];return Lr(t,e,u.x,u.y+6,u.z,{...o,radius:e.range(9,13),height:e.range(16,22),density:.36,shellThickness:.44,voidChance:.12}),t}function J_(e){const t=new Map,n=[.28,.2,.12],i=[.18,.38,.12],s=e.intRange(55,75),a=Dn(t,e,{height:s,baseRadius:5,topRadius:3,bark:n,lean:.015,curvature:.1,curveFreq:.03,flareAmount:.6}),o=Math.floor(s*.65),r=e.intRange(12,18);for(let c=0;c<r;c++){const l=[],h=c/r*Math.PI*2+e.range(-.2,.2),u=e.intRange(o,s-2),f=a[Math.min(u,a.length-1)],d=Ln(t,e,f,h,n),_=e.intRange(25,40),g=e.range(.25,.5);let m=d.x,p=d.y,x=d.z,M=g;const v=e.range(0,1e3);for(let b=0;b<_;b++){const E=b/_,w=Math.max(1,2-E*1.2),S=e.fbm(b*.06+v,2,2,.5)-.5;M+=S*.015,m+=Math.cos(h+S*.08)*Math.cos(M),p+=Math.sin(M),x+=Math.sin(h+S*.08)*Math.cos(M);const y=Math.round(w);for(let A=-y;A<=y;A++)for(let I=-y;I<=y;I++)for(let L=-y;L<=y;L++)A*A+I*I+L*L<=w*w&&Mt(t,m+A,p+I,x+L,e.colorVariation(n,.04),xe);if(E>.1&&e.chance(.55)){const A=h+e.range(-.9,.9),I=M+e.range(-.1,.45),L=e.intRange(12,22);let D=m,F=p,O=x;for(let X=0;X<L;X++){const V=X/L,tt=Math.max(.8,1.5-V*1);D+=Math.cos(A)*Math.cos(I)*.9,F+=Math.sin(I)*.9,O+=Math.sin(A)*Math.cos(I)*.9;const et=Math.round(tt);for(let U=-et;U<=et;U++)for(let B=-et;B<=et;B++)for(let $=-et;$<=et;$++)U*U+B*B+$*$<=tt*tt&&Mt(t,D+U,F+B,O+$,e.colorVariation(n,.04),xe);V>.15&&e.chance(.7)&&No(t,e,D,F,O,A+e.range(-.7,.7),I+e.range(-.2,.4),n,i,l)}No(t,e,D,F,O,A+e.range(-.5,.5),I+e.range(-.1,.3),n,i,l)}}for(let b=0;b<e.intRange(6,12);b++)No(t,e,m,p,x,h+e.range(-.8,.8),M+e.range(-.2,.4),n,i,l);const T=e.intRange(12,18);for(let b=0;b<T&&l.length!==0;b++){const E=e.pick(l),w=Math.atan2(E.z,E.x),S=E.x+Math.cos(w)*e.range(2,5)+e.range(-2,2),y=E.y+e.range(-5,-1),A=E.z+Math.sin(w)*e.range(2,5)+e.range(-2,2),I=e.colorVariation([.75,.1,.08],.08),L=2;for(let D=-L;D<=L;D++)for(let F=-L;F<=L;F++)for(let O=-L;O<=L;O++)Mt(t,S+D,y+F,A+O,e.colorVariation(I,.03),Ri)}}return t}function No(e,t,n,i,s,a,o,r,c,l){const h=t.intRange(6,12),u=vn(t,c);let f=n,d=i,_=s;for(let p=0;p<h;p++)f+=Math.cos(a)*Math.cos(o)*.8,d+=Math.sin(o)*.8,_+=Math.sin(a)*Math.cos(o)*.8,Mt(e,f,d,_,t.colorVariation(r,.05),xe);const g=t.intRange(12,25),m=t.range(6,10);for(let p=0;p<g;p++){const x=f+t.range(-m,m),M=d+t.range(-m*.5,m*.8),v=_+t.range(-m,m);Mt(e,x,M,v,Ke(t,u,.02),le)}l.push({x:f,y:d,z:_})}function Q_(e){const t=new Map,n=e.intRange(110,150),i=[.35,.24,.14],s=Dn(t,e,{height:n,baseRadius:5,topRadius:2.5,bark:i,lean:.03,curvature:.1,curveFreq:.025}),a={color:[.2,.42,.12],palette:[[.12,.28,.08],[.16,.36,.1],[.2,.42,.12],[.28,.5,.16],[.36,.58,.2]],twigCount:[3,6],twigLength:[3,7],leavesPerTwig:[6,14],leafSpread:6,leafBias:.1},o={gravity:.014,phototropism:.008,weightEffect:.5,tipRecovery:.6},r=e.intRange(16,24);for(let c=0;c<r;c++){const l=c/r*Math.PI*2+e.range(-.25,.25),h=Math.floor(n*e.range(.28,.5)),u=s[Math.min(h,s.length-1)],f=Ln(t,e,u,l,i),d=An(t,e,f.x,f.y,f.z,{angle:l,elevation:e.range(.05,.35),length:e.intRange(30,50),startRadius:e.range(2,3.5),bark:i,order:0,maxOrder:3,childProb:.7,childAngleVar:.65,taperRate:.7,leafConfig:a,physics:o}),_=e.intRange(12,18);for(let g=0;g<_&&d.length!==0;g++){const m=e.pick(d),p=Math.atan2(m.z,m.x),x=m.x+Math.cos(p)*e.range(2,5)+e.range(-2,2),M=m.y+e.range(-5,-1),v=m.z+Math.sin(p)*e.range(2,5)+e.range(-2,2),T=e.colorVariation([.95,.55,.1],.06),b=2;for(let E=-b;E<=b;E++)for(let w=-b;w<=b;w++)for(let S=-b;S<=b;S++)Mt(t,x+E,M+w,v+S,e.colorVariation(T,.03),Ri)}}for(let c=0;c<e.intRange(40,64);c++){const l=e.intRange(Math.floor(n*.35),n-5),h=s[Math.min(l,s.length-1)],u=e.range(0,Math.PI*2),f=Ln(t,e,h,u,i);An(t,e,f.x,f.y,f.z,{angle:u,elevation:e.range(-.1,.3),length:e.intRange(20,40),startRadius:e.range(1.5,2.5),bark:i,order:1,maxOrder:3,childProb:.6,childAngleVar:.7,taperRate:.72,leafConfig:a,physics:o})}return t}function tg(e){const t=new Map,n=e.intRange(130,170),i=[.32,.24,.16],s=Dn(t,e,{height:n,baseRadius:9,topRadius:4,bark:i,markColor:[.25,.18,.1],markProb:.12,lean:.08,curvature:.4,curveFreq:.012,flareHeight:.1,flareAmount:1.2}),a=Math.floor(n*.75),o=e.intRange(36,54);for(let r=0;r<o;r++){const c=e.intRange(a,n-3),l=s[Math.min(c,s.length-1)],h=e.range(0,Math.PI*2),u=(c-a)/(n-a),f=Ln(t,e,l,h,i),d=1-u*u*.7,_=e.intRange(Math.round(d*65),Math.round(d*120)),g=Math.max(1,3*(1-u*.5));let m=f.x,p=f.y,x=f.z,M=e.range(.05+u*.2,.3+u*.25),v=h;const T=e.range(0,1e3);let b=e.intRange(4,8);for(let E=0;E<_;E++){const w=E/_,S=Math.min(1.5,Math.max(.5,g*(1-w*.75))),y=Pn(w);M=Zn(M,-.9,y*.04);const A=e.fbm(E*.08+T,3,2,.5)-.5;v+=A*.06,M+=A*.015,--b<=0&&(v+=e.range(-.45,.45),M+=e.range(-.2,.15),b=e.intRange(4,8)),m+=Math.cos(v)*Math.cos(M)*1,p+=Math.sin(M)*.8,x+=Math.sin(v)*Math.cos(M)*1,S>=1?xs(t,m,p,x,S,i,xe,e,.04):Mt(t,m,p,x,e.colorVariation(i,.04),xe);const I=.55-w*.3,L=Math.round(6+(1-w)*8),D=2+(1-w)*3;if(e.chance(I)){const F=vn(e,[.35,.55,.2]);for(let O=0;O<e.intRange(Math.floor(L*.6),L);O++)Mt(t,m+e.range(-D,D),p+e.range(-D*.5,D*.7),x+e.range(-D,D),Ke(e,F,.02),le)}w>.15&&e.chance(.28)&&ka(t,e,m,p,x,w),w>.2&&e.chance(6/_)&&eg(t,e,m,p,x,v,i)}for(let E=0;E<e.intRange(16,32);E++)ka(t,e,m,p,x,1)}return t}function eg(e,t,n,i,s,a,o){const r=t.intRange(8,16),c=a+t.range(-1.2,1.2);let l=t.range(-.1,.5),h=n,u=i,f=s;const _=vn(t,[.35,.55,.2]);for(let g=0;g<r;g++){if(l+=t.range(-.05,.05),h+=Math.cos(c)*Math.cos(l)*.8,u+=Math.sin(l)*.8,f+=Math.sin(c)*Math.cos(l)*.8,Mt(e,h,u,f,t.colorVariation(o,.05),xe),t.chance(.3+g/r*.4))for(let m=0;m<t.intRange(2,4);m++)Mt(e,h+t.range(-2,2),u+t.range(-1,2),f+t.range(-2,2),Ke(t,_,.02),le);t.chance(.25)&&ka(e,t,h,u,f,.7)}for(let g=0;g<t.intRange(4,8);g++)Mt(e,h+t.range(-3,3),u+t.range(-1,3),f+t.range(-3,3),Ke(t,_,.02),le);for(let g=0;g<t.intRange(2,4);g++)ka(e,t,h,u,f,.8)}function ka(e,t,n,i,s,a=.5){const o=Math.max(20,Math.floor(i*.75)),r=.2+a*.8,c=t.intRange(Math.floor(o*r*.5),Math.floor(o*r));let l=n,h=i,u=s;const f=t.range(0,1e3),d=t.range(0,1e3),_=[.38,.56,.22],m=vn(t,[.32,.48,.18]),p=vn(t,_);for(let x=0;x<c;x++){const M=t.fbm(x*.08+f,2,2,.5)-.5,v=t.fbm(x*.08+d,2,2,.5)-.5;if(l+=M*.1,h-=1,u+=v*.1,h<2)break;Mt(e,l,h,u,Ke(t,m,.02),le),x<c*.3&&t.chance(.15)&&Mt(e,l+t.range(-1,1),h,u+t.range(-1,1),Ke(t,p,.02),le)}}function ng(e){const t=new Map,n=e.intRange(180,260),i=[.38,.22,.13],s=Dn(t,e,{height:n,baseRadius:4,topRadius:2,bark:i,lean:.01,curvature:.04,curveFreq:.012,flareAmount:.4}),a={color:[.12,.3,.1],palette:[[.06,.16,.05],[.08,.22,.07],[.12,.3,.1],[.18,.38,.12]],twigCount:[3,6],twigLength:[3,6],leavesPerTwig:[8,15],leafSpread:5,leafBias:0},o={gravity:.02,phototropism:.004,weightEffect:.4,tipRecovery:.3},r=Math.floor(n*.15),c=e.intRange(10,16);for(let h=0;h<c;h++){const u=h/c,f=Math.floor(r+(n-r-5)*u),d=s[Math.min(f,s.length-1)],_=Math.round((1-u*.85)*35+8),g=e.intRange(3,6);for(let m=0;m<g;m++){const p=m/g*Math.PI*2+e.range(-.2,.2),x=Ln(t,e,d,p,i);An(t,e,x.x,x.y,x.z,{angle:p,elevation:e.range(-.25,-.05),length:e.intRange(Math.floor(_*.7),_),startRadius:e.range(1,2),bark:i,order:1,maxOrder:2,childProb:.55,childAngleVar:.5,taperRate:.75,leafConfig:a,physics:o})}}const l=s[s.length-1];for(let h=0;h<e.intRange(8,14);h++){const u=Math.min(s.length-1,s.length-1-e.intRange(0,8)),f=s[u];An(t,e,f.x,f.y,f.z,{angle:e.range(0,Math.PI*2),elevation:e.range(.3,.85),length:e.intRange(4,10),startRadius:1,bark:i,order:1,maxOrder:2,childProb:.3,childAngleVar:.4,taperRate:.8,leafConfig:a,physics:o})}return An(t,e,l.x,l.y,l.z,{angle:e.range(0,Math.PI*2),elevation:e.range(.8,1.2),length:e.intRange(8,14),startRadius:1,bark:i,order:1,maxOrder:2,childProb:.25,childAngleVar:.3,taperRate:.85,leafConfig:a,physics:o}),t}function ig(e){const t=new Map,n=[.42,.32,.22],i=e.intRange(55,85),s=Dn(t,e,{height:i,baseRadius:4,topRadius:2.5,bark:n,lean:.06,curvature:.12,curveFreq:.02,flareHeight:.06,flareAmount:.3}),a=Math.floor(i*.5),o=i,r=e.intRange(3,6);for(let c=0;c<r;c++){const l=e.intRange(a,o),h=s[Math.min(l,s.length-1)],u=c/r*Math.PI*2+e.range(-.5,.5),f=(l-a)/(o-a),d=.35+f*.2,_=.6+f*.25,g=Math.round((1-f)*6);xh(t,e,h.x,h.y,h.z,{angle:u,elevation:e.range(d,_),length:e.intRange(10+g,18+g),radius:e.range(2,2.8),depth:0,maxDepth:e.intRange(2,4),bark:n})}return t}function xh(e,t,n,i,s,a){const{angle:o,elevation:r,length:c,radius:l,depth:h,maxDepth:u,bark:f}=a;let d=n,_=i,g=s,m=o,p=r;const x=t.range(0,1e3);let M=t.intRange(3,5);for(let v=0;v<c;v++){const T=v/c,b=Math.max(.8,l*(1-T*.55)),E=t.fbm(v*.12+x,3,2,.5)-.5;m+=E*.05,p+=E*.02,--M<=0&&(m+=t.range(-.5,.5),p+=t.range(-.2,.2),M=t.intRange(3,5)),d+=Math.cos(m)*Math.cos(p),_+=Math.sin(p),g+=Math.sin(m)*Math.cos(p);const w=Math.round(b);if(w<=1)Mt(e,d,_,g,t.colorVariation(f,.04),we);else for(let S=-w;S<=w;S++)for(let y=-w;y<=w;y++)for(let A=-w;A<=w;A++)S*S+y*y+A*A<=b*b&&Mt(e,d+S,_+y,g+A,t.colorVariation(f,.04),we)}if(h<u){const v=t.intRange(2,3);for(let T=0;T<v;T++)xh(e,t,d,_,g,{angle:m+t.range(-.7,.7),elevation:t.range(.3,.65),length:Math.floor(c*t.range(.5,.7)),radius:Math.max(.8,l*.75),depth:h+1,maxDepth:u,bark:f})}else sg(e,t,d,_,g)}function sg(e,t,n,i,s){const a=[.32,.45,.2],o=t.intRange(6,10);for(let r=0;r<o;r++){const c=t.range(0,Math.PI*2),l=t.range(-.2,.8),h=t.intRange(4,8),u=vn(t,a);for(let f=0;f<h;f++){const d=f/h>.7?(f/h-.7)*.4:0,_=n+Math.cos(c)*Math.cos(l-d)*f*.7,g=i+Math.sin(l-d)*f*.7,m=s+Math.sin(c)*Math.cos(l-d)*f*.7;Mt(e,_,g,m,Ke(t,u,.02),le)}}}function ag(e){const t=new Map,n=[.45,.4,.25],i=e.intRange(60,90),s=Dn(t,e,{height:i,baseRadius:5,topRadius:3.5,bark:n,markColor:[.38,.35,.2],markProb:.15,lean:.04,curvature:.08,curveFreq:.02,flareHeight:.06,flareAmount:.3}),a=s[s.length-1],o=[.2,.5,.12],r=[.25,.42,.15],c=e.intRange(24,36);for(let h=0;h<c;h++){const u=vn(e,o),f=h/c*Math.PI*2+e.range(-.3,.3),d=Math.min(s.length-1,s.length-1-e.intRange(0,8)),_=s[d],g=1-d/(s.length-1);let m=_.x,p=_.y,x=_.z;const M=e.intRange(6,14);let v=e.range(.6,1)-g*.6;const T=[.3,.42,.18];for(let V=0;V<M;V++)v-=e.range(.01,.04)+g*.02,m+=Math.cos(f)*Math.cos(v)*.9,p+=Math.sin(v)*.9,x+=Math.sin(f)*Math.cos(v)*.9,Mt(t,m,p,x,e.colorVariation(T,.04),xe);const b=e.next(),E=b<.2,w=b>.75,S=!E&&!w&&b>.5,y=g*.4;let A=E?e.range(1.1,1.4)-y:w?e.range(.2,.5)-y:S?e.range(.5,.9)-y:e.range(.7,1.1)-y;const I=E?.3-y:w?e.range(-1.5,-1.2)-y*.3:S?e.range(-1.3,-.9)-y*.3:e.range(-.8,-.3)-y*.5,L=E?e.intRange(30,48):w||S?e.intRange(48,75):e.intRange(48,70),D=E?e.range(5,7):w||S?e.range(7,10):e.range(7,12),F=E?.7:w?e.range(.05,.15):S?e.range(.12,.25):e.range(.25,.45),O=w?.14:S?.1:.06;let X=e.intRange(6,12);for(let V=0;V<L;V++){const tt=V/L;if(tt<F)A-=e.range(.002,.008);else{const $=(tt-F)/(1-F);A=Zn(A,I,Pn($)*O)}--X<=0&&(A+=e.range(-.08,.06),X=e.intRange(6,12)),m+=Math.cos(f)*Math.cos(A)*.9,p+=Math.sin(A)*.9,x+=Math.sin(f)*Math.cos(A)*.9,Mt(t,m,p,x,e.colorVariation(r,.04),xe);const et=f+Math.PI/2,U=tt<.85?Math.sin(Math.min(tt*1.5,1)*Math.PI*.5):Math.cos((tt-.85)/.15*Math.PI*.5),B=Math.round(U*D);for(let $=-B;$<=B;$++){if($===0)continue;const N=Math.abs($)/Math.max(1,B),k=m+Math.cos(et)*$*.5,J=N*N*-.6,K=p+J,Q=x+Math.sin(et)*$*.5;!E&&tt>.3&&N>.6&&e.chance(.2)||Mt(t,k,K,Q,Ke(e,u,.02),le)}}}const l=e.intRange(2,4);for(let h=0;h<l;h++){const u=h/l*Math.PI*2+e.range(-.4,.4);let f=a.x+Math.cos(u)*4,d=a.y-2-h*3,_=a.z+Math.sin(u)*4;const g=[.35,.3,.18],m=e.intRange(10,16);for(let b=0;b<m;b++){d-=1,f+=Math.cos(u)*.15,_+=Math.sin(u)*.15;for(let E=-1;E<=1;E++)for(let w=-1;w<=1;w++)E*E+w*w<=1&&Mt(t,f+E,d,_+w,e.colorVariation(g,.04),xe)}const p=e.intRange(5,8),x=[.9,.82,.22],M=[.45,.55,.2];for(let b=0;b<p;b++){const E=d+b*4+e.range(0,1.5),w=u+b*.9,S=e.intRange(6,10);for(let y=0;y<S;y++){const A=w+(y/S-.5)*2,I=e.intRange(7,10);for(let L=0;L<I;L++){const D=L*L*.04,F=(L+1)*.9,O=f+Math.cos(A)*F,X=E-L*.35+D,V=_+Math.sin(A)*F,tt=L>I-2?M:x;Mt(t,O,X,V,e.colorVariation(tt,.05),Ri),Mt(t,O,X+1,V,e.colorVariation(tt,.05),Ri),Mt(t,O+Math.cos(A)*.3,X,V+Math.sin(A)*.3,e.colorVariation(tt,.05),Ri),Mt(t,O+Math.cos(A)*.3,X+1,V+Math.sin(A)*.3,e.colorVariation(tt,.05),Ri)}}}const v=[.55,.15,.2],T=d-3;for(let b=-3;b<=3;b++)for(let E=-6;E<=0;E++)for(let w=-3;w<=3;w++)b*b*.4+(E+3)*(E+3)*.12+w*w*.4<=3.5&&Mt(t,f+b,T+E,_+w,e.colorVariation(v,.05),le)}return t}function og(e){const t=new Map,n=[.5,.42,.3],i=e.next();let s;i<.33?s={height:e.intRange(75,113),baseRadius:4,topRadius:2.5,bark:n,markColor:[.42,.36,.22],markProb:.2,darkMarkColor:[.24,.16,.1],darkMarkProb:.28,lean:.35,curvature:.15,curveFreq:.01,flareHeight:.08,flareAmount:.35}:i<.66?s={height:e.intRange(128,173),baseRadius:4,topRadius:2.5,bark:n,markColor:[.42,.36,.22],markProb:.2,darkMarkColor:[.24,.16,.1],darkMarkProb:.28,lean:.18,curvature:.5,curveFreq:.012,flareHeight:.06,flareAmount:.3}:s={height:e.intRange(135,195),baseRadius:4,topRadius:2.5,bark:n,markColor:[.42,.36,.22],markProb:.2,darkMarkColor:[.24,.16,.1],darkMarkProb:.28,lean:.06,curvature:.2,curveFreq:.018,flareHeight:.05,flareAmount:.25};const a=W_(t,e,s),o=a[a.length-1],r=[.18,.48,.14],c=[.28,.44,.18],l=[.52,.4,.16],h=[.42,.32,.14];function u(p,x,M=!1,v=0){const T=vn(e,M?l:r),b=p/x*Math.PI*2+v+e.range(-.3,.3),E=M?e.intRange(4,9):e.intRange(0,6),w=Math.min(a.length-1,a.length-1-E),S=a[w],y=1-w/(a.length-1);let A=S.x,I=S.y,L=S.z;const D=M?e.intRange(6,11):e.intRange(5,10);let F=(M?e.range(.25,.55):e.range(.7,1.2))-y*(M?.65:.5);const O=M?[.38,.3,.14]:[.32,.44,.2];for(let Q=0;Q<D;Q++)F-=e.range(.01,M?.045:.03)+y*(M?.02:.015),A+=Math.cos(b)*Math.cos(F)*.9,I+=Math.sin(F)*.9,L+=Math.sin(b)*Math.cos(F)*.9,Mt(t,A,I,L,e.colorVariation(O,.04),xe);const X=M?1:e.next(),V=!M&&X<.2,tt=M||X>.75,et=!M&&!V&&!tt&&X>.5,U=y*(M?.55:.4);let B=M?e.range(-.15,.15)-U:V?e.range(1,1.3)-U:tt?e.range(.1,.4)-U:et?e.range(.4,.8)-U:e.range(.6,1)-U;const $=M?e.range(-2.15,-1.75)-U*.35:V?.2-U:tt?e.range(-1.5,-1.2)-U*.3:et?e.range(-1.3,-.9)-U*.3:e.range(-.8,-.3)-U*.5,N=M?e.intRange(47,67):V?e.intRange(35,55):e.intRange(55,85),k=M?e.range(.02,.08):V?.7:tt?e.range(.05,.15):et?e.range(.12,.25):e.range(.25,.45),J=M?.2:tt?.14:et?.1:.06;let K=e.intRange(6,12);for(let Q=0;Q<N;Q++){const lt=Q/N;if(lt<k)B-=e.range(.002,M?.014:.008);else{const bt=(lt-k)/(1-k);B=Zn(B,$,Pn(bt)*J)}--K<=0&&(B+=e.range(M?-.12:-.08,M?.03:.06),K=e.intRange(6,12)),A+=Math.cos(b)*Math.cos(B)*.9,I+=Math.sin(B)*.9,L+=Math.sin(b)*Math.cos(B)*.9,Mt(t,A,I,L,e.colorVariation(M?h:c,.04),xe);const ft=b+Math.PI/2;if(lt>.08&&e.chance(M?.58:.7)){const bt=M?e.intRange(4,7):e.intRange(5,10);for(let St=-1;St<=1;St+=2){const Kt=ft+St*e.range(.1,.3);let z=A,fe=I,zt=L;for(let Ot=1;Ot<=bt;Ot++){const Tt=Ot/bt;z+=Math.cos(Kt)*St*.5*(1-Tt*.5),fe-=(M?.42:.3)+Tt*(M?.85:.6),zt+=Math.sin(Kt)*St*.5*(1-Tt*.5),Mt(t,z,fe,zt,Ke(e,T,.02),le)}}}}}const f=e.intRange(18,28);for(let p=0;p<f;p++)u(p,f,!1);const d=e.intRange(2,3),_=e.range(0,Math.PI*2);for(let p=0;p<d;p++)u(p,d,!0,_);const g=e.intRange(4,8),m=[.48,.35,.18];for(let p=0;p<g;p++){const x=e.range(0,Math.PI*2),M=e.range(2,5),v=o.x+Math.cos(x)*M,T=o.y-e.range(1,4),b=o.z+Math.sin(x)*M,E=5;for(let w=-E;w<=E;w++)for(let S=-E;S<=E;S++)for(let y=-E;y<=E;y++)w*w+S*S+y*y<=E*E&&Mt(t,v+w,T+S,b+y,e.colorVariation(m,.06),Ri)}return t}function Tl(e,t,n){const{startX:i=0,startY:s=0,startZ:a=0,height:o,startRadius:r,endRadius:c,bark:l,direction:h=0,leanDistance:u=10,sideAmplitude:f=6,sideTurns:d=1.1,flareBoost:_=0,returnPull:g=.12}=n,m=[],p=Math.cos(h),x=Math.sin(h),M=-x,v=p,T=t.range(-.18,.18),b=t.range(-.24,.24);for(let E=0;E<o;E++){const w=E/Math.max(1,o-1),S=w<.18?1+(1-w/.18)*_:1,y=Math.max(1,Zn(r,c,w)*S),A=u*Pn(w)-Math.max(0,(w-.8)/.2)*u*g,I=Math.sin(w*Math.PI),L=Math.sin((w+T)*Math.PI*d)*f*I,D=Math.sin((w*2+b)*Math.PI)*f*.26*(1-w*.35),F=i+p*A+M*(L+D),O=a+x*A+v*(L+D),X=s+E;y>=1.2?Ni(e,F,X,O,y,l,we,t):Mt(e,F,X,O,t.colorVariation(l,.04),we),m.push({x:F,y:X,z:O,r:y})}return m}function rg(e,t,n,i,s,a,o,r){const c=Math.ceil(o),l=t.range(0,Math.PI*2);for(let h=0;h<=c;h++){const u=h/Math.max(1,c),f=a*(1-u*.42),d=Math.ceil(f),_=u<.3?1.08:1-(u-.3)*.18;for(let g=-d;g<=d;g++)for(let m=-d;m<=d;m++){const p=Math.atan2(m,g),x=Math.sqrt(g*g+m*m*1.08),M=.78+Math.sin(p*3+l)*.14+Math.cos(p*2-l*.7)*.12,v=f*_*M;x>v||h===c&&x>v*.78&&!t.chance(.2)||Mt(e,n+g,i+h,s+m,t.colorVariation(t.pick(r),.04),we)}}}function cg(e,t,n,i,s,a){const o=t.intRange(10,18);for(let r=0;r<o;r++){const c=t.range(0,Math.PI*2),l=t.range(0,3.5),h=t.intRange(3,8);let u=n+Math.cos(c)*l,f=i,d=s+Math.sin(c)*l,_=c+t.range(-.5,.5);for(let g=0;g<h;g++){const m=g/Math.max(1,h-1);_+=t.range(-.04,.04),u+=Math.cos(_)*.18*m,f+=1,d+=Math.sin(_)*.18*m,Mt(e,u,f,d,t.colorVariation(t.pick(a),.04),le)}}}function lg(e,t,n,i,s,a,o,r,c){let l=n,h=i,u=s,f=a,d=t.range(.12,.26);const _=t.chance(.5)?1:-1,g=t.range(-.18,.18),m=t.range(-.2,.2);for(let p=0;p<o;p++){const x=p/Math.max(1,o-1),M=Math.max(.5,r*(1-x*.78)),v=Math.sin((x+g)*Math.PI*1.2)*.025,T=Math.sin((x*2+m)*Math.PI)*.012;f+=_*(.01+v+T),d+=Math.sin((x+m)*Math.PI)*.008-.016,l+=Math.cos(f)*.95,h=Math.max(0,h+Math.sin(d)*.45+(x<.25?.08:-.06)),u+=Math.sin(f)*.95,M>=1.1?xs(e,l,h,u,Math.min(M,1.45),c,we,t,.03):Mt(e,l,h,u,t.colorVariation(c,.04),we)}}function hg(e,t,n,i){const s=[[.44,.4,.38],[.54,.5,.47],[.6,.56,.53]],a=[[.28,.46,.18],[.34,.52,.21],[.42,.58,.26]];if(t.chance(.4)){const r=t.intRange(2,4),c=t.range(0,Math.PI*2);for(let l=0;l<r;l++){const h=c+l/r*Math.PI*2+t.range(-.55,.55),u=t.range(7,15);rg(e,t,Math.cos(h)*u,0,Math.sin(h)*u,t.range(3.5,6.5),t.range(4,9),s)}}const o=t.intRange(6,10);for(let r=0;r<o;r++){const c=r/o*Math.PI*2+t.range(-.3,.3),l=t.range(2.5,5.5);lg(e,t,Math.cos(c)*l,t.range(1,4),Math.sin(c)*l,c+t.range(-.35,.35),t.intRange(12,26),t.range(1.4,2.8),n)}for(let r=0;r<t.intRange(16,26);r++){const c=t.range(0,Math.PI*2),l=t.range(8,28),h=Math.cos(c)*l,u=Math.sin(c)*l;cg(e,t,h,0,u,a),t.chance(.2)&&Mt(e,h+t.range(-1,1),1,u+t.range(-1,1),t.colorVariation(t.pick(i),.05),le)}}function ug(e){const t=new Map,n=e.intRange(130,175),i=[.33,.23,.18],s=[[.94,.74,.8],[.96,.84,.88],[.9,.62,.7],[1,.96,.97]],a=Math.floor(n*.08);for(let d=0;d<a;d++){const g=6.5+(1-d/Math.max(1,a-1))*4.2;Ni(t,0,d,0,g,i,we,e)}const o=Math.floor(n*e.range(.15,.25)),r=e.range(0,Math.PI*2),c=Tl(t,e,{startY:a,height:Math.max(8,o-a),startRadius:5.8,endRadius:4.7,bark:i,direction:r,leanDistance:e.range(10,18),sideAmplitude:e.range(6,11),sideTurns:e.range(1.05,1.45),flareBoost:.18,returnPull:.08}),l=c[c.length-1]||{x:0,z:0},h=[],u=r+e.range(-.35,.35),f=e.range(.4,.72);for(let d=0;d<2;d++){const _=u+(d===0?-f:f*e.range(.8,1.15)),g=Math.floor((n-o)*e.range(.82,1)),m=Tl(t,e,{startX:l.x,startY:o,startZ:l.z,height:g,startRadius:d===0?4.6:4.1,endRadius:e.range(1.2,1.6),bark:i,direction:_,leanDistance:e.range(d===0?18:15,d===0?30:25),sideAmplitude:e.range(d===0?9:7,d===0?16:13),sideTurns:e.range(1,1.45),flareBoost:.1,returnPull:.14});h.push(m)}hg(t,e,i,s);for(const d of h){const _=d.length;for(let m=Math.floor(_*.38);m<Math.floor(_*.9);m+=3){const p=d[m],x=(m-_*.38)/Math.max(1,_*.52),v=3.8+Math.sin(Me(x,0,1)*Math.PI)*4.8;Ai(t,e,p.x+e.range(-3,3),p.y,p.z+e.range(-3,3),v,s),e.chance(.3)&&Ci(t,e,p.x+e.range(-4,4),p.y,p.z+e.range(-4,4),s)}const g=d[Math.max(0,_-e.intRange(6,10))];for(let m=0;m<e.intRange(2,3);m++)Ai(t,e,g.x+e.range(-4,4),g.y+e.range(-3,1),g.z+e.range(-4,4),e.range(3,4.6),s),Ci(t,e,g.x+e.range(-3,3),g.y+e.range(-1,1),g.z+e.range(-3,3),s)}for(const d of h){const _=Math.floor(d.length*.16),g=e.intRange(10,15);for(let m=0;m<g;m++){const p=m/Math.max(1,g-1);if(p>.86||p>.72&&e.chance(.65))continue;const x=Math.floor(Zn(_,d.length-4,Pn(p))),M=d[Math.min(x,d.length-1)],v=d[Math.max(0,x-1)]||M,T=e.range(0,Math.PI*2),b=Ln(t,e,M,T,i),E=p,w=Math.pow(1-E,2.1),S=e.intRange(Math.round(14+w*48),Math.round(22+w*58));let y=b.x,A=b.y,I=b.z,L=e.range(.03+E*.1,.18+E*.24),D=T+Math.atan2(M.z-v.z,M.x-v.x)*.12;const F=e.chance(.5)?1:-1,O=e.range(-.18,.18),X=e.range(-.2,.2),V=e.range(.9,1.35),tt=e.range(.018,.042)*(1.08-E*.28),et=e.range(.01,.024),U=e.range(.01,.028),B=e.range(.003,.008)+(1-E)*.002,$=e.range(.012,.026);for(let N=0;N<S;N++){const k=N/Math.max(1,S-1),J=Math.max(.5,3*(1-k*.85)),K=Math.sin(k*Math.PI),Q=Math.sin((k+O)*Math.PI*V)*tt*K,lt=Math.sin((k*2+X)*Math.PI)*tt*.35*(1-k*.25);D+=F*(et+Q+lt);const ft=Math.sin((k+X)*Math.PI*1.15)*U*K;L+=ft-B*(.7+k*1.2),k>.7&&(L+=$*Pn((k-.7)/.3));const bt=1.08+(1-E)*.28;y+=Math.cos(D)*Math.cos(L)*bt,A+=Math.sin(L)*.8,I+=Math.sin(D)*Math.cos(L)*bt,J>=1.5?xs(t,y,A,I,Math.min(J,1.65),i,xe,e,.04):Mt(t,y,A,I,e.colorVariation(i,.04),xe),k>.3&&e.chance(.28+k*.3)&&(Ai(t,e,y,A,I,3+(1-k)*2,s),e.chance(.45)&&Ci(t,e,y,A,I,s)),k>.15&&k<.85&&e.chance(.22)&&fg(t,e,y,A,I,D,L,i,s)}Ai(t,e,y,A,I,5,s);for(let N=0;N<e.intRange(3,7);N++)Ci(t,e,y+e.range(-3,3),A+e.range(-1,1),I+e.range(-3,3),s)}}for(let d=0;d<e.intRange(60,110);d++){const _=e.range(-60,60),g=e.range(-60,60),m=e.pick(s);Mt(t,_,0,g,e.colorVariation(m,.04),le),e.chance(.3)&&Mt(t,_+e.range(-1,1),1,g+e.range(-1,1),e.colorVariation(m,.04),le)}return t}function fg(e,t,n,i,s,a,o,r,c){let l=a+t.range(-.9,.9),h=o+t.range(-.05,.25);const u=t.intRange(10,22);let f=n,d=i,_=s;const g=t.chance(.5)?1:-1,m=t.range(-.18,.18),p=t.range(-.2,.2),x=t.range(.95,1.45),M=t.range(.014,.03),v=t.range(.008,.02),T=t.range(.004,.008);for(let b=0;b<u;b++){const E=b/Math.max(1,u-1),w=Math.sin(E*Math.PI),S=Math.sin((E+m)*Math.PI*x)*M*w,y=Math.sin((E*2+p)*Math.PI)*M*.28*(1-E*.2);l+=g*(.008+S+y);const A=Math.sin((E+p)*Math.PI*1.2)*v*w;if(h+=A-T*(.8+E*1.1),E>.72&&(h+=.018*Pn((E-.72)/.28)),f+=Math.cos(l)*Math.cos(h)*.85,d+=Math.sin(h)*.8,_+=Math.sin(l)*Math.cos(h)*.85,Math.max(.5,2*(1-E*.8))>=1?(Mt(e,f,d,_,t.colorVariation(r,.05),xe),Mt(e,f+t.range(-.5,.5),d,_+t.range(-.5,.5),t.colorVariation(r,.05),xe)):Mt(e,f,d,_,t.colorVariation(r,.05),xe),E>.3&&t.chance(.35)&&(Ai(e,t,f,d,_,2.5+(1-E)*2,c),t.chance(.35)&&Ci(e,t,f,d,_,c)),E>.3&&t.chance(.2)){let L=l+t.range(-1.2,1.2),D=h+t.range(-.1,.2),F=f,O=d,X=_;const V=t.intRange(4,10),tt=t.chance(.5)?1:-1,et=t.range(-.2,.2);for(let U=0;U<V;U++){const B=U/Math.max(1,V-1);L+=tt*(.012+Math.sin((B+et)*Math.PI*1.15)*.025),D+=Math.sin((B+et)*Math.PI)*.01-.01,B>.7&&(D+=.016*Pn((B-.7)/.3)),F+=Math.cos(L)*Math.cos(D)*.7,O+=Math.sin(D)*.7,X+=Math.sin(L)*Math.cos(D)*.7,Mt(e,F,O,X,t.colorVariation(r,.06),xe)}Ai(e,t,F,O,X,2.5,c),t.chance(.5)&&Ci(e,t,F,O,X,c)}}Ai(e,t,f,d,_,4,c);for(let b=0;b<t.intRange(1,3);b++)Ci(e,t,f+t.range(-2,2),d,_+t.range(-2,2),c)}function Ai(e,t,n,i,s,a,o){const r=Math.max(1.5,a),c=Math.round(r*r*1.2);for(let l=0;l<c;l++){const h=t.range(-r,r),u=t.range(-r*.5,r*.4),f=t.range(-r,r);if(h*h+u*u*2+f*f<=r*r){const d=t.pick(o);Mt(e,n+h,i+u,s+f,t.colorVariation(d,.06),le)}}}function Ci(e,t,n,i,s,a){const o=Math.max(6,Math.floor(i*.25)),r=t.intRange(Math.floor(o*.4),o);let c=n,l=i,h=s;const u=t.range(0,1e3),f=t.range(0,1e3);for(let d=0;d<r;d++){const _=t.fbm(d*.1+u,2,2,.5)-.5,g=t.fbm(d*.1+f,2,2,.5)-.5;if(c+=_*.15,l-=1,h+=g*.15,l<2)break;const m=t.pick(a);Mt(e,c,l,h,t.colorVariation(m,.06),le),t.chance(.18)&&Mt(e,c+t.range(-1,1),l,h+t.range(-1,1),t.colorVariation(t.pick(a),.06),le)}}function dg(e){const t=new Map,n=e.intRange(150,210),i=[.35,.26,.18],s=Dn(t,e,{height:n,baseRadius:8,topRadius:3,bark:i,lean:.04,curvature:.25,curveFreq:.018,flareHeight:.2,flareAmount:2,numButtresses:e.intRange(4,6)}),a=e.intRange(5,10);for(let u=0;u<a;u++){const f=e.range(0,Math.PI*2),d=e.range(10,22),_=Math.cos(f)*d,g=Math.sin(f)*d,m=e.intRange(6,16),p=e.range(1.5,3);for(let M=0;M<m;M++){const v=M/m,T=p*(1-v*.5);Ni(t,_,M,g,T,i,we,e)}const x=Math.floor(d*.8);for(let M=0;M<x;M++){const v=M/x,T=_*(1-v),b=g*(1-v),E=v*3+e.range(-.5,.5);Mt(t,T,E,b,e.colorVariation(i,.04),we),e.chance(.5)&&Mt(t,T,E+1,b,e.colorVariation(i,.04),we)}}const o=[[.35,.48,.18],[.45,.5,.2],[.55,.45,.18],[.5,.38,.15],[.42,.35,.14]],r=Math.PI/12,c=Math.PI/4,l=Math.floor(n*.3),h=e.intRange(18,30);for(let u=0;u<h;u++){const f=u/h,d=Math.floor(l+(n-l)*f*.95);if(d>=s.length)continue;const _=s[d],g=e.range(0,Math.PI*2),m=Ln(t,e,_,g,i),p=e.intRange(Math.round(30+(1-f)*25),Math.round(45+(1-f)*30));let x=m.x,M=m.y,v=m.z,T=g,b=e.range(r,c)*(e.chance(.7)?1:-1);const E=e.range(0,1e3);let w=e.intRange(4,8);for(let S=0;S<p;S++){const y=S/p,A=e.fbm(S*.07+E,2,2,.5)-.5;T+=A*.06,b-=.01,y>.65&&(b+=.008),--w<=0&&(T+=e.range(-.4,.4),b+=e.range(r,c)*(e.chance(.5)?1:-1),w=e.intRange(4,8));const I=1+(1-f)*.25;x+=Math.cos(T)*Math.cos(b)*I,M+=Math.sin(b),v+=Math.sin(T)*Math.cos(b)*I;const L=Math.max(1,1.5*(1-y*.5));if(xs(t,x,M,v,L,i,xe,e,.04),y>.25&&e.chance(.1)&&Ea(t,e,x,M,v),y>.15&&y<.9&&e.chance(.2)){const D=T+e.range(-1.2,1.2);let F=e.range(r,c)*(e.chance(.5)?1:-1);const O=e.intRange(12,22);let X=x,V=M,tt=v;const et=e.range(0,1e3);let U=e.intRange(3,6);for(let B=0;B<O;B++){const $=B/O,N=e.fbm(B*.08+et,2,2,.5)-.5,k=D+N*.07;F-=.012,$>.5&&(F+=.008),--U<=0&&(F+=e.range(r,c)*(e.chance(.5)?1:-1),U=e.intRange(3,6)),X+=Math.cos(k)*Math.cos(F),V+=Math.sin(F),tt+=Math.sin(k)*Math.cos(F);const J=Math.max(.5,1*(1-$*.5));if(J>=.8?xs(t,X,V,tt,J,i,xe,e,.04):Mt(t,X,V,tt,e.colorVariation(i,.04),xe),$>.3&&e.chance(.3)){const K=k+e.range(-1,1);let Q=e.range(r,c)*(e.chance(.5)?1:-1);const lt=e.intRange(5,10);let ft=X,bt=V,St=tt;for(let z=0;z<lt;z++)Q-=.015,ft+=Math.cos(K)*Math.cos(Q)*.8,bt+=Math.sin(Q)*.8,St+=Math.sin(K)*Math.cos(Q)*.8,Mt(t,ft,bt,St,e.colorVariation(i,.05),xe);const Kt=e.pick(o);for(let z=0;z<e.intRange(4,10);z++)Mt(t,ft+e.range(-3,3),bt+e.range(-2,2),St+e.range(-3,3),e.colorVariation(Kt,.07),le)}if($>.4&&e.chance(.3)){const K=e.pick(o);for(let Q=0;Q<e.intRange(4,8);Q++)Mt(t,X+e.range(-3,3),V+e.range(-2,2),tt+e.range(-3,3),e.colorVariation(K,.07),le)}$>.3&&e.chance(.08)&&Ea(t,e,X,V,tt)}for(let B=0;B<e.intRange(2,4);B++){const $=D+e.range(-1.2,1.2);let N=e.range(r,c)*(e.chance(.5)?1:-1);const k=e.intRange(4,8);let J=X,K=V,Q=tt;for(let ft=0;ft<k;ft++)N-=.015,J+=Math.cos($)*Math.cos(N)*.8,K+=Math.sin(N)*.8,Q+=Math.sin($)*Math.cos(N)*.8,Mt(t,J,K,Q,e.colorVariation(i,.05),xe);const lt=e.pick(o);for(let ft=0;ft<e.intRange(5,12);ft++)Mt(t,J+e.range(-4,4),K+e.range(-2,3),Q+e.range(-4,4),e.colorVariation(lt,.07),le)}e.chance(.4)&&Ea(t,e,X+e.range(-2,2),V,tt+e.range(-2,2))}}for(let S=0;S<e.intRange(3,6);S++){const y=T+e.range(-1.2,1.2);let A=e.range(r,c)*(e.chance(.5)?1:-1);const I=e.intRange(5,10);let L=x,D=M,F=v;for(let X=0;X<I;X++)A-=.015,L+=Math.cos(y)*Math.cos(A)*.8,D+=Math.sin(A)*.8,F+=Math.sin(y)*Math.cos(A)*.8,Mt(t,L,D,F,e.colorVariation(i,.05),xe);const O=e.pick(o);for(let X=0;X<e.intRange(6,14);X++)Mt(t,L+e.range(-4,4),D+e.range(-2,3),F+e.range(-4,4),e.colorVariation(O,.07),le)}e.chance(.5)&&Ea(t,e,x+e.range(-3,3),M,v+e.range(-3,3))}return t}function Ea(e,t,n,i,s){const a=[[.55,.58,.42],[.48,.52,.38],[.52,.55,.4]],o=t.intRange(8,25);let r=n,c=i,l=s;const h=t.range(0,1e3),u=t.range(0,1e3);for(let f=0;f<o&&(r+=(t.fbm(f*.1+h,2,2,.5)-.5)*.3,c-=1,l+=(t.fbm(f*.1+u,2,2,.5)-.5)*.3,!(c<2));f++){const d=t.pick(a);Mt(e,r,c,l,t.colorVariation(d,.05),le),t.chance(.15)&&Mt(e,r+t.range(-1,1),c,l+t.range(-1,1),t.colorVariation(d,.06),le)}}function pg(e,t,n,i,s=[4,7]){const a=t.intRange(s[0],s[1]);for(let o=0;o<a;o++){const r=t.range(0,Math.PI*2),c=t.intRange(Math.max(4,Math.floor(n*.8)),Math.max(6,Math.floor(n*1.7))),l=t.range(1.3,2.5),h=t.range(.12,.28),u=t.range(0,Math.PI*2),f=t.range(-.25,.15);for(let d=0;d<=c;d++){const _=d/Math.max(1,c),g=Math.max(.7,Zn(l,.65,_)),m=Math.sin(_*Math.PI*1.4+u)*h*n,p=Math.cos(r)*(n*.72+d*.78)+Math.cos(r+Math.PI/2)*m,x=Math.sin(r)*(n*.72+d*.78)+Math.sin(r+Math.PI/2)*m,M=Math.max(-1,Math.round((1-_)*.8+f*d));Ni(e,p,M,x,g,i,we,t),g>1.05&&t.chance(.7)&&Ni(e,p,M-1,x,Math.max(.6,g*.78),i,we,t)}}}function $r(e,t,n){const{height:i,baseR:s,bark:a,heartwood:o,ring:r,markColor:c=null,markProb:l=0,mossPalette:h=null,sideCrackColor:u=null,baseFlare:f=.35,topTaper:d=.16,irregularity:_=.16,decay:g=0}=n,m=t.range(0,Math.PI*2),p=t.range(0,Math.PI*2),x=t.range(0,1e3),M=t.range(0,1e3),v=t.range(0,Math.PI*2),T=t.range(.55,1),b=t.range(0,Math.PI*2),E=t.range(.12,.28)*g;for(let w=0;w<i;w++){const S=w/Math.max(1,i-1),y=1+(1-Me(w/3,0,1))*f,A=s*(1-S*d)*y,I=Math.ceil(A+3);for(let L=-I;L<=I;L++)for(let D=-I;D<=I;D++){const F=Math.sqrt(L*L+D*D),O=Math.atan2(D,L),X=1+Math.sin(O*2+m)*_*.55+Math.sin(O*5+p)*_*.25,V=(t.noise2D(L*.18+x+w*.07,D*.18+M)-.5)*_*s,tt=Math.max(2.2,A*X+V);if(F>tt)continue;const et=F/Math.max(1,tt),U=Math.max(0,Math.cos(O-v)),B=U>Math.cos(T)?U:0,$=Math.max(0,t.noise2D(L*.24+M,D*.24+x)-.44)*2.2,N=et>.62?(et-.62)*3.5:0,k=Math.max(0,Math.cos(O-b))*E,J=Math.floor((B*1.8+$+N+k)*(.9+g*.8)),K=Math.max(1,i-1-J);if(w>K)continue;let Q;if(w===K){const lt=et,ft=Math.sin(lt*16+t.noise2D(L*.15+50,D*.15+50)*4)*.5+.5;lt<.14?Q=t.colorVariation(o,.04):ft>.56?Q=t.colorVariation(r,.05):Q=t.colorVariation([Me((o[0]+r[0])*.5,0,1),Me((o[1]+r[1])*.5,0,1),Me((o[2]+r[2])*.5,0,1)],.04),h&&et>.55&&t.chance(.12+g*.18)&&(Q=t.colorVariation(t.pick(h),.06))}else if(et>.8){const lt=t.noise2D(L*.2+200+w*.06,D*.2+120);u&&lt>.68?Q=t.colorVariation(u,.04):c&&t.chance(l)?Q=t.colorVariation(c,.03):Q=t.colorVariation(a,.05)}else Q=t.colorVariation(o,.03);Mt(e,L,w,D,Q,we)}}if(h){const w=t.intRange(4,9);for(let S=0;S<w;S++){const y=t.range(-s*.7,s*.7),A=t.range(-s*.7,s*.7);y*y+A*A<s*s*.72&&Mt(e,y,i-1,A,t.colorVariation(t.pick(h),.06),le)}}pg(e,t,s,a)}function mg(e){const t=new Map,n=e.intRange(8,14),i=e.intRange(8,12);return $r(t,e,{height:n,baseR:i,bark:[.35,.26,.16],heartwood:[.45,.36,.22],ring:[.62,.5,.32],sideCrackColor:[.2,.15,.1],mossPalette:[[.22,.38,.14],[.16,.28,.1]],baseFlare:.58,topTaper:.14,irregularity:.18,decay:.25}),t}function _g(e){const t=new Map,n=e.intRange(6,11),i=e.intRange(5,8);return $r(t,e,{height:n,baseR:i,bark:[.84,.8,.72],heartwood:[.72,.62,.42],ring:[.6,.5,.32],markColor:[.22,.2,.18],markProb:.16,sideCrackColor:[.32,.28,.22],baseFlare:.26,topTaper:.1,irregularity:.13,decay:.12}),t}function gg(e){const t=new Map,n=e.intRange(5,10),i=e.intRange(7,11),s=[.3,.24,.16],a=[.2,.35,.14];$r(t,e,{height:n,baseR:i,bark:s,heartwood:[.26,.22,.15],ring:[.34,.28,.18],mossPalette:[a,[.15,.28,.1],[.24,.42,.16]],sideCrackColor:[.14,.1,.08],baseFlare:.44,topTaper:.22,irregularity:.22,decay:.55});const r=e.intRange(2,5);for(let c=0;c<r;c++){const l=e.range(0,Math.PI*2),h=e.intRange(1,n-2),u=i*.8,f=Math.cos(l)*u,d=Math.sin(l)*u;for(let _=0;_<3;_++){const g=f+Math.cos(l)*_,m=d+Math.sin(l)*_;Mt(t,g,h,m,e.colorVariation([.72,.62,.48],.06),we),_<2&&Mt(t,g,h+1,m,e.colorVariation([.68,.58,.42],.06),we)}}for(let c=-i;c<=i;c++)for(let l=-i;l<=i;l++)c*c+l*l<i*i*.6&&e.chance(.5)&&Mt(t,c,n,l,e.colorVariation(a,.06),le);return t}const vh=["birch","aspen","aspen_yellow","aspen_red","poplar","apple","orange","willow","pine","joshua","banana","coconut","sakura","cypress","stump_oak","stump_birch","stump_mossy"],Mg={birch:q_,aspen:$_,aspen_yellow:Z_,aspen_red:j_,poplar:K_,apple:J_,orange:Q_,willow:tg,pine:ng,joshua:ig,banana:ag,coconut:og,sakura:ug,cypress:dg,stump_oak:mg,stump_birch:_g,stump_mossy:gg};function yh(e,t=Date.now()){return Mg[e](new xn(t))}const ye=0,De=2,Va=8;function Vt(e,t,n,i,s,a){e.set(`${Math.round(t)},${Math.round(n)},${Math.round(i)}`,{color:s,type:a})}function xg(e,t,n,i,s,a,o,r,c,l,h=.6){for(let u=-s;u<=s;u++)for(let f=-a;f<=a;f++)for(let d=-o;d<=o;d++)if(u*u/(s*s+.01)+f*f/(a*a+.01)+d*d/(o*o+.01)<=1&&l.next()<h){const g=`${Math.round(t+u)},${Math.round(n+f)},${Math.round(i+d)}`;e.has(g)||e.set(g,{color:l.colorVariation(r,.05),type:c})}}function vg(e){const t=new Map,n=e.intRange(32,48),i=e.intRange(3,5);for(let o=0;o<i;o++){const r=o/i*Math.PI*2+e.range(-.3,.3),c=e.range(1.8,3.2),l=e.range(.06,.12),h=e.pick([[.3,.24,.13],[.24,.32,.14],[.28,.2,.11]]);for(let u=0;u<=n;u++){const f=u/n,d=c*(1-f*.55),_=r+u*l,g=Math.cos(_)*d,m=Math.sin(_)*d;Vt(t,g,u,m,e.colorVariation(h,.04),ye),f<.5&&Vt(t,g+e.range(-.7,.7),u,m+e.range(-.7,.7),e.colorVariation(h,.04),ye)}if(e.chance(.65)){const u=e.intRange(Math.floor(n*.25),Math.floor(n*.55));let f=Math.cos(r+u*l)*c*(1-u/n*.55),d=Math.sin(r+u*l)*c*(1-u/n*.55);const _=e.intRange(6,Math.max(7,Math.floor(u*.7)));for(let g=0;g<_;g++)f+=e.range(-.35,.35),d+=e.range(-.35,.35),Vt(t,f,u-g,d,e.colorVariation([.32,.24,.12],.05),ye)}}const s=e.intRange(6,10);for(let o=0;o<s;o++){let b=function(S){const y=S/l;if(y<=0||y>=1)return 0;const A=.38,I=y<A?A:1-A,L=(y-A)/I;return Math.abs(L)>=1?0:h*Math.sqrt(1-L*L)};var a=b;const r=o/s*Math.PI*2+e.range(-.35,.35),c=e.intRange(Math.floor(n*.35),n+2),l=e.intRange(14,22),h=l*e.range(.45,.55),u=e.range(.005,.016),f=e.range(.008,.03),d=l>16,_=Math.cos(r),g=Math.sin(r),m=-Math.sin(r),p=Math.cos(r),x=e.intRange(5,10);for(let S=0;S<=x;S++){const y=S/x;Vt(t,_*S*1.1,c+S*.25+y*y,g*S*1.1,e.colorVariation([.22,.36,.14],.03),ye)}const M=_*x*1.1,v=g*x*1.1,T=c+x*.25+1,E=d?e.intRange(5,8):e.intRange(2,3),w=[];for(let S=0;S<E;S++)w.push({u:l*(.18+.7*(S+.5)/E),depth:e.range(.35,.6)});for(let S=1;S<=l;S++){const y=b(S);if(y<.5)continue;const A=S/l;for(let I=Math.floor(-y);I<=Math.ceil(y);I++){const L=Math.abs(I);if(L>y)continue;const D=L/Math.max(y,.01);if(A<.08&&L<1.5||A<.14&&L<.6)continue;let F=!1;if(d){for(const k of w)if(Math.abs(S-k.u)<1.2&&D>1-k.depth){F=!0;break}}if(F)continue;let O=!1;if(d&&w.length>1)for(let k=0;k<w.length-1;k++){const J=(w[k].u+w[k+1].u)/2,K=(w[k+1].u-w[k].u)*.3;if(Math.abs(S-J)<K&&D>.22&&D<.62){O=!0;break}}if(O)continue;const X=-S*.7,V=-(S*S)*u,tt=L*L*f,et=L<1;let U;et?U=[.2,.44,.14]:D>.85?U=[.12,.38,.1]:U=[.15,.46,.13],c>n*.75&&(U=[U[0]+.04,U[1]+.07,U[2]+.03]);const B=M+_*S+m*I,$=v+g*S+p*I,N=T+X+V+tt;Vt(t,B,N,$,e.colorVariation(U,.04),De)}}}return t}function yg(e){const t=new Map,n=[.18,.32,.12],i=[.25,.5,.16],s=[.18,.4,.12],a=e.intRange(30,50),o=e.intRange(6,12);for(let c=-a;c<=a;c++){const l=1-Math.abs(c)/a,h=Math.ceil(o*l);for(let u=0;u<h;u++)e.chance(.5)&&Vt(t,c,u,0,e.colorVariation(n,.04),ye),e.chance(.7)&&Vt(t,c+e.range(-.5,.5),u+e.range(-.5,.5),e.range(.5,2.5),e.colorVariation(e.chance(.4)?s:i,.06),De)}const r=e.intRange(10,18);for(let c=0;c<r;c++){let l=e.range(-a*.8,a*.8),h=e.range(2,o);const u=e.range(-.6,.6),f=e.intRange(50,120);let d=e.range(.6,2);for(let _=0;_<f&&(d+=e.range(-.15,.15)+u*.02,d=Math.max(.2,Math.min(2.5,d)),l+=Math.cos(d)*.8,h+=Math.sin(d)*.8,!(h<0||h>120));_++){if(Vt(t,l,h,0,e.colorVariation(n,.04),ye),e.chance(.08)&&_>5){let g=l,m=h,p=d+e.range(-.8,.8);const x=e.intRange(12,40);for(let M=0;M<x&&(p+=e.range(-.15,.15),g+=Math.cos(p)*.8,m+=Math.sin(p)*.8,!(m<0||m>120));M++)if(Vt(t,g,m,0,e.colorVariation(n,.04),ye),e.chance(.35)){const v=e.intRange(2,4),T=e.range(0,Math.PI*2);for(let b=1;b<=v;b++)Vt(t,g+Math.cos(T)*b*.4,m+Math.sin(T)*b*.4,e.range(.5,2.5),e.colorVariation(e.chance(.3)?s:i,.06),De)}}if(e.chance(.35)){const g=e.intRange(2,5),m=e.range(0,Math.PI*2);for(let p=1;p<=g;p++){const x=l+Math.cos(m)*p*.5,M=h+Math.sin(m)*p*.5;Vt(t,x,M,e.range(.5,2.5),e.colorVariation(e.chance(.3)?s:i,.06),De)}}e.chance(.08)&&Vt(t,l+e.range(-.5,.5),h,0,e.colorVariation([.22,.18,.1],.04),ye)}}return t}function Sg(e){const t=new Map,n=[.22,.32,.12],i=[.22,.44,.16],s=[.3,.22,.12],a=e.pick([[.78,.1,.14],[.88,.38,.48],[.92,.9,.87],[.9,.55,.2],[.85,.2,.4]]),o=e.intRange(8,14);for(let r=0;r<o;r++){const c=e.range(0,Math.PI*2),l=e.intRange(28,55),h=e.range(.1,.3);let u=e.range(-2,2),f=0,d=e.range(-2,2),_=e.range(.8,1.3);for(let g=0;g<l;g++){const m=g/l;_-=e.range(.005,.02),u+=Math.cos(c)*h*m,f+=Math.sin(_)*.9,d+=Math.sin(c)*h*m;const p=g<l*.3?1.5:1;if(p>1)for(let x=-1;x<=1;x++)for(let M=-1;M<=1;M++)x*x+M*M<=p&&Vt(t,u+x,f,d+M,e.colorVariation(n,.04),ye);else Vt(t,u,f,d,e.colorVariation(n,.04),ye);if(e.chance(.1)){const x=e.range(0,Math.PI*2);Vt(t,u+Math.cos(x)*1.5,f,d+Math.sin(x)*1.5,e.colorVariation(s,.03),ye)}if(m>.15&&e.chance(.4)){const x=e.intRange(4,10);for(let M=0;M<x;M++){const v=e.range(0,Math.PI*2),T=e.range(1,3.5);Vt(t,u+Math.cos(v)*T,f+e.range(-1,1.5),d+Math.sin(v)*T,e.colorVariation(i,.06),De)}}if(m>.3&&e.chance(.12)){const x=c+e.range(-1.5,1.5);let M=u,v=f,T=d,b=e.range(.3,.8);const E=e.intRange(5,14);for(let w=0;w<E;w++){if(M+=Math.cos(x)*Math.cos(b)*.8,v+=Math.sin(b)*.8,T+=Math.sin(x)*Math.cos(b)*.8,b+=e.range(-.05,.05),Vt(t,M,v,T,e.colorVariation(n,.04),ye),e.chance(.12)){const S=e.range(0,Math.PI*2);Vt(t,M+Math.cos(S)*1.5,v,T+Math.sin(S)*1.5,e.colorVariation(s,.03),ye)}if(e.chance(.3)){const S=x+e.range(-1.5,1.5);for(let y=1;y<=e.intRange(2,4);y++)Vt(t,M+Math.cos(S)*y,v+y*.1,T+Math.sin(S)*y,e.colorVariation(i,.05),De)}}if(e.chance(.7)){const w=e.intRange(2,3);for(let S=-w;S<=w;S++)for(let y=-w;y<=w;y++)for(let A=-w;A<=w;A++)S*S+y*y+A*A<=w*w&&Vt(t,M+S,v+1+y,T+A,e.colorVariation(a,.06),Va);for(let S=0;S<4;S++){const y=S/4*Math.PI*2;Vt(t,M+Math.cos(y)*(w+.5),v,T+Math.sin(y)*(w+.5),e.colorVariation([.18,.38,.12],.05),De)}}}}if(e.chance(.65)){const g=e.intRange(2,4);for(let m=-g;m<=g;m++)for(let p=-g;p<=g;p++)for(let x=-g;x<=g;x++)m*m+p*p+x*x<=g*g&&Vt(t,u+m,f+1+p,d+x,e.colorVariation(a,.06),Va);for(let m=0;m<5;m++){const p=m/5*Math.PI*2;Vt(t,u+Math.cos(p)*(g+.5),f,d+Math.sin(p)*(g+.5),e.colorVariation([.18,.38,.12],.05),De)}}}for(let r=0;r<e.intRange(60,100);r++){const c=e.range(0,Math.PI*2),l=e.range(0,8),h=e.range(2,20);Vt(t,Math.cos(c)*l,h,Math.sin(c)*l,e.colorVariation(i,.06),De)}return t}function bg(e){const t=new Map,n=[{h:e.intRange(18,30),ox:e.range(-4,-2),oz:e.range(-3,3)},{h:e.intRange(30,46),ox:e.range(1,4),oz:e.range(-3,3)},{h:e.intRange(46,68),ox:e.range(-2,2),oz:e.range(-2,2)}],i=[.32,.28,.16],s=[.38,.34,.22];for(const a of n){const{h:o,ox:r,oz:c}=a;for(let h=0;h<o;h++){const u=h%e.intRange(4,7)===0;Vt(t,r,h,c,e.colorVariation(u?s:i,.04),ye)}const l=e.intRange(2,3);for(let h=0;h<l;h++){const u=o-h*e.intRange(2,4),f=e.intRange(10,16);for(let d=0;d<f;d++){const _=d/f*Math.PI*2+e.range(-.2,.2)+h*.4,g=e.intRange(10,18),m=e.range(1,1.9),p=e.range(.75,.95),x=e.range(.4,.6),M=Math.cos(_),v=Math.sin(_),T=-Math.sin(_),b=Math.cos(_);for(let E=0;E<g;E++){const w=E/g,S=E*p-(w>.6?(w-.6)*(w-.6)*g*1.2:0),y=E*x,A=m*Math.sin(Math.PI*w)*(1-w*.15),I=Math.ceil(A);for(let L=-I;L<=I;L++){if(Math.abs(L)>A)continue;const D=Math.abs(L)/Math.max(A,.01),F=Math.abs(L)<.6;let O;F?O=[.24,.52,.18]:w>.8?O=[.18,.42,.13]:O=[.2,.48,.15],D<.3&&!F&&(O=[O[0]+.06,O[1]+.08,O[2]+.04]);const X=r+M*y+T*L*.5,V=c+v*y+b*L*.5,tt=u+S;Vt(t,X,tt,V,e.colorVariation(O,.04),De)}}}}}return t}function Eg(e){const t=new Map,n=e.intRange(72,118),i=e.intRange(5,8);function s(r,c,l,h,u){for(let f=-h;f<=h;f++)for(let d=-h;d<=h;d++){const _=Math.sqrt(f*f+d*d);if(_>h)continue;const g=Math.atan2(d,f),m=Math.abs(Math.sin(g*6))*.5,p=_>=h-1.2,x=p?[.22+m*.08,.48+m*.05,.2]:[.18,.4,.16];Vt(t,r+f,c,l+d,e.colorVariation(x,.03),ye),p&&e.chance(.04)&&_>0&&Vt(t,r+f+f/_*1.5,c,l+d+d/_*1.5,e.colorVariation([.7,.65,.52],.05),Va)}}function a(r,c,l,h){for(let u=0;u<=h;u++){const f=h*Math.cos(u/h*Math.PI*.5);for(let d=-Math.ceil(f);d<=Math.ceil(f);d++)for(let _=-Math.ceil(f);_<=Math.ceil(f);_++){if(d*d+_*_>f*f)continue;const g=[.24,.5,.22];Vt(t,r+d,c+u,l+_,e.colorVariation(g,.03),ye)}}}for(let r=0;r<n;r++)s(0,r,0,i);a(0,n,0,i);const o=e.intRange(1,3);for(let r=0;r<o;r++){const c=e.intRange(Math.floor(n*.3),Math.floor(n*.65)),l=e.range(0,Math.PI*2),h=Math.max(2,i-e.intRange(2,3)),u=e.intRange(8,14),f=e.intRange(15,30),d=Math.cos(l),_=Math.sin(l),g=e.range(.32,.4);let m=0,p=c,x=0;for(let b=0;b<=u;b++)m=d*(i+b),x=_*(i+b),p=c+b*g,s(Math.round(m),Math.round(p),Math.round(x),h);const M=Math.round(m),v=Math.round(x),T=Math.round(p);for(let b=0;b<f;b++)s(M,T+b,v,h);a(M,T+f,v,h)}return t}function Tg(e){const t=new Map,n=[.28,.52,.24],i=[.22,.44,.18],s=[.72,.18,.28],a=[.7,.65,.5];function o(f,d,_,g,m,p,x){const M=Math.cos(p),v=Math.sin(p);for(let T=-m;T<=m;T++)for(let b=-g;b<=g;b++){const E=b/g,w=T/m;if(E*E+w*w>1)continue;const S=1-Math.sqrt(E*E+w*w),y=S<.2,A=S>.4?2:1;for(let I=0;I<A;I++){const L=f+M*I+-v*b,D=_+v*I+M*b,F=d+T+b*x,O=y?i:n;Vt(t,L,F,D,e.colorVariation(O,.04),ye)}if(!y&&e.chance(.06)){const I=f+M*2.5+-v*b,L=_+v*2.5+M*b;Vt(t,I,d+T+b*x,L,e.colorVariation(a,.06),Va)}}}const r=e.intRange(2,3),c=[];for(let f=0;f<r;f++){const d=f/r*Math.PI*2+e.range(-.4,.4),_=Math.cos(d)*e.range(2,5),g=Math.sin(d)*e.range(2,5),m=e.intRange(6,10),p=e.intRange(8,12);o(_,p+1,g,m,p,d,e.range(-.05,.05)),c.push({x:_,y:p+1,z:g,ang:d,pw:m,ph:p})}const l=e.intRange(2,4),h=[];for(let f=0;f<l;f++){const d=e.pick(c),_=d.ang+e.range(-.8,.8),g=d.x+Math.cos(_)*e.range(1,3),m=d.z+Math.sin(_)*e.range(1,3),p=d.y+d.ph-e.intRange(2,5),x=e.intRange(5,8),M=e.intRange(6,10);o(g,p+M,m,x,M,_,e.range(-.08,.08)),h.push({x:g,y:p+M,z:m,ang:_,pw:x,ph:M})}const u=e.intRange(1,3);for(let f=0;f<u;f++){const d=e.pick(h.length>0?h:c),_=d.ang+e.range(-1,1),g=d.x+Math.cos(_)*e.range(.5,2),m=d.z+Math.sin(_)*e.range(.5,2),p=d.y+d.ph-e.intRange(1,4),x=e.intRange(4,6),M=e.intRange(5,8);if(o(g,p+M,m,x,M,_,e.range(-.1,.1)),e.chance(.6)){const v=p+M*2;for(let T=0;T<e.intRange(1,3);T++){const b=g+e.range(-x*.4,x*.4),E=m+e.range(-1,1);for(let w=-2;w<=2;w++)for(let S=-1;S<=1;S++)S*S+w*w*.5>3||Vt(t,b+S,v+w+T*4,E,e.colorVariation(s,.06),De)}}}return t}function wg(e){const t=new Map,n=e.intRange(25,42);for(let s=0;s<n;s++){const a=Math.max(2,4-Math.floor(s/6));for(let o=-a;o<=a;o++)for(let r=-a;r<=a;r++)o*o+r*r<=a*a&&Vt(t,o,s,r,e.colorVariation([.35,.28,.18],.04),ye)}const i=e.intRange(5,10);for(let s=0;s<i;s++){const a=e.range(0,Math.PI*2),o=e.intRange(8,18);let r=0,c=n,l=0;for(let u=0;u<o;u++)r+=Math.cos(a)*.8+e.range(-.15,.15),c+=e.range(.2,.6),l+=Math.sin(a)*.8+e.range(-.15,.15),Vt(t,r,c,l,e.colorVariation([.35,.28,.18],.04),ye);const h=e.intRange(4,7);xg(t,r,c+h*.5,l,h,h,h,[.32,.55,.28],De,e,.65)}return t}function Rg(e){const t=new Map,n=e.intRange(5,9),i=[.48,.62,.28],s=[.38,.5,.22],a=[.35,.55,.22];for(let o=0;o<n;o++){const r=e.range(-8,8),c=e.range(-8,8),l=e.intRange(65,115),h=e.range(1.5,2.5),u=e.range(0,Math.PI*2),f=e.range(.005,.015);let d=r,_=c;const g=e.intRange(8,13);for(let p=0;p<l;p++){d+=Math.cos(u)*f,_+=Math.sin(u)*f;const x=h*(1-p/l*.35),M=Math.ceil(x);for(let v=-M;v<=M;v++)for(let T=-M;T<=M;T++)v*v+T*T<=x*x&&Vt(t,d+v,p,_+T,e.colorVariation(i,.04),ye);if(p>0&&p%g===0){const v=x+.6,T=Math.ceil(v);for(let b=-T;b<=T;b++)for(let E=-T;E<=T;E++)b*b+E*E<=v*v&&b*b+E*E>(x-.2)*(x-.2)&&Vt(t,d+b,p,_+E,e.colorVariation(s,.03),ye)}}const m=e.intRange(3,6);for(let p=0;p<m;p++){const x=e.range(0,Math.PI*2),M=l-e.intRange(3,18),v=e.intRange(8,16);let T=d,b=M,E=_;const w=e.range(-.35,.15);for(let S=0;S<v;S++)T+=Math.cos(x)*.8,b+=Math.sin(w)*.5-.18*(S/v),E+=Math.sin(x)*.8,Vt(t,T,b,E,e.colorVariation(a,.06),De),e.chance(.45)&&Vt(t,T+e.range(-2,2),b-e.range(0,2),E+e.range(-2,2),e.colorVariation(a,.06),De)}}return t}function Ag(e){const t=new Map,n=[.32,.24,.16],i=[.25,.45,.15];for(let u=-6;u<=6;u++)for(let f=-6;f<=6;f++){const d=Math.sqrt(u*u+f*f);if(d<=6){const _=Math.max(0,Math.round(2.5-d*.4));for(let g=0;g<=_;g++)Vt(t,u,g,f,e.colorVariation([.42,.32,.2],.05),ye)}}const s=e.intRange(20,32);let a=0,o=0;const r=e.range(.06,.14),c=e.range(0,Math.PI*2);for(let u=2;u<s+2;u++){const f=(u-2)/s;a+=Math.cos(c+f*Math.PI*1.5)*r,o+=Math.sin(c+f*Math.PI*1.5)*r;const d=Math.max(1,2.5*(1-f*.5)),_=Math.ceil(d);for(let g=-_;g<=_;g++)for(let m=-_;m<=_;m++)g*g+m*m<=d*d&&Vt(t,a+g,u,o+m,e.colorVariation(n,.04),ye)}const l=s+2,h=e.intRange(2,4);for(let u=0;u<h;u++){const f=u/h*Math.PI*2+e.range(-.4,.4),d=e.range(3,10),_=a+Math.cos(f)*d,g=l+e.range(-4,5),m=o+Math.sin(f)*d,p=e.range(5,9);for(let M=-p;M<=p;M++)for(let v=Math.floor(-p*.35);v<=Math.ceil(p*.45);v++)for(let T=-p;T<=p;T++)M*M/(p*p)+v*v/(p*.4*(p*.4))+T*T/(p*p)<=1&&e.chance(.55)&&Vt(t,_+M,g+v,m+T,e.colorVariation(i,.06),De);const x=Math.ceil(d);for(let M=0;M<=x;M++){const v=M/x,T=a+(_-a)*v,b=l+(g-l)*v,E=o+(m-o)*v;Vt(t,T,b,E,e.colorVariation(n,.04),ye)}}return t}function Cg(e){const t=new Map,n=[.4,.32,.2],i=[.28,.22,.14],s=[.3,.54,.2],a=[.2,.4,.14],o=[.44,.66,.26],r=[],c=e.intRange(2,4);for(let l=0;l<c;l++){const h=e.intRange(24,52),u=e.range(-5,5),f=e.range(-5,5),d=e.range(0,Math.PI*2),_=e.range(.08,.2),g=e.range(.18,.42),m=e.range(0,Math.PI*2);let p=u,x=f,M=0;for(let v=0;v<=h;v++){const T=v/Math.max(1,h),b=Math.sin(T*Math.PI*1.1+m)*_*h*.25,E=T*T*g*h*.18,w=u+Math.cos(d)*E+Math.cos(d+Math.PI/2)*b,S=f+Math.sin(d)*E+Math.sin(d+Math.PI/2)*b,y=v<6?1.7:T<.45?1.2:.8,A=Math.ceil(y);for(let I=-A;I<=A;I++)for(let L=-A;L<=A;L++){if(I*I+L*L>y*y)continue;const D=v>1&&v%e.intRange(4,7)===0&&I*I+L*L>=Math.max(.2,y*y*.45);Vt(t,w+I,v,S+L,e.colorVariation(D?i:n,.04),ye)}p=w,x=S,M=v}r.push({x:p,y:M,z:x})}for(const l of r){const h=e.intRange(18,30);for(let u=0;u<h;u++){const f=u/h*Math.PI*2+e.range(-.25,.25),d=e.intRange(12,24),_=e.range(.7,1.6),g=e.range(.18,.48),m=e.range(.45,.95),p=e.range(-.08,.08),x=e.pick([s,s,a,o]);for(let M=0;M<d;M++){const v=M/Math.max(1,d-1),T=Math.sin(v*Math.PI*.9)*m*d*.08,b=M*.72,E=M*g-v*v*m*d*.32,w=f+M*p,S=l.x+Math.cos(w)*b,y=l.z+Math.sin(w)*b,A=l.y+1+E-T*.25,I=_*Math.sin(Math.PI*v)*(1-v*.2),L=Math.ceil(I);for(let D=-L;D<=L;D++){if(Math.abs(D)>I)continue;const F=Math.cos(w+Math.PI/2)*D*.4,O=Math.sin(w+Math.PI/2)*D*.4,V=Math.abs(D)<.6?[Math.min(1,x[0]+.06),Math.min(1,x[1]+.08),Math.min(1,x[2]+.04)]:x;Vt(t,S+F,A,y+O,e.colorVariation(V,.05),De)}}}}for(let l=0;l<e.intRange(10,20);l++){const h=e.range(0,Math.PI*2),u=e.range(0,8);Vt(t,Math.cos(h)*u,e.range(0,2),Math.sin(h)*u,e.colorVariation(e.pick([s,a]),.05),De)}return t}const Pg=["monstera","ivy","rosebush","dracaena","yucca","cactus","prickly_pear","jade","bamboo","bonsai"],Lg={monstera:vg,ivy:yg,rosebush:Sg,dracaena:bg,yucca:Cg,cactus:Eg,prickly_pear:Tg,jade:wg,bamboo:Rg,bonsai:Ag};function Sh(e,t=Date.now()){return Lg[e](new xn(t))}const on=0,Wn=2,ve=3;function Bt(e,t,n,i,s,a){e.set(`${Math.round(t)},${Math.round(n)},${Math.round(i)}`,{color:s,type:a})}function $a(e,t,n,i,s=!1){for(let a=0;a<n;a++)if(Bt(e,0,a,0,t.colorVariation(i,.03),on),a<n*.3&&t.chance(.4)&&Bt(e,1,a,0,t.colorVariation(i,.03),on),s&&t.chance(.1)){const o=t.range(0,Math.PI*2);Bt(e,Math.cos(o)*1.5,a,Math.sin(o)*1.5,t.colorVariation([.3,.22,.12],.03),on)}for(let a=6;a<n-6;a+=t.intRange(5,10)){const o=t.range(0,Math.PI*2);for(let r=1;r<=t.intRange(3,7);r++)Bt(e,Math.cos(o)*r,a+r*.15,Math.sin(o)*r,t.colorVariation([.22,.44,.16],.05),Wn)}}function Dg(e){const t=new Map,n=e.intRange(42,68),i=e.pick([[.78,.1,.14],[.88,.38,.48],[.92,.9,.87]]),s=[.2,.36,.12];$a(t,e,n,s,!0);const a=e.intRange(4,7);for(let r=0;r<a;r++){const c=Math.floor(n*.35+r/a*n*.6),l=e.range(0,Math.PI*2);let h=0,u=c,f=0,d=e.range(.3,.8);const _=e.intRange(8,18);for(let m=0;m<_;m++){if(h+=Math.cos(l)*Math.cos(d)*.8,u+=Math.sin(d)*.8,f+=Math.sin(l)*Math.cos(d)*.8,d+=e.range(-.05,.05),Bt(t,h,u,f,e.colorVariation(s,.04),on),e.chance(.12)){const p=e.range(0,Math.PI*2);Bt(t,h+Math.cos(p)*1.5,u,f+Math.sin(p)*1.5,e.colorVariation([.3,.22,.12],.03),on)}if(e.chance(.2)){const p=l+e.range(-1.5,1.5);for(let x=1;x<=e.intRange(2,4);x++)Bt(t,h+Math.cos(p)*x,u+x*.1,f+Math.sin(p)*x,e.colorVariation([.22,.44,.16],.05),Wn)}}const g=e.intRange(2,3);for(let m=-g;m<=g;m++)for(let p=-g;p<=g;p++)for(let x=-g;x<=g;x++)m*m+p*p+x*x<=g*g&&Bt(t,h+m,u+1+p,f+x,e.colorVariation(i,.06),ve);for(let m=0;m<4;m++){const p=m/4*Math.PI*2;Bt(t,h+Math.cos(p)*(g+.5),u,f+Math.sin(p)*(g+.5),e.colorVariation([.18,.38,.12],.05),Wn)}}const o=e.intRange(2,4);for(let r=-o;r<=o;r++)for(let c=-o;c<=o;c++)for(let l=-o;l<=o;l++)r*r+c*c+l*l<=o*o&&Bt(t,r,n+1+c,l,e.colorVariation(i,.06),ve);for(let r=0;r<5;r++){const c=r/5*Math.PI*2;Bt(t,Math.cos(c)*(o+.5),n,Math.sin(c)*(o+.5),e.colorVariation([.18,.38,.12],.05),Wn)}return t}function Ig(e){const t=new Map,n=e.intRange(85,120),i=[.28,.42,.16];$a(t,e,n,i);const s=e.intRange(3,6);for(let r=0;r<s;r++){const c=Math.floor(n*.4+r/s*n*.55),l=e.range(0,Math.PI*2);let h=0,u=c,f=0,d=e.range(.3,.7);const _=e.intRange(6,14);for(let p=0;p<_;p++)if(h+=Math.cos(l)*Math.cos(d)*.8,u+=Math.sin(d)*.8,f+=Math.sin(l)*Math.cos(d)*.8,d+=e.range(-.04,.04),Bt(t,h,u,f,e.colorVariation(i,.04),on),e.chance(.2)){const x=l+e.range(-1.5,1.5);for(let M=1;M<=e.intRange(3,6);M++)Bt(t,h+Math.cos(x)*M,u+M*.1,f+Math.sin(x)*M,e.colorVariation([.22,.44,.16],.05),Wn)}const g=e.intRange(2,3);for(let p=-g;p<=g;p++)for(let x=-g;x<=g;x++)p*p+x*x<=g*g&&Bt(t,h+p,u+1,f+x,e.colorVariation([.35,.22,.08],.04),ve);const m=e.intRange(10,14);for(let p=0;p<m;p++){const x=p/m*Math.PI*2;for(let M=g+1;M<=g+3;M++)Bt(t,h+Math.cos(x)*M,u+1-(M-g)*.1,f+Math.sin(x)*M,e.colorVariation([.95,.82,.12],.06),ve)}}const a=e.intRange(3,4);for(let r=-a;r<=a;r++)for(let c=-a;c<=a;c++)r*r+c*c<=a*a&&Bt(t,r,n+1,c,e.colorVariation([.35,.22,.08],.04),ve);const o=e.intRange(12,16);for(let r=0;r<o;r++){const c=r/o*Math.PI*2;for(let l=a+1;l<=a+4;l++)Bt(t,Math.cos(c)*l,n+1-(l-a)*.1,Math.sin(c)*l,e.colorVariation([.95,.82,.12],.06),ve)}return t}function Ug(e){const t=new Map,n=e.pick([[.85,.15,.18],[.92,.52,.16],[.82,.22,.58],[.96,.92,.32],[.92,.9,.87]]),i=[.22,.4,.15],s=e.intRange(3,6);for(let a=0;a<s;a++){const o=e.range(-5,5),r=e.range(-5,5),c=e.intRange(35,55),l=e.range(-.02,.02);for(let _=0;_<c;_++)Bt(t,o+l*_,_,r+l*_*.5,e.colorVariation(i,.04),on);const h=e.intRange(8,Math.floor(c*.5)),u=e.range(0,Math.PI*2);for(let _=1;_<=e.intRange(4,8);_++)Bt(t,o+l*h+Math.cos(u)*_,h+_*.15,r+l*h*.5+Math.sin(u)*_,e.colorVariation([.22,.44,.16],.05),Wn);const f=o+l*c,d=r+l*c*.5;for(let _=0;_<6;_++){const g=_/6*Math.PI*2;for(let m=0;m<4;m++){const p=m/4,x=1.5+Math.sin(p*Math.PI)*1.5;Bt(t,f+Math.cos(g)*x,c+m,d+Math.sin(g)*x,e.colorVariation(n,.06),ve)}}Bt(t,f,c+1,d,e.colorVariation([.75,.7,.2],.05),ve)}return t}function Ng(e){const t=new Map,n=e.intRange(7,14);for(let i=0;i<n;i++){const s=e.range(-10,10),a=e.range(-10,10),o=e.intRange(48,78),r=e.range(-.03,.03);for(let l=0;l<o;l++)Bt(t,s+r*l,l,a+r*l*.5,e.colorVariation([.35,.42,.3],.04),on);const c=e.intRange(10,20);for(let l=0;l<c;l++){const h=s+r*(o+l),u=a+r*(o+l)*.5;if(Bt(t,h,o+l,u,e.colorVariation([.52,.28,.65],.08),ve),e.chance(.6)){const f=e.range(0,Math.PI*2);Bt(t,h+Math.cos(f)*1.2,o+l,u+Math.sin(f)*1.2,e.colorVariation([.56,.32,.68],.08),ve)}if(e.chance(.4)){const f=e.range(0,Math.PI*2);Bt(t,h+Math.cos(f)*1.5,o+l,u+Math.sin(f)*1.5,e.colorVariation([.48,.25,.6],.08),ve)}}}return t}function Fg(e){const t=new Map,n=e.intRange(30,48),i=[.26,.42,.16];$a(t,e,n,i);const s=e.intRange(3,6);for(let o=0;o<s;o++){const r=Math.floor(n*.3+o/s*n*.6),c=e.range(0,Math.PI*2);let l=0,h=r,u=0,f=e.range(.3,.8);const d=e.intRange(5,12);for(let g=0;g<d;g++)if(l+=Math.cos(c)*Math.cos(f)*.8,h+=Math.sin(f)*.8,u+=Math.sin(c)*Math.cos(f)*.8,f+=e.range(-.04,.04),Bt(t,l,h,u,e.colorVariation(i,.04),on),e.chance(.15)){const m=c+e.range(-1.5,1.5);for(let p=1;p<=e.intRange(2,4);p++)Bt(t,l+Math.cos(m)*p,h+p*.1,u+Math.sin(m)*p,e.colorVariation([.22,.44,.16],.05),Wn)}Bt(t,l,h+1,u,e.colorVariation([.92,.82,.22],.05),ve),Bt(t,l+1,h+1,u,e.colorVariation([.92,.82,.22],.05),ve),Bt(t,l,h+1,u+1,e.colorVariation([.92,.82,.22],.05),ve);const _=e.intRange(8,12);for(let g=0;g<_;g++){const m=g/_*Math.PI*2;for(let p=2;p<=4;p++)Bt(t,l+Math.cos(m)*p,h+1-(p-1)*.1,u+Math.sin(m)*p,e.colorVariation([.94,.92,.9],.04),ve)}}Bt(t,0,n+1,0,e.colorVariation([.92,.82,.22],.05),ve);const a=e.intRange(10,14);for(let o=0;o<a;o++){const r=o/a*Math.PI*2;for(let c=2;c<=5;c++)Bt(t,Math.cos(r)*c,n+1-(c-1)*.1,Math.sin(r)*c,e.colorVariation([.94,.92,.9],.04),ve)}return t}function Og(e){const t=new Map,n=e.intRange(50,82),i=e.pick([[.82,.32,.62],[.92,.88,.82],[.72,.22,.52]]),s=[.25,.4,.16];for(let o=0;o<n;o++){const r=Math.sin(o*.06)*5;Bt(t,r,o,0,e.colorVariation(s,.04),on)}const a=e.intRange(5,9);for(let o=0;o<a;o++){const r=Math.floor(n*.4+n*.55*(o/a)),c=Math.sin(r*.06)*5,l=e.range(0,Math.PI*2),h=e.intRange(2,5);let u=c,f=r,d=0;for(let g=0;g<h;g++)u+=Math.cos(l)*.8,f+=.3,d+=Math.sin(l)*.8,Bt(t,u,f,d,e.colorVariation(s,.04),on);const _=e.intRange(1,2);for(let g=-_;g<=_;g++)for(let m=-_;m<=_;m++)for(let p=-_;p<=_;p++)g*g+m*m+p*p<=_*_&&Bt(t,u+g,f+m,d+p,e.colorVariation(i,.07),ve);Bt(t,u,f-1,d,e.colorVariation([.92,.82,.28],.06),ve)}for(let o=0;o<5;o++){const r=e.range(0,Math.PI*2);for(let c=1;c<=e.intRange(8,15);c++)Bt(t,Math.cos(r)*c,c*.05-c*c*.004,Math.sin(r)*c,e.colorVariation([.2,.46,.16],.05),Wn)}return t}function zg(e){const t=new Map,n=e.intRange(35,52),i=[.22,.4,.14],s=e.pick([[[.9,.8,.15],[.95,.88,.3]],[[.85,.18,.22],[.92,.28,.32]],[[.92,.88,.84],[.98,.95,.92]],[[.78,.48,.68],[.86,.58,.76]]]);$a(t,e,n,i,!1);const a=n,o=e.intRange(4,6);for(let c=0;c<o;c++){const l=c/o,h=3+c*2.5,u=8+c*4,f=-c*1.2;for(let d=0;d<u;d++){const _=d/u*Math.PI*2+l*.3;for(let g=1;g<=h;g++){const m=g/h,p=m*m*2.2*l,x=Math.sin(m*Math.PI*.65)*1.5*(1-l*.5),M=Math.cos(_)*g,v=a+f-p+x,T=Math.sin(_)*g,b=e.pick(s);if(Bt(t,M,v,T,e.colorVariation(b,.04),ve),m>.2&&m<.8){const E=_+Math.PI/2;Bt(t,M+Math.cos(E)*.5,v,T+Math.sin(E)*.5,e.colorVariation(b,.04),ve)}}}}const r=3;for(let c=-r;c<=r;c++)for(let l=-r;l<=r;l++)c*c+l*l<=r*r&&Bt(t,c,a+1,l,e.colorVariation([.65,.55,.15],.05),ve);return t}function Bg(e){const t=new Map,n=e.pick([[.93,.73,.8],[.96,.93,.89]]),i=e.intRange(12,18);for(let s=-i;s<=i;s++)for(let a=-i;a<=i;a++){const o=Math.sqrt(s*s+a*a);o<=i&&!(s>0&&Math.abs(a)<s*.3&&o>i*.3)&&Bt(t,s,0,a,e.colorVariation([.18,.42,.15],.05),Wn)}for(let s=1;s<=8;s++)Bt(t,0,s,0,e.colorVariation([.25,.4,.18],.03),on);for(let s=0;s<3;s++){const a=6+s*2,o=5+s*3;for(let r=0;r<a;r++){const c=r/a*Math.PI*2+s*.25;for(let l=1;l<=o;l++){const h=l/o,u=Math.sin(h*Math.PI*.6)*(3.2-s*.8),f=Math.cos(c)*l,d=8+u,_=Math.sin(c)*l;if(Bt(t,f,d,_,e.colorVariation(n,.04),ve),h>.15&&h<.85){const g=c+Math.PI/2,m=.8-Math.abs(h-.5)*1.2;Bt(t,f+Math.cos(g)*m,d,_+Math.sin(g)*m,e.colorVariation(n,.04),ve)}}}}for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)s*s+a*a<=4&&Bt(t,s,10,a,e.colorVariation([.82,.78,.22],.05),ve);return t}const kg=["rose","sunflower","tulip","lavender","daisy","orchid","chrysanthemum","lotus"],Vg={rose:Dg,sunflower:Ig,tulip:Ug,lavender:Ng,daisy:Fg,orchid:Og,chrysanthemum:zg,lotus:Bg};function bh(e,t=Date.now()){return Vg[e](new xn(t))}const gn=2,Za=0;function ke(e,t,n,i,s,a){e.set(`${Math.round(t)},${Math.round(n)},${Math.round(i)}`,{color:s,type:a})}const Eh=35;function fi(e,t,n){let i=Eh;for(let s=0;s<n.length;s++)i+=n[s].amp*Math.cos(n[s].freq*t+n[s].phase);return Math.max(8,i)}function zi(e){const t=e.intRange(4,7),n=[];for(let i=0;i<t;i++)n.push({freq:e.intRange(1,5),amp:e.range(4,14),phase:e.range(0,Math.PI*2)});return n}function Bi(e){const t=e.intRange(3,8),n=[];for(let i=0;i<t;i++){const s=e.range(0,Math.PI*2),a=e.range(5,Eh*.7);n.push({x:Math.cos(s)*a,z:Math.sin(s)*a,r:e.range(3,8)})}return n}function ki(e,t,n){for(let i=0;i<n.length;i++){const s=e-n[i].x,a=t-n[i].z;if(s*s+a*a<n[i].r*n[i].r)return!0}return!1}function Th(e,t,n,i,s,a,o,r){const c=1-s*s*.7,l=Math.max(2,Math.round(a*c)),h=t.range(0,Math.PI*2),u=o*(.5+s*.8);let f=n,d=i;for(let _=0;_<l;_++){const g=_/l;f+=Math.cos(h)*u*g,d+=Math.sin(h)*u*g;const m=g>.8?[r[0]+.12,r[1]+.04,r[2]+.04]:r;ke(e,f,_,d,t.colorVariation(m,.04),gn)}return{tx:f,ty:l,tz:d}}function Vi(e,t,n){const i=t.intRange(3,7);for(let s=0;s<i;s++){const a=t.range(0,Math.PI*2),o=fi(t,a,n),r=t.range(o*.7,o*1.1),c=Math.cos(a)*r,l=Math.sin(a)*r,h=t.range(2,5),u=t.range(1.5,3.5),f=t.pick([[.45,.43,.4],[.38,.36,.34],[.52,.5,.46]]);for(let d=-Math.ceil(h);d<=Math.ceil(h);d++)for(let _=-Math.ceil(u);_<=Math.ceil(u);_++)for(let g=-Math.ceil(h);g<=Math.ceil(h);g++)d*d/(h*h)+_*_/(u*u)+g*g/(h*h)<=1&&_>=-u*.3&&ke(e,c+d,Math.max(0,_),l+g,t.colorVariation(f,.06),Za)}}function Hg(e){const t=new Map,n=zi(e),i=Bi(e),s=e.intRange(200,320);for(let a=0;a<s;a++){const o=e.range(0,Math.PI*2),r=fi(e,o,n),c=e.range(0,r),l=Math.cos(o)*c,h=Math.sin(o)*c,u=c/r;if(e.chance(u*u*.7)||ki(l,h,i))continue;const f=e.intRange(14,32),d=[.3+e.range(-.06,.06),.52+e.range(-.08,.08),.18];Th(t,e,l,h,u,f,e.range(.08,.18),d)}return Vi(t,e,n),t}function Gg(e){const t=new Map,n=zi(e),i=Bi(e),s=e.intRange(240,380);for(let a=0;a<s;a++){const o=e.range(0,Math.PI*2),r=fi(e,o,n),c=e.range(0,r),l=Math.cos(o)*c,h=Math.sin(o)*c,u=c/r;if(e.chance(u*u*.65)||ki(l,h,i))continue;const f=Math.max(1,e.intRange(2,5)-Math.floor(u*3));for(let d=0;d<f;d++){const _=l+e.range(-1.5,1.5),g=h+e.range(-1.5,1.5),m=e.intRange(6,16),p=[.42+e.range(-.05,.05),.5+e.range(-.06,.06),.22],x=Th(t,e,_,g,u,m,e.range(.06,.22),p);if(u<.5&&e.chance(.3)){const M=[.55,.48,.3];for(let v=0;v<e.intRange(2,4);v++)ke(t,x.tx+e.range(-.5,.5),x.ty+v,x.tz+e.range(-.5,.5),e.colorVariation(M,.06),gn)}}}return Vi(t,e,n),t}function Wg(e){const t=new Map,n=zi(e),i=Bi(e),s=e.intRange(150,240);for(let a=0;a<s;a++){const o=e.range(0,Math.PI*2),r=fi(e,o,n),c=e.range(0,r),l=Math.cos(o)*c,h=Math.sin(o)*c,u=c/r;if(e.chance(u*u*.7)||ki(l,h,i))continue;const f=e.intRange(28,50),d=1-u*u*.7,_=Math.max(4,Math.round(f*d)),g=e.range(0,Math.PI*2),m=e.range(.04,.12)+u*.06;let p=l,x=h;for(let M=0;M<_;M++){const v=M/_;p+=Math.cos(g)*m*v,x+=Math.sin(g)*m*v,ke(t,p,M,x,e.colorVariation([.35,.5,.22],.04),gn)}if(u<.6&&e.chance(.45)){const M=[.88+e.range(-.05,.05),.82+e.range(-.05,.05),.72],v=e.intRange(8,16);for(let T=0;T<v;T++){const b=T/v,E=Math.round((1-b*b)*3),w=_+T;p+=Math.cos(g)*m*.5,x+=Math.sin(g)*m*.5,ke(t,p,w,x,e.colorVariation(M,.06),gn);const S=g+Math.PI/2;for(let y=-E;y<=E;y++)y!==0&&e.chance(.6)&&ke(t,p+Math.cos(S)*y*.5,w+e.range(-.5,.5),x+Math.sin(S)*y*.5,e.colorVariation(M,.08),gn)}}}return Vi(t,e,n),t}function Xg(e){const t=new Map,n=zi(e),i=Bi(e),s=e.intRange(120,220);for(let a=0;a<s;a++){const o=e.range(0,Math.PI*2),r=fi(e,o,n),c=e.range(0,r);let l=Math.cos(o)*c,h=Math.sin(o)*c;const u=c/r;if(e.chance(u*u*.7)||ki(l,h,i))continue;const f=1-u*u*.65,d=Math.max(4,Math.round(e.intRange(22,44)*f)),_=e.range(-.03,.03),g=e.range(0,Math.PI*2);for(let p=0;p<d;p++)l+=Math.cos(g)*_,h+=Math.sin(g)*_,ke(t,l,p,h,e.colorVariation([.3,.42,.18],.03),Za);const m=Math.max(1,e.intRange(2,5)-Math.floor(u*3));for(let p=0;p<m;p++){const x=e.intRange(Math.floor(d*.3),d-2),M=e.range(0,Math.PI*2),v=e.intRange(4,10);for(let T=0;T<v;T++){const b=T/v;ke(t,l+Math.cos(M)*T*.7,x-b*b*2,h+Math.sin(M)*T*.7,e.colorVariation([.28,.45,.16],.04),gn)}}if(u<.5&&e.chance(.5)){const p=[.38,.25,.12],x=e.intRange(4,8);for(let M=0;M<x;M++){const v=M<x*.3||M>x*.8?1:1.5;for(let T=-Math.round(v);T<=Math.round(v);T++)for(let b=-Math.round(v);b<=Math.round(v);b++)T*T+b*b<=v*v&&ke(t,l+T,d+M,h+b,e.colorVariation(p,.05),gn)}}}return Vi(t,e,n),t}function Yg(e){const t=new Map,n=zi(e),i=Bi(e),s=e.intRange(350,500);for(let a=0;a<s;a++){const o=e.range(0,Math.PI*2),r=fi(e,o,n),c=e.range(0,r);let l=Math.cos(o)*c,h=Math.sin(o)*c;const u=c/r;if(e.chance(u*u*.75)||ki(l,h,i))continue;const f=1-u*u*.7,d=Math.max(2,Math.round(e.intRange(6,14)*f)),_=o+e.range(-.4,.4),g=.06+u*.05,m=[.25,.45+e.range(-.04,.04),.3];for(let p=0;p<d;p++){const x=p/d;l+=Math.cos(_)*g*x,h+=Math.sin(_)*g*x;const M=u>.5&&x>.7?-(x-.7)*2:0;ke(t,l,p+M,h,e.colorVariation(m,.04),gn)}}return Vi(t,e,n),t}function qg(e){const t=new Map,n=zi(e),i=Bi(e),s=e.intRange(220,340);for(let a=0;a<s;a++){const o=e.range(0,Math.PI*2),r=fi(e,o,n),c=e.range(0,r);let l=Math.cos(o)*c,h=Math.sin(o)*c;const u=c/r;if(e.chance(u*u*.65)||ki(l,h,i))continue;const f=1-u*u*.65,d=Math.max(4,Math.round(e.intRange(20,34)*f)),_=e.range(0,Math.PI*2),g=e.range(.02,.08)+u*.04,m=[.62,.55,.28];for(let p=0;p<d;p++){const x=p/d;l+=Math.cos(_)*g*x,h+=Math.sin(_)*g*x,ke(t,l,p,h,e.colorVariation(m,.03),Za)}if(u<.7&&e.chance(.6)){const p=[.72,.62,.3],x=e.intRange(3,6);let M=l,v=h;for(let T=0;T<x;T++){M+=Math.cos(_)*.3;const b=d+T*.5-T*T*.15;for(let E=-1;E<=1;E++)for(let w=-1;w<=1;w++)E*E+w*w<=1&&ke(t,M+E,b,v+w,e.colorVariation(p,.06),gn);v+=Math.sin(_)*.3}}}return Vi(t,e,n),t}function $g(e){const t=new Map,n=zi(e),i=Bi(e),s=e.intRange(260,400),a=[.4,.56,.24],o=[.32,.52,.2];for(let r=0;r<s;r++){const c=e.range(0,Math.PI*2),l=fi(e,c,n),h=e.range(0,l),u=Math.cos(c)*h,f=Math.sin(c)*h,d=h/l;if(e.chance(d*d*.6)||ki(u,f,i))continue;const _=e.intRange(6,18)*(1-d*.5),g=e.range(0,Math.PI*2),m=e.range(.04,.12);let p=u,x=f;for(let M=0;M<_;M++){const v=M/_;p+=Math.cos(g)*m*v,x+=Math.sin(g)*m*v,ke(t,p,M,x,e.colorVariation(a,.04),Za)}if(_>5){const M=e.intRange(2,4);for(let v=0;v<M;v++){const T=e.range(0,Math.PI*2),b=e.intRange(4,9);let E=p,w=_,S=x;for(let y=0;y<b;y++)if(E+=Math.cos(T)*.7,w-=.2+y/b*.3,S+=Math.sin(T)*.7,ke(t,E,w,S,e.colorVariation(o,.06),gn),y>1&&y<b-1){const A=T+Math.PI/2;ke(t,E+Math.cos(A)*.5,w,S+Math.sin(A)*.5,e.colorVariation(o,.06),gn)}}}}return Vi(t,e,n),t}const Zg=["tallgrass","prairie","pampas","reed","fescue","wheat","bamboo_grass"],jg={tallgrass:Hg,prairie:Gg,pampas:Wg,reed:Xg,fescue:Yg,wheat:qg,bamboo_grass:$g};function wh(e,t=Date.now()){return jg[e](new xn(t))}const ja=0,Kg=2,Jg=5;function Qg(e,t,n,i,s,a){e.set(`${Math.round(t)},${Math.round(n)},${Math.round(i)}`,{color:s,type:a})}function Rh(e,t,n,i,s,a){const o=`${Math.round(t)},${Math.round(n)},${Math.round(i)}`;e.has(o)||e.set(o,{color:s,type:a})}function tM(e){return e-Math.floor(e)}function eM(e,t,n,i=0){return tM(Math.sin(e*12.9898+t*78.233+n*37.719+i*19.19)*43758.5453)}function Zr(e,t,n,i=0){return eM(e,t,n,i)*2-1}function nM(e,t,n,i=0,s=3){let a=0,o=1,r=1,c=0;for(let l=0;l<s;l++)a+=Zr(e*r,t*r,n*r,i+l*31)*o,c+=o,o*=.5,r*=2.03;return c>0?a/c:0}function wl(e,t,n){return Math.max(t,Math.min(n,e))}function Fo(e,t=-.35,n=.7){const i=e.range(0,Math.PI*2),s=e.range(t,n),a=Math.sqrt(Math.max(1e-4,1-s*s));return{x:Math.cos(i)*a,y:s,z:Math.sin(i)*a}}function Rl(e,t){return e.x*t.x+e.y*t.y+e.z*t.z}function iM(e,t,n,i){return!e.has(`${t+1},${n},${i}`)||!e.has(`${t-1},${n},${i}`)||!e.has(`${t},${n+1},${i}`)||!e.has(`${t},${n-1},${i}`)||!e.has(`${t},${n},${i+1}`)||!e.has(`${t},${n},${i-1}`)}function sM(e,t,n){const{shape:i,topT:s,normalY:a,exposed:o,fractureT:r,shelfT:c}=n;let l=t.base;return r>.42&&t.dark?l=t.dark:c>.38&&t.accent&&e.chance(.55)?l=t.accent:i>.84&&t.dark&&e.chance(.2)?l=t.dark:i>.74&&t.accent&&e.chance(.32)&&(l=t.accent),t.stain&&s>.46&&a>.04&&e.chance(t.stain.prob)&&(l=t.stain.color),t.sparkle&&o&&e.chance(t.sparkle.prob)&&(l=t.sparkle.color),e.colorVariation(l,t.colorVar||.04)}function Al(e,t,n,i,s,a,o=2){const r=t.range(1,o+.75),c=t.range(.7,Math.max(1.2,o*.9)),l=t.range(1,o+.75),h=t.intRange(0,1e5);for(let u=-Math.ceil(r);u<=Math.ceil(r);u++)for(let f=0;f<=Math.ceil(c);f++)for(let d=-Math.ceil(l);d<=Math.ceil(l);d++){const _=u/r,g=f/c,m=d/l,p=Math.max(Math.abs(_),Math.abs(g)*1.1,Math.abs(m)),x=Zr(_*3.2+7,g*2.8-3,m*3.2+11,h)*.12;if(p+x<=1){const M=t.colorVariation(t.chance(.22)&&n.dark?n.dark:n.base,n.colorVar||.04);Rh(e,i+u,s+f,a+d,M,ja)}}}function aM(e,t,n,i,s,a=1){let o=Math.max(0,Math.round(i));for(;o<4&&e.has(`${n},${o},${s}`);)o++;if(e.has(`${n},${o},${s}`))return;const r=t.intRange(4,8),c=[[.24,.34,.14],[.3,.44,.16],[.38,.52,.22]];for(let l=0;l<r;l++){const h=t.intRange(-1,1),u=t.intRange(-1,1),f=t.intRange(2,Math.max(3,Math.round(4*a)));for(let d=0;d<f;d++)t.chance(.12+d*.06)||Rh(e,n+h,o+d,s+u,t.colorVariation(t.pick(c),.04),Jg)}}function oM(e,t,n,i,s={}){const a=s.grassAttempts??i.centers.length*3,o=s.stoneClusters??i.centers.length*4;for(let r=0;r<a&&i.grassSeeds.length!==0;r++){const c=t.pick(i.grassSeeds);aM(e,t,c.x+t.intRange(-1,1),Math.max(0,c.y),c.z+t.intRange(-1,1),c.fractureT>.65?1.25:1)}for(let r=0;r<o;r++){const c=t.pick(i.centers),l=t.range(0,Math.PI*2),h=t.range(Math.max(4,c.radius*.35),c.radius+10),u=Math.round(c.x+Math.cos(l)*h),f=Math.round(c.z+Math.sin(l)*h);e.has(`${u},0,${f}`)||e.has(`${u},1,${f}`)||Al(e,t,n,u,0,f,t.intRange(1,3))}for(let r=0;r<i.stoneSeeds.length;r++){if(!t.chance(.22))continue;const c=i.stoneSeeds[r],l=c.x+t.intRange(-2,2),h=c.z+t.intRange(-2,2);e.has(`${l},0,${h}`)||e.has(`${l},1,${h}`)||Al(e,t,n,l,0,h,t.intRange(1,2))}}function rM(e,t,n,i,s){const{ox:a,oy:o,oz:r,rx:c,ry:l,rz:h,flatness:u=.7,angularity:f=.7,roughness:d=.35,boxiness:_=.78,topFlatten:g=.24,spreadY:m=.55,shellThreshold:p=.6}=i,x=t.range(-.18,.18),M=t.range(-.18,.18),v=t.range(-.1,.1),T=t.range(-.1,.1),b=t.intRange(0,1e5),E=Array.from({length:t.intRange(5,8)},()=>({dir:Fo(t,-.18,.82),offset:t.range(.12,.42),amp:t.range(.22,.5)*(.85+f)})),w=Array.from({length:t.intRange(3,5)},()=>({dir:Fo(t,-.2,.72),threshold:t.range(.28,.58),amp:t.range(.06,.16)*(.8+f),power:t.intRange(4,7)})),S=Array.from({length:t.intRange(3,6)},()=>({dir:Fo(t,-.08,.22),offset:t.range(-.18,.22),width:t.range(.03,.09),depth:t.range(.08,.22),startY:t.range(-.1,.38),verticalBias:t.range(.7,1.2),lateralBias:t.range(.9,1.25)})),y=new Map,A=Math.ceil(c),I=Math.ceil(l),L=Math.ceil(h);s.centers.push({x:a,z:r,radius:Math.max(c,h)});for(let D=-A;D<=A;D++)for(let F=-I;F<=I;F++)for(let O=-L;O<=L;O++){const X=a+D,V=o+F,tt=r+O;if(V<0)continue;const et=D+F*x+O*v,U=O+F*M+D*T,B=et/c,$=F/l,N=U/h,k=B*B*.62+$*$*.92+N*N*.62;if(k>2.2)continue;const J=Math.sqrt(B*B+$*$+N*N)||1,K={x:B/J,y:$/J,z:N/J},Q=wl(1-Math.abs(J-1)*2.4,0,1),lt=Math.max(Math.abs(B)*(.92+f*.18),Math.abs($)*(1.08-u*.16),Math.abs(N)*(.92+f*.18)),ft=k*(1-_)+lt*(.98+_*.22);let bt=0;for(const nt of E){const rt=Rl(K,nt.dir)-nt.offset;rt>0&&(bt+=rt*nt.amp)}let St=0;for(const nt of w){const rt=Math.max(0,Rl(K,nt.dir)-nt.threshold);St=Math.max(St,Math.pow(rt,nt.power)*nt.amp)}let Kt=0,z=0;for(const nt of S){if($<nt.startY)continue;const rt=B*nt.lateralBias,at=$*nt.verticalBias,Pt=N*nt.lateralBias,pt=Math.abs(rt*nt.dir.x+at*nt.dir.y+Pt*nt.dir.z-nt.offset);if(pt<nt.width){const yt=1-pt/nt.width;Kt=Math.max(Kt,yt),z+=yt*nt.depth*(.55+Q*.9)}}const fe=n.strataAmp?Math.abs(Math.sin((F+b*.03)*n.strataFreq)):0,zt=wl(fe*Q*(1.2+u),0,1),Ot=zt*(n.strataAmp||0)*.85,Tt=nM(B*1.4+17,$*1.2-9,N*1.4+31,b,3)*d*.16,Jt=Zr(B*5.2+11,$*3.9+7,N*5-5,b+41)*f*.07*Q,Ct=K.y>.28?(K.y-.28)*(.14+u*.08+g*.08):0,P=K.y>.62?(K.y-.62)*(.2+g*.14):0,R=K.y<-.12?Math.abs(K.y+.12)*.035:0,q=ft+bt+z+Ot+Tt+Jt+Ct+P-St-R;q<=1&&F>=-l*m&&y.set(`${X},${V},${tt}`,{x:X,y:V,z:tt,shape:q,topT:(F+l)/(2*l),normalY:K.y,fractureT:Kt,shelfT:zt})}for(const D of y.values()){const F=iM(y,D.x,D.y,D.z);(D.shape>p||F||D.y<=o+1)&&(Qg(e,D.x,D.y,D.z,sM(t,n,{...D,exposed:F}),ja),D.y<=o+2&&F&&t.chance(.08)&&s.stoneSeeds.push(D),D.y<=o+1&&D.fractureT>.3&&F&&t.chance(.18)&&s.grassSeeds.push(D))}}function jn(e,t,n,i,s,a,o={}){const r={centers:[],grassSeeds:[],stoneSeeds:[]};for(let c=0;c<i;c++){const l=t.range(0,Math.PI*2),h=c===0?0:t.range(o.spreadMin||10,o.spreadMax||36),u=Math.round(Math.cos(l)*h),f=Math.round(Math.sin(l)*h),d=Math.max(0,Math.round(t.range(-2,4))),_=c===0?1:t.range(.62,.92),g=t.range(s,a)*_,m=t.range(s*(o.heightMin||.42),a*(o.heightMax||.64))*_,p=t.range(s,a)*_;rM(e,t,n,{ox:u,oy:d,oz:f,rx:g,ry:m,rz:p,flatness:o.flatness??.78,angularity:o.angularity??.82,roughness:o.roughness??.34,boxiness:o.boxiness??.8,topFlatten:o.topFlatten??.26,spreadY:o.spreadY??.58,shellThreshold:o.shellThreshold??.62},r)}oM(e,t,n,r,{grassAttempts:o.grassAttempts,stoneClusters:o.stoneClusters})}function cM(e){const t=new Map;return jn(t,e,{base:[.72,.58,.38],accent:[.82,.66,.44],dark:[.48,.34,.22],colorVar:.035,strataAmp:.11,strataFreq:.44},e.intRange(3,5),18,40,{flatness:.96,angularity:.92,roughness:.28,boxiness:.9,topFlatten:.34}),t}function lM(e){const t=new Map;return jn(t,e,{base:[.52,.5,.48],accent:[.64,.62,.58],dark:[.24,.24,.24],sparkle:{color:[.72,.7,.68],prob:.08},stain:{color:[.34,.4,.3],prob:.08},colorVar:.03},e.intRange(3,5),20,46,{flatness:.78,angularity:.84,roughness:.42,boxiness:.8,topFlatten:.24}),t}function hM(e){const t=new Map;jn(t,e,{base:[.18,.16,.14],accent:[.26,.22,.18],dark:[.08,.08,.08],sparkle:{color:[.6,.15,.05],prob:.03},colorVar:.035},e.intRange(4,6),16,38,{flatness:.62,angularity:1,roughness:.58,boxiness:.84,topFlatten:.18,shellThreshold:.58,grassAttempts:6});for(const[,n]of t)n.type===ja&&e.chance(.02)&&(n.color=e.colorVariation([.84,.28,.08],.06));return t}function uM(e){const t=new Map;return jn(t,e,{base:[.82,.78,.7],accent:[.9,.86,.78],dark:[.62,.57,.5],stain:{color:[.55,.6,.45],prob:.1},colorVar:.03,strataAmp:.08,strataFreq:.36},e.intRange(3,5),18,40,{flatness:.88,angularity:.78,roughness:.26,boxiness:.82,topFlatten:.28}),t}function fM(e){const t=new Map;return jn(t,e,{base:[.32,.34,.36],accent:[.4,.42,.44],dark:[.18,.2,.22],colorVar:.025,strataAmp:.12,strataFreq:.52},e.intRange(4,7),16,34,{flatness:1,angularity:.92,roughness:.22,boxiness:.94,topFlatten:.36,heightMin:.24,heightMax:.4,spreadY:.45,shellThreshold:.56}),t}function dM(e){const t=new Map;jn(t,e,{base:[.42,.4,.35],accent:[.5,.47,.4],dark:[.24,.22,.2],stain:{color:[.28,.48,.22],prob:.18},colorVar:.035},e.intRange(3,5),20,44,{flatness:.8,angularity:.76,roughness:.34,boxiness:.78,topFlatten:.24,grassAttempts:14});for(const[n,i]of t){const[s,a,o]=n.split(",").map(Number);i.type===ja&&!t.has(`${s},${a+1},${o}`)&&e.chance(.45)&&(i.color=e.colorVariation([.25,.5,.2],.06),i.type=Kg)}return t}function pM(e){const t=new Map,n=[[.35,.33,.3],[.28,.26,.24],[.45,.42,.38],[.38,.36,.32],[.5,.48,.44]];return jn(t,e,{base:e.pick(n),accent:e.pick(n),dark:[.2,.18,.16],colorVar:.03},e.intRange(6,10),10,22,{flatness:.5,angularity:.54,roughness:.14,boxiness:.66,topFlatten:.14,heightMin:.42,heightMax:.58,spreadMin:6,spreadMax:34,shellThreshold:.66,stoneClusters:16,grassAttempts:10}),t}function mM(e){const t=new Map;return jn(t,e,{base:[.85,.8,.75],accent:[.82,.7,.68],dark:[.72,.62,.6],stain:{color:[.78,.6,.58],prob:.16},colorVar:.04},e.intRange(3,5),16,36,{flatness:.58,angularity:.86,roughness:.48,boxiness:.76,topFlatten:.18,shellThreshold:.58}),t}function _M(e){const t=new Map;return jn(t,e,{base:[.28,.27,.25],accent:[.35,.34,.32],dark:[.16,.16,.16],colorVar:.02},e.pick([3,5]),12,22,{flatness:.9,angularity:.5,roughness:.1,boxiness:.72,topFlatten:.22,heightMin:.34,heightMax:.52,spreadMin:8,spreadMax:28,shellThreshold:.7,grassAttempts:8}),t}const gM=["sandstone","granite","volcanic","limestone","slate","mossy","riverrock","coral","zen_stone"],MM={sandstone:cM,granite:lM,volcanic:hM,limestone:uM,slate:fM,mossy:dM,riverrock:pM,coral:mM,zen_stone:_M};function Ah(e,t=Date.now()){return MM[e](new xn(t))}const Vn=0,Ch=3,Cl=4,vs=5,Pl=6,xM=7,st=3,Ph=336,ct=Ph/2,Fe=st*8;function tn(e,t,n,i,s,a){const o=Math.round(t/st)*st,r=Math.round(n/st)*st,c=Math.round(i/st)*st;e.set(`${o},${r},${c}`,{color:s,type:a??Vn,scale:st})}function At(e,t,n,i,s,a){let o=0,r=1,c=1,l=0;for(let h=0;h<s;h++)o+=e.noise2D(t*c*i,n*c*i)*r,l+=r,r*=a,c*=2;return o/l}const Ha=95e3;function yn(e,t,n,i,s){for(let a=-ct;a<=ct;a+=st)for(let o=-ct;o<=ct;o+=st){if(e.size>=Ha)return;const r=n(a,o),c=Math.max(0,Math.min(Fe,Math.round(r/st)*st)),l=i(a,o,c,!0,c);let h=Vn;if(s){const u=s(a,o,c);u!=null&&(h=u)}if(tn(e,a,c,o,t.colorVariation(l,.03),h),c>=st){const u=i(a,o,c-st,!1,c);tn(e,a,c-st,o,t.colorVariation(u,.03),Vn)}}}function Ys(e,t,n,i,s,a,o){a||(a=s,s=[Math.min(1,a[0]+.25),Math.min(1,a[1]+.2),Math.min(1,a[2]+.15)]),o||(o=s);const r=Math.round(n/st)*st,c=[];for(let u=-ct;u<=ct;u+=st)for(let f=-ct;f<=ct;f+=st){const d=i(u,f);Math.max(0,Math.min(Fe,Math.round(d/st)*st))<r&&c.push({x:u,z:f})}const l=st*25,h=.45;for(const u of c){let f=l;for(let g=0;g<8;g++){const m=[1,1,0,-1,-1,-1,0,1][g],p=[0,1,1,1,0,-1,-1,-1][g];for(let x=1;x<=25;x++){const M=u.x+m*x*st,v=u.z+p*x*st;if(M<-ct||M>ct||v<-ct||v>ct)break;const T=i(M,v);if(Math.max(0,Math.min(Fe,Math.round(T/st)*st))>=r){const E=x*st*(g%2===0?1:1.414);E<f&&(f=E);break}}}const d=Math.min(1,f/l);let _;if(d<h){const g=d/h,m=g*g*(3-2*g);_=[o[0]+(s[0]-o[0])*m,o[1]+(s[1]-o[1])*m,o[2]+(s[2]-o[2])*m]}else{const g=(d-h)/(1-h),m=g*g;_=[s[0]+(a[0]-s[0])*m,s[1]+(a[1]-s[1])*m,s[2]+(a[2]-s[2])*m]}tn(e,u.x,r,u.z,t.colorVariation(_,.015),Ch)}}function Kn(e,t,n,i,s){for(let a=0;a<n;a++){const o=t.range(-ct*.8,ct*.8),r=t.range(-ct*.8,ct*.8),c=i(o,r),l=Math.max(0,Math.min(Fe,Math.round(c/st)*st));tn(e,o,l+st,r,t.colorVariation(s,.06),Vn)}}function vM(e){const t=new Map;function n(a,o){const r=At(e,a,o,.002,4,.45)*(Fe-st),c=At(e,a,o,.008,3,.4)*st*2;return st+r+c}e.range(0,1e3);function i(a,o){const r=At(e,a,0,.002,2,.5)*ct*.6;return Math.abs(o-r)<12+At(e,a,o,.01,2,.5)*8}function s(a,o,r,c,l){if(c){if(i(a,o))return At(e,a,o,.025,2,.5)>.5?[.52,.42,.28]:[.45,.36,.22];const u=At(e,a,o,.015,3,.5),f=At(e,a,o,.04,2,.5);return u>.65?[.42,.58,.25]:u<.25?[.32,.42,.18]:f>.7?[.48,.55,.22]:[.35,.52,.2]}return At(e,a,o,.02,2,.5)>.6?[.48,.36,.2]:[.42,.32,.18]}return yn(t,e,n,s,(a,o)=>i(a,o)?null:vs),Kn(t,e,30,n,[.5,.48,.44]),t}function yM(e){const t=new Map;function n(s,a){const o=At(e,s,a,.002,4,.5),r=Math.sin(s*.007+At(e,s,a,.0015,2,.5)*3)*.3,c=At(e,s,a,.015,2,.4)*st;return(o+r)*Fe+c}function i(s,a,o,r,c){if(r){const l=At(e,s,a,.012,3,.5),h=Math.sin(s*.05+a*.02)*.5+.5;return l>.75&&c>Fe*.6?[.62,.52,.38]:l>.65?[.88,.78,.55]:h>.7?[.9,.82,.6]:[.82,.72,.5]}return[.72,.6,.4]}return yn(t,e,n,i),Kn(t,e,25,n,[.6,.48,.3]),t}function SM(e){const t=new Map,n=st*2;function i(r,c){const h=(1-(c+ct)/Ph)*Fe*1.8,u=At(e,r,c,.004,4,.45)*st,f=At(e,r,0,.003,2,.5)*st*2,d=At(e,r,c,.02,2,.4)*st*.5;return Math.max(0,h+u+f+d-Fe*.6)}const s=[.48,.52,.5],a=st*4;function o(r,c,l,h,u){if(h){if(u<=n)return[.42,.48,.46];const f=At(e,r,c,.015,3,.5),d=At(e,r,c,.05,2,.5);let _;u<=n+st&&d>.65?_=[.6,.55,.42]:f>.7?_=[.92,.88,.72]:f>.5?_=[.88,.84,.66]:_=[.85,.8,.62];const g=u-n;if(g<=a){const m=g/a,p=m*m*(3-2*m);return[s[0]+(_[0]-s[0])*p,s[1]+(_[1]-s[1])*p,s[2]+(_[2]-s[2])*p]}return _}return[.78,.7,.52]}return yn(t,e,i,o,(r,c,l)=>l<=n||l-n<=a?Pl:xM),Ys(t,e,n,i,[.75,.88,.92],[.1,.28,.48],[1,1,.82]),Kn(t,e,25,i,[.78,.76,.7]),t}function bM(e){const t=new Map;function n(s,a){const o=At(e,s,a,.003,5,.52),r=At(e,s,a,.01,3,.5)*st*1.5;return Math.pow(o,1.3)*Fe+r}function i(s,a,o,r,c){if(r){const h=At(e,s,a,.01,3,.5),u=At(e,s,a,.035,2,.5);return c>=Fe*.7?h>.3?[.92,.94,.97]:h>.15?[.82,.85,.9]:[.55,.53,.5]:c<Fe*.35&&h>.4?[.38,.48,.25]:u>.65?[.58,.55,.5]:[.48,.46,.42]}return At(e,s,a,.02,2,.5)>.5?[.42,.4,.36]:[.38,.36,.32]}return yn(t,e,n,i,(s,a,o)=>o<Fe*.35&&At(e,s,a,.01,3,.5)>.4?vs:null),Kn(t,e,40,n,[.44,.42,.4]),t}function EM(e){const t=new Map,n=st;function i(r,c){const l=At(e,r,c,.004,5,.5)*(st*2),h=At(e,r,c,.012,3,.4)*st;return At(e,r,c,.008,2,.5)>.3?l+h-st:l+h}const s=st*3;function a(r,c,l,h,u){if(h){const d=At(e,r,c,.01,3,.5),_=At(e,r,c,.04,2,.5);if(u<=n+st&&_>.5)return[.3,.25,.14];let g;d>.65?g=[.22,.35,.14]:d>.5?g=[.3,.42,.2]:d<.2?g=[.35,.28,.16]:_>.6?g=[.25,.38,.16]:g=[.28,.4,.18];const m=u-n;if(m>=0&&m<=s){const p=m/s,M=.4+.6*(p*p*(3-2*p));g=[g[0]*M,g[1]*M,g[2]*M]}return g}return At(e,r,c,.02,2,.5)>.5?[.28,.24,.13]:[.3,.26,.15]}yn(t,e,i,a,(r,c,l)=>{if(l<n)return null;const h=At(e,r,c,.01,3,.5);return h>=.2&&h<=.65?vs:null}),Ys(t,e,n,i,[.28,.34,.18],[.12,.18,.08],[.75,.88,.49]);const o=[[.18,.28,.12],[.2,.3,.14],[.15,.25,.1],[.22,.27,.13]];for(let r=-ct;r<=ct;r+=st)for(let c=-ct;c<=ct&&!(t.size>=Ha);c+=st){const l=i(r,c),h=Math.max(0,Math.min(Fe,Math.round(l/st)*st));if(h<n||!e.chance(.3))continue;const u=e.intRange(1,4);for(let f=0;f<u;f++){const d=r+e.range(-2,2),_=c+e.range(-2,2),g=e.intRange(2,5),m=o[e.intRange(0,o.length-1)],p=e.range(-.3,.3);let x=d;for(let M=0;M<g;M++){x+=p;const v=M===g-1?.06:0;t.set(`${Math.round(x)},${Math.round(h+st+M)},${Math.round(_)}`,{color:e.colorVariation([m[0]+v,m[1]+v*.5,m[2]],.05),type:vs})}}}return t}function TM(e){const t=new Map,n=[];for(let a=0;a<e.intRange(4,8);a++)n.push({x:e.range(-ct*.6,ct*.6),z:e.range(-ct*.6,ct*.6),r:e.range(30,120),d:e.range(4,14)});function i(a,o){let r=st*2+At(e,a,o,.003,4,.45)*st*2;const c=At(e,a,o,.015,3,.4)*st*.8;r+=c;for(const l of n){const h=a-l.x,u=o-l.z,f=Math.sqrt(h*h+u*u);if(f<l.r){const d=f/l.r;r-=l.d*(1-d*d),d>.8&&(r+=l.d*.2*((d-.8)/.2))}}return Math.max(0,r)}function s(a,o,r,c,l){if(c){const h=At(e,a,o,.012,3,.5),u=At(e,a,o,.04,2,.5);for(const f of n){const d=a-f.x,_=o-f.z,g=Math.sqrt(d*d+_*_);if(g>f.r&&g<f.r*2&&Math.sin(Math.atan2(_,d)*8)*.5+.5>.7)return[.75,.73,.7]}return h>.6?[.7,.68,.65]:u>.7?[.62,.6,.57]:[.58,.56,.53]}return[.48,.46,.44]}return yn(t,e,i,s),Kn(t,e,20,i,[.52,.5,.48]),t}function wM(e){const t=new Map,n=[];for(let a=0;a<e.intRange(3,6);a++)n.push({x:e.range(-ct*.5,ct*.5),z:e.range(-ct*.5,ct*.5),r:e.range(25,100),d:e.range(3,12)});function i(a,o){let r=st+At(e,a,o,.003,5,.5)*st*3;const c=At(e,a,o,.012,3,.4)*st;r+=c;for(const l of n){const h=a-l.x,u=o-l.z,f=Math.sqrt(h*h+u*u);if(f<l.r){const d=f/l.r;r-=l.d*(1-d*d),d>.82&&(r+=l.d*.2*((d-.82)/.18))}}return Math.max(0,r)}function s(a,o,r,c,l){if(c){const u=At(e,a,o,.01,3,.5),f=At(e,a,o,.04,2,.5);return u>.7?[.78,.42,.2]:u>.55?[.75,.38,.18]:f>.7?[.6,.28,.12]:f<.2?[.72,.45,.25]:[.68,.32,.15]}return At(e,a,o,.02,2,.5)>.5?[.5,.22,.08]:[.55,.25,.1]}return yn(t,e,i,s),Kn(t,e,30,i,[.32,.16,.08]),t}function RM(e){const t=new Map,n=0;function i(a,o){const r=At(e,a,o,.003,5,.45)*Fe,c=At(e,a,o,.01,3,.4)*st*1.5,l=At(e,a,0,.003,3,.5)*40,h=Math.abs(o-l),u=20+At(e,a,0,.002,2,.5)*18;return h<u?-st:h<u+15?(h-u)/15*(st+r*.8+c):st+r*.8+c}function s(a,o,r,c,l){if(c){const u=At(e,a,o,.01,3,.5),f=At(e,a,o,.04,2,.5),d=At(e,a,0,.003,3,.5)*40,_=Math.abs(o-d);return l<=st&&_<40?[.38,.3,.18]:u>.72?[.5,.55,.35]:u>.55?[.42,.58,.25]:f>.7?[.48,.56,.28]:f<.15?[.36,.46,.2]:[.38,.52,.22]}return At(e,a,o,.02,2,.5)>.5?[.44,.34,.18]:[.4,.3,.16]}return yn(t,e,i,s,(a,o,r)=>{const c=At(e,a,0,.003,3,.5)*40,l=Math.abs(o-c);return r<=st&&l<40?null:vs}),Ys(t,e,n,i,[.4,.62,.72],[.1,.3,.45],[.81,.96,.68]),Kn(t,e,20,i,[.55,.5,.42]),t}function AM(e){const t=new Map,n=0;function i(a,o){const r=At(e,a,o,.003,4,.5),c=At(e,a,o,.01,3,.4)*st;return r*st*3+c}function s(a,o,r,c,l){if(c){const u=At(e,a,o,.01,3,.5),f=At(e,a,o,.04,2,.5);return u>.65?[.9,.92,.96]:u>.5?[.82,.85,.9]:u<.2?[.38,.4,.32]:f>.7?[.55,.58,.45]:f<.15?[.65,.68,.72]:[.72,.75,.8]}return At(e,a,o,.02,2,.5)>.5?[.44,.42,.38]:[.48,.46,.4]}return yn(t,e,i,s),Ys(t,e,n,i,[.68,.8,.9],[.38,.55,.72]),Kn(t,e,15,i,[.5,.48,.45]),t}function CM(e){const t=new Map,n=0;function i(a,o){const r=At(e,a,o,.003,5,.5),c=At(e,a,o,.015,3,.45)*st;return At(e,a,o,.02,3,.5)>.65?-st:st+r*(Fe-st)+c}function s(a,o,r,c,l){if(c){const u=At(e,a,o,.012,3,.5),f=At(e,a,o,.04,2,.5),d=At(e,a,o,.02,3,.5);return d>.58&&d<=.65?[.45,.15,.05]:u>.72?[.28,.25,.2]:f>.75?[.1,.08,.12]:f<.15?[.3,.28,.24]:[.18,.16,.13]}return At(e,a,o,.02,2,.5)>.5?[.12,.1,.08]:[.15,.12,.1]}return yn(t,e,i,s),Ys(t,e,n,i,[.95,.55,.15],[.75,.18,.02]),Kn(t,e,20,i,[.18,.15,.12]),t}function PM(e){const t=new Map,n=e.intRange(0,3);function i(U,B,$){const N=Math.max(0,Math.min(1,($-U)/(B-U)));return N*N*(3-2*N)}let s,a;n===0?(s=e.range(-ct*.08,ct*.08),a=e.range(-ct*.08,ct*.08)):n===1?(s=e.range(-ct*.15,ct*.15),a=e.range(-ct*.3,-ct*.1)):(s=e.range(-ct*.35,-ct*.15),a=e.range(-ct*.35,-ct*.15));const o=e.range(ct*.1,ct*.15);let r;n===0?r=[{x:-ct-10,z:e.range(-40,40)},{x:-ct*.5,z:e.range(-50,50)},{x:s-o*.8,z:a},{x:s,z:a},{x:s+o*.8,z:a},{x:ct*.5,z:e.range(-50,50)},{x:ct+10,z:e.range(-40,40)}]:n===1?r=[{x:-ct-10,z:e.range(-ct*.35,-ct*.1)},{x:-ct*.5,z:e.range(-ct*.35,-ct*.05)},{x:s-o*.8,z:a},{x:s,z:a},{x:s+o*.8,z:a},{x:ct*.5,z:e.range(-ct*.35,-ct*.05)},{x:ct+10,z:e.range(-ct*.35,-ct*.1)}]:r=[{x:-ct-10,z:-ct*.35+e.range(-30,30)},{x:-ct*.4,z:-ct*.3+e.range(-20,20)},{x:s-o*.8,z:a},{x:s,z:a},{x:s+o*.8,z:a},{x:ct*.15,z:ct*.05+e.range(-20,20)},{x:ct*.4,z:ct*.3+e.range(-20,20)},{x:ct+10,z:ct*.35+e.range(-30,30)}];const c=st*8,l=st*14;function h(U,B,$,N,k){const J=k*k,K=J*k;return{x:.5*(2*B.x+(-U.x+$.x)*k+(2*U.x-5*B.x+4*$.x-N.x)*J+(-U.x+3*B.x-3*$.x+N.x)*K),z:.5*(2*B.z+(-U.z+$.z)*k+(2*U.z-5*B.z+4*$.z-N.z)*J+(-U.z+3*B.z-3*$.z+N.z)*K)}}const u=12,f=[];for(let U=0;U<r.length-1;U++){const B=r[Math.max(0,U-1)],$=r[U],N=r[U+1],k=r[Math.min(r.length-1,U+2)];for(let J=0;J<u;J++){const K=J/u;f.push(h(B,$,N,k,K))}}f.push(r[r.length-1]);const d=f.length,_=[];for(let U=0;U<d-1;U++){const B=f[U].x,$=f[U].z,N=f[U+1].x,k=f[U+1].z,J=l+st*16;_.push({minX:Math.min(B,N)-J,maxX:Math.max(B,N)+J,minZ:Math.min($,k)-J,maxZ:Math.max($,k)+J})}function g(U,B){let $=1/0,N=0;for(let Q=0;Q<d-1;Q++){const lt=_[Q];if(U<lt.minX||U>lt.maxX||B<lt.minZ||B>lt.maxZ)continue;const ft=f[Q].x,bt=f[Q].z,St=f[Q+1].x,Kt=f[Q+1].z,z=St-ft,fe=Kt-bt,zt=U-ft,Ot=B-bt,Tt=z*z+fe*fe;let Jt=Tt>0?(zt*z+Ot*fe)/Tt:0;Jt=Math.max(0,Math.min(1,Jt));const Ct=ft+z*Jt,P=bt+fe*Jt,R=U-Ct,q=B-P,nt=R*R+q*q;nt<$&&($=nt,N=Q)}$=Math.sqrt($);const k=N/(d-1),J=1-Math.min(1,Math.abs(k-.5)*2.5),K=c+(l-c)*J;return{dist:$,width:K,globalT:k}}function m(U,B){const $=U-s,N=B-a;return $*$+N*N<o*o}function p(U,B){if(m(U,B))return!0;const $=g(U,B);return $.dist<$.width}const x=[],M=Math.floor(d*.3);for(let U=0;U<e.intRange(10,18);U++){const B=e.chance(.5)?e.intRange(2,M):e.intRange(d-M,d-2),$=f[B],N=$.x+e.range(-st*3,st*3),k=$.z+e.range(-st*3,st*3);m(N,k)||x.push({x:N,z:k,r:e.range(st*1.5,st*3.5)})}function v(U,B){for(const $ of x){const N=U-$.x,k=B-$.z;if(N*N+k*k<($.r+st*4)*($.r+st*4))return{stone:$,dist:Math.sqrt(N*N+k*k)}}return null}function T(U,B){for(const $ of x){const N=U-$.x,k=B-$.z;if(N*N+k*k<$.r*$.r)return!0}return!1}const b=e.range(0,1e3),E=e.range(0,1e3);function w(U,B,$,N,k){const J=Math.atan2(N-B,$-U),K=Math.sin(J*2.3+b)*.18,Q=Math.sin(J*3.7+E)*.12,lt=Math.sin(J*1.1+b*.7)*.08;return k*(1+K+Q+lt)}function S(U,B){let $=0;if(n===0){const ft=ct*.52,bt=Math.sqrt(U*U+B*B),St=w(0,0,U,B,ft);$=1-i(St*.78,St*1.08,bt)}else if(n===1){const ft=Math.sin(U*.008+b)*ct*.12+Math.sin(U*.014+E)*ct*.06+Math.sin(U*.003+b*.5)*ct*.08,bt=ct*.05+ft;$=1-i(bt-ct*.08,bt+ct*.08,B)}else{const ft=ct*.48,bt=-ct*.28,St=-ct*.28,Kt=ct*.28,z=ct*.28,fe=Math.sqrt((U-bt)*(U-bt)+(B-St)*(B-St)),zt=Math.sqrt((U-Kt)*(U-Kt)+(B-z)*(B-z)),Ot=w(bt,St,U,B,ft),Tt=w(Kt,z,U,B,ft),Jt=1-i(Ot*.78,Ot*1.08,fe),Ct=1-i(Tt*.78,Tt*1.08,zt);$=Math.max(Jt,Ct)}const N=g(U,B),k=N.width+st*14,J=N.dist<k?1-i(N.width,k,N.dist):0,K=Math.sqrt((U-s)*(U-s)+(B-a)*(B-a)),Q=o+st*12,lt=K<Q?1-i(o,Q,K):0;return Math.min(1,Math.max($,J,lt))}function y(U,B){if(p(U,B)&&!T(U,B))return st*.5;const $=g(U,B);if($.dist<$.width+st*6){const k=Math.max(0,($.dist-$.width)/(st*6));return st*.5+k*(st-st*.5)}return S(U,B)>.15?st+st:st}function A(U,B,$,N,k){if(N){const J=g(U,B);if(J.dist<J.width+st*5&&J.dist>=J.width){const bt=(J.dist-J.width)/(st*5);if(bt<.3)return[.42,.36,.26];if(bt<.6)return[.52,.46,.34]}const K=S(U,B);if(K>.6)return[.32,.5,.22];if(K>.35)return[.38,.54,.26];if(K>.15)return[.46,.58,.32];let Q=1/0;if(n===0)Q=Math.sqrt(U*U+B*B);else if(n===1)Q=Math.abs(B);else{const bt=Math.sqrt((U+ct*.28)*(U+ct*.28)+(B+ct*.28)*(B+ct*.28)),St=Math.sqrt((U-ct*.28)*(U-ct*.28)+(B-ct*.28)*(B-ct*.28));Q=Math.min(bt,St)}const lt=Math.sqrt((U-s)*(U-s)+(B-a)*(B-a));Q=Math.min(Q,lt,J.dist);const ft=Math.sin(Q*.22);return ft>.35?[.82,.8,.76]:ft<-.35?[.72,.7,.66]:[.77,.75,.71]}return[.68,.66,.62]}yn(t,e,y,A,(U,B)=>S(U,B)>.15?vs:null);const I=Math.round(st/st)*st,L=[.06,.18,.38],D=[.18,.38,.55],F=[.35,.55,.65],O=[.88,.92,.96];for(let U=-ct;U<=ct;U+=st)for(let B=-ct;B<=ct;B+=st){if(!p(U,B)||T(U,B))continue;if(t.size>=Ha)break;let $;const N=v(U,B);if(m(U,B)){const k=U-s,J=B-a,K=o-Math.sqrt(k*k+J*J),Q=Math.min(1,Math.max(0,K/(o*.6))),lt=Q*Q;$=[F[0]+(L[0]-F[0])*lt,F[1]+(L[1]-F[1])*lt,F[2]+(L[2]-F[2])*lt]}else{const k=g(U,B),J=k.width-k.dist,K=Math.min(1,Math.max(0,J/(k.width*.7)));if(N&&N.dist<N.stone.r+st*3){const Q=Math.max(0,1-(N.dist-N.stone.r)/(st*3)),lt=At(e,U,B,.04,2,.5),ft=Q*.8+lt*.2;$=[D[0]+(O[0]-D[0])*ft,D[1]+(O[1]-D[1])*ft,D[2]+(O[2]-D[2])*ft]}else{const Q=K*K;$=[F[0]+(D[0]-F[0])*Q,F[1]+(D[1]-F[1])*Q,F[2]+(D[2]-F[2])*Q],Math.sin(U*.08+B*.03+At(e,U,B,.01,2,.5)*3)>.6&&($[0]+=.08,$[1]+=.08,$[2]+=.06)}}tn(t,U,I,B,e.colorVariation($,.015),Ch)}const X=[.45,.43,.4],V=[.32,.3,.28];for(const U of x){const B=Math.ceil(U.r/st);for(let $=-B;$<=B;$++)for(let N=-B;N<=B;N++){const k=$*$+N*N;if(k>B*B)continue;const J=Math.max(0,1-Math.sqrt(k)/B),K=Math.round(J*st*2);for(let Q=0;Q<=K;Q+=st){const lt=Q===K?X:V;tn(t,U.x+$*st,I+Q,U.z+N*st,e.colorVariation(lt,.04),Vn)}}}const tt=[[.92,.5,.12],[.95,.9,.85],[.88,.2,.1],[.15,.15,.15],[.9,.75,.2]];for(let U=0;U<e.intRange(4,8);U++){const B=e.range(0,Math.PI*2),$=e.range(.2,.75)*o,N=s+Math.cos(B)*$,k=a+Math.sin(B)*$,J=e.pick(tt),K=e.range(0,Math.PI*2),Q=e.intRange(3,5);for(let lt=-Q;lt<=Q;lt++){const ft=N+Math.cos(K)*lt*st,bt=k+Math.sin(K)*lt*st;m(ft,bt)&&(tn(t,ft,st,bt,e.colorVariation(J,.04),Cl),Math.max(0,1-Math.abs(lt)/Q)>.5&&tn(t,ft+Math.cos(K+1.57)*st,st,bt+Math.sin(K+1.57)*st,e.colorVariation(J,.04),Cl))}}const et=[.52,.5,.47];for(let U=-ct;U<=ct;U+=st*2)for(let B=-ct;B<=ct&&!(t.size>=Ha);B+=st*2){const $=U-s,N=B-a,k=$*$+N*N,J=(o-st*2)*(o-st*2),K=(o+st*3)*(o+st*3);if(k>J&&k<K&&e.chance(.3)){tn(t,U,st,B,e.colorVariation(et,.03),Vn),e.chance(.4)&&tn(t,U,st+st,B,e.colorVariation(et,.03),Vn);continue}const Q=g(U,B);Q.dist>Q.width-st*2&&Q.dist<Q.width+st*3&&e.chance(.12)&&(tn(t,U,st,B,e.colorVariation(et,.03),Vn),e.chance(.3)&&tn(t,U,st+st,B,e.colorVariation(et,.03),Vn))}return t}const LM=["woodland","desert","beach","mountain","swampland","moon","martian","valley","tundra","volcanic_terrain","zen_garden"],DM={woodland:vM,desert:yM,beach:SM,mountain:bM,swampland:EM,moon:TM,martian:wM,valley:RM,tundra:AM,volcanic_terrain:CM,zen_garden:PM};function Lh(e,t=Date.now()){return DM[e](new xn(t))}const qn=0,bn=2,Ll=3,Et=1;function IM(e,t,n,i,s,a=qn){const o=Math.round(t/Et)*Et,r=Math.round(n/Et)*Et,c=Math.round(i/Et)*Et;e.set(`${o},${r},${c}`,{color:s,type:a,scale:Et})}function an(e,t,n,i,s,a=qn){const o=Math.round(t/Et)*Et,r=Math.round(n/Et)*Et,c=Math.round(i/Et)*Et,l=`${o},${r},${c}`;e.has(l)||e.set(l,{color:s,type:a,scale:Et})}function UM(e){return e-Math.floor(e)}function NM(e,t,n,i=0){return UM(Math.sin(e*12.9898+t*78.233+n*37.719+i*19.19)*43758.5453)}function jr(e,t,n,i=0){return NM(e,t,n,i)*2-1}function Dh(e,t,n,i=0,s=3){let a=0,o=1,r=1,c=0;for(let l=0;l<s;l++)a+=jr(e*r,t*r,n*r,i+l*31)*o,c+=o,o*=.5,r*=2.02;return c>0?a/c:0}function Dr(e,t,n){return Math.max(t,Math.min(n,e))}function Oo(e,t=-.25,n=.75){const i=e.range(0,Math.PI*2),s=e.range(t,n),a=Math.sqrt(Math.max(1e-4,1-s*s));return{x:Math.cos(i)*a,y:s,z:Math.sin(i)*a}}function zo(e,t){return e.x*t.x+e.y*t.y+e.z*t.z}function FM(e,t,n,i){return!e.has(`${t+Et},${n},${i}`)||!e.has(`${t-Et},${n},${i}`)||!e.has(`${t},${n+Et},${i}`)||!e.has(`${t},${n-Et},${i}`)||!e.has(`${t},${n},${i+Et}`)||!e.has(`${t},${n},${i-Et}`)}function Pi(e,t,n,i){const s=Math.round(t/Et)*Et,a=Math.round(n/Et)*Et,o=Math.round(i/Et)*Et;return e.has(`${s},${a},${o}`)}function OM(e,t,n){const{fractureT:i,shelfT:s,topT:a,normalY:o,exposed:r}=n;let c=t.base;return i>.38&&t.dark?c=t.dark:(s>.35&&t.light&&e.chance(.55)||a>.7&&t.light&&e.chance(.35))&&(c=t.light),t.stain&&a>.45&&o>.05&&e.chance(t.stain.prob)&&(c=t.stain.color),t.sparkle&&r&&e.chance(t.sparkle.prob)&&(c=t.sparkle.color),e.colorVariation(c,t.colorVar||.035)}function zM(e,t,n,i,s,a,o,r,c){const l=t.intRange(0,1e5);for(let h=-o;h<=o;h+=Et)for(let u=0;u<=r;u+=Et)for(let f=-c;f<=c;f+=Et){const d=h/Math.max(Et,o),_=u/Math.max(Et,r),g=f/Math.max(Et,c),m=Math.max(Math.abs(d),Math.abs(_)*1.05,Math.abs(g)),p=jr(d*3.5+4,_*2.8+11,g*3.5-7,l)*.12;m+p<=1&&an(e,i+h,s+u,a+f,t.colorVariation(t.pick(n),.04),qn)}}function BM(e,t,n,i){const s=new Set,a=i.baseSeeds.filter(o=>o.y<=n.baseGrowthHeight);for(const o of a){if(!t.chance(n.baseGrowthDensity))continue;const r=t.intRange(n.baseRadiusMin,n.baseRadiusMax);for(let c=-r;c<=r;c++)for(let l=-r;l<=r;l++){const h=o.x+c,u=o.z+l,f=`${h},${u}`;if(s.has(f))continue;const d=Math.sqrt(c*c+l*l),_=l>0?.12:-.05,g=Dh(h*.08,0,u*.08,n.seed+o.x*3+o.z*5,2)*.55;d>r*(.62+g+_)||Pi(e,h,0,u)||Pi(e,h,1,u)||Math.abs(h)>n.groundRadiusX||Math.abs(u)>n.groundRadiusZ||(an(e,h,0,u,t.colorVariation(t.pick(n.groundPalette),.03),n.groundType??qn),t.chance(.18)&&!Pi(e,h,1,u)&&an(e,h,1,u,t.colorVariation(t.pick(n.groundPalette),.03),n.groundType??qn),s.add(f))}}}function ss(e,t,n,i,s,a,o={}){const r=o.stems??t.intRange(4,8),c=o.maxHeight??12,l=o.type??bn;for(let h=0;h<r;h++){const u=t.intRange(-1,1)*Et,f=t.intRange(-1,1)*Et,d=t.intRange(1,Math.max(1,Math.round(c/Et)));for(let _=0;_<d;_++)an(e,n+u,i+_*Et,s+f,t.colorVariation(t.pick(a),.05),l)}}function kM(e,t,n,i,s,a,o=5){for(let r=0;r<o;r++){const c=t.intRange(-2,2),l=t.intRange(-2,2),h=t.intRange(1,2),u=t.colorVariation([.24,.44,.18],.04);for(let f=0;f<h;f++)an(e,n+c,i+f,s+l,u,bn);an(e,n+c,i+h,s+l,t.colorVariation(t.pick(a),.05),bn)}}function Dl(e,t,n,i,s=.4){for(const a of n.ledgeSeeds)t.chance(s)&&an(e,a.x,a.y+Et,a.z,t.colorVariation(t.pick(i),.025),qn)}function VM(e,t,n,i){for(const s of n.fractureSeeds)t.chance(.22)&&an(e,s.x,s.y,s.z,t.colorVariation(t.pick(i),.04),qn)}function Il(e,t,n,i){const{material:s,ox:a,oy:o,oz:r,rx:c,ry:l,rz:h,flatness:u=.82,angularity:f=.82,roughness:d=.28,boxiness:_=.88,topFlatten:g=.34,spreadY:m=.48,shellThreshold:p=.66}=n,x=t.intRange(0,1e5),M=t.range(-.12,.12),v=t.range(-.12,.12),T=Array.from({length:t.intRange(8,12)},()=>({dir:Oo(t,-.18,.84),offset:t.range(.06,.34),amp:t.range(.24,.54)*(.95+f)})),b=Array.from({length:t.intRange(4,8)},()=>({dir:Oo(t,-.06,.22),offset:t.range(-.18,.18),width:t.range(.04,.1),depth:t.range(.1,.24),startY:t.range(-.05,.46)})),E=Array.from({length:t.intRange(2,4)},()=>({dir:Oo(t,-.2,.55),threshold:t.range(.24,.55),amp:t.range(.06,.16),power:t.intRange(4,7)})),w=new Map;i.centers.push({x:a,z:r,radius:Math.max(c,h)});for(let S=-c;S<=c;S+=Et)for(let y=-l;y<=l;y+=Et)for(let A=-h;A<=h;A+=Et){const I=a+S,L=o+y,D=r+A;if(L<0)continue;const F=(S+y*M)/c,O=y/l,X=(A+y*v)/h,V=F*F*.48+O*O*.92+X*X*.64;if(V>2.3)continue;const tt=Math.sqrt(F*F+O*O+X*X)||1,et={x:F/tt,y:O/tt,z:X/tt},U=Dr(1-Math.abs(tt-1)*2.5,0,1),B=Math.max(Math.abs(F)*(1.02+f*.22),Math.abs(O)*(1.18-u*.18),Math.abs(X)*(.92+f*.16)),$=V*(1-_*.55)+B*(1.04+_*.34);let N=0;for(const P of T){const R=zo(et,P.dir)-P.offset;R>0&&(N+=R*P.amp)}let k=0;for(const P of E){const R=Math.max(0,zo(et,P.dir)-P.threshold);k=Math.max(k,Math.pow(R,P.power)*P.amp)}let J=0,K=0;for(const P of b){if(O<P.startY)continue;const R=Math.abs(zo(et,P.dir)-P.offset);if(R<P.width){const q=1-R/P.width;J=Math.max(J,q),K+=q*P.depth*(.6+U*.8)}}const Q=s.strataAmp?Math.abs(Math.sin((y+x*.04)*s.strataFreq)):0,lt=Dr(Q*U*(1.2+u),0,1),ft=lt*(s.strataAmp||0)*1.05,bt=Dh(F*1.3+17,O*1.2-5,X*1.3+31,x,3)*d*.14,St=jr(F*5.2+5,O*4.1+11,X*5-3,x+41)*f*.08*U,Kt=lt*(.05+u*.03),z=et.y>.16?(et.y-.16)*(.18+g*.1):0,fe=et.y>.54?(et.y-.54)*(.32+g*.14):0,zt=et.z<-.18&&et.y<.22?(.22-et.y)*.1:0,Ot=et.z<-.08?(-et.z-.08)*(.06+f*.03):0,Tt=et.z<-.04&&et.y>-.02&&et.y<.4?(.4-et.y)*.045:0,Jt=et.y<-.18?Math.abs(et.y+.18)*.02:0,Ct=$+N+K+ft+Kt+bt+St+z+fe+zt+Ot+Tt-k-Jt;Ct<=1&&y>=-l*m&&w.set(`${I},${L},${D}`,{x:I,y:L,z:D,shape:Ct,topT:(y+l)/(2*l),normalY:et.y,fractureT:J,shelfT:lt})}for(const S of w.values()){const y=FM(w,S.x,S.y,S.z),A=S.y<=o+Math.max(2,Math.round(l*.035)),I=S.shape>p&&S.y<=o+Math.round(l*.16)&&S.normalY<.12&&(S.x+S.z)%4===0,L=S.fractureT>.5&&S.y<=o+Math.round(l*.4)&&(S.x+S.z+S.y)%5===0;(y||A||I||L)&&(IM(e,S.x,S.y,S.z,OM(t,s,{...S,exposed:y}),qn),y&&!w.has(`${S.x},${S.y+Et},${S.z}`)&&S.y>o+l*.15&&i.ledgeSeeds.push(S),y&&S.y<=o+Et*2&&i.baseSeeds.push(S),y&&S.fractureT>.32&&i.fractureSeeds.push(S))}}function HM(e,t,n,i){const s=[n.material.base,n.material.dark||n.material.base,n.material.light||n.material.base];for(let a=0;a<i.centers.length*3;a++){const o=t.pick(i.centers),r=t.range(0,Math.PI*2),c=t.range(o.radius*.14,o.radius*.42),l=Math.round((o.x+Math.cos(r)*c)/Et)*Et,h=Math.round((o.z+Math.sin(r)*c)/Et)*Et;Pi(e,l,0,h)||Pi(e,l,Et,h)||zM(e,t,s,l,0,h,t.intRange(1,2)*Et,t.intRange(1,2)*Et,t.intRange(1,2)*Et)}}function GM(e,t,n,i){switch(BM(e,t,n,i),HM(e,t,n,i),n.decoration){case"woodland":case"forest":case"valley":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.16)||(ss(e,t,s.x,1,s.z,[[.24,.46,.18],[.36,.58,.22]],{maxHeight:8,type:bn}),t.chance(.28)&&kM(e,t,s.x,1,s.z,[[.86,.8,.38],[.7,.56,.86],[.92,.84,.78]],t.intRange(3,6)));break;case"jungle":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.18)||ss(e,t,s.x,1,s.z,[[.2,.42,.16],[.3,.56,.2],[.4,.62,.28]],{maxHeight:10,type:bn,stems:6});break;case"desert":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.08)||ss(e,t,s.x,Et,s.z,[[.6,.52,.24],[.72,.62,.34]],{maxHeight:9,stems:4,type:bn});break;case"beach":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.14)||ss(e,t,s.x,1,s.z,[[.42,.62,.3],[.52,.72,.38]],{maxHeight:8,type:bn});for(let s=0;s<8;s++){const a=t.intRange(-n.groundRadiusX*.7/Et,n.groundRadiusX*.7/Et)*Et,o=t.intRange(-n.groundRadiusZ*.3/Et,n.groundRadiusZ*.8/Et)*Et;Pi(e,a,0,o)||an(e,a,0,o,t.colorVariation([.42,.68,.74],.04),Ll)}break;case"swampland":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.12)||ss(e,t,s.x,Et,s.z,[[.28,.44,.16],[.36,.5,.2]],{maxHeight:15,stems:5,type:bn});for(let s=0;s<10;s++){const a=t.intRange(-n.groundRadiusX*.7/Et,n.groundRadiusX*.7/Et)*Et,o=t.intRange(-n.groundRadiusZ*.7/Et,n.groundRadiusZ*.7/Et)*Et;Pi(e,a,0,o)||an(e,a,0,o,t.colorVariation([.24,.34,.28],.03),Ll)}break;case"mountain":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.08)||ss(e,t,s.x,1,s.z,[[.38,.58,.26],[.48,.66,.32]],{maxHeight:6,type:bn});break;case"tundra":Dl(e,t,i,[[.88,.9,.92],[.78,.82,.86]],.48);break;case"moon":Dl(e,t,i,[[.6,.6,.58],[.52,.52,.5]],.18);break;case"martian":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.1)||an(e,s.x,1,s.z,t.colorVariation([.74,.42,.24],.04),qn);break;case"volcanic":VM(e,t,i,[[.9,.42,.08],[.98,.62,.14]]);break;case"zen":for(const s of i.baseSeeds)s.y>n.baseGrowthHeight||!t.chance(.08)||an(e,s.x,1,s.z,t.colorVariation([.38,.56,.24],.04),bn);break}}function WM(e,t){const n=new Map,i={centers:[],ledgeSeeds:[],baseSeeds:[],fractureSeeds:[]};t.seed=e.intRange(0,1e5),t.baseGrowthHeight??(t.baseGrowthHeight=6),t.baseGrowthDensity??(t.baseGrowthDensity=.04),t.baseRadiusMin??(t.baseRadiusMin=2),t.baseRadiusMax??(t.baseRadiusMax=5),Il(n,e,{material:t.material,ox:0,oy:t.baseY,oz:0,rx:t.main.rx,ry:t.main.ry,rz:t.main.rz,flatness:t.flatness,angularity:t.angularity,roughness:t.roughness,boxiness:t.boxiness,topFlatten:t.topFlatten,spreadY:t.spreadY,shellThreshold:t.shellThreshold},i);for(const s of t.satellites)Il(n,e,{material:t.material,ox:s.ox,oy:t.baseY+s.oy,oz:s.oz,rx:s.rx,ry:s.ry,rz:s.rz,flatness:t.flatness*s.flatness,angularity:t.angularity*s.angularity,roughness:t.roughness,boxiness:Dr(t.boxiness*s.boxiness,.6,.98),topFlatten:t.topFlatten,spreadY:t.spreadY,shellThreshold:t.shellThreshold-.02},i);return GM(n,e,t,i),n}function XM(e,t=2.2,n=3.1,i=1,s=1.8){return{...e,main:{rx:Math.round(e.main.rx*t),ry:Math.round(e.main.ry*n),rz:Math.round(e.main.rz*t)},satellites:e.satellites.map(a=>({...a,ox:Math.round(a.ox*i),oy:Math.round(a.oy*s),oz:Math.round(a.oz*i),rx:Math.round(a.rx*(t*1.12)),ry:Math.round(a.ry*(n*1.08)),rz:Math.round(a.rz*(t*1.12))})),groundRadiusX:Math.round(e.groundRadiusX*(t*.92)),groundRadiusZ:Math.round(e.groundRadiusZ*(t*.92)),baseGrowthHeight:Math.round((e.baseGrowthHeight??6)*2.2),baseRadiusMin:Math.round((e.baseRadiusMin??3)*2),baseRadiusMax:Math.round((e.baseRadiusMax??9)*2.2),shellThreshold:Math.min(.9,e.shellThreshold+.12)}}const fs={woodland:{decoration:"woodland",baseY:0,main:{rx:48,ry:39,rz:36},satellites:[{ox:-36,oy:0,oz:15,rx:24,ry:21,rz:21,flatness:.9,angularity:.92,boxiness:.92},{ox:36,oy:-3,oz:18,rx:21,ry:18,rz:18,flatness:.88,angularity:.9,boxiness:.9}],flatness:.86,angularity:.84,roughness:.3,boxiness:.88,topFlatten:.34,spreadY:.46,shellThreshold:.68,material:{base:[.54,.55,.56],light:[.7,.72,.72],dark:[.24,.25,.27],stain:{color:[.34,.48,.26],prob:.18},colorVar:.03,strataAmp:.05,strataFreq:.3},groundPalette:[[.26,.42,.18],[.34,.5,.22],[.4,.32,.2]],groundRadiusX:84,groundRadiusZ:66},forest:null,jungle:{decoration:"jungle",baseY:0,main:{rx:48,ry:42,rz:39},satellites:[{ox:-39,oy:-3,oz:12,rx:27,ry:21,rz:21,flatness:.86,angularity:.88,boxiness:.9},{ox:39,oy:-6,oz:24,rx:21,ry:18,rz:18,flatness:.86,angularity:.9,boxiness:.88}],flatness:.84,angularity:.78,roughness:.34,boxiness:.82,topFlatten:.26,spreadY:.5,shellThreshold:.66,material:{base:[.46,.46,.44],light:[.62,.62,.58],dark:[.2,.22,.2],stain:{color:[.28,.46,.2],prob:.25},colorVar:.03,strataAmp:.04,strataFreq:.24},groundPalette:[[.18,.34,.12],[.24,.42,.16],[.34,.26,.16]],groundRadiusX:84,groundRadiusZ:72},desert:{decoration:"desert",baseY:0,main:{rx:51,ry:39,rz:39},satellites:[{ox:-42,oy:-3,oz:21,rx:24,ry:18,rz:21,flatness:.96,angularity:.94,boxiness:.96},{ox:42,oy:-6,oz:24,rx:18,ry:15,rz:18,flatness:.95,angularity:.92,boxiness:.94}],flatness:.98,angularity:.96,roughness:.22,boxiness:.94,topFlatten:.4,spreadY:.42,shellThreshold:.7,material:{base:[.74,.56,.38],light:[.84,.72,.5],dark:[.46,.3,.2],colorVar:.03,strataAmp:.12,strataFreq:.36},groundPalette:[[.78,.66,.42],[.68,.52,.34],[.58,.42,.28]],groundRadiusX:90,groundRadiusZ:72},beach:{decoration:"beach",baseY:0,main:{rx:45,ry:36,rz:36},satellites:[{ox:-39,oy:-3,oz:18,rx:24,ry:18,rz:18,flatness:.88,angularity:.8,boxiness:.84},{ox:33,oy:-6,oz:21,rx:18,ry:15,rz:15,flatness:.86,angularity:.78,boxiness:.82}],flatness:.86,angularity:.78,roughness:.24,boxiness:.82,topFlatten:.28,spreadY:.44,shellThreshold:.66,material:{base:[.72,.7,.64],light:[.86,.84,.76],dark:[.44,.42,.38],stain:{color:[.58,.66,.54],prob:.1},colorVar:.03,strataAmp:.05,strataFreq:.28},groundPalette:[[.84,.78,.6],[.9,.84,.68],[.74,.72,.62]],groundRadiusX:90,groundRadiusZ:72},mountain:{decoration:"mountain",baseY:0,main:{rx:54,ry:45,rz:42},satellites:[{ox:-42,oy:-6,oz:18,rx:27,ry:24,rz:21,flatness:.9,angularity:.96,boxiness:.92},{ox:39,oy:-9,oz:24,rx:24,ry:21,rz:18,flatness:.88,angularity:.94,boxiness:.9}],flatness:.9,angularity:.94,roughness:.3,boxiness:.92,topFlatten:.32,spreadY:.44,shellThreshold:.68,material:{base:[.5,.52,.56],light:[.72,.74,.78],dark:[.22,.24,.28],sparkle:{color:[.78,.8,.82],prob:.05},colorVar:.028,strataAmp:.06,strataFreq:.3},groundPalette:[[.28,.34,.18],[.4,.4,.34],[.22,.26,.18]],groundRadiusX:90,groundRadiusZ:72},swampland:{decoration:"swampland",baseY:0,main:{rx:45,ry:36,rz:39},satellites:[{ox:-36,oy:-3,oz:18,rx:21,ry:18,rz:18,flatness:.84,angularity:.8,boxiness:.82},{ox:36,oy:-6,oz:24,rx:18,ry:15,rz:15,flatness:.82,angularity:.8,boxiness:.8}],flatness:.84,angularity:.8,roughness:.32,boxiness:.82,topFlatten:.24,spreadY:.48,shellThreshold:.66,material:{base:[.34,.36,.34],light:[.5,.52,.48],dark:[.16,.18,.18],stain:{color:[.24,.42,.2],prob:.24},colorVar:.03,strataAmp:.04,strataFreq:.24},groundPalette:[[.18,.26,.16],[.22,.3,.18],[.26,.22,.16]],groundRadiusX:84,groundRadiusZ:72},moon:{decoration:"moon",baseY:0,main:{rx:48,ry:39,rz:36},satellites:[{ox:-36,oy:-3,oz:18,rx:21,ry:18,rz:18,flatness:.9,angularity:.9,boxiness:.9},{ox:36,oy:-6,oz:24,rx:18,ry:15,rz:15,flatness:.9,angularity:.88,boxiness:.88}],flatness:.9,angularity:.9,roughness:.22,boxiness:.9,topFlatten:.28,spreadY:.42,shellThreshold:.7,material:{base:[.48,.48,.46],light:[.62,.62,.6],dark:[.24,.24,.24],colorVar:.02,strataAmp:.02,strataFreq:.2},groundPalette:[[.42,.42,.4],[.5,.5,.48],[.34,.34,.32]],groundRadiusX:84,groundRadiusZ:66},martian:{decoration:"martian",baseY:0,main:{rx:48,ry:39,rz:39},satellites:[{ox:-39,oy:-3,oz:18,rx:24,ry:18,rz:18,flatness:.9,angularity:.9,boxiness:.88},{ox:36,oy:-6,oz:24,rx:21,ry:15,rz:15,flatness:.88,angularity:.88,boxiness:.86}],flatness:.88,angularity:.88,roughness:.24,boxiness:.88,topFlatten:.28,spreadY:.42,shellThreshold:.68,material:{base:[.58,.34,.24],light:[.74,.48,.32],dark:[.32,.18,.14],colorVar:.025,strataAmp:.03,strataFreq:.22},groundPalette:[[.62,.34,.22],[.54,.28,.18],[.44,.22,.16]],groundRadiusX:84,groundRadiusZ:66},valley:{decoration:"valley",baseY:0,main:{rx:45,ry:36,rz:36},satellites:[{ox:-36,oy:-3,oz:18,rx:24,ry:18,rz:18,flatness:.86,angularity:.82,boxiness:.86},{ox:36,oy:-6,oz:24,rx:18,ry:15,rz:15,flatness:.84,angularity:.8,boxiness:.84}],flatness:.86,angularity:.82,roughness:.28,boxiness:.84,topFlatten:.28,spreadY:.46,shellThreshold:.66,material:{base:[.56,.56,.54],light:[.74,.74,.7],dark:[.26,.28,.3],stain:{color:[.34,.5,.24],prob:.16},colorVar:.03,strataAmp:.05,strataFreq:.28},groundPalette:[[.3,.48,.2],[.42,.56,.24],[.38,.3,.18]],groundRadiusX:84,groundRadiusZ:66},tundra:{decoration:"tundra",baseY:0,main:{rx:48,ry:39,rz:39},satellites:[{ox:-39,oy:-3,oz:21,rx:21,ry:18,rz:18,flatness:.9,angularity:.88,boxiness:.9},{ox:36,oy:-6,oz:24,rx:18,ry:15,rz:15,flatness:.88,angularity:.86,boxiness:.88}],flatness:.92,angularity:.88,roughness:.22,boxiness:.9,topFlatten:.34,spreadY:.44,shellThreshold:.68,material:{base:[.56,.58,.6],light:[.76,.8,.82],dark:[.22,.24,.28],colorVar:.025,strataAmp:.05,strataFreq:.28},groundPalette:[[.74,.76,.78],[.54,.56,.58],[.44,.46,.48]],groundRadiusX:84,groundRadiusZ:66},volcanic_terrain:{decoration:"volcanic",baseY:0,main:{rx:48,ry:42,rz:36},satellites:[{ox:-36,oy:-6,oz:18,rx:21,ry:18,rz:18,flatness:.82,angularity:.98,boxiness:.88},{ox:36,oy:-9,oz:24,rx:18,ry:15,rz:15,flatness:.8,angularity:1,boxiness:.86}],flatness:.82,angularity:1,roughness:.36,boxiness:.86,topFlatten:.22,spreadY:.46,shellThreshold:.64,material:{base:[.18,.18,.18],light:[.36,.36,.36],dark:[.06,.06,.06],sparkle:{color:[.84,.32,.08],prob:.04},colorVar:.03,strataAmp:.03,strataFreq:.22},groundPalette:[[.18,.18,.18],[.28,.2,.16],[.34,.14,.08]],groundRadiusX:84,groundRadiusZ:66},zen_garden:{decoration:"zen",baseY:0,main:{rx:45,ry:36,rz:36},satellites:[{ox:-33,oy:-3,oz:18,rx:21,ry:15,rz:18,flatness:.94,angularity:.68,boxiness:.88},{ox:36,oy:-6,oz:24,rx:15,ry:12,rz:15,flatness:.92,angularity:.66,boxiness:.86}],flatness:.94,angularity:.68,roughness:.16,boxiness:.86,topFlatten:.34,spreadY:.42,shellThreshold:.7,material:{base:[.46,.44,.4],light:[.68,.66,.6],dark:[.22,.2,.18],colorVar:.02,strataAmp:.04,strataFreq:.26},groundPalette:[[.86,.84,.78],[.78,.76,.7],[.7,.68,.64]],groundRadiusX:81,groundRadiusZ:63}};fs.forest={...fs.woodland,decoration:"forest"};const YM=2.2,qM=3.1,$M=1,ZM=1.8;for(const e of Object.keys(fs))fs[e]=XM(fs[e],YM,qM,$M,ZM);const Ih=["woodland","forest","jungle","desert","beach","mountain","swampland","moon","martian","valley","tundra","volcanic_terrain","zen_garden"],jM=Object.fromEntries(Ih.map(e=>[e,t=>WM(t,fs[e])]));function Uh(e,t=Date.now()){const n=jM[e];if(!n)throw new Error(`Unknown cliff type: ${e}`);return n(new xn(t))}const vt=0,We=2,Li=4;function Gt(e,t,n,i,s,a){e.set(`${Math.round(t)},${Math.round(n)},${Math.round(i)}`,{color:s,type:a})}function Ga(e,t,n,i,s,a,o,r,c=.03){const l=Math.max(1,s),h=Math.ceil(l);for(let u=-h;u<=h;u++)for(let f=-h;f<=h;f++)for(let d=-h;d<=h;d++)u*u+f*f+d*d<=l*l&&Gt(e,t+u,n+f,i+d,r.colorVariation(a,c),o)}function se(e,t,n,i,s,a,o,r,c,l,h=.02){for(let u=Math.min(t,s);u<=Math.max(t,s);u++)for(let f=Math.min(n,a);f<=Math.max(n,a);f++)for(let d=Math.min(i,o);d<=Math.max(i,o);d++)Gt(e,u,f,d,l.colorVariation(r,h),c)}function Mn(e,t,n,i,s,a,o,r){const c=Math.ceil(s);for(let l=-c;l<=c;l++)for(let h=-c;h<=c;h++)l*l+h*h<=s*s&&Gt(e,t+l,n,i+h,r.colorVariation(a,.02),o)}function Kr(e,t,n,i,s,a,o,r,c){for(let l=i;l<=s;l++)Mn(e,t,l,n,a,o,r,c)}function KM(e){const t=new Map,n=[.8,.15,.08],i=[.6,.1,.06],s=[.55,.53,.5],a=[.12,.1,.1],o=30,r=60,c=2.5;for(const _ of[-1,1]){const g=_*o;for(let m=0;m<4;m++){const p=5-m*.5;Mn(t,g,m,0,p,s,vt,e)}}for(const _ of[-1,1]){const g=_*o;Kr(t,g,0,4,r,c,n,vt,e);for(let m=0;m<8;m++){const p=(1-m/8)*1.5*_;Mn(t,g+p,m+4,0,c+(1-m/8)*.8,n,vt,e)}}const l=r-12,h=o+8;se(t,-h,l,-1,h,l+2,1,n,vt,e);for(const _ of[-1,1]){const g=_*o;se(t,g-3,l+2,-1,g+3,l+5,1,i,vt,e)}const u=r,f=o+14;se(t,-f,u,-2,f,u+3,2,n,vt,e);for(const _ of[-1,1])for(let g=0;g<6;g++){const m=_*(f+g),p=u+3+Math.floor(g*.7);se(t,m-1,p,-2,m+1,p+1,2,n,vt,e)}const d=l+3;return se(t,-6,d,-1,6,u-1,1,a,vt,e),t}function JM(e){const t=new Map,n=[.62,.6,.56],i=[.5,.48,.44],s=[.38,.48,.28],a=[.95,.7,.2];let o=0;for(let l=0;l<3;l++)Mn(t,0,o+l,0,8-l,n,vt,e);o+=3;const r=e.intRange(14,20);Kr(t,0,0,o,o+r,2.5,i,vt,e);for(let l=o;l<o+r;l++)if(e.chance(.15)){const h=e.range(0,Math.PI*2);Gt(t,Math.cos(h)*3,l,Math.sin(h)*3,e.colorVariation(s,.04),We)}o+=r;for(let l=0;l<2;l++)Mn(t,0,o+l,0,5-l*.5,n,vt,e);o+=2;const c=8;for(let l=0;l<c;l++)for(let h=-4;h<=4;h++)for(let u=-4;u<=4;u++){const f=Math.abs(h)>=3||Math.abs(u)>=3,d=l>=2&&l<=5&&(Math.abs(h)>=3&&Math.abs(u)<=1||Math.abs(u)>=3&&Math.abs(h)<=1);f&&!d&&Gt(t,h,o+l,u,e.colorVariation(n,.02),vt)}Ga(t,0,o+c/2,0,1.5,a,Li,e,.05),o+=c;for(let l=0;l<5;l++){const h=7-l*1.2;if(h<1)break;if(Mn(t,0,o+l,0,h,i,vt,e),e.chance(.4))for(let u=0;u<3;u++){const f=e.range(0,Math.PI*2);Gt(t,Math.cos(f)*h*.7,o+l+1,Math.sin(f)*h*.7,e.colorVariation(s,.04),We)}}return o+=5,Ga(t,0,o+2,0,2,n,vt,e,.02),t}function QM(e){const t=new Map,n=[.55,.38,.22],i=[.4,.28,.16],s=[.3,.3,.32],a=[.25,.22,.2],o=[.85,.7,.25],r=[.9,.88,.85],c=[.8,.75,.6],l=[.55,.53,.5],h=24,u=16;let f=0;for(let v=0;v<3;v++){const T=h+6-v*2,b=u+6-v*2;se(t,-T,f,-b,T,f+2,b,l,vt,e),f+=2}const d=[[-h+2,-u+2],[h-2,-u+2],[-h+2,u-2],[h-2,u-2],[0,-u+2],[0,u-2]],_=f+10;for(const[v,T]of d)se(t,v-1,f,T-1,v+1,_,T+1,i,vt,e);f=_,se(t,-h,f,-u,h,f+1,u,n,vt,e),f+=2;const g=18;se(t,-h,f,u-1,h,f+g,u,n,vt,e),se(t,-h,f,-u,-h+1,f+g,u,n,vt,e),se(t,h-1,f,-u,h,f+g,u,n,vt,e),se(t,-h,f,-u,-6,f+g,-u+1,n,vt,e),se(t,6,f,-u,h,f+g,-u+1,n,vt,e),se(t,-6,f+12,-u,6,f+g,-u+1,n,vt,e),se(t,-7,f,-u-1,-6,f+12,-u,o,Li,e,.02),se(t,6,f,-u-1,7,f+12,-u,o,Li,e,.02),se(t,-3,f,u-6,3,f+4,u-3,i,vt,e),Ga(t,0,f+6,u-5,2,o,Li,e,.03);const m=f+g,p=6,x=14;for(let v=0;v<x;v++){const T=v/x,b=(h+p)*(1-T*.85);if(b<2)break;const E=u+p-v*.5;se(t,-b,m+v,-E,b,m+v+1,E,s,vt,e),se(t,-b-1,m+v,-E-1,-b,m+v+1,E+1,a,vt,e),se(t,b,m+v,-E-1,b+1,m+v+1,E+1,a,vt,e)}se(t,-3,m+x,-u-2,3,m+x+2,u+2,a,vt,e);for(const v of[-1,1]){const T=v*(u+4);se(t,-1,m+x,T,1,m+x+8,T+2*v,n,vt,e)}const M=f+13;for(let v=-h-2;v<=h+2;v++){const T=Math.abs(v)*Math.abs(v)*.003;Gt(t,v,M-T,-u-2,e.colorVariation(c,.03),We),e.chance(.3)&&Gt(t,v,M-T-1,-u-2,e.colorVariation(c,.03),We)}for(let v=0;v<6;v++){const T=e.range(-h,h),b=M-Math.abs(T)*Math.abs(T)*.003;for(let E=0;E<e.intRange(4,8);E++)Gt(t,T+e.range(-.5,.5),b-E,-u-2,e.colorVariation(r,.02),We)}return t}function tx(e){const t=new Map,n=[.52,.36,.2],i=[.65,.22,.12],s=[.38,.26,.14],a=80,o=10,r=14;for(let c=-a;c<=a;c++){const l=c/a,h=Math.round(r*(1-l*l));for(let u=-o;u<=o;u++)Gt(t,u,h,c,e.colorVariation(n,.03),vt),Gt(t,u,h-1,c,e.colorVariation(s,.02),vt);if(Math.abs(c)%8<2)for(let u=0;u<h-1;u++)Gt(t,-o+1,u,c,e.colorVariation(s,.02),vt),Gt(t,o-1,u,c,e.colorVariation(s,.02),vt);for(const u of[-1,1]){const f=u*(o+1);if(Math.abs(c)%6<1)for(let d=1;d<=8;d++)Gt(t,f,h+d,c,e.colorVariation(i,.03),vt);Gt(t,f,h+8,c,e.colorVariation(i,.02),vt),Gt(t,f,h+4,c,e.colorVariation(i,.02),vt)}}return t}function ex(e){const t=new Map,n=[.65,.6,.35],i=[.5,.48,.28],s=[.45,.38,.25],a=60,o=20;for(let r=-a;r<=a;r+=3){const c=o+e.intRange(-2,3),l=e.chance(.5)?n:i;for(let h=0;h<c;h++)Gt(t,r,h,0,e.colorVariation(l,.03),vt),h%6===0&&h>0&&(Gt(t,r-1,h,0,e.colorVariation(l,.02),vt),Gt(t,r+1,h,0,e.colorVariation(l,.02),vt));Gt(t,r,c,0,e.colorVariation(l,.03),vt)}for(const r of[5,10,15])for(let c=-a;c<=a;c++)Gt(t,c,r,1,e.colorVariation(i,.03),vt);for(let r=-a;r<=a;r+=3)for(const c of[5,10,15])for(let l=-1;l<=1;l++)Gt(t,r,c+l,-1,e.colorVariation(s,.04),We),Gt(t,r,c+l,1,e.colorVariation(s,.04),We);return t}function nx(e){const t=new Map,n=[.5,.35,.2],i=[.28,.28,.3],s=[.22,.2,.18],a=[.85,.7,.25],o=[.55,.53,.5],r=[.88,.85,.82];let c=0;for(let h=0;h<3;h++)se(t,-20+h*2,c,-20+h*2,20-h*2,c+2,20-h*2,o,vt,e),c+=2;const l=e.intRange(3,5);for(let h=0;h<l;h++){const u=1-h*.18,f=Math.round(16*u),d=Math.round(16*u),_=Math.round(14*u),g=Math.round(6*u);if(se(t,-f,c,-d,f,c+_,-d+1,r,vt,e),se(t,-f,c,d-1,f,c+_,d,r,vt,e),se(t,-f,c,-d,-f+1,c+_,d,r,vt,e),se(t,f-1,c,-d,f,c+_,d,r,vt,e),h<l-1)for(const p of[-1,1])se(t,p*(f*.4)-2,c+3,-d-1,p*(f*.4)+2,c+_-2,-d,[.1,.08,.08],vt,e,.01),se(t,p*(f*.4)-2,c+3,d,p*(f*.4)+2,c+_-2,d+1,[.1,.08,.08],vt,e,.01);for(const[p,x]of[[-f,-d],[f,-d],[-f,d],[f,d]])se(t,p-1,c,x-1,p+1,c+_,x+1,n,vt,e);c+=_;const m=Math.round(5*u);for(let p=0;p<m;p++){const x=p/m,M=(f+g)*(1-x*.7),v=(d+g)*(1-x*.7);se(t,-M,c+p,-v,M,c+p+1,v,i,vt,e),p===0&&se(t,-M-1,c+p+1,-v-1,M+1,c+p+2,v+1,s,vt,e)}c+=m}Kr(t,0,0,c,c+8,1.5,a,Li,e),Ga(t,0,c+10,0,2.5,a,Li,e,.02);for(let h=0;h<4;h++)Mn(t,0,c+2+h*2,0,3-h*.3,a,Li,e);return t}function ix(e){const t=new Map,n=[.76,.42,.24],i=[.62,.34,.18],s=[.8,.48,.28],a=[.22,.16,.1],o=[.3,.52,.22],r=[.4,.58,.28],c=e.intRange(16,22),l=e.range(8,11),h=l*e.range(.55,.65),u=2;for(let _=0;_<c;_++){const g=_/c,m=h+(l-h)*g,p=Math.ceil(m);for(let x=-p;x<=p;x++)for(let M=-p;M<=p;M++){const v=Math.sqrt(x*x+M*M);if(v<=m&&v>m-1.8){const T=_<2?i:n;Gt(t,x,_,M,e.colorVariation(T,.03),vt)}}}for(let _=c;_<c+u;_++){const g=l+1.5,m=Math.ceil(g);for(let p=-m;p<=m;p++)for(let x=-m;x<=m;x++){const M=Math.sqrt(p*p+x*x);M<=g&&M>g-2.2&&Gt(t,p,_,x,e.colorVariation(s,.03),vt)}}Mn(t,0,0,0,h-.5,i,vt,e);const f=c-2;for(let _=f;_<=c;_++)Mn(t,0,_,0,l-2,a,vt,e);const d=e.intRange(10,18);for(let _=0;_<d;_++){const g=c+_;if(_<d*.6&&Gt(t,0,g,0,e.colorVariation([.25,.4,.18],.04),vt),_>2){const m=2+_*.5,p=e.intRange(3,6);for(let x=0;x<p;x++){const M=x/p*Math.PI*2+e.range(-.3,.3),v=e.range(1,m),T=e.chance(.5)?o:r;Gt(t,Math.cos(M)*v,g+e.range(-1,1),Math.sin(M)*v,e.colorVariation(T,.06),We)}}}return t}function sx(e){const t=new Map,n=[.48,.44,.38],i=[.36,.33,.28],s=[.32,.45,.22],a=[.2,.15,.1],o=[.28,.48,.2],r=e.intRange(12,18),c=e.range(7,10),l=e.range(.85,1.15),h=2-l;for(let m=0;m<r;m++){const p=m/r,x=1+.25*Math.sin(p*Math.PI),M=c*x,v=Math.ceil(M*1.2);for(let T=-v;T<=v;T++)for(let b=-v;b<=v;b++){const E=T/(M*l),w=b/(M*h),S=Math.sqrt(E*E+w*w),y=e.range(-.08,.08);if(S<=1+y&&S>.78+y){let A;e.chance(.15)&&m<r*.7?A=s:m<3?A=i:A=n,Gt(t,T,m,b,e.colorVariation(A,.05),vt)}}}const u=c*l*.8,f=c*h*.8,d=Math.ceil(Math.max(u,f));for(let m=-d;m<=d;m++)for(let p=-d;p<=d;p++)m*m/(u*u)+p*p/(f*f)<=1&&Gt(t,m,0,p,e.colorVariation(i,.04),vt);const _=c*.65;for(let m=r-3;m<=r;m++){const p=Math.ceil(_);for(let x=-p;x<=p;x++)for(let M=-p;M<=p;M++)if(x*x+M*M<=_*_){const v=m===r&&e.chance(.3)?s:a;Gt(t,x,m,M,e.colorVariation(v,.04),vt)}}const g=e.intRange(2,5);for(let m=0;m<g;m++){const p=e.range(0,Math.PI*2),x=e.range(0,_*.5);let M=Math.cos(p)*x,v=Math.sin(p)*x;const T=e.intRange(6,14),b=e.range(0,Math.PI*2),E=e.range(.05,.15);for(let w=0;w<T;w++){M+=Math.cos(b)*E,v+=Math.sin(b)*E;const S=r+w;if(Gt(t,M,S,v,e.colorVariation([.25,.42,.18],.05),vt),w>T*.4&&e.chance(.5)){const y=e.range(0,Math.PI*2);Gt(t,M+Math.cos(y)*2,S,v+Math.sin(y)*2,e.colorVariation(o,.06),We),Gt(t,M+Math.cos(y)*3,S+e.range(-1,1),v+Math.sin(y)*3,e.colorVariation(o,.06),We)}}}return t}function ax(e){const t=new Map,n=[.82,.8,.78],i=[.72,.7,.68],s=[.75,.73,.71],a=[.22,.16,.1],o=[.28,.5,.22],r=[.22,.4,.16],c=e.chance(.5),l=e.intRange(14,20),h=2;if(c){const u=e.intRange(7,10),f=e.intRange(7,10);for(let x=0;x<l;x++)for(let M=-u;M<=u;M++)for(let v=-f;v<=f;v++)if(Math.abs(M)>u-h||Math.abs(v)>f-h){const b=Math.abs(M)===u||Math.abs(v)===f?s:n;Gt(t,M,x,v,e.colorVariation(b,.015),vt)}for(let x=-u;x<=u;x++)for(let M=-f;M<=f;M++)Gt(t,x,0,M,e.colorVariation(i,.015),vt);for(let x=l-3;x<=l-1;x++)for(let M=-u+h;M<=u-h;M++)for(let v=-f+h;v<=f-h;v++)Gt(t,M,x,v,e.colorVariation(a,.03),vt);const d=e.intRange(12,22);let _=0,g=0;const m=e.range(-.03,.03),p=e.range(0,Math.PI*2);for(let x=0;x<d;x++)if(_+=Math.cos(p)*m,g+=Math.sin(p)*m,Gt(t,_,l+x,g,e.colorVariation([.24,.38,.16],.04),vt),x>3&&x%3===0){const M=e.range(0,Math.PI*2);for(let v=-1;v<=1;v+=2){const T=M+v*1.2;for(let b=1;b<=3;b++){const E=l+x+(b<2?0:-1);Gt(t,_+Math.cos(T)*b,E,g+Math.sin(T)*b,e.colorVariation(b<2?r:o,.05),We)}}}for(let x=0;x<e.intRange(6,10);x++){const M=e.range(0,Math.PI*2),v=e.range(1,4);Gt(t,_+Math.cos(M)*v,l+d+e.range(-2,1),g+Math.sin(M)*v,e.colorVariation(o,.06),We)}}else{const u=e.range(7,10),f=u-h;for(let x=0;x<l;x++){const M=Math.ceil(u);for(let v=-M;v<=M;v++)for(let T=-M;T<=M;T++){const b=Math.sqrt(v*v+T*T);if(b<=u&&b>f){const E=b>u-.8?s:n;Gt(t,v,x,T,e.colorVariation(E,.015),vt)}}}Mn(t,0,0,0,u,i,vt,e);for(let x=l-3;x<=l-1;x++)Mn(t,0,x,0,f-.5,a,vt,e);const d=e.intRange(12,22);let _=0,g=0;const m=e.range(-.03,.03),p=e.range(0,Math.PI*2);for(let x=0;x<d;x++)if(_+=Math.cos(p)*m,g+=Math.sin(p)*m,Gt(t,_,l+x,g,e.colorVariation([.24,.38,.16],.04),vt),x>3&&x%3===0){const M=e.range(0,Math.PI*2);for(let v=-1;v<=1;v+=2){const T=M+v*1.2;for(let b=1;b<=3;b++)Gt(t,_+Math.cos(T)*b,l+x+(b<2?0:-1),g+Math.sin(T)*b,e.colorVariation(b<2?r:o,.05),We)}}for(let x=0;x<e.intRange(6,10);x++){const M=e.range(0,Math.PI*2),v=e.range(1,4);Gt(t,_+Math.cos(M)*v,l+d+e.range(-2,1),g+Math.sin(M)*v,e.colorVariation(o,.06),We)}}return t}const ox=["torii_gate","stone_lantern","shrine","zen_bridge","bamboo_fence","pagoda","pot_terracotta","pot_wabisabi","pot_modern"],rx={torii_gate:KM,stone_lantern:JM,shrine:QM,zen_bridge:tx,bamboo_fence:ex,pagoda:nx,pot_terracotta:ix,pot_wabisabi:sx,pot_modern:ax};function Nh(e,t=Date.now()){const n=rx[e];if(!n)throw new Error(`Unknown prop type: ${e}`);return n(new xn(t))}const Ft=0,cx=2;function di(e,t,n,i,s,a){e.set(`${Math.round(t)},${Math.round(n)},${Math.round(i)}`,{color:s,type:a})}function Wt(e,t,n,i,s,a,o,r,c,l,h=.015){for(let u=Math.min(t,s);u<=Math.max(t,s);u++)for(let f=Math.min(n,a);f<=Math.max(n,a);f++)for(let d=Math.min(i,o);d<=Math.max(i,o);d++)di(e,u,f,d,l.colorVariation(r,h),c)}const Ye=[.65,.63,.6],re=[.52,.5,.48],Fh=[.72,.7,.67],lx=[.58,.56,.54];function Ka(e,t,n,i,s,a,o,r){const c=t.intRange(5,8);for(let l=s+c;l<a;l+=c)for(let h=n;h<=i;h++)t.chance(.7)&&di(e,h,l,o,t.colorVariation(lx,.02),Ft)}function Oh(e,t,n,i,s,a,o,r){const c=t.intRange(8,12),l=t.intRange(8,12);for(let h=s+4;h<a-2;h+=l)for(let u=n+4;u<i-2;u+=c)di(e,u,h,o,t.colorVariation(re,.03),Ft)}function hx(e){const t=new Map,n=40,i=30,s=3,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(s/2),c=Math.floor(s/2);return Wt(t,a,0,r,o,i-1,c,Ye,Ft,e),Ka(t,e,a,o,0,i,c),Oh(t,e,a,o,0,i,c),t}function ux(e){const t=new Map,n=40,i=30,s=3,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(s/2),c=Math.floor(s/2),l=12,h=24,u=-Math.floor(l/2),f=Math.floor(l/2);for(let d=a;d<=o;d++)for(let _=0;_<i;_++)for(let g=r;g<=c;g++)d>=u&&d<=f&&_<h||di(t,d,_,g,e.colorVariation(Ye,.015),Ft);return Wt(t,u-1,h,r,f+1,h+1,c,re,Ft,e),Wt(t,u,0,r,f,0,c,re,Ft,e),Ka(t,e,a,o,0,i,c),t}function fx(e){const t=new Map,n=40,i=30,s=3,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(s/2),c=Math.floor(s/2),l=10,h=10,u=14,f=-Math.floor(l/2),d=Math.floor(l/2);for(let _=a;_<=o;_++)for(let g=0;g<i;g++)for(let m=r;m<=c;m++)_>=f&&_<=d&&g>=u&&g<u+h||di(t,_,g,m,e.colorVariation(Ye,.015),Ft);return Wt(t,f-1,u-1,c,d+1,u-1,c+1,re,Ft,e),Wt(t,f-1,u+h,r,d+1,u+h,c,re,Ft,e),Ka(t,e,a,o,0,i,c),t}function dx(e){const t=new Map,n=40,i=30,s=3,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(s/2),c=Math.floor(s/2),l=e.intRange(3,5),h=2,u=e.intRange(16,22),f=e.intRange(4,8),d=Math.floor(n/(l+1)),_=[];for(let g=1;g<=l;g++)_.push(a+g*d);for(let g=a;g<=o;g++)for(let m=0;m<i;m++)for(let p=r;p<=c;p++){let x=!1;for(const M of _)if(g>=M&&g<M+h&&m>=f&&m<f+u){x=!0;break}x||di(t,g,m,p,e.colorVariation(Ye,.015),Ft)}return Ka(t,e,a,o,0,i,c),Oh(t,e,a,o,0,i,c),t}function px(e){const t=new Map,n=40,i=40,s=2,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(i/2),c=Math.floor(i/2);return Wt(t,a,0,r,o,s-1,c,Ye,Ft,e),Wt(t,a,0,r,o,s-1,r,re,Ft,e),Wt(t,a,0,c,o,s-1,c,re,Ft,e),Wt(t,a,0,r,a,s-1,c,re,Ft,e),Wt(t,o,0,r,o,s-1,c,re,Ft,e),t}function mx(e){const t=new Map,n=42,i=42,s=2,a=4,o=-Math.floor(n/2),r=Math.floor(n/2),c=-Math.floor(i/2),l=Math.floor(i/2);return Wt(t,o,0,c,r,s-1,l,Ye,Ft,e),Wt(t,o,s,c,r,s+a,c+1,re,Ft,e),Wt(t,o,s,l-1,r,s+a,l,re,Ft,e),Wt(t,o,s,c,o+1,s+a,l,re,Ft,e),Wt(t,r-1,s,c,r,s+a,l,re,Ft,e),t}function _x(e){const t=new Map,n=14,i=30,s=30,a=-Math.floor(n/2),o=Math.floor(n/2),r=15,c=i/r,l=s/r;for(let h=0;h<r;h++){const u=Math.round(h*c),f=Math.round(h*l),d=Math.round(c),_=Math.round(l);Wt(t,a,0,f,o,u+d-1,f+_-1,Ye,Ft,e)}for(let h=0;h<r;h++){const u=Math.round(h*c),f=Math.round(h*l),d=Math.round(c),_=Math.round(l);Wt(t,a-1,0,f,a-1,u+d+2,f+_-1,re,Ft,e),Wt(t,o+1,0,f,o+1,u+d+2,f+_-1,re,Ft,e)}return t}function gx(e){const t=new Map,n=4,i=30,s=Math.floor(n/2);return Wt(t,-s,0,-s,s,i-1,s,Ye,Ft,e),Wt(t,-s-1,i-2,-s-1,s+1,i-1,s+1,re,Ft,e),Wt(t,-s-1,0,-s-1,s+1,1,s+1,re,Ft,e),t}function Mx(e){const t=new Map,n=40,i=3,s=4,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(i/2),c=Math.floor(i/2);return Wt(t,a,0,r,o,s-1,c,re,Ft,e),t}function xx(e){const t=new Map,n=20,i=10,s=8,a=2,o=-Math.floor(n/2),r=Math.floor(n/2),c=-Math.floor(i/2),l=Math.floor(i/2);Wt(t,o,0,c,r,s-1,l,Ye,Ft,e);const h=[.25,.18,.12];Wt(t,o+a,a,c+a,r-a,s-2,l-a,h,Ft,e);const u=[.3,.5,.22],f=[.38,.58,.26];for(let d=0;d<e.intRange(4,8);d++){const _=e.range(o+a+1,r-a-1),g=e.range(c+a+1,l-a-1),m=e.range(1.5,3);for(let p=0;p<e.intRange(2,4);p++){const x=m*(1-p*.25);if(x<.5)break;const M=Math.ceil(x);for(let v=-M;v<=M;v++)for(let T=-M;T<=M;T++)v*v+T*T<=x*x&&di(t,_+v,s-1+p,g+T,e.colorVariation(e.chance(.5)?u:f,.04),cx)}}return t}function vx(e){const t=new Map,n=18,i=6,s=6,a=5,o=-Math.floor(n/2),r=Math.floor(n/2),c=-Math.floor(i/2),l=Math.floor(i/2);return Wt(t,o,0,c,o+3,a-1,l,re,Ft,e),Wt(t,r-3,0,c,r,a-1,l,re,Ft,e),Wt(t,o,a,c,r,s,l,Fh,Ft,e),t}function yx(e){const t=new Map,n=40,i=8,s=2,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(s/2),c=Math.floor(s/2);return Wt(t,a,0,r,o,i-1,c,Ye,Ft,e),Wt(t,a,i-1,r-1,o,i,c+1,re,Ft,e),t}function Sx(e){const t=new Map,n=40,i=20,s=2,a=-Math.floor(n/2),o=Math.floor(n/2),r=0,c=i;return Wt(t,a,0,r,o,s-1,c,Ye,Ft,e),Wt(t,a,0,c,o,0,c,re,Ft,e),t}function bx(e){const t=new Map,n=40,i=40,s=24,a=2,o=-Math.floor(n/2),r=Math.floor(n/2),c=-Math.floor(i/2),l=Math.floor(i/2),h=[[o+2,c+2],[r-2,c+2],[o+2,l-2],[r-2,l-2],[0,c+2],[0,l-2]];for(const[u,f]of h)Wt(t,u-1,0,f-1,u+1,s-1,f+1,re,Ft,e);return Wt(t,o,s,c,r,s+a-1,l,Ye,Ft,e),t}function Ex(e){const t=new Map,n=40,i=30,s=2,a=-Math.floor(n/2),o=Math.floor(n/2),r=-Math.floor(s/2),c=Math.floor(s/2),l=e.intRange(4,6);for(let h=a;h<=o;h++)for(let u=0;u<i;u++)for(let f=r;f<=c;f++){const d=Math.floor((h-a)/l),_=Math.floor(u/l);(d+_)%2===0&&di(t,h,u,f,e.colorVariation(Ye,.015),Ft)}return Wt(t,a,0,r,o,1,c,re,Ft,e),Wt(t,a,i-2,r,o,i-1,c,re,Ft,e),Wt(t,a,0,r,a+1,i-1,c,re,Ft,e),Wt(t,o-1,0,r,o,i-1,c,re,Ft,e),t}function Tx(e){const t=new Map,n=20,i=10,s=2,a=8,o=-Math.floor(n/2),r=Math.floor(n/2);return Wt(t,o,0,0,r,s-1,i,Ye,Ft,e),Wt(t,o,s,i-1,r,s+a,i,re,Ft,e),Wt(t,o,s,0,o+1,s+a,i,re,Ft,e),Wt(t,r-1,s,0,r,s+a,i,re,Ft,e),Wt(t,o,s+a,0,r,s+a+1,i,Fh,Ft,e),t}const wx=["brutalist_wall","brutalist_wall_door","brutalist_wall_window","brutalist_wall_slots","brutalist_floor","brutalist_roof","brutalist_stairs","brutalist_column","brutalist_beam","brutalist_planter","brutalist_bench","brutalist_railing","brutalist_canopy","brutalist_pilotis","brutalist_screen","brutalist_balcony"],Rx={brutalist_wall:e=>hx(e),brutalist_wall_door:e=>ux(e),brutalist_wall_window:e=>fx(e),brutalist_wall_slots:e=>dx(e),brutalist_floor:e=>px(e),brutalist_roof:e=>mx(e),brutalist_stairs:e=>_x(e),brutalist_column:e=>gx(e),brutalist_beam:e=>Mx(e),brutalist_planter:e=>xx(e),brutalist_bench:e=>vx(e),brutalist_railing:e=>yx(e),brutalist_canopy:e=>Sx(e),brutalist_pilotis:e=>bx(e),brutalist_screen:e=>Ex(e),brutalist_balcony:e=>Tx(e)};function zh(e,t){const n=new xn(t),i=Rx[e];if(!i)throw new Error(`Unknown architecture type: ${e}`);return i(n)}const Ul={Trees:vh,Plants:Pg,Flowers:kg,Wildgrass:Zg,Boulders:gM,Terrain:LM,Cliffs:Ih,Props:ox,Architecture:wx},Bo=["Calm","Breeze","Gentle","Moderate","Gusty","Strong","Storm"];function Ax(e,t){const n={category:"Trees",type:vh[0],windIntensity:.25},i=document.createElement("div");i.className="panel",i.innerHTML=`
    <div class="panel-title">Voxel Plants</div>

    <div class="control-group">
      <label class="control-label">Category</label>
      <select id="sel-category" class="control-select">
        ${Object.keys(Ul).map(d=>`<option value="${d}">${d}</option>`).join("")}
      </select>
    </div>

    <div class="control-group">
      <label class="control-label">Type</label>
      <select id="sel-type" class="control-select"></select>
    </div>

    <div class="control-group">
      <label class="control-label">Wind</label>
      <div class="slider-row">
        <input type="range" id="slider-wind" min="0" max="1" step="0.01" value="${n.windIntensity}" />
        <span id="wind-label" class="slider-value">Breeze</span>
      </div>
    </div>

    <button id="btn-generate" class="btn-generate">Regenerate</button>
  `,e.appendChild(i);const s=document.createElement("div");s.className="lod-badge",s.id="lod-badge",s.textContent="LOD: HIGH",document.body.appendChild(s);const a=i.querySelector("#sel-category"),o=i.querySelector("#sel-type"),r=i.querySelector("#slider-wind"),c=i.querySelector("#wind-label"),l=i.querySelector("#btn-generate");function h(){const d=Ul[n.category];o.innerHTML=d.map(_=>{const g=_.charAt(0).toUpperCase()+_.slice(1);return`<option value="${_}">${g}</option>`}).join(""),n.type=d[0]}function u(d="generate"){t({...n,reason:d})}function f(d){const _=Math.min(Bo.length-1,Math.floor(d*Bo.length));c.textContent=Bo[_]}return a.addEventListener("change",()=>{n.category=a.value,h(),u()}),o.addEventListener("change",()=>{n.type=o.value,u()}),r.addEventListener("input",()=>{n.windIntensity=parseFloat(r.value),f(n.windIntensity),u("wind")}),l.addEventListener("click",()=>{u()}),h(),f(n.windIntensity),{getState:()=>({...n}),setLODLabel:d=>{s.textContent=`LOD: ${d}`},show(){i.style.display=""},hide(){i.style.display="none"}}}async function Cx(e){throw new Error("Please set your OpenRouter API key in .env (VITE_OPENROUTER_API_KEY)")}function Px(e,t,n){const i=document.createElement("div");i.className="creator-panel",i.innerHTML=`
    <div class="creator-header">
      <div class="panel-title">Scene Creator</div>
      <button id="btn-back" class="creator-back" title="Back to Element View">&larr;</button>
    </div>
    <div class="creator-prompt-wrap">
      <textarea id="creator-prompt" class="creator-prompt" rows="3"
        placeholder="Describe a scene... e.g. &quot;A serene beach with palm trees&quot;"></textarea>
    </div>
    <button id="btn-create" class="btn-create">Generate Scene</button>
    <div id="creator-status" class="creator-status"></div>
    <div id="creator-elements" class="creator-elements"></div>
  `,e.appendChild(i);const s=i.querySelector("#creator-prompt"),a=i.querySelector("#btn-create"),o=i.querySelector("#btn-back"),r=i.querySelector("#creator-status"),c=i.querySelector("#creator-elements");let l=!1;async function h(){if(l)return;const u=s.value.trim();if(u){l=!0,a.disabled=!0,a.textContent="Thinking...",r.textContent="",r.className="creator-status",c.innerHTML="";try{r.textContent="Asking Kimi to design your scene...";const f=await Cx(u);if(!f.length){r.textContent="No valid elements returned. Try rephrasing.",r.className="creator-status error";return}r.textContent=`Composing ${f.length} elements...`,c.innerHTML=f.map((d,_)=>`<div class="creator-el">${d.category} &rsaquo; <strong>${d.type}</strong> <span class="creator-el-pos">(${d.x}, ${d.z})</span></div>`).join(""),t(f),r.textContent=`Scene ready — ${f.length} elements placed`,r.className="creator-status success"}catch(f){r.textContent=f.message,r.className="creator-status error",console.error("Scene generation error:",f)}finally{l=!1,a.disabled=!1,a.textContent="Generate Scene"}}}return a.addEventListener("click",h),s.addEventListener("keydown",u=>{u.key==="Enter"&&(u.metaKey||u.ctrlKey)&&h()}),o.addEventListener("click",n),{show(){i.style.display=""},hide(){i.style.display="none"},el:i}}const Lx={Trees:yh,Plants:Sh,Flowers:bh,Wildgrass:wh,Boulders:Ah,Terrain:Lh,Cliffs:Uh,Props:Nh,Architecture:zh};function Ja(e,t,n,i){switch(i%4){case 0:return[e,t,n];case 1:return[-n,t,e];case 2:return[-e,t,-n];case 3:return[n,t,-e];default:return[e,t,n]}}function Dx(e,t){let n=1/0;const i=new Map;for(const[s]of e){const[a,o,r]=s.split(",").map(Number);if(o<n&&(n=o,i.clear()),o===n){const[c,,l]=Ja(a,o,r,t);i.set(`${c},${l}`,{x:c,z:l})}}return{minY:Number.isFinite(n)?n:0,contacts:[...i.values()]}}function Ix(e,t){let n=1/0,i=-1/0,s=1/0,a=-1/0;for(const[o]of e){const[r,c,l]=o.split(",").map(Number),[h,,u]=Ja(r,c,l,t);n=Math.min(n,h),i=Math.max(i,h),s=Math.min(s,u),a=Math.max(a,u)}return{minX:Number.isFinite(n)?n:0,maxX:Number.isFinite(i)?i:0,minZ:Number.isFinite(s)?s:0,maxZ:Number.isFinite(a)?a:0}}function Ux(e,t,n,i,s,a,o){let r=1;for(const[c,l]of n){const[h,u,f]=c.split(",").map(Number),[d,_,g]=Ja(h,u,f,o),m=d+i,p=_+s,x=g+a,M=l.scale||1,v=p+M,T=`${m},${x}`;r=Math.max(r,M),l.type===3?(!t.has(T)||v>t.get(T))&&t.set(T,v):(!e.has(T)||v>e.get(T))&&e.set(T,v)}return r}function ks(e,t,n,i,s=2){if(e.size===0)return 0;const a=Math.round(t/i)*i,o=Math.round(n/i)*i;let r=e.get(`${a},${o}`);if(r!=null)return r;for(let c=1;c<=s;c++){for(let l=-c;l<=c;l++)for(let h=-c;h<=c;h++){const u=e.get(`${a+l*i},${o+h*i}`);u!=null&&(r==null||u>r)&&(r=u)}if(r!=null)return r}return 0}function Nx(e){const t=e.maxX-e.minX,i=e.maxZ-e.minZ>=t?"z":"x",s=i==="z"?e.minZ:e.minX,a=i==="z"?e.maxZ:e.maxX,o=i==="z"?e.minX:e.minZ,r=i==="z"?e.maxX:e.maxZ,c=Math.max(1,a-s),l=Math.max(1,r-o),h=Math.max(6,Math.round(c/20)),u=Math.max(4,Math.round(l/6)),f=[];for(let d=s;d<=a;d+=h){const _=c>0?(d-s)/c*2-1:0;for(let g=o;g<=r;g+=u)f.push(i==="z"?{x:g,z:d,t:_}:{x:d,z:g,t:_})}return f.push(i==="z"?{x:0,z:s,t:-1}:{x:s,z:0,t:-1}),f.push(i==="z"?{x:0,z:a,t:1}:{x:a,z:0,t:1}),{samples:f}}function Nl(e,t,n,i,s,a){let o=0,r=0,c=0,l=0,h=0,u=0;for(const d of i.samples){const _=s+d.x,g=a+d.z,m=ks(t,_,g,n,1),p=ks(e,_,g,n,2),x=Math.abs(d.t)>.78,M=Math.abs(d.t)<.45;m>0&&(r++,h+=d.t,u++,M&&o++,x&&c++),x&&p>0&&l++}if(o===0||r===0)return-1/0;const f=u>0?Math.abs(h/u)*12:0;return o*8+r*2+l*4-c*6-f}function Fx(e,t,n,i,s,a){let o={x:s,z:a,score:Nl(e,t,n,i,s,a)};const r=Math.max(3,n),c=n*14;for(let l=-c;l<=c;l+=r)for(let h=-c;h<=c;h+=r){const u=s+l,f=a+h,d=Nl(e,t,n,i,u,f);d>o.score&&(o={x:u,z:f,score:d})}return o}function Ox(e,t,n,i,s,a,o,r){let c=0,l=0;for(const f of i.samples){if(Math.abs(f.t)<.82)continue;const d=s+f.x,_=a+f.z;c=Math.max(c,ks(e,d,_,n,2)),l=Math.max(l,ks(t,d,_,n,1))}const h=Math.max(2,n);return Math.max(c,l+h)-o+r}function zx(e){const t=new Map,n=new Set,i=new Map,s=new Map;let a=1;const o=[],r=[];for(const l of e)l.category==="Terrain"?o.push(l):r.push(l);const c=[...o,...r];for(let l=0;l<c.length;l++){const h=c[l],u=Lx[h.category];if(!u)continue;let f=h.seed||Math.floor(Math.random()*1e5);for(f=f*31+l*7919,f=(f%99999+99999)%99999+1;n.has(f);)f++;n.add(f);let d;try{d=u(h.type,f)}catch(T){console.warn(`SceneComposer: failed to generate ${h.category}/${h.type}`,T);continue}const _=Math.round(h.x||0),g=Math.round(h.z||0),m=Math.round((h.rotation||0)/90)%4,p=Math.round(h.y||0);let x=_,M=p,v=g;if(h.category==="Terrain")a=Math.max(a,Ux(i,s,d,_,M,g,m));else if(i.size>0){const{minY:T,contacts:b}=Dx(d,m);if(h.category==="Props"&&h.type==="zen_bridge"&&s.size>0){const E=Nx(Ix(d,m)),w=Fx(i,s,a,E,_,g);x=w.x,v=w.z,M=Ox(i,s,a,E,x,v,T,p)}else{let E=0;for(const w of b)E=Math.max(E,ks(i,_+w.x,g+w.z,a));M=E-T+p}}for(const[T,b]of d){const[E,w,S]=T.split(",").map(Number),[y,A,I]=Ja(E,w,S,m),L=`${y+x},${A+M},${I+v}`;t.set(L,b)}}return t}const Bx=document.getElementById("viewport"),Le=new E_(Bx);let Vs=[],fn=Math.floor(Math.random()*1e5);const Jr=document.createElement("div");Jr.style.cssText="position:fixed;top:10px;right:10px;background:rgba(0,0,0,0.7);color:#0f0;font:bold 14px monospace;padding:8px 12px;border-radius:6px;z-index:9999;pointer-events:none;line-height:1.6;";document.body.appendChild(Jr);let qs=0,ko=0,Vo=performance.now(),Ta=0;function kx(){ko++;const e=performance.now();e-Vo>=500&&(Ta=Math.round(ko/((e-Vo)/1e3)),ko=0,Vo=e);const t=Ta>=55?"#0f0":Ta>=30?"#ff0":"#f44";Jr.innerHTML=`<span style="color:${t}">${Ta} FPS</span><br>${qs.toLocaleString()} voxels`}function Bh(){for(const e of Vs)Le.scene.remove(e),e.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(t.material.isShaderMaterial?(C_(t.material),I_(t.material)):Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose()),t.instanceMatrix&&(t.instanceMatrix=null),t.instanceColor&&(t.instanceColor=null)});Vs=[],qs=0}function Qr({category:e,type:t}){Bh();let n;e==="Trees"?n=yh(t,fn):e==="Plants"?n=Sh(t,fn):e==="Wildgrass"?n=wh(t,fn):e==="Boulders"?n=Ah(t,fn):e==="Terrain"?n=Lh(t,fn):e==="Cliffs"?n=Uh(t,fn):e==="Props"?n=Nh(t,fn):e==="Architecture"?n=zh(t,fn):n=bh(t,fn),qs=n.size;const{lod:i,maxHeight:s}=e==="Terrain"?V_(n):e==="Boulders"||e==="Cliffs"?Pr(n,{highGapFactor:1,mediumGapFactor:1,lowGapFactor:1}):Pr(n);Le.scene.add(i),Vs.push(i);const a=s*.45;Le.controls.target.set(0,a,0),Le.camera.position.set(6,4,6),Le.controls.update()}function Vx(e){Bh();const t=zx(e);qs=t.size;const{lod:n,maxHeight:i}=Pr(t);Le.scene.add(n),Vs.push(n);const s=i*.35;Le.controls.target.set(0,s,0),Le.camera.position.set(12,8,12),Le.controls.maxDistance=160,Le.controls.update()}const $s=document.createElement("div");$s.className="view-switcher";$s.innerHTML=`
  <button class="view-tab active" data-view="elements">Elements</button>
  <button class="view-tab" data-view="creator">Creator</button>
`;document.body.appendChild($s);const Hx=$s.querySelectorAll(".view-tab");function kh(e){Hx.forEach(t=>t.classList.toggle("active",t.dataset.view===e)),Le.setKeyboardNavigationEnabled(e==="creator"),e==="elements"?(zs.show(),Ir.hide(),Le.controls.maxDistance=80,fn=Math.floor(Math.random()*1e5),Qr(zs.getState())):(zs.hide(),Ir.show(),Le.controls.maxDistance=160)}$s.addEventListener("click",e=>{const t=e.target.closest(".view-tab");t&&kh(t.dataset.view)});const Gx=document.getElementById("ui-root"),zs=Ax(Gx,e=>{e.reason!=="wind"&&(fn=Math.floor(Math.random()*1e5),Qr(e))}),tc=document.createElement("div");tc.style.cssText="position:fixed;bottom:24px;left:24px;z-index:10;";document.body.appendChild(tc);const Ir=Px(tc,e=>Vx(e),()=>kh("elements"));Ir.hide();const ec=document.createElement("div");ec.className="light-control";ec.innerHTML=`
  <div class="panel-title">Lighting</div>
  <div>
    <label class="control-label">Direction</label>
    <input type="range" id="light-azimuth" min="0" max="360" value="56" step="1">
  </div>
  <div>
    <label class="control-label">Height</label>
    <input type="range" id="light-elevation" min="10" max="90" value="55" step="1">
  </div>
`;document.body.appendChild(ec);const Vh=document.getElementById("light-azimuth"),Hh=document.getElementById("light-elevation");function Gh(){const e=parseFloat(Vh.value)*Math.PI/180,t=parseFloat(Hh.value)/90;Le.setSunDirection(e,t)}Vh.addEventListener("input",Gh);Hh.addEventListener("input",Gh);Qr(zs.getState());const Wx=new r_;function Wh(){requestAnimationFrame(Wh);const e=Wx.getElapsedTime(),t=Le.sun.position;P_(e,t.clone().normalize()),U_(e,t.clone().normalize());const n=Le.getCameraDistance();let i=0;for(const s of Vs)s.isLOD&&(s.update(Le.camera),i+=G_(s,n));qs=i,kx(),zs.setLODLabel(H_(n)),Le.render()}Wh();
