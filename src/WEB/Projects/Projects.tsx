import './Projects.css'
import { useTranslation } from 'react-i18next';
import Portfolio1 from './img/Portfolio1.png';
import Portfolio2 from './img/Portfolio2.png';

export default function Projects() {
  const { t } = useTranslation();
  
  return (
    <>
        <div id="projects_section">
            <span className='yell'>{t('projects.subtitle')}</span>
            <h1>{t('projects.title')}</h1>
         

            <main>
              <img src={Portfolio1} alt="나만의 가계부" />

              <div className="left_title">
                <h1>나만의 가계부</h1>
                <span>
                  '나만의 가계부'는 거래 데이터를 쉽게 쓸 수 있게 만든 어플입니다
                  요즘 세상에 나만의 돈을 관리가 필요해 만들어보고 싶어서 만들어 보았습니다
                  특징으로는 거래 추가하기, 삭제하기, 수정하기,평균값 구하기 등 구현을 했고 
                  PC,모바일 반응형으로 제작을 해보았습니다
                </span>
                <div className="subMenu">
                  <a href="https://github.com/KimJungJae369/portfolio">GitHub</a>
                  <a href="https://kimjungjae369.github.io/portfolio/">Demo</a>
                </div>
              </div>
            </main>


            <main>
              <img src={Portfolio2} alt="포트폴리오 사이트" />

              <div className="left_title">
                <h1>사이트</h1>
                <span>
                  React와 TypeScript를 기반으로 휠 이벤트를 커스텀하여 슬라이드와 섹션 간의 경계 없는 매끄러운 전환하여 
                  이미지 슬라이드를 구현하고 각 섹션에 애니메이션 효과를 추가를 해보고 번역 기능도 구현을 해보았습니다
                  또한 반응형 웹으로 제작하여 다양한 기기볼 수 있도록 구현을 하였습니다
                </span>
                <div className="subMenu">
                  <a href="https://github.com/KimJungJae369/portfolio2">GitHub</a>
                  <a href="https://kimjungjae369.github.io/portfolio2/">Demo</a>
                </div>
              </div>
            </main>
        </div>
    </>
  )
}
