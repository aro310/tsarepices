'use client';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { useI18n } from '@/lib/i18n';

export default function QualitePage() {
  const { t } = useI18n();

  const criteria = [
    { title: t('qualite_c1_title'), desc: t('qualite_c1_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
    { title: t('qualite_c2_title'), desc: t('qualite_c2_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
    { title: t('qualite_c3_title'), desc: t('qualite_c3_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { title: t('qualite_c4_title'), desc: t('qualite_c4_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> },
    { title: t('qualite_c5_title'), desc: t('qualite_c5_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
    { title: t('qualite_c6_title'), desc: t('qualite_c6_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  return (
    <>
      <section className="page-hero pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-vanilla-400 text-sm tracking-[0.2em] uppercase">{t('qualite_label')}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-3 mb-4">{t('qualite_title')}</h1>
            <p className="text-cream-400 text-lg max-w-2xl mx-auto">
              {t('qualite_subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('qualite_criteria_title')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {criteria.map((c, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-8 h-full border border-dark-500 hover:border-vanilla-400/30 transition-all duration-300">
                  <div className="mb-6">{c.icon}</div>
                  <h3 className="font-display text-xl text-cream-100 mb-3">{c.title}</h3>
                  <p className="text-cream-400 leading-relaxed text-sm">{c.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-vanilla-400/20">
                <Image src="/images/product-500g.jpg" alt="Qualité Ts'Art Épices" fill className="object-cover" />
              </div>
            </AnimatedSection>
            <div>
              <SectionTitle title={t('qualite_guarantees_title')} />
              <div className="space-y-8">
                {[
                  { label: t('qualite_g1_label'), desc: t('qualite_g1_desc'), icon: <svg className="w-5 h-5 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 11a9 9 0 019 9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 4c-5.523 0-10 4.477-10 10 0 5.523 4.477 10 10 10V4z" /></svg> },
                  { label: t('qualite_g2_label'), desc: t('qualite_g2_desc'), icon: <svg className="w-5 h-5 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
                  { label: t('qualite_g3_label'), desc: t('qualite_g3_desc'), icon: <svg className="w-5 h-5 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                ].map((g, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-full bg-vanilla-400/10 flex items-center justify-center flex-shrink-0">
                        {g.icon}
                      </div>
                      <div>
                        <h4 className="font-display text-lg text-cream-100">{g.label}</h4>
                        <p className="text-cream-400 text-sm">{g.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900 border-t border-vanilla-400/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl text-cream-100 mb-4">{t('qualite_order_title')}</h2>
            <p className="text-cream-400 mb-8">{t('qualite_order_subtitle')}</p>
            <WhatsAppButton size="lg" label={t('qualite_order_btn')} />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
