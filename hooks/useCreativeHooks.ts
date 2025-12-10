import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Navigation fade in
    gsap.from("nav", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Hero animations
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTimeline
      .from(".hero-line", {
        y: 200,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
      })
      .from(
        ".hero-description",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .from(
        ".hero-subtext",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        ".hero-location",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .from(
        ".scroll-indicator",
        {
          opacity: 0,
          duration: 1,
        },
        "-=0.4"
      );

    // Scroll indicator animation loop
    gsap.to(".scroll-indicator", {
      y: 20,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // About section animations
    gsap.from(".about-label", {
      scrollTrigger: {
        trigger: ".about-label",
        start: "top 80%",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
    });

    gsap.from(".about-title", {
      scrollTrigger: {
        trigger: ".about-title",
        start: "top 80%",
      },
      opacity: 0,
      x: -50,
      duration: 1,
    });

    gsap.from(".about-intro", {
      scrollTrigger: {
        trigger: ".about-intro",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    gsap.from(".about-description", {
      scrollTrigger: {
        trigger: ".about-description",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
    });

    // Achievement items stagger
    gsap.from(".achievement-item", {
      scrollTrigger: {
        trigger: ".achievement-item",
        start: "top 85%",
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15,
    });

    // Skills columns stagger
    gsap.from(".skills-column", {
      scrollTrigger: {
        trigger: ".skills-column",
        start: "top 85%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
    });

    // Skill items within columns
    gsap.from(".skill-item", {
      scrollTrigger: {
        trigger: ".skill-item",
        start: "top 90%",
      },
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
    });

    // Hobbies section
    gsap.from(".hobbies-label", {
      scrollTrigger: {
        trigger: ".hobbies-label",
        start: "top 80%",
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
    });

    gsap.from(".hobbies-title", {
      scrollTrigger: {
        trigger: ".hobbies-title",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    gsap.from(".hobbies-intro", {
      scrollTrigger: {
        trigger: ".hobbies-intro",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
    });

    // Hobby cards with stagger and scale
    gsap.from(".hobby-card", {
      scrollTrigger: {
        trigger: ".hobby-card",
        start: "top 85%",
      },
      opacity: 0,
      y: 60,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)",
    });

    // Parallax effect for hobby images
    gsap.utils.toArray(".hobby-image").forEach((image: any) => {
      gsap.to(image, {
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      });
    });

    // Animated SVG path
    const path = document.querySelector("#animatedPath");
    if (path) {
      const pathLength = (path as SVGPathElement).getTotalLength();

      gsap.set("#animatedPath", {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to("#animatedPath", {
        scrollTrigger: {
          trigger: ".svg-path",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        strokeDashoffset: 0,
        ease: "none",
      });
    }

    // Project cards animations
    gsap.utils.toArray(".project-card").forEach((card: any, index: number) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        opacity: 0,
        y: 100,
        duration: 1,
        delay: index * 0.1,
      });

      // Parallax effect for project images
      const projectImage = card.querySelector(".project-image");
      if (projectImage) {
        gsap.to(projectImage, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -60,
          ease: "none",
        });
      }
    });

    // Contact section animation
    gsap.from(".contact-title", {
      scrollTrigger: {
        trigger: ".contact-title",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from(".contact-link", {
      scrollTrigger: {
        trigger: ".contact-link",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
    });

    // Car Collection animations
    gsap.from(".car-header-label", {
      scrollTrigger: {
        trigger: ".car-header-label",
        start: "top 80%",
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
    });

    gsap.from(".car-header-title", {
      scrollTrigger: {
        trigger: ".car-header-title",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from(".car-header-desc", {
      scrollTrigger: {
        trigger: ".car-header-desc",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    gsap.from(".car-card-container", {
      scrollTrigger: {
        trigger: ".car-card-container",
        start: "top 85%",
      },
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)",
    });

    gsap.from(".car-fun-fact", {
      scrollTrigger: {
        trigger: ".car-fun-fact",
        start: "top 85%",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
    });

    // Floating car icon animation
    gsap.to(".floating-car", {
      y: 30,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Life Journey animations
    gsap.from(".journey-label", {
      scrollTrigger: {
        trigger: ".journey-label",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
    });

    gsap.from(".journey-title", {
      scrollTrigger: {
        trigger: ".journey-title",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from(".journey-desc", {
      scrollTrigger: {
        trigger: ".journey-desc",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    // Journey line draw animation
    gsap.from(".journey-line", {
      scrollTrigger: {
        trigger: ".journey-line",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
      scaleY: 0,
      transformOrigin: "top",
    });

    // Bosnia section
    gsap.from(".journey-bosnia", {
      scrollTrigger: {
        trigger: ".journey-bosnia",
        start: "top 80%",
      },
      opacity: 0,
      x: 50,
      duration: 1,
    });

    gsap.from(".journey-bosnia-img", {
      scrollTrigger: {
        trigger: ".journey-bosnia-img",
        start: "top 80%",
      },
      opacity: 0,
      x: -50,
      duration: 1,
    });

    // Plane animation
    gsap.from(".journey-plane", {
      scrollTrigger: {
        trigger: ".journey-plane",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0,
      rotation: -180,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Berlin section
    gsap.from(".journey-berlin", {
      scrollTrigger: {
        trigger: ".journey-berlin",
        start: "top 80%",
      },
      opacity: 0,
      x: -50,
      duration: 1,
    });

    gsap.from(".journey-berlin-img", {
      scrollTrigger: {
        trigger: ".journey-berlin-img",
        start: "top 80%",
      },
      opacity: 0,
      x: 50,
      duration: 1,
    });

    gsap.from(".journey-quote", {
      scrollTrigger: {
        trigger: ".journey-quote",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
    });

    // Life Stats animations
    gsap.from(".stats-label", {
      scrollTrigger: {
        trigger: ".stats-label",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
    });

    gsap.from(".stats-title", {
      scrollTrigger: {
        trigger: ".stats-title",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from(".stats-desc", {
      scrollTrigger: {
        trigger: ".stats-desc",
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: ".stat-card",
        start: "top 85%",
      },
      opacity: 0,
      y: 60,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)",
    });

    gsap.from(".stats-footer", {
      scrollTrigger: {
        trigger: ".stats-footer",
        start: "top 85%",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
    });

    // Weekend Vibes animations
    gsap.from(".weekend-header", {
      scrollTrigger: {
        trigger: ".weekend-header",
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
    });

    gsap.from(".weekend-card", {
      scrollTrigger: {
        trigger: ".weekend-card",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "back.out(1.2)",
    });

    gsap.from(".weekend-shuffle", {
      scrollTrigger: {
        trigger: ".weekend-shuffle",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    gsap.from(".weekend-dots", {
      scrollTrigger: {
        trigger: ".weekend-dots",
        start: "top 85%",
      },
      opacity: 0,
      duration: 0.8,
    });

    gsap.from(".weekend-note", {
      scrollTrigger: {
        trigger: ".weekend-note",
        start: "top 85%",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
