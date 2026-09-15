'use client';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { useI18n } from '@/lib/i18n';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { t } = useI18n();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="page-hero pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-vanilla-400 text-sm tracking-[0.2em] uppercase">{t('contact_label')}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-3 mb-4">
              {t('contact_title')}
            </h1>
            <p className="text-cream-400 text-lg max-w-2xl mx-auto">
              {t('contact_subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl text-cream-100 mb-6">{t('contact_form_title')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-cream-300 text-sm mb-1 block">{t('contact_name')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="input-vanilla"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-cream-300 text-sm mb-1 block">{t('contact_email')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="input-vanilla"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-cream-300 text-sm mb-1 block">{t('contact_subject')}</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm({...form, subject: e.target.value})}
                      className="input-vanilla"
                      placeholder="Demande d'information"
                    />
                  </div>
                  <div>
                    <label className="text-cream-300 text-sm mb-1 block">{t('contact_message')}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      className="input-vanilla resize-none"
                      placeholder="..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold text-dark-900 font-semibold px-8 py-3 rounded-lg w-full md:w-auto disabled:opacity-50"
                  >
                    {status === 'sending' ? t('contact_sending') : t('contact_send')}
                  </button>
                  {status === 'sent' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-nature-400">
                      ✅ {t('contact_success')}
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-400">Une erreur est survenue. Veuillez réessayer.</p>
                  )}
                </form>
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <div className="glass-card rounded-xl p-8 space-y-6">
                  <h3 className="font-display text-xl text-cream-100 mb-4">{t('contact_info_title')}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-cream-300 text-sm mb-1">Email</p>
                      <a href="mailto:aroratovoharison@gmail.com" className="text-vanilla-400 hover:text-vanilla-300 transition-colors font-medium">
                        Nous contacter par email
                      </a>
                    </div>
                    <div>
                      <p className="text-cream-300 text-sm mb-1">{t('contact_phone_title')}</p>
                      <a href="tel:+261385467110" className="text-cream-100 hover:text-vanilla-400 transition-colors">
                        +261 38 54 671 10
                      </a>
                    </div>
                    <div>
                      <p className="text-cream-300 text-sm mb-1">{t('product_origin')}</p>
                      <p className="text-cream-400">{t('contact_location')}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-vanilla-400/10">
                    <p className="text-cream-400 text-sm mb-3">Pour nous écrire directement :</p>
                    <a
                      href="mailto:aroratovoharison@gmail.com"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-vanilla-500 hover:bg-vanilla-400 text-dark-900 font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-vanilla-500/30"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Envoyer un email
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
