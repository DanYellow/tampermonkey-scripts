const dragAndDropArea = document.querySelector('[data-drag-n-drop-area]');

['dragend', 'dragleave'].forEach(event => {
    dragAndDropArea.addEventListener(event, e => {
        e.preventDefault();
        e.currentTarget.classList.remove("over");
    });
});

dragAndDropArea.addEventListener('dragover', e => {
    e.preventDefault();
    e.currentTarget.classList.add("over");
});

dragAndDropArea.addEventListener('drop', e => {
    e.preventDefault();
    
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((file, i) => {
            if (file.kind === 'file') {
                const input = e.currentTarget.querySelector("input[type='file']");
                input.setAttribute("files", e.dataTransfer.files);
                input.files = e.dataTransfer.files;
                input.dispatchEvent(new Event('change', { 'bubbles': true }));
            }
        });
    }
});
