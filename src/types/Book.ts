export interface Book {
  id: string;
  accessionNumber: string;
  title: string;
  publisherName: string;
  authors: string;
  locationName: string;
  status: 'Available' | 'Issued';
  createdAt: Date;
  updatedAt: Date;
}

export interface BookFormData {
  accessionNumber: string;
  title: string;
  publisherName: string;
  authors: string;
  locationName: string;
  status: 'Available' | 'Issued';
}