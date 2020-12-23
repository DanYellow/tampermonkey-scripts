import { resetTpl, manageFileUpload, delegateEvtHandler } from './utils';
import formTpl from './tpls/form.html';

(function () {
    const DOM = {
        listGradesRows: Array.from(document.querySelectorAll('tr.etud_elem')),
        formContainer: document.getElementById('tp-ext-form-container'),
    };

    if (DOM.listGradesRows.length === 0 && !DOM.formContainer) {
        return; 
    }

    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('beforeend', formTpl);

    delegateEvtHandler(document, 'change', '#grades_file', e => {
        const valForMissingGrade =
            document.querySelector('input[name="empty_val"]:checked').value ||
            'ATT';
        manageFileUpload({
            target: e,
            valForMissingGrade,
            dom: DOM
        });
    });

    delegateEvtHandler(document, 'click', '#restart_btn', e => {
        resetTpl();
    });
})();
