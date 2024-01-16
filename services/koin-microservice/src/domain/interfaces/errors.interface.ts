export interface IErrorResponse {
  errors: [
    {
      id: string;
      parameter: string;
      message: string;
    },
  ];
}
