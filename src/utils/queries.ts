export const IEE_QUERY = `
  query IEE_QUERY($preview: Boolean) {
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
  }
`;

const COLLAB_PAGES_ID = ["collaborators"];

export const COLLAB_PAGE_QUERY = `
  query COLLAB_PAGE_QUERY($preview: Boolean) {
    collaboratorsCollection(preview: $preview) {
      items {
        name
        institution
        fieldWork
        github
        linkedin
        lattes
      }
    }

    sectionHeadCollection(limit: ${COLLAB_PAGES_ID.length}, where: { id_in: ${JSON.stringify(COLLAB_PAGES_ID)}}, preview: $preview) {
      items {
        title
        subtitle
        id
      }
    }
  }

`;

const INFRA_PAGES_ID = ["infra"];

export const INFRA_PAGE_QUERY = `
  query INFRA_PAGE_QUERY($preview: Boolean) {
    infrastructureCollection(preview: $preview) {
      items {
        title
        description
        image {
          url
          width
          height
        }
      }
    }

    sectionHeadCollection(limit: ${INFRA_PAGES_ID.length}, where: { id_in: ${JSON.stringify(INFRA_PAGES_ID)}}, preview: $preview) {
      items {
        title
        subtitle
        id
      }
    }
  }
`;

export const CONTACT_PAGES_ID = ["contact-us"];

export const CONTACT_PAGE_QUERY = `
  query CONTACT_PAGE_QUERY($preview: Boolean) {
    sectionHeadCollection(limit: ${CONTACT_PAGES_ID.length}, where: { id_in: ${JSON.stringify(CONTACT_PAGES_ID)}}, preview: $preview) {
      items {
        title
        subtitle
        id
      }
    }
  }
`;

export const TEAM_PAGES_ID = ["teamMembers"];

export const TEAM_PAGE_QUERY = `
  query TEAM_PAGE_QUERY($preview: Boolean) {
    membersCollection(preview: $preview) {
      items {
        name
        role
        github
        linkedin
        lattes
        fieldWork
        institution
        avatar {
          url
          width
          height
        }
      }
    }

    sectionHeadCollection(limit: ${TEAM_PAGES_ID.length}, where: { id_in: ${JSON.stringify(TEAM_PAGES_ID)}}, preview: $preview) {
      items {
        title
        subtitle
        id
      }
    }
  }
`;

export const FAQ_PAGE_QUERY = `
  query FAQ_PAGE_QUERY($preview: Boolean) {
    faqCollection(preview: $preview) {
      items {
        title
        details {
          json
        }
      }
    }
    sectionHeadCollection(limit: 1, where: { id_in: ["FAQ"] }, preview: $preview) {
      items {
        title
        subtitle
        id
      }
    }
  }
`;

export const RESEARCH_PAGE_QUERY = `
  query RESEARCH_PAGE_QUERY($preview: Boolean) {
    publicationsCollection(preview: $preview) {
      items {
        title
        type
        href
      }
    }
  }
`;
