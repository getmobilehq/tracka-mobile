import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "../../context/SidebarContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import AdminServices from "../../services/AdminServices";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import ShippingServices from "../../services/ShippingServices";
import { useShippingContext } from "../../context/Shipping";
import { useCategoryContext } from "../../context/Category";
import CategoryServices from "../../services/CategoryServices";

const MainModal = ({ id }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const location = useLocation();
  const { setServiceId } = useToggleDrawer();
  const { refetchData: refetchShippingData } = useShippingContext();
  const { refetchData: refetchCategoryData } = useCategoryContext();

  const handleDelete = () => {
    if (location.pathname === "/shipping-lines") {
      ShippingServices.deleteShippingLine(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess("Shipping line deleted successfully.");
          refetchShippingData();
        })
        .catch((err) => {});
      closeModal();
    }

    if (location.pathname === "/category") {
      CategoryServices.deleteCategory(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess("Category deleted successfully.");
          refetchCategoryData();
        })
        .catch((err) => {});
      closeModal();
    }

    if (location.pathname === "/administrators") {
      AdminServices.deleteUser(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);

          // refetchData();
        })
        .catch((err) => notifyError(err.message));
      // notifySuccess('Staff Deleted Successfully!');
      closeModal();
    }
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setServiceId();
          closeModal();
        }}
      >
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-1">
            Are You Sure! Want to Delete This Record?
          </h2>
          <p>
            Do you really want to delete these records? You can't view this in
            your list anymore if you delete!
          </p>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            No, Keep It
          </Button>
          <Button onClick={handleDelete} className="w-full sm:w-auto">
            Yes, Delete It
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(MainModal);
