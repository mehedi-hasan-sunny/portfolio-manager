import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "blogs",
	singleItemName: "blog",
	adminApiUrl: "blogs",
	sectionComponentName: "BlogsSection",
	sectionFormName: "BlogForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps, context)
}

export default class blogs extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}