// SAVOLLAR FAYLI
// Har bir savol shu shaklda yoziladi (vergullarga e'tibor bering):
//
// {
//   fan: "O'zbekiston tarixi",      // yoki "Jahon tarixi"
//   mavzu: "1-mavzu: XIII asr boshlarida Xorazm davlatida siyosiy vaziyat",   // bir xil mavzuga bir xil yozing
//   savol: "Sulton Muhammad Xorazmshoh qaysi sulola vakili boʻlgan?",
//   variantlar: ["A Afrigʻiylar", "B  Oltintoshiylar", "C Ma'muniylar", "D Anushteginiylar"],
//   javob: D,                       // to'g'ri javob raqami: 0=A, 1=B, 2=C, 3=D
//   izoh: " 1017-yil Anushteginiylar sulolasiga Alouddin Muhammad otasi Takash asos soladi"    // kerak bo'lmasa "" qoldiring
// },
//
// DIQQAT: quyidagilar faqat NAMUNA. Ularni o'chirib, darslikdagi mavzularga
// mos o'z savollaringizni yozing.

const QUESTIONS = [
  // ---------- O'zbekiston tarixi ----------
  {
    fan: "O'zbekiston tarixi",
    mavzu: "Namuna mavzu: Amir Temur davlati",
    savol: "Amir Temur qaysi yilda tug'ilgan?",
    variantlar: ["1336", "1370", "1405", "1220"],
    javob: 0,
    izoh: "Amir Temur 1336-yilda Kesh (Shahrisabz) yaqinida tug'ilgan."
  },
  {
    fan: "O'zbekiston tarixi",
    mavzu: "Namuna mavzu: Amir Temur davlati",
    savol: "Amir Temur davlatining poytaxti qaysi shahar edi?",
    variantlar: ["Buxoro", "Samarqand", "Xiva", "Toshkent"],
    javob: 1,
    izoh: ""
  },
  {
    fan: "O'zbekiston tarixi",
    mavzu: "Namuna mavzu: Mirzo Ulug'bek",
    savol: "Samarqandda mashhur rasadxonani kim qurdirgan?",
    variantlar: ["Amir Temur", "Alisher Navoiy", "Mirzo Ulug'bek", "Bobur"],
    javob: 2,
    izoh: ""
  },
  {
    fan: "O'zbekiston tarixi",
    mavzu: "Namuna mavzu: Mirzo Ulug'bek",
    savol: "Mirzo Ulug'bek kimning nabirasi?",
    variantlar: ["Bobur", "Shayboniyxon", "Amir Temur", "Husayn Boyqaro"],
    javob: 2,
    izoh: ""
  },

  // ---------- Jahon tarixi ----------
  {
    fan: "Jahon tarixi",
    mavzu: "Namuna mavzu: Buyuk Fransuz inqilobi",
    savol: "Buyuk Fransuz inqilobi qaysi yilda boshlangan?",
    variantlar: ["1689", "1776", "1789", "1815"],
    javob: 2,
    izoh: "1789-yil 14-iyulda Bastiliya qamalishi bilan boshlangan."
  },
  {
    fan: "Jahon tarixi",
    mavzu: "Namuna mavzu: Buyuk Fransuz inqilobi",
    savol: "Fransuz inqilobi davrida qamal qilingan mashhur qamoqxona qaysi?",
    variantlar: ["Bastiliya", "Tauer", "Alkatras", "Kreml"],
    javob: 0,
    izoh: ""
  },
  {
    fan: "Jahon tarixi",
    mavzu: "Namuna mavzu: Birinchi jahon urushi",
    savol: "Birinchi jahon urushi qaysi yilda boshlangan?",
    variantlar: ["1904", "1914", "1918", "1939"],
    javob: 1,
    izoh: ""
  },
  {
    fan: "Jahon tarixi",
    mavzu: "Namuna mavzu: Birinchi jahon urushi",
    savol: "Birinchi jahon urushi qaysi yilda tugagan?",
    variantlar: ["1916", "1917", "1918", "1920"],
    javob: 2,
    izoh: ""
  }
];
