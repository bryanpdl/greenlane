"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, initGSAP } from '../utils/gsap';

const contactMethods = [
  {
    name: 'Business Inquiries',
    iconPath: '/images/mari.png',
    description: 'Interested in listing your business? Our team will help you get started.',
    primaryText: 'sales@greenlane.com',
    secondaryText: '+66 123 456 789',
    buttonText: 'Email Sales',
    buttonLink: 'mailto:sales@greenlane.com'
  },
  {
    name: 'Platform Support',
    iconPath: '/images/mari.png',
    description: 'Need help with your account or have technical questions? We are here to help.',
    primaryText: 'support@greenlane.com',
    secondaryText: 'Mon-Fri, 9AM-6PM ICT',
    buttonText: 'Get Support',
    buttonLink: 'mailto:support@greenlane.com'
  }
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP
    initGSAP();

    // Animate title
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate cards
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  // Handle button hover animations
  const handleMouseEnter = (button: HTMLAnchorElement) => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out"
    });
    gsap.to(button.children, {
      gap: "0.75rem",
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (button: HTMLAnchorElement) => {
    gsap.to(button, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
    gsap.to(button.children, {
      gap: "0.5rem",
      duration: 0.2,
      ease: "power2.out"
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-green-base/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl text-gray-300">Get in touch with our team for business inquiries or support</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <div
              key={method.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 p-3">
                  <Image
                    src={method.iconPath}
                    alt={`${method.name} icon`}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h3 className="text-2xl font-semibold">{method.name}</h3>
                <p className="text-gray-300">{method.description}</p>
                
                <div className="space-y-2">
                  <p className="text-lg font-medium text-green-accent">{method.primaryText}</p>
                  <p className="text-sm text-gray-400">{method.secondaryText}</p>
                </div>

                <div className="pt-4">
                  <a
                    href={method.buttonLink}
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-accent rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    <span>{method.buttonText}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 