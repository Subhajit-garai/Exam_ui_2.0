import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@repo/ui/animated-modal";
import { type JSX } from "react";
// import { AnimatePresence, motion } from "motion/react";

interface props {
  Body: JSX.Element;
  Footer: JSX.Element;
  Trigger: JSX.Element;
  text?: string;
  nexttext?: string;
  triggerVarient?: "up" | "down" | "left" | "right";
}

// const variants = {
//   right: {
//     span: "group-hover/modal-btn:translate-x-40",
//     div: "-translate-x-40 group-hover/modal-btn:translate-x-0 ",
//   },
//   left: {
//     span: "group-hover/modal-btn:-translate-x-40",
//     div: "translate-x-80 group-hover/modal-btn:-translate-x-40 ",
//   },
//   up: {
//     span: "group-hover/modal-btn:translate-y-40",
//     div: "-translate-y-40 group-hover/modal-btn:translate-y-0 ",
//   },
//   down: {
//     span: "group-hover/modal-btn:-translate-y-40",
//     div: "translate-y-40 group-hover/modal-btn:translate-y-0 ",
//   },
// } as const;

export function ModelCont({ Trigger, Body, Footer }: props) {
  // const ismobile = useIsMobile();

  return (
    <div className="py-20 w-[50%] px-20 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="">{Trigger}</ModalTrigger>
        <ModalBody>
          <ModalContent>{Body}</ModalContent>
          <ModalFooter className="gap-4">{Footer}</ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

// export const ModelCont = ({
//   HeaderComp,
//   size,
//   Body,
//   openModal,
//   setOpenModal,
// }: {
//   HeaderComp?: any;
//   size?: string;
//   Body: any;
//   openModal: boolean;
//   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   let ismobile = useIsMobile();
//   return (
//     <div>
//       <Modal
//         theme={ModelTheme.card}
//         size={ismobile ? size || "xl" : size || "3xl"}
//         position="center"
//         className={ismobile ? "" : ""}
//         show={openModal}
//         onClose={() => setOpenModal(false)}
//       >
//         <ModalHeader>{HeaderComp}</ModalHeader>
//         <ModalBody>{Body}</ModalBody>

//         {/* <Modal.Footer className=" justify-between">
//           <Button onClick={() => setOpenModal(false)}>Save</Button>
//           <Button color="gray" onClick={() => setOpenModal(false)}>
//             Back
//           </Button>
//         </Modal.Footer> */}
//       </Modal>
//     </div>
//   );
// };

export default ModelCont;
