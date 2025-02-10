import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

type WButtonImportFileProps = {
  onUpload: (data: any) => void;
  title: string;
  headers: { key: string; value: string }[];
  customStyles?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

const WButtonImportFile = ({
  onUpload,
  headers,
  children,
  customStyles,
  className,
  title,
}: WButtonImportFileProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        alert('File is required');
        return;
      }
      if (!headers || headers.length === 0) {
        alert('Headers are required');
        return;
      }

      // Remove the first header (e.g., id)
      headers.shift();

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const bstr = e.target?.result;
        if (!bstr) {
          alert('Error reading file');
          return;
        }

        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[];
        jsonData.shift();

        const formattedData = jsonData.map((item) => {
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header.key] = `${item[index]}`;
          });
          return obj;
        });

        onUpload(formattedData);
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error('Error uploading file', error);
      alert('File is invalid');
    }
  };

  return (
    <div>
      <Button variant="contained" component="label" style={customStyles} className={className}>
        {children}
        <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileUpload} />
      </Button>
    </div>
  );
};

export default WButtonImportFile;
