import React from 'react';

function SectionLayout({title, header = null, className = null, ...props}) {
	return (
			<section className={("row py-5" + " " + (className ?? '')).trim()}>
				<div className="col-xs-12 col-sm-3">
					<h2 className={"fw-bold lh-48"}>{title}</h2>
				</div>
				{
					header ? (<div className="col-xs-12 col-sm-9">
						<h1 className={"fw-bold fs-36 lh-48 mb-4"}>{header}</h1>
					</div>) : null
				}
				
				<div className={`col-xs-12 ${header ? 'offset-sm-3' : ''} col-sm-9`}>
					{props.children}
				</div>
			</section>
	);
}

export default SectionLayout;