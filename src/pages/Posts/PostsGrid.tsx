import { IHomePage } from '@/pages/interfaces/IHomePage';
import IPosts from '@/interfaces/IPosts';
import PostsItem from './PostsItem';
import classes from './sass/PostsGrid.module.scss';

function PostsGrid({ posts }: IHomePage) {
  return (
    <ul className={classes.grid}>
      {posts.map((post: IPosts) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
