import Hero from '@/components/shared/home/hero';
import { getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <main className="relative">
      <Hero title={t('title')} subtitle={t('subtitle')} description={t('description')} rag={t('rag')} locale={locale} />
    </main> 
  );
}
