import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Initialize Google Translate when component mounts
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi", // Only English and Hindi
          autoDisplay: false, // Prevent automatic display
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Ensure Google Translate is loaded and initialized
    if (window.google && window.google.translate) {
      googleTranslateElementInit();
    } else {
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  useEffect(() => {
    // Apply language change through Google Translate API
    if (window.google && window.google.translate) {
      const selectLanguage = (lang) => {
        const iframe = document.querySelector("iframe.goog-te-menu-frame");
        if (iframe) {
          const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          const languageOption = innerDoc.querySelector(`.goog-te-menu2-item span[text="${lang}"]`);
          if (languageOption) {
            languageOption.click();
          }
        }
      };

      selectLanguage(language);
    }
  }, [language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid text-center">
        {/* Google Translate dropdown (hidden by CSS) */}
        <div id="google_translate_element"></div>

        <div className="mt-3">
          <h2>Sample Text</h2>
          <p>
            This is a sample paragraph to check if the Google Translate widget is working properly.
            If you see this text in Hindi after switching languages, it means the translation is
            functioning correctly.
          </p>
          <p>
            Another paragraph for additional testing. This text will also be translated based on the
            selected language.
          </p>

          {/* Language buttons to switch between English and Hindi */}
          {/* <button onClick={() => handleLanguageChange('hi')}>Hindi</button>
          <button onClick={() => handleLanguageChange('en')}>English</button> */}
        </div>

        {/* Additional CSS to hide Google Translate unwanted elements */}
        <style>
          {`
            .goog-te-banner-frame {
              display: none !important;
            }
            .goog-te-gadget-icon {
              display: none !important;
            }
            .goog-te-menu-frame {
              display: none !important;
            }
            .goog-te-menu2 {
              display: none !important;
            }
            .goog-te-menu2-container {
              display: none !important;
            }
            .goog-te-menu-item {
              display: block !important;
            }
          `}
        </style>
      </div>
    </nav>
  );
};

export default NavBar;
