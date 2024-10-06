import { IUploadImageProps } from "@/types/types";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CldUploadWidget } from "next-cloudinary";

const UploadImage: React.FC<IUploadImageProps> = ({
  onChange,
  value,
  onRemove,
  disabled,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpload = (res: any) => {
    const newImageUrl = res.info.secure_url;
    if (newImageUrl) {
      // Use functional setState to ensure the latest state is updated
      onChange((prevImages: string[]) => [...prevImages, newImageUrl]);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-lg">Images</h4>
      <div className="flex gap-2">
        {value.map((url, index) => (
          <span key={index} className="relative cursor-pointer">
            <Image
              src={url}
              alt="img"
              className="w-[240px] rounded-md"
              width={1000}
              height={1000}
            />
            <Button variant={"destructive"} onClick={() => onRemove(url)}>
              <Trash className="font-semibold absolute top-4 right-5 h-4 w-4" />
            </Button>
          </span>
        ))}
      </div>
      <div className="pt-3">
        <CldUploadWidget
          uploadPreset="wjwwstzo"
          onSuccess={(result, { widget }) => {
            const newImageUrl = result.info.secure_url;
            if (newImageUrl) {
              // Use functional setState to ensure the latest state is updated
              onChange((prevImages: string[]) => [...prevImages, newImageUrl]);
            }
          }}
          options={{
            multiple: true,
          }}
        >
          {({ open }) => (
            <Button
              disabled={disabled}
              type="button"
              onClick={() => open()}
              variant="secondary"
            >
              <Upload className="font-semibold h-4 w-4" /> Upload an image
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default UploadImage;
