import styles from '../styles/Card.module.css'
import Image from "next/image";
import NoImage from "../public/no-image.jpg"
import {useCallback} from "react";

const Card = ({
	              imgSrc,
	              alt,
	              className = null,
	              maxWidth = null,
	              maxHeight = null,
	              children,
	              style,
	              onClick = null,
	              href = "#"
              }) => {
	
	const handleClick = useCallback((event) => {
		event.preventDefault();
		if (onClick) {
			onClick();
		}
	}, [onClick])
	return (
			<a href={href} className={styles.card + " " + (className ? className : '')} onClick={handleClick}>
				{imgSrc ?
						<div className="image-container">
							<Image className={"img-fluid"} src={imgSrc} placeholder={NoImage}
							       loading={"lazy"} alt={alt} height={320} width={410} style={{borderRadius: '8px'}}/>
						</div>
						: null}
				{children}
			</a>
	);
};

export default Card;
