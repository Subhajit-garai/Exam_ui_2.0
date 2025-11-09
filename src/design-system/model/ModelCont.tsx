import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@repo/ui/animated-modal";
import  { type JSX } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "@repo/lib/utils";

interface props {
  body: JSX.Element;
  footer: JSX.Element;
  trigger: JSX.Element;
  text?:string;
  nexttext?:string;
  
  triggerVarient: "up" | "down" | "left" | "right";
}

const variants = {
  right: {
    span: "group-hover/modal-btn:translate-x-40",
    div: "-translate-x-40 group-hover/modal-btn:translate-x-0 ",
  },
  left: {
    span: "group-hover/modal-btn:-translate-x-40",
    div: "translate-x-80 group-hover/modal-btn:-translate-x-40 ",
  },
  up: {
    span: "group-hover/modal-btn:translate-y-40",
    div: "-translate-y-40 group-hover/modal-btn:translate-y-0 ",
  },
  down: {
    span: "group-hover/modal-btn:-translate-y-40",
    div: "translate-y-40 group-hover/modal-btn:translate-y-0 ",
  },
} as const;

export function ModelCont({  text= "slide" ,nexttext="click",triggerVarient = "right"  }:props) {

  return (
    <div className="py-20 w-[50%] px-20 flex items-center justify-center">
      
      <Modal>
          <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        <AnimatePresence>
            <span
              className={cn(
                "text-center transition duration-500  ",
                variants[triggerVarient]?.span
              )}
            >
              {text}
            </span>
            <div
              className={cn(
                " items-center justify-center absolute inset-0 transition duration-500 dark:text-black text-white flex  z-20",
                variants[triggerVarient]?.div
              )}
            >
              {nexttext}
            </div>
        </AnimatePresence>
          </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
              Book your trip to{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Bali
              </span>{" "}
              now! ✈️
            </h4>
             
           
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Apply
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}


export default ModelCont;
