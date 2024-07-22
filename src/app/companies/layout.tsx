import MyContainer from "@/components/Container";
import Header from "@/components/Header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Header />
			<MyContainer>{children}</MyContainer>
		</section>
	);
}
