import IPosts from '@/interfaces/IPosts';
import PostsGrid from '../Posts/PostsGrid';
import classes from './sass/FeaturedPosts.module.scss';

interface FeaturedPostsProps {
  posts: IPosts[];
}
function FeaturedPosts({ posts }:FeaturedPostsProps) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
