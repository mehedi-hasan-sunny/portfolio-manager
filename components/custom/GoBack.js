import { useRouter } from 'next/router'
import React from "react";
function GoBack(props) {
	const router = useRouter();
	return (
			<button className={"transparent-btn mr-2"} onClick={() => router.back()} aria-label={"Go back to previous page"}>
				<i className={"las la-arrow-circle-left la-2x"}/>
			</button>
	);
}

export default GoBack;