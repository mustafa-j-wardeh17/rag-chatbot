"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import ContactMap from '@/components/shared/contact-map';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t('form.success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const contactInfo = [
    {
      icon: Mail,
      title: t('contactInfo.email'),
      value: 'support@ragchatbot.com',
      href: 'mailto:support@ragchatbot.com',
    },
    {
      icon: Phone,
      title: t('contactInfo.phone'),
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: t('contactInfo.address'),
      value: t('contactInfo.addressValue'),
      href: '#',
    },
  ];

  return (
    <main className="min-h-screen pt-44 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-4"
            variants={itemVariants}
          >
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            {t('title')}
          </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">{info.title}</h3>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-primary/10 shadow-lg space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="name" className="text-sm mb-2 font-semibold text-foreground">
                    {t('form.name')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('form.namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    {t('form.email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </motion.div>
              </div>

              {/* Subject Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="subject" className="text-sm font-semibold text-foreground">
                  {t('form.subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={t('form.subjectPlaceholder')}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="message" className="text-sm font-semibold text-foreground">
                  {t('form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('form.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full min-h-[150px]"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-[200px] group"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>{t('form.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>{t('form.submit')}</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ContactMap
            latitude={31.622856939373985}
            longitude={35.13434940023799}
            className="w-full"
          />
        </motion.div>
      </div>
    </main>
  );
}
