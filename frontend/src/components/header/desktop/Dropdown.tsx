// MUI
import { Box, Typography } from '@mui/material';
// React
import { useState } from 'react';

// React router
import { Link } from 'react-router-dom';

// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const categories = [
  {
    name: 'Phát triển',
    description: 'Khám phá các khóa học dành cho phát triển',
    slug: 'phat-trien',
    children: [
      {
        name: 'Phát triển web',
        description: 'Khám phá các khóa học dành cho phát triển web',
        slug: 'phat-trien-web',
      },
      {
        name: 'Thiết kế',
        description: 'Khám phá các khóa học dành cho thiết kế',
        slug: 'thiet-ke',
      },
    ],
  },
  {
    name: 'Doanh nghiệp',
    description: 'Khám phá các khóa học dành cho doanh nghiệp',
    slug: 'doanh-nghiep',
    children: [
      {
        name: 'Bán hàng',
        description: 'Khám phá các khóa học dành cho bán hàng',
        slug: 'ban-hang',
      },
    ],
  },
];

type Category = {
  name: string;
  description: string;
  slug: string;
  children?: {
    name: string;
    description: string;
    slug: string;
  }[];
};

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(
    undefined
  );

  const handleMouseEnterCategory = (category?: Category | undefined) => {
    if (category?.children) {
      setCurrentCategory(category);
    }
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
    setCurrentCategory(undefined);
  };

  return (
    <Box sx={{ position: 'relative' }} onMouseLeave={handleMouseLeave}>
      <Box onMouseEnter={handleMouseEnter} sx={{ cursor: 'pointer' }}>
        <Typography>Khám phá</Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          zIndex: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'row',
          boxShadow: 3,
          py: 1,
          borderRadius: 1,
          transition: 'transform 0.2s ease, opacity 0.2s ease',
          transformOrigin: 'top left',
          transform: open ? 'scale(1)' : 'scale(0)',
          opacity: open ? 1 : 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            flexShrink: 0,
          }}
        >
          {categories.map((category) => {
            return (
              <DropdownItem
                key={category.slug}
                text={category.name}
                link={`/${category.slug}`}
                isNested={!!category.children}
                onMouseEnter={() => handleMouseEnterCategory(category)}
              />
            );
          })}
        </Box>
        {currentCategory &&
          currentCategory?.children &&
          currentCategory?.children?.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
                flexShrink: 0,
              }}
            >
              {currentCategory.children.map((category) => {
                return (
                  <DropdownItem
                    key={category.slug}
                    text={category.name}
                    link={`/${currentCategory.slug}/${category.slug}`}
                  />
                );
              })}
            </Box>
          )}
      </Box>
    </Box>
  );
}

function DropdownItem({
  text,
  link,
  isNested = false,
  onMouseEnter,
}: {
  text: string;
  link: string;
  isNested?: boolean;
  onMouseEnter?: () => void;
}) {
  return (
    <Box
      onMouseEnter={onMouseEnter}
      sx={{
        transition: 'background-color 0.3s ease',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Link
        to={link}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 8px',
          gap: '24px',
        }}
      >
        <Typography>{text}</Typography>
        {isNested && <ChevronRightIcon fontSize='small' />}
      </Link>
    </Box>
  );
}
