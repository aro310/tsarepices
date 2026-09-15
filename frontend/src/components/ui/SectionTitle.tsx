import AnimatedSection from './AnimatedSection';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true, light = false }: SectionTitleProps) {
  return (
    <AnimatedSection className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 ${
        light ? 'text-dark-900' : 'text-cream-100'
      }`}>
        {title}
      </h2>
      <div className="section-divider mb-4" />
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-2xl ${centered ? 'mx-auto' : ''} ${
          light ? 'text-dark-500' : 'text-cream-400'
        }`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
