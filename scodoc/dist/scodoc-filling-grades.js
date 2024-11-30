// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.cyu.fr/
// @version      1.6.0-scodoc
// @description  Remplissage des notes sur Scodoc depuis un fichier .csv
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.cyu.fr/*
// @grant        none
// @date         30/11/2024
// ==/UserScript==
/* eslint-disable */
                
(function(U,V){typeof exports=="object"&&typeof module<"u"?V(exports):typeof define=="function"&&define.amd?define(["exports"],V):(U=typeof globalThis<"u"?globalThis:U||self,V(U.ScodocFillingGrades={}))})(this,function(U){"use strict";var V=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function le(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var J={exports:{}};(function(o,p){(function(){var y="We could not detect the separator.",h="Empty CSV. Please provide something.",_="Could not detect header. Ensure first row cotains your column headers.",C=[",",";","	"],O={",":"comma",";":"semicolon","	":"tab"};function E(d){var c={},a;return C.forEach(function(i,g){var e=new RegExp(i,"g");c[i]=(d.match(e)||[]).length,a=!a||c[i]>c[a]?i:a}),a}function M(){var d=[].slice.call(arguments),c=d.reduce(function(a,i){return a.length>i.length?a:i},[]);return c.map(function(a,i){return d.map(function(g){return g[i]})})}function L(d){for(var c={},a=0;a<d.length;a++){var i=d[a];c[i]===void 0?c[i]=0:c[i]++}for(var g=[],a=d.length-1;a>=0;a--){var i=d[a];c[i]>0&&(i=i+"__"+c[i]--),g.unshift(i)}return g}function G(d,c){if(c||(c={}),d.length==0)throw h;var a=c.separator||E(d);if(!a)throw y;var i=[];try{var i=F.parse(d,O[a])}catch(T){var g=d.lastIndexOf(`
`,T.offset),e=d.indexOf(`
`,T.offset),N=d.substring(g>=-1?g:0,e>-1?e:d.length);throw T.message+" On line "+T.line+" and column "+T.column+`.
`+N}c.transpose&&(i=M.apply(this,i));var v=i.shift();if(v.length==0)throw _;v=v.map(function(T){return T.trim().replace(/(^")|("$)/g,"")}),v=L(v);for(var u=c.hash?{}:[],S=0;S<i.length;S++){for(var q={},B,k=0;k<v.length;k++){var D=(i[S][k]||"").trim().replace(/(^")|("$)/g,""),P=D===""?NaN:D-0;if(c.hash&&k==0)B=D;else if(c.parseJSON||c.parseNumbers&&!isNaN(P))try{q[v[k]]=JSON.parse(D)}catch{q[v[k]]=D}else q[v[k]]=D}c.hash?u[B]=q:u.push(q)}return u}var F=function(){function d(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var c={parse:function(a,i){var g={comma:S,semicolon:q,tab:B,sv:k,line:D,field:P,char:T};if(i!==void 0){if(g[i]===void 0)throw new Error("Invalid rule name: "+d(i)+".")}else i="comma";var e=0,N=0,v=[];function u(n){e<N||(e>N&&(N=e,v=[]),v.push(n))}function S(){var n,t,r,l;return r=e,l=e,n=function(s){return I=","}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,m){return m}(r,n[1])),n===null&&(e=r),n}function q(){var n,t,r,l;return r=e,l=e,n=function(s){return I=";"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,m){return m}(r,n[1])),n===null&&(e=r),n}function B(){var n,t,r,l;return r=e,l=e,n=function(s){return I="	"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,m){return m}(r,n[1])),n===null&&(e=r),n}function k(){var n,t,r,l,s,m,b,f,x;for(m=e,b=e,n=[],/^[\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,u("[\\n\\r]"));t!==null;)n.push(t),/^[\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,u("[\\n\\r]"));if(n!==null)if(t=D(),t!==null){if(r=[],f=e,x=e,/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]")),s!==null)for(l=[];s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));else l=null;for(l!==null?(s=D(),s!==null?l=[l,s]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(z,w){return w}(f,l[1])),l===null&&(e=f);l!==null;){if(r.push(l),f=e,x=e,/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]")),s!==null)for(l=[];s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));else l=null;l!==null?(s=D(),s!==null?l=[l,s]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(z,w){return w}(f,l[1])),l===null&&(e=f)}if(r!==null){for(l=[],/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));l!==null?n=[n,t,r,l]:(n=null,e=b)}else n=null,e=b}else n=null,e=b;else n=null,e=b;return n!==null&&(n=function(z,w,j){return j.unshift(w),j}(m,n[1],n[2])),n===null&&(e=m),n}function D(){var n,t,r,l,s,m,b,f,x;if(m=e,b=e,n=P(),n!==null){for(t=[],f=e,x=e,a.length>e?(r=a.charAt(e),e++):(r=null,u("any character")),r!==null?(l=function(z,w){return w==I}(e,r)?"":null,l!==null?(s=P(),s!==null?r=[r,l,s]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(z,w,j){return j}(f,r[0],r[2])),r===null&&(e=f);r!==null;)t.push(r),f=e,x=e,a.length>e?(r=a.charAt(e),e++):(r=null,u("any character")),r!==null?(l=function(z,w){return w==I}(e,r)?"":null,l!==null?(s=P(),s!==null?r=[r,l,s]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(z,w,j){return j}(f,r[0],r[2])),r===null&&(e=f);t!==null?(r=function(z,w,j){return!!w||j.length}(e,n,t)?"":null,r!==null?n=[n,t,r]:(n=null,e=b)):(n=null,e=b)}else n=null,e=b;return n!==null&&(n=function(z,w,j){return j.unshift(w),j}(m,n[0],n[1])),n===null&&(e=m),n}function P(){var n,t,r,l,s,m;if(l=e,s=e,a.charCodeAt(e)===34?(n='"',e++):(n=null,u('"\\""')),n!==null){for(t=[],r=T();r!==null;)t.push(r),r=T();t!==null?(a.charCodeAt(e)===34?(r='"',e++):(r=null,u('"\\""')),r!==null?n=[n,t,r]:(n=null,e=s)):(n=null,e=s)}else n=null,e=s;if(n!==null&&(n=function(b,f){return f.join("")}(l,n[1])),n===null&&(e=l),n===null){for(l=e,n=[],s=e,m=e,/^[^\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,u("[^\\n\\r]")),t!==null?(r=function(b,f){return f!=I}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=m)):(t=null,e=m),t!==null&&(t=function(b,f){return f}(s,t[0])),t===null&&(e=s);t!==null;)n.push(t),s=e,m=e,/^[^\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,u("[^\\n\\r]")),t!==null?(r=function(b,f){return f!=I}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=m)):(t=null,e=m),t!==null&&(t=function(b,f){return f}(s,t[0])),t===null&&(e=s);n!==null&&(n=function(b,f){return f.join("")}(l,n)),n===null&&(e=l)}return n}function T(){var n,t,r,l;return r=e,l=e,a.charCodeAt(e)===34?(n='"',e++):(n=null,u('"\\""')),n!==null?(a.charCodeAt(e)===34?(t='"',e++):(t=null,u('"\\""')),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s){return'"'}()),n===null&&(e=r),n===null&&(/^[^"]/.test(a.charAt(e))?(n=a.charAt(e),e++):(n=null,u('[^"]'))),n}function ge(n){n.sort();for(var t=null,r=[],l=0;l<n.length;l++)n[l]!==t&&(r.push(n[l]),t=n[l]);return r}function ve(){for(var n=1,t=1,r=!1,l=0;l<Math.max(e,N);l++){var s=a.charAt(l);s===`
`?(r||n++,t=1,r=!1):s==="\r"||s==="\u2028"||s==="\u2029"?(n++,t=1,r=!0):(t++,r=!1)}return{line:n,column:t}}var I=",",re=g[i]();if(re===null||e!==a.length){var Q=Math.max(e,N),ye=Q<a.length?a.charAt(Q):null,te=ve();throw new this.SyntaxError(ge(v),ye,Q,te.line,te.column)}return re},toSource:function(){return this._source}};return c.SyntaxError=function(a,i,g,e,N){function v(u,S){var q,B;switch(u.length){case 0:q="end of input";break;case 1:q=u[0];break;default:q=u.slice(0,u.length-1).join(", ")+" or "+u[u.length-1]}return B=S?d(S):"end of input","Expected "+q+" but "+B+" found."}this.name="SyntaxError",this.expected=a,this.found=i,this.message=v(a,i),this.offset=g,this.line=e,this.column=N},c.SyntaxError.prototype=Error.prototype,c}();o.exports&&(p=o.exports=G),p.csv2json=G}).call(V)})(J,J.exports);var ae=J.exports;const se=le(ae);let R=["Nom","Prénom","Notes"],$=[],H=[];const oe=o=>new Promise(p=>setTimeout(p,o)),A={listGradesRows:Array.from(document.querySelectorAll("tr.etud_elem")),formContainer:document.getElementById("tp-ext-form-container"),maxGrade:document.querySelector(".tf-ro-field.formnote_bareme")},Y=["","abs","exc"],Z=o=>{o.setAttribute("data-modified",!0),write_on_blur==null||write_on_blur(o)},ie=async(o,p,y)=>{p.uploadBtn.inert=!0;const h=R[0],_=R[1],C=R[2],O=/[\u0300-\u036f]/g;for(const E of o){await oe(0);const M=p.listGradesRows.find(G=>{const F=G.getElementsByClassName("tf-fieldlabel")[0];if(!F)return;const d=F.textContent.normalize("NFD").replaceAll(O,"").replaceAll("-"," ").toLowerCase(),c=E[h].normalize("NFD").replaceAll(O,"").replaceAll("-"," ").toLowerCase(),i=E[_].normalize("NFD").replaceAll(O,"").replaceAll("-"," ").toLowerCase().split(" ").some(e=>d.includes(e)),g=c.split(" ").some(e=>d.includes(e));return i&&g});if(!M){$.push(`${E[h].toUpperCase()} ${E[_]}`);continue}const L=M.querySelector('input[class^="note"]');if(L){const G=String(E[C]).replace(",","."),F=Number.isNaN(Number(G)),d=!F,c=F?E[C]:Number(G);d&&(Y.includes(L.value.trim().toLowerCase())||c>L.value&&c<=y||L.value>y)&&(L.value=c,(c>y||c<0)&&H.push(`${E[h].toUpperCase()} ${E[_]}`),Z(L))}}},ee=()=>{document.querySelector("#grades_file").value="",A.firstStep.style.display="block",A.resetContainer.style.display="none"},ue=o=>{var y;return{isMatching:!0,scodocMaxGrade:Number(((y=o.maxGrade.textContent.match(/\d+(\.\d+)?/))==null?void 0:y[0])||20)}},ce=({target:o,valForMissingGrade:p,dom:y})=>{const h=o.target.files[0],_=h.name,C=_.lastIndexOf("."),O=["csv"],E=_.substring(C+1);if(!O.includes(E)){alert(`Votre fichier n'est pas au format ${O.join(" ou ")}`);return}const M=new FileReader;M.onload=L=>{try{new TextDecoder("utf8",{fatal:!0}).decode(L.target.result)}catch{alert("Votre fichier doit être encodé en UTF-8. Veuillez effectuer ce changement."),ee();return}M.readAsText(h),M.onload=async G=>{let F=se(G.target.result,{parseNumbers:!0});if(F.some(u=>Object.keys(u).length!==3)){alert("Votre fichier ne contient pas que trois colonnes.");return}R=Object.keys(F[0]);const d=ue(y);$=[],H=[],await ie(F,y,d.scodocMaxGrade);const c=document.querySelector("[data-template-id='unknown-student']"),a=document.querySelector("[data-unknown-students]"),i=a.querySelector("ul");i.replaceChildren();const g=document.querySelector("[data-nb-unknown-students]");g.textContent=$.length,$.length>0?(a.style.display="",$.forEach(u=>{const S=c.content.cloneNode(!0);S.querySelector("li").textContent=u,i.append(S)})):a.style.display="none";const e=document.querySelector("[data-invalid-grades]"),N=e.querySelector("ul");N.replaceChildren();const v=document.querySelector("[data-nb-invalid-grade-students]");v.textContent=H.length,H.length>0?(e.style.display="",H.forEach(u=>{const S=c.content.cloneNode(!0);S.querySelector("li").textContent=u,N.append(S)})):e.style.display="none",Array.from(document.querySelectorAll(".note")).forEach(u=>{Y.includes(u.value.trim().toLowerCase())&&(u.value=p,Z(u))}),A.uploadBtn.inert=!1,A.firstStep.style.display="none",A.resetContainer.style.display="block"}},M.readAsArrayBuffer(h)},W=(o,p,y,h)=>{o.addEventListener(p,function(_){let C=_.target;for(;C&&C!==this;)C.matches(y)&&h.call(C,_),C=C.parentNode})},de=()=>{document.querySelectorAll("[data-etudid]").forEach(o=>{o.setAttribute("data-modified","true"),write_on_blur==null||write_on_blur(o)})},fe=`<style>\r
    .tp-ext-form-container {\r
        font-family: Helvetica, Arial, sans-serif;\r
        position: fixed;\r
        background-color: white;\r
        top: 12px;\r
        right: 10px;\r
        padding: 1.5em;\r
        border: 2px solid #333333;\r
        max-width: 450px;\r
        overflow: hidden;\r
        border-radius: 0.35rem;\r
        max-height: 85vh;\r
        overflow-y: auto;\r
        z-index: 9999;\r
\r
        @media (max-width: 768px) {\r
            position: static;\r
            margin: 0.95rem;\r
            max-width: none;\r
            max-height: none;\r
        }\r
    }\r
\r
    .tp-ext-form-title {\r
        font-weight: bold;\r
        border: 0;\r
        margin-bottom: 0;\r
        width: auto;\r
        font-size: 1.05rem;\r
        padding: 0 0.5rem;\r
        background-color: white;\r
    }\r
\r
    .tp-ext-valid-file {\r
        color: green;\r
    }\r
\r
    .tp-ext-empty-values-list-choices {\r
        display: flex;\r
        justify-content: space-around;\r
        list-style-type: none;\r
        flex-direction: column;\r
        padding-left: 0;\r
        margin-bottom: 1.35rem;\r
        margin-top: 0;\r
    }\r
\r
    .tp-text-bold {\r
        font-weight: bold;\r
    }\r
\r
    .tp-ext-form-container-hidden {\r
        height: 0;\r
        padding-bottom: 0;\r
    }\r
\r
    .tp-upload-area {\r
        text-align: center;\r
        padding: 0.75rem;\r
        border: 2px dashed black;\r
        border-radius: 0.35rem;\r
\r
        &.over {\r
            border-color: rgb(29 78 216);\r
        }\r
\r
        p {\r
            margin: 0.5rem 0;\r
        }\r
    }\r
\r
    .tp-primary-btn {\r
        --bg-color: hsl(224.3, 76.3%, 48%);\r
        padding: 0.5rem 1rem;\r
        background-color: var(--bg-color);\r
        color: white;\r
        border-radius: 0.5rem;\r
        position: relative;\r
        border: none;\r
        display: inline-block;\r
\r
        input {\r
            width: 0;\r
            height: 0;\r
            position: absolute;\r
        }\r
\r
        &:not(:has([inert])) {\r
            &:hover,\r
            &:focus-within,\r
            &.over {\r
                background-color: color(\r
                    from var(--bg-color) display-p3 r calc(g - 0.15) calc(b - 0.15)\r
                );\r
            }\r
        }\r
\r
        &:where([inert]) {\r
            opacity: 0.7;\r
        }\r
    }\r
\r
    .tp-form-title {\r
        font-size: 1.15rem;\r
        font-weight: bold;\r
        margin: 0.95rem 0 0.35rem;\r
    }\r
\r
    .tp-secondary-btn {\r
        padding: 0.5rem 1rem;\r
        background-color: rgb(223, 223, 223);\r
        color: black;\r
        border-radius: 0.5rem;\r
        display: none;\r
        border: none;\r
    }\r
\r
    .tp-label {\r
        display: flex;\r
        gap: 0.6rem;\r
        font-weight: normal;\r
    }\r
\r
    .tp-label input {\r
        margin: 0;\r
    }\r
\r
    .tp-list-infos {\r
        margin-top: 0.35rem;\r
\r
        li {\r
            margin-bottom: 0.15rem;\r
        }\r
    }\r
\r
    .tp-small-text {\r
        font-size: 0.85rem;\r
    }\r
</style>\r
<form enctype="multipart/form-data; charset=utf-8">\r
    <fieldset class="tp-ext-form-container" id="tp-ext-form-container">\r
        <legend class="tp-ext-form-title" data-project-name>\r
            Remplisseur automatique de notes\r
        </legend>\r
\r
        <p style="margin: 0">\r
            Prenez bien soin à respecter les règles suivantes :\r
        </p>\r
        <ul class="tp-list-infos">\r
            <li>Format de fichier .csv</li>\r
            <li>\r
                Le fichier (.csv)\r
                <span class="tp-text-bold">doit contenir trois colonnes</span>.\r
                La première doit représenter les noms, la seconde les prénoms et\r
                la dernière les notes\r
            </li>\r
        </ul>\r
        <p style="margin: 0">A noter :</p>\r
        <ul class="tp-list-infos">\r
            <li>La note la plus haute sera prise en compte sauf si elle dépasse la note maximale</li>\r
            <li>\r
                Si une absence/note neutralisée/note en attente sera transformée\r
                en vraie note l'inverse est faux\r
            </li>\r
            <li>\r
                Toute note invalide sera indiquée en "ABS" ou "EXC"\r
            </li>\r
            <li class="tp-text-bold">\r
                Le fichier doit impérativement être encodé en Unicode UTF-8. Sinon ça ne\r
                fonctionnera pas\r
            </li>\r
        </ul>\r
        <hr />\r
\r
        <div data-first-step>\r
            <p class="tp-form-title">Gestion des notes manquantes</p>\r
            <ul class="tp-ext-empty-values-list-choices">\r
                <li>\r
                    <label id="att" class="tp-label">\r
                        <span>Mettre les notes en absent (ABS)</span>\r
                        <input\r
                            type="radio"\r
                            name="empty_val"\r
                            id="att"\r
                            value="ABS"\r
                            checked\r
                        />\r
                    </label>\r
                </li>\r
                <li>\r
                    <label id="exc" class="tp-label">\r
                        <span>Excuser les notes (EXC)</span>\r
                        <input\r
                            type="radio"\r
                            name="empty_val"\r
                            id="exc"\r
                            value="EXC"\r
                        />\r
                    </label>\r
                </li>\r
            </ul>\r
\r
            <p class="tp-form-title">Fichier CSV</p>\r
\r
            <div data-drag-n-drop-area class="tp-upload-area">\r
                <p>Glissez-déposez votre fichier csv</p>\r
                <p>ou</p>\r
                <label id="grades_field" class="tp-primary-btn">\r
                    <span>Sélectionnez un fichier csv</span>\r
                    <input\r
                        type="file"\r
                        name="grades_file"\r
                        id="grades_file"\r
                        accept=".csv"\r
                        data-upload-btn=""\r
                    />\r
                </label>\r
                <p\r
                    style="font-size: 0.9rem; margin-top: 1.25rem"\r
                    class="tp-text-bold"\r
                >\r
                    Fichier .csv encodé UTF-8 uniquement\r
                </p>\r
            </div>\r
        </div>\r
\r
        <div data-restart-upload-container>\r
            <p class="tp-ext-valid-file">Fichier valide. Notes intégrées.</p>\r
            <details style="margin-bottom: 1rem" data-unknown-students>\r
                <summary>\r
                    Liste des étudiants inconnus (<span\r
                        data-nb-unknown-students\r
                    ></span\r
                    >)\r
                </summary>\r
                <ul class="tp-list-infos"></ul>\r
            </details>\r
\r
            <details style="margin-bottom: 1rem" data-invalid-grades>\r
                <summary>\r
                    Liste des étudiants avec note incorrecte (<span\r
                        data-nb-invalid-grade-students\r
                    ></span\r
                    >)\r
                </summary>\r
                <p class="tp-small-text">Ces étudiants ont une note inférieure à 0 ou supérieure à la note maximale définie</p>\r
                <ul class="tp-list-infos"></ul>\r
            </details>\r
\r
            <button type="button" class="tp-primary-btn" data-restart>\r
                Recommencer\r
            </button>\r
            <!-- \r
            <button type="button" class="tp-secondary-btn" data-force-save>\r
                Forcer l'enregistrement\r
            </button> -->\r
        </div>\r
    </fieldset>\r
</form>\r
<template data-template-id="unknown-student">\r
    <li></li>\r
</template>\r
`,pe={name:"scodoc-remplisseur-automatique-notes",version:"1.6.0-scodoc",description:"",main:"src/index.js",scripts:{build:"vite build",start:"vite",dev:"vite",release:"standard-version"},keywords:[],author:"",license:"ISC",devDependencies:{"csvjson-csv2json":"^5.0.6",encoding:"^0.1.13","standard-version":"^9.5.0",vite:"^4.4.11"}};let ne=!1;const me=()=>ne,X=o=>ne=o;(async function(){if(A.listGradesRows.length===0&&!A.formContainer)return;document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",fe),A.dragAndDropArea=document.querySelector("[data-drag-n-drop-area]"),A.resetContainer=document.querySelector("[data-restart-upload-container]"),A.firstStep=document.querySelector("[data-first-step]"),A.uploadBtn=document.querySelector("[data-upload-btn]"),A.resetContainer.style.display="none",document.querySelector("[data-project-name]").textContent+=` v${pe.version.replace("-scodoc","")}`,await Promise.resolve().then(()=>he),W(document,"change","#grades_file",p=>{document.querySelectorAll("[data-etudid]").forEach(h=>{h.style.backgroundColor=""});const y=document.querySelector('input[name="empty_val"]:checked').value||"ABS";ce({target:p,valForMissingGrade:y,dom:A})}),W(document,"click","[data-restart]",()=>{X(!1),ee()}),W(document,"click","[data-force-save]",()=>{de()})})();const K=document.querySelector("[data-drag-n-drop-area]");["dragend","dragleave"].forEach(o=>{K.addEventListener(o,p=>{p.preventDefault(),p.currentTarget.querySelector(".tp-upload-btn").classList.remove("over"),p.currentTarget.classList.remove("over")})}),K.addEventListener("dragover",o=>{o.preventDefault(),o.currentTarget.querySelector(".tp-upload-btn").classList.add("over"),o.currentTarget.classList.add("over")}),K.addEventListener("drop",o=>{o.preventDefault(),o.currentTarget.querySelector(".tp-upload-btn").classList.remove("over"),o.currentTarget.classList.remove("over"),o.dataTransfer.items&&[...o.dataTransfer.items].forEach((p,y)=>{if(p.kind==="file"){X(!0);const h=o.currentTarget.querySelector("input[type='file']");h.setAttribute("files",o.dataTransfer.files),h.files=o.dataTransfer.files,h.dispatchEvent(new Event("change",{bubbles:!0}))}})});const he=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));U.hasUsedDnDrop=me,U.setHasUsedDnDrop=X,Object.defineProperty(U,Symbol.toStringTag,{value:"Module"})});
