import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100 border border-black">
      <div className="px-2 sm:pl-14 py-3 border border-black">
        <Image src={assets.logo} alt="Company Logo" width={120} height={40} />
      </div>
      <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
        <div className="w-[50%] sm:w-[80%] absolute right-0">
          <Link
            href="/admin/addProduct"
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.add_icon} alt="" width={28} />
            <p className="hidden sm:block">Add blogs</p>
          </Link>
          <Link
            href="/admin/blogList"
            className="flex mt-5 items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.blog_icon} alt="" width={28} />
            <p className="hidden sm:block">Blog list</p>
          </Link>
          <Link
            href="/admin/subscriptions"
            className="flex mt-5 items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.email_icon} alt="" width={28} />
            <p className="hidden sm:block">Subscription</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
