import React, { ReactNode } from 'react';
import classes from './Card.module.css';

export const Card: React.FC<{ children: ReactNode; className: string }> = ({
  children,
  className,
}) => {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};
