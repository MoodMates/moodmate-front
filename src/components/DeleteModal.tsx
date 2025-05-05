import { Modal } from 'antd'

interface DeleteModalProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteModal = ({ visible, onConfirm, onCancel }: DeleteModalProps) => {
  // Return a modal to confirm deletion
  return (
    <Modal
      title="Confirmer la suppression"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      Êtes-vous sûr de vouloir supprimer cet élément ?
    </Modal>
  )
}

export default DeleteModal
