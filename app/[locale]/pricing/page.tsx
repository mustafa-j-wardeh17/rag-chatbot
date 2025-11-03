import { getTranslations } from 'next-intl/server';

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations('pricing');

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-2xl md:text-7xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
          {t('subtitle')}
        </h2>
      </div>
    </main>
  );
}