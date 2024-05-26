import CryptoJS, { AES } from "crypto-js";

export default function CriptografarDados(data) {
  const secretKey =
    "5afe6e986651c7a319ced7648de1d100c2ce56884ca50c7fdae428ecf4e364f9";

  const encryptedData = AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
}
