import csv2json from 'csvjson-csv2json';

const defaultJSONColumnsNames = ['Nom', 'Prénom', 'Notes'];
let JSONColumnsNames = defaultJSONColumnsNames;
let listStudentsUnknown = [];
let listStudentsWithInvalidGrade = [];

const DOM = {
    listGradesRows: Array.from(document.querySelectorAll('tr.etud_elem')),
    formContainer: document.getElementById('tp-ext-form-container'),
    maxGrade: document.querySelector('.tf-ro-field.formnote_bareme'),
};

const listEmptyValues = ["", "abs", "exc"];

const callScodocAPI = (input) => {
    // For scodoc' script
    input.setAttribute("data-modified", true);
    // function from scodoc
    if (typeof write_on_blur !== 'undefined') {
        write_on_blur(input);
    }
}

const fillGrades = async (listGrades, dom, maxGrade) => {
    dom.uploadBtn.inert = true;

    // File headers
    const lastNameKey = JSONColumnsNames[0];
    const firstNameKey = JSONColumnsNames[1];
    const gradesKey = JSONColumnsNames[2];

    const specialCharsRegex = /[\u0300-\u036f]/g;

    for (const item of listGrades) {
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
            listStudentsUnknown.push(
                `${item[lastNameKey].toUpperCase()} ${item[firstNameKey]}`
            );

            continue;
        }

        const currentStudentRowInput = currentStudentRow.querySelector(
            'input[class^="note"]'
        );
        if (currentStudentRowInput) {
            const formattedGrade = String(item[gradesKey]).replace(',', '.');
            const isNotAValidGrade = Number.isNaN(Number(formattedGrade));
            const isAValidGrade = !isNotAValidGrade;

            const grade = isNotAValidGrade
                ? item[gradesKey]
                : Number(formattedGrade);
            // currentStudentRowInput.focus();

            if (
                isAValidGrade &&
                (
                    listEmptyValues.includes(currentStudentRowInput.value.trim().toLowerCase()) ||
                    (grade > currentStudentRowInput.value && grade <= maxGrade) ||
                    currentStudentRowInput.value > maxGrade
                )
            ) {
                currentStudentRowInput.value = grade;

                if(grade > maxGrade || grade < 0) {
                    listStudentsWithInvalidGrade.push(
                        `${item[lastNameKey].toUpperCase()} ${item[firstNameKey]}`
                    )
                }

                callScodocAPI(currentStudentRowInput);
            }

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
    const scodocMaxGrade = Number(dom.maxGrade.textContent.match(/\d+(\.\d+)?/)?.[0] || 20);

    return {
        isMatching: true,
        scodocMaxGrade,
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

            listStudentsUnknown = [];
            listStudentsWithInvalidGrade = [];
            await fillGrades(listGrades, dom, gradesComparisonInfos.scodocMaxGrade);
            const unknownStudentTplRaw = document.querySelector("[data-template-id='unknown-student']");

            const studentsUnknownContainer = document.querySelector('[data-unknown-students]');
            const listStudentsUnknownDOM = studentsUnknownContainer.querySelector('ul');
            listStudentsUnknownDOM.replaceChildren();
            const nbUnknownStudents = document.querySelector('[data-nb-unknown-students]');
            nbUnknownStudents.textContent = listStudentsUnknown.length

            if (listStudentsUnknown.length > 0) {
                studentsUnknownContainer.style.display = '';
                listStudentsUnknown.forEach((_item) => {
                    const unknownStudentTpl = unknownStudentTplRaw.content.cloneNode(true);
                    unknownStudentTpl.querySelector("li").textContent = _item;

                    listStudentsUnknownDOM.append(unknownStudentTpl)
                })
            } else {
                studentsUnknownContainer.style.display = 'none';
            }

            const studentsWithInvalidGradeContainer = document.querySelector('[data-invalid-grades]');
            const listStudentsWithInvalidGradeDOM = studentsWithInvalidGradeContainer.querySelector('ul');
            listStudentsWithInvalidGradeDOM.replaceChildren();
            const nbInvalidGradeStudents = document.querySelector('[data-nb-invalid-grade-students]');
            nbInvalidGradeStudents.textContent = listStudentsWithInvalidGrade.length

            if (listStudentsWithInvalidGrade.length > 0) {
                studentsWithInvalidGradeContainer.style.display = '';
                listStudentsWithInvalidGrade.forEach((_item) => {
                    const unknownStudentTpl = unknownStudentTplRaw.content.cloneNode(true);
                    unknownStudentTpl.querySelector("li").textContent = _item;

                    listStudentsWithInvalidGradeDOM.append(unknownStudentTpl)
                })
            } else {
                studentsWithInvalidGradeContainer.style.display = 'none';
            }

            Array.from(document.querySelectorAll(".note")).forEach(
                input => {
                    if(listEmptyValues.includes(input.value.trim().toLowerCase())) {
                        input.value = valForMissingGrade;
                        callScodocAPI(input);
                    }
                }
            );
            DOM.uploadBtn.inert = false;
            DOM.firstStep.style.display = 'none';
            DOM.resetContainer.style.display = 'block';
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
