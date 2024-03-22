import dotenv from "dotenv";
dotenv.config();

export default class MedicineService {
  medicinePropsArr = ["useMethodQesitm", "atpnWarnQesitm", "atpnQesitm", "intrcQesitm", "seQesitm", "depositMethodQesitm"];

  complexStringToStringArr = (medicineData) => {
    for (let i = 0; i < this.medicinePropsArr.length; i++) {
      const props = this.medicinePropsArr[i];
      const data = medicineData[props];
      if (!data) continue;
      medicineData[props] = data.split(".");
    }
    return medicineData;
  };

  getMedicineInfo = async () => {
    const accessKey = process.env.MEDICINE_INFO_ACCESS_KEY;
    const apiEndPoint = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    try {
      const fetchDataRow = await fetch(`${apiEndPoint}?serviceKey=${accessKey}&type=json`).catch((err) => console.log(err));

      if (fetchDataRow.status !== 200) return undefined;
      const fetchData = await fetchDataRow.json();

      const result = fetchData["body"]["items"];
      return result;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
  getMedicineInfoByName = async (name) => {
    if (!name || typeof name !== "string") return undefined;
    const accessKey = process.env.MEDICINE_INFO_ACCESS_KEY;
    const apiEndPoint = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    try {
      const fetchDataRow = await fetch(`${apiEndPoint}?serviceKey=${accessKey}&itemName=${name}&type=json`).catch((err) =>
        console.log(err)
      );

      if (fetchDataRow.status !== 200) return undefined;
      const fetchData = await fetchDataRow.json();

      const result = fetchData["body"]["items"];
      if (!result) return undefined;
      return result.map((item, index) => {
        // 약 이름 / 성분 분류
        const itemName = item.itemName;
        const ingredientAndName = itemName.split("(");
        item.ingredient = undefined;
        if (ingredientAndName.length > 1) {
          item.itemName = ingredientAndName[0];
          item.ingredient = ingredientAndName[1].split(")")[0];
        }
        // 설명 문장별로 나눠서 제공
        item = this.complexStringToStringArr(item);
        return item;
      });
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
}
