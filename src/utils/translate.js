export function translate(prefix, lang) {
  const listTranslate = {
    en: {
      hello: 'Hello',
      homeIntroduction: `The standard chunk of Lorem Ipsum used since the 1500s is
      reproduced below for those interested. Sections 1.10.32 and
      1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
      are also reproduced in their exact original form, accompanied by
      English versions from the 1914 translation by H. Rackham.`,
      emptyFavoriteTitle: `You haven't favorite anything`,
      emptyFavoriteDescription:
        'To start show your favorite, try to like some content in',
    },
    id: {
      hello: 'Halo',
      homeIntroduction: `Bagian standar dari teks Lorem Ipsum yang digunakan sejak tahun 
      1500an kini di reproduksi kembali di bawah ini untuk mereka yang tertarik. 
      Bagian 1.10.32 dan 1.10.33 dari "de Finibus Bonorum et Malorum" karya Cicero 
      juga di reproduksi persis seperti bentuk aslinya, diikuti oleh versi bahasa 
      Inggris yang berasal dari terjemahan tahun 1914 oleh H. Rackham.`,
      emptyFavoriteTitle: 'Anda belum favorit apa pun',
      emptyFavoriteDescription:
        'Untuk mulai menunjukkan favorit Anda, cobalah untuk menyukai beberapa konten di',
    },
  };

  const translated = listTranslate[lang][prefix];

  return translated;
}
