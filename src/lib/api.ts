const API_URL = import.meta.env.VITE_API_URL || "https://api.scryfall.com";

export async function getRandomCardImage(maxRetries = 5): Promise<string> {
  let imageUrl: string | undefined;
  let attempts = 0;

  while (!imageUrl && attempts < maxRetries) {
    attempts++;
    try {
      const response = await fetch(`${API_URL}/cards/random`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (data.image_uris && data.image_uris.art_crop) {
        imageUrl = data.image_uris.art_crop;
      } else {
        console.warn("No art_crop image found, fetching again...");
      }
    } catch (error) {
      console.error("Error fetching random card image:", error);
      break;
    }
  }

  return imageUrl || import.meta.env.VITE_PLACEHOLDER_URL;
}

export async function getCards(data: CardFormState) {
  let url = `${API_URL}/cards/search`;

  const queryParts = [
    data.type ? `type:${data.type}` : "",
    data.cost ? `cmc:${data.cost}` : "",
    data.description
      ? data.description
          .trim()
          .split(/\s+/)
          .map((word) => `o:${word}`)
          .join(" ")
      : "",
    data.power ? `power:${data.power}` : "",
    data.toughness ? `toughness:${data.toughness}` : "",
  ].filter(Boolean);

  url += `?q=${encodeURIComponent(queryParts.join(" "))}`;

  const cardList: CardListState = {
    data: [],
    error: null,
    colors: {
      white: 0,
      blue: 0,
      black: 0,
      red: 0,
      green: 0,
    },
  };

  while (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      for (const card of data.data) {
        // adds the full card image url or a placeholder image, if no card scan is found
        const imageUri =
          card.image_uris?.normal || "/full_card_placeholder.png";
        if (imageUri) cardList.data.push(imageUri);

        (card.color_identity || []).forEach((color: string) => {
          switch (color) {
            case "W":
              cardList.colors.white++;
              break;
            case "U":
              cardList.colors.blue++;
              break;
            case "B":
              cardList.colors.black++;
              break;
            case "R":
              cardList.colors.red++;
              break;
            case "G":
              cardList.colors.green++;
              break;
          }
        });
      }

      url = data.has_more ? data.next_page : null;
    } catch (error) {
      console.error("Error fetching cards:", error);

      let errorMessage = "An unknown error occurred.";
      if (error instanceof TypeError) {
        errorMessage = "Network error: Please check your internet connection.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      cardList.data.push("error");
      return {
        data: [],
        error: {
          message: errorMessage,
          url,
        },
        colors: cardList.colors,
      };
    }
  }

  return cardList;
}
