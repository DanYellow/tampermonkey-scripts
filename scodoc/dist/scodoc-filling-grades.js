// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.cyu.fr/
// @version      1.4.0-scodoc
// @description  Remplissage des notes sur Scodoc depuis un fichier .csv
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.cyu.fr/*
// @grant        none
// @date         17/10/2024
// ==/UserScript==
/* eslint-disable */
                
(function(U,V){typeof exports=="object"&&typeof module<"u"?V(exports):typeof define=="function"&&define.amd?define(["exports"],V):(U=typeof globalThis<"u"?globalThis:U||self,V(U.ScodocFillingGrades={}))})(this,function(U){"use strict";var V=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function te(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var J={exports:{}};(function(i,p){(function(){var b="We could not detect the separator.",h="Empty CSV. Please provide something.",T="Could not detect header. Ensure first row cotains your column headers.",C=[",",";","	"],O={",":"comma",";":"semicolon","	":"tab"};function E(d){var c={},s;return C.forEach(function(o,g){var e=new RegExp(o,"g");c[o]=(d.match(e)||[]).length,s=!s||c[o]>c[s]?o:s}),s}function M(){var d=[].slice.call(arguments),c=d.reduce(function(s,o){return s.length>o.length?s:o},[]);return c.map(function(s,o){return d.map(function(g){return g[o]})})}function F(d){for(var c={},s=0;s<d.length;s++){var o=d[s];c[o]===void 0?c[o]=0:c[o]++}for(var g=[],s=d.length-1;s>=0;s--){var o=d[s];c[o]>0&&(o=o+"__"+c[o]--),g.unshift(o)}return g}function G(d,c){if(c||(c={}),d.length==0)throw h;var s=c.separator||E(d);if(!s)throw b;var o=[];try{var o=D.parse(d,O[s])}catch(_){var g=d.lastIndexOf(`
`,_.offset),e=d.indexOf(`
`,_.offset),N=d.substring(g>=-1?g:0,e>-1?e:d.length);throw _.message+" On line "+_.line+" and column "+_.column+`.
`+N}c.transpose&&(o=M.apply(this,o));var v=o.shift();if(v.length==0)throw T;v=v.map(function(_){return _.trim().replace(/(^")|("$)/g,"")}),v=F(v);for(var u=c.hash?{}:[],S=0;S<o.length;S++){for(var q={},B,k=0;k<v.length;k++){var j=(o[S][k]||"").trim().replace(/(^")|("$)/g,""),P=j===""?NaN:j-0;if(c.hash&&k==0)B=j;else if(c.parseJSON||c.parseNumbers&&!isNaN(P))try{q[v[k]]=JSON.parse(j)}catch{q[v[k]]=j}else q[v[k]]=j}c.hash?u[B]=q:u.push(q)}return u}var D=function(){function d(s){return'"'+s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var c={parse:function(s,o){var g={comma:S,semicolon:q,tab:B,sv:k,line:j,field:P,char:_};if(o!==void 0){if(g[o]===void 0)throw new Error("Invalid rule name: "+d(o)+".")}else o="comma";var e=0,N=0,v=[];function u(n){e<N||(e>N&&(N=e,v=[]),v.push(n))}function S(){var n,t,r,l;return r=e,l=e,n=function(a){return I=","}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a,m){return m}(r,n[1])),n===null&&(e=r),n}function q(){var n,t,r,l;return r=e,l=e,n=function(a){return I=";"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a,m){return m}(r,n[1])),n===null&&(e=r),n}function B(){var n,t,r,l;return r=e,l=e,n=function(a){return I="	"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a,m){return m}(r,n[1])),n===null&&(e=r),n}function k(){var n,t,r,l,a,m,y,f,x;for(m=e,y=e,n=[],/^[\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,u("[\\n\\r]"));t!==null;)n.push(t),/^[\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,u("[\\n\\r]"));if(n!==null)if(t=j(),t!==null){if(r=[],f=e,x=e,/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,u("[\\n\\r]")),a!==null)for(l=[];a!==null;)l.push(a),/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,u("[\\n\\r]"));else l=null;for(l!==null?(a=j(),a!==null?l=[l,a]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(z,w){return w}(f,l[1])),l===null&&(e=f);l!==null;){if(r.push(l),f=e,x=e,/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,u("[\\n\\r]")),a!==null)for(l=[];a!==null;)l.push(a),/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,u("[\\n\\r]"));else l=null;l!==null?(a=j(),a!==null?l=[l,a]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(z,w){return w}(f,l[1])),l===null&&(e=f)}if(r!==null){for(l=[],/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,u("[\\n\\r]"));a!==null;)l.push(a),/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,u("[\\n\\r]"));l!==null?n=[n,t,r,l]:(n=null,e=y)}else n=null,e=y}else n=null,e=y;else n=null,e=y;return n!==null&&(n=function(z,w,L){return L.unshift(w),L}(m,n[1],n[2])),n===null&&(e=m),n}function j(){var n,t,r,l,a,m,y,f,x;if(m=e,y=e,n=P(),n!==null){for(t=[],f=e,x=e,s.length>e?(r=s.charAt(e),e++):(r=null,u("any character")),r!==null?(l=function(z,w){return w==I}(e,r)?"":null,l!==null?(a=P(),a!==null?r=[r,l,a]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(z,w,L){return L}(f,r[0],r[2])),r===null&&(e=f);r!==null;)t.push(r),f=e,x=e,s.length>e?(r=s.charAt(e),e++):(r=null,u("any character")),r!==null?(l=function(z,w){return w==I}(e,r)?"":null,l!==null?(a=P(),a!==null?r=[r,l,a]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(z,w,L){return L}(f,r[0],r[2])),r===null&&(e=f);t!==null?(r=function(z,w,L){return!!w||L.length}(e,n,t)?"":null,r!==null?n=[n,t,r]:(n=null,e=y)):(n=null,e=y)}else n=null,e=y;return n!==null&&(n=function(z,w,L){return L.unshift(w),L}(m,n[0],n[1])),n===null&&(e=m),n}function P(){var n,t,r,l,a,m;if(l=e,a=e,s.charCodeAt(e)===34?(n='"',e++):(n=null,u('"\\""')),n!==null){for(t=[],r=_();r!==null;)t.push(r),r=_();t!==null?(s.charCodeAt(e)===34?(r='"',e++):(r=null,u('"\\""')),r!==null?n=[n,t,r]:(n=null,e=a)):(n=null,e=a)}else n=null,e=a;if(n!==null&&(n=function(y,f){return f.join("")}(l,n[1])),n===null&&(e=l),n===null){for(l=e,n=[],a=e,m=e,/^[^\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,u("[^\\n\\r]")),t!==null?(r=function(y,f){return f!=I}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=m)):(t=null,e=m),t!==null&&(t=function(y,f){return f}(a,t[0])),t===null&&(e=a);t!==null;)n.push(t),a=e,m=e,/^[^\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,u("[^\\n\\r]")),t!==null?(r=function(y,f){return f!=I}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=m)):(t=null,e=m),t!==null&&(t=function(y,f){return f}(a,t[0])),t===null&&(e=a);n!==null&&(n=function(y,f){return f.join("")}(l,n)),n===null&&(e=l)}return n}function _(){var n,t,r,l;return r=e,l=e,s.charCodeAt(e)===34?(n='"',e++):(n=null,u('"\\""')),n!==null?(s.charCodeAt(e)===34?(t='"',e++):(t=null,u('"\\""')),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a){return'"'}()),n===null&&(e=r),n===null&&(/^[^"]/.test(s.charAt(e))?(n=s.charAt(e),e++):(n=null,u('[^"]'))),n}function he(n){n.sort();for(var t=null,r=[],l=0;l<n.length;l++)n[l]!==t&&(r.push(n[l]),t=n[l]);return r}function ge(){for(var n=1,t=1,r=!1,l=0;l<Math.max(e,N);l++){var a=s.charAt(l);a===`
`?(r||n++,t=1,r=!1):a==="\r"||a==="\u2028"||a==="\u2029"?(n++,t=1,r=!0):(t++,r=!1)}return{line:n,column:t}}var I=",",ne=g[o]();if(ne===null||e!==s.length){var Q=Math.max(e,N),ve=Q<s.length?s.charAt(Q):null,re=ge();throw new this.SyntaxError(he(v),ve,Q,re.line,re.column)}return ne},toSource:function(){return this._source}};return c.SyntaxError=function(s,o,g,e,N){function v(u,S){var q,B;switch(u.length){case 0:q="end of input";break;case 1:q=u[0];break;default:q=u.slice(0,u.length-1).join(", ")+" or "+u[u.length-1]}return B=S?d(S):"end of input","Expected "+q+" but "+B+" found."}this.name="SyntaxError",this.expected=s,this.found=o,this.message=v(s,o),this.offset=g,this.line=e,this.column=N},c.SyntaxError.prototype=Error.prototype,c}();i.exports&&(p=i.exports=G),p.csv2json=G}).call(V)})(J,J.exports);var le=J.exports;const se=te(le);let R=["Nom","Prénom","Notes"],$=[],H=[];const ae=i=>new Promise(p=>setTimeout(p,i)),A={listGradesRows:Array.from(document.querySelectorAll("tr.etud_elem")),formContainer:document.getElementById("tp-ext-form-container"),maxGrade:document.querySelector(".tf-ro-field.formnote_bareme")},Y=["","abs","exc"],oe=async(i,p,b)=>{p.uploadBtn.disabled=!0;const h=R[0],T=R[1],C=R[2],O=/[\u0300-\u036f]/g;for(const E of i){await ae(0);const M=p.listGradesRows.find(G=>{const D=G.getElementsByClassName("tf-fieldlabel")[0];if(!D)return;const d=D.textContent.normalize("NFD").replaceAll(O,"").replaceAll("-"," ").toLowerCase(),c=E[h].normalize("NFD").replaceAll(O,"").replaceAll("-"," ").toLowerCase(),o=E[T].normalize("NFD").replaceAll(O,"").replaceAll("-"," ").toLowerCase().split(" ").some(e=>d.includes(e)),g=c.split(" ").some(e=>d.includes(e));return o&&g});if(!M){$.push(`${E[h].toUpperCase()} ${E[T]}`);continue}const F=M.querySelector('input[class^="note"]');if(F){const G=String(E[C]).replace(",","."),D=Number.isNaN(Number(G)),d=!D,c=D?E[C]:Number(G);d&&(Y.includes(F.value.trim().toLowerCase())||c>F.value||F.value>b)&&(F.value=c,(c>b||c<0)&&H.push(`${E[h].toUpperCase()} ${E[T]}`)),F.setAttribute("data-modified",!0),write_on_blur==null||write_on_blur(F)}}},Z=()=>{document.querySelector("#grades_file").value="",A.firstStep.style.display="block",A.resetContainer.style.display="none"},ie=i=>{var b;return{isMatching:!0,scodocMaxGrade:Number(((b=i.maxGrade.textContent.match(/\d+(\.\d+)?/))==null?void 0:b[0])||20)}},ue=({target:i,valForMissingGrade:p,dom:b})=>{const h=i.target.files[0],T=h.name,C=T.lastIndexOf("."),O=["csv"],E=T.substring(C+1);if(!O.includes(E)){alert(`Votre fichier n'est pas au format ${O.join(" ou ")}`);return}const M=new FileReader;M.onload=F=>{try{new TextDecoder("utf8",{fatal:!0}).decode(F.target.result)}catch{alert("Votre fichier doit être encodé en UTF-8. Veuillez effectuer ce changement."),Z();return}M.readAsText(h),M.onload=async G=>{let D=se(G.target.result,{parseNumbers:!0});if(D.some(u=>Object.keys(u).length!==3)){alert("Votre fichier ne contient pas que trois colonnes.");return}R=Object.keys(D[0]);const d=ie(b);$=[],H=[],await oe(D,b,d.scodocMaxGrade);const c=document.querySelector("[data-template-id='unknown-student']"),s=document.querySelector("[data-unknown-students]"),o=s.querySelector("ul");o.replaceChildren();const g=document.querySelector("[data-nb-unknown-students]");g.textContent=$.length,$.length>0?(s.style.display="",$.forEach(u=>{const S=c.content.cloneNode(!0);S.querySelector("li").textContent=u,o.append(S)})):s.style.display="none";const e=document.querySelector("[data-invalid-grades]"),N=e.querySelector("ul");N.replaceChildren();const v=document.querySelector("[data-nb-invalid-grade-students]");v.textContent=H.length,H.length>0?(e.style.display="",H.forEach(u=>{const S=c.content.cloneNode(!0);S.querySelector("li").textContent=u,N.append(S)})):e.style.display="none",Array.from(document.querySelectorAll(".note")).forEach(u=>{Y.includes(u.value.trim().toLowerCase())&&(u.value=p)}),A.uploadBtn.disabled=!1,A.firstStep.style.display="none",A.resetContainer.style.display="block"}},M.readAsArrayBuffer(h)},W=(i,p,b,h)=>{i.addEventListener(p,function(T){let C=T.target;for(;C&&C!==this;)C.matches(b)&&h.call(C,T),C=C.parentNode})},ce=()=>{document.querySelectorAll("[data-etudid]").forEach(i=>{i.setAttribute("data-modified","true"),write_on_blur==null||write_on_blur(i)})},de=`<style>\r
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
    .tp-upload-btn {\r
        padding: 0.5rem 1rem;\r
        background-color: rgb(29 78 216);\r
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
        &:not(:has([disabled])) {\r
            &:hover,\r
            &:focus-within,\r
            &.over {\r
                filter: brightness(80%);\r
            }\r
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
            <li class="tp-text-bold">\r
                Le fichier doit être encodé en Unicode UTF-8. Sinon ça ne\r
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
                <label id="grades_field" class="tp-upload-btn">\r
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
            <button type="button" class="tp-upload-btn" data-restart>\r
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
`,fe={name:"scodoc-remplisseur-automatique-notes",version:"1.4.0-scodoc",description:"",main:"src/index.js",scripts:{build:"vite build",start:"vite",dev:"vite",release:"standard-version"},keywords:[],author:"",license:"ISC",devDependencies:{"csvjson-csv2json":"^5.0.6",encoding:"^0.1.13","standard-version":"^9.5.0",vite:"^4.4.11"}};let ee=!1;const pe=()=>ee,K=i=>ee=i;(async function(){if(A.listGradesRows.length===0&&!A.formContainer)return;document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",de),A.dragAndDropArea=document.querySelector("[data-drag-n-drop-area]"),A.resetContainer=document.querySelector("[data-restart-upload-container]"),A.firstStep=document.querySelector("[data-first-step]"),A.uploadBtn=document.querySelector("[data-upload-btn]"),A.resetContainer.style.display="none",document.querySelector("[data-project-name]").textContent+=` v${fe.version.replace("-scodoc","")}`,await Promise.resolve().then(()=>me),W(document,"change","#grades_file",p=>{document.querySelectorAll("[data-etudid]").forEach(h=>{h.style.backgroundColor=""});const b=document.querySelector('input[name="empty_val"]:checked').value||"ABS";ue({target:p,valForMissingGrade:b,dom:A})}),W(document,"click","[data-restart]",()=>{K(!1),Z()}),W(document,"click","[data-force-save]",()=>{ce()})})();const X=document.querySelector("[data-drag-n-drop-area]");["dragend","dragleave"].forEach(i=>{X.addEventListener(i,p=>{p.preventDefault(),p.currentTarget.querySelector(".tp-upload-btn").classList.remove("over"),p.currentTarget.classList.remove("over")})}),X.addEventListener("dragover",i=>{i.preventDefault(),i.currentTarget.querySelector(".tp-upload-btn").classList.add("over"),i.currentTarget.classList.add("over")}),X.addEventListener("drop",i=>{i.preventDefault(),i.currentTarget.querySelector(".tp-upload-btn").classList.remove("over"),i.currentTarget.classList.remove("over"),i.dataTransfer.items&&[...i.dataTransfer.items].forEach((p,b)=>{if(p.kind==="file"){K(!0);const h=i.currentTarget.querySelector("input[type='file']");h.setAttribute("files",i.dataTransfer.files),h.files=i.dataTransfer.files,h.dispatchEvent(new Event("change",{bubbles:!0}))}})});const me=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));U.hasUsedDnDrop=pe,U.setHasUsedDnDrop=K,Object.defineProperty(U,Symbol.toStringTag,{value:"Module"})});
