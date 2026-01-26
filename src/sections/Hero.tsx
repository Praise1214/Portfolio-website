import { useState, useEffect} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profileInfo } from "../constants";

const roles = [
	"FullStack Developer",
	"React Specialist",
	"Mobile App Builder",
	"Problem Solver",
];

const Hero = () => {
	const [currentRole, setCurrentRole] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRole((prev) => (prev + 1) % roles.length);
		}, 3000);
		return () => clearInterval(interval);
	})

	useGSAP(() => {
		gsap.fromTo(".hero-animate",
			{ y: 40, opacity: 0 },
			{ y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" })
	})

	return (
		<section id="hero" className="relative overflow-hidden bg-grid-pattern">

			<div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
			{/* Decorative blurs */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

			<div className="hero-layout">

				{/* Left Content */}
				<div className="flex-1 max-w-2xl">
					<div className="hero-animate">
						<div className="hero-badge">
							<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
							<span>Available for opportunities</span>
						</div>
					</div>
				</div>

			</div>
		</section>
	)
}

export default Hero;


