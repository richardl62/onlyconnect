(this.webpackJsonponlyconnect=this.webpackJsonponlyconnect||[]).push([[0],{15:function(e,n,t){},16:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(1),c=t.n(o),a=t(8),s=t.n(a),u=(t(15),t(6)),i=t(2),l=t(5),d=function(e){var n=e.coreSquare,t=e.index,o=e.onSelect,c="square";return n.selected&&(c+=" selected"),n.badGuess&&(c+=" bad-guess"),n.solvedGroup&&(c+=" group"+n.solvedGroup),Object(r.jsx)("div",{onClick:function(){o&&o(t)},className:c,children:n.clue})},f=function(e){var n=e.coreSquares,t=e.onSelect;return Object(r.jsx)("div",{className:"wall",children:n.map((function(e,n){return Object(r.jsx)(d,{index:n,coreSquare:e,onSelect:t},n.toString())}))})};var h=function(e){var n=e.coreSquares,t=(e.hasGuess,e.hasBadGuess),o=e.clueSelected,c=e.doClearGuess,a=function(){return Object(r.jsx)("button",{type:"button",onClick:c,children:"Clear guess"})};return Object(r.jsxs)("div",{className:"solving-area",children:[Object(r.jsx)(f,{coreSquares:n,onSelect:o}),Object(r.jsxs)("div",{className:"controls",children:[Object(r.jsx)(a,{}),t?Object(r.jsx)("div",{children:"Wrong!"}):null]})]})};function v(e){console.log("Pre-trimmed",e);var n=[];for(var t in e){var r=e[t].trim();r&&n.push(r)}return n}var j=function(e){var n=e.recordClues,t=Object(o.useState)(""),c=Object(i.a)(t,2),a=c[0],s=c[1],u=Object(o.useState)(""),l=Object(i.a)(u,2),d=l[0],f=l[1],h=function(){return d?Object(r.jsx)("div",{children:"Error: "+d}):null};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"Enter clues.  These can be single words, or words and phrases seperated by commas"}),Object(r.jsx)("textarea",{cols:50,rows:4,onChange:function(e){s(e.target.value)}})]}),Object(r.jsx)("button",{className:"done-button",onClick:function(){f("");var e=v(a.split(/[,\s]/));if(console.log("Space separated",e),16!==e.length){var t=function(e){return v(e.split(/[,\n]/))}(a);console.log("Comma separated",t),16!==t.length?f("Did not find 16 clues: \n            ".concat(e.length," found with space seperation.\n            ").concat(t.length," found with comma-seperation.")):n(t)}else n(e)},children:"Done"}),Object(r.jsx)(h,{})]})},b=t(9);var p=function(){function e(){Object(l.a)(this,e)}return Object(b.a)(e,null,[{key:"doInt",value:function(e){var n=e*this.prime+Math.floor(Math.random()*this.prime);if(this.undoInt(n)!==e)throw new Error("DumbEncypt.doInt Cannot encrypt ".concat(e));return n}},{key:"undoInt",value:function(e){return Math.floor(e/this.prime)}}]),e}();p.prime=19793;t(16);function g(e){return e.replace(/~/g,"")}function O(e){return Math.floor(e/4)+1}var m=function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";Object(l.a)(this,e),this.answerGroup=void 0,this.clue=void 0,this.selected=!1,this.badGuess=!1,this.solvedGroup=null,this.answerGroup=n,this.clue=g(t)};var w,x=[];function G(e,n){!function(e,n){for(var t=0;t<e.length;++t){var r=O(t),o=e[t].solvedGroup;if(r<n){if(r!==o)throw new Error("square ".concat(t," is not in solved group ").concat(r));if(o>n)throw new Error("square ".concat(t," is in unexpected solved fron ").concat(o))}}}(e,n);for(var t=0;t<e.length;++t){if(e[t].solvedGroup===n&&O(t)!==n){var r=e.findIndex((function(e){return!e.solvedGroup}));if(O(r)!==n)throw new Error("Bah! Something has gone wrong");var o=[e[r],e[t]];e[t]=o[0],e[r]=o[1]}}}!function(){var e=new URLSearchParams(window.location.search),n=function(e){var n=e.get("clues");if(n){var t=n.split("~");if(16===t.length)return t;console.log("Did not find the expected number of clues",t)}return null}(e),t=function(e){var n=null,t=e.get("key");if(t){var r=p.undoInt(parseInt(t));n=[];for(var o=0;o<16;++o){var c=r%4;r=(r-c)/4,n.push(c)}n.reverse();for(var a=function(e){4!==n.filter((function(n){return n===e})).length&&(console.log("Cannot interpret urlKey",t),n=null)},s=0;n&&s<4;++s)a(s)}return n}(e);if(w=!1,n&&t){w=!0;for(var r=0;r<16;++r)x.push(new m(t[r],n[r]))}else{e.toString()&&alert("Could not understand URL parameters");for(var o=0;o<4;++o)for(var c=0;c<4;++c){var a=new m(o);x.push(a)}}}();var S=function(){var e=Object(o.useState)(x),n=Object(i.a)(e,2),t=n[0],c=n[1],a=Object(o.useState)(!1),s=Object(i.a)(a,2),l=s[0],d=s[1],v=Object(o.useState)(0),b=Object(i.a)(v,2),g=b[0],O=b[1];Object(o.useEffect)((function(){document.title="OnlyConnect"}));var S=Boolean(t.find((function(e){return e.selected||e.badGuess}))),E=Boolean(t.find((function(e){return e.badGuess})));if(w)return Object(r.jsx)(h,{coreSquares:t,hasGuess:S,hasBadGuess:E,clueSelected:function(e){if(w&&!t[e].solvedGroup){var n=Object(u.a)(t);n.forEach((function(e){return e.badGuess=!1})),n[e].selected=!n[e].selected;var r=n.filter((function(e){return e.selected}));if(r.find((function(e){return e.solvedGroup})))throw new Error("Selected square is already solved");if(4===r.length)if(r.forEach((function(e){return e.selected=!1})),r.every((function(e){return e.answerGroup===r[0].answerGroup}))){var o=g+1;O(o),r.forEach((function(e){return e.solvedGroup=o})),G(n,o),o+1===4&&(n.forEach((function(e){e.solvedGroup||(e.solvedGroup=4)})),O(4))}else r.forEach((function(e){return e.badGuess=!0}));c(n)}},doClearGuess:function(){var e=Object(u.a)(t);e.forEach((function(e){e.badGuess=!1,e.selected=!1})),c(e)}});var C=function(){var e=function(e){var n=new URLSearchParams,t="";e.forEach((function(e){return t+=e.clue+"~"})),n.append("clues",t.slice(0,-1));var r=0;e.forEach((function(e){return r=4*r+e.answerGroup}));var o=p.doInt(r);return n.append("key",o.toString()),n}(function(e){for(var n=e.length-1;n>0;n--){var t=Math.floor(Math.random()*(n+1)),r=[e[t],e[n]];e[n]=r[0],e[t]=r[1]}return e}(Object(u.a)(t))),n=window.location.href+"?"+e.toString();return Object(r.jsxs)("div",{children:[Object(r.jsx)(f,{coreSquares:t}),Object(r.jsxs)("div",{children:[" ",Object(r.jsx)("a",{href:n,target:"blank",children:"Randomised (Playable)"})," "]})]})};return Object(r.jsxs)("div",{className:"setting-area",children:[Object(r.jsx)(j,{recordClues:function(e){e?function(e){var n=e.map((function(e,n){var t=Math.floor(n/4);return new m(t,e)}));c(n),d(!0)}(e):d(!1)}}),l?Object(r.jsx)(C,{}):null]})},E=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,18)).then((function(n){var t=n.getCLS,r=n.getFID,o=n.getFCP,c=n.getLCP,a=n.getTTFB;t(e),r(e),o(e),c(e),a(e)}))};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(S,{})}),document.getElementById("root")),E()}},[[17,1,2]]]);
//# sourceMappingURL=main.96de537f.chunk.js.map