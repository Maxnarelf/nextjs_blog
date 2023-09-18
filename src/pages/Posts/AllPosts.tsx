import { IHomePage } from '@/pages/interfaces/IHomePage';
import classes from './sass/AllPosts.module.scss';
import PostsGrid from './PostsGrid';

function AllPosts({ posts }: IHomePage) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default AllPosts;
