import { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const siteName = "Seetonic";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
          title,
          shortDescription,
          slug,
          publishedAt,
          categories[] -> {
            title,
            homePageTitle,
            description,
            CategoryImage{
              asset->{
                _id,
                url
              }
            }
          },
          mainImage{
            asset->{
              _id,
              url
            },
            alt
          },
          "name": author -> name,
          shortDescription
        } | order(publishedAt desc)`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    document.title = `${siteName}`; 
  }, []);

  return (
    <section>
      {/*Hero Section */}
      <div>
        <div className="flex gap-3 w-full h-[calc(100vh-100px)] text-white p-3 max-sm:flex-col max-sm:h-screen">
          {posts.slice(0, 1).map((post) => (
            <div
              key={post.slug.current}
              className="h-full w-full rounded-2xl"
            >
              {post.categories?.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-8 h-full px-8 py-10 rounded-2xl"
                  style={{
                    backgroundImage: `url(${post.mainImage?.asset?.url})`,
                    backgroundColor: "#b7b7b7",
                    backgroundBlendMode: "multiply",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h1 className="text-5xl max-md:text-3xl">{post.title}</h1>
                  <p className="w-4/5 max-md:text-sm">{post.shortDescription}</p>
                  <Link
                    to={"/products/" + post.slug.current}
                    className="bg-black p-3 w-56 text-center rounded-full border
                     border-black shadow-md cursor-pointer hover:border-white hover:bg-transparent 
                     hover:border hover:backdrop-blur-sm max-md:w-44 max-md:p-2 max-md:text-sm"
                  >
                    See Collections
                  </Link>
                </div>
              ))}
            </div>
          ))}

          {posts.slice(1, 2).map((post) => (
            <div
              key={post.slug.current}
              className="h-full w-full rounded-2xl"
            >
              {post.categories?.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-8 justify-end h-full px-8 py-10 rounded-2xl"
                  style={{
                    backgroundImage: `url(${post.mainImage?.asset?.url})`,
                    backgroundColor: "#b7b7b7",
                    backgroundBlendMode: "multiply",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h1 className="text-5xl max-md:text-2xl">{post.title}</h1>
                  <p className="w-4/5 max-md:text-sm">{post.shortDescription}</p>
                  <Link
                    to={"/products/" + post.slug.current}
                    className="bg-transparent backdrop-blur-sm border hover:bg-black
                     hover:border-black p-3 w-56 text-center rounded-full shadow-md
                      cursor-pointer sm max-md:w-44 max-md:p-2 max-md:text-sm"
                  >
                    Shop Now
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/*Categories Section*/}
      <div className="grid grid-cols-9 gap-3 h-screen p-3 max-md:grid-cols-4 max-md:gap-0 max-sm:grid-cols-1">
        {posts.slice(0, 1).map((post) => (
          <div
            key={post.slug.current}
            className="bg-slate-200 col-span-4 row-span-9 rounded-2xl text-white max-md:mb-3 max-sm:p-0 max-sm:row-span-1 max-sm:col-span-1"
          >
            {post.categories?.map((category, index) => (
              <Link to={category.title}
                className="h-full w-full rounded-2xl flex justify-center py-10 px-3"
                key={index}
                style={{
                  backgroundImage: `url(${category.CategoryImage?.asset?.url})`,
                  backgroundColor: "#b7b7b7",
                  backgroundBlendMode: "multiply",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1 className="text-2xl max-sm:text-xl">{category.homePageTitle}</h1>
              </Link>
            ))}
          </div>
        ))}
        {posts.slice(1, 2).map((post) => (
          <div
            key={post.slug.current}
            className="bg-slate-200 col-span-5 row-span-5 rounded-2xl text-white max-md:mb-3 max-sm:row-span-1 max-sm:col-span-1"
          >
            {post.categories?.map((category, index) => (
              <Link to={category.title}
                key={index}
                className="h-full w-full rounded-2xl flex justify-center py-10 px-3"
                style={{
                  backgroundImage: `url(${category.CategoryImage?.asset?.url})`,
                  backgroundColor: "#b7b7b7",
                  backgroundBlendMode: "multiply",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1 className="text-2xl max-sm:text-xl">{category.homePageTitle}</h1>
              </Link>
            ))}
          </div>
        ))}
        {posts.slice(2, 3).map((post) => (
          <div
            key={post.slug.current}
            className="bg-slate-200 flex items-center justify-center col-span-2 row-span-4 rounded-2xl text-white max-md:mr-3 max-sm:mr-0 max-sm:mb-3 max-sm:row-span-1 max-sm:col-span-1" 
          >
            {post.categories?.map((category, index) => (
              <Link to={category.title}
                key={index}
                className="h-full w-full flex justify-center rounded-2xl py-10 px-3 max-md:text-2xl"
                style={{
                  backgroundImage: `url(${category.CategoryImage?.asset?.url})`,
                  backgroundColor: "#b7b7b7",
                  backgroundBlendMode: "multiply",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1 className="text-3xl max-sm:text-xl">{category.homePageTitle}</h1>
              </Link>
            ))}
          </div>
        ))}
        {posts.slice(3, 4).map((post) => (
          <div
            key={post.slug.current}
            className="bg-slate-200 flex items-center justify-center col-span-3 row-span-4 rounded-2xl text-white max-sm:row-span-1 max-sm:col-span-1"
          >
            {post.categories?.map((category, index) => (
              <Link to={category.title}
                key={index}
                className="h-full w-full flex justify-center rounded-2xl py-10 px-3 max-md:text-2xl"
                style={{
                  backgroundImage: `url(${category.CategoryImage?.asset?.url})`,
                  backgroundColor: "#b7b7b7",
                  backgroundBlendMode: "multiply",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1 className="text-3xl max-sm:text-xl">{category.homePageTitle}</h1>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/*New Arrival Section */}
      <div className="h-full p-3">
        <h1 className="text-center text-4xl font-extralight my-8">
          Fresh Arrivals and New Selections
        </h1>
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
      <div className="flex justify-center items-center my-10">
        <Link
          to="/products"
          className="px-8 py-3 bg-black rounded-full border text-white hover:bg-transparent hover:text-black hover:border-black hover:border"
        >
          See More Products
        </Link>
      </div>
    </section>
  );
}

export default Home;
