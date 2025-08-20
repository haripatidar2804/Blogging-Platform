export const extractFirstParagraph = (htmlString: string) => {
  const match = htmlString.match(/<p>(.*?)<\/p>/);
  return match ? match[1] : null;
};

export const fortmatDate = (date: string) => {
  return new Date(date).toLocaleDateString(["en-US"], {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const estimateReadTime = (content: string) => {
  const readInMins = Math.round(content.split(" ").length / 200);
  return readInMins > 0 ? readInMins : "1";
};
