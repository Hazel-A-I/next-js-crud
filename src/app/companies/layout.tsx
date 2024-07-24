import Header from "@/components/Header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="w-full">
			<Header />
			<div className="h-16 mb-10"></div>
			{children}
			<div className="h-16"></div>
		</section>
	);
}
