import styles from '../styles/Card.module.css'

const Card = ({imgSrc, alt, className = null, maxWidth = null, maxHeight = null, children, style}) => {
	return (
			<div className={styles.card + " " + (className ? className : '')}>
				{imgSrc ? <img loading={"lazy"} src={imgSrc} alt={alt} style={{maxWidth: maxWidth, maxHeight: maxHeight, ...style}}/> : null}
				{children}
			</div>
	);
};

export default Card;
