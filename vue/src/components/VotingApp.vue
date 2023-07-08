<template>
    <div>
      <h2>
        <input type="text" v-model="title" :disabled="hasVoted">
      </h2>
      <ul>
        <li v-for="(option, index) in options" :key="index">
          <label>
            <input type="radio" :value="option.id" v-model="selectedOptionId" :disabled="hasVoted">
            {{ option.text }}
          </label>
        </li>
        <li>
          <input type="text" v-model="newOption" :disabled="hasVoted" placeholder="新しい選択肢">
          <button @click="addOption" :disabled="hasVoted">追加</button>
        </li>
      </ul>
      <button @click="submitVote" :disabled="hasVoted">投票する</button>
      <p v-if="hasVoted">あなたの投票: {{ selectedOptionText }}</p>
      <h3>投票結果</h3>
      <ul>
        <li v-for="(option, index) in options" :key="index">
          {{ option.text }}: {{ voteCounts[option.id] || 0 }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import io from "socket.io-client";
  
  export default {
    data() {
      return {
        title: "",
        options: [],
        newOption: "",
        selectedOptionId: null,
        selectedOptionText: "",
        hasVoted: false,
        voteCounts: {}
      };
    },
    created() {
      // サーバーとのWebSocket接続を確立する
      this.socket = io("http://localhost:3000");
  
      // サーバーからの投票結果を受け取る
      this.socket.on("voteCounts", (voteCounts) => {
        this.voteCounts = voteCounts;
      });
    },
    beforeUnmount() {
      // コンポーネントが破棄される前にWebSocket接続を閉じる
      this.socket.disconnect();
    },
    methods: {
      submitVote() {
        if (this.selectedOptionId) {
          // サーバーに投票データを送信する
          this.socket.emit("vote", this.selectedOptionId);
  
          // 選択された選択肢のテキストを保持する
          this.selectedOptionText = this.options.find(
            (option) => option.id === this.selectedOptionId
          ).text;
  
          // 投票状態を更新する
          this.hasVoted = true;
        } else {
          console.log("選択肢が選ばれていません。");
        }
      },
      addOption() {
        if (this.newOption.trim()) {
          const newOptionId = this.options.length + 1;
          this.options.push({
            id: newOptionId,
            text: this.newOption
          });
          this.newOption = "";
        }
      }
    }
  };
  </script>
  