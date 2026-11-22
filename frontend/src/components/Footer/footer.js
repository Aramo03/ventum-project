// Footer helper functions or configuration
export const footerConfig = {
  socialLinks: [
    { name: 'Instagram', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'Telegram', url: '#' },
  ],
  contact: {
    phone: '+374 10 000 000',
    email: 'info@ventum.am',
    addressAm: 'Երևան, Հայաստան',
    addressEn: 'Yerevan, Armenia',
    addressRu: 'Ереван, Армения',
  },
  paymentMarks: ['Visa', 'Mastercard'],
};

export function isValidEmail(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}