import dotenv from "dotenv";
import xml2js from "xml2js";
dotenv.config();

export default class MedicineService {
  getMedicineInfo = async () => {
    const accessKey = process.env.MEDICINE_INFO_ACCESS_KEY;
    const apiEndPoint = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    try {
      const fetchDataRow = await fetch(`${apiEndPoint}?serviceKey=${accessKey}`).catch((err) => console.log(err));

      if (fetchDataRow.status !== 200) return undefined;
      const fetchData = await fetchDataRow.text();

      const parseStringPromise = (xmlData) => {
        return new Promise((resolve, reject) => {
          xml2js.parseString(xmlData, (err, res) => {
            if (err) {
              console.log(err);
              reject(undefined);
            } else {
              resolve(res);
            }
          });
        });
      };

      const result = await parseStringPromise(fetchData)
        .then((data) => data)
        .catch((err) => console.log(err));

      return result;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
}
