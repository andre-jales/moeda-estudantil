export const interpolateWithValues = (
  strMakeChanges: string,
  ...values: string[]
) => {
  values.forEach((value) => {
    const matches = strMakeChanges.match(/{[A-Za-z]+}/g);
    if (matches) {
      strMakeChanges = strMakeChanges.replace(matches[0], value);
    }
  });
  return strMakeChanges;
};

// Validates Brazilian CPF (11 digits) using check digit algorithm
export const isValidCpf = (cpfInput: string): boolean => {
  const cpf = cpfInput.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false; // reject all same digits

  // First check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10) firstCheck = 0;
  if (firstCheck !== parseInt(cpf.charAt(9), 10)) return false;

  // Second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10) secondCheck = 0;
  if (secondCheck !== parseInt(cpf.charAt(10), 10)) return false;

  return true;
};

// Basic email validation: one '@', valid domain parts
export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  // Simple but practical regex for email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(trimmed);
};

export const formatCpf = (digits: string) => {
  const d = digits.padEnd(11, "");
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 9);
  const p4 = d.slice(9, 11);
  if (digits.length <= 3) return p1;
  if (digits.length <= 6) return `${p1}.${p2}`;
  if (digits.length <= 9) return `${p1}.${p2}.${p3}`;
  return `${p1}.${p2}.${p3}-${p4}`;
};
