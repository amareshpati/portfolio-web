import { useState, useEffect } from "react";

/**
 * Custom hook to determine which section is currently active based on scroll position.
 * @param {Array<string>} sectionIds - Array of section IDs to track.
 * @param {number} offset - Offset in pixels from the top to trigger the active state.
 * @returns {string} The ID of the currently active section.
 */
export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentSection = "";

      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        if (sectionId.startsWith("#")) {
          const id = sectionId.substring(1);
          const element = document.getElementById(id);

          if (element) {
            const { top, bottom } = element.getBoundingClientRect();
            // Using absolute page offsets
            const elementTop = top + window.scrollY;
            const elementBottom = bottom + window.scrollY;

            // Check if scroll position is within the element's vertical bounds
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};
