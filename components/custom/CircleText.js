function CircleText({text, size = 4, deg = 8, innerCircleSize = 1.4, dataAos= null, fontSize = 14}) {
	const textArray = text ? text.split("") : [];
	const dimension = Math.floor(textArray.length * size);
	let dimensionAfter = dimension - (fontSize *  (fontSize <= 11 ? 6 : 5));
	
	// if((dimension - dimensionAfter) < 70){
	// 	// dimensionAfter = 70;
	// }
	
	
	const css = `
		.circle-text{
			font-size: ${fontSize}px;
		}
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
									height: dimension / 2 - 5 +'px'
								}}>{char}</span>
							})
						}
					</p>
				</div>
			</>
	);
}

export default CircleText;