export interface WebhookDataDto {
  transactionId: number;
  reference: string;
  codeReturn: string;
  messageReturn: string;
  attempt: number;
}
