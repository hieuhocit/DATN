// MUI
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  InputBase,
  List,
  ListItemButton,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Components
import Image from './Image';
import { OneLineTypography } from '../typography';

// React
import { useEffect, useRef, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: alpha('#adb5bd', 0.5),
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: alpha('#adb5bd', 0.6),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

type Props = {
  sx?: SxProps<Theme>;
};

export default function SearchBar({ sx }: Props) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<number[]>([]);
  const [show, setShow] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchRef.current &&
        searchRef.current.contains(e.target as HTMLElement)
      )
        return;
      setShow(false);
    }
    document.documentElement.addEventListener('click', handleClick);
    return () => {
      document.documentElement.removeEventListener('click', handleClick);
    };
  }, []);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  function handlePointerDown() {
    if (query === '') return;
    setShow(true);
  }

  function handleKeyUp() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      // const characters = await loadCharacters(query);
      if (query.trim() === '') {
        setData([]);
        setShow(false);
      } else {
        setData([1, 2, 3]);
        setShow(true);
      }
    }, 500);
  }

  // function handleSubmit(e: FormEvent) {
  //   e.preventDefault();
  //   if (query.trim() === '') navigate(`/characters/all`);
  //   else navigate(`/characters/${query.trim()}`);
  //   setInitialState();
  // }

  // function setInitialState() {
  //   if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //   setQuery('');
  //   setShow(false);
  //   setData([]);
  //   timeoutRef.current = null;
  // }

  return (
    <Search sx={sx} ref={searchRef}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={query}
        onChange={handleChangeValue}
        onPointerDown={handlePointerDown}
        onKeyUp={handleKeyUp}
        placeholder='Search for anything...'
        inputProps={{ 'aria-label': 'search' }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'row',
          boxShadow: 3,
          py: 1,
          borderRadius: 1,
          transition: 'transform 0.2s ease, opacity 0.2s ease',
          transformOrigin: 'top center',
          transform: show ? 'scaleY(1)' : 'scaleY(0)',
          opacity: show ? 1 : 0,
        }}
      >
        {data.length > 0 && (
          <List sx={{ width: '100%', p: 0, bgcolor: 'background.paper' }}>
            {data.map((item) => (
              <ListItemButton key={item}>
                <SearchItem />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </Search>
  );
}

function SearchItem() {
  return (
    <Stack
      sx={{ width: 1, cursor: 'pointer' }}
      direction={'row'}
      gap={1}
      alignItems={'flex-start'}
    >
      <Box
        sx={{
          width: '40px',
          position: 'relative',
          aspectRatio: '1/1',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Image src='/images/image-placeholder.png' fill />
      </Box>
      <Stack direction={'column'} gap={'2px'}>
        <OneLineTypography
          sx={{ fontSize: '1rem', maxWidth: '100%', fontWeight: 600 }}
          variant='body1'
        >
          React - The Complete Guide 2025 (incl. Next.js, Redux)
        </OneLineTypography>
        <OneLineTypography
          sx={{ opacity: 0.6, maxWidth: '100%', fontSize: '0.75rem' }}
          variant='body1'
        >
          Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller
        </OneLineTypography>
      </Stack>
    </Stack>
  );
}
