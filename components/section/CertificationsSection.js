import React from 'react';
import SectionLayout from "../layout/SectionLayout";

const CertificationsSection = ({certifications, isAdmin = false, editCertification = null, deleteCertification = null, className = null,dataAosDelay= null, ...props}) => {
	return (
			<SectionLayout className={className} title={"Certifications"} dataAosDelay={dataAosDelay}>
				{
					certifications.map((certification, index) => {
						return (
								<div className={"relative mb-3 " + (index !== (certifications.length - 1) ? "border-bottom" : '')}
								     key={index}>
									<div className={"d-flex gap-1"}>
										<i className={"la la-2x la-school text-gold"}></i>
										<div>
											<h3 className={"lh-28"}>{certification.title}</h3>
											<h3 className={"fw-600 lh-28"}>{certification.institution}</h3>
											<h4 className={"mb-3"}>Issued: {certification.issueDate} - {certification.expireDate ?? 'No Expiration Date'}</h4>
											<a className={"btn btn-sm border-1"} rel={"noreferrer"} target={"_blank"} href={certification.certificateLink}>Show Certification</a>
										</div>
									</div>
									
									{
										isAdmin ?
												<div className={"top-right"}>
													<div className={"d-flex align-center gap-0.5"}>
														<button className={"transparent-btn"} aria-label={"Edit experience"}
														        onClick={() => {
															        editCertification(certification);
														        }}>
															<i className={"las la-edit"}/>
														</button>
														
														<button className={"transparent-btn"} aria-label={"Delete experience"}
														        onClick={() => {
															        deleteCertification(certification.id)
														        }}>
															<i className={"las la-trash-alt text-danger"}/>
														</button>
													</div>
												</div> : null
									}
								</div>
						)
					})
				}
			</SectionLayout>
	)
};

export default CertificationsSection;