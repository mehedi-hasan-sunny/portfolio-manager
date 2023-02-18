import SectionLayout from "../layout/SectionLayout";
import Input from "../custom/Input";
import {commonFromSubmitHandler, ucFirst} from "../../helpers/common";
import {useState} from "react";

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
	
	const [currentTab, setCurrentTab] = useState(0);
	const handleTabSelection = (value) => {
		setCurrentTab(value)
	}
	const checkActiveTab = (value) => {
		return currentTab === value ? 'active' : ''
	}
	
	
	const SectionField = ({settingsData, previousKey = ''}) => {
		return Object.keys(settingsData).map((setting, settingIndex) => {
			const name = `${previousKey !== '' ? previousKey + '.' : ''}${setting}`;
			const key = `${name}-${settingIndex}`;
			
			if (settingsData[setting] === undefined) {
				return;
			}
			return (
					typeof settingsData[setting] === 'string' ?
							<Input label={ucFirst(setting.replaceAll('_', ' '))} name={`${name}`}
							       defaultValue={settingsData[setting]}
							       key={key}/>
							:
							<div className={"ps-1"} key={key}>
								<h4 className={"border-bottom pb-2 fw-bold"}>{ucFirst(setting.replace('_', ' '))}</h4>
								<div className={"ps-3"}>
									<SectionField settingsData={settingsData[setting]} previousKey={name} key={key}/>
								</div>
							</div>
			)
		})
	}
	
	return (
			<SectionLayout title={"Settings"}>
				<form onSubmit={handleSubmit}>
					<div className={"tabs mb-4 pt-0"}>
						{
							Object.keys(settings).map((setting, settingIndex) => {
								if(currentTab === 0 && settingIndex === 0){
									setCurrentTab(setting)
								}
								return (
										<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab(setting)}`}
										        key={'tab-' + settingIndex} onClick={() => handleTabSelection(setting)}>{ucFirst(setting)}
										</button>
								)
							})
						}
					</div>
					
					{
						Object.keys(settings).map((setting, settingIndex) => {
							return (
									<div className={`tab-content ${currentTab === setting ? 'active' : ''}`} key={`setting-${settingIndex}`} data-tab={setting}>
										<SectionField settingsData={settings[setting]} previousKey={setting}/>
									</div>
							)
						})
					}
					<blockquote className={'fs-12 mt-4 ms-2'}>
						<i>Leaving empty field will result in hiding the respected section(s)/field(s)</i>
					</blockquote>
					<button className={"btn bg-olive pull-right text-white"}>Update</button>
				</form>
			</SectionLayout>
	)
};

export default SettingsSection;