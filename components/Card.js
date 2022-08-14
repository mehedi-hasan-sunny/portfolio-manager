import styles from '../styles/Card.module.css'
import Image from "next/image";
import NoImage from "../public/no-image.jpg"

const Card = ({imgSrc, alt, className = null, maxWidth = null, maxHeight = null, children, style, onClick = null}) => {
	
	return (
			<div className={styles.card + " " + (className ? className : '')} onClick={() => onClick ? onClick() : null}>
				
				{imgSrc ?
						<div className="image-container">
							<Image className={"img-fluid"} src={imgSrc} placeholder={NoImage}
							       loading={"lazy"} alt={alt} height={320} width={410} style={{borderRadius: '8px'}}/>
						</div>
						: null}
				{children}
			</div>
	);
};

export default Card;
