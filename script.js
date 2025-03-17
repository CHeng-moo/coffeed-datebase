let main
 
document.addEventListener("DOMContentLoaded", () => {
//There must be a div with the class name main in your index.html file. All components will be appended to this div
  main = document.querySelector(".main")
  
  //Replace the url in the fetch with the url your google docs csv url
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTaNFDc5tyk4RdMAuy-cTXAMXJkpGTos0H8VCl3IltecM1Jd-w3tLm8hd05s3F0249eC7iy3Bncwabb/pub?output=csv")
    .then(response => response.text())
    .then(csvData => {
      Papa.parse(csvData, {
        header: true, // Treat the first row as column headers
        skipEmptyLines: true, // Ignore empty rows
        complete: function(results) {
          results.data.forEach(row => {
            displayComponent(row);
          });
        }
      });
    });
});

  function displayComponent(row) {
    let component = document.createElement("div");
    component.classList.add("coffee-component"); // 组件外层 div
  
    // 创建 Date 元素
    let date = document.createElement("p");
    date.textContent = row.Date;  // 读取 CSV 里的 Date 列
    date.classList.add("date");
    component.append(date);
  
    // 创建 Image 元素（如果有图片）
    if (row.Image) {
      let image = document.createElement("img");
      image.src = "images/" + row.Image;  // 假设图片存储在 'images/' 目录
      image.classList.add("coffee-image");
      component.append(image);
    }
  
    // 创建 Description 元素
    let description = document.createElement("p");
    description.textContent = row.Description; // 读取 CSV 里的 Description 列
    description.classList.add("description");
    component.append(description);

    component.addEventListener("click", function() {
      window.open(row.Page);
    });
    
  
    // 将组件添加到页面
    main.append(component);
  }
  