const regexUrl = /^https?:\/\/(w{3}\.)?[a-z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/i;
const regexHex = /^[0-9,a-f]{24}$/i;
const regexRusLang = /^[а-яё0-9\s!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]+$/i;
const regexEngLang = /^[a-z0-9\s!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]+$/i;

module.exports = {
  regexUrl,
  regexHex,
  regexRusLang,
  regexEngLang,
};
