import SectionLayout from "../layout/SectionLayout";
import Input from "../custom/Input";
import {ucFirst} from "../../helpers/common";

const SettingsSection = ({
	                         settings,
	                         isAdmin = false,
	                         editSetting = null,
	                         deleteSetting = null,
	                         className = null,
	                         ...props
                         }) => {
	console.log(new Map(settings))
	console.log(Object.entries(settings), "lkjh")
	
	return (
			<SectionLayout title={"Settings"}>
				{
					Object.keys(settings).map((segment1, index) => {
						return Object.keys(settings[segment1]).map((child) => {
							return Object.keys(settings[parent][segment1]).map((setting) => {
								return <Input label={ucFirst(setting)} defaultValue={settings[segment1][setting]}/>
							})
						})
					})
				}
			</SectionLayout>
	)
};

export default SettingsSection;