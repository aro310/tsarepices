interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'green' | 'neutral';
}

export default function Badge({ children, variant = 'gold' }: BadgeProps) {
  const variants = {
    gold: 'bg-vanilla-400/10 text-vanilla-400 border-vanilla-400/20',
    green: 'bg-nature-500/10 text-nature-400 border-nature-500/20',
    neutral: 'bg-dark-500/50 text-cream-300 border-cream-400/10',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}
