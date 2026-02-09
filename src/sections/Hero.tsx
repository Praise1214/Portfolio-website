import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profileInfo } from "../constants";
import Button from "@/components/Button";
import ErrorBoundary from "@/components/ErrorBoundary";
import HeroExperience from "@/components/models/hero_models/HeroExperience";
import AnimatedCounter from "@/components/AnimatedCounter";
const roles = [
	"FullStack Developer",
	"React Specialist",
	"Mobile App Builder",
	"Automation Engineer",
	"Web Scraping Specialist",
	"Apify Actor Developer",
	"CRM & Workflow Builder",
	"Problem Solver",
];

const Hero = () => {

	const ITEM_HEIGHT_REM = 2; // each <p> is h-8 = 2rem
	const rolesLoop = [...roles, roles[0]]; // clone first role at end

	const [currentRole, setCurrentRole] = useState(0);
	const [isResetting, setIsResetting] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRole((prev) => (prev + 1));
		}, 3000);
		return () => clearInterval(interval);
	}, [])

	const handleTransitionEnd = () => {
		// if we've reached the cloned last item, jump back to the real first item
		if (currentRole === roles.length) {
			setIsResetting(true);     // temporarily disable transition
			setCurrentRole(0);        // jump to the real first
		}
	}

	useEffect(() => {
		const onVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				setIsResetting(true);
				setCurrentRole((prev) => (prev >= roles.length ? 0 : prev));
			}
		};

		document.addEventListener("visibilitychange", onVisibilityChange);
		return () => document.removeEventListener("visibilitychange", onVisibilityChange);
	}, []);

	useEffect(() => {
		if (!isResetting) return;
		const id = requestAnimationFrame(() => setIsResetting(false));
		return () => cancelAnimationFrame(id);
	}, [isResetting])

	useGSAP(() => {
		gsap.fromTo(".hero-animate",
			{ y: 40, opacity: 0 },
			{ y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" })
	})

	return (
		<section id="hero" className="relative overflow-hidden bg-grid-pattern min-h-[80svh] md:min-h-screen">

			<div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
			{/* Decorative blurs */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

			<div className="hero-layout">

				{/* Left Content */}
				<div className="flex-1 max-w-2xl lg:max-w-lg xl:max-w-xl lg:-ml-20">
					<div className="hero-animate">
						<div className="hero-badge relative -top-1 md:-top-6 mb-4 md:mb-0">
							<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
							<span>Available for opportunities</span>
						</div>
					</div>


					<div className="hero-text mt-6">
						<h1 className="hero-animate">
							Hi, I'm{" "}
							<span className="text-gradient">{profileInfo.name.split(" ")[0]}</span>
						</h1>
						<h1 className="hero-animate mt-2">
							I design and build scalable apps for
						</h1>
						<h1 className="hero-animate mt-1">
							the <span className="text-primary">web & mobile</span>
						</h1>
					</div>

					{/*Animated role */}
					<div className="hero-animate mt-6 h-8 overflow-hidden">
						<div
							onTransitionEnd={handleTransitionEnd}
							className={isResetting ? "" : "transition-transform duration-500 ease-out"}
							style={{ transform: `translateY(-${currentRole * ITEM_HEIGHT_REM}rem)` }}
						>
							{rolesLoop.map((role, i) => (
								<p key={`${role}-${i}`} className="h-8 text-lg md:text-xl text-primary font-medium">
									{role}
								</p>
							))}
						</div>
					</div>

					<p className="hero-animate text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
						{profileInfo.title} based in {profileInfo.location}.<br />
						I build scalable applications with great user experiences.
					</p>

					<div className="hero-animate flex flex-wrap gap-4 mt-8">
						<Button
							text="See My Work"
							className="md:w-80 md:h-16 w-60 h-12"
							id="counter"
						/>
					</div>
				</div>

				{/* Right - 3D Photo Gallery */}
				<div className="flex-1 w-full max-w-lg lg:max-w-lg xl:max-w-xl h-[320px] sm:h-[380px] md:h-[500px] relative md:translate-x-15 lg:translate-x-30">
					<ErrorBoundary
						fallback={
							<div className="w-full h-full flex-center rounded-3xl bg-gradient-to-br from-surface-light to-surface-elevated border border-border overflow-hidden">
								<div className="relative">
									<img
										src="/images/profile-professional.webp"
										alt="Praise Daniels"
										className="w-48 h-60 object-cover rounded-xl border-2 border-primary shadow-2xl"
									/>
									<div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex-center text-surface text-xl">
										👨‍💻
									</div>
								</div>
							</div>
						}
					>
						<HeroExperience />
					</ErrorBoundary>
				</div>




			</div>

			<AnimatedCounter />
		</section>
	)
}

export default Hero;
