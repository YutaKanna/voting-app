const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/vote", (req, res) => {
  const { optionId } = req.body;
  // 投票データを保存する処理を追加する
  console.log("投票されました。選択肢ID: " + optionId);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("サーバーがポート3000で起動しました。");
});
