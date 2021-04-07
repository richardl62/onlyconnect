(this.webpackJsonponlyconnect=this.webpackJsonponlyconnect||[]).push([[0],{15:function(e,n,t){},16:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(1),c=t.n(o),a=t(9),u=t.n(a),s=(t(15),t(7)),l=t(2);function i(e){return e.replace(/~/g,"")}function d(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{answerGroup:e,clue:i(n),selected:!1,badGuess:!1,solvedGroup:null}}var f="Make Grid",v="Shuffle",h=t(5),j=t(6);var b=function(){function e(){Object(h.a)(this,e)}return Object(j.a)(e,null,[{key:"doInt",value:function(e){var n=e*this.prime+Math.floor(Math.random()*this.prime);if(this.undoInt(n)!==e)throw new Error("DumbEncypt.doInt Cannot encrypt ".concat(e));return n}},{key:"undoInt",value:function(e){return Math.floor(e/this.prime)}}]),e}();function p(e){var n=function(e){var n=e.get("clues");if(n){var t=n.split("~");if(16===t.length)return t;console.log("Did not find the expected number of clues",t)}return null}(e),t=function(e){var n=null,t=e.get("key");if(t){var r=b.undoInt(parseInt(t));n=[];for(var o=0;o<16;++o){var c=r%4;r=(r-c)/4,n.push(c)}n.reverse();for(var a=function(e){4!==n.filter((function(n){return n===e})).length&&(console.log("Cannot interpret urlKey",t),n=null)},u=0;n&&u<4;++u)a(u)}return n}(e);if(Boolean(n)!==Boolean(t))throw console.log("window.location.search",window.location.search,"\nurlClue",n,"\nurlSolutionGroups",t),new Error("Could not understand URL parameters");if(n&&t){for(var r=[],o=0;o<16;++o)r.push(d(t[o],n[o]));return r}return null}b.prime=19793;var g=function(e){var n=e.gridSquare,t=e.index,o=e.onSelect,c="square";n.selected&&(c+=" selected"),n.badGuess&&(c+=" bad-guess");var a,u=n.solvedGroup;return null!==u&&((a=u)>=1&&a<=4?c+=" group"+n.solvedGroup:console.log("Invalid solved group for",n)),Object(r.jsx)("div",{onClick:function(){o&&o(t)},className:c,children:n.clue})},O=function(e){var n=e.gridSquares,t=e.onSelect;return Object(r.jsx)("div",{className:"wall",children:n.map((function(e,n){return Object(r.jsx)(g,{index:n,gridSquare:e,onSelect:t},n.toString())}))})};var m=function(e){var n=e.gridSquares,t=e.shuffle,o=function(e){var n=new URLSearchParams,t="";e.forEach((function(e){return t+=e.clue+"~"})),n.append("clues",t.slice(0,-1));var r=0;e.forEach((function(e){return r=4*r+e.answerGroup}));var o=b.doInt(r);return n.append("key",o.toString()),n}(n),c=window.location.href+"?"+o.toString();return Object(r.jsxs)("div",{children:[Object(r.jsx)(O,{gridSquares:n}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"button",onClick:t,children:v})}),Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:"Playable link "}),Object(r.jsx)("a",{href:c,target:"blank",children:"here"})]})]})},x=function(){function e(n){Object(h.a)(this,e),this._key=void 0,this._key=n}return Object(j.a)(e,[{key:"get",value:function(){var e=localStorage.getItem(this._key);return e?JSON.parse(e):null}},{key:"set",value:function(e){if(null===e||void 0===e)localStorage.removeItem(this._key);else{var n=JSON.stringify(e);localStorage.setItem(this._key,n)}}}],[{key:"make",value:function(n){return new e(n.map((function(e){return e.clue})).join())}},{key:"clearAll",value:function(){localStorage.clear()}}]),e}();function w(e){console.log("Pre-trimmed",e);var n=[];for(var t in e){var r=e[t].trim();r&&n.push(r)}return n}var S=function(e){var n=e.recordClues,t=Object(o.useState)(""),c=Object(l.a)(t,2),a=c[0],u=c[1],s=Object(o.useState)(""),i=Object(l.a)(s,2),d=i[0],h=i[1],j=function(){return d?Object(r.jsx)("div",{children:"Error: "+d}):null};return Object(r.jsxs)("div",{className:"setting-area",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:"Enter clues then ".concat(f.toLowerCase())}),Object(r.jsx)("span",{children:" and ".concat(v.toLowerCase(),".")}),Object(r.jsx)("br",{}),Object(r.jsx)("span",{children:"Clues can be single words, or words and phrases seperated by commas."})]}),Object(r.jsx)("textarea",{cols:50,rows:4,onChange:function(e){u(e.target.value)}}),Object(r.jsxs)("div",{className:"setting-area-buttons",children:[Object(r.jsx)("button",{className:"done-button",onClick:function(){h("");var e=w(a.split(/[,\s]/));if(console.log("Space separated",e),16!==e.length){var t=function(e){return w(e.split(/[,\n]/))}(a);console.log("Comma separated",t),16!==t.length?(h("Did not find 16 clues: \n            ".concat(e.length," found with space seperation.\n            ").concat(t.length," found with comma-seperation.")),n(null)):n(t)}else n(e)},children:f}),Object(r.jsx)("button",{className:"clear-stored-solutions-button",onClick:x.clearAll,children:"Clear stored solutions"})]}),Object(r.jsx)(j,{})]})};var y=function(e){var n=e.gridSquares,t=e.hasBadGuess,o=e.clueSelected,c=e.doClearGuess,a=e.doRestart,u=function(){return Object(r.jsx)("button",{type:"button",onClick:c,children:"Clear guess"})},s=function(){return Object(r.jsx)("button",{className:"restart-button",type:"button",onClick:a,children:"Restart"})};return Object(r.jsxs)("div",{className:"solving-area",children:[Object(r.jsx)(O,{gridSquares:n,onSelect:o}),Object(r.jsxs)("div",{className:"solving-controls",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)(u,{}),t?Object(r.jsx)("div",{children:"Wrong!"}):null]}),Object(r.jsx)(s,{})]})]})};var G=function(){var e=function(){try{return p(new URLSearchParams(window.location.search))}catch(e){console.log(e),alert("URL appears incorrect")}return null}(),n=Boolean(e),t=e&&function(e){try{return x.make(e)}catch(n){console.log(n),alert("Problem getting recorded data")}return null}(e);if(t){var r=t.get();r&&function(e){return 16===e.length||(alert("Recorded data appears incorrect"),!1)}(r)&&(e=r)}return[e=e||function(){for(var e=[],n=0;n<4;++n)for(var t=0;t<4;++t)e.push(d(n));return e}(),n,t]};t(16);function k(e){return Math.floor(e/4)+1}function C(e,n){!function(e,n){for(var t=0;t<e.length;++t){var r=k(t),o=e[t].solvedGroup;if(r<n){if(r!==o)throw new Error("square ".concat(t," is not in solved group ").concat(r));if(o>n)throw new Error("square ".concat(t," is in unexpected solved fron ").concat(o))}}}(e,n);for(var t=0;t<e.length;++t){if(e[t].solvedGroup===n&&k(t)!==n){var r=e.findIndex((function(e){return!e.solvedGroup}));if(k(r)!==n)throw new Error("Bah! Something has gone wrong");var o=[e[r],e[t]];e[t]=o[0],e[r]=o[1]}}}var E=G(),I=Object(l.a)(E,3),q=I[0],N=I[1],B=I[2],M=function(){var e=Object(o.useState)(q),n=Object(l.a)(e,2),t=n[0],c=n[1],a=Object(o.useState)(q),u=Object(l.a)(a,2),i=u[0],f=u[1],v=Object(o.useState)(!1),h=Object(l.a)(v,2),j=h[0],b=h[1];Object(o.useEffect)((function(){document.title="OnlyConnect"}));var p=Boolean(t.find((function(e){return e.badGuess})));if(N)return Object(r.jsx)(y,{gridSquares:t,hasBadGuess:p,clueSelected:function(e){if(N&&!t[e].solvedGroup){var n=Object(s.a)(t);n.forEach((function(e){return e.badGuess=!1})),n[e].selected=!n[e].selected;var r=n.filter((function(e){return e.selected}));if(r.find((function(e){return e.solvedGroup})))throw new Error("Selected square is already solved");if(4===r.length)if(r.forEach((function(e){return e.selected=!1})),r.every((function(e){return e.answerGroup===r[0].answerGroup}))){var o=function(e){for(var n=function(n){if(e.find((function(e){return e&&e.solvedGroup===n})))return{v:n}},t=4;t>0;--t){var r=n(t);if("object"===typeof r)return r.v}return 0}(n)+1;r.forEach((function(e){return e.solvedGroup=o})),C(n,o),o+1===4&&n.forEach((function(e){e.solvedGroup||(e.solvedGroup=4)}))}else r.forEach((function(e){return e.badGuess=!0}));B.set(n),c(n)}},doClearGuess:function(){var e=Object(s.a)(t);e.forEach((function(e){e.badGuess=!1,e.selected=!1})),c(e)},doRestart:function(){B.set(null),window.location.reload()}});return Object(r.jsxs)("div",{className:"setting-area",children:[Object(r.jsx)(S,{recordClues:function(e){e?function(e){var n=e.map((function(e,n){return d(Math.floor(n/4),e)}));c(n),f(n),b(!0)}(e):b(!1)}}),j?Object(r.jsx)(m,{gridSquares:i,shuffle:function(){f(function(e){for(var n=e.length-1;n>0;n--){var t=Math.floor(Math.random()*(n+1)),r=[e[t],e[n]];e[n]=r[0],e[t]=r[1]}return e}(Object(s.a)(t)))}}):null]})},L=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,18)).then((function(n){var t=n.getCLS,r=n.getFID,o=n.getFCP,c=n.getLCP,a=n.getTTFB;t(e),r(e),o(e),c(e),a(e)}))};u.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(M,{})}),document.getElementById("root")),L()}},[[17,1,2]]]);
//# sourceMappingURL=main.b2b11200.chunk.js.map