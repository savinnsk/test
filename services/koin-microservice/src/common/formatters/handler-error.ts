interface IPagarmeErrorResponse {
  statusCode: number;
  body: {
    Message: string;
    AdditionalInfo: string[];
    Code: string;
  };
}

export class HandlerError {
  static makeError(error: IPagarmeErrorResponse) {
    const errorBody = error.body?.AdditionalInfo ?? [];
    return {
      status: 'failed',
      statusCode: mapperStatusCode(error.body?.Code) ?? 500,
      message: error.body?.Message ?? 'Unexpected error',
      errors: [...errorBody, error.body.Message],
    };
  }
}

function mapperStatusCode(statusCode: string) {
  console.log('statusCode: ', statusCode, typeof statusCode);
  switch (statusCode) {
    case '988':
      return 400;
    case '312':
    case '200':
      return 200;
    default:
      return 500;
  }
}
