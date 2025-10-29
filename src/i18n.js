import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "MGNREGA District Dashboard - Madhya Pradesh",
      selectDistrict: "Select your District",
      households: "Households Worked",
      persondays: "Persondays Generated",
      expenditure: "Total Expenditure (₹)",
      score: "Performance Score",
      currentMonth: "Current Month",
      pastMonths: "Past Performance",
    },
  },
  hi: {
    translation: {
      title: "मनरेगा जिला डैशबोर्ड - मध्य प्रदेश",
      selectDistrict: "अपना जिला चुनें",
      households: "काम किए परिवार",
      persondays: "कार्यदिवस उत्पन्न",
      expenditure: "कुल व्यय (₹)",
      score: "प्रदर्शन स्कोर",
      currentMonth: "वर्तमान माह",
      pastMonths: "पिछला प्रदर्शन",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
