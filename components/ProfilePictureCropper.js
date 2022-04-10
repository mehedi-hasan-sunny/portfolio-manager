import React, {useEffect, useRef, useState} from 'react';
import Cropper from 'cropperjs';
import "cropper/dist/cropper.min.css"

function ProfilePictureCropper({image}) {
	const [picture, setPicture] = useState(image)
	const cropperImage = useRef(null);
	const inputStraighten = useRef(null);
	const inputZoom = useRef(null);
	let cropper = null;
	
	useEffect(() => {
		if (picture) {
			cropper = new Cropper(cropperImage.current, {
				aspectRatio: 1,
				dragMode: 'move',
				autoCropArea: 0.5,
				zoomOnWheel: false,
				highlight: false,
				cropBoxMovable: false,
				cropBoxResizable: false,
				toggleDragModeOnDblclick: false,
				minCropBoxHeight: 300,
				minCropBoxWidth: 300,
				allowSelect: false,
				rotatable: true,
				viewMode: 1,
				data: { //define cropbox size
					width: 300,
					height: 300,
				},
				
				crop(event) {
					// console.log(event.detail);
				},
			})
		}
	}, [picture])
	
	
	const uploadImage = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.addEventListener("load", function () {
			// convert image file to base64 string
			setPicture(reader.result)
		}, false);
		if (file) {
			reader.readAsDataURL(file);
		}
	}
	
	const straighten = (event) => {
		cropper.rotateTo(event.target.value)
	}
	const rotate = () => {
		cropper.rotate(90)
	}
	const handleZoom = (event) => {
		cropper.zoomTo(event.target.value)
	}
	const handleReset = () => {
		cropper.reset()
		inputStraighten.current.value = 0;
		inputZoom.current.value = 0.5;
	}
	
	const getCroppedFile = () => {
		console.log(cropper.getData()) // save this data to db to set the cropper > data preset
		console.log(cropper.getCroppedCanvas().toDataURL())
	}
	
	return (
			<>
				{
					picture ?
							<>
								<div style={{height: "350px"}}>
									<img className={"img-fluid"} src={picture} ref={cropperImage} id="cropper"/>
								</div>
								<div className="container">
									<div className={"row align-center my-3"}>
										<div className="col-6">
											<div className={"d-flex justify-space-between gap-2"}>
												<label htmlFor="zoom" className={"form-label"}> Zoom</label>
											</div>
											
											<input ref={inputZoom} className={"form-control"} type="range" id="zoom" name="zoom" onChange={handleZoom}
											       min="0" max="3.5" defaultValue="0.5" step="0.1"/>
										</div>
										<div className="col-6">
											<div className={"d-flex justify-space-between gap-2"}>
												<label htmlFor="straighten" className={"form-label"}> Straighten</label>
												<button className={"transparent-btn"} onClick={rotate} title={"Rotate"}>
													<i className="las la-undo-alt" style={{transform: "rotateY(180deg)"}}/>
												</button>
											</div>
											
											<input ref={inputStraighten} className={"form-control"} type="range" id="straighten" name="straighten" onChange={straighten}
											       min="-45" max="45" defaultValue="0" step="1"/>
										</div>
									</div>
									<div className="row align-center">
										<div className="col-6">
											<button className={"btn btn-sm"} onClick={handleReset}>
												Reset
											</button>
										</div>
										<div className="col-6 text-right">
											<button className={"btn"} onClick={getCroppedFile}>
												Save photo
											</button>
										</div>
									</div>
								</div>
							</>
							:
							<div className={"container text-center"}>
								<input hidden type="file" id="upload-image" accept="image/*" onChange={uploadImage}/>
								<label htmlFor="upload-image" className={"btn text-center d-inline-flex flex-column align-center justify-center hoverable"} tabIndex={1} style={{minHeight: "8rem"}}>
									
									<i className="las la-cloud-upload-alt mb-2"/>
									<span>
										Upload
									</span>
								
								</label>
							</div>
				}
			</>
	);
}

export default ProfilePictureCropper;