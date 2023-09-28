import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import DiagramTab from "../DiagramTab/DiagramTab";
import { getAllCategoriesFromTransactions } from "../../redux/finance/selectors-transaction";

const Stats = () => {
  const theme = useTheme();
  const allCategoriesWithColors = theme.categories;

  const categoriesFromState = useSelector(getAllCategoriesFromTransactions);
  const categoriesWithDB = categoriesFromState || [];

  let allArray = [];

  function createArrDBWithState() {
    allCategoriesWithColors.forEach((el1) => {
      categoriesWithDB.forEach((el2) => {
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
