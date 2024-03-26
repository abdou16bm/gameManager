const serializeObjectForm = function(form) {

    const formData = new FormData(form);
    const formInputs = form.querySelectorAll('input');
    let formContent = {}
    const inputs = {};
    const inputsValue = {};

    for (const [name, value] of formData) {
        inputsValue[name] = value;

        inputs[name] = form.querySelector('#'+name);

    }

    formContent.inputs = inputs;
    formContent.inputsValue = inputsValue;

    return formContent;
}
