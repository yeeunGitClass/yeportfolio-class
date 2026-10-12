const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const currentYear = document.querySelector("#current-year");
const projectDialog = document.querySelector("#project-dialog");
const projectCards = document.querySelectorAll(".project-card[data-project]");
const dialogCloseButton = projectDialog?.querySelector(".dialog-close");
let projectOpener = null;
const projectDetails = [
  {
    name: "모아 — 나만의 소비 기록",
    description: "흩어진 지출을 한눈에 확인하고, 소비 습관을 쉽게 돌아보도록 돕는 개인 금융 대시보드입니다.",
    role: "화면 설계, 대시보드 UI 개발, 차트 데이터 시각화",
    technologies: ["React", "TypeScript", "Chart.js"],
    outcome: "월별 소비 흐름과 지출 비중을 한 화면에서 확인할 수 있도록 구성했습니다. (예시 성과)",
  },
  {
    name: "오후의 물건 — 라이프스타일 숍",
    description: "작은 브랜드와 생활 소품을 소개하고 구매까지 이어주는 라이프스타일 온라인 스토어입니다.",
    role: "반응형 쇼핑 화면 개발, 상품 탐색 경험 설계, 디자인 시스템 정리",
    technologies: ["Next.js", "CSS Modules", "Figma"],
    outcome: "모바일에서도 상품을 편하게 둘러보고 구매할 수 있는 화면 흐름을 구성했습니다. (예시 성과)",
  },
  {
    name: "하루 — 마음을 돌보는 일기",
    description: "사용자가 하루의 감정을 짧게 기록하고 지난 기록을 편안하게 돌아볼 수 있는 감정 일기 서비스입니다.",
    role: "일기 작성 UI 개발, 감정 기록 흐름 설계, 데이터 연동",
    technologies: ["JavaScript", "Vue", "Firebase"],
    outcome: "기록 부담을 낮추기 위해 감정 선택과 짧은 메모 중심의 기록 경험을 만들었습니다. (예시 성과)",
  },
];

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

// 프로젝트 정보를 모달에 채우고 모달을 엽니다.
function openProjectDetails(projectIndex, trigger) {
  if (!(projectDialog instanceof HTMLDialogElement)) return;

  const project = projectDetails[projectIndex];
  if (!project) return;

  const title = projectDialog.querySelector("#project-dialog-title");
  const description = projectDialog.querySelector("#project-dialog-description");
  const role = projectDialog.querySelector("#project-dialog-role");
  const outcome = projectDialog.querySelector("#project-dialog-outcome");
  const technologies = projectDialog.querySelector("#project-dialog-technologies");

  if (
    !(title instanceof HTMLElement) ||
    !(description instanceof HTMLElement) ||
    !(role instanceof HTMLElement) ||
    !(outcome instanceof HTMLElement) ||
    !(technologies instanceof HTMLUListElement)
  ) {
    return;
  }

  title.textContent = project.name;
  description.textContent = project.description;
  role.textContent = project.role;
  outcome.textContent = project.outcome;
  technologies.replaceChildren(
    ...project.technologies.map((technology) => {
      const tag = document.createElement("li");
      tag.textContent = technology;
      return tag;
    }),
  );

  projectOpener = trigger;
  projectDialog.showModal();
  dialogCloseButton?.focus();
}

// 모달을 닫고, 열었던 프로젝트 카드로 키보드 포커스를 돌려보냅니다.
function closeProjectDetails() {
  if (!(projectDialog instanceof HTMLDialogElement) || !projectDialog.open) return;

  projectDialog.close();
  projectOpener?.focus();
  projectOpener = null;
}

projectCards.forEach((card) => {
  const openDetails = () => {
    const projectIndex = Number(card.getAttribute("data-project"));
    openProjectDetails(projectIndex, card);
  };

  card.addEventListener("click", openDetails);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  });
});

dialogCloseButton?.addEventListener("click", closeProjectDetails);

projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    closeProjectDetails();
  }
});

projectDialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProjectDetails();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectDialog instanceof HTMLDialogElement && projectDialog.open) {
    event.preventDefault();
    closeProjectDetails();
  }
});

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
    siteNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "메뉴 열기" : "메뉴 닫기");
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}
