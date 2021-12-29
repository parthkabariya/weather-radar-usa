(()=>{var e={703:(e,r,t)=>{"use strict";var a=t(414);function n(){}function o(){}o.resetWarningCache=n,e.exports=function(){function e(e,r,t,n,o,i){if(i!==a){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function r(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:o,resetWarningCache:n};return t.PropTypes=t,t}},697:(e,r,t)=>{e.exports=t(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},r={};function t(a){var n=r[a];if(void 0!==n)return n.exports;var o=r[a]={exports:{}};return e[a](o,o.exports,t),o.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(()=>{"use strict";t.r(a),t.d(a,{default:()=>s});const e=require("react");var r=t.n(e),n=t(697),o=t.n(n);function i(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,n,o=[],i=!0,u=!1;try{for(t=t.call(e);!(i=(a=t.next()).done)&&(o.push(a.value),!r||o.length!==r);i=!0);}catch(e){u=!0,n=e}finally{try{i||null==t.return||t.return()}finally{if(u)throw n}}return o}}(e,r)||function(e,r){if(e){if("string"==typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,a=new Array(r);t<r;t++)a[t]=e[t];return a}var c=(0,e.forwardRef)((function(t,a){var n,o=i((0,e.useState)([{USA:[],Alaska:[]}]),2),u=o[0],c=o[1],s=i((0,e.useState)(0),2),l=s[0],f=s[1],p=i((0,e.useState)(null),2),d=p[0],y=p[1],h=i((0,e.useState)(null),2),v=h[0],S=h[1],g=null!==(n=t.options.opacity)&&void 0!==n?n:.9;(0,e.useImperativeHandle)(a,(function(){return{trunOnRadar:function(e,r){if(e){t.getLoader(!0);var a=[];Object.keys(u[0]).map((function(e){a.push(m(e,r))})),Promise.all(a).then((function(e){var a=[],n={};n.USA=e[0].USA,n.Alaska=e[1].Alaska,a.push(n),c(a),r.on("sourcedata",(function(){t.getLoader(!1),r.off("sourcedata",(function(){}))}))}))}else{for(var n=0;n<u[0].USA.length;n++)r.getSource("weatherRadarUSA"+u[0].USA[n])&&(r.getLayer("weatherRadarUSA"+u[0].USA[n])&&r.removeLayer("weatherRadarUSA"+u[0].USA[n]),r.removeSource("weatherRadarUSA"+u[0].USA[n]));for(var o=0;o<u[0].Alaska.length;o++)r.getSource("weatherRadarAlaska"+u[0].Alaska[o])&&(r.getLayer("weatherRadarAlaska"+u[0].Alaska[o])&&r.removeLayer("weatherRadarAlaska"+u[0].Alaska[o]),r.removeSource("weatherRadarAlaska"+u[0].Alaska[o]));r.off("sourcedata",(function(){}))}},weatherAnimation:function(e,r){e?(b("USA",r),b("Alaska",r)):(clearInterval(d),clearInterval(v))}}}));var m=function(e,r){return new Promise((function(t){var a="conus/conus_bref_qcd";"Alaska"==e&&(a="alaska/alaska_bref_qcd"),fetch("https://opengeo.ncep.noaa.gov/geoserver/".concat(a,"/ows?service=wms&version=1.1.1&request=GetCapabilities")).then((function(e){return e.text()})).then((function(e){return(new window.DOMParser).parseFromString(e,"text/xml")})).then((function(n){for(var o=n.querySelector('Extent[name="time"]').innerHTML.split(","),i=o[0],u=0,c=[],s=0;s<o.length;s++)0==u&&(c.push(o[s]),u=5),u--;t(function(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}({},e,c)),A(e,a,r,i,g);for(var l=1;l<c.length;l++)A(e,a,r,c[l],0)}))}))},A=function(e,r,t,a,n){var o="conus_bref_qcd";"Alaska"==e&&(o="alaska_bref_qcd"),t.addSource("weatherRadar"+e+a,{type:"raster",tiles:["https://opengeo.ncep.noaa.gov/geoserver/".concat(r,"/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&TILED=true&LAYERS=").concat(o,"&TIME=").concat(a,"&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX={bbox-epsg-3857}")],tileSize:256}),t.addLayer({id:"weatherRadar"+e+a,type:"raster",source:"weatherRadar"+e+a,paint:{"raster-opacity":n,"raster-opacity-transition":{duration:0,delay:0}}})},b=function(e,r){var a=l,n=u[0][e][u[0][e].length-1],o=setInterval((function(){a>u[0][e].length-1&&(a=0),n=0==a?u[0][e][u[0][e].length-1]:u[0][e][a-1];var o=u[0][e][a];t.getTime(u[0].USA[a]),r.getSource("weatherRadar"+e+o)&&r.isSourceLoaded("weatherRadar"+e+o)&&(w(r,"weatherRadar"+e+o,g),w(r,"weatherRadar"+e+n,0),f(a),a++)}),500);"USA"==e?y(o):S(o)},w=function(e,r,t){if(!e.getLayer(r))return!1;e.setPaintProperty(r,"raster-opacity",t)};return r().createElement(r().Fragment,null,t.childern)}));c.propTypes={options:o().array.isRequired,childern:o().any,getTime:o().func,getLoader:o().func},c.displayName="WeatherRadar";const s=c})(),module.exports=a})();