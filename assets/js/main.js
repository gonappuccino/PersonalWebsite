/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () { headerShadow() };

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Software Engineer", "Data Scientist", "Full Stack Developer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
})

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 1000,
  delay: 0,
  reset: false  // 한 번만 애니메이션 실행
})

/* -- HOME -- */
sr.reveal('.featured-text-card', {})
sr.reveal('.featured-name', { delay: 100 })
sr.reveal('.featured-text-info', { delay: 200 })
sr.reveal('.featured-text-btn', { delay: 200 })
sr.reveal('.social_icons', { delay: 200 })
sr.reveal('.featured-image', { delay: 300 })

/* -- PROJECT BOX -- */
sr.reveal('.project-box', { interval: 200 })

/* -- HEADINGS -- */
sr.reveal('.top-header', {})

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info', { delay: 100 })
srLeft.reveal('.contact-info', { delay: 100 })

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box', { delay: 100 })
srRight.reveal('.form-control', { delay: 100 })

/* -- EXPERIENCE -- */
sr.reveal('.timeline-item', { interval: 200 })

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}

window.addEventListener('scroll', scrollActive)

/* ----- DARK MODE TOGGLE ----- */
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

// 초기 테마 설정
(function () {
  if (localStorage.getItem('theme') === null) {  // 처음 방문하는 경우
    setTheme('dark');  // 다크모드를 기본값으로 설정
  } else {
    setTheme(localStorage.getItem('theme'));  // 저장된 사용자 설정 유지
  }
})();

/* ----- PROJECT FILTERING ----- */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectBoxes = document.querySelectorAll('.project-box');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectBoxes.forEach(box => {
      if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
        box.classList.remove('hide');
      } else {
        box.classList.add('hide');
      }
    });
  });
});

/* ----- PROJECT MODAL FUNCTIONS ----- */
function openProjectModal(projectId) {
  const modal = document.getElementById(projectId + 'Modal');
  if (modal) {
    modal.style.display = 'block';
    // Load video only when modal opens
    const iframe = modal.querySelector('iframe');
    if (iframe && !iframe.src) {
      iframe.src = iframe.dataset.src;
    }
  }
}

function closeProjectModal(projectId) {
  const modal = document.getElementById(projectId + 'Modal');
  if (modal) {
    modal.style.display = 'none';
    // Stop video when closing modal
    const iframe = modal.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
    }
  }
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target.classList.contains('project-modal')) {
    event.target.style.display = 'none';
    const iframe = event.target.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
    }
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const modals = document.getElementsByClassName('project-modal');
    Array.from(modals).forEach(modal => {
      if (modal.style.display === 'block') {
        const iframe = modal.querySelector('iframe');
        if (iframe) {
          iframe.src = '';
        }
        modal.style.display = 'none';
      }
    });
  }
});

/* ----- DEMO CONTROLS ----- */
function toggleDemoFullscreen(demoContainer) {
  if (!document.fullscreenElement) {
    demoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function reloadDemo(demoFrame) {
  demoFrame.src = demoFrame.src;
}

// 모바일 체크 함수
function isMobile() {
  return window.innerWidth <= 768;
}

// 모든 프로젝트 즉시 표시 함수
function showAllProjects() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.style.cssText = `
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transition: none !important;
        `;
  });
}

function initPortfolioFilter() {
  const isMobile = window.innerWidth <= 768;
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  // ScrollReveal 설정
  sr.reveal('.portfolio-item', {
    interval: 200,    // 각 항목 간 200ms 간격
    distance: '80px', // 80px 거리
    origin: 'top',    // 위에서 아래로
    scale: 1,         // 크기 변화 없음
    opacity: 0,       // 완전히 투명에서 시작
    duration: 1000,   // 1초 동안 애니메이션
    mobile: true,     // 모바일에서도 작동
    viewFactor: 0.2   // 20% 보일 때 시작
  });

  if (isMobile) {
    portfolioItems.forEach(item => {
      item.style.display = 'block';
    });
    return;
  }

  // 필터 기능
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // 필터링 후 새로운 애니메이션 적용
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          // ScrollReveal 재적용
          sr.reveal(item, {
            distance: '80px',
            interval: 200,
            origin: 'top',
            scale: 1,
            opacity: 0,
            duration: 1000,
            mobile: true,
            viewFactor: 0.2
          });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();

  // 초기 애니메이션 적용
  sr.reveal('.portfolio-item', {
    interval: 200,
    distance: '80px',
    origin: 'top',
    scale: 1,
    opacity: 0,
    duration: 1000,
    mobile: true,
    viewFactor: 0.2
  });
});

// 리사이즈 핸들러
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initPortfolioFilter, 250);
});

// 요소가 화면에 보이는지 확인하는 함수
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // 화면의 90% 지점부터 요소를 표시하기 시작
  const triggerPoint = windowHeight * 0.9;

  return rect.top <= triggerPoint;
}

// 요소들을 표시하는 함수
function hide() {
  const reveals = document.querySelectorAll('.reveal');
  const isMobile = window.innerWidth <= 768;

  reveals.forEach(element => {
    // 이미 활성화된 요소는 건너뛰기
    if (element.classList.contains('active')) {
      return;
    }

    if (isElementInViewport(element)) {
      // 요소가 보이는 영역에 들어오면 활성화
      element.classList.add('active');

      // 스타일 직접 적용
      element.style.cssText = `
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
                transition: all 0.3s ease;
            `;

      // 모바일에서는 더 빠른 애니메이션
      if (isMobile) {
        element.style.transition = 'all 0.2s ease';
      }
    }
  });
}

// 스크롤 이벤트 처리
window.addEventListener('scroll', () => {
  requestAnimationFrame(hide);
});

// 페이지 로드 시 처리
document.addEventListener('DOMContentLoaded', () => {
  // 초기 로드 시 여러 번 체크
  hide();
  setTimeout(hide, 100);
  setTimeout(hide, 300);
  setTimeout(hide, 500);
});

// 리사이즈 시 처리
window.addEventListener('resize', () => {
  requestAnimationFrame(hide);
});