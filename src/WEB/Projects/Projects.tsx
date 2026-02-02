import './Projects.css'
import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();
  
  return (
    <>
        <div id="projects_section">
            <span className='yell'>{t('projects.subtitle')}</span>
            <h1>{t('projects.title')}</h1>
         
        </div>
    </>
  )
}
