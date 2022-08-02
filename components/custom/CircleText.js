function CircleText({text, size = 4, deg = 8, innerCircleSize = 1.4, dataAos= null}) {
	const textArray = text ? text.split("") : [];
	const dimension = Math.floor(textArray.length * size);
	const dimensionAfter = Math.floor(dimension / innerCircleSize);
	
	const css = `
		.circle-text:before {
	    height: ${dimensionAfter}px;
	    width: ${dimensionAfter}px;
    }
	`
	dataAos = dataAos ? {"data-aos": dataAos} : dataAos;
	return (
			<>
				<style>{css}</style>
				<div {...dataAos}>
					<p className={"circle-text"} style={{width: `${dimension}px`, height: `${dimension}px`}}>
						{
							textArray.map((char, index) => {
								return <span key={index} style={{
									transform: `rotate(${(index * deg)}deg)`,
									height: dimensionAfter / 1.49+'px'
								}}>{char}</span>
							})
						}
					</p>
				</div>
			</>
	);
}

export default CircleText;