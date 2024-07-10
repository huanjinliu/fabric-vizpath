import React, { memo } from 'react';
import classnames from 'classnames';
import styles from './style.less';
import Icon, { type IconProps } from '../icon';

interface IconButtonProps extends IconProps {
  active?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ className, active = false, onClick, ...rest }) => {
  return (
    <Icon
      {...rest}
      className={classnames(styles.iconButton, className, {
        [styles.active]: active,
      })}
      color="pink"
      onClick={onClick}
    />
  );
};

export default memo(IconButton);
