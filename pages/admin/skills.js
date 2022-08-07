import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "skills",
	singleItemName: "skill",
	adminApiUrl: "skills",
	sectionComponentName: "SkillsSection",
	sectionFormName: "SkillForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps, context)
}

export default class skills extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}