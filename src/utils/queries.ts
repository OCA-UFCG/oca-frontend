export const MAIN_PAGE_IDS = [
  "about",
  "publications",
  "maps-visu",
  "FAQ",
  "sponsors",
];

export const MAIN_PAGE_QUERY = `
  query($preview: Boolean) {
    aboutCollection(preview: $preview) {
      items {
        cover {
          url
        }
        about {
          json
        }
        albumCollection {
          items {
            url
            width
            height
            description
          }
        }
      }
    }

    sectionHeadCollection(limit: ${MAIN_PAGE_IDS.length}, where: { id_in: ${JSON.stringify(MAIN_PAGE_IDS)}}, preview: $preview) {
      items {
        title
        subtitle
        id
      }
    }

    tiffInfoCollection(preview: $preview) {
      items {
        id
        name
        description
        extraInfo
        measurementUnit
        poster {
          url
        }
        minScale
        maxScale
        graphLegendTitle
        imageData
        type
      }
    }

    publicationsCollection(preview: $preview) {
      items {
        title
        href
        type
      }
    }

    sponsorsCollection(preview: $preview) {
      items {
        name
        logo {
          url
          width
          height
        }
        link
        tier
      }
    }

    faqCollection(preview: $preview) {
      items {
        title
        details {
          json
        }
      }
    }
  }

`;

export const IEE_QUERY = `
  query IEE_QUERY($preview: Boolean) {
    tiffInfoCollection(preview: $preview) {
      id
      name
      description
      extraInfo
      measurementUnit
      poster {
        url
      }
      minScale
      maxScale
      graphLegendTitle
      imageData
      type
    }
  }
`;

export const ABOUT_PAGE_QUERY = `
  query ABOUT_QUERY($preview: Boolean) {
    nossaHistoriaCollection(limit: 1, preview: $preview) {
      items {
        ttulo
        conteudo {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
              }
            }
          }
        }
        picturesCollection {
          items {
            url
            width
            height
            title
          }
        }
      }
    }
  }
`;
