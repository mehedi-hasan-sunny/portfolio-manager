import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "certifications",
	singleItemName: "certification",
	adminApiUrl: "certifications",
	sectionComponentName: "CertificationsSection",
	sectionFormName: "CertificationForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps)
}

export default class certifications extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}