import {useEffect, useRef, useState} from 'react';
import Cropper from 'cropperjs';
import "cropper/dist/cropper.min.css"
import {commonFromSubmitHandler} from "../../helpers/common";

function ProfilePictureCropper({displayPicture, profileId = null, onSuccessAction = null}) {
	const [picture, setPicture] = useState(displayPicture?.originalImage ?? null);
	const [id, setId] = useState(displayPicture?.id ?? null);
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
				width: 300,
				checkOrientation: false,
				data: { //define cropbox size
					width: 300,
					height: 300,
				},
				crop(event) {
					// console.log(event.detail);
					// console.log(cropper.getCanvasData());
				},
				ready(event) {
					// console.log(event)
					cropper
							.rotate(displayPicture?.displayPicturePositions?.rotate)
							.zoom(displayPicture?.displayPicturePositions?.zoom)
							.setCanvasData(displayPicture?.displayPicturePositions?.canvasData)
					inputZoom.current.value = displayPicture?.displayPicturePositions?.zoom ?? getZoomValue()
				}
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
		const containerData = cropper.getContainerData();
		cropper.zoomTo(event.target.value, {
			x: containerData.width / 2,
			y: containerData.height / 2,
		})
	}
	
	const getZoomValue = () => {
		const canvasData  = cropper.getCanvasData();
		return canvasData.width / canvasData.naturalWidth;
	}
	const handleReset = () => {
		cropper.reset()
		inputStraighten.current.value = 0;
		inputZoom.current.value = getZoomValue();
	}
	
	const handleCroppedFileSubmit = async (event) => {
		event.preventDefault()
		// console.log(cropper)
		// console.log(cropper.getData()) // save this data to db to set the cropper > data preset
		// console.log(cropper.getCroppedCanvas().toDataURL("image/jpeg"))
		// console.log(picture)
		
		/*const formData = new FormData();
		formData.append("id", id);
		formData.append("profileId", profileId);
		formData.append("displayPicture", await (await fetch(cropper.getCroppedCanvas().toDataURL("image/jpeg"))).blob());
		formData.append("originalImage", await (await fetch(picture)).blob());
		formData.append("positions", cropper.getData());*/
		const formData = {
			id,
			profileId,
			displayPicture: cropper.getCroppedCanvas().toDataURL("image/jpeg"),
			originalImage: displayPicture?.originalImage ?? picture,
			hasOriginalImage: !!displayPicture?.originalImage,
			positions: {...cropper.getData(), zoom: Number(inputZoom.current.value), canvasData: cropper.getCanvasData()},
		}
		try {
			// console.log(formData)
			const data = await commonFromSubmitHandler(
					event, formData,
					"/admin/upload-profile-picture",
					null,
					onSuccessAction,
					{customSuccessMessage: !formData.hasOriginalImage ? "Created successfully" : "Updated Successfully"}
			)

			if (await data) {
				if (!id) {
					setId(data.id);
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
	
	return (
			<>
				{
					picture ?
							<>
								<div style={{height: "350px"}}>
									<img className={"img-fluid mx-auto"} src={picture} ref={cropperImage} id="cropper"
									     style={{maxHeight: '350px'}}/>
								</div>
								<form onSubmit={handleCroppedFileSubmit}>
									<div className="container">
										<div className={"row align-center my-3"}>
											<div className="col-6">
												<div className={"d-flex justify-space-between gap-2"}>
													<label htmlFor="zoom" className={"form-label"}> Zoom</label>
												</div>
												
												<input ref={inputZoom} className={"form-control"} type="range" id="zoom" name="zoom"
												       onChange={handleZoom}
												       min="0" max="1.5" defaultValue="0" step="0.001"/>
											</div>
											<div className="col-6">
												<div className={"d-flex justify-space-between gap-2"}>
													<label htmlFor="straighten" className={"form-label"}> Straighten</label>
													<button className={"transparent-btn"} onClick={rotate} title={"Rotate"} type={"button"}>
														<i className="las la-undo-alt" style={{transform: "rotateY(180deg)"}}/>
													</button>
												</div>
												
												<input ref={inputStraighten} className={"form-control"} type="range" id="straighten"
												       name="straighten" onChange={straighten}
												       min="-45" max="45" defaultValue="0" step="1"/>
											</div>
										</div>
										<div className="row align-center">
											<div className="col-6">
												<button type={"button"} className={"btn btn-sm border-1"} onClick={handleReset}>
													Reset
												</button>
											</div>
											<div className="col-6 text-right">
												<button className={"btn bg-olive text-white border-1"} type={"submit"}>
													Save photo
												</button>
											</div>
										</div>
									</div>
								</form>
							
							</>
							:
							<div className={"container text-center"}>
								<input hidden type="file" id="upload-image" accept="image/*" onChange={uploadImage}/>
								<label htmlFor="upload-image"
								       className={"btn text-center d-inline-flex flex-column align-center justify-center hover-able border-1"}
								       tabIndex={1} style={{minHeight: "8rem"}}>
									
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