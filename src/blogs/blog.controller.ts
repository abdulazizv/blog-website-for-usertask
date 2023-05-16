import multer,{Multer}  from "multer";
const upload = multer({dest:"/uploads"})
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import "reflect-metadata";
import { IBlogController } from "./blog.controller.interface";
import { createBlogDto } from "./dto/create-blog.dto";
import { ValidateMiddleware } from "../common/validate.middleware";
import { IConfigService } from "../config/config.service.interface";
import { IBlogService } from "./blog.service.interface";
import { AuthGuard } from "../common/auth.guard";
import { IMiddleware } from "../common/middleware.interface";

export class BlogController extends BaseController implements IBlogController {
  private upload: Multer;
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private blogService: IBlogService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    super(loggerService);
    this.upload = multer({ dest: 'uploads/' });
    this.bindRoutes([
      {
        path: "/",
        method: "post",
        func: this.createBlog,
        middlewares: [
          (this.upload.single('image') as unknown) as IMiddleware,
          new AuthGuard(),
        ],
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
        middlewares: [],
      },
    ]);
  }

  login() {
    console.log("login");
  }
  register() {
    console.log("register");
  }

  async createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { message, authorId } = req.body;
      const image = req.file; // Access the uploaded file
      let imageUrl;
      // Handle the file upload and store relevant information in the database
      if(image !== undefined) {
        imageUrl = await this.blogService.saveMediaFile(image);
      }
      console.log(imageUrl)
      let blog;
      // Create the blog entry with the provided information
      if(imageUrl !== undefined){
        blog = await this.blogService.createBlog( message,authorId,imageUrl );
      }
  
      res.status(201).json({ blog });
    } catch (error) {
      next(error);
    }
  }
  
}
