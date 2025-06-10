import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Check } from 'lucide-react';

interface QEFileUploaderProps {
  onFileUpload: (content: string) => void;
}

const QEFileUploader: React.FC<QEFileUploaderProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        onFileUpload(content);
      };
      reader.readAsText(file);
    });
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.in', '.out', '.dat']
    },
    multiple: false
  });

  return (
    <div className="p-3">
      <h3 className="font-medium text-blue-400 mb-2">Quantum ESPRESSO Files</h3>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-blue-500/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-400">
          {isDragActive
            ? 'Drop QE files here...'
            : 'Drag & drop QE input files (.in, .out, .dat)'}
        </p>
      </div>
      
      {acceptedFiles.length > 0 && (
        <div className="mt-2 flex items-center text-green-400 text-sm">
          <Check className="w-4 h-4 mr-1" />
          <FileText className="w-4 h-4 mr-1" />
          {acceptedFiles[0].name}
        </div>
      )}
    </div>
  );
};

export default QEFileUploader;