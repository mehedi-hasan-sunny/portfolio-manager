import CommonPageLayout from "../../components/admin/CommonPageLayout";
import {commonGetServerSideProps} from "../../helpers/common";
import SectionLayout from "../../components/layout/SectionLayout";
import React from "react";


const LinkCategorySection = ({linkCategories, editLinkCategory, deleteLinkCategory}) =>{
	return (
			<SectionLayout title={"Link Categories"}>
				<div className={"table-rounded"}>
					<table className={"w-100 table"}>
						<thead>
						<tr>
							<td width={"80%"}>Item</td>
							<td width={"20%"} className={"text-center"}>Action</td>
						</tr>
						</thead>
						<tbody>
						
						{
							linkCategories.map((item, index) => {
								return (
										<tr key={index}>
											<td>
												<div className={"d-flex align-center gap-1"}>
													<i className={item.icon + " la-2x"}/> <span>{item.title}</span>
												</div>
											</td>
											<td>
												<div className={"d-flex justify-center align-center gap-1"}>
													<button className={"transparent-btn"} aria-label={"Edit link"}
													        onClick={() => {
														        editLinkCategory(item);
													        }}>
														<i className={"las la-edit"}/>
													</button>
													
													<button className={"transparent-btn"} aria-label={"Delete link"}
													        onClick={() => {
														        deleteLinkCategory(item.id)
													        }}>
														<i className={"las la-trash-alt text-danger"}/>
													</button>
												</div>
											</td>
										</tr>
								)
							})
						}
						</tbody>
					</table>
				</div>
			</SectionLayout>
	)
}

const mainProps = {
	sectionDataName: "linkCategories",
	singleItemName: "linkCategory",
	adminApiUrl: "link-categories",
	sectionComponentName: null,
	sectionFormName: "LinkCategoryForm"
}

export async function getServerSideProps(context) {
	return commonGetServerSideProps(mainProps)
}

export default class linkCategories extends CommonPageLayout {
	constructor(props) {
		super(props);
		this.SectionComponent = LinkCategorySection;
	}
	
}