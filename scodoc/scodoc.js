// ==UserScript==
// @name         ScoDoc - Remplissage de notes
// @namespace    http://scodoc.iut.u-cergy.fr/
// @version      0.3
// @description  Permet de remplir les notes depuis un fichier .csv ou .json
// @author       IUT CY Paris Université
// @match        http*://scodoc.iut.u-cergy.fr/*
// @grant        none
// ==/UserScript==

const DOM = {
  listGradesRows: Array.from(document.querySelectorAll("tr.etud_elem")),
};

const defalutJSONColumnsNames = ["Nom", "Prénom", "Notes"];
let JSONColumnsNames = defalutJSONColumnsNames;

const fillGrades = (listGrades) => {
  const lastNameKey = JSONColumnsNames[0];
  const firstNameKey = JSONColumnsNames[1];
  const gradesKey = JSONColumnsNames[2];

  listGrades.forEach((item) => {
    const currentStudentRow = DOM.listGradesRows.find((el) => {
      const studentNameCell = el.getElementsByClassName("tf-fieldlabel")[0];
      const cellText = studentNameCell.textContent
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const isFirstNameMatched = cellText.includes(
        item[firstNameKey]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      );
      const isLastNameMatched = cellText.includes(
        item[lastNameKey]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      );

      return isFirstNameMatched && isLastNameMatched;
    });

    if (!currentStudentRow) {
      return;
    }

    const currentInput = currentStudentRow.querySelector(
      'input[class^="note"]'
    );
    if (currentInput) {
      const formattedGrade = item[gradesKey].replace(",", ".");
      const isNotAValidGrade = Number.isNaN(Number(formattedGrade));
      const isAValidGrade = !isNotAValidGrade;

      const grade = isNotAValidGrade ? item[gradesKey] : Number(formattedGrade);
      currentInput.focus();

      const doesNeedToUpdateGrade =
        isAValidGrade && grade < Number(currentInput.value);

      // The current grade is less than the previous one AND it's a number
      // we stop here
      if (doesNeedToUpdateGrade) {
        return;
      }

      if (isAValidGrade) {
        currentInput.value = grade;
      } else {
        currentInput.value = "ATT";
      }
      currentInput.blur();
    }
  });
};

const manageFileUpload = (evtFile) => {
  const file = evtFile.target.files[0];
  const name = file.name;
  const lastDot = name.lastIndexOf(".");
  const allowedFormats = ["csv", "json"];

  const ext = name.substring(lastDot + 1);

  const reader = new FileReader();
  reader.onload = (e) => {
    let listGrades = e.target.result;
    if (allowedFormats.includes(ext)) {
      listGrades = CSVJSON.csv2json(e.target.result, { parseNumbers: true });
    }

    if (listGrades.some((item) => Object.keys(item).length === 3)) {
      JSONColumnsNames = Object.keys(listGrades[0]);

      const scodocReviewMaxGradeSet = document
        .querySelector(".tf-ro-field.formnote_bareme")
        .textContent.match(/\d+(\.\d+)?/)[0];

      const moodleGradeCol = JSONColumnsNames.find((item) =>
        item.toLowerCase().includes("note")
      ).replace(",", ".");
      const moodleReviewMaxGradeSet = moodleGradeCol.match(/\d+(\.\d+)?/)[0];

      if (Number(moodleReviewMaxGradeSet) === Number(scodocReviewMaxGradeSet)) {
        fillGrades(listGrades);
        Array.from(document.querySelectorAll(".note[value='']")).forEach(
          (input) => {
            input.focus();
            input.value = "ATT";
            input.blur();
          }
        );
        document.querySelector("#grades_field").style.display = "none";
        document.querySelector("#restart_container").style.display = "block";
      } else {
        alert(`
            La note maximale de votre évaluation sur ScoDoc (/${Number(scodocReviewMaxGradeSet)}) ne correspond pas à la note maximale de votre évaluation sur Moodle (/${Number(moodleReviewMaxGradeSet)}).\n
            Soit votre évaluation n'a pas la bonne note maximale sur ScoDoc soit vous n'entrez pas les notes de la bonne évaluation sur ScoDoc.
        `);
        resetTpl();
      }
    } else {
      alert("Votre fichier ne contient pas trois colonnes.");
    }
  };
  reader.readAsText(file);
};

const resetTpl = () => {
  document.querySelector("#grades_file").value = "";
  document.querySelector("#grades_field").style.display = "block";
  document.querySelector("#restart_container").style.display = "none";
};

const gradesUploadTpl = `
        <fieldset
          style="
            font-family: Arial, Helvetica, sans-serif;
            position: fixed;
            background-color: white;
            top: 12px;
            right: 10px;
            padding: 1.5em;
            border: 2px solid #333333;
          "
        >
          <legend style="font-weight: bold; border: 0; margin-bottom: 0; width: auto">
            Remplisseur automatique de notes
          </legend>
  
    <p>Prenez bien soin à respecter les règles suivantes :</p>
    <ul style="max-width: 450px;">
      <li>Format de fichier .csv ou .json</li>
      <li>
        Le fichier (.csv ou .json)
        <b>doit contenir trois colonnes</b>. La première doit représenter les noms, la seconde les prénoms et la dernière les notes
      </li>
    </ul>
    <p>A noter : </p>
    <ul style="max-width: 450px;">
      <li>La note la plus haute sera prise en compte</li>
      <li>Si une absence/note neutralisée/note en attente sera transformée en vraie note l'inverse est faux
      </li>
    </ul>
    <label id="grades_field">
      <span>Sélectionnez le fichier de notes</span>
      <input
        type="file"
        name="grades_file"
        id="grades_file"
        accept=".csv, .json"
      />
    </label>
    <p style="color: green; display: none" id="restart_container">
      Fichier valide. Notes intégrées.
      <button type="button" id="restart_btn">Recommencer ?</button>
    </p>
    </fieldset>
    `;

(function (d, script) {
  script = d.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://danyellow.net/csv2json.js";
  d.getElementsByTagName("head")[0].appendChild(script);
})(document);

(function () {
  "use strict";

  if (DOM.listGradesRows.length === 0) {
    return;
  }
  const body = document.querySelector("body");
  body.insertAdjacentHTML("beforeend", gradesUploadTpl);
  document.addEventListener(
    "change",
    function (e) {
      // loop parent nodes from the target to the delegation node
      for (
        var target = e.target;
        target && target != this;
        target = target.parentNode
      ) {
        if (target.matches("#grades_file")) {
          manageFileUpload.call(target, e);
          break;
        }
      }
    },
    false
  );

  document.addEventListener(
    "click",
    function (e) {
      // loop parent nodes from the target to the delegation node
      for (
        var target = e.target;
        target && target != this;
        target = target.parentNode
      ) {
        if (target.matches("#restart_btn")) {
          resetTpl.call(target, e);
          break;
        }
      }
    },
    false
  );
})();
