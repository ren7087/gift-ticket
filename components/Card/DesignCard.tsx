import {
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import { FC } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ClearIcon from '@mui/icons-material/Clear'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { generateRandomAvatarOptions } from '../avatar'
import Avatar from 'avataaars'
import { Articles, AvatarType } from '../../types/type'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import DetailModal from '../Modal/DetailModal'
import QrModal from '../Modal/QrModal'
import DeleteModal from '../Modal/DeleteModal'
import IsDoneModal from '../Modal/IsDoneModal'

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
  getPage?: boolean
  isDone?: boolean
}

/**
 * 汎用的なボタンコンポーネント.
 */
const DesignCard: FC<Props> = (props) => {
  const {
    article,
    title,
    color = '#fff',
    marginTop,
    marginRight,
    marginLeft,
    fontWeight,
    borderRadius,
    outline,
    border,
    width,
    height,
    getPage,
    isDone,
    backgroundColor = isDone ? 'black' : 'white',
  } = props

  const fontStyle = {
    fontWeight,
    marginTop,
  }

  const chipStyle = {
    backgroundColor,
  }

  const [avatarOptions, setAvatarOptions] = useState<AvatarType>()

  useEffect(() => {
    let avatar: any = generateRandomAvatarOptions()
    setAvatarOptions(avatar)
  }, [])

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openQrModal, setOpenQrModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openIsDoneModal, setOpenIsDoneModal] = useState(false)

  const handleOpenDeleteModal = () => setOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  const handleOpenQrModal = () => setOpenQrModal(true)
  const handleCloseQrModal = () => setOpenQrModal(false)

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true)
  }
  const handleCloseDetailModal = () => setOpenDetailModal(false)

  const handleOpenIsDoneModal = () =>
    isDone ? console.log('error') : setOpenIsDoneModal(true)
  const handleCloseIsDoneModal = () => setOpenIsDoneModal(false)

  return (
    <>
      <Card sx={{ maxWidth: 345 }} style={{ borderRadius: '20px' }}>
        <CardActionArea>
          {getPage ? (
            <CardContent>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={isDone ? 'DONE' : 'UNUSED'}
                  color={isDone ? 'primary' : 'default'}
                  style={chipStyle}
                />
              </Stack>
            </CardContent>
          ) : (
            <CardContent>
              <Stack direction="row" spacing={1}>
                <Chip label="Thank you" color="primary" style={chipStyle} />
              </Stack>
            </CardContent>
          )}
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
              style={{
                display: 'flex',
                textAlign: 'center',
                marginTop: '20px',
              }}
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
              {getPage ? (
                <div
                  style={{
                    width: '23%',
                    marginLeft: '10%',
                    cursor: isDone ? 'not-allowed' : 'pointer',
                  }}
                  onClick={handleOpenIsDoneModal}
                >
                  <AssignmentTurnedInIcon fontSize="small" />
                  <Typography
                    gutterBottom
                    variant="body2"
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    DONE
                  </Typography>
                </div>
              ) : (
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
                    送信
                  </Typography>
                </div>
              )}
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
      <QrModal
        open={openQrModal}
        handleCloseQrModal={handleCloseQrModal}
        articleId={article != undefined ? article.id : ''}
        display={'flex'}
      />
      <DetailModal
        open={openDetailModal}
        handleCloseDetailModal={handleCloseDetailModal}
        article={article != undefined ? article.content : ''}
      />
      <DeleteModal
        open={openDeleteModal}
        articleId={article != undefined ? article.id : ''}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
      <IsDoneModal
        open={openIsDoneModal}
        handleCloseIsDoneModal={handleCloseIsDoneModal}
        articleId={article != undefined ? article.id : ''}
      />
    </>
  )
}

export default DesignCard
