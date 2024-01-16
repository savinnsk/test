export const responseIsAErrorType = (response: any): boolean => {
  return (
    (response?.statusCode && response?.statusCode > 399) ||
    response?.status === 'failed'
  );
};
