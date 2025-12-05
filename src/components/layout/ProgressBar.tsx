"use client";

import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
	const pathname = usePathname();
	const [searchParams, setSearchParams] = useState(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setSearchParams(urlParams);

		NProgress.configure({
			showSpinner: false,
			minimum: 0.1,
			easing: "ease",
			speed: 300,
		});

		const styleEl = document.createElement("style");
		styleEl.textContent = `
      #nprogress .bar {
        background: linear-gradient(to right, #c8b6ff, #ffb6b9) !important;
        height: 3px !important;
        position: fixed !important;
        z-index: 999999999999;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        box-shadow: 0 0 10px rgba(200, 182, 255, 0.5) !important;
      }
      #nprogress .peg {
        display: block !important;
        position: absolute !important;
        right: 0px !important;
        width: 100px !important;
        height: 100% !important;
        box-shadow: 0 0 10px #c8b6ff, 0 0 5px #ffb6b9 !important;
        opacity: 1 !important;
        transform: rotate(3deg) translate(0px, -4px) !important;
      }
    `;
		document.head.appendChild(styleEl);

		NProgress.start();

		const timeout = setTimeout(() => {
			NProgress.done(true);
		}, 300);

		return () => {
			clearTimeout(timeout);
			document.head.removeChild(styleEl);
		};
	}, [pathname]);

	return null;
}
