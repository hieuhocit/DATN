// MUI
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TwoLineTypography = styled(Typography)({
  maxWidth: '250px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  fontSize: '0.85rem',
  fontWeight: 600,
  lineHeight: '1.2',
});

export const OneLineTypography = styled(Typography)({
  maxWidth: '250px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  fontSize: '0.85rem',
  lineHeight: '1.2',
});
