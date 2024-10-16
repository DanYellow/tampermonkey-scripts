import { setHasUsedDnDrop } from './index';

const dragAndDropArea = document.querySelector('[data-drag-n-drop-area]');

['dragend', 'dragleave'].forEach(event => {
    dragAndDropArea.addEventListener(event, e => {
        e.preventDefault();
        e.currentTarget.querySelector(".tp-upload-btn").classList.remove("over");
        e.currentTarget.classList.remove("over");
    });
});

dragAndDropArea.addEventListener('dragover', e => {
    e.preventDefault();
    e.currentTarget.querySelector(".tp-upload-btn").classList.add("over");
    e.currentTarget.classList.add("over");
});

dragAndDropArea.addEventListener('drop', e => {
    e.preventDefault();
    e.currentTarget.querySelector(".tp-upload-btn").classList.remove("over");
    e.currentTarget.classList.remove("over");
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((file, i) => {
            if (file.kind === 'file') {
                setHasUsedDnDrop(true);
                const input = e.currentTarget.querySelector("input[type='file']");
                input.setAttribute("files", e.dataTransfer.files);
                input.files = e.dataTransfer.files;
                input.dispatchEvent(new Event('change', { 'bubbles': true }));
            }
        });
    }
});
