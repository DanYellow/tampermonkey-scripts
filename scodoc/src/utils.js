import csv2json from 'csvjson-csv2json';

import { getHasUsedDnDrop } from './index';

const defaultJSONColumnsNames = ['Nom', 'Prénom', 'Notes'];
let JSONColumnsNames = defaultJSONColumnsNames;
let listNonRegisteredStudents = [];

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const DOM = {
    listGradesRows: Array.from(document.querySelectorAll('tr.etud_elem')),
    formContainer: document.getElementById('tp-ext-form-container'),
    maxGrade: document.querySelector('.tf-ro-field.formnote_bareme'),
};

const fillGrades = async (listGrades, dom) => {
    // File headers
    const lastNameKey = JSONColumnsNames[0];
    const firstNameKey = JSONColumnsNames[1];
    const gradesKey = JSONColumnsNames[2];

    const specialCharsRegex = /[\u0300-\u036f]/g;

    for (const item of listGrades) {
        await delay(0);
        const currentStudentRow = dom.listGradesRows.find(el => {
            const studentNameCell =
                el.getElementsByClassName('tf-fieldlabel')[0];

            if (!studentNameCell) {
                return;
            }

            // Data from scodoc
            const cellText = studentNameCell.textContent
                .normalize('NFD')
                .replaceAll(specialCharsRegex, '')
                .replaceAll('-', ' ')
                .toLowerCase();

            const cleanedLastName = item[lastNameKey]
                .normalize('NFD')
                .replaceAll(specialCharsRegex, '')
                .replaceAll('-', ' ')
                .toLowerCase();
            const cleanedFirstName = item[firstNameKey]
                .normalize('NFD')
                .replaceAll(specialCharsRegex, '')
                .replaceAll('-', ' ')
                .toLowerCase();

            const isFirstNameMatched = cleanedFirstName
                .split(' ')
                .some(_item => cellText.includes(_item));
            const isLastNameMatched = cleanedLastName
                .split(' ')
                .some(_item => cellText.includes(_item));

            return isFirstNameMatched && isLastNameMatched;
        });

        if (!currentStudentRow) {
            listNonRegisteredStudents.push(
                `${item[lastNameKey]} ${item[firstNameKey]}`
            );

            continue;
        }

        const currentStudentRowInput = currentStudentRow.querySelector(
            'input[class^="note"]'
        );
        if (currentStudentRowInput) {
            document.body.click();
            const formattedGrade = String(item[gradesKey]).replace(',', '.');
            const isNotAValidGrade = Number.isNaN(Number(formattedGrade));
            const isAValidGrade = !isNotAValidGrade;

            const grade = isNotAValidGrade
                ? item[gradesKey]
                : Number(formattedGrade);
            currentStudentRowInput.focus();

            if (isAValidGrade) {
                if(!currentStudentRowInput.value.trim() || grade > currentStudentRowInput.value) {
                    currentStudentRowInput.value = grade;
                }
            }

            currentStudentRowInput.setAttribute("data-modified", true)
            // function from scodoc
            write_on_blur?.(currentStudentRowInput)
        }
    }
};

const resetTpl = () => {
    document.querySelector('#grades_file').value = '';
    DOM.firstStep.style.display = 'block';
    DOM.resetContainer.style.display = 'none';
};

// We check if the grade set in
const isScodocMaxGradeMatchWithFileMaxGrade = dom => {
    const scodocMaxGrade = dom.maxGrade.textContent.match(/\d+(\.\d+)?/)[0];

    const fileGradeCol = JSONColumnsNames.find(item =>
        item.toLowerCase().includes('note')
    ).replace(',', '.');
    const fileMaxGrade = fileGradeCol.match(/\d+(\.\d+)?/)[0];

    return {
        isMatching: Number(fileMaxGrade) === Number(scodocMaxGrade),
        scodocMaxGrade,
        fileMaxGrade,
    };
};

const manageFileUpload = ({ target: evtFile, valForMissingGrade, dom }) => {
    const file = evtFile.target.files[0];

    const name = file.name;
    const lastDot = name.lastIndexOf('.');
    const listAllowedFormats = ['csv']; // , 'json'

    const ext = name.substring(lastDot + 1);

    if (!listAllowedFormats.includes(ext)) {
        alert(
            `Votre fichier n'est pas au format ${listAllowedFormats.join(
                ' ou '
            )}`
        );
        return;
    }

    const reader = new FileReader();
    reader.onload = eRaw => {
        try {
            new TextDecoder('utf8', { fatal: true }).decode(eRaw.target.result);
        } catch (e) {
            alert(
                'Votre fichier doit être encodé en UTF-8. Veuillez effectuer ce changement.'
            );
            resetTpl();
            return;
        }

        reader.readAsText(file);
        reader.onload = async (e) => {
            let listGrades = csv2json(e.target.result, {
                parseNumbers: true,
            });

            if (listGrades.some(item => Object.keys(item).length !== 3)) {
                alert('Votre fichier ne contient pas que trois colonnes.');
                return;
            }

            JSONColumnsNames = Object.keys(listGrades[0]);

            const gradesComparisonInfos =
                isScodocMaxGradeMatchWithFileMaxGrade(dom);
            if (!gradesComparisonInfos.isMatching) {
                alert(`
La note maximale de votre évaluation sur ScoDoc (/${Number(
                    gradesComparisonInfos.scodocMaxGrade
                )}) ne correspond pas à la note maximale de votre fichier d'évaluation (/${Number(
                    gradesComparisonInfos.fileMaxGrade
                )}).\n
Soit votre évaluation n'a pas la bonne note maximale sur ScoDoc soit vous n'entrez pas les notes de la bonne évaluation sur ScoDoc.
                `);
                resetTpl();
                return;
            }
            listNonRegisteredStudents = [];
            await fillGrades(listGrades, dom, valForMissingGrade);
            const unknownStudentTplRaw = document.querySelector("[data-template-id='unknown-student']");
            const listUnknownStudents = document.querySelector('[data-list-unknown-students]');
            listUnknownStudents.replaceChildren();
            const nbUnknownStudents = document.querySelector('[data-nb-unknown-students]');
            nbUnknownStudents.textContent = listNonRegisteredStudents.length
           
            listNonRegisteredStudents.forEach((_item) => {
                const unknownStudentTpl = unknownStudentTplRaw.content.cloneNode(true);
                unknownStudentTpl.querySelector("li").textContent = _item;
                listUnknownStudents.append(unknownStudentTpl)
            })

            Array.from(document.querySelectorAll(".note")).forEach(
                input => {
                    if(input.value.trim() === "") {
                        input.value = valForMissingGrade;
                    }
                }
            );
            DOM.firstStep.style.display = 'none';
            DOM.resetContainer.style.display = 'block';

            if(getHasUsedDnDrop()) {
                DOM.resetContainer.querySelector("[data-force-save]").style.display = 'inline-block';
            }
        };
    };
    reader.readAsArrayBuffer(file);
};

const delegateEvtHandler = (el, evt, sel, handler) => {
    el.addEventListener(evt, function (event) {
        let t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    });
};

const forceSave = () => {
    document.querySelectorAll("[data-etudid]").forEach((item) => {
        item.setAttribute("data-modified", "true")
        write_on_blur?.(item)
    });
};

export { resetTpl, manageFileUpload, delegateEvtHandler, DOM, forceSave };
