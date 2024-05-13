import { resetTpl, manageFileUpload, delegateEvtHandler, DOM } from './utils';
import formTpl from './tpls/form.html?raw';

(async function () {
    if (DOM.listGradesRows.length === 0 && !DOM.formContainer) {
        return;
    }

    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('beforeend', formTpl);

    await import('./drag-and-drop.js');

    delegateEvtHandler(document, 'change', '#grades_file', e => {
        const valForMissingGrade =
            document.querySelector('input[name="empty_val"]:checked').value ||
            'ABS';

        manageFileUpload({
            target: e,
            valForMissingGrade,
            dom: DOM,
        });
    });

    delegateEvtHandler(document, 'click', '#restart_btn', e => {
        resetTpl();
    });
})();
