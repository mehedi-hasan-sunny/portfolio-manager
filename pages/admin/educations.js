import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "educations",
	singleItemName: "education",
	adminApiUrl: "educations",
	sectionComponentName: "EducationsSection",
	sectionFormName: "EducationForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps)
}

export default class educations extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}