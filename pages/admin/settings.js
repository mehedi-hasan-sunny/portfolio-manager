import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "settings",
	singleItemName: "setting",
	adminApiUrl: "settings",
	sectionComponentName: "SettingsSection",
	sectionFormName: "SettingForm",
	addButtonHidden: true
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps, context)
}

export default class settings extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}