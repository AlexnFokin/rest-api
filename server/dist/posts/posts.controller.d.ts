import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
export declare class PostsController {
    private postService;
    constructor(postService: PostsService);
    createPost(dto: CreatePostDto, image: any): Promise<import("./posts.model").Post>;
}
