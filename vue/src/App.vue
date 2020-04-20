<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  min-height: 100%;
  background-color: #f2f2f2;
}

body, input, button {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.container {
  margin: auto;
  max-width: 400px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 30px;
}

p {
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 14px;
  color: #444;
  font-weight: bold;
  margin-bottom: 8px;
}

form label span {
  font-weight: normal;
  color: #999;
  font-size: 12px;
}

form input {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
  height: 45px;
  padding: 0 15px;
  font-size: 16px;
}

.btn {
  border: none;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  justify-content: center;
  padding: 10px;
  font-size: 16px;
  background: #f05a5b;
  font-weight: bold;
  color: #FFF;
  cursor: pointer;
}
</style>
