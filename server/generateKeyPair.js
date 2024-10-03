import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

await fs.writeFile(path.join(process.cwd(), "./id_rsa_pub.pem"), publicKey);
await fs.writeFile(path.join(process.cwd(), "./id_rsa_priv.pem"), privateKey);
