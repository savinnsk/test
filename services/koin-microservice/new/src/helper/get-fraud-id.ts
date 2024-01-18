function genCode() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function generateFraudId() {
  let fraudId = '';

  for (let i = 0; i < 8; i++) {
    fraudId += genCode();
  }

  return fraudId;
}
