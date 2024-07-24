"use client";
import Image from "next/image";
import React, { useState } from "react";
import menuIcon from "../../public/icons/menu-icon.svg";
import closeIcon from "../../public/icons/close-icon.svg";
import OverlayedModal from "./OverlayeredModal";
const Header = () => {
	const [isModalOpen, setToggleModal] = useState(false);
	const handleToggleModal = () => {
		setToggleModal(!isModalOpen);
	};

	const renderModal = () => (
		<OverlayedModal isOpen={isModalOpen} handleClose={handleToggleModal} />
	);

	return (
		<>
			<header className="border border-white from-slate-700 to-slate-500 bg-gradient-to-b fixed top-0 z-10 h-16 w-full ">
				<div className="w-full max-w-[75rem] flex justify-between flex-row items-center text-secondary px-[1rem] h-full m-auto">
					<button
						onClick={handleToggleModal}
						className="w-8 border border-white rounded-lg md:hidden bg-black/50 hover:bg-black/80 active:bg-black/90">
						{isModalOpen ? (
							<Image alt="Close" src={closeIcon} />
						) : (
							<Image alt="Menu" src={menuIcon} />
						)}
					</button>
					<a
						href="/companies"
						className="text-[1.4rem] fixed left-[calc(50%-2rem)] md:static font-extrabold">
						CRUD
					</a>
					<nav className="hidden md:block">
						<ul className="flex gap-4">
							<li>
								<a
									href="/company"
									className="hover:text-slate-100 active:text-slate-300">
									Lista de Empresas
								</a>
							</li>
							<li>
								<a
									href="https://github.com/Hazel-A-I"
									target="_blank"
									className="hover:text-slate-100 active:text-slate-300">
									Github
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/in/hazel-arcangelo/"
									className="hover:text-slate-100 active:text-slate-300">
									Linkedin
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			{isModalOpen ? renderModal() : null}
		</>
	);
};

export default Header;
