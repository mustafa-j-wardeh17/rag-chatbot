"use client";
import { prepare } from "@/actions/prepare";
import PDFFileUpload, { FileProps } from "@/components/pdf-file-uploader";
import { Button } from "@/components/ui/button";
import { PDFSource } from "@/utils/pdf-loader";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Page() {
  const t = useTranslations('upload');
  const tCommon = useTranslations('common');
  const [file, setFile] = useState<FileProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  async function submit() {
    try {
      setLoading(true);
      setLoadingMsg(t('initializing'));

      const pdfSource: PDFSource = {
        type: "url",
        source: file?.url ?? "",
      };
      await prepare(pdfSource);
      
      // Show success message
      toast.success(t('uploaded'));
      
      // Reset to initial state after successful upload
      setLoading(false);
      setLoadingMsg("");
      setFile(null);
    } catch (error) {
      setLoading(false);
      setLoadingMsg("");
      toast.error(t('error'));
      console.log(error);
    }
  }

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

  return (
    <div>
      <div className="flex min-screen container mx-auto">
        <motion.div
          className="w-full min-h-screen max-w-5xl flex flex-col items-center justify-center mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-8 space-y-2" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">{t('description')}</p>
          </motion.div>

          {loading ? (
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{loadingMsg || tCommon('processing')}</p>
            </motion.div>
          ) : file ? (
            <motion.div variants={itemVariants}>
              <Button onClick={() => submit()} className="cursor-pointer">
                {t('uploadButton')}
              </Button>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto">
              <PDFFileUpload
                label={t('label')}
                file={file}
                setFile={setFile}
                endpoint="pdfUpload"
                className="w-full"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
