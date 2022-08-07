import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "experiences",
	singleItemName: "experience",
	adminApiUrl: "experiences",
	sectionComponentName: "ExperiencesSection",
	sectionFormName: "ExperienceForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps, context)
}

export default class experiences extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}