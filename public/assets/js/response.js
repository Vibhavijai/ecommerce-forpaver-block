const responseObj = {
  hello: "Hey! How can we assist you today?",
  name: "We are Shree Lakshmitha Corporation, we provide the best quality paver blocks",
  location: "<a href='https://maps.app.goo.gl/k6wZjyzSk8LNDRe38'>Click here-> Our location</a>",
  address: "<a href='https://maps.app.goo.gl/k6wZjyzSk8LNDRe38'>Click here-> Our location</a>",
  email: "For inquiries or assistance, please contact us at <a href='mailto:lakshmithacorp@gmail.com'>lakshmithacorp@gmail.com</a>.",
  phone: "You can reach us at <a href='tel:+919965599005'>+91 99655 99005</a> or <a href='tel:+919965599003'>+91 99655 99003</a>.",
  product: "<a href='index.html#products'>Our Products</a>",
  brickpaver: "<a href='brickpaver.html'>Brick Paver</a>",
  squarewavepavers:  "<a href='squarewavepavers.html'>Square Wave Paver</a>",
  zigzagpavers: "<a href='zigzagpaver.html'>Zig Zag Paver</a>",
  hexagonpavers: "<a href='hexagonpaver.html'>Hexagon Paver</a>",
  grasspavers:  "<a href='grasspavers.html'>Grass Paver</a>",
  combopavers:  "<a href='combopaver.html'>Combo Paver</a>",
  sparrowpavers:  "<a href='sparrowpaver.html'>Sparrow Paver</a>",
  rockpavers:  "<a href='rockpaver.html'>Rock Paver</a>",
  ishapepavers:  "<a href='ishapepaver.html'>I Shape Paver</a>",
  kerbstones: "<a href='kerbstone.html'>Kerb Stone</a>",
  interlockbricks:  "<a href='interlockbricks.html'>Interlock Bricks</a>",
};

const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");

send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Call function to render welcome message when the page loads
  renderWelcomeMessage();
});

const renderWelcomeMessage = () => {
  const welcomeMessage = responseObj.hello;
  const helpMessage = "If you need help, type 'help' to see available queries.";
  renderMessageEle(welcomeMessage, "chatbot");
  renderMessageEle(helpMessage, "chatbot");
};

const renderHelpOptions = () => {
  const helpOptions = "Available queries: name, location, address, email, phone, product.";
  renderMessageEle(helpOptions, "chatbot");
  // Clear input field after displaying help options
  txtInput.value = "";
};

const renderUserMessage = () => {
  const userInput = txtInput.value.trim().toLowerCase();
  if (userInput === "help") {
    renderHelpOptions();
    return;
  }
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  setTimeout(() => {
    renderChatbotResponse(userInput);
    setScrollPosition();
  }, 600);
};


const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
  renderMessageEle(`<p>${res}</p>`);
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  messageEle.classList.add(className);
  messageEle.innerHTML = txt; // Use innerHTML to render HTML content
  chatBody.append(messageEle);
};

const getChatbotResponse = (userInput) => {
  // Convert user input to lowercase for case-insensitive matching
  const userInputLower = userInput.toLowerCase();

  // Check if any keyword partially matches the user input
  const matchedKeywords = Object.keys(responseObj).filter(keyword => userInputLower.includes(keyword));

  if (matchedKeywords.length > 0) {
    // If there's a partial match, check if it's for a specific product
    if (matchedKeywords.includes("product")) {
      // If the user is asking about a specific product color
      const specificProduct = matchedKeywords.find(keyword => keyword === "specificproduct");
      if (specificProduct) {
        // Extract the product name from the user input
        const productName = userInput.split("specificproduct")[1].trim();
        return responseObj.specificProduct(productName);
      } else {
        // Otherwise, provide information about available products
        return responseObj.product;
      }
    } else {
      // If it's not related to products, return the response for the matched keyword
      return responseObj[matchedKeywords[0]];
    }
  } else {
    // If no partial match is found, return a default response
    return "I'm sorry, I didn't understand that. Can you please try again?";
  }
};

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};
