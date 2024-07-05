import COFFEES from "../config/coffees";
import promotions from "../config/promotions";
import diy from "../config/diy";
import bean from "../config/bean";

const searchConfigFiles = (query) => {
  const lowercasedQuery = query.toLowerCase();

  const coffeeResults = COFFEES.filter(coffee =>
    coffee.name.toLowerCase().includes(lowercasedQuery)
  );
  const promotionResults = promotions.filter(promotion =>
    promotion.promotionsName.toLowerCase().includes(lowercasedQuery)
  );
  const diyResults = diy.filter(d =>
    d.diyName.toLowerCase().includes(lowercasedQuery)
  );
  const beanResults = bean.filter(b =>
    b.beanName.toLowerCase().includes(lowercasedQuery)
  );

  return {
    coffeeResults,
    promotionResults,
    diyResults,
    beanResults,
  };
};

export default searchConfigFiles;
