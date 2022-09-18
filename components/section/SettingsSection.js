import SectionLayout from "../layout/SectionLayout";
import Input from "../custom/Input";
import {commonFromSubmitHandler, ucFirst} from "../../helpers/common";

const SettingsSection = ({
	                         settings,
	                         isAdmin = false,
	                         editSetting = null,
	                         deleteSetting = null,
	                         className = null,
	                         ...props
                         }) => {
	
	const handleSubmit = async (event) => {
		event.preventDefault()
		const form = new FormData(event.target)
		const formProps = Object.fromEntries(form);
		
		await commonFromSubmitHandler(event, formProps,"/admin/settings",null, () =>{
			window.location.reload()
		}, {customSuccessMessage: 'Updated successfully'})
	}
	
	return (
			<SectionLayout title={"Settings"}>
				<form onSubmit={handleSubmit}>
					{
						Object.keys(settings).map((parent) => {
							return Object.keys(settings[parent]).map((child, childIndex) => {
								return (
										<div key={childIndex}>
											<h3 className={"border-bottom pb-2"}>{ucFirst(child)}</h3>
											{
												Object.keys(settings[parent][child]).map((setting, childIndex) => {
													return <Input label={ucFirst(setting)} name={`${parent}.${child}.${setting}`}
													              defaultValue={settings[parent][child][setting]} key={{childIndex}}/>
												})
											}
										</div>
								)
							})
						})
					}
					<button className={"btn bg-olive pull-right text-white"}>Submit</button>
				</form>
			</SectionLayout>
	)
};

export default SettingsSection;