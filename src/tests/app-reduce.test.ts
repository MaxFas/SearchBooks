import {BooksType} from "../DAL/api";
import {addBooks, appReducer} from "../reducers/appReducer";


test('add the new books', () => {


  const startState: BooksType&{searchTitle: string, error: boolean, isLoading: boolean} =  {
    searchTitle: "test",
    error: true,
    isLoading: true,
    kind: 'test',
    totalItems: 0,
    items: [{
      kind: "test",
      id: "testFirst",
      etag: "test",
      selfLink: "test",
      volumeInfo: {
        title: "test",
        authors: ['test'],
        publisher: "test",
        publishedDate: "test",
        description: "test",
        industryIdentifiers: [
          {
            type: "test",
            identifier: "test",
          },
          {
            type: "test",
            identifier: "test",
          }
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 0,
        printType: "test",
        categories: ['test'],
        maturityRating: "test",
        allowAnonLogging: true,
        contentVersion: "test",
        panelizationSummary: {
          containsEpubBubbles: true,
          containsImageBubbles: true
        },
        imageLinks: {
          smallThumbnail: "test",
          thumbnail: "test"
        },
        language: "test",
        previewLink: "test",
        infoLink: "test",
        canonicalVolumeLink: "test"
      },
      saleInfo: {
        country: "test",
        saleability: "test",
        isEbook: true,
        listPrice: {
          amount: 0,
          currencyCode: "test",
        },
        retailPrice: {
          amount: 0,
          currencyCode: "test"
        },
        buyLink: "test",
        offers: [
          {
            finskyOfferType: 0,
            listPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            },
            retailPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            }
          }
        ]
      },
      accessInfo: {
        country: "test",
        viewability: "test",
        embeddable: true,
        publicDomain: true,
        textToSpeechPermission: "test",
        epub: {
          isAvailable: true
        },
        pdf: {
          isAvailable: true
        },
        webReaderLink: "test",
        accessViewStatus: "test",
        quoteSharingAllowed: true
      },
      searchInfo: {
        textSnippet: "test",
      }}]
  }
  const newData: BooksType&{searchTitle: string, error: boolean, isLoading: boolean} =  {
    searchTitle: "test1",
    error: true,
    isLoading: true,
    kind: 'test',
    totalItems: 1,
    items: [{
      kind: "test",
      id: "test",
      etag: "test",
      selfLink: "test1",
      volumeInfo: {
        title: "test",
        authors: ['test'],
        publisher: "test",
        publishedDate: "test",
        description: "test",
        industryIdentifiers: [
          {
            type: "test",
            identifier: "test",
          },
          {
            type: "test",
            identifier: "test",
          }
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 0,
        printType: "test",
        categories: ['test'],
        maturityRating: "test",
        allowAnonLogging: true,
        contentVersion: "test",
        panelizationSummary: {
          containsEpubBubbles: true,
          containsImageBubbles: true
        },
        imageLinks: {
          smallThumbnail: "test",
          thumbnail: "test"
        },
        language: "test",
        previewLink: "test",
        infoLink: "test",
        canonicalVolumeLink: "test"
      },
      saleInfo: {
        country: "test",
        saleability: "test",
        isEbook: true,
        listPrice: {
          amount: 0,
          currencyCode: "test",
        },
        retailPrice: {
          amount: 0,
          currencyCode: "test"
        },
        buyLink: "test",
        offers: [
          {
            finskyOfferType: 0,
            listPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            },
            retailPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            }
          }
        ]
      },
      accessInfo: {
        country: "test",
        viewability: "test",
        embeddable: true,
        publicDomain: true,
        textToSpeechPermission: "test",
        epub: {
          isAvailable: true
        },
        pdf: {
          isAvailable: true
        },
        webReaderLink: "test",
        accessViewStatus: "test",
        quoteSharingAllowed: true
      },
      searchInfo: {
        textSnippet: "test",
      }}]
  }

  const endState = appReducer(startState, addBooks(newData.items, newData.totalItems))


  expect(endState.items.length).toBe(2);
});

