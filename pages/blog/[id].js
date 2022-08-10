import db from "../../config/firebaseAdmin";
import HtmlParser from "html-react-parser";

export async function getStaticProps(context) {
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
						(<div>  404</div>)
						:
						<div className={"container mx-auto"} style={{maxWidth: '45vw', minWidth: '24rem'}}>
							<h1 className={"lh-44 fw-bold text-center"}>{blog?.title}</h1>
							<div>
								{HtmlParser(blog.content)}
							</div>
						</div>
				
			}
		</>
	);
}

export default blog;