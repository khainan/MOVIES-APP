export function translate(text, lang) {
  const listTranslate = {
    en: {
      hello: 'Hello',
    },
    id: {
      hello: 'Halo',
    },
  };

  const translated = listTranslate[lang][text];

  return translated;
}
