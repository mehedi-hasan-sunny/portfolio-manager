import React, {useState} from 'react';

function Header(props) {
	const [currentTab, setCurrentTab] = useState('about');
	
	const handleTabSelection = (value) => {
		setCurrentTab(value)
	}
	const checkActiveTab = (value) => {
		return currentTab === value ? 'active' : ''
	}
	const hideOrShowTabSection = (value) => {
		return currentTab !== value ? ' d-none' : ''
	}
	
	return (
			<div>
				<div className={"tabs"}>
					<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("about")}`}
					        onClick={() => handleTabSelection('about')}>About</button>
					<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("projects")}`}
					        onClick={() => handleTabSelection('projects')}>Projects</button>
					<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("blog")}`}
					        onClick={() => handleTabSelection('blog')}>Blog</button>
					<button type={"button"} role={"tab"} className={`tab-item ${checkActiveTab("contact")}`}
					        onClick={() => handleTabSelection('contact')}>Contact</button>
				</div>
			</div>
	);
}

export default Header;