// ─────────────────────────────────────────────
// Ts'Art Épices — TypeScript Types
// ─────────────────────────────────────────────

/** Un produit vanille du catalogue */
export interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  weight: string;
  format: 'poids' | 'tube';
  price: number | null;
  price_eur?: number | null;
  price_placeholder: string;
  currency: string;
  origin: string;
  quality: string[];
  conservation: string;
  description: string;
  image: string;
  inStock: boolean;
  featured: boolean;
}

/** Une demande de commande WhatsApp */
export interface OrderRequest {
  product_slug: string;
  product_name: string;
  product_weight: string;
  quantity?: number;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  notes?: string;
}

/** Une commande enregistrée */
export interface Order {
  id: number;
  product_slug: string;
  product_name: string;
  product_weight: string;
  quantity: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  notes: string | null;
  whatsapp_message: string;
  whatsapp_link: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

/** Un message de contact */
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Réponse API générique */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

/** Item FAQ */
export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
