// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.cyu.fr/
// @version      1.2.0
// @description  Remplissage des notes sur Scodoc depuis un fichier .csv
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.cyu.fr/*
// @grant        none
// @date         17/10/2024
// ==/UserScript==
/* eslint-disable */
                
(function(z,R){typeof exports=="object"&&typeof module<"u"?R(exports):typeof define=="function"&&define.amd?define(["exports"],R):(z=typeof globalThis<"u"?globalThis:z||self,R(z.ScodocFillingGrades={}))})(this,function(z){"use strict";var R=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function re(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var I={exports:{}};(function(o,m){(function(){var N="We could not detect the separator.",v="Empty CSV. Please provide something.",E="Could not detect header. Ensure first row cotains your column headers.",S=[",",";","	"],_={",":"comma",";":"semicolon","	":"tab"};function H(u){var c={},s;return S.forEach(function(i,p){var e=new RegExp(i,"g");c[i]=(u.match(e)||[]).length,s=!s||c[i]>c[s]?i:s}),s}function b(){var u=[].slice.call(arguments),c=u.reduce(function(s,i){return s.length>i.length?s:i},[]);return c.map(function(s,i){return u.map(function(p){return p[i]})})}function G(u){for(var c={},s=0;s<u.length;s++){var i=u[s];c[i]===void 0?c[i]=0:c[i]++}for(var p=[],s=u.length-1;s>=0;s--){var i=u[s];c[i]>0&&(i=i+"__"+c[i]--),p.unshift(i)}return p}function F(u,c){if(c||(c={}),u.length==0)throw v;var s=c.separator||H(u);if(!s)throw N;var i=[];try{var i=j.parse(u,_[s])}catch(D){var p=u.lastIndexOf(`
`,D.offset),e=u.indexOf(`
`,D.offset),L=u.substring(p>=-1?p:0,e>-1?e:u.length);throw D.message+" On line "+D.line+" and column "+D.column+`.
`+L}c.transpose&&(i=b.apply(this,i));var y=i.shift();if(y.length==0)throw E;y=y.map(function(D){return D.trim().replace(/(^")|("$)/g,"")}),y=G(y);for(var d=c.hash?{}:[],M=0;M<i.length;M++){for(var C={},B,k=0;k<y.length;k++){var T=(i[M][k]||"").trim().replace(/(^")|("$)/g,""),P=T===""?NaN:T-0;if(c.hash&&k==0)B=T;else if(c.parseJSON||c.parseNumbers&&!isNaN(P))try{C[y[k]]=JSON.parse(T)}catch{C[y[k]]=T}else C[y[k]]=T}c.hash?d[B]=C:d.push(C)}return d}var j=function(){function u(s){return'"'+s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var c={parse:function(s,i){var p={comma:M,semicolon:C,tab:B,sv:k,line:T,field:P,char:D};if(i!==void 0){if(p[i]===void 0)throw new Error("Invalid rule name: "+u(i)+".")}else i="comma";var e=0,L=0,y=[];function d(n){e<L||(e>L&&(L=e,y=[]),y.push(n))}function M(){var n,t,r,l;return r=e,l=e,n=function(a){return U=","}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a,h){return h}(r,n[1])),n===null&&(e=r),n}function C(){var n,t,r,l;return r=e,l=e,n=function(a){return U=";"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a,h){return h}(r,n[1])),n===null&&(e=r),n}function B(){var n,t,r,l;return r=e,l=e,n=function(a){return U="	"}()?"":null,n!==null?(t=k(),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a,h){return h}(r,n[1])),n===null&&(e=r),n}function k(){var n,t,r,l,a,h,g,f,x;for(h=e,g=e,n=[],/^[\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,d("[\\n\\r]"));t!==null;)n.push(t),/^[\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,d("[\\n\\r]"));if(n!==null)if(t=T(),t!==null){if(r=[],f=e,x=e,/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,d("[\\n\\r]")),a!==null)for(l=[];a!==null;)l.push(a),/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,d("[\\n\\r]"));else l=null;for(l!==null?(a=T(),a!==null?l=[l,a]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(O,w){return w}(f,l[1])),l===null&&(e=f);l!==null;){if(r.push(l),f=e,x=e,/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,d("[\\n\\r]")),a!==null)for(l=[];a!==null;)l.push(a),/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,d("[\\n\\r]"));else l=null;l!==null?(a=T(),a!==null?l=[l,a]:(l=null,e=x)):(l=null,e=x),l!==null&&(l=function(O,w){return w}(f,l[1])),l===null&&(e=f)}if(r!==null){for(l=[],/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,d("[\\n\\r]"));a!==null;)l.push(a),/^[\n\r]/.test(s.charAt(e))?(a=s.charAt(e),e++):(a=null,d("[\\n\\r]"));l!==null?n=[n,t,r,l]:(n=null,e=g)}else n=null,e=g}else n=null,e=g;else n=null,e=g;return n!==null&&(n=function(O,w,q){return q.unshift(w),q}(h,n[1],n[2])),n===null&&(e=h),n}function T(){var n,t,r,l,a,h,g,f,x;if(h=e,g=e,n=P(),n!==null){for(t=[],f=e,x=e,s.length>e?(r=s.charAt(e),e++):(r=null,d("any character")),r!==null?(l=function(O,w){return w==U}(e,r)?"":null,l!==null?(a=P(),a!==null?r=[r,l,a]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(O,w,q){return q}(f,r[0],r[2])),r===null&&(e=f);r!==null;)t.push(r),f=e,x=e,s.length>e?(r=s.charAt(e),e++):(r=null,d("any character")),r!==null?(l=function(O,w){return w==U}(e,r)?"":null,l!==null?(a=P(),a!==null?r=[r,l,a]:(r=null,e=x)):(r=null,e=x)):(r=null,e=x),r!==null&&(r=function(O,w,q){return q}(f,r[0],r[2])),r===null&&(e=f);t!==null?(r=function(O,w,q){return!!w||q.length}(e,n,t)?"":null,r!==null?n=[n,t,r]:(n=null,e=g)):(n=null,e=g)}else n=null,e=g;return n!==null&&(n=function(O,w,q){return q.unshift(w),q}(h,n[0],n[1])),n===null&&(e=h),n}function P(){var n,t,r,l,a,h;if(l=e,a=e,s.charCodeAt(e)===34?(n='"',e++):(n=null,d('"\\""')),n!==null){for(t=[],r=D();r!==null;)t.push(r),r=D();t!==null?(s.charCodeAt(e)===34?(r='"',e++):(r=null,d('"\\""')),r!==null?n=[n,t,r]:(n=null,e=a)):(n=null,e=a)}else n=null,e=a;if(n!==null&&(n=function(g,f){return f.join("")}(l,n[1])),n===null&&(e=l),n===null){for(l=e,n=[],a=e,h=e,/^[^\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,d("[^\\n\\r]")),t!==null?(r=function(g,f){return f!=U}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=h)):(t=null,e=h),t!==null&&(t=function(g,f){return f}(a,t[0])),t===null&&(e=a);t!==null;)n.push(t),a=e,h=e,/^[^\n\r]/.test(s.charAt(e))?(t=s.charAt(e),e++):(t=null,d("[^\\n\\r]")),t!==null?(r=function(g,f){return f!=U}(e,t)?"":null,r!==null?t=[t,r]:(t=null,e=h)):(t=null,e=h),t!==null&&(t=function(g,f){return f}(a,t[0])),t===null&&(e=a);n!==null&&(n=function(g,f){return f.join("")}(l,n)),n===null&&(e=l)}return n}function D(){var n,t,r,l;return r=e,l=e,s.charCodeAt(e)===34?(n='"',e++):(n=null,d('"\\""')),n!==null?(s.charCodeAt(e)===34?(t='"',e++):(t=null,d('"\\""')),t!==null?n=[n,t]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(a){return'"'}()),n===null&&(e=r),n===null&&(/^[^"]/.test(s.charAt(e))?(n=s.charAt(e),e++):(n=null,d('[^"]'))),n}function me(n){n.sort();for(var t=null,r=[],l=0;l<n.length;l++)n[l]!==t&&(r.push(n[l]),t=n[l]);return r}function he(){for(var n=1,t=1,r=!1,l=0;l<Math.max(e,L);l++){var a=s.charAt(l);a===`
`?(r||n++,t=1,r=!1):a==="\r"||a==="\u2028"||a==="\u2029"?(n++,t=1,r=!0):(t++,r=!1)}return{line:n,column:t}}var U=",",ee=p[i]();if(ee===null||e!==s.length){var Q=Math.max(e,L),ve=Q<s.length?s.charAt(Q):null,ne=he();throw new this.SyntaxError(me(y),ve,Q,ne.line,ne.column)}return ee},toSource:function(){return this._source}};return c.SyntaxError=function(s,i,p,e,L){function y(d,M){var C,B;switch(d.length){case 0:C="end of input";break;case 1:C=d[0];break;default:C=d.slice(0,d.length-1).join(", ")+" or "+d[d.length-1]}return B=M?u(M):"end of input","Expected "+C+" but "+B+" found."}this.name="SyntaxError",this.expected=s,this.found=i,this.message=y(s,i),this.offset=p,this.line=e,this.column=L},c.SyntaxError.prototype=Error.prototype,c}();o.exports&&(m=o.exports=F),m.csv2json=F}).call(R)})(I,I.exports);var te=I.exports;const le=re(te);let V=["Nom","Prénom","Notes"],$=[];const se=o=>new Promise(m=>setTimeout(m,o)),A={listGradesRows:Array.from(document.querySelectorAll("tr.etud_elem")),formContainer:document.getElementById("tp-ext-form-container"),maxGrade:document.querySelector(".tf-ro-field.formnote_bareme")},Y=["","abs","exc"],ae=async(o,m)=>{m.uploadBtn.disabled=!0;const N=V[0],v=V[1],E=V[2],S=/[\u0300-\u036f]/g;for(const _ of o){await se(0);const H=m.listGradesRows.find(G=>{const F=G.getElementsByClassName("tf-fieldlabel")[0];if(!F)return;const j=F.textContent.normalize("NFD").replaceAll(S,"").replaceAll("-"," ").toLowerCase(),u=_[N].normalize("NFD").replaceAll(S,"").replaceAll("-"," ").toLowerCase(),s=_[v].normalize("NFD").replaceAll(S,"").replaceAll("-"," ").toLowerCase().split(" ").some(p=>j.includes(p)),i=u.split(" ").some(p=>j.includes(p));return s&&i});if(!H){$.push(`${_[N]} ${_[v]}`);continue}const b=H.querySelector('input[class^="note"]');if(b){document.body.click();const G=String(_[E]).replace(",","."),F=Number.isNaN(Number(G)),j=!F,u=F?_[E]:Number(G);b.focus(),j&&(Y.includes(b.value.trim().toLowerCase())||u>b.value)&&(b.value=u),b.setAttribute("data-modified",!0),write_on_blur==null||write_on_blur(b),b.style.backgroundColor="#DAEBD6B9"}}},J=()=>{document.querySelector("#grades_file").value="",A.firstStep.style.display="block",A.resetContainer.style.display="none"},oe=o=>{const m=o.maxGrade.textContent.match(/\d+(\.\d+)?/)[0],v=V.find(E=>E.toLowerCase().includes("note")).replace(",",".").match(/\d+(\.\d+)?/)[0];return{isMatching:Number(v)===Number(m),scodocMaxGrade:m,fileMaxGrade:v}},ie=({target:o,valForMissingGrade:m,dom:N})=>{const v=o.target.files[0],E=v.name,S=E.lastIndexOf("."),_=["csv"],H=E.substring(S+1);if(!_.includes(H)){alert(`Votre fichier n'est pas au format ${_.join(" ou ")}`);return}const b=new FileReader;b.onload=G=>{try{new TextDecoder("utf8",{fatal:!0}).decode(G.target.result)}catch{alert("Votre fichier doit être encodé en UTF-8. Veuillez effectuer ce changement."),J();return}b.readAsText(v),b.onload=async F=>{let j=le(F.target.result,{parseNumbers:!0});if(j.some(p=>Object.keys(p).length!==3)){alert("Votre fichier ne contient pas que trois colonnes.");return}V=Object.keys(j[0]);const u=oe(N);if(!u.isMatching){alert(`
La note maximale de votre évaluation sur ScoDoc (/${Number(u.scodocMaxGrade)}) ne correspond pas à la note maximale de votre fichier d'évaluation (/${Number(u.fileMaxGrade)}).

Soit votre évaluation n'a pas la bonne note maximale sur ScoDoc soit vous n'entrez pas les notes de la bonne évaluation sur ScoDoc.
                `),J();return}$=[],await ae(j,N);const c=document.querySelector("[data-template-id='unknown-student']"),s=document.querySelector("[data-list-unknown-students]");s.replaceChildren();const i=document.querySelector("[data-nb-unknown-students]");i.textContent=$.length,$.forEach(p=>{const e=c.content.cloneNode(!0);e.querySelector("li").textContent=p,s.append(e)}),Array.from(document.querySelectorAll(".note")).forEach(p=>{Y.includes(p.value.trim().toLowerCase())&&(p.value=m)}),A.uploadBtn.disabled=!1,A.firstStep.style.display="none",A.resetContainer.style.display="block"}},b.readAsArrayBuffer(v)},K=(o,m,N,v)=>{o.addEventListener(m,function(E){let S=E.target;for(;S&&S!==this;)S.matches(N)&&v.call(S,E),S=S.parentNode})},ue=()=>{document.querySelectorAll("[data-etudid]").forEach(o=>{o.setAttribute("data-modified","true"),write_on_blur==null||write_on_blur(o)})},ce=`<style>\r
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
\r
    .tp-list-infos {\r
        margin-top: 0.35rem;\r
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
            <details style="margin-bottom: 1rem">\r
                <summary>\r
                    Liste des étudiants inconnus (<span\r
                        data-nb-unknown-students\r
                    ></span\r
                    >)\r
                </summary>\r
                <ul class="tp-list-infos" data-list-unknown-students=""></ul>\r
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
`,de={name:"scodoc-remplisseur-automatique-notes",version:"1.2.0",description:"",main:"src/index.js",scripts:{build:"vite build",start:"vite",dev:"vite",release:"standard-version"},keywords:[],author:"",license:"ISC",devDependencies:{"csvjson-csv2json":"^5.0.6",encoding:"^0.1.13","standard-version":"^9.5.0",vite:"^4.4.11"},"standard-version":{scripts:{precommit:"vite build"}}};let Z=!1;const fe=()=>Z,W=o=>Z=o;(async function(){if(A.listGradesRows.length===0&&!A.formContainer)return;document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",ce),A.dragAndDropArea=document.querySelector("[data-drag-n-drop-area]"),A.resetContainer=document.querySelector("[data-restart-upload-container]"),A.firstStep=document.querySelector("[data-first-step]"),A.uploadBtn=document.querySelector("[data-upload-btn]"),A.resetContainer.style.display="none",document.querySelector("[data-project-name]").textContent+=` v${de.version}`,await Promise.resolve().then(()=>pe),K(document,"change","#grades_file",m=>{document.querySelectorAll("[data-etudid]").forEach(v=>{v.style.backgroundColor=""});const N=document.querySelector('input[name="empty_val"]:checked').value||"ABS";ie({target:m,valForMissingGrade:N,dom:A})}),K(document,"click","[data-restart]",()=>{W(!1),J()}),K(document,"click","[data-force-save]",()=>{ue()})})();const X=document.querySelector("[data-drag-n-drop-area]");["dragend","dragleave"].forEach(o=>{X.addEventListener(o,m=>{m.preventDefault(),m.currentTarget.querySelector(".tp-upload-btn").classList.remove("over"),m.currentTarget.classList.remove("over")})}),X.addEventListener("dragover",o=>{o.preventDefault(),o.currentTarget.querySelector(".tp-upload-btn").classList.add("over"),o.currentTarget.classList.add("over")}),X.addEventListener("drop",o=>{o.preventDefault(),o.currentTarget.querySelector(".tp-upload-btn").classList.remove("over"),o.currentTarget.classList.remove("over"),o.dataTransfer.items&&[...o.dataTransfer.items].forEach((m,N)=>{if(m.kind==="file"){W(!0);const v=o.currentTarget.querySelector("input[type='file']");v.setAttribute("files",o.dataTransfer.files),v.files=o.dataTransfer.files,v.dispatchEvent(new Event("change",{bubbles:!0}))}})});const pe=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));z.getHasUsedDnDrop=fe,z.setHasUsedDnDrop=W,Object.defineProperty(z,Symbol.toStringTag,{value:"Module"})});
