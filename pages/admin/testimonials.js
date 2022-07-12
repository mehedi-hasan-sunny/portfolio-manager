import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";

const mainProps = {
	sectionDataName: "testimonials",
	singleItemName: "testimonial",
	adminApiUrl: "testimonials",
	sectionComponentName: "TestimonialsSection",
	sectionFormName: "TestimonialForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps)
}

export default class testimonials extends CommonPageLayout {
	constructor(props) {
		super(props);
	}
}