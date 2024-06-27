import * as dotenv from 'dotenv';
dotenv.config();


export class EnvsConfig {
  static getServerPort() {
    return process.env.PORT || 3000;
  }

  static getMongoDbUrl() {
    return process.env.MONGODB_URL;
  }

  static getReqResDbUrl() {
    return process.env.REQ_RES_DB_URL;
  }

  static getRabbitmqUrl() {
    return process.env.RABBITMQ_URL;
  }

  static getRabbitmqQueue() {
    return process.env.RABBITMQ_QUEUE;
  }

  static getSMTPUserEmail() {
    return process.env.SMTP_USER_EMAIL;
  }

  static getSMTPUserPassword() {
    return process.env.SMTP_USER_PASSWORD;
  }

  static getSMTPHost() {
    return process.env.SMTP_HOST;
  }

  static getSMTPPort() {
    return process.env.SMTP_PORT;
  }

  static getEmailTo() {
    return process.env.EMAIL_TO;
  }

  static getEmailFrom() {
    return process.env.EMAIL_FROM;
  }
}
