import { useState, useEffect } from "react";

const useFormValidation = (name, imageUrl, weather) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (name && imageUrl && weather) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, imageUrl, weather]);

  return isFormValid;
};

export default useFormValidation;
