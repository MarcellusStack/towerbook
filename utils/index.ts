export const convertDate = (date: string) => {
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};
