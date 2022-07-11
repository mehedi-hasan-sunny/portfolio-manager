import React, {useContext, useState} from 'react';
import HomeContext from "../../context/HomeContext";

function Navbar({className = '', ...props}) {
	
	const handleTabSelection = (value) => {
		setCurrentTab(value)
	}
	const checkActiveTab = (value) => {
		return currentTab === value ? 'active' : ''
	}
	const hideOrShowTabSection = (value) => {
		return currentTab !== value ? ' d-none' : ''
	}
	
	const value = useContext(HomeContext);
	const {currentTab} = value.state;
	const {setCurrentTab} = value;
	
	
	return (
			<nav className={(`nav-bar fixed tabs ${className}`)}>
				<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("about")}`}
				        onClick={() => handleTabSelection('about')}>About
				</button>
				<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("projects")}`}
				        onClick={() => handleTabSelection('projects')}>Projects
				</button>
				<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("blog")}`}
				        onClick={() => handleTabSelection('blog')}>Blog
				</button>
				<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("contact")}`}
				        onClick={() => handleTabSelection('contact')}>Contact
				</button>
			</nav>
	);
}

export default Navbar;