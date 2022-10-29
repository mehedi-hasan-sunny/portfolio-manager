function SectionLayout({title = null, header = null, className = null, dataAosDelay = null, ...props}) {
	dataAosDelay = dataAosDelay ? {"data-aos-delay": dataAosDelay} : dataAosDelay;
	return (
			<section className={("row py-5" + " " + (className ?? '')).trim()}>
				{
					title ? (
							<div className="col-xs-12 col-sm-3" data-aos="fade-right" {...dataAosDelay}>
								<h2 className={"fw-600 lh-44 fs-24"}>{title}</h2>
							</div>
					) : null
				}
				{
					header ? (<div className="col-xs-12 col-sm-9" data-aos="fade-left" {...dataAosDelay}>
						<h1 className={"fw-bold fs-36 lh-44 mb-4"}>{header}</h1>
					</div>) : null
				}
				{
					props.children ?
							<div className={`col-xs-12 ${header || !title ? 'offset-sm-3' : ''} col-sm-9`}
							     data-aos="fade-left" {...dataAosDelay}>
								{props.children}
							</div>
							: null
				}
			
			</section>
	);
}

export default SectionLayout;