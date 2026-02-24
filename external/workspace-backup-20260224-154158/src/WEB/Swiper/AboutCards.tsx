import reactIcon from '../../assets/icons/react-original.svg?url';
import tsIcon from '../../assets/icons/typescript-original.svg?url';
import jsIcon from '../../assets/icons/javascript-original.svg?url';
import htmlIcon from '../../assets/icons/html5-original.svg?url';
import cssIcon from '../../assets/icons/css3-original.svg?url';
import nextIcon from '../../assets/icons/nextjs-original.svg?url';
import jqIcon from '../../assets/icons/jquery-original.svg?url';

const slides: any[] = [
  {
    src: 'https://picsum.photos/id/180/1200/800',
    backTitle: '프론트엔드가 되려는 이유',
    backDesc:
      "처음은 패션의 화려함을 브라우저에 이식하는 것에서 시작했지만, 이제는 사용자 경험을 극대화하고, 직관적인 인터페이스를 구현하는 데 열정을 가지고 있습니다. 이제는 유저의 시선을 사로잡는 인터페이스를 '재단'하고 싶다는 목표를 가지고 있습니다."
  },
  {
    src: 'https://picsum.photos/id/1/1200/800',
    backTitle: '힘들었던 점과 극복 방법',
    backDesc:
      '처음에는 모듯것이 어렵고 자고 일어나면 다시 초기화 하듯이 관리 도구, 프레임워크 등 폭포같이 쏟아지는 새로운 기술에 따라가기가 너무 힘들었지만 처음에는 화도 많이 났지만 한편으로는 이 코드가 작동이 되어서 기 감정에 희열감을 느껴 그 느낌을 잊지못하여 지금까지 오게 되었습니다.'
  },
  {
    src: 'https://picsum.photos/id/119/1200/800',
    backTitle: 'Skills',
    isSkills: true,
    skills: [
      { name: 'React', icon: reactIcon },
      { name: 'TypeScript', icon: tsIcon },
      { name: 'JavaScript', icon: jsIcon },
      { name: 'HTML5', icon: htmlIcon },
      { name: 'CSS3', icon: cssIcon },
      { name: 'Next.js', icon: nextIcon },
      { name: 'jQuery', icon: jqIcon }
    ]
  },
  {
    src: 'https://picsum.photos/id/201/1200/800',
    backTitle: '협업과 소통',
    backDesc: '디자이너, 백엔드 개발자와의 원활한 협업을 통해 프로젝트를 성공으로 이끕니다. 클린 코드와 문서화를 중시합니다.'
  },
  {
    src: 'https://picsum.photos/id/250/1200/800',
    backTitle: '지속적인 성장',
    backDesc: '새로운 기술을 학습하고 도전하는 것을 즐깁니다. 더 나은 개발자가 되기 위해 매일 발전하고 있습니다.'
  }
];

export default function AboutCards() {
  return (
    <div className="about-cards">
      {slides.map((s, i) => (
        <article key={i} className="about-card">
          <div className="about-card-image">
            <img src={s.src} alt={s.backTitle} loading="lazy" />
          </div>
          <div className="about-card-content">
            <div className="about-card-tag">Front-End</div>
            <h3 className="about-card-title">{s.backTitle}</h3>
            {s.isSkills ? (
              <div className="about-skills-grid">
                {s.skills.map((sk: any, idx: number) => (
                  <div key={idx} className="about-skill-item">
                    <img src={sk.icon} alt={sk.name} className="about-skill-icon" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.visibility='hidden';}} />
                    <span className="about-skill-name">{sk.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="about-card-desc">{s.backDesc}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
