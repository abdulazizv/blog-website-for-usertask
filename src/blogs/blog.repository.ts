import { BlogModel } from "@prisma/client";
import { inject,injectable } from "inversify";
import { PrismaService } from "../database/prisma.service";
import { TYPES } from "../types";
import { Blog } from "./blog.entity";
import { IBlogRepository } from "./blog.repository.interface";
import { v4 as uuidv4 } from 'uuid';
import fsPromises from 'fs/promises';
@injectable()

export class BlogRepository implements IBlogRepository {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

    async saveMediaFile(media: Express.Multer.File): Promise<string> {
    
        const filename = `${uuidv4()}_${media.originalname}`;
    
    
        await fsPromises.writeFile(`uploads/${filename}`, media.buffer);
        
        return `uploads/${filename}`;
      }

    async createBlog(message:string,authorId:number,mediaPath:string){
        const resp = await this.prismaService.client.blogModel.create({
          data:{
            message:message,
            authorId:authorId,
            image:mediaPath
          }
        })
      
        return resp;
    }

    async createBlogWithoutImage(message:string,authorId:number) {
      const resp = await this.prismaService.client.blogModel.create({
        data:{
          message:message,
          authorId:authorId,
          image:""
        }
      })
      return resp;
    }
}