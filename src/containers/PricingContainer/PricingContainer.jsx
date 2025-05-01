import { useEffect, useRef } from "react";

const Ring = ({ className, borderWidth = 2 }) => (
  <div
    className={`absolute rounded-full border-primary/20 transition-all duration-[1200ms] ease-out ${className}`}
    style={{ borderWidth }}
  ></div>
);

const Card = ({ children }) => {
  const cardRef = useRef(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          // Reset card rotation when out of view
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(card);

    const handleMouseMove = (e) => {
      if (!isInViewRef.current) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const rotateY = ((mouseX / rect.width) - 0.5) * 10;
      const rotateX = (0.5 - (mouseY / rect.height)) * 10;

      requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(() => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      className="w-1/3 rounded-xl bg-blue-200/20 backdrop-blur-sm p-8 space-y-6 pointer-events-none transition-transform duration-75"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const PricingContainer = () => {
  const ringsContainerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const container = ringsContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (timeoutRef.current) return;

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 50);

      const { clientX, clientY } = e;
      const { width, height } = container.getBoundingClientRect();

      const xRel = (clientX / width - 0.5) * -300;
      const yRel = (clientY / height - 0.5) * -300;

      const rings = container.children;
      Array.from(rings).forEach((ring, index) => {
        const intensity = 2 - (index * 0.8);
        ring.style.transform = `translate(${xRel * intensity}px, ${
          yRel * intensity
        }px)`;
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br font-space bg-heroBackground/70">
      {/* Decorative Rings Container */}
      <div ref={ringsContainerRef} className="absolute inset-0">
        <Ring
          className="w-[600px] h-[600px] -right-20 top-20"
          borderWidth={10}
        />
        <Ring
          className="w-[800px] h-[800px] -left-40 -bottom-40"
          borderWidth={20}
        />
        <Ring
          className="w-[400px] h-[400px] right-1/4 bottom-1/4"
          borderWidth={4}
        />
      </div>

      {/* Static Content */}
      <h1 className="px-20 pt-12 pb-8 text-7xl text-primary font-bold">Pricing</h1>
      <div className="w-full flex-1 flex justify-center items-center gap-16 pointer-events-none">
        <Card>
          <div className="flex justify-between">
            <img src="app-img.png" alt="" className="rounded-xl w-20" />
            <div className="flex flex-col items-end">
              <p className="text-gray-600 text-sm -mb-1">Starting at</p>
              <h4 className="text-2xl font-bold -mt-0">Free</h4>
            </div>
          </div>
          <h4 className="text-2xl font-bold text-gray-800 ">Basic Plan</h4>
          <p className="text-gray-600 leading-relaxed">
            Students and learners looking to explore the power of RoundTable
            without commitment. It's free, flexible, and built to get you
            started.
          </p>
          <div className="space-y-4 ">
            <h4 className="text-xl font-semibold text-gray-800 !mt-0 !mb-0">Includes</h4>
            <ul className="space-y-3 list-disc pl-5 text-gray-600 !mt-0 !mb-0">
              <li className="leading-relaxed !mt-0 !mb-0">
                <b>File Upload: </b>Turn your notes, textbooks, or documents into
                engaging podcasts.
              </li>
              <li className="leading-relaxed !mt-0 !mb-0"><b>Interactive Podcasts</b></li>
              <li className="leading-relaxed !mt-0 !mb-0"><b>Podcast History</b></li>
              <li className="leading-relaxed !mt-0 !mb-0"><b>Three Podcasts Per Month</b> on us!</li>
            </ul>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between">
            <img src="app-img.png" alt="" className="rounded-xl w-20" />
            <div className="flex flex-col items-end">
              <p className="text-gray-600 text-sm -mb-1">Starting at</p>
              <h4 className="text-2xl font-bold -mt-0 !mb-0">$5.99</h4>
              <p className="text-gray-400 text-xl font-bold !mt-0">/month</p>
            </div>
          </div>
          <h4 className="text-2xl font-bold text-gray-800">Premium</h4>
          <p className="text-gray-600 leading-relaxed">
            Perfect for students and learners who want maximum flexibility,
            efficiency, and value.
          </p>
          <div className="space-y-4 ">
            <h4 className="text-xl font-semibold text-gray-800 !mt-0 !mb-0">
              Everything included in the Basic Plan, plus:
            </h4>
            <ul className="space-y-3 list-disc pl-5 text-gray-600 !mt-0">
              <li className="leading-relaxed !mt-0">
                <b>Unlimited Podcasts: </b>Dive deeper and explore more topics
                without limits.
              </li>
              <li className="leading-relaxed !mt-0">
                <b>Smart Summaries & Notes: </b>Instantly generate concise,
                actionable notes after every conversation to keep your learning
                organized.
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PricingContainer;
