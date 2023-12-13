import AsyncStorage from "@react-native-async-storage/async-storage";

export const changeActiveLanguage = (
  languages: any,
  setLanguages: any,
  selectedIndex: number,
  i18n: any
) => {
  const newList = languages.map((item: any, index: number) => ({
    ...item,
    active: index === selectedIndex,
  }));
  i18n.changeLanguage(languages[selectedIndex].value);
  keepActiveLanguageInStorage(languages[selectedIndex].value);
  setLanguages(newList);
};

const keepActiveLanguageInStorage = async (language: any) => {
  try {
    await AsyncStorage.setItem("language", JSON.stringify(language));
  } catch (error) {
    console.error("Error saving language:", error);
  }
};

export const changeActiveLanguageFromStorage = async (
  languages: any,
  setLanguages: any
) => {
  try {
    let activeLanguage: any = await AsyncStorage.getItem("language");
    activeLanguage = JSON.parse(activeLanguage);
    if (activeLanguage) {
      const newList = languages.map((item: any) => ({
        ...item,
        active: item.value === activeLanguage,
      }));
      setLanguages(newList);
    }
  } catch (error) {
    console.error("Error get language:", error);
  }
};
