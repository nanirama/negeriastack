module.exports = {
  _handleCardColor(type, color) {
    switch (type) {
      case 0:
        return color[0];
      case 1:
        return color[1];
      case 2:
        return color[2];
      case 3:
        return color[3];
      case 4:
        return color[4];
      default:
        break;
    }
  },
  // Generate length of string 2
  randomString(length) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  // Generate numeric random digit of length 2
  randomNumeric(length) {
    let result = "";
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  getRandomElements(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  },
  getArticleLink(newsItem){
    let baseUrl = `/article/${newsItem.id}/${newsItem.title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/ /g, "-")}`
    if (newsItem.authors_name){
      baseUrl += "?type=opinion";
    }
    else if (!newsItem.topic && newsItem.age){
      baseUrl += "?type=world";
    }
    return baseUrl;
  },

  getStrippedText(text, length){
    return text.substring(0, length || 80) + (text.length > (length||80) ? "..." : "")
  },

  getStrippedTitle(newsItem, length){
    return newsItem.title.substring(0, length || 80) + (newsItem.title.length > (length||80) ? "..." : "")
  }
};


