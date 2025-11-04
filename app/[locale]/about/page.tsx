"use client";

import { useTranslations, useLocale } from 'next-intl';
import { FileText, Brain, Database, MessageSquare, Sparkles, Zap, Globe, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const locale = useLocale();
  const t = useTranslations('about');
  const isRTL = locale === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <main className="min-h-screen pt-44 pb-20 px-4">
      <motion.div
        className="container max-w-7xl mx-auto space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* What We Do Section */}
        <motion.section className="space-y-6" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {t('whatWeDo.title')}
          </h2>
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-8 md:p-12 border border-primary/20">
            <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
              {t('whatWeDo.description')}
            </p>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section className="space-y-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {t('howItWorks.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl mb-4 mx-auto">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{t('howItWorks.step1.title')}</h3>
              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                {t('howItWorks.step1.description')}
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl mb-4 mx-auto">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{t('howItWorks.step2.title')}</h3>
              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                {t('howItWorks.step2.description')}
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl mb-4 mx-auto">
                <Database className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{t('howItWorks.step3.title')}</h3>
              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                {t('howItWorks.step3.description')}
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl mb-4 mx-auto">
                <MessageSquare className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{t('howItWorks.step4.title')}</h3>
              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                {t('howItWorks.step4.description')}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="space-y-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {t('features.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('features.feature1.title')}</h3>
                  <p className="text-muted-foreground">{t('features.feature1.description')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('features.feature2.title')}</h3>
                  <p className="text-muted-foreground">{t('features.feature2.description')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('features.feature3.title')}</h3>
                  <p className="text-muted-foreground">{t('features.feature3.description')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('features.feature4.title')}</h3>
                  <p className="text-muted-foreground">{t('features.feature4.description')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Technology Stack Section */}
        <motion.section className="space-y-6" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {t('technology.title')}
          </h2>
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-8 md:p-12 border border-primary/20">
            <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
              {t('technology.description')}
            </p>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

