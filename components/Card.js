import styles from '../styles/Card.module.css'
import Image from "next/image";

const Card = ({imgSrc, alt, className = null, maxWidth = null, maxHeight = null, children, style, onClick = null}) => {
	return (
			<div className={styles.card + " " + (className ? className : '')} onClick={()=> onClick ? onClick(): null}>
				
				{imgSrc ?
						<Image className={"img-fluid"}  src={imgSrc}
						       loading={"lazy"} alt={alt} height={320} width={410} style={{borderRadius: '8px'}}/>
					 : null}
				{children}
			</div>
	);
};

export default Card;
