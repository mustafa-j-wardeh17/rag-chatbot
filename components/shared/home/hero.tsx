"use client";

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, Sparkles } from 'lucide-react';
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
        className="relative z-10 text-center w-full max-w-6xl mx-auto px-4 space-y-12"
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
                <ArrowRight className={cn(
                  "ml-2 h-5 w-5 transition-transform group-hover:translate-x-1",
                  isRTL && "mr-2 ml-0 group-hover:-translate-x-1"
                )} />
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
    </div>
  );
};

export default Hero;
