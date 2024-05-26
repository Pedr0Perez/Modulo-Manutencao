import CryptoJS, { AES } from "crypto-js";

export default function DescriptografarDados(cryptData) {
  const secretKey =
    "5afe6e986651c7a319ced7648de1d100c2ce56884ca50c7fdae428ecf4e364f9";

  const decryptedData = AES.decrypt(cryptData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(decryptedData);
}
