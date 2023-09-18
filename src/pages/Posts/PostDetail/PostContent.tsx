import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import classes from './sass/PostContent.module.scss';
import PostHeader from './PostHeader';
import IPostContent from './interfaces/IPostContent';

function CustomParagraph({ node, children, ...props }) {
  if (node.children[0].tagName === 'img') {
    const image = node.children[0];
    const { slug } = props;
    return (
      <div className={classes.image}>
        <Image
          src={`/images/posts/${slug}/${image.properties.src}`}
          alt={image.properties.alt}
          width={650}
          height={350}
        />
      </div>
    );
  }
  return <p>{children}</p>;
}

function CustomCode({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  inline, className, children, node,
}) {
  const language = className.split('-')[1];
  if (inline) {
    return <code>{children}</code>;
  }
  return (
    <SyntaxHighlighter style={atomDark} language={language}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}

function PostContent({ post }: IPostContent) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={{ p: (props) => CustomParagraph({ ...props, slug: post.slug }), code: CustomCode }}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
