import { lazy, Suspense, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LazySmartAssistant = lazy(() => import('@/components/SmartAssistant'));

/**
 * Performance-focused launcher:
 * - Keeps a lightweight floating button visible.
 * - Loads the full assistant (and article dataset) only after user interaction.
 */
export default function SmartAssistantLauncher() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [mounted, setMounted] = useState(false);
  const [openAfterMount, setOpenAfterMount] = useState(false);

  const handleClick = () => {
    if (!mounted) {
      setMounted(true);
      setOpenAfterMount(true);
    }
  };

  return (
    <>
      {!mounted && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+10.5rem)] md:bottom-24 right-6 z-[60]">
          <Button
            size="lg"
            className="rounded-full shadow-lg gap-2"
            aria-label={isAr ? 'بحث الموقع' : 'Site search'}
            type="button"
            onClick={handleClick}
          >
            <Search className="h-5 w-5" />
            <span className="hidden sm:inline">{isAr ? 'بحث الموقع' : 'Site Search'}</span>
          </Button>
        </div>
      )}

      {mounted && (
        <Suspense fallback={null}>
          <LazySmartAssistant initialOpen={openAfterMount} />
        </Suspense>
      )}
    </>
  );
}
