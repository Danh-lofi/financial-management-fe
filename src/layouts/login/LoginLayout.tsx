import { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import { Stack, Typography } from '@mui/material';
import Image from '../../components/image';
import Logo from '../../components/logo';
import { SliderWrapper, StyledCard, StyledContent, StyledRoot } from './styles';

// @mui


// components


//


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  const settings: Settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    }),
    []
  );

  const data = useMemo(() => {
    return [
      {
        title: 'Chào mừng bạn trở lại!',
        image: '/assets/illustrations/illustration_dashboard.png',
      }
    ];
  }, []);

  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />
      <SlickCard image={data[0].image} title={data[0].title} />

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}

type SlickCardProps = {
  image: string;
  title: string;
};

const SlickCard = ({ image, title }: SlickCardProps) => {
  return (
    <StyledCard>
      <Typography variant="h3" sx={{ mb: 4, maxWidth: 480, textAlign: 'center' }}>
        {title}
      </Typography>

      <Image
        disabledEffect
        visibleByDefault
        alt="auth"
        src={image}
        sx={{ height: '80vh', objectFit: 'cover' }}
      />
    </StyledCard>
  );
};
