"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Building2,
  CheckCircle2,
  ChevronLeft,
  MapPin,
  Compass,
  PoundSterling,
  User,
  Mail,
  Phone,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SunGauge } from "@/components/SunGauge";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import {
  formatUkPostcode,
  isValidEmail,
  isValidFullName,
  isValidUkPhone,
  isValidUkPostcode,
} from "@/lib/validation";
import type {
  BillBand,
  OwnershipStatus,
  PropertyType,
  QuoteFormData,
  RoofDirection,
} from "@/types";
import { initialQuoteFormData } from "@/types";

const TOTAL_STEPS = 6;

const ownershipOptions: { value: OwnershipStatus; icon: typeof Home }[] = [
  { value: "Homeowner", icon: Home },
  { value: "Mortgage", icon: Building2 },
  { value: "Tenant", icon: User },
];

const propertyOptions: PropertyType[] = [
  "Detached",
  "Semi Detached",
  "Terraced",
  "Bungalow",
  "Flat",
];

const roofOptions: RoofDirection[] = ["South", "East", "West", "North", "Not Sure"];

const billOptions: BillBand[] = ["£0-75", "£75-150", "£150-250", "£250+"];

type Direction = 1 | -1;

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<Direction>(1);
  const [data, setData] = useState<QuoteFormData>(initialQuoteFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const isTenant = data.ownership === "Tenant";

  const progress = useMemo(() => {
    if (isSubmitted) return 100;
    if (isTenant) return (1 / TOTAL_STEPS) * 100;
    return (step / TOTAL_STEPS) * 100;
  }, [step, isSubmitted, isTenant]);

  function goNext() {
    setTouched(false);
    setDirection(1);
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  function goBack() {
    setTouched(false);
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  }

  function updateField<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function selectAndAdvance<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    updateField(key, value);
    if (key === "ownership" && value === "Tenant") return;
    window.setTimeout(goNext, 180);
  }

  const postcodeValid = isValidUkPostcode(data.postcode);
  const nameValid = isValidFullName(data.fullName);
  const emailValid = isValidEmail(data.email);
  const phoneValid = isValidUkPhone(data.phone);
  const detailsValid = nameValid && emailValid && phoneValid && data.consent;

  async function handleSubmit() {
    setTouched(true);
    if (!detailsValid) return;
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        postcode: data.postcode,
        property_type: data.propertyType,
        roof_direction: data.roofDirection,
        electricity_bill: data.monthlyBill,
        home_ownership: data.ownership,
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "Sorry, something went wrong sending your details. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const variants = {
    enter: (dir: Direction) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: Direction) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  };

  return (
    <section id="quote-form" className="relative bg-surface-card dark:bg-surface-cardDark py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-5">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl">
            Your Free Eligibility Check
          </h2>
          <p className="mt-3 text-ink-soft dark:text-white/60">
            Six quick questions. No sales calls until you say so.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white dark:bg-[#141b18] p-6 shadow-card sm:p-10">
          {!isSubmitted && (
            <div className="mb-8 flex items-center gap-5">
              <SunGauge
                progress={progress}
                size={64}
                strokeWidth={6}
                label=""
                className="shrink-0 text-primary"
              />
              <div className="w-full">
                <div className="flex items-center justify-between text-xs font-medium text-ink-soft dark:text-white/50">
                  <span>
                    Step {Math.min(step, TOTAL_STEPS)} of {TOTAL_STEPS}
                  </span>
                  <span className="tabular">{Math.round(progress)}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                >
                  <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={2} />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink dark:text-white">
                  Thanks!
                </h3>
                <p className="mt-3 max-w-sm text-ink-soft dark:text-white/60">
                  Your details have been received. A trusted installer may
                  contact you shortly to discuss your free quotation.
                </p>
              </motion.div>
            ) : isTenant ? (
              <motion.div
                key="tenant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5 dark:bg-white/10">
                  <Home className="h-7 w-7 text-ink-soft dark:text-white/50" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink dark:text-white">
                  Solar isn&rsquo;t currently available for tenants
                </h3>
                <p className="mt-3 max-w-sm text-ink-soft dark:text-white/60">
                  Solar panel installation requires the property owner&rsquo;s
                  permission, so we&rsquo;re unable to progress your check
                  today. If that changes, or if you own another property,
                  you&rsquo;re welcome to come back and try again.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setData(initialQuoteFormData);
                    setStep(1);
                  }}
                >
                  Start again
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {step === 1 && (
                  <StepShell title="Do you own your property?">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {ownershipOptions.map(({ value, icon: Icon }) => (
                        <ChoiceCard
                          key={value}
                          label={value}
                          icon={<Icon className="h-5 w-5" />}
                          selected={data.ownership === value}
                          onClick={() => selectAndAdvance("ownership", value)}
                        />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell title="What type of property is it?">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {propertyOptions.map((value) => (
                        <ChoiceCard
                          key={value}
                          label={value}
                          selected={data.propertyType === value}
                          onClick={() => selectAndAdvance("propertyType", value)}
                        />
                      ))}
                    </div>
                    <BackLink onBack={goBack} />
                  </StepShell>
                )}

                {step === 3 && (
                  <StepShell
                    title="Which direction does your roof mainly face?"
                    icon={<Compass className="h-4 w-4" />}
                  >
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {roofOptions.map((value) => (
                        <ChoiceCard
                          key={value}
                          label={value}
                          selected={data.roofDirection === value}
                          onClick={() => selectAndAdvance("roofDirection", value)}
                        />
                      ))}
                    </div>
                    <BackLink onBack={goBack} />
                  </StepShell>
                )}

                {step === 4 && (
                  <StepShell
                    title="What's your average monthly electricity bill?"
                    icon={<PoundSterling className="h-4 w-4" />}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {billOptions.map((value) => (
                        <ChoiceCard
                          key={value}
                          label={value}
                          selected={data.monthlyBill === value}
                          onClick={() => selectAndAdvance("monthlyBill", value)}
                        />
                      ))}
                    </div>
                    <BackLink onBack={goBack} />
                  </StepShell>
                )}


                {step === 5 && (
                  <StepShell title="What's your postcode?" icon={<MapPin className="h-4 w-4" />}>
                    <label htmlFor="postcode" className="sr-only">
                      Postcode
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft/50" />
                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="e.g. SW1A 1AA"
                        value={data.postcode}
                        onChange={(e) => updateField("postcode", e.target.value.toUpperCase())}
                        onBlur={() => setTouched(true)}
                        className={cn(
                          "w-full rounded-xl border bg-white dark:bg-white/5 py-4 pl-12 pr-4 text-base text-ink dark:text-white placeholder:text-ink-soft/40 outline-none transition-colors",
                          touched && !postcodeValid && data.postcode
                            ? "border-red-400 focus:border-red-500"
                            : "border-black/10 dark:border-white/15 focus:border-primary"
                        )}
                      />
                    </div>
                    {touched && !postcodeValid && data.postcode && (
                      <p className="mt-2 text-sm text-red-500">
                        Please enter a valid UK postcode.
                      </p>
                    )}
                    <p className="mt-2 text-xs text-ink-soft dark:text-white/40">
                      We use this to match you with installers who cover your
                      area.
                    </p>

                    <StepFooter
                      onBack={goBack}
                      onNext={() => {
                        setTouched(true);
                        if (postcodeValid) {
                          updateField("postcode", formatUkPostcode(data.postcode));
                          goNext();
                        }
                      }}
                      nextLabel="Continue"
                      nextDisabled={!postcodeValid}
                    />
                  </StepShell>
                )}

                {step === 6 && (
                  <StepShell title="Almost done — where should we send your quote?">
                    <div className="space-y-4">
                      <FormField
                        id="fullName"
                        label="Full name"
                        icon={<User className="h-5 w-5" />}
                        value={data.fullName}
                        onChange={(v) => updateField("fullName", v)}
                        autoComplete="name"
                        placeholder="Jordan Smith"
                        error={touched && !nameValid ? "Please enter your full name." : undefined}
                      />
                      <FormField
                        id="email"
                        label="Email address"
                        icon={<Mail className="h-5 w-5" />}
                        value={data.email}
                        onChange={(v) => updateField("email", v)}
                        autoComplete="email"
                        type="email"
                        placeholder="you@example.com"
                        error={touched && !emailValid ? "Please enter a valid email address." : undefined}
                      />
                      <FormField
                        id="phone"
                        label="Phone number"
                        icon={<Phone className="h-5 w-5" />}
                        value={data.phone}
                        onChange={(v) => updateField("phone", v)}
                        autoComplete="tel"
                        type="tel"
                        placeholder="07123 456789"
                        error={touched && !phoneValid ? "Please enter a valid UK phone number." : undefined}
                      />

                      <label className="flex cursor-pointer items-start gap-3 pt-2 text-sm text-ink-soft dark:text-white/60">
                        <input
                          type="checkbox"
                          checked={data.consent}
                          onChange={(e) => updateField("consent", e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-primary focus:ring-primary"
                        />
                        <span>
                          I agree to be contacted regarding my solar quote.
                        </span>
                      </label>
                      {touched && !data.consent && (
                        <p className="text-sm text-red-500">
                          Please confirm you&rsquo;re happy to be contacted so we
                          can send your quote.
                        </p>
                      )}

                      <p className="flex items-start gap-2 rounded-xl bg-black/[0.03] dark:bg-white/5 p-3 text-xs text-ink-soft dark:text-white/40">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        Your information is only shared with vetted UK
                        installers so they can prepare your quote. We never
                        sell your data to third parties.
                      </p>
                    </div>

                    <div className="mt-6">
                      <Button
                        size="lg"
                        className="w-full"
                        isLoading={isSubmitting}
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                      </Button>
                      {submitError && (
                        <p className="mt-3 flex items-start gap-2 text-sm text-red-500">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          {submitError}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={goBack}
                        className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink dark:text-white/50 dark:hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </button>
                    </div>
                  </StepShell>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function StepShell({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-ink dark:text-white sm:text-xl">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}

function StepFooter({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <Button variant="outline" onClick={onBack} className="shrink-0" aria-label="Go back">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button className="flex-1" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
      </Button>
    </div>
  );
}

function BackLink({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mt-5 flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink dark:text-white/50 dark:hover:text-white"
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </button>
  );
}

function ChoiceCard({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-5 text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-primary/5 text-primary"
          : "border-black/10 dark:border-white/10 text-ink dark:text-white/80 hover:border-primary/40"
      )}
    >
      {icon}
      {label}
    </motion.button>
  );
}

function FormField({
  id,
  label,
  icon,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink dark:text-white/80">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/50">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-xl border bg-white dark:bg-white/5 py-3.5 pl-12 pr-4 text-base text-ink dark:text-white placeholder:text-ink-soft/40 outline-none transition-colors",
            error
              ? "border-red-400 focus:border-red-500"
              : "border-black/10 dark:border-white/15 focus:border-primary"
          )}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}
