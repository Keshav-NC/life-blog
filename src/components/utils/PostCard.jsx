import storageService from "../../appwrite/storage";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="group w-full rounded-md overflow-hidden relative">
          <img
            className="rounded-md cursor-pointer p-3 object-cover w-full h-58 scale-120 hover:scale-110 transition-transform duration-400 ease-in-out"
            src={storageService.getFilePreview(featuredImage)}
            alt={title}
          />
          <p className="absolute right-0 bottom-0 group-hover:bottom-4 group-hover:right-4 font-bold p-2 bg-blue-300/30 duration-300 rounded-md group-hover:bg-blue-300 opacity-0 group-hover:text-white group-hover:opacity-100 text-xs shadow-md">
            Read More
          </p>
        </div>
        <h3 className="font-bold text-center bg-white/30 backdrop-blur-md mt-2 rounded-md">
          {title}
        </h3>
      </Link>
    </>
  );
}

export default PostCard;
