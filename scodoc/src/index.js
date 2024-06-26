import { resetTpl, manageFileUpload, delegateEvtHandler, DOM, forceSave } from './utils';
import formTpl from './tpls/form.html?raw';
import packageJSON from "../package.json";

let hasUsedDnDrop = false;

export const getHasUsedDnDrop = () => hasUsedDnDrop;
export const setHasUsedDnDrop = (val) => (hasUsedDnDrop = val);

(async function () {
    if (DOM.listGradesRows.length === 0 && !DOM.formContainer) {
        return;
    }

    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('beforeend', formTpl);

    DOM.dragAndDropArea = document.querySelector('[data-drag-n-drop-area]');
    DOM.resetContainer = document.querySelector("[data-restart-upload-container]");
    DOM.firstStep = document.querySelector("[data-first-step]");
    DOM.resetContainer.style.display = 'none';

    document.querySelector("[data-project-name]").textContent += ` v${packageJSON.version}`

    await import('./drag-and-drop.js');

    delegateEvtHandler(document, 'change', '#grades_file', e => {
        document.querySelectorAll("[data-etudid]").forEach((item) => {
            item.style.backgroundColor = "";
        });
        const valForMissingGrade =
            document.querySelector('input[name="empty_val"]:checked').value ||
            'ABS';

        manageFileUpload({
            target: e,
            valForMissingGrade,
            dom: DOM,
        });
    });

    delegateEvtHandler(document, 'click', '[data-restart]', () => {
        setHasUsedDnDrop(false);
        resetTpl();
    });

    delegateEvtHandler(document, 'click', '[data-force-save]', () => {
        forceSave();
    });

    document.querySelectorAll("[data-etudid]").forEach((item) => {
        item.addEventListener("blur", (e) => {
            if(e.currentTarget.value) {
                e.currentTarget.style.backgroundColor = "#DAEBD6B9";
            }
        })
    })
})();
