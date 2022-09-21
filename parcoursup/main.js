// ==UserScript==
// @name         Parcoursup - Mise en lumière dossiers
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       You
// @match        https://gestion.parcoursup.fr/Gestion/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=parcoursup.fr
// @grant        none
// ==/UserScript==

const scriptTag = document.createElement("script");
scriptTag.src =
    "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.mini.min.js";
document.getElementsByTagName("head")[0].appendChild(scriptTag);

const DOM_list_selectors = {
    tableRows: "[data-table-export] tbody tr",
    tableContent: "[data-table-export] tbody",
};
const parcoursupKeyGeneral = "Code candidat bacs généraux";
const parcoursupKeyTechno = "Code candidat Bacs généraux";

const excelToJSON = (file, callback) => {
    const reader = new FileReader();

    let listParcoursupIds = [];
    reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
            type: "binary",
        });

        workbook.SheetNames.forEach((sheetName) => {
            const XL_row_object = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[sheetName]
            );

            listParcoursupIds.push(
                XL_row_object.map((item) =>
                    String(
                        item[parcoursupKeyGeneral] || item[parcoursupKeyTechno]
                    )
                )
            );
        });

        callback(listParcoursupIds.flat());
    };

    reader.onerror = (ex) => {
        alert(ex);
    };

    reader.readAsBinaryString(file);
};

const checkParcouSupId = (rowContent, listIds) => {
    return listIds.some((anId) =>
        rowContent.toLowerCase().includes(anId.toLowerCase())
    );
};

const highlightRows = (listIds) => {
    if (!listIds) {
        return;
    }

    window.localStorage.setItem("parcoursupListIds", JSON.stringify(listIds));
    document.querySelectorAll(DOM_list_selectors.tableRows).forEach((item) => {
        if (checkParcouSupId(item.textContent, listIds)) {
            item.style.backgroundColor = "lavender";
            item.style.outline = "1px solid green";
        }
    });
};

const handleFileSelect = (evt) => {
    const files = evt.target.files;
    excelToJSON(files[0], highlightRows);
    document.querySelector(DOM_list_selectors.tableContent).scrollIntoView();
};

const clearCachedData = () => {
    alert("Données du cache supprimées");
    window.localStorage.removeItem("parcoursupListIds");
    // window.location.reload();
};

document.addEventListener(
    "change",
    function (evt) {
        for (
            let target = evt.target;
            target && target != this;
            target = target.parentNode
        ) {
            if (target.matches("[data-file]")) {
                handleFileSelect.call(target, evt);
                break;
            }
        }
    },
    false
);

document.addEventListener(
    "click",
    function (evt) {
        for (
            let target = evt.target;
            target && target != this;
            target = target.parentNode
        ) {
            if (target && target.matches("[data-btn-clear]")) {
                clearCachedData.call(target, evt);
                break;
            }
        }
    },
    false
);

const inputFileTpl = `
    <section style="
        padding: 0.5rem; background-color: honeydew;
        font-size: 1.5rem;
        font-family: Arial, sans-serif;
        width: fit-content;
    ">
        <form>
            <fieldset>
                <label for="file">Sélectionner votre fichier xlsx :</label>
                <input id="file" type="file" data-file accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
            </fieldset>
            <fieldset>
            <p style="font-size: 0.95rem">Permet juste de supprimer le contenu du cache local. Le cache navigateur est utilisé pour garder les données d'une page à l'autre</p>
                <button data-btn-clear type="button">Supprimer les données mise en cache</button>
            </fieldset>
        </form>
    </section>
`;

(() => {
    highlightRows(JSON.parse(window.localStorage.getItem("parcoursupListIds")));

    var observer = new MutationObserver(function (e) {
        highlightRows(
            JSON.parse(window.localStorage.getItem("parcoursupListIds"))
        );
    });

    observer.observe(document.querySelector(DOM_list_selectors.tableContent), {
        characterData: true,
        childList: true,
    });

    const body = document.querySelector("body");
    body.insertAdjacentHTML("beforebegin", inputFileTpl);
})();
