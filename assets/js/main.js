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
    let hasVisibleProjects = false;

    projectBoxes.forEach(box => {
      // 먼저 모든 트랜지션 효과 제거
      box.style.transition = 'none';
      box.style.display = 'block';

      if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
        box.classList.remove('hide');
        hasVisibleProjects = true;
      } else {
        box.classList.add('hide');
      }

      // Trigger reflow
      void box.offsetWidth;

      // 트랜지션 다시 활성화
      box.style.transition = 'all 0.3s ease';
    });

    // 컨테이너 높이 조정
    const container = document.querySelector('.project-container');
    if (container) {
      container.style.minHeight = hasVisibleProjects ? '400px' : '0';
    }
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

// 프로젝트 필터링 기능
function initializePortfolioFilter() {
  // 모바일 체크
  const isMobile = window.innerWidth <= 768;
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  // 모바일이 아닐 때만 필터링 기능 활성화
  if (!isMobile) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.classList.remove('hide');
            item.classList.add('show');
          } else {
            item.classList.remove('show');
            item.classList.add('hide');
          }
        });
      });
    });
  }
}

// 리사이즈 이벤트 처리
window.addEventListener('resize', () => {
  const isMobile = window.innerWidth <= 768;
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (isMobile) {
    // 모바일에서는 모든 항목 표시
    portfolioItems.forEach(item => {
      item.classList.remove('hide');
      item.classList.add('show');
    });
  }
});

// DOM 로드 시 초기화
document.addEventListener('DOMContentLoaded', initializePortfolioFilter);