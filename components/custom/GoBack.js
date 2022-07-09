import { useRouter } from 'next/router'
import React from "react";
function GoBack(props) {
	const router = useRouter();
	return (
			<button className={"transparent-btn d-flex align-center justify-space-between mr-2"} onClick={() => router.back()} aria-label={"Go back to previous page"}>
				<i className={"las la-arrow-circle-left fs-20 mr-2"}/>
				{
					props.children ?
							props.children :
							<h3 className="mb-0">Back</h3>
				}
			</button>
	);
}

export default GoBack;