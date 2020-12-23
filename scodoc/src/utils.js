import csv2json from 'csvjson-csv2json';

const defaultJSONColumnsNames = ['Nom', 'Prénom', 'Notes'];
let JSONColumnsNames = defaultJSONColumnsNames;

const fillGrades = (listGrades, dom) => {
    const lastNameKey = JSONColumnsNames[0];
    const firstNameKey = JSONColumnsNames[1];
    const gradesKey = JSONColumnsNames[2];

    listGrades.forEach(item => {
        const currentStudentRow = dom.listGradesRows.find(el => {
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
    document.querySelector('#grades_file').value = '';
    document.querySelector('#grades_field').style.display = 'block';
    document.querySelector('#restart_container').style.display = 'none';
};

const manageFileUpload = ({target: evtFile, valForMissingGrade, dom}) => {
    const file = evtFile.target.files[0];
    const name = file.name;
    const lastDot = name.lastIndexOf('.');
    const allowedFormats = ['csv', 'json'];

    const ext = name.substring(lastDot + 1);

    const reader = new FileReader();
    reader.onload = e => {
        let listGrades = e.target.result;
        if (allowedFormats.includes(ext)) {
            listGrades = csv2json(e.target.result, {
                parseNumbers: true,
            });
        }

        if (listGrades.some(item => Object.keys(item).length === 3)) {
            JSONColumnsNames = Object.keys(listGrades[0]);

            const scodocReviewMaxGradeSet = document
                .querySelector('.tf-ro-field.formnote_bareme')
                .textContent.match(/\d+(\.\d+)?/)[0];

            const moodleGradeCol = JSONColumnsNames.find(item =>
                item.toLowerCase().includes('note')
            ).replace(',', '.');
            const moodleReviewMaxGradeSet = moodleGradeCol.match(
                /\d+(\.\d+)?/
            )[0];

            if (
                Number(moodleReviewMaxGradeSet) ===
                Number(scodocReviewMaxGradeSet)
            ) {
                fillGrades(listGrades, dom);
                Array.from(
                    document.querySelectorAll(".note[value='']")
                ).forEach(input => {
                    input.focus();
                    input.value = valForMissingGrade;
                    input.blur();
                });
                document.querySelector('#grades_field').style.display = 'none';
                document.querySelector('#restart_container').style.display =
                    'block';
            } else {
                alert(`
              La note maximale de votre évaluation sur ScoDoc (/${Number(
                  scodocReviewMaxGradeSet
              )}) ne correspond pas à la note maximale de votre évaluation sur Moodle (/${Number(
                    moodleReviewMaxGradeSet
                )}).\n
              Soit votre évaluation n'a pas la bonne note maximale sur ScoDoc soit vous n'entrez pas les notes de la bonne évaluation sur ScoDoc.
          `);
                resetTpl();
            }
        } else {
            alert('Votre fichier ne contient pas trois colonnes.');
        }
    };
    reader.readAsText(file);
};

const delegateEvtHandler = (el, evt, sel, handler) => {
    el.addEventListener(evt, function(event) {
        let t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    });
}

export { resetTpl, manageFileUpload, delegateEvtHandler };
