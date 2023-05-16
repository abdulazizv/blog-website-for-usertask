import { BlogModel } from "@prisma/client";
import { inject,injectable } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { createBlogDto } from "./dto/create-blog.dto";
import { Blog } from "./blog.entity";
