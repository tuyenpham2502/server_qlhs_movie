import NodeMailer from "nodemailer";
import config from "config";

export const createMailTransporter = () => {
  const transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("authEmail"),
      pass: config.get("authPassword"),
    },
  });
  return transporter;
};
