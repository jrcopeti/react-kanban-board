import { Button } from "./@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./@/components/ui/dialog";
import { HiOutlineTrash } from "react-icons/hi2";
import type { DialogDeleteProps } from "src/types";

function DialogDelete({
  handleDelete,
  id,
  task,
  column,
  isTask = true,
}: DialogDeleteProps) {
  const taskClassName = "absolute bottom-0 right-5 z-30 translate-x-1/2";
  const columnClassName = "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={isTask ? taskClassName : columnClassName}>
          <HiOutlineTrash
            className="bg-transparent opacity-60 hover:stroke-white hover:opacity-100"
            size={20}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete {isTask ? task : column}?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button onClick={() => handleDelete(id)} size="sm" className="px-3">
            Delete
          </Button>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
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
