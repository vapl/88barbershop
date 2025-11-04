export const siteDataQuery = `
  {
    "settings": *[_type == "settings" && _id == "settings"][0],
    "barbers": *[_type == "barber"] | order(name.en asc),
    "services": *[_type == "service"] | order(title.en asc),
    "gallery": *[_type == "gallery"][0].images
    }
`;
