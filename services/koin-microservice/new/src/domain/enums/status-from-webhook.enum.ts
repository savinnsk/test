// baseado no codeReturn enviado pela própria koin nas opções de resposta do webhook

export enum StatusFromWebhook {
  approved = '200',
  cancelled = '903',
  repproved = '701',
  pending = '400',
}
