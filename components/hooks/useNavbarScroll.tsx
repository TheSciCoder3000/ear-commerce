import { useEffect, useState } from "react";

export default function useNavbarScroll() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > scrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else setIsVisible(true);

      scrollY = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return [isVisible];
}
