<template>
    <div>
      <h2>{{ question }}</h2>
      <ul>
        <li v-for="option in options" :key="option.id">
          <label>
            <input type="radio" :value="option.id" v-model="selectedOptionId">
            {{ option.text }}
          </label>
        </li>
      </ul>
      <button @click="submitVote">投票する</button>
    </div>
  </template>
  
<script>
export default {
    data() {
      return {
        question: "好きな果物は？",
        options: [
          { id: 1, text: "りんご" },
          { id: 2, text: "バナナ" },
          { id: 3, text: "みかん" }
        ],
        selectedOptionId: null
      };
    },
    methods: {
      submitVote() {
        if (this.selectedOptionId) {
          // サーバーに投票データを送信する処理を追加する
          console.log("投票されました。選択肢ID: " + this.selectedOptionId);
        } else {
          console.log("選択肢が選ばれていません。");
        }
      }
    }
};
</script>
  