import Image from 'next/image';

import IPosts from '@/interfaces/IPosts';
import classes from './sass/PostHeader.module.scss';

function PostHeader({ image, title }: IPosts) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image
        src={image}
        alt={title}
        width={300}
        height={250}
      />
    </header>
  );
}

export default PostHeader;
