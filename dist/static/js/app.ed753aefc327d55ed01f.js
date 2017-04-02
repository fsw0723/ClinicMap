webpackJsonp([1],{100:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("label",[t("span",{domProps:{textContent:e._s(e.label)}}),e._v(" "),t("input",{ref:"input",class:e.className,attrs:{type:"text",placeholder:e.placeholder}})])},staticRenderFns:[]}},101:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{ref:"flyaway"},[e._t("default",[t("div",{domProps:{innerHTML:e._s(e.content)}})])],2)])},staticRenderFns:[]}},102:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"vue-street-view-pano-container"},[t("div",{ref:"vue-street-view-pano",staticClass:"vue-street-view-pano"}),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},155:function(e,n){},62:function(e,n,t){t(74);var i=t(13)(t(63),t(97),null,null);e.exports=i.exports},63:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(95),o=t.n(i);n.default={name:"app",components:{ClinicMap:o.a}}},64:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(110),o=(t.n(i),t(48)),r=t(72),s=t.n(r);o.a.use(i,{load:{key:"AIzaSyBH9ho4HSGE7uEoE6R1gLXnnBLJ4LJKIjQ"}}),n.default={name:"hello",data:function(){return{loading:!1,viewType:"clinic",center:{lat:1.4017128,lng:103.793967},infoOptions:{pixelOffset:{width:0,height:-35}},zoom:11,infoWindowPos:{lat:0,lng:0},infoWinOpen:!1,infoContent:"",currentMidx:null,markers:[],clinics:[]}},mounted:function(){this.readClinicFile()},methods:{getCurrentLocation:function(){var e=this;navigator.geolocation?(this.loading=!0,navigator.geolocation.getCurrentPosition(function(n){e.center={lat:n.coords.latitude,lng:n.coords.longitude},e.zoom=16,e.loading=!1})):x.innerHTML="Geolocation is not supported by this browser."},readClinicFile:function(){var e=new XMLHttpRequest,n=this;e.open("GET","../../static/"+n.viewType+".csv",!1),e.onreadystatechange=function(){4===e.readyState&&(200!==e.status&&0!=e.status||s()(e.responseText,{columns:!0,trim:!0},function(e,t){n.processFile(t),n.addMarkersToMap()}))},e.send(null)},processFile:function(e){var n=this;this.clinics=[],e.forEach(function(e){n.clinics.push(e)})},addMarkersToMap:function(){var e=this;e.markers=[],e.clinics.forEach(function(n){"clinic"===e.viewType?e.markers.push({position:{lat:Number(n.LAT),lng:Number(n.LNG)},infoText:"<div><b> "+n.CLINIC+"</b></div><div>Address: "+n.ADDRESS+"</div><div>Postal code: "+n.POSTAL+"</div><div>Tel: "+n.TEL+"</div><div>Fax: "+n.FAX+"</div><div>Opening hours: </div><div>Mon - Fri: "+n["OPERATING HOURS MON - FRI"]+"</div><div>Sat: "+n.SAT+"</div><div>Sun: "+n.SUN+"</div><div>Public holiday: "+n["PUBLIC HOLIDAY"]+"</div>"}):e.markers.push({position:{lat:Number(n.LAT),lng:Number(n.LNG)},infoText:"<div><b> "+n["CLINIC NAME"]+"</b></div><div>Address: "+n.ADDRESS+"</div><div>Tel: "+n.TEL+"</div><div>Opening hours: </div><div>Mon - Fri: "+n.WEEKDAYS+"</div><div>"+n["SAT/SUN/PH"]+"</div>"})})},toggleInfoWindow:function(e,n){this.infoWindowPos=e.position,this.infoContent=e.infoText,this.currentMidx==n?this.infoWinOpen=!this.infoWinOpen:(this.infoWinOpen=!0,this.currentMidx=n)}}}},70:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(48),o=t(62),r=t.n(o);i.a.config.productionTip=!1,new i.a({el:"#app",template:"<App/>",components:{App:r.a}})},73:function(e,n){},74:function(e,n){},75:function(e,n){},76:function(e,n){},90:function(e,n,t){var i=t(13)(t(65),t(98),null,null);e.exports=i.exports},91:function(e,n,t){var i=t(13)(t(66),t(101),null,null);e.exports=i.exports},92:function(e,n,t){t(75);var i=t(13)(t(67),t(99),null,null);e.exports=i.exports},93:function(e,n,t){var i=t(13)(t(68),t(100),null,null);e.exports=i.exports},94:function(e,n,t){t(76);var i=t(13)(t(69),t(102),null,null);e.exports=i.exports},95:function(e,n,t){t(73);var i=t(13)(t(64),t(96),"data-v-066779c0",null);e.exports=i.exports},96:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"body"},[e.loading?t("div",{staticClass:"loading"},[t("h2",[e._v("Loading...")])]):e._e(),e._v(" "),t("h1",[e._v(e._s(e.viewType)+" MAP")]),e._v(" "),t("div",{staticClass:"options"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.viewType,expression:"viewType"}],attrs:{type:"radio",id:"clinic",value:"clinic"},domProps:{checked:e._q(e.viewType,"clinic")},on:{change:e.readClinicFile,__c:function(n){e.viewType="clinic"}}}),e._v(" "),t("label",{attrs:{for:"clinic"}},[e._v("Clinic")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.viewType,expression:"viewType"}],attrs:{type:"radio",id:"dental",value:"dental"},domProps:{checked:e._q(e.viewType,"dental")},on:{change:e.readClinicFile,__c:function(n){e.viewType="dental"}}}),e._v(" "),t("label",{attrs:{for:"dental"}},[e._v("Dental")]),e._v(" "),t("br"),e._v(" "),t("button",{on:{click:e.getCurrentLocation}},[e._v("Show my current position")])]),e._v(" "),t("gmap-map",{staticStyle:{width:"100%",height:"600px"},attrs:{center:e.center,zoom:e.zoom}},[t("gmap-info-window",{attrs:{options:e.infoOptions,position:e.infoWindowPos,opened:e.infoWinOpen,content:e.infoContent},on:{closeclick:function(n){e.infoWinOpen=!1}}}),e._v(" "),e._l(e.markers,function(n,i){return t("gmap-marker",{attrs:{position:n.position,clickable:!0},on:{click:function(t){e.toggleInfoWindow(n,i)}}})})],2)],1)},staticRenderFns:[]}},97:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("clinic-map")],1)},staticRenderFns:[]}},98:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement;return(e._self._c||n)("input",{ref:"input",attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.value}})},staticRenderFns:[]}},99:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"vue-map-container"},[t("div",{ref:"vue-map",staticClass:"vue-map"}),e._v(" "),t("div",{staticClass:"vue-map-hidden"},[e._t("default")],2),e._v(" "),e._t("visible")],2)},staticRenderFns:[]}}},[70]);
//# sourceMappingURL=app.ed753aefc327d55ed01f.js.map