import { useEffect, useMemo, useState } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Props = {
  language: 'ar' | 'en';
  onDone: () => void;
  /** Set to change the sequence and restart it (e.g. replay). */
  runId?: number;
};

/**
 * A bold, story-like hero intro sequence:
 * 1) Big headline
 * 2) Services block
 * 3) Problem statement paragraph
 * 4) Early-intervention value bullets
 * Then fades out and hands control back to the static hero layout.
 */
export default function HeroIntroSequence({ language, onDone, runId = 0 }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // phase: 0..3 (steps), 4 = fading out
  const [phase, setPhase] = useState<number>(() => (prefersReducedMotion ? 4 : 0));
  const [ending, setEnding] = useState<boolean>(() => prefersReducedMotion);

  const content = useMemo(() => {
    if (language === 'ar') {
      return {
        step0_title: (
          <>
            نحن نقوّي <span className="etlaq-hero-seq-accent">أساساتك</span>
          </>
        ),
        step1_services: (
          <>
            <div className="etlaq-hero-seq-kicker">شركة إطلاق المتميزة —</div>
            <div className="etlaq-hero-seq-lines">
              <div className="etlaq-hero-seq-line etlaq-hero-seq-line--a">حقن تربة</div>
              <div className="etlaq-hero-seq-line etlaq-hero-seq-line--b">كشف تكهفات</div>
              <div className="etlaq-hero-seq-line etlaq-hero-seq-line--c">جيوفيزياء GPR/ERT/MASW</div>
            </div>
          </>
        ),
        step2_paragraph:
          'في شركة إطلاق المتميزة نوفّر حلولًا لمعالجة الهبوطات والتشققات والتكهفات في الرياض وجميع مدن المملكة، عبر تثبيت الأساسات بحقن التربة، وكشف التكهفات بالتخريم (Cavity Probing) أو الحلول الجيوفيزيائية، ثم معالجة وملء التكهفات بالحقن الأسمنتي.',
        step3_benefitsTitle: 'نركّز على الحل المبكر لأنه يحقق:',
        step3_benefits: ['تكلفة أقل', 'وقت أقل', 'مخاطرة أقل', 'نتائج أكثر استقرارًا'],
      };
    }

    return {
      step0_title: (
        <>
          We Strengthen <span className="etlaq-hero-seq-accent">Your Foundations</span>
        </>
      ),
      step1_services: (
        <>
          <div className="etlaq-hero-seq-kicker">ETLAQ Distinguished Company —</div>
          <div className="etlaq-hero-seq-lines">
            <div className="etlaq-hero-seq-line etlaq-hero-seq-line--a">Soil Grouting</div>
            <div className="etlaq-hero-seq-line etlaq-hero-seq-line--b">Cavity Detection</div>
            <div className="etlaq-hero-seq-line etlaq-hero-seq-line--c">Geophysics GPR/ERT/MASW</div>
          </div>
        </>
      ),
      step2_paragraph:
        'At ETLAQ Distinguished Company, we provide solutions to address settlement, cracks, and cavities across Riyadh and all cities of the Kingdom—by stabilizing foundations with soil grouting, detecting cavities via Cavity Probing or geophysical solutions, then treating and filling cavities with cement grouting.',
      step3_benefitsTitle: 'We focus on early intervention because it delivers:',
      step3_benefits: ['Lower cost', 'Less time', 'Lower risk', 'More stable results'],
    };
  }, [language]);

  useEffect(() => {
    // If reduced motion is enabled, skip the sequence.
    if (prefersReducedMotion) {
      setPhase(4);
      setEnding(true);
      onDone();
      return;
    }

    setPhase(0);
    setEnding(false);

    const timeouts: number[] = [];
    const schedule = (ms: number, fn: () => void) => {
      const t = window.setTimeout(fn, ms);
      timeouts.push(t);
    };

    // Timeline (ms) — tuned to feel obvious but not slow.
    // Step 0: 2.4s, Step 1: 2.6s, Step 2: 4.0s, Step 3: 3.4s, then fade.
    schedule(2400, () => setPhase(1));
    schedule(2400 + 2600, () => setPhase(2));
    schedule(2400 + 2600 + 4000, () => setPhase(3));
    schedule(2400 + 2600 + 4000 + 3400, () => {
      setEnding(true);
      setPhase(4);
    });
    schedule(2400 + 2600 + 4000 + 3400 + 650, () => onDone());

    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, language, prefersReducedMotion]);

  return (
    <div
      className="etlaq-hero-seq"
      data-phase={phase}
      data-ending={ending ? '1' : '0'}
      aria-hidden="true"
    >
      {/* Step 0 */}
      <div className="etlaq-hero-seq-step etlaq-hero-seq-step--0">
        <h2 className="etlaq-hero-seq-title">{content.step0_title}</h2>
      </div>

      {/* Step 1 */}
      <div className="etlaq-hero-seq-step etlaq-hero-seq-step--1">
        <div className="etlaq-hero-seq-services">{content.step1_services}</div>
      </div>

      {/* Step 2 */}
      <div className="etlaq-hero-seq-step etlaq-hero-seq-step--2">
        <div className="etlaq-hero-seq-paragraph">{content.step2_paragraph}</div>
      </div>

      {/* Step 3 */}
      <div className="etlaq-hero-seq-step etlaq-hero-seq-step--3">
        <div className="etlaq-hero-seq-benefits">
          <div className="etlaq-hero-seq-benefits-title">{content.step3_benefitsTitle}</div>
          <ul className="etlaq-hero-seq-benefits-list">
            {content.step3_benefits.map((b, i) => (
              <li key={b} className="etlaq-hero-seq-benefit" style={{ ['--d' as any]: `${i * 120}ms` }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
