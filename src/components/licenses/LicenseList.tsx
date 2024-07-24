import React, { useEffect, useState } from "react";
import Link from "next/link";
import { License } from "@prisma/client";

const LicenseList = (companyID: number) => {
	const [licenses, setLicenses] = useState<License[]>([]);

	useEffect(() => {
		async function fetchLicenses() {
			const res = await fetch(`/api/companies/${companyID}/licenses`);
			const data: License[] = await res.json();
			setLicenses(data);
		}

		fetchLicenses();
	}, [companyID]);

	return (
		<ul>
			{licenses.map((license) => (
				<li key={license.id}>
					<Link href={`/companies/${companyID}/${license.id}`}>
						`Agência: ${license.agency} Número: ${license.number}`
					</Link>
				</li>
			))}
		</ul>
	);
};

export default LicenseList;
