import { BlogModel } from "@prisma/client";
import { Blog } from "./blog.entity";

export interface IBlogRepository {
    saveMediaFile: (media: Express.Multer.File) => Promise<string>;
}