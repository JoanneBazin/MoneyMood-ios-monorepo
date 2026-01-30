import { AlertOctagon } from "lucide-react";

export const InfoMessage = ({
  message,
  comment,
}: {
  message: string;
  comment?: string;
}) => {
  return (
    <div className="flex-center gap-sm my-2xl">
      <AlertOctagon />
      <div>
        <p className="req-info">{message}</p>
        <p className="info-comment">{comment}</p>
      </div>
    </div>
  );
};
