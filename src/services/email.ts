import sendGridMail, { ClientResponse, ResponseError } from '@sendgrid/mail';
import emailTemplate from '../templates/email';
sendGridMail.setApiKey(process.env.EMAIL_API_KEY); 

interface EmailRepository {
  send(email: string, newPassword: string): Promise<[ClientResponse, {}] | Error | ResponseError>;
}

export class EmailService implements EmailRepository {
  private getMessage(email: string, newPassword: string) {
    return {
      to: email,
      from: 'visibilityoficial@gmail.com',
      subject: 'Solicitação de Recuperação de Senha',
      html: emailTemplate(newPassword),
    };
  }

  async send(email: string, newPassword: string): Promise<[ClientResponse, {}]> {
    try {
      const reponse = await sendGridMail.send(this.getMessage(email, newPassword));

      return reponse;
    } catch (error) {
      return error;
    }
  }
}