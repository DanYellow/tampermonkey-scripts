// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.cyu.fr/
// @version      1.1.1
// @description  Remplissage des notes sur Scodoc depuis un fichier .csv
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.cyu.fr/*
// @grant        none
// @date         11/10/2024
// ==/UserScript==
/* eslint-disable */
                
(function(O,R){typeof exports=="object"&&typeof module<"u"?R(exports):typeof define=="function"&&define.amd?define(["exports"],R):(O=typeof globalThis<"u"?globalThis:O||self,R(O.ScodocFillingGrades={}))})(this,function(O){"use strict";var R=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function re(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var I={exports:{}};(function(i,m){(function(){var A="We could not detect the separator.",v="Empty CSV. Please provide something.",E="Could not detect header. Ensure first row cotains your column headers.",S=[",",";","	"],F={",":"comma",";":"semicolon","	":"tab"};function H(u){var c={},a;return S.forEach(function(o,p){var e=new RegExp(o,"g");c[o]=(u.match(e)||[]).length,a=!a||c[o]>c[a]?o:a}),a}function b(){var u=[].slice.call(arguments),c=u.reduce(function(a,o){return a.length>o.length?a:o},[]);return c.map(function(a,o){return u.map(function(p){return p[o]})})}function M(u){for(var c={},a=0;a<u.length;a++){var o=u[a];c[o]===void 0?c[o]=0:c[o]++}for(var p=[],a=u.length-1;a>=0;a--){var o=u[a];c[o]>0&&(o=o+"__"+c[o]--),p.unshift(o)}return p}function _(u,c){if(c||(c={}),u.length==0)throw v;var a=c.separator||H(u);if(!a)throw A;var o=[];try{var o=q.parse(u,F[a])}catch(D){var p=u.lastIndexOf(`
`,D.offset),e=u.indexOf(`
`,D.offset),G=u.substring(p>=-1?p:0,e>-1?e:u.length);throw D.message+" On line "+D.line+" and column "+D.column+`.
`+G}c.transpose&&(o=b.apply(this,o));var y=o.shift();if(y.length==0)throw E;y=y.map(function(D){return D.trim().replace(/(^")|("$)/g,"")}),y=M(y);for(var f=c.hash?{}:[],L=0;L<o.length;L++){for(var C={},U,k=0;k<y.length;k++){var T=(o[L][k]||"").trim().replace(/(^")|("$)/g,""),P=T===""?NaN:T-0;if(c.hash&&k==0)U=T;else if(c.parseJSON||c.parseNumbers&&!isNaN(P))try{C[y[k]]=JSON.parse(T)}catch{C[y[k]]=T}else C[y[k]]=T}c.hash?f[U]=C:f.push(C)}return f}var q=function(){function u(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var c={parse:function(a,o){var p={comma:L,semicolon:C,tab:U,sv:k,line:T,field:P,char:D};if(o!==void 0){if(p[o]===void 0)throw new Error("Invalid rule name: "+u(o)+".")}else o="comma";var e=0,G=0,y=[];function f(n){e<G||(e>G&&(G=e,y=[]),y.push(n))}function L(){var n,t,r,l;return r=e,l=e,n=function(s){return B=","}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,h){return h}(r,n[1])),n===null&&(e=r),n}function C(){var n,t,r,l;return r=e,l=e,n=function(s){return B=";"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,h){return h}(r,n[1])),n===null&&(e=r),n}function U(){var n,t,r,l;return r=e,l=e,n=function(s){return B="	"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,h){return h}(r,n[1])),n===null&&(e=r),n}function k(){var n,t,r,l,s,h,g,d,x;for(h=e,g=e,n=[],/^[\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,f("[\\n\\r]"));t!==null;)n.push(t),/^[\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,f("[\\n\\r]"));if(n!==null)if(t=T(),t!==null){if(r=[],d=e,x=e,/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,f("[\\n\\r]")),s!==null)for(l=[];s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,f("[\\n\\r]"));else l=null;for(l!==null?(s=T(),s!==null?l=[l,s]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(z,w){return w}(d,l[1])),l===null&&(e=d);l!==null;){if(r.push(l),d=e,x=e,/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,f("[\\n\\r]")),s!==null)for(l=[];s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,f("[\\n\\r]"));else l=null;l!==null?(s=T(),s!==null?l=[l,s]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(z,w){return w}(d,l[1])),l===null&&(e=d)}if(r!==null){for(l=[],/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,f("[\\n\\r]"));s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,f("[\\n\\r]"));l!==null?n=[n,t,r,l]:(n=null,e=g)}else n=null,e=g}else n=null,e=g;else n=null,e=g;return n!==null&&(n=function(z,w,j){return j.unshift(w),j}(h,n[1],n[2])),n===null&&(e=h),n}function T(){var n,t,r,l,s,h,g,d,x;if(h=e,g=e,n=P(),n!==null){for(t=[],d=e,x=e,a.length>e?(r=a.charAt(e),e++):(r=null,f("any character")),r!==null?(l=function(z,w){return w==B}(e,r)?"":null,l!==null?(s=P(),s!==null?r=[r,l,s]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(z,w,j){return j}(d,r[0],r[2])),r===null&&(e=d);r!==null;)t.push(r),d=e,x=e,a.length>e?(r=a.charAt(e),e++):(r=null,f("any character")),r!==null?(l=function(z,w){return w==B}(e,r)?"":null,l!==null?(s=P(),s!==null?r=[r,l,s]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(z,w,j){return j}(d,r[0],r[2])),r===null&&(e=d);t!==null?(r=function(z,w,j){return!!w||j.length}(e,n,t)?"":null,r!==null?n=[n,t,r]:(n=null,e=g)):(n=null,e=g)}else n=null,e=g;return n!==null&&(n=function(z,w,j){return j.unshift(w),j}(h,n[0],n[1])),n===null&&(e=h),n}function P(){var n,t,r,l,s,h;if(l=e,s=e,a.charCodeAt(e)===34?(n='"',e++):(n=null,f('"\\""')),n!==null){for(t=[],r=D();r!==null;)t.push(r),r=D();t!==null?(a.charCodeAt(e)===34?(r='"',e++):(r=null,f('"\\""')),r!==null?n=[n,t,r]:(n=null,e=s)):(n=null,e=s)}else n=null,e=s;if(n!==null&&(n=function(g,d){return d.join("")}(l,n[1])),n===null&&(e=l),n===null){for(l=e,n=[],s=e,h=e,/^[^\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,f("[^\\n\\r]")),t!==null?(r=function(g,d){return d!=B}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=h)):(t=null,e=h),t!==null&&(t=function(g,d){return d}(s,t[0])),t===null&&(e=s);t!==null;)n.push(t),s=e,h=e,/^[^\n\r]/.test(a.charAt(e))?(t=a.charAt(e),e++):(t=null,f("[^\\n\\r]")),t!==null?(r=function(g,d){return d!=B}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=h)):(t=null,e=h),t!==null&&(t=function(g,d){return d}(s,t[0])),t===null&&(e=s);n!==null&&(n=function(g,d){return d.join("")}(l,n)),n===null&&(e=l)}return n}function D(){var n,t,r,l;return r=e,l=e,a.charCodeAt(e)===34?(n='"',e++):(n=null,f('"\\""')),n!==null?(a.charCodeAt(e)===34?(t='"',e++):(t=null,f('"\\""')),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s){return'"'}()),n===null&&(e=r),n===null&&(/^[^"]/.test(a.charAt(e))?(n=a.charAt(e),e++):(n=null,f('[^"]'))),n}function pe(n){n.sort();for(var t=null,r=[],l=0;l<n.length;l++)n[l]!==t&&(r.push(n[l]),t=n[l]);return r}function me(){for(var n=1,t=1,r=!1,l=0;l<Math.max(e,G);l++){var s=a.charAt(l);s===`
`?(r||n++,t=1,r=!1):s==="\r"||s==="\u2028"||s==="\u2029"?(n++,t=1,r=!0):(t++,r=!1)}return{line:n,column:t}}var B=",",ee=p[o]();if(ee===null||e!==a.length){var Q=Math.max(e,G),he=Q<a.length?a.charAt(Q):null,ne=me();throw new this.SyntaxError(pe(y),he,Q,ne.line,ne.column)}return ee},toSource:function(){return this._source}};return c.SyntaxError=function(a,o,p,e,G){function y(f,L){var C,U;switch(f.length){case 0:C="end of input";break;case 1:C=f[0];break;default:C=f.slice(0,f.length-1).join(", ")+" or "+f[f.length-1]}return U=L?u(L):"end of input","Expected "+C+" but "+U+" found."}this.name="SyntaxError",this.expected=a,this.found=o,this.message=y(a,o),this.offset=p,this.line=e,this.column=G},c.SyntaxError.prototype=Error.prototype,c}();i.exports&&(m=i.exports=_),m.csv2json=_}).call(R)})(I,I.exports);var te=I.exports;const le=re(te);let $=["Nom","Prénom","Notes"],V=[];const ae=i=>new Promise(m=>setTimeout(m,i)),N={listGradesRows:Array.from(document.querySelectorAll("tr.etud_elem")),formContainer:document.getElementById("tp-ext-form-container"),maxGrade:document.querySelector(".tf-ro-field.formnote_bareme")},se=async(i,m)=>{const A=$[0],v=$[1],E=$[2],S=/[\u0300-\u036f]/g;for(const F of i){await ae(0);const H=m.listGradesRows.find(M=>{const _=M.getElementsByClassName("tf-fieldlabel")[0];if(!_)return;const q=_.textContent.normalize("NFD").replaceAll(S,"").replaceAll("-"," ").toLowerCase(),u=F[A].normalize("NFD").replaceAll(S,"").replaceAll("-"," ").toLowerCase(),a=F[v].normalize("NFD").replaceAll(S,"").replaceAll("-"," ").toLowerCase().split(" ").some(p=>q.includes(p)),o=u.split(" ").some(p=>q.includes(p));return a&&o});if(!H){V.push(`${F[A]} ${F[v]}`);continue}const b=H.querySelector('input[class^="note"]');if(b){document.body.click();const M=String(F[E]).replace(",","."),_=Number.isNaN(Number(M)),q=!_,u=_?F[E]:Number(M);b.focus(),q&&(!b.value.trim()||u>b.value)&&(b.value=u),b.setAttribute("data-modified",!0),write_on_blur==null||write_on_blur(b),b.style.backgroundColor="#DAEBD6B9"}}},J=()=>{document.querySelector("#grades_file").value="",N.firstStep.style.display="block",N.resetContainer.style.display="none"},oe=i=>{const m=i.maxGrade.textContent.match(/\d+(\.\d+)?/)[0],v=$.find(E=>E.toLowerCase().includes("note")).replace(",",".").match(/\d+(\.\d+)?/)[0];return{isMatching:Number(v)===Number(m),scodocMaxGrade:m,fileMaxGrade:v}},ie=({target:i,valForMissingGrade:m,dom:A})=>{const v=i.target.files[0],E=v.name,S=E.lastIndexOf("."),F=["csv"],H=E.substring(S+1);if(!F.includes(H)){alert(`Votre fichier n'est pas au format ${F.join(" ou ")}`);return}const b=new FileReader;b.onload=M=>{try{new TextDecoder("utf8",{fatal:!0}).decode(M.target.result)}catch{alert("Votre fichier doit être encodé en UTF-8. Veuillez effectuer ce changement."),J();return}b.readAsText(v),b.onload=async _=>{let q=le(_.target.result,{parseNumbers:!0});if(q.some(p=>Object.keys(p).length!==3)){alert("Votre fichier ne contient pas que trois colonnes.");return}$=Object.keys(q[0]);const u=oe(A);if(!u.isMatching){alert(`
La note maximale de votre évaluation sur ScoDoc (/${Number(u.scodocMaxGrade)}) ne correspond pas à la note maximale de votre fichier d'évaluation (/${Number(u.fileMaxGrade)}).

Soit votre évaluation n'a pas la bonne note maximale sur ScoDoc soit vous n'entrez pas les notes de la bonne évaluation sur ScoDoc.
                `),J();return}V=[],await se(q,A);const c=document.querySelector("[data-template-id='unknown-student']"),a=document.querySelector("[data-list-unknown-students]");a.replaceChildren();const o=document.querySelector("[data-nb-unknown-students]");o.textContent=V.length,V.forEach(p=>{const e=c.content.cloneNode(!0);e.querySelector("li").textContent=p,a.append(e)}),Array.from(document.querySelectorAll(".note")).forEach(p=>{p.value.trim()===""&&(p.value=m)}),N.firstStep.style.display="none",N.resetContainer.style.display="block",Z()&&(N.resetContainer.querySelector("[data-force-save]").style.display="inline-block")}},b.readAsArrayBuffer(v)},K=(i,m,A,v)=>{i.addEventListener(m,function(E){let S=E.target;for(;S&&S!==this;)S.matches(A)&&v.call(S,E),S=S.parentNode})},ue=()=>{document.querySelectorAll("[data-etudid]").forEach(i=>{i.setAttribute("data-modified","true"),write_on_blur==null||write_on_blur(i)})},ce=`<style>\r
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
    }\r
\r
    .tp-ext-form-title {\r
        font-weight: bold;\r
        border: 0;\r
        margin-bottom: 0;\r
        width: auto;\r
        font-size: 1.05rem;\r
        padding: 0 0.5rem;\r
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
    }\r
\r
    .tp-upload-area.over {\r
        border-color: rgb(29 78 216);\r
    }\r
\r
    .tp-upload-btn {\r
        padding: 0.5rem 1rem;\r
        background-color: rgb(29 78 216);\r
        color: white;\r
        border-radius: 0.5rem;\r
        display: inline-block;\r
        border: none;\r
\r
        input {\r
            width: 0;\r
            height: 0;\r
        }\r
\r
        :hover,\r
        :focus-within,\r
        &.over {\r
            filter: brightness(80%);\r
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
    .tp-force-save-note {\r
        display: block;\r
        font-size: 0.85rem;\r
        font-weight: bold;\r
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
        <ul>\r
            <li>Format de fichier .csv</li>\r
            <li>\r
                Le fichier (.csv)\r
                <span class="tp-text-bold">doit contenir trois colonnes</span>.\r
                La première doit représenter les noms, la seconde les prénoms et\r
                la dernière les notes\r
            </li>\r
        </ul>\r
        <p>A noter :</p>\r
        <ul>\r
            <li>La note la plus haute sera prise en compte</li>\r
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
                <div>\r
                    <p>\r
                        Glissez-déposez votre fichier csv\r
                        <span class="tp-force-save-note"\r
                            >Forcez l'enregistrement après avoir déposé le\r
                            fichier</span\r
                        >\r
                    </p>\r
                    <p>ou</p>\r
                    <label id="grades_field" class="tp-upload-btn">\r
                        <span>Sélectionnez un fichier csv</span>\r
                        <input\r
                            type="file"\r
                            name="grades_file"\r
                            id="grades_file"\r
                            accept=".csv"\r
                        />\r
                    </label>\r
                </div>\r
                <p style="font-size: 0.9rem; margin-top: 1.25rem">\r
                    Fichier .csv encodé UTF-8 uniquement\r
                </p>\r
            </div>\r
        </div>\r
\r
        <div data-restart-upload-container>\r
            <p class="tp-ext-valid-file">Fichier valide. Notes intégrées.</p>\r
            <details style="margin-bottom: 1rem">\r
                <summary>\r
                    Liste des étudiants inconnus (<span\r
                        data-nb-unknown-students\r
                    ></span\r
                    >)\r
                </summary>\r
                <ul data-list-unknown-students=""></ul>\r
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
`,fe={name:"scodoc-remplisseur-automatique-notes",version:"1.1.1",description:"",main:"src/index.js",scripts:{build:"vite build",start:"vite",dev:"vite",release:"standard-version"},keywords:[],author:"",license:"ISC",devDependencies:{"csvjson-csv2json":"^5.0.6",encoding:"^0.1.13","standard-version":"^9.5.0",vite:"^4.4.11"},"standard-version":{scripts:{prebump:"vite build"}}};let Y=!1;const Z=()=>Y,W=i=>Y=i;(async function(){if(N.listGradesRows.length===0&&!N.formContainer)return;document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",ce),N.dragAndDropArea=document.querySelector("[data-drag-n-drop-area]"),N.resetContainer=document.querySelector("[data-restart-upload-container]"),N.firstStep=document.querySelector("[data-first-step]"),N.resetContainer.style.display="none",document.querySelector("[data-project-name]").textContent+=` v${fe.version}`,await Promise.resolve().then(()=>de),K(document,"change","#grades_file",m=>{document.querySelectorAll("[data-etudid]").forEach(v=>{v.style.backgroundColor=""});const A=document.querySelector('input[name="empty_val"]:checked').value||"ABS";ie({target:m,valForMissingGrade:A,dom:N})}),K(document,"click","[data-restart]",()=>{W(!1),J()}),K(document,"click","[data-force-save]",()=>{ue()})})();const X=document.querySelector("[data-drag-n-drop-area]");["dragend","dragleave"].forEach(i=>{X.addEventListener(i,m=>{m.preventDefault(),m.currentTarget.classList.remove("over")})}),X.addEventListener("dragover",i=>{i.preventDefault(),i.currentTarget.classList.add("over")}),X.addEventListener("drop",i=>{i.preventDefault(),i.currentTarget.classList.remove("over"),i.dataTransfer.items&&[...i.dataTransfer.items].forEach((m,A)=>{if(m.kind==="file"){W(!0);const v=i.currentTarget.querySelector("input[type='file']");v.setAttribute("files",i.dataTransfer.files),v.files=i.dataTransfer.files,v.dispatchEvent(new Event("change",{bubbles:!0}))}})});const de=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));O.getHasUsedDnDrop=Z,O.setHasUsedDnDrop=W,Object.defineProperty(O,Symbol.toStringTag,{value:"Module"})});