test('filter books with the same ID', () => {


  const someID = 'test'
  const someID_2 = 'test'

  const startState: BooksType&{searchTitle: string, error: boolean, isLoading: boolean} =  {
    searchTitle: "test",
    error: true,
    isLoading: true,
    kind: 'test',
    totalItems: 0,
    items: [{
      kind: "test",
      id: someID,
      etag: "test",
      selfLink: "test",
      volumeInfo: {
        title: "test",
        authors: ['test'],
        publisher: "test",
        publishedDate: "test",
        description: "test",
        industryIdentifiers: [
          {
            type: "test",
            identifier: "test",
          },
          {
            type: "test",
            identifier: "test",
          }
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 0,
        printType: "test",
        categories: ['test'],
        maturityRating: "test",
        allowAnonLogging: true,
        contentVersion: "test",
        panelizationSummary: {
          containsEpubBubbles: true,
          containsImageBubbles: true
        },
        imageLinks: {
          smallThumbnail: "test",
          thumbnail: "test"
        },
        language: "test",
        previewLink: "test",
        infoLink: "test",
        canonicalVolumeLink: "test"
      },
      saleInfo: {
        country: "test",
        saleability: "test",
        isEbook: true,
        listPrice: {
          amount: 0,
          currencyCode: "test",
        },
        retailPrice: {
          amount: 0,
          currencyCode: "test"
        },
        buyLink: "test",
        offers: [
          {
            finskyOfferType: 0,
            listPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            },
            retailPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            }
          }
        ]
      },
      accessInfo: {
        country: "test",
        viewability: "test",
        embeddable: true,
        publicDomain: true,
        textToSpeechPermission: "test",
        epub: {
          isAvailable: true
        },
        pdf: {
          isAvailable: true
        },
        webReaderLink: "test",
        accessViewStatus: "test",
        quoteSharingAllowed: true
      },
      searchInfo: {
        textSnippet: "test",
      }}]
  }
  const newData: BooksType&{searchTitle: string, error: boolean, isLoading: boolean} =  {
    searchTitle: "test1",
    error: true,
    isLoading: true,
    kind: 'test',
    totalItems: 1,
    items: [{
      kind: "test",
      id: someID_2,
      etag: "test",
      selfLink: "test1",
      volumeInfo: {
        title: "test",
        authors: ['test'],
        publisher: "test",
        publishedDate: "test",
        description: "test",
        industryIdentifiers: [
          {
            type: "test",
            identifier: "test",
          },
          {
            type: "test",
            identifier: "test",
          }
        ],
        readingModes: {
          text: true,
          image: true,
        },
        pageCount: 0,
        printType: "test",
        categories: ['test'],
        maturityRating: "test",
        allowAnonLogging: true,
        contentVersion: "test",
        panelizationSummary: {
          containsEpubBubbles: true,
          containsImageBubbles: true
        },
        imageLinks: {
          smallThumbnail: "test",
          thumbnail: "test"
        },
        language: "test",
        previewLink: "test",
        infoLink: "test",
        canonicalVolumeLink: "test"
      },
      saleInfo: {
        country: "test",
        saleability: "test",
        isEbook: true,
        listPrice: {
          amount: 0,
          currencyCode: "test",
        },
        retailPrice: {
          amount: 0,
          currencyCode: "test"
        },
        buyLink: "test",
        offers: [
          {
            finskyOfferType: 0,
            listPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            },
            retailPrice: {
              amountInMicros: 0,
              currencyCode: "test",
            }
          }
        ]
      },
      accessInfo: {
        country: "test",
        viewability: "test",
        embeddable: true,
        publicDomain: true,
        textToSpeechPermission: "test",
        epub: {
          isAvailable: true
        },
        pdf: {
          isAvailable: true
        },
        webReaderLink: "test",
        accessViewStatus: "test",
        quoteSharingAllowed: true
      },
      searchInfo: {
        textSnippet: "test",
      }}]
  }

  const endState = appReducer(startState, addBooks(newData.items, newData.totalItems))


  expect(endState.items.length).toBe(1);
});