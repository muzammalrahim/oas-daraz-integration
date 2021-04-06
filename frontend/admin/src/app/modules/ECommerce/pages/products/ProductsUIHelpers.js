export const ProductStatusCssClasses = ["danger", "success", "info", ""];
export const ProductStatusTitles = ["Inactive", "Active"];
export const ProductConditionCssClasses = ["success", "danger", ""];
export const ProductConditionTitles = ['NE','NS', 'SV', 'AR', 'FN', 'US', 'RP'];
export const YES_NO_OPTIONS = ['No','Yes'];
export const UOM_CHOICES = ['CM', 'BOX', 'KG'];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "100", value: 100 },
  { text: "150", value: 150 },
  { text: "200", value: 200 }
];
export const initialFilter = {
  filter: {
    model: "",
    manufacture: "",
    part_number: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "part_number",
  pageNumber: 1,
  pageSize: 100
};
export const AVAILABLE_COLORS = [
  "Red",
  "CadetBlue",
  "Eagle",
  "Gold",
  "LightSlateGrey",
  "RoyalBlue",
  "Crimson",
  "Blue",
  "Sienna",
  "Indigo",
  "Green",
  "Violet",
  "GoldenRod",
  "OrangeRed",
  "Khaki",
  "Teal",
  "Purple",
  "Orange",
  "Pink",
  "Black",
  "DarkTurquoise"
];

export const AVAILABLE_MANUFACTURES = [
  "Pontiac",
  "Kia",
  "Lotus",
  "Subaru",
  "Jeep",
  "Isuzu",
  "Mitsubishi",
  "Oldsmobile",
  "Chevrolet",
  "Chrysler",
  "Audi",
  "Suzuki",
  "GMC",
  "Cadillac",
  "Infinity",
  "Mercury",
  "Dodge",
  "Ram",
  "Lexus",
  "Lamborghini",
  "Honda",
  "Nissan",
  "Ford",
  "Hyundai",
  "Saab",
  "Toyota"
];
