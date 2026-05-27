function BlogCard({post}){
    return(
        <div className="border-4 p-4 mb-4">
            <h2 className=" text-xl font bold p-6">{post.title}{post.createdat}</h2>
            <p className="border text-2xl p-6">{post.content}</p>
            <p className="text-right text-sm text-gray p-6 ">~{post.author}</p>
        </div>
    )
}
export default BlogCard