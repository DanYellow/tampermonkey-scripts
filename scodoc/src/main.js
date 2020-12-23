import formTpl from './tpls/form.pug';
import { fillGrades, resetTpl } from './utils';
console.log('fillGrades, resetTpl', fillGrades, resetTpl)

var $ = json2csv;

console.log('$', $)

;(function () {
    const DOM = {
        listGradesRows: Array.from(document.querySelectorAll('tr.etud_elem')),
        formContainer: document.getElementById('tp-ext-form-container'),
    };

    console.log('ENVIRONMENT', ENVIRONMENT)

    if (DOM.listGradesRows.length === 0 && !DOM.formContainer) {
        return;
    }

    const body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('beforeend', formTpl);

    const delegateEvtHandler = (e, selector, func) => {
        // loop parent nodes from the target to the delegation node
        for (
            let target = e.target;
            target && target != this;
            target = target.parentNode
        ) {
            if (target.matches(selector)) {
                const tmpFunc = new Function(func);
                tmpFunc.call(target, e);
                break;
            }
        }
    };

    document.addEventListener(
        'change',
        e => {
            delegateEvtHandler(e, '#grades_file', 'manageFileUpload');
        },
        false
    );

    document.addEventListener(
        'click',
        e => {
            delegateEvtHandler(e, '#restart_btn', 'resetTpl');
        },
        false
    );
})();
