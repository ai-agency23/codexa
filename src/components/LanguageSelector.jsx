const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'fr', label: 'FR' },
];

export default function LanguageSelector({ language, onChange, label, className = '' }) {
  return (
    <div className={`language-switch ${className}`.trim()} role="group" aria-label={label}>
      {languages.map((item) => (
        <button
          className="language-switch__button"
          type="button"
          key={item.code}
          aria-pressed={language === item.code}
          onClick={() => onChange(item.code)}
          lang={item.code}
          dir="ltr"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
