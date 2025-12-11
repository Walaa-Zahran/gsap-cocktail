import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleText = "MOJITO";

  useGSAP(
    () => {
      console.log("[Hero] useGSAP effect running");

      const root = heroRef.current;
      if (!root) return;

      // All char spans in the title
      const chars = root.querySelectorAll(".title-char");
      const paragraphSplit = new SplitText(".subtitle", {
        type: "lines",
      });

      console.log("[Hero] chars count:", chars.length);
      console.log("[Hero] lines count:", paragraphSplit.lines.length);

      // Animate characters
      gsap.from(chars, {
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        onStart: () => console.log("[Hero] chars animation starting"),
        onComplete: () => console.log("[Hero] chars animation complete"),
      });

      // Animate subtitles (whole elements instead of lines)
      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.2,
        delay: 1,
        onStart: () =>
          console.log("[Hero] subtitle elements animation starting"),
        onComplete: () =>
          console.log("[Hero] subtitle elements animation complete"),
      });

      // Scroll-based leaf animation
      const scrollTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onEnter: () => console.log("[Hero] scrollTrigger entered"),
            onLeave: () => console.log("[Hero] scrollTrigger left"),
          },
        })
        .to(".left-leaf", { y: 200 }, 0)
        .to(".right-leaf", { y: -200 }, 0);

      return () => {
        console.log("[Hero] cleanup running");
        scrollTl.kill();
      };
    },
    { scope: heroRef }
  );

  return (
    <section id="hero" className="noisy" ref={heroRef}>
      <h1 className="title">
        {titleText.split("").map((ch, i) => (
          <span key={i} className="title-char inline-block text-gradient">
            {ch}
          </span>
        ))}
      </h1>

      <img
        src="/images/hero-left-leaf.png"
        alt="left-leaf"
        className="left-leaf"
      />
      <img
        src="/images/hero-right-leaf.png"
        alt="right-leaf"
        className="right-leaf"
      />

      <div className="body">
        <div className="content">
          <div className="space-y-5 hidden md:block">
            <p>Cool. Crisp. Classic.</p>
            <p className="subtitle">
              Sip the Spirit <br /> of Summer
            </p>
          </div>
          <div className="view-cocktails">
            <p className="subtitle">
              Every cocktail on our menu is a blend of premium ingredients,
              creative flair, and timeless recipes — designed to delight your
              senses.
            </p>
            <a href="#cocktails">View Cocktails</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
