import HtmlParser from "html-react-parser";

function Blog({
	              blog,
	              handleSelectedItem,
	              className = '',
	              order = 0,
	              isAdmin = false,
	              editBlog = null,
	              deleteBlog = null,
              }) {
	
	const getCoverImage = () => {
		console.log(blog)
		if (blog?.coverImage) {
			return blog?.coverImage;
		}
		return "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		
	}
	const mod = order % 2;
	return (<div className={`row py-5 ${className}`.trim()}>
				<div className={`col-sm-12 col-md-6 col-lg-5 p${mod === 1 ? 's' : 'e'}-md-0 order-${mod === 1 ? '1' : '2'}`}
				     data-aos={`fade-${mod === 1 ? 'right' : 'left'}`}>
					<img className={"img-fluid me-0 me-md-auto mt-5 mt-md-0"} src={getCoverImage()}
					     loading={"lazy"} alt={blog.title}/>
				</div>
				<div className={`col-sm-12 col-md-6 col-lg-7 p${mod !== 1 ? 's' : 'e'}-md-0 order-${mod !== 1 ? '1' : '2'}`}
				     data-aos={`fade-${mod !== 1 ? 'right' : 'left'}`}>
					
					{isAdmin ? <div className={"top-right"}>
						<div className={"d-flex align-center gap-0.5"}>
							<button className={"transparent-btn"} aria-label={"Edit experience"}
							        onClick={() => {
								        editBlog(blog);
							        }}>
								<i className={"las la-edit"}/>
							</button>
							
							<button className={"transparent-btn"} aria-label={"Delete experience"}
							        onClick={() => {
								        deleteBlog(blog.id)
							        }}>
								<i className={"las la-trash-alt text-danger"}/>
							</button>
						</div>
					</div> : null}
					
					<div className="d-flex h-100 flex-column justify-space-between">
						<div className={"d-flex flex-wrap gap-0.5 mb-3"}>
							{
								blog?.tags?.split(',').map((tag) =>{
									return <span className={"text-muted fs-12"}>{`#${tag}`}</span>
								})
							}
						</div>
						<h1 title={"title"} className={"fw-bold mb-3"}>{blog.title}</h1>
						<h3 title={"subtitle"}>{blog.subtitle}</h3>
						<div className={"mt-4"}>
							{HtmlParser(blog?.summary ?? '')}
						</div>
						<a href={`/blog/${blog.id}`} target={"_blank"}
						   className={`mt-auto d-inline-flex align-center text-underline m${mod === 1 ? 's' : 'e'}-auto`}>
							<span>See more  &nbsp;</span><i className={"las la-arrow-right"} style={{paddingTop: '1px'}}></i>
						</a>
					</div>
				</div>
				
				
			
			</div>);
}

export default Blog;