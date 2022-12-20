export interface MailGetMany {
  page?: number;
  limit?: number;
}

export interface SendMailInput {
  from: string;
  to: string;
  subject: string;
  body: string;
}
