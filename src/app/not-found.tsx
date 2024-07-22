import React from "react";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[100vh]">
			<h1>404</h1>
			<h2>Page not found</h2>
			<p>Could not find requested resource.</p>

			<a href="/" className="font-bold mt-5">
				Go back.
			</a>
		</div>
	);
};

export default NotFound;
