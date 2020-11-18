const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },

  {
    logo: "B",
    url: "https://www.baidu.com",
  },
];

// function randomColor() {
//   var col = "#";
//   for (var i = 0; i < 6; i++)
//     color += parseInt(Math.random() * 16).toString(16);
//   return col;
// }
function bg3() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/); //删除/开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>  
        <div class="site">
            <div class="logo" >${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
            <use xlink:href="#iconclose"></use>
        </svg>
        </div>
        </div>
          </li>`).insertBefore($lastLi);

    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

window.addEventListener("load", (e) => {
  //document.body.style.color = bg3();

  $(".logo").mouseover(function () {
    $(".logo").css("color", bg3());
  });
  $(".logo").mouseout(function () {
    $(".logo").css("color", "#000");
  });
});

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
