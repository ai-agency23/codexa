
import { useState } from 'react';
import SectionHeading from './SectionHeading.jsx';
import ArrowIcon from './ArrowIcon.jsx';

const initialValues = {
  name: '',
  email: '',
  type: '',
  message: '',
  companyWebsite: ''
};

function validate(values, form) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'required';

  if (!values.email.trim()) {
    errors.email = 'required';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
  ) {
    errors.email = 'emailInvalid';
  }

  if (!values.type) errors.type = 'required';

  if (!values.message.trim()) {
    errors.message = 'required';
  } else if (values.message.trim().length < 12) {
    errors.message = 'messageShort';
  }

  if (form && Object.keys(errors).length) {
    const firstField = form.querySelector(
      `[name="${Object.keys(errors)[0]}"]`
    );
    firstField?.focus();
  }

  return errors;
}

export default function Contact({ t, direction }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState('');

  const copy = t.contact.form;
  const arrowDirection = direction === 'rtl' ? 'left' : 'right';

  const update = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: ''
      }));
    }

    if (serverError) setServerError('');
  };

  const submit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values, event.currentTarget);
    setErrors(nextErrors);
    setServerError('');

    if (Object.keys(nextErrors).length || isSending) return;

    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Sending failed');
      }

      setValues(initialValues);
      setSubmitted(true);
    } catch (error) {
      console.error('Contact form error:', error);
      setServerError(copy.sendError);
    } finally {
      setIsSending(false);
    }
  };

  const errorText = (field) =>
    errors[field] ? copy[errors[field]] : '';

  return (
    <section
      className="contact section-block"
      id="contact"
      aria-labelledby="section-title-07"
    >
      <div className="contact__glow" aria-hidden="true" />

      <div className="page-shell contact__layout">
        <div className="contact__intro">
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            body={t.contact.body}
            number="07"
          />
        </div>

        <div className="contact-form-wrap" data-reveal>
          {submitted ? (
            <div
              className="form-success"
              role="status"
              aria-live="polite"
            >
              <span
                className="form-success__icon"
                aria-hidden="true"
              >
                ✓
              </span>

              <h3>{copy.successTitle}</h3>
              <p>{copy.successBody}</p>

              <button
                className="text-link"
                type="button"
                onClick={() => setSubmitted(false)}
              >
                <span>{copy.reset}</span>
                <ArrowIcon direction="up" />
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              noValidate
              onSubmit={submit}
              aria-label={copy.formLabel}
              aria-busy={isSending}
            >
              {/* Honeypot field - leave empty */}
<div
  aria-hidden="true"
  style={{
    position: 'absolute',
    left: '-5000px',
    width: '1px',
    height: '1px',
    overflow: 'hidden'
  }}
>
  <input
    type="text"
    name="companyWebsite"
    value={values.companyWebsite}
    onChange={update}
    tabIndex={-1}
    autoComplete="off"
  />
</div>
              <div className="contact-form__row">
                <div className="form-field">
                  <label htmlFor="contact-name">
                    {copy.name}
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={update}
                    placeholder={copy.namePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? 'contact-name-error' : undefined
                    }
                  />

                  {errors.name && (
                    <span
                      className="form-error"
                      id="contact-name-error"
                    >
                      {errorText('name')}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">
                    {copy.email}
                    <span aria-hidden="true">*</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update}
                    placeholder={copy.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'contact-email-error' : undefined
                    }
                  />

                  {errors.email && (
                    <span
                      className="form-error"
                      id="contact-email-error"
                    >
                      {errorText('email')}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-type">
                  {copy.type}
                  <span aria-hidden="true">*</span>
                </label>

                <select
                  id="contact-type"
                  name="type"
                  value={values.type}
                  onChange={update}
                  aria-invalid={Boolean(errors.type)}
                  aria-describedby={
                    errors.type ? 'contact-type-error' : undefined
                  }
                >
                  <option value="" disabled>
                    {copy.typePlaceholder}
                  </option>

                  {Object.entries(copy.types).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>

                {errors.type && (
                  <span
                    className="form-error"
                    id="contact-type-error"
                  >
                    {errorText('type')}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">
                  {copy.message}
                  <span aria-hidden="true">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  maxLength="1200"
                  value={values.message}
                  onChange={update}
                  placeholder={copy.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                />

                {errors.message && (
                  <span
                    className="form-error"
                    id="contact-message-error"
                  >
                    {errorText('message')}
                  </span>
                )}
              </div>

              {serverError && (
                <p className="form-error" role="alert">
                  {serverError}
                </p>
              )}

              <div className="contact-form__bottom">
                <button
                  className="button button--primary"
                  type="submit"
                  disabled={isSending}
                >
                  <span>
                    {isSending ? copy.sending : copy.submit}
                  </span>

                  {!isSending && (
                    <ArrowIcon direction={arrowDirection} />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
