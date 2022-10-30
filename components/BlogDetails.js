import React from 'react';
import PropTypes from 'prop-types';
import HtmlParser from "html-react-parser";
import Image from "next/image";

BlogDetails.propTypes = {
	blog: PropTypes.object.isRequired,
};

function BlogDetails({blog}) {
	return (
			<article className={"container mx-auto pt-0 blog-container bg-white"}>
				<div className={"mx-n3 mb-3"}>
					{
						blog?.coverImage ?
								<Image src={blog?.coverImage} loading={"lazy"} layout={"responsive"} objectFit={"contain"} objectPosition={"center"}
								       width={16} height={8}  alt={blog?.title + " cover image"}/>
								// <img src={blog?.coverImage} className={"img-fluid"} alt={blog?.title + " cover image"}/>
								: null
					}
				</div>
				<h1 className={"lh-44 fw-bold text-center mb-2"}>{blog?.title}</h1>
				<h5 className={"mb-2 text-center"}>{blog?.subtitle}</h5>
				<h5 className={"mb-3 text-center text-muted"}>
					<i className={"la la-calendar me-1"}></i><span>{blog?.publishedAt}</span>
				</h5>
				<div className={"border-top pt-3"}>
					{
						blog?.content ? HtmlParser(blog?.content) : null
					}
				</div>
			</article>
	);
}

export default BlogDetails;