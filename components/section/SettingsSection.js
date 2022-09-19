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
						Object.keys(settings).map((parent, parentIndex) => {
							return (
									<div key={parentIndex}>
										<h2 className={"border-bottom pb-2"}>{ucFirst(parent)}</h2>
										{
											Object.keys(settings[parent]).map((child, childIndex) => {
												return (
														<>
															{
																typeof settings[parent][child] === 'string' ?
																		<Input label={ucFirst(child)} name={`${parent}.${child}`}
																		       defaultValue={settings[parent][child]}
																		       key={parentIndex + '-c-' + childIndex}/>
																		:
																		<div className={"ps-3"} key={parentIndex + '-c-' + childIndex}>
																			<h3 className={"border-bottom pb-2"}>{ucFirst(child)}</h3>
																			<div className={"ps-3"}>
																				{
																					Object.keys(settings[parent][child]).map((setting, settingIndex) => {
																						return (
																								<>
																									{
																										typeof settings[parent][child][setting] === 'string' ?
																												<Input label={ucFirst(setting)}
																												       name={`${parent}.${child}.${setting}`}
																												       defaultValue={settings[parent][child][setting]}
																												       key={parentIndex + '-c-' + childIndex + '-s-' + settingIndex}/>
																												:
																												<>
																													<h3 className={"border-bottom pb-2"}>{ucFirst(setting)}</h3>
																													{
																														Object.keys(settings[parent][child][setting]).map((subSetting, subSettingIndex) => {
																															return <Input label={subSetting}
																															              name={`${parent}.${child}.${setting}.${subSetting}`}
																															              defaultValue={settings[parent][child][setting][subSetting]}
																															              key={parentIndex + '-c-' + childIndex + '-s-' + settingIndex + '-ss-' + subSettingIndex}/>
																														})
																													}
																												</>
																										
																									}
																								</>
																						)
																					})
																				}
																			</div>
																		</div>
															}
														</>
												)
											})
										}
									</div>
							)
						})
					}
					<button className={"btn bg-olive pull-right text-white"}>Submit</button>
				</form>
			</SectionLayout>
	)
};

export default SettingsSection;