'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/products';
import { useI18n } from '@/lib/i18n';

export default function HomePage() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const featured = products.filter(p => p.featured);

  const trustItems = [
    {
      icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 11a9 9 0 019 9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 4c-5.523 0-10 4.477-10 10 0 5.523 4.477 10 10 10V4z" /></svg>,
      title: t('trust_natural_title'),
      desc: t('trust_natural_desc'),
    },
    {
      icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      title: t('trust_harvest_title'),
      desc: t('trust_harvest_desc'),
    },
    {
      icon: <svg className="w-8 h-8 text-vanilla-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      title: t('trust_origin_title'),
      desc: t('trust_origin_desc'),
    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="editorial-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-layout">
          <div className="hero-copy">
            <span className="hero-eyebrow hero-enter"><span />{t('hero_badge')}</span>
            <h1 className="hero-heading">
              <span className="hero-title-line"><span>{t('hero_title_1')}</span></span>
              <span className="hero-title-line"><em>{t('hero_title_2')}</em></span>
            </h1>
            <p className="hero-description hero-enter">{t('hero_subtitle')}</p>
            <div className="hero-actions hero-enter">
              <Link href="/vanille" className="btn-gold">{t('hero_cta_discover')}<span aria-hidden="true">↗</span></Link>
              <Link href="/panier">{t('cart_view')} →</Link>
            </div>
            <div className="hero-provenance hero-enter">
              <span>01 / SAVA</span><span>{t('trust_natural_title')}</span><span>{t('trust_harvest_title')}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <motion.div className="hero-image-inner" style={{ y: reduced ? 0 : imageY, scale: reduced ? 1 : imageScale }}>
                <Image src="/images/hero-vanilla.jpg" alt="Gousses de vanille Bourbon de Madagascar" fill className="object-cover" sizes="(max-width: 900px) 100vw, 50vw" priority />
              </motion.div>
              <div className="hero-image-shade" />
              <div className="hero-image-caption"><span>BOURBON</span><span>MADAGASCAR — SAVA</span></div>
            </div>
            <div className="origin-seal"><span>TS’ART ÉPICES</span><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 3v34M3 20h34M8 8l24 24M8 32 32 8" stroke="currentColor" strokeWidth="1" /><circle cx="20" cy="20" r="9" stroke="currentColor" /></svg><span>{t('trust_natural_title')}</span></div>
            <span className="hero-side-note" aria-hidden="true">VANILLA PLANIFOLIA / MADAGASCAR</span>
          </div>
        </div>
        <a href="#formats" className="hero-scroll"><span>{t('hero_scroll')}</span><span className="scroll-track" aria-hidden="true" /><span aria-hidden="true">↓</span></a>
      </section>
      <div className="origin-ribbon" aria-hidden="true">
        <span>BOURBON</span><i>✳</i><span>MADAGASCAR</span><i>✳</i><span>TS’ART ÉPICES</span><i>✳</i><span>SAVA</span><i>✳</i><span>VANILLA PLANIFOLIA</span>
      </div>

      {/* ── FORMATS ── */}
      <section id="formats" className="formats-section py-24 bg-dark-900 texture-noise relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            title={t('formats_title')}
            subtitle={t('formats_subtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Au Poids */}
            <AnimatedSection delay={0.1}>
              <div className="glass-card rounded-2xl p-8 text-center group hover:border-vanilla-400/30 transition-all duration-500">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image src="/images/product-50g.jpg" alt="Vanille au poids" sizes="(max-width: 768px) 100vw, 450px" fill className="object-cover rounded-xl" />
                </div>
                <h3 className="font-display text-2xl text-cream-100 mb-2">{t('formats_by_weight')}</h3>
                <p className="text-cream-400 mb-4">{t('formats_by_weight_desc')}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['50g', '100g', '250g', '500g', '1kg'].map(w => (
                    <span key={w} className="px-3 py-1 rounded-full bg-vanilla-400/10 text-vanilla-400 text-sm border border-vanilla-400/20">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            {/* Tube */}
            <AnimatedSection delay={0.2}>
              <div className="glass-card rounded-2xl p-8 text-center group hover:border-vanilla-400/30 transition-all duration-500">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image src="/images/product-tube.jpg" alt="Vanille en tube" sizes="(max-width: 768px) 100vw, 450px" fill className="object-cover rounded-xl" />
                </div>
                <h3 className="font-display text-2xl text-cream-100 mb-2">{t('formats_tube')}</h3>
                <p className="text-cream-400 mb-4">{t('formats_tube_desc')}</p>
                <span className="px-3 py-1 rounded-full bg-nature-500/10 text-nature-400 text-sm border border-nature-500/20">
                  {t('formats_tube_gift')}
                </span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── STORYTELLING ── */}
      <section className="story-section py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="story-image relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/madagascar-landscape.jpg"
                  alt="Plantation de vanille à Madagascar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="text-vanilla-400 text-sm tracking-[0.2em] uppercase font-medium">{t('origin_label')}</span>
              <h2 className="font-display text-3xl md:text-4xl text-cream-100 mt-3 mb-6">
                {t('origin_title')}
              </h2>
              <div className="space-y-4 text-cream-400 leading-relaxed">
                <p>{t('origin_p1')}</p>
                <p>{t('origin_p2')}</p>
                <p>{t('origin_p3')}</p>
              </div>
              <Link href="/notre-histoire" className="inline-flex items-center gap-2 text-vanilla-400 mt-6 hover:text-vanilla-300 transition-colors font-medium">
                {t('origin_link')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('selection_title')} subtitle={t('selection_subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-12">
            <Link href="/vanille" className="btn-gold inline-block text-dark-900 font-semibold px-8 py-3 rounded-lg">
              {t('selection_see_all')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('trust_title')} subtitle={t('trust_subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="glass-card rounded-2xl p-8 text-center hover:border-vanilla-400/30 transition-all duration-500">
                  <span className="mb-4 block flex justify-center">{item.icon}</span>
                  <h3 className="font-display text-xl text-cream-100 mb-3">{item.title}</h3>
                  <p className="text-cream-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="final-cta py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 mb-4">{t('cta_title')}</h2>
            <p className="text-cream-200/80 mb-8 text-lg">{t('cta_subtitle')}</p>
            <Link href="/vanille" className="btn-gold">{t('hero_cta_discover')} →</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}