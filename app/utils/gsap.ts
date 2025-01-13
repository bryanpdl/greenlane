import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure to only register once
let isRegistered = false;

export const initGSAP = () => {
  if (!isRegistered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
};

export { gsap, ScrollTrigger }; 