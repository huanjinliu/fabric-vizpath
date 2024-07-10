import React from 'react';
import classnames from 'classnames';
import styles from './style.less';
import Icon from '../icon';

interface ContentCardProps {
  className?: string;
  title: string;
  onSelect?: () => void;
  children?: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({ className, title, children, onSelect }) => {
  return (
    <div className={classnames(styles.contentCard, className)}>
      <header>
        <h5>{title}</h5>
        {onSelect && (
          <button className={styles.button} onClick={onSelect}>
            Display
            <Icon name="go" size={20} />
          </button>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default ContentCard;
