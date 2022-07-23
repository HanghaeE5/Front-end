import React from 'react';
import GradientScroll from 'react-gradient-scroll-indicator';
import '../../style/noScorll.css';

// eslint-disable-next-line react/prop-types
export const GradientScollWrap = ({ children }) => {
  return (
    <GradientScroll primaryColor="#FFFFFF" fadeColor=" rgba(255, 255, 255, 0.4)" fadeHeight="3rem">
      <div className="noScroll">{children}</div>
    </GradientScroll>
  );
};
