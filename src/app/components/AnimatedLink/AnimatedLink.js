"use client";

import { useTransition } from "@/app/contexts/TransitionContext";
import { useRouter } from "next/navigation";

export default function AnimatedLink({ href, children }) {
  const router = useRouter();
  
  const { setIsTransitioning } = useTransition();

  const handleClick = async (e) => {
    e.preventDefault();

    setIsTransitioning(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </a>
  );
}
