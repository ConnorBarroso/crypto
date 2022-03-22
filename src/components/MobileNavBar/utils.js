import { ReactComponent as SearchIcon } from "../../resources/search.svg";
import { ReactComponent as PortfolioIcon } from "../../resources/portfolio.svg";
import { ReactComponent as OverviewIcon } from "../../resources/overview.svg";
import { ReactComponent as SummaryIcon } from "../../resources/summary.svg";

export const linkArray = [
  {
    to: "/coins",
    svg: <OverviewIcon />,
    label: "Overview",
  },
  {
    to: "/portfolio",
    svg: <PortfolioIcon />,
    label: "Portfolio",
  },
  {
    to: "/coins/bitoin",
    svg: <SummaryIcon />,
    label: "Summary",
  },
  {
    to: "/search",
    svg: <SearchIcon />,
    label: "Search",
  },
];
