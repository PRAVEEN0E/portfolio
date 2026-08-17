import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import SocialIcon from './ui/SocialIcon';
import { socials } from '../data/content';

type FieldName = 'name' | 'email' | 'subject' | 'message';
type FormData = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const SUBJECT_PREFIX = '[Praveen Portfolio]';
const EMAIL = 'praveeneswaramoorthi08@gmail.com';

const EMPTY_FORM: FormData = { name: '', email: '', subject: '', message: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = 'Please enter your name.';
  else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Please enter a valid email address.';

  if (!form.subject.trim()) errors.subject = 'Please enter a subject.';
  else if (form.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.';

  if (!form.message.trim()) errors.message = 'Please enter a message.';
  else if (form.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [configError, setConfigError] = useState(false);

  const handleChange =
    (field: FieldName) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (status === 'success' || status === 'error') setStatus('idle');
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    if (!ACCESS_KEY) {
      console.error(
        'Contact form is not configured. Set VITE_WEB3FORMS_ACCESS_KEY in your .env file.'
      );
      setConfigError(true);
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: `${SUBJECT_PREFIX} ${form.subject.trim()}`,
          message: form.message.trim(),
          from_name: form.name.trim(),
          replyto: form.email.trim(),
          website: honeypot,
        }),
      });

      const data = (await response.json()) as { success?: boolean };
      if (data.success) {
        setStatus('success');
        setForm(EMPTY_FORM);
        setHoneypot('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 transition-all focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent ${
      hasError ? 'border-red-500/70' : 'border-line hover:border-caramel/40'
    }`;

  return (
    <section id="contact" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="-rotate-2 font-script text-2xl text-caramel sm:text-3xl">
              Let&rsquo;s build something meaningful.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              Have a project
              <br />
              <em className="text-caramel">in mind?</em>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 sm:mt-20">
          {/* Contact info */}
          <Reveal className="lg:pr-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-caramel" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-caramel">
                Contact Info
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Let&rsquo;s talk.
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
              Tell me about your project, your team, or just say hi. I&rsquo;ll get back to
              you as soon as I can.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-flex items-center gap-2.5 font-display text-lg text-caramel transition-colors hover:text-caramel-hover sm:text-xl"
            >
              <FiMail aria-hidden className="shrink-0" />
              {EMAIL}
            </a>

            <div className="mt-8 space-y-2.5 border-t border-line pt-6 text-sm text-ink-muted">
              <p className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-caramel" />
                Tamil Nadu, India
              </p>
              <p className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-caramel" />
                Available for opportunities
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {socials.map((s) => (
                <SocialIcon key={s.label} label={s.label} href={s.href} icon={s.icon} />
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8"
            >
              {configError && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  Contact form is not configured. Set VITE_WEB3FORMS_ACCESS_KEY in your .env
                  file and restart the dev server.
                </p>
              )}

              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                  maxLength={100}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass(!!errors.name)}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="your@email.com"
                  maxLength={254}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass(!!errors.email)}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-ink">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  placeholder="What is this regarding?"
                  maxLength={150}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={inputClass(!!errors.subject)}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-xs text-red-600">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  maxLength={2000}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClass(!!errors.message)} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot — invisible to humans, filled by bots */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-1 inline-flex w-full items-center justify-center gap-3 rounded-full bg-caramel px-8 py-4 text-sm font-semibold text-cream shadow-soft transition-all duration-300 hover:bg-caramel-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FiArrowUpRight
                      aria-hidden
                      className="transition-all duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <div aria-live="polite">
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-green-600/25 bg-green-50 px-4 py-3 text-sm text-green-700"
                  >
                    Message sent successfully. We&rsquo;ll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && !configError && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    Unable to send your message. Please try again.
                  </motion.p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}