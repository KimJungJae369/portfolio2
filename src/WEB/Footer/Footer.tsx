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
      <div className="footer-shell">
        <div className="footer-intro">
          <p className="footer-kicker">CONTACT</p>
          <h2 className="footer-title">함께 이야기해요</h2>
          <p className="footer-subtitle">언제든지 연락주세요. 반갑게 답변드리겠습니다.</p>
        </div>

        <section className="footer-card footer-contact-card">
          <h3 className="footer-card-title">연락 방법</h3>
          <div className="contact-grid">
            <a className="contact-chip" href="mailto:ktk662002@naver.com">
              <span className="chip-icon chip-email">✉</span>
              <span className="chip-copy">
                <strong>{t('footer.email')}</strong>
                <small>ktk662002@naver.com</small>
              </span>
            </a>
            <a className="contact-chip" href="https://github.com/KimJungJae369/myPORTFOLIO.git" target="_blank" rel="noreferrer">
              <span className="chip-icon chip-github">◎</span>
              <span className="chip-copy">
                <strong>{t('footer.github')}</strong>
                <small>github.com/KimJungJae369/myPORTFOLIO.git</small>
              </span>
            </a>
          </div>
        </section>

        <section className="footer-card footer-guest-card">
          <h3 className="footer-card-title">방명록</h3>
          <p className="guestbook-note">방문해주셔서 감사해요! 한마디 남겨주세요 ✍️</p>

          <form className="guestbook-form" onSubmit={handleSubmit}>
            <div className="guestbook-row">
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
            </div>

            <div className="emoji-row" aria-hidden="true">이모지: 👋 🔥 ✨ 💡 🚀 💬 🙌 ❤️</div>

            <div className="guestbook-actions">
              <button type="submit">Send</button>
              <button type="button" className="copy-email" onClick={copyEmail}>
                Copy my email
              </button>
            </div>
          </form>
        </section>
      </div>
    </footer>
  );
}
