import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import Card from '@mui/material/Card'
import { MouseEventHandler } from 'react'
import { FC } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ClearIcon from '@mui/icons-material/Clear'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

type Props = {
  label?: string
  price?: string
  marginTop?: string
  marginLeft?: string
  marginRight?: string
  fontWeight?: string
  backgroundColor?: string
  color?: string
  size?: string
  borderRadius?: string
  outline?: string
  border?: string
  width?: string
  height?: string
  margin?: string
  handleOpenDeleteModal: MouseEventHandler<HTMLDivElement>
  handleOpenQrModal: MouseEventHandler<HTMLDivElement>
  handleOpenDetailModal: MouseEventHandler<HTMLDivElement>
}

/**
 * 汎用的なボタンコンポーネント.
 */
const DesignCard: FC<Props> = (props) => {
  const {
    label,
    price,
    backgroundColor = '#f28728',
    color = '#fff',
    size,
    marginTop,
    marginRight,
    marginLeft,
    fontWeight,
    borderRadius,
    outline,
    border,
    width,
    margin,
    height,
    handleOpenDeleteModal,
    handleOpenQrModal,
    handleOpenDetailModal,
  } = props

  const imageStyle = {
    borderRadius,
    width,
    marginLeft,
  }

  const fontStyle = {
    fontWeight,
    marginTop,
  }

  const chipStyle = {
    backgroundColor,
  }

  const style = {
    backgroundColor,
    color,
    borderRadius,
    outline,
    border,
    width,
    height,
  }

  return (
    <Card sx={{ maxWidth: 345 }} style={{ borderRadius: '20px' }}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Chip label="primary" color="primary" style={chipStyle} />
          </Stack>
        </CardContent>
        <CardMedia
          component="img"
          height="170"
          image="https://res.cloudinary.com/tanp/image/fetch/c_fill,f_auto,q_auto,w_2000/https://s3.ap-northeast-1.amazonaws.com/gracia.tanp/product14892/DSC00042.jpg"
          alt="green iguana"
          style={imageStyle}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={fontStyle}
          >
            リップクリーム
          </Typography>
          <div
            style={{ display: 'flex', textAlign: 'center', marginTop: '20px' }}
          >
            <div
              style={{
                width: '23%',
                marginLeft: '4%',
              }}
              onClick={handleOpenDeleteModal}
            >
              <ClearIcon fontSize="small" />
              <Typography
                gutterBottom
                variant="body2"
                style={{ fontWeight: 'bold' }}
              >
                削除
              </Typography>
            </div>
            <div
              style={{ width: '23%', marginLeft: '10%' }}
              onClick={handleOpenQrModal}
            >
              <AddAPhotoIcon fontSize="small" />
              <Typography
                gutterBottom
                variant="body2"
                style={{ fontWeight: 'bold' }}
              >
                バーコード
              </Typography>
            </div>
            <div
              style={{ width: '23%', marginLeft: '10%' }}
              onClick={handleOpenDetailModal}
            >
              <AutoAwesomeIcon fontSize="small" />
              <Typography
                gutterBottom
                variant="body2"
                style={{ fontWeight: 'bold' }}
              >
                閲覧
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DesignCard
