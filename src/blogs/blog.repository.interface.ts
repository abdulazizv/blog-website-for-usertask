import { BlogModel } from "@prisma/client";
import { Blog } from "./blog.entity";

export interface IBlogRepository {
    saveMediaFile: (media: Express.Multer.File) => Promise<string>;
    createBlog:(media:string,authorId:number,mediaPath:string) => Promise<BlogModel>;
    createBlogWithoutImage: (message:string,authorId:number) => Promise<BlogModel>
}