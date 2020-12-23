
/* eslint-disable */
// import json2csv from 'csvjson-json2csv';
// const json2csv = require('./csv2json.js');

// console.log('csvjson', json2csv)

const defaultJSONColumnsNames = ['Nom', 'Prénom', 'Notes'];
let JSONColumnsNames = defaultJSONColumnsNames;

const fillGrades = (listGrades, blankVal = "ATT") => {
    const lastNameKey = JSONColumnsNames[0];
    const firstNameKey = JSONColumnsNames[1]; 
    const gradesKey = JSONColumnsNames[2]; 

    listGrades.forEach(item => {
        const currentStudentRow = DOM.listGradesRows.find(el => {
            const studentNameCell = el.getElementsByClassName(
                'tf-fieldlabel'
            )[0];
            const cellText = studentNameCell.textContent
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();
            const isFirstNameMatched = cellText.includes(
                item[firstNameKey]
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
            );
            const isLastNameMatched = cellText.includes(
                item[lastNameKey]
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
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
            const formattedGrade = String(item[gradesKey]).replace(',', '.');
            const isNotAValidGrade = Number.isNaN(Number(formattedGrade));
            const isAValidGrade = !isNotAValidGrade;

            const grade = isNotAValidGrade
                ? item[gradesKey]
                : Number(formattedGrade);
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
                currentInput.value = blankVal;
            }
            currentInput.blur();
        }
    });
};

const resetTpl = () => {
    document.querySelector("#grades_file").value = "";
    document.querySelector("#grades_field").style.display = "block";
    document.querySelector("#restart_container").style.display = "none";
  };
  

export {
    fillGrades,
    resetTpl
};

