'use client';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useI18n } from '@/lib/i18n';

export default function NotreHistoirePage() {
  const { t } = useI18n();

  const steps = [
    { title: t('histoire_step1_title'), desc: t('histoire_step1_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
    { title: t('histoire_step2_title'), desc: t('histoire_step2_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
    { title: t('histoire_step3_title'), desc: t('histoire_step3_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11" /></svg> },
    { title: t('histoire_step4_title'), desc: t('histoire_step4_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { title: t('histoire_step5_title'), desc: t('histoire_step5_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { title: t('histoire_step6_title'), desc: t('histoire_step6_desc'), icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
  ];

  return (
    <>
      {/* Hero */}
      <section className="page-hero pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-vanilla-400 text-sm tracking-[0.2em] uppercase">{t('histoire_label')}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-3 mb-4">
              {t('histoire_title')}
            </h1>
            <p className="text-cream-400 text-lg max-w-2xl mx-auto">
              {t('histoire_subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Origin Map */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-4xl text-cream-100 mb-6">{t('origin_title')}</h2>
              <div className="space-y-4 text-cream-400 leading-relaxed">
                <p>{t('origin_p1')}</p>
                <p>{t('origin_p2')}</p>
                <p>{t('origin_p3')}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden border border-vanilla-400/20">
                <Image src="/images/madagascar-landscape.jpg" alt="Région SAVA, Madagascar" fill className="object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-cream-100 mb-4">{t('histoire_journey_title')}</h2>
            <p className="text-cream-400">{t('histoire_journey_subtitle')}</p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[2.25rem] md:before:ml-[50%] before:-translate-x-px md:before:mx-auto before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-vanilla-400/20 before:to-transparent">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-dark-500 border border-vanilla-400/20 flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display text-xl text-cream-100 mb-1">{step.title}</h3>
                    <p className="text-cream-400">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quality CTA */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative h-[300px] rounded-2xl overflow-hidden">
              <Image src="/images/quality-selection.jpg" alt="Sélection qualité" fill className="object-cover" />
              <div className="absolute inset-0 bg-dark-900/60 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="font-display text-3xl text-cream-100 mb-4">{t('histoire_quality_title')}</h2>
                  <a href="/qualite" className="btn-gold inline-block text-dark-900 font-semibold px-8 py-3 rounded-lg">
                    {t('histoire_quality_btn')}
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
