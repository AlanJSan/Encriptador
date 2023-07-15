const encryptMap = new Map([
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat']
]);

const decryptMap = new Map();

for (const [key, value] of encryptMap) {
    decryptMap.set(value,key);
}

/**
 * Solo funcionar con letras minúsculas
 * no usar letras con acentos ni caracteres especiales
 * 
 * hacer un grid de dos columnas para el body
 * 
 */

const input = document.getElementById('input-data');
const textarea = document.getElementById('output');
const encryptBtn = document.getElementById('encrypt');
const decryptBtn = document.getElementById('decrypt');
const copyBtn = document.getElementById('copy');
const errorMessage = document.getElementById('error-message');

let regexEncrypt = `[${[...encryptMap.keys()].join('')}]`
regexEncrypt = new RegExp(regexEncrypt, 'g');
let regexDecrypt = [...decryptMap.keys()].join('|');
regexDecrypt = new RegExp(regexDecrypt, 'g');

function encryptDecrypt(e) {
    const flag = e.target.id === 'encrypt';
    let text = input.value;
    const inputValidation = /^[a-z !¡¿?]+$/;
    if (!inputValidation.test(text)) {
        // Si el campo no es válido, mostramos el mensaje de error y cambiamos el aspecto del campo
        e.preventDefault();
        errorMessage.style.display = 'block';
        input.style.borderColor = 'red';
        input.style.backgroundColor = '#ffe6e6';
        return
    }
        const regex = flag ? regexEncrypt : regexDecrypt;
        const response = text.replaceAll(regex, (match) => flag ? encryptMap.get(match) : decryptMap.get(match));
        textarea.value = (response === input.value) ? textarea.value : response;
        textarea.focus();
        input.focus();
}

function copy() {
    navigator.clipboard
        .writeText(textarea.value)
        .then(
            (clipText) => (clipText = textarea.value)
        );
    navigator.clipboard
        .readText()
        .then(
            (clipText) => (input.value = clipText)
        );
}

function defaultField() {
    //errorMessage.style.display = 'none';
    input.style.borderColor = '';
    input.style.backgroundColor = '';
  }

encryptBtn.addEventListener('click', encryptDecrypt)
decryptBtn.addEventListener('click', encryptDecrypt)
copyBtn.addEventListener('click', copy);
input.addEventListener('input', defaultField);
textarea.addEventListener('focus', () => {
    textarea.style.backgroundImage = 'none'; 
    copyBtn.style.display = "block";
})
textarea.addEventListener('blur', () => {
    if(textarea.value === '')
    textarea.style.backgroundImage = screen.width > 767 ? "url('placeholder_image.svg')" : "url('placeholder_image+copy.svg.jpg')";
    copyBtn.style.display = "none";
});
