import gsap from 'gsap';

/**
 * Animate element fade in with slide from bottom
 * Typeform-style smooth animation
 */
export const fadeInUp = (element: HTMLElement | string, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
};

/**
 * Animate element fade out with slide to top
 */
export const fadeOutUp = (element: HTMLElement | string, duration = 0.4) => {
  return gsap.to(element, {
    opacity: 0,
    y: -30,
    duration,
    ease: 'power3.in',
  });
};

/**
 * Animate element fade in with slide from left
 */
export const fadeInLeft = (element: HTMLElement | string, duration = 0.6, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -30,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

/**
 * Animate element fade in with slide from right
 */
export const fadeInRight = (element: HTMLElement | string, duration = 0.6, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 30,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  );
};

/**
 * Animate number counting up
 */
export const countUp = (
  element: HTMLElement,
  endValue: number,
  duration = 2,
  prefix = '',
  suffix = ''
) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = prefix + Math.round(obj.value).toLocaleString('it-IT') + suffix;
    },
  });
};

/**
 * Stagger animation for multiple elements
 * Typeform-style smooth stagger
 */
export const staggerFadeIn = (
  elements: HTMLElement[] | string,
  stagger = 0.15,
  duration = 0.7
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 15,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power2.out',
    }
  );
};

/**
 * Scale animation on hover (can be used programmatically)
 */
export const scaleOnHover = (element: HTMLElement, scale = 1.05) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
};

/**
 * Cross-fade between two elements
 */
export const crossFade = (
  elementOut: HTMLElement | string,
  elementIn: HTMLElement | string,
  duration = 0.5
) => {
  const timeline = gsap.timeline();
  
  timeline.to(elementOut, {
    opacity: 0,
    duration: duration / 2,
    ease: 'power2.in',
  });
  
  timeline.fromTo(
    elementIn,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: duration / 2,
      ease: 'power2.out',
    },
    `-=${duration / 4}`
  );
  
  return timeline;
};

