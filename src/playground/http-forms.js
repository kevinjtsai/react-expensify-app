//file reader in a promise
function readFileText(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener(
      "load", () => resolve(reader.result));
    reader.addEventListener(
      "error", () => reject(reader.error));
    reader.readAsText(file);
  });
}

//local storage
localStorage.setItem("username", "marijn");
console.log(localStorage.getItem("username")); // → marijn
localStorage.removeItem("username");

