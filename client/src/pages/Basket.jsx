import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { postOrder, deleteAllBasket } from "../api";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Basket = () => {
  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const { setBasket, basket } = useAuth();
  const { user } = useAuth();
  const total = basket.reduce((acc, obj) => acc + obj.price, 0);
  const handleSubmitForm = async () => {
    const itemIds = basket.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };
    console.log(user._id);
    const response = await postOrder(input);
    toast.success("Your order has been successfully created.");
    deleteAllBasket(user);
    setBasket([]);
    onClose();
  };

  const deleteBasket = async (item) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_ENDPOINT}/auth/${item}/${user._id}`
    );
    return data;
  };

  const handleClick = (item) => {
    setBasket(basket.filter((a) => a._id !== item._id));
    deleteBasket(item._id);
  };

  return (
    <div className="lg:mt-20 lg:mb-0 mb-20">
      <div className="flex items-center justify-center">
        {basket.length < 1 && (
          <div className="text-3xl lg:text-start text-center text-red-500 font-rob">
            You have not any items in your basket.
          </div>
        )}
      </div>
      {basket.map((item) => (
        <div key={item._id} className="my-5 flex flex-wrap">
          <div className="p-5 w-full text-center lg:text-start h-auto rounded-lg border-2 items-center border-gray-500 mx-auto flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3">
              <Link
                className="flex justify-center items-center lg:justify-start lg:items-start"
                to={`/product/${item._id}`}
              >
                <img
                  src={item.photos[0]}
                  alt={item.title}
                  className="w-2/3 ml-5 h-full"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-y-4 w-2/3 font-rob">
              <Link
                className="text-2xl font-semibold"
                to={`/product/${item._id}`}
              >
                {item?.title}
              </Link>
              <div>{item.description}</div>
              <div>${item.price}</div>
              <div>
                <button
                  onClick={() => handleClick(item)}
                  className="border bg-red-500 px-3 py-2 text-white hover:bg-red-600 rounded-sm"
                >
                  Remove from basket
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-10 flex flex-row gap-x-5 items-center justify-center">
        {basket.length > 0 && (
          <>
            <div className="font-rob text-2xl font-bold">Total : ${total}</div>
            <div>
              <button
                className="px-3 py-2 text-xl rounded-md bg-green-500 text-white hover:bg-green-700"
                onClick={onOpen}
                disabled={basket.length < 1}
              >
                Order
              </button>
            </div>
          </>
        )}

        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <div className="flex flex-row gap-x-2">
                  <div>
                    <FormLabel>Name</FormLabel>
                    <Input />
                  </div>
                  <div>
                    <FormLabel>Surname</FormLabel>
                    <Input />
                  </div>
                </div>
                <FormLabel>Address</FormLabel>
                <Textarea
                  ref={initialRef}
                  placeholder="Adress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Basket;
