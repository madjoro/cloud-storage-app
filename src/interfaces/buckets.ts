interface Bucket {
  id: string;
  name: string;
  location: string;
  files: File[];
}

interface File {
  id: string;
  fileName: string;
  dateModified: number;
  size: number;
}
