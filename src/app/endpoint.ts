export const baseUrl = 'https://openlibrary.org'
export const bookCover = 'https://covers.openlibrary.org/b/id/'

export const bookEndpoints = {
    getFinanceBooks: `${baseUrl}/subjects/finance.json?limit=9`,
    getBookDetails: `${baseUrl}/works/`,
    searchBooks: `${baseUrl}/search.json?`,
}
