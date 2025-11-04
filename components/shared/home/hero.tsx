"use client";

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Sparkles, MessageSquare, Database, Brain, FileText, ArrowLeft, ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const Hero = ({ title, subtitle, description, rag, locale }: { 
  title: string; 
  subtitle: string; 
  description: string; 
  rag: string; 
  locale: string;
}) => {
  const t = useTranslations('home');
  const isRTL = locale === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const features = [
    {
      title: t('features.feature1.title'),
      description: t('features.feature1.description'),
      icon: Sparkles,
    },
    {
      title: t('features.feature2.title'),
      description: t('features.feature2.description'),
      icon: Sparkles,
    },
    {
      title: t('features.feature3.title'),
      description: t('features.feature3.description'),
      icon: Sparkles,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div className="relative min-h-screen w-full pt-44 pb-20 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 opacity-50" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative z-10 text-center w-full max-w-7xl mx-auto px-4 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main heading */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <motion.span
                className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {title}
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {description}{" "}
              <span className="font-semibold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
                {rag}
              </span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4",
              isRTL && "sm:flex-row-reverse"
            )}
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="group text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20"
              >
                <Link href="/upload" className="cursor-pointer">
                  {t('cta.uploadDocuments')}
                  {isRTL ? <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" /> : <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                <Link href="/about" className="cursor-pointer">
                  {t('cta.learnMore')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-16"
            variants={itemVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="flex items-center justify-center gap-2 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
            <motion.div
              className="w-2 h-2 rounded-full bg-primary/60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => {
            const howItWorksSection = document.getElementById('how-it-works');
            if (howItWorksSection) {
              howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Scroll to learn more</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="relative w-full py-20 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="leading-[85px] text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>

          {/* Two Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Step 1: Upload */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-full bg-gradient-to-br from-background to-muted/30 rounded-3xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="absolute top-6 end-6 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <div className="space-y-6 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Upload className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{t('howItWorks.step1.title')}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('howItWorks.step1.description')}
                  </p>
                  <Button
                    asChild
                    className="w-full group/btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Link href="/upload" className="cursor-pointer">
                      {t('howItWorks.step1.button')}
                      {isRTL ? <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" /> : <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Chat */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative h-full bg-gradient-to-br from-background to-muted/30 rounded-3xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="absolute top-6 end-6 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <div className="space-y-6 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{t('howItWorks.step2.title')}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('howItWorks.step2.description')}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group/btn border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <Link href="/chat" className="cursor-pointer">
                      {t('howItWorks.step2.button')}
                      {isRTL ? <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" /> : <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technology Stack */}
          <motion.div
            className="text-center space-y-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="leading-[60px] text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              {t('howItWorks.technology.title')}
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.technology.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Vector Database */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">{t('howItWorks.technology.vectorDb.title')}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t('howItWorks.technology.vectorDb.description')}
              </p>
            </motion.div>

            {/* LangChain */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">{t('howItWorks.technology.langchain.title')}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t('howItWorks.technology.langchain.description')}
              </p>
            </motion.div>

            {/* LLM */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/30 rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">{t('howItWorks.technology.llm.title')}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t('howItWorks.technology.llm.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
