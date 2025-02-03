// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.cyu.fr/
// @version      1.7.0-scodoc
// @description  Remplissage des notes sur Scodoc depuis un fichier .csv
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.cyu.fr/*
// @grant        none
// @date         03/02/2025
// ==/UserScript==
/* eslint-disable */
                
(function(G,$){typeof exports=="object"&&typeof module<"u"?$(exports):typeof define=="function"&&define.amd?define(["exports"],$):(G=typeof globalThis<"u"?globalThis:G||self,$(G.ScodocFillingGrades={}))})(this,function(G){"use strict";function $(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var R={exports:{}},ae=R.exports,Y;function se(){return Y||(Y=1,function(o,m){(function(){var g="We could not detect the separator.",S="Empty CSV. Please provide something.",D="Could not detect header. Ensure first row cotains your column headers.",C=[",",";","	"],M={",":"comma",";":"semicolon","	":"tab"};function z(d){var c={},a;return C.forEach(function(i,h){var e=new RegExp(i,"g");c[i]=(d.match(e)||[]).length,a=!a||c[i]>c[a]?i:a}),a}function y(){var d=[].slice.call(arguments),c=d.reduce(function(a,i){return a.length>i.length?a:i},[]);return c.map(function(a,i){return d.map(function(h){return h[i]})})}function I(d){for(var c={},a=0;a<d.length;a++){var i=d[a];c[i]===void 0?c[i]=0:c[i]++}for(var h=[],a=d.length-1;a>=0;a--){var i=d[a];c[i]>0&&(i=i+"__"+c[i]--),h.unshift(i)}return h}function q(d,c){if(c||(c={}),d.length==0)throw S;var a=c.separator||z(d);if(!a)throw g;var i=[];try{var i=E.parse(d,M[a])}catch(T){var h=d.lastIndexOf(`
`,T.offset),e=d.indexOf(`
`,T.offset),b=d.substring(h>=-1?h:0,e>-1?e:d.length);throw T.message+" On line "+T.line+" and column "+T.column+`.
`+b}c.transpose&&(i=y.apply(this,i));var v=i.shift();if(v.length==0)throw D;v=v.map(function(T){return T.trim().replace(/(^")|("$)/g,"")}),v=I(v);for(var u=c.hash?{}:[],N=0;N<i.length;N++){for(var _={},U,F=0;F<v.length;F++){var j=(i[N][F]||"").trim().replace(/(^")|("$)/g,""),P=j===""?NaN:j-0;if(c.hash&&F==0)U=j;else if(c.parseJSON||c.parseNumbers&&!isNaN(P))try{_[v[F]]=JSON.parse(j)}catch{_[v[F]]=j}else _[v[F]]=j}c.hash?u[U]=_:u.push(_)}return u}var E=function(){function d(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var c={parse:function(a,i){var h={comma:N,semicolon:_,tab:U,sv:F,line:j,field:P,char:T};if(i!==void 0){if(h[i]===void 0)throw new Error("Invalid rule name: "+d(i)+".")}else i="comma";var e=0,b=0,v=[];function u(n){e<b||(e>b&&(b=e,v=[]),v.push(n))}function N(){var n,r,t,l;return t=e,l=e,n=function(s){return B=","}()?"":null,n!==null?(r=F(),r!==null?n=[n,r]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,p){return p}(t,n[1])),n===null&&(e=t),n}function _(){var n,r,t,l;return t=e,l=e,n=function(s){return B=";"}()?"":null,n!==null?(r=F(),r!==null?n=[n,r]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,p){return p}(t,n[1])),n===null&&(e=t),n}function U(){var n,r,t,l;return t=e,l=e,n=function(s){return B="	"}()?"":null,n!==null?(r=F(),r!==null?n=[n,r]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s,p){return p}(t,n[1])),n===null&&(e=t),n}function F(){var n,r,t,l,s,p,x,f,w;for(p=e,x=e,n=[],/^[\n\r]/.test(a.charAt(e))?(r=a.charAt(e),e++):(r=null,u("[\\n\\r]"));r!==null;)n.push(r),/^[\n\r]/.test(a.charAt(e))?(r=a.charAt(e),e++):(r=null,u("[\\n\\r]"));if(n!==null)if(r=j(),r!==null){if(t=[],f=e,w=e,/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]")),s!==null)for(l=[];s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));else l=null;for(l!==null?(s=j(),s!==null?l=[l,s]:(l=null,e=w)):(l=null,e=w),l!==null&&(l=function(O,A){return A}(f,l[1])),l===null&&(e=f);l!==null;){if(t.push(l),f=e,w=e,/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]")),s!==null)for(l=[];s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));else l=null;l!==null?(s=j(),s!==null?l=[l,s]:(l=null,e=w)):(l=null,e=w),l!==null&&(l=function(O,A){return A}(f,l[1])),l===null&&(e=f)}if(t!==null){for(l=[],/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));s!==null;)l.push(s),/^[\n\r]/.test(a.charAt(e))?(s=a.charAt(e),e++):(s=null,u("[\\n\\r]"));l!==null?n=[n,r,t,l]:(n=null,e=x)}else n=null,e=x}else n=null,e=x;else n=null,e=x;return n!==null&&(n=function(O,A,L){return L.unshift(A),L}(p,n[1],n[2])),n===null&&(e=p),n}function j(){var n,r,t,l,s,p,x,f,w;if(p=e,x=e,n=P(),n!==null){for(r=[],f=e,w=e,a.length>e?(t=a.charAt(e),e++):(t=null,u("any character")),t!==null?(l=function(O,A){return A==B}(e,t)?"":null,l!==null?(s=P(),s!==null?t=[t,l,s]:(t=null,e=w)):(t=null,e=w)):(t=null,e=w),t!==null&&(t=function(O,A,L){return L}(f,t[0],t[2])),t===null&&(e=f);t!==null;)r.push(t),f=e,w=e,a.length>e?(t=a.charAt(e),e++):(t=null,u("any character")),t!==null?(l=function(O,A){return A==B}(e,t)?"":null,l!==null?(s=P(),s!==null?t=[t,l,s]:(t=null,e=w)):(t=null,e=w)):(t=null,e=w),t!==null&&(t=function(O,A,L){return L}(f,t[0],t[2])),t===null&&(e=f);r!==null?(t=function(O,A,L){return!!A||L.length}(e,n,r)?"":null,t!==null?n=[n,r,t]:(n=null,e=x)):(n=null,e=x)}else n=null,e=x;return n!==null&&(n=function(O,A,L){return L.unshift(A),L}(p,n[0],n[1])),n===null&&(e=p),n}function P(){var n,r,t,l,s,p;if(l=e,s=e,a.charCodeAt(e)===34?(n='"',e++):(n=null,u('"\\""')),n!==null){for(r=[],t=T();t!==null;)r.push(t),t=T();r!==null?(a.charCodeAt(e)===34?(t='"',e++):(t=null,u('"\\""')),t!==null?n=[n,r,t]:(n=null,e=s)):(n=null,e=s)}else n=null,e=s;if(n!==null&&(n=function(x,f){return f.join("")}(l,n[1])),n===null&&(e=l),n===null){for(l=e,n=[],s=e,p=e,/^[^\n\r]/.test(a.charAt(e))?(r=a.charAt(e),e++):(r=null,u("[^\\n\\r]")),r!==null?(t=function(x,f){return f!=B}(e,r)?"":null,t!==null?r=[r,t]:(r=null,e=p)):(r=null,e=p),r!==null&&(r=function(x,f){return f}(s,r[0])),r===null&&(e=s);r!==null;)n.push(r),s=e,p=e,/^[^\n\r]/.test(a.charAt(e))?(r=a.charAt(e),e++):(r=null,u("[^\\n\\r]")),r!==null?(t=function(x,f){return f!=B}(e,r)?"":null,t!==null?r=[r,t]:(r=null,e=p)):(r=null,e=p),r!==null&&(r=function(x,f){return f}(s,r[0])),r===null&&(e=s);n!==null&&(n=function(x,f){return f.join("")}(l,n)),n===null&&(e=l)}return n}function T(){var n,r,t,l;return t=e,l=e,a.charCodeAt(e)===34?(n='"',e++):(n=null,u('"\\""')),n!==null?(a.charCodeAt(e)===34?(r='"',e++):(r=null,u('"\\""')),r!==null?n=[n,r]:(n=null,e=l)):(n=null,e=l),n!==null&&(n=function(s){return'"'}()),n===null&&(e=t),n===null&&(/^[^"]/.test(a.charAt(e))?(n=a.charAt(e),e++):(n=null,u('[^"]'))),n}function ge(n){n.sort();for(var r=null,t=[],l=0;l<n.length;l++)n[l]!==r&&(t.push(n[l]),r=n[l]);return t}function ye(){for(var n=1,r=1,t=!1,l=0;l<Math.max(e,b);l++){var s=a.charAt(l);s===`
`?(t||n++,r=1,t=!1):s==="\r"||s==="\u2028"||s==="\u2029"?(n++,r=1,t=!0):(r++,t=!1)}return{line:n,column:r}}var B=",",re=h[i]();if(re===null||e!==a.length){var Q=Math.max(e,b),be=Q<a.length?a.charAt(Q):null,le=ye();throw new this.SyntaxError(ge(v),be,Q,le.line,le.column)}return re},toSource:function(){return this._source}};return c.SyntaxError=function(a,i,h,e,b){function v(u,N){var _,U;switch(u.length){case 0:_="end of input";break;case 1:_=u[0];break;default:_=u.slice(0,u.length-1).join(", ")+" or "+u[u.length-1]}return U=N?d(N):"end of input","Expected "+_+" but "+U+" found."}this.name="SyntaxError",this.expected=a,this.found=i,this.message=v(a,i),this.offset=h,this.line=e,this.column=b},c.SyntaxError.prototype=Error.prototype,c}();o.exports&&(m=o.exports=q),m.csv2json=q}).call(ae)}(R,R.exports)),R.exports}var oe=se();const ie=$(oe);let J=["Nom","Prénom","Notes"],H=[],V=[];const k={listGradesRows:Array.from(document.querySelectorAll("tr.etud_elem")),formContainer:document.getElementById("tp-ext-form-container"),maxGrade:document.querySelector(".tf-ro-field.formnote_bareme")},Z=["","abs","exc"],ee=o=>{o.setAttribute("data-modified",!0),typeof write_on_blur<"u"&&write_on_blur(o)},ue=async(o,m,g,S="ABS")=>{m.uploadBtn.inert=!0;const D=J[0],C=J[1],M=J[2],z=/[\u0300-\u036f]/g;for(const y of o){const I=m.listGradesRows.find(E=>{const d=E.getElementsByClassName("tf-fieldlabel")[0];if(!d)return;const c=d.textContent.normalize("NFD").replaceAll(z,"").replaceAll("-"," ").toLowerCase(),a=y[D].normalize("NFD").replaceAll(z,"").replaceAll("-"," ").toLowerCase(),h=y[C].normalize("NFD").replaceAll(z,"").replaceAll("-"," ").toLowerCase().split(" ").some(b=>c.includes(b)),e=a.split(" ").some(b=>c.includes(b));return h&&e});if(!I){H.push(`${y[D].toUpperCase()} ${y[C]}`);continue}const q=I.querySelector('input[class^="note"]');if(q&&y[M]){let E=S;const d=String(y[M]).replace(",","."),c=!Number.isNaN(Number(d));y[M]!==""&&c&&(E=Number(d)),(q.value.trim()===""||c&&(Z.includes(q.value.trim().toLowerCase())||E>q.value&&E<=g||q.value>g))&&(q.value=E,(E>g||E<0)&&V.push(`${y[D].toUpperCase()} ${y[C]}`),ee(q))}}},ne=()=>{document.querySelector("#grades_file").value="",k.firstStep.style.display="block",k.resetContainer.style.display="none"},ce=o=>{var g;return{isMatching:!0,scodocMaxGrade:Number(((g=o.maxGrade.textContent.match(/\d+(\.\d+)?/))==null?void 0:g[0])||20)}},de=({target:o,valForMissingGrade:m,dom:g})=>{const S=o.target.files[0],D=S.name,C=D.lastIndexOf("."),M=["csv"],z=D.substring(C+1);if(!M.includes(z)){alert(`Votre fichier n'est pas au format ${M.join(" ou ")}`);return}const y=new FileReader;y.onload=I=>{try{new TextDecoder("utf8",{fatal:!0}).decode(I.target.result)}catch{alert("Votre fichier doit être encodé en UTF-8. Veuillez effectuer ce changement."),ne();return}y.readAsText(S),y.onload=async q=>{let E=ie(q.target.result,{parseNumbers:!0});if(E.some(u=>Object.keys(u).length!==3)){alert("Votre fichier ne contient pas que trois colonnes.");return}J=Object.keys(E[0]);const d=ce(g);H=[],V=[],await ue(E,g,d.scodocMaxGrade,m);const c=document.querySelector("[data-template-id='unknown-student']"),a=document.querySelector("[data-unknown-students]"),i=a.querySelector("ul");i.replaceChildren();const h=document.querySelector("[data-nb-unknown-students]");h.textContent=H.length,H.length>0?(a.style.display="",H.forEach(u=>{const N=c.content.cloneNode(!0);N.querySelector("li").textContent=u,i.append(N)})):a.style.display="none";const e=document.querySelector("[data-invalid-grades]"),b=e.querySelector("ul");b.replaceChildren();const v=document.querySelector("[data-nb-invalid-grade-students]");v.textContent=V.length,V.length>0?(e.style.display="",V.forEach(u=>{const N=c.content.cloneNode(!0);N.querySelector("li").textContent=u,b.append(N)})):e.style.display="none",Array.from(document.querySelectorAll(".note")).forEach(u=>{Z.includes(u.value.trim().toLowerCase())&&(u.value=m,ee(u))}),k.uploadBtn.inert=!1,k.firstStep.style.display="none",k.resetContainer.style.display="block"}},y.readAsArrayBuffer(S)},W=(o,m,g,S)=>{o.addEventListener(m,function(D){let C=D.target;for(;C&&C!==this;)C.matches(g)&&S.call(C,D),C=C.parentNode})},fe=()=>{document.querySelectorAll("[data-etudid]").forEach(o=>{o.setAttribute("data-modified","true"),write_on_blur==null||write_on_blur(o)})},pe=`<style>
    :root {
        --tamper-white: oklch(100% 0 0);
        --tamper-black: oklch(11.76% 0.0242 0);
        --tamper-primary-cta-bg-color: oklch(48.78% 0.217 264.39);
    }

    .tp-ext-form-container {
        font-family: Helvetica, Arial, sans-serif;
        position: fixed;
        background-color: var(--tamper-white);
        top: 12px;
        right: 10px;
        padding: 1.5em;
        border: 2px solid oklch(32.11% 0 0);
        max-width: 450px;
        overflow: hidden;
        border-radius: 0.35rem;
        max-height: 85vh;
        overflow-y: auto;
        z-index: 9999;

        @media (max-width: 768px) {
            position: static;
            margin: 0.95rem;
            max-width: none;
            max-height: none;
        }
    }

    .tp-ext-form-title {
        font-weight: bold;
        border: 0;
        margin-bottom: 0;
        width: auto;
        font-size: 1.05rem;
        padding: 0 0.5rem;
        background-color: var(--tamper-white);
    }

    .tp-ext-valid-file {
        color: green;
    }

    .tp-ext-empty-values-list-choices {
        display: flex;
        justify-content: space-around;
        list-style-type: none;
        flex-direction: column;
        padding-left: 0;
        margin-bottom: 1.35rem;
        margin-top: 0;
    }

    .tp-text-bold {
        font-weight: bold;
    }

    .tp-ext-form-container-hidden {
        height: 0;
        padding-bottom: 0;
    }

    .tp-upload-area {
        text-align: center;
        padding: 0.75rem;
        border: 2px dashed var(--tamper-black);
        border-radius: 0.35rem;

        &.over {
            border-color: rgb(29 78 216);
        }

        p {
            margin: 0.5rem 0;
        }
    }

    .tp-primary-btn {
        padding: 0.5rem 1rem;
        background-color: var(--tamper-primary-cta-bg-color);
        color: var(--tamper-white);
        border-radius: 0.5rem;
        position: relative;
        border: none;
        display: inline-block;

        input {
            width: 0;
            height: 0;
            position: absolute;
        }

        &:not(:has([inert])) {
            &:hover,
            &:focus-within,
            &.over {
                background-color: oklch(from var(--tamper-primary-cta-bg-color) calc(l * .75) c h);
            }
        }

        &:where([inert]) {
            opacity: 0.7;
        }
    }

    .tp-form-title {
        font-size: 1.15rem;
        font-weight: bold;
        margin: 0.95rem 0 0.35rem;
    }

    .tp-secondary-btn {
        padding: 0.5rem 1rem;
        background-color: oklch(93.4% 0 0);
        color: var(--tamper-black);
        border-radius: 0.5rem;
        display: none;
        border: none;
    }

    .tp-label {
        display: flex;
        gap: 0.6rem;
        font-weight: normal;
    }

    .tp-label input {
        margin: 0;
    }

    .tp-list-infos {
        margin-top: 0.35rem;

        li {
            margin-bottom: 0.15rem;
        }
    }

    .tp-small-text {
        font-size: 0.85rem;
    }
</style>
<form enctype="multipart/form-data; charset=utf-8">
    <fieldset class="tp-ext-form-container" id="tp-ext-form-container">
        <legend class="tp-ext-form-title" data-project-name>
            Remplisseur automatique de notes
        </legend>

        <p style="margin: 0">
            Prenez bien soin à respecter les règles suivantes :
        </p>
        <ul class="tp-list-infos">
            <li>Format de fichier .csv</li>
            <li>
                Le fichier (.csv)
                <span class="tp-text-bold">doit contenir trois colonnes</span>.
                La première doit représenter les noms, la seconde les prénoms et
                la dernière les notes
            </li>
        </ul>
        <p style="margin: 0">A noter :</p>
        <ul class="tp-list-infos">
            <li>La note la plus haute sera prise en compte sauf si elle dépasse la note maximale</li>
            <li>
                Si une absence/note neutralisée/note en attente sera transformée
                en vraie note l'inverse est faux
            </li>
            <li>
                Toute note invalide sera indiquée en "ABS" ou "EXC"
            </li>
            <li class="tp-text-bold">
                Le fichier doit impérativement être encodé en Unicode UTF-8. Sinon ça ne
                fonctionnera pas
            </li>
        </ul>
        <hr />

        <div data-first-step>
            <p class="tp-form-title">Gestion des notes manquantes</p>
            <ul class="tp-ext-empty-values-list-choices">
                <li>
                    <label id="att" class="tp-label">
                        <span>Mettre les notes en absent (ABS)</span>
                        <input
                            type="radio"
                            name="empty_val"
                            id="att"
                            value="ABS"
                            checked
                        />
                    </label>
                </li>
                <li>
                    <label id="exc" class="tp-label">
                        <span>Excuser les notes (EXC)</span>
                        <input
                            type="radio"
                            name="empty_val"
                            id="exc"
                            value="EXC"
                        />
                    </label>
                </li>
            </ul>

            <p class="tp-form-title">Fichier CSV</p>

            <div data-drag-n-drop-area class="tp-upload-area">
                <p>Glissez-déposez votre fichier csv</p>
                <p>ou</p>
                <label id="grades_field" class="tp-primary-btn">
                    <span>Sélectionnez un fichier csv</span>
                    <input
                        type="file"
                        name="grades_file"
                        id="grades_file"
                        accept=".csv"
                        data-upload-btn=""
                    />
                </label>
                <p
                    style="font-size: 0.9rem; margin-top: 1.25rem"
                    class="tp-text-bold"
                >
                    Fichier .csv encodé UTF-8 uniquement
                </p>
            </div>
        </div>

        <div data-restart-upload-container>
            <p class="tp-ext-valid-file">Fichier valide. Notes intégrées.</p>
            <details style="margin-bottom: 1rem" data-unknown-students>
                <summary>
                    Liste des étudiants inconnus (<span
                        data-nb-unknown-students
                    ></span
                    >)
                </summary>
                <ul class="tp-list-infos"></ul>
            </details>

            <details style="margin-bottom: 1rem" data-invalid-grades>
                <summary>
                    Liste des étudiants avec note incorrecte (<span
                        data-nb-invalid-grade-students
                    ></span
                    >)
                </summary>
                <p class="tp-small-text">Ces étudiants ont une note inférieure à 0 ou supérieure à la note maximale définie</p>
                <ul class="tp-list-infos"></ul>
            </details>

            <button type="button" class="tp-primary-btn" data-restart>
                Recommencer
            </button>
            <!--
            <button type="button" class="tp-secondary-btn" data-force-save>
                Forcer l'enregistrement
            </button> -->
        </div>
    </fieldset>
</form>
<template data-template-id="unknown-student">
    <li></li>
</template>
`,me={version:"1.7.0-scodoc"};let te=!1;const he=()=>te,X=o=>te=o;(async function(){if(k.listGradesRows.length===0&&!k.formContainer)return;document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend",pe),k.dragAndDropArea=document.querySelector("[data-drag-n-drop-area]"),k.resetContainer=document.querySelector("[data-restart-upload-container]"),k.firstStep=document.querySelector("[data-first-step]"),k.uploadBtn=document.querySelector("[data-upload-btn]"),k.resetContainer.style.display="none",document.querySelector("[data-project-name]").textContent+=` v${me.version.replace("-scodoc","")}`,await Promise.resolve().then(()=>ve),W(document,"change","#grades_file",m=>{document.querySelectorAll("[data-etudid]").forEach(S=>{S.style.backgroundColor=""});const g=document.querySelector('input[name="empty_val"]:checked').value||"ABS";de({target:m,valForMissingGrade:g,dom:k})}),W(document,"click","[data-restart]",()=>{X(!1),ne()}),W(document,"click","[data-force-save]",()=>{fe()})})();const K=document.querySelector("[data-drag-n-drop-area]");["dragend","dragleave"].forEach(o=>{K.addEventListener(o,m=>{m.preventDefault(),m.currentTarget.querySelector("[data-upload-btn]").classList.remove("over"),m.currentTarget.classList.remove("over")})}),K.addEventListener("dragover",o=>{o.preventDefault(),o.currentTarget.querySelector("[data-upload-btn]").classList.add("over"),o.currentTarget.classList.add("over")}),K.addEventListener("drop",o=>{o.preventDefault(),o.currentTarget.querySelector("[data-upload-btn]").classList.remove("over"),o.currentTarget.classList.remove("over"),o.dataTransfer.items&&[...o.dataTransfer.items].forEach((m,g)=>{if(m.kind==="file"){X(!0);const S=o.currentTarget.querySelector("input[type='file']");S.setAttribute("files",o.dataTransfer.files),S.files=o.dataTransfer.files,S.dispatchEvent(new Event("change",{bubbles:!0}))}})});const ve=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));G.hasUsedDnDrop=he,G.setHasUsedDnDrop=X,Object.defineProperty(G,Symbol.toStringTag,{value:"Module"})});
