import React, { useEffect, useState } from 'react'
import DesignCard from '../../components/Card/DesignCard'
import DeleteModal from '../../components/Modal/DeleteModal'
import DetailModal from '../../components/Modal/DetailModal'
import QrModal from '../../components/Modal/QrModal'
import UseQueryArticle from '../../hooks/useQueryArticle'
import { useRouter } from 'next/router'
import { Articles } from '../../types/type'
import Navbar from '../../components/Navbar'

const Index = () => {
  const router = useRouter()
  const { useQueryArticleUserSelected, useQueryArticle } = UseQueryArticle()
  // const { status, data } = useQueryArticleUserSelected(router.query.userId)
  const { status, data } = useQueryArticle()
  // @ts-ignore
  const array = data?.articles

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openQrModal, setOpenQrModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)

  const handleOpenDeleteModal = () => setOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  const handleOpenQrModal = () => setOpenQrModal(true)
  const handleCloseQrModal = () => setOpenQrModal(false)

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true)
  }
  const handleCloseDetailModal = () => setOpenDetailModal(false)

  // const handleClick = async () => {
  //   refetch()
  // }
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <div>
      <Navbar />
      {array?.map(
        (article: Articles) =>
          article.userId == router.query.userId && (
            <>
              <DesignCard
                key={article.id}
                label={'カートに追加する'}
                price={'1000'}
                title={article.title}
                size={'100'}
                borderRadius={'20px'}
                width={'90%'}
                color={'#F8C4CF'}
                backgroundColor={'#F8C4CF'}
                fontWeight={'bold'}
                marginTop={'15px'}
                marginRight={'15%'}
                marginLeft={'5%'}
                margin={'5%'}
                handleOpenDeleteModal={handleOpenDeleteModal}
                handleOpenQrModal={handleOpenQrModal}
                handleOpenDetailModal={handleOpenDetailModal}
              />
              <DeleteModal
                open={openDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
              />
              <QrModal
                open={openQrModal}
                handleCloseQrModal={handleCloseQrModal}
                articleId={article.id}
                display={'flex'}
              />
              <DetailModal
                open={openDetailModal}
                handleCloseDetailModal={handleCloseDetailModal}
                article={article.content}
              />
            </>
          )
      )}
    </div>
  )
}

export default Index
