import React from 'react';
import pc from 'prefix-classnames';
import './IconButton.less';

const px = pc('orca-icon-button');

export interface IconButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  size?: 'x-small' | 'small' | 'middle' | 'large';
  disabled?: boolean;
  theme?: 'default' | 'dark';
}

const IconButton = (props: IconButtonProps) => {
  const {
    className = '',
    size = 'middle',
    checked,
    disabled,
    theme = 'default',
    ...otherProps
  } = props;
  return (
    <button
      type="button"
      className={`${px()} ${px(size, {
        disabled,
        checked,
        dark: theme === 'dark',
      })} ${className}`}
      {...otherProps}
    />
  );
};

export default IconButton;
