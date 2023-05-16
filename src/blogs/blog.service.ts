import { BlogModel } from "@prisma/client";
import { inject,injectable } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { createBlogDto } from "./dto/create-blog.dto";
import { Blog } from "./blog.entity";
import { IBlogRepository } from "./blog.repository.interface";
import { IBlogService } from "./blog.service.interface";

@injectable()
export class BlogService implements IBlogService {
    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.BlogRepository) private blogRepository: IBlogRepository,
    ){}

    async createBlog(message: string, authorId: number, mediaPath: string): Promise<BlogModel> {

    
        // Create the blog entry with the media path
        const blog = await this.blogRepository.createBlog(message,authorId,mediaPath)
    
        return blog;
    }

    async saveMediaFile(media:Express.Multer.File) {
        const mediaPath = await this.blogRepository.saveMediaFile(media);
        return mediaPath;
    }
}