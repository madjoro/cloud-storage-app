export interface Bucket {
  id: string;
  name: string;
  location: string;
  files: File[];
}

export interface File {
  id: string;
  fileName: string;
  dateModified: number;
  size: number;
}
