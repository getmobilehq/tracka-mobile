import React from "react";
import { Select } from "@windmill/react-ui";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { useDeliveryContext } from "../../context/Delivery";
import DeliveryServices from "../../services/DeliveryServices";

const SelectStatus = ({ parcel }) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const { data, loading } = useDeliveryContext();

  const assignParcelToDelivery = (riderId) => {
    DeliveryServices.assignParcel({
      delivery_user: riderId,
      parcel: parcel?.id,
    })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  const name = (rider) => `${rider.first_name} ${rider.last_name}`;

  return (
    <>
      <Select
        onChange={(e) => assignParcelToDelivery(e.target.value)}
        className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
        disabled={loading}
      >
        <option value="Status" defaultValue hidden>
          Assign
        </option>

        {data?.map((rider) => (
          <option key={rider.id} value={rider?.id}>
            {name(rider)}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectStatus;
