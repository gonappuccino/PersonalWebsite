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
  duration: 2000,
  reset: true
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
  // 모바일이면 즉시 모든 프로젝트 표시
  if (isMobile()) {
    showAllProjects();
    return;
  }

  // 데스크톱 필터 기능
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          item.style.opacity = '1';
          item.style.visibility = 'visible';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
          item.style.visibility = 'hidden';
        }
      });
    });
  });
}

// 페이지 로드 시 즉시 실행
document.addEventListener('DOMContentLoaded', () => {
  if (isMobile()) {
    showAllProjects();
  }
  initPortfolioFilter();
});

// 리사이즈 시 즉시 실행
window.addEventListener('resize', () => {
  if (isMobile()) {
    showAllProjects();
  } else {
    initPortfolioFilter();
  }
});

// 스크롤 애니메이션 함수
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const isMobile = window.innerWidth <= 768;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    // 요소가 화면 안에 들어왔는지 확인
    if (elementTop < windowHeight - elementVisible) {
      // 아직 active 클래스가 없는 경우에만 애니메이션 적용
      if (!element.classList.contains('active')) {
        element.classList.add('active');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    }
  });
}

// 스크롤 이벤트에 디바운스 적용
let scrollTimer;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(reveal, 10);
});

// 페이지 로드 시 초기 실행
document.addEventListener('DOMContentLoaded', () => {
  reveal();
  // 초기 로드 시 화면에 보이는 요소들 체크
  setTimeout(reveal, 100);
});