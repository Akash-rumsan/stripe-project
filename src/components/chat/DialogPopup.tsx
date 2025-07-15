import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

const DialogPopup = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <DialogTitle className="text-center text-xl font-semibold mt-4">
        {title}
      </DialogTitle>
      <DialogDescription className="text-center text-base pt-2">
        {content}
      </DialogDescription>
    </>
  );
};

export default DialogPopup;
