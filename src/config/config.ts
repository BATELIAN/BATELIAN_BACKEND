import { config } from "dotenv";

config();

export const MONGO_DB_CONNECTION =
  process.env.MONGO_DB_CONNECTION || "mongodb+srv://batalia:batailiaadmin@cluster0.vjyinrc.mongodb.net/";

// export const SMTP_HOST ="mail.batelian.com"
// export const SMTP_SERVICE ="batelian.com"
// export const SMTP_MAIL ="noreply@batelian.com"
// export const SMTP_PORT =465
// export const SMTP_PASSWORD ="KYF4C2@K!4Gy6v)"


export const SMTP_HOST="mail.batelian.com" 
export const SMTP_PORT=465
export const SMTP_SERVICE="batelian.com"
export const SMTP_MAIL="noreply@batelian.com"
export const SMTP_PASSWORD="1Ge9m&k(-FhA"
