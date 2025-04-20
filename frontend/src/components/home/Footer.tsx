// React router
import { Link } from 'react-router-dom';

// MUI
import { Box, Stack, Typography } from '@mui/material';

// Components
import Section from '../common/Section';
import Image from '../common/Image';
import RefColumn from './RefColumn';

const items = {
  categories: [
    { name: 'All Categories', link: '/categories' },
    { name: 'Business', link: '/categories/business' },
    { name: 'Design', link: '/categories/design' },
    { name: 'Development', link: '/categories/development' },
    { name: 'Marketing', link: '/categories/marketing' },
    { name: 'Photography', link: '/categories/photography' },
  ],
  aboutUs: [
    { name: 'About Us', link: '/about-us' },
    { name: 'Contact Us', link: '/contact-us' },
    { name: 'Privacy Policy', link: '/privacy-policy' },
  ],
  helpCenter: [
    { name: 'Help Center', link: '/help-center' },
    { name: 'Terms of Service', link: '/terms-of-service' },
  ],
  socialLinks: [
    { name: 'Facebook', link: 'https://www.facebook.com' },
    { name: 'Twitter', link: 'https://www.twitter.com' },
    { name: 'Instagram', link: 'https://www.instagram.com' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com' },
  ],
};

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        mt: '128px',
        mb: 2,
      }}
    >
      <Section sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Stack
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          gap={8}
        >
          <Box sx={{ width: '40%' }}>
            {/* Logo */}
            <Link
              to={'/'}
              style={{ display: 'inline-block', width: 'fit-content' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '120px',
                  aspectRatio: '2/1',
                  mt: '-16px !important',
                }}
              >
                <Image
                  style={{ objectFit: 'contain' }}
                  src='/icons/dark-logo.svg'
                  alt='Logo'
                  fill={true}
                />
              </Box>
            </Link>
            <Typography fontSize={'0.875rem'}>
              EduGenius is a platform that connects learners with expert
              instructors, offering a wide range of online courses to help you
              achieve your goals.
            </Typography>
          </Box>

          <Stack
            direction={'row'}
            sx={{
              flexGrow: 1,
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <RefColumn
              key={'Category'}
              title='Categories'
              items={items.categories}
            />
            <RefColumn
              key={'Social Links'}
              title='Social Links'
              items={items.socialLinks}
            />
            <RefColumn
              key={'About Us'}
              title='About Us'
              items={items.aboutUs}
            />
            <RefColumn
              key={'Help Center'}
              title='Help Center'
              items={items.helpCenter}
            />
          </Stack>
        </Stack>

        <Typography textAlign={'center'} fontSize={'0.75rem'}>
          © 2025 EduGenius, Inc.
        </Typography>
      </Section>
    </Box>
  );
}
