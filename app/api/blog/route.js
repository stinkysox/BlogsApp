import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/blogModel";
const fs = require("fs");

// LoadDB function to connect to the database
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//APi endpoint to get all blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ blog });
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

//API endpoint for Uploading blogs
export async function POST(request) {
  try {
    // Correct the formData method call
    const formData = await request.formData();
    const timestamp = Date.now();

    // Retrieve the image from the form data
    const image = formData.get("image");

    // Read the image data into an ArrayBuffer and then into a Buffer
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Construct the path and write the file
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);

    // Construct the image URL
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);
    console.log("Blog saved");

    // Respond with the image URL
    return NextResponse.json({ success: true, message: "Blog Added" });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

//creating api end point to delete blog

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  console.log(id);
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({ msg: "Blog Deleted" });
}
