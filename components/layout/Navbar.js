import {useContext, useState} from 'react';
import HomeContext from "../../context/HomeContext";
import {ucFirst} from "../../helpers/common";

function Navbar({className = '', ...props}) {
	
	const handleTabSelection = (value) => {
		setCurrentTab(value)
	}
	const checkActiveTab = (value) => {
		return currentTab === value ? 'active' : ''
	}
	
	const value = useContext(HomeContext);
	const {currentTab} = value.state;
	const {setCurrentTab} = value;
	
	const tabs = ["about", "projects", "services", "blogs", "contact"]
	
	return (
			<nav className={(`nav-bar fixed tabs ${className}`)}>
				{
					tabs.map((tab, index) =>
							<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab(tab)}`} key={index}
							        onClick={() => handleTabSelection(tab)}>{ucFirst(tab)}
							</button>
					)
				}
			</nav>
	);
}

export default Navbar;