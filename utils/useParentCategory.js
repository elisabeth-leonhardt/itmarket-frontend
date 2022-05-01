import { useEffect, useState } from "react";

export default function useParentCategory(categories) {
    const [parentCat, setParentCat] = useState(undefined)
    useEffect(() => {
    if (categories && categories[0].parentCategories.length > 0) {
      const parentCategory = categories[0].parentCategories[0].Category;
      setParentCat(parentCategory);
    } else {
      setParentCat(undefined);
    }
  }, [categories]);

  return parentCat;

}