import { animate } from 'motion';
import { CONTENT_SECTIONS } from './contentData';
type SectionId = keyof typeof CONTENT_SECTIONS;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header time: update and zoom on hover
  const headerTime = document.querySelector('.header-time');
  if (headerTime) {
    const updateTime = () => {
      headerTime.textContent = fetchCurrentDate();
    };
    updateTime();
    setInterval(updateTime, 1000);
    // Zoom on hover
    headerTime.addEventListener('mouseenter', () => {
      animate(headerTime, { scale: 1.25 }, { duration: 0.25 });
    });
    headerTime.addEventListener('mouseleave', () => {
      animate(headerTime, { scale: 1 }, { duration: 0.25 });
    });
  }

  // 2 & 3. Dynamic content and entry animation
  const content = document.querySelector('.content');
  function setContent(sectionId: string) {
    const section = CONTENT_SECTIONS[sectionId as SectionId];
    if (section && content) {
      content.innerHTML = `
        <div class="main-title">${section.title}</div>
        <div class="subtitle">${section.subtitle}</div>
      `;
      animate(content, { opacity: [0, 1] } as any, { duration: 0.5, easing: 'ease-out' } as any);
      animate(
        0,
        1 as any,
        {
          duration: 0.5,
          easing: 'ease-out',
          onUpdate: (latest: any) => {
            (content as HTMLElement).style.transform = `translateY(${(1 - latest) * -30}px)`;
          },
        } as any
      );
    }
  }

  // 3 & 4. Dynamic bottom navigation and content switching from constants
  const navItems = Object.entries(CONTENT_SECTIONS).map(([id, section]) => ({
    label: section.navLabel || section.title,
    id,
  }));
  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
    bottomNav.innerHTML = navItems
      .map((item) => `<button class="nav-btn" data-nav="${item.id}">${item.label}</button>`)
      .join('');
    bottomNav.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('nav-btn')) {
        setContent(target.dataset.nav!);
        setContent(target.dataset.nav as SectionId);
      }
    });
    // Animate open/close on hover/tap using CSS transitions only
    let isOpen = false;
    function openNav() {
      if (!isOpen && bottomNav) {
        isOpen = true;
        bottomNav.classList.add('open');
      }
    }
    function closeNav() {
      if (isOpen && bottomNav) {
        isOpen = false;
        bottomNav.classList.remove('open');
      }
    }
    bottomNav.addEventListener('mouseenter', openNav);
    bottomNav.addEventListener('mouseleave', closeNav);
    bottomNav.addEventListener('touchstart', openNav);
    document.body.addEventListener('touchend', (e) => {
      if (bottomNav && !bottomNav.contains(e.target as Node)) closeNav();
    });
    // Set initial content
    setContent(navItems[0].id);
  }
  const downArrow = document.querySelector('.down-arrow');
  if (downArrow) {
    const gestureState = new WeakMap<Element, { isHovered: boolean; isPressed: boolean }>();
    const transition = { type: 'spring', stiffness: 500, damping: 25 };
    const initialState = { isHovered: false, isPressed: false };

    function setGesture(element: Element, update: Partial<typeof initialState>) {
      const state = gestureState.get(element) || { ...initialState };
      const newState = { ...state, ...update };
      gestureState.set(element, newState);

      let scale = 1;
      if (newState.isPressed) {
        scale = 0.8;
      } else if (newState.isHovered) {
        scale = 1.2;
      }

      animate(element, { scale } as any, transition as any);
    }

    // Hover gesture
    downArrow.addEventListener('mouseenter', () => setGesture(downArrow, { isHovered: true }));
    downArrow.addEventListener('mouseleave', () => setGesture(downArrow, { isHovered: false }));

    // Press gesture (mouse/touch)
    downArrow.addEventListener('mousedown', () => setGesture(downArrow, { isPressed: true }));
    downArrow.addEventListener('mouseup', () => setGesture(downArrow, { isPressed: false }));
    downArrow.addEventListener('mouseleave', () => setGesture(downArrow, { isPressed: false }));
    downArrow.addEventListener('touchstart', () => setGesture(downArrow, { isPressed: true }));
    downArrow.addEventListener('touchend', () => setGesture(downArrow, { isPressed: false }));
  }
});

function fetchCurrentDate(): string {
  const now = new Date();
  // Day: Sun, Mon, etc
  const day = now.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' });
  // Date: Jan 1, Feb 28, etc
  const date = now.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
  // Local Time: 20:05 (India time)
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });
  // Show as: Sun Aug 3 20:05 India
  return `${day} ${date} ${time} India`;
}
