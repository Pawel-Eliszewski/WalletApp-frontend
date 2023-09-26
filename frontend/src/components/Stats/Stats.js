import { transactionsSelectors } from "../../redux/finance/selectors-transaction";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import DiagramTab from "../DiagramTab/DiagramTab";

const Stats = () => {
  const theme = useTheme();
  const allCategoriesWithColors = theme.categories;

  const categoriesFromState = useSelector(
    transactionsSelectors.getAllCategoriesFromTransactions
  );
  const categoriesWithDB = categoriesFromState.categories;

  const DB = categoriesWithDB ? categoriesWithDB : [];

  let allArray = [];

  function createArrDBWithState() {
    allCategoriesWithColors.forEach((el1) => {
      DB.forEach((el2) => {
        if (el1.value === el2.category) {
          const sum = el2.sum;
          allArray.push({ ...el1, sum });
        }
      });
    });
  }

  createArrDBWithState();

  return <DiagramTab allArray={allArray} />;
};

export default Stats;
