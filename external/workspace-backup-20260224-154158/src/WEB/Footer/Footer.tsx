import './Footer.css'
import './Footer.envelope.css'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const ownerEmail = 'ktk662002@naver.com';

  const handleSend = () => {
    const subject = encodeURIComponent(title || 'Portfolio Contact');
    const body = encodeURIComponent(`${message}`);
    // notify user and open mail client
    alert(`메일 작성 창이 열립니다. 수신자: ${ownerEmail}`);
    window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ownerEmail);
      setCopyStatus('복사됨');
      alert('이메일 주소가 복사되었습니다.');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (e) {
      setCopyStatus('복사 실패');
      alert('복사에 실패했습니다.');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  // Ensure Swiper stays hidden while footer is in view to prevent flicker
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const footerEl = document.getElementById('footer_section');
    if (!footerEl) return;

    let inView = false;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // consider footer in view when more than half is visible
        const nowIn = entry.intersectionRatio >= 0.5;
        if (nowIn === inView) return;
        inView = nowIn;

        // debounce quick flips
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (inView) {
            document.body.classList.add('footer-in-view');
            document.body.classList.add('section-scrolled-out');
            // Tell swiper to hide and switch to projects/footer mode
            const win = window as any;
            win.setSwiperState?.({ isHidden: true, isScrollOut: true, isLastSlide: false });
            win.setProjectsState?.({ forceShow: true });
          } else {
            document.body.classList.remove('footer-in-view');
            document.body.classList.remove('section-scrolled-out');
            // mark just left footer to delay re-showing swiper
            if (typeof window !== 'undefined') {
              const win = window as any;
              win.footerJustLeft = true;
              setTimeout(() => { try { delete win.footerJustLeft; } catch {} }, 1200);
              win.setProjectsState?.({ forceShow: false });
            }
            // swiper visibility will be restored by scroll handler when user scrolls up sufficiently
          }
          debounceTimer = null;
        }, 120);
      });
    }, { threshold: [0, 0.5, 1] });

    obs.observe(footerEl);

    return () => {
      obs.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
      document.body.classList.remove('footer-in-view');
    };
  }, []);

  return (
    <footer id="footer_section">
      <ul>
        <li className="footer-title">Information</li>

        <li className="contact-form">
          <label className="sr-only">제목</label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="제목"
          />

          <label className="sr-only">내용</label>
          <textarea
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="메시지 내용"
            rows={4}
          />

          <div className="form-actions">
            <button type="button" onClick={handleSend} className="send">전송</button>
            <button type="button" onClick={handleCopy} className="copy">복사</button>
            <span className="copy-status" aria-live="polite">{copyStatus}</span>
          </div>
        </li>

        <li className="contact-meta">
          {t('footer.email')} : <a href={`mailto:${ownerEmail}`}>{ownerEmail}</a>
        </li>

        <li className="contact-meta">
          {t('footer.github')} : <a href="https://github.com/KimJungJae369/myPORTFOLIO">github.com</a>
        </li>
      </ul>
    </footer>
  )
}
