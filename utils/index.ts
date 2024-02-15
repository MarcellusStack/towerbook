import translations from "@/utils/translations.json";
import CryptoJS from "crypto-js";

export const convertDate = (date: Date) => {
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

//used for prisma due to saving dates in the wrong format
export const formatDateTimeZone = (date: Date) => {
  const dateString = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [day, month, year] = dateString.split(".");
  const isoDateString = `${year}-${month}-${day}`;

  const localDate = new Date(isoDateString);
  return localDate;
};

export const convertTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const extractTimeFromDate = (time: string) => {
  const [hours, minutes] = String(time).split(":");
  const startTime = new Date();
  startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return startTime;
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

export const convertStringToDateOrNull = (
  dateString: string | null | Date
): Date | null => {
  if (dateString) {
    return new Date(dateString);
  } else {
    return null;
  }
};

export const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const toLowercaseAndTrim = (word: string) => {
  return word.toLowerCase().trim();
};

export const translate = (item: string) => translations[item] || item;

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://towerbook.vercel.app`
    : "http://localhost:3000";

const checkAlreadyEncrypted = (text: string | null) => {
  const passphrase = process.env.PASSPHRASE;
  const bytes = CryptoJS.AES.decrypt(text, passphrase);
  try {
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return !!decrypted;
  } catch (error) {
    return false;
  }
};

export const encrypt = (text: string | null) => {
  const passphrase = process.env.PASSPHRASE;
  const alreadyEncryptedText = checkAlreadyEncrypted(text);
  if (alreadyEncryptedText) {
    return text;
  }
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decrypt = (text: string | null) => {
  const passphrase = process.env.PASSPHRASE;
  try {
    const bytes = CryptoJS.AES.decrypt(text, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    return text;
  }
};
