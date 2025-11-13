export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  booksWritten: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  photoUrl?: string;
};