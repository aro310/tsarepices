'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useI18n } from '@/lib/i18n';

// Static FAQ for now, we can move this to translations if needed,
// but for simplicity, we'll keep the structural translations here.
// I'll leave the Q&A in French for the MVP unless the user requests full data translation.
// Wait, I should translate these too.

const faqData = {
  fr: [
    {
      category: 'Conservation',
      items: [
        { q: 'Comment conserver mes gousses de vanille ?', a: 'Conservez vos gousses à l’abri de la lumière, à température ambiante (20-25°C). Après ouverture, placez-les dans un tube en verre ou un bocal hermétique pour éviter qu’elles ne sèchent.' },
        { q: 'Quelle est la durée de conservation ?', a: 'Bien conservées, nos gousses de vanille gardent leurs arômes pendant 12 à 18 mois. Le givre blanc qui peut apparaître est de la vanilline cristallisée — c’est un signe de qualité !' },
        { q: 'Peut-on congeler la vanille ?', a: 'Nous ne le recommandons pas. La congélation peut altérer la texture et les arômes. Préférez un bocal hermétique à température ambiante.' },
      ],
    },
    {
      category: 'Commande & Livraison',
      items: [
        { q: 'Comment passer commande ?', a: 'Cliquez sur le bouton « Commander via WhatsApp » sur la page du produit souhaité. Un message pré-rempli sera généré pour faciliter votre commande.' },
        { q: 'Quels sont les délais de livraison ?', a: 'Les délais varient selon votre localisation. Contactez-nous via WhatsApp pour connaître les délais précis et les frais de livraison pour votre zone.' },
      ],
    },
    {
      category: 'Produits',
      items: [
        { q: 'Quelle différence entre le format poids et le tube ?', a: 'Le format au poids (50g à 1kg) est idéal pour un usage régulier ou professionnel. Le tube en verre est un conditionnement artisanal élégant, parfait pour offrir ou pour garder vos gousses dans des conditions optimales.' },
        { q: 'Combien de gousses dans un paquet de 50g ?', a: 'Le nombre de gousses varie selon leur taille (16-22 cm). Un paquet de 50g contient généralement entre 8 et 15 gousses.' },
        { q: 'Qu’est-ce que la vanille Bourbon ?', a: 'La vanille Bourbon désigne la vanille Vanilla planifolia cultivée dans les îles de l’océan Indien (Madagascar, Comores, Réunion). C’est la variété la plus prisée au monde pour ses arômes complexes.' },
      ],
    }
  ],
  en: [
    {
      category: 'Storage',
      items: [
        { q: 'How should I store my vanilla pods?', a: 'Store your pods away from light, at room temperature (20-25°C). After opening, place them in a glass tube or airtight jar to prevent them from drying out.' },
        { q: 'What is the shelf life?', a: 'Properly stored, our vanilla pods keep their aroma for 12 to 18 months. The white frost that may appear is crystallized vanillin — it is a sign of quality!' },
        { q: 'Can I freeze vanilla?', a: 'We do not recommend it. Freezing can alter the texture and aroma. Prefer an airtight jar at room temperature.' },
      ],
    },
    {
      category: 'Orders & Delivery',
      items: [
        { q: 'How do I place an order?', a: 'Click the "Order via WhatsApp" button on the desired product page. A pre-filled message will be generated to facilitate your order.' },
        { q: 'What are the delivery times?', a: 'Delivery times vary depending on your location. Contact us via WhatsApp to get exact times and shipping costs for your area.' },
      ],
    },
    {
      category: 'Products',
      items: [
        { q: 'What is the difference between weight format and tube?', a: 'The weight format (50g to 1kg) is ideal for regular or professional use. The glass tube is an elegant artisanal packaging, perfect for gifting or keeping your pods in optimal conditions.' },
        { q: 'How many pods are in a 50g packet?', a: 'The number of pods varies according to their size (16-22 cm). A 50g packet generally contains between 8 and 15 pods.' },
        { q: 'What is Bourbon vanilla?', a: 'Bourbon vanilla refers to Vanilla planifolia grown in the Indian Ocean islands (Madagascar, Comoros, Reunion). It is the most prized variety in the world for its complex aromas.' },
      ],
    }
  ]
};

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-cream-100 group-hover:text-vanilla-400 transition-colors font-medium pr-4">
          {question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 text-vanilla-400 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-cream-400 pt-3 leading-relaxed text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const { t, lang } = useI18n();
  const currentFaq = faqData[lang];

  return (
    <>
      <section className="page-hero pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-vanilla-400 text-sm tracking-[0.2em] uppercase">{t('faq_label')}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-3 mb-4">
              {t('faq_title')}
            </h1>
            <p className="text-cream-400 text-lg max-w-2xl mx-auto">
              {t('faq_subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentFaq.map((group, gi) => (
            <AnimatedSection key={gi} delay={gi * 0.1}>
              <div className="mb-12">
                <h2 className="font-display text-2xl text-vanilla-400 mb-6">{group.category}</h2>
                <div className="glass-card rounded-xl p-6">
                  {group.items.map((item, i) => (
                    <FaqAccordion key={i} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-16 bg-dark-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl text-cream-100 mb-4">{t('faq_contact_title')}</h2>
            <p className="text-cream-400 mb-8">{t('faq_contact_subtitle')}</p>
            <a href="/contact" className="btn-gold inline-block text-dark-900 font-semibold px-8 py-3 rounded-lg">
              {t('faq_contact_btn')}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
