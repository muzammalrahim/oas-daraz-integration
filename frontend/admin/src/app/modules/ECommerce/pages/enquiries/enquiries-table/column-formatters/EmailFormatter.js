import React from "react";

export const EmailFormatter = (cellContent, row) => (
  <>
  <a href={"mailto:" + row.email_address}>{row.email_address}</a>
  </>
);
