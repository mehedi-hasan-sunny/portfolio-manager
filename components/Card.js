import styles from '../styles/Card.module.css'

const Card = ({imgSrc, alt, className = null, maxWidth = null, maxHeight = null, children, style, onClick = null}) => {
	return (
			<div className={styles.card + " " + (className ? className : '')} onClick={()=> onClick ? onClick(): null}>
				{imgSrc ? <img loading={"lazy"} className={"img-fluid"} src={imgSrc} alt={alt} style={{maxWidth: maxWidth, maxHeight: maxHeight, ...style}}/> : null}
				{children}
			</div>
	);
};

export default Card;
