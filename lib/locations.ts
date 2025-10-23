// India-focused location system for EasyCustomized
export const SPECIAL_LOCATIONS = [
  "All India",
  "Remote",
]

export const MAJOR_CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
]

export const OTHER_CITIES = [
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Noida",
  "Gurugram",
  "Chandigarh",
  "Coimbatore",
  "Kochi",
  "Mysuru",
  "Srinagar",
  "Thiruvananthapuram",
]

// International cities (limited - India-focused platform)
export const INTERNATIONAL_CITIES = [
  "Dubai",
  "Singapore",
  "London",
  "New York",
]

export const INDIA_CITIES = [...MAJOR_CITIES, ...OTHER_CITIES]

export const ALL_LOCATIONS: string[] = [
  ...SPECIAL_LOCATIONS,
  ...MAJOR_CITIES,
  ...OTHER_CITIES,
  ...INTERNATIONAL_CITIES,
]
