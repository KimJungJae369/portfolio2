import './Footer.css'
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer id="footer_section">
      <ul>
        <li>{t('footer.title')}</li>

        <li>
            {t('footer.email')} : <a href="mailto:ktk662002@naver.com">ktk662002@naver.com</a>
        </li>

        <li>
            {t('footer.github')} : <a href="https://github.com/KimJungJae369/myPORTFOLIO">github.com</a>
        </li>
      </ul>
    </footer>
  )
}
