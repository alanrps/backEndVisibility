const sendGridMail = require('@sendgrid/mail');
const { emailTemplate } = require('../templates/email');
sendGridMail.setApiKey("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");

function getMessage(email, newPassword) {
  return {
    to: email,
    from: 'visibilityoficial@gmail.com',
    subject: 'Solicitação de Recuperação de Senha',
    html: emailTemplate(newPassword),
  };
}

async function sendEmailMessage(email, newPassword) {
  try {
    const reponse = await sendGridMail.send(getMessage(email, newPassword));
    return reponse;
  } catch (error) {
    return error;
  }
}

module.exports = {
  sendEmailMessage
}