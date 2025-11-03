import { useTranslations } from 'next-intl';

export default function PricingPage() {
  const t = useTranslations('pricing');

  return (
    <main className="flex min-h-screen items-center justify-center pt-32 px-4">
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
      </div>
    </main>
  );
}