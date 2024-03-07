export interface FinanceBook {
    id: string
    title: string
    publishDate: string
    authors: Author []
    cover: string
  }

  export interface Author {
    key: string
    name: string
  }
