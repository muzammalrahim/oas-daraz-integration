export const SupplierStatusCssClasses = ["danger", "success", "info", ""];
export const SupplierStatusTitles = ["Inactive", "Active"];
export const SupplierConditionCssClasses = ["success", "danger", ""];
export const SupplierConditionTitles = ['NE','NS', 'SV', 'AR', 'FN', 'US', 'RP'];
export const YES_NO_OPTIONS = ['YES', 'NO'];
export const UOM_CHOICES = ['CM', 'BOX', 'KG'];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "25", value: 25 },
  { text: "50", value: 50 }
];
export const initialFilter = {
  filter: {
    model: "",
    manufacture: "",
    id: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
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
