import { BlogModel } from "@prisma/client";

export interface IBlogService {
    createBlog:(message:string,authorId:number,mediaPath:string)=> Promise<BlogModel>;
    saveMediaFile:(media:Express.Multer.File) => Promise<string>;
}