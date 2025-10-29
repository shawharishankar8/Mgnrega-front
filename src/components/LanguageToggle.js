import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    // Uses Bootstrap classes: btn, btn-sm, btn-outline-primary
    <button className="btn btn-sm btn-outline-primary" onClick={toggleLanguage}>
      {i18n.language === "en" ? "हिन्दी" : "English"}
    </button>
  );
}
