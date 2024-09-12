import { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { Link, useParams } from "react-router-dom";

function Categories() {
  const [posts, setPosts] = useState([]);
  const { category } = useParams(); 
  const siteName = "Seetonic"

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

  // Filter posts that belong to the selected category
  const filteredPosts = posts.filter((post) =>
    post.categories.some((cat) => cat.title === category)
  );

  useEffect(() => {
    // Set the document title dynamically based on the first post's title
    if (filteredPosts.length > 0) {
      document.title = ` ${category} | ${siteName}`;
    } else {
      document.title = `${category} | ${siteName}`;
    }
  }, [filteredPosts, category]);

  return (
    <section>
      {/* Display filtered posts */}
      {filteredPosts.map((post, index) => (
        <div key={index} className="p-3">
          <h1 className="text-3xl text-center pb-5">
            {category ? category : "All Categories"}
          </h1>
          <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-8">
            <div className="w-full flex flex-col bg-slate-200 rounded-xl max-sm:items-center max-sm:w-fit">
              {/* Display Post Image */}
              <Link
                className="h-full"
                to={"/products/" + post.slug.current}
                key={post.slug.current}
              >
                <img
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt}
                  className="w-96 h-full rounded-t-xl"
                />
              </Link>

              {/* Display Post Title */}
              <div className="flex flex-col p-3 gap-3">
                <Link
                  to={post.slug.current}
                  className="text-lg font-medium hover:underline cursor-pointer"
                >
                  {post.title}
                </Link>
                <div className="flex justify-between items-center">
                  <p>
                    by{" "}
                    <span className="italic text-slate-500 text-sm">
                      {post.name}
                    </span>
                  </p>
                  <p className="text-slate-500 text-sm">
                    {new Date(post.publishedAt).toDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Categories;
