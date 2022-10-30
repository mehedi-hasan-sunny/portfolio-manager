import Blog from "../Blog";
import React, {useCallback} from "react";
import NoImage from "../../public/no-image.jpg";
import Image from "next/image";
import HtmlParser from "html-react-parser";
import {convertTimestamp} from "../../helpers/common";

const BlogsSection = ({
	                      blogs,
	                      isAdmin = false,
	                      editBlog = null,
	                      deleteBlog = null,
	                      className = null,
	                      ...props
                      }) => {
	const passProps = {isAdmin, editBlog, deleteBlog};
	
	const convertToDate = useCallback((date) => convertTimestamp(date), []);
	
	const latestBlog = blogs[0];
	const recentBlogs = blogs.slice(1);
	
	return (
			<section>
				{
					blogs.length ?
							<>
								<h2 className={"fw-bold pb-4 border-bottom ps-2 ps-md-0"}>
									<span data-aos={"fade-left"}>Latest Post</span>
								</h2>
								
								<Blog order={1} blog={latestBlog} {...passProps}/>
								
								{
									recentBlogs.length ?
											<div className={"row"}>
												<div className={"col-12"}>
													<h2 className={"fw-bold pb-3 border-bottom mb-3"}>
														<span data-aos={"fade-left"}>Recent Posts</span>
													</h2>
												</div>
												{
													recentBlogs.map((blog, index) => {
														return <div className={"col-12 col-md-6 col-lg-4"} key={index}>
															<a href={`/blogs/${blog.id}`} target={"_blank"} rel={"noreferrer"} data-aos={"fade-up"}>
																<div className={"image-container"}>
																	<Image className={"img-fluid"} src={blog?.coverImage} placeholder={NoImage}
																	       loading={"lazy"} alt={blog.title} width={460} height={270}
																	       objectFit={"contain"} objectPosition={"center"}/>
																</div>
																<h3 title={"title"} className={"fw-bold mb-3"}>{blog.title}</h3>
																<summary className={"fs-14"}>
																	{HtmlParser(blog?.summary ?? '')}
																</summary>
																<small className={"text-muted"}> {convertToDate(blog.publishedAt)} </small>
															</a>
														</div>
													})
												}
											</div> : null
								}
							</>
							: <div className={"text-center"}>No blogs posted yet</div>
				}
			</section>
	)
};

export default React.memo(BlogsSection);