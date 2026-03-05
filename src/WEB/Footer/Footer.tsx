import './Footer.css'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { t } = useTranslation();
  const [inView, setInView] = useState(false);

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
    const footerEl = document.getElementById('footer_section');
    if (!footerEl) return;
    
    // Add initial state check on mount
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
             setInView(false);
          }
        });
      },
      { threshold: 0.15 } // slightly earlier
    );
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="footer_section" className={inView ? 'in-view' : ''}>
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
          placeholder={t('Email') || 'Your email'}
          required
        />
        <textarea
          name="message"
          placeholder={t('Message') || 'Your message'}
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
