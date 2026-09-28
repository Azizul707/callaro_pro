/**
 * Email validation utility with RFC standard regex and disposable email domain blocklist check.
 */
import disposableDomainsList from 'disposable-email-blocklist';

// Standard RFC 5322 compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Set of known disposable domains from disposable-email-blocklist package + key common temporary services
const disposableDomainSet: Set<string> = new Set(
  Array.isArray(disposableDomainsList)
    ? disposableDomainsList.map((d: string) => d.toLowerCase())
    : []
);

// Additional high-frequency temporary email providers
const extraDisposableDomains = [
  'mailinator.com',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'sharklasers.com',
  'yopmail.com',
  'trashmail.com',
  'getairmail.com',
  'dispostable.com',
  'throwawaymail.com',
  'fakeinbox.com',
  'burnermail.io',
  'crazymailing.com',
  'mohmal.com',
  'inboxkitten.com',
  'mytemp.email',
  'emailondeck.com',
  'tempail.com',
];

extraDisposableDomains.forEach((domain) => disposableDomainSet.add(domain.toLowerCase()));

export interface EmailValidationResult {
  isValid: boolean;
  isDisposable: boolean;
  domain: string;
  errorMessage?: string;
}

export function validateEmail(email: string): EmailValidationResult {
  const trimmed = email ? email.trim().toLowerCase() : '';

  if (!trimmed) {
    return {
      isValid: false,
      isDisposable: false,
      domain: '',
      errorMessage: 'Please enter your email address.',
    };
  }

  // Regex format check
  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      isDisposable: false,
      domain: '',
      errorMessage: 'Please enter a valid email format (e.g. name@company.com).',
    };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      isDisposable: false,
      domain: '',
      errorMessage: 'Please enter a valid email address.',
    };
  }

  const domain = parts[1].toLowerCase();

  // Check top-level domain validity
  if (!domain.includes('.') || domain.endsWith('.')) {
    return {
      isValid: false,
      isDisposable: false,
      domain,
      errorMessage: 'Please enter a valid email domain.',
    };
  }

  // Cross-reference against disposable email blocklist
  if (disposableDomainSet.has(domain)) {
    return {
      isValid: false,
      isDisposable: true,
      domain,
      errorMessage: 'Please use a valid personal or business email.',
    };
  }

  return {
    isValid: true,
    isDisposable: false,
    domain,
  };
}
