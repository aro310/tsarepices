const WHATSAPP_NUMBER = '261379246750';

export function generateWhatsAppLink(
  productName: string,
  weight: string,
  quantity: number = 1,
  pricePerUnit?: number | null,
  priceEur?: number | null
): string {
  const unitLabel = weight === 'tube' ? 'tube(s) de 5 gousses' : `paquet(s) de ${weight}`;
  const totalAr = pricePerUnit ? pricePerUnit * quantity : null;
  const totalEur = priceEur ? priceEur * quantity : null;

  const priceLineAr = totalAr
    ? `• Prix unitaire : ${pricePerUnit!.toLocaleString('fr-FR')} Ar\n• Total estimé : ${totalAr.toLocaleString('fr-FR')} Ar${totalEur ? ` (≈ ${totalEur} €)` : ''}`
    : '';

  const message = [
    `Bonjour Ts'Art Épices !`,
    ``,
    `Je souhaite commander :`,
    `• Produit : ${productName}`,
    `• Format : ${weight === 'tube' ? '5 gousses en tube de verre' : weight}`,
    `• Quantité : ${quantity} ${unitLabel}`,
    priceLineAr ? priceLineAr : '',
    ``,
    `Merci de confirmer la disponibilité et de me donner les instructions de livraison.`,
  ]
    .filter(l => l !== null)
    .join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateGenericWhatsAppLink(): string {
  const message = `Bonjour Ts'Art Épices !\n\nJe souhaite commander de la vanille Bourbon de Madagascar.\nPouvez-vous me confirmer les disponibilités et les modalités de livraison ?\n\nMerci !`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
