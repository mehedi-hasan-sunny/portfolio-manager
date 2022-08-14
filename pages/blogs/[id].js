import db from "../../config/firebaseAdmin";
import HtmlParser from "html-react-parser";
import Head from "next/head";

export async function getStaticProps(context) {
	console.log(context.req)
	try {
		let blog = null;
		
		const blogDoc = await db.doc(`blogs/${context.params.id}`).get();
		if (blogDoc.exists) {
			const data = blogDoc.data();
			data.publishedAt = data?.publishedAt?.toDate()?.toDateString() ?? null
			blog = {
				id: blogDoc.id,
				...data
			}
		}
		return {
			props: {blog},
			revalidate: 60
		}
		
	} catch (e) {
		return {
			props: {blog: null}
		}
	}
}

export async function getStaticPaths() {
	let paths = [];
	const blogsCollection = await db.collection("blogs").orderBy('publishedAt', 'desc').get();
	if (!blogsCollection.empty) {
		paths = blogsCollection.docs.map((blog) => ({
			params: {id: blog.id},
		}));
	}
	return {paths, fallback: 'blocking'}
}

function blog({blog = null}) {
	return (
			<>
				{
					!blog ?
							(<div> 404</div>)
							:
							<>
								<Head>
									<title></title>
									
									<meta name="description" content={blog.summary}/>
									<meta name="keywords" content={blog.tags}/>
									<meta property="og:type" content="article"/>
									<meta property="og:url" content="https://dev.to/sourishkrout/run-readmemd-in-your-terminal-19i"/>
									<meta property="og:title" content="Run README.md in your terminal"/>
									<meta property="og:description" content={blog.summary}/>
									<meta property="og:site_name" content="DEV Community"/>
									<meta name="twitter:site" content="@thepracticaldev"/>
									<meta name="twitter:creator" content="@sourishkrout"/>
									<meta name="twitter:title" content="Run README.md in your terminal"/>
									<meta name="twitter:description" content={blog.summary}/>
									<meta name="twitter:card" content="summary_large_image"/>
									<meta name="twitter:widgets:new-embed-design" content="on"/>
									<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
									<meta property="og:image" content={blog.coverImage}/>
									<meta name="twitter:image:src" content={blog.coverImage}/>
									
								</Head>
								<div className={"container mx-auto"} style={{maxWidth: '45vw', minWidth: '24rem'}}>
									<h1 className={"lh-44 fw-bold text-center"}>{blog?.title}</h1>
									<div>
										{HtmlParser(blog.content)}
									</div>
								</div>
							</>
					
				}
			</>
	);
}

export default blog;