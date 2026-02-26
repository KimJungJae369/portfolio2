import './Footer.css'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function Footer() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form submission could be handled via email API or simply mailto link
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    window.location.href = `mailto:ktk662002@naver.com?subject=Portfolio%20Contact&body=${encodeURIComponent(
      `From: ${email}\n\n${message}`
    )}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('ktk662002@naver.com');
    alert('Email copied to clipboard');
  };

  // add scroll observer to show footer with animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const footerEl = document.getElementById('footer_section');
    if (!footerEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('footer-in-view');
          } else {
            document.body.classList.remove('footer-in-view');
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(footerEl);
    return () => {
      observer.disconnect();
      document.body.classList.remove('footer-in-view');
    };
  }, []);

  return (
    <footer id="footer_section">
      <ul>
        <li>
            {t('footer.email')} : <a href="mailto:ktk662002@naver.com">ktk662002@naver.com</a>
        </li>

        <li>
            {t('footer.github')} : <a href="https://github.com/KimJungJae369/myPORTFOLIO">github.com</a>
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={t('footer.formEmail') || 'Your email'}
          required
        />
        <textarea
          name="message"
          placeholder={t('footer.formMessage') || 'Your message'}
          required
        />
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button type="submit">Send</button>
          <button type="button" className="copy-email" onClick={copyEmail}>
            Copy my email
          </button>
        </div>
      </form>
    </footer>
  );
}
