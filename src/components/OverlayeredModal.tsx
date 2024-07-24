"use client";
import React, { useCallback, useEffect, useRef } from "react";
// overlay i already developed on my portfolio.
type OverlayProps = {
	isOpen: boolean;
	handleClose: () => void;
};

const OverlayedModal = ({ isOpen, handleClose }: OverlayProps) => {
	/// initialize a useRef, then put it on the ref={} attribute on the div
	const overlayRef = useRef<HTMLDivElement>(null);

	/// close modal when pressing escape key
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) =>
			e.key === "Escape" ? handleClose() : null;
		document.body.addEventListener("keydown", closeOnEscapeKey);
		return (): void =>
			document.body.removeEventListener("keydown", closeOnEscapeKey);
	}, [handleClose]);

	/// block scrollbar when modal is open :D
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "unset";
		return (): void => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	/// close the modal if the click was on the overlay itself
	const handleOverlayClick = useCallback(
		(event: MouseEvent) => {
			if (overlayRef.current && overlayRef.current === event.target) {
				handleClose();
			}
		},
		[overlayRef, handleClose],
	);

	/// puts the listener on the overlay reference (useRef hook)
	/// it must be the current one so u can use .current
	useEffect(() => {
		const currentOverlay = overlayRef.current;

		if (currentOverlay && isOpen) {
			currentOverlay.addEventListener("click", handleOverlayClick);
		}

		return () => {
			if (currentOverlay) {
				currentOverlay.removeEventListener("click", handleOverlayClick);
			}
		};
	}, [handleOverlayClick, isOpen]);

	if (!isOpen) return null;

	return (
		<div
			ref={overlayRef}
			className={`z-[8] fixed top-0 left-0 w-full h-full bg-black/50 flex pt-16 md:hidden
                ${
									isOpen
										? "opacity-1 pointer-events-auto"
										: "opacity-0 pointer-events-none"
								}`}>
			<nav className="md:hidden z-[9] w-full h-fit">
				<ul className="flex flex-col">
					<li className=" bg-gradient-to-t from-slate-950 to-slate-800 border border-slate-900">
						<a
							href="/companies"
							className="hover:text-slate-100 active:text-slate-300">
							<div className="py-[0.7rem] text-center select-none">
								Lista de Empresas
							</div>
						</a>
					</li>

					<li className=" bg-gradient-to-t from-slate-950 to-slate-800 border border-slate-900">
						<a
							href="https://github.com/Hazel-A-I"
							target="_blank"
							className="hover:text-slate-100 active:text-slate-300 ">
							<div className="py-[0.7rem] text-center select-none">Github</div>
						</a>
					</li>
					<li className=" bg-gradient-to-t from-slate-950 to-slate-800 border border-slate-900">
						<a
							href="https://www.linkedin.com/in/hazel-arcangelo/"
							className="hover:text-slate-100 active:text-slate-300 ">
							<div className="py-[0.7rem] text-center select-none">
								Linkedin
							</div>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default OverlayedModal;
