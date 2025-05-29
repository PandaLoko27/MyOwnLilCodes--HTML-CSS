// script.js
const lengthEl = document.getElementById('length');
const includeUpperEl = document.getElementById('includeUpper');
const includeLowerEl = document.getElementById('includeLower');
const includeNumbersEl = document.getElementById('includeNumbers');
const includeSymbolsEl = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}<>?/|";

function generatePassword() {
  let charset = "";
  if (includeUpperEl.checked) charset += upper;
  if (includeLowerEl.checked) charset += lower;
  if (includeNumbersEl.checked) charset += numbers;
  if (includeSymbolsEl.checked) charset += symbols;

  const length = +lengthEl.value;
  let password = "";

  if (!charset) {
    return "⚠️ Selecione ao menos uma opção!";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

generateBtn.addEventListener('click', () => {
  const password = generatePassword();
  passwordOutput.value = password;
});

copyBtn.addEventListener('click', () => {
  passwordOutput.select();
  document.execCommand('copy');
  alert('Senha copiada!');
});