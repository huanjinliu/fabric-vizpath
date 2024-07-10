import React, { memo } from 'react';
import classnames from 'classnames';
import markdownit from 'markdown-it';
import styles from './style.less';

const Markdown: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div
      className={classnames('markdown-body', styles.markdown)}
      dangerouslySetInnerHTML={{ __html: markdownit().render(content) }}
    />
  );
};

export default memo(Markdown);
