// Standard UK postcode pattern (covers all valid formats, e.g. SW1A 1AA, M1 1AE, B33 8TH)
const UK_POSTCODE_REGEX =
  /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export function isValidUkPostcode(value: string): boolean {
  return UK_POSTCODE_REGEX.test(value.trim());
}

export function formatUkPostcode(value: string): string {
  const clean = value.replace(/\s+/g, "").toUpperCase();
  if (clean.length < 5) return clean;
  return `${clean.slice(0, clean.length - 3)} ${clean.slice(clean.length - 3)}`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

// Accepts UK mobile/landline formats: 07..., +447..., 01/02 area codes
const UK_PHONE_REGEX = /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/;

export function isValidUkPhone(value: string): boolean {
  return UK_PHONE_REGEX.test(value.trim());
}

export function isValidFullName(value: string): boolean {
  return value.trim().length >= 2 && value.trim().includes(" ");
}
