export interface MailGetMany {
  page?: number;
  limit?: number;
}

export interface SendMailInvite {
  email: string;
  token: string;
  secret: string;
}
