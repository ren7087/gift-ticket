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
import { MouseEventHandler, useEffect, useState } from 'react'
import { FC } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ClearIcon from '@mui/icons-material/Clear'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { generateRandomAvatarOptions } from '../avatar'
import Avatar from 'avataaars'
import { Articles, AvatarType } from '../../types/type'
import { setEditedArticleStatus } from '../../slices/article'

type Props = {
  article?: Articles
  label?: string
  price?: string
  title?: string
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
    article,
    label,
    price,
    title,
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

  const [avatarOptions, setAvatarOptions] = useState<AvatarType>()

  useEffect(() => {
    let avatar: any = generateRandomAvatarOptions()
    setAvatarOptions(avatar)
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }} style={{ borderRadius: '20px' }}>
      <CardActionArea>
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Chip label="primary" color="primary" style={chipStyle} />
          </Stack>
        </CardContent>
        <Avatar
          style={{ width: '100px', height: '100px', paddingLeft: '35%' }}
          avatarStyle="Circle"
          {...avatarOptions}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={fontStyle}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            style={fontStyle}
          >
            ID : {article?.id}
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
              // onClick={() => {
              //   handleOpenQrModal
              //   dispatch(
              //     setEditedArticleStatus({
              //       articleId: article?.id,
              //       receiverId: '',
              //     })
              //   )
              // }}
            >
              <AddAPhotoIcon fontSize="small" />
              <Typography
                gutterBottom
                variant="body2"
                style={{ fontWeight: 'bold' }}
              >
                送信
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
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
