import React, { useState } from 'react'
import DesignCard from '../../components/Card/DesignCard'
import DeleteModal from '../../components/Modal/DeleteModal'
import DetailModal from '../../components/Modal/DetailModal'
import QrModal from '../../components/Modal/QrModal'

const Index = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openQrModal, setOpenQrModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)

  const handleOpenDeleteModal = () => setOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false)

  const handleOpenQrModal = () => setOpenQrModal(true)
  const handleCloseQrModal = () => setOpenQrModal(false)

  const handleOpenDetailModal = () => setOpenDeleteModal(true)
  const handleCloseDetailModal = () => setOpenDetailModal(false)
  return (
    <div>
      <DesignCard
        label={'カートに追加する'}
        price={'1000'}
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
      <QrModal open={openQrModal} handleCloseQrModal={handleCloseQrModal} />
      <DetailModal
        open={openDetailModal}
        handleCloseDetailModal={handleCloseDetailModal}
      />
    </div>
  )
}

export default Index
