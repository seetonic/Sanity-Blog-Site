import { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

function Products() {
  const [posts, setPosts] = useState([]);
  const siteName = "Seetonic";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
                title,
                slug,
                publishedAt,
                categories[] -> {
                    title,
                },
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                "name": author -> name,
            } | order(publishedAt desc)`
      )
      .then((data) => {
        setPosts(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    document.title = `Products | ${siteName}`; // Set page title to "Home | MySite"
  }, []);

  return (
    <section>
      <div className="p-3">
        <h1 className="text-3xl text-center pb-5">All Blogs</h1>
        <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-8">
          {posts &&
            posts.map((post, index) => (
              <div
                key={index}
                className="w-full flex flex-col bg-slate-200 rounded-xl max-sm:items-center max-sm:w-fit"
              >
                {/* Display Post Categories */}
                {post.categories &&
                  post.categories.length > 0 &&
                  post.categories.map((category, index) => (
                    <Link
                      to={"/" + category.title}
                      key={index}
                      className="absolute bg-white rounded-full m-3 px-2 text-sm"
                    >
                      {category.title}
                    </Link>
                  ))}

                {/* Display Post Image */}
                <Link
                  className="h-full"
                  to={"/products/" + post.slug.current}
                  key={post.slug.current}
                >
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt}
                    className="w-96 h-80 rounded-t-xl"
                  />
                </Link>
                {/* Display Post Title */}
                <div className="flex flex-col p-3 gap-3">
                  <Link to={post.slug.current} className="text-lg font-medium hover:underline cursor-pointer">
                    {post.title}
                  </Link>
                  <div className="flex justify-between items-center">
                    <p>
                      by <span className="italic text-slate-500 text-sm">{post.name}</span>
                    </p>
                    <p className="text-slate-500 text-sm">{new Date(post.publishedAt).toDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
