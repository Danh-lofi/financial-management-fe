import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';

type PageWrapperProps = {
  children: React.ReactNode;
  meta?: string;
  title: string;
};

const PageWrapper = ({ children, title, meta, ...other }: PageWrapperProps) => {
  return (
    <>
      <Helmet>
        <title> {title} |  MM</title>
        {meta}
      </Helmet>

      <Box {...other}>{children}</Box>
    </>
  );
};

export default PageWrapper;
