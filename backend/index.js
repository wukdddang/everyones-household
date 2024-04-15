const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { format, addHours, parseISO } = require("date-fns");
const { formatInTimeZone } = require("date-fns-tz");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/save", (req, res) => {
  console.log(req.body);
  const { dob, title, category, amount, notes } = req.body;
  const koreaTimeZone = "Asia/Seoul";
  const date = parseISO(dob);
  const dateInKorea = formatInTimeZone(
    date,
    koreaTimeZone,
    "yyyy-MM-dd'T'HH:mm:ssXXX"
  );

  const monthYear = formatInTimeZone(date, koreaTimeZone, "yyyy-MM");
  const fileName = `${monthYear}.csv`;
  const filePath = path.join(__dirname, fileName);

  const income = category === "월급" ? amount : "";
  const expense = category !== "월급" ? amount : "";
  const newData = `\n${dateInKorea},${title},${category},${income},${expense},${notes}`;

  fs.appendFile(filePath, newData, { flag: "a+" }, (err) => {
    if (err) {
      console.error("Error saving data:", err);
      return res.status(500).send("Error saving data");
    }
    res.send("Data saved successfully");
  });
});

app.get("/api/household", (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).send("Date parameter is required");
  }

  const fileName = `${date}.csv`;
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // 파일이 존재하지 않을 때 발생하는 에러 코드
        console.error("File not found:", err);
        return res.status(404).send("File not found");
      }
      console.error("Error reading data:", err);
      return res.status(500).send("Error reading data");
    }

    // Convert CSV to JSON assuming first line is headers
    const delimiter = data.includes("\t") ? "\t" : ",";
    const rows = data.split("\n").filter((row) => row.trim() !== "");
    const headers = rows
      .shift()
      .split(delimiter)
      .map((header) => header.trim());

    const json = rows.map((row) => {
      const values = row
        .split(delimiter)
        .map((value) => value.trim().replace(/,/g, ""));
      let result = {};
      headers.forEach((header, index) => {
        result[header] = values[index] || ""; // 쉼표 제거를 통한 숫자 정리
      });
      return result;
    });

    res.json(json);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
