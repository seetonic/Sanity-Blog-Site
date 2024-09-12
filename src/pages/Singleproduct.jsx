import SanityBlockContent from "@sanity/block-content-to-react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(sourse) {
  return builder.image(sourse);
}

function Singleproduct() {
  const [singlePost, setSinglePost] = useState(null);
  const siteName = "Seetonic";
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
                    title,
                    _id,
                    slug,
                    mainImage{
                        asset->{
                            _id,
                            url
                        }
                    },
                    body,
                    "name": author->name,
                    "authorImage": author->image
                }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (singlePost && singlePost.title) {
        document.title = `${singlePost.title} | ${siteName}`;
      }
    }, [singlePost, siteName]);

  if (!singlePost) return <div>Loading...</div>;


  return (
    <section>
      <div className="w-full h-screen">
        <div>
          <img
            src={singlePost.mainImage.asset.url}
            alt={singlePost.title}
            className="w-full h-[calc(100vh-200px)]"
          />
        </div>
        <h1 className="text-4xl font-medium text-center mt-4 max-sm:text-2xl">
          {singlePost.title}
        </h1>
        <div className="p-10">
          <SanityBlockContent
            blocks={singlePost.body}
            projectId="6xph20at"
            dataset="production"
          />
          <div className="flex py-4 gap-3 items-center">
            <img
              src={urlFor(singlePost.authorImage).width(25).height(25).url()}
              alt={singlePost.name}
              className="rounded-full"
            />
            <p className="text-sm">{singlePost.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Singleproduct;
