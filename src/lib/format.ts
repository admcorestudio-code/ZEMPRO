/**
 * Formate un montant en francs CFA : 3000 -> "3 000 FCFA".
 * Les espaces sont insécables pour que le montant ne soit jamais coupé en deux lignes.
 */
export function formatFCFA(amount: number): string {
  if (!Number.isInteger(amount)) {
    throw new Error("Le montant en FCFA doit être un nombre entier.");
  }
  const sign = amount < 0 ? "-" : "";
  const digits = Math.abs(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${sign}${digits} FCFA`;
}
