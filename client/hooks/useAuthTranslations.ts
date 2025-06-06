import { useTranslations } from "next-intl";

// Custom hook pour récupérer les traductions
const useAuthTranslations = () => {
  return useTranslations("auth");
};

export default useAuthTranslations;
