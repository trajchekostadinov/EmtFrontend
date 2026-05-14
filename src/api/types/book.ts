export type BookCategory = 'NOVEL' | 'THRILLER' | 'HISTORY' | 'FANTASY' | 'BIOGRAPHY' | 'CLASSICS' | 'OTHER';
export type BookState = 'GOOD' | 'BAD';

export interface Author {
    id: number;
    name: string;
    surname: string;
}

export interface Book {
    id: number;
    name: string;
    category: BookCategory;
    state: BookState;
    availableCopies: number;
    author: Author;
}

export interface BookDetails extends Book {
    datePublished?: string;
}

export interface CreateBookDto {
    name: string;
    category: BookCategory;
    state: BookState;
    availableCopies: number;
    authorId: number;
}