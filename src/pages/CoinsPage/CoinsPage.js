import React from "react";
import { TableDisplay, GraphDisplay } from "components";
import { PageContainer } from "./CoinsPage.styles";
const CoinsPage = (props) => {
  const currency = props.currency;
  return (
    <PageContainer>
      <GraphDisplay currency={currency} />
      <TableDisplay currency={currency} />
    </PageContainer>
  );
};
export default CoinsPage;
