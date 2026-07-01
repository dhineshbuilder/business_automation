async function sendMessage() {
  const url = "https://graph.facebook.com/v25.0/1251524281378095/messages";
  const token = "EAAVnQ0rVkZBsBR07l3plhyVZCC7w0yntSNU408nGoWJIaVC4TNvwFABhgZC379O9CJc1B27BNyHZCMMWe1oYZCilOrj6fgLIeBff6ZAlW7IeLkN4G97QqMmkqWVpi1rVNQD4UA4ralci2F8LuVb8hWcxY7YSCOGLMZAvJNKDF1BYhvHS9PUZBW2P5lt3EWTETdpQkL14BuUjM7oxowijlYuzgJeO6qiTVtPDVRaPG9z39U8LMwkdUdkkDwkgH2jXqZB3mo2q2ZB3Grozg3rmBfQG5k";

  const payload = {
    messaging_product: "whatsapp",
    to: "919025873422",
    type: "template",
    template: {
      name: "jaspers_market_order_confirmation_v1",
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "John Doe" },
            { type: "text", text: "123456" },
            { type: "text", text: "Jul 1, 2026" }
          ]
        }
      ]
    }
  };

  try {
    console.log("Sending Meta API request...");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to send message:", err);
  }
}

sendMessage();
