export interface MailGetMany {
  page?: number;
  limit?: number;
}

export interface SendMailInvite {
  from: string;
  to: string;
  token: string;
  secret: string;
}
