import { useRouter } from 'next/router';
function GoBack(props) {
	const router = useRouter();
	return (
			<button className={"transparent-btn d-flex align-center justify-space-between me-2"} onClick={() => router.back()} aria-label={"Go back to previous page"}>
				<i className={"las la-arrow-circle-left fs-24 me-2"}/>
				{
					props.children ?
							props.children :
							<h3 className="mb-0">Back</h3>
				}
			</button>
	);
}

export default GoBack;