import Blog from "../Blog";
import React from "react";

const BlogsSection = ({
	                      blogs,
	                      isAdmin = false,
	                      editBlog = null,
	                      deleteBlog = null,
	                      className = null,
	                      ...props
                      }) => {
	const passProps = {isAdmin, editBlog, deleteBlog};
	
	return (
			<section>
				{
					blogs.length ?
							<>
								<h2 className={"row fw-bold pb-4 border-bottom-2-dark ps-2 ps-md-0"}>
									<span data-aos={"fade-left"}>Latest Posts</span>
								</h2>
								{
									blogs.map((blog, index) => {
										return <Blog order={index + 1} blog={blog} key={index} {...passProps}/>
									})
								}
							</>
							: <div className={"text-center"}>No blogs posted yet</div>
				}
			</section>
	)
};

export default React.memo(BlogsSection);