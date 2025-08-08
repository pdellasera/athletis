import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLoader from './PageLoader';

interface PageWrapperProps {
  children: ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  loadingVariant?: 'default' | 'sport' | 'minimal';
  showLogo?: boolean;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  loading = false,
  loadingMessage = "Cargando página...",
  loadingVariant = 'default',
  showLogo = true,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PageLoader 
              message={loadingMessage}
              size="large"
              variant={loadingVariant}
              showLogo={showLogo}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageWrapper;