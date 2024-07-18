import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "../@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../@/components/ui/dialog";
import type { DialogDeleteProps } from "src/types";

function DialogDelete({
  handleDelete,
  id,
  task,
  column,
  isTask = true,
}: DialogDeleteProps) {

  const taskClassName =
    "absolute bottom-1 right-9 z-30 translate-x-1/2 bg-transparent hover:bg-pallette-300";
  const columnClassName = "bg-transparent hover:bg-pallette-300";


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={isTask ? taskClassName : columnClassName}>
          <MdOutlineDeleteOutline
            className="opacity-60 hover:opacity-100"
            size={27}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-pallette-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-pallette-600">
            Are you sure you want to delete {isTask ? task : column}?
          </DialogTitle>
          <DialogDescription className="text-pallette-300">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => handleDelete(id)}
            size="sm"
            className="px-3 text-pallette-100"
          >
            Delete
          </Button>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-pallette-300 text-pallette-600"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDelete;
