import axios from "axios";

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes'
})

const apiKey = 'AIzaSyBWuBhjJtUnVatCbFE2UubnjscgmoYY40U'

export const appAPI = {
    getBooks (name: string, index: number) {
       return instance
         .get(`?q=${name}&${apiKey}&maxResults=30&startIndex=${index}`)
    },
    sortByOrderBooks (name: string, select: string, index: number = 0) {
        return instance
          .get(`?q=${name}&${select}&${apiKey}&maxResults=30&startIndex=${index}`)
    },
    sortByCategoriesBooks (select: string, index: number = 0) {
        return instance
          .get(`?q=subject:${select}&${apiKey}&maxResults=30&startIndex=${index}`)
    },
    getMoreBookByCategory (select: string, index: number) {
        return instance
          .get(`?q=subject:${select}&${apiKey}&maxResults=30&startIndex=${index}`)
    }

}

export type BooksType = {
    kind: string
    totalItems: number
    items: Array<BookDataType>
}

export type BookDataType = {
    "kind": string
    "id": string
    "etag": string
    "selfLink": string
    "volumeInfo": {
        "title": string
        "authors":Array<string>,
        "publisher": string
        "publishedDate": string
        "description": string
        "industryIdentifiers": [
            {
                "type": string
                "identifier": string
            },
            {
                "type": string
                "identifier": string
            }
        ],
        "readingModes": {
            "text": boolean
            "image": boolean
        },
        "pageCount": number
        "printType": string
        "categories":Array<string>,
        "maturityRating": string
        "allowAnonLogging": boolean
        "contentVersion": string
        "panelizationSummary": {
            "containsEpubBubbles": boolean
            "containsImageBubbles": boolean
        },
        "imageLinks": {
            "smallThumbnail": string
            "thumbnail": string
        },
        "language": string
        "previewLink": string
        "infoLink": string
        "canonicalVolumeLink": string
    },
    "saleInfo": {
        "country": string
        "saleability": string
        "isEbook": boolean
        "listPrice": {
            "amount": number
            "currencyCode": string
        },
        "retailPrice": {
            "amount": number
            "currencyCode": string
        },
        "buyLink": string
        "offers": [
            {
                "finskyOfferType": number
                "listPrice": {
                    "amountInMicros": number
                    "currencyCode": string
                },
                "retailPrice": {
                    "amountInMicros": number
                    "currencyCode": string
                }
            }
        ]
    },
    "accessInfo": {
        "country": string
        "viewability": string
        "embeddable": boolean
        "publicDomain": boolean
        "textToSpeechPermission": string
        "epub": {
            "isAvailable": boolean
        },
        "pdf": {
            "isAvailable": boolean
        },
        "webReaderLink": string
        "accessViewStatus": string
        "quoteSharingAllowed": boolean
    },
    "searchInfo": {
        "textSnippet": string
    }
}