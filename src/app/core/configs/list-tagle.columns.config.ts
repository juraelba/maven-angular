import { SearchColumnsEnum, SearchColumnsIdEnum } from "@enums/search.enum";
import { Column } from "@models/table.model";

export const COLUMNS: Column[] = [
    {
      id: SearchColumnsIdEnum.mavenid,
      label: SearchColumnsEnum.mavenid,
      width: 200
    },
    {
      id: SearchColumnsIdEnum.name,
      label: SearchColumnsEnum.name,
      width: 200
    },
    {
      id: SearchColumnsIdEnum.market,
      label: SearchColumnsEnum.market,
      width: 200
    }
  ];
