'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'fr' | 'en';

// ─────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────
const translations = {
  fr: {
    // Navbar
    nav_home: 'Accueil',
    nav_vanille: 'Nos Vanilles',
    nav_histoire: 'Notre Histoire',
    nav_qualite: 'Qualité',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',

    // Homepage — Hero
    cart_view: 'Voir mon panier',
    hero_badge: 'Vanille Bourbon · Madagascar',
    hero_title_1: 'Ts\'Art Épices',
    hero_title_2: 'Madagascar',
    hero_subtitle: 'Gousses 100% naturelles, sélectionnées à la main dans la région de SAVA. Artisanal, authentique, d\'exception.',
    hero_cta_order: 'Commander via WhatsApp',
    hero_cta_discover: 'Découvrir nos formats',
    hero_scroll: 'Défiler',

    // Homepage — Formats
    formats_title: 'Nos Formats',
    formats_subtitle: 'La vanille Bourbon de Madagascar dans le conditionnement qui vous convient',
    formats_by_weight: 'Au Poids',
    formats_by_weight_desc: 'De 50g à 1kg — pour tous les besoins',
    formats_tube: 'En Tube',
    formats_tube_desc: 'Conditionnement artisanal en verre',
    formats_tube_gift: 'Idéal cadeau',

    // Homepage — Origin
    origin_label: 'Notre Origine',
    origin_title: 'Au cœur de la région SAVA',
    origin_p1: 'La région SAVA, au nord-est de Madagascar, est le berceau de la plus belle vanille Bourbon au monde. C\'est dans ce terroir d\'exception que Ts\'Art Épices cultive ses gousses avec passion.',
    origin_p2: 'Chaque gousse est le fruit d\'un processus méticuleux : pollinisation à la main, récolte à maturité optimale, puis un affinage de plusieurs mois pour développer ces arômes intenses qui font la réputation de notre vanille.',
    origin_p3: 'De la fleur à la gousse, notre savoir-faire ancestral garantit une vanille d\'une qualité incomparable.',
    origin_link: 'Découvrir notre histoire',

    // Homepage — Selection
    selection_title: 'Sélection',
    selection_subtitle: 'Nos formats les plus demandés',
    selection_see_all: 'Voir tous les formats',

    // Homepage — Trust / Engagement
    trust_title: 'Notre Engagement',
    trust_subtitle: 'Ce qui fait la différence Ts\'Art Épices',
    trust_natural_title: '100% Naturelles',
    trust_natural_desc: 'Aucun additif, aucun traitement chimique. Nos gousses sont cultivées et séchées selon les méthodes traditionnelles.',
    trust_harvest_title: 'Récolte Sélective',
    trust_harvest_desc: 'Chaque gousse est cueillie à maturité optimale et sélectionnée à la main pour garantir une qualité irréprochable.',
    trust_origin_title: 'Origine Madagascar',
    trust_origin_desc: 'Cultivée dans la région de SAVA, berceau de la meilleure vanille Bourbon au monde.',

    // Homepage — CTA Banner
    cta_title: 'Commandez votre vanille',
    cta_subtitle: 'Choisissez vos formats et rassemblez-les dans une seule commande.',
    cta_btn: 'Commander sur WhatsApp',

    // Product card / detail
    product_unit_price: 'Prix unitaire',
    product_quantity: 'Quantité',
    product_total: 'Total estimé',
    product_availability: 'Disponibilité',
    product_in_stock: 'En stock',
    product_on_order: 'Sur commande',
    product_order_wa: 'Commander via WhatsApp',
    product_see_detail: 'Voir le détail',
    product_per_unit: 'par unité',
    product_format_tube: 'Tube Artisanal — 5 gousses',
    product_format_weight: 'Format',
    product_description: 'Description',
    product_origin: 'Origine',
    product_conservation: 'Conservation',
    product_others: 'Vous pourriez aussi aimer',

    // Catalog page
    catalog_label: 'Catalogue',
    catalog_title: 'Nos Vanilles',
    catalog_subtitle: 'Vanille Bourbon de Madagascar, 100% naturelle. Choisissez le format qui vous convient.',
    catalog_all: 'Tous',
    catalog_by_weight: 'Au Poids',
    catalog_tube: 'En Tube',

    // Notre Histoire
    histoire_label: 'Notre histoire',
    histoire_title: 'De la Terre à Votre Table',
    histoire_subtitle: 'L\'histoire de Ts\'Art Épices commence dans les forêts tropicales de Madagascar, avec des hommes et des femmes passionnés par leur terroir.',
    histoire_journey_title: 'Le chemin de la gousse',
    histoire_journey_subtitle: 'De la plantation à votre cuisine, chaque étape est conduite avec soin.',
    histoire_step1_title: 'Plantation',
    histoire_step1_desc: 'Les boutures de vanillier sont plantées sous les ombrages de la forêt tropicale de la SAVA.',
    histoire_step2_title: 'Floraison',
    histoire_step2_desc: 'Après 3 ans, l\'orchidée vanille produit ses premières fleurs, éphémères et précieuses.',
    histoire_step3_title: 'Pollinisation',
    histoire_step3_desc: 'Chaque fleur est pollinisée à la main, un geste ancestral réalisé au lever du jour.',
    histoire_step4_title: 'Récolte',
    histoire_step4_desc: 'Les gousses sont récoltées à maturité optimale, une à une, après 9 mois de maturation.',
    histoire_step5_title: 'Séchage & Affinage',
    histoire_step5_desc: 'Un processus de plusieurs mois d\'échaudage, étuvage et séchage développe les arômes.',
    histoire_step6_title: 'Sélection',
    histoire_step6_desc: 'Chaque gousse est inspectée et classée par nos experts pour ne garder que le meilleur.',
    histoire_quality_title: 'Notre Exigence Qualité',
    histoire_quality_btn: 'Découvrir',

    // Qualité
    qualite_label: 'Notre Qualité',
    qualite_title: 'L\'Excellence à Chaque Gousse',
    qualite_subtitle: 'Chaque lot de vanille est contrôlé selon des critères stricts hérités des meilleures pratiques de la région SAVA.',
    qualite_criteria_title: 'Nos Critères de Sélection',
    qualite_guarantees_title: 'Nos Garanties',
    qualite_order_title: 'Prêt à commander ?',
    qualite_order_subtitle: 'Contactez-nous sur WhatsApp pour discuter de vos besoins et passer commande.',
    qualite_order_btn: 'Commander sur WhatsApp',
    qualite_c1_title: 'Taux de vanilline optimal',
    qualite_c1_desc: 'Nos gousses présentent un taux de vanilline naturel exceptionnel, gage d\'un arôme riche et intense.',
    qualite_c2_title: 'Gousses souples et grasses',
    qualite_c2_desc: 'La texture huileuse et souple de nos gousses témoigne de leur fraîcheur et de leur qualité de séchage.',
    qualite_c3_title: 'Longueur 16-22 cm',
    qualite_c3_desc: 'Nous sélectionnons des gousses de grande taille, signe de maturité et de richesse aromatique.',
    qualite_c4_title: 'Couleur brun foncé',
    qualite_c4_desc: 'Une coloration brun chocolat uniforme, sans traces de moisissure, indicateur d\'un affinage réussi.',
    qualite_c5_title: 'Arôme complexe',
    qualite_c5_desc: 'Notes de cacao, boisées et légèrement fruitées — la signature de la vanille Bourbon de SAVA.',
    qualite_c6_title: 'Traçabilité complète',
    qualite_c6_desc: 'De la plantation à votre cuisine, chaque lot est traçable jusqu\'au producteur.',
    qualite_g1_label: '100% Naturelles',
    qualite_g1_desc: 'Sans additif ni conservateur',
    qualite_g2_label: 'Récolte Sélective',
    qualite_g2_desc: 'Cueillie à maturité optimale',
    qualite_g3_label: 'Origine Certifiée',
    qualite_g3_desc: 'Région SAVA, Madagascar',

    // FAQ
    faq_label: 'Questions fréquentes',
    faq_title: 'Vos Questions, Nos Réponses',
    faq_subtitle: 'Tout ce que vous devez savoir sur notre vanille et comment la commander.',
    faq_contact_title: 'Vous n\'avez pas trouvé votre réponse ?',
    faq_contact_subtitle: 'Contactez-nous directement sur WhatsApp, nous répondons rapidement.',
    faq_contact_btn: 'Nous contacter',

    // Contact
    contact_label: 'Nous contacter',
    contact_title: 'Parlons Vanille',
    contact_subtitle: 'Une question sur nos produits, une commande spécifique ou simplement envie de découvrir notre vanille ? Nous sommes là.',
    contact_whatsapp_title: 'WhatsApp',
    contact_whatsapp_desc: 'La façon la plus rapide de nous joindre. Réponse sous 24h.',
    contact_whatsapp_btn: 'Ouvrir WhatsApp',
    contact_phone_title: 'Téléphone',
    contact_info_title: 'Informations',
    contact_location: 'Madagascar — Région SAVA',
    contact_hours: 'Lun-Sam : 8h–18h (heure Madagascar)',
    contact_form_title: 'Envoyer un message',
    contact_name: 'Votre nom',
    contact_email: 'Votre email',
    contact_subject: 'Sujet',
    contact_message: 'Votre message',
    contact_send: 'Envoyer le message',
    contact_sending: 'Envoi en cours...',
    contact_success: 'Message envoyé ! Nous vous répondrons très prochainement.',

    // Footer
    footer_tagline: 'L\'essence naturelle, le goût authentique.',
    footer_nav_title: 'Navigation',
    footer_contact_title: 'Contact',
    footer_rights: 'Tous droits réservés.',
    footer_origin: 'Fait avec passion à Madagascar',

    // WhatsApp messages
    wa_greeting: 'Bonjour Ts\'Art Épices !',
    wa_want_order: 'Je souhaite commander :',
    wa_product: 'Produit',
    wa_format: 'Format',
    wa_quantity: 'Quantité',
    wa_unit_price: 'Prix unitaire',
    wa_total: 'Total estimé',
    wa_confirm: 'Merci de confirmer la disponibilité et de me donner les instructions de livraison.',
    wa_tube_label: '5 gousses en tube de verre',
  },

  en: {
    cart_view: 'View my cart',
    // Navbar
    nav_home: 'Home',
    nav_vanille: 'Our Vanilla',
    nav_histoire: 'Our Story',
    nav_qualite: 'Quality',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',

    // Homepage — Hero
    hero_badge: 'Bourbon Vanilla · Madagascar',
    hero_title_1: 'Ts\'Art Épices',
    hero_title_2: 'Madagascar',
    hero_subtitle: '100% natural pods, hand-selected in the SAVA region. Artisanal, authentic, exceptional.',
    hero_cta_order: 'Order via WhatsApp',
    hero_cta_discover: 'Discover our formats',
    hero_scroll: 'Scroll',

    // Homepage — Formats
    formats_title: 'Our Formats',
    formats_subtitle: 'Madagascar Bourbon vanilla in the packaging that suits you',
    formats_by_weight: 'By Weight',
    formats_by_weight_desc: 'From 50g to 1kg — for all needs',
    formats_tube: 'Glass Tube',
    formats_tube_desc: 'Artisanal glass tube packaging',
    formats_tube_gift: 'Perfect gift',

    // Homepage — Origin
    origin_label: 'Our Origin',
    origin_title: 'At the heart of the SAVA region',
    origin_p1: 'The SAVA region, in north-eastern Madagascar, is the birthplace of the world\'s finest Bourbon vanilla. It is in this exceptional terroir that Ts\'Art Épices cultivates its pods with passion.',
    origin_p2: 'Each pod is the result of a meticulous process: hand pollination, harvest at optimal maturity, then months of curing to develop the intense aromas that have made our vanilla famous.',
    origin_p3: 'From flower to pod, our ancestral expertise guarantees vanilla of unparalleled quality.',
    origin_link: 'Discover our story',

    // Homepage — Selection
    selection_title: 'Selection',
    selection_subtitle: 'Our most popular formats',
    selection_see_all: 'View all formats',

    // Homepage — Trust
    trust_title: 'Our Commitment',
    trust_subtitle: 'What makes Ts\'Art Épices different',
    trust_natural_title: '100% Natural',
    trust_natural_desc: 'No additives, no chemical treatment. Our pods are grown and dried using traditional methods.',
    trust_harvest_title: 'Selective Harvest',
    trust_harvest_desc: 'Each pod is hand-picked at optimal maturity and selected by hand to guarantee irreproachable quality.',
    trust_origin_title: 'Madagascar Origin',
    trust_origin_desc: 'Grown in the SAVA region, the birthplace of the world\'s finest Bourbon vanilla.',

    // Homepage — CTA Banner
    cta_title: 'Order your vanilla',
    cta_subtitle: 'Choose your formats and bring them together in one order.',
    cta_btn: 'Order on WhatsApp',

    // Product card / detail
    product_unit_price: 'Unit price',
    product_quantity: 'Quantity',
    product_total: 'Estimated total',
    product_availability: 'Availability',
    product_in_stock: 'In stock',
    product_on_order: 'On order',
    product_order_wa: 'Order via WhatsApp',
    product_see_detail: 'View detail',
    product_per_unit: 'per unit',
    product_format_tube: 'Glass Tube — 5 pods',
    product_format_weight: 'Format',
    product_description: 'Description',
    product_origin: 'Origin',
    product_conservation: 'Storage',
    product_others: 'You might also like',

    // Catalog page
    catalog_label: 'Catalogue',
    catalog_title: 'Our Vanilla',
    catalog_subtitle: '100% natural Madagascar Bourbon vanilla. Choose the format that suits you.',
    catalog_all: 'All',
    catalog_by_weight: 'By Weight',
    catalog_tube: 'Glass Tube',

    // Notre Histoire
    histoire_label: 'Our story',
    histoire_title: 'From the Earth to Your Table',
    histoire_subtitle: 'The story of Ts\'Art Épices begins in the tropical forests of Madagascar, with men and women passionate about their land.',
    histoire_journey_title: 'The journey of the pod',
    histoire_journey_subtitle: 'From plantation to your kitchen, every step is carried out with care.',
    histoire_step1_title: 'Planting',
    histoire_step1_desc: 'Vanilla cuttings are planted in the shade of the SAVA tropical forest.',
    histoire_step2_title: 'Flowering',
    histoire_step2_desc: 'After 3 years, the vanilla orchid produces its first flowers — ephemeral and precious.',
    histoire_step3_title: 'Pollination',
    histoire_step3_desc: 'Each flower is hand-pollinated, an ancestral gesture performed at dawn.',
    histoire_step4_title: 'Harvest',
    histoire_step4_desc: 'Pods are harvested one by one at optimal maturity, after 9 months of ripening.',
    histoire_step5_title: 'Drying & Curing',
    histoire_step5_desc: 'A months-long process of scalding, sweating and drying develops the aromas.',
    histoire_step6_title: 'Selection',
    histoire_step6_desc: 'Each pod is inspected and graded by our experts to keep only the best.',
    histoire_quality_title: 'Our Quality Standards',
    histoire_quality_btn: 'Discover',

    // Qualité
    qualite_label: 'Our Quality',
    qualite_title: 'Excellence in Every Pod',
    qualite_subtitle: 'Every batch of vanilla is checked against strict criteria inherited from the finest practices of the SAVA region.',
    qualite_criteria_title: 'Our Selection Criteria',
    qualite_guarantees_title: 'Our Guarantees',
    qualite_order_title: 'Ready to order?',
    qualite_order_subtitle: 'Contact us on WhatsApp to discuss your needs and place your order.',
    qualite_order_btn: 'Order on WhatsApp',
    qualite_c1_title: 'Optimal vanillin content',
    qualite_c1_desc: 'Our pods have an exceptionally high natural vanillin content, a sign of rich and intense aroma.',
    qualite_c2_title: 'Supple and oily pods',
    qualite_c2_desc: 'The oily, supple texture of our pods is a testament to their freshness and drying quality.',
    qualite_c3_title: 'Length 16–22 cm',
    qualite_c3_desc: 'We select large pods, a sign of maturity and aromatic richness.',
    qualite_c4_title: 'Deep brown colour',
    qualite_c4_desc: 'A uniform chocolate-brown colour, free from mould, indicates successful curing.',
    qualite_c5_title: 'Complex aroma',
    qualite_c5_desc: 'Notes of cocoa, wood, and subtle fruit — the signature of SAVA Bourbon vanilla.',
    qualite_c6_title: 'Full traceability',
    qualite_c6_desc: 'From plantation to your kitchen, every batch is traceable back to the producer.',
    qualite_g1_label: '100% Natural',
    qualite_g1_desc: 'No additives or preservatives',
    qualite_g2_label: 'Selective Harvest',
    qualite_g2_desc: 'Picked at optimal maturity',
    qualite_g3_label: 'Certified Origin',
    qualite_g3_desc: 'SAVA region, Madagascar',

    // FAQ
    faq_label: 'Frequently asked questions',
    faq_title: 'Your Questions, Our Answers',
    faq_subtitle: 'Everything you need to know about our vanilla and how to order.',
    faq_contact_title: 'Didn\'t find your answer?',
    faq_contact_subtitle: 'Contact us directly on WhatsApp — we respond quickly.',
    faq_contact_btn: 'Contact us',

    // Contact
    contact_label: 'Contact us',
    contact_title: 'Let\'s Talk Vanilla',
    contact_subtitle: 'A question about our products, a special order, or simply want to discover our vanilla? We\'re here.',
    contact_whatsapp_title: 'WhatsApp',
    contact_whatsapp_desc: 'The fastest way to reach us. Reply within 24h.',
    contact_whatsapp_btn: 'Open WhatsApp',
    contact_phone_title: 'Phone',
    contact_info_title: 'Information',
    contact_location: 'Madagascar — SAVA Region',
    contact_hours: 'Mon–Sat: 8am–6pm (Madagascar time)',
    contact_form_title: 'Send a message',
    contact_name: 'Your name',
    contact_email: 'Your email',
    contact_subject: 'Subject',
    contact_message: 'Your message',
    contact_send: 'Send message',
    contact_sending: 'Sending...',
    contact_success: 'Message sent! We\'ll get back to you very soon.',

    // Footer
    footer_tagline: 'Natural essence, authentic taste.',
    footer_nav_title: 'Navigation',
    footer_contact_title: 'Contact',
    footer_rights: 'All rights reserved.',
    footer_origin: 'Made with passion in Madagascar',

    // WhatsApp messages
    wa_greeting: 'Hello Ts\'Art Épices!',
    wa_want_order: 'I would like to order:',
    wa_product: 'Product',
    wa_format: 'Format',
    wa_quantity: 'Quantity',
    wa_unit_price: 'Unit price',
    wa_total: 'Estimated total',
    wa_confirm: 'Please confirm availability and provide delivery instructions.',
    wa_tube_label: '5 pods in glass tube',
  },
} as const;

export type TranslationKey = keyof typeof translations.fr;

// ─────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────
interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.fr[key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
