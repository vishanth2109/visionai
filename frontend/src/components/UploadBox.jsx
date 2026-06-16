import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

function UploadBox({ setImage }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
    >
      <input {...getInputProps()} />

      <Upload className="mx-auto w-12 h-12 text-gray-400" />

      <h3 className="mt-4 text-lg font-semibold">
        Drag & Drop Image
      </h3>

      <p className="text-gray-500 mt-2">
        or click to browse files
      </p>
    </div>
  );
}

export default UploadBox;