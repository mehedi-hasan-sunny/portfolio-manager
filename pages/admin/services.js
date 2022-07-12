import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "services",
	singleItemName: "service",
	adminApiUrl: "services",
	sectionComponentName: "ServicesSection",
	sectionFormName: "ServiceForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps)
}

export default class services extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}