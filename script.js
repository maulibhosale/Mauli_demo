async function send(){
  let input = document.getElementById("input").value;
  let chat = document.getElementById("chat");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let thinkingMsg = document.createElement("p");
  thinkingMsg.innerHTML = "<b>AI:</b> Thinking...";
  chat.appendChild(thinkingMsg);

  const aiReply = await getAIResponse(input);

  thinkingMsg.innerHTML = "<b>AI:</b> " + aiReply;
}

async function getAIResponse(input) {
  const API_KEY = "AIzaSyAcOn2AAXdLDB-EcZ6kJ-Elx7zdkdpfUJA";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a helpful AI assistant.\nUser: ${input}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log(data);

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  } catch (error) {
    console.error(error);
    return "Error connecting to AI";
  }
}
